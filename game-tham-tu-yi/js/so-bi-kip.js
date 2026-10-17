// Thẻ bí kíp, Sổ bí kíp và Luyện nhanh.
import { h, manHinh, moBangNoi, tronMang } from './dom.js';
import { D, biKip } from './du-lieu.js';
import { theBiKip } from './the-bi-kip.js';
import { nutNghe, khoiDocTheo } from './am-thanh.js';
import { hoSo, moBiKip } from './luu-tien-do.js';
import { chayLuot, qLuat } from './cau-hoi.js';

const NOI_MO = { 0: 'Văn phòng thám tử' };
const tenNoiMo = (man) => NOI_MO[man] || `phố ${man}`;

export { theBiKip };

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
// Bảng tổng hợp 3 loại chữ, luôn nằm ở đầu Sổ bí kíp.
function bangBaLoai() {
  const lay = (ma) => (biKip(ma).bang_chu || {});
  const dong = (nhan, ds, lop) => h('div', { class: 'dong-chu' },
    h('span', { class: 'nhan-loai' }, nhan), ds.map((c) => h('span', { class: 'chip-chu ' + lop, lang: 'cs' }, c)));
  return h('div', { class: 'the tong-hop' },
    h('h3', {}, '🔤 Bảng 3 loại chữ'),
    dong('Cứng → y', (lay('BK1').chu || []).map((c) => c.chu), 'cung'),
    dong('Đổi tính d t n', (lay('BK1').dac_biet?.chu || []).map((c) => c.chu), 'dtn'),
    dong('Mềm → i', (lay('BK2').chu || []).map((c) => c.chu), 'mem'),
    dong('Lưỡng tính', (lay('BK3').chu || []).map((c) => c.chu), 'luong'),
    h('p', { class: 'goi-y' }, 'Cứng: sau chữ này viết y. Mềm: sau chữ này viết i. Lưỡng tính: phải soi bảng 80 từ. Chạm vào từng bí kíp bên dưới để xem cách đọc và ví dụ của từng chữ.'));
}

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
    bangBaLoai(),
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
