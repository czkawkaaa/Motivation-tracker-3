// 🌸 Kawaii Quest - Service Worker
// Obsługuje PWA, cache, i widgety

const CACHE_NAME = 'kawaii-quest-v1';
const urlsToCache = [
  '/Motivation-tracker-3/',
  '/Motivation-tracker-3/index.html',
  '/Motivation-tracker-3/styles.css',
  '/Motivation-tracker-3/app.js',
  '/Motivation-tracker-3/script.js',
  '/Motivation-tracker-3/firebase-config.js',
  '/Motivation-tracker-3/firebase-sync.js',
  '/Motivation-tracker-3/icon.svg',
  '/Motivation-tracker-3/icon-192.png',
  '/Motivation-tracker-3/icon-512.png'
];

// Instalacja Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching app shell');
        return cache.addAll(urlsToCache);
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

// Fetch - strategia cache-first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Zwróć z cache jeśli jest dostępne
        if (response) {
          return response;
        }
        
        // W przeciwnym razie pobierz z sieci
        return fetch(event.request).then((response) => {
          // Sprawdź czy response jest poprawne
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Klonuj response
          const responseToCache = response.clone();
          
          // Dodaj do cache
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// ======================
// WIDGET SUPPORT
// ======================

// Periodic Background Sync dla aktualizacji widgetów
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-widget') {
    console.log('🔄 Updating widget via periodic sync');
    event.waitUntil(updateWidgetContent());
  }
});

// Obsługa wiadomości od aplikacji
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_WIDGET') {
    console.log('📨 Received widget update request');
    updateWidgetContent(event.data.widgetData);
  }
});

// Funkcja aktualizacji zawartości widgetu
async function updateWidgetContent(widgetData) {
  try {
    // Pobierz dane z localStorage lub użyj przekazanych
    if (!widgetData) {
      const clients = await self.clients.matchAll();
      if (clients.length > 0) {
        // Wyślij request do klienta o dane
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

    // Aktualizuj plik widget-data.json w cache
    const cache = await caches.open(CACHE_NAME);
    const widgetDataResponse = new Response(JSON.stringify(widgetData), {
      headers: { 'Content-Type': 'application/json' }
    });
    
    await cache.put('/Motivation-tracker-3/widget-data.json', widgetDataResponse);
    
    console.log('✅ Widget data updated in cache:', widgetData);

    // Powiadom widgety o aktualizacji (jeśli API jest dostępne)
    if (self.widgets) {
      await self.widgets.updateByTag('challenge-progress', {
        data: widgetData
      });
      await self.widgets.updateByTag('daily-tasks', {
        data: widgetData
      });
      console.log('🎨 Widgets refreshed');
    }
  } catch (error) {
    console.error('❌ Error updating widget:', error);
  }
}

// Push notifications (opcjonalne - dla przypomnień)
self.addEventListener('push', (event) => {
  console.log('🔔 Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Czas na dzisiejsze zadania! 🌸',
    icon: '/Motivation-tracker-3/icon-192.png',
    badge: '/Motivation-tracker-3/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/Motivation-tracker-3/'
    },
    actions: [
      {
        action: 'open',
        title: 'Otwórz aplikację'
      },
      {
        action: 'close',
        title: 'Zamknij'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('🌸 Kawaii Quest', options)
  );
});

// Kliknięcie w notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/Motivation-tracker-3/')
    );
  }
});

console.log('🌸 Kawaii Quest Service Worker loaded');
