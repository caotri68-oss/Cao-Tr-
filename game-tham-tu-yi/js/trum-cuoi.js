// Trùm cuối: Kẻ trộm giữ chữ Y cuối cùng. Phần 1 là 21 câu, phần 2 là chính tả 5 câu. Qua cả hai thì nhận Bằng thám tử.
import { h, manHinh, tronMang, chon } from './dom.js';
import { D, TRUYEN } from './du-lieu.js';
import { hoSo, luu } from './luu-tien-do.js';
import { loiThoai, hinhHoSo, hinh } from './nhan-vat.js';
import { chuong } from './am-thanh.js';
import { qQuiz, qCapNghe, qNgheDien, qChinhTa, mucTuChinh } from './cau-hoi.js';
import { canhTruyen, cuaAi } from './chung.js';
import { PHO } from './pho.js';

export function daQuaBayPho() {
  const hs = hoSo();
  return D.nhom.every((n) => hs.pho[n.chu]?.qua);
}

const CAN_PHAN1 = 17;  // 17/21 (≈ 80%)
const CAN_PHAN2 = 4;   // 4/5 (80%)

export function vaoTruCuoi(veBanDo) {
  canhTruyen(TRUYEN.cuoi?.vao || [], {
    tieuDe: 'Trùm cuối',
    khiXong: () => phan1(veBanDo),
  });
}

function phan1(veBanDo) {
  const taoCauHoi = () => {
    const quiz = D.quiz_cuoi.map((q) => qQuiz(q));
    const cap = tronMang(D.cap_de_nham).map(qCapNghe);
    const moiPho = D.nhom.map((n) => {
      const t = { ...chon(n.tu), nhom: n.chu };
      return qNgheDien(mucTuChinh(t), { dai: PHO[n.chu].dai, luat: PHO[n.chu].luat });
    });
    return [...quiz, ...cap, ...moiPho];
  };
  cuaAi({
    tieuDe: 'Trùm cuối · Phần 1', taoCauHoi, can: CAN_PHAN1, dsBiKip: ['BK1', 'BK2', 'BK3'], thoat: veBanDo,
    khiQua: ({ dung, tong }) => {
      hoSo().cuoi.diem1 = dung; luu();
      manHinh(
        h('div', { class: 'the ket-qua' }, h('h2', {}, `Phần 1: đúng ${dung}/${tong}`), h('p', {}, 'Kẻ trộm lùi lại! Còn một thử thách cuối: chính tả.')),
        loiThoai({ ai: 'cu', vn: 'Phần chính tả: em nghe câu, rồi gõ từ còn thiếu bằng bàn phím có dấu. Chỉ chấm y và i thôi!' }),
        h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: () => phan2(veBanDo) }, 'Làm chính tả ▸'));
    },
  });
}

function phan2(veBanDo) {
  const taoCauHoi = () => {
    const tatCa = D.nhom.flatMap((n) => n.tu.map((t) => ({ ...t, nhom: n.chu })));
    const ds = [];
    for (const t of tronMang(tatCa)) {
      const q = qChinhTa(t, { luat: PHO[t.nhom].luat });
      if (q) ds.push(q);
      if (ds.length === 5) break;
    }
    return ds;
  };
  cuaAi({
    tieuDe: 'Trùm cuối · Chính tả', taoCauHoi, can: CAN_PHAN2, dsBiKip: ['BK3', 'BK4'], thoat: veBanDo,
    khiQua: ({ dung, tong }) => {
      const hs = hoSo();
      hs.cuoi = { ...hs.cuoi, qua: true, diem: (hs.cuoi.diem1 || 0) + dung, ngay: new Date().toLocaleDateString('vi-VN') };
      luu(); chuong(true);
      canhTruyen(TRUYEN.cuoi?.ket || [], { tieuDe: 'Chữ Y đã về!', khiXong: () => trangBang(veBanDo) });
    },
  });
}

export function trangBang(veBanDo) {
  const hs = hoSo();
  manHinh(
    h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: veBanDo }, '←'),
      h('div', { class: 'tieu-de' }, 'Bằng thám tử')),
    h('div', { class: 'the bang-tham-tu' },
      h('div', { class: 'hinh-to' }, hinhHoSo(hs.id, 'hinh-to')),
      h('div', { class: 'ten-bang' }, 'BẰNG THÁM TỬ Y/I'),
      h('p', {}, 'Cấp cho'),
      h('h2', {}, hs.ten),
      h('p', {}, 'đã trả đủ chữ Y về chợ Chữ và đánh bại Kẻ trộm.'),
      h('div', { class: 'goi-y' }, `Ngày ${hs.cuoi.ngay || ''}`),
      h('div', { class: 'hang-nut' }, hinh('cu', 'hinh'), h('span', { class: 'goi-y' }, 'Chữ ký: cú Sýček'))),
    h('p', { class: 'goi-y' }, 'Chụp màn hình để lưu lại hoặc in ra nhé.'),
    h('button', { class: 'nut nut-rong', type: 'button', onclick: veBanDo }, 'Về bản đồ'));
}

