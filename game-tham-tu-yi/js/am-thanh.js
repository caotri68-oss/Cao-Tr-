// Phát âm tiếng Séc (giọng có sẵn trong máy), ghi âm đọc theo, tiếng chuông đúng/sai.
import { h, toast, moBangNoi } from './dom.js';
import { caiDat } from './luu-tien-do.js';

let giong = null;
let daTim = false;

function timGiong() {
  if (!('speechSynthesis' in window)) return null;
  const ds = speechSynthesis.getVoices();
  if (ds.length) daTim = true;
  giong = ds.find((v) => v.lang === 'cs-CZ') || ds.find((v) => v.lang && v.lang.toLowerCase().startsWith('cs')) || null;
  return giong;
}
if ('speechSynthesis' in window) {
  timGiong();
  speechSynthesis.addEventListener?.('voiceschanged', timGiong);
}

export function coGiongSec() { return !!(giong || timGiong()); }
export function daBietGiong() { return daTim; }

// tuDong = true khi game tự đọc (không phải người chơi bấm): thiếu giọng thì im lặng, không báo.
export function doc(chu, { cham = false, tuDong = false } = {}) {
  if (!coGiongSec()) { if (!tuDong) toast('Máy chưa có giọng đọc tiếng Séc. Xem Cài đặt để cài.'); return Promise.resolve(); }
  return new Promise((xong) => {
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(chu);
      u.voice = giong;
      u.lang = 'cs-CZ';
      u.rate = cham ? 0.6 : 0.8;
      u.onend = xong;
      u.onerror = xong;
      speechSynthesis.speak(u);
      setTimeout(xong, 6000);
    } catch { xong(); }
  });
}

export function nutNghe(chu, nhan = '🔊') {
  return h('button', {
    class: 'nut nut-tron', type: 'button', 'aria-label': 'Nghe: ' + chu,
    onclick: (e) => { e.stopPropagation(); doc(chu); },
  }, nhan);
}
export function nutNgheCham(chu) {
  return h('button', {
    class: 'nut nut-tron', type: 'button', 'aria-label': 'Nghe chậm: ' + chu,
    onclick: (e) => { e.stopPropagation(); doc(chu, { cham: true }); },
  }, '🐢');
}

export function huongDanCaiGiong() {
  moBangNoi(
    h('h3', {}, 'Cài giọng đọc tiếng Séc'),
    h('p', {}, h('b', {}, 'Android: '), 'Cài đặt → Hệ thống → Ngôn ngữ → Đầu ra chuyển văn bản thành giọng nói → Công cụ của Google → Cài đặt dữ liệu giọng nói → chọn Čeština (tiếng Séc) → tải về.'),
    h('p', {}, h('b', {}, 'iPhone: '), 'Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → Tiếng Séc → chọn một giọng (ví dụ Zuzana) → tải về.'),
    h('p', { class: 'goi-y' }, 'Tên các mục có thể hơi khác tùy đời máy. Cài xong, đóng hẳn trình duyệt rồi mở lại game. Không có giọng đọc thì game vẫn chơi được bằng chữ.'),
  );
}

// ——— Tiếng chuông nhỏ ———
let ac = null;
export function chuong(dung) {
  if (caiDat().tatAm) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const notes = dung ? [660, 880] : [330, 262];
    notes.forEach((f, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.frequency.value = f;
      o.type = 'sine';
      g.gain.setValueAtTime(0.0001, ac.currentTime + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.12, ac.currentTime + i * 0.12 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + i * 0.12 + 0.18);
      o.connect(g).connect(ac.destination);
      o.start(ac.currentTime + i * 0.12);
      o.stop(ac.currentTime + i * 0.12 + 0.2);
    });
  } catch { /* máy không hỗ trợ âm thanh thì bỏ qua */ }
}

// ——— Đọc theo: ghi âm rồi nghe lại xen kẽ với giọng mẫu ———
let micBiChan = false;

// Trả về một khối nút. Gọi xong() khi người chơi bấm "Giống rồi" / "Mình đã đọc to".
// coMau = false khi câu là tiếng Việt (câu thần chú): chỉ nghe lại giọng của mình.
export function khoiDocTheo(chu, xong = () => {}, { coMau = true } = {}) {
  const khoi = h('div', { class: 'hang-nut' });
  let daXong = false;
  const ketThuc = () => { if (!daXong) { daXong = true; xong(); } };

  const coMic = !micBiChan && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder;

  function veBanDau() {
    if (!coMic || micBiChan) {
      khoi.replaceChildren(h('button', { class: 'nut nut-rong', type: 'button', onclick: () => { ketThuc(); khoi.replaceChildren(h('p', { class: 'goi-y' }, '✓ Giỏi lắm!')); } }, '🗣️ Mình đã đọc to'));
      return;
    }
    khoi.replaceChildren(h('button', { class: 'nut nut-rong', type: 'button', onclick: batDauGhi }, '🎤 Đọc theo'));
  }

  async function batDauGhi() {
    let luong;
    try {
      luong = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      micBiChan = true;
      toast('Máy không cho dùng micro. Em chỉ cần đọc to rồi bấm nút.');
      veBanDau();
      return;
    }
    const manh = [];
    const ghiAm = new MediaRecorder(luong);
    ghiAm.ondataavailable = (e) => manh.push(e.data);
    ghiAm.onstop = () => {
      luong.getTracks().forEach((t) => t.stop());
      const url = URL.createObjectURL(new Blob(manh, { type: ghiAm.mimeType || 'audio/webm' }));
      veNgheLai(url);
    };
    ghiAm.start();
    const dung = () => { if (ghiAm.state === 'recording') ghiAm.stop(); };
    setTimeout(dung, 5000);
    khoi.replaceChildren(h('button', { class: 'nut nut-rong nut-chinh', type: 'button', onclick: dung }, '⏹ Đang ghi… bấm để dừng'));
  }

  function veNgheLai(url) {
    const amThanh = new Audio(url);
    const ngheCaHai = async () => { if (coMau) await doc(chu); amThanh.currentTime = 0; amThanh.play().catch(() => {}); };
    khoi.replaceChildren(...[
      coMau ? h('button', { class: 'nut', type: 'button', onclick: ngheCaHai }, '🔁 Mẫu rồi của mình') : null,
      h('button', { class: 'nut', type: 'button', onclick: () => { amThanh.currentTime = 0; amThanh.play().catch(() => {}); } }, '▶ Của mình'),
      h('button', { class: 'nut nut-chinh', type: 'button', onclick: () => { ketThuc(); khoi.replaceChildren(h('p', { class: 'goi-y' }, '✓ Giống rồi!')); } }, '✓ Giống rồi'),
      h('button', { class: 'nut', type: 'button', onclick: batDauGhi }, '↺ Đọc lại'),
    ].filter(Boolean));
    ngheCaHai();
  }

  veBanDau();
  return khoi;
}
