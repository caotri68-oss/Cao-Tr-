# Lộ trình làm lại app Sổ TPCN

Cập nhật: 2026-11-15. File này là bản gốc của lộ trình. Mỗi giai đoạn xong thì đánh dấu ở đây.

## Bức tranh tổng thể

- **Bài gốc** nằm trong Obsidian (`1_raw_sources`) để đọc lại nguyên văn.
- **Bảng Ý** nằm trong Google Sheet, mỗi dòng ghi một nguồn nói một điều về một chất cho một bệnh. Đây là khung xương để đối chiếu.
- **App** đọc Bảng Ý, rồi đối chiếu với tủ thuốc và hồ sơ của từng người.
- **Phân vai:** phiên chat điện thoại làm quản lý, viết phiếu việc. Phiên đám mây sửa code web (`docs/`). Phiên "APP TPCN apk" trên máy tính build APK.

## Tầng tin cậy

Tầng được ghép từ hai trục.

Trục 1, nghiên cứu thế giới:

- R1: tổng quan hệ thống, Cochrane, claim EFSA đã được duyệt
- R2: có thử nghiệm trên người nhưng nhỏ, hoặc kết quả chưa nhất quán
- R3: chỉ có cơ chế, nghiên cứu quan sát, hoặc nghiên cứu trên động vật
- R0: không có nghiên cứu
- R−: đã thử nghiệm và không thấy tác dụng

Trục 2: số nguồn **độc lập** cùng ý kiến. Hai người cùng dẫn một nguồn thì chỉ tính là 1.

| Tầng | Điều kiện |
|---|---|
| A | R1 |
| B | R2 và có ≥1 nguồn chuyên gia đồng ý |
| C | R3, hoặc R0 nhưng có ≥2 nguồn độc lập đồng ý |
| D | Chỉ 1 nguồn, không có nghiên cứu |
| X | Có nguồn nói "có" nhưng nghiên cứu là R− (mâu thuẫn) |
| ∅ | Không ai đề cập, nghĩa là chưa có dữ liệu |

**Luật cứng:**

1. Tác giả đồng ý không bao giờ đẩy được quá C nếu không có nghiên cứu.
2. Nghiên cứu R− luôn kéo xuống X.
3. An toàn là trục riêng, đè lên mọi tầng.

## Các giai đoạn

| # | Việc | Ai làm | Model | Trạng thái |
|---|---|---|---|---|
| 0 | Chốt nền: cách đặt người làm, nhánh GitHub Pages, file Obsidian rỗng | Quản lý | Opus | **Xong** (xem bên dưới) |
| 1 | Dọn dữ liệu: nhãn đếm, bảng tính vượt mức tối đa, từ điển đồng nghĩa | Phiên đám mây | Sonnet | **Xong** (v2-63, chưa gộp lên trang chính) |
| 2 | Bảng Ý trên Google Sheet, chuyển các lợi ích trong `kb.js` sang | Quản lý | Opus thiết kế, Haiku chuyển | **Xong**: Sheet "Bảng Ý TPCN" (id 14d7UiEKBAal2pzaOrsDi1SZ9bJigTt7hr6WnPiQ2PRw) |
| 3 | Danh sách ~10 bệnh/mục tiêu của gia đình | Bạn chọn, quản lý soạn | Sonnet | Chưa |
| 4 | Chấm tầng A–X cho từng Ý | Quản lý | Opus | Chưa |
| 5 | App đọc Sheet + trang Bệnh | Phiên đám mây | Sonnet | Chưa |
| 6 | Bản đồ phủ tủ thuốc của từng người | Phiên đám mây | Sonnet | Chưa |
| 7 | Hồ sơ sức khỏe + gợi ý ngược + chặn tương tác thuốc | Phiên đám mây, quản lý duyệt | Sonnet + Opus | Chưa |
| 8 | Quy trình nạp bài mới (Obsidian → Sheet → duyệt) | Quản lý + skill obsidian-pkm | Sonnet | Chưa |
| 9 | Theo dõi hiệu quả: chỉ số, tiêu chí dừng | Phiên đám mây | Sonnet | Chưa |
| — | Build APK sau mỗi giai đoạn có sửa code | Phiên "APP TPCN apk" | Sonnet | Theo đợt |

Phải giữ đúng thứ tự: không làm giao diện (5–7) trước khi Bảng Ý và việc chấm tầng (2–4) đủ chắc.

## Kết quả giai đoạn 0 (2026-11-15)

- **Cách đặt người làm:** kết hợp. Phiên đám mây sửa code web, phiên máy tính build APK.
- **Nhánh của trang web:** trang đang chạy v2-62. Chỉ nhánh `ccr-08643b6b-cfgj04` (thư mục `docs/`) có v2-62, nên gần như chắc GitHub Pages lấy từ nhánh này. Chưa kiểm tra được trong cài đặt Pages.
- **Liên kết giữa hai phiên:** chiều quản lý → APK hoạt động. Chiều APK → quản lý đang lỗi "không tìm thấy phiên". Tạm thời bạn copy kết quả bằng tay.
- **File Obsidian rỗng:** Creatin.md, Dầu olive.md, Multivitamin - so sánh các dòng.md, Jojoba oil.md, Lộ trình tiếng Séc A0 → A2.md, Anki — Bộ nền tảng 400 từ.md và 50 câu thi nói A2.md đều 0 byte trên Drive. Cần mở Obsidian trên máy tính xem bản trong máy còn nội dung không.
- **Bộ đếm 53/67/14:** không phải lỗi dữ liệu. 67 là tổng số hoạt chất. 53 là số chất đã có bài. 14 là số chất chưa có bài. Chỉ có nhãn tiêu đề ghi sai nghĩa.
- **Lỗ hổng thật phát hiện được:** bảng tính trùng chất và vượt mức tối đa (`NUTR`) chỉ có **19 chất**, trong khi kho kiến thức có **78 chất**. 59 chất còn lại không được kiểm tra trùng hay vượt mức.


## Cập nhật 2026-11-16

- **Đã gộp v2-68 lên trang chính** (nhánh `ccr-08643b6b-cfgj04`, commit 742c981). Bản cũ v2-62 giữ ở nhánh `du-phong-v2-62`.
- Giai đoạn 0–9: đã làm xong phần code. Nội dung còn chờ duyệt dần (xem `KE-HOACH-HOAN-TAT.md`, bước 6).
- Phiếu build APK v2-68 đã gửi sang phiên "APP TPCN apk" trên máy tính, chờ máy tính bật.
- Kiểm tra toàn app (QA.md): lỗi lớn duy nhất (mục Gout) đã sửa ở v2-68. Còn chưa kiểm: khối theo dõi trên Hôm nay, cảnh báo cam/xám, file sao lưu cũ, ngoại tuyến ở chế độ tối.
- Việc treo: 15 Ý phần 1 và 1–2 Ý phần 2 chưa tra; cảnh báo Concor với canxi chưa có nguồn; xác nhận GitHub Pages đã cập nhật trên điện thoại; tải `bang-y-tpcn-v2.xlsx` lên Drive.
