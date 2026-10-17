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
      tu: {},       // "kočka": { dung, sai, hoc, hop 1–5, han (mốc giờ đến hạn ôn), thuocLau }
      cau: {},      // câu đã gặp, cùng cách lưu như từ
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

  // ---------- Hộp nhớ (ôn lại ngắt quãng) ----------
  // 5 hộp. Thời gian chờ trước lần ôn tiếp: hộp 1 = 1 ngày, 2 = 3 ngày, 3 = 7 ngày, 4 = 14 ngày, 5 = 30 ngày.
  // Đúng thì lên một hộp, sai thì về hộp 1. Đúng khi đang ở hộp 5 thì "Đã thuộc lâu".
  const NGAY = 24 * 3600 * 1000;
  const CHO = [1, 3, 7, 14, 30];
  const KHO = { tu: 'tu', cau: 'cau' }; // loại → chỗ lưu trong hồ sơ (bí kíp lưu trong d.biKip)

  function vaoHop(m, hop, bayGio) {
    m.hop = hop;
    m.han = bayGio + CHO[hop - 1] * NGAY;
  }
  // Ghi một lần trả lời vào hộp nhớ của mục m.
  // Đúng: chỉ lên hộp khi mục đã đến hạn (trả lời đúng nhiều lần trong một buổi không nhảy hộp liền).
  // Sai: luôn về hộp 1.
  function capNhatHop(m, dung, bayGio) {
    if (!m.hop) return;
    if (!dung) { m.thuocLau = false; vaoHop(m, 1, bayGio); return; }
    if ((m.han || 0) > bayGio) return;
    if (m.hop >= 5) { m.thuocLau = true; vaoHop(m, 5, bayGio); return; }
    vaoHop(m, m.hop + 1, bayGio);
  }
  function denHan(m, bayGio) { return !!(m && m.hop && (m.han || 0) <= (bayGio || Date.now())); }

  function mucCua(d, loai, khoa) {
    if (loai === 'biKip') return d.biKip[khoa] = Object.assign({ mo: true }, d.biKip[khoa] || {});
    const kho = d[KHO[loai]];
    return kho[khoa] = Object.assign({ dung: 0, sai: 0 }, kho[khoa] || {});
  }

  // Ghi nhận trả lời đúng / sai cho một từ (dùng cho hộp nhớ, câu hỏi ôn và trang tiến độ).
  function ghiTu(id, tu, dung) { ghiMuc(id, 'tu', tu, dung); }
  function ghiMuc(id, loai, khoa, dung) {
    capNhat(id, function (d) {
      const m = mucCua(d, loai, khoa);
      if (loai !== 'biKip') { if (dung) m.dung++; else m.sai++; }
      capNhatHop(m, dung, Date.now());
    });
  }
  // Đánh dấu đã học (từ: nhìn, đọc to, tô sao; câu: đã gặp trong hội thoại). Vào hộp 1, ôn lại sau 1 ngày.
  function danhDauHoc(id, tu) { danhDauMuc(id, 'tu', tu); }
  function danhDauMuc(id, loai, khoa) {
    capNhat(id, function (d) {
      const m = mucCua(d, loai, khoa);
      if (loai !== 'biKip') m.hoc = true;
      if (!m.hop) vaoHop(m, 1, Date.now());
    });
  }

  // Danh sách mục đến hạn ôn: [{ loai, khoa, han, sai }], hạn cũ nhất trước.
  function denHanOn(d, bayGio) {
    bayGio = bayGio || Date.now();
    const kq = [];
    Object.keys(d.tu).forEach(function (k) { const m = d.tu[k]; if (m.hoc && denHan(m, bayGio)) kq.push({ loai: 'tu', khoa: k, han: m.han, sai: m.sai || 0 }); });
    Object.keys(d.cau).forEach(function (k) { const m = d.cau[k]; if (m.hoc && denHan(m, bayGio)) kq.push({ loai: 'cau', khoa: k, han: m.han, sai: m.sai || 0 }); });
    Object.keys(d.biKip).forEach(function (k) { const m = d.biKip[k]; if (k !== 'BK13' && m.thuoc && denHan(m, bayGio)) kq.push({ loai: 'biKip', khoa: k, han: m.han, sai: 0 }); });
    return kq.sort(function (a, b) { return a.han - b.han || b.sai - a.sai; });
  }
  // Lần đến hạn gần nhất sắp tới (khi hôm nay chưa có gì để ôn).
  function hanTiepTheo(d) {
    let min = Infinity;
    [d.tu, d.cau].forEach(function (kho) { Object.values(kho).forEach(function (m) { if (m.hoc && m.hop && m.han < min) min = m.han; }); });
    return min === Infinity ? null : min;
  }
  // Đếm theo hộp nhớ: đã học, đang ôn (chưa thuộc lâu), đã thuộc lâu.
  function demHop(kho) {
    const ds = Object.values(kho).filter(function (m) { return m.hoc; });
    const lau = ds.filter(function (m) { return m.thuocLau; }).length;
    return { daHoc: ds.length, dangOn: ds.length - lau, thuocLau: lau };
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

  PK.luu = { doc: doc, ghi: ghi, capNhat: capNhat, ghiTu: ghiTu, danhDauHoc: danhDauHoc, ghiMuc: ghiMuc, danhDauMuc: danhDauMuc,
    denHan: denHan, denHanOn: denHanOn, hanTiepTheo: hanTiepTheo, demHop: demHop, homNay: homNay, CHO: CHO, capNhatHop: capNhatHop,
    thongKe: thongKe, manDaMo: manDaMo, caiDat: caiDat, ghiCaiDat: ghiCaiDat };
})();
