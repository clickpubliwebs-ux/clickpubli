   const CACHE = "clickpubli-v1";
   self.addEventListener("install", e => {
       e.waitUntil(caches.open(CACHE).then(c => c.addAll(["/", "/index.html", "/manifest.webmanifest", "/icon.svg"])));
   });
   self.addEventListener("fetch", e => {
       e.respondWith(
           caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
               const copy = res.clone();
               if (e.request.method === "GET" && res.ok) caches.open(CACHE).then(c => c.put(e.request, copy));
               return res;
           }).catch(() => caches.match("/index.html")))
       );
   });
