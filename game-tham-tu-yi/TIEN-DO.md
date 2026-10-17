# TIẾN ĐỘ GAME "THÁM TỬ Y/I"

Đọc file này trước khi làm tiếp. Prompt gốc: `../ke-hoach-game-y-i/PROMPT-CLAUDE-CODE.md`.
**Prompt gốc CHƯA được cập nhật theo các quyết định ở mục "Quyết định đã chốt" bên dưới. Khi hai nơi khác nhau, làm theo file này.**

## Quy tắc làm việc với người dùng

- Chỉ làm khi người dùng nói **"tiến hành làm"**. Còn lại chỉ bàn kế hoạch, không tạo hay sửa file.
- Mỗi lần chỉ làm đúng giai đoạn được giao, xong thì dừng.

## Đã xong

### Giai đoạn 1: Dữ liệu ✅

| File | Làm gì |
|---|---|
| `data/tu-vung-yi.json` | Toàn bộ nội dung PDF: quy tắc, cách đọc, 7 nhóm / 80 từ (phiên âm, nghĩa, emoji, từ cùng nhà, ví dụ), truyện nhớ, mẹo, từ bẫy viết i, 6 cặp dễ nhầm, quiz 8 câu, lộ trình 7 ngày; và 9 bí kíp BK0–BK8 kèm câu hỏi kiểm tra |
| `kiem-tra-du-lieu.cjs` | Kiểm tra dữ liệu. Chạy `node kiem-tra-du-lieu.cjs` (thêm `--bang` để ghi lại bảng đối chiếu) |
| `BANG-DOI-CHIEU.md` | Bảng 80 từ để bố mẹ dò với PDF |

Cách đã kiểm tra:
- Chữ Séc lấy từ lớp chữ của PDF, không đọc bằng mắt từ ảnh. Mọi từ, nghĩa, phiên âm, ví dụ, từ cùng nhà, truyện nhớ, mẹo và quiz đều được so khớp tự động với chữ trong PDF: khớp 100%.
- `kiem-tra-du-lieu.cjs`: đủ 80 từ, đúng số từ mỗi nhóm, mỗi câu hỏi bí kíp có đúng 1 đáp án.

Ghi chú dữ liệu:
- Mục "vy- / vý-" lưu riêng ở `nhom[V].tien_to`, không tính vào 11 từ của nhóm V (giống PDF).
- Trường `bien_the` (ví dụ bydlit) là dạng thứ hai PDF ghi trong ngoặc.
- `brzo` (cùng nhà với brzy) không có chữ y: đã đánh dấu `khong_co_y`, không dùng trong trò "Từ cùng nhà".
- `biologie`, `sirup`: PDF không ghi nghĩa, để trống, không tự thêm.
- Bí kíp có `"nguon": "bo_sung"` hoặc `"PDF + bo_sung"` là phần thêm theo chương trình trường Séc (người dùng đã đồng ý bổ sung).
- **Chỉ che y/ý ở gốc từ**: chữ y/ý đầu tiên đứng ngay sau chữ lưỡng tính (hàm `viTriChe` trong `kiem-tra-du-lieu.cjs`). Không hỏi y/i ở đuôi từ (nový, lysý, pysky).
- Câu ví dụ của `být` đã sửa theo yêu cầu người dùng: "Chci být lékařkou." (PDF ghi "lékařka"; sau být dùng cách 7).

## Quyết định đã chốt (chưa có trong prompt gốc)

1. **Nhân vật**: Ánh Dương (em, dấu sắc, không phải "Ảnh") là **nhân vật chính xuyên suốt**, game nhập vai. Chị là **Xu** (hiển thị "chị Xu"), đồng hành trong truyện. Cả hai là nữ. Hồ sơ: Bố, Mẹ, chị Xu, Ánh Dương.
2. **Câu nhớ chữ lưỡng tính**: "Bố Fi Lên Mây Phóng Sao Vào Zũ trụ" (8 chữ B F L M P S V Z). Không dùng câu cũ "Bé Lan Mang Pizza…" của PDF ở bất kỳ đâu trong game.
3. **Luật**: 9 bí kíp BK0–BK8 trong `bi_kip`. Bổ sung theo trường: chữ cứng / mềm / lưỡng tính đầy đủ (d t n, ď ť ň, f; ngoại lệ fyzika).
4. **Màn 0** (Văn phòng thám tử) gồm 3 phòng, mỗi phòng có cửa ải 5 câu, đúng 4/5 mới qua:
   - Phòng Âm thanh: BK0
   - Phòng Cứng – Mềm: BK1, BK2 (chữ cái rơi vào giỏ Cứng / Mềm / Lưỡng tính)
   - Phòng Tám chữ lưỡng tính: BK3
5. **Bí kíp theo phố**: B → BK4, L → BK5, M → BK6, P → soi lỗi (ôn BK6), S → BK7, V → BK8, Z → ôn tổng hợp.
6. **Nhắc lại luật cũ**: đầu mỗi phố khởi động 1 phút (đọc 3 câu thần chú cũ, luôn có BK1–BK3, và 3 câu hỏi nhanh). Mỗi Cửa ải có ít nhất 2 câu về Cứng / Mềm / Lưỡng tính. Bí kíp cũng có hộp ôn 1–3–7–14–30 ngày. Khi sai, linh vật nhắc đúng câu thần chú của luật áp dụng.
7. **Chạm để dịch**: chỉ hiện nghĩa có trong dữ liệu. Trong câu đang che y/i, không hiện nghĩa của chính từ đang hỏi cho tới khi trả lời. Sổ thám tử tìm được bằng nghĩa tiếng Việt.

## Còn chờ người dùng trả lời

1. Thoại truyện: chỉ dùng từ trong 80 từ, hay được thêm câu Séc đơn giản kèm nghĩa Việt?
2. Chọn ý tưởng tăng độ hấp dẫn nào (đề xuất: cốt truyện "Kẻ trộm chữ Y", trùm mỗi phố là một từ trong bảng, bí kíp thành phép thuật, sưu tập thẻ 80 từ, vụ án hôm nay, con làm cô giáo, đọc thuộc theo nhịp).

## Đã trả lời

- Bố và Mẹ có **hồ sơ riêng**, không dùng tên Ánh Dương. Hồ sơ: Bố, Mẹ, chị Xu, Ánh Dương (4 hồ sơ).
- Câu ví dụ của `být` đã sửa thành "Chci být lékařkou."

## Giai đoạn tiếp theo

**Giai đoạn 2** (model Opus 5.5): khung game, chọn hồ sơ, lưu tiến độ, màn 0 (3 phòng), phố B hoàn chỉnh. Nên cập nhật prompt gốc theo mục "Quyết định đã chốt" trước khi bắt đầu.
