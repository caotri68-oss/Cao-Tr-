// Chuyển docs/kb.js + docs/tu-dien.js thành các file CSV của Bảng Ý.
// Chạy: node ke-hoach/scripts/chuyen-bang-y.js
// Chỉ đọc docs/, chỉ ghi vào ke-hoach/du-lieu/. Không gọi mạng.
// Repo đặt "type": "module" nên dùng ESM.
import fs from 'node:fs';
import crypto from 'node:crypto';
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

// ---------- 1. Mục tiêu: regex của KB_TOPICS, đã thu hẹp ----------
// Bản đầu dùng nguyên regex của KB_TOPICS nên gán quá rộng. Bản này kiểm soát bằng 4 lớp:
//  (a) BO_TU: bỏ từ khoá quá rộng khỏi regex của từng mục tiêu.
//  (b) THEM_TU: thêm từ khoá còn thiếu (đã đọc từng dòng để chọn).
//  (c) LOAI_DOAN: bỏ cả đoạn câu (cắt ở dấu . hoặc ;) nói về động vật hoặc chỉ là lời khuyên
//      "hỏi bác sĩ", trước khi gán. Đoạn đó không phải kết luận trên người.
//  (d) CAT_CUM: cắt cụm từ làm gán nhầm cho từng mục tiêu (ví dụ "ống thần kinh" không phải nao).
// Dòng nào chỉ sửa được theo nội dung thì nằm ở bảng NGOAI_LE bên dưới.
const BO_TU = {
  co: ['vận động'],       // "cải thiện vận động" của thoái hoá khớp, "mức vận động" của cân nặng không phải cơ bắp
  giap: ['i-ốt', 'iod'],  // chất là i-ốt thì câu nào cũng nhắc i-ốt, không có nghĩa là về tuyến giáp
  // "lo âu" thuộc tamtrang (Tâm trạng và lo âu). Giữ ở ngu làm câu chỉ nói lo âu (ginkgo, ashwagandha)
  // bị gán thêm vào Giấc ngủ. Câu có "stress", "căng thẳng", "mất ngủ" vẫn vào ngu.
  ngu: ['lo âu'],
};
const THEM_TU = {
  ngu: ['ngủ'],
  xuong: ['xương'],
  tim: ['\\btim\\b', 'huyết áp', 'mạch vành', 'động mạch', 'đột quỵ'],
  duong: ['đường huyết', 'tiểu đường', 'đái tháo đường'],
  mien: ['miễn dịch', 'cảm cúm', 'cảm lạnh', '\\bcúm\\b'],
  nao: ['alzheimer', 'đau nửa đầu', 'đau đầu'],
  co: ['sau vận động', 'tổn thương cơ', 'thể thao', 'sức bền'],
  thieu: ['phòng thiếu'],
};
const LOAI_DOAN = [
  { re: /động vật|chuột/, ly_do: 'động vật' },
  { re: /hỏi bác sĩ/, ly_do: 'lời khuyên hỏi bác sĩ' },
];
const CAT_CUM = {
  _all: [/(?:thiếu )?hay gặp ở[^.;]*/g],        // nhóm nguy cơ của bệnh thiếu, không phải mục tiêu
  nao: [/ống thần kinh/g, /\(các dị tật[^)]*\)/g, /bệnh thần kinh[^:.;,)]*/g],
  da: [/ngoài da/g],
  tieuhoa: [/acid dạ dày/g, /qua đường tiêu ho[áa]/g], // hấp thu qua đường tiêu hoá là dược động học, không phải mục tiêu
};

const TOPIC_MATCHERS = KB_TOPICS.map((t) => {
  const bo = new Set(BO_TU[t.id] || []);
  const parts = t.re.split('|').filter((x) => !bo.has(x)).concat(THEM_TU[t.id] || []);
  return { id: t.id, re: new RegExp('(' + parts.join('|') + ')') };
});

// Trả về { hits, boQua: [lý do các đoạn bị bỏ] }
function assignTopics(sentence) {
  const segs = NFC(sentence).split(/(?<=[.;])\s+/);
  const boQua = [];
  const kept = segs.filter((seg) => {
    const low = seg.toLowerCase();
    const l = LOAI_DOAN.find((x) => x.re.test(low));
    if (l) { boQua.push(l.ly_do); return false; }
    return true;
  });
  const base = kept.join(' ').toLowerCase();
  const hits = [];
  for (const m of TOPIC_MATCHERS) {
    let s = base;
    for (const re of (CAT_CUM._all || []).concat(CAT_CUM[m.id] || [])) s = s.replace(re, ' ');
    if (m.re.test(s)) hits.push(m.id);
  }
  return { hits, boQua: Array.from(new Set(boQua)) };
}

// Dòng chỉ là ghi chú "không có dữ liệu / không đọc được nguồn": không phải một Ý.
// Bỏ hết mục tiêu, giữ dòng ở cho_duyet để quản lý quyết định chuyển sang `bo`.
const KHONG_PHAI_Y = [
  /không nêu (mức bằng chứng|kết quả)/, /không đọc được/, /chưa có nguồn đã đọc/,
  /trong nguồn tôi đọc không có/, /trang tôi đọc bị cắt/, /nên không kết luận/,
  /^mức độ chắc chắn của bằng chứng/, /mua hàng thương hiệu/,
];

// Bảng ngoại lệ theo nội dung: khoá = chat + '|' + 40 ký tự đầu của noi_dung.
// Chỉ dùng khi quy tắc chung không đủ. Mỗi mục có lý do.
const NGOAI_LE = {
  // Thiếu biotinidase là bệnh di truyền hiếm; "triệu chứng thần kinh và da" là hậu quả của bệnh,
  // không phải lợi ích của biotin cho não hay da ở người bình thường.
  'biotin|Cần cho những người có thiếu hụt biotini': {
    muc_tieu: ['thieu'],
    ghi_chu: 'nao/da bị loại: triệu chứng thần kinh/da là của bệnh biotinidase hiếm, không phải lợi ích chung',
  },
  // Câu thật ra là cảnh báo kẽm liều cao gây thiếu đồng, không phải lợi ích của đồng.
  'cu|Kẽm liều cao kéo dài (từ khoảng 40–50 mg': {
    cho_duyet: true,
    chat: 'zn',
    huong: 'hai',
    muc_tieu: ['mau'],
    ghi_chu: 'chuyển từ đồng sang kẽm: nội dung là cảnh báo kẽm liều cao gây thiếu đồng (thiếu máu, giảm bạch cầu)',
  },
};

// Chữ "chữa" trong noi_dung đổi thành "điều trị" (giữ nghĩa y khoa, tránh hứa hẹn chữa khỏi).
// Không sửa docs/kb.js; mã ma_y và khoá NGOAI_LE vẫn băm trên câu gốc nên không đổi.
const doiChua = (s) => NFC(s).replace(/(^|[^\p{L}])([Cc])hữa(?![\p{L}])/gu, (m, p, c) => p + (c === 'C' ? 'Điều trị' : 'điều trị'));
const cauDoiChua = [];

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
const usedExceptions = new Set();

for (const chat of chatKeys) {
  const benefits = KB[chat].benefits || [];
  benefits.forEach(([level, text, rawSource], idx) => {
    const { huong, ncuu } = mapLevel(level);
    const src = normalizeSource(rawSource);
    const key = chat + '|' + NFC(text).slice(0, 40);
    const exc = NGOAI_LE[key];
    if (exc) usedExceptions.add(key);
    const { hits, boQua } = assignTopics(text);
    const khongPhaiY = KHONG_PHAI_Y.some((re) => re.test(NFC(text).toLowerCase()));
    let topics = exc && exc.muc_tieu ? exc.muc_tieu : hits;
    const notes = [];
    if (src.note) notes.push(src.note);
    if (khongPhaiY) {
      topics = [];
      notes.push('không phải Ý: ghi chú thiếu dữ liệu hoặc không đọc được nguồn; đề nghị chuyển bo khi duyệt');
    }
    if (boQua.length) notes.push('đã bỏ qua khi gán mục tiêu: ' + boQua.join(', '));
    if (exc && exc.ghi_chu) notes.push(exc.ghi_chu);
    // Dòng không có mục tiêu: một dòng với muc_tieu rỗng.
    const targets = topics.length ? topics : [''];
    if (!topics.length) notes.unshift('chưa gán');

    if (doiChua(text) !== NFC(text)) cauDoiChua.push(NFC(text) + '  =>  ' + doiChua(text));
    const chatRow = (exc && exc.chat) || chat;
    const huongRow = (exc && exc.huong) || huong;
    for (const muc of targets) {
      // Mã ổn định: băm chất gốc + nội dung + mục tiêu, nên chạy lại script không đổi mã.
      const h = crypto.createHash('sha1').update(chat + '|' + NFC(text) + '|' + muc).digest('hex').slice(0, 6);
      const maY = 'Y-' + chatRow + '-' + (muc || 'x') + '-' + h;

      const rowNotes = notes;
      // da_duyet: mức chac + nguồn chính thức + có mục tiêu + kết luận trên người.
      // Dòng có đoạn động vật hoặc lời khuyên thì hạ về cho_duyet, lý do đã nằm trong ghi_chu.
      let trang = 'cho_duyet';
      if (level === 'chac' && OFFICIAL_CODES.has(src.code) && muc &&
          !boQua.length && !khongPhaiY && !(exc && exc.cho_duyet)) trang = 'da_duyet';

      rows.push({
        ma_y: maY,
        chat: chatRow,
        muc_tieu: muc,
        huong: huongRow,
        noi_dung: doiChua(text),
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

// ---------- 4b. Ý bổ sung (y-bo-sung.csv) ----------
// Dòng Ý không có trong kb.js (ví dụ ý an toàn của mục tiêu gout), viết tay trong y-bo-sung.csv,
// cùng cột với bang-y.csv. Nối vào cuối. ma_y để trống thì băm ổn định từ chat|noi_dung|muc_tieu|nguon.
function parseCsvSimple(text) {
  const t = text.replace(/^\uFEFF/, '');
  const out = []; let row = []; let cell = ''; let q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) {
      if (c === '"') { if (t[i + 1] === '"') { cell += '"'; i++; } else q = false; }
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && t[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((x) => x !== '')) out.push(row);
      row = [];
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); if (row.some((x) => x !== '')) out.push(row); }
  const [h, ...data] = out;
  return data.map((r) => Object.fromEntries(h.map((k, i) => [k, NFC(r[i] || '')])));
}
const readOut = (name) => {
  const f = path.join(OUT, name);
  return fs.existsSync(f) ? parseCsvSimple(fs.readFileSync(f, 'utf8')) : [];
};
const boSung = readOut('y-bo-sung.csv');
for (const r of boSung) {
  const h = crypto.createHash('sha1').update(r.chat + '|' + r.noi_dung + '|' + r.muc_tieu + '|' + r.nguon).digest('hex').slice(0, 6);
  rows.push({ ...r, ma_y: r.ma_y || ('Y-' + r.chat + '-' + (r.muc_tieu || 'x') + '-' + h), trang_thai: r.trang_thai || 'cho_duyet', _level: 'bo_sung' });
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
  FDA: ['FDA', 'U.S. Food and Drug Administration (nhãn thuốc)', 'chinh_thuc', ''],
  MSKCC: ['MSKCC', 'Memorial Sloan Kettering Cancer Center (About Herbs)', 'chuyen_gia', ''],
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

// Giữ can_kham_truoc, ghi_chu_an_toan đã điền tay trong muc-tieu.csv, và giữ các mục tiêu
// không có trong KB_TOPICS (than, dinhduong, mo, gout...). Trước đây script ghi đè thành rỗng.
const mtCu = readOut('muc-tieu.csv');
const mtCuMap = new Map(mtCu.map((m) => [m.ma, m]));
const topicRows = KB_TOPICS.map((t) => {
  const c = mtCuMap.get(t.id) || {};
  return [t.id, NFC(t.n), c.can_kham_truoc || '', c.ghi_chu_an_toan || ''];
});
for (const m of mtCu) {
  if (!KB_TOPICS.some((t) => t.id === m.ma)) topicRows.push([m.ma, m.ten, m.can_kham_truoc, m.ghi_chu_an_toan]);
}

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
console.log('  mỗi muc_tieu có dòng: ' + KB_TOPICS.map((t) => t.id + '=' + count((r) => r.muc_tieu === t.id)).join(' '));
console.log('  ngoại lệ dùng: ' + usedExceptions.size + '/' + Object.keys(NGOAI_LE).length);
console.log('  dòng không phải Ý: ' + count((r) => /không phải Ý/.test(r.ghi_chu)));
console.log('  dòng từ y-bo-sung.csv: ' + boSung.length);
console.log('câu đổi "chữa" -> "điều trị": ' + cauDoiChua.length);
for (const c of cauDoiChua) console.log('  ' + c);
console.log('nguon.csv: ' + nguonRows.length + ' dòng');
console.log('chat.csv: ' + chatRows.length + ' dòng, có nhom: ' + chatRows.filter((r) => r[3]).length);
console.log('muc-tieu.csv: ' + topicRows.length + ' dòng');
