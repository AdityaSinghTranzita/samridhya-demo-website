import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
// import Hero from "@/components/Hero";
import WhatWeOffer from "@/components/Whatweoffer";
import Tools from "@/components/Tools";
import WhyChoose from "@/components/WhyChoose";
import KeyFeatures from "@/components/KeyFeatures";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import AboutUs from "@/components/Aboutus";
import LoanProcess from "@/components/LoanProcess";
import Hero from "@/components/Hero1";
import TestimonialSection from "@/components/Testimonials";

export default function Home() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navbar/>
            <section id="home" className="scroll-mt-24">
                <Carousel />
                {/* <Hero/> */}
            </section>
            {/* <Hero /> */}

            <section id="personal" className="py-16">
                <WhatWeOffer />
            </section>

            <section>
                <Tools />
            </section>

            <section id="about" className="py-20 pt-30 pb-50">
                <AboutUs/>
            </section>
            <section id="process" className="scroll-mt-24">
                <LoanProcess />
            </section>
            <section>
                <WhyChoose />
            </section>
            <section>
                <KeyFeatures />
            </section>
            <section>
                <TestimonialSection />
            </section>
            <section id="faqs" className="py-16">
                <Faq />
            </section>
            <section>
                <CTA />
            </section>
        </div>
    );
}
