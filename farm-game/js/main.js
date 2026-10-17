/*
 * Điểm khởi động game: nối các màn hình với nhau.
 */
(function () {
  var $ = function (id) { return document.getElementById(id); };

  function totalStars() {
    var s = 0;
    for (var k in Save.data.stars) s += Save.data.stars[k];
    return s;
  }

  function refreshMenu() {
    var cont = Save.hasProgress();
    $("btn-play-label").textContent = cont ? t("menu.continue") : t("menu.play");
    $("btn-new").style.display = cont ? "" : "none";
    $("menu-level").textContent = cont ? t("menu.level", { n: Save.data.unlockedLevel }) : "";
    $("menu-stars").textContent = totalStars();
    $("menu-coins").textContent = Save.data.coins;
  }

  function setLang(code) {
    Save.data.lang = code;
    Save.write();
    UI.applyTexts();
    UI.refreshToggles();
    UI.buildLangList($("lang-list-settings"), setLang);
    refreshMenu();
  }

  function goMenu() {
    refreshMenu();
    UI.showScreen("screen-menu");
  }

  function renderRecords() {
    var list = $("records-list");
    list.innerHTML = "";
    var keys = Object.keys(Save.data.best).sort(function (a, b) { return a - b; });
    if (!keys.length) {
      list.innerHTML = '<div class="records-empty"></div>';
      list.firstChild.textContent = t("records.empty");
      return;
    }
    keys.forEach(function (k) {
      var row = document.createElement("div");
      row.className = "record-row";
      var stars = "★★★".slice(0, Save.data.stars[k] || 0) + "☆☆☆".slice(Save.data.stars[k] || 0);
      row.innerHTML = "<span></span><span></span>";
      row.children[0].textContent = t("menu.level", { n: k }) + "  " + stars;
      row.children[1].textContent = Save.data.best[k];
      list.appendChild(row);
    });
  }

  window.App = { goMenu: goMenu };

  function start() {
    UI.init();
    UI.applyTexts();
    UI.refreshToggles();
    Engine.setScene(MenuScene);

    UI.buildLangList($("lang-list-start"), function (code) {
      setLang(code);
      goMenu();
    });
    UI.buildLangList($("lang-list-settings"), setLang);

    $("btn-play").addEventListener("click", function () {
      UI.feedback(20);
      Game.start(Save.data.unlockedLevel);
    });
    $("btn-new").addEventListener("click", function () {
      UI.feedback();
      UI.askConfirm(t("confirm.reset.title"), t("confirm.reset.text"), function () {
        Save.reset();
        refreshMenu();
        UI.toast(t("toast.reset"));
      });
    });
    $("btn-settings").addEventListener("click", function () { UI.feedback(); UI.openModal("modal-settings"); });
    $("btn-records").addEventListener("click", function () {
      UI.feedback();
      renderRecords();
      UI.openModal("modal-records");
    });

    if (Save.data.lang) goMenu();
    else UI.showScreen("screen-lang");

    // Chặn menu chuột phải / giữ lâu trên điện thoại
    document.addEventListener("contextmenu", function (e) { e.preventDefault(); });

    setTimeout(function () { $("loading").classList.add("hide"); }, 150);
  }

  start();
})();
