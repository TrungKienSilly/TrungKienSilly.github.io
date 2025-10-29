# Only Use Tricks — Blog trao đổi

Đây là một blog tĩnh nhỏ để trao đổi chủ đề về game FC Online. Trang được thiết kế để chạy trên GitHub Pages.

Nội dung chính:
- `index.html` — trang chủ, danh sách bài.
- `posts/` — chứa bài viết (ví dụ `posts/post1.html`).
- `assets/styles.css` — stylesheet.
- `assets/script.js` — script cho phần bình luận (lưu cục bộ bằng localStorage).

Chạy & triển khai
- Mở `index.html` trực tiếp trong trình duyệt để xem local.
- Để chạy trên GitHub Pages: đẩy repository này lên GitHub (branch `main`) và bật Pages trong cài đặt repository (source: `main` / `/ (root)`).

Thêm bài mới
1. Tạo file HTML trong thư mục `posts/`, ví dụ `posts/my-post.html`.
2. Link bài mới từ `index.html` hoặc tạo một hệ thống list nếu bạn muốn.

Về phần bình luận
- Bình luận được lưu trên trình duyệt của người dùng (localStorage) theo từng bài (khóa: `comments_<slug>`).
- Đây là giải pháp nhẹ, không có backend. Nếu muốn bình luận chung cho nhiều người, cần tích hợp dịch vụ (ví dụ Disqus, Firebase, hay backend riêng).

Bạn muốn tôi thêm: tìm kiếm, phân trang, hoặc tích hợp hệ thống bình luận có backend? Hãy nói yêu cầu để tôi làm tiếp.