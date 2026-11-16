# Chấm lại mức bằng chứng các dòng độ chắc thấp

File kết quả: `du-lieu/cham-muc-lai.csv`, cùng cột với `cham-muc.csv`. Áp dụng SAU `cham-muc.csv` và `cham-muc-tai-lieu.csv`, ghi đè theo `ma_y`.

## Thống kê

- Đã đưa vào file: **92 dòng** (22 từ `cham-muc.csv`, 70 từ `cham-muc-tai-lieu.csv`), tức mọi dòng có `do_chac = thap`.
- Đã tra cứu web và chấm lại có nguồn: **12 dòng**, chọn theo thứ tự ưu tiên (magie–giấc ngủ, kẽm–miễn dịch, CoQ10–statin, tuyến giáp, dạ dày, gan, an toàn ở trẻ).
- 80 dòng còn lại giữ nguyên mức cũ, `do_chac = thap`, ghi "chưa tra được nguồn riêng, không có thêm bằng chứng".
- Đổi mức: **3 dòng**
  - Y-b6-thai-d97bc5: R1 → R2
  - T-coq10-metmoi-28725d: R3 → R2
  - T-vitC-tieuhoa-a8c657: R3 → R− (đề xuất đổi hướng loi → khong)
- Lên độ chắc cao: **0**. Lên vừa: 12.

## Thay đổi quan trọng về an toàn

1. **Cơm cháy (T-sambucus-ho-e041da, T-sambucus-mien-5a1125)**: chưa xác lập liều và an toàn cho trẻ nhỏ. Quả sống và các bộ phận cây chưa chế biến có độc. Câu gốc "dùng được cho trẻ sơ sinh" phải bị bác bỏ.
2. **Magie và tuyến giáp (T-mg-giap-86623a)**: không có bằng chứng magie làm nặng bệnh tuyến giáp. Nguy cơ thật là magie làm giảm hấp thu levothyroxin, nên uống cách nhau ít nhất 4 giờ. Nên đưa vào `tuong-tac.csv` (việc của phiên khác, file này không sửa).
3. **Vitamin C và loét dạ dày (T-vitC-tieuhoa-a8c657)**: các phân tích gộp không thấy vitamin C tăng tỷ lệ diệt H. pylori. Không nên khuyên dùng để lành loét.
4. **B6 khi mang thai (Y-b6-thai-d97bc5)**: ACOG vẫn coi là lựa chọn đầu tay, nhưng Cochrane đánh giá bằng chứng còn hạn chế. Hạ xuống R2 và giữ lời dặn cần bác sĩ hướng dẫn.
5. **Kẽm (T-zn-mien-cff89e)**: theo Cochrane 2024, kẽm có thể rút ngắn cảm lạnh nhưng độ chắc thấp, không phòng được bệnh và tăng tác dụng phụ nhẹ.

## Các dòng vẫn không chắc

- 80 dòng chưa tra được, nhất là ashwagandha, St John's wort, men vi sinh, allulose, sỏi mật (taurine, TUDCA, atiso, cây kế sữa) và gout (luteolin, vitamin D).
- T-coq10-metmoi-28725d: các phân tích gộp trái chiều nhau. R2 là mức lạc quan, cần người duyệt.
- T-om3-gan-*: omega-3 giảm mỡ gan, nhưng lời khuyên "ưu tiên EPA" không có cơ sở, và một phân tích gộp còn nghiêng về DHA.
- Các nguồn ghi theo tên tác giả hoặc tạp chí và năm, lấy từ kết quả tìm kiếm, chưa đọc toàn văn. Người duyệt cần kiểm lại trước khi đánh dấu `da_duyet`.
