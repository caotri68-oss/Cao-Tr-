#!/usr/bin/env bash
# Build o2helper.apk bằng công cụ có sẵn trên Ubuntu:
#   sudo apt-get install aapt apksigner dalvik-exchange libandroid-23-java zipalign default-jdk
set -euo pipefail
cd "$(dirname "$0")"
ANDROID_JAR=/usr/lib/android-sdk/platforms/android-23/android.jar
OUT=build
rm -rf "$OUT" && mkdir -p "$OUT/classes"

javac --release 8 -cp "$ANDROID_JAR" -d "$OUT/classes" src/vn/caotri/o2helper/*.java
dalvik-exchange --dex --output="$OUT/classes.dex" "$OUT/classes"
aapt package -f -M AndroidManifest.xml -I "$ANDROID_JAR" -F "$OUT/unsigned.apk"
(cd "$OUT" && aapt add unsigned.apk classes.dex >/dev/null)
zipalign -f 4 "$OUT/unsigned.apk" "$OUT/aligned.apk"

[ -f debug.keystore ] || keytool -genkeypair -keystore debug.keystore -storepass android \
    -keypass android -alias o2helper -keyalg RSA -keysize 2048 -validity 10000 \
    -dname "CN=O2 Helper" >/dev/null 2>&1
apksigner sign --ks debug.keystore --ks-pass pass:android --key-pass pass:android \
    --out o2helper.apk "$OUT/aligned.apk"
apksigner verify o2helper.apk && echo "OK: $(pwd)/o2helper.apk"
