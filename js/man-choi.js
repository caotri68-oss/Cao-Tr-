// Một màn học (từ màn 1): mở bí kíp → chào ở chợ → 3 vòng × 5 từ → Cửa ải → kết màn.
// Mỗi vòng: học từ → chọn giỏ TEN/TA/TO → nghe và chọn → thử thách bí kíp → hội thoại chợ.
window.PK = window.PK || {};

(function () {
  // Các màn đã có nội dung. Màn 2 trở đi thêm ở giai đoạn sau.
  const MAN_DA_LAM = [1];
  const MAU_TU = { TEN: 'ten', TA: 'ta', TO: 'to' };
  const TEN_GIO = { TEN: 'xanh dương', TA: 'hồng', TO: 'xanh lá' };

  function daLam(so) { return MAN_DA_LAM.indexOf(so) >= 0; }
  const h = function () { return PK.ui.h.apply(null, arguments); };
  const tuCoMaoTu = function (t) { return MAU_TU[t.giong] + ' ' + t.tu; };
  const laSinhVat = function (t) { return t.nhom === 'nguoi' || t.nhom === 'con-vat'; };

  // ---------- Hội thoại: tạo các lượt (không vẽ giao diện) ----------
  // Mỗi vòng có 2 từ chính: từ w1 để bạn hỏi cô bán hàng, từ w2 để cô hỏi bạn.
  function chonTuHoiThoai(so, ds) {
    const bb = (PK.chonTu.BAT_BUOC[so] || []);
    const hang = function (t) { const i = bb.indexOf(t.tu); return i < 0 ? 99 : i; };
    const sx = function (a) { return a.slice().sort(function (x, y) { return hang(x) - hang(y); }); };
    const sinhVat = sx(ds.filter(laSinhVat));
    const doVat = sx(ds.filter(function (t) { return !laSinhVat(t); }));
    const w1 = sinhVat[0] || doVat[0];
    const w2 = (w1 === sinhVat[0] ? doVat[0] : null) || ds.find(function (t) { return t !== w1; });
    return { w1: w1, w2: w2 };
  }

  function cauTraLoi(t) {
    const cz = 'To je ' + t.tu + '.';
    PK.duLieu.dangKyCau(cz, t.phien_am ? 'tô iê ' + t.phien_am : '', 'Đây là ' + t.nghia + '.');
    return cz;
  }
  function cauHoiCuaVat(t) { return laSinhVat(t) ? 'Kdo je to?' : 'Co je to?'; }

  // Trả về { luot: [...], cauDung: ['Co je to?', ...] }.
  function taoHoiThoai(so, ds) {
    const w = chonTuHoiThoai(so, ds);
    const hoi1 = cauHoiCuaVat(w.w1);
    const hoi2 = cauHoiCuaVat(w.w2);
    const cacCau = [cauTraLoi(w.w1)];
    const luaChon = [w.w2];
    ds.forEach(function (t) { if (luaChon.length < 3 && luaChon.every(function (x) { return x.emoji !== t.emoji; }) && t !== w.w1) luaChon.push(t); });
    const cauDap = luaChon.map(cauTraLoi);
    const luot = [
      { loai: 'chon', canh: 'Bạn chỉ vào ' + w.w1.emoji + ' và hỏi cô bán hàng.',
        tuyChon: ['Co je to?', 'Kdo je to?'], dung: hoi1,
        nhac: 'Món này là ' + (laSinhVat(w.w1) ? 'người hoặc con vật' : 'đồ vật') + ' nên hỏi "' + hoi1 + '" (' + PK.cauTheoChu.get(PK.duLieu.chuan(hoi1)).nghia + ').' },
      { loai: 'co', cz: cauTraLoi(w.w1) },
      { loai: 'co', canh: 'Cô bán hàng chỉ vào ' + w.w2.emoji + ' và hỏi bạn.', cz: hoi2 },
      { loai: 'chon', tuyChon: cauDap, dung: cauTraLoi(w.w2),
        nhac: w.w2.emoji + ' là "' + w.w2.nghia + '", chữ Séc là "' + w.w2.tu + '".' }
    ];
    return { luot: luot, cauDung: [hoi1, hoi2, 'To je …'].concat(cacCau, cauDap) };
  }

  // Các câu của màn được dùng trong hội thoại (để kiem-tra.html đối chiếu với 57 câu).
  function cauDung(so) {
    const dung = new Set(['Dobrý den.', 'Ahoj!', 'To je …']);
    PK.chonTuMan(so).vong.forEach(function (ds) { taoHoiThoai(so, ds).cauDung.forEach(function (c) { dung.add(c); }); });
    return Array.from(dung);
  }

  // ---------- Chạy một màn ----------
  function chay(vung, hoSo, so, veNha) {
    const bk = PK.biKipTheoMan.get(so);
    const tuMan = PK.chonTuMan(so);
    const tenMan = (PK.TEN_MAN && PK.TEN_MAN[so]) || 'Màn tổng hợp';
    let phien = 0;      // tăng mỗi khi sang bước mới, để bỏ các hẹn giờ của bước cũ
    let khoaBK = false;

    function conHieuLuc(p) { return p === phien; }
    function hen(fn, ms) { const p = phien; setTimeout(function () { if (conHieuLuc(p)) fn(); }, ms); }

    const nutBiKip = h('button', { class: 'nut-tron', 'aria-label': 'Xem bí kíp', onclick: function () {
      if (khoaBK) { PK.ui.thongBao('🔒 Trong Cửa ải phải tự nhớ bí kíp nhé!'); return; }
      PK.biKip.xemThe(bk, !!(PK.luu.doc(hoSo.id).biKip[bk.id] || {}).thuoc);
    } }, '📜');
    function khoaBiKip(khoa) { khoaBK = khoa; nutBiKip.style.opacity = khoa ? '.45' : '1'; nutBiKip.setAttribute('aria-disabled', khoa ? 'true' : 'false'); }

    const nhan = h('div', { class: 'buoc-nhan' });
    const noiDung = h('div', { style: 'display:flex;flex-direction:column;gap:16px' });
    vung.replaceChildren(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut-tron', 'aria-label': 'Về chợ', onclick: function () { phien++; veNha(); } }, '🏠'),
        h('h2', null, 'Màn ' + so + ' · ' + tenMan),
        nutBiKip),
      nhan, noiDung);

    const nutTiep = function (chu, khoa) { return h('button', { class: 'nut rong', disabled: !!khoa }, chu || 'Tiếp →'); };
    const tuDaHoc = function (r) { return [].concat.apply([], tuMan.vong.slice(0, r + 1)); };

    // ----- Bước: mở bí kíp -----
    function buocMoBiKip(k, tiep) {
      const n = nutTiep('Mình nhớ rồi ✓', true);
      n.onclick = function () {
        PK.luu.capNhat(hoSo.id, function (d) { d.biKip[bk.id] = Object.assign({ ngayMo: Date.now() }, d.biKip[bk.id] || {}, { mo: true }); });
        PK.am.nhac('sao'); tiep();
      };
      k.append(
        PK.ui.loi('kocka', 'Bí kíp của màn này đây! Đọc kỹ rồi đọc to câu thần chú nhé.', true),
        PK.biKip.theBiKip(bk),
        h('div', { class: 'the' },
          h('b', null, 'Đọc to câu thần chú (dòng chữ to trong thẻ), rồi bấm "Mình nhớ rồi".'),
          PK.ui.docTheo(null, function () { n.disabled = false; })),
        n);
    }

    // ----- Bước: chào ở chợ + mẫu câu "To je …" -----
    function buocMoMan(k, tiep) {
      const khung = h('div', { class: 'hoi-thoai' });
      const vungChon = h('div', { class: 'lua-chon' });
      k.append(PK.ui.loi('pes', 'Cô bán hàng (prodavačka) đang chào bạn. Chọn câu đáp đúng nhé!'), khung, vungChon);
      khung.append(PK.ui.loi('prodavacka', [PK.ui.cz('Dobrý den.'), ' ', PK.ui.nutNghe('Dobrý den.')]));
      PK.am.noi('Dobrý den.');
      vungChon.replaceChildren(...PK.ui.tron(['Dobrý den.', 'Ahoj!']).map(function (lc) {
        const nut = h('button', { class: 'chon', onclick: function () {
          if (lc === 'Dobrý den.') {
            PK.am.nhac('dung');
            khung.append(PK.ui.loi(hoSo.anh, PK.ui.cz(lc), true));
            vungChon.replaceChildren();
            hen(mauCau, 700);
          } else {
            PK.am.nhac('sai'); nut.classList.add('sai'); nut.disabled = true;
            khung.append(PK.ui.loi('kocka', '"Ahoj!" dùng cho bạn bè. Với cô bán hàng (người lớn) mình nói "Dobrý den." nhé.', true));
          }
        } }, lc);
        return h('div', { class: 'dong-chon' }, nut, h('button', { class: 'nut-tron', 'aria-label': 'Xem nghĩa', onclick: function () { PK.ui.moTraNghia(lc); } }, '?'));
      }));
      function mauCau() {
        const vd = PK.d.cau.find(function (c) { return c.cz === 'To je kočka.'; });
        const n = nutTiep('Vào học từ mới →'); n.onclick = tiep;
        k.append(
          PK.ui.loi('pes', 'Ở chợ, mình chỉ vào món hàng và hỏi. Mẫu câu hôm nay:'),
          h('div', { class: 'the', style: 'align-items:center;text-align:center' },
            h('div', { style: 'font-size:2rem' }, PK.ui.cz('To je …')),
            h('div', null, h('b', null, 'Đây là …')),
            vd ? h('div', null, '🐱 ', PK.ui.cz(vd.cz), ' ', PK.ui.nutNghe(vd.cz)) : null,
            h('div', { class: 'nhat' }, 'Chạm vào câu để nghe và xem nghĩa. Thay "…" bằng tên món hàng.')),
          n);
        window.scrollTo(0, document.body.scrollHeight);
      }
    }

    // ----- Bước: học từ -----
    function buocHocTu(k, tiep, r) {
      const ds = tuMan.vong[r];
      let j = 0;
      let hienNghia = true;
      function ve() {
        const t = ds[j];
        const daDoc = h('div');
        const sao = h('button', { class: 'nut rong', disabled: true }, '⭐ Tô 1 sao');
        const hangNghia = h('div', { style: 'font-size:1.2rem;font-weight:800' });
        function capNhatNghia() { hangNghia.textContent = hienNghia ? '= ' + t.nghia : '= ???  (chạm "Hiện nghĩa" để xem)'; }
        capNhatNghia();
        sao.onclick = function () {
          PK.luu.danhDauHoc(hoSo.id, t.tu);
          PK.am.nhac('sao');
          j++;
          if (j < ds.length) ve(); else { const n = nutTiep('Chơi trò chọn giỏ →'); n.onclick = tiep; k.replaceChildren(
            PK.ui.loi('pes', 'Học xong 5 từ rồi! Giờ cho từng món vào đúng giỏ nhé.'), n); }
        };
        k.replaceChildren(
          h('div', { class: 'tien-do' }, ds.map(function (_, x) { return h('i', { class: x < j ? 'dung' : (x === j ? 'dang' : '') }); })),
          h('div', { class: 'the', style: 'align-items:center;text-align:center' },
            h('div', { class: 'mon-hang' }, t.emoji),
            h('div', { style: 'font-size:2.1rem' }, PK.ui.czTu(t)),
            t.phien_am ? h('div', { class: 'phien-am', style: 'font-size:1.15rem' }, '[' + t.phien_am + ']') : null,
            hangNghia,
            t.bay ? h('div', { class: 'bay-note' }, '★ Từ bẫy, chậm lại một nhịp!') : null,
            h('div', { class: 'hang-nut', style: 'justify-content:center' },
              PK.ui.nutNghe(tuCoMaoTu(t)),
              h('button', { class: 'nut phu nho', onclick: function () { hienNghia = !hienNghia; capNhatNghia(); } }, '👁 Hiện / ẩn nghĩa'))),
          h('div', { class: 'the' },
            h('div', null, h('b', null, '1. Nhìn  ✓   2. Đọc to   3. Tô sao')),
            PK.ui.docTheo(tuCoMaoTu(t), function () { sao.disabled = false; })),
          sao);
        PK.am.noi(tuCoMaoTu(t));
      }
      ve();
    }

    // ----- Bước: bỏ món vào giỏ TEN / TA / TO -----
    function buocPhanLoai(k, tiep, r) {
      const ds = PK.ui.tron(tuMan.vong[r]);
      let j = 0;
      function ve() {
        const t = ds[j];
        let daSai = false;
        const loiNhac = h('div', { 'aria-live': 'polite' });
        const gio = ['TEN', 'TA', 'TO'].map(function (g) {
          const b = h('button', { class: 'gio ' + g, onclick: function () {
            if (b.disabled) return;
            if (g === t.giong) {
              PK.am.nhac('dung');
              if (!daSai) PK.luu.ghiTu(hoSo.id, t.tu, true);
              j++;
              loiNhac.replaceChildren(PK.ui.loi('pes', ['Đúng rồi! ', h('b', { class: 'g-' + t.giong }, t.giong + ' ' + t.tu)]));
              hen(function () { if (j < ds.length) ve(); else ket(); }, 900);
              gio.forEach(function (x) { x.disabled = true; });
            } else {
              PK.am.nhac('sai');
              if (!daSai) PK.luu.ghiTu(hoSo.id, t.tu, false);
              daSai = true;
              b.classList.remove('lac'); void b.offsetWidth; b.classList.add('lac');
              const nhac = PK.nhacLuat[so] ? PK.nhacLuat[so](t) : bk.than_chu;
              loiNhac.replaceChildren(PK.ui.loi('kocka', [h('b', null, 'Chưa đúng. '), nhac, ' Thử lại nhé!'], true));
            }
          } }, g);
          return b;
        });
        k.replaceChildren(
          h('div', { class: 'tien-do' }, ds.map(function (_, x) { return h('i', { class: x < j ? 'dung' : (x === j ? 'dang' : '') }); })),
          PK.ui.loi('pes', ['Món này vào giỏ nào? Giỏ ', h('b', { class: 'g-TEN' }, 'TEN'), ' xanh dương, ', h('b', { class: 'g-TA' }, 'TA'), ' hồng, ', h('b', { class: 'g-TO' }, 'TO'), ' xanh lá.']),
          h('div', { class: 'the', style: 'align-items:center;text-align:center' },
            h('div', { class: 'mon-hang' }, t.emoji),
            h('div', { style: 'font-size:2rem;display:flex;gap:10px;align-items:center;justify-content:center' }, PK.ui.cz(t.tu, { khoa: true }), PK.ui.nutNghe(t.tu)),
            h('div', { class: 'nhat' }, t.nghia),
            t.bay ? h('div', { class: 'bay-note' }, '★ Từ bẫy, chậm lại một nhịp!') : null),
          h('div', { class: 'ba-gio' }, gio),
          loiNhac);
      }
      function ket() {
        const n = nutTiep('Tiếp: nghe và chọn →'); n.onclick = tiep;
        k.replaceChildren(PK.ui.loi('kocka', 'Cả 5 món đã vào giỏ! Giờ thử nghe nhé.', true), n);
      }
      ve();
    }

    // ----- Bước: nghe và chọn -----
    function buocNgheChon(k, tiep, r) {
      PK.cuaAi.chay(k, {
        cheDo: 'hoc', nhan: '👂 Nghe và chọn', biKip: bk,
        cauHoi: PK.cauHoi.cauNgheChon(tuMan.vong[r], tuDaHoc(r)),
        ghiNhan: function (tu, dung) { PK.luu.ghiTu(hoSo.id, tu, dung); },
        khiXong: function (dung, tong, _kq, kgy) {
          const khongGY = kgy.filter(Boolean).length;
          const n = nutTiep('Tiếp: thử thách bí kíp →'); n.onclick = tiep;
          k.replaceChildren(
            h('div', { class: 'the ket-qua' }, h('h2', null, 'Đúng ' + dung + '/' + tong), h('p', { class: 'nhat' }, 'Không cần gợi ý: ' + khongGY + '/' + tong)),
            n);
        }
      });
    }

    // ----- Bước: thử thách bí kíp -----
    function buocThuThach(k, tiep, r) {
      const taoThuThach = PK.thuThachBK[so];
      const cauHoi = taoThuThach ? taoThuThach(tuDaHoc(r)) : PK.biKip.cauHoiThuoc(bk);
      PK.cuaAi.chay(k, {
        cheDo: 'thu-thach', nhan: '🧩 Thử thách bí kíp', biKip: bk, cauHoi: cauHoi,
        khiXong: function (dung, tong) {
          const n = nutTiep('Tiếp: đi chợ nói chuyện →'); n.onclick = tiep;
          k.replaceChildren(
            h('div', { class: 'the ket-qua' }, h('h2', null, 'Đúng ' + dung + '/' + tong)),
            PK.ui.loi(dung >= tong - 1 ? 'pes' : 'kocka', dung >= tong - 1 ? 'Bạn dùng bí kíp rất khéo!' : ['Nhớ nhé: ', h('b', null, bk.than_chu)], dung < tong - 1),
            n);
        }
      });
    }

    // ----- Bước: hội thoại ở chợ -----
    function buocHoiThoai(k, tiep, r) {
      const ht = taoHoiThoai(so, tuMan.vong[r]);
      const khung = h('div', { class: 'hoi-thoai' });
      const vungChon = h('div', { class: 'lua-chon' });
      k.append(PK.ui.loi('kocka', 'Đi chợ thật nào! Cô bán hàng và bạn nói chuyện bằng tiếng Séc. Chạm "?" để xem nghĩa trước khi chọn.', true), khung, vungChon);
      let j = 0;
      function luot() {
        if (j >= ht.luot.length) { ketThuc(); return; }
        const L = ht.luot[j];
        if (L.canh) khung.append(h('p', { class: 'nhat' }, '(' + L.canh + ')'));
        if (L.loai === 'co') {
          khung.append(PK.ui.loi('prodavacka', [PK.ui.cz(L.cz), ' ', PK.ui.nutNghe(L.cz)]));
          PK.am.noi(L.cz);
          j++; hen(luot, 1000);
          return;
        }
        vungChon.replaceChildren(...PK.ui.tron(L.tuyChon).map(function (lc) {
          const nut = h('button', { class: 'chon', onclick: function () {
            if (lc === L.dung) {
              PK.am.nhac('dung');
              khung.append(PK.ui.loi(hoSo.anh, PK.ui.cz(lc), true));
              PK.am.noi(lc);
              vungChon.replaceChildren();
              j++; hen(luot, 1000);
            } else {
              PK.am.nhac('sai'); nut.classList.add('sai'); nut.disabled = true;
              khung.append(PK.ui.loi('kocka', L.nhac, true));
            }
          } }, lc);
          return h('div', { class: 'dong-chon' }, nut, h('button', { class: 'nut-tron', 'aria-label': 'Xem nghĩa', onclick: function () { PK.ui.moTraNghia(lc); } }, '?'));
        }));
      }
      function ketThuc() {
        PK.am.nhac('sao');
        const n = nutTiep(r < 2 ? 'Xong vòng ' + (r + 1) + '! Sang vòng ' + (r + 2) + ' →' : 'Xong vòng 3! Tới Cửa ải →');
        n.onclick = tiep;
        vungChon.replaceChildren(PK.ui.loi('pes', 'Bạn đi chợ bằng tiếng Séc giỏi quá! 🎉'), n);
      }
      luot();
    }

    // ----- Bước: Cửa ải -----
    function buocCuaAi(k, tiep) {
      PK.cuaAi.vaoCuaAi(k, {
        hoSo: hoSo, so: so, bk: bk, khoaBiKip: khoaBiKip, tiep: tiep,
        deThi: function () { return PK.cauHoi.deCuaAi(so, PK.luu.doc(hoSo.id).tu); }
      });
    }

    // ----- Bước: kết màn -----
    function buocKet(k) {
      const d = PK.luu.doc(hoSo.id);
      const m = d.man[so] || {};
      PK.am.nhac('sao');
      PK.luu.capNhat(hoSo.id, function (dd) { dd.buoc[so] = 0; });
      k.append(
        h('div', { class: 'the ket-qua' },
          h('h2', null, 'Qua Cửa ải! 🎉'),
          h('div', { class: 'sao-to lap-lanh', 'aria-label': (m.sao || 0) + ' sao' }, '★'.repeat(m.sao || 0) + '☆'.repeat(3 - (m.sao || 0))),
          h('p', null, 'Điểm cao nhất: ' + (m.diemCao || 0) + '/10')),
        h('div', { class: 'the' },
          h('h3', null, '📖 15 từ bạn đã học'),
          h('div', { class: 'chip-tu' }, tuMan.tatCa.map(function (t) {
            return h('span', { class: 'chip' }, t.emoji + ' ', PK.ui.czTu(t));
          })),
          h('p', { class: 'nhat' }, 'Chạm vào từ để nghe và xem lại nghĩa.')),
        PK.biKip.theBiKip(bk, { thuoc: true }),
        PK.ui.loi('pes', 'Bí kíp số ' + so + ' đã được đóng dấu "Đã thuộc ✓" trong Sổ bí kíp. Màn ' + (so + 1) + ' đã mở khóa!'),
        PK.ui.loi('kocka', m.sao < 3 ? 'Muốn đủ 3 sao thì chơi lại màn này bất cứ lúc nào nhé.' : 'Ba sao luôn! Giỏi quá!', true),
        h('button', { class: 'nut rong', onclick: veNha }, '🏠 Về chợ'));
    }

    // ----- Danh sách bước -----
    const BUOC = [
      { nhan: 'Bí kíp mới', ve: buocMoBiKip },
      { nhan: 'Vào chợ', ve: buocMoMan }
    ];
    [0, 1, 2].forEach(function (r) {
      const v = 'Vòng ' + (r + 1) + '/3 · ';
      BUOC.push({ nhan: v + 'Học từ', ve: function (k, t) { buocHocTu(k, t, r); } });
      BUOC.push({ nhan: v + 'Chọn giỏ', ve: function (k, t) { buocPhanLoai(k, t, r); } });
      BUOC.push({ nhan: v + 'Nghe và chọn', ve: function (k, t) { buocNgheChon(k, t, r); } });
      BUOC.push({ nhan: v + 'Thử thách bí kíp', ve: function (k, t) { buocThuThach(k, t, r); } });
      BUOC.push({ nhan: v + 'Đi chợ nói chuyện', ve: function (k, t) { buocHoiThoai(k, t, r); } });
    });
    BUOC.push({ nhan: 'Cửa ải', cuaAi: true, ve: buocCuaAi });
    BUOC.push({ nhan: 'Kết màn', ve: buocKet });

    function di(i) {
      phien++;
      PK.luu.capNhat(hoSo.id, function (d) { d.buoc[so] = i; });
      khoaBiKip(!!BUOC[i].cuaAi);
      nhan.textContent = BUOC[i].nhan;
      noiDung.replaceChildren();
      window.scrollTo(0, 0);
      BUOC[i].ve(noiDung, function () { di(i + 1); });
    }

    const daLuu = PK.luu.doc(hoSo.id).buoc[so] || 0;
    di(Math.min(daLuu, BUOC.length - 1));
  }

  PK.manChoi = { chay: chay, daLam: daLam, MAN_DA_LAM: MAN_DA_LAM, taoHoiThoai: taoHoiThoai, cauDung: cauDung };
})();
