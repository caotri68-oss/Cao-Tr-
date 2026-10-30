package vn.caotri.o2helper;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONObject;

/**
 * Mở trang đăng ký O2 trong WebView và điền sẵn tên / địa chỉ / SĐT / email
 * vào ô đang được chọn. Dữ liệu do người dùng nhập, chỉ lưu trên máy.
 * Ứng dụng KHÔNG tự tick đồng ý và KHÔNG tự bấm gửi: người dùng tự làm.
 */
public class MainActivity extends Activity {

    private static final String START_URL = "https://objednavka.o2.cz/prepaid/202687/202686";
    private static final String PREFS = "o2helper";

    private static final String[] KEYS = {"name", "address", "phone", "email"};
    private static final String[] LABELS = {"Họ tên", "Địa chỉ", "Số điện thoại", "Email"};

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

        TextView hint = new TextView(this);
        hint.setText("Chạm vào ô trên trang, rồi bấm nút bên dưới để điền. Phần đồng ý và gửi đơn bạn tự làm.");
        hint.setTextSize(12);
        hint.setPadding(16, 8, 16, 4);
        hint.setBackgroundColor(Color.parseColor("#EEEEEE"));
        root.addView(hint, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        LinearLayout bar = new LinearLayout(this);
        bar.setOrientation(LinearLayout.HORIZONTAL);
        bar.setBackgroundColor(Color.parseColor("#EEEEEE"));
        for (int i = 0; i < KEYS.length; i++) {
            final String key = KEYS[i];
            Button b = new Button(this);
            b.setText(LABELS[i]);
            b.setTextSize(11);
            b.setAllCaps(false);
            b.setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) { fill(key); }
            });
            bar.addView(b, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
        }
        Button cfg = new Button(this);
        cfg.setText("Sửa");
        cfg.setTextSize(11);
        cfg.setAllCaps(false);
        cfg.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { showSettings(); }
        });
        bar.addView(cfg, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
        root.addView(bar, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        setContentView(root);

        if (state == null) {
            web.loadUrl(START_URL);
        } else {
            web.restoreState(state);
        }
        if (!prefs.contains("name") && !prefs.contains("email")) {
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

    private void fill(String key) {
        String value = prefs.getString(key, "");
        if (value.length() == 0) {
            Toast.makeText(this, "Chưa có dữ liệu, bấm Sửa để nhập", Toast.LENGTH_SHORT).show();
            return;
        }
        String js = "(function(v){var e=document.activeElement;"
                + "if(!e||(e.tagName!=='INPUT'&&e.tagName!=='TEXTAREA'))return 'no';"
                + "var p=e.tagName==='INPUT'?HTMLInputElement.prototype:HTMLTextAreaElement.prototype;"
                + "Object.getOwnPropertyDescriptor(p,'value').set.call(e,v);"
                + "e.dispatchEvent(new Event('input',{bubbles:true}));"
                + "e.dispatchEvent(new Event('change',{bubbles:true}));"
                + "return 'ok';})(" + JSONObject.quote(value) + ")";
        web.evaluateJavascript(js, new android.webkit.ValueCallback<String>() {
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
        final EditText[] fields = new EditText[KEYS.length];
        for (int i = 0; i < KEYS.length; i++) {
            EditText et = new EditText(this);
            et.setHint(LABELS[i]);
            et.setText(prefs.getString(KEYS[i], ""));
            et.setSingleLine(!KEYS[i].equals("address"));
            fields[i] = et;
            box.addView(et);
        }
        new AlertDialog.Builder(this)
                .setTitle("Thông tin của bạn (lưu trên máy)")
                .setView(box)
                .setPositiveButton("Lưu", new DialogInterface.OnClickListener() {
                    @Override public void onClick(DialogInterface d, int w) {
                        SharedPreferences.Editor ed = prefs.edit();
                        for (int i = 0; i < KEYS.length; i++) {
                            ed.putString(KEYS[i], fields[i].getText().toString().trim());
                        }
                        ed.apply();
                    }
                })
                .setNegativeButton("Đóng", null)
                .show();
    }
}
