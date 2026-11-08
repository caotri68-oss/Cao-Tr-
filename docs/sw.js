// Đổi số phiên bản mỗi khi sửa file của app (và đổi APP_VER trong index.html cho khớp).
const VER='tpcn-v2-40';
const SHELL=['./','index.html','kb.js','manifest.webmanifest','icon-192.png','icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VER).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VER).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
// Có mạng: luôn lấy bản mới nhất từ máy chủ (kiểm tra lại với máy chủ mỗi lần).
// Mất mạng: dùng bản đã lưu để app vẫn mở được.
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{
    if(res.ok){const c=res.clone();caches.open(VER).then(x=>x.put(r,c))}
    return res;
  }).catch(()=>caches.match(r,{ignoreSearch:true})));
});
