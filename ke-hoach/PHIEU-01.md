# Phiếu việc 01: Dọn dữ liệu (giai đoạn 1)

- Người làm: phiên đám mây (sửa code web)
- Model: Sonnet. Riêng bước 2 (mức tối đa) phải được Opus duyệt.
- Trạng thái: **chờ bạn duyệt**

## Phạm vi

- Code gốc: nhánh `ccr-08643b6b-cfgj04`, các file `docs/index.html` và `docs/kb.js`.
- Làm trên nhánh `ccr-d80a3ee2-82fvlj`. **Không** sửa nhánh đang chạy trang web.
- Không ghi đè dữ liệu nào trên Google Drive.

## Việc cần làm

1. **Sửa nhãn tiêu đề Thư viện.** Hiện ghi "19 chủ đề · 53 hoạt chất · 4…" và bị cắt chữ. Đổi thành "67 hoạt chất (53 có bài) · 46 tài liệu", để chủ đề sang dòng riêng.
   - Xong khi: tiêu đề khớp với nút lọc "Hoạt chất · 67" và không bị cắt trên màn hình điện thoại.

2. **Mở rộng bảng kiểm tra trùng chất và vượt mức tối đa (`NUTR`).** Hiện bảng chỉ có 19 chất. Thêm các chất trong kho có mức tối đa chính thức hoặc hay bị trùng giữa các sản phẩm. Ứng viên: B1, B2, B5, B12, biotin, choline, CoQ10, lutein, astaxanthin, các dạng magie và canxi (gộp về chất gốc).
   - Mỗi mức tối đa phải ghi nguồn (EFSA hoặc NIH) và năm. Chất chưa có mức tối đa chính thức thì chỉ đếm trùng, không cảnh báo vượt mức.
   - Hiện app dùng lẫn mức của Mỹ (IOM) và của EFSA, ví dụ B6 trong bảng là 100 mg nhưng cảnh báo lại dùng 12 mg của EFSA. Chọn **EFSA làm chuẩn chính** (bạn sống ở EU), còn IOM chỉ ghi để tham khảo.
   - Xong khi: một sản phẩm chứa magie citrate cộng với một multivitamin chứa magie oxit bị phát hiện là trùng magie.

3. **Lập từ điển đồng nghĩa dùng chung.** Hiện app ghép chất bằng cách so tên (`kbKeyOf`), nên dễ trượt khi tên khác nhau. Tạo một bảng duy nhất ghi mã chất kèm mọi tên gọi (Việt, Anh, Séc, các dạng muối), ví dụ: `mg` = magie, magnesium, hořčík, Mg bisglycinate…
   - Xong khi: tìm "hořčík" hoặc "magnesium" đều ra trang Magie.

4. **Tăng phiên bản** lên v2-63, chạy thử trên trình duyệt ở cỡ màn hình điện thoại, chụp ảnh 3 màn hình: Thư viện, Tủ thuốc, Hôm nay.

## Báo lại cho quản lý

- Danh sách file đã sửa và mã commit.
- Ảnh chụp 3 màn hình.
- Bảng mức tối đa mới thêm, mỗi dòng kèm nguồn, để Opus duyệt trước khi gộp vào trang đang chạy.

## Không làm trong phiếu này

- Không thêm Bảng Ý, trang Bệnh hay gợi ý (đó là giai đoạn 2 trở đi).
- Không build APK. Việc này để phiên máy tính làm sau khi bản web được duyệt.
