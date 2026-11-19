# Kế hoạch nâng cấp "Đọc phiếu hàng" lên V2

Ngày lập: 19/11/2026. Mọi thứ dưới đây đã được chủ app đồng ý. Phiên mới chỉ cần làm theo, không hỏi lại.

## Quy tắc làm việc (đọc trước)
- **Chỉ làm trên artifact**, không làm APK. Bỏ qua thư mục `phieu-hang-app/android`, `www`.
- **Cập nhật đúng một link duy nhất:** https://claude.ai/artifact/CUPdMahVMqL7CYGBfDGACa (publish với `url` này, không tạo artifact mới).
- Bản hiện tại (V1, đã có mèo) được sao lưu ở `phieu-hang-app/artifact-ban-hien-tai/index.html` và 3 ảnh trong `img/`. Dùng nó làm điểm xuất phát.
- **Làm liền một lần bước 1 đến 6, không dừng hỏi giữa chừng.** Chỉ dừng nếu bị chặn thật sự. Cuối cùng báo kết quả một lần.
- Sửa nhỏ thì dùng `edits`, đừng ghi lại cả file. Chỉ viết lại cả file một lần ở bước 4.
- Trong trang phải hiện dòng nhỏ "Phiên bản 2 · 19/11/2026" ở cuối để phân biệt với bản cũ.

## Yêu cầu của chủ app

**Đọc ảnh:** dùng Claude có sẵn trong app (không cần key). Mỗi ảnh thêm vào *phiếu hiện tại*.

**Hai loại bảng, tự nhận và hiện nhãn, có nút chọn tay (Tự nhận / Bảng cũ / Bảng mới) và nút "Đọc lại theo loại khác" cho ảnh vừa chụp:**
- *Bảng cũ:* cột Pol., Kód, Název zboží. Mã có tiền tố chữ, ví dụ `AROMVUN-85955 56487037` thì giữ lại `8595556487037`.
- *Bảng mới:* cột Pořadí, Čárový kód, Katalog, Název, Počet MJ, giá. Chỉ lấy số thứ tự, mã vạch, tên (tên bị cắt vẫn dùng). **Bỏ Katalog, số lượng, giá.**

**Mã:**
- 13 số đúng chữ số kiểm tra: bình thường, nhãn "Khớp EAN".
- 13 số sai chữ số kiểm tra: nền vàng, tính là "cần kiểm tra".
- **7 hoặc 8 số: tô đỏ để phân biệt, nhãn "Mã 7 số"/"Mã 8 số", KHÔNG tính là lỗi.**
- Độ dài khác, ký tự lạ, trống: cảnh báo như cũ.
- Mèo chỉ buồn khi có mã thật sự cần kiểm tra.

**Số thứ tự:** lấy đúng số trên phiếu, xếp tăng dần. Số đã có trong phiếu hiện tại thì bỏ qua. Nếu ảnh mới toàn số đã có thì hỏi "Đây là phiếu mới phải không?" với nút Phiếu mới / Bỏ qua.

**Phiếu và lịch sử:**
- Mỗi phiếu ghi ngày giờ lúc nạp ảnh đầu tiên (dd/mm/yyyy · hh:mm).
- Nút "Phiếu mới".
- Màn hình Lịch sử nhóm theo ngày, ngày mới ở trên. Mỗi phiếu: giờ, loại bảng, số dòng, số mã cần kiểm tra. Bấm để mở lại, xem, sửa tiếp.
- Lưu cố định bằng capability `db` (dữ liệu riêng theo tài khoản, chỉ chủ đọc). Không dùng localStorage cho lịch sử. Chỉ lưu chữ, không lưu ảnh.

**Xoá, chỉ khi chủ bấm, luôn bấm hai lần để xác nhận:** xoá từng dòng, xoá một phiếu, xoá cả một ngày, xoá toàn bộ. App không tự xoá bao giờ.

**Tìm Google:** cài đặt "Cách tìm" có 3 lựa chọn: mã + tên / chỉ tên / chỉ mã. Lưu một lần, nhớ mãi cho đến khi đổi. Bấm số thứ tự hoặc mã thì mở thẳng **Google Hình ảnh** theo cách đã chọn, không hiện bảng chọn trung gian.

**Giữ nguyên:** lọc dòng cần kiểm tra, chế độ Sửa, sao chép cả bảng/cột mã/cột tên, xuất CSV, mèo, sáng/tối.

## Lộ trình và model
| Bước | Việc | Model |
|---|---|---|
| 1 | Câu lệnh đọc ảnh, tự nhận bảng cũ/mới, trả về loại bảng + số thứ tự + mã + tên | Sonnet |
| 2 | Xử lý dữ liệu: làm sạch mã theo loại, phân loại 13/7/8 số, bỏ trùng, sắp xếp, phát hiện toàn số trùng | Sonnet |
| 3 | Kho lưu: phiếu có ngày giờ, mở lại, sửa, các kiểu xoá | Sonnet (Opus chỉ khi Sonnet sai hai lần) |
| 4 | Giao diện đầy đủ, khổ điện thoại, sáng/tối | Sonnet |
| 5 | Ghép tìm Google Hình ảnh theo cài đặt | Haiku |
| 6 | Đăng lên link cũ, báo kết quả đã thử và chưa thử | Haiku |

Kiểm tra: bước 1 và 2 thử phần xử lý với dữ liệu mẫu (gồm mã 7/8 số và chụp lặp). Bước 3 ghi thử một phiếu rồi đọc lại và xoá. Không tự thử được việc Claude đọc ảnh thật trong app, chủ app sẽ thử trên điện thoại.

Dữ liệu mẫu bảng mới (trích ảnh): số thứ tự 3 đến 56, cột Čárový kód 13 số như `8718951555488`, tên như "Colgate 75ml ZP Advanced CZ White Baking Sod" (bị cắt).
