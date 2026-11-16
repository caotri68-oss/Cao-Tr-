# Ghép Ý từ tài liệu vào Bảng Ý (chấm mức và ghép)

Trạng thái: **chờ duyệt**. Mọi dòng `T-…` vẫn `cho_duyet` (hoặc `bo`), nên chế độ `da_duyet` của app không đổi.

## Đã làm

- `du-lieu/cham-muc-tai-lieu.csv`: chấm `muc_ncuu` cho đủ 216 Ý của `y-tai-lieu.csv`, cùng cột với `cham-muc.csv`. Mức là **bằng chứng nghiên cứu thế giới cho khẳng định đó**, không phải mức tin vào tác giả. Chấm theo kiến thức chung về các hướng dẫn và thử nghiệm lớn, **không tra web trong lượt này**. Cột `nguon_kiem_chung` chỉ ghi tài liệu đã biết rõ (NIH ODS, USPSTF, Cochrane, thử nghiệm lớn); để trống khi không chắc. Không đề xuất đổi `huong`, để giữ đúng lời tác giả.
- `scripts/chuyen-bang-y.js`: nối `y-tai-lieu.csv` vào `bang-y.csv`, giữ `ma_y` gốc `T-…`. Thêm 7 chất mới vào `chat.csv`. Chất chỉ có 1 Ý thì để `trang_thai=bo`, ghi chú "chất chưa có trong kho".
- `scripts/tinh-tang.js`, `scripts/xuat-app.js`: áp thêm `cham-muc-tai-lieu.csv` (hàm `apChamMuc` nhận nhiều file chấm).
- **Đổi logic tầng** (đã thêm 4 kiểm thử, cả 25 kiểm thử đều đạt). Áp cho dòng của nguồn **không chính thức** mà bị chấm R− ("bị bác"):
  - Dòng `loi` bị bác thì không được tính là ủng hộ. Nếu cặp không còn dòng `loi` nào khác thì xếp tầng **X** (nguồn nói có lợi, nhưng nghiên cứu không ủng hộ).
  - Dòng `hai` bị bác thì **không bật cảnh báo đỏ**. Ví dụ: Ý "bà bầu không nên dùng axit folic".
  - Trong `bang-y.csv` cũ không có dòng nào thuộc loại này, nên tầng của các cặp cũ không đổi vì quy tắc mới.
- `nguon.csv`: `dua_vao` của BS-PHUC và C-THAO để trống. Các ghi chú "dẫn: …" giữ nguyên trong `ghi_chu`, chưa dùng để tính độc lập.

## Thống kê mức (216 Ý)

| Mức | Số Ý |
|---|---|
| R1 | 24 |
| R2 | 50 |
| R3 | 94 |
| R0 | 35 |
| R− | 13 |

Độ chắc: cao 26, vừa 120, **thấp 70**.

13 Ý bị chấm R−:

| Ý | Nội dung |
|---|---|
| T-folic-thai-5067f7 | Bà bầu không nên dùng axit folic |
| T-folic-nao-95005d | Axit folic làm nặng tự kỷ |
| T-vitD-thieu-182934 | Vitamin D 5.000 UI tới 50–70 ng/mL |
| T-vitD-thieu-04eb2e | 5.000 IU là liều sinh lý an toàn |
| T-vitD-xuong-d2682e | Giao thức Coimbra cho loãng xương |
| T-mg-co-b1ed57 | Magie trị chuột rút |
| T-zn-than-0e7932 | Mọi bệnh thận do thiếu kẽm |
| T-om3-mat-6d0203 | Omega-3 tốt cho thị lực |
| T-om3-tim-b5858d | Omega-3 thay được thuốc |
| T-om3-nao-8bcc48 | DHA cho não người cao tuổi |
| T-b6-tim-522a1a | B6 giảm xơ vữa |
| T-curc-tieuhoa-21d73c | Nghệ "tẩy sỏi mật" |
| T-giamtao-tieuhoa-6c522a | Giấm táo "tẩy sỏi mật" |

## Ý bị `bo` và chất mới

- **16 Ý bị bo** vì chất chỉ có 1 Ý: ganbo, butyrate, taurine, tudca, matbo, atiso, milkthistle, krill, luteolin, fructose, stevia, lahan, aspartame, sucralose, tinhdau, nuocmuoi.
- **7 chất mới** trong `chat.csv`:

| Mã | Tên | Nhóm |
|---|---|---|
| silic | Silic | Khoáng chất |
| allulose | Allulose | Chất tạo ngọt |
| tinhbotkhang | Tinh bột kháng | Chất xơ |
| giamtao | Giấm táo | Thực phẩm |
| xylitol | Xylitol | Chất tạo ngọt |
| sambucus | Cơm cháy (elderberry) | Thảo dược |
| mobo | Mỡ bò (dùng ngoài da) | Dùng ngoài |

- `bang-y.csv` có 480 dòng (thêm 216 dòng). `khung.json` có 390 dòng Ý dùng được.

## Bảng tầng: trước và sau

| Chế độ | A | B | C | D | X | K | Tổng cặp |
|---|---|---|---|---|---|---|---|
| da_duyet, trước | 20 | 0 | 0 | 0 | 0 | 0 | 20 |
| da_duyet, sau | 20 | 0 | 0 | 0 | 0 | 0 | 20 |
| xem_truoc, trước | 22 | 49 | 47 | 9 | 0 | 18 | 145 |
| xem_truoc, sau | 29 | 59 | 100 | 25 | **5** | 25 | 243 |

## Cặp tầng X mới (xem_truoc)

| Cặp | Trước | Lý do |
|---|---|---|
| vitD + tamtrang | K | NIH: không có tác dụng (VITAL-DEP). BS-PHUC: có lợi (R2). Mâu thuẫn thật |
| coq10 + co | K | NCCIH: không ủng hộ. C-THAO: đau cơ do statin là vì thiếu CoQ10. Mâu thuẫn thật |
| b12 + metmoi | K | NIH: không tăng năng lượng ở người đủ B12. C-THAO: mệt là triệu chứng thiếu B12. **Khác đối tượng, không thật sự mâu thuẫn**. Nên tách ý hoặc ghi rõ "khi thiếu" |
| b6 + tim | K | BS-PHUC: B6 giảm xơ vữa, bị bác (HOPE-2, NORVIT) |
| zn + than | ∅ | BS-PHUC: "mọi bệnh thận do thiếu kẽm", bị bác. Còn dòng `hai` "kẽm có thể gây sỏi" (R3) nên có cảnh báo đỏ |

## Cặp đổi tầng ở các mục tiêu chính (xem_truoc)

Ký hiệu: ∅ nghĩa là trước chưa có dữ liệu; dấu ! nghĩa là có cảnh báo đỏ.

| Mục tiêu | Thay đổi |
|---|---|
| giap | inositol ∅→C; mg ∅→K!; vitD ∅→D; zn ∅→C |
| than | b6 ∅→C; cacitrat ∅→D; mg ∅→K; vitD ∅→K!; zn ∅→X! |
| tieuhoa | b12 ∅→C; cacarbonat ∅→K; cacitrat ∅→A; curc ∅→D; giamtao ∅→D; honey ∅→K!; mg ∅→C; mgcitrat ∅→A; mgoxit ∅→A; om3 ∅→C; tinhbotkhang ∅→C; vitC ∅→C |
| ngu | b6, bcomplex, ca, fe, honey, mgoxit, mgthreonat, om3, vitC, zn: ∅→C; coq10, vitE ∅→D; **mg ∅→B!** |
| xuong | ca B→A; silic ∅→C; xylitol ∅→C |
| khop | ca, mg, silic, vitD: ∅→D |
| tim | b6 K→X; coq10 ∅→B; fe ∅→K!; om3 C→B; silic ∅→D; xylitol ∅→K!; zn ∅→C |
| thai | không đổi: folic + thai vẫn **A**, cảnh báo đỏ từ Ý "không nên dùng axit folic" đã bị bác nên không hiện |

## 15 Ý quan trọng nhất cần người duyệt

1. **T-folic-thai-5067f7** (C-THAO, hại): "bà bầu không nên dùng axit folic". Chấm R− (USPSTF 2023, CDC: axit folic phòng dị tật ống thần kinh, kể cả người có MTHFR). Đề nghị chuyển `bo` hoặc hiện kèm lời bác rõ ràng.
2. **T-folic-thai-91049b** (BS-PHUC): folate 400 mcg trước và đầu thai kỳ, R1. Giữ.
3. **T-folic-thai-516e91** (C-THAO): 5-MTHF tốt hơn axit folic, R0. Chưa có thử nghiệm về kết cục dị tật.
4. **T-folic-nao-95005d** (C-THAO, hại): axit folic làm nặng tự kỷ, R−.
5. **T-mg-ngu-02a75c** (C-THAO, hại, R0): magie làm nặng ngưng thở khi ngủ. Không có nghiên cứu, nhưng vẫn bật cảnh báo đỏ cho magie + giấc ngủ. Cần quyết định `bo` hay giữ.
6. **T-mg-ngu-555f6c** (BS-PHUC): magie hằng ngày giúp ngủ, R2 (bằng chứng chất lượng thấp). Cặp magie + giấc ngủ lên B chỉ nhờ dòng này.
7. **T-mg-giap-86623a** (C-THAO, hại, R0): magie làm nặng rối loạn tuyến giáp. Không có nghiên cứu, nhưng bật cảnh báo đỏ ở cặp magie + giáp. Tương tác thật là magie làm giảm hấp thu levothyroxin.
8. **T-vitD-thieu-182934** và **T-vitD-thieu-04eb2e** (5.000 UI/ngày): R−, vì vượt mức tối đa 4.000 UI và thử nghiệm không thấy lợi.
9. **T-vitD-giap-30bba6**, **T-vitD-mien-a72cca**, **T-vitD-xuong-d2682e** (giao thức Coimbra 60.000–200.000 IU): R0/R0/R−. Nên chặn liều này khỏi app.
10. **T-coq10-co-ae5427** (C-THAO, CoQ10 cho đau cơ do statin): R2. Cặp này thành X với NCCIH.
11. **T-coq10-mo-7220f8** ("statin làm giảm CoQ10", R1): đây là một dữ kiện, không phải lợi ích của CoQ10 với mỡ máu, nhưng lại đẩy cặp coq10 + mo lên **A**. Tương tự với **T-cacitrat-tieuhoa-8333b1** (canxi citrat + tiêu hoá lên A) và **T-ca-xuong-17337e** (canxi + xương từ B lên A). Đề nghị đổi các dòng này sang `bo` hoặc tách thành "ghi chú hấp thu".
12. **T-zn-than-0e7932** và **T-zn-than-6a08db** (kẽm + thận): R− và R3. Cặp thành X! Kiểm lại xem có nên giữ cảnh báo sỏi không.
13. **T-vitD-tamtrang-4d540f** (BS-PHUC, vitamin D cho trầm cảm): R2. Thành X với NIH. Đây là mâu thuẫn thật, nên hiện cả hai bên.
14. **T-b12-metmoi-a2b0a0** (C-THAO): tạo X giả với NIH vì khác đối tượng. Nên sửa nội dung thành "khi thiếu B12" hoặc gán sang `thieu`.
15. **T-om3-tim-b5858d** (BS-PHUC, "omega-3 thay được thuốc"): R−. Đề nghị `bo` hoặc hiện cảnh báo không tự bỏ thuốc. Cùng nhóm cần xem: **T-curc-tieuhoa-21d73c** và **T-giamtao-tieuhoa-6c522a** ("tẩy sỏi mật", R−), **T-tinhdau-ho-4a95ba** (tinh dầu vào miệng trẻ, đã `bo` nhưng nguy hiểm).

## Chỗ chưa chắc

- Chưa tra web trong lượt này. 70 Ý có độ chắc thấp, chủ yếu các chất ít nghiên cứu (silic, bo, allulose, inositol, men vi sinh bào tử).
- Ranh giới R2/R3 với magie–giấc ngủ, kẽm–miễn dịch và CoQ10–statin là chỗ dễ tranh cãi nhất.
- Các dòng "dữ kiện" (hấp thu, nhu cầu) chấm R1 vì dữ kiện đúng, nhưng tầng A ở cặp tương ứng dễ bị hiểu thành "có lợi" (xem mục 11).
- Dòng `hai` chấm R0 (không có nghiên cứu) vẫn bật cảnh báo đỏ theo quy tắc cũ. Quy tắc mới chỉ tắt cảnh báo khi dòng bị chấm R−.
