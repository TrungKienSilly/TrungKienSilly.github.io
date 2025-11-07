# Portfolio Website — trungkiensilly.github.io

Trang portfolio cá nhân hiển thị tất cả các dự án đã thực hiện, với giao diện hiện đại và nhiều tính năng tương tác.

## Tính năng

### Core Features
- **Hero Cover Section**: Ảnh bìa full-width với thông tin cá nhân
- **Project Grid**: Hiển thị danh sách dự án dạng card responsive
- **Search & Filter**: Tìm kiếm theo tên/mô tả và lọc theo tags
- **Dark/Light Mode**: Chuyển đổi theme với lưu trữ localStorage
- **Social Media Bubble**: Menu chat bubble góc phải với 6 nền tảng mạng xã hội

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
├── index.html          # Trang chính
├── styles.css          # CSS với theme variables
├── script.js           # JavaScript logic
├── projects.json       # Dữ liệu các dự án
├── img/               # Thư mục chứa hình ảnh
│   ├── IMG_7607.JPG   # Hero cover image
│   ├── tiktok.jpg     # Footer gallery
│   ├── ins1.jpg       # Footer gallery
│   └── ins2.jpg       # Footer gallery
└── [project-folders]  # Các dự án con
```

## Deployment

### Bước 1: Clone Repository
```bash
git clone https://github.com/TrungKienSilly/TrungKienSilly.github.io.git
cd TrungKienSilly.github.io
```

### Bước 2: Cập nhật nội dung
- Chỉnh sửa `projects.json` để thêm/sửa dự án
- Thay thế ảnh trong thư mục `img/`
- Tùy chỉnh CSS trong `styles.css`

### Bước 3: Push lên GitHub
```bash
git add -A
git commit -m "Update portfolio content"
git push origin main
```

### Bước 4: Truy cập
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
- **Vanilla JavaScript**: ES6+, Fetch API, LocalStorage
- **GitHub Pages**: Static hosting miễn phí

## Các dự án đang hiển thị

1. **TrungKienSilly.github.io** - Portfolio website
2. **UI-Writing-TOEIC-test** - Angular app
3. **TrungKienSilly** - GitHub profile
4. **Warmguys** - E-commerce PHP
5. **TOEIC Speaking Test Website** - TypeScript
6. **tuyensinh** - Admission system PHP
7. **top1datsan** - Sports booking platform PHP

## Liên hệ

- 📧 Email: kiennguyen300803@gmail.com
- 📷 Instagram: [@trungkien_onthego](https://www.instagram.com/trungkien_onthego)
- 🎵 TikTok: [@xucxichdog](https://www.tiktok.com/@xucxichdog)
- 👤 Facebook: [nguoicodonnhatthegioinayluon](https://www.facebook.com/nguoicodonnhatthegioinayluon)
- 💼 LinkedIn: [trungkiensilly](https://www.linkedin.com/in/trungkiensilly)
- 🤗 Hugging Face: [trungkiensilly](https://huggingface.co/trungkiensilly)

## License

MIT License - Feel free to use this template for your own portfolio!

---

**© 2025 Trung Kiên** — Built with ❤️ and ☕