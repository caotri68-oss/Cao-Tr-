package vn.caotri.o2helper;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Random;

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

    /** {rand4} được thay bằng 4 số ngẫu nhiên mỗi lần bấm "Điền tất cả". */
    private static final String DEFAULT_PHONE = "77536{rand4}";
    private static final String DEFAULT_EMAIL = "g{rand4}a@gmail.com";
    private static final String DEFAULT_SIM = "plastic";
    private static final String DEFAULT_NUM = "new";
    private final Random rnd = new Random();

    private static final String[] SIM_KEYS = {"esim", "plastic"};
    private static final String[] SIM_LABELS = {"Digitální eSIM (e-mail)", "Plastová SIM (pošta)"};
    private static final String[][] SIM_WORDS = {{"esim"}, {"plastova"}};
    private static final String[] NUM_KEYS = {"new", "port"};
    private static final String[] NUM_LABELS = {"Nové číslo", "Převod stávajícího čísla"};
    private static final String[][] NUM_WORDS = {{"vezmu si nove"}, {"prevedu"}};

    private WebView web;
    private SharedPreferences prefs;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        prefs = getSharedPreferences(PREFS, MODE_PRIVATE);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);

        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        web.setWebViewClient(new WebViewClient());
        root.addView(web, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f));

        LinearLayout panel = new LinearLayout(this);
        panel.setOrientation(LinearLayout.VERTICAL);
        panel.setBackgroundColor(Color.parseColor("#EEEEEE"));

        TextView hint = new TextView(this);
        hint.setText("Bấm \"Điền tất cả\", hoặc chạm vào một ô rồi bấm nút nhỏ bên dưới. Đồng ý điều khoản và gửi đơn bạn tự làm.");
        hint.setTextSize(11);
        hint.setPadding(16, 6, 16, 2);
        panel.addView(hint);

        LinearLayout row1 = new LinearLayout(this);
        row1.setOrientation(LinearLayout.HORIZONTAL);
        Button all = new Button(this);
        all.setText("Điền tất cả");
        all.setAllCaps(false);
        all.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { fillAll(); }
        });
        row1.addView(all, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 2f));
        Button cfg = new Button(this);
        cfg.setText("Sửa dữ liệu");
        cfg.setAllCaps(false);
        cfg.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { showSettings(); }
        });
        row1.addView(cfg, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
        panel.addView(row1);

        LinearLayout row2 = new LinearLayout(this);
        row2.setOrientation(LinearLayout.HORIZONTAL);
        for (int i = 0; i < KEYS.length; i++) {
            final String key = KEYS[i];
            Button b = new Button(this);
            b.setText(SHORT[i]);
            b.setTextSize(10);
            b.setAllCaps(false);
            b.setMinWidth(0);
            b.setMinimumWidth(0);
            b.setPadding(0, 0, 0, 0);
            b.setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) { fillFocused(key); }
            });
            row2.addView(b, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
        }
        panel.addView(row2);
        root.addView(panel, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        setContentView(root);

        if (state == null) {
            web.loadUrl(START_URL);
        } else {
            web.restoreState(state);
        }
        if (!prefs.contains("first")) {
            showSettings();
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack(); else super.onBackPressed();
    }

    private void fillAll() {
        JSONObject data = new JSONObject();
        final StringBuilder wanted = new StringBuilder();
        try {
            for (int i = 0; i < KEYS.length; i++) {
                String v = prefs.getString(KEYS[i], defaultFor(KEYS[i]));
                v = fresh(v);
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
            @Override public void run() { runFill(json, wanted.toString(), false); }
        }, 1200);
        web.postDelayed(new Runnable() {
            @Override public void run() { runFill(json, wanted.toString(), true); }
        }, 2500);
    }

    private void runFill(String json, final String wanted, final boolean report) {
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
                        ? "Đã điền xong, hãy kiểm tra lại từng ô"
                        : "Chưa điền được: " + missing + "(chạm ô đó rồi bấm nút nhỏ)";
                Toast.makeText(MainActivity.this, msg, Toast.LENGTH_LONG).show();
            }
        });
    }

    private static String emptyTo(String v, String def) {
        return v.length() == 0 ? def : v;
    }

    private String defaultFor(String key) {
        if (key.equals("phone")) return DEFAULT_PHONE;
        if (key.equals("email")) return DEFAULT_EMAIL;
        return "";
    }

    /** Thay mỗi {rand4} bằng 4 chữ số ngẫu nhiên mới. */
    private String fresh(String v) {
        while (v.contains("{rand4}")) {
            v = v.replaceFirst("\\{rand4\\}", String.format("%04d", rnd.nextInt(10000)));
        }
        return v;
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
        String value = prefs.getString(key, "");
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
        note.setText("{rand4} = 4 số ngẫu nhiên, đổi mỗi lần bấm Điền tất cả.");
        note.setTextSize(11);
        box.addView(note);
        final EditText[] fields = new EditText[KEYS.length];
        for (int i = 0; i < KEYS.length; i++) {
            EditText et = new EditText(this);
            et.setHint(LABELS[i]);
            et.setText(prefs.getString(KEYS[i], defaultFor(KEYS[i])));
            et.setSingleLine(true);
            if (KEYS[i].equals("phone")) et.setInputType(InputType.TYPE_CLASS_PHONE);
            if (KEYS[i].equals("email")) et.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);
            fields[i] = et;
            box.addView(et);
        }
        final RadioGroup sim = radioGroup(box, SIM_LABELS, SIM_KEYS, emptyTo(prefs.getString("sim", ""), DEFAULT_SIM));
        final RadioGroup num = radioGroup(box, NUM_LABELS, NUM_KEYS, emptyTo(prefs.getString("num", ""), DEFAULT_NUM));

        ScrollView sv = new ScrollView(this);
        sv.addView(box);
        new AlertDialog.Builder(this)
                .setTitle("Thông tin của bạn (lưu trên máy)")
                .setView(sv)
                .setPositiveButton("Lưu", new DialogInterface.OnClickListener() {
                    @Override public void onClick(DialogInterface d, int w) {
                        SharedPreferences.Editor ed = prefs.edit();
                        for (int i = 0; i < KEYS.length; i++) {
                            ed.putString(KEYS[i], fields[i].getText().toString().trim());
                        }
                        ed.putString("sim", selectedKey(sim, SIM_KEYS));
                        ed.putString("num", selectedKey(num, NUM_KEYS));
                        ed.apply();
                    }
                })
                .setNegativeButton("Đóng", null)
                .show();
    }

    private RadioGroup radioGroup(LinearLayout box, String[] labels, String[] keys, String current) {
        TextView title = new TextView(this);
        title.setText(keys[0].equals("esim") ? "Loại SIM" : "Số điện thoại");
        title.setTextSize(13);
        title.setPadding(0, 24, 0, 0);
        box.addView(title);
        RadioGroup g = new RadioGroup(this);
        for (int i = 0; i < labels.length; i++) {
            RadioButton rb = new RadioButton(this);
            rb.setText(labels[i]);
            rb.setTag(keys[i]);
            rb.setChecked(keys[i].equals(current));
            g.addView(rb);
        }
        box.addView(g);
        return g;
    }

    private String selectedKey(RadioGroup g, String[] keys) {
        View v = g.findViewById(g.getCheckedRadioButtonId());
        return v == null ? "" : (String) v.getTag();
    }
}
