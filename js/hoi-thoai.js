// Hội thoại ở chợ cho các màn có câu mới (màn 2 đến 12). Mỗi màn có 3 đoạn, mỗi đoạn dùng cho một vòng.
//
// Mỗi lượt (turn):
//   { loai: 'noi',  ai: 'co'|'ban'|'nguoi', cz, moi }      nhân vật nói; moi = câu mới → hiện phiên âm, nghĩa, nút đọc theo
//   { loai: 'chon', canh, tuyChon[], dung, nhac }          người chơi chọn câu đáp
//   { loai: 'mau',  cz, giai }                             thẻ mẫu câu có chỗ trống "…"
//   { loai: 'on' }                                         ôn lại một câu cũ (nghe rồi chọn nghĩa)
// Câu có "…" hoặc hai dạng nam / nữ được điền theo người đang chơi: bố là nam; mẹ, Xu Xu, Win Win là nữ.
window.PK = window.PK || {};

(function () {
  const chuan = function (s) { return PK.duLieu.chuan(s); };
  const tron = function (a) { return PK.ui.tron(a); };

  // Đăng ký một câu ghép từ mẫu để chạm vào là xem được nghĩa. Câu có sẵn trong dữ liệu thì giữ nguyên.
  function K(cz, pa, nghia, man) {
    const c = PK.duLieu.dangKyCau(cz, pa, nghia);
    if (man !== undefined && c.man === undefined) c.man = man;
    return cz;
  }

  // "To je učitel. / To je učitelka." → hai câu riêng (nam, nữ), lấy phiên âm và nghĩa từ dữ liệu.
  function tachDoi(cz) {
    const c = PK.d.cau.find(function (x) { return x.cz === cz; });
    if (!c) return [];
    const phan = c.cz.split(' / ');
    if (phan.length < 2) return [c];
    const pa = (c.phien_am || '').split(' / ');
    const soTuDau = phan[0].trim().split(/\s+/).length;
    const nghiaChung = /\(([^)]*\/[^)]*)\)/.exec(c.nghia);
    return phan.map(function (p, i) {
      let ph = pa[i] || '';
      if (i > 0 && ph && ph.indexOf(' ') < 0 && soTuDau > 1 && pa[0]) ph = pa[0].split(' ').slice(0, soTuDau - 1).join(' ') + ' ' + ph;
      let nghia = c.nghia;
      if (nghiaChung) nghia = c.nghia.replace(nghiaChung[0], '(' + nghiaChung[1].split('/')[i].trim() + ')');
      else if (c.nghia.indexOf(' / ') >= 0) nghia = c.nghia.split(' / ')[i] || c.nghia;
      return { cz: p.trim(), phien_am: ph, nghia: nghia, man: c.man };
    });
  }
  function dangKyDoi(cz) { tachDoi(cz).forEach(function (c) { K(c.cz, c.phien_am, c.nghia, c.man); }); }

  const noi = function (ai, cz, moi) { return { loai: 'noi', ai: ai, cz: cz, moi: !!moi }; };
  const chon = function (canh, tuyChon, dung, nhac) { return { loai: 'chon', canh: canh, tuyChon: tuyChon, dung: dung, nhac: nhac }; };
  const mau = function (cz, giai) { return { loai: 'mau', cz: cz, giai: giai }; };
  const on = function () { return { loai: 'on' }; };

  // ---------- Từng màn ----------
  const MAN = {};

  MAN[2] = function (c) {
    const ten = c.ten;
    ['To je učitel. / To je učitelka.', 'To je kamarád. / To je kamarádka.'].forEach(dangKyDoi);
    const toi = K('Já jsem ' + ten + '.', '', 'Tôi là ' + ten + '.', 2);
    const ban = K('Ty jsi ' + ten + '.', '', 'Bạn là ' + ten + ' (sai: nói về mình phải dùng "já jsem").');
    const sai2 = K('Já jste ' + ten + '.', '', 'Câu sai: "já" không đi với "jste".');
    const sai3 = K('Já jsem kamarádi.', '', 'Câu sai: "já" là một người, "kamarádi" là số nhiều.');
    const sai4 = K('Vy jste kamarádi.', '', 'Các bạn là bạn bè (nhưng bạn đang nói về hai người là bạn và bạn của bạn: phải dùng "my").');
    return [
      [noi('nguoi', 'Kdo jste?', true),
        chon('Người lạ hỏi bạn là ai (lịch sự). Bạn trả lời:', [toi, ban], toi, 'Nói về mình dùng "já jsem".'),
        chon('Bạn chỉ vào thầy giáo 👨‍🏫 và nói với người lạ:', ['To je učitel.', 'To je učitelka.'], 'To je učitel.', 'Thầy giáo là učitel. Cô giáo (nữ) thêm -ka: učitelka.'),
        on()],
      [noi('ban', 'Kdo jsi?', true),
        chon('Bạn thân hỏi (nói thân). Bạn trả lời:', [toi, sai2], toi, 'Nói về mình dùng "já jsem".'),
        chon('Bạn chỉ vào một bạn gái 👧:', ['To je kamarád.', 'To je kamarádka.'], 'To je kamarádka.', 'Bạn gái (nữ) thêm -ka: kamarádka.'),
        on()],
      [chon('Bạn đi cùng bạn thân và nói về hai người:', ['My jsme kamarádi.', sai3, sai4], 'My jsme kamarádi.', 'Hai người nói về mình dùng "my jsme".'),
        chon('Bạn chỉ vào cô giáo 👩‍🏫:', ['To je učitelka.', 'To je učitel.'], 'To je učitelka.', 'Cô giáo (nữ) là učitelka.'),
        chon('Bạn chỉ vào một bạn trai 👦:', ['To je kamarád.', 'To je kamarádka.'], 'To je kamarád.', 'Bạn trai (nam) là kamarád.'),
        on()]
    ];
  };

  MAN[3] = function (c) {
    const ten = c.ten;
    const tenMinh = K('Jmenuju se ' + ten + '.', '', 'Tên tôi là ' + ten + '.', 3);
    const tenMinh2 = K('Moje jméno je ' + ten + '.', '', 'Tên của tôi là ' + ten + '.', 3);
    dangKyDoi('A vy? / A ty?');
    return [
      [chon('Bạn muốn hỏi thăm cô bán hàng (người lớn):', ['Jak se máte?', 'Jak se máš?'], 'Jak se máte?', 'Cô bán hàng là người lớn → dùng vy: Jak se máte?'),
        noi('co', 'Mám se dobře. A vy?', true),
        chon('Hôm nay bạn thấy cũng tạm được. Bạn nói:', ['Jde to.', 'Špatně.', 'Mám se dobře.'], 'Jde to.', 'Jde to = tạm được.'),
        chon('Hôm nay bạn mệt, thấy tệ. Bạn nói:', ['Špatně.', 'Mám se dobře.', 'Jde to.'], 'Špatně.', 'Špatně = tệ.'),
        chon('Hôm nay bạn rất khỏe. Bạn nói:', ['Mám se dobře.', 'Špatně.'], 'Mám se dobře.', 'Mám se dobře = tôi khỏe.')],
      [noi('ban', 'Jak se máš?', true),
        chon('Bạn nói "Tôi khỏe", rồi hỏi lại bạn thân bằng:', ['A ty?', 'A vy?'], 'A ty?', 'Bạn thân dùng ty: A ty?'),
        noi('ban', 'Jak se jmenuješ?', true),
        chon('Bạn nói tên mình:', [tenMinh, 'Mám se dobře.'], tenMinh, 'Hỏi tên thì trả lời: Jmenuju se …'),
        mau('Jmenuju se …', 'Tên tôi là … (thay … bằng tên của bạn).'),
        on()],
      [noi('nguoi', 'Jak se jmenujete?', true),
        chon('Bạn trả lời người lớn:', [tenMinh, 'Jak se máte?'], tenMinh, 'Câu hỏi tên thì trả lời bằng tên: Jmenuju se …'),
        noi('nguoi', 'Jaké je vaše jméno?', true),
        chon('Bạn trả lời (cách nói trang trọng):', [tenMinh2, 'Jak se máte?'], tenMinh2, 'Trả lời: Moje jméno je …'),
        mau('Moje jméno je …', 'Tên của tôi là … (thay … bằng tên của bạn).'),
        on()]
    ];
  };

  MAN[4] = function () {
    return [
      [chon('Bạn muốn tìm nhà ga 🚉. Hỏi cô bán hàng:', ['Kde je nádraží?', 'Kde je letiště?'], 'Kde je nádraží?', 'nádraží = nhà ga, letiště = sân bay.'), on()],
      [chon('Bạn muốn tìm sân bay ✈️. Hỏi cô bán hàng:', ['Kde je letiště?', 'Kde je nádraží?'], 'Kde je letiště?', 'letiště = sân bay.'),
        chon('Bạn cần tìm nhà vệ sinh 🚽. Hỏi:', ['Kde je záchod?', 'Kde je nádraží?'], 'Kde je záchod?', 'záchod = nhà vệ sinh.'), on()],
      [chon('Chợ sắp đóng cửa, bạn nói với cô bán hàng là bạn đi về nhà 🏠:', ['Jdu domů.', 'Děkuju.', 'Prosím.'], 'Jdu domů.', 'Jdu domů = tôi đi về nhà.'),
        chon('Rồi bạn chào cô:', ['Na shledanou!', 'Dobrý den.'], 'Na shledanou!', 'Chia tay thì nói Na shledanou!'), on()]
    ];
  };

  MAN[5] = function () {
    return [
      [noi('co', 'Další káva?', true),
        chon('Cô đưa thêm cho bạn một ly cà phê ☕. Bạn nói cảm ơn:', ['Děkuju.', 'Na shledanou!', 'Ahoj!'], 'Děkuju.', 'Děkuju = cảm ơn.'), on()],
      [on(), on()],
      [on(), on()]
    ];
  };

  MAN[6] = function () { return [[on(), on()], [on(), on()], [on(), on()]]; };
  MAN[7] = MAN[6];

  MAN[8] = function () {
    const saiQuan = K('To je kalhoty.', '', 'Đây là cái quần (câu sai: kalhoty luôn là số nhiều nên phải dùng "jsou").');
    const saiSach = K('To jsou kniha.', '', 'Đây là quyển sách (câu sai: chỉ một cái thì phải dùng "je").');
    return [
      [mau('To jsou …', 'Chỉ vào nhiều món thì nói To jsou … (nhiều cái).'),
        chon('Cô chỉ vào nhiều quả táo 🍎🍎🍎. Bạn nói:', ['To jsou …', 'To je …'], 'To jsou …', 'Nhiều cái → To jsou …'), on()],
      [chon('Bạn chỉ vào cái quần 👖 (có 2 ống):', ['To jsou kalhoty.', saiQuan], 'To jsou kalhoty.', 'Quần luôn là số nhiều: To jsou kalhoty.'), on()],
      [chon('Bạn chỉ vào một quyển sách 📖:', ['To je kniha.', saiSach], 'To je kniha.', 'Một cái → To je …'), on()]
    ];
  };

  MAN[9] = function (c) {
    const nu = c.gioi === 'nu';
    const laBacSi = K('To je doktorka.', '', 'Đó là bác sĩ nữ.');
    const dung = nu ? 'Nejsem Číňanka, já jsem Vietnamka.'
      : K('Nejsem Číňan, já jsem Vietnamec.', '', 'Tôi không phải người Trung Quốc, tôi là người Việt (nam).', 9);
    const sai = nu ? K('Jsem Číňanka, já nejsem Vietnamka.', '', 'Tôi là người Trung Quốc, tôi không phải người Việt (sai sự thật).')
      : K('Jsem Číňan, já nejsem Vietnamec.', '', 'Tôi là người Trung Quốc, tôi không phải người Việt (sai sự thật).');
    return [
      [chon('Cô hỏi: "Bạn có phải học sinh không?" Bạn đúng là học sinh. Bạn trả lời:', ['Ano.', 'Ne.'], 'Ano.', 'Ano = vâng.'),
        chon('Cô chỉ vào 🐱 hỏi: "Đây là con chó phải không?" Bạn trả lời:', ['Ne.', 'Ano.'], 'Ne.', 'Ne = không.'), on()],
      [chon('Cô chỉ vào thầy giáo 👨‍🏫 hỏi có phải bác sĩ nữ không. Bạn nói:', ['To není doktorka.', laBacSi], 'To není doktorka.', 'Muốn nói "không phải": je → není.'), on()],
      [chon('Có người nhầm bạn là người Trung Quốc. Bạn nói:', [dung, sai], dung, 'Nói "tôi không phải": ne- + jsem → nejsem.'), on()]
    ];
  };

  MAN[10] = function (c) {
    const nu = c.gioi === 'nu';
    dangKyDoi('Jsem kuchař. / Jsem kuchařka.');
    const kuchar = nu ? 'Jsem kuchařka.' : 'Jsem kuchař.';
    const kucharSai = nu ? 'Jsem kuchař.' : 'Jsem kuchařka.';
    const lamNghe = nu ? 'Pracuju jako manikérka.' : 'Pracuju jako řidič.';
    const lamSai = nu ? K('Pracuju jako manikér.', '', 'Tôi làm thợ làm móng (dạng nam, sai với bạn là nữ).') : K('Pracuju jako manikér.', '', 'Tôi làm thợ làm móng (nam).');
    const viet = nu ? 'Jsem Vietnamka.' : 'Já jsem Vietnamec.';
    const vietSai = nu ? K('Jsem Vietnamec.', '', 'Tôi là người Việt (dạng nam, sai với bạn là nữ).') : K('Jsem Vietnamka.', '', 'Tôi là người Việt (dạng nữ, sai với bạn là nam).');
    const gt = nu ? 'Bạn là nữ nên thêm -ka.' : 'Bạn là nam nên dùng dạng nam.';
    return [
      [noi('nguoi', 'Co děláte za práci?', true),
        chon('Bạn là đầu bếp (' + (nu ? 'nữ' : 'nam') + '). Bạn trả lời:', [kuchar, kucharSai], kuchar, gt), on()],
      [noi('nguoi', 'Jaké je vaše povolání?', true),
        chon(nu ? 'Bạn làm thợ làm móng 💅. Bạn trả lời:' : 'Bạn làm tài xế 🚗. Bạn trả lời:', [lamNghe, lamSai], lamNghe, nu ? gt : 'Tài xế là řidič.'), on()],
      [chon('Bạn nói bạn là người Việt (' + (nu ? 'nữ' : 'nam') + '):', [viet, vietSai], viet, gt), on()]
    ];
  };

  MAN[11] = function () {
    return [
      [noi('nguoi', 'Ten pokoj je světlý.', true),
        chon('Chọn mạo từ đúng cho "pokoj" (phòng): ___ pokoj je světlý.', ['Ten', 'Ta', 'To'], 'Ten', 'pokoj tận cùng bằng phụ âm → TEN.'),
        noi('nguoi', 'Ta budova je bílá.', true),
        chon('Tòa nhà màu trắng. Chọn màu đúng: Ta budova je ___', ['bílá', 'bílý', 'bílé'], 'bílá', 'TA đi với màu có đuôi -á.'), on()],
      [noi('nguoi', 'To tričko je černé.', true),
        chon('Áo phông màu đen. Chọn màu đúng: To tričko je ___', ['černé', 'černý', 'černá'], 'černé', 'TO đi với màu có đuôi -é.'), on()],
      [noi('nguoi', 'Ta tužka je hnědá.', true),
        chon('Bút chì màu nâu. Chọn màu đúng: Ta tužka je ___', ['hnědá', 'hnědý', 'hnědé'], 'hnědá', 'TA đi với màu có đuôi -á.'), on()]
    ];
  };

  MAN[12] = function () {
    const saiV = K('Jsem v Vietnamu.', '', 'Tôi đang ở Việt Nam (câu sai: hỏi "từ đâu" thì phải dùng "z").');
    const saiVN = K('Jsem Vietnam.', '', 'Tôi là Việt Nam (câu sai: thiếu "z" và dạng tên nước).');
    const zCesko = K('Jsem z Česka.', 'sêm s ches-ca', 'Tôi đến từ Séc.');
    const zCina = K('Jsem z Číny.', 'sêm s chi-ni', 'Tôi đến từ Trung Quốc.');
    const zViet = 'Jsem z Vietnamu.';
    return [
      [noi('ban', 'Kde jsi?', true),
        chon('Bạn đang ở nhà 🏠. Bạn trả lời:', ['Jsem doma.', 'Já jsem na nádraží.', 'My jsme ve škole.'], 'Jsem doma.', 'doma = ở nhà.'),
        chon('Bạn đang ở nhà ga 🚉. Bạn trả lời:', ['Já jsem na nádraží.', 'Jsem doma.'], 'Já jsem na nádraží.', 'na nádraží = ở nhà ga.'),
        chon('Xu Xu và Win Win đang ở trường 🏫. Bạn nói về hai người:', ['My jsme ve škole.', 'Jsem doma.'], 'My jsme ve škole.', 'My jsme = chúng tôi; ve škole = ở trường.'), on()],
      [noi('ban', 'Odkud jsi?', true),
        chon('Bạn đến từ Việt Nam. Bạn trả lời:', [zViet, saiV, saiVN], zViet, 'z + nước = từ nước đó.'),
        noi('nguoi', 'Odkud jste?', true),
        chon('Người lớn hỏi lịch sự. Bạn trả lời:', [zViet, saiV], zViet, 'z Vietnamu = từ Việt Nam.'), on()],
      [noi('nguoi', 'Z jakého státu jste?', true),
        chon('Bạn là người Việt. Bạn trả lời:', [zViet, zCesko, zCina], zViet, 'Từ Việt Nam: z Vietnamu.'), on(), on()]
    ];
  };

  // Ôn lại một câu cũ: nhân vật nói, người chơi nghe rồi chọn nghĩa đúng. Câu chọn ngẫu nhiên từ các màn trước.
  function taoOn(so, tuMan) {
    const co = PK.d.cau.filter(function (c) { return c.man < so && c.cz.indexOf('…') < 0 && c.cz.indexOf(' / ') < 0 && c.nghia && (tuMan === undefined || c.man <= tuMan); });
    if (!co.length) return null;
    const c = tron(co)[0];
    const sai = tron(co.filter(function (x) { return x.nghia !== c.nghia; })).slice(0, 2).map(function (x) { return x.nghia; });
    return { loai: 'nghia', ai: 'co', cz: c.cz, canh: 'Cô bán hàng nói lại một câu bạn đã học. Nghe và chọn nghĩa đúng:', dung: c.nghia, tuyChon: [c.nghia].concat(sai) };
  }

  // Trả về [vòng 1, vòng 2, vòng 3], mỗi vòng là danh sách lượt.
  function tao(so, ctx) {
    const c = ctx || { ten: 'Xu Xu', gioi: 'nu' };
    return MAN[so] ? MAN[so](c) : null;
  }

  // Các câu của màn được dùng (nói ra hoặc xuất hiện trong lựa chọn), để kiem-tra.html đối chiếu với dữ liệu.
  function cauDung(so, ctx) {
    const kq = new Set();
    const vong = tao(so, ctx);
    if (!vong) return [];
    vong.forEach(function (ds) {
      ds.forEach(function (t) {
        if (t.cz) kq.add(t.cz);
        (t.tuyChon || []).forEach(function (x) { kq.add(x); });
      });
    });
    return Array.from(kq);
  }

  PK.hoiThoai = { tao: tao, taoOn: taoOn, cauDung: cauDung, tachDoi: tachDoi, K: K, MAN_CO: Object.keys(MAN).map(Number) };
})();
