# Nguồn cho bảng Mục tiêu (`du-lieu/muc-tieu.csv`)

Trạng thái: **chờ duyệt**. Ngày truy cập mọi nguồn: **2026-11-16**.

Quy tắc: mỗi ý an toàn trong cột `ghi_chu_an_toan` có ít nhất 2 nguồn độc lập. Ý chỉ có 1 nguồn, hoặc nguồn chưa đủ uy tín, nằm ở mục "Cần kiểm chứng" và **không** đưa vào CSV. Cột `can_kham_truoc` là danh mục xét nghiệm thường quy, không phải khẳng định về tác dụng; vẫn cần bác sĩ điều trị xác nhận.

## Mục tiêu mới

| Mã | Lý do thêm |
|---|---|
| `than` | Thận, sỏi và lắng đọng canxi ở thận là chỗ nhiều TPCN (canxi, vitamin D, vitamin C, magie, creatine) có thể gây hại. Cần một mục riêng để app cảnh báo. |
| `dinhduong` | Ăn kém, sụt cân, thiếu đạm là mục tiêu khác với `thieu` (vi chất) và `co` (cơ bắp). |
| `mo` | Tách mỡ máu khỏi `tim`. `tim` giữ phần huyết áp và tim mạch chung, `mo` dành cho mỡ máu. Lý do: men gạo đỏ và các sản phẩm "hạ mỡ máu" có tương tác riêng với statin. |
| `gout` | **Chưa thêm.** Bối cảnh hiện tại chưa cần, và các ý về niacin hay vitamin C với acid uric chưa đủ 2 nguồn uy tín (xem mục "Cần kiểm chứng"). |

## Ý an toàn theo từng mục tiêu

### giap (Tuyến giáp)
1. **I-ốt liều cao, rong biển và tảo bẹ có hàm lượng i-ốt rất thay đổi, có thể làm rối loạn chức năng tuyến giáp và cộng tác dụng với thuốc kháng giáp.**
   - NIH Office of Dietary Supplements, *Iodine: Fact Sheet for Health Professionals*: https://ods.od.nih.gov/factsheets/Iodine-HealthProfessional/ (rong biển có 16 đến 2.984 mcg/g)
   - MedlinePlus (NLM), *Iodine in diet*: https://medlineplus.gov/ency/article/002421.htm (i-ốt liều cao dùng cùng thuốc kháng giáp có tác dụng cộng)
2. **Biotin liều cao làm sai kết quả xét nghiệm tuyến giáp. Ngừng vài ngày trước khi lấy máu.**
   - FDA, *Safety Communication: biotin may interfere with lab tests* (2017, cập nhật 2019). Đọc qua tóm tắt, chưa mở được trang gốc.
   - Health Sciences Authority Singapore, *Biotin interference with clinical laboratory tests*: https://www.hsa.gov.sg/announcements/biotin-interference-with-clinical-laboratory-tests/
   - ADLM (AACC), *Clinical Laboratory News: Meeting the Biotin Challenge* (2018): https://myadlm.org/cln/Articles/2018/JanFeb/Meeting-the-Biotin-Challenge
   - Ý 2 dùng lại cho `metmoi`.

### tieuhoa (Tiêu hoá)
1. **Viêm teo dạ dày làm giảm hấp thu B12 từ thức ăn. B12 tinh thể trong viên bổ sung vẫn hấp thu được.**
   - Baik & Russell, *Vitamin B12 deficiency in the elderly*, Annu Rev Nutr 1999: https://pubmed.ncbi.nlm.nih.gov/10448529/
   - Linus Pauling Institute (Oregon State Univ.), *Vitamin B12*: https://lpi.oregonstate.edu/mic/vitamins/vitamin-B12
   - AAFP, Am Fam Physician 2017;96(6):384–389: https://www.aafp.org/pubs/afp/issues/2017/0915/p384.html
2. **Giảm axit dạ dày làm giảm hấp thu sắt.**
   - NIH ODS, *Iron fact sheet*: https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/
   - Medical Journal of Australia, *Iron and vegetarian diets* (2013): https://www.mja.com.au/journal/2013/199/4/iron-and-vegetarian-diets
   - Lưu ý: hai nguồn này nói về giảm axit dạ dày nói chung (vô toan, sau cắt dạ dày). Không nguồn nào nhắc riêng tên "viêm teo dạ dày". Cần quản lý duyệt.
3. **Nghệ hoặc curcumin, nhất là dạng tăng hấp thu, có báo cáo hiếm gặp gây tổn thương gan.**
   - NIH LiverTox, *Turmeric*: https://www.ncbi.nlm.nih.gov/books/NBK548561/
   - Therapeutic Goods Administration (Úc), đánh giá an toàn về nghệ và curcumin (2023). Đọc qua LiverTox và tin tóm tắt, chưa mở trang gốc.
   - Ý 3 dùng lại cho `khop`.

### than (Thận)
1. **Canxi dạng viên bổ sung, không phải canxi từ thức ăn, liên quan tới sỏi thận.**
   - NIH ODS, *Calcium fact sheet*: https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/
   - Institute of Medicine, *Dietary Reference Intakes for Calcium and Vitamin D* (2011): https://www.ncbi.nlm.nih.gov/books/NBK56058/
2. **Canxi hoặc vitamin D quá mức gây tăng canxi máu, tăng canxi niệu và lắng đọng canxi ở thận.**
   - IOM 2011 (như trên)
   - Malihi et al., phân tích gộp 48 RCT về vitamin D và tăng canxi máu, tăng canxi niệu (2016): https://pubmed.ncbi.nlm.nih.gov/27604776/
3. **Vitamin C liều cao làm tăng oxalat niệu.**
   - Traxer et al., Kidney Int 2003: https://pubmed.ncbi.nlm.nih.gov/12631089
   - Ferraro et al., *Total, Dietary, and Supplemental Vitamin C Intake and Risk of Incident Kidney Stones*, Am J Kidney Dis 2016: https://pubmed.ncbi.nlm.nih.gov/26463139/
4. **Magie bổ sung tích luỹ trong cơ thể khi suy thận.**
   - NCBI StatPearls, *Hypermagnesemia*: https://www.ncbi.nlm.nih.gov/books/NBK549811/
   - Cleveland Clinic, *Hypermagnesemia*: https://my.clevelandclinic.org/health/diseases/hypermagnesemia
5. **Creatine làm creatinin máu tăng giả, nên eGFR thấp giả.**
   - Ca bệnh, BMJ Case Reports 2014: https://casereports.bmj.com/content/2014/bcr-2014-204754.full
   - *How we estimate GFR: a pitfall of using a serum creatinine-based formula*, Clin Nephrol 2007: https://pubmed.ncbi.nlm.nih.gov/17969491/
   - Ý 5 dùng lại cho `co`.

### xuong (Xương)
- Dùng lại ý 1 và 2 của `than`, cùng nguồn.

### khop (Khớp)
1. Dùng lại ý 3 của `tieuhoa` (nghệ, gan).
2. **Glucosamine có thể làm tăng INR ở người dùng warfarin.**
   - Health Sciences Authority Singapore, *Reports of warfarin–glucosamine interaction*: https://www.hsa.gov.sg/announcements/reports-of-warfarin-glucosamine-interaction/
   - Ca bệnh trên PubMed: https://pubmed.ncbi.nlm.nih.gov/18363538/

### mo (Mỡ máu)
1. **Men gạo đỏ chứa monacolin K, giống hệt lovastatin. Có cùng tác dụng phụ và tương tác như statin. Hàm lượng chênh nhau hơn 60 lần giữa các sản phẩm.**
   - NCCIH, *Red Yeast Rice: What You Need To Know*: https://www.nccih.nih.gov/health/red-yeast-rice
   - EFSA ANS Panel, *Scientific opinion on the safety of monacolins in red yeast rice* (2018). Đọc qua tóm tắt, chưa mở trang gốc.

### ngu (Giấc ngủ)
1. **Kava liên quan tới tổn thương gan nặng.**
   - NCCIH, *Kava*, và trang *How Safe Is This Product or Practice?*: https://www.nccih.nih.gov/health/how-safe-is-this-product-or-practice
   - NICHD (NIH), *Do natural products help people sleep?*: https://www.nichd.nih.gov/health/topics/sleep/conditioninfo/natural-products
2. **Valerian có thể cộng tác dụng với thuốc an thần, rượu và chất an thần khác. Có báo cáo tổn thương gan hiếm gặp, thường khi dùng kèm thảo dược khác.**
   - NCCIH, *Valerian*: https://www.nccih.nih.gov/health/valerian
   - MSD Manual (bản cho người dùng), *Valerian*: https://www.msdmanuals.com/home/special-subjects/dietary-supplements-and-vitamins/valerian
3. **Không nên dùng melatonin cho người cao tuổi bị sa sút trí tuệ.**
   - NCCIH, *Myth busting popular natural products…*: https://www.nccih.nih.gov/health/providers/digest/myth-busting-popular-natural-products-marketed-for-disease-prevention-and-wellness-science
   - Hướng dẫn của American Academy of Sleep Medicine. NCCIH trích lại, nên hai nguồn này **không hoàn toàn độc lập**. Cần quản lý duyệt.

### dinhduong (Dinh dưỡng)
1. **Sụt cân không chủ ý cần sàng lọc và tìm nguyên nhân. Ưu tiên tư vấn ăn uống và tăng cường thức ăn trước, chế phẩm dinh dưỡng đường uống dùng theo chỉ định.**
   - NICE CG32, *Nutrition support for adults*: https://www.nice.org.uk/guidance/cg32
   - PrescQIPP, *Oral nutritional supplements briefing*: https://www.prescqipp.info/media/5754/261-oral-nutritional-supplements-briefing-22.pdf
   - PrescQIPP dựa một phần trên NICE. Cần quản lý duyệt.

### co, metmoi
- `co`: dùng lại ý 5 của `than` (creatine). Cystatin C ít bị ảnh hưởng hơn, theo nguồn BMJ 2014 và Clin Nephrol 2007 ở trên.
- `metmoi`: dùng lại ý 2 của `giap` (biotin). Ý biotin làm sai troponin cũng có trong cả ba nguồn của ý đó.

### tim, duong
- Đã điền cột `can_kham_truoc`. Cột `ghi_chu_an_toan` **để trống** vì chưa có ý nào đủ 2 nguồn uy tín (xem mục dưới).

## Cần kiểm chứng (chưa đưa vào CSV)

| Mục tiêu | Ý | Vì sao chưa đưa vào |
|---|---|---|
| xuong / giap | Magie và canxi làm giảm hấp thu levothyroxine và bisphosphonat, cần uống cách vài giờ | Chỉ tìm được trang web cho người dùng. Cần nhãn thuốc EMA/FDA. |
| tim | Kali bổ sung và chất thay muối chứa kali có thể gây tăng kali máu khi dùng thuốc ức chế men chuyển hoặc chẹn thụ thể angiotensin | Chưa tìm được 2 nguồn trong phiên này. |
| duong | Berberin cộng tác dụng hạ đường huyết với thuốc tiểu đường, có thể tương tác qua CYP | Chỉ có nguồn thương mại. |
| gout | Niacin liều cao làm tăng acid uric. Vitamin C có thể giảm nhẹ acid uric | Nguồn thứ cấp hoặc kết quả trái chiều. |
| giap | Thảo dược độc gan dùng cùng thuốc kháng giáp, vốn hiếm khi gây tổn thương gan | LiverTox chỉ nói về thuốc kháng giáp, không nói về phối hợp với thảo dược. |
| ngu | Valerian không được khuyến nghị cho mất ngủ mạn tính (AASM 2017) | Đây là ý về hiệu quả, không phải an toàn, và chỉ có 1 nguồn gốc. |
| dinhduong | Ngưỡng cụ thể: BMI < 18,5 hoặc sụt hơn 10% cân nặng trong 3 đến 6 tháng | Chỉ có NICE CG32, cần nguồn thứ hai như ESPEN. |

## Đề xuất thêm dòng vào Bảng Ý (`bang-y.csv`)

Trạng thái đề xuất là `cho_duyet`. Mỗi đề xuất dùng nguồn đã liệt kê ở trên.

| chat | muc_tieu | huong | noi_dung đề xuất | Nguồn |
|---|---|---|---|---|
| ca | than | hai | Canxi dạng viên bổ sung liên quan tới sỏi thận, canxi từ thức ăn thì không | NIH ODS Calcium; IOM 2011 |
| vitD | than | hai | Vitamin D quá mức gây tăng canxi máu và canxi niệu, có thể dẫn tới lắng đọng canxi ở thận | IOM 2011; Malihi 2016 |
| vitC | than | hai | Vitamin C liều cao (từ khoảng 1000 mg/ngày) làm tăng oxalat niệu và nguy cơ sỏi, rõ hơn ở nam | Traxer 2003; Ferraro 2016 |
| mg | than | hai | Magie bổ sung có thể tích luỹ khi suy thận | StatPearls; Cleveland Clinic |
| creatine | than | hai | Creatine làm tăng creatinin máu giả, làm sai eGFR | BMJ Case Rep 2014; Clin Nephrol 2007 |
| io | giap | hai | I-ốt liều cao, tảo bẹ và rong biển có thể làm rối loạn tuyến giáp và cộng tác dụng với thuốc kháng giáp | NIH ODS Iodine; MedlinePlus |
| biotin | giap | hai | Biotin liều cao làm sai xét nghiệm tuyến giáp | FDA; HSA; ADLM |
| b12 | tieuhoa | loi | Viêm teo dạ dày làm giảm hấp thu B12 từ thức ăn. B12 dạng bổ sung vẫn hấp thu được | Baik & Russell 1999; LPI |
| curc | khop | hai | Nghệ hoặc curcumin dạng tăng hấp thu có báo cáo hiếm gặp gây tổn thương gan | LiverTox; TGA |
| gluco | khop | hai | Glucosamine có thể làm tăng INR khi dùng cùng warfarin | HSA Singapore; PubMed 18363538 |
| valerian | ngu | hai | Valerian cộng tác dụng với thuốc an thần và rượu | NCCIH; MSD Manual |
| mg | ngu | (chưa) | Magie với giấc ngủ: bang-y.csv chưa có dòng này. **Chưa đủ nguồn trong phiên này**, cần tìm thêm (NIH ODS Magnesium, Cochrane) trước khi thêm | — |
| redyeast (mã chất mới) | mo | hai | Men gạo đỏ chứa monacolin K giống lovastatin. Không dùng cùng statin | NCCIH; EFSA 2018 |
