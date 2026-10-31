// Chạy: node phieu-scan/test.js
const assert = require('assert');
const P = require('./parse.js');

// 21 dòng đọc từ ảnh mẫu (mã đúng như in trên giấy, kể cả chỗ bị ngắt dòng).
const sample = [
  [1, 'AROMVUN-85955 56459249', 'AROME Vonné tyčinky Antistress', '8595556459249'],
  [2, 'AROMVUN-85955 56487037', 'AROME Vonné tyčinky Broskev', '8595556487037'],
  [3, 'AROMVUN-85957 17307969', 'AROME Vonné tyčinky Energising', '8595717307969'],
  [4, 'AROMVUN-85957 17308010', 'AROME Vonné tyčinky Frankincense', '8595717308010'],
  [5, 'AROMVUN-85955 56487006', 'AROME Vonné tyčinky Jahoda', '8595556487006'],
  [6, 'AROMVUN-85955 56487099', 'AROME Vonné tyčinky Kokos', '8595556487099'],
  [7, 'AROMVUN-85957 17307990', 'AROME Vonné tyčinky Meditation', '8595717307990'],
  [8, 'AROMVUN-85955 56487112', 'AROME Vonné tyčinky Čokoláda', '8595556487112'],
  [9, 'AIRW19-599910 9544155', 'Air Wick -19ml Sprimg Breeze Lsland Vanilla', '5999109544155'],
  [10, 'AIRW250-30599 43009042', 'Air Wick 250ml náhr. náplň / Bílé květy frézie', '3059943009042'],
  [11, 'AIRWNAH19-590 0627055122', 'Air Wick náhr. náplň 19ml  line', '5900627055122'],
  [12, 'AIRW19-599910 9543141', 'Air Wick náhr. náplň 19ml / Flower Meadow +Spring Breeze', '5999109543141'],
  [13, 'AIRW19-599910 9542830', 'Airwick 19ml elektrický Vanilla Cookie', '5999109542830'],
  [14, 'AIRWNAP19-599 9109545824', 'Airwick 19ml elektrický White peony +jasmine blossom', '5999109545824'],
  [15, 'AIRWNAP19-599 9109545916', 'Airwick 19ml náh. náplň / Blue Eucalyptus +Cedarwood', '5999109545916'],
  [16, 'AIRW19-599910 9545961', 'Airwick 19ml náh. náplň / Linen +White Orchid', '5999109545961'],
  [17, 'AIRW19-599910 9545978', 'Airwick 19ml náh. náplň / Ocean Waves+Sea Salt', '5999109545978'],
  [18, 'AIRW19-599910 9546227', 'Airwick 19ml náh. náplň / Pumpkin +Winter Spice', '5999109546227'],
  [19, 'AIRW19-599910 9545985', 'Airwick 19ml náh. náplň / Sweet Vanilla', '5999109545985'],
  [20, 'AIRWNAP19-599 9109546258', 'Airwick 19ml náh. náplň / Winter Punch +Spices', '5999109546258'],
  [21, 'AIRW250-59991 09543578', 'Airwick 250ml Essential Oils', '5999109543578'],
];

let bad = 0;
for (const [pol, raw, , want] of sample) {
  const got = P.cleanKod(raw);
  assert.strictEqual(got, want, `dòng ${pol}: ${raw} -> ${got}`);
  const st = P.status(got);
  if (st !== 'ok') { bad++; console.log(`dòng ${pol}: ${got} trạng thái ${st}`); }
}
console.log(`cleanKod: ${sample.length}/${sample.length} khớp; EAN-13 hợp lệ: ${sample.length - bad}/${sample.length}`);

// Các trường hợp biên
assert.strictEqual(P.cleanKod('AROMVUN8595556487037'), '8595556487037'); // không có dấu "-"
assert.strictEqual(P.cleanKod(null), '');
assert.strictEqual(P.status('85955564870'), 'len');
assert.strictEqual(P.status('8595556487038'), 'check'); // sai chữ số cuối

// Câu trả lời của mô hình bọc trong ```json
const rows = P.toRows(P.parseModelJson('```json\n[{"pol":2,"kod":"AROMVUN-85955\\n56487037","nazev":"AROME  Vonné\\ntyčinky Broskev"}]\n```'));
assert.deepStrictEqual(rows, [{ pol: '2', kod: '8595556487037', nazev: 'AROME Vonné tyčinky Broskev' }]);
assert.throws(() => P.parseModelJson('xin lỗi, không đọc được'));
console.log('Tất cả kiểm tra đạt.');
