package com.caotri.sothuchi;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.CookieManager;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

/** Khung app mở web app Apps Script của sổ thu chi. Địa chỉ được nhập một lần và lưu trong máy. */
public class MainActivity extends Activity {
    private static final String PREFIX = "https://script.google.com/";
    private WebView web;
    private SharedPreferences prefs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = getSharedPreferences("cfg", MODE_PRIVATE);
        String url = prefs.getString("url", null);
        if (url == null) {
            hienNhapDiaChi();
        } else {
            hienWeb(url);
        }
    }

    private void hienNhapDiaChi() {
        LinearLayout box = new LinearLayout(this);
        box.setOrientation(LinearLayout.VERTICAL);
        box.setGravity(Gravity.CENTER_VERTICAL);
        int p = (int) (24 * getResources().getDisplayMetrics().density);
        box.setPadding(p, p, p, p);
        box.setFitsSystemWindows(true);

        TextView tieuDe = new TextView(this);
        tieuDe.setText("Sổ thu chi nhà mình");
        tieuDe.setTextSize(22);
        tieuDe.setTextColor(Color.parseColor("#1F1B33"));
        box.addView(tieuDe);

        TextView huongDan = new TextView(this);
        huongDan.setText("Dán địa chỉ web app (kết thúc bằng /exec) mà người quản lý sổ đã gửi.");
        huongDan.setPadding(0, p / 2, 0, p / 2);
        box.addView(huongDan);

        final EditText o = new EditText(this);
        o.setHint(PREFIX + "macros/s/.../exec");
        o.setSingleLine(true);
        box.addView(o, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        Button nut = new Button(this);
        nut.setText("Mở sổ");
        nut.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) {
                String u = o.getText().toString().trim();
                if (!u.startsWith(PREFIX)) {
                    Toast.makeText(MainActivity.this, "Địa chỉ phải bắt đầu bằng " + PREFIX, Toast.LENGTH_LONG).show();
                    return;
                }
                prefs.edit().putString("url", u).apply();
                hienWeb(u);
            }
        });
        box.addView(nut);
        setContentView(box);
    }

    private void hienWeb(String url) {
        web = new WebView(this);
        web.setFitsSystemWindows(true);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setLoadWithOverviewMode(false);
        CookieManager cm = CookieManager.getInstance();
        cm.setAcceptCookie(true);
        cm.setAcceptThirdPartyCookies(web, true);
        web.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                String host = r.getUrl().getHost();
                if (host != null && (host.endsWith("google.com") || host.endsWith("googleusercontent.com"))) {
                    return false;
                }
                startActivity(new Intent(Intent.ACTION_VIEW, r.getUrl()));
                return true;
            }
            @Override public void onReceivedError(WebView v, WebResourceRequest r, WebResourceError e) {
                if (r.isForMainFrame()) {
                    Toast.makeText(MainActivity.this, "Không mở được sổ. Kiểm tra mạng rồi mở lại app.", Toast.LENGTH_LONG).show();
                }
            }
        });
        setContentView(web);
        web.loadUrl(url);
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack()) {
            web.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
