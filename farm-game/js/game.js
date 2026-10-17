/*
 * Màn chơi: gieo hạt -> tưới -> thu hoạch -> giao đơn cho khách.
 * Một chạm = một hành động đúng ngữ cảnh (đất trống = gieo, đất khô = tưới, cây chín = hái).
 */
(function () {
  var M = Models, CR = Crops, I = Icons;
  var $ = function (id) { return document.getElementById(id); };

  var scene = new THREE.Scene();
  var camera = Engine.makeCamera();
  Engine.addLights(scene);
  Fx.init(scene);

  var raycaster = new THREE.Raycaster();
  var groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  var tmp = new THREE.Vector3();
  var camLook = new THREE.Vector3(0, 0, 0.9);

  var COLS = [-2.2, 0, 2.2];
  var ROWS = [0.3, 2.5];
  var SLOT_X = [-2.2, 0, 2.2];
  var SLOT_Z = -2.3;
  var CUST_S = 1.25;
  var SOIL_DRY = 0xb98a5e, SOIL_WET = 0x8a5f3c;

  var SHIRTS = [0x7fc8ff, 0xffd166, 0xc6a8ff, 0xff9ecb, 0x8fe0a0, 0xffa66b];
  var HAIRS = [0x3a2a2a, 0x6b4226, 0xd9a441, 0x9a9a9a, 0xb5522e];

  var level = null;
  var G = { state: "idle", time: 0, delivered: 0, earned: 0, inv: {}, selected: null,
            spawnT: 0, custCount: 0, endT: 0, win: false };
  var plots = [], customers = [];

  // ---------- Dựng thế giới (một lần) ----------
  var world = new THREE.Group();
  scene.add(world);

  var island = M.makeIsland(8.6);
  island.position.set(0, 0, 0.6);
  world.add(island);

  var stall = M.makeStall(7.6);
  stall.position.set(0, 0, -4.1);
  world.add(stall);

  [[-6.2, -2.2, 1.2], [6.3, -2.6, 1.1], [-6.8, 2.2, 1], [6.9, 1.6, 1.2], [-5.6, 5.2, 0.9],
   [5.8, 5.6, 1], [-4.2, -5.8, 0.9], [4.6, -5.6, 1]].forEach(function (p) {
    var tr = M.makeTree(p[2]);
    tr.position.set(p[0], 0, p[1]);
    world.add(tr);
  });

  var fence = M.makeFence(8);
  fence.position.set(0, 0, 6.4);
  world.add(fence);

  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  var flowerCols = [M.COLORS.flower1, M.COLORS.flower2, M.COLORS.flower3];
  for (var f = 0; f < 40; f++) {
    var fx = (rnd() - 0.5) * 15, fz = rnd() * 12 - 5;
    if (Math.abs(fx) < 3.7 && fz > -1.4 && fz < 4.2) continue;      // không mọc lên đất trồng
    if (fz < -1.4 && fz > -3.4) continue;                           // chừa chỗ khách đứng
    if (fx * fx + (fz - 0.6) * (fz - 0.6) > 60) continue;           // không rơi khỏi đảo
    var fl = M.makeFlower(flowerCols[f % 3]);
    fl.position.set(fx, 0, fz);
    world.add(fl);
  }

  var clouds = [];
  for (var c = 0; c < 3; c++) {
    var cl = M.makeCloud();
    cl.position.set(-10 + c * 9, 6 + c, -6 - c);
    cl.scale.setScalar(1 + c * 0.2);
    scene.add(cl);
    clouds.push(cl);
  }

  var hens = [];
  [[-3.4, 5.1], [3.6, 4.9]].forEach(function (p, i) {
    var h = M.makeChicken();
    h.position.set(p[0], 0, p[1]);
    h.userData.home = new THREE.Vector3(p[0], 0, p[1]);
    h.userData.phase = i * 2.1;
    world.add(h);
    hens.push(h);
  });

  var mi = M.makeGirl();
  mi.scale.setScalar(1.25);
  mi.position.set(0, 0, 4.4);
  world.add(mi);
  var miTarget = new THREE.Vector3(0, 0, 4.4);
  var miAct = 0;

  // ---------- Ô đất ----------
  var dropGeo = new THREE.ConeGeometry(0.15, 0.32, 8);
  var dropBall = new THREE.SphereGeometry(0.17, 8, 6);
  var dropMat = new THREE.MeshLambertMaterial({ color: 0x6ec1ff });
  var rimGeo = new THREE.BoxGeometry(1.86, 0.12, 0.1);
  var rimGeo2 = new THREE.BoxGeometry(0.1, 0.12, 1.86);
  var soilGeo = new THREE.BoxGeometry(1.7, 0.2, 1.7);

  function makePlot(x, z) {
    var g = new THREE.Group();
    g.position.set(x, 0, z);
    var soilMat = new THREE.MeshLambertMaterial({ color: SOIL_DRY, flatShading: true });
    var soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = 0.06;
    g.add(soil);
    [[0, 0.9, rimGeo], [0, -0.9, rimGeo], [0.9, 0, rimGeo2], [-0.9, 0, rimGeo2]].forEach(function (r) {
      g.add(M.mesh(r[2], M.COLORS.wood, r[0], 0.12, r[1]));
    });
    var holder = new THREE.Group();
    holder.position.y = 0.16;
    g.add(holder);
    var drop = new THREE.Group();
    var cone = new THREE.Mesh(dropGeo, dropMat); cone.position.y = 0.2;
    var ball = new THREE.Mesh(dropBall, dropMat);
    drop.add(cone, ball);
    drop.visible = false;
    drop.scale.setScalar(1.4);
    g.add(drop);
    world.add(g);
    return { x: x, z: z, group: g, holder: holder, soilMat: soilMat, drop: drop,
             state: "empty", crop: null, plant: null, growT: 0, pulse: 0, sparkT: 0 };
  }

  ROWS.forEach(function (z) { COLS.forEach(function (x) { plots.push(makePlot(x, z)); }); });

  // ---------- Camera ----------
  function onResize(w, h) {
    camera.aspect = w / h;
    camera.fov = 45;
    var tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    var portrait = h > w;
    var d = Math.max(8.0 / (2 * tan * camera.aspect), (portrait ? 12.5 : 13.5) / (2 * tan));
    var dir = tmp.set(0, 0.8, 0.6).normalize();
    camLook.set(0, 0, portrait ? 0.2 : -1.6);
    camera.position.copy(camLook).addScaledVector(dir, d);
    camera.lookAt(camLook);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
  }

  function project(x, y, z) {
    tmp.set(x, y, z).project(camera);
    return { x: (tmp.x * 0.5 + 0.5) * window.innerWidth, y: (-tmp.y * 0.5 + 0.5) * window.innerHeight };
  }

  function rectCenter(el) {
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  // ---------- Hành động trên ô đất ----------
  function setSoil(p, wet) { p.soilMat.color.setHex(wet ? SOIL_WET : SOIL_DRY); }

  function sow(p) {
    p.crop = G.selected;
    p.plant = CR.build(p.crop);
    p.plant.setGrow(0.05);
    p.plant.group.scale.setScalar(1.7);
    p.holder.add(p.plant.group);
    p.state = "dry";
    p.growT = 0;
    p.pulse = 1;
    Fx.burst({ x: p.x, y: 0.3, z: p.z }, { n: 8, color: [0x8a5f3c, 0xb98a5e], speed: 1.6, up: 3, size: 0.07, life: 0.5 });
    UI.feedback(15);
  }

  function water(p) {
    p.state = "grow";
    setSoil(p, true);
    p.pulse = 1;
    for (var i = 0; i < 3; i++) {
      Fx.burst({ x: p.x, y: 1.9 - i * 0.2, z: p.z }, { n: 4, color: [0x6ec1ff, 0xbfe6ff], speed: 0.5, up: -1, size: 0.07, life: 0.7, gravity: 6 });
    }
    Fx.burst({ x: p.x, y: 0.3, z: p.z }, { n: 8, color: [0x6ec1ff, 0xffffff], speed: 1.8, up: 2.5, size: 0.06, life: 0.5 });
    UI.feedback(15);
  }

  function harvest(p) {
    var crop = p.crop;
    G.inv[crop] = (G.inv[crop] || 0) + 1;
    Fx.burst({ x: p.x, y: 0.7, z: p.z }, { n: 14, color: [0xffe066, 0xffffff, 0xfff1a8], speed: 2.4, up: 4, size: 0.09, life: 0.8 });
    var from = project(p.x, 0.7, p.z);
    var slot = document.querySelector("#g-basket .bk-" + crop);
    Fx.fly(I[crop], from, rectCenter(slot), 520, function () {
      slot.classList.remove("bump"); void slot.offsetWidth; slot.classList.add("bump");
      renderBasket();
      renderCards();
    });
    p.holder.remove(p.plant.group);
    p.plant = null; p.crop = null; p.state = "empty"; p.growT = 0;
    setSoil(p, false);
    p.drop.visible = false;
    p.pulse = 1;
    UI.feedback(20);
  }

  function tapPlot(p) {
    if (G.state !== "play") return;
    miTarget.set(p.x, 0, p.z + 1.45);
    miAct = 0.4;
    if (p.state === "empty") sow(p);
    else if (p.state === "dry") water(p);
    else if (p.state === "ripe") harvest(p);
    else p.pulse = 0.7; // cây còn đang lớn: lắc nhẹ cho biết "chưa chín"
  }

  // ---------- Khách hàng & đơn hàng ----------
  function inv(c) { return G.inv[c] || 0; }
  function canFill(order) {
    for (var k in order) if (inv(k) < order[k]) return false;
    return true;
  }
  function unitsOf(order) { var n = 0; for (var k in order) n += order[k]; return n; }

  function makeOrder() {
    var cfg = level.cust, units;
    if (level.tutorial && G.custCount === 0) units = 1;
    else if (level.tutorial && G.custCount === 1) units = 2;
    else units = cfg.units[0] + Math.floor(Math.random() * (cfg.units[1] - cfg.units[0] + 1));
    var o = {};
    for (var i = 0; i < units; i++) {
      var crop = level.crops[Math.floor(Math.random() * level.crops.length)];
      o[crop] = (o[crop] || 0) + 1;
    }
    return o;
  }

  function freeSlot() {
    var used = {};
    customers.forEach(function (c) { used[c.slot] = true; });
    var order = [1, 0, 2];
    for (var i = 0; i < order.length; i++) if (!used[order[i]]) return order[i];
    return -1;
  }

  function spawnCustomer() {
    var slot = freeSlot();
    if (slot < 0) return;
    var n = G.custCount++;
    var group = M.makeCustomer({
      shirt: SHIRTS[n % SHIRTS.length], hair: HAIRS[(n * 2 + 1) % HAIRS.length],
      hat: n % 3 === 1 ? 1 : (n % 5 === 3 ? 2 : 0)
    });
    group.position.set(SLOT_X[slot], 4, SLOT_Z);
    group.scale.setScalar(0.3 * CUST_S);
    world.add(group);
    var card = document.createElement("button");
    card.className = "order-card";
    card.style.display = "none";
    $("g-orders").appendChild(card);
    var c = { slot: slot, group: group, order: makeOrder(), card: card, state: "drop", t: 0,
              maxP: level.cust.patience, patience: level.cust.patience, bar: null, ready: null };
    card.addEventListener("pointerdown", function (e) { e.stopPropagation(); e.preventDefault(); deliver(c); });
    customers.push(c);
    renderCard(c);
  }

  function renderCard(c) {
    var ready = canFill(c.order);
    var html = '<div class="oc-items">';
    for (var k in c.order) {
      var have = Math.min(inv(k), c.order[k]);
      html += '<div class="oc-item' + (have >= c.order[k] ? " ok" : "") + '">' + I[k] + "<b>" + have + "/" + c.order[k] + "</b></div>";
    }
    html += "</div>";
    if (c.maxP) html += '<div class="oc-bar"><i></i></div>';
    if (ready) html += '<div class="oc-go">' + I.check + "</div>";
    c.card.className = "order-card" + (ready ? " ready" : "");
    c.card.innerHTML = html;
    c.bar = c.card.querySelector(".oc-bar i");
    c.ready = ready;
  }

  function renderCards() { customers.forEach(function (c) { if (c.state === "wait") renderCard(c); }); }

  function removeCustomer(c) {
    world.remove(c.group);
    if (c.card.parentNode) c.card.parentNode.removeChild(c.card);
    customers.splice(customers.indexOf(c), 1);
  }

  function deliver(c) {
    if (G.state !== "play" || c.state !== "wait") return;
    if (!canFill(c.order)) {
      c.card.classList.remove("shake"); void c.card.offsetWidth; c.card.classList.add("shake");
      c.shake = 0.35;
      UI.feedback([30, 40, 30]);
      return;
    }
    var reward = 0;
    for (var k in c.order) { G.inv[k] -= c.order[k]; reward += CR.TABLE[k].price * c.order[k]; }
    var bonus = c.maxP ? Math.round(10 * c.patience / c.maxP) : 5;
    reward += bonus;
    G.earned += reward;
    G.delivered++;
    c.state = "happy"; c.t = 0;
    var pos = project(c.group.position.x, 2.2, SLOT_Z);
    Fx.floatText("+" + reward, pos.x, pos.y, "gain");
    Fx.fly(I.coin, pos, rectCenter($("g-coin-ico")), 650, function () {
      renderHud();
      var pill = $("g-coin-pill"); pill.classList.remove("bump"); void pill.offsetWidth; pill.classList.add("bump");
    });
    Fx.burst({ x: c.group.position.x, y: 1.8, z: SLOT_Z + 0.3 }, { n: 12, color: [0xff7aa8, 0xffd166, 0xffffff], speed: 2.2, up: 3.5, size: 0.1, life: 0.9 });
    c.card.style.display = "none";
    renderBasket();
    renderCards();
    renderHud();
    UI.feedback([20, 30, 40]);
    miAct = 0.5;
    if (G.delivered >= level.goal) finish(true);
  }

  function customerLeavesAngry(c) {
    c.state = "angry"; c.t = 0;
    c.card.style.display = "none";
    Fx.burst({ x: c.group.position.x, y: 1.8, z: SLOT_Z + 0.3 }, { n: 8, color: [0xb0b0b0, 0xe0e0e0], speed: 1.4, up: 2, size: 0.12, life: 0.7, gravity: 1 });
    UI.feedback(60);
  }

  // ---------- Hướng dẫn bằng hình ----------
  function tutorialStep() {
    if (!level.tutorial || G.delivered >= 2) return null;
    var live = customers.filter(function (c) { return c.state === "wait" || c.state === "drop"; });
    for (var i = 0; i < live.length; i++) if (live[i].state === "wait" && canFill(live[i].order)) return { key: "tut.deliver", card: live[i] };
    var p, ripe = null, dry = null, empty = null, growing = 0;
    for (i = 0; i < plots.length; i++) {
      p = plots[i];
      if (p.state === "ripe" && !ripe) ripe = p;
      else if (p.state === "dry" && !dry) dry = p;
      else if (p.state === "empty" && !empty) empty = p;
      else if (p.state === "grow") growing++;
    }
    if (ripe) return { key: "tut.harvest", plot: ripe };
    if (dry) return { key: "tut.water", plot: dry };
    var need = 0, have = 0;
    live.forEach(function (c) { need += unitsOf(c.order); });
    for (var k in G.inv) have += G.inv[k];
    if (!live.length) need = 1;
    if (need - have - growing > 0 && empty) return { key: "tut.sow", plot: empty };
    if (growing) return { key: "tut.wait" };
    return null;
  }

  function updateTutorial() {
    var step = tutorialStep();
    var cap = $("g-tut"), hand = $("g-hand");
    if (!step) { cap.classList.remove("show"); hand.classList.remove("show"); return; }
    var txt = t(step.key);
    if (cap.textContent !== txt) cap.textContent = txt;
    cap.classList.add("show");
    var pt = null;
    if (step.plot) pt = project(step.plot.x, 0.5, step.plot.z);
    else if (step.card && step.card.card.style.display !== "none") pt = rectCenter(step.card.card);
    if (pt) {
      hand.style.left = pt.x + "px";
      hand.style.top = pt.y + "px";
      hand.classList.add("show");
    } else hand.classList.remove("show");
  }

  // ---------- Giao diện trong màn ----------
  function renderHud() {
    $("g-time").textContent = Math.max(0, Math.ceil(G.time));
    $("g-timebar").style.width = Math.max(0, G.time / level.time * 100) + "%";
    $("g-timer").classList.toggle("hurry", G.time <= 10 && G.state === "play");
    $("g-coins").textContent = G.earned;
    var dots = "";
    if (level.goal <= 8) {
      for (var i = 0; i < level.goal; i++) dots += '<i class="' + (i < G.delivered ? "on" : "") + '"></i>';
    } else dots = "<b>" + G.delivered + "/" + level.goal + "</b>";
    $("g-goal").innerHTML = dots;
  }

  function renderSeeds() {
    var box = $("g-seeds");
    box.innerHTML = "";
    level.crops.forEach(function (id) {
      var b = document.createElement("button");
      b.className = "seed-btn" + (G.selected === id ? " sel" : "");
      b.innerHTML = I[id];
      b.setAttribute("aria-label", t("crop." + id));
      b.addEventListener("pointerdown", function (e) {
        e.stopPropagation(); e.preventDefault();
        G.selected = id; UI.feedback(); renderSeeds();
      });
      box.appendChild(b);
    });
  }

  function renderBasket() {
    var box = $("g-basket");
    box.innerHTML = '<span class="bk-ico">' + I.basket + "</span>";
    level.crops.forEach(function (id) {
      var d = document.createElement("div");
      d.className = "bk bk-" + id;
      d.innerHTML = I[id] + "<b>" + inv(id) + "</b>";
      box.appendChild(d);
    });
  }

  // ---------- Vào / ra màn ----------
  function start(n) {
    level = LEVELS[Math.min(n, LEVELS.length) - 1];
    customers.slice().forEach(removeCustomer);
    plots.forEach(function (p) {
      if (p.plant) p.holder.remove(p.plant.group);
      p.plant = null; p.crop = null; p.state = "empty"; p.growT = 0; p.pulse = 0;
      p.drop.visible = false; setSoil(p, false);
    });
    G = { state: "intro", time: level.time, delivered: 0, earned: 0, inv: {}, selected: level.crops[0],
          spawnT: level.cust.first, custCount: 0, endT: 0, win: false };
    $("g-orders").innerHTML = "";
    $("g-tut").classList.remove("show");
    $("g-hand").classList.remove("show");
    miTarget.set(0, 0, 4.4); mi.position.set(0, 0, 4.4);
    renderSeeds(); renderBasket(); renderHud();
    Engine.setScene(GameScene);
    UI.showScreen("screen-game");
    $("intro-title").textContent = t("menu.level", { n: level.id });
    $("intro-ico").innerHTML = I.basket;
    $("intro-goal").textContent = t("game.goal", { n: level.goal });
    UI.openModal("modal-intro");
  }

  function begin() {
    if (G.state !== "intro") return;
    UI.closeModal("modal-intro");
    G.state = "play";
  }

  function pause() {
    if (G.state !== "play") return;
    G.state = "paused";
    UI.openModal("modal-pause");
  }
  function resume() {
    if (G.state !== "paused") return;
    UI.closeModal("modal-pause");
    G.state = "play";
  }
  function quit() {
    UI.closeAllModals();
    G.state = "idle";
    customers.slice().forEach(removeCustomer);
    Engine.setScene(MenuScene);
    App.goMenu();
  }

  function finish(win) {
    if (G.state !== "play") return;
    G.state = "ending";
    G.win = win;
    G.endT = win ? 1.9 : 1;
    customers.forEach(function (c) { if (c.state === "wait") c.card.style.display = "none"; });
    $("g-tut").classList.remove("show");
    $("g-hand").classList.remove("show");
    if (win) { Fx.confetti(0, 0); G.fwT = 0; }
  }

  function showResult() {
    var win = G.win, id = level.id, d = Save.data;
    var timeBonus = win ? Math.ceil(G.time) * 2 : 0;
    var score = G.earned + timeBonus;
    var stars = win ? 1 + (score >= level.stars[0] ? 1 : 0) + (score >= level.stars[1] ? 1 : 0) : 0;
    var first = !(d.stars[id] > 0);
    var gain = G.earned + (win ? stars * 5 + (first ? level.reward : 0) : 0);
    var oldBest = d.best[id] || 0;
    var record = win && score > oldBest;
    if (win) {
      d.stars[id] = Math.max(d.stars[id] || 0, stars);
      if (record) d.best[id] = score;
      d.unlockedLevel = Math.max(d.unlockedLevel, Math.min(id + 1, LEVELS.length));
    }
    d.coins += gain;
    Save.write();

    $("res-title").textContent = t(win ? "result.win" : "result.lose");
    var st = "";
    for (var i = 0; i < 3; i++) st += '<span class="rs' + (i < stars ? " on" : "") + '" style="animation-delay:' + (0.3 + i * 0.35) + 's">' + I.star + "</span>";
    $("res-stars").innerHTML = st;
    $("res-score").textContent = score;
    $("res-coins").textContent = "+" + gain;
    $("res-record").style.display = record ? "" : "none";
    $("res-next").style.display = (win && id < LEVELS.length) ? "" : "none";
    $("modal-result").classList.toggle("win", win);
    UI.openModal("modal-result");
    renderHud();
  }

  // ---------- Vòng cập nhật ----------
  function bounceOut(k) {
    if (k < 1 / 2.75) return 7.5625 * k * k;
    if (k < 2 / 2.75) { k -= 1.5 / 2.75; return 7.5625 * k * k + 0.75; }
    if (k < 2.5 / 2.75) { k -= 2.25 / 2.75; return 7.5625 * k * k + 0.9375; }
    k -= 2.625 / 2.75; return 7.5625 * k * k + 0.984375;
  }

  function updatePlots(dt, time, live) {
    plots.forEach(function (p) {
      if (live && p.state === "grow") {
        p.growT += dt;
        var prog = Math.min(1, p.growT / CR.TABLE[p.crop].grow);
        p.plant.setGrow(0.05 + prog * 0.95);
        if (prog >= 1) {
          p.state = "ripe";
          p.pulse = 1;
          Fx.burst({ x: p.x, y: 0.6, z: p.z }, { n: 10, color: [0xffe066, 0xffffff], speed: 1.8, up: 3, size: 0.08, life: 0.7 });
          UI.feedback(10);
        }
      }
      p.drop.visible = p.state === "dry";
      if (p.drop.visible) p.drop.position.y = 1.15 + Math.sin(time * 4 + p.x) * 0.12;
      // nảy khi chạm
      if (p.pulse > 0) {
        p.pulse = Math.max(0, p.pulse - dt * 2.6);
        var s = 1 + Math.sin(p.pulse * 14) * 0.1 * p.pulse;
        p.group.scale.set(1, 2 - s, 1);
      } else p.group.scale.set(1, 1, 1);
      if (p.state === "ripe") {
        p.holder.position.y = 0.16 + Math.abs(Math.sin(time * 5 + p.x)) * 0.07;
        p.sparkT -= dt;
        if (p.sparkT <= 0) {
          p.sparkT = 0.9;
          Fx.burst({ x: p.x + (Math.random() - 0.5) * 0.8, y: 0.5, z: p.z + (Math.random() - 0.5) * 0.8 }, { n: 2, color: [0xffe066, 0xffffff], speed: 0.4, up: 1.6, size: 0.06, life: 0.7, gravity: 0 });
        }
      } else p.holder.position.y = 0.16;
    });
  }

  function updateMi(dt, time) {
    var dx = miTarget.x - mi.position.x, dz = miTarget.z - mi.position.z;
    var d = Math.sqrt(dx * dx + dz * dz);
    var arm = mi.userData.arm, head = mi.userData.head;
    if (d > 0.05) {
      var step = Math.min(d, 11 * dt);
      mi.position.x += dx / d * step;
      mi.position.z += dz / d * step;
      var want = Math.atan2(dx, dz);
      mi.rotation.y += Math.atan2(Math.sin(want - mi.rotation.y), Math.cos(want - mi.rotation.y)) * Math.min(1, dt * 14);
      mi.position.y = Math.abs(Math.sin(time * 18)) * 0.08;
      arm.rotation.z = -0.3 + Math.sin(time * 18) * 0.5;
    } else {
      mi.rotation.y += (0 - mi.rotation.y) * Math.min(1, dt * 8);
      mi.position.y = 0;
      arm.rotation.z = -0.3;
    }
    if (miAct > 0) {
      miAct -= dt;
      arm.rotation.z = -2.4 + Math.sin(miAct * 25) * 0.5;
      mi.position.y = Math.max(mi.position.y, Math.abs(Math.sin(miAct * 8)) * 0.18);
    }
    head.rotation.z = Math.sin(time * 2) * 0.06;
  }

  function updateCustomers(dt, time, live) {
    customers.slice().forEach(function (c) {
      var g = c.group, head = g.userData.head;
      c.t += dt;
      if (c.state === "drop") {
        var k = Math.min(1, c.t / 0.6);
        g.position.y = 4 * (1 - bounceOut(k));
        g.scale.setScalar((0.3 + 0.7 * k) * CUST_S);
        if (k >= 1) {
          c.state = "wait";
          c.card.style.display = "";
          renderCard(c);
          Fx.burst({ x: g.position.x, y: 0.2, z: SLOT_Z }, { n: 6, color: [0xffffff, 0xe8e8e8], speed: 1.2, up: 1, size: 0.08, life: 0.5, gravity: 2 });
        }
      } else if (c.state === "wait") {
        g.position.y = Math.abs(Math.sin(time * 2.4 + c.slot)) * 0.05;
        head.rotation.z = Math.sin(time * 1.7 + c.slot) * 0.07;
        g.userData.arm.rotation.z = c.ready ? -2.5 + Math.sin(time * 10) * 0.4 : -0.25; // vẫy tay khi đủ hàng
        if (c.shake > 0) { c.shake -= dt; g.rotation.y = Math.sin(c.shake * 50) * 0.3; } else g.rotation.y = 0;
        if (live && c.maxP) {
          c.patience -= dt;
          var fr = Math.max(0, c.patience / c.maxP);
          c.bar.style.width = fr * 100 + "%";
          c.bar.className = fr < 0.25 ? "low" : (fr < 0.55 ? "mid" : "");
          if (c.patience <= 0) customerLeavesAngry(c);
        }
        var pt = project(g.position.x, 2.75, SLOT_Z);
        c.card.style.transform = "translate(" + pt.x + "px," + pt.y + "px) translate(-50%,-100%)";
      } else if (c.state === "happy") {
        g.position.y = Math.abs(Math.sin(c.t * 10)) * 0.35;
        g.userData.arm.rotation.z = -2.6 + Math.sin(c.t * 16) * 0.4;
        if (c.t > 0.9) { c.state = "gone"; c.t = 0; }
      } else if (c.state === "angry") {
        g.rotation.y = Math.sin(c.t * 40) * 0.25;
        if (c.t > 0.7) { g.rotation.y = 0; c.state = "gone"; c.t = 0; }
      } else if (c.state === "gone") {
        var kk = Math.min(1, c.t / 0.3);
        g.scale.setScalar((1 - kk) * CUST_S);
        g.position.y += dt * 3;
        if (kk >= 1) removeCustomer(c);
      }
    });
  }

  function update(dt, time) {
    if (G.state === "paused") return;
    var live = G.state === "play";

    if (live) {
      G.time -= dt;
      if (G.time <= 0) { G.time = 0; renderHud(); finish(false); live = false; }
      else {
        renderHud();
        G.spawnT -= dt;
        var active = customers.length;
        if (!active && G.spawnT > 1.5) G.spawnT = 1.5;
        if (G.spawnT <= 0 && active < level.cust.max) {
          spawnCustomer();
          G.spawnT = level.cust.every * (0.8 + Math.random() * 0.4);
        }
      }
    }

    updatePlots(dt, time, live);
    updateMi(dt, time);
    updateCustomers(dt, time, live);
    if (G.state === "play" || G.state === "intro") updateTutorial();

    if (G.state === "ending") {
      G.endT -= dt;
      if (G.win) {
        G.fwT = (G.fwT || 0) - dt;
        if (G.fwT <= 0) {
          G.fwT = 0.28;
          Fx.firework({ x: (Math.random() - 0.5) * 7, y: 3 + Math.random() * 2.5, z: -1 + Math.random() * 4 });
        }
      }
      if (G.endT <= 0) { G.state = "result"; showResult(); }
    }

    hens.forEach(function (h) {
      var t = time * 2 + h.userData.phase;
      h.position.y = Math.max(0, Math.sin(t * 3)) * 0.12;
      h.position.x = h.userData.home.x + Math.sin(t * 0.4) * 0.6;
      h.rotation.y = Math.cos(t * 0.4) > 0 ? Math.PI / 2 : -Math.PI / 2;
    });
    clouds.forEach(function (cl) {
      cl.position.x += dt * 0.3;
      if (cl.position.x > 14) cl.position.x = -14;
    });
    Fx.update(dt);
  }

  // ---------- Điều khiển chạm ----------
  function pointToGround(cx, cy) {
    var ndc = new THREE.Vector2((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    return raycaster.ray.intersectPlane(groundPlane, new THREE.Vector3());
  }

  Engine.renderer.domElement.addEventListener("pointerdown", function (e) {
    if (G.state !== "play") return;
    var g = pointToGround(e.clientX, e.clientY);
    if (!g) return;
    for (var i = 0; i < plots.length; i++) {
      if (Math.abs(g.x - plots[i].x) < 1.15 && Math.abs(g.z - plots[i].z) < 1.15) { tapPlot(plots[i]); return; }
    }
    for (i = 0; i < customers.length; i++) {
      var c = customers[i];
      if (Math.abs(g.x - c.group.position.x) < 1.2 && Math.abs(g.z - SLOT_Z) < 1.3) { deliver(c); return; }
    }
  });

  $("g-pause").addEventListener("click", function () { UI.feedback(); pause(); });
  $("pause-resume").addEventListener("click", function () { UI.feedback(); resume(); });
  $("pause-quit").addEventListener("click", function () { UI.feedback(); quit(); });
  $("intro-start").addEventListener("click", function () { UI.feedback(25); begin(); });
  $("res-next").addEventListener("click", function () { UI.feedback(); UI.closeAllModals(); start(level.id + 1); });
  $("res-retry").addEventListener("click", function () { UI.feedback(); UI.closeAllModals(); start(level.id); });
  $("res-menu").addEventListener("click", function () { UI.feedback(); quit(); });
  document.addEventListener("visibilitychange", function () { if (document.hidden) pause(); });

  var GameScene = { scene: scene, camera: camera, update: update, onResize: onResize };

  window.Game = {
    start: start, quit: quit, pause: pause,
    // dùng để kiểm thử tự động
    _debug: { get G() { return G; }, plots: plots, customers: customers, tapPlot: tapPlot, deliver: deliver, proj: project, get level() { return level; } }
  };
})();
