import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { initGA, trackPageView } from '@/utils/analytics'
import { AuthProvider } from '@/contexts/AuthContext'
import PageLoader from '@/components/PageLoader'
// Temporarily disable cache management to fix redirect loops
// import { initCacheManagement, preserveLocalStorage, restoreLocalStorage } from '@/utils/cacheUtils'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Temporarily disabled cache management to fix redirect loops
    // const preservedData = preserveLocalStorage();
    // initCacheManagement();
    // restoreLocalStorage(preservedData);
    
    // Initialize Google Analytics
    initGA();
    


    // Temporarily disabled service worker registration to fix redirect loops
    // Register service worker
    // if ('serviceWorker' in navigator) {
    //   window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //       .then((registration) => {
    
    //       })
    //       .catch((registrationError) => {
    
    //       });
    //   });
    // }
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
        {/* Temporarily disabled cache-busting meta tags to fix redirect loops */}
        {/* {process.env.NODE_ENV === 'development' && (
          <>
            <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
            <meta httpEquiv="Pragma" content="no-cache" />
            <meta httpEquiv="Expires" content="0" />
            <meta name="cache-control" content="no-cache, no-store, must-revalidate" />
            <meta name="pragma" content="no-cache" />
            <meta name="expires" content="0" />
          </>
        )} */}
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="https://framerusercontent.com/images/kvNaGEJ2iLiDZTVtaiNCqdyUZM.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/images/Samridhya_Hero.png"
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
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/_next/static/css/app.css" as="style" />
        <link rel="preload" href="/_next/static/css/globals.css" as="style" />
        
        {/* Inline critical CSS for immediate loading */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .page-loader {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #ffffff;
              font-family: system-ui, -apple-system, sans-serif;
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `
        }} />
        
        {/* Performance meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Disable automatic image scaling */}
        <meta name="format-detection" content="telephone=no" />
      </Head>
      
      <PageLoader>
        <Component {...pageProps} />
      </PageLoader>
    </AuthProvider>
  )
}
