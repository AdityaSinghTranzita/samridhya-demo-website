import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function CacheTestSimple() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [loadCount, setLoadCount] = useState<number>(0);
  const [localStorageData, setLocalStorageData] = useState<any>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Update current time every second
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Handle localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      // Increment load count
      const currentCount = window.localStorage.getItem('page-load-count') || '0';
      const newCount = parseInt(currentCount) + 1;
      window.localStorage.setItem('page-load-count', newCount.toString());
      setLoadCount(newCount);

      // Get localStorage data
      const storedData = window.localStorage.getItem('cache-test-data');
      if (storedData) {
        setLocalStorageData(JSON.parse(storedData));
      }

      // Update localStorage data
      const newData = {
        testValue: 'This should persist',
        timestamp: Date.now(),
        lastVisit: new Date().toISOString()
      };
      window.localStorage.setItem('cache-test-data', JSON.stringify(newData));
      setLocalStorageData(newData);
    }

    return () => clearInterval(interval);
  }, []);

  const clearCache = async () => {
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        alert('Cache cleared successfully!');
      } catch (error) {
        alert('Error clearing cache: ' + error);
      }
    } else {
      alert('Cache API not available');
    }
  };

  const forceReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const clearLocalStorage = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('cache-test-data');
      window.localStorage.removeItem('page-load-count');
      setLocalStorageData({});
      setLoadCount(0);
      alert('Local storage cleared!');
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Cache Test - Samridhya</title>
        <meta name="description" content="Testing cache prevention" />
        {/* Cache-busting meta tags */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Cache Prevention Test (Simple)</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Time */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Current Time</h2>
              <p className="text-2xl font-mono text-blue-600">{currentTime}</p>
              <p className="text-sm text-gray-600 mt-2">
                This should update every second. If cached, it might show old time.
              </p>
            </div>

            {/* Page Load Count */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Page Load Count</h2>
              <p className="text-2xl font-mono text-green-600">{loadCount}</p>
              <p className="text-sm text-gray-600 mt-2">
                This should increment on each page load/refresh.
              </p>
            </div>

            {/* Local Storage Data */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Local Storage Data</h2>
              <div className="space-y-2">
                <p><strong>Test Value:</strong> {localStorageData.testValue || 'Not set'}</p>
                <p><strong>Timestamp:</strong> {localStorageData.timestamp ? new Date(localStorageData.timestamp).toLocaleString() : 'Not set'}</p>
                <p><strong>Last Visit:</strong> {localStorageData.lastVisit ? new Date(localStorageData.lastVisit).toLocaleString() : 'Not set'}</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                This data should persist even when cache is cleared.
              </p>
            </div>

            {/* Cache Status */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Cache Status</h2>
              <div className="space-y-2">
                <p><strong>Service Worker:</strong> {typeof window !== 'undefined' && 'serviceWorker' in navigator ? 'Available' : 'Not Available'}</p>
                <p><strong>Cache API:</strong> {typeof window !== 'undefined' && 'caches' in window ? 'Available' : 'Not Available'}</p>
                <p><strong>Local Storage:</strong> {typeof window !== 'undefined' && 'localStorage' in window ? 'Available' : 'Not Available'}</p>
              </div>
            </div>
          </div>

          {/* Test Controls */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={clearCache}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Clear Cache
              </button>
              <button
                onClick={forceReload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Force Reload
              </button>
              <button
                onClick={clearLocalStorage}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Clear Local Storage
              </button>
              <button
                onClick={() => typeof window !== 'undefined' && (window.location.href = '/cache-test-simple')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Navigate to This Page
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800">How to Test</h2>
            <ol className="list-decimal list-inside space-y-2 text-yellow-700">
              <li>Note the current time and load count</li>
              <li>Click "Clear Cache" to clear browser cache</li>
              <li>Click "Force Reload" to reload the page</li>
              <li>Verify that the time updates and load count increments</li>
              <li>Check that local storage data persists</li>
              <li>Try navigating away and back to this page</li>
              <li>Test in different browsers and incognito mode</li>
            </ol>
          </div>

          {/* Expected Results */}
          <div className="mt-8 bg-green-50 border border-green-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Expected Results</h2>
            <ul className="list-disc list-inside space-y-2 text-green-700">
              <li>✅ Time should always be current (not cached)</li>
              <li>✅ Load count should increment on each visit</li>
              <li>✅ Local storage data should persist</li>
              <li>✅ Page should always load fresh content</li>
              <li>✅ No stale cache should be served</li>
            </ul>
          </div>

          {/* Cache Headers Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Cache Prevention Methods Used</h2>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              <li>✅ Dynamic build ID with timestamp</li>
              <li>✅ Cache-busting meta tags</li>
              <li>✅ Service worker configured for no-caching</li>
              <li>✅ Cache clearing utilities</li>
              <li>✅ Local storage preservation during cache clearing</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
} 