// Phát âm tiếng Séc (giọng của máy), ghi âm đọc theo, và tiếng "ting" nhỏ.
window.PK = window.PK || {};

(function () {
  const coGiongDoc = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let giongSec = null;
  let daBaoThieuGiong = false;

  function timGiong() {
    if (!coGiongDoc) return;
    const ds = speechSynthesis.getVoices() || [];
    giongSec = ds.find(function (v) { return /^cs([-_]|$)/i.test(v.lang); }) || null;
  }
  if (coGiongDoc) {
    timGiong();
    speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', timGiong);
  }

  // Bỏ phần [phiên âm], dấu "…" và dấu "/" trước khi đọc.
  function lamSach(chu) {
    return String(chu).replace(/\[[^\]]*\]/g, ' ').replace(/…/g, ' ').replace(/\s\/\s/g, '. ').replace(/\s+/g, ' ').trim();
  }

  // Đọc chữ Séc. Trả về Promise xong khi đọc hết (hoặc khi không đọc được).
  function noi(chu) {
    return new Promise(function (xong) {
      const sach = lamSach(chu);
      if (!coGiongDoc || !sach) { baoThieuGiong(); xong(false); return; }
      timGiong();
      if (!giongSec) baoThieuGiong();
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(sach);
        u.lang = 'cs-CZ';
        if (giongSec) u.voice = giongSec;
        u.rate = 0.8;
        let daXong = false;
        const ket = function () { if (!daXong) { daXong = true; xong(true); } };
        u.onend = ket; u.onerror = ket;
        setTimeout(ket, 1200 + sach.length * 160); // phòng khi máy không báo "đọc xong"
        speechSynthesis.speak(u);
      } catch (e) { xong(false); }
    });
  }

  function baoThieuGiong() {
    if (daBaoThieuGiong) return;
    daBaoThieuGiong = true;
    // Đợi một chút: có máy tải danh sách giọng chậm.
    setTimeout(function () {
      timGiong();
      if (!giongSec && PK.ui) PK.ui.huongDanGiong();
    }, 600);
  }

  // ---------- Ghi âm ----------
  const coMicro = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

  async function batDauGhi() {
    if (!coMicro) throw new Error('khong-co-micro');
    const luong = await navigator.mediaDevices.getUserMedia({ audio: true });
    const may = new MediaRecorder(luong);
    const manh = [];
    may.ondataavailable = function (e) { if (e.data && e.data.size) manh.push(e.data); };
    const ketThuc = new Promise(function (xong) {
      may.onstop = function () {
        luong.getTracks().forEach(function (t) { t.stop(); });
        const blob = new Blob(manh, { type: may.mimeType || 'audio/webm' });
        xong(URL.createObjectURL(blob));
      };
    });
    may.start();
    return { dung: function () { if (may.state !== 'inactive') may.stop(); return ketThuc; } };
  }

  function phat(url) {
    return new Promise(function (xong) {
      const a = new Audio(url);
      a.onended = function () { xong(); };
      a.onerror = function () { xong(); };
      a.play().catch(function () { xong(); });
    });
  }

  // ---------- Tiếng nhỏ (không cần file âm thanh) ----------
  let ctx = null;
  function nhac(loai) {
    if (!PK.luu.caiDat().amThanh) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const not = { dung: [660, 880], sai: [330, 262], sao: [523, 659, 784, 1047], cham: [600] }[loai] || [600];
      not.forEach(function (tan, i) {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = tan;
        const t = ctx.currentTime + i * 0.11;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.07, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        o.connect(g).connect(ctx.destination);
        o.start(t); o.stop(t + 0.25);
      });
    } catch (e) { /* máy không phát được: bỏ qua */ }
  }

  PK.am = {
    noi: noi,
    coGiongSec: function () { timGiong(); return !!giongSec; },
    coMicro: coMicro,
    batDauGhi: batDauGhi,
    phat: phat,
    nhac: nhac
  };
})();
