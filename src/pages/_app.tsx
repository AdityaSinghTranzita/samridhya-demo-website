import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { initPerformanceMonitoring } from '@/utils/performance'
import { initGA, trackPageView } from '@/utils/analytics'
import { AuthProvider } from '@/contexts/AuthContext'
import { initCacheManagement, preserveLocalStorage, restoreLocalStorage } from '@/utils/cacheUtils'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preserve local storage before cache clearing
    const preservedData = preserveLocalStorage();
    
    // Initialize cache management
    initCacheManagement();
    
    // Restore local storage after cache clearing
    restoreLocalStorage(preservedData);
    
    // Initialize Google Analytics
    initGA();
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Hide loading state after CSS is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
      document.body.classList.remove('loading');
    }, 100);

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
    
          })
          .catch((registrationError) => {
    
          });
      });
    }

    return () => clearTimeout(timer);
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <AuthProvider>
      <Head>
        {/* Cache-busting meta tags */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="cache-control" content="no-cache, no-store, must-revalidate" />
        <meta name="pragma" content="no-cache" />
        <meta name="expires" content="0" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="https://framerusercontent.com/images/kvNaGEJ2iLiDZTVtaiNCqdyUZM.png"
          as="image"
          type="image/png"
        />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//framerusercontent.com" />
        <link rel="dns-prefetch" href="//upload.wikimedia.org" />
        <link rel="dns-prefetch" href="//developer.apple.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://framerusercontent.com" />
        <link rel="preconnect" href="https://upload.wikimedia.org" />
        <link rel="preconnect" href="https://developer.apple.com" />
        
        {/* Font optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Performance meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Disable automatic image scaling */}
        <meta name="format-detection" content="telephone=no" />
      </Head>
      
      {/* Loading placeholder */}
      {isLoading && (
        <div className="loading-placeholder" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom right, #f8fafc, #e0f2fe, #e0e7ff)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      
      <div className={isLoading ? 'loading' : 'loaded'}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}
