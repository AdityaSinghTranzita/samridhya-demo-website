import Head from 'next/head';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero1";
import WhatWeOffer from "@/components/Whatweoffer";
import Tools from "@/components/Tools";
import WhyChoose from "@/components/WhyChoose";
import KeyFeatures from "@/components/KeyFeatures";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";

export default function Home() {
    return (
        <>
            <Head>
                <title>Samridhya - Instant Personal Loans, Business Loans & More | Apply Online</title>
                <meta name="description" content="Get instant personal loans, business loans, education loans, wedding loans, travel loans, and medical loans from Samridhya. Quick approval, competitive rates, minimal documentation. Apply online today!" />
                <meta name="keywords" content="personal loan, business loan, education loan, wedding loan, travel loan, medical loan, instant loan, online loan, EMI calculator" />
                <meta property="og:title" content="Samridhya - Instant Personal Loans, Business Loans & More" />
                <meta property="og:description" content="Get instant personal loans, business loans, education loans, wedding loans, travel loans, and medical loans from Samridhya. Quick approval, competitive rates, minimal documentation." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://samridhya.com" />
                <meta name="twitter:title" content="Samridhya - Instant Personal Loans, Business Loans & More" />
                <meta name="twitter:description" content="Get instant personal loans, business loans, education loans, wedding loans, travel loans, and medical loans from Samridhya." />
            </Head>
            <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">
                <Navbar/>
                <section id="home" className="scroll-mt-24">
                    <Hero/>
                </section>

                <section id="personal" className="py-16">
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
                <section id="faqs" className="py-16 scroll-mt-20">
                    <Faq />
                </section>
                <section>
                    <CTA />
                </section>
            </div>
        </>
    );
}
