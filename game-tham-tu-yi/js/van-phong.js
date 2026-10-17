// Màn 0: Văn phòng thám tử, 3 phòng luật. Qua phòng 3 thì mở phố B.
import { h, manHinh, tronMang, toast } from './dom.js';
import { biKip, TRUYEN } from './du-lieu.js';
import { hoSo, luu, thuocBiKip } from './luu-tien-do.js';
import { czChu } from './dich.js';
import { nutNghe, khoiDocTheo, chuong } from './am-thanh.js';
import { cuNoi, loiThoai } from './nhan-vat.js';
import { chayLuot, qLuat, qChuCai, qCauNhoThieu, qNgheDien } from './cau-hoi.js';
import { manMoBiKip, moSoBiKipNhanh } from './so-bi-kip.js';
import { canhTruyen, cuaAi } from './chung.js';

const PHONG = {
  1: { ten: 'Phòng Âm thanh', biKip: ['BK0'] },
  2: { ten: 'Phòng Cứng – Mềm', biKip: ['BK1', 'BK2'] },
  3: { ten: 'Phòng Tám chữ lưỡng tính', biKip: ['BK3'] },
};

export function vaoVanPhong(veBanDo) {
  const hs = hoSo();
  if (!hs.man0.daXemMoDau) {
    canhTruyen(TRUYEN.mo_dau || [], {
      tieuDe: 'Chợ Chữ mất chữ Y!',
      khiXong: () => { hs.man0.daXemMoDau = true; luu(); vaoVanPhong(veBanDo); },
    });
    return;
  }
  if (hs.man0.phong >= 3) { phongChon(veBanDo); return; }
  vaoPhong(hs.man0.phong + 1, veBanDo);
}

// Đã qua cả 3 phòng: cho chọn chơi lại phòng nào.
function phongChon(veBanDo) {
  manHinh(
    h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: veBanDo }, '←'),
      h('div', { class: 'tieu-de' }, 'Văn phòng thám tử', h('small', {}, 'Đã qua cả 3 phòng'))),
    ...[1, 2, 3].map((p) => h('button', { class: 'tram da-qua', type: 'button', onclick: () => vaoPhong(p, veBanDo) },
      h('span', { class: 'huy-hieu' }, String(p)),
      h('span', { class: 'noi-dung' }, h('b', {}, PHONG[p].ten), h('span', {}, 'Chơi lại')))));
}

function vaoPhong(so, veBanDo) {
  const ph = PHONG[so];
  canhTruyen(TRUYEN.phong?.[so] || [], {
    tieuDe: `Văn phòng · ${ph.ten}`,
    khiXong: () => manMoBiKip(ph.biKip, {
      tieuDe: ph.ten,
      khiXong: () => luyenPhong(so, veBanDo),
    }),
  });
}

function luyenPhong(so, veBanDo) {
  const sauLuyen = () => cuaAiPhong(so, veBanDo);
  if (so === 1) thuThaoTac(sauLuyen);
  if (so === 2) {
    const cung = tronMang(['h', 'ch', 'k', 'r', 'd', 't', 'n']).slice(0, 4);
    const mem = tronMang(['ž', 'š', 'č', 'ř', 'c', 'j', 'ď', 'ť', 'ň']).slice(0, 4);
    const luong = tronMang(['b', 'f', 'l', 'm', 'p', 's', 'v', 'z']).slice(0, 4);
    chayLuot({
      tieuDe: 'Chữ cái rơi vào giỏ', phuDe: 'Cứng thích y · Mềm thích i · Lưỡng tính phải soi bảng',
      cauHoi: tronMang([...cung, ...mem, ...luong]).map(qChuCai),
      cheDo: 'hoc', moSoBiKip: moSoBiKipNhanh, thoat: veBanDo, khiXong: sauLuyen,
    });
  }
  if (so === 3) xepCauNho(sauLuyen, veBanDo);
}

// Phòng 1: thử từng thao tác một lần.
function thuThaoTac(xong) {
  const viec = {};
  const nutTiep = h('button', { class: 'nut nut-chinh nut-rong', type: 'button', disabled: true, onclick: xong }, 'Vào Cửa ải phòng 1 ▸');
  const danhDau = (k) => {
    if (viec[k]?.xong) return;
    viec[k].xong = true;
    viec[k].dau.textContent = '✅';
    chuong(true);
    if (Object.values(viec).every((v) => v.xong)) nutTiep.disabled = false;
  };
  const dong = (k, moTa, ...noiDung) => {
    const dau = h('span', { 'aria-hidden': 'true' }, '⬜');
    viec[k] = { xong: false, dau };
    return h('div', { class: 'the' }, h('p', {}, dau, ' ', h('b', {}, moTa)), ...noiDung);
  };

  const nghe = nutNghe('myš');
  nghe.addEventListener('click', () => danhDau('nghe'));
  const tu = czChu('mýt');
  tu.addEventListener('click', () => danhDau('dich'));
  const yi = h('div', {});
  const q = qNgheDien({ cz: 'myš', nghia: 'chuột nhắt', emoji: '🐭', loai: 'y', nhom: 'M' }, { luat: 'BK0' });
  q.ve(yi, ({ dung }) => {
    danhDau('yi');
    yi.append(h('p', { class: 'goi-y' }, dung ? 'Đúng: myš viết y. Em sẽ học vì sao ở phòng sau!' : 'myš viết y. Em sẽ học vì sao ở phòng sau!'));
  });
  const so = h('button', { class: 'nut', type: 'button', onclick: () => { moSoBiKipNhanh(); danhDau('so'); } }, '📜 Mở Sổ bí kíp');

  manHinh(
    h('div', { class: 'thanh-tren' }, h('div', { class: 'tieu-de' }, 'Thử các nút', h('small', {}, 'Mỗi nút thử một lần'))),
    cuNoi('Thám tử cần biết dùng đồ nghề. Em thử từng món nhé!'),
    dong('nghe', 'Chạm 🔊 để nghe chữ Séc', h('div', { class: 'hang-nut', style: 'align-items:center' }, h('span', { class: 'tu-to', lang: 'cs' }, 'myš'), nghe)),
    dong('dich', 'Không hiểu chữ nào thì chạm vào chữ đó để xem nghĩa', h('div', { class: 'tu-to', lang: 'cs' }, tu)),
    dong('doc', 'Chạm 🎤 để đọc theo, rồi nghe lại giọng mình', khoiDocTheo('myš', () => danhDau('doc'))),
    dong('yi', 'Chạm chữ y hoặc i để điền chỗ trống', yi),
    dong('so', 'Sổ bí kíp: nơi giữ mọi bí kíp em đã mở, xem lại lúc nào cũng được', so),
    nutTiep);
}

// Phòng 3: xếp lại câu nhớ theo đúng thứ tự.
function xepCauNho(xong, veBanDo) {
  const cau = ['Bố', 'Fi', 'Lên', 'Mây', 'Phóng', 'Sao', 'Vào', 'Zũ trụ'];
  let k = 0;
  const dich = h('div', { class: 'cau-nho-dich', 'aria-live': 'polite' });
  const nutTiep = h('button', { class: 'nut nut-chinh nut-rong', type: 'button', hidden: true, onclick: xong }, 'Vào Cửa ải phòng 3 ▸');
  const kho = h('div', { class: 'hang-nut' });
  for (const c of tronMang(cau)) {
    const b = h('button', { class: 'nut', type: 'button' }, c);
    b.onclick = () => {
      if (c === cau[k]) {
        k++;
        b.disabled = true;
        dich.append(h('span', {}, h('b', {}, c[0]), c.slice(1)));
        chuong(true);
        if (k === cau.length) { nutTiep.hidden = false; toast('Bố Fi Lên Mây Phóng Sao Vào Zũ trụ!'); }
      } else {
        chuong(false);
        b.classList.add('lac'); setTimeout(() => b.classList.remove('lac'), 350);
      }
    };
    kho.append(b);
  }
  manHinh(
    h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: veBanDo }, '←'),
      h('div', { class: 'tieu-de' }, 'Xếp câu nhớ', h('small', {}, 'Chữ cái đầu mỗi từ là một chữ lưỡng tính'))),
    loiThoai({ ai: 'anhduong', vn: 'Bố Fi Lên Mây Phóng Sao Vào Zũ trụ! Em xếp lại theo đúng thứ tự nhé.' }),
    dich, kho, nutTiep);
}

function cuaAiPhong(so, veBanDo) {
  const ph = PHONG[so];
  const taoCauHoi = () => {
    if (so === 1) return tronMang(biKip('BK0').cau_hoi_thuoc).map((q) => qLuat('BK0', q));
    if (so === 2) {
      const a = tronMang(biKip('BK1').cau_hoi_thuoc).slice(0, 3).map((q) => qLuat('BK1', q));
      const b = tronMang(biKip('BK2').cau_hoi_thuoc).slice(0, 2).map((q) => qLuat('BK2', q));
      return tronMang([...a, ...b]);
    }
    return tronMang([...tronMang(biKip('BK3').cau_hoi_thuoc).slice(0, 4).map((q) => qLuat('BK3', q)), qCauNhoThieu()]);
  };
  cuaAi({
    tieuDe: `Cửa ải ${ph.ten}`, taoCauHoi, can: 4, dsBiKip: ph.biKip, thoat: veBanDo,
    khiQua: ({ dung, tong }) => {
      const hs = hoSo();
      ph.biKip.forEach(thuocBiKip);
      if (hs.man0.phong < so) { hs.man0.phong = so; luu(); }
      const tiep = so < 3 ? () => vaoPhong(so + 1, veBanDo)
        : () => canhTruyen(TRUYEN.phong?.xong || [], { tieuDe: 'Qua Văn phòng thám tử!', khiXong: veBanDo });
      manHinh(
        h('div', { class: 'the ket-qua' },
          h('div', { class: 'con-dau' }, so === 3 ? '✓' : String(so)),
          h('h2', {}, `Qua ${ph.ten}!`),
          h('p', {}, `Đúng ${dung}/${tong} câu. Bí kíp ${ph.biKip.join(', ')} được đóng dấu “Đã thuộc ✓”.`)),
        h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: tiep }, so < 3 ? `Sang phòng ${so + 1} ▸` : 'Tiếp ▸'),
        h('button', { class: 'nut nut-rong', type: 'button', onclick: veBanDo }, 'Về bản đồ'));
    },
  });
}
