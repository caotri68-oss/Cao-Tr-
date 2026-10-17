// Thẻ bí kíp: giải nghĩa luật, từng bước, ví dụ có dịch. Dùng ở Sổ bí kíp, khi mở bí kíp và khi trả lời sai.
import { h } from './dom.js';
import { czChu } from './dich.js';
import { nutNghe } from './am-thanh.js';

function viDu(ds) {
  return h('div', {},
    h('b', {}, 'Ví dụ (có dịch):'),
    h('div', { style: 'display:flex;flex-direction:column;gap:8px;margin-top:6px' }, ds.map((v) =>
      h('div', { style: 'background:var(--troi);border-radius:12px;padding:8px 10px;display:flex;flex-direction:column;gap:4px' },
        h('div', { style: 'display:flex;align-items:center;gap:8px' },
          h('span', { lang: 'cs', style: 'font-weight:800;font-size:1.2rem;flex:1' }, czChu(v.cz)),
          nutNghe(v.cz)),
        h('div', {}, h('b', {}, 'Nghĩa: '), v.vn),
        h('div', { class: 'goi-y' }, v.giai)))));
}

export function theBiKip(bk, { thuoc = false } = {}) {
  return h('div', { class: 'the the-bi-kip' },
    thuoc ? h('span', { class: 'dau-thuoc' }, 'Đã thuộc ✓') : null,
    h('span', { class: 'ma' }, `Bí kíp ${bk.ma} · ${bk.ten}`),
    h('div', { class: 'than-chu' }, bk.than_chu),
    h('p', {}, bk.giai_thich),
    bk.chi_tiet?.length ? h('div', {}, h('b', {}, 'Các bước làm:'), h('ol', { style: 'margin:6px 0 0;padding-left:22px;display:flex;flex-direction:column;gap:6px' }, bk.chi_tiet.map((c) => h('li', {}, c)))) : null,
    bk.vi_du?.length ? viDu(bk.vi_du) : null,
    bk.nguon && bk.nguon !== 'PDF' ? h('p', { class: 'goi-y' }, 'Có phần bổ sung theo chương trình trường Séc.') : null,
  );
}
