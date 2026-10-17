// Đọc data/tu-vung-yi.json và data/truyen.json, kiểm tra, dựng từ điển tra nghĩa.

export const LUONG_TINH = 'bflmpsvz';
export const D = {};          // dữ liệu từ vựng (tu-vung-yi.json)
export const TRUYEN = {};     // thoại truyện (truyen.json)
export const TU_CAU = {};     // nghĩa các chữ Séc trong câu (tu-cau.json)
const tuDien = new Map();     // chữ thường → { cz, nghia, phien_am, emoji }
let tuChinh = [];             // 80 từ, mỗi từ kèm chữ nhóm

export async function taiDuLieu() {
  const loi = [];
  const [tv, tr, tc] = await Promise.all([
    docJson('data/tu-vung-yi.json', loi), docJson('data/truyen.json', loi), docJson('data/tu-cau.json', loi),
  ]);
  if (tv) kiemTra(tv, loi);
  if (loi.length) return loi;
  Object.assign(D, tv);
  Object.assign(TRUYEN, tr || {});
  Object.assign(TU_CAU, (tc && tc.tu) || {});
  dungTuDien();
  return [];
}

async function docJson(duongDan, loi) {
  try {
    const r = await fetch(duongDan, { cache: 'no-cache' });
    if (!r.ok) { loi.push(`Không mở được file ${duongDan} (mã ${r.status}).`); return null; }
    const chu = await r.text();
    try { return JSON.parse(chu); } catch (e) {
      const m = /position (\d+)/.exec(e.message);
      const dong = m ? chu.slice(0, Number(m[1])).split('\n').length : '?';
      loi.push(`File ${duongDan} viết sai ở khoảng dòng ${dong}: thường do thiếu dấu phẩy, thừa dấu phẩy cuối, hoặc thiếu dấu ngoặc kép.`);
      return null;
    }
  } catch {
    loi.push(`Không tải được ${duongDan}. Game cần được mở qua một trang web (không mở trực tiếp file trên máy).`);
    return null;
  }
}

function kiemTra(d, loi) {
  for (const k of ['quy_tac', 'cach_doc', 'bi_kip', 'nhom', 'cap_de_nham', 'quiz_cuoi']) {
    if (!(k in d)) loi.push(`Thiếu phần "${k}" trong tu-vung-yi.json.`);
  }
  (d.nhom || []).forEach((n, i) => {
    const ten = `nhóm thứ ${i + 1} (${n.chu || '?'})`;
    if (!n.chu) loi.push(`${ten}: thiếu "chu".`);
    if (!Array.isArray(n.tu)) { loi.push(`${ten}: thiếu danh sách "tu".`); return; }
    n.tu.forEach((t, j) => {
      for (const k of ['cz', 'nghia']) if (!t[k]) loi.push(`${ten}, từ thứ ${j + 1}: thiếu "${k}".`);
      if (!Array.isArray(t.tu_cung_nha)) loi.push(`${ten}, từ "${t.cz}": "tu_cung_nha" phải là danh sách (có thể rỗng []).`);
      if (t.cz && viTriGoc(t.cz, 'y') < 0) loi.push(`${ten}, từ "${t.cz}": không có chữ y/ý đứng sau B F L M P S V Z.`);
    });
    if (!Array.isArray(n.nghe_giong_viet_i)) loi.push(`${ten}: thiếu "nghe_giong_viet_i".`);
  });
  (d.bi_kip || []).forEach((b, i) => {
    for (const k of ['ma', 'ten', 'than_chu', 'giai_thich']) if (!b[k]) loi.push(`Bí kíp thứ ${i + 1}: thiếu "${k}".`);
    (b.cau_hoi_thuoc || []).forEach((q) => {
      if (!q.lua_chon || !q.lua_chon.includes(q.dap_an)) loi.push(`Bí kíp ${b.ma}: câu "${q.hoi}" có đáp án không nằm trong lựa chọn.`);
    });
  });
}

// Vị trí chữ y/ý (loai 'y') hoặc i/í (loai 'i') đầu tiên đứng ngay sau chữ lưỡng tính.
export function viTriGoc(cz, loai = 'y') {
  const s = cz.toLowerCase();
  const tap = loai === 'y' ? 'yý' : 'ií';
  for (let i = 1; i < s.length; i++) {
    if (tap.includes(s[i]) && LUONG_TINH.includes(s[i - 1])) return i;
  }
  return -1;
}

export const laY = (c) => 'yýYÝ'.includes(c);
export const laDai = (c) => 'ýíÝÍ'.includes(c);

function themTu(cz, muc) {
  const k = cz.toLowerCase();
  if (!tuDien.has(k)) tuDien.set(k, { cz, ...muc });
}

function dungTuDien() {
  tuDien.clear();
  tuChinh = [];
  for (const n of D.nhom) {
    for (const t of n.tu) {
      const muc = { cz: t.cz, nghia: t.nghia, phien_am: t.phien_am, emoji: t.emoji, chinh: true, nhom: n.chu };
      tuChinh.push({ ...t, nhom: n.chu });
      themTu(t.cz, muc);
      themTu(t.cz.split(' ')[0], muc);
      if (t.bien_the) themTu(t.bien_the, muc);
    }
  }
  for (const n of D.nhom) {
    for (const t of n.tu) for (const f of t.tu_cung_nha) themTu(f.cz, { nghia: f.nghia, goc: t.cz });
    if (n.tien_to) for (const f of n.tien_to.tu_cung_nha) themTu(f.cz, { nghia: f.nghia });
    for (const b of n.nghe_giong_viet_i) themTu(b.cz, { nghia: b.nghia, bay: true });
  }
  for (const c of D.cap_de_nham) { themTu(c.y, { nghia: c.y_nghia }); themTu(c.i, { nghia: c.i_nghia, bay: true }); }
  for (const t of TRUYEN.tu_them || []) themTu(t.cz, { nghia: t.nghia });
  // Nghĩa các chữ Séc trong câu ví dụ, truyện, thoại (không phải 80 từ chính, nên không tô màu y)
  for (const [cz, nghia] of Object.entries(TU_CAU)) themTu(cz, { nghia });
}

const sach = (s) => s.toLowerCase().replace(/[.,!?;:“”"()…]/g, '');

// Tra một chữ. Thử khớp đúng, rồi khớp phần đầu với 80 từ chính (bydlím → bydlet).
export function traTu(chu) {
  const k = sach(chu);
  if (!k) return null;
  if (tuDien.has(k)) return tuDien.get(k);
  return timTuChinh(k);
}

// Chỉ tra đúng nguyên chữ (không đoán dạng biến đổi).
export function traTuDung(chu) { return tuDien.get(sach(chu)) || null; }

// Khớp dạng biến đổi với từ chính: cùng 3–4 chữ đầu trở lên (coi y = ý), có chữ y.
// Từ quá ngắn (my, vy) chỉ khớp đúng nguyên chữ, để "Myji" không bị tra nhầm thành "my".
export function timTuChinh(chu) {
  const k = sach(chu).replace(/ý/g, 'y');
  if (k.length < 3 || !/y/.test(k)) return null;
  let tot = null; let dai = 0;
  for (const t of tuChinh) {
    const g = t.cz.toLowerCase().split(' ')[0].replace(/ý/g, 'y');
    let n = 0;
    while (n < g.length && n < k.length && g[n] === k[n]) n++;
    const can = Math.max(3, Math.min(4, g.length));
    if (n >= can && n > dai && k.slice(0, n).includes('y')) { tot = t; dai = n; }
  }
  return tot ? tuDien.get(tot.cz.toLowerCase()) : null;
}

// "bylina · cây thảo mộc" → "Bylina"
export function tenPho(n) { const t = n.ten.split(' · ')[0]; return t[0].toUpperCase() + t.slice(1); }

export function nhomTheoChu(chu) { return D.nhom.find((n) => n.chu === chu); }
export function biKip(ma) { return D.bi_kip.find((b) => b.ma === ma); }
export function tatCaTuChinh() { return tuChinh; }

// Từ bẫy (viết i) của một nhóm mà chữ i đứng ngay sau chữ lưỡng tính, dùng để hỏi được.
export function tuBayHoiDuoc(n) {
  return n.nghe_giong_viet_i.filter((b) => viTriGoc(b.cz, 'i') >= 0);
}

// Từ cùng nhà dùng được trong trò chơi (có chữ y ở gốc).
export function hoHangHoiDuoc(t) {
  return t.tu_cung_nha.filter((f) => !f.khong_co_y && viTriGoc(f.cz, 'y') >= 0);
}

// Tìm trong câu ví dụ chữ chứa từ đang học, trả về {chiSo, viTri} để che chữ y.
export function timTrongCau(cau, cz) {
  const goc = cz.toLowerCase().split(' ')[0];
  const p = viTriGoc(goc, 'y');
  const dau = goc.slice(0, p + 1).replace(/ý/g, 'y');
  const chu = cau.split(' ');
  const chuan = chu.map((c) => c.toLowerCase().replace(/ý/g, 'y'));
  let i = chuan.findIndex((c) => c.startsWith(dau));
  let lech = 0;
  if (i < 0) {
    i = chuan.findIndex((c) => c.includes(dau));
    if (i >= 0) lech = chuan[i].indexOf(dau);
  }
  if (i < 0) return null;
  return { chiSo: i, viTri: lech + p };
}
