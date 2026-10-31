# Đọc phiếu hàng

Trang web một file: chụp hoặc chọn ảnh phiếu hàng, app đọc bảng và trả về 3 cột
**Pol.** (số thứ tự), **Kód** (bỏ phần chữ ở đầu, chỉ giữ mã số) và **Název zboží**.

- Mở `index.html` bằng một web server tĩnh bất kỳ (vd. `npx serve phieu-scan`) hoặc đưa cả thư mục lên hosting tĩnh.
- Lần đầu: bấm ⚙️ Cài đặt, chọn Claude hoặc Gemini, dán API key. Key chỉ lưu trong trình duyệt.
- Mã được kiểm tra chữ số cuối EAN-13; dòng nghi sai được đánh dấu ⚠. Có thể sửa trực tiếp trong bảng.
- Chạm vào số thứ tự hoặc mã để mở Google Hình ảnh tìm sản phẩm (bấm ✏️ Sửa để chỉnh chữ trong bảng).
- Xuất: sao chép (dán vào Excel/Sheets) hoặc tải CSV.

Kiểm thử phần xử lý mã: `node phieu-scan/test.js`
