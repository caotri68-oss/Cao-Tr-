// Khu "Đi chợ thật": số đếm, giá tiền, câu mua bán.
// Chỉ mở khi data/tu-vung.json có phần "cho_that" với ít nhất 1 mục. Game không tự thêm số hay câu nào.
//   "cho_that": {
//     "so_dem": [{ "cz": "", "phien_am": "", "nghia": "", "so": 1 }],
//     "cau":    [{ "cz": "", "phien_am": "", "nghia": "", "tinh_huong": "" }]
//   }
window.PK = window.PK || {};

(function () {
  const h = function () { return PK.ui.h.apply(null, arguments); };
  const tron = function (a) { return PK.ui.tron(a); };
  const coChu = function (x) { return typeof x === 'string' && x.trim() !== ''; };

  // Lấy các mục dùng được; mục thiếu "cz" hoặc "nghia" (hoặc số đếm thiếu "so") bị bỏ qua, không làm hỏng game.
  function duLieu() {
    const ct = (PK.d && PK.d.cho_that) || {};
    const soDem = Array.isArray(ct.so_dem) ? ct.so_dem : [];
    const cau = Array.isArray(ct.cau) ? ct.cau : [];
    const tot = function (x) { return x && coChu(x.cz) && coChu(x.nghia); };
    const kq = {
      soDem: soDem.filter(function (x) { return tot(x) && typeof x.so === 'number'; }),
      cau: cau.filter(tot)
    };
    kq.boQua = soDem.length + cau.length - kq.soDem.length - kq.cau.length;
    kq.tatCa = kq.soDem.concat(kq.cau);
    return kq;
  }
  function daMo() { return duLieu().tatCa.length > 0; }
  function timMuc(cz) { return duLieu().tatCa.find(function (x) { return x.cz === cz; }) || null; }

  function nghiaSai(dap, ds, so) {
    const kq = [];
    tron(ds).forEach(function (x) { if (kq.length < so && x !== dap && kq.indexOf(x) < 0) kq.push(x); });
    return kq;
  }

  function chay(vung, hoSo, veNha) {
    const dl = duLieu();
    const nhan = h('div', { class: 'buoc-nhan' });
    const k = h('div', { style: 'display:flex;flex-direction:column;gap:16px' });
    vung.replaceChildren(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut-tron', 'aria-label': 'Về chợ', onclick: veNha }, '🏠'),
        h('h2', null, '🛒 Đi chợ thật')),
      nhan, k);
    const nutTiep = function (chu, fn) { return h('button', { class: 'nut rong', onclick: fn }, chu); };
    const ghi = function (cz, dung) { PK.luu.ghiMuc(hoSo.id, 'cau', cz, dung); };

    // Bước 1: học từng mục (nghe, đọc theo), vào hộp nhớ để "Ôn hôm nay" ôn lại.
    function hoc() {
      nhan.textContent = 'Học số và câu mua bán';
      dl.tatCa.forEach(function (x) { PK.duLieu.dangKyCau(x.cz, x.phien_am, x.nghia); PK.luu.danhDauMuc(hoSo.id, 'cau', x.cz); });
      k.replaceChildren(
        PK.ui.loi('pes', 'Ở chợ thật cần nghe số và giá tiền. Chạm 🔊 để nghe, 🎤 để đọc theo.'),
        h('div', { style: 'display:flex;flex-direction:column;gap:12px' }, dl.tatCa.map(function (x) {
          return h('div', { class: 'the' },
            h('div', { class: 'the-cau' },
              h('div', null,
                h('div', { style: 'font-size:1.4rem' }, PK.ui.cz(x.cz), typeof x.so === 'number' ? h('b', null, '  = ' + x.so) : null),
                coChu(x.phien_am) ? h('div', { class: 'phien-am' }, '[' + x.phien_am + ']') : null,
                h('div', null, x.nghia),
                coChu(x.tinh_huong) ? h('div', { class: 'nhat' }, '📍 ' + x.tinh_huong) : null),
              PK.ui.nutNghe(x.cz)),
            PK.ui.docTheo(x.cz));
        })),
        nutTiep('Tiếp: nghe và chọn →', ngheChon));
      window.scrollTo(0, 0);
    }

    // Bước 2: nghe rồi chọn nghĩa.
    function ngheChon() {
      nhan.textContent = 'Nghe và chọn';
      const nghia = dl.tatCa.map(function (x) { return x.nghia; }).concat(PK.d.cau.map(function (c) { return c.nghia; }));
      PK.cuaAi.chay(k, {
        cheDo: 'hoc', nhan: '👂 Nghe và chọn',
        cauHoi: tron(dl.tatCa).slice(0, 8).map(function (x) {
          return { hoi: 'Nghe và chọn nghĩa đúng:', czHoi: { chu: x.cz, khoa: true }, nghe: x.cz, dap: x.nghia,
            luaChon: [x.nghia].concat(nghiaSai(x.nghia, nghia, 2)), anNghia: true, tuKhoa: x.cz };
        }),
        ghiNhan: ghi,
        khiXong: function (dung, tong) {
          k.replaceChildren(h('div', { class: 'the ket-qua' }, h('h2', null, 'Đúng ' + dung + '/' + tong)), nutTiep('Tiếp →', traTien));
        }
      });
    }

    // Bước 3: trả tiền đúng: cô bán hàng nói giá, chọn số tiền đúng (cần ít nhất 2 số đếm).
    function traTien() {
      if (dl.soDem.length < 2) { hoiThoai(); return; }
      nhan.textContent = 'Trả tiền đúng';
      const cacSo = dl.soDem.map(function (x) { return String(x.so); });
      PK.cuaAi.chay(k, {
        cheDo: 'hoc', nhan: '💰 Trả tiền đúng',
        cauHoi: tron(dl.soDem).slice(0, 6).map(function (x) {
          return { hoi: 'Cô bán hàng nói giá. Bạn đưa bao nhiêu tiền?', nghe: x.cz, dap: String(x.so),
            luaChon: [String(x.so)].concat(nghiaSai(String(x.so), cacSo, 2)), luaChonLon: true, anNghia: true,
            goiY: x.cz + ' = ' + x.nghia, tuKhoa: x.cz };
        }),
        ghiNhan: ghi,
        khiXong: function (dung, tong) {
          k.replaceChildren(h('div', { class: 'the ket-qua' }, h('h2', null, 'Đúng ' + dung + '/' + tong)), nutTiep('Tiếp →', hoiThoai));
        }
      });
    }

    // Bước 4: hội thoại: đọc tình huống, chọn câu nói đúng (cần ít nhất 2 câu).
    function hoiThoai() {
      if (dl.cau.length < 2) { ket(); return; }
      nhan.textContent = 'Nói chuyện ở chợ';
      const cacCau = dl.cau.map(function (x) { return x.cz; });
      PK.cuaAi.chay(k, {
        cheDo: 'hoc', nhan: '🗣 Nói chuyện ở chợ',
        cauHoi: tron(dl.cau).slice(0, 6).map(function (x) {
          return { hoi: (coChu(x.tinh_huong) ? x.tinh_huong + ' ' : '') + 'Bạn muốn nói: "' + x.nghia + '". Chọn câu đúng:',
            dap: x.cz, luaChon: [x.cz].concat(nghiaSai(x.cz, cacCau, 2)), anNghia: true, tuKhoa: x.cz };
        }),
        ghiNhan: ghi,
        khiXong: function (dung, tong) {
          k.replaceChildren(h('div', { class: 'the ket-qua' }, h('h2', null, 'Đúng ' + dung + '/' + tong)), nutTiep('Xong →', ket));
        }
      });
    }

    function ket() {
      nhan.textContent = 'Xong';
      PK.am.nhac('sao');
      k.replaceChildren(
        PK.ui.loi('pes', 'Đi chợ thật xong rồi! Các câu này sẽ có trong "Ôn hôm nay" để nhớ lâu.'),
        h('button', { class: 'nut rong', onclick: veNha }, '🏠 Về chợ'));
    }

    hoc();
  }

  PK.choThat = { chay: chay, daMo: daMo, duLieu: duLieu, timMuc: timMuc };
})();
