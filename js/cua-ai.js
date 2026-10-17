// Bộ chạy câu hỏi trắc nghiệm: dùng cho Cửa ải (khóa bí kíp) và Luyện nhanh.
//
// Mỗi câu hỏi: {
//   hoi: 'chữ tiếng Việt',
//   czHoi: { chu, tu?, khoa? }   chữ Séc hiện to (khoa = không cho tra nghĩa)
//   nghe: 'chữ Séc'              có nút 🔊 và tự đọc khi hiện câu
//   dap: 'đáp án đúng', luaChon: [...], luaChonCz: true nếu lựa chọn là chữ Séc
//   tuKhoa: 'từ để ghi nhận đúng/sai' (tuỳ chọn)
// }
window.PK = window.PK || {};

(function () {
  // Mỗi câu phải có đúng một đáp án đúng, các lựa chọn không trùng nhau.
  function hopLe(q) {
    if (!q || !Array.isArray(q.luaChon) || q.luaChon.length < 2) return false;
    if (q.luaChon.filter(function (x) { return x === q.dap; }).length !== 1) return false;
    return new Set(q.luaChon).size === q.luaChon.length;
  }

  function chay(khung, cauHinh) {
    const h = PK.ui.h;
    const ds = cauHinh.cauHoi.filter(function (q) {
      if (!hopLe(q)) { console.warn('Bỏ câu hỏi không hợp lệ:', q); return false; }
      return true;
    });
    const ketQua = [];
    let i = 0;

    function veCau() {
      const q = ds[i];
      const chamTienDo = h('div', { class: 'tien-do', 'aria-label': 'Câu ' + (i + 1) + ' trên ' + ds.length },
        ds.map(function (_, k) { return h('i', { class: k < i ? (ketQua[k] ? 'dung' : 'sai') : (k === i ? 'dang' : '') }); }));

      const nutBiKip = cauHinh.cheDo === 'cua-ai'
        ? h('button', { class: 'nut-tron', 'aria-disabled': 'true', 'aria-label': 'Bí kíp bị khóa', onclick: function () { PK.ui.thongBao('🔒 Trong Cửa ải phải tự nhớ bí kíp nhé! Chạm chữ Séc thì vẫn xem được nghĩa.'); }, style: 'opacity:.55' }, '🔒')
        : h('button', { class: 'nut-tron', 'aria-label': 'Xem bí kíp', onclick: function () { PK.biKip.xemThe(cauHinh.biKip); } }, '📜');

      const phanHoi = h('div', { 'aria-live': 'polite' });
      const nutTiep = h('button', { class: 'nut rong', hidden: true, onclick: function () { i++; if (i < ds.length) veCau(); else cauHinh.khiXong(ketQua.filter(Boolean).length, ds.length, ketQua); } }, i + 1 < ds.length ? 'Câu tiếp →' : 'Xem kết quả');

      const cacNut = [];
      const luaChon = h('div', { class: 'lua-chon' }, PK.ui.tron(q.luaChon).map(function (lc) {
        const nut = h('button', { class: 'chon', onclick: function () { chon(lc, nut); } }, lc);
        cacNut.push(nut);
        return h('div', { class: 'dong-chon' }, nut,
          q.luaChonCz ? h('button', { class: 'nut-tron', 'aria-label': 'Xem nghĩa', onclick: function () { PK.ui.moTraNghia(lc); } }, '?') : null);
      }));

      function chon(lc, nut) {
        if (ketQua.length > i) return;
        const dung = lc === q.dap;
        ketQua.push(dung);
        cacNut.forEach(function (n) { n.disabled = true; if (n.textContent === q.dap) n.classList.add('dung'); });
        if (!dung) nut.classList.add('sai');
        PK.am.nhac(dung ? 'dung' : 'sai');
        if (q.tuKhoa && cauHinh.ghiNhan) cauHinh.ghiNhan(q.tuKhoa, dung);
        phanHoi.replaceChildren(dung
          ? PK.ui.loi('pes', ['Đúng rồi! ', h('b', null, '🎉')])
          : PK.ui.loi('kocka', ['Chưa đúng. Đáp án là ', h('b', null, q.dap), '.', cauHinh.cheDo === 'luyen' && cauHinh.biKip ? [' Nhớ: ', h('i', null, cauHinh.biKip.than_chu)] : ''], true));
        nutTiep.hidden = false;
        nutTiep.focus();
      }

      khung.replaceChildren(
        h('div', { class: 'hang-nut', style: 'align-items:center;flex-wrap:nowrap' },
          h('div', { style: 'flex:1' }, chamTienDo), nutBiKip),
        h('div', { class: 'the' },
          h('div', { class: 'nhat' }, (cauHinh.cheDo === 'cua-ai' ? '🚪 Cửa ải · ' : '⚡ Luyện · ') + 'Câu ' + (i + 1) + '/' + ds.length),
          h('div', { class: 'cau-hoi-chu' }, q.hoi),
          q.czHoi ? h('div', { style: 'display:flex;align-items:center;gap:10px;font-size:1.8rem' },
            q.czHoi.tu ? PK.ui.czTu(PK.d.danh_tu.find(function (t) { return t.tu === q.czHoi.tu; }), { khoa: q.czHoi.khoa })
              : PK.ui.cz(q.czHoi.chu, { khoa: q.czHoi.khoa }),
            q.nghe ? PK.ui.nutNghe(q.nghe) : null) : (q.nghe ? PK.ui.nutNghe(q.nghe) : null),
          luaChon),
        phanHoi, nutTiep);
      if (q.nghe) PK.am.noi(q.nghe);
    }

    if (!ds.length) { cauHinh.khiXong(0, 0, []); return; }
    veCau();
  }

  // Số sao theo điểm Cửa ải (10 câu): 10 → 3 sao, 9 → 2 sao, 8 → 1 sao.
  function soSao(dung, tong) {
    const thieu = tong - dung;
    if (dung < Math.ceil(tong * 0.8)) return 0;
    return thieu === 0 ? 3 : thieu === 1 ? 2 : 1;
  }

  PK.cuaAi = { chay: chay, hopLe: hopLe, soSao: soSao };
})();
