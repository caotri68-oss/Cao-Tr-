// Khởi động game: đọc dữ liệu, màn hình chọn người chơi, màn hình chính của từng hồ sơ.
window.PK = window.PK || {};

(function () {
  const BA_NGAY = 3 * 24 * 60 * 60 * 1000;

  // Tên cảnh chợ cho từng màn.
  const TEN_MAN = {
    0: 'Cổng chợ', 13: 'Chợ lớn · Tổng hợp', 1: 'Quầy đầu chợ', 2: 'Quầy bánh mì', 3: 'Quầy sữa và trứng',
    4: 'Lối đi trong chợ', 5: 'Quán cà phê nhỏ', 6: 'Quầy đồ chơi', 7: 'Quầy rau củ',
    8: 'Quầy quần áo', 9: 'Quầy cá', 10: 'Ghế đá trò chuyện', 11: 'Quầy đồ màu', 12: 'Cổng ra về'
  };

  PK.TEN_MAN = TEN_MAN;

  let vung;

  function h() { return PK.ui.h.apply(null, arguments); }

  function chiSo(d) {
    const t = PK.luu.thongKe(d);
    return h('div', { class: 'chi-so' },
      h('span', null, '🚪 ' + t.manQua + ' màn'),
      h('span', null, '⭐ ' + t.sao + ' sao'),
      h('span', null, '📖 ' + t.tuDaHoc + ' từ'),
      h('span', null, '📜 ' + t.biKipMo + ' bí kíp'));
  }

  // ---------- Chọn người chơi ----------
  function chonHoSo() {
    PK.hoSoDangChoi = null;
    vung.replaceChildren(
      h('header', { class: 'tieu-de-game' },
        h('div', { class: 'doi-ban' }, h('img', { src: 'img/pes.svg', alt: 'Chú chó Pes' }), h('img', { src: 'img/kocka.svg', alt: 'Cô mèo Kočka' })),
        h('h1', null, 'Đi chợ cùng Pes a Kočka'),
        h('p', { class: 'nhat' }, 'Học tiếng Séc vỡ lòng cho cả nhà. Ai đang chơi?')),
      h('div', { class: 'luoi-ho-so' }, PK.HO_SO.map(function (hs) {
        const d = PK.luu.doc(hs.id);
        return h('button', { class: 'ho-so', onclick: function () { PK.am.nhac('cham'); vaoHoSo(hs); } },
          h('img', { src: hs.anh, alt: '' }),
          h('span', { class: 'ten-ho-so' }, hs.ten),
          chiSo(d));
      })),
      h('button', { class: 'nut phu rong', onclick: caiDat }, '⚙️ Cài đặt'));
  }

  // ---------- Vào hồ sơ ----------
  function vaoHoSo(hs) {
    const d = PK.luu.doc(hs.id);
    const lanCuoi = d.lanCuoi;
    PK.hoSoDangChoi = hs;
    PK.luu.capNhat(hs.id, function (x) { x.lanCuoi = Date.now(); });
    nhaHoSo(hs);
    // Lâu không vào (hơn 3 ngày): nhắc nhanh câu thần chú của bí kíp gần nhất.
    if (lanCuoi && Date.now() - lanCuoi > BA_NGAY) {
      const moi = PK.d.bi_kip.filter(function (b) { return (d.biKip[b.id] || {}).mo; }).sort(function (a, b) { return b.man - a.man; })[0];
      if (moi) {
        PK.ui.moTam([
          PK.ui.loi('pes', ['Lâu rồi không gặp, ', h('b', null, hs.ten), '! Nhắc nhanh bí kíp gần nhất nhé:']),
          h('div', { class: 'bi-kip' }, h('div', { class: 'nhan-bk' }, moi.ten), h('div', { class: 'than-chu' }, moi.than_chu)),
          h('button', { class: 'nut rong', onclick: PK.ui.dongTam }, 'Nhớ rồi!')]);
      }
    }
  }

  function nhaHoSo(hs) {
    const d = PK.luu.doc(hs.id);
    const soMan = PK.d.bi_kip.map(function (b) { return b.man; }).sort(function (a, b) { return a - b; }).concat([PK.manChoi.MAN_TONG_HOP]);
    const xongMan0 = !!(d.man[0] && d.man[0].qua);

    vung.replaceChildren(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut-tron', 'aria-label': 'Đổi người chơi', onclick: chonHoSo }, '←'),
        h('h2', null, 'Chợ của ' + hs.ten),
        h('button', { class: 'nut-tron', 'aria-label': 'Cài đặt', onclick: caiDat }, '⚙️')),
      h('div', { class: 'dau-ho-so' }, h('img', { src: hs.anh, alt: '' }),
        h('div', null, h('h2', null, 'Xin chào, ' + hs.ten + '!'), chiSo(d))),
      xongMan0 ? '' : PK.ui.loi('pes', 'Lần đầu đến chợ? Bắt đầu từ Màn 0 nhé, tụi mình hướng dẫn hết!'),
      h('div', { class: 'hang-nut' },
        h('button', { class: 'nut phu', onclick: function () { PK.biKip.manHinhSo(vung, hs, function () { nhaHoSo(hs); }); } }, '📜 Sổ bí kíp'),
        h('button', { class: 'nut phu', onclick: function () { meoDoc(hs); } }, '🔤 Mẹo đọc chữ Séc'),
        h('button', { class: 'nut phu', onclick: function () { PK.huyHieu.bang(hs); } }, '🏅 Huy hiệu')),
      h('div', { class: 'danh-sach-man' }, soMan.map(function (so) {
        const m = d.man[so] || {};
        const mo = PK.luu.manDaMo(d, so);
        const bk = PK.biKipTheoMan.get(so);
        const tomTat = so === 0 ? 'Hướng dẫn + ' + bk.ten : so === PK.manChoi.MAN_TONG_HOP ? 'Ôn lại mọi bí kíp, không có từ mới' : bk.ten;
        return h('button', {
          class: 'o-man' + (mo ? '' : ' khoa') + (m.qua ? ' xong' : ''),
          'aria-disabled': mo ? null : 'true',
          onclick: function () {
            if (!mo) { PK.ui.thongBao('🔒 Qua Cửa ải màn ' + (so - 1) + ' thì mở màn này.'); return; }
            moMan(hs, so);
          }
        },
          h('span', { class: 'so' }, mo ? String(so) : '🔒'),
          h('span', { class: 'noi-dung' },
            h('b', null, 'Màn ' + so + ' · ' + (TEN_MAN[so] || 'Màn tổng hợp')),
            h('div', { class: 'nhat' }, tomTat + (so === 0 || PK.manChoi.daLam(so) ? '' : ' · 🛠 sắp có'))),
          m.qua ? h('span', { class: 'sao', 'aria-label': m.sao + ' sao' }, '★'.repeat(m.sao) + '☆'.repeat(3 - m.sao)) : null);
      })));
  }

  // ---------- Mẹo đọc chữ Séc ----------
  function meoDoc(hs) {
    const meo = PK.d.meo_phat_am || [];
    vung.replaceChildren(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut-tron', 'aria-label': 'Quay lại', onclick: function () { nhaHoSo(hs); } }, '←'),
        h('h2', null, '🔤 Mẹo đọc chữ Séc')),
      PK.ui.loi('kocka', 'Tiếng Séc viết sao đọc vậy. Thuộc mấy mẹo này là đọc được mọi từ! Chạm 🔊 để nghe, chạm chữ để xem nghĩa.', true),
      h('div', { style: 'display:flex;flex-direction:column;gap:12px' }, meo.map(function (m, i) {
        return h('div', { class: 'the' },
          h('div', { class: 'nhan-bk', style: 'color:var(--chu-nhat);font-weight:800' }, 'Mẹo ' + (i + 1)),
          h('div', { style: 'font-size:1.1rem' }, PK.ui.dongCoChuSec(m)),
          h('div', { class: 'vi-du' }, mauNghe(m)));
      })));
  }
  // Các chữ dạng "chữ [phiên âm]" trong một mẹo → nút nghe từng chữ.
  function mauNghe(m) {
    const kq = [];
    const re = /([\p{L}]+)\s\[([^\]]+)\]/gu;
    let x;
    while ((x = re.exec(m))) {
      (function (chu, pa) {
        kq.push(h('span', { class: 'nut-nghe' },
          h('button', { class: 'nut-tron', style: 'width:36px;height:36px;font-size:1rem', 'aria-label': 'Nghe ' + chu, onclick: function () { PK.am.noi(chu); } }, '🔊'),
          PK.ui.cz(chu), h('span', { class: 'phien-am' }, ' [' + pa + ']')));
      })(x[1], x[2]);
    }
    return kq;
  }

  function moMan(hs, so) {
    if (so === 0) { PK.man0.chay(vung, hs, function () { nhaHoSo(hs); }); return; }
    if (PK.manChoi.daLam(so)) { PK.manChoi.chay(vung, hs, so, function () { nhaHoSo(hs); }); return; }
    PK.ui.moTam([
      PK.ui.loi('kocka', 'Màn ' + so + ' đã mở khóa! Nội dung màn này sẽ có ở giai đoạn tiếp theo. Bạn quay lại sau nhé.'),
      h('button', { class: 'nut rong', onclick: PK.ui.dongTam }, 'Đã hiểu')]);
  }

  // ---------- Cài đặt ----------
  function caiDat() {
    const c = PK.luu.caiDat();
    const nutAm = h('button', { class: 'nut phu rong', onclick: function () {
      c.amThanh = !c.amThanh; PK.luu.ghiCaiDat(c);
      nutAm.textContent = c.amThanh ? '🔔 Tiếng hiệu ứng: đang bật' : '🔕 Tiếng hiệu ứng: đang tắt';
      if (c.amThanh) PK.am.nhac('dung');
    } }, c.amThanh ? '🔔 Tiếng hiệu ứng: đang bật' : '🔕 Tiếng hiệu ứng: đang tắt');
    PK.ui.moTam([
      h('h3', null, '⚙️ Cài đặt'),
      nutAm,
      h('button', { class: 'nut phu rong', onclick: function () {
        PK.am.noi('Dobrý den.');
        setTimeout(function () { if (!PK.am.coGiongSec()) PK.ui.huongDanGiong(); else PK.ui.thongBao('✅ Máy có giọng tiếng Séc.'); }, 700);
      } }, '🔊 Nghe thử giọng Séc'),
      h('button', { class: 'nut phu rong', onclick: kiemTraAmThanh }, '🔎 Kiểm tra âm thanh'),
      h('p', { class: 'nhat' }, 'Sao lưu / khôi phục tiến độ sẽ có ở giai đoạn đóng gói.'),
      h('button', { class: 'nut rong', onclick: PK.ui.dongTam }, 'Xong')]);
  }

  // ---------- Kiểm tra âm thanh ----------
  function kiemTraAmThanh() {
    const t = PK.am.chanDoan();
    const dong = function (ok, chu) { return h('p', null, (ok ? '✅ ' : '❌ ') + chu); };
    let ketLuan;
    if (!t.hoTro) ketLuan = 'Trình duyệt này không có tính năng đọc thành tiếng. Hãy mở link bằng Chrome.';
    else if (t.soGiong === 0) ketLuan = 'Trình duyệt chưa tìm thấy giọng đọc nào. Mở Cài đặt máy → Chuyển văn bản thành giọng nói, chọn công cụ Google và tải giọng Čeština, rồi mở lại game.';
    else if (!t.giongSec) ketLuan = 'Máy có giọng đọc nhưng chưa có tiếng Séc. Cài giọng Čeština rồi mở lại game (hướng dẫn trong nút bên dưới).';
    else ketLuan = 'Máy có giọng tiếng Séc. Bấm "Nghe thử" để kiểm tra. Nếu vẫn im lặng, tăng âm lượng media và tắt chế độ im lặng của điện thoại.';
    PK.ui.moTam([
      h('h3', null, '🔎 Kiểm tra âm thanh'),
      dong(t.hoTro, 'Trình duyệt hỗ trợ đọc thành tiếng'),
      dong(t.soGiong > 0, 'Số giọng đọc tìm thấy: ' + t.soGiong),
      dong(!!t.giongSec, t.giongSec ? 'Giọng tiếng Séc: ' + t.giongSec : 'Chưa có giọng tiếng Séc'),
      dong(t.mic, 'Micro: ' + (t.mic ? 'trình duyệt có hỗ trợ' : 'không hỗ trợ')),
      t.trongKhung ? h('p', { class: 'nhat' }, 'ℹ️ Game đang mở trong trang xem thử, nên micro có thể bị chặn. Khi đưa lên địa chỉ riêng thì dùng được.') : null,
      h('p', null, h('b', null, ketLuan)),
      h('div', { class: 'hang-nut' },
        h('button', { class: 'nut', onclick: function () { PK.am.noi('Dobrý den.'); } }, '🔊 Nghe thử'),
        h('button', { class: 'nut phu', onclick: PK.ui.huongDanGiong }, 'Cách cài giọng Séc')),
      h('button', { class: 'nut phu rong', onclick: PK.ui.dongTam }, 'Đóng')
    ]);
  }

  // ---------- Khởi động ----------
  async function khoiDong() {
    vung = document.getElementById('app');
    vung.replaceChildren(h('p', { class: 'nhat', style: 'text-align:center' }, 'Đang mở chợ…'));
    const kq = await PK.duLieu.tai();
    if (kq.loi) {
      vung.replaceChildren(
        h('div', { class: 'the loi-du-lieu' },
          h('h2', null, '😿 File từ vựng có lỗi'),
          h('p', null, 'Game chưa mở được vì file data/tu-vung.json có chỗ sai. Sửa các chỗ dưới đây rồi mở lại game:'),
          h('ul', null, kq.loi.slice(0, 30).map(function (l) { return h('li', null, l); })),
          kq.loi.length > 30 ? h('p', { class: 'nhat' }, '… và ' + (kq.loi.length - 30) + ' lỗi khác.') : null));
      return;
    }
    chonHoSo();
  }

  PK.app = { chonHoSo: chonHoSo };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', khoiDong); else khoiDong();
})();
