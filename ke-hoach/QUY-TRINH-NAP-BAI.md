# Quy trình nạp bài mới thành "Ý" có duyệt (giai đoạn 8)

Cập nhật: 2026-11-16. Viết cho người không biết code, làm được phần lớn trên điện thoại.

## Nguyên tắc

- **Bài gốc không bao giờ bị sửa.** Nó nằm trong Obsidian (thư mục `1_raw_sources`) để đọc lại nguyên văn.
- **Claude chỉ đề xuất, bạn mới là người duyệt.** Mọi Ý mới vào với trạng thái `cho_duyet`. App chỉ dùng Ý `da_duyet`.
- **Mỗi Ý bắt buộc có câu trích nguyên văn** (tối đa 300 ký tự) để bạn đối chiếu với bài gốc.
- **Cột `muc_ncuu` (mức nghiên cứu) để trống** lúc tách Ý. Chỉ bước 6 mới chấm, bằng Opus.
- Không đưa thông tin cá nhân (tên, tuổi, bệnh án, số điện thoại, email) của người thật vào dữ liệu.

## Tóm tắt 7 bước

| # | Việc | Model nên dùng | Làm ở đâu |
|---|---|---|---|
| 1 | Lưu bài gốc vào Obsidian | Sonnet (skill `obsidian-pkm`) | Điện thoại |
| 2 | Dán câu lệnh mẫu để tách Ý | Sonnet | Điện thoại |
| 3 | Claude tạo file `y-moi-<ngày>.csv` | Sonnet | Điện thoại |
| 4 | Chạy kiểm tra file | Sonnet (không cần suy luận) | Điện thoại nếu dùng phiên Claude Code; nếu không thì máy tính |
| 5 | Duyệt từng dòng | Opus giúp rà an toàn, bạn quyết định | Điện thoại |
| 6 | Ghép vào bảng và chấm mức nghiên cứu | Opus | Phiên Claude Code (điện thoại được); mở file Sheet to thì máy tính tiện hơn |
| 7 | Xuất lại app | Sonnet | Xuất dữ liệu: phiên Claude Code. Build APK: máy tính |

Haiku dùng cho việc nhẹ, lặp lại: chuẩn hoá tên chất, sửa chính tả mã, đổi định dạng. Không dùng Haiku để tách Ý hay chấm mức.

---

## Bước 1. Lưu bài gốc vào Obsidian

**Model:** Sonnet. **Làm ở:** điện thoại.

1. Mở Claude trên điện thoại, dán nguyên văn bài viết.
2. Gõ: `Dùng obsidian-pkm, nạp bài này vào Obsidian, lưu nguyên văn vào 1_raw_sources.`
3. Skill sẽ tạo file `.md` trong kho "cao tri mới" và trả link. **Ghi lại tên bài** (ví dụ `doc-phuc-magie`): tên này sẽ vào cột `link_goc` của mọi Ý.
4. Mở link kiểm tra bài đã lưu đủ chữ, không bị cắt. Bài rỗng hoặc cụt thì làm lại bước này, đừng đi tiếp.

Lưu ý: nếu bài chỉ có ảnh chụp hoặc PDF, nhờ Claude chuyển thành chữ trước khi lưu và đọc lại một lượt xem có sai số liệu không.

## Bước 2. Dán câu lệnh mẫu để tách Ý

**Model:** Sonnet. **Làm ở:** điện thoại.

1. Mở file `ke-hoach/mau/CAU-LENH-TACH-Y.md`, copy toàn bộ khung câu lệnh.
2. Mở một cuộc trò chuyện mới với Claude, chọn Sonnet, dán câu lệnh.
3. Điền 3 chỗ trong ngoặc nhọn:
   - `{NGUỒN}`: mã nguồn, ví dụ `BS-PHUC`, `C-THAO`. Nếu không biết thì dùng `KHAC`.
   - `{TÊN-BÀI}`: tên bài đã ghi ở bước 1.
   - `{YYYY-MM-DD}`: ngày hôm nay.
4. Dán ba bảng mã (chất, mục tiêu, nguồn) ở cuối file mẫu vào chỗ "BẢNG MÃ ĐƯỢC PHÉP DÙNG".
5. Dán bài viết vào chỗ `<<< DÁN BÀI VIẾT VÀO ĐÂY >>>` rồi gửi.

Bài dài hơn khoảng 10 trang: chia làm nhiều phần, mỗi phần một lần gửi, mỗi lần ra một file riêng.

## Bước 3. Claude tạo file `y-moi-<ngày>.csv`

**Model:** Sonnet. **Làm ở:** điện thoại.

Claude trả lời bằng một file CSV và ba phần ngắn ở cuối: số Ý theo hướng, danh sách chất mới, danh sách Ý bị bỏ qua. Đọc ba phần đó trước:

- **Chất mới:** nếu thấy chất đã có trong bảng mã nhưng Claude lại gọi là "mới" (ví dụ viết khác tên), bảo Claude đổi sang mã có sẵn.
- **Ý bỏ qua:** xem có Ý quan trọng nào bị bỏ vì thiếu câu nguyên văn không. Nếu có, tự chỉ cho Claude câu cần trích.

File phải đặt tên `y-moi-<ngày>.csv`, ví dụ `y-moi-2026-11-20.csv`, và lưu vào thư mục `ke-hoach/du-lieu/` của kho code (nhờ Claude trong phiên Claude Code lưu giúp). Mẫu đúng cột: `ke-hoach/mau/y-moi-mau.csv`.

## Bước 4. Chạy kiểm tra

**Model:** Sonnet. **Làm ở:** phiên Claude Code mở trong kho `Cao-Tr-` (mở được từ ứng dụng Claude trên điện thoại). Không có phiên đó thì dùng máy tính.

Bảo Claude: `Chạy kiểm tra file y-moi-<ngày>.csv`. Lệnh thật sự chạy là:

```
node ke-hoach/scripts/kiem-y-moi.js ke-hoach/du-lieu/y-moi-<ngày>.csv
```

Báo cáo tiếng Việt có hai loại:

- **[LỖI]**: bắt buộc sửa. Dán báo cáo cho Claude và nói "sửa các lỗi này", rồi chạy kiểm tra lại. Lặp tới khi ra "KẾT QUẢ: ĐẠT".
- **[CẢNH BÁO]**: đọc rồi tự quyết. Hay gặp nhất: dấu hiệu thông tin cá nhân (số điện thoại, email, ngày sinh, tên kèm mẹ/bố/anh/chị) và `link_goc` trống.

Kiểm tra bắt các lỗi: sai cột hoặc thứ tự cột, thiếu BOM, mã chất hoặc mục tiêu hoặc nguồn không có trong kho (trừ chất mới có ghi chú), `huong` sai, `trich_dan` trống hoặc dài quá 300 ký tự, `ma_y` sai công thức băm hoặc trùng Ý đã có, từ cấm ("chữa", "tốt nhất", "100%") trong `noi_dung`, `trang_thai` sai, `muc_ncuu` không để trống.

Kiểm tra **không** biết được: câu trích có thật sự nguyên văn không, Ý có đúng nghĩa bài không. Hai việc này thuộc bước 5.

## Bước 5. Duyệt từng dòng

**Model:** Opus để rà an toàn, **bạn là người quyết định**. **Làm ở:** điện thoại.

1. Mở cuộc trò chuyện với Opus, đưa file CSV đã đạt kiểm tra và link bài gốc trong Obsidian.
2. Nhờ Opus trình bày **từng Ý một** gồm: câu trích, `noi_dung`, chất, mục tiêu, hướng. Mỗi Ý bạn trả lời một chữ: **duyệt** hoặc **bỏ** hoặc **sửa**.
3. Opus rà thêm các điểm an toàn trước khi bạn quyết:
   - `noi_dung` có nói quá lời câu trích không (hứa khỏi bệnh, tuyệt đối).
   - Ý `hai` có bị đổi thành `loi` không (hoặc ngược lại).
   - Ý nói về thuốc, thai kỳ, trẻ em, liều cao: có cần ghi chú an toàn không.
   - Câu trích có khớp bài gốc không (chọn vài Ý để mở bài đối chiếu).
4. Kết quả: dòng bạn duyệt đổi `cho_duyet` thành `da_duyet`; dòng bạn không lấy đổi thành `bo`. Dòng chưa quyết xong giữ `cho_duyet`.
5. Chạy lại bước 4 trên file sau khi duyệt để chắc không làm hỏng định dạng.

Quy tắc đơn giản: **không chắc thì để `cho_duyet`.** App sẽ không dùng Ý đó, không mất gì.

## Bước 6. Ghép vào bảng và chấm mức nghiên cứu

**Model:** Opus. **Làm ở:** phiên Claude Code (điện thoại được). Xem và sửa Google Sheet "Bảng Ý TPCN" tiện hơn trên máy tính.

1. Bảo Claude: `Ghép các dòng da_duyet trong y-moi-<ngày>.csv vào bảng Ý, rồi chấm muc_ncuu.` Claude sẽ:
   - Thêm các dòng `da_duyet` vào Bảng Ý (giữ nguyên `ma_y`, không đổi mã đã có).
   - Nếu có chất mới: thêm vào bảng `chat.csv` (mã, tên Việt, tên khác, nhóm) **trước**, bạn xem lại rồi mới ghép Ý.
   - Nếu có nguồn mới: thêm vào `nguon.csv` (mã, tên, loại, `dua_vao`).
2. Chấm `muc_ncuu` bằng Opus theo thang trong `LO-TRINH.md`: R1 (tổng quan hệ thống, Cochrane, EFSA đã duyệt), R2 (thử nghiệm người, nhỏ hoặc không nhất quán), R3 (cơ chế, quan sát, động vật), R0 (không có nghiên cứu), R− (đã thử, không thấy tác dụng).
3. Luật cứng: lời tác giả không tự nâng mức nghiên cứu. Muốn chấm R1 hoặc R2 thì phải dẫn được nghiên cứu cụ thể (dùng tra cứu PubMed). Không dẫn được thì R0 hoặc R3.
4. Opus tính lại tầng A–X cho các cặp (chất, mục tiêu) bị ảnh hưởng và báo **cặp nào đổi tầng**. Cặp nào xuống X (mâu thuẫn) hoặc có Ý `hai` mới: bạn đọc kỹ.

Việc đồng bộ lên Google Sheet làm theo cách giai đoạn 2 đã dùng; chỉ làm khi bạn đồng ý.

## Bước 7. Xuất lại app

**Model:** Sonnet. **Làm ở:** xuất dữ liệu trong phiên Claude Code (điện thoại được); build APK thì **cần máy tính**.

1. Bảo Claude trong phiên Claude Code: `Xuất lại dữ liệu cho app` (script `ke-hoach/scripts/xuat-app.js`) rồi chạy các kiểm tra có sẵn (ví dụ `tinh-tang.test.js`).
2. Kiểm tra bản web: mở app, vào trang của chất mới, xem Ý mới hiện đúng và có nút "đọc đoạn gốc".
3. Muốn có APK mới thì nhờ phiên "APP TPCN apk" trên máy tính build. Chiều báo cho phiên đó hiện phải copy tay.

---

## Bảng việc nào làm ở đâu

| Việc | Điện thoại | Cần máy tính |
|---|---|---|
| Lưu bài vào Obsidian (bước 1) | Có | Không |
| Tách Ý, tạo CSV (bước 2, 3) | Có | Không |
| Chạy kiểm tra (bước 4) | Có, nếu mở được phiên Claude Code trong kho | Cần nếu không có phiên đó |
| Duyệt từng dòng (bước 5) | Có | Không |
| Ghép bảng, chấm mức (bước 6) | Có, qua phiên Claude Code | Nên dùng khi xem Google Sheet lớn |
| Xuất dữ liệu cho app (bước 7) | Có, qua phiên Claude Code | Không |
| Build APK (bước 7) | Không | **Cần** |

## Sai thì sửa thế nào

- **Đã `da_duyet` nhầm:** đổi dòng đó về `bo`. Đừng xoá dòng và đừng đổi `ma_y`, vì mã không bao giờ đổi.
- **Sửa câu trích sau khi có mã:** `ma_y` hết đúng. Chạy lại bước 3 để Claude tính lại mã, hoặc bỏ dòng và tạo dòng mới.
- **Cùng một bài nạp hai lần:** bước 4 báo "ma_y đã có", bỏ các dòng đó.
- **Claude trả file thiếu BOM hoặc lệch cột:** dán báo cáo kiểm tra cho Claude, nhờ "lưu lại CSV UTF-8 có BOM, đúng 12 cột".

## File liên quan

- `ke-hoach/mau/CAU-LENH-TACH-Y.md`: câu lệnh mẫu và bảng mã.
- `ke-hoach/mau/y-moi-mau.csv`: file mẫu 3 dòng.
- `ke-hoach/scripts/kiem-y-moi.js`: kiểm tra file. Test: `node ke-hoach/scripts/kiem-y-moi.test.js`.
- `ke-hoach/BANG-Y.md`, `ke-hoach/Y-TAI-LIEU.md`: thiết kế bảng và ví dụ đã nạp (43 bài của BS Phúc và chị Thảo Nguyên).
