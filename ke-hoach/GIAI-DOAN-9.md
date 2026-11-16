# Giai đoạn 9: Theo dõi hiệu quả

Trạng thái: **đã code ở bản v2-67**. Ngày soạn: 2026-11-16.

Riêng tư: dữ liệu theo dõi chỉ nằm trong máy (`S.theodoi`), đi theo file sao lưu (có mật khẩu nếu đặt). **Không** đưa vào `SYNC_TABS`, nên không lên Sheet hay Drive.

## 1. Mục đích

Khi một người bắt đầu dùng một TPCN cho một mục tiêu, app giúp họ tự ghi vài con số trước và sau, đến mốc thì nhìn lại bằng biểu đồ đơn giản rồi quyết định **Giữ / Dừng / Hỏi bác sĩ**. App không kết luận TPCN có tác dụng: số có thể đổi vì nhiều lý do khác, câu này luôn hiện cạnh biểu đồ.

## 2. Dữ liệu

```js
S.theodoi = [{
  id, memberId,
  mt: 'ngu',                 // mã mục tiêu (muc-tieu.csv)
  tpcn: 'Magie B6 ...',      // tên TPCN hoặc chất, chữ tự do
  bat_dau: 'YYYY-MM-DD',     // ngày bắt đầu dùng (có thể là ngày sắp tới)
  moc: 4 | 8,                // số tuần đến lần xem lại
  xem_lai: 'YYYY-MM-DD',     // = bat_dau + moc tuần; đổi khi chọn Giữ / Hỏi bác sĩ
  tieu_chi: '...',           // tiêu chí dừng, người dùng tự ghi (bắt buộc, tối thiểu 5 ký tự)
  cs: [{id, ten, dv}],       // 1 đến 3 chỉ số
  ghi: [{ngay, v:{<id chỉ số>: số}}],   // mỗi ngày một dòng
  tt: 'dang' | 'dung', ngay_dung,
  qd: [{ngay, kq:'giu'|'dung'|'hoi'}]   // lịch sử quyết định
}]
```

Chỉ số gợi ý sẵn: số lần thức giấc mỗi đêm, điểm đau gối 0 đến 10, điểm mệt 0 đến 10, cân nặng, giờ ngủ, xét nghiệm (tự đặt tên, đơn vị). Có thể tự đặt chỉ số khác.

## 3. Màn hình

1. **Gia đình, người, tab "Theo dõi"**: danh sách, nút "+ Thêm theo dõi", biểu đồ, ô nhập (có chọn ngày, để ghi bù số trước khi bắt đầu), nút quyết định, xoá. Từ trang Gợi ý, thẻ "Có thể cân nhắc" có nút "+ Đặt theo dõi" điền sẵn mục tiêu và tên chất.
2. **Hôm nay, khối "Theo dõi"**: nhập nhanh số hôm nay cho từng theo dõi đang chạy. Đến mốc xem lại thì thẻ đổi thành nhắc xem lại: biểu đồ trước và sau, tiêu chí dừng đã ghi, ba nút Giữ / Dừng / Hỏi bác sĩ.

## 4. Cách so trước và sau

- **Trước**: các số ghi trong 7 ngày trước ngày bắt đầu. Nếu chưa có số nào trước ngày bắt đầu, lấy 7 ngày đầu sau khi bắt đầu và ghi rõ điều đó.
- **Gần đây**: các số trong 7 ngày cuối của dữ liệu.
- Biểu đồ SVG tự vẽ (không thư viện): đường nối các lần ghi, vạch đứng ngày bắt đầu, hai đoạn nét đứt là trung bình trước và gần đây. Có bảng số kèm theo cho người đọc bằng chữ. Màu theo biến giao diện nên đúng cả chế độ tối.
- App không nói "tốt hơn" hay "tệ hơn", chỉ hiện hai con số và số lần ghi.

## 5. Quyết định ở mốc

| Nút | Việc app làm |
|---|---|
| Giữ | Ghi lịch sử, dời `xem_lai` thêm `moc` tuần |
| Dừng | Hỏi xác nhận, đặt `tt='dung'`, ghi ngày dừng |
| Hỏi bác sĩ | Ghi lịch sử, nhắc lại sau 14 ngày; mục này tự thành một câu hỏi trong **Phiếu hỏi bác sĩ** |

## 6. Giới hạn đã biết

- Chưa sửa được một theo dõi đã tạo (xoá và tạo lại). Có thể thêm sau.
- Chưa có nhắc bằng thông báo hệ thống, chỉ nhắc khi mở trang Hôm nay.
- Chưa tách riêng giai đoạn "rửa thuốc" hay thay đổi nhiều TPCN cùng lúc: nếu người dùng đổi nhiều thứ cùng tuần thì số liệu khó quy cho một thứ, app chỉ nhắc câu cảnh báo chung.
