// Màn 0: hướng dẫn. Chó Pes và mèo Kočka giới thiệu luật, cho thử từng thao tác,
// mở bí kíp BK0 rồi vượt Cửa ải đầu tiên.
window.PK = window.PK || {};

(function () {
  const SO_MAN = 0;

  function cau(cz) {
    const c = PK.d.cau.find(function (x) { return x.cz === cz; });
    if (!c) console.warn('Không thấy câu trong dữ liệu:', cz);
    return c || { cz: cz, phien_am: '', nghia: '' };
  }
  function tu(chu) { return PK.d.danh_tu.find(function (t) { return t.tu === chu; }); }

  // ---------- Câu hỏi cho BK0: đọc đúng chữ Séc ----------
  // Lấy từ ví dụ của BK0 và danh từ có phiên âm kiểu Việt (không lấy từ bẫy).
  function khoDoc() {
    const bk = PK.biKipTheoMan.get(0);
    const ds = (bk.vi_du || []).map(function (v) { const t = PK.duLieu.tachNgoac(v); return { chu: t.cz, pa: t.phien_am }; })
      .filter(function (x) { return x.pa; });
    PK.d.danh_tu.forEach(function (t) {
      if (t.bay || !t.phien_am || ['so-tay', 'pes-kocka'].indexOf(t.nguon) < 0) return;
      if (!/ch|[jcčšžřňěáéíóúůý]/i.test(t.tu)) return;
      ds.push({ chu: t.tu, pa: t.phien_am, tu: t.tu });
    });
    return ds;
  }
  function cauHoiDoc(so) {
    const kho = khoDoc();
    return PK.ui.tron(kho).slice(0, so).map(function (x) {
      const nhieu = PK.ui.tron(kho.filter(function (y) { return y.pa !== x.pa; })).slice(0, 2).map(function (y) { return '[' + y.pa + ']'; });
      return {
        hoi: 'Dùng 4 mật mã: chữ này đọc thế nào?',
        czHoi: { chu: x.chu, tu: x.tu, khoa: true }, // khóa tra nghĩa vì thẻ tra có sẵn phiên âm
        dap: '[' + x.pa + ']',
        luaChon: ['[' + x.pa + ']'].concat(nhieu),
        tuKhoa: x.tu
      };
    });
  }
  PK.taoCauHoi.BK0 = cauHoiDoc;

  // Nghe câu chào rồi chọn nghĩa (câu của màn 0).
  function cauHoiNghia(so) {
    const ds = PK.d.cau.filter(function (c) { return c.man === SO_MAN; });
    return PK.ui.tron(ds).slice(0, so).map(function (c) {
      const sai = PK.ui.tron(ds.filter(function (x) { return x.nghia !== c.nghia; })).slice(0, 2).map(function (x) { return x.nghia; });
      return { hoi: 'Nghe và chọn nghĩa đúng:', czHoi: { chu: c.cz, khoa: true }, nghe: c.cz, dap: c.nghia, luaChon: [c.nghia].concat(sai) };
    });
  }

  // Cửa ải màn 0: 4 câu về bí kíp + 4 câu đọc từ + 2 câu nghe chọn nghĩa = 10 câu.
  function deCuaAi() {
    const bk = PK.biKipTheoMan.get(0);
    return PK.ui.tron(
      PK.ui.tron(PK.biKip.cauHoiThuoc(bk)).slice(0, 4)
        .concat(cauHoiDoc(4))
        .concat(cauHoiNghia(2)));
  }

  // ---------- Khung chung ----------
  function chay(vung, hoSo, veNha) {
    const h = PK.ui.h;
    const bk = PK.biKipTheoMan.get(0);
    const nguoi = hoSo.ten;

    const nutBiKip = h('button', { class: 'nut-tron', 'aria-label': 'Xem bí kíp', onclick: function () {
      if (nutBiKip.getAttribute('aria-disabled') === 'true') { PK.ui.thongBao(daMoBK() ? '🔒 Trong Cửa ải phải tự nhớ bí kíp nhé!' : 'Bạn chưa mở bí kíp nào. Sắp có rồi!'); return; }
      PK.biKip.xemThe(bk, !!(PK.luu.doc(hoSo.id).biKip.BK0 || {}).thuoc);
    } }, '📜');
    const noiDung = h('div', { style: 'display:flex;flex-direction:column;gap:16px' });
    vung.replaceChildren(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut-tron', 'aria-label': 'Về nhà', onclick: veNha }, '🏠'),
        h('h2', null, 'Màn 0 · Cổng chợ'),
        nutBiKip),
      noiDung);

    function daMoBK() { return !!(PK.luu.doc(hoSo.id).biKip.BK0 || {}).mo; }
    function khoaBiKip(khoa) {
      nutBiKip.setAttribute('aria-disabled', khoa ? 'true' : 'false');
      nutBiKip.style.opacity = khoa ? '.45' : '1';
    }

    function di(so) {
      PK.luu.capNhat(hoSo.id, function (d) { d.buoc[SO_MAN] = so; });
      khoaBiKip(!daMoBK() || BUOC[so].ten === 'cua-ai');
      noiDung.replaceChildren();
      window.scrollTo(0, 0);
      BUOC[so].ve(noiDung, function () { di(so + 1); });
    }

    function nutTiep(chu, batDauKhoa) {
      const n = h('button', { class: 'nut rong', disabled: !!batDauKhoa }, chu || 'Tiếp →');
      return n;
    }

    const BUOC = [
      { ten: 'chao', ve: function (k, tiep) {
        const n = nutTiep('Chào Pes và Kočka! →'); n.onclick = tiep;
        k.append(
          PK.ui.loi('pes', ['Chào ', h('b', null, nguoi), '! Mình là ', PK.ui.cz('pes'), ', chú chó.']),
          PK.ui.loi('kocka', ['Còn mình là ', PK.ui.cz('kočka'), ', cô mèo. Hôm nay tụi mình dẫn bạn đi chợ ở Séc!'], true),
          n);
      } },
      { ten: 'luat', ve: function (k, tiep) {
        const n = nutTiep('Mình hiểu rồi →'); n.onclick = tiep;
        k.append(
          PK.ui.loi('pes', 'Ở chợ này, muốn qua cửa thì phải có bí kíp!'),
          PK.ui.loi('kocka', 'Mỗi màn mình tặng bạn một bí kíp. Thuộc bí kíp thì qua cửa ải.', true),
          PK.ui.loi('pes', 'Không ai bị phạt đâu. Sai thì tụi mình nhắc, rồi thử lại. Chơi thong thả nhé!'),
          n);
      } },
      { ten: 'thu-nghe', ve: function (k, tiep) {
        const n = nutTiep(null, true); n.onclick = tiep;
        const c = cau('Dobrý den.');
        k.append(
          PK.ui.loi('pes', ['Thao tác 1: chạm nút ', h('b', null, '🔊'), ' để nghe tiếng Séc.']),
          h('div', { class: 'the', style: 'align-items:center;text-align:center' },
            h('div', { style: 'font-size:1.8rem' }, PK.ui.cz(c.cz)),
            h('button', { class: 'nut', onclick: function () { PK.am.noi(c.cz); n.disabled = false; } }, '🔊 Nghe')),
          h('p', { class: 'nhat' }, 'Không nghe thấy gì? Kiểm tra âm lượng máy. Nếu máy chưa có giọng tiếng Séc, game sẽ chỉ cách cài.'),
          n);
      } },
      { ten: 'thu-tra', ve: function (k, tiep) {
        const n = nutTiep(null, true); n.onclick = tiep;
        const c = cau('Dobrý den.');
        function daTra() { n.disabled = false; document.removeEventListener('pk:da-tra', daTra); }
        document.addEventListener('pk:da-tra', daTra);
        k.append(
          PK.ui.loi('kocka', ['Thao tác 2: không hiểu chữ Séc nào thì ', h('b', null, 'chạm vào chữ đó'), ' (chữ có gạch chấm chấm bên dưới) để xem nghĩa. Thử chạm vào câu bên dưới nhé!'], true),
          h('div', { class: 'the', style: 'align-items:center' }, h('div', { style: 'font-size:1.8rem' }, PK.ui.cz(c.cz))),
          n);
      } },
      { ten: 'thu-mic', ve: function (k, tiep) {
        const n = nutTiep(null, true); n.onclick = tiep;
        const c = cau('Dobrý den.');
        k.append(
          PK.ui.loi('pes', ['Thao tác 3: chạm ', h('b', null, '🎤 Đọc theo'), ', đọc to câu này, rồi bấm ⏹ Xong. Game cho bạn nghe giọng mẫu xen với giọng bạn để tự so sánh.']),
          h('div', { class: 'the' },
            h('div', { class: 'the-cau' }, h('div', null, h('div', { style: 'font-size:1.5rem' }, PK.ui.cz(c.cz)), h('div', { class: 'phien-am' }, '[' + c.phien_am + ']')), PK.ui.nutNghe(c.cz)),
            PK.ui.docTheo(c.cz, function () { n.disabled = false; })),
          n);
      } },
      { ten: 'thu-gio', ve: function (k, tiep) {
        // Thử chạm giỏ: Pes chỉ sẵn giỏ đúng, vì luật TEN/TA/TO học ở màn 1.
        const mon = [tu('pes'), tu('kočka'), tu('auto')].filter(Boolean);
        const tenMau = { TEN: 'xanh dương', TA: 'hồng', TO: 'xanh lá' };
        let j = 0;
        function veMon() {
          const t = mon[j];
          const loiNhac = h('div');
          const gio = ['TEN', 'TA', 'TO'].map(function (g) {
            const b = h('button', { class: 'gio ' + g, onclick: function () {
              if (g === t.giong) {
                PK.am.nhac('dung');
                j++;
                if (j < mon.length) veMon(); else ketThuc();
              } else {
                PK.am.nhac('sai');
                b.classList.remove('lac'); void b.offsetWidth; b.classList.add('lac');
                loiNhac.replaceChildren(PK.ui.loi('kocka', 'Gần đúng rồi! Chạm giỏ ' + t.giong + ' màu ' + tenMau[t.giong] + ' nhé.', true));
              }
            } }, g);
            return b;
          });
          k.replaceChildren(
            PK.ui.loi('pes', ['Thao tác 4: mỗi món hàng có một giỏ. ', PK.ui.czTu(t), ' đi vào giỏ ', h('b', { class: 'g-' + t.giong }, t.giong + ' (' + tenMau[t.giong] + ')'), '. Chạm vào giỏ đó!']),
            h('div', { class: 'the', style: 'align-items:center' },
              h('div', { class: 'mon-hang' }, t.emoji),
              h('div', { style: 'font-size:1.6rem' }, PK.ui.czTu(t))),
            h('div', { class: 'ba-gio' }, gio),
            loiNhac,
            h('p', { class: 'nhat' }, 'Món ' + (j + 1) + '/' + mon.length + '. Màu giỏ: TEN xanh dương · TA hồng · TO xanh lá.'));
        }
        function ketThuc() {
          const n = nutTiep('Tiếp →'); n.onclick = tiep;
          k.replaceChildren(
            PK.ui.loi('kocka', 'Giỏi quá! Vì sao món nào vào giỏ nào thì màn 1 có bí kíp giải thích.', true),
            n);
        }
        if (mon.length) veMon(); else ketThuc();
      } },
      { ten: 'hoc-cau', ve: function (k, tiep) {
        const n = nutTiep('Đi chào cô bán hàng →'); n.onclick = tiep;
        const ds = PK.d.cau.filter(function (c) { return c.man === SO_MAN; });
        k.append(
          PK.ui.loi('pes', 'Trước khi vào chợ, học 5 câu chào hỏi đã. Chạm 🔊 để nghe, 🎤 để đọc theo.'),
          h('div', { style: 'display:flex;flex-direction:column;gap:12px' }, ds.map(function (c) {
            return h('div', { class: 'the' },
              h('div', { class: 'the-cau' },
                h('div', null,
                  h('div', { style: 'font-size:1.4rem' }, PK.ui.cz(c.cz)),
                  c.phien_am ? h('div', { class: 'phien-am' }, '[' + c.phien_am + ']') : null,
                  h('div', null, c.nghia)),
                PK.ui.nutNghe(c.cz)),
              PK.ui.docTheo(c.cz));
          })),
          n);
      } },
      { ten: 'hoi-thoai', ve: function (k, tiep) {
        // Thao tác 5: chọn câu đáp. Mọi câu đều lấy từ phần "cau" của màn 0.
        const LUOT = [
          { co: 'Dobrý den.', chon: ['Dobrý den.', 'Ahoj!'], dung: 'Dobrý den.', nhac: '"Ahoj!" dùng để chào bạn bè. Với cô bán hàng (người lớn), mình nói "Dobrý den." nhé.' },
          { co: 'Prosím.', canh: 'Cô đưa túi hàng cho bạn.', chon: ['Děkuju.', 'Na shledanou!'], dung: 'Děkuju.', nhac: 'Được nhận hàng thì nói cảm ơn: "Děkuju."' },
          { co: 'Prosím.', canh: 'Cô nói "không có gì". Giờ bạn chào tạm biệt.', chon: ['Na shledanou!', 'Ahoj!'], dung: 'Na shledanou!', nhac: 'Chào tạm biệt người lớn thì nói "Na shledanou!". "Ahoj!" dành cho bạn bè.' }
        ];
        const khungThoai = h('div', { class: 'hoi-thoai' });
        const vungChon = h('div', { class: 'lua-chon' });
        k.append(PK.ui.loi('kocka', 'Thao tác 5: cô bán hàng (prodavačka) nói, bạn chọn câu đáp đúng. Chạm "?" để xem nghĩa câu trước khi chọn.', true), khungThoai, vungChon);
        let j = 0;
        function luot() {
          const L = LUOT[j];
          if (L.canh) khungThoai.append(h('p', { class: 'nhat' }, '(' + L.canh + ')'));
          khungThoai.append(PK.ui.loi('prodavacka', [PK.ui.cz(L.co), ' ', PK.ui.nutNghe(L.co)]));
          PK.am.noi(L.co);
          vungChon.replaceChildren(...PK.ui.tron(L.chon).map(function (lc) {
            const nut = h('button', { class: 'chon', onclick: function () {
              if (lc === L.dung) {
                PK.am.nhac('dung');
                khungThoai.append(PK.ui.loi(hoSo.anh, PK.ui.cz(lc), true));
                PK.am.noi(lc);
                j++;
                vungChon.replaceChildren();
                setTimeout(j < LUOT.length ? luot : ketThuc, 900);
              } else {
                PK.am.nhac('sai');
                nut.classList.add('sai'); nut.disabled = true;
                khungThoai.append(PK.ui.loi('kocka', L.nhac, true));
              }
            } }, lc);
            return h('div', { class: 'dong-chon' }, nut, h('button', { class: 'nut-tron', 'aria-label': 'Xem nghĩa', onclick: function () { PK.ui.moTraNghia(lc); } }, '?'));
          }));
        }
        function ketThuc() {
          khungThoai.append(PK.ui.loi('prodavacka', [PK.ui.cz('Na shledanou!'), ' ', PK.ui.nutNghe('Na shledanou!')]));
          PK.am.noi('Na shledanou!');
          const n = nutTiep('Tiếp →'); n.onclick = tiep;
          vungChon.replaceChildren(PK.ui.loi('pes', 'Bạn vừa đi chợ bằng tiếng Séc đó! 🎉'), n);
        }
        luot();
      } },
      { ten: 'so-bi-kip', ve: function (k, tiep) {
        const n = nutTiep('Mở bí kíp đầu tiên →'); n.onclick = tiep;
        k.append(
          PK.ui.loi('pes', ['Đây là ', h('b', null, '📜 Sổ bí kíp'), '. Mỗi bí kíp bạn mở đều được cất vào đây.']),
          PK.ui.loi('kocka', 'Ở màn hình chính, chạm "📜 Sổ bí kíp" để xem lại bất cứ lúc nào. Trong lúc chơi, nút 📜 ở góc trên cũng mở bí kíp của màn.', true),
          PK.ui.loi('pes', 'Riêng trong Cửa ải, nút 📜 bị khóa 🔒: phải tự nhớ! Chạm chữ Séc thì vẫn xem được nghĩa.'),
          n);
      } },
      { ten: 'mo-bi-kip', ve: function (k, tiep) {
        const n = nutTiep('Mình nhớ rồi ✓', true);
        n.onclick = function () {
          PK.luu.capNhat(hoSo.id, function (d) { d.biKip.BK0 = Object.assign({ ngayMo: Date.now() }, d.biKip.BK0 || {}, { mo: true }); });
          PK.am.nhac('sao');
          tiep();
        };
        k.append(
          PK.ui.loi('kocka', 'Bí kíp đầu tiên: 4 mật mã để đọc mọi chữ Séc!', true),
          PK.biKip.theBiKip(bk),
          h('div', { class: 'the' },
            h('b', null, 'Đọc to câu thần chú (dòng chữ to trong thẻ), rồi bấm "Mình nhớ rồi".'),
            PK.ui.docTheo(null, function () { n.disabled = false; })),
          n);
      } },
      { ten: 'cua-ai', ve: function (k, tiep) {
        function batDau() {
          k.replaceChildren();
          PK.cuaAi.chay(k, {
            cheDo: 'cua-ai',
            biKip: bk,
            cauHoi: deCuaAi(),
            ghiNhan: function (khoa, dung) {
              PK.luu.capNhat(hoSo.id, function (d) {
                const t = d.tu[khoa] = d.tu[khoa] || { dung: 0, sai: 0 };
                if (dung) t.dung++; else t.sai++;
              });
            },
            khiXong: function (dung, tong) {
              const sao = PK.cuaAi.soSao(dung, tong);
              PK.luu.capNhat(hoSo.id, function (d) {
                const m = d.man[SO_MAN] = d.man[SO_MAN] || { qua: false, sao: 0, diemCao: 0, lanThu: 0 };
                m.lanThu++;
                m.diemCao = Math.max(m.diemCao, dung);
                if (sao) {
                  m.qua = true; m.sao = Math.max(m.sao, sao);
                  d.biKip.BK0 = Object.assign(d.biKip.BK0 || { mo: true }, { thuoc: true, diem: Math.max((d.biKip.BK0 || {}).diem || 0, dung) });
                }
              });
              if (sao) { tiep(); return; }
              PK.am.nhac('cham');
              khoaBiKip(false);
              k.replaceChildren(
                h('div', { class: 'the ket-qua' }, h('h2', null, 'Đúng ' + dung + '/' + tong)),
                PK.ui.loi('kocka', 'Gần tới rồi! Cần 8 câu đúng để qua cửa. Sao đã có vẫn giữ nguyên. Mình xem lại bí kíp một chút nhé.', true),
                PK.biKip.theBiKip(bk),
                h('button', { class: 'nut rong', onclick: function () { khoaBiKip(true); batDau(); } }, '🚪 Thử lại Cửa ải'));
            }
          });
        }
        const n = nutTiep('🚪 Vào Cửa ải'); n.onclick = batDau;
        k.append(
          PK.ui.loi('pes', 'Tới Cửa ải đầu tiên rồi! Có 10 câu. Đúng từ 8 câu trở lên là qua cửa.'),
          PK.ui.loi('kocka', 'Nút 📜 bị khóa, phải tự nhớ 4 mật mã nhé. Sẵn sàng chưa?', true),
          n);
      } },
      { ten: 'ket', ve: function (k) {
        const d = PK.luu.doc(hoSo.id);
        const m = d.man[SO_MAN] || {};
        PK.am.nhac('sao');
        PK.luu.capNhat(hoSo.id, function (dd) { dd.buoc[SO_MAN] = 0; }); // chơi lại thì bắt đầu từ đầu
        k.append(
          h('div', { class: 'the ket-qua' },
            h('h2', null, 'Qua Cửa ải! 🎉'),
            h('div', { class: 'sao-to lap-lanh', 'aria-label': (m.sao || 0) + ' sao' }, '★'.repeat(m.sao || 0) + '☆'.repeat(3 - (m.sao || 0))),
            h('p', null, 'Điểm cao nhất: ' + (m.diemCao || 0) + '/10')),
          PK.biKip.theBiKip(bk, { thuoc: true }),
          PK.ui.loi('pes', 'Bí kíp số 0 đã được đóng dấu "Đã thuộc ✓" trong Sổ bí kíp. Màn 1 đã mở!'),
          PK.ui.loi('kocka', m.sao < 3 ? 'Muốn đủ 3 sao thì chơi lại màn 0 bất cứ lúc nào nhé.' : 'Ba sao luôn! Bạn đọc chữ Séc giỏi quá!', true),
          h('button', { class: 'nut rong', onclick: veNha }, '🏠 Về chợ'));
      } }
    ];

    const daLuu = PK.luu.doc(hoSo.id).buoc[SO_MAN] || 0;
    di(Math.min(daLuu, BUOC.length - 1));
  }

  PK.man0 = { chay: chay, deCuaAi: deCuaAi };
})();
