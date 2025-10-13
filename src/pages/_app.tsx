import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { initGA, trackPageView } from '@/utils/analytics'
import { AuthProvider } from '@/contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    initGA();
  }, []);

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
        <link rel="preload" href="https://framerusercontent.com/images/kvNaGEJ2iLiDZTVtaiNCqdyUZM.png" as="image" type="image/png" />
        <link rel="preload" href="/images/Samridhya_Hero.webp" as="image" type="image/webp" />

        <link rel="dns-prefetch" href="//framerusercontent.com" />
        <link rel="dns-prefetch" href="//upload.wikimedia.org" />
        <link rel="dns-prefetch" href="//developer.apple.com" />

        <link rel="preconnect" href="https://framerusercontent.com" />
        <link rel="preconnect" href="https://upload.wikimedia.org" />
        <link rel="preconnect" href="https://developer.apple.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="p:domain_verify" content="44864b52a292c673b00c3de3ff9298f2"/>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
