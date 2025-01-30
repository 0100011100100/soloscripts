self.addEventListener('install', (event) => {
    console.log('Service worker installing...');
    // Perform install steps
    event.waitUntil(
        caches.open('v1').then((cache) => {
            console.log('Caching app shell');
            return cache.addAll([
                '/',
                'yes.html', // or your custom HTML file name
                'manifest.json',
                'icon.png',
                // Add any additional assets you want to cache here
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
