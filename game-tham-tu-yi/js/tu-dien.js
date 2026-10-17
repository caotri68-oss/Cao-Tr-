// Sổ thám tử: từ điển các từ đã gặp, tìm kiếm, lọc theo chữ, thẻ sưu tập (thường / bạc / vàng).
import { h, manHinh, cho } from './dom.js';
import { D, tatCaTuChinh } from './du-lieu.js';
import { hoSo, hangThe } from './luu-tien-do.js';
import { czChu } from './dich.js';
import { nutNghe, doc } from './am-thanh.js';

const bo = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
const TEN_HANG = { thuong: '🟤 Thường', bac: '⚪ Bạc', vang: '🟡 Vàng' };

export function trangTuDien(veBanDo) {
  const hs = hoSo();
  const tatCa = D.nhom.flatMap((n) => n.tu.map((t) => ({ ...t, nhom: n.chu })));
  const daGap = tatCa.filter((t) => hs.tu[t.cz]);
  let loc = 'tat'; let tim = ''; let dangDoc = false;
  const danhSach = h('div', { style: 'display:flex;flex-direction:column;gap:10px' });
  const chip = {};
  const hangChip = h('div', { class: 'hang-chip' });
  const nutDoc = h('button', { class: 'nut nut-nho', type: 'button', hidden: true }, '▶ Đọc cả nhóm');
  const o = h('input', { type: 'text', id: 'tim-tu', placeholder: 'Tìm chữ Séc hoặc nghĩa tiếng Việt', oninput: (e) => { tim = e.target.value; ve(); } });

  const dsHienTai = () => daGap.filter((t) => {
    if (loc === 'sai' && (hs.tu[t.cz].sai || 0) < 2) return false;
    if (loc.length === 1 && t.nhom !== loc) return false;
    if (tim && !bo(t.cz).includes(bo(tim)) && !bo(t.nghia).includes(bo(tim))) return false;
    return true;
  });

  function ve() {
    Object.entries(chip).forEach(([k, b]) => b.setAttribute('aria-pressed', String(k === loc)));
    const ds = dsHienTai();
    nutDoc.hidden = !(loc.length === 1 && ds.length);
    danhSach.replaceChildren(...(ds.length ? ds.map((t) => {
      const st = hs.tu[t.cz];
      const hang = hangThe(t.cz);
      return h('div', { class: 'the the-suu-tap ' + hang },
        h('div', { class: 'hang-nut', style: 'align-items:center;flex-wrap:nowrap' },
          h('span', { class: 'emoji-to', style: 'font-size:2.2rem' }, t.emoji),
          h('div', { style: 'flex:1;min-width:0' },
            h('div', { class: 'tu-to', style: 'font-size:1.6rem', lang: 'cs' }, czChu(t.cz), (st.sai || 0) >= 2 ? ' ⚠️' : ''),
            h('div', { class: 'phien-am' }, `[${t.phien_am}]`),
            h('div', { class: 'nghia' }, t.nghia)),
          nutNghe(t.cz)),
        h('div', { class: 'hang' }, `${TEN_HANG[hang]} · đúng ${st.dung || 0} · sai ${st.sai || 0}`));
    }) : [h('p', { class: 'goi-y' }, daGap.length ? 'Không có từ nào khớp.' : 'Em chưa học từ nào. Vào một phố để bắt đầu nhé!')]));
  }

  const dat = (k, nhan) => { chip[k] = h('button', { class: 'chip', type: 'button', 'aria-pressed': 'false', onclick: () => { loc = k; ve(); } }, nhan); hangChip.append(chip[k]); };
  dat('tat', 'Tất cả');
  D.nhom.forEach((n) => dat(n.chu, n.chu));
  dat('sai', '⚠️ Hay sai');

  nutDoc.onclick = async () => {
    if (dangDoc) { dangDoc = false; return; }
    dangDoc = true; nutDoc.textContent = '⏹ Dừng';
    for (const t of dsHienTai()) { if (!dangDoc) break; await doc(t.cz); await cho(900); }
    dangDoc = false; nutDoc.textContent = '▶ Đọc cả nhóm';
  };

  manHinh(
    h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: () => { dangDoc = false; veBanDo(); } }, '←'),
      h('div', { class: 'tieu-de' }, '📖 Sổ thám tử', h('small', {}, `Đã gặp ${daGap.length}/${tatCa.length} từ`))),
    h('label', { for: 'tim-tu', class: 'goi-y' }, 'Tìm từ'), o,
    hangChip, nutDoc, danhSach);
  ve();
}
