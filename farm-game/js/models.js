/*
 * Mô hình 3D low-poly dựng hoàn toàn bằng code (không cần file hình).
 * Mỗi hàm make*() trả về một THREE.Group có thể đặt vào cảnh.
 */
(function () {
  var COLORS = {
    grass: 0x9be37d, grassDark: 0x7fcf66, soil: 0xb98a5e, soilDark: 0x8f6643,
    wood: 0xc98b5a, woodDark: 0x9b6a43, barn: 0xf08080, roof: 0xfff1e0,
    leaf: 0x6fd08c, leaf2: 0x8fe0a0, trunk: 0x9b6a43, white: 0xffffff,
    skin: 0xffd9b8, hair: 0x6b4226, dress: 0xff9ecb, cheek: 0xff8fa3,
    eye: 0x3a2a2a, beak: 0xffb347, comb: 0xff6b6b, cloud: 0xffffff,
    water: 0x8fd3ff, flower1: 0xffb3d1, flower2: 0xfff27a, flower3: 0xc6a8ff
  };

  var matCache = {};
  function mat(color) {
    if (!matCache[color]) {
      matCache[color] = new THREE.MeshLambertMaterial({ color: color, flatShading: true });
    }
    return matCache[color];
  }

  function mesh(geo, color, x, y, z) {
    var m = new THREE.Mesh(geo, mat(color));
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }

  // Bóng tròn mờ dưới chân (rẻ hơn bóng thật rất nhiều -> mượt trên điện thoại)
  var shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.12, depthWrite: false });
  var shadowGeo = new THREE.CircleGeometry(1, 16);
  function blobShadow(r) {
    var s = new THREE.Mesh(shadowGeo, shadowMat);
    s.rotation.x = -Math.PI / 2;
    s.scale.set(r, r, r);
    s.position.y = 0.02;
    return s;
  }

  function makeIsland(radius) {
    var g = new THREE.Group();
    var top = mesh(new THREE.CylinderGeometry(radius, radius * 0.96, 0.5, 9), COLORS.grass, 0, -0.25, 0);
    var dirt = mesh(new THREE.CylinderGeometry(radius * 0.96, radius * 0.55, 2.2, 9), COLORS.soil, 0, -1.6, 0);
    var tip = mesh(new THREE.ConeGeometry(radius * 0.55, 1.6, 9), COLORS.soilDark, 0, -3.5, 0);
    tip.rotation.x = Math.PI;
    g.add(top, dirt, tip);
    return g;
  }

  function makeTree(scale) {
    var g = new THREE.Group();
    g.add(mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.8, 6), COLORS.trunk, 0, 0.4, 0));
    var crown = mesh(new THREE.IcosahedronGeometry(0.6, 0), COLORS.leaf, 0, 1.15, 0);
    var crown2 = mesh(new THREE.IcosahedronGeometry(0.42, 0), COLORS.leaf2, 0.25, 1.55, 0.1);
    g.add(crown, crown2, blobShadow(0.55));
    g.scale.setScalar(scale || 1);
    g.userData.sway = crown;
    return g;
  }

  function makeBarn() {
    var g = new THREE.Group();
    g.add(mesh(new THREE.BoxGeometry(1.8, 1.2, 1.4), COLORS.barn, 0, 0.6, 0));
    // mái nhà hình chóp
    var roof = mesh(new THREE.ConeGeometry(1.42, 0.9, 4), COLORS.roof, 0, 1.65, 0);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(1, 1, 0.8);
    g.add(roof);
    g.add(mesh(new THREE.BoxGeometry(0.6, 0.8, 0.05), COLORS.white, 0, 0.4, 0.72));
    g.add(mesh(new THREE.BoxGeometry(0.5, 0.7, 0.06), COLORS.woodDark, 0, 0.38, 0.73));
        g.add(blobShadow(1.3));
    return g;
  }

  function makeFence(len) {
    var g = new THREE.Group();
    var posts = Math.max(2, Math.round(len / 0.5) + 1);
    for (var i = 0; i < posts; i++) {
      g.add(mesh(new THREE.BoxGeometry(0.1, 0.45, 0.1), COLORS.wood, -len / 2 + i * (len / (posts - 1)), 0.22, 0));
    }
    g.add(mesh(new THREE.BoxGeometry(len, 0.07, 0.05), COLORS.wood, 0, 0.32, 0));
    g.add(mesh(new THREE.BoxGeometry(len, 0.07, 0.05), COLORS.wood, 0, 0.14, 0));
    return g;
  }

  function makeCloud() {
    var g = new THREE.Group();
    var geo = new THREE.IcosahedronGeometry(0.5, 0);
    [[0, 0, 0, 1], [0.55, -0.05, 0, 0.8], [-0.55, -0.08, 0, 0.75], [0.2, 0.25, 0, 0.7]].forEach(function (p) {
      var m = mesh(geo, COLORS.cloud, p[0], p[1], p[2]);
      m.scale.setScalar(p[3]);
      g.add(m);
    });
    return g;
  }

  function makeFlower(color) {
    var g = new THREE.Group();
    g.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 4), COLORS.leaf, 0, 0.15, 0));
    g.add(mesh(new THREE.IcosahedronGeometry(0.09, 0), color, 0, 0.32, 0));
    g.add(mesh(new THREE.IcosahedronGeometry(0.04, 0), COLORS.flower2, 0, 0.34, 0.06));
    return g;
  }

  // Cô bé Mi — nhân vật chính. userData.arm dùng để vẫy tay.
  function makeGirl() {
    var g = new THREE.Group();
    g.add(mesh(new THREE.ConeGeometry(0.32, 0.6, 8), COLORS.dress, 0, 0.42, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.2, 5), COLORS.skin, -0.1, 0.08, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.2, 5), COLORS.skin, 0.1, 0.08, 0));
    var head = new THREE.Group();
    head.position.y = 0.95;
    head.add(mesh(new THREE.IcosahedronGeometry(0.27, 1), COLORS.skin, 0, 0, 0));
    var hair = mesh(new THREE.IcosahedronGeometry(0.29, 1), COLORS.hair, 0, 0.08, -0.09);
    hair.scale.set(1, 0.85, 0.95);
    head.add(hair);
    head.add(mesh(new THREE.IcosahedronGeometry(0.12, 0), COLORS.hair, -0.27, 0.12, -0.05));
    head.add(mesh(new THREE.IcosahedronGeometry(0.12, 0), COLORS.hair, 0.27, 0.12, -0.05));
    head.add(mesh(new THREE.SphereGeometry(0.035, 6, 4), COLORS.eye, -0.09, 0.0, 0.25));
    head.add(mesh(new THREE.SphereGeometry(0.035, 6, 4), COLORS.eye, 0.09, 0.0, 0.25));
    head.add(mesh(new THREE.SphereGeometry(0.045, 6, 4), COLORS.cheek, -0.16, -0.07, 0.2));
    head.add(mesh(new THREE.SphereGeometry(0.045, 6, 4), COLORS.cheek, 0.16, -0.07, 0.2));
    g.add(head);
    var armL = new THREE.Group();
    armL.position.set(-0.22, 0.62, 0);
    armL.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.32, 5), COLORS.skin, 0, -0.16, 0));
    armL.rotation.z = 0.3;
    var armR = new THREE.Group();
    armR.position.set(0.22, 0.62, 0);
    armR.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.32, 5), COLORS.skin, 0, -0.16, 0));
    armR.rotation.z = -0.3;
    g.add(armL, armR, blobShadow(0.35));
    g.userData.arm = armR;
    g.userData.head = head;
    return g;
  }

  function makeChicken() {
    var g = new THREE.Group();
    var body = new THREE.Group();
    body.add(mesh(new THREE.IcosahedronGeometry(0.25, 1), COLORS.white, 0, 0.28, 0));
    body.add(mesh(new THREE.IcosahedronGeometry(0.15, 1), COLORS.white, 0, 0.5, 0.12));
    body.add(mesh(new THREE.ConeGeometry(0.05, 0.12, 4), COLORS.beak, 0, 0.5, 0.29).rotateX(Math.PI / 2));
    body.add(mesh(new THREE.BoxGeometry(0.04, 0.1, 0.12), COLORS.comb, 0, 0.66, 0.1));
    body.add(mesh(new THREE.SphereGeometry(0.025, 5, 4), COLORS.eye, -0.08, 0.54, 0.22));
    body.add(mesh(new THREE.SphereGeometry(0.025, 5, 4), COLORS.eye, 0.08, 0.54, 0.22));
    var tail = mesh(new THREE.ConeGeometry(0.1, 0.2, 4), COLORS.white, 0, 0.4, -0.25);
    tail.rotation.x = -0.8;
    body.add(tail);
    g.add(body, blobShadow(0.25));
    g.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 4), COLORS.beak, -0.07, 0.05, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 4), COLORS.beak, 0.07, 0.05, 0));
    g.userData.body = body;
    return g;
  }

  function makeSoilPatch(w, d) {
    var g = new THREE.Group();
    g.add(mesh(new THREE.BoxGeometry(w, 0.12, d), COLORS.soil, 0, 0.04, 0));
    for (var i = 0; i < 3; i++) {
      g.add(mesh(new THREE.BoxGeometry(w * 0.9, 0.06, 0.08), COLORS.soilDark, 0, 0.11, -d / 3 + i * d / 3));
    }
    return g;
  }

  function makeSprout() {
    var g = new THREE.Group();
    g.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.18, 4), COLORS.leaf, 0, 0.09, 0));
    var l1 = mesh(new THREE.SphereGeometry(0.07, 5, 3), COLORS.leaf2, -0.06, 0.18, 0);
    l1.scale.set(1, 0.4, 0.6);
    var l2 = l1.clone();
    l2.position.x = 0.06;
    g.add(l1, l2);
    return g;
  }

  // Khách hàng: thân + đầu + tóc, tuỳ chọn mũ. opts: shirt, hair, skin, hat(0..2)
  function makeCustomer(o) {
    var g = new THREE.Group();
    var shirt = o.shirt, skin = o.skin || COLORS.skin, hair = o.hair;
    g.add(mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.6, 8), shirt, 0, 0.42, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 5), 0x6b5b95, -0.1, 0.08, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 5), 0x6b5b95, 0.1, 0.08, 0));
    var head = new THREE.Group();
    head.position.y = 0.97;
    head.add(mesh(new THREE.IcosahedronGeometry(0.27, 1), skin, 0, 0, 0));
    var h = mesh(new THREE.IcosahedronGeometry(0.29, 1), hair, 0, 0.09, -0.09);
    h.scale.set(1, 0.8, 0.95);
    head.add(h);
    head.add(mesh(new THREE.SphereGeometry(0.035, 6, 4), COLORS.eye, -0.09, 0.0, 0.25));
    head.add(mesh(new THREE.SphereGeometry(0.035, 6, 4), COLORS.eye, 0.09, 0.0, 0.25));
    head.add(mesh(new THREE.SphereGeometry(0.045, 6, 4), COLORS.cheek, -0.16, -0.07, 0.2));
    head.add(mesh(new THREE.SphereGeometry(0.045, 6, 4), COLORS.cheek, 0.16, -0.07, 0.2));
    if (o.hat === 1) { // mũ rơm
      head.add(mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.04, 10), 0xf3d58a, 0, 0.2, 0));
      head.add(mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.2, 8), 0xf3d58a, 0, 0.3, 0));
    } else if (o.hat === 2) { // mũ len
      head.add(mesh(new THREE.SphereGeometry(0.3, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), 0xff7a7a, 0, 0.12, 0));
      head.add(mesh(new THREE.SphereGeometry(0.07, 6, 4), 0xffffff, 0, 0.44, 0));
    }
    g.add(head);
    var armL = new THREE.Group();
    armL.position.set(-0.24, 0.62, 0);
    armL.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.3, 5), shirt, 0, -0.15, 0));
    armL.rotation.z = 0.25;
    var armR = new THREE.Group();
    armR.position.set(0.24, 0.62, 0);
    armR.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.3, 5), shirt, 0, -0.15, 0));
    armR.rotation.z = -0.25;
    g.add(armL, armR, blobShadow(0.35));
    g.userData.head = head; g.userData.arm = armR; g.userData.armL = armL;
    return g;
  }

  // Quầy hàng có mái che sọc màu
  function makeStall(width) {
    var g = new THREE.Group();
    g.add(mesh(new THREE.BoxGeometry(width, 0.9, 0.9), COLORS.wood, 0, 0.45, 0));
    g.add(mesh(new THREE.BoxGeometry(width + 0.1, 0.1, 1.1), COLORS.woodDark, 0, 0.93, 0.02));
    [-1, 1].forEach(function (sx) {
      g.add(mesh(new THREE.BoxGeometry(0.14, 2.3, 0.14), COLORS.woodDark, sx * (width / 2 - 0.1), 1.15, -0.35));
    });
    var n = 8, w = (width + 0.4) / n;
    for (var i = 0; i < n; i++) {
      var stripe = mesh(new THREE.BoxGeometry(w, 0.08, 1.7), i % 2 ? 0xffffff : 0xff8a8a, -width / 2 - 0.2 + w * (i + 0.5), 2.35, -0.05);
      stripe.rotation.x = 0.28;
      g.add(stripe);
    }
    // vài quả trưng bày trên quầy
    [-2.4, -1.9, 1.9, 2.4].forEach(function (x, i) {
      g.add(mesh(new THREE.IcosahedronGeometry(0.14, 0), i % 2 ? 0xff9a3c : 0xff5d5d, x, 1.1, 0.1));
    });
    g.add(blobShadow(width * 0.55));
    return g;
  }

  window.Models = {
    makeCustomer: makeCustomer, makeStall: makeStall,
    COLORS: COLORS, mat: mat, mesh: mesh, blobShadow: blobShadow,
    makeIsland: makeIsland, makeTree: makeTree, makeBarn: makeBarn,
    makeFence: makeFence, makeCloud: makeCloud, makeFlower: makeFlower,
    makeGirl: makeGirl, makeChicken: makeChicken, makeSoilPatch: makeSoilPatch,
    makeSprout: makeSprout
  };
})();
