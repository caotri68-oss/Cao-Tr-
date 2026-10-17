# Pes a Kočka – Cẩm nang tiếng Séc vỡ lòng

Bản thiết kế lại 5 trang A4 theo phong cách minh hoạ (nền kem, ruy-băng vàng, tiêu đề xanh navy, thẻ pastel, bong bóng hội thoại).

- `cam-nang.html` – bản gốc, mở bằng trình duyệt để xem/in.
- `cam-nang-pes-a-kocka.pdf` – bản PDF in sẵn.
- `fonts/`, `fonts.css` – font Baloo 2, Nunito, Pacifico (Google Fonts, giấy phép OFL) nhúng sẵn để hiển thị đủ dấu tiếng Việt và tiếng Séc khi không có mạng.

Xuất lại PDF (Chromium):

```
chrome --headless --no-pdf-header-footer --print-to-pdf=cam-nang-pes-a-kocka.pdf cam-nang.html
```
