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

### Giai đoạn 2: Khung game, Văn phòng thám tử, phố B ✅

Chạy thử trên máy: trong thư mục này gõ `python3 -m http.server 8765` rồi mở http://localhost:8765 (không mở thẳng file index.html, vì trình duyệt chặn đọc file dữ liệu).

| File | Làm gì |
|---|---|
| `index.html`, `style.css` | Trang chính, giao diện (một cột cho điện thoại, mái hiên chợ, chữ y đỏ / i xanh) |
| `data/truyen.json` | Thoại truyện "Kẻ trộm chữ Y", câu Séc đơn giản kèm nghĩa Việt, từ điển nhỏ `tu_them` cho các câu đó |
| `js/app.js` | Khởi động, chọn 4 hồ sơ, đổi tên, bản đồ chợ, cài đặt, nhắc bài khi lâu không chơi (> 3 ngày) |
| `js/du-lieu.js` | Đọc và kiểm tra 2 file JSON (báo lỗi tiếng Việt), từ điển tra nghĩa, tìm vị trí chữ y/i ở gốc từ |
| `js/luu-tien-do.js` | Hồ sơ, lưu localStorage (try/catch), hộp nhớ 1–5 cho từng từ |
| `js/am-thanh.js` | Giọng đọc cs-CZ (0.8, 🐢 0.6), hướng dẫn cài giọng, ghi âm đọc theo (không có micro thì nút "Mình đã đọc to"), chuông đúng/sai |
| `js/dich.js` | Chạm chữ Séc để xem nghĩa (bảng nổi từ dưới lên). Chữ đang che không lộ đáp án |
| `js/nhan-vat.js` | Hình SVG: cú Sýček, Ánh Dương, chị Xu, Mẹ, Bố, Kẻ trộm; khung lời thoại |
| `js/cau-hoi.js` | Các dạng câu hỏi và bộ chạy lượt chơi (sai thì nhắc câu thần chú + mẹo, hỏi lại cuối lượt) |
| `js/so-bi-kip.js` | Thẻ bí kíp, màn mở bí kíp (đọc to câu thần chú), Sổ bí kíp, Luyện nhanh 5 câu |
| `js/chung.js` | Cảnh truyện từng câu, Cửa ải (khóa Sổ bí kíp, chưa đạt thì xem lại bí kíp rồi thử lại), sao |
| `js/van-phong.js` | Màn 0: mở đầu truyện + 3 phòng (thử các nút, chữ cái rơi vào giỏ, xếp câu nhớ), cửa ải 4/5 |
| `js/pho.js` | Một phố: khởi động → truyện → bí kíp → các vòng (học từ + chơi) → Cửa ải 8/10 → kết phố. Bảng `PHO` cấu hình 7 phố, mới bật `daLam` cho B |
| `cong-cu/choi-thu-tu-dong.cjs` | Bot Playwright tự chơi từ màn 0 hết phố B, chụp ảnh, báo lỗi |

Các dạng câu hỏi đã có: nghe – điền y/i, từ cùng nhà, bẫy nghe giống (cho nghĩa, chọn cách viết; nếu cách viết kia là từ thật như bít thì giải thích nghĩa), ghép nghĩa, câu ví dụ, ba bước thám tử (BK4, có cả ví dụ chữ cứng/mềm lấy từ BK1/BK2), câu hỏi luật, chữ cái rơi vào giỏ, câu nhớ thiếu chữ. Mỗi câu hỏi có trường `dapAn` (dùng cho bot và cho kiểm tra "đúng 1 đáp án" ở giai đoạn 5).

Đã kiểm tra:
- Bot chơi hết màn 0 và phố B ở khổ 360px: không lỗi JavaScript, không tràn ngang, Cửa ải trả lời đúng hết được 10/10 (đáp án khớp chấm điểm).
- Cả 80 từ: tìm được từ trong câu ví dụ để che, tạo được mọi dạng câu hỏi không lỗi. Truyện nhớ của cả 7 nhóm chỉ tô chữ Séc, không tô nhầm chữ Việt.
- File JSON sai dấu phẩy hoặc thiếu nghĩa → màn báo lỗi tiếng Việt chỉ đúng chỗ. Tải lại trang giữa chừng → vào lại đúng bước đang dở.

Ghi chú thiết kế:
- Phố B chỉ có nút y / i; từ phố M trở đi bật thêm ý / í (`PHO[chu].dai`).
- Trò "nghe – điền" luôn hiện nghĩa, vì nghĩa là thứ quyết định y hay i (být/bít). "Không lộ nghĩa" chỉ áp dụng ở trò ghép nghĩa; bảng tra của chữ đang che chỉ hiện chữ còn che.
- Từ bẫy chỉ hỏi khi chữ i đứng ngay sau chữ lưỡng tính (bỏ `sníh` khỏi câu hỏi, vẫn hiện trong danh sách).
- Ví dụ chữ cứng dùng để hỏi chỉ lấy h, ch, k, r; không hỏi d, t, n (vì di/ti/ni đọc mềm, dễ rối).
- Thoại có tiếng Séc mới (người dùng đồng ý thêm câu đơn giản): Pomoc! Kde je písmeno Y? · Zloděj ukradl písmeno Y! · Já jsem Sýček. · Jdeme na to! · Výborně! · Správně! · Skoro! · Zkus to znovu. · Děkujeme! · Písmeno Y je zpátky!
- Ý tưởng "Kẻ trộm chữ Y" đang dùng làm khung truyện; các ý tưởng hấp dẫn khác chưa làm, chờ người dùng chọn.
- Bản xem thử đăng ở claude.ai (link riêng tư). Ở đó micro bị chặn nên chỉ có nút "Mình đã đọc to"; khi đưa lên GitHub Pages (giai đoạn 6) micro sẽ dùng được.

### Bổ sung sau giai đoạn 2

- Ánh Dương dùng ảnh 3D tự vẽ `img/anh-duong.png` (300px, đã cắt tròn và che logo NASA trên áo). Ảnh này nằm trong repo, nên sẽ được đưa lên mạng cùng game. Anh xác nhận đây là hình minh họa tự vẽ, không phải ảnh chụp người thật.
- Chị Xu dùng ảnh 3D tự vẽ `img/chi-xu.png` (300px, đã cắt tròn) làm mặc định, giống Ánh Dương.
- Bố mẹ có thể chọn ảnh riêng cho từng hồ sơ bằng nút **🖼️ Chọn ảnh** (màn ✏️ Đổi tên hồ sơ). Ảnh đó chỉ lưu trong trình duyệt của máy đó, không vào repo.

### Giai đoạn 3: 6 phố còn lại ✅

- Các phố L, M, P, S, V, Z đều mở được theo thứ tự, có đủ truyện, bí kíp, vòng học, Cửa ải và kết phố.
- **Cốt truyện "Kẻ trộm chữ Y":** mỗi phố có một trùm là một từ trong bảng: B býk, L plyš, M myš, P netopýr, S syčet, V výr, Z Ruzyně. Muốn trả chữ Y về phố, phải đánh trùm: trả lời đúng 3/5 câu về từ đó.
- **Trò soi lỗi** (phố P): 3 từ đúng + 1 từ bị đổi y↔i, chọn từ viết sai. Cách viết sai nào là một từ có thật (ví dụ pil) thì bỏ qua.
- Mỗi phố có luật luyện riêng trong vòng: B BK4, L BK5 (từ cùng nhà), M/P BK6 (cặp nghe giống), S BK7 (dài/ngắn), V BK8 (vy-).
- Phố M trở đi có nút ý / í.
- Thoại truyện các phố nằm trong `data/truyen.json` (câu Séc đơn giản kèm nghĩa Việt).
- Bot chơi thử đi qua cả 7 phố ở khổ 360px: không lỗi JavaScript, không tràn ngang.


### Giai đoạn 4: Ôn lại, Trùm cuối, Sổ thám tử, Tiến độ gia đình ✅

| Tính năng | File | Ghi chú |
|---|---|---|
| **Vụ án hôm nay** (ôn theo lịch 1·3·7·14·30 ngày) | `js/on-tap.js`, `js/luu-tien-do.js` | Tối đa 15 từ đến hạn (ưu tiên từ hay sai) + tối đa 2 bí kíp đến hạn. Đủ 7 ngày liên tiếp mở "chương bí mật" (`truyen.json` → `vu_an.chuong7`). Từ trả lời đúng khi đã ở hộp 5 = "đã thuộc lâu" |
| **Trùm cuối** | `js/trum-cuoi.js` | Phần 1: 8 câu quiz PDF (có câu 2 chỗ trống) + 6 cặp nghe giống + 7 câu mỗi phố một câu, cần 17/21. Phần 2: chính tả 5 câu, cần 4/5. Qua thì nhận **Bằng thám tử** (xem lại được từ bản đồ) |
| **Chính tả (diktát)** | `js/cau-hoi.js` `qChinhTa` | Nghe câu, gõ từ bị che bằng bàn phím có dấu. Chỉ chấm dãy y/ý/i/í; chữ khác gõ chưa khớp thì nhắc nhẹ, không tính sai |
| **Sổ thám tử** | `js/tu-dien.js` | Từ đã gặp, tìm theo chữ Séc hoặc nghĩa Việt (không cần gõ dấu), lọc theo B…Z hoặc ⚠️ Hay sai, nút "Đọc cả nhóm". Mỗi từ là **thẻ sưu tập**: 🟤 thường, ⚪ bạc (đúng 3 lần liền hoặc hộp ≥ 3), 🟡 vàng (đã thuộc lâu) |
| **Tiến độ gia đình** | `js/tien-do.js` | Mỗi hồ sơ: phút chơi 7 ngày (đếm 15 giây một lần khi trang đang hiện), từ đã học/đang ôn/thuộc lâu, 10 từ hay sai nhất, bí kíp chưa qua, phố điểm thấp, đang chơi ở đâu. Không mật khẩu, không xếp hạng |

Kiểm tra: bot gieo hồ sơ đã qua 7 phố rồi chơi Vụ án hôm nay, Sổ thám tử (tìm "chuot" ra myš), Tiến độ, Trùm cuối + chính tả → nhận Bằng, không lỗi JavaScript, không tràn ngang ở 360px.

Ý tưởng hấp dẫn đã làm: cốt truyện Kẻ trộm chữ Y, trùm mỗi phố, sưu tập thẻ, vụ án hôm nay. **Chưa làm:** bí kíp thành phép thuật trong trận trùm, "con làm cô giáo", "đọc thuộc theo nhịp".

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

1. Chọn ý tưởng tăng độ hấp dẫn nào (đề xuất: cốt truyện "Kẻ trộm chữ Y", trùm mỗi phố là một từ trong bảng, bí kíp thành phép thuật, sưu tập thẻ 80 từ, vụ án hôm nay, con làm cô giáo, đọc thuộc theo nhịp).

## Đã trả lời

- Bố và Mẹ có **hồ sơ riêng**, không dùng tên Ánh Dương. Hồ sơ: Bố, Mẹ, chị Xu, Ánh Dương (4 hồ sơ).
- Câu ví dụ của `být` đã sửa thành "Chci být lékařkou."
- Thoại truyện **được thêm câu Séc đơn giản**, luôn kèm nghĩa tiếng Việt (vì bé hiểu được câu đơn giản).

## Giai đoạn tiếp theo

**Giai đoạn 3** (model Sonnet 5.5): 6 phố còn lại L, M, P, S, V, Z.
- Bật `daLam` trong bảng `PHO` (`js/pho.js`), thêm thoại `pho.<chữ>.vao/ket` vào `data/truyen.json`.
- Viết thử thách bí kíp riêng cho từng phố trong `thuThachBiKip` (hiện chỉ có BK4 cho phố B): L → BK5 từ cùng nhà, M → BK6 cặp nghe giống, P → trò "soi lỗi" (tìm từ viết sai; không coi từ đúng có thật như bít là lỗi), S → BK7 dài ngắn, V → BK8 tiền tố vy-/vý- (dùng `nhom[V].tien_to`), Z → ôn tổng hợp.
- Phố M trở đi có nút ý / í.
- Chạy lại `cong-cu/choi-thu-tu-dong.cjs` (sửa điều kiện dừng cho phố mới).
