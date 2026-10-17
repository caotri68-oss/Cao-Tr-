// Huy hiệu: mỗi màn qua Cửa ải được một huy hiệu; 1, 2, 3 sao ứng với huân chương đồng, bạc, vàng.
window.PK = window.PK || {};

(function () {
  const DS = [
    ['🔑', 'Chìa khóa cổng chợ'], ['🧺', 'Giỏ TEN TA TO'], ['👕', 'Chiếc áo "là"'], ['🤝', 'Thân thiết và lịch sự'],
    ['🚉', 'Người dẫn đường'], ['☕', 'Khách quán cà phê'], ['🎩', 'Thám tử ngoại lệ'], ['🥕', 'Thợ săn từ bẫy'],
    ['🍎', 'Một cái hay nhiều cái'], ['🙅', 'Bậc thầy chữ "không"'], ['💅', 'Nghề nghiệp và quốc tịch'], ['🎨', 'Họa sĩ màu sắc'],
    ['🗺️', 'Nhà thám hiểm "ở đâu"'], ['🏆', 'Vô địch đi chợ']
  ];
  const HUAN_CHUONG = ['', '🥉', '🥈', '🥇'];
  const TEN_HUAN_CHUONG = ['', 'đồng', 'bạc', 'vàng'];

  function cua(so) { return { emoji: DS[so][0], ten: DS[so][1] }; }

  // Bảng huy hiệu của một hồ sơ.
  function bang(hoSo) {
    const h = PK.ui.h;
    const d = PK.luu.doc(hoSo.id);
    const duoc = DS.filter(function (_, so) { return (d.man[so] || {}).qua; }).length;
    return PK.ui.moTam([
      h('h3', null, '🏅 Huy hiệu của ' + hoSo.ten + ' (' + duoc + '/' + DS.length + ')'),
      h('div', { class: 'luoi-huy-hieu' }, DS.map(function (x, so) {
        const m = d.man[so] || {};
        return h('div', { class: 'huy-hieu' + (m.qua ? '' : ' khoa'), title: x[1] },
          h('div', { class: 'hh-hinh' }, m.qua ? x[0] : '🔒'),
          h('div', { class: 'hh-ten' }, m.qua ? x[1] : 'Màn ' + so),
          m.qua ? h('div', { 'aria-label': 'huân chương ' + TEN_HUAN_CHUONG[m.sao || 1] }, HUAN_CHUONG[m.sao || 1]) : null);
      })),
      h('button', { class: 'nut rong', onclick: PK.ui.dongTam }, 'Đóng')
    ]);
  }

  PK.huyHieu = { DS: DS, cua: cua, bang: bang, huanChuong: function (sao) { return HUAN_CHUONG[sao] || ''; } };
})();
