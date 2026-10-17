// Ôn hôm nay: gom từ và câu đến hạn trong hộp nhớ (tối đa 15 mục mỗi lượt), chen 1–2 câu hỏi về bí kíp đến hạn.
// Câu hỏi ôn ẩn nghĩa của chính từ đang hỏi (chế độ "tắt nghĩa").
window.PK = window.PK || {};

(function () {
  const TOI_DA = 15;
  const h = function () { return PK.ui.h.apply(null, arguments); };
  const tron = function (a) { return PK.ui.tron(a); };
  const tuTheoChu = function (tu) { return PK.d.danh_tu.find(function (t) { return t.tu === tu; }); };
  // Câu: trong phần "cau" của dữ liệu, hoặc trong khu Đi chợ thật.
  const cauTheoChu = function (cz) { return PK.d.cau.find(function (c) { return c.cz === cz; }) || (PK.choThat && PK.choThat.timMuc(cz)); };

  // Câu chưa điền ("To je …") hoặc câu ghép "A / B" vẫn ôn được: nghe rồi chọn nghĩa.
  function nghiaKhac(dap, kho, so) {
    const ds = [];
    tron(kho).forEach(function (x) { if (ds.length < so && x && x !== dap && ds.indexOf(x) < 0) ds.push(x); });
    return ds;
  }

  // Mục còn dùng được (dữ liệu có thể đã đổi từ lần học trước).
  function hopLeMuc(m) {
    if (m.loai === 'tu') return !!tuTheoChu(m.khoa);
    if (m.loai === 'cau') return !!cauTheoChu(m.khoa);
    const bk = PK.d.bi_kip.find(function (b) { return b.id === m.khoa; });
    return !!(bk && (bk.cau_hoi_thuoc || []).length);
  }

  // Các mục ôn của lượt này: từ và câu đến hạn (tối đa 15), cộng 1–2 bí kíp đến hạn.
  function chonMuc(d) {
    const ds = PK.luu.denHanOn(d).filter(hopLeMuc);
    return {
      muc: ds.filter(function (m) { return m.loai !== 'biKip'; }).slice(0, TOI_DA),
      biKip: ds.filter(function (m) { return m.loai === 'biKip'; }).slice(0, 2),
      tong: ds.filter(function (m) { return m.loai !== 'biKip'; }).length
    };
  }
  function dem(d) {
    const c = chonMuc(d);
    return { tu: c.muc.filter(function (m) { return m.loai === 'tu'; }).length, cau: c.muc.filter(function (m) { return m.loai === 'cau'; }).length, biKip: c.biKip.length, tong: c.tong };
  }

  // ---------- Tạo câu hỏi ----------
  // Từ: lần lượt "nghe → chọn nghĩa" và "nghĩa → chọn chữ Séc".
  function cauTu(t, i) {
    const khac = PK.d.danh_tu.filter(function (x) { return x.tu !== t.tu && x.nghia !== t.nghia; });
    if (i % 2 === 0) {
      return {
        hoi: 'Nghe và chọn nghĩa đúng:',
        czHoi: { chu: t.tu, khoa: true },
        nghe: t.tu,
        dap: t.nghia,
        luaChon: [t.nghia].concat(nghiaKhac(t.nghia, khac.map(function (x) { return x.nghia; }), 2)),
        anNghia: true,
        nhac: t.tu + ' = ' + t.nghia,
        tuKhoa: 'tu:' + t.tu
      };
    }
    return {
      hoi: 'Chữ Séc của "' + t.nghia + '" là gì?',
      phu: t.emoji || '',
      dap: t.tu,
      luaChon: [t.tu].concat(nghiaKhac(t.tu, khac.map(function (x) { return x.tu; }), 2)),
      anNghia: true,
      nhac: t.nghia + ' = ' + t.giong + ' ' + t.tu,
      tuKhoa: 'tu:' + t.tu
    };
  }
  // Câu: nghe câu Séc rồi chọn nghĩa.
  function cauCau(c) {
    const khac = PK.d.cau.filter(function (x) { return x.cz !== c.cz && x.nghia !== c.nghia; }).map(function (x) { return x.nghia; });
    return {
      hoi: 'Nghe câu này và chọn nghĩa đúng:',
      czHoi: { chu: c.cz, khoa: true },
      nghe: c.cz,
      dap: c.nghia,
      luaChon: [c.nghia].concat(nghiaKhac(c.nghia, khac, 2)),
      anNghia: true,
      nhac: c.cz + ' = ' + c.nghia,
      tuKhoa: 'cau:' + c.cz
    };
  }
  // Bí kíp: một câu hỏi về chính bí kíp (cau_hoi_thuoc).
  function cauBiKip(bk) {
    const q = tron(PK.biKip.cauHoiThuoc(bk))[0];
    return Object.assign(q, { hoi: '📜 Ôn bí kíp: ' + q.hoi, nhac: bk.than_chu, tuKhoa: 'biKip:' + bk.id });
  }

  function taoDe(chon) {
    const ds = chon.muc.map(function (m, i) {
      return m.loai === 'tu' ? cauTu(tuTheoChu(m.khoa), i) : cauCau(cauTheoChu(m.khoa));
    });
    // Chen câu bí kíp vào giữa lượt.
    chon.biKip.forEach(function (m, i) {
      const bk = PK.d.bi_kip.find(function (b) { return b.id === m.khoa; });
      const vt = Math.min(ds.length, Math.round(ds.length * (i + 1) / (chon.biKip.length + 1)));
      ds.splice(vt, 0, cauBiKip(bk));
    });
    return ds.filter(PK.cuaAi.hopLe);
  }

  function ngayChu(ms) {
    const ngay = Math.ceil((ms - Date.now()) / (24 * 3600 * 1000));
    if (ngay <= 0) return 'hôm nay';
    if (ngay === 1) return 'ngày mai';
    return 'sau ' + ngay + ' ngày';
  }

  // ---------- Màn hình ôn ----------
  function chay(vung, hoSo, veNha) {
    const d = PK.luu.doc(hoSo.id);
    const chon = chonMuc(d);
    const thanh = h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut-tron', 'aria-label': 'Về chợ', onclick: veNha }, '🏠'),
      h('h2', null, '🔁 Ôn hôm nay'));
    const khung = h('div', { style: 'display:flex;flex-direction:column;gap:16px' });
    vung.replaceChildren(thanh, khung);
    window.scrollTo(0, 0);

    if (!chon.muc.length && !chon.biKip.length) {
      const sau = PK.luu.hanTiepTheo(d);
      khung.append(
        PK.ui.loi('pes', sau ? 'Hôm nay chưa có từ nào đến hạn ôn. Lần ôn tới: ' + ngayChu(sau) + '.' : 'Bạn chưa học từ nào. Vào một màn để học từ mới, hôm sau quay lại ôn nhé!'),
        h('button', { class: 'nut rong', onclick: veNha }, '🏠 Về chợ'));
      return;
    }

    const truoc = {};
    chon.muc.concat(chon.biKip).forEach(function (m) {
      const kho = m.loai === 'biKip' ? d.biKip : d[m.loai];
      truoc[m.loai + ':' + m.khoa] = (kho[m.khoa] || {}).hop || 1;
    });

    function batDau() {
      PK.cuaAi.chay(khung, {
        cheDo: 'on', nhan: '🔁 Ôn hôm nay',
        cauHoi: taoDe(chon),
        ghiNhan: function (khoa, dung) {
          const i = khoa.indexOf(':');
          PK.luu.ghiMuc(hoSo.id, khoa.slice(0, i), khoa.slice(i + 1), dung);
        },
        khiXong: ketQua
      });
    }

    function ketQua(dung, tong) {
      const sau = PK.luu.doc(hoSo.id);
      let len = 0, ve1 = 0, lau = 0;
      Object.keys(truoc).forEach(function (k) {
        const i = k.indexOf(':'); const loai = k.slice(0, i); const khoa = k.slice(i + 1);
        const m = (loai === 'biKip' ? sau.biKip : sau[loai])[khoa] || {};
        if (m.thuocLau && truoc[k] === 5) lau++;
        else if ((m.hop || 1) > truoc[k]) len++;
        else if (m.hop === 1 && truoc[k] > 1) ve1++;
      });
      const conLai = chonMuc(sau).tong;
      PK.am.nhac('sao');
      khung.replaceChildren(
        h('div', { class: 'the ket-qua' },
          h('h2', null, 'Đúng ' + dung + '/' + tong),
          h('p', null, '⬆️ Lên hộp: ' + len + (lau ? ' · 🏆 Đã thuộc lâu: ' + lau : '') + (ve1 ? ' · ↩️ Về hộp 1: ' + ve1 : ''))),
        PK.ui.loi(dung === tong ? 'pes' : 'kocka', dung === tong
          ? 'Nhớ hết luôn! Mấy từ này lần sau sẽ ôn thưa hơn.'
          : 'Từ nào sai thì mai gặp lại để nhớ chắc hơn. Không sao cả!', dung !== tong),
        conLai ? h('button', { class: 'nut phu rong', onclick: function () { chay(vung, hoSo, veNha); } }, '🔁 Ôn tiếp (' + conLai + ' từ còn đến hạn)') : '',
        h('button', { class: 'nut rong', onclick: veNha }, '🏠 Về chợ'));
    }

    khung.append(
      PK.ui.loi('pes', ['Hôm nay có ', h('b', null, chon.muc.length + ' mục'), ' cần ôn' + (chon.biKip.length ? ' và ' + chon.biKip.length + ' câu về bí kíp' : '') + '. Khoảng 3–5 phút thôi!']),
      PK.ui.loi('kocka', 'Nghĩa bị ẩn để bạn tự nhớ. Đúng thì từ lên hộp, lâu sau mới ôn lại. Sai thì về hộp 1, mai ôn tiếp.', true),
      h('div', { class: 'the' },
        h('b', null, '📦 Hộp nhớ'),
        h('div', { class: 'nhat' }, 'Hộp 1 → ôn sau 1 ngày · Hộp 2 → 3 ngày · Hộp 3 → 7 ngày · Hộp 4 → 14 ngày · Hộp 5 → 30 ngày. Qua hộp 5 là "Đã thuộc lâu".')),
      h('button', { class: 'nut rong', onclick: batDau }, 'Bắt đầu ôn →'));
  }

  PK.onTap = { chay: chay, dem: dem, chonMuc: chonMuc, taoDe: taoDe };
})();
