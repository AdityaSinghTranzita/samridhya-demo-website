'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAppStoreLink } from '@/utils/appStore';
import { CreditCard } from 'lucide-react';

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
    <section className="relative w-full bg-gradient-to-b from-blue-50 via-white to-white min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 md:py-12 lg:py-16">
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
          {/*<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">*/}
          {/*  Instant Personal Loans*/}
          {/*</h1>*/}
          {/*<h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-blue-700 mb-2 sm:mb-4 tracking-wide uppercase">*/}
          {/*  Get Money in Minutes*/}
          {/*</h2>*/}
          {/*<p className="text-gray-800 mb-6 sm:mb-8 max-w-xl lg:max-w-2xl font-medium text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed">*/}
          {/*  Get a quick, paperless loan up to ₹10 Lakhs. Trusted by millions. 100% online, direct bank transfer, and instant approval.*/}
          {/*</p>*/}

          <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get Instant Personal & Business Loans Online
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                Trusted Digital Loan App in India

              </span>
          </motion.h1>


          <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/*Samridhya is an ONDC-registered, RBI-compliant digital loan platform offering fast, 100% paperless approvals. Compare loan offers from top banks and NBFCs — all in one place. Whether personal, business, or GST loans, we simplify smart financing.*/}
            Apply for instant loans online with Samridhya – ONDC-registered digital loan app. Get personal and business loans up to ₹40 lakhs, interest rates from 9.99%, fast approval, and 100% paperless process.


          </motion.p>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mb-4 lg:mb-6">
            <button
              onClick={() => window.open(getAppStoreLink(), '_blank')}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-center text-sm sm:text-base md:text-lg transform hover:scale-105"
            >
              Get Loan Now
            </button>
            <Link
              href="/calculators/credit-score-checker"
              className="w-full sm:w-auto bg-blue-50 hover:bg-blue-100 text-[#276ef4] font-medium px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-center text-xs sm:text-sm md:text-base transform hover:scale-105 flex items-center justify-center gap-1.5 border border-[#276ef4] hover:border-blue-600"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Check Credit Score
            </Link>
          </div>
          <div className="flex flex-row gap-3 mt-4 sm:mt-6 lg:mt-8 justify-center lg:justify-start w-full lg:w-auto items-center">
            <button
              onClick={() => window.open('https://play.google.com/store/apps/details?id=samridh.consumer', '_blank')}
              className="transition-transform hover:scale-105"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={140}
                height={42}
                className="h-10 w-[120px] object-contain"
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
                className="h-10 w-[120px] object-contain"
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
