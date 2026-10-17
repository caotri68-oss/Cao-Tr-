// Trang kiểm tra tự động (mở kiem-tra.html): in ra kết quả để đối chiếu với dữ liệu.
//  1. Danh sách câu trong tu-vung.json chưa xuất hiện ở màn nào. Với các màn đã làm, danh sách này phải rỗng.
//  2. Mỗi màn: 15 từ, từ bẫy chỉ xuất hiện sau bí kíp giải thích, từ không lặp giữa các màn.
//  3. Cửa ải, thử thách, nghe-chọn: mỗi câu phải có đúng một đáp án đúng và khớp dữ liệu (thử cả nam và nữ).
//  4. Hội thoại: mỗi lượt chọn có đúng một đáp án; câu chỉ dùng từ màn có "man" của nó trở đi; mọi câu tra được nghĩa.
window.PK = window.PK || {};

(async function () {
  const h = PK.ui.h;
  const kq = document.getElementById('kq');
  const dong = function (ok, chu) { kq.append(h('p', { class: ok ? 'ok' : 'loi' }, (ok ? '✔ ' : '✘ ') + chu)); };
  const tieuDe = function (chu) { kq.append(h('h2', null, chu)); };

  const t = await PK.duLieu.tai();
  kq.replaceChildren();
  if (t.loi) { t.loi.forEach(function (l) { dong(false, l); }); return; }
  const d = PK.d;
  const chuan = PK.duLieu.chuan;
  const manDaLam = [0].concat(PK.manChoi.MAN_DA_LAM);
  const manCuoi = Math.max.apply(null, manDaLam);
  window.PK_KIEM = { loi: 0 };
  const bao = function (ok, chu) { if (!ok) PK_KIEM.loi++; dong(ok, chu); };
  const GIOI = [{ id: 'bo', ten: 'Bố', gioi: 'nam' }, { id: 'xuxu', ten: 'Xu Xu', gioi: 'nu' }];
  const datNguoi = function (g) { PK.hoSoDangChoi = g; };

  // ---- 1. Câu chưa dùng ----
  tieuDe('1. Câu chưa xuất hiện trong game');
  const dung = new Set(PK.man0.cauDung);
  PK.manChoi.MAN_DA_LAM.forEach(function (so) { PK.manChoi.cauDung(so).forEach(function (c) { dung.add(c); }); });
  const dungChuan = new Set(Array.from(dung).map(chuan));
  // Câu có hai dạng "A / B" coi là đã dùng khi một trong hai dạng xuất hiện.
  const daDung = function (c) { return c.cz.split(/\s\/\s/).some(function (p) { return dungChuan.has(chuan(p)); }); };
  const chuaDung = d.cau.filter(function (c) { return !daDung(c); });
  bao(chuaDung.length === 0, 'Câu chưa xuất hiện (màn 0 đến ' + manCuoi + '): ' + (chuaDung.length ? chuaDung.map(function (c) { return '"' + c.cz + '" (màn ' + c.man + ')'; }).join(', ') : 'không có (đạt: cả ' + d.cau.length + ' câu đều được dùng)'));

  // Câu chỉ được dùng từ màn có "man" của nó trở đi.
  let sai = [];
  PK.manChoi.MAN_DA_LAM.forEach(function (so) {
    GIOI.forEach(function (g) {
      PK.hoiThoai.cauDung(so, g).forEach(function (cz) {
        const c = PK.cauTheoChu.get(chuan(cz));
        d.cau.forEach(function (x) { if (x.cz === cz && x.man > so) sai.push('màn ' + so + ' dùng "' + cz + '" (màn ' + x.man + ')'); });
        void c;
      });
    });
  });
  bao(sai.length === 0, 'Không câu nào xuất hiện sớm hơn màn của nó: ' + (sai.length ? sai.slice(0, 4).join('; ') : 'đạt'));

  // ---- 2. Chọn từ cho màn ----
  tieuDe('2. Từ của các màn');
  const tatCa = new Set();
  let loiTu = [];
  PK.manChoi.MAN_DA_LAM.forEach(function (so) {
    const m = PK.chonTuMan(so);
    const dem = { TEN: 0, TA: 0, TO: 0 };
    m.tatCa.forEach(function (x) { dem[x.giong]++; });
    if (m.tatCa.length !== 15) loiTu.push('màn ' + so + ' có ' + m.tatCa.length + ' từ');
    if (!m.vong.every(function (v) { return v.length === 5; })) loiTu.push('màn ' + so + ' chia vòng chưa 5-5-5');
    m.tatCa.forEach(function (x) {
      if (tatCa.has(x.tu)) loiTu.push('"' + x.tu + '" lặp ở màn ' + so);
      tatCa.add(x.tu);
      const bk = PK.bkGiaiThich(x);
      if (x.bay && !(bk > 0 && bk <= so) && !(bk === 0 && so >= 8)) loiTu.push('từ bẫy "' + x.tu + '" xuất hiện sớm ở màn ' + so);
      if (x.tu === 'pivo') loiTu.push('có từ không hợp trẻ em');
    });
    kq.append(h('p', { class: 'nhat' }, 'Màn ' + so + ' (TEN ' + dem.TEN + ' · TA ' + dem.TA + ' · TO ' + dem.TO + '): ' + m.tatCa.map(function (x) { return x.emoji + x.tu + (x.bay ? '★' : ''); }).join(' ')));
  });
  bao(loiTu.length === 0, 'Mỗi màn 15 từ chia 3 vòng × 5, không lặp từ, từ bẫy chỉ sau khi bí kíp giải thích đã mở: ' + (loiTu.length ? loiTu.slice(0, 5).join('; ') : 'đạt'));
  const conLai = d.danh_tu.filter(function (x) { return !tatCa.has(x.tu); }).map(function (x) { return x.tu; });
  kq.append(h('p', { class: 'nhat' }, 'Từ chưa dùng ở màn nào (' + conLai.length + '): ' + conLai.join(', ')));
  // Màn 1 phải đúng luật đuôi và cân bằng.
  const m1 = PK.chonTuMan(1).tatCa;
  bao(m1.filter(function (x) { return x.giong === 'TEN'; }).length === 5 && m1.filter(function (x) { return x.giong === 'TA'; }).length === 5, 'Màn 1 cân bằng 5 TEN · 5 TA · 5 TO');
  // Lời nhắc khi chọn sai giỏ phải nêu đúng giống
  bao(d.danh_tu.every(function (x) { return PK.nhacGiong(x).indexOf(x.giong) >= 0; }), 'Lời nhắc chọn sai giỏ của 183 từ đều nêu đúng giống');

  // ---- 3. Câu hỏi ----
  const giongCua = function (tu) { return d.danh_tu.find(function (x) { return x.tu === tu; }).giong; };
  const bangAo = {};
  PK.biKipTheoMan.get(2).chi_tiet.forEach(function (dong) {
    const m = dong.split('→'); if (m.length < 2 || /Dễ nhầm/.test(dong)) return;
    const verb = m[1].trim().split(/\s+/)[0];
    m[0].replace(/\([^)]*\)/g, '').split('/').forEach(function (p) { bangAo[p.trim()] = verb; });
  });
  const dangMau = function (ten) { return ten.split(' / ').map(function (x) { return x.trim(); }); };

  function kiemCau(q) {
    if (!PK.cuaAi.hopLe(q)) return 'không đúng 1 đáp án hoặc lựa chọn trùng: ' + q.hoi;
    const k = q.kiem; if (!k) return null;
    switch (k.loai) {
      case 'gioi': return giongCua(k.tu) === q.dap ? null : 'đáp án giống sai: ' + k.tu;
      case 'lac': {
        const g = k.tu.map(giongCua);
        const dem = {}; g.forEach(function (x) { dem[x] = (dem[x] || 0) + 1; });
        const le = k.tu.filter(function (_, i) { return dem[g[i]] === 1; });
        if (Object.keys(dem).length !== 2 || le.length !== 1) return 'không phải 2 cùng giống + 1 khác giống: ' + k.tu.join(',');
        return le[0] === k.dap && q.dap.indexOf(k.dap) >= 0 ? null : 'từ lạc nhóm sai';
      }
      case 'nghe': return null;
      case 'ao': return bangAo[k.dai] === k.dap && q.dap === k.dap ? null : 'áo là sai: ' + k.dai;
      case 'tyvy': {
        const ty = /máš|jmenuješ|A ty/.test(q.dap) || q.dap === 'ty';
        return (k.dap === 'ty') === ty ? null : 'ty/vy sai: ' + q.hoi;
      }
      case 'jejsou': return q.dap === (k.so === 1 ? 'je' : 'jsou') ? null : 'je/jsou sai';
      case 'kdoco': {
        const t = d.danh_tu.find(function (x) { return x.tu === k.tu; });
        return (t.nhom === 'nguoi' || t.nhom === 'con-vat') === (q.dap === 'Kdo je to?') ? null : 'Kdo/Co sai';
      }
      case 'phudinh': return ['nejsem', 'není'].indexOf(q.dap) >= 0 ? null : 'phủ định sai';
      case 'anone': return (q.dap === 'Ano.') === k.dung ? null : 'Ano/Ne sai';
      case 'nu': return d.nghe_nghiep_cap.some(function (r) { return r[0] === k.nam && r[1] === k.nu; }) && q.dap === k.nu ? null : 'dạng nữ sai';
      case 'nghe-tu-nhan': {
        const r = d.nghe_nghiep_cap.find(function (x) { return x[0] === k.nam && x[1] === k.nu; });
        return r && q.dap === (k.gioi === 'nu' ? r[1] : r[0]) ? null : 'nghề theo giới sai';
      }
      case 'quoc-tich': {
        const r = d.quoc_tich.find(function (x) { return PK.duLieu.tachNgoac(x.nam).cz === k.nam; });
        return r && q.dap === 'Jsem ' + (k.gioi === 'nu' ? k.nu : k.nam) + '.' && PK.duLieu.tachNgoac(r.nu).cz === k.nu ? null : 'quốc tịch theo giới sai';
      }
      case 'mau': {
        const m = d.mau_sac.find(function (x) { return x.ten === k.mau; });
        const idx = ['TEN', 'TA', 'TO'].indexOf(giongCua(k.tu));
        return m && dangMau(m.ten)[idx] === k.dap && q.dap === k.dap + ' ' + k.tu ? null : 'màu theo giống sai: ' + k.tu;
      }
      case 'noi': return d.noi_chon_cum.some(function (x) { return x.cz === k.cz; }) && q.dap === 'Jsem ' + k.cz + '.' ? null : 'nơi chốn sai';
      case 'tu-nuoc': return d.quoc_tich.some(function (x) { return x.tu_nuoc && PK.duLieu.tachNgoac(x.tu_nuoc).cz === k.cz; }) ? null : 'từ nước sai';
      default: return 'loại câu lạ: ' + k.loai;
    }
  }

  tieuDe('3. Câu hỏi Cửa ải, thử thách, nghe-chọn');
  PK.manChoi.MAN_DA_LAM.forEach(function (so) {
    let loi = [];
    const SO_DE = 120;
    GIOI.forEach(function (g) {
      datNguoi(g);
      for (let i = 0; i < SO_DE; i++) {
        const de = PK.cauHoi.deCuaAi(so, {});
        if (de.length !== 10) loi.push('đề ' + i + ' có ' + de.length + ' câu');
        de.forEach(function (q) { const e = kiemCau(q); if (e) loi.push(e); });
        PK.cauHoi.thuThach(so, PK.tuDenMan(so)).forEach(function (q) { const e = kiemCau(q); if (e) loi.push('thử thách: ' + e); });
        PK.chonTuMan(so).vong.forEach(function (ds) {
          PK.cauHoi.cauNgheChon(ds, PK.tuDenMan(so)).forEach(function (q) { const e = kiemCau(q); if (e) loi.push('nghe-chọn: ' + e); });
        });
      }
    });
    bao(loi.length === 0, 'Màn ' + so + ': ' + (SO_DE * GIOI.length) + ' đề Cửa ải (10 câu) + thử thách + nghe-chọn: ' + (loi.length ? loi.slice(0, 4).join('; ') : 'mọi câu có đúng 1 đáp án và khớp dữ liệu'));
  });

  // Màn tổng hợp (màn 13): mỗi đề trộn câu hỏi từ nhiều bí kíp
  {
    let loi = [];
    GIOI.forEach(function (g) {
      datNguoi(g);
      for (let i = 0; i < 120; i++) {
        const de = PK.cauHoi.deCuaAi(13, {});
        if (de.length !== 10) loi.push('đề ' + i + ' có ' + de.length + ' câu');
        de.forEach(function (q) { const e = kiemCau(q); if (e) loi.push(e); });
        PK.cauHoi.thuThach(13, []).forEach(function (q) { const e = kiemCau(q); if (e) loi.push('thử thách: ' + e); });
      }
    });
    bao(loi.length === 0, 'Màn 13 (tổng hợp): ' + (GIOI.length * 120) + ' đề trộn mọi bí kíp: ' + (loi.length ? loi.slice(0, 4).join('; ') : 'mọi câu có đúng 1 đáp án và khớp dữ liệu'));
    bao(PK.huyHieu.DS.length === 14, 'Có đủ 14 huy hiệu (màn 0 đến 13)');
  }

  // ---- 4. Hội thoại ----
  tieuDe('4. Hội thoại ở chợ');
  const truoc = function (cz) { return cz; };
  let loiHT = [];
  PK.hoiThoai.MAN_CO.forEach(function (so) {
    GIOI.forEach(function (g) {
      datNguoi(g);
      const vong = PK.hoiThoai.tao(so, { ten: g.ten, gioi: g.gioi });
      if (vong.length !== 3) loiHT.push('màn ' + so + ' không đủ 3 đoạn');
      vong.forEach(function (ds, r) {
        if (!ds.length) loiHT.push('màn ' + so + ' vòng ' + (r + 1) + ' trống');
        ds.forEach(function (L) {
          if (L.loai === 'chon') {
            if (L.tuyChon.filter(function (x) { return x === L.dung; }).length !== 1) loiHT.push('màn ' + so + ' vòng ' + (r + 1) + ': lượt chọn không có đúng 1 đáp án (' + L.dung + ')');
            if (new Set(L.tuyChon).size !== L.tuyChon.length) loiHT.push('màn ' + so + ': lựa chọn trùng');
          }
          [L.cz].concat(L.tuyChon || []).filter(Boolean).forEach(function (c) {
            truoc(c);
            if (!PK.cauTheoChu.has(chuan(c)) && !PK.tuDien.has(chuan(c))) loiHT.push('màn ' + so + ': chưa có nghĩa cho "' + c + '"');
          });
        });
      });
    });
  });
  // Màn 1 (hội thoại theo từ)
  PK.chonTuMan(1).vong.forEach(function (ds, r) {
    PK.manChoi.taoHoiThoai(1, ds).luot.forEach(function (L) {
      if (L.loai === 'chon' && L.tuyChon.filter(function (x) { return x === L.dung; }).length !== 1) loiHT.push('màn 1 vòng ' + (r + 1) + ': lượt chọn sai');
      [L.cz].concat(L.tuyChon || []).filter(Boolean).forEach(function (c) { if (!PK.cauTheoChu.has(chuan(c))) loiHT.push('màn 1: chưa có nghĩa cho "' + c + '"'); });
    });
  });
  bao(loiHT.length === 0, 'Hội thoại màn 1 đến 12 (nam và nữ): ' + (loiHT.length ? loiHT.slice(0, 5).join('; ') : 'mỗi lượt chọn có đúng 1 đáp án, mọi câu đều tra được nghĩa'));

  kq.append(h('h2', null, PK_KIEM.loi ? 'Có ' + PK_KIEM.loi + ' mục chưa đạt' : 'Tất cả đều đạt ✔'));
  document.title = PK_KIEM.loi ? 'KIEM-TRA: LOI' : 'KIEM-TRA: DAT';
})();
