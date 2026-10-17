// Tiến độ gia đình: mỗi người một khối riêng, không xếp hạng, dữ liệu chỉ nằm trong máy.
import { h, manHinh } from './dom.js';
import { D } from './du-lieu.js';
import { HO_SO, docHoSo, phut7Ngay } from './luu-tien-do.js';
import { hinhHoSo } from './nhan-vat.js';
import { nutNghe } from './am-thanh.js';

const THU = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function khoiHoSo(g) {
  const hs = docHoSo(g.id);
  const tu = Object.entries(hs.tu);
  const thuocLau = tu.filter(([, t]) => t.thuocLau).length;
  const phut = phut7Ngay(hs);
  const toiDa = Math.max(10, ...phut.map((p) => p.phut));
  const hay = tu.filter(([, t]) => (t.sai || 0) > 0).sort((a, b) => b[1].sai - a[1].sai).slice(0, 10);
  const chuaThuoc = Object.entries(hs.biKip).filter(([, b]) => !b.thuoc).map(([ma]) => ma);
  const diemThap = Object.entries(hs.pho).filter(([, p]) => p.qua && (p.diemCao || 0) < 9).map(([k, p]) => `Phố ${k}: ${p.diemCao}/10`);
  const dangChoi = hs.man0.phong < 3 ? `Văn phòng thám tử (phòng ${hs.man0.phong + 1}/3)`
    : D.nhom.find((n) => !hs.pho[n.chu]?.qua) ? 'Phố ' + D.nhom.find((n) => !hs.pho[n.chu]?.qua).chu
      : hs.cuoi?.qua ? 'Đã có Bằng thám tử' : 'Trùm cuối';
  return h('div', { class: 'the' },
    h('div', { class: 'hang-nut', style: 'align-items:center;flex-wrap:nowrap' }, hinhHoSo(g.id, 'hinh'), h('h3', {}, hs.ten)),
    h('p', {}, h('b', {}, 'Đang chơi: '), dangChoi),
    h('p', { class: 'goi-y' }, 'Phút chơi 7 ngày gần nhất:'),
    phut.some((p) => p.phut)
      ? h('div', { class: 'bieu-do', role: 'img', 'aria-label': 'Biểu đồ phút chơi 7 ngày' }, phut.map((p) => h('div', { class: 'cot' },
        h('span', {}, p.phut ? String(p.phut) : ''),
        h('i', { style: `height:${Math.round((p.phut / toiDa) * 80)}px` }),
        h('span', {}, THU[new Date(p.ngay + 'T12:00:00').getDay()]))))
      : h('p', { class: 'goi-y' }, 'Chưa có phút chơi nào trong 7 ngày qua.'),
    h('p', {}, `📚 Đã học ${tu.length} từ · 🔁 đang ôn ${tu.length - thuocLau} · 🏅 đã thuộc lâu ${thuocLau}`),
    h('div', {}, h('b', {}, '10 từ hay sai nhất'),
      hay.length ? h('ul', { style: 'margin:6px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px' },
        hay.map(([cz, t]) => h('li', { class: 'hang-nut', style: 'align-items:center;flex-wrap:nowrap' },
          h('span', { style: 'flex:1;font-weight:800', lang: 'cs' }, cz), h('span', { class: 'goi-y' }, `sai ${t.sai} lần`), nutNghe(cz))))
        : h('p', { class: 'goi-y' }, 'Chưa có từ nào sai.')),
    h('p', {}, h('b', {}, 'Bí kíp chưa qua Cửa ải: '), chuaThuoc.length ? chuaThuoc.join(', ') : 'không có'),
    diemThap.length ? h('p', {}, h('b', {}, 'Qua nhưng điểm Cửa ải thấp: '), diemThap.join(' · ')) : null);
}

export function trangTienDo(veBanDo) {
  manHinh(
    h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: veBanDo }, '←'),
      h('div', { class: 'tieu-de' }, '👨‍👩‍👧 Tiến độ gia đình', h('small', {}, 'Chỉ nằm trong máy này, không gửi đi đâu'))),
    ...HO_SO.map(khoiHoSo));
}
