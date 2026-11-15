// Kiểm thử tinh-tang.js. Chạy: node ke-hoach/scripts/tinh-tang.test.js
import assert from 'node:assert/strict';
import { tinhTang, apChamMuc, parseCsv } from './tinh-tang.js';

const NGUON = [
  { ma_nguon: 'NIH', loai: 'chinh_thuc', dua_vao: '' },
  { ma_nguon: 'NCCIH', loai: 'chinh_thuc', dua_vao: '' },
  { ma_nguon: 'BS', loai: 'chuyen_gia', dua_vao: '' },
  { ma_nguon: 'BS2', loai: 'chuyen_gia', dua_vao: 'NIH' },
  { ma_nguon: 'TG', loai: 'tac_gia', dua_vao: '' },
  { ma_nguon: 'TG2', loai: 'tac_gia', dua_vao: 'TG' },
  { ma_nguon: 'CN', loai: 'ca_nhan', dua_vao: '' },
  { ma_nguon: 'CN2', loai: 'ca_nhan', dua_vao: '' },
];
let n = 0;
const y = (nguon, muc, huong = 'loi', tt = 'da_duyet', mt = 'xuong') =>
  ({ ma_y: 'Y' + ++n, chat: 'c', muc_tieu: mt, huong, nguon, muc_ncuu: muc, trang_thai: tt });
const tang = (rows) => { const r = tinhTang(rows, NGUON); return r.length ? r[0] : null; };
let pass = 0;
const t = (ten, f) => { f(); pass++; console.log('ok  ' + ten); };

t('A: có R1', () => assert.equal(tang([y('NIH', 'R1')]).tang, 'A'));
t('B: R2 có chuyên gia', () => {
  const r = tang([y('NCCIH', 'R2'), y('BS', '')]);
  assert.equal(r.tang, 'B'); assert.match(r.giai_thich, /chuyên gia đồng ý/);
});
t('B: R2 không có chuyên gia, ghi chưa xác nhận', () => {
  const r = tang([y('NCCIH', 'R2')]);
  assert.equal(r.tang, 'B'); assert.match(r.giai_thich, /chưa có chuyên gia xác nhận/);
});
t('C: R3', () => assert.equal(tang([y('NIH', 'R3')]).tang, 'C'));
t('C: R0 + 2 nguồn độc lập', () => assert.equal(tang([y('NIH', ''), y('NCCIH', 'R0')]).tang, 'C'));
t('D: một nguồn, chưa có nghiên cứu', () => assert.equal(tang([y('NIH', '')]).tang, 'D'));
t('X: chính thức R− + nguồn khác nói lợi', () =>
  assert.equal(tang([y('NIH', '−', 'khong'), y('TG', '')]).tang, 'X'));
t('X: R− + chính thức khác nói lợi R1 vẫn là X (bước 2 trước bước 3)', () =>
  assert.equal(tang([y('NIH', '−', 'khong'), y('NCCIH', 'R1')]).tang, 'X'));
t('không X khi R− không phải nguồn chính thức', () =>
  assert.notEqual(tang([y('TG', '−', 'khong'), y('NIH', 'R1')]).tang, 'X'));
t('∅: không có dòng thì không trả dòng', () => {
  assert.deepEqual(tinhTang([], NGUON), []);
  assert.deepEqual(tinhTang([y('NIH', 'R1', 'loi', 'bo'), y('NIH', 'R1', 'loi', 'da_duyet', '')], NGUON), []);
});
t('hai nguồn cùng dua_vao chỉ tính 1 (BS2 dẫn NIH)', () => {
  const r = tang([y('NIH', ''), y('BS2', '')]);
  assert.equal(r.so_nguon_doc_lap, 1); assert.equal(r.tang, 'D');
});
t('hai nguồn tác giả cùng dua_vao chỉ tính 1', () => assert.equal(tang([y('TG', ''), y('TG2', '')]).tang, 'D'));
t('cùng mã nguồn hai dòng chỉ tính 1', () => assert.equal(tang([y('NIH', ''), y('NIH', '')]).tang, 'D'));
t('hai nguồn độc lập thật thì tính 2', () => assert.equal(tang([y('TG', ''), y('CN', '')]).so_nguon_doc_lap, 2));
t('tác giả/cá nhân ghi R1 hoặc R2 vẫn không quá C', () => {
  assert.equal(tang([y('TG', 'R1')]).tang, 'C');
  assert.equal(tang([y('CN', 'R2'), y('CN2', 'R1')]).tang, 'C');
});
t('tác giả cộng nguồn chính thức R1 thì vẫn A', () => assert.equal(tang([y('TG', 'R1'), y('NIH', 'R1')]).tang, 'A'));
t('cảnh báo huong=hai, không phụ thuộc tầng', () => {
  const a = tang([y('NIH', 'R1'), y('NCCIH', 'R1', 'hai')]);
  assert.equal(a.tang, 'A'); assert.equal(a.canh_bao, 1);
  const d = tang([y('NIH', ''), y('NCCIH', '', 'hai')]);
  assert.equal(d.tang, 'D'); assert.equal(d.canh_bao, 1);
  assert.equal(tang([y('NIH', 'R1')]).canh_bao, 0);
});
t('cặp chỉ có huong=hai: tầng K, có cảnh báo', () => {
  const r = tang([y('NIH', '', 'hai')]); assert.equal(r.tang, 'K'); assert.equal(r.canh_bao, 1);
});
t('bỏ dòng bo và muc_tieu rỗng, gom đúng cặp', () => {
  const r = tinhTang([y('NIH', 'R1', 'loi', 'bo'), y('NIH', 'R2', 'loi', 'da_duyet'), y('NIH', 'R1', 'loi', 'da_duyet', 'tim')], NGUON);
  assert.equal(r.length, 2); assert.equal(r.find((x) => x.muc_tieu === 'xuong').tang, 'B');
});
t('cham-muc đè muc_ncuu và huong', () => {
  const a = y('NIH', '');
  const [b] = apChamMuc([a], [{ ma_y: a.ma_y, muc_ncuu: 'R1', huong_de_xuat: '' }]);
  assert.equal(b.muc_ncuu, 'R1'); assert.equal(b.huong, 'loi');
  const [c] = apChamMuc([a], [{ ma_y: a.ma_y, muc_ncuu: '', huong_de_xuat: 'khong' }]);
  assert.equal(c.muc_ncuu, ''); assert.equal(c.huong, 'khong');
  assert.equal(apChamMuc([a], null)[0], a);
});
t('parseCsv: BOM, ngoặc kép, dấu phẩy và ngoặc kép trong ô', () => {
  const r = parseCsv('﻿"a","b"\n"1, x","y ""z"""\n');
  assert.deepEqual(r, [{ a: '1, x', b: 'y "z"' }]);
});
console.log(`\n${pass} kiểm thử đạt.`);
