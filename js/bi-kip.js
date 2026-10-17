// Thẻ bí kíp, Sổ bí kíp và Luyện nhanh.
window.PK = window.PK || {};

(function () {
  const ui = function () { return PK.ui; };

  function theBiKip(bk, tuyChon) {
    const h = ui().h; const o = tuyChon || {};
    return h('section', { class: 'bi-kip' },
      o.thuoc ? h('div', { class: 'dau-thuoc' }, 'Đã thuộc ✓') : null,
      h('div', { class: 'nhan-bk' }, '📜 Bí kíp ' + bk.id.replace('BK', 'số ')),
      h('h2', null, bk.ten),
      h('div', { class: 'than-chu' }, bk.than_chu),
      bk.giai_thich ? h('p', null, bk.giai_thich) : null,
      (bk.chi_tiet || []).length ? h('ul', null, bk.chi_tiet.map(function (d) { return h('li', null, ui().dongCoChuSec(d)); })) : null,
      (bk.vi_du || []).length ? h('div', null,
        h('div', { class: 'nhat' }, 'Ví dụ (chạm 🔊 để nghe, chạm chữ để xem nghĩa):'),
        h('div', { class: 'vi-du' }, bk.vi_du.map(function (v) {
          const t = PK.duLieu.tachNgoac(v);
          return h('span', { class: 'nut-nghe' },
            h('button', { class: 'nut-tron', style: 'width:36px;height:36px;font-size:1rem', 'aria-label': 'Nghe', onclick: function () { PK.am.noi(t.cz); } }, '🔊'),
            ui().cz(v, { hien: t.cz }),
            t.phien_am ? h('span', { class: 'phien-am' }, ' [' + t.phien_am + ']') : null);
        }))) : null
    );
  }

  function xemThe(bk, thuoc) {
    ui().moTam([theBiKip(bk, { thuoc: thuoc }), ui().h('button', { class: 'nut rong', onclick: ui().dongTam }, 'Đóng')]);
  }

  // Câu hỏi "về chính bí kíp" lấy từ cau_hoi_thuoc.
  function cauHoiThuoc(bk) {
    return (bk.cau_hoi_thuoc || []).map(function (q) {
      return { hoi: q.hoi, dap: q.dap, luaChon: q.lua_chon.slice(), nguon: bk.id };
    });
  }

  // Mỗi bí kíp có thể đăng ký thêm cách tạo câu hỏi riêng (dùng bí kíp với từ cụ thể).
  PK.taoCauHoi = PK.taoCauHoi || {};

  function cauHoiLuyen(bk, so) {
    let ds = ui().tron(cauHoiThuoc(bk));
    if (ds.length < so && PK.taoCauHoi[bk.id]) ds = ds.concat(PK.taoCauHoi[bk.id](so - ds.length));
    return ds.slice(0, so);
  }

  function manHinhSo(vung, hoSo, quayLai) {
    const h = ui().h;
    const d = PK.luu.doc(hoSo.id);
    const ds = PK.d.bi_kip.slice().sort(function (a, b) { return a.man - b.man; });
    vung.replaceChildren(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut-tron', 'aria-label': 'Quay lại', onclick: quayLai }, '←'),
        h('h2', null, '📜 Sổ bí kíp của ' + hoSo.ten)),
      PK.ui.loi('kocka', 'Đây là nơi giữ mọi bí kíp bạn đã mở. Xem lại bao nhiêu lần cũng được!'),
      h('div', { style: 'display:flex;flex-direction:column;gap:12px' }, ds.map(function (bk) {
        const tt = d.biKip[bk.id];
        if (!tt || !tt.mo) {
          return h('div', { class: 'the bk-khoa' }, h('span', { style: 'font-size:1.6rem' }, '🔒'),
            h('div', null, h('b', null, 'Bí kíp ' + bk.id.replace('BK', 'số ')), h('div', { class: 'nhat' }, 'Mở khi vào màn ' + bk.man)));
        }
        return h('div', { class: 'the' },
          h('div', { class: 'hang-nut', style: 'align-items:center' },
            h('h3', { style: 'flex:1 1 60%' }, bk.ten),
            tt.thuoc ? h('span', { style: 'color:var(--dung);font-weight:900' }, 'Đã thuộc ✓') : h('span', { class: 'nhat' }, 'Chưa qua Cửa ải')),
          h('div', { class: 'than-chu', style: 'font-family:var(--font-tieu-de);font-weight:800;font-size:1.15rem' }, bk.than_chu),
          h('div', { class: 'hang-nut' },
            h('button', { class: 'nut phu nho', onclick: function () { xemThe(bk, tt.thuoc); } }, 'Xem thẻ'),
            h('button', { class: 'nut nho', onclick: function () { luyenNhanh(vung, hoSo, bk, function () { manHinhSo(vung, hoSo, quayLai); }); } }, '⚡ Luyện nhanh')));
      }))
    );
  }

  function luyenNhanh(vung, hoSo, bk, quayLai) {
    const h = ui().h;
    vung.replaceChildren(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut-tron', 'aria-label': 'Quay lại', onclick: quayLai }, '←'),
        h('h2', null, '⚡ Luyện nhanh: ' + bk.ten)));
    const khung = h('div', { style: 'display:flex;flex-direction:column;gap:16px' });
    vung.appendChild(khung);
    PK.cuaAi.chay(khung, {
      cheDo: 'luyen',
      biKip: bk,
      cauHoi: cauHoiLuyen(bk, 5),
      khiXong: function (dung, tong) {
        khung.replaceChildren(
          h('div', { class: 'the ket-qua' },
            h('h2', null, 'Đúng ' + dung + '/' + tong),
            PK.ui.loi('pes', dung === tong ? 'Tuyệt vời! Bí kíp nằm gọn trong đầu rồi!' : 'Luyện thêm vài lần là thuộc ngay thôi!'),
            h('div', { class: 'hang-nut', style: 'width:100%' },
              h('button', { class: 'nut phu', onclick: quayLai }, 'Về Sổ bí kíp'),
              h('button', { class: 'nut', onclick: function () { luyenNhanh(vung, hoSo, bk, quayLai); } }, 'Luyện lại'))));
      }
    });
  }

  PK.biKip = { theBiKip: theBiKip, xemThe: xemThe, cauHoiThuoc: cauHoiThuoc, cauHoiLuyen: cauHoiLuyen, manHinhSo: manHinhSo };
})();
