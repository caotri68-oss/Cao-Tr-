// Rà soát: mọi chữ Séc trong dữ liệu đều tra được nghĩa tiếng Việt. Chạy game trên cổng 8765 rồi: node cong-cu/ra-soat-nghia.cjs
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext()).newPage();
  const err = []; p.on('pageerror', (e) => err.push(e.message));
  await p.goto('http://localhost:8765/index.html');
  await p.waitForSelector('.the-ho-so');
  const r = await p.evaluate(async () => {
    const dl = await import('./js/du-lieu.js');
    await dl.taiDuLieu();
    const D = dl.D, T = dl.TRUYEN;
    const out = { thongKe: {}, rong: [], chuaTra: [], cauThieuVn: [], phienAmRong: [] };
    const tuCz = new Set();
    const tach = (s) => s.split(/\s+/).map((w) => w.replace(/^[“"(]+|[.,!?;:”")…]+$/g, '')).filter((w) => w && !/^[_]+$/.test(w));
    const them = (s, nguon) => tach(s).forEach((w) => { if (!w.includes('_')) tuCz.add(w + '||' + nguon); });
    // 1) 80 từ chính
    let soTu = 0;
    for (const n of D.nhom) {
      for (const t of n.tu) {
        soTu++;
        if (!t.nghia) out.rong.push('từ chính: ' + t.cz);
        if (!t.phien_am) out.phienAmRong.push(t.cz);
        if (!t.vi_du?.vn) out.cauThieuVn.push('ví dụ ' + t.cz);
        them(t.cz, 'từ chính');
        them(t.vi_du.cz, 'ví dụ ' + t.cz);
        for (const f of t.tu_cung_nha) { if (!f.nghia) out.rong.push('cùng nhà ' + t.cz + ': ' + f.cz); them(f.cz, 'cùng nhà ' + t.cz); }
      }
      if (n.tien_to) for (const f of n.tien_to.tu_cung_nha) { if (!f.nghia) out.rong.push('tiền tố: ' + f.cz); them(f.cz, 'tiền tố'); }
      for (const x of n.nghe_giong_viet_i) { if (!x.nghia) out.rong.push('từ bẫy ' + n.chu + ': ' + x.cz); them(x.cz, 'từ bẫy'); }
    }
    for (const c of D.cap_de_nham) { if (!c.y_nghia || !c.i_nghia) out.rong.push('cặp: ' + c.y); them(c.y, 'cặp'); them(c.i, 'cặp'); }
    for (const q of D.quiz_cuoi) them(q.cau, 'quiz');
    // 2) bí kíp
    for (const bk of D.bi_kip) {
      for (const v of bk.vi_du || []) { if (!v.vn) out.rong.push('bí kíp ' + bk.ma + ': ' + v.cz); them(v.cz, 'bí kíp ' + bk.ma); }
      const bc = bk.bang_chu;
      if (bc) for (const c of [...bc.chu, ...(bc.dac_biet ? bc.dac_biet.chu : [])]) for (const v of c.vd) { if (!v.vn) out.rong.push('bảng chữ ' + c.chu + ': ' + v.cz); them(v.cz, 'bảng chữ ' + bk.ma); }
    }
    // 3) truyện và thoại
    const duyet = (o, nguon) => {
      if (Array.isArray(o)) { o.forEach((x) => duyet(x, nguon)); return; }
      if (o && typeof o === 'object') {
        if (typeof o.cz === 'string') { them(o.cz, 'truyện ' + nguon); if (!o.vn) out.cauThieuVn.push('truyện: ' + o.cz); }
        for (const [k, v] of Object.entries(o)) if (k !== 'cz') duyet(v, nguon + '.' + k);
      }
    };
    duyet(T, 'root');
    for (const t of T.tu_them || []) if (!t.nghia) out.rong.push('tu_them: ' + t.cz);
    // 4) tra từng chữ bằng bộ tra của game
    const gap = new Set();
    for (const s of tuCz) {
      const [w, nguon] = s.split('||');
      const k = w.toLowerCase();
      if (gap.has(k)) continue;
      gap.add(k);
      const m = dl.traTu(w);
      if (!m || !m.nghia) out.chuaTra.push(w + '  (' + nguon + ')');
    }
    out.thongKe = { soTuChinh: soTu, soChuKhacNhau: gap.size, soTuCau: Object.keys(dl.TU_CAU).length };
    return out;
  });
  console.log(JSON.stringify(r, null, 1));
  console.log('lỗi JS:', err.length ? err : 'không có');
  await b.close();
})();
