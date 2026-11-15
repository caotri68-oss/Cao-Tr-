# Kiểm chứng nguồn bảng tương tác thuốc-TPCN

Ngày: 2026-11-15. File dữ liệu: `ke-hoach/du-lieu/tuong-tac.csv` (40 dòng).

## 1. Giới hạn của lần kiểm chứng này

- Môi trường chặn mọi tên miền đích: WebFetch trả lỗi `ENOTFOUND` với `medlineplus.gov`, `ods.od.nih.gov`, `www.nccih.nih.gov`, `www.ema.europa.eu`. Cần mở các tên miền này trong cài đặt mạng của phiên rồi chạy lại.
- Vì vậy KHÔNG mở được trang nào. Mọi xác nhận dưới đây chỉ là kết quả WebSearch (tiêu đề, URL, đoạn trích), chỉ cho biết URL có tồn tại và đúng chủ đề thuốc, không cho biết trang có nói ý tương tác trong dòng.
- Do đó cột `da_kiem_chung` = `khong` cho cả 40 dòng (định nghĩa: `co` = đã mở và thấy ý; `mot_phan` = chỉ thấy một nguồn; `khong` = không mở được). Không có dòng nào bị bác bỏ bằng chứng, nên không dòng nào bị chuyển sang mục 8.

## 2. Kết quả theo URL (đã đối chiếu)

| URL MedlinePlus | Trang thật | Ghi chú về phạm vi |
|---|---|---|
| meds/a682461 | levothyroxine | Đúng thuốc. TT-003 dùng làm nguồn cho Mg/nhôm/kháng acid: chưa thấy nội dung |
| meds/a688016 | ciprofloxacin | Đúng. Dòng TT-027..030 nói cả nhóm quinolon, nguồn chỉ là ciprofloxacin |
| meds/a682063 | doxycycline | Đúng. TT-031..034 nói cả nhóm tetracyclin; snippet nói trang có nhắc kháng acid, canxi, sắt |
| meds/a692051 | lisinopril | Đúng. TT-021 nói ACEi/ARB; ARB chưa có nguồn riêng. Chưa thấy trang nhắc kali |
| meds/a682277 | warfarin | Đúng. TT-012 nói cả acenocoumarol; chưa thấy trang nhắc vitamin K |
| meds/a601011 | alendronate | Đúng. Bản lưu trữ có câu chờ 30 phút, không dùng vitamin/kháng acid |
| ency/article/002421 | Iodine in diet | Tồn tại; chưa thấy ý kháng giáp |
| druginfo/natural/329, 333, 870, 954 | St. John's wort, Ginkgo, Valerian, Vitamin E | Chỉ thấy bản lưu trữ 2009-2013; MedlinePlus ghi nội dung TRC không còn khả dụng từ 29/7/2025. Đã bỏ URL, giữ tên tài liệu |
| ods.od.nih.gov, nccih.nih.gov (các URL trong CSV) | - | Không mở được, chưa kiểm |

Tổng: 6 URL thuốc MedlinePlus đúng chủ đề; 1 URL encyclopedia tồn tại; 4 URL natural/ nghi đã gỡ (bỏ khỏi CSV); 0 URL xác nhận sai chủ đề; các URL ODS và NCCIH chưa kiểm.

## 3. Nguồn ngoài NIH tìm thêm (chỉ qua kết quả tìm kiếm, chưa mở trang)

- ATA, Statement on excess iodine (thyroid.org): người có bệnh tuyến giáp dễ bị hại do thừa i-ốt, khuyên tránh viên i-ốt/kelp trên 500 mcg/ngày. Gắn vào TT-004, 005, 006. Chưa thấy ATA nói riêng về thuốc kháng giáp hay Jod-Basedow.
- EMA HMPC Hypericum perforatum rev.1 (2022): tương tác dược động học cảm ứng CYP/P-gp, hội chứng serotonin (trong assessment report). Gắn vào TT-010, 013, 039. Chưa thấy câu riêng về SSRI.
- EMA HMPC Ginkgo folium: bản draft 2014 nêu thuốc chống đông và chống tiểu cầu; bản cuối chưa xem. Gắn vào TT-016, 020.
- EMA HMPC Valerian: bản 2006 (đã thay thế) nêu không khuyến cáo phối hợp thuốc an thần tổng hợp; cần bản hiện hành. Gắn vào TT-040.
- SmPC ciprofloxacin (eMC) và SmPC doxycycline (eMC, Efracea), bảng HSE Ireland, NHS Scotland: gắn vào TT-027..034.
- Pharmaceutical Journal (dựa Stockley), Mayo Clinic cho levothyroxine: gắn vào TT-001, 002.

Chi tiết ghi trong cột `ghi_chu` bằng cụm "Nguồn ngoài NIH (chưa mở được trang...)".

## 4. Chỗ nguồn ngoài lệch với khuyến nghị trong CSV (cần người rà)

- TT-001/002 (levothyroxine với canxi/sắt): nguồn ngoài cho khoảng 2 giờ (sắt) đến 4 giờ (canxi); CSV ghi 4 giờ cho cả hai. An toàn hơn, nhưng lệch.
- TT-031 (doxycycline với canxi): NHS Scotland nói SPC/BNF coi canxi/sữa ít ảnh hưởng, còn Stockley khuyên tránh dùng chung. Mức `than_trong` còn hợp lý nhưng cơ chế nên ghi là có tranh luận.
- TT-032/034 (tetracyclin với Mg/Zn): SmPC doxycycline nói 2 đến 3 giờ sau thuốc; CSV ghi 4-6 giờ sau Mg/Zn (nghiêm hơn).
- TT-027..030: lời khuyên 2 giờ trước/6 giờ sau chưa thấy câu SmPC xác nhận.

## 5. Bảng từng dòng

Tất cả dòng: `da_kiem_chung` = khong.

| Mã | Mức | Nguồn 1 | Nguồn 2 | Đã sửa |
|---|---|---|---|---|
| TT-001 | than_trong | https://ods.od.nih.gov/factsheets/Calcium-HealthProfessio...: không mở được (máy chủ chặn tên miền), chưa kiểm | Nhãn FDA levothyroxine (Synthroid), mục Drug Interactions: tài liệu không có URL, không mở được, chưa kiểm | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-002 | than_trong | https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/: không mở được (máy chủ chặn tên miền), chưa kiểm | Nhãn FDA levothyroxine (Synthroid), mục Drug Interactions: tài liệu không có URL, không mở được, chưa kiểm | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-003 | than_trong | Nhãn FDA levothyroxine (Synthroid), mục Drug Interactions: tài liệu không có URL, không mở được, chưa kiểm | https://medlineplus.gov/druginfo/meds/a682461.html: URL tồn tại, đúng trang levothyroxine (xác nhận qua tìm kiếm, không mở được nội dung); chỉ levothyroxine | thêm cột da_kiem_chung |
| TT-004 | than_trong | https://ods.od.nih.gov/factsheets/Iodine-HealthProfession...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/ency/article/002421.htm: URL tồn tại, trang Iodine in diet (qua tìm kiếm; mới thấy nói kelp giàu i-ốt, chưa thấy ý thuốc kháng giáp) | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-005 | chan | https://ods.od.nih.gov/factsheets/Iodine-HealthProfession...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/ency/article/002421.htm: URL tồn tại, trang Iodine in diet (qua tìm kiếm; mới thấy nói kelp giàu i-ốt, chưa thấy ý thuốc kháng giáp) | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-006 | than_trong | https://ods.od.nih.gov/factsheets/Iodine-HealthProfession...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/ency/article/002421.htm: URL tồn tại, trang Iodine in diet (qua tìm kiếm; mới thấy nói kelp giàu i-ốt, chưa thấy ý thuốc kháng giáp) | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-007 | luu_y | FDA Safety Communication: biotin may interfere with lab t...: tài liệu không có URL, không mở được, chưa kiểm | https://myadlm.org/cln/Articles/2018/JanFeb/Meeting-the-B...: không mở được (máy chủ chặn tên miền), chưa kiểm | thêm cột da_kiem_chung |
| TT-008 | luu_y | FDA Safety Communication: biotin may interfere with lab t...: tài liệu không có URL, không mở được, chưa kiểm | https://myadlm.org/cln/Articles/2018/JanFeb/Meeting-the-B...: không mở được (máy chủ chặn tên miền), chưa kiểm | thêm cột da_kiem_chung |
| TT-009 | chan | https://www.nccih.nih.gov/health/red-yeast-rice: không mở được (máy chủ chặn tên miền), chưa kiểm | EFSA Scientific opinion on the safety of monacolins in re...: tài liệu không có URL, không mở được, chưa kiểm | thêm cột da_kiem_chung |
| TT-010 | than_trong | https://www.nccih.nih.gov/health/st-johns-wort: không mở được (máy chủ chặn tên miền), chưa kiểm | MedlinePlus Herbs and Supplements: St. John's wort (trang...: trang natural/ do TRC biên soạn, MedlinePlus ghi nội dung TRC không còn khả dụng từ 29/7/2025; chỉ thấy bản lưu trữ; đã bỏ URL, chỉ ghi tên | bỏ URL natural/, ghi tên; thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-011 | than_trong | https://ods.od.nih.gov/factsheets/Niacin-HealthProfession...: không mở được (máy chủ chặn tên miền), chưa kiểm | Nhãn FDA simvastatin (Zocor), mục Warnings: Myopathy/Rhab...: tài liệu không có URL, không mở được, chưa kiểm | thêm cột da_kiem_chung |
| TT-012 | than_trong | https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessi...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/druginfo/meds/a682277.html: URL tồn tại, đúng trang warfarin (xác nhận qua tìm kiếm, không mở được nội dung); chỉ warfarin, không có acenocoumarol | thêm cột da_kiem_chung |
| TT-013 | chan | https://www.nccih.nih.gov/health/st-johns-wort: không mở được (máy chủ chặn tên miền), chưa kiểm | SmPC Eliquis (apixaban), EMA, mục 4.5: tài liệu không có URL, không mở được, chưa kiểm | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-014 | than_trong | https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Health...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://www.nccih.nih.gov/health/omega3-supplements-what-...: không mở được (máy chủ chặn tên miền), chưa kiểm | thêm cột da_kiem_chung |
| TT-015 | than_trong | https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessi...: không mở được (máy chủ chặn tên miền), chưa kiểm | MedlinePlus Herbs and Supplements: Vitamin E (trang natur...: trang natural/ do TRC biên soạn, MedlinePlus ghi nội dung TRC không còn khả dụng từ 29/7/2025; chỉ thấy bản lưu trữ; đã bỏ URL, chỉ ghi tên | bỏ URL natural/, ghi tên; thêm cột da_kiem_chung |
| TT-016 | than_trong | https://www.nccih.nih.gov/health/ginkgo: không mở được (máy chủ chặn tên miền), chưa kiểm | MedlinePlus Herbs and Supplements: Ginkgo (trang natural/...: trang natural/ do TRC biên soạn, MedlinePlus ghi nội dung TRC không còn khả dụng từ 29/7/2025; chỉ thấy bản lưu trữ; đã bỏ URL, chỉ ghi tên | bỏ URL natural/, ghi tên; thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-017 | than_trong | https://www.nccih.nih.gov/health/turmeric: không mở được (máy chủ chặn tên miền), chưa kiểm | LiverTox (NIDDK): Turmeric: tài liệu không có URL, không mở được, chưa kiểm | thêm cột da_kiem_chung |
| TT-018 | luu_y | https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Health...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://www.nccih.nih.gov/health/omega3-supplements-what-...: không mở được (máy chủ chặn tên miền), chưa kiểm | thêm cột da_kiem_chung |
| TT-019 | than_trong | https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessi...: không mở được (máy chủ chặn tên miền), chưa kiểm | MedlinePlus Herbs and Supplements: Vitamin E (trang natur...: trang natural/ do TRC biên soạn, MedlinePlus ghi nội dung TRC không còn khả dụng từ 29/7/2025; chỉ thấy bản lưu trữ; đã bỏ URL, chỉ ghi tên | bỏ URL natural/, ghi tên; thêm cột da_kiem_chung |
| TT-020 | than_trong | https://www.nccih.nih.gov/health/ginkgo: không mở được (máy chủ chặn tên miền), chưa kiểm | MedlinePlus Herbs and Supplements: Ginkgo (trang natural/...: trang natural/ do TRC biên soạn, MedlinePlus ghi nội dung TRC không còn khả dụng từ 29/7/2025; chỉ thấy bản lưu trữ; đã bỏ URL, chỉ ghi tên | bỏ URL natural/, ghi tên; thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-021 | chan | https://ods.od.nih.gov/factsheets/Potassium-HealthProfess...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/druginfo/meds/a692051.html: URL tồn tại, đúng trang lisinopril (xác nhận qua tìm kiếm, không mở được nội dung); chỉ lisinopril (ACEi), không bao gồm ARB | thêm cột da_kiem_chung |
| TT-022 | than_trong | https://ods.od.nih.gov/factsheets/Calcium-HealthProfessio...: không mở được (máy chủ chặn tên miền), chưa kiểm | Nhãn FDA hydrochlorothiazide, mục Drug Interactions (muối...: tài liệu không có URL, không mở được, chưa kiểm | thêm cột da_kiem_chung |
| TT-023 | than_trong | https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessi...: không mở được (máy chủ chặn tên miền), chưa kiểm | Nhãn FDA hydrochlorothiazide, mục Drug Interactions (muối...: tài liệu không có URL, không mở được, chưa kiểm | thêm cột da_kiem_chung |
| TT-024 | than_trong | https://medlineplus.gov/druginfo/meds/a601011.html: URL tồn tại, đúng trang alendronate (xác nhận qua tìm kiếm, không mở được nội dung); chỉ alendronate | https://ods.od.nih.gov/factsheets/Calcium-HealthProfessio...: không mở được (máy chủ chặn tên miền), chưa kiểm | thêm cột da_kiem_chung |
| TT-025 | than_trong | https://medlineplus.gov/druginfo/meds/a601011.html: URL tồn tại, đúng trang alendronate (xác nhận qua tìm kiếm, không mở được nội dung); chỉ alendronate | https://ods.od.nih.gov/factsheets/Magnesium-HealthProfess...: không mở được (máy chủ chặn tên miền), chưa kiểm | thêm cột da_kiem_chung |
| TT-026 | than_trong | https://medlineplus.gov/druginfo/meds/a601011.html: URL tồn tại, đúng trang alendronate (xác nhận qua tìm kiếm, không mở được nội dung); chỉ alendronate | SmPC alendronat (EMA/MHRA), mục 4.5: tài liệu không có URL, không mở được, chưa kiểm | thêm cột da_kiem_chung |
| TT-027 | than_trong | https://ods.od.nih.gov/factsheets/Calcium-HealthProfessio...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/druginfo/meds/a688016.html: URL tồn tại, đúng trang ciprofloxacin (xác nhận qua tìm kiếm, không mở được nội dung); chỉ ciprofloxacin, không phải cả nhóm quinolon | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-028 | than_trong | https://ods.od.nih.gov/factsheets/Magnesium-HealthProfess...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/druginfo/meds/a688016.html: URL tồn tại, đúng trang ciprofloxacin (xác nhận qua tìm kiếm, không mở được nội dung); chỉ ciprofloxacin, không phải cả nhóm quinolon | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-029 | than_trong | https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/druginfo/meds/a688016.html: URL tồn tại, đúng trang ciprofloxacin (xác nhận qua tìm kiếm, không mở được nội dung); chỉ ciprofloxacin, không phải cả nhóm quinolon | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-030 | than_trong | https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/druginfo/meds/a688016.html: URL tồn tại, đúng trang ciprofloxacin (xác nhận qua tìm kiếm, không mở được nội dung); chỉ ciprofloxacin, không phải cả nhóm quinolon | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-031 | than_trong | https://ods.od.nih.gov/factsheets/Calcium-HealthProfessio...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/druginfo/meds/a682063.html: URL tồn tại, đúng trang doxycycline (xác nhận qua tìm kiếm, không mở được nội dung); chỉ doxycycline, không phải cả nhóm tetracyclin | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-032 | than_trong | https://ods.od.nih.gov/factsheets/Magnesium-HealthProfess...: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/druginfo/meds/a682063.html: URL tồn tại, đúng trang doxycycline (xác nhận qua tìm kiếm, không mở được nội dung); chỉ doxycycline, không phải cả nhóm tetracyclin | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-033 | than_trong | https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/druginfo/meds/a682063.html: URL tồn tại, đúng trang doxycycline (xác nhận qua tìm kiếm, không mở được nội dung); chỉ doxycycline, không phải cả nhóm tetracyclin | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-034 | than_trong | https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/: không mở được (máy chủ chặn tên miền), chưa kiểm | https://medlineplus.gov/druginfo/meds/a682063.html: URL tồn tại, đúng trang doxycycline (xác nhận qua tìm kiếm, không mở được nội dung); chỉ doxycycline, không phải cả nhóm tetracyclin | thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-035 | luu_y | https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfes...: không mở được (máy chủ chặn tên miền), chưa kiểm | Lam JR et al., JAMA 2013;310(22):2435-42 (PPI, H2RA và th...: tài liệu không có URL, không mở được, chưa kiểm | thêm cột da_kiem_chung |
| TT-036 | luu_y | https://ods.od.nih.gov/factsheets/Magnesium-HealthProfess...: không mở được (máy chủ chặn tên miền), chưa kiểm | FDA Drug Safety Communication: PPI và hạ magie máu (2011): tài liệu không có URL, không mở được, chưa kiểm | thêm cột da_kiem_chung |
| TT-037 | luu_y | https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/: không mở được (máy chủ chặn tên miền), chưa kiểm | Nhãn FDA omeprazole (Prilosec), mục Drug Interactions: th...: tài liệu không có URL, không mở được, chưa kiểm | thêm cột da_kiem_chung |
| TT-038 | than_trong | https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/: không mở được (máy chủ chặn tên miền), chưa kiểm | SmPC/nhãn carbidopa-levodopa (Sinemet), mục Drug Interact...: tài liệu không có URL, không mở được, chưa kiểm | thêm cột da_kiem_chung |
| TT-039 | chan | https://www.nccih.nih.gov/health/st-johns-wort: không mở được (máy chủ chặn tên miền), chưa kiểm | MedlinePlus Herbs and Supplements: St. John's wort (trang...: trang natural/ do TRC biên soạn, MedlinePlus ghi nội dung TRC không còn khả dụng từ 29/7/2025; chỉ thấy bản lưu trữ; đã bỏ URL, chỉ ghi tên | bỏ URL natural/, ghi tên; thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |
| TT-040 | than_trong | https://www.nccih.nih.gov/health/valerian: không mở được (máy chủ chặn tên miền), chưa kiểm | MedlinePlus Herbs and Supplements: Valerian (trang natura...: trang natural/ do TRC biên soạn, MedlinePlus ghi nội dung TRC không còn khả dụng từ 29/7/2025; chỉ thấy bản lưu trữ; đã bỏ URL, chỉ ghi tên | bỏ URL natural/, ghi tên; thêm nguồn ngoài NIH vào ghi_chu; thêm cột da_kiem_chung |

## 6. Tổng kết

- Giữ nguyên nội dung: 19 dòng (chỉ thêm cột `da_kiem_chung`).
- Sửa (bỏ URL natural/ nghi đã gỡ, và/hoặc thêm nguồn ngoài NIH): 21 dòng.
- Chuyển sang mục 8 của GIAI-DOAN-7.md: 0 dòng (không có bằng chứng bác bỏ; chỉ là chưa kiểm được).
- Dòng `chan`: TT-005, 009, 013, 021, 039. Vẫn đủ 2 nguồn trên giấy, nhưng chưa nguồn nào được mở. TT-013 và TT-039 có thêm nguồn EMA (HMPC); TT-005 có thêm ATA (không nói riêng về kháng giáp); TT-009 và TT-021 chưa có nguồn thứ ba.
- Khuyến nghị: mở tên miền `medlineplus.gov`, `ods.od.nih.gov`, `www.nccih.nih.gov`, `www.ema.europa.eu`, `www.medicines.org.uk` rồi chạy lại để nâng `da_kiem_chung` lên `co` hoặc `mot_phan`.
