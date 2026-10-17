// Bộ chạy câu hỏi trắc nghiệm: dùng cho Cửa ải (khóa bí kíp), thử thách, nghe và chọn, Luyện nhanh.
//
// Mỗi câu hỏi: {
//   hoi: 'chữ tiếng Việt',
//   czHoi: { chu, tu?, khoa? }   chữ Séc hiện to (khoa = không cho tra nghĩa)
//   phu: 'dòng nhỏ dưới chữ Séc (ví dụ emoji + nghĩa)'
//   nghe: 'chữ Séc'              có nút 🔊 và tự đọc khi hiện câu
//   dap: 'đáp án đúng', luaChon: [...]
//   luaChonCz: true  → mỗi lựa chọn có nút "?" xem nghĩa
//   luaChonLon: true → lựa chọn là emoji, hiện to thành hàng
//   goiY: 'nghĩa' → có nút 💡 (không dùng ở Cửa ải); dùng gợi ý thì không tính "không cần gợi ý"
//   nhac: 'lời nhắc khi sai' (nếu không có thì nhắc câu thần chú, trừ trong Cửa ải)
//   tuKhoa: từ để ghi nhận đúng / sai
//   anNghia: true → không có nút "?" ở các lựa chọn (câu hỏi kiểm tra chính nghĩa của từ)
// }
// khiXong(soDung, tong, ketQua[], khongGoiY[])
window.PK = window.PK || {};

(function () {
  // Mỗi câu phải có đúng một đáp án đúng, các lựa chọn không trùng nhau.
  function hopLe(q) {
    if (!q || !Array.isArray(q.luaChon) || q.luaChon.length < 2) return false;
    if (q.luaChon.filter(function (x) { return x === q.dap; }).length !== 1) return false;
    return new Set(q.luaChon).size === q.luaChon.length;
  }

  // Lựa chọn là chữ Séc đã có nghĩa trong dữ liệu thì cho chạm "?" để xem.
  function coNghia(chu) {
    const k = PK.duLieu.chuan(chu);
    return PK.tuDien.has(k) || PK.cauTheoChu.has(k);
  }

  function chay(khung, cauHinh) {
    const h = PK.ui.h;
    const ds = cauHinh.cauHoi.filter(function (q) {
      if (!hopLe(q)) { console.warn('Bỏ câu hỏi không hợp lệ:', q); return false; }
      return true;
    });
    const ketQua = [];
    const khongGoiY = [];
    const laCuaAi = cauHinh.cheDo === 'cua-ai';
    let i = 0;

    function veCau() {
      const q = ds[i];
      let daGoiY = false;
      const chamTienDo = h('div', { class: 'tien-do', 'aria-label': 'Câu ' + (i + 1) + ' trên ' + ds.length },
        ds.map(function (_, k) { return h('i', { class: k < i ? (ketQua[k] ? 'dung' : 'sai') : (k === i ? 'dang' : '') }); }));

      const nutBiKip = !cauHinh.biKip ? null : laCuaAi
        ? h('button', { class: 'nut-tron', 'aria-disabled': 'true', 'aria-label': 'Bí kíp bị khóa', onclick: function () { PK.ui.thongBao('🔒 Trong Cửa ải phải tự nhớ bí kíp nhé! Chạm chữ Séc thì vẫn xem được nghĩa.'); }, style: 'opacity:.55' }, '🔒')
        : h('button', { class: 'nut-tron', 'aria-label': 'Xem bí kíp', onclick: function () { PK.biKip.xemThe(cauHinh.biKip); } }, '📜');

      const phanHoi = h('div', { 'aria-live': 'polite' });
      const hopGoiY = h('div', { class: 'goi-y', hidden: true });
      const nutGoiY = q.goiY && !laCuaAi
        ? h('button', { class: 'nut nho phu', onclick: function () {
          daGoiY = true; hopGoiY.textContent = '💡 ' + q.goiY; hopGoiY.hidden = false; nutGoiY.hidden = true;
        } }, '💡 Gợi ý nghĩa')
        : null;
      const nutTiep = h('button', { class: 'nut rong', hidden: true, onclick: function () {
        i++;
        if (i < ds.length) veCau(); else cauHinh.khiXong(ketQua.filter(Boolean).length, ds.length, ketQua, khongGoiY);
      } }, i + 1 < ds.length ? 'Câu tiếp →' : 'Xem kết quả');

      const cacNut = [];
      const luaChon = h('div', { class: 'lua-chon' + (q.luaChonLon ? ' hang' : '') }, PK.ui.tron(q.luaChon).map(function (lc) {
        const nut = h('button', { class: 'chon' + (q.luaChonLon ? ' lon' : ''), 'data-dap': lc === q.dap ? '1' : null, onclick: function () { chon(lc, nut); } }, lc);
        cacNut.push(nut);
        return h('div', { class: 'dong-chon' }, nut,
          (q.luaChonCz || coNghia(lc)) && !q.luaChonLon && !q.anNghia ? h('button', { class: 'nut-tron', 'aria-label': 'Xem nghĩa', onclick: function () { PK.ui.moTraNghia(lc); } }, '?') : null);
      }));

      function chon(lc, nut) {
        if (ketQua.length > i) return;
        const dung = lc === q.dap;
        ketQua.push(dung);
        khongGoiY.push(!daGoiY);
        cacNut.forEach(function (n) { n.disabled = true; if (n.textContent === q.dap) n.classList.add('dung'); });
        if (!dung) nut.classList.add('sai');
        PK.am.nhac(dung ? 'dung' : 'sai');
        if (q.tuKhoa && cauHinh.ghiNhan) cauHinh.ghiNhan(q.tuKhoa, dung);
        if (nutGoiY) nutGoiY.hidden = true;
        const nhac = q.nhac || (!laCuaAi && cauHinh.biKip ? cauHinh.biKip.than_chu : '');
        phanHoi.replaceChildren(dung
          ? PK.ui.loi('pes', ['Đúng rồi! ', h('b', null, '🎉')])
          : PK.ui.loi('kocka', ['Chưa đúng. Đáp án là ', h('b', null, q.dap), '. ', nhac ? h('i', null, nhac) : ''], true));
        nutTiep.hidden = false;
        nutTiep.focus();
      }

      khung.replaceChildren(
        h('div', { class: 'hang-nut', style: 'align-items:center;flex-wrap:nowrap' },
          h('div', { style: 'flex:1' }, chamTienDo), nutBiKip),
        h('div', { class: 'the' },
          h('div', { class: 'nhat' }, (cauHinh.nhan || (laCuaAi ? '🚪 Cửa ải' : '⚡ Luyện')) + ' · Câu ' + (i + 1) + '/' + ds.length),
          h('div', { class: 'cau-hoi-chu' }, q.hoi),
          q.czHoi ? h('div', { style: 'display:flex;align-items:center;gap:10px;font-size:1.8rem;flex-wrap:wrap' },
            q.czHoi.tu ? PK.ui.czTu(PK.d.danh_tu.find(function (t) { return t.tu === q.czHoi.tu; }), { khoa: q.czHoi.khoa })
              : PK.ui.cz(q.czHoi.chu, { khoa: q.czHoi.khoa }),
            q.nghe ? PK.ui.nutNghe(q.nghe) : null) : (q.nghe ? PK.ui.nutNghe(q.nghe) : null),
          q.phu ? h('div', { class: 'nhat', style: 'font-size:1.05rem' }, q.phu) : null,
          nutGoiY, hopGoiY,
          luaChon),
        phanHoi, nutTiep);
      if (q.nghe) PK.am.noi(q.nghe);
    }

    if (!ds.length) { cauHinh.khiXong(0, 0, [], []); return; }
    veCau();
  }

  // Số sao theo điểm Cửa ải (10 câu): 10 → 3 sao, 9 → 2 sao, 8 → 1 sao.
  function soSao(dung, tong) {
    const thieu = tong - dung;
    if (dung < Math.ceil(tong * 0.8)) return 0;
    return thieu === 0 ? 3 : thieu === 1 ? 2 : 1;
  }

  // Cả bước Cửa ải của một màn: giới thiệu → 10 câu → qua màn hoặc xem lại bí kíp rồi thử lại.
  // o = { hoSo, so, bk, deThi(): câu hỏi[], khoaBiKip(bool), tiep() }
  function vaoCuaAi(k, o) {
    const h = PK.ui.h;
    function batDau() {
      k.replaceChildren();
      o.khoaBiKip(true);
      chay(k, {
        cheDo: 'cua-ai',
        biKip: o.bk,
        cauHoi: o.deThi(),
        ghiNhan: function (tu, dung) { PK.luu.ghiTu(o.hoSo.id, tu, dung); },
        khiXong: function (dung, tong) {
          const sao = soSao(dung, tong);
          PK.luu.capNhat(o.hoSo.id, function (d) {
            const m = d.man[o.so] = d.man[o.so] || { qua: false, sao: 0, diemCao: 0, lanThu: 0 };
            m.lanThu++;
            m.diemCao = Math.max(m.diemCao, dung);
            if (sao) {
              m.qua = true; m.sao = Math.max(m.sao, sao);
              const b = d.biKip[o.bk.id] = Object.assign({ mo: true }, d.biKip[o.bk.id] || {});
              b.thuoc = true; b.diem = Math.max(b.diem || 0, dung);
            }
          });
          // Hộp nhớ của bí kíp: qua cửa lần đầu thì vào hộp 1; đã có hộp thì đúng lên hộp, trượt về hộp 1.
          if (sao) PK.luu.danhDauMuc(o.hoSo.id, 'biKip', o.bk.id);
          PK.luu.ghiMuc(o.hoSo.id, 'biKip', o.bk.id, !!sao);
          if (sao) { o.tiep(); return; }
          PK.am.nhac('cham');
          o.khoaBiKip(false);
          k.replaceChildren(
            h('div', { class: 'the ket-qua' }, h('h2', null, 'Đúng ' + dung + '/' + tong)),
            PK.ui.loi('kocka', 'Gần tới rồi! Cần 8 câu đúng để qua cửa. Sao đã có vẫn giữ nguyên. Mình xem lại bí kíp một chút nhé.', true),
            PK.biKip.theBiKip(o.bk),
            h('button', { class: 'nut rong', onclick: function () { o.khoaBiKip(true); batDau(); } }, '🚪 Thử lại Cửa ải'));
        }
      });
    }
    k.append(
      PK.ui.loi('pes', 'Tới Cửa ải rồi! Có 10 câu. Đúng từ 8 câu trở lên là qua cửa.'),
      PK.ui.loi('kocka', 'Nút 📜 bị khóa, phải tự nhớ bí kíp nhé. Chạm vào chữ Séc thì vẫn xem được nghĩa. Sẵn sàng chưa?', true),
      h('button', { class: 'nut rong', onclick: batDau }, '🚪 Vào Cửa ải'));
  }

  PK.cuaAi = { chay: chay, hopLe: hopLe, soSao: soSao, vaoCuaAi: vaoCuaAi };
})();
