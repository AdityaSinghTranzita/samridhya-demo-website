import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero1";
import WhatWeOffer from "@/components/Whatweoffer";
import Tools from "@/components/Tools";
import WhyChoose from "@/components/WhyChoose";
import KeyFeatures from "@/components/KeyFeatures";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";

export default function Home() {
    const [isPageReady, setIsPageReady] = useState(false);

    useEffect(() => {
        // Ensure the page is ready after a short delay
        const timer = setTimeout(() => {
            setIsPageReady(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head>
                <title>Samridhya - Instant Personal Loans, Business Loans & More | Apply Online</title>
                <meta name="description" content="Get instant personal loans, business loans, education loans, wedding loans, travel loans, and medical loans from Samridhya. Quick approval, competitive rates, minimal documentation. Apply online today!" />
                <meta name="keywords" content="personal loan, business loan, education loan, wedding loan, travel loan, medical loan, instant loan, online loan, EMI calculator, quick approval, competitive rates" />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Samridhya - Instant Personal Loans, Business Loans & More" />
                <meta property="og:description" content="Get instant personal loans, business loans, education loans, wedding loans, travel loans, and medical loans from Samridhya. Quick approval, competitive rates, minimal documentation." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://samridhya.com" />
                <meta property="og:image" content="https://samridhya.com/samridhya-preview.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Samridhya - Instant Personal Loans, Business Loans & More" />
                <meta property="og:site_name" content="Samridhya" />
                <meta property="og:locale" content="en_US" />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Samridhya - Instant Personal Loans, Business Loans & More" />
                <meta name="twitter:description" content="Get instant personal loans, business loans, education loans, wedding loans, travel loans, and medical loans from Samridhya." />
                <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.png" />
                <meta name="twitter:image:alt" content="Samridhya - Instant Personal Loans, Business Loans & More" />
                <meta name="twitter:site" content="@samridhya" />
                <meta name="twitter:creator" content="@samridhya" />
                
                {/* Additional Meta Tags */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow" />
                <link rel="canonical" href="https://samridhya.com" />
                
                {/* Mobile Meta Tags */}
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Samridhya" />
            </Head>
            <div 
                className={`min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 transition-opacity duration-300 ${
                    isPageReady ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <Navbar/>
                <section id="home" className="scroll-mt-24">
                    <Hero/>
                </section>

                <section id="personal" className="py-8 sm:py-16">
                    <WhatWeOffer />
                </section>

                <section>
                    <Tools />
                </section>
            
                <section>
                    <WhyChoose />
                </section>
                <section>
                    <KeyFeatures />
                </section>
                <section>
                    <Testimonials />
                </section>
                <section>
                    <Partners />
                </section>
                <section id="faqs" className="py-8 sm:py-16 scroll-mt-20">
                    <Faq />
                </section>
                <section>
                    <CTA />
                </section>
            </div>
        </>
    );
}
