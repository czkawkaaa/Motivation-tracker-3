// Service Worker for Kawaii Quest PWA
const CACHE_NAME = 'kawaii-quest-v1';
const WIDGET_CACHE = 'kawaii-quest-widgets-v1';

// Files to cache for offline functionality
const STATIC_ASSETS = [
  '/Motivation-tracker-3/',
  '/Motivation-tracker-3/index.html',
  '/Motivation-tracker-3/styles.css',
  '/Motivation-tracker-3/app.js',
  '/Motivation-tracker-3/icon.svg',
  '/Motivation-tracker-3/manifest.json'
];

// Widget files
const WIDGET_ASSETS = [
  '/Motivation-tracker-3/widgets/progress-widget.html',
  '/Motivation-tracker-3/widgets/tasks-widget.html',
  '/Motivation-tracker-3/widgets/motivation-widget.html',
  '/Motivation-tracker-3/widgets/progress-data.json',
  '/Motivation-tracker-3/widgets/tasks-data.json',
  '/Motivation-tracker-3/widgets/motivation-data.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(WIDGET_CACHE).then((cache) => {
        console.log('Service Worker: Caching widget assets');
        return cache.addAll(WIDGET_ASSETS);
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== WIDGET_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // Widget data requests - always try network first for fresh data
  if (url.pathname.includes('/widgets/') && url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the response
          const responseClone = response.clone();
          caches.open(WIDGET_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cached version
          return caches.match(request);
        })
    );
    return;
  }
  
  // Static assets - cache first, then network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(request).then((response) => {
        // Don't cache if not successful
        if (!response || response.status !== 200) {
          return response;
        }
        
        // Clone and cache the response
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });
        
        return response;
      });
    })
  );
});

// Handle widget update requests
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_WIDGETS') {
    console.log('Service Worker: Updating widget data');
    updateWidgetData(event.data.payload);
  }
});

// Update widget data files
function updateWidgetData(data) {
  const widgetUpdates = [
    {
      url: '/Motivation-tracker-3/widgets/progress-data.json',
      data: {
        currentDay: data.challenge?.currentDay || 0,
        totalDays: data.challenge?.totalDays || 75,
        progress: Math.round(((data.challenge?.currentDay || 0) / (data.challenge?.totalDays || 75)) * 100),
        streak: data.streak || 0,
        badges: data.badges ? Object.keys(data.badges).filter(k => data.badges[k]).length : 0,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      url: '/Motivation-tracker-3/widgets/tasks-data.json',
      data: {
        tasks: data.tasks || [],
        completedCount: 0,
        totalCount: data.tasks?.length || 0,
        completedTasks: data.completedTasks || {},
        lastUpdated: new Date().toISOString()
      }
    },
    {
      url: '/Motivation-tracker-3/widgets/motivation-data.json',
      data: {
        quote: getRandomQuote(),
        currentDay: data.challenge?.currentDay || 0,
        totalDays: data.challenge?.totalDays || 75,
        lastUpdated: new Date().toISOString()
      }
    }
  ];
  
  // Update cache with new data
  caches.open(WIDGET_CACHE).then((cache) => {
    widgetUpdates.forEach((update) => {
      const response = new Response(JSON.stringify(update.data), {
        headers: { 'Content-Type': 'application/json' }
      });
      cache.put(update.url, response);
    });
  });
}

// Helper function to get random quote
function getRandomQuote() {
  const quotes = [
    "Jesteś silniejsza niż myślisz! 💖",
    "Każdy krok to postęp! ✨",
    "Wierzę w Ciebie! 🌸",
    "Możesz wszystko! 💪",
    "Dziś jest Twój dzień! ☀️"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

console.log('Service Worker: Loaded');
