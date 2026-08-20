const CACHE_NAME = 'boutik-safe-v4';
const CORE_ASSETS = [
  './',
  './index.html',
  './application.html',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './manifest.json',
  './product-placeholder.svg',
  './images/alimentaire.svg',
  './images/agriculture.svg',
  './images/vehicules.svg',
  './images/electronique.svg',
  './images/mode.svg',
  './images/maison.svg',
  './images/construction.svg',
  './images/machines.svg',
  './images/beaute.svg',
  './images/services.svg'
];
const CDN_ASSETS = [
  'https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(async c => {
        await c.addAll(CORE_ASSETS);
        // Bibliothèques externes : mises en cache une par une pour ne pas
        // bloquer l'installation si l'une d'elles est temporairement injoignable.
        await Promise.all(CDN_ASSETS.map(url =>
          fetch(url, { mode: 'cors' })
            .then(res => res.ok && c.put(url, res))
            .catch(() => {})
        ));
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
