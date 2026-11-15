# Chấm mức nghiên cứu (giai đoạn 4, bản nháp)

File kết quả: `du-lieu/cham-muc.csv`. Phạm vi: 114 dòng có `muc_ncuu` rỗng trong `bang-y.csv` (đã bỏ các dòng ghi chú "đề nghị chuyển bo"). Tất cả chấm dựa trên câu `noi_dung` và nguồn gốc của dòng; không tra cứu web, nên cột `nguon_kiem_chung` để trống. Một số lý do có nhắc tên thử nghiệm lớn (VITAL, SELECT, HOPE...) theo kiến thức chung, cần người duyệt kiểm lại.

## Thống kê

| Mức | Số dòng |
|---|---|
| R1 | 1 |
| R2 | 63 |
| R3 | 33 |
| R0 | 14 |
| R− | 3 |
| **Tổng** | **114** |

Độ chắc: cao 35, vừa 57, **thấp 22**.

## Đề xuất đổi `huong` (loi → khong)

| ma_y | Lý do |
|---|---|
| Y-b6-tim-92cdd2 | Thử nghiệm hạ homocysteine bằng B6 không giảm biến cố tim mạch. Độ chắc thấp, vì cùng câu còn gộp trí nhớ và ung thư |
| Y-vitE-tim-643b5a | Các thử nghiệm lớn không thấy lợi ích tim mạch, dù câu gốc viết "không thống nhất" |
| Y-vitE-nao-7b04f3 | Câu gốc: "phần lớn nghiên cứu không thấy lợi ích rõ" |

Cả 3 dòng chấm R−. Nếu người duyệt không đồng ý đổi hướng thì hạ xuống R2.

## 10 dòng cần người duyệt trước

1. **Y-se-giap-8966a4** (selen, tuyến giáp): R2. Chỉ số thay đổi nhưng ý nghĩa lâm sàng chưa rõ, và chỉ thấy liên quan ở phụ nữ.
2. **Y-mg-xuong-efa082** (magie, xương): R3 (vừa). Cần kiểm xem có RCT về mật độ xương không.
3. **Y-ca-xuong-6ea4ab** (canxi, xương ở nam): R2. Liên quan an toàn tim/thận khi dùng canxi viên.
4. **Y-vitK-xuong-61a620** (vitamin K, xương): R2. Thử nghiệm chủ yếu ở phụ nữ sau mãn kinh.
5. **Y-mn-xuong-6c6966** (mangan, xương): R3. Chỉ dữ liệu động vật.
6. **Y-gluco-khop-f4e5ae** và **Y-gluco-khop-644216** (glucosamine, khớp): R2. Có thể nghiêng R− vì các thử nghiệm lớn như GAIT phần lớn âm tính.
7. **Y-boswellia-khop-899e7d** (nhựa trầm hương, khớp): R2. Kho Obsidian và NCCIH đánh giá khác nhau.
8. **Y-om3-tim-2c749a** (omega-3, tim): R2. Có thể tách thành 2 dòng: người khoẻ ở liều 1 g (gần R−) và REDUCE-IT (R1/R2 cho nhóm hẹp).
9. **Y-vitE-tim-643b5a** (vitamin E, tim): đề xuất R− và đổi hướng.
10. **Y-valerian-ngu-6fd5bf** (nữ lang, giấc ngủ): R2. Câu "không nhất quán" khớp với R2. Ngoài ra **Y-creatine-ngu-718708** (độ chắc thấp) cũng cần xem.

## Chỗ chưa chắc khác

- **Y-b6-thai-d97bc5**: chấm R1 theo kiến thức chung (ACOG khuyến cáo, có tổng quan Cochrane). Câu gốc không nêu mức bằng chứng nên cần kiểm.
- Các câu gộp nhiều mục tiêu (ashwagandha "hen, thể thao, nhận thức...", probiotic "các tình trạng còn lại", curcumin "mọi mục đích") khó chấm một mức chung. Nên tách hoặc chuyển bo.
- Có 5 dòng `CHUA_CO` (các dạng canxi) được chấm R0 vì thiếu nguồn.
