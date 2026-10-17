/*
 * Giao diện 2D phủ trên cảnh 3D: chuyển màn hình, hộp thoại, thông báo.
 */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var confirmCb = null;
  var toastTimer = null;

  // Phản hồi khi bấm: rung nhẹ (âm thanh sẽ thêm ở giai đoạn 3)
  function feedback(ms) {
    if (Save.data.vibrate && navigator.vibrate) {
      try { navigator.vibrate(ms || 12); } catch (e) {}
    }
  }

  // Điền chữ theo ngôn ngữ đang chọn vào mọi phần tử có data-t="khoá"
  function applyTexts() {
    document.documentElement.lang = Save.data.lang || "vi";
    document.title = t("game.title");
    var els = document.querySelectorAll("[data-t]");
    for (var i = 0; i < els.length; i++) els[i].textContent = t(els[i].getAttribute("data-t"));
  }

  function buildLangList(container, onPick) {
    container.innerHTML = "";
    LANGS.forEach(function (code) {
      var b = document.createElement("button");
      b.className = "lang-btn" + (Save.data.lang === code ? " selected" : "");
      b.innerHTML = '<span class="flag flag-' + code + '"></span><span>' + I18N[code]["lang.name"] + "</span>";
      b.addEventListener("click", function () { feedback(); onPick(code); });
      container.appendChild(b);
    });
  }

  function showScreen(id) {
    var screens = document.querySelectorAll(".screen");
    for (var i = 0; i < screens.length; i++) screens[i].classList.toggle("active", screens[i].id === id);
  }

  function openModal(id) { $(id).classList.add("open"); }
  function closeModal(id) { $(id).classList.remove("open"); }
  function closeAllModals() {
    var ms = document.querySelectorAll(".modal.open");
    for (var i = 0; i < ms.length; i++) ms[i].classList.remove("open");
  }

  function toast(text) {
    var el = $("toast");
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  function askConfirm(title, text, cb) {
    $("confirm-title").textContent = title;
    $("confirm-text").textContent = text;
    confirmCb = cb;
    openModal("modal-confirm");
  }

  function refreshToggles() {
    var tg = document.querySelectorAll(".toggle");
    for (var i = 0; i < tg.length; i++) {
      var on = !!Save.data[tg[i].getAttribute("data-setting")];
      tg[i].classList.toggle("on", on);
      tg[i].textContent = on ? t("settings.on") : t("settings.off");
    }
  }

  function init() {
    // Đóng hộp thoại: nút "Đóng" hoặc chạm ra vùng tối bên ngoài
    document.querySelectorAll(".modal").forEach(function (m) {
      m.addEventListener("click", function (e) {
        if (e.target === m) { feedback(); m.classList.remove("open"); }
      });
    });
    document.querySelectorAll("[data-close]").forEach(function (b) {
      b.addEventListener("click", function () { feedback(); closeAllModals(); });
    });
    $("confirm-no").addEventListener("click", function () { feedback(); closeModal("modal-confirm"); confirmCb = null; });
    $("confirm-yes").addEventListener("click", function () {
      feedback(25);
      closeModal("modal-confirm");
      var cb = confirmCb; confirmCb = null;
      if (cb) cb();
    });
    document.querySelectorAll(".toggle").forEach(function (tg) {
      tg.addEventListener("click", function () {
        var key = tg.getAttribute("data-setting");
        Save.data[key] = !Save.data[key];
        Save.write();
        refreshToggles();
        feedback(20);
      });
    });
  }

  window.UI = {
    init: init, feedback: feedback, applyTexts: applyTexts, buildLangList: buildLangList,
    showScreen: showScreen, openModal: openModal, closeModal: closeModal, closeAllModals: closeAllModals,
    toast: toast, askConfirm: askConfirm, refreshToggles: refreshToggles
  };
})();
