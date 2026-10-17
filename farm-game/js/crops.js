/*
 * Cây trồng: bảng thông số + mô hình 3D lớn dần.
 * Thêm cây mới: thêm một dòng vào CROPS và một hàm build.
 */
(function () {
  var M = Models, COL = M.COLORS;

  var CROPS = {
    carrot: { id: "carrot", price: 10, grow: 5, hex: 0xff9a3c },
    tomato: { id: "tomato", price: 16, grow: 7, hex: 0xff5d5d }
  };

  var geo = {
    leaf: new THREE.ConeGeometry(0.06, 0.4, 4),
    root: new THREE.ConeGeometry(0.13, 0.42, 6),
    bush: new THREE.IcosahedronGeometry(0.3, 0),
    fruit: new THREE.IcosahedronGeometry(0.11, 1)
  };

  function buildCarrot() {
    var g = new THREE.Group();
    var leaves = new THREE.Group();
    for (var i = 0; i < 5; i++) {
      var pivot = new THREE.Group();
      pivot.rotation.y = i * (Math.PI * 2 / 5);
      var leaf = M.mesh(geo.leaf, i % 2 ? COL.leaf : COL.leaf2, 0.07, 0.2, 0);
      leaf.rotation.z = -0.4;
      pivot.add(leaf);
      leaves.add(pivot);
    }
    var root = M.mesh(geo.root, 0xff9a3c, 0, 0.05, 0);
    root.rotation.x = Math.PI;
    g.add(leaves, root);
    return {
      group: g,
      setGrow: function (p) {
        var s = 0.2 + 0.8 * p;
        leaves.scale.set(s, s, s);
        root.visible = p > 0.5;
        var r = 0.4 + 0.6 * p;
        root.scale.set(r, r, r);
        root.position.y = 0.04 + 0.1 * p;
      }
    };
  }

  function buildTomato() {
    var g = new THREE.Group();
    var bush = M.mesh(geo.bush, COL.leaf, 0, 0.28, 0);
    var bush2 = M.mesh(geo.bush, COL.leaf2, 0.14, 0.4, 0.05);
    bush2.scale.setScalar(0.7);
    var body = new THREE.Group();
    body.add(bush, bush2);
    var fruits = [];
    [[-0.2, 0.22, 0.2], [0.22, 0.3, 0.15], [0.02, 0.52, 0.22]].forEach(function (p) {
      var f = M.mesh(geo.fruit, 0xff5d5d, p[0], p[1], p[2]);
      f.visible = false;
      body.add(f);
      fruits.push(f);
    });
    g.add(body);
    return {
      group: g,
      setGrow: function (p) {
        var s = 0.2 + 0.8 * p;
        body.scale.set(s, s, s);
        var show = p > 0.85;
        for (var i = 0; i < fruits.length; i++) fruits[i].visible = show;
      }
    };
  }

  var builders = { carrot: buildCarrot, tomato: buildTomato };

  window.Crops = {
    TABLE: CROPS,
    build: function (id) { return builders[id](); }
  };
})();
