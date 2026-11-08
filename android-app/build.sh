#!/usr/bin/env bash
# Build APK không cần Gradle/Android Studio.
# Cần: aapt, dalvik-exchange (dx), zipalign, apksigner, javac, keytool
#   apt-get install -y aapt dalvik-exchange zipalign apksigner libandroid-23-java
set -euo pipefail
cd "$(dirname "$0")"

ANDROID_JAR=/usr/lib/android-sdk/platforms/android-23/android.jar
OUT=dist
BUILD=build
APK_NAME=TaoDonHangNhanh.apk
VERSION_CODE=${VERSION_CODE:-1}
VERSION_NAME=${VERSION_NAME:-1.0}

rm -rf "$BUILD" && mkdir -p "$BUILD/classes" "$BUILD/assets/www" "$OUT"

# 1) Nhúng trang web vào assets
cp ../order-app/index.html ../order-app/catalog.js ../order-app/logic.js "$BUILD/assets/www/"

# 2) Biên dịch Java (bytecode Java 8 để dx đọc được) rồi chuyển sang dex
javac --release 8 -Xlint:-options -cp "$ANDROID_JAR" -d "$BUILD/classes" src/com/caotri/donhang/*.java
dalvik-exchange --dex --min-sdk-version=21 --output="$BUILD/classes.dex" "$BUILD/classes"

# 3) Đóng gói manifest + resources + assets
aapt package -f \
  -M AndroidManifest.xml -S res -A "$BUILD/assets" -I "$ANDROID_JAR" \
  --min-sdk-version 21 --target-sdk-version 34 \
  --version-code "$VERSION_CODE" --version-name "$VERSION_NAME" \
  -0 arsc -F "$BUILD/unsigned.apk"
(cd "$BUILD" && aapt add unsigned.apk classes.dex >/dev/null)

# 4) Căn chỉnh và ký (debug keystore dùng chung để các bản sau cài đè lên được)
if [ ! -f debug.keystore ]; then
  keytool -genkeypair -keystore debug.keystore -storepass android -keypass android \
    -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000 \
    -dname "CN=Android Debug,O=Android,C=US" >/dev/null 2>&1
fi
zipalign -f -p 4 "$BUILD/unsigned.apk" "$BUILD/aligned.apk"
apksigner sign --ks debug.keystore --ks-pass pass:android --key-pass pass:android \
  --ks-key-alias androiddebugkey --out "$OUT/$APK_NAME" "$BUILD/aligned.apk"

apksigner verify --verbose "$OUT/$APK_NAME" | head -6
ls -la "$OUT/$APK_NAME"
