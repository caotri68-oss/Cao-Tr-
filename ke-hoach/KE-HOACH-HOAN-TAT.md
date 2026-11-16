# Kế hoạch hoàn tất

Ngày soạn: 2026-11-16.

Kế hoạch này chạy sau khi 4 việc đang chạy xong. Mỗi bước có ghi người làm, model và điều kiện để chuyển sang bước sau. Các bước **có dấu ✋ phải có bạn duyệt** thì mới chạy.

## Bước 1. Gom kết quả (quản lý, Opus)

- Đợi đủ 4 báo cáo:
  - kiểm chứng nguồn tương tác thuốc
  - chấm mức và ghép 216 Ý
  - giai đoạn 7 bước 4–5 cùng giai đoạn 9
  - giai đoạn 8
- `git pull`, rồi chạy lại toàn bộ theo thứ tự:
  1. `node ke-hoach/scripts/chuyen-bang-y.js`
  2. `node ke-hoach/scripts/tinh-tang.test.js` (phải đạt)
  3. `node ke-hoach/scripts/tinh-tang.js`
  4. `node ke-hoach/scripts/xuat-app.js`
  5. `node ke-hoach/scripts/kiem-y-moi.test.js`
- Kiểm tra `docs/data/khung.json`:
  - có đủ 23 mục tiêu (kể cả gout)
  - có `tuong_tac` và `nhom_thuoc`
  - không có chữ "chữa"
  - không có thông tin cá nhân
- Điều kiện qua bước: mọi bộ kiểm thử đạt và script chạy hai lần cho kết quả giống hệt.

## Bước 2. Kiểm tra toàn app (agent Haiku, chỉ đọc)

Phạm vi là bản mới nhất trên nhánh làm việc (dự kiến v2-67), chạy bằng Playwright cỡ điện thoại, cả chế độ sáng và tối.

Danh sách kiểm tra:

- [ ] Hôm nay: lịch uống, cảnh báo (đỏ, cam, xám), nhật ký theo dõi
- [ ] Tủ thuốc: thêm, sửa, xoá sản phẩm; trùng chất; vượt mức tối đa
- [ ] Thư viện: tìm "hořčík", "thận", "gout", "mất ngủ"; trang Mục tiêu có đủ 6 phần
- [ ] Gia đình: thẻ thành viên (chỉ đếm cảnh báo nặng), Hồ sơ, Bản đồ phủ, Gợi ý, Phiếu hỏi bác sĩ, Theo dõi
- [ ] Công tắc "Xem cả ý chưa duyệt" bật và tắt đều đúng
- [ ] Sao lưu có mật khẩu: xuất, nhập đúng, nhập sai, nhập file cũ
- [ ] Không có mạng: tải trang một lần, cắt mạng, mở lại
- [ ] Không có lỗi JavaScript

Đầu ra là `ke-hoach/QA.md` kèm ảnh. Lỗi nhỏ thì giao Sonnet sửa, lỗi lớn thì báo bạn.

## Bước 3. ✋ Bạn duyệt nội dung (trên điện thoại, khoảng 15 phút)

Thứ tự ưu tiên:

1. 5 tương tác ở mức **chặn**, xem kết quả kiểm chứng nguồn.
2. 15 Ý quan trọng trong `GHEP-TAI-LIEU.md`. Ưu tiên axit folic khi mang thai, magie với giấc ngủ, vitamin D liều cao, CoQ10.
3. Ý gout "không tự dùng TPCN thay thuốc hạ acid uric". Ý này do agent suy ra, không có nguồn nào ghi nguyên văn.
4. Xem ảnh màn hình 04–17 và ảnh QA.

Cách trả lời: nhắn "duyệt hết", hoặc ghi số mục cần sửa.

## Bước 4. ✋ Gộp lên trang chính

Điều kiện: bước 2 không còn lỗi lớn, và bạn nhắn đúng câu **"gộp lên trang chính"**.

- Trang `caotri68-oss.github.io/Cao-Tr-` gần như chắc chắn chạy từ nhánh `ccr-08643b6b-cfgj04`, thư mục `docs/`. Trước khi gộp, cần xác nhận lại trong Settings → Pages của repo.
- Cách làm:
  1. Tạo nhánh dự phòng `du-phong-v2-62` từ `ccr-08643b6b-cfgj04`.
  2. Chép thư mục `docs/` của nhánh làm việc sang nhánh `ccr-08643b6b-cfgj04`, commit và push.
- Dữ liệu cũ trên điện thoại được giữ nguyên, vì dữ liệu nằm trong bộ nhớ máy, không nằm trong code. App tự báo có bản mới qua service worker.
- Cách quay lại bản cũ: chép lại `docs/` từ nhánh `du-phong-v2-62`.
- Sau khi gộp: mở trang trên điện thoại, kiểm tra số phiên bản ở góc trên.

## Bước 5. ✋ Build APK (phiên "APP TPCN apk" trên máy tính)

Điều kiện: đã gộp xong bước 4, và máy tính ở nhà đang bật.

- Phiếu gửi phiên APK có sẵn ở `ke-hoach/PHIEU-APK.md`. Tôi gửi bằng `send_message`.
- Chiều trả lời từ máy tính về đây đang lỗi, nên bạn chụp hoặc chép kết quả gửi lại cho tôi.

## Bước 6. Dọn dẹp sau khi xong

- Cập nhật `LO-TRINH.md` (giai đoạn 0–9).
- Ghi lại các việc còn treo:
  - 22 dòng chấm mức có độ chắc thấp
  - 23 chất chưa có trong kho
  - Google Sheet "Bảng Ý TPCN" chưa đồng bộ ngược
  - cột `muc_ncuu` trong Sheet hiện "−" thay vì "R−"
  - 7 file Obsidian rỗng trên Drive
- Đề xuất đợt tiếp theo:
  - đồng bộ Bảng Ý giữa Google Sheet và app
  - nhập kết quả xét nghiệm ngày 25/09 của mẹ vào hồ sơ trên máy (không đưa lên GitHub)

## Việc bạn có thể làm bất cứ lúc nào

- Gửi ảnh phiếu xét nghiệm ngày 25/09 của mẹ (canxi máu, PTH, vitamin D, công thức máu). Tôi cập nhật vào hồ sơ trong Obsidian.
- Mở Obsidian trên máy tính, xem 7 ghi chú đang bị rỗng trên Drive.
