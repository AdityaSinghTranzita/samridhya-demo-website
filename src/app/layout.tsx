// app/layout.tsx

import './globals.css'
import { ReactNode } from 'react'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { Metadata } from 'next'

// Font setup
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

// Metadata
export const metadata: Metadata = {
  title: 'Samridhya',
  description: 'Smart Credit Solution for India',
  openGraph: {
    title: 'Samridhya',
    description: 'Smart Credit Solution for India',
    url: 'https://samridhya.com',
    siteName: 'Samridhya',
    images: [
      {
        url: 'https://samridhya.com/samridhya-preview.png',
        width: 1200,
        height: 630,
        alt: 'Samridhya - Smart Credit Solution for India',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samridhya',
    description: 'Smart Credit Solution for India',
    images: ['https://samridhya.com/samridhya-preview.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32x32.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
}

// Root layout component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
