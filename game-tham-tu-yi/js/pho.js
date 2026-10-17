// Một phố chữ: khởi động → truyện → mở bí kíp → các vòng học → Cửa ải → kết phố.
import { h, manHinh, tronMang, chon } from './dom.js';
import { TRUYEN, tenPho, nhomTheoChu, biKip, tuBayHoiDuoc, hoHangHoiDuoc, viTriGoc, traTuDung } from './du-lieu.js';
import { hoSo, luu, thuocBiKip } from './luu-tien-do.js';
import { czChu, czCau, czTrongTruyen } from './dich.js';
import { nutNghe, nutNgheCham, khoiDocTheo, doc } from './am-thanh.js';
import { cuNoi, loiThoai } from './nhan-vat.js';
import {
  chayLuot, qLuat, qNgheDien, qCungNha, qBayNgheGiong, qGhepNghia, qCauViDu, qBaBuoc, qSoiLoi,
  mucTuChinh, mucTuBay, viDuCungMem, doiYI,
} from './cau-hoi.js';
import { manMoBiKip, moSoBiKipNhanh } from './so-bi-kip.js';
import { canhTruyen, cuaAi, soSao, hangSao } from './chung.js';
import { chuong } from './am-thanh.js';

// Cấu hình từng phố.
//   biKip: bí kíp mở ở đầu phố (null nếu phố chỉ ôn)
//   luat:  bí kíp dùng để nhắc khi sai
//   dai:   có nút ý / í không (từ phố M trở đi)
//   soiLoi: có trò soi lỗi không
//   trum:  từ trong bảng làm trùm cuối phố (kẻ trộm giấu chữ y trong con vật này)
export const PHO = {
  B: { biKip: 'BK4', luat: 'BK4', dai: false, trum: 'býk' },
  L: { biKip: 'BK5', luat: 'BK5', dai: false, trum: 'plyš' },
  M: { biKip: 'BK6', luat: 'BK6', dai: true, trum: 'myš' },
  P: { biKip: null, luat: 'BK6', dai: true, soiLoi: true, trum: 'netopýr' },
  S: { biKip: 'BK7', luat: 'BK7', dai: true, trum: 'syčet' },
  V: { biKip: 'BK8', luat: 'BK8', dai: true, trum: 'výr' },
  Z: { biKip: null, luat: 'BK4', dai: true, trum: 'Ruzyně' },
};

const NGAY = 24 * 60 * 60 * 1000;

function chiaVong(ds) {
  const soVong = Math.max(1, Math.ceil(ds.length / 5));
  const kq = Array.from({ length: soVong }, () => []);
  ds.forEach((t, i) => kq[Math.floor((i * soVong) / ds.length)].push(t));
  return kq;
}

export function vaoPho(chu, veBanDo) {
  const n = nhomTheoChu(chu);
  const cfg = PHO[chu];
  const hs = hoSo();
  const tt = hs.pho[chu] || (hs.pho[chu] = { buoc: 0, sao: 0, qua: false, diemCao: 0 });
  const tu = n.tu.map((t) => ({ ...t, nhom: chu }));
  const vong = chiaVong(tu);
  const buoc = ['khoi_dong', 'truyen', 'bi_kip', ...vong.map((_, i) => 'vong' + i), 'cua_ai', 'trum', 'ket'];
  if (tt.buoc >= buoc.length) tt.buoc = 0;
  luu();

  const tieuDe = `Phố ${tenPho(n)} (${chu})`;
  const tiep = () => { tt.buoc++; luu(); chay(); };
  const thoat = veBanDo;

  function chay() {
    const b = buoc[tt.buoc];
    if (b === 'khoi_dong') return khoiDong(tieuDe, thoat, tiep);
    if (b === 'truyen') return truyen(n, tieuDe, tiep);
    if (b === 'bi_kip') {
      if (!cfg.biKip) return tiep();
      return manMoBiKip([cfg.biKip], { tieuDe: `${tieuDe} · Bí kíp mới`, loiDan: cuNoi('Bí kíp của phố này. Đọc to câu thần chú rồi mình vào học từ nhé!'), khiXong: tiep });
    }
    if (b.startsWith('vong')) {
      const v = Number(b.slice(4));
      return hocTu(vong[v], v, vong.length, tieuDe, thoat, () => choiVong(n, cfg, vong[v], v, vong.length, tieuDe, thoat, tiep));
    }
    if (b === 'cua_ai') return cuaAiPho(n, cfg, tu, tieuDe, thoat, (kq) => { tt.kqCuaAi = kq; tiep(); });
    if (b === 'trum') return trumPho(n, cfg, tieuDe, thoat, tiep);
    if (b === 'ket') return ketPho(n, cfg, tu, tt, thoat);
  }
  chay();
}

// ——— Khởi động: nhắc 3 luật nền và 3 câu hỏi nhanh ———
function khoiDong(tieuDe, thoat, xong) {
  const nen = ['BK1', 'BK2', 'BK3'].map(biKip);
  const nut = h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: () => {
    const cauHoi = tronMang(nen.flatMap((bk) => bk.cau_hoi_thuoc.map((q) => qLuat(bk.ma, q)))).slice(0, 3);
    chayLuot({ tieuDe, phuDe: 'Khởi động · 3 câu nhanh', cauHoi, cheDo: 'hoc', moSoBiKip: moSoBiKipNhanh, thoat, khiXong: xong });
  } }, 'Mình đọc to rồi ▸');
  manHinh(
    h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: thoat }, '←'),
      h('div', { class: 'tieu-de' }, tieuDe, h('small', {}, 'Khởi động 1 phút'))),
    cuNoi('Trước khi phá án, đọc to 3 câu thần chú nền nhé:'),
    ...nen.map((bk) => h('div', { class: 'the' }, h('span', { class: 'goi-y' }, bk.ten), h('div', { class: 'than-chu-nho', style: 'font-family:var(--font-to);font-weight:800;font-size:1.3rem;color:var(--y)' }, bk.than_chu))),
    nut);
}

// ——— Truyện của phố ———
function truyen(n, tieuDe, xong) {
  const vao = TRUYEN.pho?.[n.chu]?.vao || [];
  canhTruyen(vao, {
    tieuDe,
    khiXong: () => manHinh(
      h('div', { class: 'thanh-tren' }, h('div', { class: 'tieu-de' }, tieuDe, h('small', {}, 'Truyện nhớ'))),
      h('div', { class: 'the' },
        h('h3', {}, `${n.emoji} ${n.ten}`),
        czTrongTruyen(n.truyen_nho),
        h('p', { class: 'goi-y' }, 'Chạm vào chữ Séc tô vàng để nghe và xem nghĩa.')),
      h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: xong }, 'Học từng từ ▸')),
  });
}

// ——— Học từ: thẻ to từng từ ———
function hocTu(ds, v, soVong, tieuDe, thoat, xong) {
  const hs = hoSo();
  let i = 0;
  let hienNghia = true;
  const ve = () => {
    const t = ds[i];
    if (!hs.tu[t.cz]) { hs.tu[t.cz] = { hop: 1, han: Date.now() + NGAY, dung: 0, sai: 0 }; luu(); }
    const nghia = h('div', { class: 'nghia', style: 'font-size:1.2rem' }, t.nghia);
    nghia.hidden = !hienNghia;
    const hoHang = h('div', { class: 'ho-hang', hidden: true },
      h('b', {}, 'Họ hàng (cũng viết y):'),
      t.tu_cung_nha.length
        ? h('ul', {}, t.tu_cung_nha.map((f) => h('li', {}, h('span', { lang: 'cs', style: 'font-weight:800' }, czChu(f.cz, { mau: { loai: 'y' } })), ' = ', f.nghia)))
        : h('p', { class: 'goi-y' }, 'Từ này không có họ hàng trong bảng.'));
    const nutHoHang = h('button', { class: 'nut nut-nho', type: 'button', onclick: () => { hoHang.hidden = !hoHang.hidden; } }, '👪 Xem họ hàng');
    const chk = h('input', { type: 'checkbox', id: 'hien-nghia', checked: hienNghia ? true : null, onchange: (e) => { hienNghia = e.target.checked; nghia.hidden = !hienNghia; } });
    manHinh(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: thoat }, '←'),
        h('div', { class: 'tieu-de' }, tieuDe, h('small', {}, `Vòng ${v + 1}/${soVong} · Học từ ${i + 1}/${ds.length}`)),
        h('button', { class: 'nut nut-nho', type: 'button', onclick: moSoBiKipNhanh }, '📜 Bí kíp')),
      h('div', { class: 'the the-tu' },
        h('div', { class: 'emoji-to' }, t.emoji),
        h('div', { class: 'tu-to', lang: 'cs' }, czChu(t.cz)),
        h('div', { class: 'phien-am' }, `[${t.phien_am}]`),
        nghia,
        h('div', { class: 'hang-nut' }, nutNghe(t.cz), nutNgheCham(t.cz)),
        khoiDocTheo(t.cz),
        h('div', { class: 'vi-du' },
          h('div', { class: 'hang-nut', style: 'align-items:center;flex-wrap:nowrap' }, h('span', { style: 'flex:1;min-width:0' }, czCau(t.vi_du.cz, { vn: t.vi_du.vn })), nutNghe(t.vi_du.cz)),
          h('div', {}, t.vi_du.vn)),
        nutHoHang, hoHang,
        h('label', { class: 'an-hien', for: 'hien-nghia' }, chk, 'Hiện nghĩa tiếng Việt')),
      h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: () => { i++; if (i < ds.length) ve(); else xong(); } }, i + 1 < ds.length ? 'Nhớ rồi ⭐ Từ tiếp ▸' : 'Nhớ rồi ⭐ Vào chơi ▸'));
    setTimeout(() => doc(t.cz, { tuDong: true }), 300);
  };
  ve();
}

// ——— Chơi một vòng ———
// Mỗi phố có một luật riêng để luyện trong vòng. Trả về danh sách câu hỏi thêm.
function thuThachBiKip(n, cfg, ds, v, bay, opt) {
  const coHo = ds.filter((t) => hoHangHoiDuoc(t).length);
  switch (cfg.luat) {
    case 'BK4': {
      const cm = tronMang(viDuCungMem());
      const muc = [
        [mucTuChinh(chon(ds)), mucTuBay(bay[0], n.chu)],
        [mucTuChinh(chon(ds)), cm[0]],
        [mucTuBay(bay[1] || bay[0], n.chu), cm[1]],
      ][v % 3];
      return muc.map((m) => qBaBuoc({ ...m })).filter(Boolean);
    }
    case 'BK5': // từ cùng nhà: gốc có y thì con cháu cũng y
      return [chon(coHo.length ? coHo : ds), chon(coHo.length ? coHo : ds)]
        .map((t) => qCungNha(t, n, opt)).filter(Boolean);
    case 'BK6': // cặp nghe giống, khác nghĩa
      return [qBayNgheGiong(mucTuChinh(chon(ds)), opt), qBayNgheGiong(mucTuBay(bay[0], n.chu), opt)];
    case 'BK7': { // dài ngắn không đổi y
      const co = ds.filter((t) => /[ý]/.test(t.cz));
      return (co.length ? co : ds).slice(0, 2).map((t) => qNgheDien(mucTuChinh(t), { ...opt, dai: true }));
    }
    case 'BK8': // vy- / vý-
      return (biKip('BK8').cau_hoi_thuoc || []).slice(0, 2).map((q) => qLuat('BK8', q));
    default: // ôn tổng hợp
      return [];
  }
}

// Trò soi lỗi: 3 từ đúng + 1 từ bị đổi y↔i, chọn từ viết sai.
function taoSoiLoi(n, ds) {
  for (let k = 0; k < 12; k++) {
    const tuLoi = chon(n.tu);
    const dung = tronMang(n.tu.filter((t) => t.cz !== tuLoi.cz)).slice(0, 3);
    const q = qSoiLoi(dung, tuLoi);
    if (q) return q;
  }
  return null;
}

function choiVong(n, cfg, ds, v, soVong, tieuDe, thoat, xong) {
  const opt = { dai: cfg.dai, luat: cfg.luat };
  const bayTatCa = tronMang(tuBayHoiDuoc(n));
  const bay = [bayTatCa[(v * 2) % bayTatCa.length], bayTatCa[(v * 2 + 1) % bayTatCa.length]];
  const cauHoi = [
    ...ds.map((t) => qNgheDien(mucTuChinh(t), opt)),
    ...bay.map((b) => qNgheDien(mucTuBay(b, n.chu), opt)),
    ...thuThachBiKip(n, cfg, ds, v, bay, opt),
  ];
  const coHoHang = ds.filter((t) => hoHangHoiDuoc(t).length);
  const them = [
    () => [qGhepNghia(tronMang(ds), opt), coHoHang.length ? qCungNha(chon(coHoHang), n, opt) : null],
    () => [qBayNgheGiong(mucTuChinh(chon(ds)), opt), qBayNgheGiong(mucTuBay(bay[0], n.chu), opt), qCauViDu(chon(ds), opt)],
    () => [coHoHang.length ? qCungNha(chon(coHoHang), n, opt) : null, ...tronMang(ds).slice(0, 2).map((t) => qCauViDu(t, opt))],
  ][v % 3]();
  if (cfg.soiLoi) them.push(taoSoiLoi(n, ds));
  const ghep = them.find((q) => q && q.loai === 'ghep');
  const conLai = tronMang([...cauHoi, ...them.filter((q) => q && q !== ghep)]);
  chayLuot({
    tieuDe, phuDe: `Vòng ${v + 1}/${soVong} · Phá án`,
    cauHoi: ghep ? [ghep, ...conLai] : conLai,
    cheDo: 'hoc', moSoBiKip: moSoBiKipNhanh, thoat, khiXong: xong,
  });
}

// ——— Trùm cuối phố: kẻ trộm giấu chữ y trong một từ của phố. Đánh trùm = trả lời đúng 3/5 câu về từ đó.
function trumPho(n, cfg, tieuDe, thoat, xong) {
  const boss = n.tu.find((t) => t.cz === cfg.trum);
  const opt = { dai: cfg.dai, luat: cfg.luat };
  const taoCauHoi = () => {
    const danh = [
      qNgheDien(mucTuChinh(boss), opt),
      qNgheDien(mucTuChinh(boss), opt),
      qCauViDu(boss, opt),
      hoHangHoiDuoc(boss).length ? qCungNha(boss, n, opt) : null,
      qBayNgheGiong(mucTuChinh(boss), opt),
    ].filter(Boolean);
    while (danh.length < 5) danh.push(qNgheDien(mucTuChinh(boss), opt));
    return tronMang(danh).slice(0, 5);
  };
  canhTruyen(TRUYEN.pho?.[n.chu]?.trum || [], {
    tieuDe: `${tieuDe} · Trùm`,
    khiXong: () => cuaAi({
      tieuDe: `Trùm: ${boss.cz}`, taoCauHoi, can: 3, dsBiKip: [], thoat,
      khiQua: () => { chuong(true); xong(); },
    }),
  });
}

// ——— Cửa ải phố: 2 câu về bí kíp phố, 2 câu luật nền, 6 câu áp dụng ———
function cuaAiPho(n, cfg, tu, tieuDe, thoat, khiQua) {
  const hs = hoSo();
  const opt = { dai: cfg.dai, luat: cfg.luat };
  const taoCauHoi = () => {
    const bk = cfg.biKip ? biKip(cfg.biKip) : null;
    const luatPho = bk ? tronMang(bk.cau_hoi_thuoc).slice(0, 2).map((q) => qLuat(bk.ma, q)) : [];
    const nen = tronMang(['BK1', 'BK2', 'BK3'].flatMap((ma) => biKip(ma).cau_hoi_thuoc.map((q) => [ma, q]))).slice(0, 2).map(([ma, q]) => qLuat(ma, q));
    // Ưu tiên từ hay sai, rồi ngẫu nhiên.
    const theoSai = tronMang(tu).sort((a, b) => (hs.tu[b.cz]?.sai || 0) - (hs.tu[a.cz]?.sai || 0));
    const bay = tronMang(tuBayHoiDuoc(n));
    const coHoHang = theoSai.filter((t) => hoHangHoiDuoc(t).length);
    const apDung = [
      qNgheDien(mucTuChinh(theoSai[0]), opt),
      qNgheDien(mucTuBay(bay[0], n.chu), opt),
      qCauViDu(theoSai[1], opt),
      coHoHang.length ? qCungNha(coHoHang[0], n, opt) : qNgheDien(mucTuChinh(theoSai[4]), opt),
      qBayNgheGiong(mucTuBay(bay[1] || bay[0], n.chu), opt),
      qNgheDien(mucTuChinh(theoSai[2]), opt),
    ].map((q, i) => q || qNgheDien(mucTuChinh(theoSai[3 + i]), opt));
    const ds = tronMang([...luatPho, ...nen, ...apDung]);
    while (ds.length < 10) ds.push(qNgheDien(mucTuChinh(chon(tu)), opt));
    return ds.slice(0, 10);
  };
  cuaAi({
    tieuDe: `Cửa ải ${tieuDe}`, taoCauHoi, can: 8,
    dsBiKip: [cfg.biKip, 'BK1', 'BK2', 'BK3'].filter(Boolean), thoat, khiQua,
  });
}

// ——— Kết phố ———
function ketPho(n, cfg, tu, tt, thoat) {
  const kq = tt.kqCuaAi || { dung: 8, tong: 10 };
  const sao = soSao(kq.dung, kq.tong);
  tt.sao = Math.max(tt.sao || 0, sao);
  tt.diemCao = Math.max(tt.diemCao || 0, kq.dung);
  tt.qua = true;
  if (cfg.biKip) thuocBiKip(cfg.biKip);
  luu();
  const ket = TRUYEN.pho?.[n.chu]?.ket || [];
  manHinh(
    h('div', { class: 'the ket-qua' },
      h('div', { class: 'con-dau' }, n.chu + ' ✓'),
      h('h2', {}, `Chữ Y đã về phố ${tenPho(n)}!`),
      hangSao(sao, 'sao-to'),
      h('p', {}, `Cửa ải đúng ${kq.dung}/${kq.tong}.` + (cfg.biKip ? ` Bí kíp ${cfg.biKip} được đóng dấu “Đã thuộc ✓”.` : ''))),
    ...ket.map(loiThoai),
    h('div', { class: 'the' },
      h('h3', {}, `${tu.length} từ em đã học`),
      h('div', { class: 'hang-nut', lang: 'cs' }, tu.map((t) => h('span', { style: 'font-weight:800;font-size:1.1rem' }, t.emoji, ' ', czChu(t.cz))))),
    h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: thoat }, 'Về bản đồ ▸'));
  tt.buoc = 0;
  luu();
}

