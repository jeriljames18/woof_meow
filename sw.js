const OFFLINE_VERSION = 1;
const CACHE_NAME = 'offline';
const OFFLINE_URL = '/offline.html';

const urlsToCache = ["/index.html?source=pwa",
    "/",
    "/signup.html",
    "/css/",
    "/js/",
    "/icon/",
    "/images/",
    "/booking.html",
    "/index_dhruv.html",
    "/livetracking.html",
    "/bookinglist.html",
    "/pet_services.html",
    "/pet-registration1.html",
    "/pet-registration2.html",
    "/pet-sitter1.html",
    "/pet-sitter2.html",
    "/pet-sitter3.html",
    "/pet-sitter4.html",
    "/search.html",
    "/user_signup.html",
    "/offline.html"
];

'use strict';

self.addEventListener('install', (event) => {
    event.waitUntil((async() => {
        const cache = await caches.open(CACHE_NAME);
        // Setting {cache: 'reload'} in the new request will ensure that the response
        // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
        await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    })());
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async() => {
        // Enable navigation preload if it's supported.
        // See https://developers.google.com/web/updates/2017/02/navigation-preload
        if ('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    })());

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async() => {
            try {
                // First, try to use the navigation preload response if it's supported.
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                }

                const networkResponse = await fetch(event.request);
                return networkResponse;
            } catch (error) {

                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(event.request);
                return cachedResponse;
            }
        })());
    }
});