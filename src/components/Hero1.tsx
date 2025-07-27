'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAppStoreLink } from '@/utils/appStore';

const floatingAnimation = (delay = 0) => ({
  y: ['-8px', '8px', '-8px'],
  x: ['-5px', '5px', '-5px'],
  transition: {
    delay,
    duration: 4 + delay * 2,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut" as  const,
  },
});

export default function Hero1() {
  return (
    <section className="relative w-full bg-gradient-to-b from-blue-50 via-white to-white min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 md:py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-20">
        {/* Image Section - Responsive sizing */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px]">
            <Image
              src="https://framerusercontent.com/images/kvNaGEJ2iLiDZTVtaiNCqdyUZM.png"
              alt="Loan App Mockup"
              width={500}
              height={500}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
              unoptimized
            />
          </div>
        </div>
        
        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left justify-center max-w-2xl lg:max-w-none">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Instant Personal Loans
          </h1>
          <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-700 mb-2 sm:mb-4 tracking-wide uppercase">
            Get Money in Minutes
          </h2>
          <p className="text-gray-800 mb-6 sm:mb-8 max-w-xl lg:max-w-2xl font-medium text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
            Get a quick, paperless loan up to ₹10 Lakhs. Trusted by millions. 100% online, direct bank transfer, and instant approval.
          </p>
          <button
            onClick={() => window.open(getAppStoreLink(), '_blank')}
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl text-center text-base sm:text-lg md:text-xl lg:text-2xl mb-4 lg:mb-6 transform hover:scale-105"
          >
            Get Loan Now
          </button>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6 lg:mt-8 justify-center lg:justify-start w-full lg:w-auto items-center">
            <button
              onClick={() => window.open('https://play.google.com/store/apps/details?id=samridh.consumer', '_blank')}
              className="transition-transform hover:scale-105"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={140}
                height={42}
                className="h-12 w-[140px] object-contain"
                loading="lazy"
                unoptimized
              />
            </button>
            <button
              onClick={() => window.open('https://apps.apple.com/in/app/samridhya/id6745554387', '_blank')}
              className="transition-transform hover:scale-105"
            >
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                width={140}
                height={42}
                className="h-12 w-[140px] object-contain"
                loading="lazy"
                unoptimized
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
