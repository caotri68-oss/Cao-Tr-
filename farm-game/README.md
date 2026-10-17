# Nông Trại Của Bà (Grandma's Farm)

Game nông trại 3D chạy trên trình duyệt (điện thoại + máy tính). Không cần cài đặt gì.

## Cách mở thử
- **Trên máy tính:** mở thư mục `farm-game`, nháy đúp file `index.html`.
- **Trên điện thoại:** cần đưa lên mạng (GitHub Pages / Netlify) — hướng dẫn ở giai đoạn 6.

## Cấu trúc
| File | Làm gì |
|---|---|
| `index.html` | Trang chính |
| `css/style.css` | Màu sắc, nút bấm, bố cục |
| `js/i18n.js` | **Toàn bộ chữ 3 ngôn ngữ** — sửa chữ ở đây |
| `js/save.js` | Tự lưu tiến trình |
| `js/models.js` | Mô hình 3D dựng bằng code |
| `js/engine.js` | Bộ máy vẽ 3D |
| `js/menuScene.js` | Cảnh 3D sau menu |
| `js/ui.js`, `js/main.js` | Màn hình, nút bấm, hộp thoại |
| `js/lib/three.min.js` | Thư viện 3D Three.js r158 (MIT) |

## Tiến độ
- [x] Giai đoạn 1: khung dự án, menu, chọn ngôn ngữ, cài đặt, lưu
- [ ] Giai đoạn 2: một màn chơi hoàn chỉnh
- [ ] Giai đoạn 3: âm thanh, nhạc, hiệu ứng
- [ ] Giai đoạn 4: hệ thống màn, sao, tiền, mở khoá
- [ ] Giai đoạn 5: cốt truyện + 30 màn
- [ ] Giai đoạn 6: đánh bóng, PWA, đưa lên mạng
