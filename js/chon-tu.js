// Chọn 15 danh từ cho mỗi màn (3 vòng × 5 từ, cố gắng cân bằng TEN / TA / TO).
//
// Quy tắc (theo bản yêu cầu):
//  1. Ưu tiên từ minh họa đúng bí kíp của màn (ví dụ màn 4: đuôi -í, -iště; màn 7: đuôi -ev, -oc, -ň).
//  2. Từ bẫy chỉ xuất hiện sau khi bí kíp giải thích nó đã mở.
//  3. Phần còn lại lấy theo thứ tự nhóm: cho, nguoi, con-vat, do-vat, noi-chon, thoi-gian, co-the, khac.
window.PK = window.PK || {};

(function () {
  const NHOM = ['cho', 'nguoi', 'con-vat', 'do-vat', 'noi-chon', 'thoi-gian', 'co-the', 'khac'];
  const GIONG3 = ['TEN', 'TA', 'TO'];
  // Từ không đưa vào game trẻ em (bia).
  const LOAI_KHOI = ['pivo'];
  // Từ nhất định phải có ở màn đó (cô mèo, chú chó, quyển sách xuất hiện trong câu mẫu).
  const BAT_BUOC = { 1: ['kočka', 'pes', 'kniha'] };
  // Màn nào ưu tiên nhóm nào trước (màn 2, 3 nói về người).
  const NHOM_UU_TIEN = { 2: ['nguoi'], 3: ['nguoi'] };
  // Từ bẫy chưa có bí kíp nào giải thích (đuôi -e, -u, -m… của em bé TO): chỉ cho vào từ màn 8,
  // lúc đã học hết các bí kíp về giống.
  const MAN_DAU_NGOAI_LE = 8;

  // ----- Các luật đoán giống (lấy từ bí kíp 1, 4, 5, 6, 7) -----
  const MEN_A = ['táta', 'kolega', 'turista', 'fotbalista', 'soudce', 'průvodce']; // BK6
  const THUOC_LONG = ['kancelář', 'myš', 'postel', 'sůl', 'zeď', 'labuť', 'tramvaj', 'garáž']; // BK7
  const DUOI_TA_5 = /(ost|ice|ace|ize|ie|ule|ce)$/; // BK5
  const DUOI_TA_7 = /(ev|oc|ň)$/; // BK7
  const DUOI_TO_4 = /(í|iště)$/; // BK4

  function chuCuoiDoanGiong(tu) {
    const l = tu.slice(-1).toLowerCase();
    if (l === 'a') return 'TA';
    if (l === 'o') return 'TO';
    if ('eěéiíoóuúůyý'.indexOf(l) >= 0) return null;
    return 'TEN';
  }

  // Từ này được bí kíp nào giải thích? Trả về số bí kíp, hoặc 0 nếu chưa có bí kíp nào.
  function bkGiaiThich(t) {
    if (t.tu === 'paní') return 4;
    if (MEN_A.indexOf(t.tu) >= 0) return 6;
    if (t.giong === 'TA' && (DUOI_TA_7.test(t.tu) || THUOC_LONG.indexOf(t.tu) >= 0)) return 7;
    if (t.giong === 'TA' && DUOI_TA_5.test(t.tu)) return 5;
    if (t.giong === 'TO' && DUOI_TO_4.test(t.tu)) return 4;
    if (!t.bay && chuCuoiDoanGiong(t.tu) === t.giong) return 1;
    return 0;
  }

  // Lời nhắc khi chọn sai giỏ: nói đúng luật áp dụng cho từ đó (luôn nêu giống đúng).
  const ONG_BA_EM = { TEN: 'ông', TA: 'bà', TO: 'em bé' };
  function nhacGiong(t) {
    const tu = t.tu, g = t.giong;
    switch (bkGiaiThich(t)) {
      case 4:
        if (tu === 'paní') return 'Ngoại lệ: "paní" đuôi -í nhưng là TA (bà, cô).';
        return 'Từ "' + tu + '" có đuôi ' + (/iště$/.test(tu) ? '-iště (nơi chốn)' : '-í') + ' → TO (em bé).';
      case 5: return 'Từ "' + tu + '" có đuôi lạ ' + DUOI_TA_5.exec(tu)[1] + ' → TA (bà).';
      case 6: return 'Từ "' + tu + '" chỉ đàn ông nên luôn là TEN (ông), dù đuôi -a hay -ce.';
      case 7:
        return DUOI_TA_7.test(tu)
          ? 'Từ "' + tu + '" đuôi -' + DUOI_TA_7.exec(tu)[1] + ' → TA (bà).'
          : 'Từ "' + tu + '" phải thuộc lòng: TA (bà).';
      case 1: {
        const l = tu.slice(-1);
        const luat = l === 'a' ? 'tận cùng bằng -a → TA' : l === 'o' ? 'tận cùng bằng -o → TO' : 'tận cùng bằng phụ âm "' + l + '" → TEN';
        return 'Từ "' + tu + '" ' + luat + ' (' + ONG_BA_EM[g] + ').';
      }
      default: return 'Từ "' + tu + '" là ngoại lệ, phải nhớ riêng: ' + g + ' (' + ONG_BA_EM[g] + ').';
    }
  }
  PK.nhacGiong = nhacGiong;
  PK.bkGiaiThich = bkGiaiThich;

  // Màn nào có bí kíp về giống (dùng câu hỏi chọn giỏ và lạc nhóm).
  PK.MAN_GIONG = [1, 4, 5, 6, 7];

  function hopLeMan(t, so, daDung) {
    if (daDung.has(t.tu) || LOAI_KHOI.indexOf(t.tu) >= 0 || /cần kiểm tra/.test(t.nghia)) return false;
    if (so === 1) return !t.bay && bkGiaiThich(t) === 1;
    const bk = bkGiaiThich(t);
    if (bk > 0) return bk <= so;           // đã có bí kíp giải thích
    return so >= MAN_DAU_NGOAI_LE;         // ngoại lệ chưa có bí kíp
  }

  const bo = {};
  function chonTuMan(so) {
    if (bo[so]) return bo[so];
    if (so < 1 || so > 12) return (bo[so] = { vong: [[], [], []], tatCa: [] }); // màn 0 và màn tổng hợp không có từ mới

    const daDung = new Set();
    for (let m = 1; m < so; m++) chonTuMan(m).tatCa.forEach(function (t) { daDung.add(t.tu); });
    const ungVien = PK.d.danh_tu.filter(function (t) { return hopLeMan(t, so, daDung); });

    const chon = [];
    const them = function (t) { if (t && chon.length < 15 && chon.indexOf(t) < 0) chon.push(t); };

    // 1) Từ bắt buộc, rồi từ minh họa đúng bí kíp của màn.
    (BAT_BUOC[so] || []).forEach(function (tu) { them(ungVien.find(function (t) { return t.tu === tu; })); });
    // Tối đa 9 từ minh họa bí kíp để còn từ "bình thường" đối chiếu; từ thừa để màn sau (vẫn đủ điều kiện).
    if (so !== 1) ungVien.filter(function (t) { return bkGiaiThich(t) === so; }).slice(0, 9).forEach(them);

    // 2) Phần còn lại: mỗi lượt lấy giống đang thiếu nhất, luân phiên qua các nhóm.
    const thuTuNhom = (NHOM_UU_TIEN[so] || []).concat(NHOM.filter(function (n) { return (NHOM_UU_TIEN[so] || []).indexOf(n) < 0; }));
    const conLai = {};
    GIONG3.forEach(function (g) {
      conLai[g] = thuTuNhom.map(function (n) { return ungVien.filter(function (t) { return t.giong === g && t.nhom === n && chon.indexOf(t) < 0; }); });
    });
    const dem = function (g) { return chon.filter(function (t) { return t.giong === g; }).length; };
    // Từ TO ít hơn TEN và TA, nên mỗi màn chỉ lấy tối đa 4 từ TO để các màn sau còn đủ.
    const TRAN = so === 1 ? { TEN: 5, TA: 5, TO: 5 } : { TEN: 6, TA: 6, TO: 4 };
    [TRAN, { TEN: 15, TA: 15, TO: 15 }].forEach(function (tran) {
      let tiep = true;
      while (chon.length < 15 && tiep) {
        tiep = false;
        GIONG3.slice().sort(function (a, b) { return dem(a) - dem(b); }).forEach(function (g) {
          if (chon.length >= 15 || dem(g) >= tran[g]) return;
          const nhom = conLai[g].find(function (l) { return l.length; });
          if (nhom) { them(nhom.shift()); tiep = true; }
        });
      }
    });

    const T = chon.filter(function (t) { return t.giong === 'TEN'; });
    const A = chon.filter(function (t) { return t.giong === 'TA'; });
    const O = chon.filter(function (t) { return t.giong === 'TO'; });
    let vong;
    if (T.length === 5 && A.length === 5 && O.length === 5) {
      vong = [[T[0], A[0], T[1], A[1], O[0]], [T[2], O[1], A[2], T[3], O[2]], [A[3], T[4], O[3], A[4], O[4]]];
    } else {
      // Chia đều từng giống cho 3 vòng để vòng nào cũng có đủ loại.
      vong = [[], [], []];
      T.concat(A, O).forEach(function (t, i) { vong[i % 3].push(t); });
    }
    return (bo[so] = { vong: vong, tatCa: [].concat(vong[0], vong[1], vong[2]) });
  }

  // Tất cả từ từ màn 1 đến màn `so`.
  function tuDenMan(so) {
    let ds = [];
    for (let m = 1; m <= Math.min(so, 12); m++) ds = ds.concat(chonTuMan(m).tatCa);
    return ds;
  }

  PK.chonTuMan = chonTuMan;
  PK.tuDenMan = tuDenMan;
  PK.chonTu = { BAT_BUOC: BAT_BUOC };
})();
