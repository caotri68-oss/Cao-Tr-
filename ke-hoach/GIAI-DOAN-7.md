# Giai đoạn 7: Hồ sơ sức khoẻ, gợi ý ngược và chặn tương tác thuốc

Trạng thái: **chờ duyệt**. Ngày soạn: 2026-11-15. Dữ liệu tương tác: `du-lieu/tuong-tac.csv`.

Riêng tư: file này và CSV chỉ viết theo **nhóm thuốc và chất**. Không ghi tên, tuổi, bệnh hay xét nghiệm của ai. Hồ sơ thật chỉ nằm trong máy.

## 1. Nguyên tắc

1. **An toàn trước, gợi ý sau.** Lọc chặn chạy trước khi xếp hạng gợi ý. Một chất bị chặn không bao giờ hiện trong danh sách gợi ý, kể cả tầng A.
2. An toàn là trục riêng, đè lên tầng A–X (luật cứng 3 của LO-TRINH).
3. Mỗi cảnh báo kèm câu **"Để hỏi bác sĩ, dược sĩ"** và nguồn.
4. App không kết luận y khoa. Không khớp được thuốc thì báo "chưa nhận ra thuốc này", không im lặng.

## 2. Hồ sơ mỗi người

Mở rộng đối tượng `member` đang có (đã có `conditions`, `meds`, `allergies` dạng chữ tự do, `weight`, `born`, `profile`). Thêm khoá `hs` (hồ sơ có cấu trúc), giữ nguyên các ô cũ để không vỡ cảnh báo hiện có.

```js
member.hs = {
  benh: [{ma:'giap'}, {ma:'tim'}, {tu_do:'...'}],      // ma lấy từ muc-tieu.csv
  thuoc: [{ten:'...', nhom:['statin'], tu_nhan:true, lieu:'', tu:'2026-01-01'}],
  xn: [{ten:'TSH', gia_tri:'', don_vi:'', ngay:'YYYY-MM-DD'}],
  can_nang: [{kg:0, ngay:'YYYY-MM-DD'}],
  thai: '' | 'mang_thai' | 'cho_bu',
  di_ung: '...',                                        // dùng tiếp ALG hiện có
  cap_nhat: 'YYYY-MM-DD'
}
```

- **Bệnh nền:** chọn nhiều từ `muc-tieu.csv` (23 mã) + ô tự do. Ô tự do vẫn được dò bằng regex (như `R_THY`, `R_AUTO` đang làm với `conditions`).
- **Thuốc:** gõ tên → app chạy bảng `NHOM_THUOC` (mục 4) → hiện chip nhóm đã nhận. Người dùng sửa được chip. Không nhận ra → chip xám "chưa nhận ra, hỏi dược sĩ".
- **Xét nghiệm:** tên, giá trị, đơn vị, ngày. Chỉ hiển thị và nhắc "đã lâu chưa làm" theo cột `can_kham_truoc` của mục tiêu; không chẩn đoán từ giá trị ở giai đoạn này.
- **Cân nặng:** lịch sử theo ngày (dùng chung với Nhật ký đang có).
- **Mang thai / cho bú:** khi bật, áp mức tối đa riêng và chặn các chất có ghi chú thai kỳ (vd. men gạo đỏ, vitamin A liều cao) — cần thêm dòng nhóm `thai` vào CSV ở bước sau.
- **Dị ứng:** giữ ô `allergies` và bộ dò `ALG`.

Lưu trữ: trong `S.members` (localStorage) như hiện nay, nên tự vào `exportAll()` và đồng bộ Drive đã mã hoá AES-GCM (`dEncrypt`). **Lưu ý:** file sao lưu tải về (`exportAll`) hiện là JSON **không mã hoá**; chỉ bản đồng bộ Drive là mã hoá. Đề xuất: thêm tuỳ chọn "Sao lưu có mật khẩu" dùng lại `dEncrypt` trước khi lưu hồ sơ có xét nghiệm.

## 3. Luồng gợi ý ngược

```
Hồ sơ ─► Mục tiêu (bệnh nền + mục tiêu người dùng chọn)
      ─► Danh sách chất theo tầng (Bảng Ý, chỉ da_duyet)
      ─► BƯỚC CHẶN: với mỗi chất, tra tuong-tac.csv theo (nhóm thuốc của người, chất)
           chan        → bỏ khỏi gợi ý, đưa vào khung "Không nên dùng" kèm lý do
           than_trong  → giữ, viền đỏ, hiện cơ chế + khuyến nghị
           luu_y       → giữ, dòng chữ nhỏ
         + ghi_chu_an_toan của muc-tieu.csv, dị ứng (ALG), thai kỳ, mức tối đa (NUTR)
      ─► Xếp hạng: tầng A > B > C; trong cùng tầng, chất không cảnh báo lên trước
      ─► Hiện: "Để hỏi bác sĩ, dược sĩ" + nút tạo danh sách câu hỏi
```

Cùng bảng tra cũng chạy chiều thuận: sản phẩm trong Tủ thuốc đang uống × thuốc của người → cảnh báo ở Hôm nay (thay dần `DRUG`).

### Mức cảnh báo

| `muc_do` | Ý nghĩa | Trong gợi ý | Trong cảnh báo Hôm nay | Ánh xạ `lv` cũ |
|---|---|---|---|---|
| `chan` | Chống chỉ định hoặc rủi ro nặng | Không gợi ý | Đỏ, không có nút "Bỏ qua" | 3 |
| `than_trong` | Dùng được nếu cách giờ/giảm liều/theo dõi | Gợi ý, viền đỏ | Cam, cho bỏ qua | 2 |
| `luu_y` | Thông tin, theo dõi xét nghiệm | Gợi ý bình thường + chú thích | Xám | 1 |

## 4. Mã nhóm thuốc (`nhom_thuoc`)

| Mã | Nhóm | App đã nhận? | Regex đề xuất (thêm/ghép) |
|---|---|---|---|
| `khang_giap` | Kháng giáp: thiamazole/methimazole, PTU | Có (một phần `R_THY`, DRUG `thyrozol`) | tách khỏi `R_THY`: `thyrozol|thiamazol|methimazol|tapazol|metizol|propylthiouracil|carbimazol` |
| `giap_t4` | Hormone giáp: levothyroxine | Có (DRUG `levo`, `R_THY`) | `levothyrox|euthyrox|letrox|thyrax|synthroid` |
| `chen_beta` | Chẹn beta | Một phần (trong `R_BP`) | `bisoprolol|concor|metoprolol|betaloc|nebivolol|atenolol|carvedilol|propranolol|nadolol` |
| `statin` | Statin | **Thiếu** (chỉ simvastatin/atorvastatin lẻ trong HERB) | `statin|simva|atorva|rosuva|prava|fluva|pitava|lovastatin|sortis|torvacard|crestor|zocor` |
| `ppi` | Ức chế bơm proton | Có (DRUG `ppi-fe`, chưa đặt tên) | giữ regex `ppi-fe` |
| `chong_dong` | Warfarin, acenocoumarol, DOAC | Có (`R_WARF`) | giữ `R_WARF`; thêm cờ `khang_vitK` cho warfarin/acenocoumarol |
| `khang_tieu_cau` | Aspirin, clopidogrel, ticagrelor, prasugrel | Một phần (trong DRUG `bleed`) | `clopidogrel|plavix|ticagrelor|brilique|prasugrel|aspirin|anopyrin|godasal|acylpyrin` |
| `tieu_duong` | Thuốc tiểu đường | Có (`R_DIAB`) | giữ |
| `ace_arb` | ACEi/ARB | Một phần (trong `R_BP`, DRUG `ace-iodine`) | `pril\b|sartan|prestarium|tritace|zestril` |
| `thiazide` | Lợi tiểu thiazide và giống thiazide | Một phần (trong `R_BP`) | `hydrochlorothiazid|indapamid|chlortalidon|tensiomin` |
| `bisphos` | Bisphosphonat | **Thiếu** | `alendron|risedron|ibandron|fosamax|bonviva|actonel` |
| `levodopa` | Levodopa | Có (DRUG `levodopa-fe`) | giữ |
| `doi_khang_dopa` | Đối kháng dopamine (metoclopramide, thuốc chống loạn thần) | **Thiếu** | `metoclopramid|haloperidol|risperidon|olanzapin|quetiapin` (chưa có dòng tương tác TPCN đủ 2 nguồn) |
| `ssri` | SSRI và thuốc tác động serotonin | Một phần (trong HERB `sjw`) | tách regex trong HERB `sjw` |
| `an_than` | An thần, gây ngủ | Có (`R_SEDA`) | giữ |
| `quinolon` | Kháng sinh quinolon | Có (DRUG `abx`, gộp) | `cipro|levoflox|moxiflox|oflox|norflox` |
| `tetra` | Tetracyclin, doxycyclin | Có (DRUG `abx`, gộp) | `doxycyc|tetracyc|minocyc` |
| `ucmd` | Ức chế miễn dịch | Có (`R_IMMS`) | giữ (chưa có dòng mới) |
| `chong_dong_kinh` | Chống động kinh | Có (`R_EPI`) | giữ |
| `hiv_pi` | Ức chế protease HIV | Có (`R_PROT`) | giữ |

Tự miễn (`R_AUTO`) là **bệnh nền**, không phải nhóm thuốc; giữ ở chiều bệnh.

## 5. Nối với app hiện có

**Tái dùng:**
- Các regex `R_*` làm nền cho `NHOM_THUOC`.
- `warningsFor()`, `warnCard()`, thang `lv` 1–3, `S.dismissed`, nút "Bỏ qua" (chỉ cho `lv<3`).
- `herbWarnings()` và bảng `HERB` (nguồn NCCIH): giữ nguyên, sau này chuyển dần sang CSV.
- `hasN()`, `nutrKey()`, `aliasKey()` để biết sản phẩm chứa chất nào (mã chất trùng `chat.csv`).
- Bộ dò dị ứng `ALG`, mức tối đa `NUTR`/`limitOf`, `SPACING`.
- Sao lưu `exportAll`/`restore`, đồng bộ mã hoá `dEncrypt`/`dDecrypt`.
- `vProfile()` (trang hồ sơ đọc từ `m.profile`) làm khung hiển thị.

**Thêm mới:**
- `NHOM_THUOC` (mã → regex) và hàm `nhomCua(tenThuoc)`.
- Nạp `tuong-tac.csv` thành `TT` (build sang JS như các bảng khác) và hàm `ttFor(member, maChat)` trả về mức cao nhất.
- `member.hs` + màn hình nhập có cấu trúc.
- Hàm `goiYNguoc(member)` theo luồng mục 3.
- Chuyển dần `DRUG` sang `TT`: các dòng `levo`, `abx`, `thyrozol`, `warfarin`, `bleed`, `vite-bleed`, `levodopa-fe`, `ppi-fe` đã có tương đương trong CSV. Giữ `mtx-folic`, `epi-folic`, `retinoid-a`, `inh-niacin`, `ace-iodine`, `concor-*` cho tới khi CSV có dòng đủ nguồn.

## 6. Màn hình và thứ tự làm (giao agent code)

1. **Dữ liệu nền:** build `tuong-tac.csv` → `TT`; thêm `NHOM_THUOC`; viết test nhỏ cho regex (tên thuốc thường gặp ở Séc/Việt).
2. **Sửa hồ sơ** (tab Gia đình → người → "Hồ sơ sức khoẻ"): bệnh nền (chip từ muc-tieu + ô tự do), thuốc (gõ tên → chip nhóm tự nhận, sửa được), xét nghiệm (bảng 3 cột + ngày), cân nặng, thai/cho bú, dị ứng. Di chuyển dữ liệu: điền sẵn từ `conditions`/`meds` cũ.
3. **Cảnh báo Hôm nay dùng `TT`:** thay `DRUG` bằng tra bảng; giữ giao diện `warnCard`.
4. **Trang "Gợi ý cho [người]":** ba khung theo thứ tự: ⛔ Không nên dùng (chan) → ⚠ Dùng được nhưng cần hỏi (than_trong) → ✓ Gợi ý theo tầng. Mỗi thẻ: chất, tầng, lý do, nguồn, "Để hỏi bác sĩ, dược sĩ".
5. **Phiếu hỏi bác sĩ:** gom thuốc + TPCN định dùng + các dòng cảnh báo thành một trang in/chia sẻ.
6. **Sao lưu có mật khẩu** cho file tải về.
7. Build APK (phiên APK).

Bước 1–3 không cần Bảng Ý; bước 4 cần giai đoạn 4 (chấm tầng) xong.

## 7. Quy tắc nguồn của `tuong-tac.csv`

- Mỗi dòng ≥2 nguồn từ hai nhà xuất bản khác nhau. Các viện thuộc NIH (ODS, NCCIH, NLM/MedlinePlus, NIDDK/LiverTox) được tính là nhà xuất bản khác nhau vì biên soạn riêng; nếu muốn chặt hơn (NIH = 1), các dòng TT-004/005/006/010/016/020/039/040 cần thêm một nguồn ngoài NIH (nhãn thuốc hoặc BNF).
- Nhãn thuốc không chắc URL thì ghi tên tài liệu và mục.
- Mã chất chưa có trong `chat.csv`: `men gạo đỏ` (đề xuất `redyeast`), `kali` (đề xuất `k`).

## 8. Cần kiểm chứng (chỉ có 1 nguồn hoặc nguồn yếu, KHÔNG đưa vào CSV)

1. **Berberin với thuốc tiểu đường** (cộng hạ đường huyết; berberin có thể tăng nồng độ metformin). Chỉ tìm thấy trang dược thương mại và nghiên cứu trên chuột. Cần NCCIH/LiverTox hoặc Natural Medicines.
2. **Canxi với chẹn beta** (giảm hấp thu bisoprolol/atenolol) — app đang có dòng `concor-ca` từ ghi chú cá nhân; chưa tìm được nhãn thuốc hay ODS xác nhận.
3. **Magie với chẹn beta** (cộng hạ huyết áp) — chỉ có ghi chú cá nhân.
4. **Ginseng, ashwagandha, tỏi, glucosamin với thuốc tiểu đường / chống đông** — mới có NCCIH (đang trong HERB), thiếu nguồn thứ hai.
5. **CoQ10 với warfarin** — NCCIH nói bằng chứng không nhất quán; thiếu nguồn thứ hai.
6. **Vitamin B6 với levodopa** — chỉ còn ý nghĩa khi dùng levodopa không có carbidopa; cần nhãn thuốc.
7. **Thuốc đối kháng dopamine với TPCN** — chưa tìm thấy tương tác TPCN nào đủ 2 nguồn.
8. **Cỏ St. John với thuốc tiểu đường** — dòng chung về CYP3A4, chưa có nguồn riêng cho nhóm này.
9. **Mang thai/cho bú** — cần làm bộ dòng riêng (men gạo đỏ, vitamin A, thảo dược) ở đợt sau.
10. **Chẹn beta với kali** — chẹn beta có thể làm tăng kali nhẹ; chưa có 2 nguồn cho mức TPCN.
