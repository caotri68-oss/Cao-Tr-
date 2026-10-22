/**
 * Sổ thu chi nhà mình - web app nhập liệu.
 * Ghi vào tab "Form Responses 1" của sổ, các tab khác đọc lại như cũ.
 */

// ====== CẦN SỬA TRƯỚC KHI TRIỂN KHAI ======
const MAT_KHAU = 'DOI-MAT-KHAU-NAY';          // cả nhà dùng chung, nhớ đổi
const NGUOI_DUNG = ['Bố', 'Mẹ', 'Xu', 'Win']; // tên hiện trong ô "Ai ghi"
const NGUOI_CHO_MUON = ['Gia Linh', 'Cậu Dự']; // phải trùng tên trong tab Sổ nợ
const TY_GIA = { 'Kč': 1, 'USD': 21, 'EUR': 25 }; // quy ra Kč; sửa khi tỷ giá đổi
// ==========================================

const SO_ID = '1FfQSJuOFnjc_aYfKzS8aiq4OT95SNVG9u9ybLcYgfao';
const TAB_DATA = 'Form Responses 1';
const TAB_DM = 'Danh mục';
const TAB_NS = 'Ngân sách';
const TAB_TQ = 'Tổng quan';
const MA_CO_NOI_MUA = ['C05', 'C26'];
const NOI_MUA = ['Siêu thị Tam Đa', 'Lidl', 'Albert', 'Kaufland', 'Action', 'Siêu thị khác',
                 'Chợ Sapa', 'Alza', 'Datart', 'Nơi khác'];
// Cột thêm bên phải dữ liệu cũ (A..I): J Mã, K Nơi mua, L Đơn vị, M Số tiền gốc
const COT_THEM_TIEU_DE = ['Mã danh mục', 'Nơi mua', 'Đơn vị tiền', 'Số tiền gốc'];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Sổ thu chi nhà mình')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .addMetaTag('apple-mobile-web-app-capable', 'yes')
    .addMetaTag('mobile-web-app-capable', 'yes')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ---------- API gọi từ giao diện ----------

function batDau(matKhau) {
  kiemTraMatKhau_(matKhau);
  return {
    nguoi: NGUOI_DUNG,
    choMuon: NGUOI_CHO_MUON,
    tyGia: TY_GIA,
    noiMua: NOI_MUA,
    maCoNoiMua: MA_CO_NOI_MUA,
    danhMuc: docDanhMuc_(),
    homNay: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
    tomTat: docTomTat_(),
    ganDay: docGanDay_(12)
  };
}

function luu(matKhau, e) {
  kiemTraMatKhau_(matKhau);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const dong = kiemTraDauVao_(e);
    const sh = SpreadsheetApp.openById(SO_ID).getSheetByName(TAB_DATA);
    damBaoTieuDe_(sh);
    const hang = hangCuoi_(sh) + 1;
    if (hang > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), 20);
    sh.getRange(hang, 1, 1, 13).setValues([dong.values]);
    sh.getRange(hang, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    sh.getRange(hang, 3).setNumberFormat('#,##0');
    sh.getRange(hang, 6).setNumberFormat('dd/MM/yyyy');
    SpreadsheetApp.flush();
    return {
      ok: true,
      quy: e.loai === 'Chi' || e.loai === 'TraNo' ? docQuy_(dong.danhMuc) : null,
      tomTat: docTomTat_(),
      ganDay: docGanDay_(12)
    };
  } finally {
    lock.releaseLock();
  }
}

function xoa(matKhau, hang, dauThoiGian, soTien) {
  kiemTraMatKhau_(matKhau);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = SpreadsheetApp.openById(SO_ID).getSheetByName(TAB_DATA);
    if (hang < 2 || hang > hangCuoi_(sh)) throw new Error('Dòng không còn tồn tại, hãy tải lại.');
    const r = sh.getRange(hang, 1, 1, 3).getValues()[0];
    const t = r[0] instanceof Date ? r[0].getTime() : Number(r[0]);
    if (t !== dauThoiGian || Number(r[2]) !== soTien) {
      throw new Error('Dòng này đã thay đổi, hãy tải lại rồi thử lại.');
    }
    sh.deleteRow(hang);
    SpreadsheetApp.flush();
    return { ok: true, tomTat: docTomTat_(), ganDay: docGanDay_(12) };
  } finally {
    lock.releaseLock();
  }
}

// ---------- Kiểm tra ----------

function kiemTraMatKhau_(mk) {
  const cache = CacheService.getScriptCache();
  const sai = Number(cache.get('sai') || 0);
  if (sai >= 10) throw new Error('Nhập sai nhiều lần. Chờ 1 giờ rồi thử lại.');
  if (mk !== MAT_KHAU) {
    cache.put('sai', String(sai + 1), 3600);
    throw new Error('Sai mật khẩu.');
  }
}

function kiemTraDauVao_(e) {
  const dm = docDanhMuc_();
  const tz = Session.getScriptTimeZone();
  if (NGUOI_DUNG.indexOf(e.nguoi) < 0) throw new Error('Chọn người ghi sổ.');
  if (['Thu', 'Chi', 'TraNo', 'MuonNo'].indexOf(e.loai) < 0) throw new Error('Chọn Thu, Chi hoặc Nợ.');

  const donVi = e.donVi || 'Kč';
  if (!(donVi in TY_GIA)) throw new Error('Đơn vị tiền không hợp lệ.');
  const goc = Number(String(e.soTien).replace(',', '.'));
  if (!isFinite(goc) || goc <= 0) throw new Error('Số tiền phải lớn hơn 0.');
  const ty = donVi === 'Kč' ? 1 : Number(String(e.tyGia || TY_GIA[donVi]).replace(',', '.'));
  if (!isFinite(ty) || ty <= 0) throw new Error('Tỷ giá không hợp lệ.');
  const kc = Math.round(goc * ty);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.ngay || '')) throw new Error('Chọn ngày.');
  const homNay = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
  if (e.ngay > homNay) throw new Error('Không ghi ngày ở tương lai.');
  const p = e.ngay.split('-').map(Number);
  const ngay = new Date(p[0], p[1] - 1, p[2]);

  const noiDung = String(e.noiDung || '').trim().slice(0, 200);
  let thuChi, danhMuc, ma = '', noiMua = '', traNoCho = '';

  if (e.loai === 'Thu' || e.loai === 'Chi') {
    const ds = dm[e.loai === 'Thu' ? 'thu' : 'chi'];
    const m = ds.filter(function (x) { return x.ma === e.ma; })[0];
    if (!m) throw new Error('Chọn danh mục.');
    thuChi = e.loai;
    danhMuc = m.ten;
    ma = m.ma;
    if (m.ten === 'Khác' && !noiDung) throw new Error('Danh mục "Khác" cần ghi nội dung.');
    if (MA_CO_NOI_MUA.indexOf(m.ma) >= 0) {
      if (NOI_MUA.indexOf(e.noiMua) < 0) throw new Error('Chọn nơi mua.');
      noiMua = e.noiMua;
    }
  } else if (e.loai === 'TraNo') {
    if (NGUOI_CHO_MUON.indexOf(e.voiAi) < 0) throw new Error('Chọn trả nợ cho ai.');
    thuChi = 'Chi';
    danhMuc = 'Trả nợ';
    ma = 'C17';
    traNoCho = e.voiAi;
  } else { // MuonNo: chỉ ghi lại, tab Sổ nợ nối sau
    if (NGUOI_CHO_MUON.indexOf(e.voiAi) < 0) throw new Error('Chọn mượn của ai.');
    thuChi = 'Nợ';
    danhMuc = 'Mượn nợ';
    traNoCho = e.voiAi;
  }

  return {
    danhMuc: danhMuc,
    values: [new Date(), thuChi, kc, danhMuc, noiDung, ngay, e.nguoi, traNoCho, '',
             ma, noiMua, donVi, donVi === 'Kč' ? '' : goc]
  };
}

// ---------- Đọc sổ ----------

function hangCuoi_(sh) {
  const b = sh.getRange(1, 2, sh.getMaxRows(), 1).getValues();
  for (let i = b.length - 1; i >= 0; i--) if (String(b[i][0]).trim() !== '') return i + 1;
  return 1;
}

function damBaoTieuDe_(sh) {
  const c = sh.getRange(1, 10, 1, 4);
  const v = c.getValues()[0];
  if (v.join('') === '') c.setValues([COT_THEM_TIEU_DE]);
}

function docDanhMuc_() {
  const sh = SpreadsheetApp.openById(SO_ID).getSheetByName(TAB_DM);
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, 8).getValues();
  const kq = { thu: [], chi: [] };
  v.forEach(function (r) {
    const ma = String(r[0]).trim(), ten = String(r[1]).trim(), loai = String(r[2]).trim();
    if (!ma || !ten) return;
    if (ma === 'C17') return; // "Trả nợ" dùng mục Nợ
    const m = { ma: ma, ten: ten, nhom: String(r[7] || 'Khác').trim() };
    if (loai === 'Thu') kq.thu.push(m);
    else if (loai === 'Chi') kq.chi.push(m);
  });
  return kq;
}

function docTomTat_() {
  const sh = SpreadsheetApp.openById(SO_ID).getSheetByName(TAB_TQ);
  const v = sh.getRange('A6:E6').getDisplayValues()[0];
  return { vao: v[0], ra: v[2], conLai: v[4] };
}

function docQuy_(tenDanhMuc) {
  const sh = SpreadsheetApp.openById(SO_ID).getSheetByName(TAB_NS);
  const a = sh.getRange(1, 1, sh.getLastRow(), 4).getValues();
  let tenQuy = '', i;
  for (i = 0; i < a.length; i++) if (a[i][0] === 'Danh mục trong Form') break;
  for (i = i + 1; i < a.length && String(a[i][0]).trim() !== ''; i++) {
    if (a[i][0] === tenDanhMuc) { tenQuy = a[i][1]; break; }
  }
  if (!tenQuy) return { ten: '', ghiChu: 'Danh mục này chưa thuộc quỹ nào (xem phụ lục tab Ngân sách).' };
  for (i = 0; i < a.length; i++) {
    if (a[i][0] === tenQuy && typeof a[i][1] === 'number') {
      return { ten: tenQuy, duocTieu: a[i][1], daTieu: Math.abs(Number(a[i][2]) || 0), conLai: Number(a[i][3]) || 0 };
    }
  }
  return { ten: tenQuy, ghiChu: '' };
}

function docGanDay_(n) {
  const sh = SpreadsheetApp.openById(SO_ID).getSheetByName(TAB_DATA);
  const cuoi = hangCuoi_(sh);
  const dau = Math.max(2, cuoi - n + 1);
  if (cuoi < 2) return [];
  const v = sh.getRange(dau, 1, cuoi - dau + 1, 7).getValues();
  const tz = Session.getScriptTimeZone();
  const kq = [];
  for (let i = v.length - 1; i >= 0; i--) {
    const r = v[i];
    const t = r[0] instanceof Date ? r[0].getTime() : Number(r[0]);
    kq.push({
      hang: dau + i,
      dauThoiGian: t,
      thuChi: r[1],
      soTien: Number(r[2]),
      danhMuc: r[3],
      noiDung: r[4],
      ngay: r[5] instanceof Date ? Utilities.formatDate(r[5], tz, 'dd/MM') : String(r[5]),
      nguoi: r[6]
    });
  }
  return kq;
}
