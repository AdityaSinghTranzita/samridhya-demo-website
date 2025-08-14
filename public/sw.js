// Service Worker - No Caching Version
// This service worker prevents caching and always fetches fresh content

const CACHE_NAME = 'samridhya-no-cache-v1';

// Install event - minimal installation
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  self.skipWaiting();
});

// Fetch event - always fetch from network, never cache
self.addEventListener('fetch', (event) => {
  // Skip caching for all requests
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Return fresh response from network
        return response;
      })
      .catch((error) => {
        console.error('Service Worker: Fetch failed:', error);
        // Return a basic offline response if network fails
        return new Response('Network error', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: {
            'Content-Type': 'text/plain',
          },
        });
      })
  );
});

// Activate event - clear all caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Service Worker: Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('Service Worker: All caches cleared');
      return self.clients.claim();
    })
  );
});

// Message event - handle cache clearing requests
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('Service Worker: Clearing cache on request');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
}); 