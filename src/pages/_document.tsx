import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
        
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Samridhya" />
        <meta name="application-name" content="Samridhya" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:site_name" content="Samridhya" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://samridhya.com/samridhya-preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Samridhya - Instant Personal Loans, Business Loans & More" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@samridhya" />
        <meta name="twitter:creator" content="@samridhya" />
        <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.png" />
        <meta name="twitter:image:alt" content="Samridhya - Instant Personal Loans, Business Loans & More" />
        
        {/* Additional Meta Tags for Better SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Samridhya" />
        
        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Samridhya",
              "description": "Instant Personal Loans, Business Loans, Education Loans, Wedding Loans, Travel Loans, and Medical Loans",
              "url": "https://samridhya.com",
              "logo": "https://samridhya.com/favicon.svg",
              "image": "https://samridhya.com/samridhya-preview.png",
              "sameAs": [
                "https://twitter.com/samridhya",
                "https://facebook.com/samridhya"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service"
              },
              "areaServed": "India",
              "serviceType": [
                "Personal Loan",
                "Business Loan", 
                "Education Loan",
                "Wedding Loan",
                "Travel Loan",
                "Medical Loan"
              ]
            })
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
