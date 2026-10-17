// Phần dùng chung cho Văn phòng thám tử và các phố: cảnh truyện, Cửa ải.
import { h, manHinh } from './dom.js';
import { biKip } from './du-lieu.js';
import { loiThoai, cuNoi } from './nhan-vat.js';
import { chayLuot } from './cau-hoi.js';
import { theBiKip } from './so-bi-kip.js';
import { chuong } from './am-thanh.js';

// Cảnh truyện: hiện từng câu thoại, chạm "Tiếp" để hiện câu sau.
export function canhTruyen(dsCau, { tieuDe = '', khiXong }) {
  const khung = h('div', { style: 'display:flex;flex-direction:column;gap:12px' });
  let i = 0;
  const nut = h('button', { class: 'nut nut-chinh nut-rong', type: 'button' }, 'Tiếp ▸');
  const hienTiep = () => {
    if (i >= dsCau.length) { khiXong(); return; }
    khung.append(loiThoai(dsCau[i]));
    i++;
    nut.textContent = i >= dsCau.length ? 'Bắt đầu ▸' : 'Tiếp ▸';
    nut.scrollIntoView?.({ behavior: 'smooth', block: 'end' });
  };
  nut.onclick = hienTiep;
  manHinh(h('div', { class: 'thanh-tren' }, h('div', { class: 'tieu-de' }, tieuDe)), khung, nut);
  hienTiep();
}

export function soSao(dung, tong) {
  if (tong === 10) return dung >= 10 ? 3 : dung === 9 ? 2 : dung === 8 ? 1 : 0;
  const tile = dung / tong;
  return tile === 1 ? 3 : tile >= 0.9 ? 2 : tile >= 0.8 ? 1 : 0;
}

export function hangSao(n, lop = 'sao-hang') {
  return h('span', { class: lop, 'aria-label': `${n} sao` }, [1, 2, 3].map((k) => h('span', { class: k <= n ? '' : 'tat' }, '★')));
}

// Cửa ải: không có nút bí kíp, chưa đủ điểm thì cho xem lại bí kíp rồi thử lại.
// taoCauHoi() được gọi lại mỗi lần thử, để đổi thứ tự và một phần câu hỏi.
export function cuaAi({ tieuDe, taoCauHoi, can, dsBiKip, thoat, khiQua }) {
  const thu = () => chayLuot({
    tieuDe, phuDe: `Cửa ải · đúng ${can} câu trở lên mới qua`,
    cauHoi: taoCauHoi(), cheDo: 'cua_ai', thoat,
    khiXong: ({ dung, tong, tuSai }) => {
      if (dung >= can) { chuong(true); khiQua({ dung, tong, tuSai }); return; }
      manHinh(
        h('div', { class: 'thanh-tren' }, h('div', { class: 'tieu-de' }, tieuDe)),
        cuNoi(h('b', {}, `Em đúng ${dung}/${tong} câu, cần ${can} câu.`), h('span', {}, 'Không sao cả, sao cũ vẫn giữ nguyên. Mình xem lại bí kíp rồi thử lần nữa nhé!')),
        ...dsBiKip.map((ma) => theBiKip(biKip(ma))),
        h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: thu }, 'Thử lại Cửa ải'),
        h('button', { class: 'nut nut-rong', type: 'button', onclick: thoat }, 'Về bản đồ'));
    },
  });
  manHinh(
    h('div', { class: 'thanh-tren' }, h('div', { class: 'tieu-de' }, tieuDe)),
    cuNoi(h('b', {}, 'Cửa ải bí kíp!'), h('span', {}, `Ở đây không được mở Sổ bí kíp, em phải nhớ. Chạm vào chữ Séc để xem nghĩa thì vẫn được. Đúng ${can} câu trở lên là qua.`)),
    h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: thu }, 'Vào Cửa ải ▸'));
}
