// Trang "Tiến độ gia đình": từng hồ sơ một, không xếp hạng. Chỉ đọc dữ liệu đã lưu trong máy.
window.PK = window.PK || {};

(function () {
  const h = function () { return PK.ui.h.apply(null, arguments); };
  const THU = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  function ngayKhoa(n) {
    return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
  }

  // Biểu đồ cột phút chơi 7 ngày gần nhất (hôm nay ở cuối).
  function bieuDo(d) {
    const ngay = [];
    for (let i = 6; i >= 0; i--) { const n = new Date(); n.setDate(n.getDate() - i); ngay.push(n); }
    const phut = ngay.map(function (n) { return Math.round(d.phut[ngayKhoa(n)] || 0); });
    const max = Math.max(10, Math.max.apply(null, phut));
    const tong = phut.reduce(function (a, b) { return a + b; }, 0);
    return h('div', null,
      h('div', { class: 'nhat' }, '⏱ Phút chơi 7 ngày qua: ', h('b', null, tong + ' phút')),
      h('div', { class: 'bieu-do', role: 'img', 'aria-label': phut.map(function (p, i) { return THU[ngay[i].getDay()] + ' ' + p + ' phút'; }).join(', ') },
        phut.map(function (p, i) {
          return h('div', { class: 'cot' },
            h('span', { class: 'so-phut' }, p ? String(p) : ''),
            h('i', { style: 'height:' + Math.max(p ? 6 : 2, Math.round(p / max * 100)) + '%' }),
            h('span', { class: 'thu' + (i === 6 ? ' nay' : '') }, i === 6 ? 'Nay' : THU[ngay[i].getDay()]));
        })));
  }

  // Màn đang chơi: màn đầu tiên chưa qua (đã mở), kèm bước đang dở.
  function manDangChoi(d) {
    const soMan = PK.d.bi_kip.map(function (b) { return b.man; }).sort(function (a, b) { return a - b; }).concat([PK.manChoi.MAN_TONG_HOP]);
    const chuaQua = soMan.find(function (so) { return !(d.man[so] && d.man[so].qua); });
    if (chuaQua === undefined) return 'Đã qua hết các màn 🎉';
    return 'Màn ' + chuaQua + ' · ' + (PK.TEN_MAN[chuaQua] || '') + (d.buoc[chuaQua] ? ' (đang chơi dở)' : '');
  }

  // 10 từ hay sai nhất (chỉ tính từ có lần sai).
  function tuHaySai(d, so) {
    return Object.keys(d.tu).map(function (k) { return { tu: k, m: d.tu[k] }; })
      .filter(function (x) { return (x.m.sai || 0) > 0 && PK.d.danh_tu.some(function (t) { return t.tu === x.tu; }); })
      .sort(function (a, b) { return b.m.sai - a.m.sai || a.m.dung - b.m.dung; })
      .slice(0, so || 10);
  }

  // Bí kíp đã mở nhưng chưa qua Cửa ải, hoặc qua với điểm thấp (8/10).
  function biKipCanOn(d) {
    return PK.d.bi_kip.slice().sort(function (a, b) { return a.man - b.man; }).map(function (b) {
      const tt = d.biKip[b.id];
      if (!tt || !tt.mo) return null;
      if (!tt.thuoc) return { b: b, chu: 'chưa qua Cửa ải' };
      if ((tt.diem || 0) <= 8) return { b: b, chu: 'qua với ' + (tt.diem || 8) + '/10' };
      return null;
    }).filter(Boolean);
  }

  function theHoSo(hs) {
    const d = PK.luu.doc(hs.id);
    const tu = PK.luu.demHop(d.tu);
    const cau = PK.luu.demHop(d.cau);
    const sai = tuHaySai(d);
    const bk = biKipCanOn(d);
    const chuaChoi = !Object.keys(d.man).length && !tu.daHoc;
    return h('section', { class: 'the the-tien-do' },
      h('div', { class: 'dau-ho-so' }, h('img', { src: hs.anh, alt: '' }),
        h('div', null, h('h3', null, hs.ten), h('div', { class: 'nhat' }, '🎯 ' + manDangChoi(d)))),
      chuaChoi ? h('p', { class: 'nhat' }, 'Chưa bắt đầu chơi.') : [
        bieuDo(d),
        h('div', { class: 'o-so' },
          h('div', null, h('b', null, String(tu.daHoc)), h('span', null, 'từ đã học')),
          h('div', null, h('b', null, String(tu.dangOn)), h('span', null, 'đang ôn')),
          h('div', null, h('b', null, String(tu.thuocLau)), h('span', null, 'đã thuộc lâu'))),
        h('div', { class: 'nhat' }, '💬 Câu: ' + cau.daHoc + ' đã gặp · ' + cau.thuocLau + ' đã thuộc lâu'),
        h('div', null,
          h('b', null, '⚠️ 10 từ hay sai nhất'),
          sai.length ? h('div', { class: 'ds-sai' }, sai.map(function (x) {
            const t = PK.d.danh_tu.find(function (y) { return y.tu === x.tu; });
            return h('div', { class: 'dong-sai' },
              PK.ui.nutNghe(t.giong.toLowerCase() + ' ' + t.tu),
              h('span', null, (t.emoji || '') + ' ', PK.ui.czTu(t), ' · ' + t.nghia),
              h('span', { class: 'nhat' }, 'sai ' + x.m.sai));
          })) : h('div', { class: 'nhat' }, 'Chưa có từ nào trả lời sai.')),
        h('div', null,
          h('b', null, '📜 Bí kíp cần ôn'),
          bk.length ? h('ul', { class: 'ds-bk' }, bk.map(function (x) { return h('li', null, x.b.ten + ': ' + x.chu); }))
            : h('div', { class: 'nhat' }, 'Không có, các bí kíp đã mở đều qua Cửa ải tốt.'))
      ]);
  }

  function manHinh(vung, quayLai) {
    vung.replaceChildren(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut-tron', 'aria-label': 'Quay lại', onclick: quayLai }, '←'),
        h('h2', null, '👨‍👩‍👧 Tiến độ gia đình')),
      PK.ui.loi('kocka', 'Mỗi người một trang riêng, không so sánh ai hơn ai. Dữ liệu chỉ nằm trong máy này, không gửi đi đâu.', true),
      h('div', { style: 'display:flex;flex-direction:column;gap:14px' }, PK.HO_SO.map(theHoSo)));
    window.scrollTo(0, 0);
  }

  PK.tienDo = { manHinh: manHinh, tuHaySai: tuHaySai, biKipCanOn: biKipCanOn };
})();
