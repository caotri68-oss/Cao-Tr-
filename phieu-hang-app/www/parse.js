/* Xử lý kết quả đọc từ ảnh phiếu: tách Pol., bỏ tiền tố ở cột Kód, giữ mã số + tên hàng. */
(function (root) {
  'use strict';

  // Bỏ phần chữ ở đầu cột Kód (vd "AROMVUN-85955 56487037" -> "8595556487037").
  function cleanKod(raw) {
    var s = String(raw == null ? '' : raw).replace(/\s+/g, '');
    if (!s) return '';
    var dash = s.lastIndexOf('-');
    var tail = dash >= 0 ? s.slice(dash + 1) : (s.match(/\d{8,}$/) || [''])[0];
    return tail.replace(/[^0-9]/g, '');
  }

  // Kiểm tra chữ số cuối của mã EAN-13 để phát hiện đọc sai số.
  function eanOk(code) {
    if (!/^\d{13}$/.test(code)) return false;
    var sum = 0;
    for (var i = 0; i < 12; i++) sum += Number(code[i]) * (i % 2 === 0 ? 1 : 3);
    return (10 - (sum % 10)) % 10 === Number(code[12]);
  }

  function status(code) {
    if (!code) return 'empty';
    if (!/^\d+$/.test(code)) return 'bad';
    if (code.length !== 13) return 'len';
    return eanOk(code) ? 'ok' : 'check';
  }

  // Lấy mảng JSON từ câu trả lời của mô hình (có thể bọc trong ```).
  function parseModelJson(text) {
    var t = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    var start = t.indexOf('[');
    var end = t.lastIndexOf(']');
    if (start < 0 || end < start) throw new Error('Không thấy danh sách dòng trong câu trả lời.');
    var arr = JSON.parse(t.slice(start, end + 1));
    if (!Array.isArray(arr)) throw new Error('Kết quả không phải danh sách.');
    return arr;
  }

  function toRows(arr) {
    return arr.map(function (r) {
      var kod = cleanKod(r.kod);
      return {
        pol: String(r.pol == null ? '' : r.pol).trim(),
        kod: kod,
        nazev: String(r.nazev == null ? '' : r.nazev).replace(/\s+/g, ' ').trim(),
      };
    });
  }

  var api = { cleanKod: cleanKod, eanOk: eanOk, status: status, parseModelJson: parseModelJson, toRows: toRows };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PhieuParse = api;
})(typeof self !== 'undefined' ? self : this);
