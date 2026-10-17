// Khởi động game: đọc dữ liệu, màn hình chọn người chơi, màn hình chính của từng hồ sơ.
window.PK = window.PK || {};

(function () {
  const BA_NGAY = 3 * 24 * 60 * 60 * 1000;

  // Tên cảnh chợ cho từng màn.
  const TEN_MAN = {
    0: 'Cổng chợ', 1: 'Quầy trái cây', 2: 'Quầy bánh mì', 3: 'Quầy sữa và trứng',
    4: 'Lối đi trong chợ', 5: 'Quán cà phê nhỏ', 6: 'Quầy đồ chơi', 7: 'Quầy rau củ',
    8: 'Quầy quần áo', 9: 'Quầy cá', 10: 'Ghế đá trò chuyện', 11: 'Quầy đồ màu', 12: 'Cổng ra về'
  };

  let vung;

  function h() { return PK.ui.h.apply(null, arguments); }

  function chiSo(d) {
    const t = PK.luu.thongKe(d);
    return h('div', { class: 'chi-so' },
      h('span', null, '🚪 ' + t.manQua + ' màn'),
      h('span', null, '⭐ ' + t.sao + ' sao'),
      h('span', null, '📖 ' + t.tuThuoc + ' từ'),
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
    const soMan = PK.d.bi_kip.map(function (b) { return b.man; }).sort(function (a, b) { return a - b; });
    const xongMan0 = !!(d.man[0] && d.man[0].qua);

    vung.replaceChildren(
      h('div', { class: 'thanh-tren' },
        h('button', { class: 'nut-tron', 'aria-label': 'Đổi người chơi', onclick: chonHoSo }, '←'),
        h('h2', null, 'Chợ của ' + hs.ten),
        h('button', { class: 'nut-tron', 'aria-label': 'Cài đặt', onclick: caiDat }, '⚙️')),
      h('div', { class: 'dau-ho-so' }, h('img', { src: hs.anh, alt: '' }),
        h('div', null, h('h2', null, 'Xin chào, ' + hs.ten + '!'), chiSo(d))),
      xongMan0 ? null : PK.ui.loi('pes', 'Lần đầu đến chợ? Bắt đầu từ Màn 0 nhé, tụi mình hướng dẫn hết!'),
      h('div', { class: 'hang-nut' },
        h('button', { class: 'nut phu', onclick: function () { PK.biKip.manHinhSo(vung, hs, function () { nhaHoSo(hs); }); } }, '📜 Sổ bí kíp')),
      h('div', { class: 'danh-sach-man' }, soMan.map(function (so) {
        const m = d.man[so] || {};
        const mo = PK.luu.manDaMo(d, so);
        const bk = PK.biKipTheoMan.get(so);
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
            h('div', { class: 'nhat' }, so === 0 ? 'Hướng dẫn + ' + bk.ten : bk.ten)),
          m.qua ? h('span', { class: 'sao', 'aria-label': m.sao + ' sao' }, '★'.repeat(m.sao) + '☆'.repeat(3 - m.sao)) : null);
      })));
  }

  function moMan(hs, so) {
    if (so === 0) { PK.man0.chay(vung, hs, function () { nhaHoSo(hs); }); return; }
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
      h('p', { class: 'nhat' }, 'Sao lưu / khôi phục tiến độ sẽ có ở giai đoạn đóng gói.'),
      h('button', { class: 'nut rong', onclick: PK.ui.dongTam }, 'Xong')]);
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
