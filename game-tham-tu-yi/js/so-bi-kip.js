// Thẻ bí kíp, Sổ bí kíp và Luyện nhanh.
import { h, manHinh, moBangNoi, tronMang } from './dom.js';
import { D, biKip } from './du-lieu.js';
import { czChu } from './dich.js';
import { nutNghe, khoiDocTheo } from './am-thanh.js';
import { hoSo, moBiKip } from './luu-tien-do.js';
import { chayLuot, qLuat } from './cau-hoi.js';

const NOI_MO = { 0: 'Văn phòng thám tử' };
const tenNoiMo = (man) => NOI_MO[man] || `phố ${man}`;

export function theBiKip(bk, { thuoc = false } = {}) {
  return h('div', { class: 'the the-bi-kip' },
    thuoc ? h('span', { class: 'dau-thuoc' }, 'Đã thuộc ✓') : null,
    h('span', { class: 'ma' }, `Bí kíp ${bk.ma} · ${bk.ten}`),
    h('div', { class: 'than-chu' }, bk.than_chu),
    h('p', {}, bk.giai_thich),
    bk.chi_tiet?.length ? h('ul', {}, bk.chi_tiet.map((c) => h('li', {}, c))) : null,
    bk.vi_du?.length ? h('div', { class: 'hang-nut', style: 'align-items:center' },
      h('span', { class: 'goi-y' }, 'Ví dụ:'),
      bk.vi_du.map((v) => h('span', { style: 'display:inline-flex;align-items:center;gap:4px' }, h('span', { lang: 'cs', style: 'font-weight:800;font-size:1.1rem' }, czChu(v)), nutNghe(v)))) : null,
    bk.nguon && bk.nguon !== 'PDF' ? h('p', { class: 'goi-y' }, 'Có phần bổ sung theo chương trình trường Séc.') : null,
  );
}

// Màn mở bí kíp: thẻ to, đọc to câu thần chú, bấm "Mình nhớ rồi".
export function manMoBiKip(dsMa, { tieuDe = 'Bí kíp mới!', loiDan = null, khiXong }) {
  dsMa.forEach(moBiKip);
  const nutNho = h('button', { class: 'nut nut-chinh nut-rong', type: 'button', disabled: true, onclick: khiXong }, 'Mình nhớ rồi ✓');
  let conLai = dsMa.length;
  const khoi = dsMa.map((ma) => {
    const bk = biKip(ma);
    return h('div', { style: 'display:flex;flex-direction:column;gap:10px' },
      theBiKip(bk),
      h('p', { class: 'goi-y' }, 'Đọc to câu thần chú 3 lần:'),
      khoiDocTheo(bk.than_chu, () => { conLai--; if (conLai <= 0) nutNho.disabled = false; }, { coMau: false }));
  });
  manHinh(
    h('div', { class: 'thanh-tren' }, h('div', { class: 'tieu-de' }, tieuDe, h('small', {}, 'Thẻ này được cất vào Sổ bí kíp'))),
    loiDan, ...khoi, nutNho);
}

// Bảng nổi xem nhanh các bí kíp đã mở (trong lúc chơi, không dùng trong Cửa ải).
export function moSoBiKipNhanh() {
  const hs = hoSo();
  const ds = D.bi_kip.filter((b) => hs.biKip[b.ma]).reverse();
  moBangNoi(h('h3', {}, '📜 Sổ bí kíp'), ...ds.map((b) => theBiKip(b, { thuoc: hs.biKip[b.ma].thuoc })));
}

// Trang Sổ bí kíp đầy đủ.
export function trangSoBiKip(quayVe) {
  const hs = hoSo();
  const dong = D.bi_kip.map((b) => {
    const tt = hs.biKip[b.ma];
    if (!tt) {
      return h('div', { class: 'tram bi-khoa' },
        h('span', { class: 'huy-hieu' }, '🔒'),
        h('span', { class: 'noi-dung' }, h('b', {}, `${b.ma} · ${b.ten}`), h('span', {}, 'Mở ở ' + tenNoiMo(b.man))));
    }
    return h('div', { style: 'display:flex;flex-direction:column;gap:8px' },
      theBiKip(b, { thuoc: tt.thuoc }),
      b.cau_hoi_thuoc?.length ? h('button', { class: 'nut', type: 'button', onclick: () => luyenNhanh(b.ma, () => trangSoBiKip(quayVe)) }, '⚡ Luyện nhanh 5 câu') : null);
  });
  manHinh(
    h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: quayVe }, '←'),
      h('div', { class: 'tieu-de' }, '📜 Sổ bí kíp', h('small', {}, `Đã mở ${Object.keys(hs.biKip).length}/${D.bi_kip.length}`))),
    ...dong);
}

export function luyenNhanh(ma, quayVe) {
  const bk = biKip(ma);
  const ds = [];
  while (ds.length < 5) ds.push(...tronMang(bk.cau_hoi_thuoc));
  chayLuot({
    tieuDe: 'Luyện nhanh ' + ma, phuDe: 'Không tính điểm, chơi bao nhiêu lần cũng được',
    cauHoi: ds.slice(0, 5).map((q) => qLuat(ma, q)), cheDo: 'luyen',
    thoat: quayVe,
    khiXong: ({ dung, tong }) => {
      manHinh(h('div', { class: 'the ket-qua' },
        h('h2', {}, `Đúng ${dung}/${tong}`),
        theBiKip(bk),
        h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: quayVe }, 'Về Sổ bí kíp')));
    },
  });
}
