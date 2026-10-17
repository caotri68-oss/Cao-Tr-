/*
 * Cảnh 3D phía sau màn hình menu: hòn đảo nông trại nhỏ xoay chậm,
 * Mi vẫy tay, gà nhún nhảy, mây trôi.
 */
(function () {
  var M = Models;
  var scene = new THREE.Scene();
  var camera = Engine.makeCamera();
  Engine.addLights(scene);

  var island = new THREE.Group();
  scene.add(island);
  island.add(M.makeIsland(4.2));

  var barn = M.makeBarn();
  barn.position.set(-1.3, 0, -1.6);
  barn.rotation.y = 0.35;
  island.add(barn);

  var trees = [];
  [[2.3, -1.6, 1.1], [3.0, 0.4, 0.8], [-3.0, -0.2, 0.9], [1.0, -2.8, 0.7]].forEach(function (p) {
    var tr = M.makeTree(p[2]);
    tr.position.set(p[0], 0, p[1]);
    tr.userData.phase = Math.random() * 6;
    island.add(tr);
    trees.push(tr);
  });

  var fence = M.makeFence(3);
  fence.position.set(1.2, 0, 2.3);
  island.add(fence);

  var patch = M.makeSoilPatch(1.6, 1.1);
  patch.position.set(1.4, 0, 0.9);
  island.add(patch);
  var sprouts = [];
  for (var i = 0; i < 6; i++) {
    var sp = M.makeSprout();
    sp.position.set(1.4 - 0.5 + (i % 3) * 0.5, 0.1, 0.9 - 0.3 + Math.floor(i / 3) * 0.6);
    sp.userData.phase = i * 0.7;
    patch.parent.add(sp);
    sprouts.push(sp);
  }

  var flowerColors = [M.COLORS.flower1, M.COLORS.flower2, M.COLORS.flower3];
  for (var f = 0; f < 14; f++) {
    var a = Math.random() * Math.PI * 2, r = 2.6 + Math.random() * 1.2;
    var fl = M.makeFlower(flowerColors[f % 3]);
    fl.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
    island.add(fl);
  }

  var girl = M.makeGirl();
  girl.position.set(-0.3, 0, 1.2);
  girl.rotation.y = 0.2;
  island.add(girl);

  var chickens = [];
  [[0.6, 1.9], [-1.4, 0.6]].forEach(function (p, idx) {
    var c = M.makeChicken();
    c.position.set(p[0], 0, p[1]);
    c.userData.phase = idx * 1.3;
    c.userData.home = new THREE.Vector3(p[0], 0, p[1]);
    island.add(c);
    chickens.push(c);
  });

  var clouds = [];
  for (var k = 0; k < 4; k++) {
    var cl = M.makeCloud();
    cl.position.set(-8 + k * 5, 4 + (k % 2) * 1.2, -4 - (k % 3));
    cl.scale.setScalar(0.8 + (k % 2) * 0.5);
    scene.add(cl);
    clouds.push(cl);
  }

  function onResize(w, h) {
    camera.aspect = w / h;
    // Màn dọc: lùi camera xa hơn để thấy trọn hòn đảo
    var portrait = h > w;
    camera.fov = portrait ? 50 : 38;
    camera.position.set(0, portrait ? 7.5 : 6.5, portrait ? 13 : 11);
    camera.lookAt(0, portrait ? -0.6 : 0.4, 0);
    camera.updateProjectionMatrix();
  }

  function update(dt, time) {
    island.rotation.y += dt * 0.12;
    island.position.y = Math.sin(time * 0.8) * 0.12;

    // Mi vẫy tay
    girl.userData.arm.rotation.z = -2.4 + Math.sin(time * 8) * 0.45;
    girl.userData.head.rotation.z = Math.sin(time * 2) * 0.08;

    chickens.forEach(function (c) {
      var t = time * 2 + c.userData.phase;
      c.position.y = Math.max(0, Math.sin(t * 3)) * 0.18;
      c.userData.body.rotation.x = Math.sin(t * 6) * 0.1;
      c.position.x = c.userData.home.x + Math.sin(t * 0.5) * 0.4;
      c.rotation.y = Math.cos(t * 0.5) > 0 ? Math.PI / 2 : -Math.PI / 2;
    });

    trees.forEach(function (tr) {
      tr.rotation.z = Math.sin(time * 1.3 + tr.userData.phase) * 0.03;
    });
    sprouts.forEach(function (sp) {
      var s = 1 + Math.sin(time * 2 + sp.userData.phase) * 0.12;
      sp.scale.set(s, s, s);
    });
    clouds.forEach(function (cl) {
      cl.position.x += dt * 0.35;
      if (cl.position.x > 11) cl.position.x = -11;
    });
  }

  window.MenuScene = { scene: scene, camera: camera, update: update, onResize: onResize };
})();
