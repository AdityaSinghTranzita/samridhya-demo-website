/**
 * Cache management utilities that preserve local storage
 */

// Clear all browser caches except local storage
export const clearBrowserCache = async (): Promise<void> => {
  try {
    // Clear service worker cache
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }

    // Clear browser cache
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }

    // Clear session storage (but keep local storage)
    if ('sessionStorage' in window) {
      sessionStorage.clear();
    }

    console.log('Browser cache cleared successfully');
  } catch (error) {
    console.error('Error clearing browser cache:', error);
  }
};

// Force reload without cache
export const forceReload = (): void => {
  if (typeof window !== 'undefined') {
    // Clear cache and reload
    window.location.reload();
  }
};

// Check if page was loaded from cache
export const isLoadedFromCache = (): boolean => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    return window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD;
  }
  return false;
};

// Add cache-busting parameters to URLs
export const addCacheBuster = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_cb=${Date.now()}`;
};

// Preserve local storage data during cache clearing
export const preserveLocalStorage = (): Record<string, any> => {
  if (typeof window !== 'undefined' && 'localStorage' in window) {
    const preserved: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        preserved[key] = localStorage.getItem(key);
      }
    }
    return preserved;
  }
  return {};
};

// Restore local storage data
export const restoreLocalStorage = (data: Record<string, any>): void => {
  if (typeof window !== 'undefined' && 'localStorage' in window) {
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        localStorage.setItem(key, value);
      }
    });
  }
};

// Initialize cache management
export const initCacheManagement = (): void => {
  if (typeof window !== 'undefined') {
    // Clear cache on page load
    clearBrowserCache();

    // Force reload if loaded from cache
    if (isLoadedFromCache()) {
      forceReload();
    }

    // Add cache-busting to all fetch requests
    const originalFetch = window.fetch;
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
      if (typeof input === 'string') {
        input = addCacheBuster(input);
      }
      return originalFetch.call(this, input, init);
    };
  }
}; 