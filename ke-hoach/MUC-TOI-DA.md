# Mức tối đa mới thêm ở phiếu 01 (chờ duyệt)

Chuẩn chính của app là EFSA (người lớn). Bảng NIH (`NUTR.ul` trong `docs/index.html`) chỉ dùng khi bạn đổi sang NIH ở Cài đặt, và để tham khảo.

## Mức đã thêm vào code

| Chất | Mức | Đơn vị | Nguồn | Năm | Độ chắc chắn |
|---|---|---|---|---|---|
| Cholin (choline), chuẩn NIH | 3500 | mg/ngày, người lớn | NIH ODS, Choline fact sheet (lấy từ Viện Y học Mỹ, IOM) | 1998 | chắc |

Chỉ có một mức này. Cholin chưa có mức EFSA đã kiểm chứng nên ở chế độ EFSA (mặc định) app vẫn chỉ đếm trùng và cộng tổng, không cảnh báo vượt mức.

## Chất mới thêm vào bảng chỉ để đếm trùng và cộng tổng liều (không có mức tối đa)

Ghi chú trong code: "Chưa có mức tối đa đã kiểm chứng."

| Chất | Ghi chú |
|---|---|
| Vitamin B1 (thiamin, benfotiamine) | NIH/IOM không đặt mức tối đa. EFSA: chưa kiểm chứng. |
| Vitamin B2 (riboflavin) | NIH/IOM không đặt mức tối đa. EFSA: chưa kiểm chứng. |
| Vitamin B5 (axit pantothenic, canxi pantothenat) | NIH/IOM không đặt mức tối đa. EFSA: chưa kiểm chứng. Canxi pantothenat tính vào B5, không tính vào canxi. |
| Vitamin B12 | NIH/IOM không đặt mức tối đa. EFSA: chưa kiểm chứng. |
| Biotin | NIH/IOM không đặt mức tối đa. EFSA: chưa kiểm chứng. |
| CoQ10 | Chưa có mức tối đa đã kiểm chứng. |
| Lutein và Zeaxanthin | Chưa có mức tối đa đã kiểm chứng. |
| Astaxanthin | Chưa có mức tối đa đã kiểm chứng. Tôi nhớ EFSA có nêu mức dùng an toàn khoảng 8 mg/ngày (ý kiến 2014) nhưng không chắc, nên không thêm. Cần kiểm chứng. |

## Magie và canxi

Đã có sẵn trong `NUTR` (mg: EFSA 250 mg, NIH 350 mg; ca: EFSA 2500 mg, NIH 2500 mg). Mọi dạng muối (citrate, oxide, bisglycinate, malate...) khớp về chất gốc nhờ mẫu tên `magnes|magie|hořčík` và `calci|canxi|vápník`. Đã chạy thử: magie citrate (200 mg) cộng multivitamin có magie oxide (100 mg) ra tổng 300 mg, báo "Trùng hoạt chất: Magie" và "Vượt mức tối đa: Magie" (EFSA 250 mg).

## Chất chưa có mức đã kiểm chứng (cần Opus hoặc bạn kiểm tra nếu muốn cảnh báo vượt mức)

Vitamin B1, B2, B5, B12, biotin, cholin (theo EFSA), CoQ10, lutein và zeaxanthin, astaxanthin. Ngoài ra 59 chất khác trong kho kiến thức vẫn chưa có trong bảng kiểm tra trùng (phiếu này chỉ làm nhóm ứng viên trong phiếu).
