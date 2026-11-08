package com.caotri.donhang;

import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/** Bọc trang web order-app (nằm trong assets/www) bằng một WebView toàn màn hình. */
public class MainActivity extends Activity {
    private WebView web;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(0xFF1B1C1F);
        getWindow().setNavigationBarColor(0xFF1B1C1F);

        web = new WebView(this);
        web.setBackgroundColor(0xFF121212);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true); // lưu nháp đơn và lịch sử (localStorage)
        s.setAllowFileAccess(true);
        s.setSupportZoom(false);

        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        web.setWebViewClient(new WebViewClient()); // giữ mọi điều hướng trong app
        setContentView(web);

        if (savedInstanceState != null) {
            web.restoreState(savedInstanceState);
        } else {
            web.loadUrl("file:///android_asset/www/index.html");
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        web.saveState(outState);
    }

    /** Back: đóng hộp thoại trong trang trước, hết hộp thoại thì thoát app. */
    @Override
    public void onBackPressed() {
        web.evaluateJavascript(
            "(window.__onBack && window.__onBack()) ? '1' : '0'",
            new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String value) {
                    if (value == null || !value.contains("1")) {
                        MainActivity.super.onBackPressed();
                    }
                }
            });
    }

    /** Cầu nối JS -> Android: sao chép vào clipboard hệ thống. */
    private class Bridge {
        @JavascriptInterface
        public void copy(String text) {
            ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
            cm.setPrimaryClip(ClipData.newPlainText("don-hang", text));
        }
    }
}
