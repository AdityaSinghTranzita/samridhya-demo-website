import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
// import Hero from "@/components/Hero";
import WhatWeOffer from "@/components/Whatweoffer";
import Tools from "@/components/Tools";
import AboutUs from "@/components/Aboutus";
import WhyChoose from "@/components/WhyChoose";
import KeyFeatures from "@/components/KeyFeatures";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";

export default function Home() {
    return (
        <>
            <Navbar />
            <Carousel />
            {/* <Hero /> */}

            <section id="personal">
                <WhatWeOffer />
            </section>

            <Tools />

            <section id="about">
                <AboutUs />
            </section>

            <WhyChoose />

            <KeyFeatures />

            <section id="process">
                <Faq />
            </section>

            <CTA />
        </>
    );
}
