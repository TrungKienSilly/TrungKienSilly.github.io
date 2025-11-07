# 🔒 Cập nhật Firebase Security Rules cho Review System

## Tổng quan
File này hướng dẫn cập nhật Firebase Realtime Database Rules để hỗ trợ hệ thống đánh giá mới.

## Firebase Security Rules (Cập nhật)

Vào Firebase Console → Realtime Database → Rules và thay thế bằng rules sau:

```json
{
  "rules": {
    "ratings": {
      ".read": true,
      "$projectKey": {
        ".write": true,
        ".validate": "newData.hasChildren(['rating', 'timestamp'])",
        "rating": {
          ".validate": "newData.isNumber() && newData.val() >= 1 && newData.val() <= 5"
        },
        "timestamp": {
          ".validate": "newData.isNumber()"
        }
      }
    },
    "reviews": {
      ".read": true,
      ".write": true,
      ".indexOn": ["timestamp", "projectName", "rating"],
      "$reviewId": {
        ".validate": "newData.hasChildren(['reviewerName', 'reviewerPhone', 'projectName', 'rating', 'timestamp'])",
        "reviewerName": {
          ".validate": "newData.isString() && newData.val().length >= 2 && newData.val().length <= 50"
        },
        "reviewerPhone": {
          ".validate": "newData.isString() && newData.val().length >= 8"
        },
        "projectName": {
          ".validate": "newData.isString() && newData.val().length > 0"
        },
        "rating": {
          ".validate": "newData.isNumber() && newData.val() >= 1 && newData.val() <= 5"
        },
        "comment": {
          ".validate": "newData.isString() && newData.val().length <= 500"
        },
        "timestamp": {
          ".validate": "newData.isNumber()"
        },
        "userAgent": {
          ".validate": "newData.isString()"
        }
      }
    }
  }
}
```

## Giải thích Rules

### Reviews Node
- **`.read: true`** - Cho phép mọi người đọc reviews
- **`.write: true`** - Cho phép mọi người gửi review (có thể giới hạn sau)
- **`.indexOn`** - Index theo timestamp, projectName, rating để query nhanh

### Validation
- **reviewerName**: 2-50 ký tự
- **reviewerPhone**: Tối thiểu 8 ký tự (đã được sanitized với ****)
- **projectName**: Bắt buộc, không rỗng
- **rating**: 1-5 sao
- **comment**: Tùy chọn, tối đa 500 ký tự
- **timestamp**: Số (milliseconds)
- **userAgent**: String (để tracking)

## Bảo mật nâng cao (Tùy chọn)

### 1. Rate Limiting - Giới hạn số review mỗi ngày

```json
{
  "rules": {
    "reviews": {
      ".read": true,
      ".write": "!root.child('reviewLimits').child(auth.uid || $ip).exists() || 
                 root.child('reviewLimits').child(auth.uid || $ip).val() < now - 86400000",
      ".indexOn": ["timestamp"]
    },
    "reviewLimits": {
      "$userId": {
        ".write": true,
        ".validate": "newData.val() == now"
      }
    }
  }
}
```

### 2. Chỉ cho phép review 1 lần cho mỗi project

```json
{
  "rules": {
    "reviews": {
      ".read": true,
      "$reviewId": {
        ".write": "!root.child('reviews').orderByChild('reviewerPhone').equalTo(newData.child('reviewerPhone').val()).exists()",
        ".validate": "newData.hasChildren(['reviewerName', 'projectName', 'rating', 'timestamp'])"
      }
    }
  }
}
```

### 3. Chặn spam bằng rate limiting (5 reviews/phút)

Thêm code JavaScript vào `script.js` (đã có sẵn):

```javascript
const REVIEW_RATE_LIMIT = 5;
const reviewLimitTracker = {};

function checkReviewRateLimit() {
  const now = Date.now();
  const key = 'reviews';
  
  if (!reviewLimitTracker[key]) {
    reviewLimitTracker[key] = [];
  }
  
  // Remove old timestamps (older than 1 minute)
  reviewLimitTracker[key] = reviewLimitTracker[key].filter(
    timestamp => now - timestamp < 60000
  );
  
  if (reviewLimitTracker[key].length >= REVIEW_RATE_LIMIT) {
    return false;
  }
  
  reviewLimitTracker[key].push(now);
  return true;
}
```

## Cấu trúc Database

Sau khi có reviews, database sẽ có cấu trúc:

```
firebase-database/
├── ratings/
│   ├── UI-Writing-TOEIC-test/
│   │   ├── -Abc123: { rating: 5, timestamp: ... }
│   │   └── ...
│   └── Warmguys/
│       └── ...
└── reviews/
    ├── -XyZ789: {
    │     reviewerName: "Nguyễn Văn A",
    │     reviewerPhone: "****5678",
    │     projectName: "Warmguys",
    │     rating: 5,
    │     comment: "Dự án rất tốt!",
    │     timestamp: 1699356789000,
    │     userAgent: "Mozilla/5.0..."
    │   }
    ├── -Def456: { ... }
    └── ...
```

## Testing

### 1. Test gửi review
```bash
# Mở index.html trong browser
# Click "Viết đánh giá"
# Điền form và submit
# Check Firebase Console → Realtime Database
```

### 2. Test validation
```javascript
// Mở DevTools Console
// Test invalid data
const invalidReview = {
  reviewerName: "A", // Too short
  reviewerPhone: "123", // Too short
  projectName: "",
  rating: 6 // Out of range
};

// Should be rejected by Firebase rules
```

### 3. Test real-time updates
```javascript
// Mở 2 tabs cùng lúc
// Tab 1: Gửi review
// Tab 2: Xem reviews tự động cập nhật
```

## Backup & Restore

### Export reviews
```bash
# Firebase Console → Realtime Database → Export JSON
# Or use Firebase CLI:
firebase database:get /reviews > reviews-backup.json
```

### Import reviews
```bash
firebase database:set /reviews reviews-backup.json
```

## Monitoring

Vào Firebase Console để theo dõi:
- **Database Usage**: Xem số lượng reads/writes
- **Rules Simulator**: Test rules trước khi deploy
- **Quota**: Kiểm tra giới hạn free tier (10GB/month)

## Troubleshooting

### Lỗi: "Permission denied"
- Kiểm tra rules có `.write: true`
- Xem console logs để biết lý do reject

### Reviews không hiển thị
- Check Firebase Console → Database có data không
- Mở DevTools Console xem error
- Verify `firebase-config.js` có đúng `databaseURL`

### Duplicate reviews
- Implement rate limiting (xem phần 3 bên trên)
- Check phone number hoặc IP để chặn duplicate

## Best Practices

1. **Privacy**: Đã sanitize số điện thoại (chỉ hiện 4 số cuối)
2. **Validation**: Client-side + Firebase rules validation
3. **Fallback**: LocalStorage nếu Firebase fail
4. **XSS Protection**: Sử dụng `escapeHtml()` khi render
5. **Rate Limiting**: Giới hạn spam reviews
6. **Indexing**: Index timestamp để query nhanh

## Next Steps

- [ ] Deploy rules lên Firebase
- [ ] Test trên production
- [ ] Setup monitoring alerts
- [ ] Thêm admin panel để moderate reviews (nếu cần)
- [ ] Implement real-time listener cho reviews list (optional)

---

**Cập nhật:** November 7, 2025  
**Author:** Trung Kiên
