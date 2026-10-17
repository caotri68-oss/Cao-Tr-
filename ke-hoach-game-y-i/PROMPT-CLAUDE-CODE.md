# PROMPT CHO CLAUDE CODE: GAME "THÁM TỬ Y/I" — HỌC VYJMENOVANÁ SLOVA

> Cách dùng: mở Claude Code trong một thư mục trống, gửi kèm file PDF `BO1-Bang-tu-vung-co-nghia-viet-6-trang.pdf`, rồi dán toàn bộ nội dung bên dưới. Mỗi giai đoạn (mục 11) nên làm trong một cuộc trò chuyện mới, đổi model theo bảng trong `KE-HOACH.md`.

---

## 0. Về người dùng (đọc trước)

- Tôi **chưa từng viết code**. Giải thích bằng tiếng Việt, đơn giản, từng bước. Thuật ngữ bắt buộc thì giải thích một câu ngắn.
- Xong mỗi giai đoạn (mục 11): **dừng lại**, chỉ tôi cách mở game trên điện thoại để thử, chờ tôi đồng ý mới làm tiếp.
- Sau mỗi giai đoạn, cập nhật file `TIEN-DO.md`: đã làm gì, file nào làm gì, giai đoạn tiếp theo là gì. Tôi sẽ mở cuộc trò chuyện mới và bảo bạn đọc file này.
- **Không bao giờ tự xóa file** khi chưa hỏi.
- Không chắc thì hỏi, không tự đoán.

## 1. Mục tiêu

Game trên điện thoại giúp **con gái tôi (học sinh tiểu học/THCS ở Séc, người Việt)** thuộc **80 từ "vyjmenovaná slova"**: các từ viết **y/ý** sau 7 chữ **B, L, M, P, S, V, Z**, cùng các từ cùng nhà của chúng.

**Kỹ năng đích duy nhất**: nghe hoặc thấy một từ → viết đúng **y/ý hay i/í**. Mọi trò chơi đều phải luyện kỹ năng này. Hiểu nghĩa tiếng Việt là phụ, để con nhớ lâu.

- Phong cách: dễ thương, màu tươi, hoạt hình. Không đếm giờ, không âm thanh to, không phạt.
- Linh vật: **chú cú Sýček** (cú mèo nhỏ, một từ trong danh sách) làm "thám tử trưởng", tự vẽ SVG.
- Toàn bộ giao diện tiếng Việt, trừ nội dung tiếng Séc.

## 2. Nội dung: CHỈ lấy từ file PDF

### 2.1. Việc đầu tiên: chuyển PDF thành `data/tu-vung-yi.json`

Đọc kỹ cả 6 trang PDF và tạo file JSON theo cấu trúc dưới. **Chép đúng từng ký tự**, đặc biệt các dấu: y ý i í ě š č ř ž ň ď ů. Không tự thêm từ, không tự sửa nghĩa, không tự sửa phiên âm.

```json
{
  "quy_tac": {
    "bi_mat": "...",          
    "ba_buoc": ["...", "...", "..."],
    "chu_khac": "...",        
    "meo_7_chu": "Bé Lan Mang Pizza Sang Vườn Zui"
  },
  "cach_doc": [ {"chu": "y ý i í", "giai_thich": "..."} ],
  "nhom": [
    {
      "chu": "B",
      "ten": "bylina · cây thảo mộc",
      "emoji": "🌿",
      "truyen_nho": "...",
      "meo": "...",
      "nghe_giong_viet_i": [ {"cz": "bít", "nghia": "đánh"} ],
      "tu": [
        {
          "cz": "být",
          "phien_am": "bi:t",
          "nghia": "là, tồn tại",
          "emoji": "🙋",
          "tu_cung_nha": [ {"cz": "byl", "nghia": "đã là (giống đực)"} ],
          "vi_du": {"cz": "Chci být lékařka.", "vn": "Tớ muốn làm bác sĩ."}
        }
      ]
    }
  ],
  "cap_de_nham": [ {"y": "být", "y_nghia": "là", "i": "bít", "i_nghia": "đánh"} ],
  "quiz_cuoi": [ {"cau": "M__š jí s__r.", "dap_an": ["y", "ý"]} ],
  "lo_trinh_7_ngay": [ {"ngay": 1, "chu": "B", "so_tu": 13} ]
}
```

Ghi chú khi chuyển:
- Số từ mỗi nhóm phải khớp PDF: **B 13, L 13, M 14, P 14, S 11, V 11, Z 4 = 80**. Không khớp → báo tôi, không tự bù.
- Mục "vy- / vý-" (mọi từ bắt đầu bằng vy-/vý-) là một mục đặc biệt trong nhóm V: lưu thêm trường `"la_quy_tac_tien_to": true`.
- Ô "từ cùng nhà" ghi "–" → để mảng rỗng.
- Quiz cuối 8 câu và đáp án lấy đúng trang 6.

Sau khi tạo xong: **in ra một bảng gọn** (chữ Séc · nghĩa · số từ cùng nhà) theo từng nhóm để tôi dò với PDF. Viết thêm một đoạn kiểm tra tự động: tổng 80 từ, mỗi từ trong `tu[].cz` đều chứa y hoặc ý, mỗi từ trong `nghe_giong_viet_i` đều chứa i hoặc í.

### 2.2. Thêm từ về sau

Tôi chỉ cần thêm dòng vào JSON, game tự nhận, không sửa code. Viết `HUONG-DAN-THEM-TU.md` (tiếng Việt, rất đơn giản).

## 3. Kỹ thuật (bắt buộc)

- Chạy trên **Android và iPhone** qua trình duyệt. Dạng **PWA** (`manifest.json` + service worker) để "Thêm vào màn hình chính" và chơi offline.
- Chỉ **HTML + CSS + JavaScript thuần**. Không framework, không bước build, không server, không đăng nhập.
- Màn hình dọc trước. Nút ≥ 48px, chữ to, một ngón tay. Kiểm tra ở bề rộng 360px.
- Lưu tiến độ bằng `localStorage`, tách theo hồ sơ, mọi lệnh đọc/ghi bọc try/catch. Có **"Sao lưu tiến độ"** (tải file JSON) và **"Khôi phục"**.
- **Phát âm**: Web Speech API, giọng `cs-CZ`, tốc độ 0.8; nút 🐢 đọc chậm 0.6. Thiếu giọng Séc → hiện hướng dẫn ngắn cách cài trên Android / iPhone; game vẫn chơi được không có tiếng (khi đó trò "Nghe" chuyển thành "Nhìn nghĩa + emoji").
- **Đọc theo**: ghi âm bằng micro (MediaRecorder), nghe lại xen kẽ giọng mẫu, tự chấm "Giống rồi / Đọc lại". Bị chặn micro → chỉ hiện nút "Mình đã đọc to".
- Kiểm tra JSON khi mở game: sai cấu trúc → báo lỗi tiếng Việt, chỉ rõ chỗ sai.

Cấu trúc thư mục:
```
index.html  style.css  manifest.json  sw.js
js/    (luu-tien-do, man-choi, tro-choi, phat-am, on-tap, tu-dien…)
data/tu-vung-yi.json
img/   (SVG linh vật, 7 cảnh phố)
```

## 4. Người chơi

- Màn đầu: **chọn hồ sơ**. Mặc định 3 hồ sơ: **Su**, **Ảnh Dương**, **Bố mẹ**. Đổi được tên và chọn hình đại diện (SVG tự vẽ, không dùng nhân vật có bản quyền).
- Mỗi hồ sơ hiện: số phố đã qua, tổng sao, số từ đã thuộc.

## 5. Bản đồ: 7 phố chữ + Trùm cuối

| Phố | Tên cảnh | Số từ |
|---|---|---|
| 0 | **Văn phòng thám tử** (màn hướng dẫn) | – |
| B | Phố Bylina | 13 |
| L | Phố Lyže | 13 |
| M | Phố Myš | 14 |
| P | Phố Netopýr | 14 |
| S | Phố Sýr | 11 |
| V | Phố Výr | 11 |
| Z | Sân bay Ruzyně | 4 |
| ★ | **Trùm cuối** | 8 câu quiz PDF + câu trộn |

Tên và emoji lấy từ trường `ten`, `emoji` của nhóm. Thứ tự theo `lo_trinh_7_ngay`. Chưa qua phố trước thì phố sau khóa (ổ khóa). Phố đã qua chơi lại được để lấy thêm sao.

## 6. Màn 0: Văn phòng thám tử (~5 phút, bắt buộc lần đầu)

1. Cú Sýček chào: "Ở Séc có 7 chữ 'khó tính': B, L, M, P, S, V, Z. Sau chúng, nghe 'i' mà viết y hay i? Mình cùng phá án nhé!"
2. Dạy **bí mật chỉ có 1 điều** và **3 bước** từ `quy_tac` (hiện thành 3 thẻ to, có hình). Dạy câu nhớ 7 chữ "**Bé Lan Mang Pizza Sang Vườn Zui**", mỗi chữ in đậm sáng lên khi đọc.
3. Thẻ "Chữ khác thì sao?" (sau č, š, ž, ř, c, j luôn i; sau h, ch, k, r thường y).
4. Thẻ cách đọc (`cach_doc`), có nút nghe.
5. Thử mỗi thao tác 1 lần: 🔊 nghe, 🎤 đọc theo, chạm nút **Y** / **I**, chạm vào chữ Séc để xem nghĩa.
6. Cửa ải mini 5 câu: "Chữ này có thuộc 7 chữ khó tính không?" (ví dụ: sau **č** → luôn i). Đúng 4/5 → mở phố B.

## 7. Cấu trúc một phố (~10 phút, dừng giữa chừng được, game nhớ bước)

Chia từ của phố thành **các vòng, mỗi vòng 4–5 từ**. Mỗi vòng gồm các bước dưới, xong vòng này mới mở vòng sau.

### 7.1. Truyện nhớ (đầu phố, 1 phút)
Hiện `truyen_nho` thành truyện tranh đơn giản (3–4 khung). Mọi từ trong danh sách xuất hiện trong truyện được **tô màu, chữ y/ý in đỏ**, chạm vào thì nghe. Nút 🔊 đọc cả truyện (chỉ đọc phần tiếng Séc; phần Việt hiện chữ).

### 7.2. Học từ
Thẻ to: emoji · **từ Séc (chữ y/ý in đỏ, to)** · phiên âm · nghĩa Việt · nút 🔊 · nút 🎤 · câu ví dụ có nghĩa. Lật thẻ → **từ cùng nhà** (chữ y in đỏ). Thứ tự: Nhìn → Nghe → Đọc to → Bấm "Nhớ rồi ⭐".

### 7.3. Các trò chơi (luân phiên, mỗi vòng chọn 3 trò)

1. **Nghe – điền y/i** (trò chính): game đọc từ, hiện từ bị che chỗ y/i (`m_š`), con chạm **Y / Ý / I / Í** (bản đầu: chỉ Y và I; từ phố M trở đi mở thêm dấu dài Ý / Í, vì PDF dạy cả độ dài). Đúng → chữ đúng bay vào chỗ trống, đọc lại cả từ.
2. **Từ cùng nhà**: hiện từ gốc (ví dụ `mýt`), cho 3 từ (`umývadlo`, `mýdlo`, `míč`), con chọn các từ **cùng nhà** (cùng viết y). Từ "không cùng nhà" lấy từ `nghe_giong_viet_i` hoặc từ cùng nhà của nhóm khác.
3. **Bẫy nghe giống**: hai thẻ cùng nghe một âm (`být` / `bít`), game nói nghĩa tiếng Việt ("là, tồn tại") → con chọn đúng thẻ. Dùng `cap_de_nham` và `nghe_giong_viet_i`.
4. **Ghép nghĩa**: 4 từ Séc – 4 nghĩa Việt, chạm cặp đôi.
5. **Câu ví dụ**: hiện `vi_du.cz` bị che chữ y/i, con điền. Có nghĩa tiếng Việt bên dưới.
6. **Thám tử soi lỗi** (từ phố P trở đi): 4 từ, 1 từ viết sai y/i, con tìm từ sai. Sau khi chọn, **hiện ngay bản đúng to và rõ**, từ sai biến mất (không để mặt chữ sai đứng lâu trên màn hình).

### 7.4. Khi sai
Không trừ điểm. Cú Sýček nhắc đúng **mẹo** của nhóm (`meo`) hoặc chỉ ra từ gốc ("`umývadlo` là con cháu của `mýt` → viết y"). Câu sai được hỏi lại ở cuối vòng.

### 7.5. Cửa ải phố (cuối phố, ~3 phút)
- **10 câu**, trộn trò 1, 2, 3, 5. Từ phố L trở đi có 2 câu ôn phố trước.
- Ưu tiên từ con hay sai.
- **Đúng ≥ 8/10 mới mở phố tiếp.** 10/10 = 3 sao, 9 = 2 sao, 8 = 1 sao.
- Chưa đạt: không mất sao cũ, cú động viên, cho xem lại thẻ từ sai, thử lại (đổi thứ tự và một phần câu).
- Trong Cửa ải không có nút gợi ý luật, nhưng **chạm từ xem nghĩa vẫn được** (Cửa ải kiểm tra y/i, không kiểm tra nghĩa).

### 7.6. Kết phố
Huy hiệu con dấu chữ (ví dụ con dấu "B ✓"), danh sách từ đã học, sao.

## 8. Trùm cuối

- Mở khi qua cả 7 phố.
- Gồm **8 câu quiz** trong `quiz_cuoi` (đúng như PDF) + 7 câu trộn (mỗi phố 1 câu) + phần **6 cặp nghe giống hệt** (`cap_de_nham`).
- Thêm chế độ **"Chính tả (diktát)"**: game đọc câu ví dụ `vi_du.cz`, con gõ lại cả từ bị che (bàn phím ảo có sẵn nút ý, í, ě, š, č, ř, ž, ů). Chỉ chấm đúng/sai ở chữ y/i; sai chữ khác thì nhắc nhẹ, không tính.
- Đạt ≥ 80% → **Bằng "Thám tử Y/I"** (trang chứng nhận có tên con, ngày, chụp màn hình được).

## 9. Ôn lại và tra cứu

### 9.1. Ôn lại ngắt quãng
- Mỗi từ có **hộp nhớ 1–5** riêng cho từng hồ sơ. Mới học vào hộp 1. Đúng lên 1 hộp, sai về hộp 1. Thời gian chờ: 1 / 3 / 7 / 14 / 30 ngày. Qua hộp 5 = "Đã thuộc lâu".
- Trang chủ có nút **"Ôn hôm nay (N từ)"**, tối đa 15 từ, ~3 phút, chủ yếu dùng trò "Nghe – điền y/i".
- Lâu không vào (> 3 ngày): khi mở, cú nhắc câu "Bé Lan Mang Pizza Sang Vườn Zui" và 3 từ hay sai nhất.

### 9.2. Chạm để dịch (bắt buộc ở mọi màn hình)
Chạm vào **bất kỳ chữ Séc nào** → thẻ nhỏ: chữ Séc · phiên âm · nghĩa Việt · 🔊. Chỉ dùng nghĩa có trong JSON; chữ nào không có thì ghi "xem nghĩa cả câu". **Không tự bịa nghĩa.**
Ngoại lệ: trong câu hỏi đang che chữ y/i, thẻ tra nghĩa **không được lộ đáp án** (hiện chữ còn che, chỉ hiện nghĩa).

### 9.3. Sổ thám tử (từ điển)
Liệt kê mọi từ đã gặp theo 7 nhóm, ô tìm kiếm (Séc hoặc Việt, tìm không cần gõ dấu), lọc theo chữ cái. Từ hay sai có ⚠️. Mỗi nhóm có nút **"Đọc cả nhóm"**: đọc lần lượt 13–14 từ theo nhịp, để con đọc thuộc lòng theo kiểu trường Séc.

### 9.4. Trang tiến độ cho bố mẹ
Nút **"👨‍👩‍👧 Tiến độ"** ở trang chủ, không mật khẩu. Mỗi hồ sơ: số phút chơi 7 ngày gần nhất (biểu đồ cột đơn giản), số từ đã học / đang ôn / đã thuộc lâu, **10 từ hay sai nhất** (có nút nghe), phố đang chơi. Không xếp hạng giữa các con. Dữ liệu chỉ trong máy.

## 10. Phần thưởng và chất lượng

- Sao, con dấu chữ, bằng thám tử. Cú khen bằng tiếng Việt, câu ngắn, đổi nhiều câu khác nhau.
- Hiệu ứng nhẹ, âm thanh nhỏ, có nút tắt âm.
- Chạy mượt trên điện thoại cũ. Không lỗi khi thiếu giọng đọc, thiếu micro, mất mạng.
- **Tự kiểm tra tự động** (viết thành file `kiem-tra.html` mở được trên trình duyệt, in kết quả):
  1. Đủ 80 từ, đúng số từ mỗi nhóm.
  2. Mỗi câu hỏi sinh ra có **đúng 1 đáp án đúng** và đáp án khớp chữ trong JSON (thử sinh 500 câu ngẫu nhiên).
  3. Mọi từ trong JSON xuất hiện ít nhất 1 lần trong một trò chơi nào đó.
  4. Không có chữ Séc nào trên màn hình mà không chạm được để xem nghĩa.
  5. Trò "Thám tử soi lỗi": từ sai sinh ra **không trùng** với một từ đúng có thật trong danh sách `nghe_giong_viet_i` (ví dụ không được coi `bít` là lỗi chính tả, vì `bít` là từ đúng nghĩa "đánh").

## 11. Các giai đoạn (dừng sau mỗi giai đoạn để tôi thử)

1. **Dữ liệu**: chuyển PDF → `data/tu-vung-yi.json`, in bảng đối chiếu, chạy kiểm tra 80 từ.
2. **Khung game + phố B hoàn chỉnh**: chọn hồ sơ, lưu tiến độ, màn 0, phố B đủ truyện nhớ, học từ, trò 1–5, Cửa ải, kết phố.
3. **6 phố còn lại** từ dữ liệu, trò 6 "Thám tử soi lỗi", dấu dài Ý/Í từ phố M.
4. **Ôn lại ngắt quãng, Trùm cuối, diktát, Sổ thám tử, trang Tiến độ.**
5. **Đóng gói và kiểm tra**: PWA offline, sao lưu/khôi phục, `kiem-tra.html`, `HUONG-DAN-THEM-TU.md`.
6. **Đưa lên mạng miễn phí** (GitHub Pages): hướng dẫn từng bước, kèm cách "Thêm vào màn hình chính" trên Android (Chrome) và iPhone (Safari).

## 12. Khi bắt đầu

Trước khi viết code:
1. Tóm tắt ngắn bằng tiếng Việt bạn hiểu game thế nào, nhất là trò "Nghe – điền y/i" và Cửa ải.
2. Hỏi tôi tối đa 3 điểm còn chưa rõ.
3. Đợi tôi trả lời rồi mới bắt đầu giai đoạn 1.
