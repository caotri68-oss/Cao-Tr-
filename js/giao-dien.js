// Các mảnh giao diện dùng chung: tạo phần tử, chữ Séc chạm-để-tra, thẻ tra nghĩa, lời linh vật, đọc theo.
window.PK = window.PK || {};

(function () {
  // h('div', {class:'x', onclick: fn}, 'chữ', phầnTửKhác …)
  function h(the, thuocTinh) {
    const el = document.createElement(the);
    const tt = thuocTinh || {};
    Object.keys(tt).forEach(function (k) {
      const v = tt[k];
      if (v === undefined || v === null || v === false) return;
      if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else el.setAttribute(k, v === true ? '' : v);
    });
    for (let i = 2; i < arguments.length; i++) them(el, arguments[i]);
    return el;
  }
  function them(el, con) {
    if (con === null || con === undefined || con === false) return;
    if (Array.isArray(con)) { con.forEach(function (c) { them(el, c); }); return; }
    el.appendChild(con instanceof Node ? con : document.createTextNode(String(con)));
  }

  // ---------- Chữ Séc chạm để tra ----------
  // khoa: true = không cho tra (dùng cho câu hỏi "chọn nghĩa đúng").
  function cz(chu, tuyChon) {
    const o = tuyChon || {};
    return h('span', { class: 'cz' + (o.khoa ? ' khoa-tra' : ''), 'data-cz': chu, role: o.khoa ? null : 'button', tabindex: o.khoa ? null : '0' }, o.hien || chu);
  }

  // Danh từ luôn đi kèm mạo từ: "TEN dům"
  function czTu(t, tuyChon) {
    const o = tuyChon || {};
    return h('span', { class: 'cz' + (o.khoa ? ' khoa-tra' : ''), 'data-cz': t.tu, 'data-tu': t.tu, role: o.khoa ? null : 'button', tabindex: o.khoa ? null : '0' },
      h('span', { class: 'giong g-' + t.giong }, t.giong),
      t.tu,
      t.bay && o.hienBay !== false ? h('span', { class: 'bay-sao', title: 'Từ bẫy' }, '★') : null
    );
  }

  // Bọc các chữ dạng  chữ [phiên âm]  trong một dòng giải thích thành chữ chạm được.
  function dongCoChuSec(dong) {
    const ket = [];
    const re = /([\p{L}]+)\s\[([^\]]+)\]/gu;
    let cuoi = 0; let m;
    while ((m = re.exec(dong))) {
      if (m.index > cuoi) ket.push(dong.slice(cuoi, m.index));
      ket.push(cz(m[0], { hien: m[1] }), ' [' + m[2] + ']');
      cuoi = re.lastIndex;
    }
    if (cuoi < dong.length) ket.push(dong.slice(cuoi));
    return ket;
  }

  function nutNghe(chu, nhan) {
    return h('button', { class: 'nut-tron', 'aria-label': 'Nghe', onclick: function (e) { e.stopPropagation(); PK.am.nhac('cham'); PK.am.noi(chu); } }, nhan || '🔊');
  }

  // ---------- Lớp phủ, thẻ tra nghĩa, thông báo ----------
  let lopPhuDangMo = null;
  function moTam(noiDung, khiDong) {
    dongTam();
    const tam = h('div', { class: 'tam-duoi', role: 'dialog', 'aria-modal': 'true' }, noiDung);
    const lop = h('div', { class: 'lop-phu', onclick: function (e) { if (e.target === lop) dongTam(); } }, tam);
    lop._khiDong = khiDong;
    document.body.appendChild(lop);
    lopPhuDangMo = lop;
    return tam;
  }
  function dongTam() {
    if (!lopPhuDangMo) return;
    const l = lopPhuDangMo; lopPhuDangMo = null;
    l.remove();
    if (l._khiDong) l._khiDong();
  }

  function thongBao(chu, ms) {
    const cu = document.querySelector('.thong-bao'); if (cu) cu.remove();
    const el = h('div', { class: 'thong-bao', role: 'status' }, chu);
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, ms || 2600);
  }

  const chuan = function (s) { return PK.duLieu.chuan(s); };

  function dongMuc(muc, chuGoc) {
    return h('li', null,
      h('b', { class: muc && muc.giong ? 'g-' + muc.giong : '' }, (muc && muc.giong ? muc.giong + ' ' : '') + (muc ? muc.cz : chuGoc)),
      muc && muc.phien_am ? h('span', { class: 'phien-am' }, '  [' + muc.phien_am + ']') : null,
      ' — ',
      muc ? muc.nghia : h('i', { class: 'nhat' }, 'xem nghĩa cả câu')
    );
  }

  // Nghĩa từng chữ: ưu tiên cụm dài (tối đa 3 chữ) có trong dữ liệu.
  function tachTungChu(chu) {
    const toks = chuan(chu).split(' ').filter(Boolean);
    const ds = [];
    for (let i = 0; i < toks.length;) {
      let khop = null; let dai = 0;
      for (let n = Math.min(3, toks.length - i); n >= 1; n--) {
        const k = toks.slice(i, i + n).join(' ');
        if (PK.tuDien.has(k)) { khop = PK.tuDien.get(k); dai = n; break; }
      }
      if (khop) { ds.push(dongMuc(khop)); i += dai; } else { ds.push(dongMuc(null, toks[i])); i += 1; }
    }
    return h('ul', { class: 'tung-chu' }, ds);
  }

  function moTraNghia(chu, tuDanh) {
    PK.am.nhac('cham');
    const d = PK.d;
    let muc = null;
    if (tuDanh) {
      const t = d.danh_tu.find(function (x) { return x.tu === tuDanh; });
      if (t) muc = { loai: 'danh-tu', cz: t.tu, giong: t.giong, phien_am: t.phien_am, nghia: t.nghia, bay: t.bay, emoji: t.emoji };
    }
    const cau = !muc && PK.cauTheoChu.get(chuan(chu));
    const tachNg = PK.duLieu.tachNgoac(chu);
    if (!muc && !cau) muc = PK.tuDien.get(chuan(tachNg.cz)) || null;

    const noiDung = [];
    if (cau) {
      noiDung.push(
        h('div', { class: 'tra-tu-lon' }, cau.cz),
        cau.phien_am ? h('div', { class: 'phien-am' }, '[' + cau.phien_am + ']') : null,
        h('p', null, h('b', null, 'Nghĩa: '), cau.nghia)
      );
      const vungTach = h('div');
      noiDung.push(h('div', { class: 'hang-nut' },
        h('button', { class: 'nut', onclick: function () { PK.am.noi(cau.cz); } }, '🔊 Nghe'),
        h('button', { class: 'nut phu', onclick: function () { vungTach.replaceChildren(tachTungChu(cau.cz)); } }, 'Nghĩa từng chữ')
      ), vungTach);
    } else if (muc) {
      const pa = muc.phien_am || tachNg.phien_am;
      noiDung.push(
        h('div', { class: 'tra-tu-lon' },
          muc.emoji ? muc.emoji + ' ' : '',
          muc.giong ? h('span', { class: 'giong g-' + muc.giong }, muc.giong) : null,
          muc.cz),
        muc.giong || pa ? h('div', { class: 'phien-am' },
          muc.giong ? '[' + PK.duLieu.PHIEN_AM_MAO_TU[muc.giong] + '] ' : '', pa ? '[' + pa + ']' : '') : null,
        h('p', null, h('b', null, 'Nghĩa: '), muc.nghia),
        muc.bay ? h('p', null, '★ Từ bẫy, chậm lại một nhịp!') : null,
        h('button', { class: 'nut', onclick: function () { PK.am.noi((muc.giong ? muc.giong.toLowerCase() + ' ' : '') + muc.cz); } }, '🔊 Nghe')
      );
    } else {
      const nhieuChu = chuan(tachNg.cz).split(' ').length > 1;
      noiDung.push(
        h('div', { class: 'tra-tu-lon' }, tachNg.cz),
        tachNg.phien_am ? h('div', { class: 'phien-am' }, '[' + tachNg.phien_am + ']') : null,
        nhieuChu ? tachTungChu(tachNg.cz) : h('p', { class: 'nhat' }, 'Chữ này chỉ dùng làm ví dụ cách đọc, chưa có nghĩa trong dữ liệu.'),
        h('button', { class: 'nut', onclick: function () { PK.am.noi(tachNg.cz); } }, '🔊 Nghe')
      );
    }
    noiDung.push(h('button', { class: 'nut phu', onclick: dongTam }, 'Đóng'));
    moTam(noiDung);
    document.dispatchEvent(new CustomEvent('pk:da-tra'));
  }

  function batTraNghia(e) {
    const el = e.target.closest && e.target.closest('.cz');
    if (!el || el.classList.contains('khoa-tra')) return;
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault(); e.stopPropagation();
    moTraNghia(el.getAttribute('data-cz'), el.getAttribute('data-tu'));
  }
  document.addEventListener('click', batTraNghia);
  document.addEventListener('keydown', batTraNghia);

  // ---------- Linh vật nói ----------
  const ANH = { pes: 'img/pes.svg', kocka: 'img/kocka.svg', prodavacka: 'img/prodavacka.svg' };
  function loi(ai, noiDung, phai) {
    const anh = ANH[ai] || ai;
    return h('div', { class: 'loi' + (phai ? ' phai' : '') },
      h('img', { src: anh, alt: '' }),
      h('div', { class: 'bong' }, noiDung));
  }

  // ---------- Đọc theo (ghi âm rồi so với giọng mẫu) ----------
  // mau: chữ Séc để máy đọc mẫu (có thể null). xong(): gọi khi người chơi bấm "Giống rồi" / "Mình đã đọc to".
  function docTheo(mau, xong) {
    const vung = h('div', { class: 'doc-theo' });
    let banGhi = null;

    function hoanTat() { PK.am.nhac('dung'); vung.replaceChildren(h('span', { class: 'nhat' }, '✅ Giỏi lắm!')); if (xong) xong(); }
    function cheDoKhongMic(lyDo) {
      vung.replaceChildren(
        lyDo ? h('span', { class: 'nhat' }, lyDo) : null,
        h('button', { class: 'nut nho', onclick: hoanTat }, '🗣️ Mình đã đọc to'));
    }
    function batDau() {
      vung.replaceChildren(h('button', { class: 'nut nho', onclick: ghi }, '🎤 Đọc theo'));
    }
    async function ghi() {
      let may;
      try { may = await PK.am.batDauGhi(); } catch (e) {
        cheDoKhongMic('Máy chưa cho dùng micro. Bạn đọc to rồi bấm nút này nhé:');
        return;
      }
      const dung = h('button', { class: 'nut nho', onclick: ketThuc }, '⏹ Xong');
      vung.replaceChildren(h('span', { class: 'dang-ghi' }, '● Đang nghe bạn đọc…'), dung);
      const hen = setTimeout(ketThuc, 5000);
      let daDung = false;
      async function ketThuc() {
        if (daDung) return; daDung = true; clearTimeout(hen);
        banGhi = await may.dung();
        soSanh();
      }
    }
    async function soSanh() {
      vung.replaceChildren(
        h('button', { class: 'nut nho phu', onclick: nghe }, '▶️ Nghe so sánh'),
        h('button', { class: 'nut nho', onclick: hoanTat }, '👍 Giống rồi'),
        h('button', { class: 'nut nho phu', onclick: batDau }, '🔁 Đọc lại'));
      nghe();
    }
    async function nghe() {
      if (mau) await PK.am.noi(mau);
      if (banGhi) await PK.am.phat(banGhi);
      if (mau) await PK.am.noi(mau);
    }

    if (!PK.am.coMicro) cheDoKhongMic(); else batDau();
    return vung;
  }

  // ---------- Hướng dẫn cài giọng Séc ----------
  function huongDanGiong() {
    moTam([
      h('h3', null, '🔈 Máy chưa có giọng tiếng Séc'),
      h('p', null, 'Game vẫn chơi được. Muốn nghe đọc mẫu thì cài giọng Séc như sau (làm một lần):'),
      h('p', null, h('b', null, 'Android: '), 'Cài đặt → Quản lý chung (hoặc Hệ thống) → Ngôn ngữ → Chuyển văn bản thành giọng nói → bấm ⚙️ cạnh "Google" → Cài đặt dữ liệu giọng nói → chọn Čeština (tiếng Séc) → tải về.'),
      h('p', null, h('b', null, 'iPhone: '), 'Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → Tiếng Séc → chọn Zuzana → tải về.'),
      h('p', { class: 'nhat' }, 'Cài xong, tắt hẳn trình duyệt rồi mở lại game.'),
      h('button', { class: 'nut rong', onclick: dongTam }, 'Đã hiểu')
    ]);
  }

  function tron(a) {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = b[i]; b[i] = b[j]; b[j] = t; }
    return b;
  }

  PK.ui = { h: h, cz: cz, czTu: czTu, dongCoChuSec: dongCoChuSec, nutNghe: nutNghe, moTam: moTam, dongTam: dongTam, thongBao: thongBao, loi: loi, docTheo: docTheo, huongDanGiong: huongDanGiong, moTraNghia: moTraNghia, tron: tron };
})();
