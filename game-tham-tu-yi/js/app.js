// Khởi động game: tải dữ liệu, chọn hồ sơ, bản đồ chợ Chữ.
import { h, manHinh } from './dom.js';
import { D, taiDuLieu, tenPho } from './du-lieu.js';
import { HO_SO, docHoSo, chonHoSo, hoSo, doiTen, thongKe, caiDat, luuCaiDat, ghiLanChoi, anhHoSo, luuAnhHoSo } from './luu-tien-do.js';
import { coGiongSec, daBietGiong, huongDanCaiGiong, doc } from './am-thanh.js';
import { hinh, hinhHoSo, cuNoi } from './nhan-vat.js';
import { vaoVanPhong } from './van-phong.js';
import { vaoPho, PHO } from './pho.js';
import { trangSoBiKip, theBiKip } from './so-bi-kip.js';
import { hangSao } from './chung.js';

async function batDau() {
  const loi = await taiDuLieu();
  if (loi.length) {
    manHinh(
      h('h1', {}, 'Thám tử Y/I'),
      h('div', { class: 'loi-du-lieu' },
        h('h3', {}, 'File dữ liệu có chỗ chưa đúng'),
        h('p', {}, 'Game chưa mở được vì:'),
        h('ul', {}, loi.map((l) => h('li', {}, l))),
        h('p', { class: 'goi-y' }, 'Sửa xong chỗ trên rồi tải lại trang. Chạy "node kiem-tra-du-lieu.cjs" để kiểm tra kỹ hơn.')));
    return;
  }
  chonNguoiChoi();
}

// ——— Màn chọn người chơi ———
function chonNguoiChoi() {
  const the = HO_SO.map((g) => {
    const hs = docHoSo(g.id);
    const tk = thongKe(hs);
    return h('button', { class: 'the-ho-so' + (g.chinh ? ' chinh' : ''), type: 'button', onclick: () => vaoGame(g.id) },
      hinhHoSo(g.id, 'hinh-hs'),
      g.chinh ? h('span', { class: 'nhan' }, 'Nhân vật chính') : null,
      h('span', { class: 'ten-hs' }, hs.ten),
      h('span', { class: 'so-lieu' }, `${tk.phoQua} phố · ${tk.sao}★ · ${tk.tuDaHoc} từ · ${tk.biKip} bí kíp`));
  });
  manHinh(
    h('div', { class: 'de-bai', style: 'padding-top:8px' },
      hinh('cu', 'hinh-to'),
      h('h1', {}, 'Thám tử ', h('span', { class: 'y-do' }, 'Y'), '/', h('span', { class: 'i-xanh' }, 'I')),
      h('p', { class: 'goi-y' }, 'Trả chữ Y về cho chợ Chữ. Ai đang chơi?')),
    h('div', { class: 'luoi-ho-so' }, the),
    h('button', { class: 'nut nut-nho', type: 'button', onclick: trangDoiTen }, '✏️ Đổi tên hồ sơ'));
}

// Cắt ảnh thành hình vuông ở giữa, thu về 200px, lưu dạng JPEG nhỏ.
async function anhThanhHinhTron(file) {
  const url = URL.createObjectURL(file);
  try {
    const anh = await new Promise((ok, loi) => { const i = new Image(); i.onload = () => ok(i); i.onerror = loi; i.src = url; });
    const co = Math.min(anh.width, anh.height);
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 200;
    canvas.getContext('2d').drawImage(anh, (anh.width - co) / 2, (anh.height - co) / 2, co, co, 0, 0, 200, 200);
    return canvas.toDataURL('image/jpeg', 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function trangDoiTen() {
  manHinh(
    h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Quay lại', onclick: chonNguoiChoi }, '←'),
      h('div', { class: 'tieu-de' }, 'Đổi tên hồ sơ')),
    ...HO_SO.map((g) => {
      const o = h('input', { type: 'text', id: 'ten-' + g.id, value: docHoSo(g.id).ten, maxlength: '20' });
      const chonAnh = h('input', { type: 'file', accept: 'image/*', hidden: true, onchange: async (e) => {
        const f = e.target.files[0];
        if (!f) return;
        try {
          if (!luuAnhHoSo(g.id, await anhThanhHinhTron(f))) toast('Máy không lưu được ảnh này. Thử ảnh khác hoặc xóa bớt dữ liệu trình duyệt.');
          else trangDoiTen();
        } catch { toast('Không đọc được ảnh này. Thử ảnh khác.'); }
      } });
      return h('div', { class: 'the' },
        h('label', { for: 'ten-' + g.id, class: 'an-hien' }, hinhHoSo(g.id, 'hinh'), 'Hồ sơ ' + g.ten),
        o,
        h('div', { class: 'hang-nut' },
          h('button', { class: 'nut nut-nho', type: 'button', onclick: () => { if (o.value.trim()) { doiTen(g.id, o.value.trim()); chonNguoiChoi(); } } }, 'Lưu tên'),
          h('button', { class: 'nut nut-nho', type: 'button', onclick: () => chonAnh.click() }, '🖼️ Chọn ảnh'),
          anhHoSo(g.id) ? h('button', { class: 'nut nut-nho', type: 'button', onclick: () => { luuAnhHoSo(g.id, null); trangDoiTen(); } }, 'Dùng hình vẽ') : null),
        h('p', { class: 'goi-y' }, 'Ảnh chỉ lưu trên máy này, không gửi đi đâu.'),
        chonAnh);
    }));
}

function vaoGame(id) {
  chonHoSo(id);
  const soNgay = ghiLanChoi();
  const hs = hoSo();
  const daMo = D.bi_kip.filter((b) => hs.biKip[b.ma]);
  if (soNgay > 3 && daMo.length) {
    const moiNhat = daMo[daMo.length - 1];
    manHinh(
      cuNoi(h('b', {}, `Lâu lắm rồi (${soNgay} ngày) mới gặp lại ${hs.ten}!`), h('span', {}, 'Nhắc nhanh câu nhớ: Bố Fi Lên Mây Phóng Sao Vào Zũ trụ. Và bí kíp gần nhất:')),
      theBiKip(moiNhat),
      h('button', { class: 'nut nut-chinh nut-rong', type: 'button', onclick: banDo }, 'Mình nhớ rồi ▸'));
    return;
  }
  banDo();
}

// ——— Bản đồ chợ Chữ ———
function banDo() {
  const hs = hoSo();
  const tram = [];
  const quaVanPhong = hs.man0.phong >= 3;
  tram.push(h('button', { class: 'tram ' + (quaVanPhong ? 'da-qua' : 'dang-mo'), type: 'button', onclick: () => vaoVanPhong(banDo) },
    h('span', { class: 'huy-hieu' }, quaVanPhong ? '✓' : '0'),
    h('span', { class: 'noi-dung' },
      h('b', {}, 'Văn phòng thám tử'),
      h('span', {}, quaVanPhong ? 'Đã qua 3 phòng luật' : `Phòng ${hs.man0.phong + 1}/3 · học luật trước khi phá án`))));

  let truocDaQua = quaVanPhong;
  for (const n of D.nhom) {
    const tt = hs.pho[n.chu];
    const cfg = PHO[n.chu];
    const moKhoa = truocDaQua && cfg.daLam;
    const qua = tt?.qua;
    let moTa;
    if (!cfg.daLam) moTa = 'Đang xây (giai đoạn 3)';
    else if (!truocDaQua) moTa = 'Qua trạm trước để mở';
    else if (qua) moTa = `${n.tu.length} từ · đã trả chữ Y`;
    else moTa = `${n.tu.length} từ` + (tt && tt.buoc ? ' · đang chơi dở' : ' · sẵn sàng');
    tram.push(h('button', {
      class: 'tram ' + (qua ? 'da-qua' : moKhoa ? 'dang-mo' : 'bi-khoa'), type: 'button',
      disabled: moKhoa ? null : true, onclick: moKhoa ? () => vaoPho(n.chu, banDo) : null,
    },
    h('span', { class: 'huy-hieu' }, moKhoa || qua ? n.chu : '🔒'),
    h('span', { class: 'noi-dung' }, h('b', {}, `${n.emoji} Phố ${tenPho(n)}`), h('span', {}, moTa)),
    qua ? hangSao(tt.sao) : null));
    truocDaQua = !!qua;
  }
  tram.push(h('div', { class: 'tram bi-khoa' },
    h('span', { class: 'huy-hieu' }, '★'),
    h('span', { class: 'noi-dung' }, h('b', {}, 'Trùm cuối'), h('span', {}, 'Mở khi qua cả 7 phố'))));

  manHinh(
    h('div', { class: 'thanh-tren' },
      hinhHoSo(hs.id, 'hinh-nho'),
      h('div', { class: 'tieu-de' }, hs.ten, h('small', {}, 'Bản đồ chợ Chữ')),
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Cài đặt', onclick: trangCaiDat }, '⚙️')),
    daBietGiong() && !coGiongSec() ? h('button', { class: 'nut nut-nho', type: 'button', onclick: huongDanCaiGiong }, '🔇 Máy chưa có giọng Séc · xem cách cài') : null,
    h('div', { class: 'ban-do' }, tram),
    h('div', { class: 'hang-nut' },
      h('button', { class: 'nut', type: 'button', onclick: () => trangSoBiKip(banDo) }, '📜 Sổ bí kíp'),
      h('button', { class: 'nut', type: 'button', onclick: chonNguoiChoi }, '👥 Đổi người chơi')));
}

function trangCaiDat() {
  const cd = caiDat();
  const chk = h('input', { type: 'checkbox', id: 'tat-am', checked: cd.tatAm ? true : null, onchange: (e) => { luuCaiDat({ ...caiDat(), tatAm: e.target.checked }); } });
  manHinh(
    h('div', { class: 'thanh-tren' },
      h('button', { class: 'nut nut-tron nut-nho', type: 'button', 'aria-label': 'Về bản đồ', onclick: banDo }, '←'),
      h('div', { class: 'tieu-de' }, 'Cài đặt')),
    h('div', { class: 'the' },
      h('label', { class: 'an-hien', for: 'tat-am' }, chk, 'Tắt tiếng chuông đúng / sai'),
      h('p', { class: 'goi-y' }, 'Giọng đọc tiếng Séc vẫn nghe được khi bấm 🔊.')),
    h('div', { class: 'the' },
      h('h3', {}, 'Giọng đọc tiếng Séc'),
      h('p', {}, coGiongSec() ? '✅ Máy đã có giọng Séc.' : '❌ Chưa tìm thấy giọng Séc trên máy này.'),
      h('div', { class: 'hang-nut' },
        h('button', { class: 'nut', type: 'button', onclick: () => doc('Dobrý den, já jsem Sýček.') }, '🔊 Nghe thử'),
        h('button', { class: 'nut', type: 'button', onclick: huongDanCaiGiong }, 'Cách cài giọng'))),
    h('p', { class: 'goi-y' }, 'Sao lưu và khôi phục tiến độ sẽ có ở giai đoạn 5.'));
}

batDau();

