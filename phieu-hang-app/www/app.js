(function () {
  'use strict';
  var P = window.PhieuParse;
  var $ = function (id) { return document.getElementById(id); };
  var rows = [], editMode = false, onlyWarn = false;
  var MODELS = { claude: 'claude-sonnet-5-5', gemini: 'gemini-2.5-flash' };

  // --- lưu cài đặt trên máy (localStorage của WebView) ---
  function store(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }

  $('provider').value = load('ps_provider') || 'claude';
  $('apikey').value = load('ps_key_' + $('provider').value);
  if (!$('apikey').value) $('settings').hidden = false;

  $('settingsBtn').onclick = function () { $('settings').hidden = !$('settings').hidden; };
  $('provider').onchange = function () { $('apikey').value = load('ps_key_' + this.value); };
  $('saveKey').onclick = function () {
    store('ps_provider', $('provider').value);
    store('ps_key_' + $('provider').value, $('apikey').value.trim() || null);
    setStatus('Đã lưu cài đặt.');
    $('settings').hidden = true;
  };
  $('clearKey').onclick = function () {
    store('ps_key_' + $('provider').value, null);
    $('apikey').value = '';
    setStatus('Đã xoá key.');
  };

  function setStatus(msg, isErr) {
    var s = $('status'); s.textContent = msg || ''; s.className = isErr ? 'err' : '';
    if (msg) $('shot').classList.add('on');
  }
  function setBusy(b) { $('progress').hidden = !b; }

  // --- xử lý ảnh: thu nhỏ để gửi nhanh, vẫn đủ nét để đọc chữ nhỏ ---
  function loadImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () { resolve({ img: img, url: url }); };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('Không mở được ảnh này.')); };
      img.src = url;
    });
  }
  function toJpegBase64(img, maxSide) {
    var w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, maxSide / Math.max(w, h));
    var c = document.createElement('canvas'); c.width = Math.round(w * k); c.height = Math.round(h * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', 0.9).split(',')[1];
  }

  var PROMPT =
    'Ảnh là một phiếu hàng có bảng với các cột: Pol., Kód, Název zboží (và các cột khác). ' +
    'Hãy đọc MỌI dòng của bảng, từ trên xuống dưới, và trả về DUY NHẤT một mảng JSON, không thêm chữ nào khác. ' +
    'Mỗi phần tử có đúng 3 trường: "pol" (số thứ tự ở cột Pol.), ' +
    '"kod" (toàn bộ nội dung cột Kód đúng như in, nối các dòng bị ngắt thành một chuỗi, giữ cả phần chữ ở đầu), ' +
    '"nazev" (toàn bộ tên hàng ở cột Název zboží đúng như in, nối các dòng bị ngắt, giữ nguyên dấu tiếng Séc và lỗi chính tả nếu có). ' +
    'Bỏ qua các cột khác và phần tiêu đề phía trên bảng. ' +
    'Không tự đoán: nếu một ký tự không đọc được, thay bằng "?".';

  function apiError(res, body) {
    var m = '';
    try { var j = JSON.parse(body); m = (j.error && (j.error.message || j.error)) || ''; } catch (e) {}
    if (res.status === 401 || res.status === 403) return 'API key không đúng hoặc không có quyền (' + res.status + '). ' + m;
    if (res.status === 429) return 'Đã vượt giới hạn dùng của key (429). Thử lại sau ít phút. ' + m;
    return 'Lỗi từ dịch vụ (' + res.status + '). ' + m;
  }

  function askClaude(key, b64) {
    return fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: MODELS.claude,
        max_tokens: 8000,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: b64 } },
          { type: 'text', text: PROMPT }
        ] }]
      })
    }).then(function (res) {
      return res.text().then(function (t) {
        if (!res.ok) throw new Error(apiError(res, t));
        var j = JSON.parse(t);
        return (j.content || []).map(function (b) { return b.text || ''; }).join('');
      });
    });
  }

  function askGemini(key, b64) {
    var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + MODELS.gemini + ':generateContent?key=' + encodeURIComponent(key);
    return fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ inlineData: { mimeType: 'image/jpeg', data: b64 } }, { text: PROMPT }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0 }
      })
    }).then(function (res) {
      return res.text().then(function (t) {
        if (!res.ok) throw new Error(apiError(res, t));
        var j = JSON.parse(t);
        var parts = (((j.candidates || [])[0] || {}).content || {}).parts || [];
        return parts.map(function (p) { return p.text || ''; }).join('');
      });
    });
  }

  var busy = false;
  function handleFile(file) {
    if (!file || busy) return;
    var provider = $('provider').value, key = load('ps_key_' + provider);
    if (!key) { $('settings').hidden = false; setStatus('Hãy dán API key và bấm Lưu trước.', true); return; }
    busy = true; setBusy(true); setStatus('Đang đọc ảnh, thường mất 10–30 giây…');
    loadImage(file).then(function (r) {
      $('preview').src = r.url;
      return (provider === 'gemini' ? askGemini : askClaude)(key, toJpegBase64(r.img, 2000));
    }).then(function (text) {
      var added = P.toRows(P.parseModelJson(text));
      if (!added.length) throw new Error('Không đọc được dòng nào. Thử chụp lại gần và thẳng hơn.');
      rows = rows.concat(added); render();
      var warn = added.filter(function (r) { return P.status(r.kod) !== 'ok'; }).length;
      setStatus('Đã thêm ' + added.length + ' dòng.' + (warn ? ' ' + warn + ' mã cần kiểm tra lại.' : ' Tất cả mã khớp EAN.'));
    }).catch(function (e) {
      var m = (e && e.message) || String(e);
      if (/Failed to fetch|NetworkError|Load failed/i.test(m)) m = 'Không kết nối được. Kiểm tra mạng rồi thử lại.';
      setStatus(m, true);
    }).then(function () { busy = false; setBusy(false); $('cam').value = ''; $('pick').value = ''; });
  }
  $('cam').onchange = function () { handleFile(this.files[0]); };
  $('pick').onchange = function () { handleFile(this.files[0]); };

  // --- tìm ảnh sản phẩm ---
  function imageSearchUrl(r, withName) {
    var q = withName ? [r.kod, r.nazev].join(' ').trim() : (r.kod || r.nazev || '');
    return 'https://www.google.com/search?udm=2&q=' + encodeURIComponent(q);
  }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function showLookup(r) {
    var box = $('lookup'); box.textContent = ''; box.hidden = false;
    box.appendChild(el('div', 'cap', 'Tìm ảnh sản phẩm'));
    box.appendChild(el('div', 'lk-title', r.kod || r.nazev));
    if (r.nazev) box.appendChild(el('div', 'hint', r.nazev));
    var row = el('div', 'row');
    function link(label, href) {
      var a = el('a', 'btn', label); a.href = href; a.target = '_blank'; a.rel = 'noopener'; row.appendChild(a);
    }
    link('Google ảnh (mã)', imageSearchUrl(r, false));
    if (r.kod && r.nazev) link('Google ảnh (mã + tên)', imageSearchUrl(r, true));
    link('Bing ảnh', 'https://www.bing.com/images/search?q=' + encodeURIComponent(r.kod || r.nazev));
    if (r.kod) {
      var c = el('button', null, 'Sao chép mã'); c.type = 'button';
      c.onclick = function () { copy(r.kod, 'Đã sao chép mã ' + r.kod + '.'); }; row.appendChild(c);
    }
    var x = el('button', null, 'Đóng'); x.type = 'button'; x.onclick = function () { box.hidden = true; }; row.appendChild(x);
    box.appendChild(row);
  }

  // --- danh sách kết quả ---
  var CHIP = { ok: ['ok', 'Khớp EAN'], check: ['warn', 'Sai số kiểm tra'], len: ['warn', 'Không đủ 13 số'], bad: ['bad', 'Có ký tự lạ'], empty: ['bad', 'Chưa có mã'] };

  function itemView(r) {
    var st = P.status(r.kod);
    var li = el('li', 'item' + (st === 'ok' ? '' : (st === 'check' || st === 'len' ? ' warn' : ' bad')));
    if (editMode) {
      li.classList.add('edit');
      li.appendChild(textInput(r, 'pol', 'Số thứ tự'));
      var kod = textInput(r, 'kod', 'Mã'); kod.inputMode = 'numeric'; li.appendChild(kod);
      var nm = textInput(r, 'nazev', 'Tên hàng'); nm.className = 'nm'; var w = el('div', 'full'); w.appendChild(nm); li.appendChild(w);
      var foot = el('div', 'foot full'); foot.appendChild(el('span', 'chip ' + CHIP[st][0], CHIP[st][1]));
      var d = el('button', 'del', 'Xoá dòng'); d.type = 'button';
      d.onclick = function () { rows.splice(rows.indexOf(r), 1); render(); }; foot.appendChild(d); li.appendChild(foot);
      return li;
    }
    var l1 = el('div', 'l1'), canLook = !!(r.kod || r.nazev);
    var p = el(canLook ? 'a' : 'span', 'pol', r.pol || '—');
    var k = el(canLook ? 'a' : 'span', 'kod', r.kod || '—');
    if (canLook) [p, k].forEach(function (a) {
      a.href = imageSearchUrl(r, false); a.target = '_blank'; a.rel = 'noopener'; a.title = 'Tìm ảnh trên Google: ' + (r.kod || r.nazev);
      a.addEventListener('click', function (ev) { ev.preventDefault(); showLookup(r); });
    });
    l1.appendChild(p); l1.appendChild(k); l1.appendChild(el('span', 'chip ' + CHIP[st][0], CHIP[st][1]));
    li.appendChild(l1); li.appendChild(el('div', 'name', r.nazev));
    return li;
  }
  function textInput(r, field, label) {
    var inp = document.createElement('input'); inp.type = 'text'; inp.value = r[field]; inp.setAttribute('aria-label', label);
    inp.onchange = function () { r[field] = field === 'kod' ? inp.value.replace(/[^0-9]/g, '') : inp.value.trim(); render(); };
    return inp;
  }

  function render() {
    var list = $('rows'); list.textContent = '';
    var any = rows.length > 0;
    var warnN = rows.filter(function (r) { return P.status(r.kod) !== 'ok'; }).length;
    if (!warnN) onlyWarn = false;
    rows.forEach(function (r) { if (!onlyWarn || P.status(r.kod) !== 'ok') list.appendChild(itemView(r)); });

    var chips = $('chips'); chips.textContent = ''; chips.hidden = !any;
    if (any) {
      chips.appendChild(el('span', 'chip', rows.length + ' dòng'));
      if (rows.length - warnN) chips.appendChild(el('span', 'chip ok', (rows.length - warnN) + ' khớp EAN'));
      if (warnN) {
        var b = el('button', 'chip warn', warnN + ' cần kiểm tra' + (onlyWarn ? ' · đang lọc' : '')); b.type = 'button';
        b.setAttribute('aria-pressed', onlyWarn); b.title = 'Chỉ hiện các dòng cần kiểm tra';
        b.onclick = function () { onlyWarn = !onlyWarn; render(); }; chips.appendChild(b);
      }
    }
    $('empty').hidden = any; $('bar').hidden = !any; $('tip').hidden = !any || editMode; $('xl').hidden = !any;
    $('firstHint').hidden = any;
    $('editMode').disabled = !any; $('clearAll').disabled = !any;
    if (!any || editMode) $('lookup').hidden = true;

    // ba bước: Chụp -> Kiểm tra -> Sao chép
    var now = !any ? 1 : (warnN ? 2 : 3);
    [].forEach.call($('steps').children, function (li) {
      var n = Number(li.getAttribute('data-s'));
      li.className = n === now ? 'now' : (n < now ? 'done' : '');
      li.querySelector('b').textContent = n < now ? '✓' : String(n);
    });
  }

  $('editMode').onclick = function () {
    editMode = !editMode; this.classList.toggle('on', editMode); this.setAttribute('aria-pressed', editMode);
    $('editLbl').textContent = editMode ? 'Xong' : 'Sửa'; render();
  };
  $('clearAll').onclick = function () {
    // Không dùng confirm(): WebView có thể không hiện hộp thoại. Bấm lần hai để xác nhận.
    var b = this;
    if (b.getAttribute('data-arm') === '1') { rows = []; b.removeAttribute('data-arm'); b.textContent = 'Xoá hết'; render(); setStatus(''); return; }
    b.setAttribute('data-arm', '1'); b.textContent = 'Bấm lại để xoá';
    setTimeout(function () { b.removeAttribute('data-arm'); b.textContent = 'Xoá hết'; }, 3000);
  };

  // --- xuất kết quả ---
  function copy(text, okMsg) {
    var done = function () { setStatus(okMsg); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else fallback();
    function fallback() {
      var t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (e) { setStatus('Không sao chép được, hãy chọn và sao chép thủ công.', true); }
      document.body.removeChild(t);
    }
  }
  $('copyAll').onclick = function () {
    copy(rows.map(function (r) { return [r.pol, r.kod, r.nazev].join('\t'); }).join('\n'), 'Đã sao chép cả bảng, dán được vào Excel hoặc Sheets.');
  };
  $('copyKod').onclick = function () { copy(rows.map(function (r) { return r.kod; }).join('\n'), 'Đã sao chép cột Kód.'); };
  $('copyName').onclick = function () { copy(rows.map(function (r) { return r.nazev; }).join('\n'), 'Đã sao chép cột Název.'); };

  // Trên Android: ghi file vào thư mục cache rồi mở hộp chia sẻ hệ thống (Drive, Gmail, Files...).
  // Ngoài app (trình duyệt): tải xuống bình thường.
  function csvText() {
    function q(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }
    // ="..." để Excel giữ mã 13 số dạng chữ, không đổi sang số khoa học.
    var lines = ['Pol.;Kód;Název zboží'].concat(rows.map(function (r) {
      return [q(r.pol), '="' + r.kod + '"', q(r.nazev)].join(';');
    }));
    return '﻿' + lines.join('\r\n');
  }
  function saveCsv(name, text) {
    var cap = window.Capacitor;
    if (cap && cap.isNativePlatform && cap.isNativePlatform() && cap.Plugins && cap.Plugins.Filesystem && cap.Plugins.Share) {
      var FS = cap.Plugins.Filesystem, SH = cap.Plugins.Share;
      return FS.writeFile({ path: name, data: btoa(unescape(encodeURIComponent(text))), directory: 'CACHE', recursive: true })
        .then(function (res) {
          return SH.share({ title: name, text: name, files: [res.uri], dialogTitle: 'Lưu hoặc gửi CSV' });
        })
        .then(function () { setStatus('Đã xuất CSV.'); });
    }
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' })); a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    setStatus('Đã tải CSV.');
    return Promise.resolve();
  }
  $('csv').onclick = function () {
    if (!rows.length) return;
    var name = 'phieu-hang-' + new Date().toISOString().slice(0, 10) + '.csv';
    saveCsv(name, csvText()).catch(function (e) {
      var m = (e && e.message) || '';
      if (/cancel/i.test(m)) return;
      setStatus('Không xuất được CSV: ' + m, true);
    });
  };

  render();
})();
