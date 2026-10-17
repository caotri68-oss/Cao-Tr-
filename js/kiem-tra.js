// Trang kiểm tra tự động (mở kiem-tra.html): in ra kết quả để đối chiếu với dữ liệu.
//  1. Danh sách câu trong tu-vung.json chưa xuất hiện ở màn nào. Với các màn đã làm, danh sách này phải rỗng.
//  2. Mỗi màn: 15 từ, 5 TEN / 5 TA / 5 TO, không có từ bẫy, từ không lặp giữa các màn.
//  3. Cửa ải: tạo nhiều đề, mỗi câu phải có đúng một đáp án đúng và khớp dữ liệu.
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
  const manDaLam = [0].concat(PK.manChoi.MAN_DA_LAM);
  window.PK_KIEM = { loi: 0 };
  const bao = function (ok, chu) { if (!ok) PK_KIEM.loi++; dong(ok, chu); };

  // ---- 1. Câu chưa dùng ----
  tieuDe('1. Câu chưa xuất hiện trong game');
  const dung = new Set(PK.man0.cauDung);
  PK.manChoi.MAN_DA_LAM.forEach(function (so) { PK.manChoi.cauDung(so).forEach(function (c) { dung.add(c); }); });
  const chuan = PK.duLieu.chuan;
  const dungChuan = new Set(Array.from(dung).map(chuan));
  // Câu có hai dạng "A / B" coi là đã dùng khi một trong hai dạng xuất hiện.
  const daDung = function (c) {
    return c.cz.split(/\s\/\s/).some(function (p) { return dungChuan.has(chuan(p)); });
  };
  const chuaDung = d.cau.filter(function (c) { return !daDung(c); });
  const trongManDaLam = chuaDung.filter(function (c) { return manDaLam.indexOf(c.man) >= 0 || c.man < Math.max.apply(null, manDaLam); });
  bao(trongManDaLam.length === 0, 'Câu của các màn đã làm (màn ' + manDaLam.join(', ') + ') chưa xuất hiện: ' + (trongManDaLam.length ? trongManDaLam.map(function (c) { return '"' + c.cz + '" (màn ' + c.man + ')'; }).join(', ') : 'không có (đạt)'));
  kq.append(h('p', { class: 'nhat' }, 'Câu của các màn chưa làm (sẽ có ở giai đoạn sau): ' + chuaDung.filter(function (c) { return trongManDaLam.indexOf(c) < 0; }).length + ' câu.'));
  kq.append(h('pre', null, chuaDung.map(function (c) { return 'màn ' + c.man + ': ' + c.cz; }).join('\n')));

  // ---- 2. Chọn từ cho màn ----
  const tatCa = new Set();
  PK.manChoi.MAN_DA_LAM.forEach(function (so) {
    tieuDe('2. Từ của màn ' + so);
    const m = PK.chonTuMan(so);
    const dem = { TEN: 0, TA: 0, TO: 0 };
    m.tatCa.forEach(function (x) { dem[x.giong]++; });
    bao(m.tatCa.length === 15, '15 từ (đang có ' + m.tatCa.length + ')');
    bao(dem.TEN === 5 && dem.TA === 5 && dem.TO === 5, 'Cân bằng TEN ' + dem.TEN + ' · TA ' + dem.TA + ' · TO ' + dem.TO);
    bao(m.vong.every(function (v) { return v.length === 5; }), '3 vòng, mỗi vòng 5 từ');
    bao(!m.tatCa.some(function (x) { return x.bay; }), 'Không có từ bẫy (chưa mở bí kíp giải thích)');
    bao(!m.tatCa.some(function (x) { const da = tatCa.has(x.tu); tatCa.add(x.tu); return da; }), 'Không lặp từ với màn trước');
    bao(!m.tatCa.some(function (x) { return x.tu === 'pivo'; }), 'Không có từ không hợp trẻ em');
    m.vong.forEach(function (v, i) { kq.append(h('p', null, 'Vòng ' + (i + 1) + ': ' + v.map(function (x) { return x.emoji + ' ' + x.giong + ' ' + x.tu; }).join(' · '))); });
    // Đoán giống theo đuôi chữ phải đúng với dữ liệu (bí kíp 1)
    if (so === 1) bao(m.tatCa.every(function (x) { const l = x.tu.slice(-1); return (l === 'a' ? 'TA' : l === 'o' ? 'TO' : 'TEN') === x.giong; }), 'Mọi từ đúng luật đuôi của bí kíp 1');
  });

  // ---- 3. Cửa ải ----
  const giongCua = function (tu) { return d.danh_tu.find(function (x) { return x.tu === tu; }).giong; };
  function kiemCau(q) {
    if (!PK.cuaAi.hopLe(q)) return 'không đúng 1 đáp án hoặc lựa chọn trùng';
    const k = q.kiem; if (!k) return null;
    if (k.loai === 'gioi') return giongCua(k.tu) === q.dap ? null : 'đáp án giống sai với dữ liệu: ' + k.tu;
    if (k.loai === 'lac') {
      const g = k.tu.map(giongCua);
      const dem = {}; g.forEach(function (x) { dem[x] = (dem[x] || 0) + 1; });
      const le = k.tu.filter(function (_, i) { return dem[g[i]] === 1; });
      if (Object.keys(dem).length !== 2 || le.length !== 1) return 'không phải 2 cùng giống + 1 khác giống: ' + k.tu.join(',');
      return le[0] === k.dap && q.dap.indexOf(k.dap) >= 0 ? null : 'từ lạc nhóm sai';
    }
    if (k.loai === 'nghe') return q.luaChon.length >= 2 ? null : 'thiếu lựa chọn';
    return null;
  }
  PK.manChoi.MAN_DA_LAM.forEach(function (so) {
    tieuDe('3. Cửa ải màn ' + so);
    let loi = [];
    const SO_DE = 300;
    for (let i = 0; i < SO_DE; i++) {
      const de = PK.cauHoi.deCuaAi(so, {});
      if (de.length !== 10) loi.push('đề ' + i + ' có ' + de.length + ' câu');
      de.forEach(function (q) { const e = kiemCau(q); if (e) loi.push(e + ' [' + q.hoi + ']'); });
      const thuThach = PK.thuThachBK[so] ? PK.thuThachBK[so](PK.tuDenMan(so)) : [];
      thuThach.forEach(function (q) { const e = kiemCau(q); if (e) loi.push('thử thách: ' + e); });
      PK.chonTuMan(so).vong.forEach(function (ds, r) {
        PK.cauHoi.cauNgheChon(ds, PK.tuDenMan(so).filter(function (_, idx) { return true; })).forEach(function (q) { const e = kiemCau(q); if (e) loi.push('nghe-chọn: ' + e); });
      });
    }
    bao(loi.length === 0, SO_DE + ' đề Cửa ải (mỗi đề 10 câu), thử thách và nghe-chọn: ' + (loi.length ? loi.slice(0, 5).join('; ') : 'mọi câu có đúng 1 đáp án và khớp dữ liệu'));
    // Hội thoại: mọi lượt "chọn" phải có đáp án nằm trong lựa chọn
    let loiHT = [];
    PK.chonTuMan(so).vong.forEach(function (ds, r) {
      PK.manChoi.taoHoiThoai(so, ds).luot.forEach(function (L) {
        if (L.loai === 'chon' && L.tuyChon.filter(function (x) { return x === L.dung; }).length !== 1) loiHT.push('vòng ' + (r + 1) + ': lượt chọn sai');
        [L.cz].concat(L.tuyChon || []).filter(Boolean).forEach(function (c) { if (!PK.cauTheoChu.has(chuan(c))) loiHT.push('thiếu nghĩa cho "' + c + '"'); });
      });
    });
    bao(loiHT.length === 0, 'Hội thoại 3 vòng: ' + (loiHT.length ? loiHT.join('; ') : 'mọi câu đều tra được nghĩa, mỗi lượt có đúng 1 đáp án'));
  });

  kq.append(h('h2', null, PK_KIEM.loi ? 'Có ' + PK_KIEM.loi + ' mục chưa đạt' : 'Tất cả đều đạt ✔'));
  document.title = PK_KIEM.loi ? 'KIEM-TRA: LOI' : 'KIEM-TRA: DAT';
})();
