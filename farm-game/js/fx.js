/*
 * Hiệu ứng: hạt 3D (lấp lánh, nước, pháo hoa, pháo giấy) và hiệu ứng chữ/xu bay trên giao diện.
 */
(function () {
  var N = 220, pool = [], cursor = 0, scene = null;
  var geo = new THREE.IcosahedronGeometry(1, 0);
  var PARTY = [0xff6b6b, 0xffd166, 0x6ee7a0, 0x6ec1ff, 0xc6a8ff, 0xff9ecb];

  function init(sc) {
    scene = sc;
    for (var i = 0; i < N; i++) {
      var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      m.visible = false;
      m.userData = { v: new THREE.Vector3(), life: 0, max: 1, g: 0, s: 1 };
      sc.add(m);
      pool.push(m);
    }
  }

  function emit(x, y, z, vx, vy, vz, o) {
    var m = pool[cursor];
    cursor = (cursor + 1) % N;
    var u = m.userData;
    m.position.set(x, y, z);
    u.v.set(vx, vy, vz);
    u.g = o.gravity === undefined ? 9 : o.gravity;
    u.max = u.life = o.life || 0.7;
    u.s = o.size || 0.09;
    m.material.color.setHex(o.color);
    m.scale.setScalar(u.s);
    m.visible = true;
  }

  function pick(c) { return Array.isArray(c) ? c[(Math.random() * c.length) | 0] : c; }

  // Bắn hạt toả ra từ một điểm
  function burst(pos, o) {
    var n = o.n || 10, sp = o.speed || 3;
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2;
      var r = (0.4 + Math.random() * 0.6) * sp;
      emit(pos.x, pos.y, pos.z, Math.cos(a) * r, (o.up === undefined ? 3 : o.up) * (0.5 + Math.random()), Math.sin(a) * r,
        { color: pick(o.color), size: o.size, life: o.life, gravity: o.gravity });
    }
  }

  function firework(pos, color) {
    var n = 26;
    for (var i = 0; i < n; i++) {
      var th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = 3 + Math.random() * 2;
      emit(pos.x, pos.y, pos.z, Math.sin(ph) * Math.cos(th) * r, Math.cos(ph) * r, Math.sin(ph) * Math.sin(th) * r,
        { color: pick(color || PARTY), size: 0.13, life: 1.1, gravity: 3 });
    }
  }

  function confetti(cx, cz) {
    for (var i = 0; i < 50; i++) {
      emit(cx + (Math.random() - 0.5) * 8, 7 + Math.random() * 3, cz + (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 1.5, -1 - Math.random() * 2, (Math.random() - 0.5) * 1.5,
        { color: pick(PARTY), size: 0.12, life: 2.2, gravity: 0.8 });
    }
  }

  function update(dt) {
    for (var i = 0; i < N; i++) {
      var m = pool[i];
      if (!m.visible) continue;
      var u = m.userData;
      u.life -= dt;
      if (u.life <= 0) { m.visible = false; continue; }
      u.v.y -= u.g * dt;
      m.position.addScaledVector(u.v, dt);
      m.scale.setScalar(u.s * Math.min(1, u.life / u.max * 1.6));
    }
  }

  function layer() { return document.getElementById("fx-layer"); }

  // Chữ nổi lên rồi mờ dần ("+10")
  function floatText(text, x, y, cls) {
    var d = document.createElement("div");
    d.className = "float-text " + (cls || "");
    d.textContent = text;
    d.style.left = x + "px";
    d.style.top = y + "px";
    layer().appendChild(d);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 950);
  }

  // Biểu tượng bay từ điểm này sang điểm khác (xu bay lên bảng tiền, cà rốt bay vào giỏ)
  function fly(html, from, to, ms, cb) {
    var d = document.createElement("div");
    d.className = "fly";
    d.innerHTML = html;
    d.style.transform = "translate(" + from.x + "px," + from.y + "px) scale(1.1)";
    layer().appendChild(d);
    d.getBoundingClientRect(); // ép trình duyệt tính vị trí đầu trước khi chạy hiệu ứng
    d.style.transition = "transform " + ms + "ms cubic-bezier(.45,0,.75,.45), opacity " + ms + "ms";
    d.style.transform = "translate(" + to.x + "px," + to.y + "px) scale(.6)";
    setTimeout(function () {
      if (d.parentNode) d.parentNode.removeChild(d);
      if (cb) cb();
    }, ms);
  }

  window.Fx = { init: init, burst: burst, firework: firework, confetti: confetti, update: update, floatText: floatText, fly: fly, PARTY: PARTY };
})();
