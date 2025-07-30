// 'use client';
//
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { getAppStoreLink } from '@/utils/appStore';
// import { CreditCard } from 'lucide-react';
//
// const floatingAnimation = (delay = 0) => ({
//   y: ['-8px', '8px', '-8px'],
//   x: ['-5px', '5px', '-5px'],
//   transition: {
//     delay,
//     duration: 4 + delay * 2,
//     repeat: Infinity,
//     repeatType: "loop" as const,
//     ease: "easeInOut" as  const,
//   },
// });
//
// export default function Hero1() {
//   return (
//     <section className="relative w-full bg-gradient-to-b from-blue-50 via-white to-white min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 md:py-12 lg:py-16">
//       <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-20">
//         {/* Image Section - Responsive sizing */}
//         <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
//           <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px]">
//             <Image
//               src="https://framerusercontent.com/images/kvNaGEJ2iLiDZTVtaiNCqdyUZM.png"
//               alt="Loan App Mockup"
//               width={500}
//               height={500}
//               className="w-full h-auto object-contain drop-shadow-2xl"
//               priority
//               unoptimized
//             />
//           </div>
//         </div>
//
//         {/* Text Section */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left justify-center max-w-2xl lg:max-w-none">
//           {/*<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">*/}
//           {/*  Instant Personal Loans*/}
//           {/*</h1>*/}
//           {/*<h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-blue-700 mb-2 sm:mb-4 tracking-wide uppercase">*/}
//           {/*  Get Money in Minutes*/}
//           {/*</h2>*/}
//           {/*<p className="text-gray-800 mb-6 sm:mb-8 max-w-xl lg:max-w-2xl font-medium text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed">*/}
//           {/*  Get a quick, paperless loan up to ₹10 Lakhs. Trusted by millions. 100% online, direct bank transfer, and instant approval.*/}
//           {/*</p>*/}
//
//           <motion.h1
//               className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             Get Instant Personal & Business Loans Online
//             <br />
//             <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
//                 Trusted Digital Loan App in India
//
//               </span>
//           </motion.h1>
//
//
//           <motion.p
//               className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             {/*Samridhya is an ONDC-registered, RBI-compliant digital loan platform offering fast, 100% paperless approvals. Compare loan offers from top banks and NBFCs — all in one place. Whether personal, business, or GST loans, we simplify smart financing.*/}
//             Apply for instant loans online with Samridhya – ONDC-registered digital loan app. Get personal and business loans up to ₹40 lakhs, interest rates from 9.99%, fast approval, and 100% paperless process.
//
//
//           </motion.p>
//
//           <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mb-4 lg:mb-6">
//             <button
//               onClick={() => window.open(getAppStoreLink(), '_blank')}
//               className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-center text-sm sm:text-base md:text-lg transform hover:scale-105"
//             >
//               Get Loan Now
//             </button>
//             <Link
//               href="/calculators/credit-score-checker"
//               className="w-full sm:w-auto bg-blue-50 hover:bg-blue-100 text-[#276ef4] font-medium px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-center text-xs sm:text-sm md:text-base transform hover:scale-105 flex items-center justify-center gap-1.5 border border-[#276ef4] hover:border-blue-600"
//             >
//               <CreditCard className="w-3.5 h-3.5" />
//               Check Credit Score
//             </Link>
//           </div>
//           <div className="flex flex-row gap-3 mt-4 sm:mt-6 lg:mt-8 justify-center lg:justify-start w-full lg:w-auto items-center">
//             <button
//               onClick={() => window.open('https://play.google.com/store/apps/details?id=samridh.consumer', '_blank')}
//               className="transition-transform hover:scale-105"
//             >
//               <Image
//                 src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
//                 alt="Get it on Google Play"
//                 width={140}
//                 height={42}
//                 className="h-10 w-[120px] object-contain"
//                 loading="lazy"
//                 unoptimized
//               />
//             </button>
//             <button
//               onClick={() => window.open('https://apps.apple.com/in/app/samridhya/id6745554387', '_blank')}
//               className="transition-transform hover:scale-105"
//             >
//               <Image
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="Download on the App Store"
//                 width={140}
//                 height={42}
//                 className="h-10 w-[120px] object-contain"
//                 loading="lazy"
//                 unoptimized
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import { motion } from 'framer-motion';
import { CreditCard, ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';

const floatingAnimation = (delay = 0) => ({
  y: ['-8px', '8px', '-8px'],
  x: ['-5px', '5px', '-5px'],
  transition: {
    delay,
    duration: 4 + delay * 2,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut" as const,
  },
});

export default function Hero1() {
  return (
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-20 px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-12 lg:py-16">

          {/* Modern 3D Phone Mockup */}
          <motion.div
              className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative">
              {/* Phone mockup with glassmorphism effect */}
              <div className="relative w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] h-[560px] sm:h-[640px] md:h-[700px] lg:h-[760px]">
                {/* Phone frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl border border-gray-700">
                  {/* Screen */}
                  <div className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-b from-blue-50 to-white rounded-[2.5rem] overflow-hidden shadow-inner">
                    {/* Status bar */}
                    <div className="h-6 bg-gray-900 flex items-center justify-between px-6 text-white text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-1 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>

                    {/* App content */}
                    <div className="p-6 h-full bg-gradient-to-b from-blue-50 to-white">
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                          <CreditCard className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Samridhya</h3>
                        <p className="text-sm text-gray-600">Quick Loans</p>
                      </div>

                      {/* Feature cards */}
                      <div className="space-y-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-blue-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">Instant Approval</p>
                              <p className="text-xs text-gray-600">Get approved in minutes</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-blue-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                              <Shield className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">100% Secure</p>
                              <p className="text-xs text-gray-600">Bank-level security</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-blue-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                              <Clock className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">Quick Transfer</p>
                              <p className="text-xs text-gray-600">Direct to bank account</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements around phone */}
                <motion.div
                    className="absolute -top-8 -right-8 w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20"
                    animate={floatingAnimation(0)}
                >
                  <img
                      src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&h=200&fit=crop&crop=center"
                      alt="Money stack"
                      className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                    className="absolute -bottom-8 -left-8 w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-xl overflow-hidden shadow-xl border-2 border-white/20"
                    animate={floatingAnimation(0.5)}
                >
                  <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop&crop=center"
                      alt="Business graph"
                      className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                    className="absolute top-1/2 -right-12 w-14 h-14 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full overflow-hidden shadow-xl border-2 border-white/20"
                    animate={floatingAnimation(1)}
                >
                  <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop&crop=center"
                      alt="Business analytics"
                      className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text Section with enhanced styling */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left justify-center max-w-2xl lg:max-w-none">
            <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get Instant Personal & Business Loans Online
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Trusted Digital Loan App in India
            </span>
            </motion.h1>

            <motion.p
                className="text-base sm:text-lg md:text-xl text-blue-100 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
              Apply for instant loans online with Samridhya – ONDC-registered digital loan app. Get personal and business loans up to ₹40 lakhs, interest rates from 9.99%, fast approval, and 100% paperless process.
            </motion.p>

            <motion.div
                className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl text-center text-sm sm:text-base md:text-lg transform hover:scale-105 flex items-center justify-center gap-2 border border-blue-400/20">
                Get Loan Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium px-4 py-3 sm:px-6 sm:py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-center text-xs sm:text-sm md:text-base transform hover:scale-105 flex items-center justify-center gap-2 border border-white/20 hover:border-white/40">
                <CreditCard className="w-4 h-4" />
                Check Credit Score
              </button>
            </motion.div>

            <motion.div
                className="flex flex-row gap-4 mt-4 sm:mt-6 lg:mt-8 justify-center lg:justify-start w-full lg:w-auto items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button className="group transition-all duration-300 hover:scale-110">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300">
                  <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-10 w-[120px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </button>

              <button className="group transition-all duration-300 hover:scale-110">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300">
                  <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      className="h-10 w-[120px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
  );
}