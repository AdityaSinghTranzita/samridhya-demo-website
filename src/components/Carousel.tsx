'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import image1 from '../../public/images/image1.png';
import image2 from '../../public/images/image2.png';
import image3 from '../../public/images/image3.png';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: any;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Instant Personal & Business Loans – 100% Digital & Paperless',
    subtitle:
        "Get up to ₹40 Lakhs with interest rates starting at 9.99%. India's trusted instant loan app – fast, secure, and RBI-compliant.",
imageUrl: image1,
},
{
  id: 2,
      title: 'Apply for Loans Online in Just 10 Minutes',
    subtitle:
  'Quick approval, multiple lender options, and zero paperwork. Your go-to digital loan app for personal and business needs.',
      imageUrl: image2,
},
{
  id: 3,
      title: 'ONDC-Registered Loan App for Smart Borrowers',
    subtitle:
  "Backed by the Government's ONDC network. The safest, most reliable way to get an instant loan online.",
  imageUrl: image3,
},
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!manual) {
        setCurrent((prev) => (prev + 1) % slides.length);
      } else {
        setManual(false);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [manual]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    setManual(true);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrent((prev) => (prev + 1) % slides.length),
    onSwipedRight: () =>
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length),
    trackMouse: true,
  });

  return (
      <section
          className="relative w-full min-h-[70vh] sm:min-h-[80vh] md:min-h-screen overflow-hidden pt-14 sm:pt-16 md:pt-20 bg-gradient-to-b from-blue-100 via-white to-white"
          {...swipeHandlers}
      >

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'url("/images/texture.svg")', opacity: 0.10, backgroundRepeat: 'repeat', backgroundSize: '240px 240px' }} />

      {/* Animated gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-transparent to-indigo-100/30 animate-pulse z-0"></div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
              key={slides[current].id}
              className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-2 sm:px-4 md:px-12 py-6 sm:py-8 md:py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
          >
            {/* Left: Image */}
            <div className="w-full md:w-1/2 h-[220px] xs:h-[300px] md:h-[420px] lg:h-[480px] relative mb-6 md:mb-0 flex items-center justify-center">
              <motion.div
                  className="w-full h-full relative"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
              >
                <Image
                    src={slides[current].imageUrl}
                    alt={slides[current].title}
                    fill
                    className="object-contain"
                    priority
                />
              </motion.div>
            </div>

            {/* Right: Text */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-4 sm:space-y-5 z-10">
              <motion.h1
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-[#2b004b]"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
              >
                {slides[current].title}
              </motion.h1>
              <motion.p
                  className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-700"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
              >
                {slides[current].subtitle}
              </motion.p>
              <motion.button
                  className="bg-[#276ef4] text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-blue-200 hover:text-black transition shadow-lg hover:shadow-xl"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
              >
                Know More
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 w-full flex justify-center z-20 gap-2 sm:gap-3">
          {slides.map((_, idx) => (
              <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      idx === current ? 'bg-blue-600 shadow-md' : 'bg-white/70 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
              />
          ))}
        </div>

        {/* Curved SVG wave at the bottom */}
        <svg className="absolute bottom-0 left-0 w-full h-24 md:h-32 z-10" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,120 1080,0 1440,80 L1440,120 L0,120 Z" fill="#f8fafc" fillOpacity="1" />
        </svg>
      </section>
  );
}