// Tạo câu hỏi cho các màn có bí kíp về giống (không vẽ giao diện, chỉ tạo dữ liệu câu hỏi).
// Mỗi câu có trường "kiem" để trang kiem-tra.html đối chiếu đáp án với dữ liệu.
window.PK = window.PK || {};

(function () {
  const GIONG3 = ['TEN', 'TA', 'TO'];
  const tron = function (a) { return PK.ui.tron(a); };
  const nhanTu = function (t) { return t.emoji + ' ' + t.tu; };

  // "Từ này thuộc giỏ nào?" (từ hiện không kèm mạo từ, có emoji và nghĩa để hiểu từ)
  function cauGiong(t, so) {
    const nhac = PK.nhacLuat && PK.nhacLuat[so] ? PK.nhacLuat[so](t) : 'Từ "' + t.tu + '" là ' + t.giong + '.';
    return {
      hoi: 'Từ này thuộc giỏ nào?',
      czHoi: { chu: t.tu, khoa: true },
      phu: t.emoji + ' ' + t.nghia,
      nghe: t.tu,
      dap: t.giong,
      luaChon: GIONG3.slice(),
      nhac: nhac,
      tuKhoa: t.tu,
      kiem: { loai: 'gioi', tu: t.tu }
    };
  }

  // "Hai từ cùng giống, một từ khác giống. Từ nào lạc nhóm?"
  function cauLac(pool) {
    for (let thu = 0; thu < 30; thu++) {
      const thuTu = tron(GIONG3);
      const gChung = thuTu.find(function (g) { return pool.filter(function (t) { return t.giong === g; }).length >= 2; });
      if (!gChung) return null;
      const gLac = thuTu.find(function (g) { return g !== gChung && pool.some(function (t) { return t.giong === g; }); });
      if (!gLac) return null;
      const doi = tron(pool.filter(function (t) { return t.giong === gChung; })).slice(0, 2);
      const le = tron(pool.filter(function (t) { return t.giong === gLac; }))[0];
      const ba = tron([doi[0], doi[1], le]);
      return {
        hoi: 'Hai từ cùng giống, một từ khác giống. Từ nào lạc nhóm?',
        dap: nhanTu(le),
        luaChon: ba.map(nhanTu),
        nhac: ba.map(function (t) { return t.tu + ' (' + t.giong + ')'; }).join(', ') + ' → "' + le.tu + '" lạc nhóm.',
        kiem: { loai: 'lac', tu: ba.map(function (t) { return t.tu; }), dap: le.tu }
      };
    }
    return null;
  }

  // Nghe một từ rồi chọn hình (kiểu chẵn) hoặc chọn chữ (kiểu lẻ).
  function cauNgheChon(ds, pool) {
    return tron(ds).map(function (t, i) {
      const kieuHinh = i % 2 === 0;
      const chon = [t];
      tron(pool.filter(function (x) { return x.tu !== t.tu; })).forEach(function (x) {
        if (chon.length >= 3) return;
        if (kieuHinh && chon.some(function (c) { return c.emoji === x.emoji; })) return;
        chon.push(x);
      });
      const nhan = function (x) { return kieuHinh ? x.emoji : x.tu; };
      return {
        hoi: kieuHinh ? 'Nghe và chọn hình đúng:' : 'Nghe và chọn chữ đúng:',
        nghe: t.tu,
        dap: nhan(t),
        luaChon: chon.map(nhan),
        luaChonLon: kieuHinh,
        luaChonCz: !kieuHinh,
        goiY: 'Từ này nghĩa là: ' + t.nghia,
        tuKhoa: t.tu,
        kiem: { loai: 'nghe', tu: t.tu }
      };
    });
  }

  // Thử thách bí kíp giữa các vòng: 4 câu "lạc nhóm" từ các từ đã học.
  PK.thuThachBK = PK.thuThachBK || {};
  PK.thuThachBK[1] = function (poolDaHoc) {
    const kq = [];
    for (let i = 0; i < 4; i++) { const q = cauLac(poolDaHoc); if (q) kq.push(q); }
    return kq;
  };

  // Từ hay sai đứng trước: sắp theo số lần sai, cùng điểm thì xáo ngẫu nhiên.
  function uuTienSai(pool, tuDaCo) {
    const sai = function (t) { return ((tuDaCo || {})[t.tu] || {}).sai || 0; };
    return tron(pool).sort(function (a, b) { return sai(b) - sai(a); });
  }

  // Đề Cửa ải: 10 câu. Một phần hỏi về chính bí kíp, phần còn lại dùng bí kíp với từ đã học.
  // Từ màn 2 trở đi có thêm 1–2 câu về bí kíp các màn trước.
  function deCuaAi(so, tuDaCo) {
    const bk = PK.biKipTheoMan.get(so);
    const pool = PK.tuDenMan(so);
    let ds = tron(PK.biKip.cauHoiThuoc(bk)).slice(0, 4);

    if (so >= 2) {
      const cu = PK.d.bi_kip.filter(function (b) { return b.man >= 1 && b.man < so; });
      const soCauCu = Math.min(2, cu.length);
      tron(cu).slice(0, soCauCu).forEach(function (b) {
        const q = tron(PK.biKip.cauHoiThuoc(b))[0];
        if (q) ds.push(q);
      });
    }

    const conLai = 10 - ds.length;
    const soLac = Math.floor(conLai / 2);
    const soGiong = conLai - soLac;
    const tuUuTien = uuTienSai(pool, tuDaCo);
    tuUuTien.slice(0, soGiong).forEach(function (t) { ds.push(cauGiong(t, so)); });
    for (let i = 0; i < soLac; i++) { const q = cauLac(pool); if (q) ds.push(q); }
    // Nếu thiếu câu "lạc nhóm" thì bù bằng câu chọn giỏ từ khác.
    let k = soGiong;
    while (ds.length < 10 && k < tuUuTien.length) ds.push(cauGiong(tuUuTien[k++], so));
    return tron(ds);
  }

  PK.cauHoi = { cauGiong: cauGiong, cauLac: cauLac, cauNgheChon: cauNgheChon, deCuaAi: deCuaAi, uuTienSai: uuTienSai };
})();
