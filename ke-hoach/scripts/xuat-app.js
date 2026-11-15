// Xuất dữ liệu cho app: đọc các CSV trong ke-hoach/du-lieu, áp cham-muc.csv, tính tầng, ghi docs/data/khung.json.
// Chạy: node ke-hoach/scripts/xuat-app.js   (chạy lại nhiều lần cho cùng kết quả; sắp xếp cố định)
// Không gọi mạng. Ngày xuất lấy theo ngày chạy (đặt NGAY_XUAT=YYYY-MM-DD để cố định).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, apChamMuc, tinhTang } from './tinh-tang.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const DIR = path.join(ROOT, 'ke-hoach', 'du-lieu');
const OUT = path.join(ROOT, 'docs', 'data', 'khung.json');

const readCsv = (name) => {
  const f = path.join(DIR, name);
  if (!fs.existsSync(f)) throw new Error('Thiếu file ' + f);
  return parseCsv(fs.readFileSync(f, 'utf8'));
};
const tach = (s) => String(s || '').split(';').map((x) => x.trim()).filter(Boolean);
const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

// Phiên bản app lúc xuất, lấy từ docs/sw.js
function phienBanApp() {
  try {
    const t = fs.readFileSync(path.join(ROOT, 'docs', 'sw.js'), 'utf8');
    const m = t.match(/const VER='([^']+)'/);
    if (m) return m[1];
  } catch (e) { /* bỏ qua */ }
  return '';
}

export function xuat() {
  const mucTieu = readCsv('muc-tieu.csv');
  const nguon = readCsv('nguon.csv');
  const chat = readCsv('chat.csv');
  const dong = apChamMuc(readCsv('bang-y.csv'), readCsv('cham-muc.csv'));

  const hopLe = dong.filter((r) => r.trang_thai !== 'bo' && r.muc_tieu);
  const tangPhan = (rows) => tinhTang(rows, nguon).map((r) => ({
    chat: r.chat,
    muc_tieu: r.muc_tieu,
    tang: r.tang,
    canh_bao: r.canh_bao,
    so_nguon_doc_lap: r.so_nguon_doc_lap,
    muc_tot_nhat: r.muc_tot_nhat,
    ma_y_lien_quan: String(r.ma_y_lien_quan || '').split(';').filter(Boolean).sort(),
    giai_thich: r.giai_thich,
  })).sort((a, b) => cmp(a.chat, b.chat) || cmp(a.muc_tieu, b.muc_tieu));

  return {
    phien_ban: phienBanApp(),
    ngay_xuat: process.env.NGAY_XUAT || new Date().toISOString().slice(0, 10),
    muc_tieu: mucTieu.map((m) => ({ ma: m.ma, ten: m.ten, can_kham_truoc: tach(m.can_kham_truoc), ghi_chu_an_toan: tach(m.ghi_chu_an_toan) })),
    nguon: Object.fromEntries(nguon.slice().sort((a, b) => cmp(a.ma_nguon, b.ma_nguon)).map((n) => [n.ma_nguon, { ten: n.ten, loai: n.loai }])),
    chat: Object.fromEntries(chat.slice().sort((a, b) => cmp(a.ma_chat, b.ma_chat)).map((c) => [c.ma_chat, c.ten_viet])),
    y: hopLe.map((r) => ({
      ma_y: r.ma_y, chat: r.chat, muc_tieu: r.muc_tieu, huong: r.huong, noi_dung: r.noi_dung, lieu: r.lieu,
      nguon: r.nguon, muc_ncuu: r.muc_ncuu, trich_dan: r.trich_dan, link_goc: r.link_goc, trang_thai: r.trang_thai,
    })).sort((a, b) => cmp(a.ma_y, b.ma_y)),
    tang: {
      da_duyet: tangPhan(hopLe.filter((r) => r.trang_thai === 'da_duyet')),
      xem_truoc: tangPhan(hopLe),
    },
  };
}

// Mỗi phần tử mảng một dòng để file dễ so sánh khi commit.
function ghi(o) {
  const parts = Object.entries(o).map(([k, v]) => {
    if (Array.isArray(v)) return `  ${JSON.stringify(k)}: [\n` + v.map((x) => '    ' + JSON.stringify(x)).join(',\n') + '\n  ]';
    if (v && typeof v === 'object' && !Array.isArray(v) && k === 'tang') {
      return `  ${JSON.stringify(k)}: {\n` + Object.entries(v).map(([k2, v2]) => `    ${JSON.stringify(k2)}: [\n` + v2.map((x) => '      ' + JSON.stringify(x)).join(',\n') + '\n    ]').join(',\n') + '\n  }';
    }
    return `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`;
  });
  return '{\n' + parts.join(',\n') + '\n}\n';
}

function main() {
  const o = xuat();
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const s = ghi(o);
  fs.writeFileSync(OUT, s);
  console.log(`Đã ghi docs/data/khung.json (${(Buffer.byteLength(s) / 1024).toFixed(1)} KB): ${o.muc_tieu.length} mục tiêu, ${o.y.length} dòng Ý, tầng da_duyet=${o.tang.da_duyet.length}, xem_truoc=${o.tang.xem_truoc.length}.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
