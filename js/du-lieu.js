// Đọc file data/tu-vung.json, kiểm tra cấu trúc, và lập "từ điển tra nhanh".
window.PK = window.PK || {};

(function () {
  const GIONG = ['TEN', 'TA', 'TO'];
  const PHIEN_AM_MAO_TU = { TEN: 'tên', TA: 'ta', TO: 'tô' };

  function laChuoi(x) { return typeof x === 'string'; }

  // Trả về danh sách lỗi (tiếng Việt). Rỗng = file đúng.
  function kiemTraCauTruc(d) {
    const loi = [];
    if (!d || typeof d !== 'object' || Array.isArray(d)) {
      return ['Cả file phải là một khối { … }.'];
    }
    ['danh_tu', 'cau', 'bi_kip'].forEach(function (k) {
      if (!Array.isArray(d[k])) loi.push('Thiếu phần "' + k + '" hoặc phần này không phải danh sách [ … ].');
    });
    if (loi.length) return loi;

    d.danh_tu.forEach(function (t, i) {
      const ten = 'danh_tu, mục số ' + (i + 1) + (t && t.tu ? ' (từ "' + t.tu + '")' : '');
      if (!t || typeof t !== 'object') { loi.push(ten + ': không phải một khối { … }.'); return; }
      if (!laChuoi(t.tu) || !t.tu.trim()) loi.push(ten + ': thiếu "tu" (chữ Séc).');
      if (GIONG.indexOf(t.giong) < 0) loi.push(ten + ': "giong" phải là TEN, TA hoặc TO (đang là "' + t.giong + '").');
      if (!laChuoi(t.nghia) || !t.nghia.trim()) loi.push(ten + ': thiếu "nghia".');
      if (t.phien_am !== undefined && !laChuoi(t.phien_am)) loi.push(ten + ': "phien_am" phải là chữ (có thể để rỗng "").');
    });

    d.cau.forEach(function (c, i) {
      const ten = 'cau, mục số ' + (i + 1) + (c && c.cz ? ' ("' + c.cz + '")' : '');
      if (!c || typeof c !== 'object') { loi.push(ten + ': không phải một khối { … }.'); return; }
      if (!laChuoi(c.cz) || !c.cz.trim()) loi.push(ten + ': thiếu "cz" (câu tiếng Séc).');
      if (!laChuoi(c.nghia) || !c.nghia.trim()) loi.push(ten + ': thiếu "nghia".');
      if (typeof c.man !== 'number') loi.push(ten + ': "man" phải là một con số (màn học lần đầu).');
    });

    d.bi_kip.forEach(function (b, i) {
      const ten = 'bi_kip, mục số ' + (i + 1) + (b && b.id ? ' (' + b.id + ')' : '');
      if (!b || typeof b !== 'object') { loi.push(ten + ': không phải một khối { … }.'); return; }
      if (!laChuoi(b.id)) loi.push(ten + ': thiếu "id" (ví dụ "BK3").');
      if (typeof b.man !== 'number') loi.push(ten + ': "man" phải là một con số.');
      if (!laChuoi(b.ten)) loi.push(ten + ': thiếu "ten".');
      if (!laChuoi(b.than_chu)) loi.push(ten + ': thiếu "than_chu".');
      if (!Array.isArray(b.cau_hoi_thuoc)) { loi.push(ten + ': thiếu "cau_hoi_thuoc" (danh sách câu hỏi).'); return; }
      b.cau_hoi_thuoc.forEach(function (q, j) {
        const tq = ten + ', câu hỏi số ' + (j + 1);
        if (!q || !laChuoi(q.hoi) || !Array.isArray(q.lua_chon)) { loi.push(tq + ': cần có "hoi" và "lua_chon".'); return; }
        const soLanDap = q.lua_chon.filter(function (x) { return x === q.dap; }).length;
        if (soLanDap !== 1) loi.push(tq + ': đáp án "' + q.dap + '" phải có đúng 1 lần trong "lua_chon".');
        if (new Set(q.lua_chon).size !== q.lua_chon.length) loi.push(tq + ': có lựa chọn bị trùng nhau.');
      });
    });
    return loi;
  }

  // Bỏ dấu câu ở hai đầu, viết thường: để so khớp chữ.
  function chuan(s) {
    return String(s).toLowerCase().replace(/[.,!?…:;"“”()]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // "já [ia]" → { cz: "já", phien_am: "ia" }
  function tachNgoac(s) {
    const m = String(s).match(/^(.*?)\s*\[([^\]]*)\]\s*$/);
    return m ? { cz: m[1].trim(), phien_am: m[2].trim() } : { cz: String(s).trim(), phien_am: '' };
  }

  // Lập bảng tra: chữ/cụm chữ (đã chuẩn hoá) → mục có nghĩa. Chỉ lấy từ dữ liệu có sẵn.
  function lapTuDien(d) {
    const tu = new Map();
    function them(khoa, muc) {
      const k = chuan(khoa);
      if (k && !tu.has(k)) tu.set(k, muc);
    }
    d.danh_tu.forEach(function (t) {
      them(t.tu, { loai: 'danh-tu', cz: t.tu, giong: t.giong, phien_am: t.phien_am || '', nghia: t.nghia, bay: !!t.bay, emoji: t.emoji || '' });
    });
    (d.mau_sac || []).forEach(function (m) {
      String(m.ten || '').split('/').forEach(function (dang) {
        them(dang.trim(), { loai: 'mau', cz: dang.trim(), phien_am: m.phien_am || '', nghia: m.nghia });
      });
    });
    (d.quoc_tich || []).forEach(function (q) {
      if (q.nam) { const a = tachNgoac(q.nam); them(a.cz, { loai: 'quoc-tich', cz: a.cz, phien_am: a.phien_am, nghia: 'người ' + q.nuoc + ' (nam)' }); }
      if (q.nu) { const a = tachNgoac(q.nu); them(a.cz, { loai: 'quoc-tich', cz: a.cz, phien_am: a.phien_am, nghia: 'người ' + q.nuoc + ' (nữ)' }); }
      if (q.tu_nuoc) { const a = tachNgoac(q.tu_nuoc); them(a.cz, { loai: 'cum', cz: a.cz, phien_am: a.phien_am, nghia: 'từ ' + q.nuoc }); }
    });
    (d.noi_chon_cum || []).forEach(function (n) {
      them(n.cz, { loai: 'cum', cz: n.cz, phien_am: n.phien_am || '', nghia: n.nghia });
    });
    (d.nghe_nghiep_cap || []).forEach(function (p) {
      if (!Array.isArray(p)) return;
      const pa = String(p[2] || '').split('/');
      them(p[0], { loai: 'nghe', cz: p[0], phien_am: (pa[0] || '').trim(), nghia: p[3] + ' (nam)' });
      them(p[1], { loai: 'nghe', cz: p[1], phien_am: (pa[1] || '').trim(), nghia: p[3] + ' (nữ)' });
    });
    // Bảng áo "là" trong bí kíp: dòng dạng "já (tôi) → jsem [sêm]".
    d.bi_kip.forEach(function (b) {
      (b.chi_tiet || []).forEach(function (dong) {
        const m = String(dong).match(/^(.+?)\s*(?:\(([^)]+)\))?\s*→\s*(\S+)\s*\[([^\]]+)\]/);
        if (!m || /^-|·/.test(m[1])) return;
        const daiTu = m[1].trim();
        if (m[2]) them(daiTu, { loai: 'dai-tu', cz: daiTu, phien_am: '', nghia: m[2].trim() });
        them(m[3], { loai: 'la', cz: m[3], phien_am: m[4], nghia: 'là (dùng với ' + daiTu + ')' });
      });
    });
    return tu;
  }

  async function tai() {
    let van;
    try {
      const r = await fetch('data/tu-vung.json', { cache: 'no-cache' });
      if (!r.ok) throw new Error('mã ' + r.status);
      van = await r.text();
    } catch (e) {
      return { loi: ['Không mở được file data/tu-vung.json (' + e.message + '). Kiểm tra file có nằm đúng trong thư mục data không.'] };
    }
    let d;
    try {
      d = JSON.parse(van);
    } catch (e) {
      const m = String(e.message).match(/position (\d+)/);
      let cho = '';
      if (m) {
        const vt = +m[1];
        const dong = van.slice(0, vt).split('\n').length;
        cho = ' Lỗi ở khoảng dòng ' + dong + ': "' + van.split('\n')[dong - 1].trim().slice(0, 60) + '".';
      }
      return { loi: ['File tu-vung.json viết sai dấu (thường do thiếu dấu phẩy, thừa dấu phẩy cuối, hoặc thiếu ngoặc kép).' + cho] };
    }
    const loi = kiemTraCauTruc(d);
    if (loi.length) return { loi: loi };

    PK.d = d;
    PK.tuDien = lapTuDien(d);
    PK.cauTheoChu = new Map(d.cau.map(function (c) { return [chuan(c.cz), c]; }));
    PK.biKipTheoMan = new Map(d.bi_kip.map(function (b) { return [b.man, b]; }));
    return { d: d };
  }

  // Thêm một câu ghép từ mẫu (ví dụ "To je kniha.") để chạm vào là xem được nghĩa.
  // Câu đã có trong dữ liệu thì giữ nguyên bản gốc.
  function dangKyCau(cz, phienAm, nghia) {
    const k = chuan(cz);
    if (!PK.cauTheoChu.has(k)) PK.cauTheoChu.set(k, { cz: cz, phien_am: phienAm || '', nghia: nghia });
    return PK.cauTheoChu.get(k);
  }

  PK.duLieu = { dangKyCau: dangKyCau, tai: tai, chuan: chuan, tachNgoac: tachNgoac, kiemTraCauTruc: kiemTraCauTruc, PHIEN_AM_MAO_TU: PHIEN_AM_MAO_TU };
})();
