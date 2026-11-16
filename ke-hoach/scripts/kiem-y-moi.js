// Kiểm tra một file Ý mới (y-moi-<ngày>.csv) trước khi duyệt và ghép vào Bảng Ý.
// Chạy: node ke-hoach/scripts/kiem-y-moi.js <đường-dẫn-file-csv>
// Chỉ đọc. Không sửa file nào. Mã thoát 1 nếu có LỖI, 0 nếu không (cảnh báo không làm hỏng).
// Repo đặt "type": "module" nên dùng ESM.
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DU_LIEU = path.resolve(__dirname, '..', 'du-lieu');

export const CAC_COT = ['ma_y', 'chat', 'muc_tieu', 'huong', 'noi_dung', 'lieu', 'nguon', 'muc_ncuu', 'trich_dan', 'link_goc', 'trang_thai', 'ghi_chu'];
export const HUONG = ['loi', 'khong', 'hai'];
export const TRANG_THAI = ['cho_duyet', 'da_duyet', 'bo'];
export const TRICH_DAN_TOI_DA = 300;
export const DAU_HIEU_CHAT_MOI = 'chất chưa có trong kho';

// Từ cấm trong noi_dung (không hứa hẹn quá mức).
const TU_CAM = [
  { ten: 'chữa', re: /(?<![\p{L}])chữa(?![\p{L}])/iu },
  { ten: 'tốt nhất', re: /(?<![\p{L}])tốt\s+nhất(?![\p{L}])/iu },
  { ten: '100%', re: /100\s*%/u },
];

const NFC = (s) => String(s == null ? '' : s).normalize('NFC');

// Công thức băm đang dùng trong y-tai-lieu.csv: sha1(chat|trich_dan|muc_tieu), lấy 6 ký tự đầu.
export function tinhMaY(chat, mucTieu, trichDan) {
  const h = crypto.createHash('sha1').update(NFC(chat) + '|' + NFC(trichDan) + '|' + NFC(mucTieu)).digest('hex').slice(0, 6);
  return 'T-' + chat + '-' + mucTieu + '-' + h;
}

// Đọc CSV. Trả về { coBom, bang: [{ dong, o: [..] }], loiCuPhap: [..] }. Dòng bắt đầu từ 1.
export function docCsv(text) {
  const coBom = text.charCodeAt(0) === 0xFEFF;
  const t = coBom ? text.slice(1) : text;
  const bang = []; const loiCuPhap = [];
  let row = []; let cell = ''; let q = false; let dong = 1; let dongBatDau = 1; let coNoiDung = false;
  const dongRow = () => {
    row.push(cell); cell = '';
    if (row.some((x) => x !== '') || coNoiDung) bang.push({ dong: dongBatDau, o: row });
    row = []; coNoiDung = false;
  };
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) {
      if (c === '"') { if (t[i + 1] === '"') { cell += '"'; i++; } else q = false; }
      else { cell += c; if (c === '\n') dong++; }
    } else if (c === '"') { q = true; coNoiDung = true; }
    else if (c === ',') { row.push(cell); cell = ''; coNoiDung = true; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && t[i + 1] === '\n') i++;
      dongRow(); dong++; dongBatDau = dong;
    } else { cell += c; coNoiDung = true; }
  }
  if (q) loiCuPhap.push('Có dấu ngoặc kép mở mà không đóng, file bị cắt hoặc hỏng.');
  if (cell !== '' || row.length) dongRow();
  return { coBom, bang, loiCuPhap };
}

export function docDanhSachMa(file, cot) {
  if (!fs.existsSync(file)) return new Set();
  const { bang } = docCsv(fs.readFileSync(file, 'utf8'));
  const [h, ...data] = bang;
  if (!h) return new Set();
  const i = h.o.indexOf(cot);
  return new Set(data.map((r) => NFC(r.o[i] || '')).filter(Boolean));
}

// Nạp kho: mã chất, mục tiêu, nguồn, và mã Ý đã có.
export function napKho(dir = DU_LIEU, boQua = []) {
  const bo = new Set(boQua.map((f) => path.resolve(f)));
  const maCo = new Map(); // ma_y -> tên file
  for (const f of ['bang-y.csv', 'y-tai-lieu.csv']) {
    const full = path.join(dir, f);
    if (bo.has(path.resolve(full))) continue;
    for (const m of docDanhSachMa(full, 'ma_y')) maCo.set(m, f);
  }
  return {
    chat: docDanhSachMa(path.join(dir, 'chat.csv'), 'ma_chat'),
    mucTieu: docDanhSachMa(path.join(dir, 'muc-tieu.csv'), 'ma'),
    nguon: docDanhSachMa(path.join(dir, 'nguon.csv'), 'ma_nguon'),
    maCo,
  };
}

const RE_DIEN_THOAI = /(?<![\d])(?:\+?\d{2,3}[\s.-]?)?(?:\d[\s.-]?){8,10}\d(?![\d])/u;
const RE_EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/u;
const RE_NGAY_SINH = /(?:sinh\s+(?:ngày|năm|nhật)|ngày\s+sinh|năm\s+sinh|\bsn\b)|(?<!\d)(?:0?[1-9]|[12]\d|3[01])[/.-](?:0?[1-9]|1[0-2])[/.-](?:19|20)\d{2}(?!\d)/iu;
const RE_TEN_NGUOI_THAN = /(?<![\p{L}])(?:[Mm]ẹ|[Bb]ố|[Aa]nh|[Cc]hị)\s+\p{Lu}\p{Ll}+/u;

export function dauHieuCaNhan(chuoi) {
  const kq = [];
  if (RE_EMAIL.test(chuoi)) kq.push('địa chỉ email');
  if (RE_DIEN_THOAI.test(chuoi.replace(/\d+\s*(?:–|-)\s*\d+/g, ''))) kq.push('chuỗi số giống số điện thoại');
  if (RE_NGAY_SINH.test(chuoi)) kq.push('giống ngày sinh');
  if (RE_TEN_NGUOI_THAN.test(chuoi)) kq.push('tên riêng kèm mẹ/bố/anh/chị');
  return kq;
}

// ctx = { chat:Set, mucTieu:Set, nguon:Set, maCo:Map }
// Trả về { loi:[..], canhBao:[..], soDong }
export function kiemTra(text, ctx) {
  const loi = []; const canhBao = [];
  const { coBom, bang, loiCuPhap } = docCsv(text);
  for (const m of loiCuPhap) loi.push(m);
  if (!coBom) loi.push('File thiếu BOM (dấu nhận diện UTF-8 ở đầu file). Nhờ Claude "lưu lại CSV UTF-8 có BOM", nếu không chữ tiếng Việt có thể vỡ khi mở bằng Excel hoặc Google Sheet.');
  if (bang.length === 0) { loi.push('File rỗng, không có dòng tiêu đề.'); return { loi, canhBao, soDong: 0 }; }

  const [tieuDe, ...dong] = bang;
  const tieuDeO = tieuDe.o.map((x) => NFC(x).trim());
  const dungCot = tieuDeO.length === CAC_COT.length && CAC_COT.every((c, i) => tieuDeO[i] === c);
  if (!dungCot) {
    loi.push('Dòng tiêu đề sai. Cần đúng 12 cột theo thứ tự: ' + CAC_COT.join(', ') + '. Đang có: ' + tieuDeO.join(', ') + '.');
    return { loi, canhBao, soDong: dong.length };
  }
  if (dong.length === 0) canhBao.push('File chỉ có dòng tiêu đề, chưa có Ý nào.');

  const daThay = new Map();
  for (const r of dong) {
    const nhan = 'Dòng ' + r.dong;
    if (r.o.length !== CAC_COT.length) {
      loi.push(nhan + ': có ' + r.o.length + ' cột, cần ' + CAC_COT.length + '. Thường do dấu phẩy hoặc ngoặc kép trong câu chưa được bọc đúng.');
      continue;
    }
    const v = Object.fromEntries(CAC_COT.map((c, i) => [c, NFC(r.o[i])]));
    const L = (m) => loi.push(nhan + ' (' + (v.ma_y || 'chưa có mã') + '): ' + m);
    const W = (m) => canhBao.push(nhan + ' (' + (v.ma_y || 'chưa có mã') + '): ' + m);
    const chatMoi = v.ghi_chu.toLowerCase().includes(DAU_HIEU_CHAT_MOI);

    // chất, mục tiêu, nguồn
    if (!v.chat) L('thiếu mã chất.');
    else if (!ctx.chat.has(v.chat)) {
      if (chatMoi) {
        if (!/^[a-z0-9]+$/.test(v.chat)) L('mã chất mới "' + v.chat + '" phải viết thường, không dấu, không cách (ví dụ "silic").');
      } else L('mã chất "' + v.chat + '" không có trong kho (chat.csv). Nếu là chất mới, ghi ở cột ghi_chu: "' + DAU_HIEU_CHAT_MOI + '".');
    }
    if (!v.muc_tieu) L('thiếu mã mục tiêu.');
    else if (!ctx.mucTieu.has(v.muc_tieu) && !chatMoi) L('mã mục tiêu "' + v.muc_tieu + '" không có trong kho (muc-tieu.csv).');
    else if (!ctx.mucTieu.has(v.muc_tieu) && chatMoi) W('mục tiêu "' + v.muc_tieu + '" không có trong kho; ghi_chu chỉ miễn cho chất mới, hãy kiểm tra lại mã mục tiêu.');
    if (!v.nguon) L('thiếu mã nguồn.');
    else if (!ctx.nguon.has(v.nguon)) L('mã nguồn "' + v.nguon + '" không có trong kho (nguon.csv). Thêm nguồn trước hoặc dùng KHAC.');

    // hướng
    if (!HUONG.includes(v.huong)) L('huong "' + v.huong + '" không hợp lệ, chỉ được: ' + HUONG.join(', ') + '.');

    // nội dung
    if (!v.noi_dung.trim()) L('noi_dung đang trống.');
    for (const t of TU_CAM) if (t.re.test(v.noi_dung)) L('noi_dung có từ cấm "' + t.ten + '". Viết lại theo kiểu "theo tác giả, ... được dùng cho ..." và không hứa hẹn kết quả.');

    // trích dẫn
    const dai = [...v.trich_dan].length;
    if (!v.trich_dan.trim()) L('trich_dan đang trống. Mỗi Ý bắt buộc có câu trích nguyên văn.');
    else if (dai > TRICH_DAN_TOI_DA) L('trich_dan dài ' + dai + ' ký tự, tối đa ' + TRICH_DAN_TOI_DA + '. Rút lại, vẫn giữ nguyên văn.');

    // mức nghiên cứu để trống
    if (v.muc_ncuu !== '') L('muc_ncuu phải để trống (bước chấm mức làm sau, bằng Opus). Đang là "' + v.muc_ncuu + '".');

    // trạng thái
    if (!TRANG_THAI.includes(v.trang_thai)) L('trang_thai "' + v.trang_thai + '" không hợp lệ, chỉ được: ' + TRANG_THAI.join(', ') + '.');
    else if (v.trang_thai === 'da_duyet') W('trang_thai đã là da_duyet. Ý mới nên để cho_duyet cho tới khi bạn duyệt.');

    if (!v.link_goc.trim()) W('link_goc trống. Nên ghi tên bài trong Obsidian để đọc lại bài gốc.');

    // mã Ý
    if (!v.ma_y) L('thiếu ma_y.');
    else {
      if (!v.ma_y.startsWith('T-')) L('ma_y phải bắt đầu bằng "T-".');
      if (v.chat && v.muc_tieu) {
        const dung = tinhMaY(v.chat, v.muc_tieu, v.trich_dan);
        if (v.ma_y !== dung) L('ma_y không đúng công thức băm. Mã đúng phải là ' + dung + ' (băm từ chat, trich_dan, muc_tieu). Có thể trich_dan hoặc mã chất đã bị sửa sau khi tạo mã.');
      }
      if (daThay.has(v.ma_y)) L('ma_y trùng với dòng ' + daThay.get(v.ma_y) + ' trong cùng file.');
      else daThay.set(v.ma_y, r.dong);
      if (ctx.maCo.has(v.ma_y)) L('ma_y đã có trong ' + ctx.maCo.get(v.ma_y) + ' (Ý này nạp rồi, bỏ dòng này).');
    }

    // dấu hiệu thông tin cá nhân (chỉ cảnh báo)
    for (const cot of ['noi_dung', 'trich_dan', 'ghi_chu', 'lieu']) {
      const kq = dauHieuCaNhan(v[cot]);
      if (kq.length) W('cột ' + cot + ' có dấu hiệu thông tin cá nhân (' + kq.join(', ') + '). Đọc lại và bỏ nếu là người thật trong gia đình.');
    }
  }
  return { loi, canhBao, soDong: dong.length };
}

export function inBaoCao(tenFile, kq, log = console.log) {
  log('Kiểm tra file: ' + tenFile);
  log('Số Ý trong file: ' + kq.soDong);
  log('');
  if (kq.loi.length) {
    log('LỖI (' + kq.loi.length + ') - phải sửa trước khi duyệt:');
    for (const m of kq.loi) log('  [LỖI] ' + m);
    log('');
  }
  if (kq.canhBao.length) {
    log('CẢNH BÁO (' + kq.canhBao.length + ') - nên đọc lại:');
    for (const m of kq.canhBao) log('  [CẢNH BÁO] ' + m);
    log('');
  }
  if (!kq.loi.length) log('KẾT QUẢ: ĐẠT. ' + (kq.canhBao.length ? 'Còn ' + kq.canhBao.length + ' cảnh báo cần đọc.' : 'Không có cảnh báo.') + ' Có thể sang bước duyệt từng dòng.');
  else log('KẾT QUẢ: KHÔNG ĐẠT. Dán báo cáo này cho Claude và nhờ sửa file, rồi chạy kiểm tra lại.');
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Cách dùng: node ke-hoach/scripts/kiem-y-moi.js <file y-moi-....csv>');
    process.exit(2);
  }
  if (!fs.existsSync(file)) {
    console.error('Không tìm thấy file: ' + file);
    process.exit(2);
  }
  const ctx = napKho(DU_LIEU, [file]);
  const kq = kiemTra(fs.readFileSync(file, 'utf8'), ctx);
  inBaoCao(file, kq);
  process.exit(kq.loi.length ? 1 : 0);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
