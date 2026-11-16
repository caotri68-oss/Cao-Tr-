# Phiếu việc: build APK Sổ TPCN bản mới

- Gửi cho: phiên "APP TPCN apk" trên máy tính ở nhà.
- Model: Sonnet.
- Chỉ gửi sau khi đã gộp code lên trang chính (bước 4 trong KE-HOACH-HOAN-TAT.md).

## Nội dung gửi đi

Phiếu từ phiên quản lý. Việc này đã được người dùng duyệt.

1. Lấy code mới nhất: repo `caotri68-oss/Cao-Tr-`, nhánh `ccr-08643b6b-cfgj04`, thư mục `docs/`. Phiên bản ghi trong `docs/sw.js` (VER) và `APP_VER` trong `docs/index.html` phải khớp nhau.
2. Build APK theo đúng cách bạn đã build bản So-TPCN.apk trước đây. Dùng cùng khoá ký `tpcn-khoa-ky.keystore`, để APK mới cài đè được lên bản cũ mà không mất dữ liệu.
3. Tăng versionCode và versionName của APK, đặt versionName theo phiên bản app (ví dụ 2.67).
4. Lưu APK vào cùng thư mục trên Google Drive với So-TPCN.apk cũ, đặt tên `So-TPCN-v2-67.apk`. Không xoá bản cũ.
5. Không sửa code trong `docs/`. Nếu build lỗi thì dừng và báo lỗi nguyên văn.
6. Báo lại: đường dẫn APK, versionCode, versionName, kích thước, và kết quả cài thử (nếu có máy ảo).

## Kiểm tra sau khi cài trên điện thoại

- [ ] Mở app, dữ liệu cũ (tủ thuốc, gia đình) vẫn còn.
- [ ] Số phiên bản ở góc trên đúng bản mới.
- [ ] Thư viện có mục Thận, Gout; Gia đình có Hồ sơ, Bản đồ phủ, Gợi ý.
- [ ] Sao lưu có mật khẩu chạy được.
