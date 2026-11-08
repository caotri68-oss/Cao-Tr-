/*
 * Logic thuần cho app Tạo Đơn Hàng Nhanh (không phụ thuộc DOM).
 *
 * Mô hình dữ liệu của một đơn:
 *   order = {
 *     date: "01.11.2026",            // dd.mm.yyyy
 *     items: {
 *       "<id sản phẩm>": {
 *         variants: { "<tên loại>": <số lượng> },  // chỉ lưu loại có số > 0
 *         excluded: ["<tên loại>", ...],           // "Trừ loại"
 *         extra: <số lượng "các loại khác lấy thêm">
 *       }
 *     }
 *   }
 *
 * Sản phẩm trong danh mục có thể có:
 *   units: { "<tên loại>": "paleta" }  // đơn vị khác "balení" (mặc định)
 *
 * Quy đổi khi cộng tổng: 1 paleta = UNIT_SIZE.paleta balení.
 */
(function (root) {
  'use strict';

  var UNIT_DEFAULT = 'balení';
  // Suy ra từ đơn mẫu 11.10.2026: 395 balení + 1 paleta = 435 balení.
  var UNIT_SIZE = { 'paleta': 40 };

  function normalize(s) {
    return String(s)
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase();
  }

  function toQty(v) {
    var n = parseInt(v, 10);
    return isNaN(n) || n < 0 ? 0 : n;
  }

  function unitOf(product, variant) {
    return (product && product.units && product.units[variant]) || UNIT_DEFAULT;
  }

  // Số balení tương đương của một dòng (paleta = UNIT_SIZE balení).
  function weightOf(product, variant, qty) {
    var u = unitOf(product, variant);
    return qty * (UNIT_SIZE[u] || 1);
  }

  function emptyOrder(dateDMY) {
    return { date: dateDMY, items: {} };
  }

  function getItem(order, pid) {
    var key = String(pid);
    if (!order.items[key]) {
      order.items[key] = { variants: {}, excluded: [], extra: 0 };
    }
    return order.items[key];
  }

  function setVariantQty(order, pid, variant, qty) {
    var item = getItem(order, pid);
    var q = toQty(qty);
    if (q === 0) {
      delete item.variants[variant];
    } else {
      item.variants[variant] = q;
    }
    return order;
  }

  function addVariantQty(order, pid, variant, delta) {
    var item = getItem(order, pid);
    return setVariantQty(order, pid, variant, (item.variants[variant] || 0) + delta);
  }

  // Ô chọn: bật = 1, tắt = 0.
  function toggleVariantSelected(order, pid, variant) {
    var item = getItem(order, pid);
    return setVariantQty(order, pid, variant, item.variants[variant] ? 0 : 1);
  }

  function setExtra(order, pid, qty) {
    getItem(order, pid).extra = toQty(qty);
    return order;
  }

  function toggleExcluded(order, pid, variant) {
    var item = getItem(order, pid);
    var i = item.excluded.indexOf(variant);
    if (i >= 0) {
      item.excluded.splice(i, 1);
    } else {
      item.excluded.push(variant);
    }
    return order;
  }

  // Xoá một loại khỏi đơn (khi loại bị xoá khỏi danh mục).
  function removeVariant(order, pid, variant) {
    var item = getItem(order, pid);
    delete item.variants[variant];
    var i = item.excluded.indexOf(variant);
    if (i >= 0) item.excluded.splice(i, 1);
    return order;
  }

  // Tổng số lượng của sản phẩm (đơn vị gốc, không quy đổi).
  function productTotal(item) {
    var sum = item.extra || 0;
    Object.keys(item.variants).forEach(function (k) {
      sum += item.variants[k];
    });
    return sum;
  }

  // Tổng quy đổi ra balení.
  function productWeight(item, product) {
    var sum = item.extra || 0;
    Object.keys(item.variants).forEach(function (k) {
      sum += weightOf(product, k, item.variants[k]);
    });
    return sum;
  }

  function orderTotal(catalog, order) {
    var total = 0;
    catalog.forEach(function (p) {
      var item = order.items[String(p.id)];
      if (item) total += productWeight(item, p);
    });
    return total;
  }

  function productsSelected(catalog, order) {
    return catalog.filter(function (p) {
      var item = order.items[String(p.id)];
      return item && productTotal(item) > 0;
    }).length;
  }

  // Tạo đoạn text đúng format đơn gửi đi (tiếng Séc).
  function buildSummary(catalog, order) {
    var total = orderTotal(catalog, order);
    var lines = [];

    catalog.forEach(function (p) {
      var item = order.items[String(p.id)];
      if (!item || productTotal(item) === 0) return;

      var variants = p.variants || [];
      lines.push('* ' + p.id + '. ' + p.name + ' *');

      variants.forEach(function (v) {
        var q = item.variants[v];
        if (q) lines.push('  - ' + v + ': ' + q + ' ' + unitOf(p, v));
      });

      if (item.extra > 0) {
        var excl = variants.filter(function (v) {
          return item.excluded.indexOf(v) >= 0;
        });
        if (excl.length === 0) {
          lines.push('  => Všechny druhy navíc: ' + item.extra + ' ' + UNIT_DEFAULT);
        } else {
          lines.push(
            '  => Kromě druhů ' +
              excl.map(function (v) { return '"' + v + '"'; }).join(', ') +
              ', ostatní druhy navíc: ' + item.extra + ' ' + UNIT_DEFAULT
          );
        }
      }
    });

    var header = order.date + ' - Celkové množství: ' + total + ' ' + UNIT_DEFAULT;
    var text = header + '\n-----------------\n' + (lines.length ? '\n' + lines.join('\n') : '');
    return { text: text, total: total, productCount: productsSelected(catalog, order) };
  }

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function todayDMY(d) {
    d = d || new Date();
    return pad2(d.getDate()) + '.' + pad2(d.getMonth() + 1) + '.' + d.getFullYear();
  }

  // "2026-11-01" <-> "01.11.2026"
  function isoToDMY(iso) {
    var p = String(iso).split('-');
    return p[2] + '.' + p[1] + '.' + p[0];
  }

  function dmyToIso(dmy) {
    var p = String(dmy).split('.');
    return p[2] + '-' + p[1] + '-' + p[0];
  }

  // Lọc sản phẩm theo tên hoặc tên loại (không phân biệt dấu/hoa thường).
  function matchesSearch(product, query) {
    var q = normalize(query || '').trim();
    if (!q) return true;
    if (normalize(product.name).indexOf(q) >= 0) return true;
    return (product.variants || []).some(function (v) {
      return normalize(v).indexOf(q) >= 0;
    });
  }

  var api = {
    UNIT_DEFAULT: UNIT_DEFAULT,
    UNIT_SIZE: UNIT_SIZE,
    normalize: normalize,
    toQty: toQty,
    unitOf: unitOf,
    emptyOrder: emptyOrder,
    getItem: getItem,
    setVariantQty: setVariantQty,
    addVariantQty: addVariantQty,
    toggleVariantSelected: toggleVariantSelected,
    setExtra: setExtra,
    toggleExcluded: toggleExcluded,
    removeVariant: removeVariant,
    productTotal: productTotal,
    productWeight: productWeight,
    orderTotal: orderTotal,
    productsSelected: productsSelected,
    buildSummary: buildSummary,
    todayDMY: todayDMY,
    isoToDMY: isoToDMY,
    dmyToIso: dmyToIso,
    matchesSearch: matchesSearch
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.OrderLogic = api;
  }
})(typeof self !== 'undefined' ? self : (typeof globalThis !== 'undefined' ? globalThis : this));
