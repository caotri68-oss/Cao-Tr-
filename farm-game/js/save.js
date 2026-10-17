/*
 * Lưu tiến trình tự động vào bộ nhớ trình duyệt (localStorage).
 * Mọi thứ cần nhớ nằm trong Save.data; gọi Save.write() sau khi đổi.
 */
(function () {
  var KEY = "grandmaFarm.save.v1";

  function defaults() {
    return {
      version: 1,
      lang: null,            // null = chưa chọn -> hiện màn chọn ngôn ngữ
      music: true,
      sound: true,
      vibrate: true,
      unlockedLevel: 1,      // màn cao nhất được chơi
      stars: {},             // { "1": 3, "2": 2, ... }
      best: {},              // điểm cao nhất mỗi màn
      coins: 0,
      owned: {},             // đồ đã mở khoá: { "carrot": true, ... }
      storySeen: {}          // đoạn truyện đã xem
    };
  }

  function load() {
    var d = defaults();
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        if (saved && typeof saved === "object") {
          for (var k in d) if (saved[k] !== undefined) d[k] = saved[k];
        }
      }
    } catch (e) { /* trình duyệt chặn bộ nhớ hoặc dữ liệu hỏng -> dùng mặc định */ }
    if (d.lang && window.LANGS.indexOf(d.lang) < 0) d.lang = null;
    return d;
  }

  window.Save = {
    data: load(),
    write: function () {
      try { localStorage.setItem(KEY, JSON.stringify(this.data)); } catch (e) {}
    },
    hasProgress: function () {
      return this.data.unlockedLevel > 1 || this.data.coins > 0 ||
        Object.keys(this.data.stars).length > 0;
    },
    reset: function () {
      // Giữ lại ngôn ngữ và cài đặt âm thanh, xoá phần chơi
      var keep = { lang: this.data.lang, music: this.data.music,
                   sound: this.data.sound, vibrate: this.data.vibrate };
      this.data = defaults();
      for (var k in keep) this.data[k] = keep[k];
      this.write();
    }
  };
})();
