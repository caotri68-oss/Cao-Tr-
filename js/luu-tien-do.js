// Lưu tiến độ riêng cho từng hồ sơ trong bộ nhớ của máy (localStorage).
window.PK = window.PK || {};

(function () {
  const TIEN_TO = 'pk.hoso.';
  const KHOA_CAI_DAT = 'pk.caidat';
  const boNhoTam = {}; // dùng khi máy chặn localStorage (ví dụ chế độ ẩn danh)

  PK.HO_SO = [
    { id: 'bo', ten: 'Bố', gioi: 'nam', anh: 'img/bo.svg' },
    { id: 'me', ten: 'Mẹ', gioi: 'nu', anh: 'img/me.svg' },
    { id: 'xuxu', ten: 'Xu Xu', gioi: 'nu', anh: 'img/xuxu.svg' },
    { id: 'winwin', ten: 'Win Win', gioi: 'nu', anh: 'img/winwin.svg' }
  ];

  function docKhoa(khoa) {
    try {
      const v = localStorage.getItem(khoa);
      if (v !== null) return JSON.parse(v);
    } catch (e) { /* bỏ qua, dùng bộ nhớ tạm */ }
    return boNhoTam[khoa] !== undefined ? JSON.parse(boNhoTam[khoa]) : null;
  }
  function ghiKhoa(khoa, giaTri) {
    const s = JSON.stringify(giaTri);
    boNhoTam[khoa] = s;
    try { localStorage.setItem(khoa, s); } catch (e) { /* máy không cho lưu: vẫn chơi được trong lượt này */ }
  }

  function moi() {
    return {
      v: 1,
      man: {},      // "0": { qua, sao, diemCao, lanThu }
      biKip: {},    // "BK0": { mo, thuoc, diem, ngayMo }
      tu: {},       // dành cho giai đoạn sau (hộp nhớ)
      cau: {},
      buoc: {},     // bước đang dở của từng màn: "0": 3
      phut: {},     // "2026-10-17": số phút chơi
      lanCuoi: 0
    };
  }

  function doc(id) {
    const d = docKhoa(TIEN_TO + id);
    if (!d || typeof d !== 'object') return moi();
    return Object.assign(moi(), d);
  }
  function ghi(id, d) { ghiKhoa(TIEN_TO + id, d); }
  function capNhat(id, sua) { const d = doc(id); sua(d); ghi(id, d); return d; }

  function thongKe(d) {
    const man = Object.values(d.man);
    return {
      manQua: man.filter(function (m) { return m.qua; }).length,
      sao: man.reduce(function (s, m) { return s + (m.sao || 0); }, 0),
      tuDaHoc: Object.values(d.tu).filter(function (t) { return t.hoc; }).length,
      biKipMo: Object.keys(d.biKip).filter(function (k) { return k !== 'BK13' && d.biKip[k].mo; }).length
    };
  }

  // Ghi nhận trả lời đúng / sai cho một từ (dùng để chọn câu hỏi ôn và trang tiến độ).
  function ghiTu(id, tu, dung) {
    capNhat(id, function (d) {
      const t = d.tu[tu] = Object.assign({ dung: 0, sai: 0 }, d.tu[tu] || {});
      if (dung) t.dung++; else t.sai++;
    });
  }
  // Đánh dấu từ đã học (đã nhìn, đọc to, tô sao). Hộp nhớ 1, hạn ôn sau 1 ngày; giai đoạn ôn lại sẽ dùng.
  function danhDauHoc(id, tu) {
    capNhat(id, function (d) {
      const t = d.tu[tu] = Object.assign({ dung: 0, sai: 0 }, d.tu[tu] || {});
      if (!t.hoc) { t.hoc = true; t.hop = 1; t.han = Date.now() + 24 * 3600 * 1000; }
    });
  }

  function manDaMo(d, so) { return so === 0 || !!(d.man[so - 1] && d.man[so - 1].qua); }

  function caiDat() { return Object.assign({ amThanh: true }, docKhoa(KHOA_CAI_DAT) || {}); }
  function ghiCaiDat(c) { ghiKhoa(KHOA_CAI_DAT, c); }

  function homNay() {
    const n = new Date();
    return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
  }

  // Đếm phút chơi: cứ 15 giây đang mở game thì cộng 0,25 phút cho hồ sơ đang chơi.
  setInterval(function () {
    if (!PK.hoSoDangChoi || document.hidden) return;
    capNhat(PK.hoSoDangChoi.id, function (d) {
      const n = homNay();
      d.phut[n] = Math.round(((d.phut[n] || 0) + 0.25) * 100) / 100;
      d.lanCuoi = Date.now();
    });
  }, 15000);

  PK.luu = { doc: doc, ghi: ghi, capNhat: capNhat, ghiTu: ghiTu, danhDauHoc: danhDauHoc, thongKe: thongKe, manDaMo: manDaMo, caiDat: caiDat, ghiCaiDat: ghiCaiDat };
})();
