// Service Worker for Samridhya Blog
// Provides offline support, caching, and performance optimization

const CACHE_NAME = 'samridhya-blog-v1.0.0';
const STATIC_CACHE = 'samridhya-static-v1.0.0';
const DYNAMIC_CACHE = 'samridhya-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/blog/',
  '/404.html',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/images/samridhya-preview.png',
  '/images/Samridhya_Hero.webp',
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (except API calls)
  if (!url.origin.includes(location.origin) && !url.href.includes('api-brz76cmlca-uc.a.run.app')) {
    return;
  }
  
  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    // Static assets - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (isAPIRequest(request.url)) {
    // API requests - network first, then cache
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else {
    // HTML pages - network first, then cache
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Cache first strategy
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

// Network first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for HTML requests
    if (request.headers.get('accept').includes('text/html')) {
      return caches.match('/404.html');
    }
    
    return new Response('Offline content not available', { status: 503 });
  }
}

// Check if request is for static assets
function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
  return staticExtensions.some(ext => url.includes(ext));
}

// Check if request is for API
function isAPIRequest(url) {
  return url.includes('api-brz76cmlca-uc.a.run.app') || url.includes('/api/');
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Handle any pending offline actions
    console.log('Service Worker: Performing background sync');
    
    // You can add offline action handling here
    // For example, syncing blog post likes, comments, etc.
    
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/images/samridhya-preview.png',
      badge: '/images/samridhya-preview.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'View Blog',
          icon: '/images/samridhya-preview.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/images/samridhya-preview.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/blog/')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_BLOG_DATA') {
    event.waitUntil(cacheBlogData(event.data.data));
  }
});

// Cache blog data for offline access
async function cacheBlogData(data) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    
    // Cache blog posts data
    if (data.posts) {
      const response = new Response(JSON.stringify(data.posts), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put('/api/blog/posts', response);
    }
    
    // Cache categories data
    if (data.categories) {
      const response = new Response(JSON.stringify(data.categories), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put('/api/blog/categories', response);
    }
    
    console.log('Service Worker: Blog data cached for offline access');
  } catch (error) {
    console.error('Service Worker: Failed to cache blog data', error);
  }
} 