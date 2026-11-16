# Xuất Bảng Ý ra Google Sheet (bản v2)

Sheet cũ "Bảng Ý TPCN" (tạo ngày 15/11, 264 dòng) đã cũ. Công cụ Google Sheets của Claude đang bị từ chối quyền với file đó, nên cách cập nhật là sinh file xlsx mới rồi tải lên.

## Cách dùng

1. Chạy (cần Python 3 và openpyxl; chỉ đọc CSV, không sửa CSV):

   ```
   python3 ke-hoach/scripts/xuat-sheet.py
   ```

   Tuỳ chọn: `python3 ke-hoach/scripts/xuat-sheet.py <thư_mục_dữ_liệu> <file_ra.xlsx>`.
   Kết quả: `ke-hoach/du-lieu/bang-y-tpcn-v2.xlsx`.
2. Tải file lên Google Drive (người dùng tự làm):
   - Thay Sheet cũ: mở Sheet cũ, Tệp, Nhập, Tải lên, chọn file, "Thay thế bảng tính". Giữ nguyên id và link.
   - Hoặc tạo Sheet mới: Drive, Mới, Tải tệp lên, mở file bằng Google Sheets (hoặc Tệp, Lưu thành Google Trang tính). Khi đó phải cập nhật id Sheet trong `LO-TRINH.md`.
3. Bật quyền Google Sheets cho Claude để sau này sửa trực tiếp: vào claude.ai, Cài đặt, Connectors (Trình kết nối), Google Drive và Google Sheets, kết nối lại tài khoản và cấp quyền chỉnh sửa; với file này, kiểm tra tài khoản đang đăng nhập là chủ hoặc người được chia sẻ quyền Editor. Nếu Sheet là file mới do người dùng tải lên, Claude có thể được cấp quyền bình thường.

## Script làm gì

- Tab `Y`: lấy `bang-y.csv`, áp mức chấm theo thứ tự `cham-muc`, `cham-muc-tai-lieu`, `cham-muc-lai`, `cham-muc-lai-2a`, `cham-muc-lai-2b` (file sau ghi đè file trước theo `ma_y`; file không có thì bỏ qua). Thêm cột `do_chac`, `ly_do_cham`. Nền ô theo `trang_thai`: `da_duyet` xanh nhạt, `cho_duyet` vàng nhạt, `bo` xám.
- Tab `Tang` (cả hai chế độ `da_duyet` và `xem_truoc`, lọc theo cột `che_do`), `TuongTac`, `Nguon`, `Chat`, `MucTieu`, `HuongDan` (giải thích cột, mã tầng, mã mức bằng chữ thường).
- Mọi tab: tiêu đề in đậm, cố định hàng đầu, bộ lọc, cột nội dung xuống dòng.
- Không có thông tin cá nhân.

## Sửa lỗi "R−" hiện thành "−"

Nguyên nhân: dữ liệu dùng dấu trừ Unicode (U+2212), có 27 dòng trong `bang-y.csv` chỉ có "−" trơ trọi, và Sheet hiểu chuỗi đó như số/công thức. Cách sửa trong script:

- Chuẩn hoá mọi "R−" và "−" thành `R-` (gạch ngang ASCII), kể cả trong cột `muc_tot_nhat` của `Tang` và trong chữ giải thích.
- Mọi ô ghi dạng văn bản (`number_format = '@'`, kiểu chuỗi), nên Sheet không tự đổi.
- Đã kiểm tra bằng cách đọc lại xlsx: 44 ô `R-` ở tab Y đều có kiểu chuỗi và định dạng `@`; không còn "R−" hay "−" nào trong file.

Lưu ý khi gõ tay trên Sheet: giữ ô ở định dạng Văn bản. Khi xuất ngược CSV về, mức sẽ là `R-` (ASCII), còn dữ liệu gốc dùng `R−`, nên bước ghép cần chuẩn hoá một chiều (xem dưới).

## Số dòng từng tab (không tính hàng tiêu đề)

| Tab | Dòng |
|---|---|
| Y | 480 |
| Tang | 264 (21 `da_duyet`, 243 `xem_truoc`) |
| TuongTac | 40 |
| Nguon | 14 |
| Chat | 85 |
| MucTieu | 23 |
| HuongDan | 29 |

Tab Y: 436 `cho_duyet`, 26 `da_duyet`, 18 `bo`. Mức sau khi áp các file chấm: R1 81, R2 162, R3 124, R0 49, R- 44, chưa chấm 20.

Ghi chú:

- `tuong-tac-bo-sung.csv`, `muc-tieu-bo-sung.csv`, `y-bo-sung*.csv` chưa được ghép vào tab riêng; script dùng `tuong-tac.csv` và `muc-tieu.csv` đúng như danh sách yêu cầu. Cần xem lại nếu phần bổ sung chưa nằm sẵn trong hai file này.
- `duyet.csv` (8 dòng tự duyệt) không được áp vào cột `trang_thai`; script chỉ đọc `bang-y.csv`.
- Một số mã trong `cham-muc.csv` không có trong `bang-y.csv` (2 dòng): bị bỏ qua.

## Đề xuất luồng đồng bộ 2 chiều (đợt sau)

1. Máy tính: chạy `xuat-sheet.py`, tải lên Sheet. Đây là chiều "repo sang Sheet".
2. Điện thoại: người dùng mở tab `Y`, lọc `cho_duyet`, đổi cột `trang_thai` sang `da_duyet` hoặc `bo`; có thể ghi lý do ở `ghi_chu`.
3. Chiều ngược lại: Tệp, Tải xuống, CSV (tab Y) về máy, hoặc Claude đọc trực tiếp nếu đã bật quyền Sheets.
4. Một script mới `nhap-duyet.py` (chưa viết) đọc CSV đó, chỉ lấy các dòng mà `trang_thai` khác với `bang-y.csv`, chuẩn hoá `R-` về dạng dữ liệu gốc nếu cần, rồi ghi vào `duyet.csv` (cột `ma_y`, `trang_thai`, `ly_do`) để theo đúng luồng hiện có. Không sửa trực tiếp `bang-y.csv`.
5. Chạy lại `tinh-tang.js` và `xuat-app.js` như thường lệ, rồi xuất lại xlsx. Quy tắc: Sheet là nơi duyệt, repo là nơi giữ dữ liệu gốc; không sửa nội dung Ý trên Sheet (chỉ `trang_thai`, `ghi_chu`) để tránh xung đột.
