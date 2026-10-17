# KẾ HOẠCH LÀM GAME "THÁM TỬ Y/I" (Vyjmenovaná slova)

Nguồn nội dung: file `BO1-Bang-tu-vung-co-nghia-viet-6-trang.pdf` (80 từ viết y/ý sau B, L, M, P, S, V, Z; có phiên âm, nghĩa Việt, truyện nhớ, từ cùng nhà, ví dụ, từ dễ nhầm, quiz 8 câu, lộ trình 7 ngày).

Prompt để dán vào Claude Code: `PROMPT-CLAUDE-CODE.md` (cùng thư mục này).

---

## Ý tưởng game (tóm tắt 30 giây)

- Con là **thám tử chữ**, đi qua **7 "phố chữ"**: B → L → M → P → S → V → Z, đúng thứ tự lộ trình 7 ngày trong PDF.
- Mỗi phố = 1 màn ~10 phút (khớp "mỗi ngày 10 phút" của PDF).
- Kỹ năng chính cần luyện: **nghe một từ → quyết định viết y hay i**. Mọi trò chơi đều quy về kỹ năng này, vì đây là thứ bị chấm trong bài chính tả (diktát) ở trường Séc.
- Cuối mỗi phố là **"Cửa ải"**: 10 câu, đúng ≥ 8 mới mở phố tiếp. Cuối cùng là **"Trùm cuối"**: 8 câu quiz trong PDF + câu trộn cả 7 phố.
- Có **ôn lại ngắt quãng** (1–3–7–14–30 ngày) để từ không bị quên sau 1 tuần.

## Vì sao thiết kế như vậy

| Quyết định | Lý do |
|---|---|
| Bám đúng 7 nhóm chữ của PDF | Trường Séc dạy theo đúng thứ tự này; con học ở trường và ở nhà khớp nhau |
| Trò "Nghe rồi điền y/i" là trò chính | Đây là dạng bài kiểm tra thật (diktát) |
| Dạy "từ cùng nhà" | Học 1 từ gốc → biết luôn 3–5 từ phái sinh, đỡ học thuộc |
| Dạy "nghe giống nhưng viết i" (byt/bít, mýt/mít…) | Đây là chỗ học sinh mất điểm nhiều nhất |
| Không đếm giờ, sai không bị phạt | Trẻ học ngôn ngữ thứ 2 dễ nản nếu bị áp lực |
| Không để trẻ nhìn thấy chữ viết sai lâu | Tránh "nhớ nhầm mặt chữ": sai → hiện ngay chữ đúng, đọc lại |

---

## CÁC BƯỚC THỰC HIỆN (6 bước)

Cách đổi model trong Claude Code: gõ `/model` rồi chọn trong danh sách (hoặc gõ thẳng `/model opus`, `/model sonnet`, `/model haiku`).
Model ID chính xác: Opus 5.5 = `claude-opus-5-5` · Sonnet 5.5 = `claude-sonnet-5-5` · Haiku 5.5 = `claude-haiku-5-5`.

| Bước | Việc làm | Model | Vì sao chọn model này |
|---|---|---|---|
| **1** | Đọc PDF, chuyển 80 từ thành file dữ liệu `data/tu-vung-yi.json`, in ra bảng để bố mẹ đối chiếu | **Opus 5.5** | Đọc chữ từ ảnh PDF, một dấu y/ý/i/í sai là dạy sai cho con → cần model đọc chính xác nhất |
| **2** | Khung game: chọn người chơi, lưu tiến độ, **màn B hoàn chỉnh** (học từ, 4 trò chơi, Cửa ải) | **Opus 5.5** | Quyết định cấu trúc code cho cả game; làm đúng từ đầu thì các bước sau chỉ việc nhân bản |
| **3** | Nhân ra 6 phố còn lại (L, M, P, S, V, Z) từ dữ liệu, thêm trò "Từ cùng nhà" và "Bẫy nghe giống" | **Sonnet 5.5** | Việc lặp lại theo khuôn đã có, Sonnet làm nhanh và rẻ hơn |
| **4** | Ôn lại ngắt quãng, Trùm cuối (quiz 8 câu), Sổ từ, trang tiến độ cho bố mẹ | **Sonnet 5.5** | Logic rõ ràng, đã mô tả chi tiết trong prompt |
| **5** | Tự kiểm tra: mỗi câu hỏi đúng 1 đáp án, đủ 80 từ, không lỗi khi thiếu giọng đọc/mạng; chơi offline (PWA) | **Sonnet 5.5** (nếu một lỗi sửa 2 lần chưa xong → chuyển **Opus 5.5**) | Sonnet đủ cho kiểm thử; lỗi khó thì cần Opus |
| **6** | Đưa lên mạng miễn phí (GitHub Pages) + hướng dẫn "Thêm vào màn hình chính" trên Android/iPhone | **Haiku 5.5** | Việc đơn giản, chỉ là hướng dẫn và vài lệnh |

### Sau mỗi bước bạn làm gì

1. **Sau bước 1**: Claude in ra bảng 80 từ. Bạn mở PDF cạnh bên, dò nhanh cột chữ Séc (chỉ cần dò chữ y/ý). Nhờ con dò cùng cũng là một lần ôn. Sai chỗ nào → nói Claude sửa.
2. **Sau bước 2**: mở game trên điện thoại, cho con chơi thử phố B. Hỏi con: dễ quá / khó quá / chán chỗ nào. Báo lại cho Claude trước khi sang bước 3.
3. **Sau bước 3, 4, 5**: mỗi bước chơi thử 5–10 phút.
4. **Sau bước 6**: có link, mở trên máy con, "Thêm vào màn hình chính".

### Mẹo tiết kiệm

- Mỗi bước mở **một cuộc trò chuyện mới** trong Claude Code và nhắc: "Đọc file `PROMPT-CLAUDE-CODE.md` và `TIEN-DO.md`, làm tiếp giai đoạn N." (Prompt đã yêu cầu Claude ghi `TIEN-DO.md` sau mỗi giai đoạn.) Như vậy không bị dài, không tốn lượt.
- Không dùng Opus cho bước 3–6 trừ khi bị kẹt.

---

## Rủi ro cần biết

- **Phiên âm trong PDF là gần đúng** (PDF tự ghi vậy). Game dùng giọng đọc tiếng Séc của điện thoại (`cs-CZ`) làm chuẩn nghe; phiên âm Việt chỉ để gợi nhớ.
- **Giọng đọc Séc**: một số điện thoại chưa cài sẵn. Game sẽ hướng dẫn cài; nếu không có, vẫn chơi được bằng chữ.
- **80 từ là danh sách chuẩn lớp 3–4.** Nếu con đã ở lớp cao hơn và đã thuộc, game vẫn có ích ở phần "từ cùng nhà" và "bẫy nghe giống"; nếu cần mức khó hơn (dạng câu chính tả dài), làm thêm sau.

## Điều có thể khiến kế hoạch này sai

- Nếu con đang học ở trường theo một thứ tự khác (ví dụ cô dạy chữ S trước), nên đổi thứ tự phố cho khớp lớp, chỉ cần sửa 1 dòng trong file dữ liệu.
- Giáo viên Séc lâu năm thường cho trẻ **đọc thuộc lòng danh sách theo nhịp** ("by-li, být, ..."). Game không thay được việc đó; bố mẹ vẫn nên cho con đọc to danh sách 1 lần/ngày, game dùng để kiểm tra và ôn.
