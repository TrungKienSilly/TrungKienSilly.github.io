# 🔥 Hướng dẫn cấu hình Firebase cho Portfolio

## Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" (Thêm dự án)
3. Đặt tên project: `trungkien-portfolio` (hoặc tên bạn muốn)
4. Tắt Google Analytics (không bắt buộc cho project này)
5. Click "Create project"

## Bước 2: Đăng ký Web App

1. Trong Firebase Console, click vào icon **Web** `</>`
2. Đặt tên app: `Portfolio Website`
3. **QUAN TRỌNG**: Tick vào ☑️ "Also set up Firebase Hosting for this app"
4. Click "Register app"
5. Copy đoạn **config object** (sẽ dùng ở bước 4)

Ví dụ config sẽ trông như thế này:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "trungkien-portfolio.firebaseapp.com",
  projectId: "trungkien-portfolio",
  storageBucket: "trungkien-portfolio.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  databaseURL: "https://trungkien-portfolio-default-rtdb.firebaseio.com"
};
```

## Bước 3: Kích hoạt Realtime Database

1. Trong Firebase Console, vào menu bên trái → **Realtime Database**
2. Click "Create Database"
3. Chọn location: `Singapore (asia-southeast1)` (gần Việt Nam nhất)
4. Chọn Security rules: **Start in test mode** (cho phép đọc/ghi tự do - chỉ dùng khi test)
5. Click "Enable"

### ⚠️ Cấu hình Security Rules (QUAN TRỌNG)

Sau khi tạo xong, vào tab **Rules** và thay đổi rules như sau:

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
    }
  }
}
```

**Giải thích rules:**
- ✅ Cho phép mọi người **đọc** ratings
- ✅ Cho phép mọi người **ghi** ratings
- ✅ Validate: rating phải từ 1-5 sao
- ✅ Bắt buộc phải có timestamp

Click **Publish** để áp dụng rules.

## Bước 4: Cập nhật config trong code

Mở file `firebase-config.js` và thay thế các giá trị `YOUR_XXX` bằng thông tin từ bước 2:

```javascript
const firebaseConfig = {
  apiKey: "AIza...", // Copy từ Firebase Console
  authDomain: "trungkien-portfolio.firebaseapp.com",
  projectId: "trungkien-portfolio",
  storageBucket: "trungkien-portfolio.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  databaseURL: "https://trungkien-portfolio-default-rtdb.firebaseio.com"
};
```

## Bước 5: Test Local

1. Mở file `index.html` trong trình duyệt
2. Mở **DevTools Console** (F12)
3. Bạn sẽ thấy: `✅ Firebase initialized successfully`
4. Thử đánh giá 1 dự án → Xem console log
5. Vào Firebase Console → Realtime Database → Xem data đã được lưu

## Bước 6: Deploy lên GitHub Pages

```bash
git add firebase-config.js
git commit -m "Add: Firebase integration for ratings"
git push
```

Sau khi push, website trên GitHub Pages sẽ tự động cập nhật (chờ 1-2 phút).

## 🎯 Cấu trúc Database

Dữ liệu sẽ được lưu theo cấu trúc:

```
ratings/
├── UI-Writing-TOEIC-test/
│   ├── -Abc123: { rating: 5, timestamp: 1699356789000, userAgent: "..." }
│   ├── -Def456: { rating: 4, timestamp: 1699356790000, userAgent: "..." }
│   └── ...
├── Warmguys/
│   ├── -Ghi789: { rating: 5, timestamp: 1699356791000, userAgent: "..." }
│   └── ...
└── ...
```

## 🔒 Bảo mật nâng cao (Tùy chọn)

### Giới hạn số lần đánh giá từ 1 IP

Cập nhật rules:

```json
{
  "rules": {
    "ratings": {
      ".read": true,
      "$projectKey": {
        ".write": "!root.child('ratings/' + $projectKey).child(auth.uid).exists() || data.exists()",
        ".indexOn": ["timestamp"]
      }
    }
  }
}
```

### Rate Limiting

Trong `firebase-config.js`, thêm:

```javascript
const RATE_LIMIT = 5; // Max 5 ratings per minute
const rateLimitTracker = {};

function checkRateLimit(projectName) {
  const now = Date.now();
  const key = projectName;
  
  if (!rateLimitTracker[key]) {
    rateLimitTracker[key] = [];
  }
  
  // Remove old timestamps (older than 1 minute)
  rateLimitTracker[key] = rateLimitTracker[key].filter(
    timestamp => now - timestamp < 60000
  );
  
  if (rateLimitTracker[key].length >= RATE_LIMIT) {
    return false; // Rate limit exceeded
  }
  
  rateLimitTracker[key].push(now);
  return true;
}
```

## 📊 Xem thống kê

Trong Firebase Console → Realtime Database, bạn có thể:
- Xem tất cả ratings realtime
- Export data sang JSON
- Xem biểu đồ usage
- Set up alerts

## ⚡ Tối ưu hóa

### Enable Indexing

Trong Firebase Console → Realtime Database → Rules:

```json
{
  "rules": {
    "ratings": {
      ".read": true,
      ".indexOn": ["timestamp", "rating"]
    }
  }
}
```

### Sử dụng Firebase Hosting (Khuyến nghị)

Thay vì GitHub Pages, bạn có thể host trực tiếp trên Firebase:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Chọn project đã tạo
# Public directory: . (current directory)
# Single-page app: No
firebase deploy
```

Website sẽ có URL: `https://trungkien-portfolio.web.app`

## 🐛 Troubleshooting

### Lỗi: "Firebase is not defined"
- Kiểm tra xem đã thêm Firebase SDK vào `index.html` chưa
- Đảm bảo `firebase-config.js` được load **sau** Firebase SDK

### Lỗi: "Permission denied"
- Kiểm tra Security Rules trong Realtime Database
- Đảm bảo đã set `.read: true` và `.write: true`

### Ratings không cập nhật realtime
- Kiểm tra console có lỗi không
- Xem trong Firebase Console → Database có data không
- Clear cache và reload trang

### Lỗi CORS
- Firebase Realtime Database không có vấn đề CORS
- Nếu gặp lỗi, kiểm tra `databaseURL` có đúng không

## 📞 Support

Nếu gặp vấn đề, check:
1. [Firebase Documentation](https://firebase.google.com/docs/database)
2. [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
3. Console logs trong DevTools (F12)

---

**Chúc bạn cấu hình thành công! 🎉**
