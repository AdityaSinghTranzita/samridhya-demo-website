'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import image1 from '../../public/images/image1.png';
import image2 from '../../public/images/image2.png';
import image3 from '../../public/images/image3.png';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: StaticImageData | string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Instant Personal & Business Loans – 100% Digital & Paperless',
    subtitle:
      'Get up to ₹40 Lakhs with interest rates starting at 9.99%. India’s trusted instant loan app – fast, secure, and RBI-compliant.',
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
      'Backed by the Government’s ONDC network. The safest, most reliable way to get an instant loan online.',
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

  return (
    <section className=" w-full h-screen max-h-screen overflow-hidden bg-[#f8f8f8] md:py-12 relative lg:mt-[-80px] ">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slides[current].id}
          className="absolute inset-0 flex flex-col md:flex-row items-center  px-4 md:px-12 py-6 md:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Image Section (top on mobile) */}
          <div className="w-full md:w-1/2 h-[260px] sm:h-[300px] md:h-[450px] relative mb-6 md:mb-0">
            <motion.div
              className="relative w-full h-full"
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

          {/* Text Section (below image on mobile) */}
          <div className="w-full md:w-1/2 text-center md:text-left z-10 space-y-4">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#2b004b]"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-500"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.button
              className="bg-[#276ef4] text-white px-6 py-3 mt-4 rounded-full font-medium hover:bg-[#ADD6FF] hover:text-black transition"
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
      <div className="absolute bottom-20 w-full flex justify-center z-20 space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? 'bg-[#276EF4]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
