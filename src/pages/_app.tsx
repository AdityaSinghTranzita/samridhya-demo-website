import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { initPerformanceMonitoring } from '@/utils/performance'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initPerformanceMonitoring();
    
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
  }, []);

  return (
    <>
      <Head>
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
      <Component {...pageProps} />
    </>
  )
}
