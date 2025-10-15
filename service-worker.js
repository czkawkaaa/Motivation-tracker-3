// Service Worker for Kawaii Quest PWA
const CACHE_NAME = 'kawaii-quest-v1';
const urlsToCache = [
  '/Motivation-tracker-3/',
  '/Motivation-tracker-3/index.html',
  '/Motivation-tracker-3/app.js',
  '/Motivation-tracker-3/styles.css',
  '/Motivation-tracker-3/firebase-sync.js',
  '/Motivation-tracker-3/firebase-config.js',
  '/Motivation-tracker-3/manifest.json',
  '/Motivation-tracker-3/icon.svg'
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Handle widget updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-widget') {
    event.waitUntil(updateWidget());
  }
});

async function updateWidget() {
  try {
    // Get widget data from localStorage (via clients)
    const clients = await self.clients.matchAll();
    if (clients.length > 0) {
      const client = clients[0];
      const widgetData = await client.postMessage({ type: 'GET_WIDGET_DATA' });
      
      // Update widget-data.json
      if (widgetData) {
        const cache = await caches.open(CACHE_NAME);
        const response = new Response(JSON.stringify(widgetData), {
          headers: { 'Content-Type': 'application/json' }
        });
        await cache.put('/Motivation-tracker-3/widget-data.json', response);
      }
    }
  } catch (error) {
    console.error('Widget update failed:', error);
  }
}

// Listen for messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_WIDGET') {
    const widgetData = event.data.data;
    caches.open(CACHE_NAME).then((cache) => {
      const response = new Response(JSON.stringify(widgetData), {
        headers: { 'Content-Type': 'application/json' }
      });
      cache.put('/Motivation-tracker-3/widget-data.json', response);
    });
  }
});
