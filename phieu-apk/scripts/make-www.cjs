// Sao chép bản web (../phieu-scan) vào www/ để Capacitor đóng gói vào APK.
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, '..', '..', 'phieu-scan'), dst = path.join(__dirname, '..', 'www');
fs.rmSync(dst, { recursive: true, force: true }); fs.mkdirSync(dst, { recursive: true });
for (const f of ['index.html', 'parse.js']) fs.copyFileSync(path.join(src, f), path.join(dst, f));
console.log('www/ đã sẵn sàng:', fs.readdirSync(dst).join(', '));
