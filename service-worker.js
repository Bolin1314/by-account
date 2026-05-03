// by_account · Service Worker (PWA L1)
// 策略：靜態檔 cache-first；API（POST 到 Apps Script）一律 network-only。

const CACHE = 'by_account-v0.7.2';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  // 浣熊插畫
  './icons/empty-no-ledger.png',
  './icons/empty-no-records.png',
  './icons/type-expense.png',
  './icons/type-income.png',
  './icons/type-transfer.png',
  './icons/ledger-shared.png',
  './icons/ledger-private.png',
  './icons/ledger-locked.png',
  './icons/nav-home.png',
  './icons/nav-add.png',
  './icons/nav-settings.png',
  './icons/time-morning.png',
  './icons/time-noon.png',
  './icons/time-afternoon.png',
  './icons/time-night.png',
  './icons/cat-food.png',
  './icons/cat-transport.png',
  './icons/cat-shopping.png',
  './icons/cat-home.png',
  './icons/cat-medical.png',
  './icons/cat-entertainment.png',
  './icons/cat-other.png',
  './icons/cat-salary.png',
  './icons/cat-bonus.png',
  './icons/cat-other-income.png',
  './icons/loading.png',
  './icons/back.png',
  './icons/menu.png',
  './icons/logout.png',
  './icons/connection.png',
  './icons/users.png',
  './icons/warning.png',
  './icons/save.png',
  './icons/edit.png',
  './icons/forbidden.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // 非 GET → 直接走網路
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 第三方 → 網路優先，失敗 fallback cache
  if (url.origin !== self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // 同源靜態檔 → cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
