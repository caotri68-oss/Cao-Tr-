// Vụ án hôm nay: ôn lại các từ và bí kíp đến hạn (lịch 1 · 3 · 7 · 14 · 30 ngày).
import { h, manHinh, tronMang, chon } from './dom.js';
import { D, TRUYEN, tatCaTuChinh, biKip } from './du-lieu.js';
import { hoSo, tuDenHan, biKipDenHan, xongVuAn } from './luu-tien-do.js';
import { chayLuot, qNgheDien, qCauViDu, qLuat, mucTuChinh } from './cau-hoi.js';
import { canhTruyen } from './chung.js';
import { cuNoi } from './nhan-vat.js';
import { PHO } from './pho.js';

const TOI_DA = 15;

// Danh sách từ đến hạn, ưu tiên từ hay sai.
export function tuCanOn() {
  const hs = hoSo();
  const tatCa = tatCaTuChinh();
  return tuDenHan()
    .map((cz) => tatCa.find((t) => t.cz === cz))
    .filter(Boolean)
    .sort((a, b) => (hs.tu[b.cz].sai - hs.tu[a.cz].sai) || (hs.tu[a.cz].han - hs.tu[b.cz].han))
    .slice(0, TOI_DA);
}

export function vuAnHomNay(veBanDo) {
  const hs = hoSo();
  const tu = tuCanOn();
  const bk = tronMang(biKipDenHan()).slice(0, 2);
  if (!tu.length && !bk.length) {
    manHinh(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: veBanDo }, '←'),
        h('div', { class: 'tieu-de' }, 'Vụ án hôm nay')),
      cuNoi(h('b', {}, 'Hôm nay chưa có vụ án nào cần phá!'), h('span', {}, 'Mọi từ đều chưa đến hạn ôn. Em cứ đi tiếp các phố mới nhé.')),
      h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: veBanDo }, 'Về bản đồ'));
    return;
  }
  const cauHoi = tu.map((t, i) => {
    const nhom = D.nhom.find((n) => n.tu.some((x) => x.cz === t.cz));
    const cfg = PHO[nhom.chu];
    const opt = { dai: cfg.dai, luat: cfg.luat };
    const tt = { ...t, nhom: nhom.chu };
    return i % 3 === 2 ? (qCauViDu(tt, opt) || qNgheDien(mucTuChinh(tt), opt)) : qNgheDien(mucTuChinh(tt), opt);
  });
  for (const ma of bk) cauHoi.push(qLuat(ma, chon(biKip(ma).cau_hoi_thuoc)));
  chayLuot({
    tieuDe: 'Vụ án hôm nay', phuDe: `${tu.length} từ + ${bk.length} bí kíp cần ôn`,
    cauHoi: tronMang(cauHoi), cheDo: 'hoc', thoat: veBanDo,
    khiXong: ({ dung, tong }) => {
      const chuoi = xongVuAn();
      const ra = [
        h('div', { class: 'the ket-qua' },
          h('h2', {}, 'Vụ án đã khép lại!'),
          h('p', {}, `Đúng ${dung}/${tong} câu ngay lần đầu.`),
          h('p', { class: 'goi-y' }, chuoi > 1 ? `Em đã phá án ${chuoi} ngày liên tiếp!` : 'Mai quay lại để phá án tiếp, đủ 7 ngày liên tiếp sẽ mở một chương truyện bí mật.')),
      ];
      const xong = () => manHinh(...ra, h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: veBanDo }, 'Về bản đồ'));
      if (chuoi === 7) canhTruyen(TRUYEN.vu_an?.chuong7 || [], { tieuDe: 'Chương bí mật', khiXong: xong });
      else xong();
    },
  });
}
