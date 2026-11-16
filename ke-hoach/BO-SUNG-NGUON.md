# Bổ sung nguồn cho các ý "cần kiểm chứng" (2026-11-16)

Tra bằng WebSearch. Phần lớn nguồn chỉ đọc qua kết quả tìm kiếm, chưa mở toàn văn, nên mọi dòng đều cần quản lý duyệt. Không sửa file có sẵn; chỉ tạo các file dưới đây.

## Đã đủ 2 nguồn (ghi vào file bổ sung)

| Ý | File | Nguồn |
|---|---|---|
| Berberin/goldenseal với thuốc tiểu đường (TT-101) | `du-lieu/tuong-tac-bo-sung.csv` | NCCIH Goldenseal; Merck Manual Goldenseal (mỗi nguồn nói một khía cạnh khác nhau, nên để `mot_phan`) |
| Glucosamin với warfarin, INR tăng (TT-102) | `du-lieu/tuong-tac-bo-sung.csv` | EFSA Journal 2011;9(12):2473; HSA Singapore (dẫn báo cáo MHRA); Pharmacotherapy 2008 |
| Tỏi viên với thuốc chống đông (TT-103) | `du-lieu/tuong-tac-bo-sung.csv` | MSKCC About Herbs; NCCIH Garlic (bản lưu 2020) |
| B6 với levodopa không kèm carbidopa (TT-104) | `du-lieu/tuong-tac-bo-sung.csv` | Nhãn Sinemet; Patient.info |
| Ashwagandha và tổn thương gan | `du-lieu/y-bo-sung-2.csv` | LiverTox NBK548637; NCCIH (cùng NIH, cơ quan khác nhau, quản lý cần quyết có tính là độc lập không) |
| tim: kali/muối kali với ACEi/ARB, xét nghiệm kali | `du-lieu/muc-tieu-bo-sung.csv` | NIH ODS Potassium; SmPC ramipril (HPRA); SmPC lisinopril eMC (đã dẫn trong TT-021) |
| duong: thảo dược không thay thuốc, có thể tương tác | `du-lieu/muc-tieu-bo-sung.csv` | ADA Standards of Care; NCCIH; Merck Manual |
| gout: vitamin C hạ acid uric không đáng kể | `du-lieu/muc-tieu-bo-sung.csv` | ACR 2020; Cochrane CD010156 (2021) |
| ngu: valerian/thảo dược không được khuyến nghị cho mất ngủ mạn | `du-lieu/muc-tieu-bo-sung.csv` | AASM 2017 (Sateia); European guideline 2017 (Riemann, chỉ nói chung "phytotherapeutics") |
| dinhduong: ngưỡng BMI và sụt cân | `du-lieu/muc-tieu-bo-sung.csv` | NICE CG32; ESPEN 2015; GLIM 2019 (ngưỡng sụt cân khác nhau giữa các nguồn, đã ghi rõ) |

Đã có sẵn trong `tuong-tac.csv` (phiên khác đang xử lý, không thêm): magie/canxi cách giờ với levothyroxine (TT-001, TT-003) và bisphosphonat (TT-024, TT-025); kali với ACEi/ARB (TT-021).

## Vẫn chưa đủ

| Ý | Đã tìm được | Thiếu gì |
|---|---|---|
| Canxi với chẹn beta | Atenolol: nghiên cứu 1981 (đỉnh nồng độ giảm khoảng 51% với canxi carbonat), qua Drugs.com và People's Pharmacy. Bisoprolol: chỉ có trang chất lượng thấp. | Nhãn/SmPC Tenormin hoặc bisoprolol. Với bisoprolol (hấp thu gần hoàn toàn) chưa có bằng chứng; dòng `concor-ca` vẫn chưa có cơ sở. |
| Magie với chẹn beta (cộng hạ huyết áp) | Không tìm thêm được. | Mọi nguồn chính thức. |
| Kali với chẹn beta | Không tìm thêm được. | Nhãn thuốc. |
| Ginseng với warfarin | Yuan et al., Ann Intern Med 2004 (PMID 15238367): nhân sâm Mỹ giảm nhẹ INR (-0,19) ở người khỏe; AAFP 2005 chỉ tóm tắt bài này. | Nguồn độc lập thứ hai (NCCIH, MSKCC). |
| Ginseng, ashwagandha với thuốc tiểu đường | Chưa tìm. | Cả hai nguồn. |
| Ashwagandha làm tăng hormon tuyến giáp (nguy cơ với người cường giáp, dùng thuốc kháng giáp) | Chỉ trang thứ cấp nhắc NCCIH/ODS và báo cáo ca nhiễm độc giáp. | Mở trực tiếp NCCIH và một nguồn khác. Ý này quan trọng cho người đang dùng thuốc kháng giáp. |
| CoQ10 với warfarin | Báo cáo ca INR giảm; RCT 24 người không thấy ảnh hưởng (qua cơ sở dữ liệu tương tác). | Nguồn chính thức; bằng chứng mâu thuẫn. |
| Anh đào với gout | ACR 2020 không đạt đồng thuận về anh đào (qua tóm tắt guidelinecentral). | Không có hướng dẫn hay Cochrane ủng hộ; giữ nguyên không đưa vào. |
| Thảo dược độc gan với thuốc kháng giáp | ATA 2016: kiểm tra men gan trước khi dùng thuốc kháng giáp, khi có triệu chứng; PTU có cảnh báo đóng khung của FDA (2010). | Không nguồn nào nói về phối hợp với thảo dược. Men gan đã có sẵn trong `can_kham_truoc` của giap. |
| Thuốc đối kháng dopamine với TPCN | Không tìm thêm được. | Chưa có tương tác TPCN nào đủ nguồn. |
| Cỏ St. John với thuốc tiểu đường | Không tìm thêm. | Nguồn riêng cho nhóm này. |
| Niacin với acid uric | Đã có FDA và MSKCC trong `y-bo-sung.csv`; không tìm thêm. | MSKCC chưa đọc toàn văn. |

## Lưu ý cho người cao tuổi theo nhóm thuốc đã nêu
- Thuốc kháng giáp: tránh tự dùng ashwagandha (liên quan gan và có thể làm tăng hormon tuyến giáp, ý sau chưa đủ nguồn).
- Bisoprolol: chưa có nguồn cho tương tác với canxi; không nên khẳng định trong app.
- Rosuvastatin, thuốc ức chế bơm proton: không có ý mới trong đợt này (đã có TT-009 đến TT-011, TT-035 đến TT-037).
- Lắng đọng canxi ở thận: ý canxi/vitamin D liều cao đã có trong mục tiêu xuong; không thêm.
