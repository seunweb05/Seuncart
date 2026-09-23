const CACHE="seuncart-v5";
self.addEventListener("install",event=>event.waitUntil(self.skipWaiting()));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
	if(event.request.method!=="GET") return;
	const requestUrl=new URL(event.request.url);
	if(event.request.mode==="navigate" || requestUrl.pathname==="/index.html") {
		event.respondWith(fetch(event.request).catch(()=>caches.match("/index.html")));
		return;
	}
	event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
		const copy=response.clone();
		caches.open(CACHE).then(cache=>cache.put(event.request,copy));
		return response;
	}).catch(()=>caches.match("/index.html"))));
});