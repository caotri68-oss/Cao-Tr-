// Chạm vào chữ Séc để xem nghĩa. Mọi chữ Séc trên màn hình đều đi qua các hàm ở đây.
import { h, moBangNoi } from './dom.js';
import { traTu, viTriGoc, timTuChinh } from './du-lieu.js';
import { nutNghe, nutNgheCham } from './am-thanh.js';

// Tô đỏ chữ y ở gốc từ (hoặc tô xanh chữ i nếu loai = 'i'). che = true thì thay bằng ô trống.
export function toMau(cz, { loai = 'y', che = false, viTri } = {}) {
  const p = viTri ?? viTriGoc(cz, loai);
  if (p < 0) return document.createTextNode(cz);
  const lop = loai === 'y' ? 'y-do' : 'i-xanh';
  return h('span', {}, cz.slice(0, p),
    che ? h('span', { class: 'cho-trong', 'aria-label': 'chỗ trống' }, '?') : h('span', { class: lop }, cz[p]),
    cz.slice(p + 1));
}

// Một chữ Séc chạm được. tuy chọn: an (ẩn nghĩa), che (vị trí bị che), vn (nghĩa cả câu)
export function czChu(chu, { an = false, che = null, vn = null, loai = 'y', toY = true, mau = null } = {}) {
  if (chu.includes('_')) che = chu.indexOf('_');
  const muc = chu.includes('_') ? null : traTu(chu);
  let noiDung;
  if (mau) noiDung = toMau(chu, mau);
  else if (che !== null && che !== undefined) noiDung = toMau(chu, { che: true, viTri: che });
  else if (toY && muc && muc.chinh) {
    const p = viTriGoc(chu, 'y');
    noiDung = p >= 0 ? toMau(chu, { viTri: p }) : chu;
  } else noiDung = chu;
  return h('button', {
    class: 'cz', type: 'button',
    onclick: (e) => { e.stopPropagation(); moTheDich(chu, { an, che, vn, loai }); },
  }, noiDung);
}

// Một câu Séc: từng chữ chạm được, giữ nguyên dấu câu.
export function czCau(cau, { vn = null, an = [], che = null } = {}) {
  const tachDau = /^([“"(]*)(.*?)([.,!?;:”")…]*)$/;
  const phan = cau.split(' ');
  const dong = h('span', { class: 'cau-cz', lang: 'cs' });
  phan.forEach((p, i) => {
    const [, dau, giua, cuoi] = tachDau.exec(p);
    if (i > 0) dong.append(' ');
    if (dau) dong.append(dau);
    if (giua) {
      const anNghia = an.includes(giua.toLowerCase());
      dong.append(czChu(giua, { an: anNghia, vn, che: che && che.chiSo === i ? che.viTri - dau.length : null }));
    }
    if (cuoi) dong.append(cuoi);
  });
  return dong;
}

// Đoạn tiếng Việt có xen chữ Séc (truyện nhớ): chữ Séc được tô và chạm được.
export function czTrongTruyen(doan) {
  const khoi = h('p', { class: 'truyen' });
  const phan = doan.split(/(\s+)/);
  for (const p of phan) {
    const m = /^([(“"]*)(.*?)([).,!?;:”"]*)$/.exec(p);
    const giua = m ? m[2] : p;
    const muc = giua && /[yý]/i.test(giua) ? (traTu(giua) || timTuChinh(giua)) : null;
    if (muc && (muc.chinh || muc.goc)) {
      khoi.append(m[1], czChu(giua, {}), m[3]);
    } else khoi.append(p);
  }
  khoi.querySelectorAll('.cz').forEach((b) => b.classList.add('trong-truyen'));
  return khoi;
}

export function moTheDich(chu, { an = false, che = null, vn = null } = {}) {
  const muc = chu.includes('_') ? null : traTu(chu);
  const dangChe = che !== null && che !== undefined;
  const phan = [];
  phan.push(h('div', { class: 'tu-dich', lang: 'cs' }, dangChe ? toMau(chu, { che: true, viTri: che }) : (muc && muc.chinh ? toMau(chu) : chu)));
  if (muc && muc.phien_am && !dangChe) phan.push(h('div', { class: 'phien-am' }, '[' + muc.phien_am + ']'));
  if (an) phan.push(h('p', { class: 'goi-y' }, 'Nghĩa của chữ này đang là câu đố, trả lời xong sẽ xem được.'));
  else if (muc && muc.nghia) {
    phan.push(h('p', { class: 'nghia' }, muc.nghia));
    if (muc.goc) phan.push(h('p', { class: 'goi-y' }, 'Cùng nhà với ', h('b', {}, muc.goc)));
    if (muc.cz && muc.cz.toLowerCase() !== chu.toLowerCase() && muc.chinh) phan.push(h('p', { class: 'goi-y' }, 'Dạng gốc: ', h('b', {}, muc.cz)));
  } else {
    phan.push(h('p', { class: 'goi-y' }, 'Chữ này chưa có nghĩa riêng trong sổ. Xem nghĩa cả câu.'));
  }
  if (vn) phan.push(h('p', {}, h('b', {}, 'Nghĩa cả câu: '), vn));
  if (dangChe) phan.push(h('p', { class: 'goi-y' }, 'Ô trống là bí mật của câu đố.'));
  // y và i đọc giống nhau, nên ô trống đọc như "i" cũng đúng âm.
  const doc = chu.replace('_', 'i');
  phan.push(h('div', { class: 'hang-nut' }, nutNghe(doc), nutNgheCham(doc)));
  moBangNoi(...phan);
}
