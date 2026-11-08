# Tạo Đơn Hàng Nhanh (Android)

App Android bọc trang `../order-app` trong một WebView; trang nằm trong APK nên chạy được khi không có mạng.

- APK đã build: `dist/TaoDonHangNhanh.apk` (package `com.caotri.donhang`, minSdk 21, targetSdk 34)
- Build lại: `./build.sh` (cần `aapt dalvik-exchange zipalign apksigner libandroid-23-java`, cài bằng apt)
- Mỗi lần sửa `../order-app`, chạy lại `./build.sh`. Tăng `VERSION_CODE` khi muốn cài đè bản cũ:
  `VERSION_CODE=2 VERSION_NAME=1.1 ./build.sh`
- `debug.keystore` là khoá debug dùng chung (mật khẩu `android`) chỉ để cài thủ công; các bản sau cần ký cùng khoá thì mới cài đè được.
