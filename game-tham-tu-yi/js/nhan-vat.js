// Nhân vật vẽ bằng SVG (tự vẽ, không dùng hình có bản quyền) và khung lời thoại.
import { h } from './dom.js';
import { anhHoSo } from './luu-tien-do.js';
import { czCau } from './dich.js';
import { nutNghe } from './am-thanh.js';

const DA = '#f7cfa6';
const MA = '<circle cx="34" cy="62" r="5" fill="#f9a3a3" opacity=".7"/><circle cx="66" cy="62" r="5" fill="#f9a3a3" opacity=".7"/>';
const MAT = '<circle cx="40" cy="52" r="4" fill="#1f2a44"/><circle cx="60" cy="52" r="4" fill="#1f2a44"/><circle cx="41.5" cy="50.5" r="1.3" fill="#fff"/><circle cx="61.5" cy="50.5" r="1.3" fill="#fff"/>';
const CUOI = '<path d="M42 66 Q50 74 58 66" stroke="#1f2a44" stroke-width="3" fill="none" stroke-linecap="round"/>';

const HINH = {
  cu: `<svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M24 30 L30 12 L40 26 Z M76 30 L70 12 L60 26 Z" fill="#8a5a33"/>
    <ellipse cx="50" cy="58" rx="34" ry="36" fill="#a8703f"/>
    <ellipse cx="50" cy="70" rx="20" ry="22" fill="#e9c896"/>
    <path d="M36 66 l4 4 l4 -4 M48 72 l4 4 l4 -4 M56 64 l4 4 l4 -4" stroke="#a8703f" stroke-width="2" fill="none"/>
    <circle cx="37" cy="44" r="13" fill="#fff"/><circle cx="63" cy="44" r="13" fill="#fff"/>
    <circle cx="38" cy="45" r="6" fill="#1f2a44"/><circle cx="62" cy="45" r="6" fill="#1f2a44"/>
    <circle cx="40" cy="43" r="2" fill="#fff"/><circle cx="64" cy="43" r="2" fill="#fff"/>
    <path d="M46 52 L50 60 L54 52 Z" fill="#f2a33a"/>
    <circle cx="80" cy="76" r="9" fill="none" stroke="#1f3a68" stroke-width="4"/><line x1="86" y1="83" x2="94" y2="92" stroke="#1f3a68" stroke-width="5" stroke-linecap="round"/>
  </svg>`,
  anhduong: `<svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="20" cy="46" r="11" fill="#2a1d18"/><circle cx="80" cy="46" r="11" fill="#2a1d18"/>
    <circle cx="50" cy="55" r="29" fill="${DA}"/>
    <path d="M21 52 Q22 22 50 22 Q78 22 79 52 Q70 36 50 36 Q32 36 21 52 Z" fill="#2a1d18"/>
    <g transform="translate(70 26)"><circle r="7" fill="#ffc23a"/><g stroke="#ffc23a" stroke-width="2.5" stroke-linecap="round"><line y1="-12" y2="-9"/><line y1="12" y2="9"/><line x1="-12" x2="-9"/><line x1="12" x2="9"/></g></g>
    ${MAT}${MA}${CUOI}
  </svg>`,
  xu: `<svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M70 30 Q96 40 86 84 Q80 60 70 48 Z" fill="#2a1d18"/>
    <circle cx="50" cy="55" r="28" fill="${DA}"/>
    <path d="M22 54 Q20 20 52 20 Q80 22 78 50 Q66 30 44 34 Q30 38 22 54 Z" fill="#2a1d18"/>
    <path d="M70 28 l10 -8 l2 12 Z M70 28 l12 6 l-10 6 Z" fill="#8b5cf6"/>
    ${MAT}${MA}<path d="M43 66 Q50 71 57 66" stroke="#1f2a44" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,
  me: `<svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="18" r="12" fill="#3a2a22"/>
    <circle cx="50" cy="56" r="29" fill="${DA}"/>
    <path d="M21 54 Q20 24 50 24 Q80 24 79 54 Q76 34 50 34 Q24 34 21 54 Z" fill="#3a2a22"/>
    <circle cx="22" cy="64" r="3" fill="#e0303b"/><circle cx="78" cy="64" r="3" fill="#e0303b"/>
    ${MAT}${MA}${CUOI}
  </svg>`,
  bo: `<svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="56" r="29" fill="${DA}"/>
    <path d="M21 50 Q22 22 50 22 Q78 22 79 50 Q74 32 50 32 Q26 32 21 50 Z" fill="#1d1d24"/>
    <circle cx="40" cy="52" r="8" fill="none" stroke="#1f3a68" stroke-width="2.5"/><circle cx="60" cy="52" r="8" fill="none" stroke="#1f3a68" stroke-width="2.5"/><line x1="48" y1="52" x2="52" y2="52" stroke="#1f3a68" stroke-width="2.5"/>
    ${MAT}${CUOI}
  </svg>`,
  ke_trom: `<svg viewBox="0 0 100 100" aria-hidden="true">
    <ellipse cx="50" cy="60" rx="32" ry="30" fill="#3d3460"/>
    <rect x="22" y="44" width="56" height="14" rx="7" fill="#15111f"/>
    <circle cx="38" cy="51" r="4" fill="#fff"/><circle cx="62" cy="51" r="4" fill="#fff"/>
    <path d="M40 72 Q50 66 60 72" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M70 70 Q92 66 92 86 Q80 96 68 88 Z" fill="#c9a26b"/><text x="80" y="88" font-size="16" font-weight="800" fill="#e0303b" text-anchor="middle" font-family="sans-serif">Y</text>
  </svg>`,
};

const TEN = { cu: 'Cú Sýček', anhduong: 'Ánh Dương', xu: 'Chị Xu', me: 'Mẹ', bo: 'Bố', ke_trom: 'Kẻ trộm chữ Y' };

// Ánh Dương dùng ảnh 3D (img/anh-duong.png), các nhân vật khác dùng hình vẽ SVG.
const ANH_MAC_DINH = { anhduong: 'img/anh-duong.png' };

function hinhAnh(src, lop) {
  return h('span', { class: lop }, h('img', { src, alt: '', style: 'width:100%;height:100%;border-radius:50%;object-fit:cover' }));
}

export function hinh(ai, lop = 'hinh') {
  if (ANH_MAC_DINH[ai]) return hinhAnh(ANH_MAC_DINH[ai], lop);
  return h('span', { class: lop, html: HINH[ai] || HINH.cu });
}

// Hình hồ sơ: ảnh bố mẹ đã chọn trên máy này, nếu không có thì dùng hình vẽ.
export function hinhHoSo(id, lop = 'hinh') {
  const anh = anhHoSo(id);
  if (anh) return hinhAnh(anh, lop);
  return hinh(id, lop);
}

// Một câu thoại: { ai, vn, cz? }. Câu Séc chạm được và có nút nghe.
export function loiThoai(cau) {
  const bong = h('div', { class: 'bong' }, h('span', { class: 'ten' }, TEN[cau.ai] || cau.ai));
  if (cau.cz) {
    bong.append(h('div', { class: 'hang-nut', style: 'align-items:center;flex-wrap:nowrap' },
      h('span', { style: 'flex:1;min-width:0' }, czCau(cau.cz, { vn: cau.vn })), nutNghe(cau.cz)));
  }
  if (cau.vn) bong.append(h('span', { class: 'cau-vn' }, cau.vn));
  return h('div', { class: 'loi-thoai' + (cau.ai === 'ke_trom' ? ' ke-trom' : '') }, hinh(cau.ai), bong);
}

// Cú nói một câu ngắn (không phải câu Séc).
export function cuNoi(...noiDung) {
  return h('div', { class: 'loi-thoai' }, hinh('cu'), h('div', { class: 'bong' }, h('span', { class: 'ten' }, TEN.cu), ...noiDung));
}
