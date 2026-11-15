// Chuyển docs/kb.js + docs/tu-dien.js thành các file CSV của Bảng Ý.
// Chạy: node ke-hoach/scripts/chuyen-bang-y.js
// Chỉ đọc docs/, chỉ ghi vào ke-hoach/du-lieu/. Không gọi mạng.
// Repo đặt "type": "module" nên dùng ESM.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'ke-hoach', 'du-lieu');

function loadWindowGlobals(relFile) {
  const code = fs.readFileSync(path.join(ROOT, relFile), 'utf8');
  const fakeWindow = {};
  // eslint-disable-next-line no-new-func
  new Function('window', code)(fakeWindow);
  return fakeWindow;
}

const kbWin = loadWindowGlobals('docs/kb.js');
const tdWin = loadWindowGlobals('docs/tu-dien.js');
const KB = kbWin.KB;
const KB_CATS = kbWin.KB_CATS || [];
const KB_TOPICS = kbWin.KB_TOPICS;
const TU_DIEN = tdWin.TU_DIEN;

const NFC = (s) => String(s == null ? '' : s).normalize('NFC');
const MINUS = '−'; // R−, đúng ký tự trong BANG-Y.md

// ---------- 1. Mục tiêu: từ regex của KB_TOPICS + từ khoá rõ ràng ----------
// Từ khoá bổ sung theo BANG-Y/phiếu 02. "cảm" đứng một mình quá mơ hồ
// ("cảm xúc", "cảm thấy") nên chỉ lấy "cảm lạnh", "cảm cúm".
const EXTRA_KEYWORDS = {
  ngu: ['ngủ'],
  xuong: ['xương'],
  tim: ['\\btim\\b', 'huyết áp'],
  duong: ['đường huyết', 'tiểu đường'],
  mien: ['miễn dịch', 'cảm cúm', 'cảm lạnh'],
};

const TOPIC_MATCHERS = KB_TOPICS.map((t) => {
  const parts = [t.re].concat(EXTRA_KEYWORDS[t.id] || []);
  return { id: t.id, re: new RegExp('(' + parts.join('|') + ')') };
});

function assignTopics(sentence) {
  const s = NFC(sentence).toLowerCase();
  const hits = [];
  for (const m of TOPIC_MATCHERS) {
    if (m.re.test(s)) hits.push(m.id);
  }
  return hits;
}

// ---------- 2. Nguồn: chuẩn hoá mã ----------
const OFFICIAL = [
  ['NIH', /NIH/],
  ['EFSA', /EFSA/],
  ['COCHRANE', /Cochrane/i],
  ['NCCIH', /NCCIH/],
  ['ESPGHAN', /ESPGHAN/],
];

function normalizeSource(raw) {
  const s = NFC(raw).trim();
  if (/^chưa có nguồn đã đọc$/i.test(s)) {
    return { code: 'CHUA_CO', note: 'thiếu nguồn' };
  }
  let code = null;
  for (const [c, re] of OFFICIAL) {
    if (re.test(s)) { code = c; break; }
  }
  if (!code && /MAYO/i.test(s)) code = 'MAYO';
  if (!code && /ISSN/.test(s)) code = 'ISSN';
  if (!code && /Kho Obsidian/i.test(s)) code = 'OBSIDIAN';
  if (!code) code = 'KHAC';
  // Ghi lại chuỗi gốc khi nó không trùng nguyên mã (nguồn ghép, nguồn có chú thích).
  const canonical = { NIH: 'NIH', NCCIH: 'NCCIH', COCHRANE: 'Cochrane', EFSA: 'EFSA', ESPGHAN: 'ESPGHAN', MAYO: 'Mayo Clinic', ISSN: 'ISSN', OBSIDIAN: 'Kho Obsidian' };
  const note = (canonical[code] && s === canonical[code]) ? '' : 'nguồn gốc: ' + s;
  return { code, note };
}

// ---------- 3. Mức ----------
function mapLevel(level) {
  switch (level) {
    case 'chac':   return { huong: 'loi',   ncuu: 'R1' };
    case 'cothe':  return { huong: 'loi',   ncuu: 'R2' };
    case 'chuaro': return { huong: 'loi',   ncuu: '' };
    case 'khong':  return { huong: 'khong', ncuu: MINUS };
    default: throw new Error('mức lạ: ' + level);
  }
}

// ---------- 4. Bảng Ý ----------
const OFFICIAL_CODES = new Set(['NIH', 'EFSA', 'COCHRANE', 'NCCIH']);
const rows = [];
const seqByPrefix = new Map();
const chatKeys = Object.keys(KB);

for (const chat of chatKeys) {
  const benefits = KB[chat].benefits || [];
  benefits.forEach(([level, text, rawSource], idx) => {
    const { huong, ncuu } = mapLevel(level);
    const src = normalizeSource(rawSource);
    const topics = assignTopics(text);
    const notes = [];
    if (src.note) notes.push(src.note);
    // Dòng không có mục tiêu: một dòng với muc_tieu rỗng.
    const targets = topics.length ? topics : [''];
    if (!topics.length) notes.unshift('chưa gán');

    for (const muc of targets) {
      const prefix = 'Y-' + chat + '-' + (muc || 'x');
      const n = (seqByPrefix.get(prefix) || 0) + 1;
      seqByPrefix.set(prefix, n);
      const maY = prefix + '-' + String(n).padStart(3, '0');

      // "chưa gán" chỉ được thêm vào notes khi không có mục tiêu nào, nên giữ nguyên notes.
      const rowNotes = notes;
      let trang = 'cho_duyet';
      if (level === 'chac' && OFFICIAL_CODES.has(src.code) && muc) trang = 'da_duyet';

      rows.push({
        ma_y: maY,
        chat,
        muc_tieu: muc,
        huong,
        noi_dung: NFC(text),
        lieu: '',
        nguon: src.code,
        muc_ncuu: ncuu,
        trich_dan: '',
        link_goc: '',
        trang_thai: trang,
        ghi_chu: rowNotes.join('; '),
        _level: level,
        _src_raw: NFC(rawSource),
        _idx: idx,
      });
    }
  });
}

// ---------- 5. Nguon, chat, muc-tieu ----------
const usedSources = new Set(rows.map((r) => r.nguon));
const SOURCE_META = {
  NIH: ['NIH', 'NIH Office of Dietary Supplements', 'chinh_thuc', ''],
  NCCIH: ['NCCIH', 'National Center for Complementary and Integrative Health', 'chinh_thuc', ''],
  COCHRANE: ['COCHRANE', 'Cochrane', 'chinh_thuc', ''],
  EFSA: ['EFSA', 'European Food Safety Authority', 'chinh_thuc', ''],
  ESPGHAN: ['ESPGHAN', 'ESPGHAN', 'chinh_thuc', ''],
  MAYO: ['MAYO', 'Mayo Clinic', 'chuyen_gia', ''],
  ISSN: ['ISSN', 'ISSN (số tạp chí chưa rõ tên)', 'chuyen_gia', ''],
  OBSIDIAN: ['OBSIDIAN', 'Kho Obsidian của gia đình (ghi chú chung)', 'ca_nhan', ''],
  KHAC: ['KHAC', 'Nguồn khác (chi tiết trong ghi_chu của dòng)', 'tac_gia', ''],
  CHUA_CO: ['CHUA_CO', 'Chưa có nguồn đã đọc', 'tac_gia', ''],
};
const nguonRows = [];
for (const code of Object.keys(SOURCE_META)) {
  if (usedSources.has(code)) nguonRows.push(SOURCE_META[code]);
}
nguonRows.push(['BS-PHUC', 'Bác sĩ Trần Văn Phúc', 'chuyen_gia', '']);
nguonRows.push(['C-THAO', 'Chị Thảo Nguyên', 'tac_gia', '']);

const chatRows = chatKeys.map((k) => {
  const kb = KB[k];
  const td = TU_DIEN[k] || {};
  const alt = []
    .concat(kb.aka ? [kb.aka] : [])
    .concat(td.vi || [], td.en || [], td.cs || []);
  const seen = new Set();
  const ten_khac = alt.map(NFC).filter((x) => {
    const key = x.toLowerCase();
    if (!x || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).join('; ');
  const cat = KB_CATS.find((c) => c.keys.includes(k));
  return [k, NFC(kb.name), ten_khac, cat ? NFC(cat.n) : ''];
});

const topicRows = KB_TOPICS.map((t) => [t.id, NFC(t.n), '', '']);

// ---------- 6. CSV ----------
function csvCell(v) {
  const s = v == null ? '' : String(v);
  return '"' + s.replace(/"/g, '""') + '"';
}
function toCsv(header, data) {
  const lines = [header.map(csvCell).join(',')];
  for (const r of data) lines.push(r.map(csvCell).join(','));
  return '﻿' + lines.join('\r\n') + '\r\n';
}
function writeCsv(name, header, data) {
  fs.writeFileSync(path.join(OUT, name), toCsv(header, data), 'utf8');
}

fs.mkdirSync(OUT, { recursive: true });

const BANG_HEADER = ['ma_y', 'chat', 'muc_tieu', 'huong', 'noi_dung', 'lieu', 'nguon', 'muc_ncuu', 'trich_dan', 'link_goc', 'trang_thai', 'ghi_chu'];
writeCsv('bang-y.csv', BANG_HEADER, rows.map((r) => BANG_HEADER.map((h) => r[h])));
writeCsv('nguon.csv', ['ma_nguon', 'ten', 'loai', 'dua_vao'], nguonRows);
writeCsv('chat.csv', ['ma_chat', 'ten_viet', 'ten_khac', 'nhom'], chatRows);
writeCsv('muc-tieu.csv', ['ma', 'ten', 'can_kham_truoc', 'ghi_chu_an_toan'], topicRows);

// ---------- 7. Thống kê in ra ----------
const count = (fn) => rows.filter(fn).length;
console.log('bang-y.csv: ' + rows.length + ' dòng');
console.log('  mức chac: ' + count((r) => r._level === 'chac') + ', cothe: ' + count((r) => r._level === 'cothe') +
  ', chuaro: ' + count((r) => r._level === 'chuaro') + ', khong: ' + count((r) => r._level === 'khong'));
console.log('  lợi ích gốc trong kb.js: ' + chatKeys.reduce((a, k) => a + (KB[k].benefits || []).length, 0));
console.log('  dòng chưa gán mục tiêu: ' + count((r) => !r.muc_tieu));
console.log('  dòng da_duyet: ' + count((r) => r.trang_thai === 'da_duyet'));
console.log('  dòng thiếu chat: ' + count((r) => !r.chat) + ', thiếu nguon: ' + count((r) => !r.nguon));
const ids = new Set(rows.map((r) => r.ma_y));
console.log('  ma_y trùng: ' + (rows.length - ids.size));
console.log('nguon.csv: ' + nguonRows.length + ' dòng');
console.log('chat.csv: ' + chatRows.length + ' dòng, có nhom: ' + chatRows.filter((r) => r[3]).length);
console.log('muc-tieu.csv: ' + topicRows.length + ' dòng');
