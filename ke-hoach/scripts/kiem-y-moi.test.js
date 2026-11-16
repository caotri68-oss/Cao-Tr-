// Test cho kiem-y-moi.js. Chạy: node ke-hoach/scripts/kiem-y-moi.test.js
import assert from 'node:assert/strict';
import { kiemTra, tinhMaY, CAC_COT, dauHieuCaNhan, docCsv } from './kiem-y-moi.js';

const ctx = () => ({
  chat: new Set(['mg', 'vitD']),
  mucTieu: new Set(['ngu', 'xuong']),
  nguon: new Set(['KHAC', 'BS-PHUC']),
  maCo: new Map([['T-vitD-xuong-000000', 'bang-y.csv']]),
});
const q = (s) => '"' + String(s).replace(/"/g, '""') + '"';
const dongHopLe = (o = {}) => {
  const v = { chat: 'mg', muc_tieu: 'ngu', huong: 'loi', noi_dung: 'Theo tác giả, chất A dùng buổi tối.', lieu: '', nguon: 'KHAC', muc_ncuu: '', trich_dan: 'Câu nguyên văn ngắn.', link_goc: 'bai-1', trang_thai: 'cho_duyet', ghi_chu: '', ...o };
  if (o.ma_y === undefined) v.ma_y = tinhMaY(v.chat, v.muc_tieu, v.trich_dan);
  return CAC_COT.map((c) => v[c]);
};
const csv = (dongs, { bom = true, cot = CAC_COT } = {}) => (bom ? '﻿' : '') + [cot, ...dongs].map((r) => r.map(q).join(',')).join('\n') + '\n';
const chay = (dongs, opt, c = ctx()) => kiemTra(csv(dongs, opt), c);
const coLoi = (kq, mau) => kq.loi.some((m) => m.includes(mau));
const coCB = (kq, mau) => kq.canhBao.some((m) => m.includes(mau));

const cases = [];
const test = (ten, fn) => cases.push([ten, fn]);

test('file hợp lệ: không lỗi, không cảnh báo', () => {
  const kq = chay([dongHopLe()]);
  assert.deepEqual(kq.loi, []); assert.deepEqual(kq.canhBao, []); assert.equal(kq.soDong, 1);
});
test('thiếu BOM', () => assert.ok(coLoi(chay([dongHopLe()], { bom: false }), 'BOM')));
test('sai thứ tự cột', () => {
  const cot = [...CAC_COT]; [cot[1], cot[2]] = [cot[2], cot[1]];
  assert.ok(coLoi(chay([dongHopLe()], { cot }), 'tiêu đề sai'));
});
test('thiếu cột', () => assert.ok(coLoi(chay([dongHopLe()], { cot: CAC_COT.slice(0, 11) }), 'tiêu đề sai')));
test('dòng sai số cột', () => assert.ok(coLoi(chay([dongHopLe().slice(0, 10)]), 'cột')));
test('mã chất không có trong kho', () => assert.ok(coLoi(chay([dongHopLe({ chat: 'khongco' })]), 'mã chất')));
test('chất mới có ghi chú thì được', () => {
  const kq = chay([dongHopLe({ chat: 'silic', ghi_chu: 'chất chưa có trong kho' })]);
  assert.deepEqual(kq.loi, []);
});
test('chất mới có dấu hoặc viết hoa thì lỗi', () => assert.ok(coLoi(chay([dongHopLe({ chat: 'Silíc', ghi_chu: 'chất chưa có trong kho' })]), 'không dấu')));
test('mục tiêu không có trong kho', () => assert.ok(coLoi(chay([dongHopLe({ muc_tieu: 'xxx' })]), 'mục tiêu')));
test('nguồn không có trong kho', () => assert.ok(coLoi(chay([dongHopLe({ nguon: 'LA' })]), 'nguồn')));
test('huong sai', () => assert.ok(coLoi(chay([dongHopLe({ huong: 'tot' })]), 'huong')));
test('trich_dan rỗng', () => assert.ok(coLoi(chay([dongHopLe({ trich_dan: '' })]), 'trich_dan đang trống')));
test('trich_dan đúng 300 ký tự thì được', () => assert.deepEqual(chay([dongHopLe({ trich_dan: 'a'.repeat(300) })]).loi, []));
test('trich_dan 301 ký tự thì lỗi', () => assert.ok(coLoi(chay([dongHopLe({ trich_dan: 'a'.repeat(301) })]), '301')));
test('ma_y sai công thức', () => assert.ok(coLoi(chay([dongHopLe({ ma_y: 'T-mg-ngu-abcdef' })]), 'công thức băm')));
test('sửa trich_dan sau khi băm thì lỗi', () => {
  const d = dongHopLe(); d[CAC_COT.indexOf('trich_dan')] = 'Câu khác.';
  assert.ok(coLoi(chay([d]), 'công thức băm'));
});
test('ma_y trùng trong file', () => {
  const kq = chay([dongHopLe(), dongHopLe()]);
  assert.ok(coLoi(kq, 'trùng với dòng'));
});
test('ma_y trùng với bảng đã có', () => assert.ok(coLoi(chay([dongHopLe({ ma_y: 'T-vitD-xuong-000000', chat: 'vitD', muc_tieu: 'xuong' })]), 'đã có trong bang-y.csv')));
test('ma_y không bắt đầu bằng T-', () => assert.ok(coLoi(chay([dongHopLe({ ma_y: 'Y-mg-ngu-abcdef' })]), 'T-')));
for (const [tu, cau] of [['chữa', 'Theo tác giả, chất A chữa mất ngủ.'], ['tốt nhất', 'Đây là dạng tốt nhất cho giấc ngủ.'], ['100%', 'Hấp thu 100% khi uống lúc đói.']]) {
  test('từ cấm "' + tu + '"', () => assert.ok(coLoi(chay([dongHopLe({ noi_dung: cau })]), 'từ cấm')));
}
test('"chưa" không bị nhầm với "chữa"', () => assert.deepEqual(chay([dongHopLe({ noi_dung: 'Theo tác giả, chưa rõ hiệu quả.' })]).loi, []));
test('trang_thai sai', () => assert.ok(coLoi(chay([dongHopLe({ trang_thai: 'xong' })]), 'trang_thai')));
test('trang_thai da_duyet chỉ cảnh báo', () => {
  const kq = chay([dongHopLe({ trang_thai: 'da_duyet' })]);
  assert.deepEqual(kq.loi, []); assert.ok(coCB(kq, 'da_duyet'));
});
test('muc_ncuu phải trống', () => assert.ok(coLoi(chay([dongHopLe({ muc_ncuu: 'R2' })]), 'muc_ncuu')));
test('noi_dung trống', () => assert.ok(coLoi(chay([dongHopLe({ noi_dung: ' ' })]), 'noi_dung đang trống')));
test('link_goc trống chỉ cảnh báo', () => {
  const kq = chay([dongHopLe({ link_goc: '' })]);
  assert.deepEqual(kq.loi, []); assert.ok(coCB(kq, 'link_goc'));
});
test('cảnh báo số điện thoại', () => assert.ok(coCB(chay([dongHopLe({ ghi_chu: 'gọi 0912 345 678' })]), 'thông tin cá nhân')));
test('cảnh báo email', () => assert.ok(coCB(chay([dongHopLe({ ghi_chu: 'a.b@gmail.com' })]), 'email')));
test('cảnh báo ngày sinh', () => assert.ok(coCB(chay([dongHopLe({ ghi_chu: 'sinh ngày 12/03/1980' })]), 'ngày sinh')));
test('cảnh báo tên kèm mẹ/bố', () => assert.ok(coCB(chay([dongHopLe({ noi_dung: 'Theo tác giả, mẹ Lan uống chất A.' })]), 'mẹ/bố/anh/chị')));
test('liều "200–400 mg" và "500 g" không bị báo là số điện thoại', () => {
  assert.deepEqual(dauHieuCaNhan('Liều 200–400 mg/ngày, ăn 500 g mỗi tuần, 1000 IU'), []);
});
test('dấu phẩy và xuống dòng trong ô được đọc đúng', () => {
  const kq = docCsv('﻿a,b\n"x, y","dòng 1\ndòng 2"\n');
  assert.deepEqual(kq.bang[1].o, ['x, y', 'dòng 1\ndòng 2']);
});
test('file rỗng', () => assert.ok(coLoi(kiemTra('﻿', ctx()), 'rỗng')));

let hong = 0;
for (const [ten, fn] of cases) {
  try { fn(); console.log('  ok   ' + ten); } catch (e) { hong++; console.log('  HỎNG ' + ten + '\n       ' + String(e.message).split('\n')[0]); }
}
console.log('\n' + (cases.length - hong) + '/' + cases.length + ' test đạt.');
process.exit(hong ? 1 : 0);
