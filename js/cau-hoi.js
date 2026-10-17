// Tạo câu hỏi cho các màn (không vẽ giao diện, chỉ tạo dữ liệu câu hỏi).
// Mỗi bí kíp có một "bộ tạo câu" riêng trong PK.cauHoiBK[số màn]: (n, pool) → n câu dùng đúng bí kíp đó.
// Mỗi câu có trường "kiem" để trang kiem-tra.html đối chiếu đáp án với dữ liệu.
window.PK = window.PK || {};

(function () {
  const GIONG3 = ['TEN', 'TA', 'TO'];
  const tron = function (a) { return PK.ui.tron(a); };
  const nhanTu = function (t) { return t.emoji + ' ' + t.tu; };
  const lay = function (a, n) { return tron(a).slice(0, n); };
  const unique = function (a) { return Array.from(new Set(a)); };

  // Người đang chơi: bố là nam; mẹ, Xu Xu, Win Win là nữ.
  function nguoiChoi() {
    const hs = PK.hoSoDangChoi;
    return hs ? { ten: hs.ten, gioi: hs.gioi } : { ten: 'Xu Xu', gioi: 'nu' };
  }
  PK.nguoiChoi = nguoiChoi;

  function cauPhai(hoi, dap, luaChon, kiem, nhac) {
    return { hoi: hoi, dap: dap, luaChon: luaChon, kiem: kiem, nhac: nhac };
  }
  // Chọn (n-1) đáp án sai từ danh sách, bảo đảm không trùng với đáp án đúng.
  function ganNhieu(dap, nhieu, so) {
    return [dap].concat(lay(unique(nhieu).filter(function (x) { return x !== dap; }), so));
  }

  // ---------- Bí kíp về giống (1, 4, 5, 6, 7) ----------
  // "Từ này thuộc giỏ nào?" (từ hiện không kèm mạo từ, có emoji và nghĩa để hiểu từ)
  function cauGiong(t) {
    return {
      hoi: 'Từ này thuộc giỏ nào?',
      czHoi: { chu: t.tu, khoa: true },
      phu: t.emoji + ' ' + t.nghia,
      nghe: t.tu,
      dap: t.giong,
      luaChon: GIONG3.slice(),
      nhac: PK.nhacGiong(t),
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
      const doi = lay(pool.filter(function (t) { return t.giong === gChung; }), 2);
      const le = lay(pool.filter(function (t) { return t.giong === gLac; }), 1)[0];
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

  // Xếp từ: đến hạn ôn và hay sai lên trước (từ đến hạn được cộng thêm như sai 3 lần).
  function uuTienSai(pool, tuDaCo) {
    const bayGio = Date.now();
    const diem = function (t) {
      const m = (tuDaCo || {})[t.tu] || {};
      return (m.sai || 0) + (PK.luu.denHan(m, bayGio) ? 3 : 0);
    };
    return tron(pool).sort(function (a, b) { return diem(b) - diem(a); });
  }

  // Bộ tạo câu cho màn có bí kíp về giống: một nửa chọn giỏ (ưu tiên từ minh họa bí kíp và từ hay sai), một nửa lạc nhóm.
  function boGiong(so) {
    return function (n, pool, tuDaCo) {
      const soLac = Math.floor(n / 2);
      const soGiong = n - soLac;
      const tam = uuTienSai(pool, tuDaCo);
      const trongTam = tam.filter(function (t) { return PK.bkGiaiThich(t) === so; });
      const khac = tam.filter(function (t) { return PK.bkGiaiThich(t) !== so; });
      const chon = trongTam.slice(0, Math.ceil(soGiong / 2)).concat(khac).concat(trongTam.slice(Math.ceil(soGiong / 2)));
      const kq = [];
      chon.slice(0, soGiong).forEach(function (t) { kq.push(cauGiong(t)); });
      for (let i = 0; i < soLac; i++) { const q = cauLac(pool); if (q) kq.push(q); }
      let k = soGiong;
      while (kq.length < n && k < chon.length) kq.push(cauGiong(chon[k++]));
      return kq;
    };
  }

  // ---------- Bí kíp 2: áo "là" ----------
  const AO = [['já', 'jsem', 'tôi'], ['ty', 'jsi', 'bạn thân'], ['on', 'je', 'anh ấy'], ['ona', 'je', 'cô ấy'], ['to', 'je', 'đó, nó'],
    ['my', 'jsme', 'chúng tôi'], ['vy', 'jste', 'ngài, các bạn'], ['oni', 'jsou', 'họ']];
  const DANG_AO = ['jsem', 'jsi', 'je', 'jsme', 'jste', 'jsou'];
  function boAo(n) {
    const ng = nguoiChoi();
    const CANH = [
      ['Chọn áo "là" cho ' + ng.ten + ' khi nói về chính mình: Já ___', 'já'],
      ['Xu Xu và Win Win nói về cả hai người: My ___', 'my'],
      [ng.ten + ' nói với cô bán hàng (lịch sự): Vy ___', 'vy'],
      ['Xu Xu nói với Win Win (thân): Ty ___', 'ty'],
      ['Nói về hai người khác: Oni ___', 'oni'],
      ['Nói về một người bạn nữ: Ona ___', 'ona'],
      ['Nói về một người bạn nam: On ___', 'on'],
      ['Chỉ vào món hàng: To ___', 'to']
    ];
    return lay(CANH, n).map(function (c) {
      const dong = AO.find(function (a) { return a[0] === c[1]; });
      return cauPhai(c[0], dong[1], ganNhieu(dong[1], DANG_AO, 2),
        { loai: 'ao', dai: dong[0], dap: dong[1] }, dong[0] + ' (' + dong[2] + ') → ' + dong[1] + '.');
    });
  }

  // ---------- Bí kíp 3: ty hay vy ----------
  const NGUOI_TY_VY = [['bạn thân', 'ty'], ['một em bé hàng xóm', 'ty'], ['bạn cùng lớp', 'ty'], ['cô bán hàng ở chợ', 'vy'], ['cô giáo', 'vy'],
    ['một người lạ trên phố', 'vy'], ['một bác lớn tuổi', 'vy'], ['một người chưa quen, không chắc nên gọi thế nào', 'vy']];
  function boTyVy(n) {
    const kieu = ['ty-vy', 'hoi-tham', 'hoi-ten', 'hoi-lai'];
    return lay(NGUOI_TY_VY, n).map(function (c, i) {
      const ty = c[1] === 'ty';
      const loai = kieu[i % kieu.length];
      const nhac = ty ? 'Bạn bè, trẻ con → ty.' : 'Người lạ, người lớn, cô bán hàng, cô giáo, không chắc → vy.';
      if (loai === 'ty-vy') return cauPhai('Nói với ' + c[0] + ', dùng ty hay vy?', c[1], ['ty', 'vy'], { loai: 'tyvy', dap: c[1] }, nhac);
      if (loai === 'hoi-tham') return cauPhai('Hỏi thăm ' + c[0] + ':', ty ? 'Jak se máš?' : 'Jak se máte?', ['Jak se máš?', 'Jak se máte?'], { loai: 'tyvy', dap: c[1] }, nhac);
      if (loai === 'hoi-ten') return cauPhai('Hỏi tên ' + c[0] + ':', ty ? 'Jak se jmenuješ?' : 'Jak se jmenujete?', ['Jak se jmenuješ?', 'Jak se jmenujete?'], { loai: 'tyvy', dap: c[1] }, nhac);
      return cauPhai('Bạn nói "Tôi khỏe", rồi hỏi lại ' + c[0] + ': Mám se dobře. ___', ty ? 'A ty?' : 'A vy?', ['A ty?', 'A vy?'], { loai: 'tyvy', dap: c[1] }, nhac);
    });
  }

  // ---------- Bí kíp 8: một cái hay nhiều cái ----------
  function boJeJsou(n, pool) {
    const kq = [];
    const dsTu = tron(pool.filter(function (t) { return t.emoji && t.emoji.length <= 4; }));
    for (let i = 0; kq.length < n && i < dsTu.length + 2; i++) {
      const t = dsTu[i % dsTu.length];
      const kieu = i % 4;
      if (kieu === 0) kq.push(cauPhai('Một món: ' + t.emoji + '. Chọn: To ___ …', 'je', ['je', 'jsou'], { loai: 'jejsou', so: 1 }, 'Một cái → To je …'));
      else if (kieu === 1) kq.push(cauPhai('Nhiều món: ' + t.emoji + t.emoji + t.emoji + '. Chọn: To ___ …', 'jsou', ['je', 'jsou'], { loai: 'jejsou', so: 3 }, 'Nhiều cái → To jsou …'));
      else if (kieu === 2) kq.push(cauPhai('Cái quần 👖. Chọn: To ___ kalhoty.', 'jsou', ['je', 'jsou'], { loai: 'jejsou', so: 2 }, 'Quần có 2 ống nên luôn là nhiều: To jsou kalhoty.'));
      else {
        const sinhVat = t.nhom === 'nguoi' || t.nhom === 'con-vat';
        const dap = sinhVat ? 'Kdo je to?' : 'Co je to?';
        kq.push(cauPhai('Chỉ vào ' + t.emoji + ' và hỏi: ' + (sinhVat ? '"Đây là ai?"' : '"Đây là cái gì?"'), dap, ['Co je to?', 'Kdo je to?'], { loai: 'kdoco', tu: t.tu, dap: dap },
          'Kdo je to? = Đây là ai? · Co je to? = Đây là cái gì?'));
      }
    }
    return kq;
  }

  // ---------- Bí kíp 9: nói "không phải" ----------
  function boPhuDinh(n, pool) {
    const kq = [];
    const dsTu = tron(pool);
    for (let i = 0; kq.length < n && i < dsTu.length; i++) {
      const t = dsTu[i];
      const khac = dsTu[(i + 1) % dsTu.length];
      const kieu = i % 3;
      if (kieu === 0) {
        kq.push(cauPhai('Bạn KHÔNG phải ' + t.nghia + ': ___ ' + t.tu + '.', 'nejsem', ['nejsem', 'není', 'nejsi'], { loai: 'phudinh', dap: 'nejsem' }, 'Tôi không phải → nejsem.'));
      } else if (kieu === 1) {
        kq.push(cauPhai('Đây KHÔNG phải ' + t.nghia + ' ' + t.emoji + ': To ___ ' + t.tu + '.', 'není', ['není', 'nejsem', 'nejsi'], { loai: 'phudinh', dap: 'není' }, 'Riêng je đổi thành není.'));
      } else {
        const dung = i % 2 === 0;
        const phatBieu = 'To je ' + (dung ? t.tu : khac.tu) + '.';
        const dapAn = dung ? 'Ano.' : 'Ne.';
        kq.push(cauPhai('Hình ' + t.emoji + ' (' + t.nghia + '). Cô bán hàng nói: "' + phatBieu + '" Bạn trả lời:', dapAn, ['Ano.', 'Ne.'],
          { loai: 'anone', dung: dung }, dung ? 'Đúng với hình nên nói Ano. (vâng).' : 'Hình là ' + t.nghia + ', không phải ' + khac.nghia + ' nên nói Ne. (không).'));
      }
    }
    return kq;
  }

  // ---------- Bí kíp 10: nữ = nam + -ka ----------
  function dongNghe() {
    return PK.d.nghe_nghiep_cap.filter(function (r) { return r.length >= 4 && r[0] && r[1] && r[0] !== r[1] && r[0].indexOf(' ') < 0; });
  }
  function dongQuocTich() { return PK.d.quoc_tich.filter(function (q) { return q.nam && q.nu; }); }
  function boNu(n) {
    const ng = nguoiChoi();
    const nghe = tron(dongNghe());
    const qt = tron(dongQuocTich());
    const kq = [];
    for (let i = 0; kq.length < n && i < 12; i++) {
      const kieu = i % 4;
      if (kieu === 0) {
        const r = nghe[i % nghe.length], r2 = nghe[(i + 3) % nghe.length];
        kq.push(cauPhai('Dạng nữ của "' + r[0] + '" (' + r[3] + '):', r[1], ganNhieu(r[1], [r[0], r2[1], r2[0]], 2), { loai: 'nu', nam: r[0], nu: r[1] },
          r[0] + ' → ' + r[1] + ' (nữ thêm -ka).'));
      } else if (kieu === 1) {
        const r = nghe[(i + 1) % nghe.length], r2 = nghe[(i + 4) % nghe.length];
        const dap = ng.gioi === 'nu' ? r[1] : r[0];
        kq.push(cauPhai(ng.ten + ' (' + (ng.gioi === 'nu' ? 'nữ' : 'nam') + ') nói mình là ' + r[3] + ': Jsem ___.', dap, ganNhieu(dap, [r[0], r[1], r2[1]], 2),
          { loai: 'nghe-tu-nhan', gioi: ng.gioi, nam: r[0], nu: r[1], dap: dap }, (ng.gioi === 'nu' ? 'Nữ dùng dạng ' + r[1] + '.' : 'Nam dùng dạng ' + r[0] + '.')));
      } else {
        const q = qt[i % qt.length];
        const nam = PK.duLieu.tachNgoac(q.nam).cz, nu = PK.duLieu.tachNgoac(q.nu).cz;
        const dap = 'Jsem ' + (ng.gioi === 'nu' ? nu : nam) + '.';
        const sai = 'Jsem ' + (ng.gioi === 'nu' ? nam : nu) + '.';
        const q2 = qt[(i + 1) % qt.length];
        const khac = 'Jsem ' + PK.duLieu.tachNgoac(ng.gioi === 'nu' ? q2.nu : q2.nam).cz + '.';
        kq.push(cauPhai(ng.ten + ' (' + (ng.gioi === 'nu' ? 'nữ' : 'nam') + ') nói: "Tôi là người ' + q.nuoc + '":', dap, ganNhieu(dap, [sai, khac], 2),
          { loai: 'quoc-tich', gioi: ng.gioi, nam: nam, nu: nu, dap: dap }, ng.gioi === 'nu' ? 'Nữ thêm -ka: ' + nu + '.' : 'Nam dùng dạng ' + nam + '.'));
      }
    }
    return kq.slice(0, n);
  }

  // ---------- Bí kíp 11: màu đi theo giống ----------
  function boMau(n, pool) {
    const mau = tron(PK.d.mau_sac.filter(function (m) { return m.ten.split(' / ').length === 3; }));
    const tu = tron(pool.filter(function (t) { return t.emoji; }));
    const kq = [];
    for (let i = 0; i < n && i < tu.length; i++) {
      const t = tu[i], m = mau[i % mau.length];
      const dang = m.ten.split(' / ').map(function (x) { return x.trim(); });
      const idx = GIONG3.indexOf(t.giong);
      const luaChon = dang.map(function (d) { return d + ' ' + t.tu; });
      const duoi = ['-ý', '-á', '-é'][idx];
      kq.push({
        hoi: 'Chọn màu ' + m.nghia + ' đúng đuôi cho món này:',
        czHoi: { chu: t.tu, khoa: true },
        phu: t.emoji + ' ' + t.nghia,
        nghe: t.tu,
        dap: luaChon[idx],
        luaChon: luaChon,
        nhac: '"' + t.tu + '" là ' + t.giong + ' nên màu có đuôi ' + duoi + ': ' + luaChon[idx] + '.',
        tuKhoa: t.tu,
        kiem: { loai: 'mau', tu: t.tu, dap: dang[idx], mau: m.ten }
      });
    }
    return kq;
  }

  // ---------- Bí kíp 12: ở đâu, từ đâu ----------
  function boNoi(n) {
    const noi = PK.d.noi_chon_cum;
    const tuNuoc = PK.d.quoc_tich.filter(function (q) { return q.tu_nuoc; });
    const kq = [];
    const dsNoi = tron(noi), dsNuoc = tron(tuNuoc);
    for (let i = 0; kq.length < n && i < 12; i++) {
      if (i % 2 === 0) {
        const c = dsNoi[(i / 2) % dsNoi.length];
        const o = ganNhieu('Jsem ' + c.cz + '.', noi.map(function (x) { return 'Jsem ' + x.cz + '.'; }), 2);
        kq.push(cauPhai('Bạn đang ' + c.nghia + '. Trả lời "Kde jsi?":', 'Jsem ' + c.cz + '.', o, { loai: 'noi', cz: c.cz }, c.cz + ' = ' + c.nghia + '.'));
      } else {
        const q = dsNuoc[((i - 1) / 2) % dsNuoc.length];
        const cz = PK.duLieu.tachNgoac(q.tu_nuoc).cz;
        const o = ganNhieu('Jsem ' + cz + '.', tuNuoc.map(function (x) { return 'Jsem ' + PK.duLieu.tachNgoac(x.tu_nuoc).cz + '.'; }), 2);
        kq.push(cauPhai('Bạn đến từ ' + q.nuoc + '. Trả lời "Odkud jste?":', 'Jsem ' + cz + '.', o, { loai: 'tu-nuoc', cz: cz, nuoc: q.nuoc }, 'z + nước: ' + cz + ' = từ ' + q.nuoc + '.'));
      }
    }
    return kq;
  }

  // ---------- Bộ tạo câu theo màn ----------
  PK.cauHoiBK = {
    1: boGiong(1), 2: boAo, 3: boTyVy, 4: boGiong(4), 5: boGiong(5), 6: boGiong(6), 7: boGiong(7),
    8: boJeJsou, 9: boPhuDinh, 10: boNu, 11: boMau, 12: boNoi
  };

  // Nghe một từ rồi chọn hình (kiểu chẵn) hoặc chọn chữ (kiểu lẻ).
  function cauNgheChon(ds, pool) {
    return tron(ds).map(function (t, i) {
      const kieuHinh = i % 2 === 0;
      const chon = [t];
      tron(pool.filter(function (x) { return x.tu !== t.tu; })).forEach(function (x) {
        if (chon.length >= 3) return;
        if (kieuHinh && chon.some(function (c) { return c.emoji === x.emoji; })) return;
        if (kieuHinh && !x.emoji) return;
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

  // Một câu về bí kíp b (khi màn tổng hợp trộn mọi bí kíp): lúc là câu hỏi thuộc, lúc là câu dùng bí kíp với từ.
  function motCauBK(b, tuDaCo, dungBoTao) {
    const tao = PK.cauHoiBK[b.man];
    const thuoc = lay(PK.biKip.cauHoiThuoc(b), 1)[0];
    if (!dungBoTao || !tao) return thuoc;
    return lay(tao(3, PK.tuDenMan(b.man), tuDaCo || {}), 1)[0] || thuoc;
  }
  function cacBiKipDaMo() { return PK.d.bi_kip.filter(function (b) { return b.man >= 1 && b.man <= 12; }); }

  // Màn tổng hợp: mỗi câu lấy từ một bí kíp khác nhau.
  function deTongHop(tuDaCo) {
    return lay(cacBiKipDaMo(), 10).map(function (b, i) { return motCauBK(b, tuDaCo, i % 2 === 0); });
  }

  // Thử thách bí kíp giữa các vòng: 4 câu dùng bí kíp với các từ đã học.
  function thuThach(so, poolDaHoc) {
    if (so === 13) return lay(cacBiKipDaMo(), 4).map(function (b) { return motCauBK(b, {}, true); });
    const tao = PK.cauHoiBK[so];
    const cauBK = tao ? tao(4, poolDaHoc, {}) : [];
    if (cauBK.length >= 3) return cauBK;
    return cauBK.concat(lay(PK.biKip.cauHoiThuoc(PK.biKipTheoMan.get(so)), 4 - cauBK.length));
  }

  // Đề Cửa ải: 10 câu. Một phần hỏi về chính bí kíp, phần còn lại dùng bí kíp với từ đã học.
  // Từ màn 2 trở đi có thêm 1–2 câu về bí kíp các màn trước.
  function deCuaAi(so, tuDaCo) {
    if (so === 13) return deTongHop(tuDaCo);
    const bk = PK.biKipTheoMan.get(so);
    const pool = PK.tuDenMan(so);
    const ds = lay(PK.biKip.cauHoiThuoc(bk), 4);

    if (so >= 2) {
      const cu = PK.d.bi_kip.filter(function (b) { return b.man >= 1 && b.man < so; });
      lay(cu, Math.min(2, cu.length)).forEach(function (b) {
        const q = lay(PK.biKip.cauHoiThuoc(b), 1)[0];
        if (q) { q.cu = true; ds.push(q); }
      });
    }
    const tao = PK.cauHoiBK[so];
    let them = tao ? tao(10 - ds.length, pool, tuDaCo || {}) : [];
    them.forEach(function (q) { ds.push(q); });
    // Thiếu câu thì bù thêm câu hỏi về chính bí kíp của màn (các câu hợp lệ, đáp án vẫn đúng 1).
    const kho = tron(PK.biKip.cauHoiThuoc(bk));
    for (let i = 0; ds.length < 10 && i < kho.length * 3; i++) {
      const q = kho[i % kho.length];
      ds.push({ hoi: q.hoi, dap: q.dap, luaChon: q.luaChon.slice(), nguon: q.nguon });
    }
    return tron(ds.slice(0, 10));
  }

  PK.cauHoi = { cauGiong: cauGiong, cauLac: cauLac, cauNgheChon: cauNgheChon, deCuaAi: deCuaAi, uuTienSai: uuTienSai, thuThach: thuThach };
})();
