# Ý trích từ tài liệu bài viết (BS. Phúc, chị Thảo Nguyên)

Trạng thái: chờ duyệt. Dữ liệu ở `ke-hoach/du-lieu/y-tai-lieu.csv`, cùng cột với `bang-y.csv`. Mọi dòng `cho_duyet`, `muc_ncuu` để trống (chấm sau).

## Phạm vi và cách làm

- Đọc từ Google Drive (chỉ đọc): `tai-lieu-bs-tran-van-phuc-v2.json` (**25 bài**, nguồn BS-PHUC) và `tai-lieu-thao-nguyen.json` (**18 bài**, nguồn C-THAO). Tổng 43 bài.
- Số Ý tách được: **216** (BS-PHUC 106, C-THAO 110). Hướng: lợi 191, không tác dụng 8, hại/tránh 17.
- 29 bài có ít nhất một Ý; 14 bài không có Ý nào (lý do ở cuối).
- Hai file JSON là bản đã được người biên tập viết lại gọn, kèm nhãn mức tin cậy (`khop`, `ykien`, `chuakc`, `trai`) và ghi chú rà soát. `trich_dan` là câu nguyên văn của bản JSON đó (mục tóm tắt, ý chính hoặc nhận định), chưa phải trang gốc của tác giả. Nhãn nằm ở cột `ghi_chu` dạng "nhãn trong bài: …".
- Chỉ lấy Ý từ phần lời tác giả (tóm tắt, ý chính, nhận định). Các dòng cảnh báo `W` và ghi chú rà soát do người biên tập thêm (ví dụ mức tối đa EFSA) không tách thành Ý vì không phải lời tác giả.
- Ý mà bài tự gắn nhãn `trai` vẫn được ghi theo đúng hướng tác giả nói (thường `loi`), kèm nhãn ở `ghi_chu` để bước chấm tầng xử lý. Không đưa ra tầng A/B/C ở đây.
- Bài báo cáo ca cụ thể của một người trong gia đình được bỏ qua, không đưa thông tin cá nhân vào file.

## Số Ý theo mục tiêu

| Mục tiêu | Số Ý |
|---|---|
| tieuhoa | 29 |
| ngu | 22 |
| duong | 14 |
| mo | 14 |
| thieu | 14 |
| tim | 14 |
| nao | 13 |
| mien | 10 |
| gan | 10 |
| gout | 10 |
| khop | 9 |
| da | 8 |
| ho | 8 |
| co | 7 |
| than | 6 |
| giap | 6 |
| mau | 6 |
| xuong | 5 |
| metmoi | 3 |
| mat | 3 |
| thai | 3 |
| tamtrang | 2 |

Mục tiêu chưa có Ý nào: `dinhduong`.

## Chất chưa có trong kho (`chat.csv`)

Ghi bằng tên viết thường không dấu, `ghi_chu` có "chất chưa có trong kho":

- `silic` (7 Ý)
- `allulose` (5 Ý)
- `tinhbotkhang` (3 Ý)
- `giamtao` (2 Ý)
- `xylitol` (2 Ý)
- `sambucus` (2 Ý)
- `mobo` (2 Ý)
- `ganbo` (1 Ý)
- `butyrate` (1 Ý)
- `taurine` (1 Ý)
- `tudca` (1 Ý)
- `matbo` (1 Ý)
- `atiso` (1 Ý)
- `milkthistle` (1 Ý)
- `krill` (1 Ý)
- `luteolin` (1 Ý)
- `fructose` (1 Ý)
- `stevia` (1 Ý)
- `lahan` (1 Ý)
- `aspartame` (1 Ý)
- `sucralose` (1 Ý)
- `tinhdau` (1 Ý)
- `nuocmuoi` (1 Ý)

Lưu ý: `silic` (Silic) có thể gộp với nhóm silic–bo nếu thêm vào kho; `fructose`, `aspartame`, `sucralose`, `stevia`, `lahan`, `xylitol`, `allulose` là chất tạo ngọt/đường; `tinhdau`, `nuocmuoi`, `mobo`, `sambucus` là sản phẩm dùng ngoài hoặc dân gian.

## Mâu thuẫn

Đối chiếu theo `chat` + `muc_tieu` giữa hai nguồn và với `bang-y.csv` (bản tại thời điểm đọc).

### Hai nguồn nói ngược nhau

| Cặp | BS. Phúc | Chị Thảo | Ghi chú |
|---|---|---|---|
| folic + thai | Folate 400 mcg/ngày trước và đầu thai kỳ (lợi, bài ghi `khop`) | Bà bầu không nên dùng axit folic, phải chuyển sang folate hoạt tính (hại, bài ghi `trai`) | Ý của chị Thảo trái khuyến cáo chính thức; bang-y.csv có Ý NIH `loi` R1 cho folic + thai. Ngoài ra Thảo: axit folic làm nặng tự kỷ (`folic`+`nao`, hại, `chuakc`) ngược với bang-y `loi`. |
| mg + ngu | Magie buổi tối giúp ngủ; L-threonat cho mất ngủ (lợi) | Magie chỉ giúp mất ngủ do căng thẳng; ít giúp ở nhiều kiểu mất ngủ khác; có thể làm giấc ngủ nông ở người ngưng thở khi ngủ (không tác dụng/hại, nhãn `chuakc`) | Chị Thảo tự nói magie không phải thần dược. |
| fe + thieu / mau | Trẻ nên bổ sung sắt; người ăn chay dễ thiếu sắt (lợi) | Từ 51 tuổi ăn uống thường đã đủ; chỉ dùng sắt khi xét nghiệm thiếu (không tác dụng cho người không thiếu) | Khác đối tượng nhưng ngược tinh thần "bổ sung thường quy". bang-y.csv: NIH `loi` R1 cho fe + thieu/mau (phòng và điều trị thiếu sắt). |
| mg + tieuhoa | Magie (citrat, oxit) cho trào ngược, táo bón (lợi) | Thiếu acid dạ dày, trào ngược, viêm dạ dày làm hấp thu magie giảm (không tác dụng) | Chưa đối đầu trực tiếp. |
| vitD liều | 1.000–5.000 UI/ngày đến 50–70 ng/mL | 5.000 UI/ngày; liều 60.000–200.000 UI cho bệnh đặc biệt | Cả hai nguồn nêu liều trên mức tối đa mà bài tự ghi chú; bài của Thảo còn nói liều cao gây sỏi thận, tăng canxi máu. |

### Ngược với bang-y.csv

| Cặp | Nguồn tài liệu | bang-y.csv |
|---|---|---|
| vitD + tamtrang | BS-PHUC: vitamin D hỗ trợ trầm cảm, lo âu (lợi, `chuakc`) | NIH `khong`: thử nghiệm lớn không thấy phòng được trầm cảm |
| coq10 + co | C-THAO: người dùng statin hay đau cơ vì thiếu CoQ10 (lợi) | NCCIH `khong`: bằng chứng không ủng hộ CoQ10 giảm đau cơ do statin |
| b12 + metmoi | C-THAO: thiếu B12 gây mệt (lợi khi bù) | NIH `khong`: không tăng năng lượng ở người đã đủ B12 (không thật sự đối đầu: khác đối tượng) |
| zn + mien / nao | BS-PHUC: kẽm giúp miễn dịch, trí nhớ (lợi) | OBSIDIAN `khong`: ở người không thiếu kẽm bằng chứng gần như không có |
| folic + nao | C-THAO: axit folic làm nặng tự kỷ (hại, `chuakc`) | NIH `loi`: sa sút trí tuệ, hiệu quả bổ sung chưa rõ (khác chủ đề) |

### Ý tự mâu thuẫn trong cùng nguồn

- BS-PHUC, kẽm và thận: "kẽm vừa giảm vừa có thể gây sỏi thận" (`zn`+`than`, ghi `hai`) và "mọi bệnh thận đều do thiếu kẽm" (`loi`, `chuakc`).
- BS-PHUC, kẽm: Ý `zn`+`thieu` hai chiều (bù cho trẻ; dư kéo dài thiếu đồng).

## Magie và giấc ngủ

- `T-mgthreonat-ngu-81cf9e` [BS-PHUC, lợi] Theo tác giả, magie L-threonat dùng trước ngủ được gợi ý cho thần kinh, tâm lý và mất ngủ.
- `T-mg-ngu-555f6c` [BS-PHUC, lợi] Theo tác giả, magie cần bổ sung hằng ngày, quan trọng nhất là liều buổi tối.
- `T-mgoxit-ngu-b8239c` [BS-PHUC, lợi] Theo tác giả, ngày căng thẳng hoặc mất ngủ có thể thêm magie oxit vào magie lactat.
- `T-mg-ngu-dfbe69` [BS-PHUC, lợi] Theo tác giả, magie kết hợp B6 giúp ngủ, giảm cortisol và tạo melatonin.
- `T-b6-ngu-1c2415` [BS-PHUC, lợi] Theo tác giả, B6 kết hợp magie giúp ngủ, giảm cortisol và tạo melatonin.
- `T-mg-ngu-4693c3` [C-THAO, lợi] Theo tác giả, magie chỉ giúp ngủ khi mất ngủ do căng thẳng, thần kinh giao cảm hoạt động quá mức. (nhãn trong bài: ykien)
- `T-mg-ngu-a43a0b` [C-THAO, không tác dụng] Theo tác giả, magie ít giúp ở kiểu dễ ngủ nhưng tỉnh lúc 2–3 giờ sáng (đường huyết, cortisol).
- `T-mg-ngu-ad46b7` [C-THAO, không tác dụng] Theo tác giả, magie ít giúp ở kiểu ngủ nhiều nhưng không sâu (ngưng thở khi ngủ, trào ngược, viêm xoang, suy giáp).
- `T-mg-ngu-02a75c` [C-THAO, hại/tránh] Theo tác giả, magie làm giãn cơ hô hấp quá mức, làm thở yếu và giấc ngủ nông ở người ngưng thở khi ngủ. (nhãn trong bài: chuakc)
- `T-mg-ngu-4feb19` [C-THAO, lợi] Theo tác giả, magie giống cái phanh của hệ thần kinh: dịu não, chậm nhịp tim, giãn cơ, tạo điều kiện cho melatonin.

Ghi chú: BS-PHUC nói theo hướng dùng và liều (kèm nhãn bài `trai` ở liều); C-THAO nêu giới hạn tác dụng. Ý `ngu` của magie là chỗ hai nguồn lệch nhau rõ nhất; tầng cuối do bước chấm quyết định.

## Liên quan thận

- `T-zn-than-6a08db` [BS-PHUC, hại/tránh] Theo tác giả, kẽm vừa giảm vừa có thể gây sỏi thận.
- `T-zn-than-0e7932` [BS-PHUC, lợi] Theo tác giả, mọi bệnh thận đều do thiếu kẽm. (nhãn trong bài: chuakc)
- `T-cacitrat-than-101967` [BS-PHUC, lợi] Theo tác giả, canxi citrat giúp đánh bay sỏi thận nhưng dùng lâu có thể tích luỹ nhôm. (nhãn trong bài: chuakc)
- `T-b6-than-16495f` [BS-PHUC, lợi] Theo tác giả, B6 bảo vệ thận.
- `T-mg-than-bcf7da` [C-THAO, không tác dụng] Theo tác giả, magie ít giúp mất ngủ ở người gan thận kém.
- `T-vitD-than-5c4994` [C-THAO, hại/tránh] Theo tác giả, liều vitamin D rất cao có thể rối loạn chuyển hoá canxi, sỏi thận, tăng canxi máu. (nhãn trong bài: khop)
- `T-mg-gout-3f9391` [C-THAO, lợi] Theo tác giả, magie giúp gan thận chuyển hoá, thải acid uric và ngừa tinh thể urat. (nhãn trong bài: chuakc)

Ghi chú: có thêm cảnh báo thận trong phần `W` của bài (suy thận không tự uống magie liều cao, creatine làm creatinin tăng giả, vitamin C và sỏi oxalat), nhưng đó là lời người biên tập nên không tách thành Ý.

## Liên quan tuyến giáp

- `T-zn-giap-c5d6c2` [BS-PHUC, lợi] Theo tác giả, thiếu kẽm liên quan suy giáp.
- `T-zn-giap-174f54` [BS-PHUC, lợi] Theo tác giả, thiếu kẽm có thể gây suy giáp.
- `T-inositol-giap-03e475` [BS-PHUC, lợi] Theo tác giả, inositol (B8) dùng cho Hashimoto. (nhãn trong bài: chuakc)
- `T-mg-giap-c48c5e` [C-THAO, không tác dụng] Theo tác giả, magie ít giúp mất ngủ do rối loạn tuyến giáp.
- `T-mg-giap-86623a` [C-THAO, hại/tránh] Theo tác giả, magie làm triệu chứng nặng thêm ở người rối loạn tuyến giáp vì giảm nhịp tim, hạ huyết áp. (nhãn trong bài: chuakc)
- `T-vitD-giap-30bba6` [C-THAO, lợi] Theo tác giả, Hashimoto là một trường hợp bác sĩ dùng vitamin D liều rất cao (giao thức Coimbra). (nhãn trong bài: chuakc; dẫn: giao thức Coimbra)

Ghi chú: hai bài lớn về giáp là `doc-phuc-tuyen-giap` (BS-PHUC, trục giáp–ruột, gluten, Hashimoto) và các Ý ở Thảo (magie, vitamin D liều rất cao cho Hashimoto). Bài BS-PHUC không nêu chất cụ thể cho giáp ngoài kẽm và inositol.

## Liên quan dạ dày (mục tiêu `tieuhoa`)

- `T-mgcitrat-tieuhoa-f64647` [BS-PHUC, lợi] Theo tác giả, magie citrat dùng cho trào ngược, táo bón, viêm dạ dày–ruột và ruột kích thích.
- `T-mgcitrat-tieuhoa-a8b1aa` [BS-PHUC, lợi] Magie citrat có tác dụng nhuận tràng. (nhãn trong bài: khop)
- `T-mgoxit-tieuhoa-9cb9ed` [BS-PHUC, lợi] Magie oxit có tác dụng nhuận tràng. (nhãn trong bài: khop)
- `T-mgoxit-tieuhoa-e00525` [BS-PHUC, lợi] Theo tác giả, trào ngược có thể dùng magie lactat kèm khoảng 200 mg magie oxit buổi tối. (nhãn trong bài: chuakc)
- `T-mg-tieuhoa-f56152` [BS-PHUC, lợi] Theo tác giả, thiếu magie gây trào ngược và bổ sung magie, canxi citrat giúp hết trào ngược. (nhãn trong bài: chuakc)
- `T-cacitrat-tieuhoa-83c4f5` [BS-PHUC, lợi] Theo tác giả, canxi citrat góp phần giúp hết trào ngược. (nhãn trong bài: chuakc)
- `T-cacitrat-tieuhoa-8333b1` [BS-PHUC, lợi] Canxi citrat không phụ thuộc axit dạ dày. (nhãn trong bài: khop)
- `T-cacarbonat-tieuhoa-4350ee` [BS-PHUC, không tác dụng] Canxi carbonat cần axit dạ dày để hấp thu; theo tác giả chỉ hợp người thừa axit. (nhãn trong bài: khop)
- `T-vitC-tieuhoa-a8c657` [BS-PHUC, lợi] Theo tác giả, người viêm loét dạ dày càng nên bổ sung vitamin C để lành vết loét. (nhãn trong bài: chuakc)
- `T-honey-tieuhoa-fddc4f` [BS-PHUC, hại/tránh] Theo tác giả, ăn nhiều đường (kể cả mật ong) gây loạn khuẩn ruột, viêm kéo dài, rò rỉ ruột.
- `T-probiotic-tieuhoa-b2b3f2` [BS-PHUC, lợi] Theo tác giả, nên chọn men vi sinh dạng bào tử, 10–30 tỷ CFU. (nhãn trong bài: ykien)
- `T-mg-tieuhoa-ffe54a` [C-THAO, không tác dụng] Theo tác giả, thiếu acid dạ dày, trào ngược, viêm dạ dày mạn làm hấp thu magie giảm, nên uống magie vẫn không thấy kết quả.
- `T-b12-tieuhoa-b2928a` [C-THAO, lợi] Theo tác giả, thiếu nặng (ví dụ viêm teo dạ dày) có thể cần tiêm B12 để tránh đường tiêu hoá.
- `T-probiotic-tieuhoa-5bb97a` [C-THAO, lợi] Theo tác giả, người rối loạn tiêu hoá nặng dùng lợi khuẩn dạng bào tử (Bacillus subtilis).
- `T-probiotic-tieuhoa-00dac7` [C-THAO, lợi] Theo tác giả, lợi khuẩn bào tử Bacillus subtilis giảm LPS trong máu tới 42%. (nhãn trong bài: chuakc)
- `T-probiotic-tieuhoa-2a8a75` [C-THAO, lợi] Theo tác giả, men vi sinh, giấm táo, butyrate giúp phục hồi hàng rào ruột. (nhãn trong bài: ykien)
- `T-giamtao-tieuhoa-03f3d3` [C-THAO, lợi] Theo tác giả, giấm táo giúp phục hồi hàng rào ruột. (nhãn trong bài: ykien; chất chưa có trong kho)
- `T-butyrate-tieuhoa-1a38de` [C-THAO, lợi] Theo tác giả, butyrate giúp phục hồi hàng rào ruột. (nhãn trong bài: ykien; chất chưa có trong kho)
- `T-om3-tieuhoa-f389a5` [C-THAO, lợi] Theo tác giả, nên tăng omega-3 từ cá béo hoặc dầu cá để bảo vệ hàng rào ruột.
- `T-tinhbotkhang-tieuhoa-ae6928` [C-THAO, lợi] Theo tác giả, tinh bột kháng cải thiện tiêu hoá, nuôi lợi khuẩn. (chất chưa có trong kho)
- `T-curc-tieuhoa-21d73c` [C-THAO, lợi] Theo tác giả, bột nghệ nằm trong công thức uống buổi sáng để tẩy sỏi mật. (nhãn trong bài: trai; dẫn: nghiên cứu năm 2008 phân tích 162 viên sỏi (chưa được đọc trực tiếp))
- `T-giamtao-tieuhoa-6c522a` [C-THAO, lợi] Theo tác giả, giấm táo nằm trong công thức uống buổi sáng để tẩy sỏi mật. (nhãn trong bài: trai; dẫn: nghiên cứu năm 2008 phân tích 162 viên sỏi (chưa được đọc trực tiếp); chất chưa có trong kho)
- `T-taurine-tieuhoa-ea498f` [C-THAO, lợi] Theo tác giả, chất này được dùng hỗ trợ cho sỏi mật. (nhãn trong bài: chuakc; dẫn: nghiên cứu năm 2008 phân tích 162 viên sỏi (chưa được đọc trực tiếp); chất chưa có trong kho)
- `T-tudca-tieuhoa-1c60dc` [C-THAO, lợi] Theo tác giả, chất này được dùng hỗ trợ cho sỏi mật. (nhãn trong bài: chuakc; dẫn: nghiên cứu năm 2008 phân tích 162 viên sỏi (chưa được đọc trực tiếp); chất chưa có trong kho)
- `T-matbo-tieuhoa-203f52` [C-THAO, lợi] Theo tác giả, chất này được dùng hỗ trợ cho sỏi mật. (nhãn trong bài: chuakc; dẫn: nghiên cứu năm 2008 phân tích 162 viên sỏi (chưa được đọc trực tiếp); chất chưa có trong kho)
- `T-atiso-tieuhoa-62313a` [C-THAO, lợi] Theo tác giả, chất này được dùng hỗ trợ cho sỏi mật. (nhãn trong bài: chuakc; dẫn: nghiên cứu năm 2008 phân tích 162 viên sỏi (chưa được đọc trực tiếp); chất chưa có trong kho)
- `T-milkthistle-tieuhoa-f403f7` [C-THAO, lợi] Theo tác giả, chất này được dùng hỗ trợ cho sỏi mật. (nhãn trong bài: chuakc; dẫn: nghiên cứu năm 2008 phân tích 162 viên sỏi (chưa được đọc trực tiếp); chất chưa có trong kho)
- `T-curc-tieuhoa-c68775` [C-THAO, lợi] Theo tác giả, chất này được dùng hỗ trợ cho sỏi mật. (nhãn trong bài: chuakc; dẫn: nghiên cứu năm 2008 phân tích 162 viên sỏi (chưa được đọc trực tiếp))
- `T-mg-tieuhoa-e5ee2b` [C-THAO, lợi] Theo tác giả, chất này được dùng hỗ trợ cho sỏi mật. (nhãn trong bài: chuakc; dẫn: nghiên cứu năm 2008 phân tích 162 viên sỏi (chưa được đọc trực tiếp))

Bài `doc-daday` (Thảo) bàn nhiều về HP, dịch nhầy, thuốc giảm acid nhưng không đưa Ý về TPCN nào (chỉ NSAID, thuốc giảm acid, lối sống) nên không có dòng riêng; bài tự nêu ý "khuẩn HP chỉ là kẻ cơ hội" bị gắn nhãn `trai`.

## Bài không tách được Ý

- `doc-phuc-tong-quan`: BS. Phúc: Tổng quan – Thân khoẻ, Tâm an, Trí sáng
- `doc-phuc-loi-song`: BS. Phúc: Thay đổi lối sống
- `doc-phuc-hoi-tho`: BS. Phúc: Quản trị hơi thở (Alpha – Theta – Delta)
- `doc-phuc-xet-nghiem`: BS. Phúc: Các xét nghiệm nên làm
- `doc-phuc-chon-san-pham`: BS. Phúc: Cách chọn sản phẩm vi chất (nhóm 1–2–3, tá dược, kiểm định)
- `doc-phuc-tap-the-duc`: BS. Phúc: Tập thể dục, não bộ và âm nhạc
- `doc-phuc-ung-thu`: BS. Phúc: Ung thư và vắc xin mRNA cá thể hoá
- `doc-phuc-tuyen-tien-liet`: BS. Phúc: Tuyến tiền liệt – "đàn ông nên đái ngồi"
- `doc-phuc-nhin-an`: BS. Phúc: Nhịn ăn từng phần (gián đoạn)
- `doc-phuc-noi-tiet-to`: BS. Phúc: Nội tiết tố và hóc-môn tăng trưởng hGH
- `doc-daday`: Viêm dạ dày, đau dạ dày mãn tính và dịch nhầy
- `doc-xetnghiem`: Kinh nghiệm khám: xét nghiệm tổng quát và kháng insulin
- `doc-ungthuphoi`: Chăm sóc người bị ung thư phổi: dinh dưỡng, ánh nắng, hơi thở
- `doc-cotsong`: Thần kinh và cột sống: ai không nên kéo giãn

Lý do chung: bài về lối sống, hơi thở, xét nghiệm, ung thư, cột sống, nhịn ăn, nội tiết, mỹ phẩm hoặc cách chọn sản phẩm, không gắn chất trong kho với một mục tiêu cụ thể. Bài NMN có Ý của magie nhưng không có Ý cho NMN (không có mục tiêu tương ứng).

## Hạn chế

- Tìm Drive với truy vấn `title contains 'tai-lieu'`; kết quả có thêm `tai-lieu-bs-tran-van-phuc.json` (bản cũ, v1) và `tai-lieu-tieng-sec-day-du.pdf`, không dùng. Không đọc các Google Sheet mục lục.
- `trich_dan` lấy theo bản JSON đã viết lại, không phải nguyên văn video/bài gốc.
