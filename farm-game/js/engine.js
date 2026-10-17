/*
 * Bộ máy 3D dùng chung: một renderer, một vòng lặp vẽ.
 * Mỗi "cảnh" (menu, màn chơi…) có scene + camera + update(dt).
 */
(function () {
  var canvas = document.getElementById("view3d");
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  var current = null;
  var clock = new THREE.Clock();
  var running = true;

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    if (current && current.onResize) current.onResize(w, h);
  }

  function frame() {
    requestAnimationFrame(frame);
    if (!running || !current) return;
    var dt = Math.min(clock.getDelta(), 0.05); // tránh "nhảy cóc" khi tab bị treo
    current.update(dt, clock.elapsedTime);
    renderer.render(current.scene, current.camera);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", function () { setTimeout(resize, 200); });
  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    clock.getDelta();
  });

  window.Engine = {
    renderer: renderer,
    setScene: function (s) {
      current = s;
      resize();
    },
    // Camera phối cảnh tự chỉnh để khung hình vừa cả màn dọc lẫn ngang
    makeCamera: function () {
      return new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200);
    },
    addLights: function (scene) {
      scene.add(new THREE.HemisphereLight(0xfff8ee, 0xb6d8a0, 1.6));
      var sun = new THREE.DirectionalLight(0xffffff, 1.6);
      sun.position.set(4, 8, 5);
      scene.add(sun);
    }
  };

  resize();
  frame();
})();
