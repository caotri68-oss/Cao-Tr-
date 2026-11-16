// Tự duyệt Ý theo tiêu chí bảo thủ, sinh ke-hoach/du-lieu/duyet.csv.
// chuyen-bang-y.js đọc duyet.csv và ghi đè trang_thai theo ma_y.
// Chạy: node ke-hoach/scripts/tu-duyet.js (sau chuyen-bang-y.js), rồi chạy lại chuyen-bang-y.js.
//
// Tiêu chí da_duyet cho Ý từ tài liệu (ma_y "T-…"):
//   1. huong = loi;
//   2. mức chấm (cham-muc-tai-lieu.csv) là R1 hoặc R2, độ chắc "cao";
//   3. cùng cặp (chất, mục tiêu) đã có Ý của nguồn chính thức cũng nói có lợi, mức R1 hoặc R2.
// Ý trái khuyến cáo, Ý chấm R−, Ý độ chắc thấp hoặc vừa: giữ cho_duyet (vẫn xem được bằng công tắc).
// BO_TAY: dòng là dữ kiện chứ không phải lợi ích của chất cho mục tiêu, chuyển bo kèm lý do.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './tinh-tang.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'du-lieu');
const doc = (f) => (fs.existsSync(path.join(ROOT, f)) ? parseCsv(fs.readFileSync(path.join(ROOT, f), 'utf8')) : []);

const OFFICIAL = new Set(['NIH', 'NCCIH', 'COCHRANE', 'EFSA', 'ESPGHAN', 'FDA']);
const MINUS = '−';
const muc = (m) => (m || '').replace('R-', 'R' + MINUS).replace(/^−$/, 'R' + MINUS);

const bang = doc('bang-y.csv');
const chamKb = new Map(doc('cham-muc.csv').map((r) => [r.ma_y, r]));
const chamTl = new Map(doc('cham-muc-tai-lieu.csv').map((r) => [r.ma_y, r]));

const BO_TAY = {
  'T-coq10-mo-a0dadb': 'dữ kiện "statin làm giảm CoQ10", không phải lợi ích của CoQ10 cho mỡ máu',
  'T-cacitrat-tieuhoa-8333b1': 'dữ kiện về cách hấp thu canxi citrat, không phải lợi ích cho tiêu hoá',
};

// Cặp (chất|mục tiêu) có nguồn chính thức nói có lợi ở mức R1/R2.
const capChinhThuc = new Set();
for (const r of bang) {
  if (!OFFICIAL.has(r.nguon) || r.huong !== 'loi' || !r.muc_tieu) continue;
  const m = muc((chamKb.get(r.ma_y) || {}).muc_ncuu || r.muc_ncuu);
  if (m === 'R1' || m === 'R2') capChinhThuc.add(r.chat + '|' + r.muc_tieu);
}

const out = [];
for (const r of bang) {
  if (!r.ma_y.startsWith('T-')) continue;
  if (BO_TAY[r.ma_y]) { out.push([r.ma_y, 'bo', BO_TAY[r.ma_y]]); continue; }
  const c = chamTl.get(r.ma_y);
  if (!c || r.trang_thai === 'bo') continue;
  const m = muc(c.muc_ncuu);
  if (r.huong === 'loi' && (m === 'R1' || m === 'R2') && c.do_chac === 'cao' && capChinhThuc.has(r.chat + '|' + r.muc_tieu)) {
    out.push([r.ma_y, 'da_duyet', `tự duyệt: ${m}, độ chắc cao, cùng chiều nguồn chính thức`]);
  }
}
out.sort((a, b) => a[0].localeCompare(b[0]));
const cell = (v) => '"' + String(v).replace(/"/g, '""') + '"';
const csv = '﻿' + [['ma_y', 'trang_thai', 'ly_do'], ...out].map((row) => row.map(cell).join(',')).join('\n') + '\n';
fs.writeFileSync(path.join(ROOT, 'duyet.csv'), csv);
console.log('duyet.csv: ' + out.length + ' dòng (da_duyet ' + out.filter((x) => x[1] === 'da_duyet').length + ', bo ' + out.filter((x) => x[1] === 'bo').length + ')');
for (const x of out) console.log('  ' + x[0] + ' -> ' + x[1]);
