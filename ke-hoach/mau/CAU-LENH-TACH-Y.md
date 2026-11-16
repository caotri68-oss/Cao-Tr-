# Câu lệnh mẫu: tách Ý từ một bài viết mới

Cách dùng trên điện thoại: mở Claude, chọn model **Sonnet**. Dán **toàn bộ khung bên dưới** (từ "VAI TRÒ" đến hết "BÀI VIẾT"), rồi dán bài viết vào chỗ ghi `<<< DÁN BÀI VIẾT VÀO ĐÂY >>>`. Điền 3 chỗ trong ngoặc nhọn `{...}` ở phần "THÔNG TIN BÀI": nguồn, tên bài trong Obsidian, ngày. Ba bảng mã ở cuối file này dán ngay trước phần "BÀI VIẾT".

Các bảng mã sinh từ kho dữ liệu ngày 2026-11-16. Khi kho có thêm chất, mục tiêu hoặc nguồn mới thì tạo lại bảng trước khi dán.

---

```text
VAI TRÒ
Bạn giúp tôi tách bài viết về thực phẩm chức năng thành các "Ý" để nạp vào Bảng Ý của app Sổ TPCN. Một Ý là: một nguồn nói một điều về một chất cho một mục tiêu sức khoẻ. Bạn chỉ trích lại lời tác giả, không thêm kiến thức của bạn, không đánh giá đúng sai.

THÔNG TIN BÀI
- Nguồn (mã nguồn, chọn trong bảng mã nguồn bên dưới): {NGUỒN}
- Tên bài trong Obsidian (ghi vào link_goc): {TÊN-BÀI}
- Ngày nạp: {YYYY-MM-DD}

VIỆC CẦN LÀM
Tạo file CSV tên y-moi-{YYYY-MM-DD}.csv, mã hoá UTF-8 CÓ BOM, đúng 12 cột sau theo đúng thứ tự, dòng đầu là tiêu đề, mọi ô đặt trong dấu ngoặc kép:
ma_y,chat,muc_tieu,huong,noi_dung,lieu,nguon,muc_ncuu,trich_dan,link_goc,trang_thai,ghi_chu

QUY TẮC TỪNG CỘT
1. ma_y: bắt đầu bằng "T-", dạng T-<chat>-<muc_tieu>-<6 ký tự>. 6 ký tự là 6 chữ số hex đầu của SHA-1 tính trên chuỗi chat + "|" + trich_dan + "|" + muc_tieu (viết liền, không thêm khoảng trắng, chữ Unicode dạng NFC). Hãy chạy code để tính, không tự đoán. Ví dụ Node: crypto.createHash('sha1').update(chat+'|'+trich_dan+'|'+muc_tieu).digest('hex').slice(0,6).
2. chat: CHỈ dùng mã trong bảng mã chất. Nếu bài nói về chất chưa có: đặt mã mới bằng chữ thường, không dấu, không cách (ví dụ silic), và ghi vào ghi_chu đúng cụm: chất chưa có trong kho.
3. muc_tieu: CHỈ dùng mã trong bảng mã mục tiêu. Nếu không khớp mục tiêu nào thì bỏ Ý đó và liệt kê ở phần "Ý bỏ qua". Không tự đặt mã mục tiêu mới.
4. huong: một trong ba giá trị. loi = tác giả nói có lợi; khong = tác giả nói không có tác dụng; hai = tác giả nói có hại hoặc cần tránh.
5. noi_dung: một câu tiếng Việt, mở đầu bằng "Theo tác giả,". Chỉ nói lại điều tác giả nói. TUYỆT ĐỐI không dùng các từ "chữa", "tốt nhất", "100%", và không hứa hẹn khỏi bệnh hay đảm bảo kết quả. Dùng "dùng cho", "được gợi ý cho", "hỗ trợ".
6. lieu: chỉ ghi nếu tác giả nêu liều cụ thể, đúng như bài. Không có thì để trống.
7. nguon: đúng mã nguồn tôi đã cho ở trên.
8. muc_ncuu: LUÔN để trống. Bước chấm mức nghiên cứu làm sau.
9. trich_dan: BẮT BUỘC, không được trống. Là câu hoặc đoạn NGUYÊN VĂN copy từ bài, tối đa 300 ký tự. Không viết lại, không tóm tắt, không sửa chính tả. Nếu đoạn gốc dài hơn 300 ký tự thì chọn câu then chốt, vẫn nguyên văn. Không tìm được câu nguyên văn thì bỏ Ý đó.
10. link_goc: tên bài trong Obsidian như tôi đã cho.
11. trang_thai: luôn là cho_duyet.
12. ghi_chu: để trống, trừ khi (a) chất mới (cụm "chất chưa có trong kho"), hoặc (b) bài tự nói rõ mức tin cậy của chính nó thì ghi "nhãn trong bài: ...".

QUY TẮC CHUNG
- Mỗi cặp (chất, mục tiêu) một dòng. Một câu của tác giả nói về nhiều mục tiêu thì tách nhiều dòng.
- Không ghi thông tin cá nhân: tên, tuổi, ngày sinh, bệnh án, số điện thoại, email của bất kỳ người thật nào, kể cả người nhà. Bài kể ca bệnh của một người thì bỏ phần đó, chỉ lấy điều tác giả nói chung.
- Điều nào tác giả không nói thì không thêm. Không tự bổ sung nghiên cứu, liều, cảnh báo của bạn.
- Dấu ngoặc kép bên trong một ô phải nhân đôi ("") để CSV không vỡ.

CÁCH TRẢ LỜI
1. Chạy code để tính ma_y, ghi file CSV và đưa file cho tôi.
2. Nếu bạn đang trong kho code, chạy: node ke-hoach/scripts/kiem-y-moi.js <file>. Nếu không, ghi rõ "chưa chạy kiểm tra".
3. Cuối câu trả lời in ba phần ngắn: (a) số Ý theo hướng loi/khong/hai; (b) danh sách chất mới chưa có trong kho; (c) "Ý bỏ qua" kèm lý do (không có mục tiêu khớp, không có câu nguyên văn, là thông tin cá nhân).

BẢNG MÃ ĐƯỢC PHÉP DÙNG
(dán ba bảng mã chất, mục tiêu, nguồn vào đây)

BÀI VIẾT
<<< DÁN BÀI VIẾT VÀO ĐÂY >>>
```

---

## Bảng mã (dán vào chỗ "BẢNG MÃ ĐƯỢC PHÉP DÙNG")

### Mã chất (78 chất)

| mã = tên | mã = tên | mã = tên |
|---|---|---|
| `vitD` = Vitamin D | `vitC` = Vitamin C | `om3` = Omega-3 |
| `mg` = Magie | `zn` = Kẽm | `ca` = Canxi |
| `vitK` = Vitamin K | `b12` = Vitamin B12 | `b6` = Vitamin B6 |
| `vitE` = Vitamin E | `fe` = Sắt | `se` = Selen |
| `io` = I-ốt | `vitA` = Vitamin A | `curc` = Curcumin |
| `creatine` = Creatine | `cu` = Đồng | `astaxanthin` = Astaxanthin |
| `lutein` = Lutein và Zeaxanthin | `nmn` = NMN | `pqq` = PQQ |
| `blackgarlic` = Tỏi đen | `boswellia` = AKBA Boswellia | `collagen` = Collagen |
| `folic` = Axit folic | `niacin` = Niacin (B3) | `probiotic` = Men vi sinh |
| `gluco` = Glucosamin và chondroitin | `coq10` = CoQ10 | `protein` = Đạm (Protein) |
| `bcomplex` = Vitamin B-Complex | `probstrain` = Men vi sinh theo chủng | `kefir` = Kefir |
| `algae` = Tảo (spirulina, chlorella) | `honey` = Mật ong | `ginger` = Gừng |
| `greentea` = Trà xanh (chiết xuất) | `ginseng` = Nhân sâm | `ginkgo` = Ginkgo |
| `stjohn` = Cỏ St. John (St. John’s wort) | `ashwagandha` = Ashwagandha | `echinacea` = Echinacea |
| `valerian` = Valerian (nữ lang) | `mn` = Mangan | `boron` = Boron |
| `gsh` = Glutathione | `ala` = Axit alpha-lipoic | `quercetin` = Quercetin |
| `lycopene` = Lycopene | `inositol` = Inositol | `b1` = Vitamin B1 |
| `b2` = Vitamin B2 | `b5` = Vitamin B5 | `biotin` = Biotin |
| `choline` = Cholin | `mgcitrat` = Magie citrat | `mglactat` = Magie lactat |
| `mgclorua` = Magie clorua | `mgaspartat` = Magie aspartat | `mgoxit` = Magie oxit |
| `mgsunfat` = Magie sunfat | `mgglycinat` = Magie glycinat / bisglycinat | `mgmalat` = Magie malat |
| `mgtaurat` = Magie taurat | `mgthreonat` = Magie L-threonat | `mgorotat` = Magie orotat |
| `mgcarbonat` = Magie carbonat | `mghydroxit` = Magie hydroxit | `cacarbonat` = Canxi carbonat |
| `cacitrat` = Canxi citrat | `calactat` = Canxi lactat | `cagluconat` = Canxi gluconat |
| `caphosphat` = Canxi phosphat | `casunfat` = Canxi sunfat | `caascorbat` = Canxi ascorbat |
| `cahydroxyapatit` = Canxi hydroxyapatit (MCHC) | `cabisglycinat` = Canxi bisglycinat | `cacitratmalat` = Canxi citrat-malat |

Chất không có trong bảng: đặt mã mới và ghi "chất chưa có trong kho" ở ghi_chu.

### Mã mục tiêu (23 mục tiêu)

| mã = tên | mã = tên | mã = tên |
|---|---|---|
| `xuong` = Xương và răng | `mau` = Máu và thiếu máu | `mien` = Miễn dịch và đề kháng |
| `tim` = Tim mạch và huyết áp | `nao` = Não, trí nhớ, thần kinh | `ngu` = Giấc ngủ và căng thẳng |
| `tieuhoa` = Tiêu hoá và đường ruột | `co` = Cơ bắp và vận động | `khop` = Khớp và sụn |
| `mat` = Mắt và thị lực | `da` = Da, tóc và móng | `thai` = Thai kỳ và sinh sản |
| `giap` = Tuyến giáp | `metmoi` = Mệt mỏi và năng lượng | `thieu` = Bù thiếu hụt vi chất |
| `tamtrang` = Tâm trạng và lo âu | `gan` = Gan | `duong` = Đường huyết và tiểu đường |
| `ho` = Ho, họng và cảm lạnh | `than` = Thận, sỏi thận và lắng đọng canxi ở thận | `dinhduong` = Dinh dưỡng: ăn kém, sụt cân, thiếu đạm |
| `mo` = Mỡ máu (tách khỏi tim; tim giữ phần huyết áp và tim mạch chung) | `gout` = Gout và acid uric |  |

### Mã nguồn

| mã = tên | mã = tên |
|---|---|
| `NIH` = NIH Office of Dietary Supplements | `NCCIH` = National Center for Complementary and Integrative Health |
| `COCHRANE` = Cochrane | `ESPGHAN` = ESPGHAN |
| `MAYO` = Mayo Clinic | `ISSN` = ISSN (số tạp chí chưa rõ tên) |
| `OBSIDIAN` = Kho Obsidian của gia đình (ghi chú chung) | `KHAC` = Nguồn khác (chi tiết trong ghi_chu của dòng) |
| `CHUA_CO` = Chưa có nguồn đã đọc | `FDA` = U.S. Food and Drug Administration (nhãn thuốc) |
| `MSKCC` = Memorial Sloan Kettering Cancer Center (About Herbs) | `BS-PHUC` = Bác sĩ Trần Văn Phúc |
| `C-THAO` = Chị Thảo Nguyên |  |

Bài của người chưa có trong bảng nguồn: dùng `KHAC` rồi ghi tên người vào ghi_chu. Thêm nguồn mới thì làm ở bước ghép (xem QUY-TRINH-NAP-BAI.md).
