// 🌸 Kawaii Quest - Service Worker
// Obsługuje PWA, cache, i widgety

const CACHE_NAME = 'kawaii-quest-v9'; // <-- Zmieniono na v9 dla wymuszenia aktualizacji u znajomych
const urlsToCache = [
  '/Motivation-tracker-3/',
  '/Motivation-tracker-3/index.html',
  '/Motivation-tracker-3/styles.css',
  '/Motivation-tracker-3/app.js',
  '/Motivation-tracker-3/i18n.js',
  '/Motivation-tracker-3/script.js',
  '/Motivation-tracker-3/firebase-config.js',
  '/Motivation-tracker-3/firebase-sync.js',
  '/Motivation-tracker-3/manifest.json'
];

// Instalacja Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching app shell');
        return cache.addAll(urlsToCache).catch((error) => {
          console.error('⚠️ Cache error (non-critical):', error);
          // Kontynuuj mimo błędu - strona będzie działać
          return Promise.resolve();
        });
      })
  );
  self.skipWaiting();
});

// Aktywacja Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch - dla strony i plików aplikacji preferuj sieć, cache tylko jako fallback
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isAppAsset = isSameOrigin && requestUrl.pathname.startsWith('/Motivation-tracker-3/');
  const isDocument = event.request.mode === 'navigate' || event.request.destination === 'document';
  const isCriticalAsset = isAppAsset && /\.(html|js|css|json)$/i.test(requestUrl.pathname);

  if (isDocument || isCriticalAsset) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            // FIX: Klonujemy odpowiedź synchronicznie, zanim przeglądarka ją "zje"
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache).catch((error) => {
                console.warn('⚠️ Cache.put failed (non-critical):', error);
              });
            });
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Sprawdź czy URL używa supportowanego schematu
          if (!requestUrl.protocol.startsWith('http')) {
            // Ignoruj chrome-extension, moz-extension, itp.
            return response;
          }
          
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache).catch((error) => {
                console.warn('⚠️ Cache.put failed (non-critical):', error);
              });
            })
            .catch((error) => {
              console.warn('⚠️ Caches.open failed (non-critical):', error);
            });
          
          return response;
        });
      })
  );
});

// Periodic Background Sync dla aktualizacji widgetów
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-widget') {
    console.log('🔄 Updating widget via periodic sync');
    event.waitUntil(updateWidgetContent());
  }
});

// Obsługa wiadomości od aplikacji
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }

  if (event.data && event.data.type === 'UPDATE_WIDGET') {
    console.log('📨 Received widget update request');
    updateWidgetContent(event.data.widgetData);
    return;
  }

  // Obsłuż zapytanie o dane widgetu przesłane przez MessageChannel
  if (event.data && event.data.type === 'GET_WIDGET_DATA') {
    if (event.ports && event.ports[0]) {
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          const resp = await cache.match('/Motivation-tracker-3/widget-data.json');
          if (resp) {
            const json = await resp.json();
            event.ports[0].postMessage(json);
            return;
          }
        } catch (e) {
          console.warn('Błąd odczytu widget-data z cache:', e);
        }
        event.ports[0].postMessage(null);
      });
    } else if (event.source) {
      // fallback
      event.source.postMessage({ type: 'NO_WIDGET_PORT' });
    }
    return;
  }
});

// Funkcja aktualizacji zawartości widgetu
async function updateWidgetContent(widgetData) {
  try {
    if (!widgetData) {
      const clients = await self.clients.matchAll();
      if (clients.length > 0) {
        const data = await new Promise((resolve) => {
          const channel = new MessageChannel();
          channel.port1.onmessage = (event) => {
            resolve(event.data);
          };
          clients[0].postMessage({ type: 'GET_WIDGET_DATA' }, [channel.port2]);
        });
        widgetData = data;
      }
    }

    if (!widgetData) {
      console.warn('⚠️ No widget data available');
      return;
    }

    const cache = await caches.open(CACHE_NAME);
    const widgetDataResponse = new Response(JSON.stringify(widgetData), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  await cache.put('widget-data.json', widgetDataResponse);
    
    console.log('✅ Widget data updated in cache:', widgetData);    if (self.widgets && typeof self.widgets.updateByTag === 'function') {
      try {
        await self.widgets.updateByTag('challenge-progress', { data: widgetData });
        await self.widgets.updateByTag('daily-tasks', { data: widgetData });
        console.log('🎨 Widgets refreshed');
      } catch (err) {
        console.warn('Widgets API error:', err);
      }
    }
  } catch (error) {
    console.error('❌ Error updating widget:', error);
  }
}

console.log('🌸 Kawaii Quest Service Worker loaded');