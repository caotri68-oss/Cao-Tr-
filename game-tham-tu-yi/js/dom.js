// Hàm nhỏ để dựng giao diện.

// h('div', {class: 'the', onclick: fn}, 'chữ', nodeKhac)
export function h(tag, thuocTinh, ...con) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(thuocTinh || {})) {
    if (v === undefined || v === null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  themCon(el, con);
  return el;
}

function themCon(el, con) {
  for (const c of con.flat(Infinity)) {
    if (c === undefined || c === null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
}

// Thay toàn bộ màn hình.
export function manHinh(...con) {
  const app = document.getElementById('app');
  app.replaceChildren();
  themCon(app, [h('div', { class: 'mai-hien', 'aria-hidden': 'true' }), ...con]);
  window.scrollTo(0, 0);
}

let henGioToast;
export function toast(chu) {
  const t = document.getElementById('toast');
  t.textContent = chu;
  t.hidden = false;
  clearTimeout(henGioToast);
  henGioToast = setTimeout(() => { t.hidden = true; }, 2600);
}

// Bảng nổi từ dưới lên. Chạm ra ngoài là đóng.
export function moBangNoi(...con) {
  const lop = document.getElementById('lop-phu');
  const bang = h('div', { class: 'bang-noi', role: 'dialog' }, ...con,
    h('button', { class: 'nut nut-rong', onclick: dongBangNoi }, 'Đóng'));
  lop.replaceChildren(bang);
  lop.hidden = false;
  lop.onclick = (e) => { if (e.target === lop) dongBangNoi(); };
}
export function dongBangNoi() {
  const lop = document.getElementById('lop-phu');
  lop.hidden = true;
  lop.replaceChildren();
}

export function tronMang(mang) {
  const a = [...mang];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function chon(mang) {
  return mang[Math.floor(Math.random() * mang.length)];
}

export function cho(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
