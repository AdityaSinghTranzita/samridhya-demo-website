import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
         Cache-busting meta tags
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="cache-control" content="no-cache, no-store, must-revalidate" />
        <meta name="pragma" content="no-cache" />
        <meta name="expires" content="0" />


        
        {/* Preload critical CSS */}
        <link rel="preload" href="/_next/static/css/app.css" as="style" />
        <link rel="preload" href="/_next/static/css/globals.css" as="style" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        
        {/* Favicon - Light and Dark Mode Support */}
        <link rel="icon" type="image/png" href="/favicon-light.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/png" href="/favicon-dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e293b" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="p:domain_verify" content="44864b52a292c673b00c3de3ff9298f2"/>
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WWCF6GPNDF"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WWCF6GPNDF', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true,
              });
            `,
          }}
        />
        

        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1014691167229448');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1014691167229448&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}


         {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="uuJx50jKbzunA1/UhU2rIQ"
          strategy="afterInteractive"
        />
        
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Samridhya" />
        <meta name="application-name" content="Samridhya" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:site_name" content="Samridhya" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://samridhya.com/samridhya-preview.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Samridhya - Instant Personal Loans, Business Loans & More" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@samridhya" />
        <meta name="twitter:creator" content="@samridhya" />
        <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.webp" />
        <meta name="twitter:image:alt" content="Samridhya - Instant Personal Loans, Business Loans & More" />
        
        {/* Additional Meta Tags for Better SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Samridhya" />

        {/* Sitemap Link */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Structured Data for Rich Snippets */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FinancialService",
                "name": "Samridhya",
                "description": "Instant Personal Loans, Business Loans, Education Loans, Wedding Loans, Travel Loans, and Medical Loans.",
                "url": "https://samridhya.com/",
                "logo": "https://samridhya.com/favicon.svg",
                "image": "https://samridhya.com/samridhya-preview.webp",
                "sameAs": [
                  "https://twitter.com/samridhya",
                  "https://facebook.com/samridhya",
                  "https://www.linkedin.com/company/samridhya"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-6366234524",
                  "contactType": "customer service",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                },
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "No.1207/343 & 1207/1/343/1, Sierra Cartel, 9th Main, 7th Sector, HSR Layout",
                  "addressLocality": "Bangalore South",
                  "addressRegion": "Karnataka",
                  "postalCode": "560102",
                  "addressCountry": "IN"
                },
                "areaServed": "India",
                "serviceType": [
                  "Personal Loan",
                  "Business Loan",
                  "Education Loan",
                  "Wedding Loan",
                  "Travel Loan",
                  "Medical Loan",
                  "Gold Loan",
                  "CGSTSME Loan",
                ]
              }),
            }}
        />

      </Head>
      <body className="font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
