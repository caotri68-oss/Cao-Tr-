// Các dạng câu hỏi và bộ chạy một lượt câu hỏi.
import { h, manHinh, tronMang, chon } from './dom.js';
import { D, TRUYEN, biKip, viTriGoc, laY, hoHangHoiDuoc, timTrongCau, traTuDung } from './du-lieu.js';
import { czChu, czCau, toMau } from './dich.js';
import { doc, nutNghe, chuong, coGiongSec } from './am-thanh.js';
import { ghiTu } from './luu-tien-do.js';
import { cuNoi } from './nhan-vat.js';

// ——— Công cụ chung ———

// Đổi y↔i ở vị trí p (giữ dài/ngắn).
export function doiYI(cz, p) {
  const doi = { y: 'i', ý: 'í', i: 'y', í: 'ý', Y: 'I', Ý: 'Í', I: 'Y', Í: 'Ý' };
  return cz.slice(0, p) + (doi[cz[p]] || cz[p]) + cz.slice(p + 1);
}

function nutLuaChon(nhan, lop, khiChon) {
  return h('button', { class: 'nut ' + (lop || ''), type: 'button', onclick: khiChon }, nhan);
}

// Bàn chữ Y / I (thêm Ý / Í khi dai = true). Trả về nút theo giá trị.
function banChu(dai, khiChon) {
  const ds = dai ? ['y', 'ý', 'i', 'í'] : ['y', 'i'];
  const khoi = h('div', { class: 'lua-chon' });
  const nut = {};
  for (const c of ds) {
    nut[c] = nutLuaChon(c, 'nut-chu ' + (laY(c) ? 'chu-y' : 'chu-i'), () => khiChon(c));
    khoi.append(nut[c]);
  }
  return { khoi, nut };
}

function khoaCacNut(khung) { khung.querySelectorAll('.lua-chon .nut, .gio .nut').forEach((b) => { b.disabled = true; }); }

// Một mục để hỏi chính tả: { cz, nghia, emoji, loai: 'y'|'i', goc?: từ gốc, nhom }
export function mucTuChinh(t) { return { cz: t.cz, nghia: t.nghia, emoji: t.emoji, loai: 'y', nhom: t.nhom }; }
export function mucTuBay(b, nhom) { return { cz: b.cz, nghia: b.nghia, emoji: '', loai: 'i', nhom }; }
export function mucHoHang(f, t) { return { cz: f.cz, nghia: f.nghia, emoji: '', loai: 'y', goc: t.cz, nhom: t.nhom }; }

function giaiThichChinhTa(muc) {
  if (muc.loai === 'y') {
    return muc.goc
      ? [h('b', {}, muc.cz), ' là con cháu của ', h('b', {}, muc.goc), ' (có trong bảng) → viết y.']
      : [h('b', {}, muc.cz), ` có trong bảng chữ ${muc.nhom} → viết y.`];
  }
  return [h('b', {}, muc.cz), ' không có trong bảng → viết i.'];
}

// ——— 1. Nghe – điền y/i ———
export function qNgheDien(muc, { dai = false, luat = 'BK4' } = {}) {
  const p = viTriGoc(muc.cz, muc.loai);
  const that = muc.cz[p].toLowerCase();
  return {
    loai: 'nghe_dien', tu: muc.cz, luat, meoNhom: muc.nhom, dapAn: dai ? that : (laY(that) ? 'y' : 'i'),
    ve(khung, xong) {
      const tuKhung = h('div', { class: 'tu-to', lang: 'cs' }, czChu(muc.cz, { che: p }));
      const { khoi, nut } = banChu(dai, (c) => {
        const dung = dai ? c === that : laY(c) === laY(that);
        khoaCacNut(khung);
        nut[c].classList.add(dung ? 'dung' : 'sai');
        if (!dung) (nut[that] || nut[laY(that) ? 'y' : 'i']).classList.add('dung');
        tuKhung.replaceChildren(czChu(muc.cz, { mau: { loai: muc.loai, viTri: p } }));
        doc(muc.cz, { tuDong: true });
        xong({ dung, giaiThich: giaiThichChinhTa(muc) });
      });
      khung.append(
        h('p', { class: 'goi-y' }, coGiongSec() ? 'Nghe rồi điền chữ còn thiếu:' : 'Nhìn nghĩa rồi điền chữ còn thiếu:'),
        h('div', { class: 'de-bai' },
          muc.emoji ? h('div', { class: 'emoji-to' }, muc.emoji) : null,
          tuKhung,
          muc.nghia ? h('div', { class: 'nghia' }, muc.nghia) : null,
          h('div', { class: 'hang-nut' }, nutNghe(muc.cz))),
        khoi);
      if (coGiongSec()) setTimeout(() => doc(muc.cz, { tuDong: true }), 300);
    },
  };
}

// ——— 2. Từ cùng nhà ———
export function qCungNha(t, nhom, { luat = 'BK4' } = {}) {
  const hh = hoHangHoiDuoc(t);
  if (!hh.length) return null;
  const f = chon(hh);
  const bay = tronMang(nhom.nghe_giong_viet_i).slice(0, 2);
  const ds = tronMang([{ cz: f.cz, dung: true }, ...bay.map((b) => ({ cz: b.cz, dung: false }))]);
  return {
    loai: 'cung_nha', tu: t.cz, luat, meoNhom: nhom.chu, dapAn: f.cz,
    ve(khung, xong) {
      const khoi = h('div', { class: 'lua-chon' });
      const nut = ds.map((o) => {
        const b = nutLuaChon(h('span', { lang: 'cs' }, o.cz), '', () => {
          khoaCacNut(khung);
          b.classList.add(o.dung ? 'dung' : 'sai');
          nut.forEach((x, i) => { if (ds[i].dung) x.classList.add('dung'); });
          xong({ dung: o.dung, giaiThich: [h('b', {}, f.cz), ` (${f.nghia}) cùng nhà với `, h('b', {}, t.cz), ' nên cũng viết y.'] });
        });
        khoi.append(b);
        return b;
      });
      khung.append(
        h('p', { class: 'goi-y' }, 'Tìm họ hàng (cùng nhà, cũng viết y):'),
        h('div', { class: 'de-bai' },
          h('div', { class: 'emoji-to' }, t.emoji),
          h('div', { class: 'tu-to', lang: 'cs' }, czChu(t.cz)),
          h('div', { class: 'nghia' }, t.nghia),
          h('p', {}, 'Từ nào là con cháu của từ này?')),
        khoi);
    },
  };
}

// ——— 3. Bẫy nghe giống: cho nghĩa, chọn cách viết đúng ———
export function qBayNgheGiong(muc, { luat = 'BK4' } = {}) {
  const p = viTriGoc(muc.cz, muc.loai);
  const sai = doiYI(muc.cz, p);
  // Nếu cách viết kia cũng là một từ có thật (být / bít) thì giải thích nghĩa của nó.
  const tuKia = traTuDung(sai);
  const doiThat = tuKia && tuKia.nghia ? sai : null;
  const ds = tronMang([{ cz: muc.cz, dung: true }, { cz: sai, dung: false }]);
  return {
    loai: 'bay', tu: muc.cz, luat, meoNhom: muc.nhom, dapAn: muc.cz,
    ve(khung, xong) {
      const khoi = h('div', { class: 'lua-chon' });
      const nut = ds.map((o) => {
        const b = nutLuaChon(h('span', { lang: 'cs', class: 'tu-to', style: 'font-size:1.8rem' }, o.cz), '', () => {
          khoaCacNut(khung);
          b.classList.add(o.dung ? 'dung' : 'sai');
          nut.forEach((x, i) => { if (ds[i].dung) x.classList.add('dung'); });
          doc(muc.cz, { tuDong: true });
          const them = doiThat ? [' Còn ', h('b', {}, doiThat), ' là một từ khác, nghĩa là “', tuKia.nghia, '”.'] : [];
          xong({ dung: o.dung, giaiThich: [...giaiThichChinhTa(muc), ...them] });
        });
        khoi.append(b);
        return b;
      });
      khung.append(
        h('p', { class: 'goi-y' }, 'Nghe giống hệt nhau! Chọn cách viết đúng nghĩa:'),
        h('div', { class: 'de-bai' },
          muc.emoji ? h('div', { class: 'emoji-to' }, muc.emoji) : null,
          h('div', { class: 'tu-to', style: 'font-size:1.6rem' }, '“' + muc.nghia + '”'),
          h('div', { class: 'hang-nut' }, nutNghe(muc.cz))),
        khoi);
    },
  };
}

// ——— 4. Ghép nghĩa ———
export function qGhepNghia(dsTu, { luat = 'BK4' } = {}) {
  const tu = dsTu.slice(0, 4);
  return {
    loai: 'ghep', tu: null, luat, dapAn: tu.map((t) => [t.cz, t.nghia]),
    ve(khung, xong) {
      let dangChon = null; let saiLan = 0; let conLai = tu.length;
      const cotTrai = h('div', { class: 'lua-chon', style: 'grid-template-columns:1fr' });
      const cotPhai = h('div', { class: 'lua-chon', style: 'grid-template-columns:1fr' });
      const nutTu = new Map();
      for (const t of tronMang(tu)) {
        const b = nutLuaChon(h('span', { lang: 'cs' }, toMau(t.cz)), '', () => {
          if (b.classList.contains('da-ghep')) return;
          nutTu.forEach((x) => x.classList.remove('dang-chon'));
          dangChon = t; b.classList.add('dang-chon');
        });
        nutTu.set(t.cz, b); cotTrai.append(b);
      }
      for (const t of tronMang(tu)) {
        const b = nutLuaChon(t.nghia, '', () => {
          if (!dangChon || b.classList.contains('da-ghep')) return;
          const nt = nutTu.get(dangChon.cz);
          if (dangChon.cz === t.cz) {
            doc(t.cz, { tuDong: true });
            nt.classList.remove('dang-chon'); nt.classList.add('da-ghep'); b.classList.add('da-ghep');
            dangChon = null; conLai--;
            if (conLai === 0) xong({ dung: saiLan === 0, giaiThich: [saiLan ? `Ghép xong, nhầm ${saiLan} lần.` : 'Ghép đúng hết ngay lần đầu!'] });
          } else {
            saiLan++; chuong(false);
            b.classList.add('lac'); setTimeout(() => b.classList.remove('lac'), 350);
          }
        });
        cotPhai.append(b);
      }
      khung.append(
        h('p', { class: 'goi-y' }, 'Chạm một từ Séc, rồi chạm nghĩa của nó:'),
        h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:10px' }, cotTrai, cotPhai));
    },
  };
}

// ——— 5. Câu ví dụ: điền y/i vào câu ———
export function qCauViDu(t, { dai = false, luat = 'BK4' } = {}) {
  const vt = timTrongCau(t.vi_du.cz, t.cz);
  if (!vt) return null;
  const chuTrongCau = t.vi_du.cz.split(' ')[vt.chiSo];
  const that = chuTrongCau[vt.viTri];
  return {
    loai: 'cau', tu: t.cz, luat, meoNhom: t.nhom, dapAn: dai ? that.toLowerCase() : (laY(that) ? 'y' : 'i'),
    ve(khung, xong) {
      const cauKhung = h('div', { class: 'tu-to', style: 'font-size:1.5rem;line-height:1.5' }, czCau(t.vi_du.cz, { vn: t.vi_du.vn, che: vt }));
      const { khoi, nut } = banChu(dai, (c) => {
        const dung = dai ? c === that.toLowerCase() : laY(c) === laY(that);
        khoaCacNut(khung);
        nut[c].classList.add(dung ? 'dung' : 'sai');
        cauKhung.replaceChildren(czCau(t.vi_du.cz, { vn: t.vi_du.vn }));
        doc(t.vi_du.cz, { tuDong: true });
        xong({ dung, giaiThich: [h('b', {}, chuTrongCau.replace(/[.,!?]/g, '')), ' là dạng của ', h('b', {}, t.cz), ' (có trong bảng) → viết y.'] });
      });
      khung.append(
        h('p', { class: 'goi-y' }, 'Điền chữ còn thiếu vào câu:'),
        h('div', { class: 'de-bai' }, cauKhung, h('div', { class: 'nghia' }, t.vi_du.vn), nutNghe(t.vi_du.cz)),
        khoi);
    },
  };
}

// ——— 6. Ba bước thám tử (BK4) ———
const CUNG = 'hkr';           // chữ cứng dùng để hỏi (bỏ d, t, n vì có cách đọc riêng)
const MEM = 'žščřcj';

function nhomChuCai(c) {
  c = c.toLowerCase();
  if ('bflmpsvz'.includes(c)) return 'luong';
  if (CUNG.includes(c) || 'dtn'.includes(c)) return 'cung';
  if (MEM.includes(c) || 'ďťň'.includes(c)) return 'mem';
  return null;
}

// Ví dụ chữ cứng / mềm lấy từ bí kíp BK1, BK2: vị trí y/i đầu tiên sau h, k, r hoặc chữ mềm.
export function viDuCungMem() {
  const kq = [];
  for (const ma of ['BK1', 'BK2']) {
    for (const cz of biKip(ma).vi_du) {
      const s = cz.toLowerCase();
      for (let i = 1; i < s.length; i++) {
        if ('yýií'.includes(s[i]) && (CUNG.includes(s[i - 1]) || MEM.includes(s[i - 1]))) {
          kq.push({ cz, p: i, nhomChu: CUNG.includes(s[i - 1]) ? 'cung' : 'mem' });
          break;
        }
      }
    }
  }
  return kq;
}

export function qBaBuoc(muc) {
  // muc: { cz, nghia, loai, p, nhomChu: 'luong'|'cung'|'mem', goc? }
  const p = muc.p ?? viTriGoc(muc.cz, muc.loai);
  const chuTruoc = muc.cz[p - 1];
  const nhom = muc.nhomChu || nhomChuCai(chuTruoc);
  const vietY = nhom === 'cung' || (nhom === 'luong' && muc.loai === 'y');
  const tenNhomCau = { luong: 'Lưỡng tính', cung: 'Cứng', mem: 'Mềm' }[nhom];
  return {
    dapAn: nhom === 'luong' ? [tenNhomCau, muc.loai === 'y' ? 'Có' : 'Không', vietY ? 'y' : 'i'] : [tenNhomCau, vietY ? 'y' : 'i'],
    loai: 'ba_buoc', tu: muc.loai ? muc.cz : null, luat: nhom === 'luong' ? 'BK4' : nhom === 'cung' ? 'BK1' : 'BK2', meoNhom: muc.nhom,
    ve(khung, xong) {
      const tuKhung = h('div', { class: 'tu-to', lang: 'cs' }, czChu(muc.cz, { che: p }));
      const buoc = h('div', { style: 'display:flex;flex-direction:column;gap:10px' });
      const giai = [];
      const ketThuc = (dung) => {
        tuKhung.replaceChildren(czChu(muc.cz, { mau: { loai: vietY ? 'y' : 'i', viTri: p } }));
        doc(muc.cz, { tuDong: true });
        xong({ dung, giaiThich: giai });
      };
      const hoi = (cauHoi, luaChon, dapAn, sau) => {
        const khoi = h('div', { class: 'lua-chon' });
        const nut = luaChon.map((lc) => {
          const b = nutLuaChon(lc, '', () => {
            khoi.querySelectorAll('.nut').forEach((x) => { x.disabled = true; });
            const dung = lc === dapAn;
            b.classList.add(dung ? 'dung' : 'sai');
            if (!dung) nut[luaChon.indexOf(dapAn)].classList.add('dung');
            if (dung) chuong(true);
            if (dung && sau) sau(); else ketThuc(dung);
          });
          khoi.append(b);
          return b;
        });
        buoc.append(h('p', {}, h('b', {}, cauHoi)), khoi);
      };
      const tenNhom = { luong: 'Lưỡng tính', cung: 'Cứng', mem: 'Mềm' };
      giai.push(`Chữ trước ô trống là “${chuTruoc}”: chữ ${tenNhom[nhom].toLowerCase()}. `);
      const buocCuoi = () => {
        if (nhom === 'luong') giai.push(muc.loai === 'y' ? 'Từ này có trong bảng (hoặc là con cháu) → y.' : 'Từ này không có trong bảng → i.');
        else giai.push(nhom === 'cung' ? 'Cứng đi với y cứng → y.' : 'Mềm đi với i mềm → i.');
        hoi('Bước cuối: vậy viết gì?', ['y', 'i'], vietY ? 'y' : 'i', null);
      };
      hoi(`Bước 1: chữ đứng trước ô trống là “${chuTruoc}”. Chữ này là chữ gì?`,
        ['Cứng', 'Mềm', 'Lưỡng tính'], tenNhom[nhom], () => {
          if (nhom === 'luong') {
            hoi('Bước 2: từ này có trong bảng, hoặc là con cháu của từ trong bảng không?', ['Có', 'Không'], muc.loai === 'y' ? 'Có' : 'Không', buocCuoi);
          } else buocCuoi();
        });
      khung.append(
        h('p', { class: 'goi-y' }, 'Thám tử phá án theo từng bước:'),
        h('div', { class: 'de-bai' }, tuKhung, muc.nghia ? h('div', { class: 'nghia' }, muc.nghia) : null, nutNghe(muc.cz.replace('_', 'i'))),
        buoc);
    },
  };
}

// ——— Câu hỏi về luật (cau_hoi_thuoc) ———
export function qLuat(ma, q) {
  return {
    loai: 'luat', tu: null, luat: ma, dapAn: q.dap_an,
    ve(khung, xong) {
      const ds = tronMang(q.lua_chon);
      const khoi = h('div', { class: 'lua-chon' });
      const nut = ds.map((lc) => {
        const b = nutLuaChon(lc, /^[yýií]$/.test(lc) ? 'nut-chu ' + (laY(lc) ? 'chu-y' : 'chu-i') : '', () => {
          khoaCacNut(khung);
          const dung = lc === q.dap_an;
          b.classList.add(dung ? 'dung' : 'sai');
          if (!dung) nut[ds.indexOf(q.dap_an)].classList.add('dung');
          xong({ dung, giaiThich: ['Đáp án: ', h('b', {}, q.dap_an)] });
        });
        khoi.append(b);
        return b;
      });
      const deBai = q.hoi.includes('_') ? czCau(q.hoi) : q.hoi;
      khung.append(
        h('p', { class: 'goi-y' }, 'Câu hỏi bí kíp ' + ma + ':'),
        h('div', { class: 'de-bai' }, h('h3', {}, deBai)),
        khoi);
    },
  };
}

// ——— Chữ cái rơi vào giỏ (phòng 2) ———
export function qChuCai(chu) {
  const nhom = nhomChuCai(chu === 'ch' ? 'h' : chu);
  return {
    dapAn: { cung: 'Cứng', mem: 'Mềm', luong: 'Lưỡng tính' }[nhom],
    loai: 'chu_cai', tu: null, luat: nhom === 'cung' ? 'BK1' : nhom === 'mem' ? 'BK2' : 'BK3',
    ve(khung, xong) {
      const gio = h('div', { class: 'gio' });
      const ds = [['cung', 'Cứng', 'y'], ['mem', 'Mềm', 'i'], ['luong', 'Lưỡng tính', '?']];
      const nut = {};
      for (const [k, ten, chuNho] of ds) {
        nut[k] = nutLuaChon([h('b', {}, ten), h('span', {}, 'thích ' + chuNho)], '', () => {
          khoaCacNut(khung);
          const dung = k === nhom;
          nut[k].classList.add(dung ? 'dung' : 'sai');
          if (!dung) nut[nhom].classList.add('dung');
          xong({ dung, giaiThich: [h('b', {}, chu), ' là chữ ' + { cung: 'cứng', mem: 'mềm', luong: 'lưỡng tính' }[nhom] + '.'] });
        });
        gio.append(nut[k]);
      }
      khung.append(
        h('p', { class: 'goi-y' }, 'Chữ này rơi vào giỏ nào?'),
        h('div', { class: 'chu-roi', lang: 'cs' }, chu),
        gio);
    },
  };
}

// ——— Câu nhớ thiếu một chữ (phòng 3) ———
export function qCauNhoThieu() {
  const cau = ['Bố', 'Fi', 'Lên', 'Mây', 'Phóng', 'Sao', 'Vào', 'Zũ'];
  const k = Math.floor(Math.random() * cau.length);
  const nhieu = tronMang(['Hoa', 'Kẹo', 'Rồng', 'Trăng', 'Nắng', 'Gió', 'Chim', 'Cá']).slice(0, 2);
  const ds = tronMang([cau[k], ...nhieu]);
  return {
    loai: 'cau_nho', tu: null, luat: 'BK3', dapAn: cau[k],
    ve(khung, xong) {
      const khoi = h('div', { class: 'lua-chon' });
      const nut = ds.map((lc) => {
        const b = nutLuaChon(lc, '', () => {
          khoaCacNut(khung);
          const dung = lc === cau[k];
          b.classList.add(dung ? 'dung' : 'sai');
          if (!dung) nut[ds.indexOf(cau[k])].classList.add('dung');
          xong({ dung, giaiThich: ['Câu nhớ: Bố Fi Lên Mây Phóng Sao Vào Zũ trụ.'] });
        });
        khoi.append(b);
        return b;
      });
      const hien = cau.map((c, i) => (i === k ? '___' : c)).join(' ') + ' trụ';
      khung.append(
        h('p', { class: 'goi-y' }, 'Điền chữ còn thiếu trong câu nhớ:'),
        h('div', { class: 'de-bai' }, h('h3', {}, hien)),
        khoi);
    },
  };
}

// ——— Bộ chạy một lượt câu hỏi ———
// cheDo: 'hoc' (sai thì nhắc bí kíp, hỏi lại cuối lượt), 'cua_ai' (không nhắc, tính điểm), 'luyen' (không ghi điểm)
export function chayLuot({ tieuDe, phuDe = '', cauHoi, cheDo = 'hoc', moSoBiKip = null, thoat, khiXong }) {
  const hangDoi = cauHoi.filter(Boolean).map((q) => ({ q, lanDau: true }));
  const tong = hangDoi.length;
  let soDung = 0; let daLam = 0;
  const tuSai = [];

  function veCau() {
    if (!hangDoi.length) { khiXong({ dung: soDung, tong, tuSai }); return; }
    const { q, lanDau } = hangDoi.shift();
    if (window.__KIEM_TRA__) window.__cauHienTai = q; // chỉ dùng khi chạy kiểm tra tự động
    const khung = h('div', { class: 'the' });
    const phanHoi = h('div', {});
    const thanh = h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: thoat }, '←'),
      h('div', { class: 'tieu-de' }, tieuDe, phuDe ? h('small', {}, phuDe) : null),
      moSoBiKip && cheDo !== 'cua_ai' ? h('button', { class: 'nut nut-nho', type: 'button', onclick: moSoBiKip }, '📜 Bí kíp') : null);
    const phanTram = Math.round((daLam / tong) * 100);
    manHinh(thanh,
      h('div', { class: 'tien-trinh' }, h('div', { style: `width:${phanTram}%` })),
      h('div', { class: 'dem' }, `Câu ${Math.min(daLam + 1, tong)}/${tong}` + (lanDau ? '' : ' · hỏi lại')),
      khung, phanHoi);
    q.ve(khung, ({ dung, giaiThich }) => {
      if (lanDau) { daLam++; if (dung) soDung++; }
      if (cheDo !== 'luyen' && q.tu) ghiTu(q.tu, dung);
      if (!dung && q.tu && !tuSai.includes(q.tu)) tuSai.push(q.tu);
      chuong(dung);
      const noiDung = [];
      if (dung) {
        const k = Math.random() < 0.4 ? chon(TRUYEN.khen || []) : null;
        noiDung.push(h('b', {}, k ? [czCau(k.cz, { vn: k.vn }), ' ', k.vn] : chon(TRUYEN.khen_vn || ['Đúng rồi!'])));
      } else {
        noiDung.push(h('b', {}, chon(TRUYEN.dong_vien_vn || ['Chưa đúng.'])));
      }
      noiDung.push(h('p', {}, ...giaiThich));
      if (!dung && cheDo !== 'cua_ai' && q.luat) {
        const bk = biKip(q.luat);
        if (bk) noiDung.push(h('div', { class: 'than-chu-nho' }, '📜 ' + bk.than_chu));
        const nhom = q.meoNhom && D.nhom.find((n) => n.chu === q.meoNhom);
        if (nhom && q.luat === 'BK4') noiDung.push(h('p', { class: 'goi-y' }, 'Mẹo: ' + nhom.meo));
      }
      if (!dung && cheDo === 'hoc' && lanDau) hangDoi.push({ q, lanDau: false });
      const tiep = h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: veCau }, hangDoi.length ? 'Tiếp →' : 'Xong ✓');
      phanHoi.replaceChildren(h('div', { class: 'phan-hoi ' + (dung ? 'dung' : 'sai') }, ...noiDung), tiep);
      phanHoi.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
      tiep.focus({ preventScroll: true });
    });
  }
  veCau();
}

// Câu cú nói khi bắt đầu một lượt (dùng ở màn chơi).
export function loiCu(...noiDung) { return cuNoi(...noiDung); }
