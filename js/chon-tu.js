// Chọn 15 danh từ cho mỗi màn (3 vòng × 5 từ, cân bằng TEN / TA / TO).
window.PK = window.PK || {};

(function () {
  // Thứ tự nhóm theo bản yêu cầu.
  const NHOM = ['cho', 'nguoi', 'con-vat', 'do-vat', 'noi-chon', 'thoi-gian', 'co-the', 'khac'];
  const GIONG3 = ['TEN', 'TA', 'TO'];
  // Từ không đưa vào game trẻ em (bia).
  const LOAI_KHOI = ['pivo'];
  // Từ nhất định phải có ở màn đó (cô mèo, chú chó, quyển sách xuất hiện trong câu mẫu).
  const BAT_BUOC = { 1: ['kočka', 'pes', 'kniha'] };

  function chuCuoiDoanGiong(tu) {
    const l = tu.slice(-1).toLowerCase();
    if (l === 'a') return 'TA';
    if (l === 'o') return 'TO';
    if ('eěéiíoóuúůyý'.indexOf(l) >= 0) return null;
    return 'TEN';
  }

  // Điều kiện riêng của từng màn: từ phải minh họa đúng bí kíp của màn.
  const HOP_LE = {
    1: function (t) { return chuCuoiDoanGiong(t.tu) === t.giong; }
  };

  // Lời nhắc khi chọn sai giỏ, theo bí kíp của màn (chỉ khai báo màn nào có luật đoán giống).
  const ONG_BA_EM = { TEN: 'ông', TA: 'bà', TO: 'em bé' };
  PK.nhacLuat = {
    1: function (t) {
      const l = t.tu.slice(-1);
      const luat = l === 'a' ? 'tận cùng bằng -a → TA' : l === 'o' ? 'tận cùng bằng -o → TO' : 'tận cùng bằng phụ âm "' + l + '" → TEN';
      return 'Từ "' + t.tu + '" ' + luat + ' (' + ONG_BA_EM[t.giong] + ').';
    }
  };

  const bo = {};
  function chonTuMan(so) {
    if (bo[so]) return bo[so];
    if (so < 1) return (bo[so] = { vong: [[], [], []], tatCa: [] });

    const daDung = new Set();
    for (let m = 1; m < so; m++) chonTuMan(m).tatCa.forEach(function (t) { daDung.add(t.tu); });
    const hopLeMan = HOP_LE[so] || function () { return true; };

    const ungVien = PK.d.danh_tu.filter(function (t) {
      return !t.bay && !daDung.has(t.tu) && LOAI_KHOI.indexOf(t.tu) < 0 && !/cần kiểm tra/.test(t.nghia) && hopLeMan(t);
    });

    const chon = { TEN: [], TA: [], TO: [] };
    (BAT_BUOC[so] || []).forEach(function (tu) {
      const t = ungVien.find(function (x) { return x.tu === tu; });
      if (t && chon[t.giong].length < 5) chon[t.giong].push(t);
    });
    // Mỗi giống lấy luân phiên qua các nhóm để cảnh chợ có đủ loại.
    GIONG3.forEach(function (g) {
      const theoNhom = NHOM.map(function (n) {
        return ungVien.filter(function (t) { return t.giong === g && t.nhom === n && chon[g].indexOf(t) < 0; });
      });
      let them = true;
      while (chon[g].length < 5 && them) {
        them = false;
        theoNhom.forEach(function (ds) {
          if (chon[g].length < 5 && ds.length) { chon[g].push(ds.shift()); them = true; }
        });
      }
    });

    const T = chon.TEN, A = chon.TA, O = chon.TO;
    let vong;
    if (T.length === 5 && A.length === 5 && O.length === 5) {
      vong = [[T[0], A[0], T[1], A[1], O[0]], [T[2], O[1], A[2], T[3], O[2]], [A[3], T[4], O[3], A[4], O[4]]];
    } else {
      // Không đủ 5 từ mỗi giống: bù thêm từ còn lại rồi chia đều 3 vòng.
      let ds = T.concat(A, O);
      NHOM.forEach(function (n) {
        ungVien.filter(function (t) { return t.nhom === n && ds.indexOf(t) < 0; }).forEach(function (t) { if (ds.length < 15) ds.push(t); });
      });
      vong = [ds.slice(0, 5), ds.slice(5, 10), ds.slice(10, 15)];
    }
    return (bo[so] = { vong: vong, tatCa: [].concat(vong[0], vong[1], vong[2]) });
  }

  // Tất cả từ từ màn 1 đến màn `so`.
  function tuDenMan(so) {
    let ds = [];
    for (let m = 1; m <= so; m++) ds = ds.concat(chonTuMan(m).tatCa);
    return ds;
  }

  PK.chonTuMan = chonTuMan;
  PK.tuDenMan = tuDenMan;
  PK.chonTu = { BAT_BUOC: BAT_BUOC };
})();
