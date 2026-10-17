// Kiểm tra file data/tu-vung-yi.json và in bảng đối chiếu.
// Chạy:  node kiem-tra-du-lieu.cjs          (chỉ kiểm tra)
//        node kiem-tra-du-lieu.cjs --bang   (kiểm tra + ghi BANG-DOI-CHIEU.md)
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'data', 'tu-vung-yi.json');
const SO_TU = { B: 13, L: 13, M: 14, P: 14, S: 11, V: 11, Z: 4 };
const LUONG_TINH = 'bflmpsvz';

const loi = [];
const canhBao = [];

let d;
try {
  d = JSON.parse(fs.readFileSync(FILE, 'utf8'));
} catch (e) {
  console.log('❌ Không đọc được file dữ liệu: ' + e.message);
  process.exit(1);
}

// Vị trí chữ y/ý của gốc từ (chữ y/ý đầu tiên đứng ngay sau chữ lưỡng tính).
// Game chỉ che chữ ở vị trí này, không che y/ý ở đuôi từ.
function viTriChe(tu) {
  const s = tu.toLowerCase();
  for (let i = 1; i < s.length; i++) {
    if ((s[i] === 'y' || s[i] === 'ý') && LUONG_TINH.includes(s[i - 1])) return i;
  }
  return -1;
}

for (const k of ['quy_tac', 'cach_doc', 'bi_kip', 'nhom', 'cap_de_nham', 'quiz_cuoi', 'lo_trinh_7_ngay']) {
  if (!(k in d)) loi.push(`Thiếu phần "${k}"`);
}

let tong = 0;
for (const n of d.nhom || []) {
  const tu = n.tu || [];
  tong += tu.length;
  if (SO_TU[n.chu] !== tu.length) loi.push(`Nhóm ${n.chu}: có ${tu.length} từ, PDF ghi ${SO_TU[n.chu]}`);
  for (const k of ['ten', 'emoji', 'truyen_nho', 'meo', 'nghe_giong_viet_i']) {
    if (!n[k]) loi.push(`Nhóm ${n.chu}: thiếu "${k}"`);
  }
  for (const t of tu) {
    const ten = `${n.chu} / ${t.cz}`;
    for (const k of ['cz', 'phien_am', 'nghia', 'emoji', 'tu_cung_nha', 'vi_du']) {
      if (t[k] === undefined || t[k] === '') loi.push(`${ten}: thiếu "${k}"`);
    }
    if (viTriChe(t.cz) < 0) loi.push(`${ten}: không tìm thấy y/ý sau chữ lưỡng tính`);
    if (t.cz[0].toLowerCase() !== n.chu.toLowerCase() && !t.cz.toLowerCase().includes(n.chu.toLowerCase() + 'y') && !t.cz.toLowerCase().includes(n.chu.toLowerCase() + 'ý')) {
      loi.push(`${ten}: không có "${n.chu}y/${n.chu}ý"`);
    }
    for (const f of t.tu_cung_nha || []) {
      if (!/[yý]/i.test(f.cz)) {
        if (f.khong_co_y) canhBao.push(`${ten}: từ cùng nhà "${f.cz}" không có chữ y (PDF vẫn liệt kê). Game không dùng từ này trong trò "Từ cùng nhà".`);
        else loi.push(`${ten}: từ cùng nhà "${f.cz}" không có chữ y`);
      }
    }
    if (t.vi_du && !t.vi_du.vn) loi.push(`${ten}: ví dụ thiếu nghĩa tiếng Việt`);
  }
  for (const b of n.nghe_giong_viet_i || []) {
    if (!/[ií]/i.test(b.cz)) loi.push(`Nhóm ${n.chu}: từ bẫy "${b.cz}" không có i/í`);
    if (!b.nghia) canhBao.push(`Nhóm ${n.chu}: từ bẫy "${b.cz}" không có nghĩa trong PDF. Game chỉ hiện chữ, không tự thêm nghĩa.`);
  }
}
if (tong !== 80) loi.push(`Tổng số từ là ${tong}, phải là 80`);

for (const bk of d.bi_kip || []) {
  for (const k of ['ma', 'ten', 'than_chu', 'giai_thich', 'cau_hoi_thuoc']) {
    if (!bk[k]) loi.push(`${bk.ma || '?'}: thiếu "${k}"`);
  }
  for (const q of bk.cau_hoi_thuoc || []) {
    const soLan = q.lua_chon.filter((x) => x === q.dap_an).length;
    if (soLan !== 1) loi.push(`${bk.ma}: câu "${q.hoi}" có ${soLan} đáp án đúng (phải là 1)`);
    if (new Set(q.lua_chon).size !== q.lua_chon.length) loi.push(`${bk.ma}: câu "${q.hoi}" có lựa chọn trùng nhau`);
  }
}

for (const q of d.quiz_cuoi || []) {
  const soCho = q.cau.split('_').length - 1;
  if (soCho !== q.dap_an.length) loi.push(`Quiz "${q.cau}": ${soCho} chỗ trống nhưng ${q.dap_an.length} đáp án`);
}

console.log(`Tổng số từ: ${tong} (${Object.entries(SO_TU).map(([c, s]) => c + ' ' + s).join(', ')})`);
console.log(`Số bí kíp: ${(d.bi_kip || []).length}`);
if (canhBao.length) {
  console.log('\n⚠️  Cần anh/chị biết:');
  canhBao.forEach((x) => console.log('  - ' + x));
}
if (loi.length) {
  console.log('\n❌ Lỗi:');
  loi.forEach((x) => console.log('  - ' + x));
} else {
  console.log('\n✅ Dữ liệu đúng cấu trúc, không có lỗi.');
}

if (process.argv.includes('--bang')) {
  const dong = ['# Bảng đối chiếu 80 từ', '', 'Dò với PDF. Chữ **in đậm trong ngoặc [ ]** là chữ y/ý mà game sẽ che để hỏi.', ''];
  for (const n of d.nhom) {
    dong.push(`## ${n.chu} · ${n.emoji} ${n.ten} (${n.tu.length} từ)`, '');
    dong.push('| # | Từ Séc | Phiên âm | Nghĩa | Số từ cùng nhà |', '|---|---|---|---|---|');
    n.tu.forEach((t, i) => {
      const p = viTriChe(t.cz);
      const che = t.cz.slice(0, p) + '[**' + t.cz[p] + '**]' + t.cz.slice(p + 1);
      dong.push(`| ${i + 1} | ${t.emoji} ${che} | [${t.phien_am}] | ${t.nghia} | ${t.tu_cung_nha.length} |`);
    });
    if (n.tien_to) dong.push('', `Thêm quy tắc: ${n.tien_to.emoji} **${n.tien_to.cz}**: ${n.tien_to.nghia} (không tính vào ${n.tu.length} từ)`);
    dong.push('', 'Nghe giống nhưng viết i/í: ' + n.nghe_giong_viet_i.map((b) => b.cz + (b.nghia ? ` (${b.nghia})` : '')).join(', '), '');
  }
  dong.push('## Bí kíp', '', '| Mã | Màn | Tên | Câu thần chú | Nguồn |', '|---|---|---|---|---|');
  for (const bk of d.bi_kip) dong.push(`| ${bk.ma} | ${bk.man} | ${bk.ten} | ${bk.than_chu} | ${bk.nguon} |`);
  fs.writeFileSync(path.join(__dirname, 'BANG-DOI-CHIEU.md'), dong.join('\n') + '\n');
  console.log('\n📄 Đã ghi BANG-DOI-CHIEU.md');
}

process.exit(loi.length ? 1 : 0);
