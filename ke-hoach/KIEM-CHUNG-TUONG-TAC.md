# Kiểm chứng nguồn bảng tương tác thuốc-TPCN

Ngày: 2026-11-16 (lần 2; lần 1 ngày 2026-11-15 chưa mở được trang nào). File dữ liệu: `ke-hoach/du-lieu/tuong-tac.csv` (40 dòng).

## 1. Cách kiểm và định nghĩa

- Mở trang bằng curl (qua proxy của môi trường) và WebFetch, đọc nội dung chữ của trang, rồi tìm câu nói đúng ý tương tác trong dòng (cơ chế, khuyến nghị, đặc biệt số giờ).
- `co`: ít nhất 2 nguồn đã mở nói đúng ý dòng. `mot_phan`: chỉ 1 nguồn đã mở nói đúng ý, hoặc 2 nguồn nhưng một phần ý của dòng chưa có nguồn (ghi rõ trong `ghi_chu`). `khong`: không nguồn nào đã mở nói ý đó.
- Cột `ghi_chu` mỗi dòng có câu bắt đầu bằng `KC 2026-11-16:` ghi trang nào nói gì, trang nào không mở được.
- Nguồn thay thế: nhãn FDA, EFSA, JAMA, LiverTox, FDA Safety Communication không có URL trong CSV và tên miền ngoài danh sách cho phép, nên chưa mở. Với một số dòng, SmPC trên eMC (medicines.org.uk) và EMA hoặc trang MedlinePlus đã mở được dùng thay làm nguồn xác nhận; mỗi dòng ghi rõ nguồn nào được dùng. SmPC là nhãn của Anh/EU, không phải nhãn FDA trong CSV.

## 2. Trang đã mở và không mở được

| Nhóm | Tình trạng |
|---|---|
| medlineplus.gov: levothyroxine a682461, ciprofloxacin a688016, doxycycline a682063, lisinopril a692051, warfarin a682277, alendronate a601011, Iodine in diet ency/002421 | Mở được, đúng chủ đề |
| medlineplus.gov/druginfo/natural/329, 333, 870, 954 | HTTP 404 (trang thông tin thảo dược TRC đã gỡ). Không còn dùng làm nguồn |
| www.nccih.nih.gov: red-yeast-rice, st-johns-wort, ginkgo, valerian, turmeric, omega3-supplements-what-you-need-to-know | Mở được. Turmeric và Omega-3 không nói ý chảy máu/thuốc chống đông |
| www.ema.europa.eu: HMPC Hypericum (opinion rev.1 và assessment report), Ginkgo (draft 2014), Valerian (bản 2006 đã thay thế), SmPC Eliquis (EPAR product information) | Mở được |
| www.medicines.org.uk (eMC): SmPC ciprofloxacin 4346, doxycycline Efracea 6652, và SmPC levothyroxine, simvastatin, alendronic acid, omeprazole, lisinopril, warfarin, Sinemet, hydrochlorothiazide phối hợp | Mở được |
| ods.od.nih.gov (12 trang factsheet) | HTTP 403, trang "Attention Required | Cloudflare" khi dùng curl và cả WebFetch. Chưa mở được trang nào |
| thyroid.org, assets.hse.ie, myadlm.org, pharmaceutical-journal.com, mayoclinic.org | Không kết nối được (tên miền ngoài danh sách cho phép). Chưa mở |
| Nhãn FDA, EFSA 2018, JAMA 2013, LiverTox, FDA Safety Communication | Không có URL trong CSV, chưa mở |

## 3. Khuyến nghị đã sửa theo nguồn

- TT-032 (doxycyclin với magie): CSV cũ ghi kháng sinh 2 giờ trước hoặc 4-6 giờ sau magie. SmPC Efracea: magie uống sau doxycyclin 2-3 giờ. MedlinePlus: 1-2 giờ trước hoặc sau. Đã sửa theo hai nguồn.
- TT-034 (doxycyclin với kẽm): CSV cũ 4-6 giờ sau kẽm; SmPC Efracea 2-3 giờ. Đã sửa. MedlinePlus không nêu kẽm.
- TT-031, TT-033: CSV cũ ghi chung "vài giờ"; đã thay bằng số giờ của SmPC và MedlinePlus (canxi: SmPC 2-3 giờ sau doxycyclin, MedlinePlus 1-2 giờ; sắt: SmPC 2-3 giờ sau, MedlinePlus 3 giờ trước hoặc 2 giờ sau).
- TT-005 (i-ốt với thuốc kháng giáp, mức chan): MedlinePlus nói tác dụng cộng có thể gây suy giáp; CSV cũ ghi làm cường giáp khó kiểm soát (Jod-Basedow). Đã sửa `co_che` theo MedlinePlus; ý Jod-Basedow chưa có nguồn mở được. Mức `chan` và khuyến nghị giữ nguyên, cần người rà.
- TT-013: SmPC Eliquis xác nhận apixaban; rivaroxaban, dabigatran chưa có nguồn đã mở nên `co_che` chỉ khẳng định apixaban.
- TT-036: SmPC omeprazole nói hạ magie sau ít nhất 3 tháng, đa số khoảng 1 năm; CSV cũ "thường trên 1 năm". Đã sửa `co_che`.

Không sửa nhưng lệch nguồn:

- TT-027..030 (ciprofloxacin): CSV theo MedlinePlus (kháng sinh 2 giờ trước hoặc 6 giờ sau khoáng chất); SmPC Anh nói 1-2 giờ trước hoặc ít nhất 4 giờ sau. CSV nghiêm hơn SmPC, giữ nguyên.
- TT-001/002 (levothyroxine): MedlinePlus 4 giờ, SmPC 4-5 giờ, khớp CSV. Mức 2 giờ cho sắt từ nguồn trước chưa mở được nên không dùng.

## 4. Bảng từng dòng

| Mã | Mức | da_kiem_chung | Nguồn đã mở xác nhận | Đã sửa |
|---|---|---|---|---|
| TT-001 | than_trong | co | MedlinePlus levothyroxine; SmPC levothyroxine (eMC) |  |
| TT-002 | than_trong | co | MedlinePlus levothyroxine; SmPC levothyroxine (eMC) |  |
| TT-003 | than_trong | co | MedlinePlus levothyroxine; SmPC levothyroxine (eMC) |  |
| TT-004 | than_trong | mot_phan | MedlinePlus Iodine in diet |  |
| TT-005 | chan | mot_phan | MedlinePlus Iodine in diet | co_che: i-ốt + thuốc kháng giáp gây suy giáp, bỏ ý Jod-Basedow chưa kiểm |
| TT-006 | than_trong | mot_phan | MedlinePlus Iodine in diet |  |
| TT-007 | luu_y | khong | không mở được |  |
| TT-008 | luu_y | khong | không mở được |  |
| TT-009 | chan | mot_phan | NCCIH Red yeast rice |  |
| TT-010 | than_trong | co | NCCIH St. John's wort; EMA HMPC Hypericum |  |
| TT-011 | than_trong | mot_phan | SmPC simvastatin (eMC) |  |
| TT-012 | than_trong | mot_phan | MedlinePlus warfarin |  |
| TT-013 | chan | co | NCCIH SJW; SmPC warfarin (eMC); EMA HMPC; SmPC Eliquis (EMA) | co_che: chỉ khẳng định apixaban, bỏ rivaroxaban chưa kiểm |
| TT-014 | than_trong | khong | NCCIH Omega-3 (không nói ý này) |  |
| TT-015 | than_trong | khong | không mở được |  |
| TT-016 | than_trong | co | NCCIH Ginkgo; EMA HMPC Ginkgo (draft 2014) |  |
| TT-017 | than_trong | khong | NCCIH Turmeric (không nói ý này) |  |
| TT-018 | luu_y | khong | NCCIH Omega-3 (không nói ý này) |  |
| TT-019 | than_trong | khong | không mở được |  |
| TT-020 | than_trong | mot_phan | EMA HMPC Ginkgo (draft 2014) |  |
| TT-021 | chan | mot_phan | MedlinePlus lisinopril; SmPC lisinopril (eMC), chỉ ACEi |  |
| TT-022 | than_trong | mot_phan | SmPC losartan/HCTZ (eMC) |  |
| TT-023 | than_trong | mot_phan | SmPC irbesartan/HCTZ (eMC) |  |
| TT-024 | than_trong | co | MedlinePlus alendronate; SmPC alendronic acid (eMC) |  |
| TT-025 | than_trong | co | MedlinePlus alendronate; SmPC alendronic acid (eMC) |  |
| TT-026 | than_trong | co | MedlinePlus alendronate; SmPC alendronic acid (eMC) |  |
| TT-027 | than_trong | co | MedlinePlus ciprofloxacin; SmPC ciprofloxacin (eMC) |  |
| TT-028 | than_trong | co | MedlinePlus ciprofloxacin; SmPC ciprofloxacin (eMC) |  |
| TT-029 | than_trong | co | MedlinePlus ciprofloxacin; SmPC ciprofloxacin (eMC) |  |
| TT-030 | than_trong | co | MedlinePlus ciprofloxacin; SmPC ciprofloxacin (eMC) |  |
| TT-031 | than_trong | co | MedlinePlus doxycycline; SmPC Efracea (eMC) | khuyen_nghi: nêu số giờ (SmPC 2-3 giờ; MedlinePlus 1-2 giờ) |
| TT-032 | than_trong | co | MedlinePlus doxycycline; SmPC Efracea (eMC) | khuyen_nghi: 4-6 giờ sau Mg thành 2-3 giờ (SmPC) / 1-2 giờ (MedlinePlus) |
| TT-033 | than_trong | co | MedlinePlus doxycycline; SmPC Efracea (eMC) | khuyen_nghi: nêu số giờ (sắt sau doxy 2-3 giờ; hoặc 3 giờ trước) |
| TT-034 | than_trong | mot_phan | SmPC Efracea (eMC); MedlinePlus không nêu kẽm | khuyen_nghi: 4-6 giờ sau kẽm thành 2-3 giờ (SmPC) |
| TT-035 | luu_y | mot_phan | SmPC omeprazole (eMC) |  |
| TT-036 | luu_y | mot_phan | SmPC omeprazole (eMC) | co_che: hạ magie sau ít nhất 3 tháng, đa số khoảng 1 năm |
| TT-037 | luu_y | khong | không nguồn nào nêu sắt |  |
| TT-038 | than_trong | mot_phan | SmPC Sinemet (eMC) |  |
| TT-039 | chan | co | NCCIH SJW; EMA HMPC Hypericum |  |
| TT-040 | than_trong | co | NCCIH Valerian; EMA HMPC Valerian (bản 2006 đã thay thế) |  |

## 5. Tổng kết

- `co`: 18 dòng. `mot_phan`: 14 dòng. `khong`: 8 dòng (TT-007, 008, 014, 015, 017, 018, 019, 037).
- 5 dòng `chan`: TT-013 `co`; TT-039 `co`; TT-009 `mot_phan` (NCCIH, EFSA chưa mở); TT-021 `mot_phan` (ACEi có 2 nguồn, ARB chưa có nguồn); TT-005 `mot_phan` (đã sửa cơ chế). Không dòng nào bị bác bỏ bằng bằng chứng, nên không dòng nào chuyển sang mục 8 của GIAI-DOAN-7.md. TT-005 và TT-009 cần người rà mức `chan`.
- Chưa kiểm được và cần mở lại: toàn bộ ODS (403 Cloudflare, cần trình duyệt thật hoặc người dán nội dung), nhãn FDA, EFSA, FDA Safety Communication, thyroid.org. Các dòng `khong` còn lại vì nguồn mở được không nói ý đó (omega-3, nghệ) hoặc trang đã gỡ (vitamin E).
- Chưa có bằng chứng độc lập xác minh các ý: Jod-Basedow, ngưỡng omega-3 trên 3 g/ngày, tảo spirulina ít i-ốt, thiazide với vitamin D từ nhãn HCTZ riêng, PPI với sắt.
- Quy định, nhãn thuốc có thể đã thay đổi; cần đối chiếu lại ngày 2026-11-16 trước khi dùng trong app.
