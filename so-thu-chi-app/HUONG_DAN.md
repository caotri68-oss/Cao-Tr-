# Cài app sổ thu chi (làm 1 lần, khoảng 10 phút)

1. Mở sổ **Sổ thu chi gia đình** → menu **Tiện ích mở rộng → Apps Script**.
2. Xoá nội dung file `Code.gs` có sẵn, dán toàn bộ file `Code.gs` trong thư mục này vào.
3. Sửa dòng `MAT_KHAU` thành mật khẩu của nhà, và kiểm tra `NGUOI_DUNG`, `NGUOI_CHO_MUON`.
4. Bấm dấu **+** cạnh "Tệp" → **HTML** → đặt tên đúng là `Index` → dán nội dung file `Index.html`.
5. Cột trái, **Cài đặt dự án** (bánh răng) → bật "Hiển thị tệp kê khai appsscript.json" → mở `appsscript.json`, dán nội dung file cùng tên.
6. Bấm **Triển khai → Tùy chọn triển khai mới → Ứng dụng web**. Chạy bằng tài khoản: **Tôi**. Ai có quyền truy cập: **Bất kỳ ai**. Bấm Triển khai, cấp quyền (Google sẽ cảnh báo "chưa xác minh": chọn Nâng cao → Tiếp tục).
7. Copy link kết thúc bằng `/exec`, gửi cả nhà. Trên điện thoại: mở link → menu trình duyệt → **Thêm vào màn hình chính**.
8. Thử: ghi Chi 10 Kč danh mục bất kỳ, xem hiện "Đã ghi vào sổ", rồi bấm **Xoá khoản này**.

Sửa code về sau: Triển khai → **Quản lý triển khai** → bút chì → Phiên bản mới (link giữ nguyên).
