// Lưu tiến độ trong máy (localStorage), tách riêng từng hồ sơ.

export const HO_SO = [
  { id: 'anhduong', ten: 'Ánh Dương', gioi: 'nu', chinh: true },
  { id: 'xu', ten: 'chị Xu', gioi: 'nu' },
  { id: 'me', ten: 'Mẹ', gioi: 'nu' },
  { id: 'bo', ten: 'Bố', gioi: 'nam' },
];

const KHOA = 'tham-tu-yi:';
const NGAY = 24 * 60 * 60 * 1000;
export const CHO_HOP = [0, 1, 3, 7, 14, 30]; // số ngày chờ theo hộp nhớ 1..5

function doc(k, macDinh) {
  try {
    const v = localStorage.getItem(KHOA + k);
    return v ? JSON.parse(v) : macDinh;
  } catch { return macDinh; }
}
function ghi(k, v) {
  try { localStorage.setItem(KHOA + k, JSON.stringify(v)); return true; } catch { return false; }
}

function hoSoMoi(id) {
  const goc = HO_SO.find((x) => x.id === id);
  return {
    id,
    ten: goc ? goc.ten : id,
    man0: { phong: 0, daXemMoDau: false },   // phong = số phòng đã qua (0..3)
    pho: {},        // B: { buoc, sao, qua, diemCao }
    tu: {},         // cz: { hop, han, dung, sai }
    biKip: {},      // BK4: { mo, thuoc }
    lanCuoi: 0,
  };
}

let hienTai = null;

export function docHoSo(id) {
  const hs = doc('ho-so:' + id, null);
  return hs ? { ...hoSoMoi(id), ...hs } : hoSoMoi(id);
}
export function chonHoSo(id) {
  hienTai = docHoSo(id);
  ghi('dang-choi', id);
  return hienTai;
}
export function hoSo() { return hienTai; }
export function hoSoDangChoi() { return doc('dang-choi', null); }
export function luu() { if (hienTai) ghi('ho-so:' + hienTai.id, hienTai); }

export function doiTen(id, ten) {
  const hs = docHoSo(id);
  hs.ten = ten;
  ghi('ho-so:' + id, hs);
  if (hienTai && hienTai.id === id) hienTai.ten = ten;
}

// Ảnh đại diện do bố mẹ chọn, chỉ lưu trong trình duyệt của máy này (không vào repo, không gửi đi đâu).
export function anhHoSo(id) {
  try { return localStorage.getItem(KHOA + 'anh:' + id); } catch { return null; }
}
export function luuAnhHoSo(id, duLieu) {
  try {
    if (duLieu) localStorage.setItem(KHOA + 'anh:' + id, duLieu);
    else localStorage.removeItem(KHOA + 'anh:' + id);
    return true;
  } catch { return false; }
}

export function caiDat() { return doc('cai-dat', { tatAm: false }); }
export function luuCaiDat(c) { ghi('cai-dat', c); }

// Ghi kết quả một lần trả lời về một từ: đúng lên hộp, sai về hộp 1.
export function ghiTu(cz, dung) {
  if (!hienTai || !cz) return;
  const t = hienTai.tu[cz] || { hop: 1, han: 0, dung: 0, sai: 0 };
  if (dung) { t.dung++; t.hop = Math.min(5, t.hop + 1); } else { t.sai++; t.hop = 1; }
  t.han = Date.now() + CHO_HOP[t.hop] * NGAY;
  hienTai.tu[cz] = t;
  luu();
}

export function moBiKip(ma) {
  if (!hienTai) return;
  if (!hienTai.biKip[ma]) hienTai.biKip[ma] = { mo: Date.now(), thuoc: false };
  luu();
}
export function thuocBiKip(ma) {
  if (!hienTai) return;
  hienTai.biKip[ma] = { ...(hienTai.biKip[ma] || { mo: Date.now() }), thuoc: true };
  luu();
}

export function ghiLanChoi() {
  if (!hienTai) return 0;
  const truoc = hienTai.lanCuoi;
  hienTai.lanCuoi = Date.now();
  luu();
  return truoc ? Math.floor((Date.now() - truoc) / NGAY) : 0;
}

export function thongKe(hs) {
  const tu = Object.values(hs.tu);
  return {
    phoQua: Object.values(hs.pho).filter((p) => p.qua).length,
    sao: Object.values(hs.pho).reduce((s, p) => s + (p.sao || 0), 0),
    tuDaHoc: tu.length,
    tuThuoc: tu.filter((t) => t.hop >= 3).length,
    biKip: Object.keys(hs.biKip).length,
  };
}
