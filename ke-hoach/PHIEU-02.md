# Phiếu việc 02: Tạo Bảng Ý (giai đoạn 2)

- Người làm: phiên đám mây
- Model: **Haiku** chuyển dữ liệu, **Sonnet** rà soát
- Trạng thái: **chờ duyệt** (duyệt cùng lúc với BANG-Y.md)

## Việc

1. Viết script chuyển 215 lợi ích trong `docs/kb.js` thành file `ke-hoach/bang-y.csv`, theo đúng các cột trong `BANG-Y.md`.
2. Gán `muc_tieu` cho từng dòng theo 19 chủ đề có sẵn. Dòng không gán được thì để trống và ghi chú "chưa gán".
3. Tạo thêm 3 file: `nguon.csv`, `chat.csv` (lấy từ `tu-dien.js`), `muc-tieu.csv`.
4. **Sonnet rà soát:** lấy ngẫu nhiên 30 dòng, so với câu gốc trong `kb.js`, báo tỉ lệ gán sai `muc_tieu`.
5. Sau khi bạn duyệt file CSV, mới tạo Google Sheet "Bảng Ý TPCN" trong thư mục "Sổ TPCN gia đình" và nạp 4 file vào.

## Xong khi

- `bang-y.csv` có ≥215 dòng, không dòng nào thiếu `chat` hoặc `nguon`.
- Lọc "mg + ngu" ra đúng các dòng magie về giấc ngủ.
- Tỉ lệ gán sai mục tiêu dưới 10% trong mẫu rà soát.

## Không làm

- Không sửa giao diện app.
- Không chấm tầng (đó là giai đoạn 4).
- Không ghi đè file nào có sẵn trên Drive. Chỉ **tạo mới** Sheet sau khi được duyệt.
