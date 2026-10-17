// "Từ điển của mình": mọi từ và câu đã gặp, tìm bằng chữ Séc hoặc chữ Việt, lọc TEN / TA / TO / Câu.
// Từ hay sai có dấu ⚠️ để ôn lại.
window.PK = window.PK || {};

(function () {
  const h = function () { return PK.ui.h.apply(null, arguments); };
  const LOC = [['tat-ca', 'Tất cả'], ['TEN', 'TEN'], ['TA', 'TA'], ['TO', 'TO'], ['cau', 'Câu'], ['sai', '⚠️ Hay sai']];

  // Bỏ dấu, viết thường: gõ "kocka" hay "meo" cũng tìm ra. Riêng đ → d.
  function boDau(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase();
  }

  // Hay sai: sai từ 2 lần trở lên và ít nhất 1/3 số lần trả lời.
  function haySai(m) {
    const sai = (m && m.sai) || 0;
    return sai >= 2 && sai * 3 >= sai + ((m && m.dung) || 0);
  }

  // Từ đã gặp: đã học hoặc đã trả lời ít nhất một lần.
  // Câu đã gặp: có trong hộp nhớ, hoặc thuộc màn đã qua.
  function danhSach(d) {
    const tu = PK.d.danh_tu.filter(function (t) {
      const m = d.tu[t.tu];
      return m && (m.hoc || m.dung || m.sai);
    }).map(function (t) {
      const m = d.tu[t.tu];
      return { loai: 'tu', t: t, m: m, tim: boDau(t.tu + ' ' + t.nghia + ' ' + (t.phien_am || '')) };
    });
    const cau = PK.d.cau.filter(function (c) {
      return !!(d.cau[c.cz] || (d.man[c.man] && d.man[c.man].qua));
    }).map(function (c) {
      return { loai: 'cau', c: c, m: d.cau[c.cz] || {}, tim: boDau(c.cz + ' ' + c.nghia + ' ' + (c.phien_am || '')) };
    });
    tu.sort(function (a, b) { return a.t.tu.localeCompare(b.t.tu, 'cs'); });
    return tu.concat(cau);
  }

  function dongTu(x) {
    const t = x.t;
    return h('div', { class: 'dong-tu' + (haySai(x.m) ? ' hay-sai' : '') },
      h('span', { class: 'emoji' }, t.emoji || '·'),
      h('div', { class: 'giua' },
        h('div', null, PK.ui.czTu(t), haySai(x.m) ? h('span', { class: 'canh-bao', title: 'Hay sai' }, ' ⚠️ sai ' + x.m.sai) : null),
        h('div', { class: 'nhat' }, (t.phien_am ? '[' + PK.duLieu.PHIEN_AM_MAO_TU[t.giong] + '] [' + t.phien_am + '] · ' : '') + t.nghia)),
      PK.ui.nutNghe(t.giong.toLowerCase() + ' ' + t.tu));
  }
  function dongCau(x) {
    const c = x.c;
    return h('div', { class: 'dong-tu' + (haySai(x.m) ? ' hay-sai' : '') },
      h('span', { class: 'emoji' }, '💬'),
      h('div', { class: 'giua' },
        h('div', null, PK.ui.cz(c.cz), haySai(x.m) ? h('span', { class: 'canh-bao' }, ' ⚠️ sai ' + x.m.sai) : null),
        h('div', { class: 'nhat' }, (c.phien_am ? '[' + c.phien_am + '] · ' : '') + c.nghia)),
      PK.ui.nutNghe(c.cz));
  }

  function manHinh(vung, hoSo, quayLai) {
    const d = PK.luu.doc(hoSo.id);
    const ds = danhSach(d);
    let loc = 'tat-ca';
    const o = h('input', { type: 'search', class: 'o-tim', placeholder: 'Tìm chữ Séc hoặc chữ Việt…', 'aria-label': 'Tìm từ', autocomplete: 'off' });
    const nutLoc = LOC.map(function (l) {
      return h('button', { class: 'chip-loc' + (l[0] === loc ? ' chon-loc' : ''), 'aria-pressed': l[0] === loc ? 'true' : 'false', onclick: function () {
        loc = l[0];
        nutLoc.forEach(function (n, i) { const bat = LOC[i][0] === loc; n.classList.toggle('chon-loc', bat); n.setAttribute('aria-pressed', bat ? 'true' : 'false'); });
        ve();
      } }, l[1]);
    });
    const dem = h('div', { class: 'nhat', 'aria-live': 'polite' });
    const ket = h('div', { class: 'ds-tu-dien' });

    function ve() {
      const q = boDau(o.value.trim());
      const loc1 = ds.filter(function (x) {
        if (loc === 'cau' && x.loai !== 'cau') return false;
        if (['TEN', 'TA', 'TO'].indexOf(loc) >= 0 && !(x.loai === 'tu' && x.t.giong === loc)) return false;
        if (loc === 'sai' && !haySai(x.m)) return false;
        return !q || x.tim.indexOf(q) >= 0;
      });
      dem.textContent = loc1.length + ' mục';
      ket.replaceChildren(...(loc1.length ? loc1.map(function (x) { return x.loai === 'tu' ? dongTu(x) : dongCau(x); })
        : [h('p', { class: 'nhat' }, ds.length ? 'Không tìm thấy. Thử gõ không dấu, ví dụ "meo" hoặc "kocka".' : 'Chưa có từ nào. Chơi màn 0 và màn 1 để từ điển có chữ nhé!')]));
    }
    o.addEventListener('input', ve);

    const soTu = ds.filter(function (x) { return x.loai === 'tu'; }).length;
    vung.replaceChildren(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut-tron', 'aria-label': 'Quay lại', onclick: quayLai }, '←'),
        h('h2', null, '📖 Từ điển của ' + hoSo.ten)),
      h('p', { class: 'nhat' }, soTu + ' từ và ' + (ds.length - soTu) + ' câu bạn đã gặp. Chạm 🔊 để nghe, chạm chữ Séc để xem chi tiết.'),
      o,
      h('div', { class: 'hang-loc' }, nutLoc),
      dem, ket);
    window.scrollTo(0, 0);
    ve();
  }

  PK.tuDienCuaMinh = { manHinh: manHinh, boDau: boDau, haySai: haySai, danhSach: danhSach };
})();
