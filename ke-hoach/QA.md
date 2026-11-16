# QA Sổ TPCN, bản tpcn-v2-67 (Bước 2)

Ngày kiểm tra: 16/11/2026. Nhánh `ccr-d80a3ee2-82fvlj`, app ở `docs/`, APP_VER `tpcn-v2-67` (khớp `VER` trong `sw.js`).
Phương pháp: Playwright (Chromium), màn hình 375x812, tỉ lệ 2x, chạy hai lượt sáng và tối. Mỗi lượt nạp `docs/data/san-pham.json` qua ô "Cập nhật dữ liệu", một file hồ sơ mẫu "Người dùng mẫu" (bệnh nền giáp, thận, mất ngủ; thuốc thiamazole, rosuvastatin, bisoprolol; 5 sản phẩm có magie, canxi, vitamin D, i-ốt). Hồ sơ có cấu trúc (`member.hs`) gán bằng hàm của trang, nhóm thuốc lấy từ `nhomCua()` của app. Dữ liệu thử nằm trong bộ nhớ trình duyệt của phiên kiểm tra, không ghi vào repo.

**Kết luận: CHƯA GỘP** (có 1 lỗi LỚN: trang Mục tiêu gout không mở được và gout không có trong Thư viện).

## Bảng kết quả

| # | Mục | Sáng | Tối | Ghi chú / ảnh |
|---|---|---|---|---|
| 1 | Hôm nay: lịch uống hiện | ĐẠT | ĐẠT | 5 lượt, "0/5 lượt đã uống" |
| 1 | Cảnh báo đỏ (Nặng, Chặn) đúng màu | ĐẠT | ĐẠT | Đọc rõ cả hai chế độ, xem `light-14b-canh-bao-hom-nay.png`, `dark-14b-canh-bao-hom-nay.png` |
| 1 | Cảnh báo cam (Thận trọng) và xám (Lưu ý) | KHÔNG KIỂM ĐƯỢC | KHÔNG KIỂM ĐƯỢC | Dữ liệu thử không có mức này trên Hôm nay (chỉ có "Vừa", màu trung tính) |
| 1 | Khối theo dõi hiện trên Hôm nay | KHÔNG KIỂM ĐƯỢC | KHÔNG KIỂM ĐƯỢC | Chưa tạo chỉ số theo dõi: luồng "+ Thêm theo dõi" nhiều bước chưa tự động hoá |
| 1 | Đánh dấu một lượt uống | ĐẠT | ĐẠT | 1/5, "20%" |
| 1 | Số cảnh báo trên thẻ Hôm nay | LỖI (NHỎ) | LỖI (NHỎ) | Ghi "8 cảnh báo", khác thẻ Gia đình (6). Xem N1 |
| 2 | Tủ thuốc: thêm sản phẩm | ĐẠT | ĐẠT | Form nhập tay, lưu được, hiện "300 mg, 120% mức tối đa" |
| 2 | Sửa sản phẩm | ĐẠT | ĐẠT | Đổi tên thành "(QA sửa)", còn thấy trong danh sách |
| 2 | Xoá sản phẩm | ĐẠT | ĐẠT | Sản phẩm biến mất khỏi danh sách |
| 2 | Cảnh báo trùng chất | ĐẠT | ĐẠT | Block "Trùng nhau": Magie (citrate + oxide), Vitamin D |
| 2 | Vượt mức tối đa | ĐẠT | ĐẠT | Magie 600 mg/250 mg, Vitamin D 145 mcg/100 mcg |
| 3 | Tìm "hořčík" | ĐẠT | ĐẠT | Ra "Magie" |
| 3 | Tìm "thận" | ĐẠT | ĐẠT | Ra chủ đề "Thận và sỏi thận" |
| 3 | Tìm "gout" | **LỖI (LỚN)** | **LỖI (LỚN)** | "Không tìm thấy 'gout'". Xem L1 |
| 3 | Tìm "mất ngủ" | ĐẠT | ĐẠT | Ra "Giấc ngủ và căng thẳng" |
| 3 | Mục tiêu giap | ĐẠT | ĐẠT | Có Cần khám trước, Chất nên thận trọng, TPCN theo tầng, Trong tủ thuốc. Mâu thuẫn và Đã thử không thấy không có dữ liệu thử |
| 3 | Mục tiêu than | ĐẠT | ĐẠT | Như trên (không có "Trong tủ thuốc") |
| 3 | Mục tiêu ngu | ĐẠT | ĐẠT | Như trên (không có "Trong tủ thuốc") |
| 3 | Mục tiêu gout | **LỖI (LỚN)** | **LỖI (LỚN)** | Không mở được, rơi về Thư viện chung. Xem L1 |
| 4 | Thẻ thành viên có "Hỗ trợ N mục tiêu · M cảnh báo" | ĐẠT | ĐẠT | "Hỗ trợ 4 mục tiêu · 6 cảnh báo" (xem N1, N2) |
| 4 | Tab Tổng quan, Hồ sơ, Lịch uống, Gợi ý, Theo dõi | ĐẠT | ĐẠT | Đều mở được |
| 4 | Lịch uống có Bản đồ phủ | ĐẠT | ĐẠT | |
| 4 | Tạo phiếu hỏi bác sĩ | ĐẠT | ĐẠT | Phiếu có "Lập ngày 16/11/2026", ghi chú chỉ để tham khảo |
| 5 | Công tắc "Xem cả ý chưa duyệt" bật | ĐẠT | ĐẠT | Có nhãn "chưa duyệt", nội dung 3732 → 9522 ký tự |
| 5 | Công tắc tắt | ĐẠT | ĐẠT | Ẩn ý chưa duyệt không thuộc nhóm an toàn (9522 → 3732). Cảnh báo an toàn vẫn hiện nhãn "chưa duyệt", đúng thiết kế (dòng 1976 `docs/index.html`) |
| 6 | Xuất có mật khẩu, file đã mã hoá | ĐẠT | ĐẠT | Không có "Thiamazole" dạng chữ trong file |
| 6 | Nhập đúng mật khẩu ra cùng dữ liệu | ĐẠT | ĐẠT | Đã xoá iốt trước khi nhập, sau khi nhập có lại. 11 sản phẩm, 5 lịch, 1 thành viên |
| 6 | Nhập sai mật khẩu báo lỗi | ĐẠT | ĐẠT | "Sai mật khẩu, hoặc file sao lưu đã bị sửa" |
| 6 | File không mật khẩu vẫn nhập được | ĐẠT | ĐẠT | |
| 6 | Nhập file "cũ" | KHÔNG KIỂM ĐƯỢC | KHÔNG KIỂM ĐƯỢC | Không có file bản cũ để thử |
| 7 | Ngoại tuyến: app mở lại được | ĐẠT | KHÔNG CHẠY | Chỉ chạy ở lượt sáng. Service worker điều khiển trang |
| 7 | Ngoại tuyến: Thư viện và Mục tiêu giap có dữ liệu | ĐẠT | KHÔNG CHẠY | Gia đình cũng còn dữ liệu |
| 8 | Không có lỗi JavaScript | ĐẠT | ĐẠT | pageerror và console.error đều 0 |
| 9 | Chữ không có từ cấm | LỖI (NHỎ) | LỖI (NHỎ) | Chữ chung cho cả hai lượt. Xem N3 |
| 10 | Không tràn ngang (scrollWidth ≤ 375) | ĐẠT | ĐẠT | 16 trang kiểm tra, lớn nhất 375 |

Ảnh đầy đủ: `ke-hoach/anh/qa/` (tiền tố `light-` và `dark-`), ví dụ `light-01-hom-nay-dau.png`, `light-03-tu-thuoc.png`, `light-09-gia-dinh.png`, `light-11-phieu-bac-si.png`, `light-14-sao-luu-nhap.png`, `light-15-ngoai-tuyen-thu-vien.png`.

## Danh sách lỗi

### LỚN

**L1. Mục tiêu gout không mở được và không tìm được trong Thư viện.**
- Nguyên nhân: `goalList()` (`docs/index.html`, khoảng dòng 1920) chỉ lấy `KB_TOPICS` (19 mục, không có gout) và `GOAL_EXTRA` (than, dinhduong, mo). `docs/data/khung.json` có mục tiêu `gout` ("Gout và acid uric") với 3 mục "Cần khám trước" và 9 dòng ý (`y`), nên dữ liệu có nhưng app không đưa vào danh sách.
- Cách tái hiện: Thư viện, gõ "gout" trong ô tìm kiếm → "Không tìm thấy 'gout'". Hoặc gọi `goGoal('gout')` → màn hình Thư viện chung, không có trang mục tiêu.
- Ảnh: `ke-hoach/anh/qa/light-07-tim-gout.png`, `light-08-muc-gout.png`, `dark-08-muc-gout.png`.
- Ảnh hưởng: Bước 3 của kế hoạch cần ý gout "không tự dùng TPCN thay thuốc hạ acid uric". Trong app hiện không đọc được nội dung này.

### NHỎ

**N1. Số cảnh báo trên hai thẻ thành viên không khớp và không theo đúng quy tắc "chỉ đếm nặng".**
- Thẻ "Sức khoẻ gia đình" trên Hôm nay ghi "8 cảnh báo": `docs/index.html` dòng 908 dùng `warningsFor(m).length`, đếm cả lưu ý nhẹ. Hôm nay cũng ghi "Còn 4 lưu ý nhẹ".
- Thẻ trang Gia đình ghi "6 cảnh báo": `banDoPhuSummary` (dòng 2100) chỉ đếm mức nặng.
- Ảnh: `light-02-hom-nay-cuoi.png` (8), `light-09-gia-dinh.png` (6).

**N2. Thẻ Gia đình đếm 3 "nguồn ghi cần tránh" đang chờ duyệt, còn Hôm nay không hiện.**
- Ba mục có `trang_thai: cho_duyet` (thuộc magie và vitamin D). Chúng được đếm trong 6 cảnh báo khi công tắc tắt, nhưng không hiện trên Hôm nay. Cần chủ kế hoạch quyết định: đếm hay không đếm.
- Ghi chú: việc cảnh báo an toàn chưa duyệt vẫn hiện trên tab Gợi ý là thiết kế có chủ ý (dòng 1976), không tính là lỗi.

**N3. Chữ có từ cần tránh trong nội dung hiển thị (`docs/kb.js`).**
- "chữa": dòng 10, 255, 281, 645, 658, 1149, 1163, 1526 (phần lớn là "Phòng và chữa thiếu ..." lấy từ NIH; dòng 645 "chữa được thiếu máu").
- "tốt nhất": dòng 16, 288, 611, 1089, 1379 (ví dụ "Hấp thu tốt nhất khi uống cùng bữa ăn").
- "100%": dòng 538 ("tài trợ 100%", thông tin sự kiện), 639, 1166.
- Dòng 94 là trích dẫn nguyên văn trong ngoặc, được miễn.
- Cần người duyệt nội dung quyết định sửa hay giữ.

## Chưa kiểm được
- Khối theo dõi trên Hôm nay (cần tạo chỉ số theo dõi).
- Cảnh báo cam và xám trên Hôm nay (dữ liệu thử không có).
- Nhập file bản sao lưu cũ (không có file mẫu).
- Mâu thuẫn và "Đã thử không thấy" của mục tiêu (dữ liệu thử không có).
- Ngoại tuyến ở lượt tối.

## Ghi chú về phiên kiểm tra
- Lần nạp đầu tôi gán thiamazole vào nhóm `giap_t4` (levothyroxine) thay vì `khang_giap`, làm sinh cảnh báo sai. Đã sửa bằng `nhomCua()` của app trước khi chạy kết quả trong bảng. Đây là lỗi của dữ liệu thử, không phải lỗi app.
- Ba ảnh `light-08-muc-gout.png`, `light-10-fam-lu.png`, `light-11-phieu-bac-si.png` có sẵn trong git (commit `ee6d186`) và đã bị ghi đè bằng ảnh mới cùng tên. Không có tệp nào bị xoá. Các ảnh khác cùng thư mục giữ nguyên trạng thái trong git.
- Không sửa `docs/`, `ke-hoach/du-lieu`, `ke-hoach/scripts`. Không commit, không push.
