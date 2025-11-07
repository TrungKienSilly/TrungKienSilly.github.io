# Portfolio Website — trungkiensilly.github.io

Trang portfolio cá nhân hiển thị tất cả các dự án đã thực hiện, với giao diện hiện đại và nhiều tính năng tương tác.

## Tính năng

### Core Features
- **Hero Cover Section**: Ảnh bìa full-width với thông tin cá nhân
- **Project Grid**: Hiển thị danh sách dự án dạng card responsive
- **Search & Filter**: Tìm kiếm theo tên/mô tả và lọc theo tags
- **Dark/Light Mode**: Chuyển đổi theme với lưu trữ localStorage
- **Social Media Bubble**: Menu chat bubble góc phải với 6 nền tảng mạng xã hội

### Review System 🆕
- **Review Form**: Form thu thập đánh giá từ khách hàng (tên, SĐT, dự án, rating, nhận xét)
- **Firebase Integration**: Lưu trữ và sync reviews realtime qua Firebase Realtime Database
- **Reviews Display**: Hiển thị danh sách đánh giá với rating stars, thông tin dự án và timestamp
- **LocalStorage Fallback**: Tự động fallback về localStorage nếu Firebase không khả dụng
- **Rating System**: Đánh giá từ 1-5 sao với UI trực quan
- **Phone Privacy**: Chỉ lưu 4 số cuối của số điện thoại để bảo vệ privacy
- **Validation**: Validate đầy đủ (tên, SĐT format VN, rating bắt buộc)

### Image Gallery
- **Footer Gallery**: Hiển thị ảnh Instagram/TikTok ở cuối trang
- **Lightbox**: Click vào ảnh để phóng to toàn màn hình
- **Responsive Images**: Tự động điều chỉnh kích thước theo màn hình

### Responsive Design
- Mobile-first approach
- Breakpoint tại 480px
- Touch-friendly interface
- Optimized for all screen sizes

## Cấu trúc dự án

```
Trungkien_project/
├── index.html                      # Trang chính
├── styles.css                      # CSS với theme variables
├── script.js                       # JavaScript logic
├── projects.json                   # Dữ liệu các dự án
├── firebase-config.js              # Firebase configuration & functions
├── firebase-config.example.js      # Firebase config template
├── FIREBASE_SETUP.md              # Hướng dẫn cấu hình Firebase
├── FIREBASE_RULES_OPTIMIZED.json  # Firebase security rules (optimized)
├── REVIEW_FEATURE.md              # Chi tiết tính năng Review System
├── img/                           # Thư mục chứa hình ảnh
│   ├── IMG_7607.JPG               # Hero cover image
│   ├── tiktok.jpg                 # Footer gallery
│   ├── ins1.jpg                   # Footer gallery
│   └── ins2.jpg                   # Footer gallery
└── [project-folders]              # Các dự án con
```

## Deployment

### Bước 1: Clone Repository
```bash
git clone https://github.com/TrungKienSilly/TrungKienSilly.github.io.git
cd TrungKienSilly.github.io
```

### Bước 2: Cấu hình Firebase (Optional - cho Review System)
1. Tạo Firebase project tại [Firebase Console](https://console.firebase.google.com/)
2. Kích hoạt **Realtime Database**
3. Copy config vào `firebase-config.js`
4. Cập nhật Security Rules (xem `FIREBASE_RULES_OPTIMIZED.json`)
5. Chi tiết: xem file `FIREBASE_SETUP.md`

**Lưu ý**: Nếu không dùng Firebase, reviews sẽ lưu vào localStorage (chỉ trên máy local)

### Bước 3: Cập nhật nội dung
- Chỉnh sửa `projects.json` để thêm/sửa dự án
- Thay thế ảnh trong thư mục `img/`
- Tùy chỉnh CSS trong `styles.css`

### Bước 4: Push lên GitHub
```bash
git add -A
git commit -m "Update portfolio content"
git push origin main
```

### Bước 5: Truy cập
Đợi 1-2 phút để GitHub Pages rebuild, sau đó truy cập:
**https://trungkiensilly.github.io**

## Tùy chỉnh Theme

### CSS Variables
Chỉnh sửa trong `styles.css`:

```css
:root {
  --bg: #ffffff;
  --card: #f8f9fa;
  --text: #212529;
  --accent: #123d8b;
  /* ... */
}

body.dark-mode {
  --bg: #0f1720;
  --card: #1a1f2e;
  --text: #e6eef6;
  /* ... */
}
```

## Cấu trúc dữ liệu Project

File `projects.json`:

```json
{
  "name": "Tên dự án",
  "description": "Mô tả ngắn gọn",
  "tags": ["HTML", "CSS", "JavaScript"],
  "repo": "https://github.com/user/repo",
  "demo": "https://demo-link.com"
}
```

## Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: Variables, Flexbox, Grid, Animations
- **Vanilla JavaScript**: ES6+, Fetch API, LocalStorage, Async/Await
- **Firebase Realtime Database**: Lưu trữ và sync reviews realtime
- **GitHub Pages**: Static hosting miễn phí

## Firebase Configuration

### Review System Database Structure
```json
{
  "reviews": {
    "-ABC123": {
      "reviewerName": "Nguyễn Văn A",
      "reviewerPhone": "****1234",
      "projectName": "Warmguys",
      "rating": 5,
      "comment": "Dự án rất tốt!",
      "timestamp": 1699356789000,
      "userAgent": "Mozilla/5.0..."
    }
  }
}
```

### Security Rules
Xem file `FIREBASE_RULES_OPTIMIZED.json` để có rules tối ưu với:
- ✅ Validation data structure
- ✅ Index trên `timestamp` field (performance)
- ✅ Validate rating (1-5), name length, comment length
- ⚠️ Read/Write public (cần điều chỉnh cho production nếu muốn rate limiting)

## Các dự án đang hiển thị

1. **UI-Writing-TOEIC-test** - Ứng dụng luyện thi TOEIC Writing (Angular)
2. **TrungKienSilly** - GitHub Profile README
3. **Warmguys** - Hệ thống quản lý phòng gym (PHP, MySQL)
4. **TOEIC Speaking Test Website** - Luyện phát âm với Azure AI (Angular 20, TypeScript)
5. **Hệ thống tuyển sinh ĐH** - Tìm kiếm trường theo điểm chuẩn (PHP, MySQL)
6. **TOP1DATSAN** - Đặt sân thể thao B2B với VNPAY (PHP, MySQL)

## Tài liệu kỹ thuật

- 📖 **FIREBASE_SETUP.md** - Hướng dẫn chi tiết cấu hình Firebase từ đầu
- 📖 **REVIEW_FEATURE.md** - Chi tiết về Review System (architecture, API, troubleshooting)
- 📖 **FIREBASE_RULES_OPTIMIZED.json** - Security rules tối ưu cho production

## Liên hệ

- 📧 Email: kiennguyen300803@gmail.com
- 📷 Instagram: [@trungkien_onthego](https://www.instagram.com/trungkien_onthego)
- 🎵 TikTok: [@xucxichdog](https://www.tiktok.com/@xucxichdog)
- 👤 Facebook: [nguoicodonnhatthegioinayluon](https://www.facebook.com/nguoicodonnhatthegioinayluon)
- 💼 LinkedIn: [trungkiensilly](https://www.linkedin.com/in/trungkiensilly)
- 🤗 Hugging Face: [trungkiensilly](https://huggingface.co/trungkiensilly)

## License

MIT License - Feel free to use this template for your own portfolio!

## Changelog

### Version 2.0.0 (November 7, 2025)
- ✨ **NEW**: Review System với Firebase Realtime Database
- ✨ Form thu thập đánh giá từ khách hàng (tên, SĐT, dự án, rating, comment)
- ✨ Hiển thị reviews realtime với sync tự động
- ✨ LocalStorage fallback khi Firebase không khả dụng
- 🗑️ **REMOVED**: Rating stars trong modal dự án (thay bằng Review System tổng thể)
- 🔧 **FIX**: Firebase initialization timing để đảm bảo reviews load đúng
- 📝 Thêm docs: `FIREBASE_SETUP.md`, `REVIEW_FEATURE.md`, `FIREBASE_RULES_OPTIMIZED.json`

### Version 1.0.0
- 🎉 Initial release với project grid, search/filter, dark mode, social bubble

---

**© 2025 Trung Kiên** — Built with ❤️ and ☕