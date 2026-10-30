package vn.caotri.o2helper;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.Outline;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.InsetDrawable;
import android.graphics.drawable.StateListDrawable;
import android.os.Bundle;
import android.text.InputType;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewOutlineProvider;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Mở trang đăng ký O2 trong WebView và điền sẵn thông tin do người dùng nhập
 * (chỉ lưu trên máy). Ứng dụng KHÔNG tự tick đồng ý và KHÔNG tự bấm gửi.
 */
public class MainActivity extends Activity {

    private static final String START_URL = "https://objednavka.o2.cz/prepaid/202687/202686";
    private static final String PREFS = "o2helper";

    private static final String[] KEYS = {"first", "last", "phone", "email", "street", "city", "zip"};
    private static final String[] LABELS = {
            "Tên (jméno)", "Họ (příjmení)", "SĐT (không cần +420)", "Email",
            "Đường + số nhà (ulice a číslo)", "Thành phố (město)", "Mã bưu chính (PSČ)"};
    private static final String[] SHORT = {"Tên", "Họ", "SĐT", "Email", "Đường", "TP", "PSČ"};

    /** %s = đối tượng JSON {first,last,phone,email,street,city,zip}. Trả về danh sách khoá đã điền. */
    private static final String JS_COMMON =
            "function norm(s){return (s||'').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'');}"
            + "function setv(e,v){var p=e.tagName==='INPUT'?HTMLInputElement.prototype:HTMLTextAreaElement.prototype;"
            + "Object.getOwnPropertyDescriptor(p,'value').set.call(e,v);"
            + "e.dispatchEvent(new Event('input',{bubbles:true}));"
            + "e.dispatchEvent(new Event('change',{bubbles:true}));}"
            + "function val(d,k){return k==='phone'?d.phone.replace(/^(\\+|00)?420\\s*/,''):d[k];}";

    private static final String JS_ALL = "(function(d){" + JS_COMMON
            + "function match(s){"
            + "if(/prijmeni|surname|family|last/.test(s))return 'last';"
            + "if(/jmeno|given|first/.test(s))return 'first';"
            + "if(/ulic|street|address/.test(s))return 'street';"
            + "if(/mesto|city|locality/.test(s))return 'city';"
            + "if(/psc|postal|zip/.test(s))return 'zip';"
            + "if(/mail/.test(s))return 'email';"
            + "if(/telefon|phone|mobil/.test(s))return 'phone';return null;}"
            + "function lab(e){var t='';if(e.id){var l=document.querySelector('label[for=\"'+e.id+'\"]');if(l)t=l.textContent;}"
            + "if(!t){var n=e.parentElement;for(var i=0;i<3&&n&&!t;i++){var l2=n.querySelector('label');if(l2)t=l2.textContent;n=n.parentElement;}}return t;}"
            + "function kind(e){var t=(e.type||'').toLowerCase();if(t==='email')return 'email';if(t==='tel')return 'phone';"
            + "var s=norm([e.placeholder,e.name,e.id,e.getAttribute('autocomplete'),e.getAttribute('aria-label')].join(' '));"
            + "return match(s)||match(norm(lab(e)));}"
            + "var done={};var skip=/^(hidden|checkbox|radio|submit|button|file|password)$/;"
            + "var els=document.querySelectorAll('input,textarea');"
            + "for(var i=0;i<els.length;i++){var e=els[i];if(skip.test(e.type)||e.disabled||e.readOnly)continue;"
            + "var k=kind(e);if(!k||done[k]||!d[k])continue;setv(e,val(d,k));done[k]=1;}"
            + "return Object.keys(done).join(',');})(%s)";

    private static final String JS_FOCUSED = "(function(v){" + JS_COMMON
            + "var e=document.activeElement;if(!e||(e.tagName!=='INPUT'&&e.tagName!=='TEXTAREA'))return 'no';"
            + "setv(e,v);return 'ok';})(%s)";

    /** %s = mảng từ khoá (đã bỏ dấu, chữ thường). Bấm radio đầu tiên có nhãn chứa từ khoá. */
    private static final String JS_RADIO = "(function(words){" + "function norm(s){return (s||'').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'');}"
            + "var rs=document.querySelectorAll('input[type=radio]');"
            + "for(var i=0;i<rs.length;i++){var e=rs[i];var c=e.closest('label')||e.parentElement;"
            + "var t=norm(c?c.textContent:'');"
            + "for(var j=0;j<words.length;j++){if(t.indexOf(words[j])>=0){if(!e.checked)e.click();return 'ok';}}}"
            + "return 'no';})(%s)";

    /** {rand4} được thay bằng bộ đếm 4 chữ số, tăng 1 mỗi lần bấm "Điền tất cả". */
    /** Ba địa chỉ, mỗi địa chỉ lưu đường / thành phố / PSČ riêng; "addr" là địa chỉ đang dùng. */
    private static final String[] ADDR_KEYS = {"street", "city", "zip"};
    private static final String[] ADDR_LABELS = {"Đường + số nhà", "Thành phố (město)", "Mã bưu chính (PSČ)"};
    private static final int ADDR_COUNT = 3;

    private static final String DEFAULT_PHONE = "77536{rand4}";
    private static final String DEFAULT_EMAIL = "g{rand4}a@gmail.com";
    private static final String DEFAULT_SIM = "plastic";
    private static final String DEFAULT_NUM = "new";

    private static final String[] SIM_KEYS = {"esim", "plastic"};
    private static final String[] SIM_LABELS = {"Digitální eSIM (e-mail)", "Plastová SIM (pošta)"};
    private static final String[][] SIM_WORDS = {{"esim"}, {"plastova"}};
    private static final String[] NUM_KEYS = {"new", "port"};
    private static final String[] NUM_LABELS = {"Nové číslo", "Převod stávajícího čísla"};
    private static final String[][] NUM_WORDS = {{"vezmu si nove"}, {"prevedu"}};

    /**
     * Tích ô đồng ý điều khoản. Ô trên O2 có thể là ô ẩn kèm nhãn riêng, nên thử bấm
     * chính ô, rồi bấm nhãn của ô. Chỉ xét ô có đoạn chữ chứa "souhlas" và ngắn.
     * Không bấm nút đặt hàng.
     */
    private static final String JS_CONSENT = "(function(){var cs=document.querySelectorAll('input[type=checkbox]');"
            + "for(var i=0;i<cs.length;i++){var e=cs[i];var n=e.parentElement;"
            + "for(var k=0;k<4&&n;k++){var t=(n.textContent||'').toLowerCase();"
            + "if(t.indexOf('souhlas')>=0&&t.length<400)break;n=n.parentElement;}"
            + "if(!n||(n.textContent||'').toLowerCase().indexOf('souhlas')<0)continue;"
            + "if(!e.checked){e.click();if(!e.checked&&e.labels&&e.labels[0])e.labels[0].click();}"
            + "return e.checked?'ok':'fail';}return 'no';})()";

    private static final String[] SLOT_NAMES = {"Trang 1", "Trang 2", "Trang 3", "Trang 4"};
    private int slot = 0;
    private EditText urlField;
    private Button[] tabs = new Button[SLOT_NAMES.length];

    private WebView web;
    private Button addrBtn;
    private SharedPreferences prefs;

    /** Màu nền (trên, dưới) của từng nút nhỏ ở hàng dưới cùng. */
    private static final int[][] CHIP_COLORS = {
            {0xFFEADFCF, 0xFFDCCBB2}, {0xFFE8D2D8, 0xFFD9BCC6}, {0xFFD6DCEB, 0xFFBFC9DE},
            {0xFFD2E7EA, 0xFFB9D7DC}, {0xFFD9E8D6, 0xFFBFD8B8}, {0xFFF0EBCB, 0xFFE1D9AE},
            {0xFFE2D6E8, 0xFFCDBDD9}};

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        prefs = getSharedPreferences(PREFS, MODE_PRIVATE);
        if (getActionBar() != null) getActionBar().hide();
        getWindow().setStatusBarColor(0xFF4E4673);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackground(new GradientDrawable(GradientDrawable.Orientation.TOP_BOTTOM,
                new int[]{0xFFEDEBF3, 0xFFE2E9EF}));

        // Đầu trang: tiêu đề, 4 trang, ô địa chỉ web
        LinearLayout top = new LinearLayout(this);
        top.setOrientation(LinearLayout.VERTICAL);
        GradientDrawable topBg = new GradientDrawable(GradientDrawable.Orientation.LEFT_RIGHT,
                new int[]{0xFF5A4F80, 0xFF41608A});
        float r = dp(26);
        topBg.setCornerRadii(new float[]{0, 0, 0, 0, r, r, r, r});
        top.setBackground(topBg);
        top.setPadding(dp(12), dp(10), dp(12), dp(14));
        top.setElevation(dp(10));

        TextView title = new TextView(this);
        title.setText("⚡ O2 Điền nhanh");
        title.setTextColor(Color.WHITE);
        title.setTextSize(20);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        top.addView(title);
        TextView sub = new TextView(this);
        sub.setText("Điền form thật nhanh. Đồng ý và gửi đơn bạn tự làm.");
        sub.setTextColor(0xCCFFFFFF);
        sub.setTextSize(11);
        sub.setPadding(0, 0, 0, dp(6));
        top.addView(sub);

        LinearLayout tabRow = new LinearLayout(this);
        tabRow.setOrientation(LinearLayout.HORIZONTAL);
        for (int i = 0; i < SLOT_NAMES.length; i++) {
            final int idx = i;
            tabs[i] = pill(nameOf(i), 0xFFFFFFFF, 0xFFFFFFFF, Color.WHITE, 12);
            tabs[i].setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) { openSlot(idx); }
            });
            tabs[i].setOnLongClickListener(new View.OnLongClickListener() {
                @Override public boolean onLongClick(View v) { showRename(idx); return true; }
            });
            tabRow.addView(tabs[i], lp(1f));
        }
        top.addView(tabRow);

        LinearLayout urlRow = new LinearLayout(this);
        urlRow.setOrientation(LinearLayout.HORIZONTAL);
        urlRow.setGravity(Gravity.CENTER_VERTICAL);
        urlField = new EditText(this);
        urlField.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_URI);
        urlField.setSingleLine(true);
        urlField.setTextSize(13);
        urlField.setHint("Dán địa chỉ trang web");
        urlField.setHintTextColor(0xFF9E9E9E);
        urlField.setTextColor(0xFF3D3550);
        urlField.setBackground(shape(0xFFFFFFFF, 0xFFFFFFFF, 20));
        urlField.setPadding(dp(14), dp(8), dp(14), dp(8));
        urlRow.addView(urlField, lp(1f));
        Button save = pill("💾 Lưu & mở", 0xFF6FA88E, 0xFF5A927A, 0xFF24382F, 12);
        save.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { saveAndOpen(); }
        });
        urlRow.addView(save, lp(0f));
        top.addView(urlRow);

        TextView tip = new TextView(this);
        tip.setText("Giữ lâu một nút trang để đổi tên trang.");
        tip.setTextColor(0xCCFFFFFF);
        tip.setTextSize(10);
        tip.setPadding(dp(4), dp(4), 0, 0);
        top.addView(tip);
        root.addView(top, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        // Trang web nằm trong thẻ bo tròn, nổi lên
        FrameLayout card = new FrameLayout(this);
        card.setBackground(shape(0xFFFFFFFF, 0xFFFFFFFF, 20));
        card.setElevation(dp(6));
        card.setOutlineProvider(new ViewOutlineProvider() {
            @Override public void getOutline(View v, Outline o) {
                o.setRoundRect(0, 0, v.getWidth(), v.getHeight(), dp(20));
            }
        });
        card.setClipToOutline(true);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        web.setWebViewClient(new WebViewClient());
        card.addView(web, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        LinearLayout.LayoutParams cardLp = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f);
        cardLp.setMargins(dp(10), dp(12), dp(10), dp(10));
        root.addView(card, cardLp);

        // Thanh dưới: các nút điền
        LinearLayout panel = new LinearLayout(this);
        panel.setOrientation(LinearLayout.VERTICAL);
        GradientDrawable panelBg = new GradientDrawable();
        panelBg.setColor(0xFFFFFFFF);
        panelBg.setCornerRadii(new float[]{r, r, r, r, 0, 0, 0, 0});
        panel.setBackground(panelBg);
        panel.setPadding(dp(10), dp(10), dp(10), dp(8));
        panel.setElevation(dp(14));

        TextView hint = new TextView(this);
        hint.setText("Bấm ⚡ Điền tất cả, hoặc chạm vào một ô rồi bấm nút nhỏ. Đồng ý điều khoản và gửi đơn bạn tự làm.");
        hint.setTextColor(0xFF7A7488);
        hint.setTextSize(11);
        hint.setPadding(dp(4), 0, dp(4), dp(4));
        panel.addView(hint);

        LinearLayout row1 = new LinearLayout(this);
        row1.setOrientation(LinearLayout.HORIZONTAL);
        Button all = pill("⚡ Điền tất cả", 0xFFC98E62, 0xFFA8676A, Color.WHITE, 16);
        all.setPadding(0, dp(14), 0, dp(14));
        all.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { fillAll(); }
        });
        row1.addView(all, lp(2f));
        Button cfg = pill("⚙️ Sửa", 0xFF7D70A8, 0xFF64709E, Color.WHITE, 13);
        cfg.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { showSettings(); }
        });
        row1.addView(cfg, lp(1f));
        addrBtn = pill("📍 Đ/c " + (addrIdx() + 1), 0xFF5E9E97, 0xFF4C8A84, Color.WHITE, 13);
        addrBtn.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { cycleAddress(); }
        });
        row1.addView(addrBtn, lp(1f));
        panel.addView(row1);

        LinearLayout row2 = new LinearLayout(this);
        row2.setOrientation(LinearLayout.HORIZONTAL);
        for (int i = 0; i < KEYS.length; i++) {
            final String key = KEYS[i];
            Button b = pill(SHORT[i], CHIP_COLORS[i][0], CHIP_COLORS[i][1], 0xFF3D3550, 10);
            b.setPadding(0, dp(8), 0, dp(8));
            b.setElevation(dp(2));
            b.setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) { fillFocused(key); }
            });
            row2.addView(b, lp(1f));
        }
        panel.addView(row2);
        root.addView(panel, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        setContentView(root);

        if (state == null) {
            openSlot(0);
        } else {
            web.restoreState(state);
            slot = state.getInt("slot", 0);
            openSlot(slot, false);
        }
        if (!prefs.contains("first")) {
            showSettings();
        }
    }

    private int dp(float v) {
        return (int) (v * getResources().getDisplayMetrics().density + 0.5f);
    }

    private GradientDrawable shape(int c1, int c2, float radiusDp) {
        GradientDrawable g = new GradientDrawable(GradientDrawable.Orientation.TL_BR, new int[]{c1, c2});
        g.setCornerRadius(dp(radiusDp));
        return g;
    }

    private int darker(int c) {
        float[] hsv = new float[3];
        Color.colorToHSV(c, hsv);
        hsv[2] *= 0.82f;
        return Color.HSVToColor(Color.alpha(c), hsv);
    }

    private LinearLayout.LayoutParams lp(float weight) {
        LinearLayout.LayoutParams p = weight > 0
                ? new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, weight)
                : new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        p.setMargins(dp(3), dp(3), dp(3), dp(3));
        return p;
    }

    /** Nút bo tròn có màu chuyển, đổ bóng nổi, và nhún nhẹ khi chạm. */
    private Button pill(String text, int c1, int c2, int textColor, float sp) {
        Button b = new Button(this);
        b.setText(text);
        b.setAllCaps(false);
        b.setTextSize(sp);
        b.setTextColor(textColor);
        b.setTypeface(Typeface.DEFAULT_BOLD);
        b.setMinWidth(0);
        b.setMinimumWidth(0);
        b.setMinHeight(0);
        b.setMinimumHeight(0);
        b.setPadding(dp(8), dp(10), dp(8), dp(10));
        StateListDrawable sl = new StateListDrawable();
        sl.addState(new int[]{android.R.attr.state_pressed}, shape(darker(c1), darker(c2), 22));
        sl.addState(new int[]{}, shape(c1, c2, 22));
        b.setBackground(sl);
        b.setStateListAnimator(null);
        b.setElevation(dp(4));
        b.setOnTouchListener(new View.OnTouchListener() {
            @Override public boolean onTouch(View v, MotionEvent e) {
                int a = e.getAction();
                if (a == MotionEvent.ACTION_DOWN) {
                    v.animate().scaleX(0.94f).scaleY(0.94f).setDuration(80).start();
                } else if (a == MotionEvent.ACTION_UP || a == MotionEvent.ACTION_CANCEL) {
                    v.animate().scaleX(1f).scaleY(1f).setDuration(120).start();
                }
                return false;
            }
        });
        return b;
    }

    /** Trang đang chọn: vàng cam nổi lên; các trang còn lại: kính mờ. */
    private void styleTab(Button b, boolean selected) {
        if (selected) {
            b.setBackground(shape(0xFFD9A65A, 0xFFBF8140, 22));
            b.setElevation(dp(8));
        } else {
            b.setBackground(shape(0x40FFFFFF, 0x30FFFFFF, 22));
            b.setElevation(0);
        }
        b.setTextColor(Color.WHITE);
    }

    private void roundDialog(AlertDialog d) {
        d.getWindow().setBackgroundDrawable(
                new InsetDrawable(shape(0xFFFFFFFF, 0xFFEDEBF3, 24), dp(16)));
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
        out.putInt("slot", slot);
    }

    private void openSlot(int i) {
        openSlot(i, true);
    }

    private String nameOf(int i) {
        return prefs.getString("name" + i, SLOT_NAMES[i]);
    }

    /** Giữ lâu một nút trang để đổi tên trang. */
    private void showRename(final int i) {
        final EditText et = new EditText(this);
        et.setSingleLine(true);
        et.setText(nameOf(i));
        roundDialog(new AlertDialog.Builder(this)
                .setTitle("Đổi tên trang")
                .setView(et)
                .setPositiveButton("Lưu", new DialogInterface.OnClickListener() {
                    @Override public void onClick(DialogInterface d, int w) {
                        String n = et.getText().toString().trim();
                        if (n.length() > 0) {
                            prefs.edit().putString("name" + i, n).apply();
                            tabs[i].setText(n);
                        }
                    }
                })
                .setNegativeButton("Đóng", null)
                .show());
    }

    /** Mở địa chỉ đã lưu của trang i. Mỗi trang có địa chỉ riêng. */
    private void openSlot(int i, boolean load) {
        slot = i;
        String u = prefs.getString("url" + i, i == 0 ? START_URL : "");
        urlField.setText(u);
        for (int k = 0; k < tabs.length; k++) {
            styleTab(tabs[k], k == i);
        }
        if (!load) return;
        if (u.length() == 0) {
            web.loadUrl("about:blank");
            Toast.makeText(this, "Chưa có địa chỉ, dán vào rồi bấm Lưu & mở", Toast.LENGTH_SHORT).show();
        } else {
            web.loadUrl(u);
        }
    }

    private void saveAndOpen() {
        String u = urlField.getText().toString().trim();
        if (u.length() == 0) {
            Toast.makeText(this, "Hãy dán địa chỉ trước", Toast.LENGTH_SHORT).show();
            return;
        }
        if (!u.startsWith("http://") && !u.startsWith("https://")) u = "https://" + u;
        prefs.edit().putString("url" + slot, u).apply();
        urlField.setText(u);
        web.loadUrl(u);
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack(); else super.onBackPressed();
    }

    private void fillAll() {
        JSONObject data = new JSONObject();
        final StringBuilder wanted = new StringBuilder();
        final int n = prefs.getInt("counter", 940) + 1;
        prefs.edit().putInt("counter", n).apply();
        try {
            for (int i = 0; i < KEYS.length; i++) {
                String v = valueOf(store(KEYS[i]));
                v = v.replace("{rand4}", String.format("%04d", n));
                data.put(KEYS[i], v);
                if (v.length() > 0) wanted.append(KEYS[i]).append(',');
            }
        } catch (JSONException e) {
            return;
        }
        if (wanted.length() == 0) {
            Toast.makeText(this, "Chưa có dữ liệu, bấm Sửa dữ liệu để nhập", Toast.LENGTH_SHORT).show();
            return;
        }
        final String json = data.toString();
        // Chọn loại SIM / số điện thoại trước, vì ô địa chỉ chỉ hiện sau khi chọn.
        chooseSaved(SIM_KEYS, SIM_WORDS, "sim", DEFAULT_SIM);
        chooseSaved(NUM_KEYS, NUM_WORDS, "num", DEFAULT_NUM);
        web.postDelayed(new Runnable() {
            @Override public void run() { runFill(json, wanted.toString(), false, n); }
        }, 1200);
        web.postDelayed(new Runnable() {
            @Override public void run() {
                runFill(json, wanted.toString(), true, n);
                if (prefs.getBoolean("autoconsent", false)) {
                    web.evaluateJavascript(JS_CONSENT, new ValueCallback<String>() {
                        @Override public void onReceiveValue(String r) {
                            String res = r == null ? "" : r.replace("\"", "");
                            if (!res.equals("ok")) {
                                Toast.makeText(MainActivity.this,
                                        "Chưa tích được ô đồng ý (" + res + "), hãy tự tích", Toast.LENGTH_LONG).show();
                            }
                        }
                    });
                }
            }
        }, 2500);
    }

    private void runFill(String json, final String wanted, final boolean report, final int n) {
        web.evaluateJavascript(String.format(JS_ALL, json), new ValueCallback<String>() {
            @Override public void onReceiveValue(String r) {
                if (!report) return;
                String done = r == null ? "" : r.replace("\"", "");
                StringBuilder missing = new StringBuilder();
                for (String k : wanted.split(",")) {
                    if (k.length() > 0 && !(("," + done + ",").contains("," + k + ","))) {
                        missing.append(k).append(' ');
                    }
                }
                String msg = missing.length() == 0
                        ? "Đã điền xong lần " + n + " (SĐT " + String.format("%04d", n) + "), kiểm tra lại từng ô"
                        : "Chưa điền được: " + missing + "(chạm ô đó rồi bấm nút nhỏ)";
                Toast.makeText(MainActivity.this, msg, Toast.LENGTH_LONG).show();
            }
        });
    }

    private static String emptyTo(String v, String def) {
        return v.length() == 0 ? def : v;
    }

    /**
     * Số điện thoại và email luôn theo mẫu có {rand4}. Nếu còn giá trị cũ không có mẫu
     * (đã lưu trước đây), dùng lại mẫu mặc định để bộ đếm vẫn hoạt động.
     */
    private String valueOf(String key) {
        String v = prefs.getString(key, "");
        boolean templated = key.equals("phone") || key.equals("email");
        if (v.length() == 0 || (templated && !v.contains("{rand4}"))) return defaultFor(key);
        return v;
    }

    private String defaultFor(String key) {
        if (key.equals("phone")) return DEFAULT_PHONE;
        if (key.equals("email")) return DEFAULT_EMAIL;
        return "";
    }

    private void chooseSaved(String[] keys, String[][] words, String pref, String def) {
        String saved = prefs.getString(pref, def);
        if (saved.length() == 0) saved = def;
        for (int i = 0; i < keys.length; i++) {
            if (keys[i].equals(saved)) {
                StringBuilder arr = new StringBuilder("[");
                for (int j = 0; j < words[i].length; j++) {
                    if (j > 0) arr.append(',');
                    arr.append(JSONObject.quote(words[i][j]));
                }
                arr.append(']');
                web.evaluateJavascript(String.format(JS_RADIO, arr), null);
                return;
            }
        }
    }

    private void fillFocused(String key) {
        String value = prefs.getString(store(key), "");
        if (value.length() == 0) {
            Toast.makeText(this, "Chưa có dữ liệu, bấm Sửa dữ liệu để nhập", Toast.LENGTH_SHORT).show();
            return;
        }
        web.evaluateJavascript(String.format(JS_FOCUSED, JSONObject.quote(value)), new ValueCallback<String>() {
            @Override public void onReceiveValue(String r) {
                if (r != null && r.contains("no")) {
                    Toast.makeText(MainActivity.this,
                            "Hãy chạm vào một ô nhập trên trang trước", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    private void showSettings() {
        LinearLayout box = new LinearLayout(this);
        box.setOrientation(LinearLayout.VERTICAL);
        box.setPadding(32, 16, 32, 0);
        TextView note = new TextView(this);
        note.setText("{rand4} = bộ đếm 4 số, tăng 1 mỗi lần bấm Điền tất cả.");
        note.setTextSize(11);
        box.addView(note);

        final EditText first = editField(box, "Tên (jméno)", valueOf("first"), 0);
        final EditText last = editField(box, "Họ (příjmení)", valueOf("last"), 0);
        final EditText phone = editField(box, "SĐT (không cần +420)", valueOf("phone"), InputType.TYPE_CLASS_PHONE);
        final EditText email = editField(box, "Email", valueOf("email"),
                InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);

        final EditText[][] addr = new EditText[ADDR_COUNT][ADDR_KEYS.length];
        for (int a = 0; a < ADDR_COUNT; a++) {
            TextView title = new TextView(this);
            title.setText("Địa chỉ " + (a + 1));
            title.setTextColor(0xFF5F5878);
            title.setTypeface(Typeface.DEFAULT_BOLD);
            title.setTextSize(13);
            title.setPadding(0, 24, 0, 0);
            box.addView(title);
            for (int j = 0; j < ADDR_KEYS.length; j++) {
                addr[a][j] = editField(box, ADDR_LABELS[j], prefs.getString(ADDR_KEYS[j] + a, ""), 0);
            }
        }
        final RadioGroup active = radioGroup(box, "Địa chỉ đang dùng",
                new String[]{"Địa chỉ 1", "Địa chỉ 2", "Địa chỉ 3"},
                new String[]{"0", "1", "2"}, String.valueOf(addrIdx()));

        final CheckBox consent = new CheckBox(this);
        consent.setText("Tự tích ô đồng ý điều khoản (chỉ bật khi bạn đã đọc điều khoản)");
        consent.setTextSize(12);
        consent.setChecked(prefs.getBoolean("autoconsent", false));
        box.addView(consent);

        final RadioGroup sim = radioGroup(box, "Loại SIM", SIM_LABELS, SIM_KEYS,
                emptyTo(prefs.getString("sim", ""), DEFAULT_SIM));
        final RadioGroup num = radioGroup(box, "Số điện thoại", NUM_LABELS, NUM_KEYS,
                emptyTo(prefs.getString("num", ""), DEFAULT_NUM));

        ScrollView sv = new ScrollView(this);
        sv.addView(box);
        roundDialog(new AlertDialog.Builder(this)
                .setTitle("Thông tin của bạn (lưu trên máy)")
                .setView(sv)
                .setPositiveButton("Lưu", new DialogInterface.OnClickListener() {
                    @Override public void onClick(DialogInterface d, int w) {
                        SharedPreferences.Editor ed = prefs.edit();
                        ed.putString("first", first.getText().toString().trim());
                        ed.putString("last", last.getText().toString().trim());
                        ed.putString("phone", phone.getText().toString().trim());
                        ed.putString("email", email.getText().toString().trim());
                        for (int a = 0; a < ADDR_COUNT; a++) {
                            for (int j = 0; j < ADDR_KEYS.length; j++) {
                                ed.putString(ADDR_KEYS[j] + a, addr[a][j].getText().toString().trim());
                            }
                        }
                        String ai = selectedKey(active);
                        ed.putInt("addr", ai.length() == 0 ? 0 : Integer.parseInt(ai));
                        ed.putBoolean("autoconsent", consent.isChecked());
                        ed.putString("sim", selectedKey(sim));
                        ed.putString("num", selectedKey(num));
                        ed.apply();
                        addrBtn.setText("📍 Đ/c " + (addrIdx() + 1));
                    }
                })
                .setNegativeButton("Đóng", null)
                .show());
    }

    private EditText editField(LinearLayout box, String hint, String text, int inputType) {
        EditText et = new EditText(this);
        if (inputType != 0) et.setInputType(inputType);
        et.setSingleLine(true);
        et.setHint(hint);
        et.setText(text);
        et.setBackground(shape(0xFFFFFFFF, 0xFFF4F1F8, 14));
        et.setPadding(dp(12), dp(10), dp(12), dp(10));
        et.setTextColor(0xFF3D3550);
        et.setHintTextColor(0xFF9A93AB);
        LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        p.setMargins(0, dp(4), 0, dp(4));
        box.addView(et, p);
        return et;
    }

    private RadioGroup radioGroup(LinearLayout box, String title, String[] labels, String[] keys, String current) {
        TextView t = new TextView(this);
        t.setText(title);
        t.setTextColor(0xFF5F5878);
        t.setTypeface(Typeface.DEFAULT_BOLD);
        t.setTextSize(13);
        t.setPadding(0, 24, 0, 0);
        box.addView(t);
        RadioGroup g = new RadioGroup(this);
        for (int i = 0; i < labels.length; i++) {
            RadioButton rb = new RadioButton(this);
            rb.setId(View.generateViewId());
            rb.setText(labels[i]);
            rb.setTag(keys[i]);
            g.addView(rb);
            if (keys[i].equals(current)) g.check(rb.getId());
        }
        box.addView(g);
        return g;
    }

    private String selectedKey(RadioGroup g) {
        View v = g.findViewById(g.getCheckedRadioButtonId());
        return v == null ? "" : (String) v.getTag();
    }

    private int addrIdx() {
        return prefs.getInt("addr", 0);
    }

    /** Khóa lưu thực tế: đường / thành phố / PSČ đi theo địa chỉ đang dùng. */
    private String store(String key) {
        for (String k : ADDR_KEYS) {
            if (k.equals(key)) return key + addrIdx();
        }
        return key;
    }

    private void cycleAddress() {
        int n = (addrIdx() + 1) % ADDR_COUNT;
        prefs.edit().putInt("addr", n).apply();
        addrBtn.setText("📍 Đ/c " + (n + 1));
        Toast.makeText(this, "Đang dùng địa chỉ " + (n + 1), Toast.LENGTH_SHORT).show();
    }
}
