import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
// import Hero from "@/components/Hero";
import WhatWeOffer from "@/components/Whatweoffer";
import Tools from "@/components/Tools";
import WhyChoose from "@/components/WhyChoose";
import KeyFeatures from "@/components/KeyFeatures";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import AboutUs from "@/components/AboutUs";
import LoanProcess from "@/components/LoanProcess";

export default function Home() {
    return (
        <>
            <Navbar/>
            <section id="home" className="scroll-mt-24 bg-white">
                <Carousel />
            </section>
            {/* <Hero /> */}

            <section id="personal" className="py-16" style={{ backgroundColor: '#f5faff' }}>
                <WhatWeOffer />
            </section>

            <section style={{ backgroundColor: '#f8f6ff' }}>
                <Tools />
            </section>

            <section id="about" className="py-20 pt-30 pb-50" style={{ backgroundColor: '#f5faff' }}>
                <AboutUs/>
            </section>
            <section id="process" className="scroll-mt-24 bg-white">
                <LoanProcess />
            </section>
            <section style={{ backgroundColor: '#f8f6ff' }}>
                <WhyChoose />
            </section>
            <section style={{ backgroundColor: '#f5faff' }}>
                <KeyFeatures />
            </section>

            <section id="faqs" className="py-16" style={{ backgroundColor: '#f8f6ff' }}>
                <Faq />
            </section>
            <section className="bg-white">
                <CTA />
            </section>
        </>
    );
}
