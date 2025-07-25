'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    <section className="relative w-full bg-gradient-to-b from-blue-50 via-white to-white min-h-screen flex items-center justify-center px-4 md:px-12 lg:px-40 py-12 md:py-32">
      <div className="relative z-10 mx-auto max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-40">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0 min-h-[320px] md:min-h-[420px] max-w-[320px] sm:max-w-[400px] md:max-w-[480px]">
          <Image
            src="https://framerusercontent.com/images/kvNaGEJ2iLiDZTVtaiNCqdyUZM.png"
            alt="Loan App Mockup"
            width={320}
            height={320}
            className="object-contain w-full h-auto drop-shadow-2xl"
            priority
          />
        </div>
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left justify-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Instant Personal Loans
          </h1>
          <h2 className="text-sm sm:text-lg md:text-2xl font-bold text-blue-700 mb-2 sm:mb-4 tracking-wide uppercase">
            Get Money in Minutes
          </h2>
          <p className="text-gray-800 mb-4 sm:mb-6 max-w-xl font-medium text-base sm:text-lg md:text-xl">
            Get a quick, paperless loan up to ₹10 Lakhs. Trusted by millions. 100% online, direct bank transfer, and instant approval.
          </p>
          <a
            href="#"
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 sm:px-10 sm:py-5 rounded-2xl transition shadow-xl text-center text-base sm:text-lg md:text-xl mb-3 md:mb-5"
          >
            Get Loan Now
          </a>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-8 justify-center md:justify-start w-full md:w-auto items-center">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              width={120}
              height={36}
              className="h-9 w-auto"
            />
            <Image
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              width={120}
              height={36}
              className="h-9 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
