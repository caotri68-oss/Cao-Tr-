// Bot tự chơi từ màn 0 tới hết phố B ở khổ 360px, báo lỗi và chụp ảnh.
// Chạy: python3 -m http.server 8765 (trong thư mục game) rồi: node cong-cu/choi-thu-tu-dong.cjs <thư-mục-ảnh>
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const OUT = process.argv[2] || require('os').tmpdir();
(async () => {
  const browser = await chromium.launch({ args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] });
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, permissions: ['microphone'] });
  const page = await ctx.newPage();
  const loi = [];
  page.on('pageerror', (e) => loi.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') loi.push('console: ' + m.text()); });
  await page.addInitScript(() => { window.__KIEM_TRA__ = true; });
  await page.goto('http://localhost:8765/index.html');
  await page.waitForSelector('.the-ho-so');
  await page.screenshot({ path: OUT + '/01-chon-nguoi.png' });

  // ——— Kiểm tra logic ———
  const logic = await page.evaluate(async () => {
    const dl = await import('./js/du-lieu.js');
    const ch = await import('./js/cau-hoi.js');
    const kq = { khongTimThayTrongCau: [], loiTaoCau: [], truyen: {}, viDuCungMem: ch.viDuCungMem() };
    for (const t of dl.tatCaTuChinh()) {
      if (!dl.timTrongCau(t.vi_du.cz, t.cz)) kq.khongTimThayTrongCau.push(t.cz);
      try {
        const n = dl.nhomTheoChu(t.nhom);
        ch.qNgheDien(ch.mucTuChinh(t)); ch.qCauViDu(t); ch.qCungNha(t, n); ch.qBayNgheGiong(ch.mucTuChinh(t)); ch.qBaBuoc(ch.mucTuChinh(t));
      } catch (e) { kq.loiTaoCau.push(t.cz + ': ' + e.message); }
    }
    for (const n of dl.D.nhom) {
      const p = document.createElement('div');
      const { czTrongTruyen } = await import('./js/dich.js');
      p.append(czTrongTruyen(n.truyen_nho));
      kq.truyen[n.chu] = [...p.querySelectorAll('.cz')].map((b) => b.textContent);
      for (const b of dl.tuBayHoiDuoc(n)) { try { ch.qNgheDien(ch.mucTuBay(b, n.chu)); ch.qBayNgheGiong(ch.mucTuBay(b, n.chu)); ch.qBaBuoc(ch.mucTuBay(b, n.chu)); } catch (e) { kq.loiTaoCau.push(b.cz + ': ' + e.message); } }
    }
    kq.traMyji = dl.traTu('Myji'); kq.traBydlim = dl.traTu('Bydlím')?.cz; kq.traMay = dl.traTu('Mây');
    return kq;
  });
  console.log('LOGIC', JSON.stringify(logic, null, 1));

  // ——— Chơi tự động ———
  let anh = 2; let ketLan = 0; const chupLoai = new Set();
  const chup = async (ten) => { if (!chupLoai.has(ten)) { chupLoai.add(ten); await page.screenshot({ path: `${OUT}/${String(anh++).padStart(2, '0')}-${ten}.png`, fullPage: true }); } };
  for (let i = 0; i < 900; i++) {
    const r = await page.evaluate(() => {
      const app = document.getElementById('app');
      const lop = document.getElementById('lop-phu');
      const hien = (el) => el && !el.hidden && el.offsetParent !== null;
      if (!lop.hidden) { lop.querySelector('.bang-noi > .nut-rong').click(); return 'đóng-bảng'; }
      const q = window.__cauHienTai;
      const cuaAi = /Cửa ải/.test(app.querySelector('.thanh-tren small')?.textContent || '');
      const nutCau = [...app.querySelectorAll('.lua-chon .nut:not(:disabled), .gio .nut:not(:disabled)')].filter((b) => !b.classList.contains('da-ghep'));
      if (nutCau.length) {
        const txt = (b) => b.textContent.trim();
        if (q && q.loai === 'ghep' && app.contains(nutCau[0])) {
          for (const [cz, nghia] of q.dapAn) {
            [...app.querySelectorAll('.lua-chon .nut')].find((b) => txt(b) === cz && !b.classList.contains('da-ghep'))?.click();
            [...app.querySelectorAll('.lua-chon .nut')].find((b) => txt(b) === nghia && !b.classList.contains('da-ghep'))?.click();
          }
          return 'ghép';
        }
        let dap = q && q.dapAn;
        if (Array.isArray(dap)) dap = dap.find((d) => nutCau.some((b) => txt(b) === d));
        let nut = dap ? nutCau.find((b) => txt(b) === dap || (q.loai === 'chu_cai' && txt(b).startsWith(dap))) : null;
        const coySai = !cuaAi && Math.random() < 0.12;
        if (!nut || coySai) nut = coySai ? (nutCau.find((b) => b !== nut) || nutCau[0]) : nutCau[0];
        nut.click();
        return (coySai ? 'trả-lời-sai:' : 'trả-lời:') + (q ? q.loai : '?') + (cuaAi ? '(cửa ải)' : '');
      }
      // Xếp câu nhớ
      const dich = app.querySelector('.cau-nho-dich');
      if (dich) {
        const cau = ['Bố', 'Fi', 'Lên', 'Mây', 'Phóng', 'Sao', 'Vào', 'Zũ trụ'];
        const k = dich.children.length;
        if (k < cau.length) { [...app.querySelectorAll('.hang-nut .nut')].find((b) => b.textContent === cau[k]).click(); return 'xếp-câu'; }
      }
      const chinh = [...app.querySelectorAll('.nut-chinh')].find((b) => hien(b) && !b.disabled);
      if (chinh) { chinh.click(); return 'nút-chính:' + chinh.textContent.trim().slice(0, 30); }
      const hs0 = [...document.querySelectorAll('.the-ho-so')].find((b) => b.textContent.includes('Ánh Dương')); if (hs0) { hs0.click(); return 'chọn-hồ-sơ'; }
      const tram = app.querySelector('.tram.dang-mo');
      if (tram) { tram.click(); return 'vào-trạm:' + tram.querySelector('b').textContent; }
      const viec = [...app.querySelectorAll('button')].filter((b) => hien(b) && !b.disabled && !b.dataset.botDa
        && !/Về bản đồ|Đổi người|Cài đặt|Quay lại/.test((b.getAttribute('aria-label') || '') + b.textContent)
        && !b.classList.contains('the-ho-so'));
      if (viec.length) { viec[0].dataset.botDa = '1'; viec[0].click(); return 'bấm:' + viec[0].textContent.trim().slice(0, 25); }
      const hs = document.querySelector('.the-ho-so'); if (hs) { hs.click(); return 'chọn-hồ-sơ'; }
      return 'kẹt';
    });
    const tt = await page.evaluate(() => { try { return JSON.parse(localStorage.getItem('tham-tu-yi:ho-so:anhduong')); } catch { return null; } });
    const tieude = await page.evaluate(() => (document.querySelector('.thanh-tren .tieu-de')?.textContent || document.querySelector('h1,h2')?.textContent || '').slice(0, 60));
    if (i % 1 === 0) console.log(i, r, '|', tieude);
    const loai = tieude.includes('Thử các nút') ? 'thu-nut' : tieude.includes('Xếp câu') ? 'xep-cau' : r.startsWith('trả-lời:ba_buoc') ? 'ba-buoc' : r.startsWith('trả-lời:nghe_dien') ? 'nghe-dien' : r.startsWith('ghép') ? 'ghep' : r.startsWith('trả-lời:cung_nha') ? 'cung-nha' : r.startsWith('trả-lời:cau') ? 'cau-vi-du' : r.startsWith('trả-lời:chu_cai') ? 'chu-cai' : null;
    if (loai) { await page.waitForTimeout(150); await chup(loai); }
    if (/Bí kíp mới|Phòng Âm thanh$/.test(tieude)) await chup('the-bi-kip');
    if (tieude.includes('Truyện nhớ')) await chup('truyen-nho');
    if (/Học từ 1\//.test(tieude)) await chup('hoc-tu');
    if (r === 'kẹt') { ketLan = (ketLan||0)+1; if (ketLan < 6) { await page.waitForTimeout(800); continue; } } else ketLan = 0;
    if (r === 'kẹt') { console.log('KẸT'); await page.screenshot({ path: OUT + '/ket.png', fullPage: true }); break; }
    if (tt && tt.pho && tt.pho.B && tt.pho.B.qua && /Bản đồ/.test(tieude)) { console.log('XONG PHỐ B', JSON.stringify(tt.pho.B), 'bí kíp', Object.keys(tt.biKip)); break; }
    await page.waitForTimeout(40);
  }
  await page.screenshot({ path: OUT + '/99-ban-do.png', fullPage: true });
  // Kiểm tra tràn ngang
  const tran = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log('TRÀN NGANG:', tran);
  console.log('LỖI:', loi.length ? loi : 'không có');
  await browser.close();
})();
