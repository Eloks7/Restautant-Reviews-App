let staticCacheName = 'restaurants-static-cache-v1';

self.addEventListener('install', function(e) {
    e.waitUntil(caches.open(staticCacheName).then(function(cache){
        return cache.addAll([
            './',
            './index.html',
			'./restaurant.html',
			'./css/styles.css',
			'./data/restaurants.json',
			'./js/dbhelper.js',
			'./js/main.js',
			'./js/restaurant_info.js',
			'./js/sw_register.js',
			'./img/1.jpg',
			'./img/2.jpg',
			'./img/3.jpg',
			'./img/4.jpg',
			'./img/5.jpg',
			'./img/6.jpg',
			'./img/7.jpg',
			'./img/8.jpg',
			'./img/9.jpg',
			'./img/10.jpg'
        ]);
    }));
});

self.addEventListener('fetch', function(e) {
    e.respondWith(caches.match(e.request). then(function(response){
        if (response) return response;
        return fetch(e.request);
    }));
});

self.addEventListener('activate', function(e) {
    e.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.filter(function(cacheName){
                return cacheName.startsWith('restaurants-') &&
                       cacheName != staticCacheName;
            }).map(function(cacheName) {
                return caches.delete(cacheName);                
            })
        );
    }));
});