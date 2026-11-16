// Xuất dữ liệu cho app: đọc các CSV trong ke-hoach/du-lieu, áp cham-muc.csv và cham-muc-tai-lieu.csv, tính tầng, ghi docs/data/khung.json.
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

// Nhóm thuốc: mã -> tên + regex nhận diện tên thuốc (không phân biệt hoa thường). Theo GIAI-DOAN-7.md mục 4.
export const NHOM_THUOC = {
  khang_giap: { ten: 'Thuốc kháng giáp', re: 'thyrozol|thiamazol|methimazol|tapazol|metizol|propylthiouracil|carbimazol' },
  giap_t4: { ten: 'Hormone giáp (levothyroxine)', re: 'levothyrox|euthyrox|letrox|thyrax|synthroid' },
  chen_beta: { ten: 'Thuốc chẹn beta', re: 'bisoprolol|concor|metoprolol|betaloc|nebivolol|atenolol|carvedilol|propranolol|nadolol' },
  statin: { ten: 'Thuốc nhóm statin', re: 'statin|simva|atorva|rosuva|prava|fluva|pitava|lovastatin|sortis|torvacard|crestor|zocor' },
  ppi: { ten: 'Thuốc giảm acid dạ dày (PPI)', re: 'omeprazol|pantoprazol|esomeprazol|lansoprazol|rabeprazol|nolpaza|controloc|helicid|losec' },
  chong_dong: { ten: 'Thuốc chống đông', re: 'warfarin|lawarin|coumadin|acenocoumarol|sintrom|apixaban|eliquis|rivaroxaban|xarelto|dabigatran|pradaxa|edoxaban' },
  khang_tieu_cau: { ten: 'Thuốc chống kết tập tiểu cầu', re: 'clopidogrel|plavix|ticagrelor|brilique|prasugrel|aspirin|anopyrin|godasal|acylpyrin' },
  tieu_duong: { ten: 'Thuốc tiểu đường', re: 'metformin|glucophage|siofor|insulin|gliclazid|diaprel|glimepirid|amaryl|glibenclamid|sitagliptin|januvia|empagliflozin|jardiance|dapagliflozin|forxiga|pioglitazon' },
  ace_arb: { ten: 'Thuốc ức chế men chuyển / chẹn thụ thể angiotensin', re: 'pril\\b|sartan|prestarium|tritace|zestril' },
  thiazide: { ten: 'Thuốc lợi tiểu thiazide', re: 'hydrochlorothiazid|indapamid|chlortalidon|tensiomin' },
  bisphos: { ten: 'Thuốc bisphosphonat (loãng xương)', re: 'alendron|risedron|ibandron|fosamax|bonviva|actonel' },
  levodopa: { ten: 'Levodopa', re: 'levodopa|madopar|sinemet|nakom|stalevo' },
  doi_khang_dopa: { ten: 'Thuốc đối kháng dopamine', re: 'metoclopramid|haloperidol|risperidon|olanzapin|quetiapin' },
  ssri: { ten: 'Thuốc chống trầm cảm SSRI / serotonin', re: 'fluoxetin|sertralin|paroxetin|citalopram|escitalopram|fluvoxamin|venlafaxin|duloxetin|prozac|zoloft|cipralex|citalec|seroxat' },
  an_than: { ten: 'Thuốc an thần, gây ngủ', re: 'diazepam|lorazepam|alprazolam|clonazepam|zolpidem|phenobarbital|midazolam|zopiclon|hydroxyzin' },
  quinolon: { ten: 'Kháng sinh quinolon', re: 'cipro|levoflox|moxiflox|oflox|norflox' },
  tetra: { ten: 'Kháng sinh tetracyclin', re: 'doxycyc|tetracyc|minocyc' },
  ucmd: { ten: 'Thuốc ức chế miễn dịch', re: 'cyclosporin|ciclosporin|sandimmun|neoral|tacrolimus|mycophenol|azathioprin|methotrexat|prednison|prednisolon|dexamethason' },
  chong_dong_kinh: { ten: 'Thuốc chống động kinh', re: 'phenytoin|epanutin|carbamazepin|tegretol|valpro|depakin|levetiracetam|lamotrigin|topiramat' },
  hiv_pi: { ten: 'Thuốc ức chế protease HIV', re: 'saquinavir|ritonavir|lopinavir|indinavir|darunavir|atazanavir|nelfinavir' },
};

export function xuat() {
  const mucTieu = readCsv('muc-tieu.csv');
  const nguon = readCsv('nguon.csv');
  const chat = readCsv('chat.csv');
  const tt = [...(readCsv('tuong-tac.csv') || []), ...(readCsv('tuong-tac-bo-sung.csv') || [])]; // giữ nguyên mọi cột có trong CSV (kể cả cột phụ như da_kiem_chung)
  const dong = apChamMuc(readCsv('bang-y.csv'), readCsv('cham-muc.csv'), readCsv('cham-muc-tai-lieu.csv'),
    readCsv('cham-muc-lai.csv'), readCsv('cham-muc-lai-2a.csv'), readCsv('cham-muc-lai-2b.csv'));

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
    nhom_thuoc: NHOM_THUOC,
    tuong_tac: tt.filter((r) => r.ma && r.nhom_thuoc && r.chat).map((r) => Object.fromEntries(Object.entries(r).filter(([k]) => k))).sort((a, b) => cmp(a.ma, b.ma)),
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
    if (v && typeof v === 'object' && k === 'nhom_thuoc') {
      return `  ${JSON.stringify(k)}: {\n` + Object.entries(v).map(([k2, v2]) => `    ${JSON.stringify(k2)}: ${JSON.stringify(v2)}`).join(',\n') + '\n  }';
    }
    return `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`;
  });
  return '{\n' + parts.join(',\n') + '\n}\n';
}

function main() {
  const o = xuat();
  for (const r of o.tuong_tac) if (!o.nhom_thuoc[r.nhom_thuoc]) console.warn('Cảnh báo: ' + r.ma + ' dùng nhóm thuốc chưa định nghĩa: ' + r.nhom_thuoc);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const s = ghi(o);
  fs.writeFileSync(OUT, s);
  console.log(`Đã ghi docs/data/khung.json (${(Buffer.byteLength(s) / 1024).toFixed(1)} KB): ${o.muc_tieu.length} mục tiêu, ${o.y.length} dòng Ý, ${o.tuong_tac.length} tương tác, tầng da_duyet=${o.tang.da_duyet.length}, xem_truoc=${o.tang.xem_truoc.length}.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
