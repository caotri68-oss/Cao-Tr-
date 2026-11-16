// Tính tầng tin cậy A–X cho từng cặp (chất, mục tiêu) của Bảng Ý, theo 7 bước trong ke-hoach/BANG-Y.md.
// Chạy: node ke-hoach/scripts/tinh-tang.js
// Đọc bang-y.csv, nguon.csv và (nếu có) cham-muc.csv, cham-muc-tai-lieu.csv; ghi ke-hoach/du-lieu/tang.csv. Không gọi mạng.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, '..', 'du-lieu');
const MINUS = '−';

// ---------- CSV ----------
export function parseCsv(text) {
  const t = text.replace(/^﻿/, '');
  const rows = [];
  let row = [], f = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) {
      if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; }
      else f += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; }
    else if (c !== '\r') f += c;
  }
  if (f !== '' || row.length) { row.push(f); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.length > 1 || r[0] !== '');
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}
function readCsv(name) {
  const f = path.join(DIR, name);
  return fs.existsSync(f) ? parseCsv(fs.readFileSync(f, 'utf8')) : null;
}
const q = (s) => '"' + String(s ?? '').replace(/"/g, '""') + '"';

// ---------- Tính tầng ----------
const RANK = { R1: 3, R2: 2, R3: 1, R0: 0 };
const normMuc = (m) => {
  const s = String(m || '').trim();
  if (s === '') return 'R0';
  if (s === '-' || s === MINUS || s === 'R-' || s === 'R' + MINUS) return 'R' + MINUS; // dữ liệu thật ghi "−"
  return s; // chưa chấm = R0
};

// Quyết định (xem báo cáo): R1/R2 do tác giả/cá nhân tự ghi không được tính là R1/R2
// (hạ xuống R3), nên tác giả/cá nhân không bao giờ đẩy được quá C.
function mucHieuLuc(r, loai) {
  const m = normMuc(r.muc_ncuu);
  if ((m === 'R1' || m === 'R2') && (loai === 'tac_gia' || loai === 'ca_nhan')) return 'R3';
  return m;
}

// rows: các dòng đã lọc của MỘT cặp. nguonMap: ma_nguon -> {loai, dua_vao}.
// Trả null nếu không có dòng (∅: không xuất dòng).
export function tinhTangChoCap(rows, nguonMap) {
  if (!rows.length) return null;
  const info = (r) => nguonMap[r.nguon] || { loai: 'tac_gia', dua_vao: '' };
  const khoa = (r) => info(r).dua_vao || r.nguon || '?'; // khoá độc lập
  const maY = rows.map((r) => r.ma_y).filter(Boolean).join(';');

  // Dòng "bị bác": nguồn không chính thức nói có lợi hoặc có hại, nhưng bước chấm mức nghiên cứu
  // ghi R− (nghiên cứu thế giới không ủng hộ khẳng định đó). Không tính là ủng hộ, không bật cảnh báo đỏ.
  const biBac = (r) => (r.huong === 'loi' || r.huong === 'hai') && normMuc(r.muc_ncuu) === 'R' + MINUS && info(r).loai !== 'chinh_thuc';
  const loiBac = rows.filter((r) => r.huong === 'loi' && biBac(r));
  const haiBac = rows.filter((r) => r.huong === 'hai' && biBac(r));
  const hai = rows.filter((r) => r.huong === 'hai' && !biBac(r));
  const loi = rows.filter((r) => r.huong === 'loi' && !biBac(r));
  // Cảnh báo đỏ chỉ khi khẳng định "có hại" có căn cứ: nguồn chính thức, hoặc mức nghiên cứu R1–R3.
  // Khẳng định có hại của tác giả mà không có nghiên cứu (R0/rỗng) không bật đỏ, chỉ ghi trong giải thích.
  const coCanCu = (r) => info(r).loai === 'chinh_thuc' || ['R1', 'R2', 'R3'].includes(normMuc(r.muc_ncuu));
  const haiYeu = hai.filter((r) => !coCanCu(r));
  const canhBao = hai.some(coCanCu) ? 1 : 0;
  const doc = (rs) => new Set(rs.map(khoa)).size;

  const lv = loi.map((r) => mucHieuLuc(r, info(r).loai));
  const tot = lv.filter((m) => m in RANK).sort((a, b) => RANK[b] - RANK[a])[0] || '';
  const base = { canh_bao: canhBao, so_dong: rows.length, so_nguon_doc_lap: doc(loi), muc_tot_nhat: tot, ma_y_lien_quan: maY };
  const ghiBac = (loiBac.length ? ` Có ${loiBac.length} dòng nói có lợi bị nghiên cứu bác (R−).` : '') +
    (haiBac.length ? ` Có ${haiBac.length} dòng nói có hại bị nghiên cứu bác (R−), không hiện cảnh báo.` : '') +
    (haiYeu.length ? ` Có ${haiYeu.length} dòng tác giả nói có hại nhưng chưa có nghiên cứu, chỉ ghi để lưu ý.` : '');
  const ket = (tang, giai_thich) => ({ tang, ...base, giai_thich: giai_thich + (canhBao ? ' Có nguồn cảnh báo có hại, hiện cảnh báo đỏ.' : '') + ghiBac });

  // Bước 2: nguồn chính thức mức R− mâu thuẫn với nguồn khác nói có lợi
  const rTru = rows.filter((r) => normMuc(r.muc_ncuu) === 'R' + MINUS && info(r).loai === 'chinh_thuc');
  if (rTru.length) {
    const khoaTru = new Set(rTru.map(khoa));
    const doiLap = loi.filter((r) => !khoaTru.has(khoa(r)) && r.nguon !== rTru[0].nguon && !rTru.some((x) => x.nguon === r.nguon));
    if (doiLap.length) {
      return ket('X', `Nguồn chính thức (${[...new Set(rTru.map((r) => r.nguon))].join(', ')}) kết luận không có tác dụng, nhưng ${[...new Set(doiLap.map((r) => r.nguon))].join(', ')} nói có lợi: hai bên mâu thuẫn.`);
    }
  }
  // Nguồn nói có lợi nhưng mọi dòng có lợi đều bị nghiên cứu bác: mâu thuẫn giữa nguồn và nghiên cứu
  if (!loi.length && loiBac.length) {
    return ket('X', `${[...new Set(loiBac.map((r) => r.nguon))].join(', ')} nói có lợi, nhưng nghiên cứu thế giới không ủng hộ (chấm R−): hai bên mâu thuẫn.`);
  }
  // Nhóm không có dòng nào nói có lợi: chỉ có dòng "không tác dụng" và/hoặc "có hại"
  if (!loi.length) {
    const b = { ...base, muc_tot_nhat: rows.some((r) => normMuc(r.muc_ncuu) === 'R' + MINUS) ? 'R' + MINUS : '' };
    const gt = hai.length && !rows.some((r) => r.huong === 'khong')
      ? 'Chỉ có nguồn cảnh báo có hại, chưa có nguồn nói có lợi.'
      : 'Chưa có nguồn nào nói có lợi; các nguồn hiện có nói không có tác dụng' + (hai.length ? ' hoặc có hại.' : '.');
    return { tang: 'K', ...b, giai_thich: gt + (canhBao ? ' Hiện cảnh báo đỏ.' : '') + ghiBac };
  }
  // Bước 3
  if (lv.includes('R1')) return ket('A', 'Có bằng chứng nghiên cứu mạnh (mức R1) từ nguồn chính thức hoặc chuyên gia.');
  // Bước 4
  if (lv.includes('R2')) {
    const cg = loi.some((r) => info(r).loai === 'chuyen_gia');
    return ket('B', cg
      ? 'Có bằng chứng nghiên cứu mức R2 và có chuyên gia đồng ý.'
      : 'Có bằng chứng nghiên cứu mức R2, chưa có chuyên gia xác nhận.');
  }
  // Bước 5
  if (lv.includes('R3')) return ket('C', 'Có bằng chứng nghiên cứu mức R3 (yếu), tác giả hoặc ghi chú cá nhân không được nâng cao hơn.');
  if (doc(loi) >= 2) return ket('C', `Chưa có nghiên cứu được chấm nhưng có ${doc(loi)} nguồn độc lập cùng nói có lợi.`);
  // Bước 6
  return ket('D', 'Chỉ có một nguồn độc lập và chưa có nghiên cứu được chấm.');
}

// Gom dòng thành các cặp rồi tính tầng. Trả mảng dòng kết quả (chưa gồm che_do).
export function tinhTang(dongY, nguonList) {
  const nguonMap = Object.fromEntries(nguonList.map((n) => [n.ma_nguon, { loai: n.loai, dua_vao: n.dua_vao }]));
  const nhom = new Map();
  for (const r of dongY) {
    if (!r.muc_tieu || r.trang_thai === 'bo') continue;
    const k = r.chat + '\u0000' + r.muc_tieu;
    if (!nhom.has(k)) nhom.set(k, []);
    nhom.get(k).push(r);
  }
  const out = [];
  for (const [k, rows] of nhom) {
    const [chat, muc_tieu] = k.split('\u0000');
    const kq = tinhTangChoCap(rows, nguonMap);
    if (kq) out.push({ chat, muc_tieu, ...kq });
  }
  return out.sort((a, b) => a.chat.localeCompare(b.chat) || a.muc_tieu.localeCompare(b.muc_tieu));
}

// cham: một mảng dòng chấm, hoặc nhiều mảng (cham-muc.csv, cham-muc-tai-lieu.csv). Mảng null được bỏ qua.
export function apChamMuc(dongY, ...dsCham) {
  const cham = dsCham.filter(Boolean).flat();
  if (!cham.length) return dongY;
  const m = new Map(cham.map((c) => [c.ma_y, c]));
  return dongY.map((r) => {
    const c = m.get(r.ma_y);
    if (!c) return r;
    return { ...r, muc_ncuu: c.muc_ncuu !== '' ? c.muc_ncuu : r.muc_ncuu, huong: c.huong_de_xuat ? c.huong_de_xuat : r.huong };
  });
}

// ---------- Chạy ----------
function main() {
  const y = readCsv('bang-y.csv');
  const nguon = readCsv('nguon.csv');
  const cham = readCsv('cham-muc.csv');
  const chamTL = readCsv('cham-muc-tai-lieu.csv');
  const dong = apChamMuc(y, cham, chamTL);
  console.log(`Đọc ${y.length} dòng Ý; cham-muc.csv: ${cham ? cham.length + ' dòng được áp' : 'chưa có, bỏ qua'}; cham-muc-tai-lieu.csv: ${chamTL ? chamTL.length + ' dòng' : 'chưa có'}.`);

  const cheDo = [
    ['da_duyet', dong.filter((r) => r.trang_thai === 'da_duyet')],
    ['xem_truoc', dong.filter((r) => r.trang_thai !== 'bo')],
  ];
  const COLS = ['che_do', 'chat', 'muc_tieu', 'tang', 'canh_bao', 'so_dong', 'so_nguon_doc_lap', 'muc_tot_nhat', 'ma_y_lien_quan', 'giai_thich'];
  const lines = [COLS.map(q).join(',')];
  for (const [ten, rows] of cheDo) {
    const kq = tinhTang(rows, nguon);
    const dem = {};
    let cb = 0;
    for (const r of kq) {
      lines.push(COLS.map((c) => q(c === 'che_do' ? ten : r[c])).join(','));
      dem[r.tang] = (dem[r.tang] || 0) + 1;
      cb += r.canh_bao;
    }
    console.log(`[${ten}] ${kq.length} cặp: ` + ['A', 'B', 'C', 'D', 'X', 'K'].map((t) => `${t}=${dem[t] || 0}`).join(' ') + `; cảnh báo=${cb}`);
  }
  fs.writeFileSync(path.join(DIR, 'tang.csv'), '﻿' + lines.join('\n') + '\n');
  console.log('Đã ghi ke-hoach/du-lieu/tang.csv');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
