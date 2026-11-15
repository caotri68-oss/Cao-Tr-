# Thiết kế Bảng Ý (giai đoạn 2)

Trạng thái: **chờ bạn duyệt**. Chưa tạo gì trên Google Drive.

## Mục đích

Mỗi dòng là **một nguồn nói một điều về một chất cho một bệnh hoặc mục tiêu**. App đọc bảng này để:

- trả lời "bệnh X nên dùng gì",
- đối chiếu tủ thuốc,
- chấm tầng tin cậy A–X.

## Google Sheet "Bảng Ý TPCN" gồm 4 tab

### Tab 1. `Y`: các Ý (bảng chính)

| Cột | Ví dụ | Quy tắc |
|---|---|---|
| `ma_y` | `Y-mg-ngu-001` | Mã duy nhất, không bao giờ đổi |
| `chat` | `mg` | **Mã chất**, lấy từ tab `Chat`. Không ghi tên tự do |
| `muc_tieu` | `ngu` | **Mã mục tiêu**, lấy từ tab `MucTieu` |
| `huong` | `loi` | Chỉ 1 trong 3: `loi` (có lợi), `khong` (không tác dụng), `hai` (có hại hoặc cần tránh) |
| `noi_dung` | "Cải thiện thời gian vào giấc ở người thiếu magie" | 1 câu, lời của app |
| `lieu` | `200–400 mg/ngày, tối` | Để trống nếu nguồn không nói |
| `nguon` | `NIH` | **Mã nguồn**, lấy từ tab `Nguon` |
| `muc_ncuu` | `R2` | Một trong R1, R2, R3, R0, R−. Bước chấm tầng (giai đoạn 4) điền |
| `trich_dan` | đoạn nguyên văn ngắn | Bắt buộc với nguồn tác giả. Đây là phần "đọc đoạn gốc" |
| `link_goc` | link bài trong Obsidian hoặc URL | |
| `trang_thai` | `cho_duyet` | `cho_duyet`, `da_duyet` hoặc `bo`. **App chỉ dùng `da_duyet`** |
| `ghi_chu` | | Tự do |

### Tab 2. `Nguon`: danh sách nguồn

| Cột | Ví dụ |
|---|---|
| `ma_nguon` | `NIH`, `BS-PHUC`, `C-THAO`, `EFSA`, `COCHRANE`, `NCCIH`, `OBSIDIAN` |
| `ten` | "Bác sĩ Trần Văn Phúc" |
| `loai` | `chinh_thuc` (NIH, EFSA, Cochrane, NCCIH), `chuyen_gia` (bác sĩ, dược sĩ), `tac_gia` (người viết khác), `ca_nhan` (ghi chú của bạn) |
| `dua_vao` | Nguồn này hay dẫn lại từ đâu, ví dụ `NIH`. Dùng để tính **độc lập** |

### Tab 3. `Chat`: từ điển chất

Lấy từ `docs/tu-dien.js` vừa làm ở phiếu 01. Các cột: `ma_chat`, `ten_viet`, `ten_khac`, `nhom`.

### Tab 4. `MucTieu`: bệnh và mục tiêu

Khởi đầu bằng 19 chủ đề app đã có sẵn: xương, máu, miễn dịch, tim, não, ngủ, tiêu hoá, cơ, khớp, mắt, da, thai, giáp, mệt mỏi, bù thiếu, tâm trạng, gan, đường huyết, ho. Gout và mỡ máu thêm ở giai đoạn 3.

Các cột: `ma`, `ten`, `can_kham_truoc` (ví dụ: xét nghiệm acid uric), `ghi_chu_an_toan`.

## Cách app tính tầng cho một cặp (chất, mục tiêu)

Gom mọi dòng `da_duyet` có cùng `chat` và `muc_tieu`, rồi xét theo thứ tự:

1. **Có dòng `huong = hai`** → hiện cảnh báo đỏ, bất kể tầng.
2. **Có nguồn `chinh_thuc` mức R−**, đồng thời có nguồn khác nói `loi` → tầng **X** (mâu thuẫn), hiện cả hai bên.
3. **Mức nghiên cứu tốt nhất là R1** → tầng **A**.
4. **R2 và có ≥1 nguồn `chuyen_gia` đồng ý** → tầng **B**. Nếu R2 mà không có chuyên gia nào đồng ý thì cũng xếp **B**, kèm ghi "chưa có chuyên gia xác nhận".
5. **R3, hoặc R0 nhưng có ≥2 nguồn độc lập nói `loi`** → tầng **C**.
6. **Chỉ có 1 nguồn, không có nghiên cứu** → tầng **D**.
7. **Không có dòng nào** → **∅**, chưa có dữ liệu.

**Cách đếm nguồn độc lập:** hai nguồn có cùng `dua_vao` chỉ tính là 1. Ví dụ, BS Phúc dẫn NIH và app cũng dẫn NIH thì chỉ được tính 1 nguồn.

**Tác giả không bao giờ đẩy được quá C** nếu không có R1 hoặc R2.

## Chuyển 215 lợi ích có sẵn trong `kb.js`

Hiện `kb.js` có **215** lợi ích (không phải 300 như ước tính trước). Mỗi lợi ích có dạng `[mức, nội dung, nguồn]`.

| Mức trong `kb.js` | Số dòng | Chuyển thành |
|---|---|---|
| `chac` (chắc chắn) | 37 | `huong=loi`, `muc_ncuu=R1` |
| `cothe` (có thể) | 44 | `huong=loi`, `muc_ncuu=R2` |
| `chuaro` (chưa rõ) | 112 | `huong=loi`, `muc_ncuu` **để trống**, giai đoạn 4 chấm lại |
| `khong` (không tác dụng) | 22 | `huong=khong`, `muc_ncuu=R−` |

- **Cột `muc_tieu`** không có sẵn trong `kb.js`. Phải đọc câu để gán, ví dụ "Phòng đau nửa đầu" → `nao`. Một lợi ích có thể ra nhiều dòng nếu nhắc nhiều mục tiêu.
- **Cột nguồn:** "NIH", "NIH ODS – Magnesium" → `NIH`. "Kho Obsidian" → `OBSIDIAN`. "Chưa có nguồn đã đọc" (16 dòng) → `trang_thai=cho_duyet`, ghi chú "thiếu nguồn".
- **Mọi dòng chuyển sang đều để `cho_duyet`.** Riêng dòng có nguồn `chinh_thuc` và mức `chac` thì được để `da_duyet`.

## Rủi ro đã biết

- 112 dòng "chưa rõ" chiếm hơn nửa. Trước giai đoạn 4, phần lớn cặp chất–mục tiêu sẽ hiện tầng D hoặc ∅. Điều này đúng thực tế, không phải lỗi.
- Các bài của BS Phúc và chị Thảo (46 bài) **chưa có trong bảng**. Phần đó thuộc giai đoạn 8 (nạp bài có duyệt).
