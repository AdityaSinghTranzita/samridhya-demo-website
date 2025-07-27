import dynamic from 'next/dynamic';
import Head from 'next/head';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero1";
import LazyLoad from "@/components/LazyLoad";

// Dynamic imports for non-critical components
const WhatWeOffer = dynamic(() => import("@/components/Whatweoffer"), {
  ssr: true
});

const Tools = dynamic(() => import("@/components/Tools"), {
  ssr: true
});

const WhyChoose = dynamic(() => import("@/components/WhyChoose"), {
  ssr: true
});

const KeyFeatures = dynamic(() => import("@/components/KeyFeatures"), {
  ssr: true
});

const TestimonialSection = dynamic(() => import("@/components/Testimonials"), {
  ssr: true
});

const Faq = dynamic(() => import("@/components/Faq"), {
  ssr: true
});

const CTA = dynamic(() => import("@/components/CTA"), {
  ssr: true
});

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
                    <LazyLoad>
                        <WhatWeOffer />
                    </LazyLoad>
                </section>

                <section>
                    <LazyLoad>
                        <Tools />
                    </LazyLoad>
                </section>
            
                <section>
                    <LazyLoad>
                        <WhyChoose />
                    </LazyLoad>
                </section>
                <section>
                    <LazyLoad>
                        <KeyFeatures />
                    </LazyLoad>
                </section>
                <section>
                    <LazyLoad>
                        <TestimonialSection />
                    </LazyLoad>
                </section>
                <section id="faqs" className="py-16 scroll-mt-20">
                    <LazyLoad>
                        <Faq />
                    </LazyLoad>
                </section>
                <section>
                    <LazyLoad>
                        <CTA />
                    </LazyLoad>
                </section>
            </div>
        </>
    );
}
