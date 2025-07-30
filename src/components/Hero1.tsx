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

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAppStoreLink } from '@/utils/appStore';
import { CreditCard, Shield, Zap, Award, TrendingUp } from 'lucide-react';
import { useEffect, useRef } from 'react';

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

// Floating Rupee Symbols Component
const FloatingRupees = () => {
  const rupeeSymbols = ['₹', '₹', '₹', '₹', '₹', '₹'];

  return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {rupeeSymbols.map((symbol, index) => (
            <motion.div
                key={index}
                className="absolute text-blue-200/30 text-2xl font-bold"
                style={{
                  left: `${10 + (index * 15)}%`,
                  top: `${20 + (index * 10)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  delay: index * 0.8,
                  ease: "easeInOut",
                }}
            >
              {symbol}
            </motion.div>
        ))}
      </div>
  );
};

// Particle Animation Component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#3B82F6', '#6366F1', '#8B5CF6', '#06B6D4', '#10B981'];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `#3B82F6${Math.floor((1 - distance / 100) * 50).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
      <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ background: 'transparent' }}
      />
  );
};

export default function Hero1() {
  return (
      <section className="relative w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 md:py-16 lg:py-20 overflow-hidden">

        {/* Particle Background */}
        <ParticleBackground />

        {/* Floating Rupee Symbols */}
        <FloatingRupees />

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>

          {/* Animated Rupee Symbols in Background */}
          <motion.div
              className="absolute top-1/4 right-1/4 text-6xl text-blue-100/20 font-bold"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
          >
            ₹
          </motion.div>

          <motion.div
              className="absolute bottom-1/3 left-1/6 text-8xl text-indigo-100/15 font-bold"
              animate={{
                rotate: [360, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
          >
            ₹
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-20 xl:gap-24">

          {/* Text Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left justify-center max-w-2xl lg:max-w-none order-2 lg:order-1">

            {/* Trust Badges */}
            <motion.div
                className="flex items-center gap-3 mb-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">RBI Compliant</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">ONDC Registered</span>
            </motion.div>




            <motion.h1
                className="text-xl sm:text-xs md:text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight "
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <span className="mb-[5px] sm:mb-0">
              Get Instant Personal & Business Loans Online
                </span>
              <br />
              <span className="bg-gradient-to-r text-base sm:text-xl md:text-xl lg:text-3xl from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent font-extrabold inline-flex items-center gap-2">
    Trusted Digital Loan App in India

    <motion.span
        className="text-blue-600"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
        }}
    >
      ₹
    </motion.span>
  </span>
            </motion.h1>


            <motion.p
                className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8 leading-relaxed font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
              Get personal and business loans up to{' '}
              <span className="font-bold text-gray-900 inline-flex items-center gap-1">
              <motion.span
                  animate={{
                    color: ['#1F2937', '#3B82F6', '#1F2937'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
              >
                ₹40 lakhs
              </motion.span>
            </span>{' '}
              with interest rates starting from{' '}
              <span className="font-semibold text-blue-600">9.99%</span>.
              100% paperless process with instant approval.
            </motion.p>

            {/* Key Features with Rupee Icons */}
            <motion.div
                className="flex flex-nowrap gap-2 sm:gap-3 mb-8 overflow-x-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 bg-green-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-green-100 shadow-sm flex-shrink-0">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                <span className="text-xs sm:text-sm font-medium text-green-700 whitespace-nowrap">Instant Approval</span>
                <motion.span
                    className="text-green-600 font-bold text-xs sm:text-sm"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  ₹
                </motion.span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-blue-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-blue-100 shadow-sm flex-shrink-0">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-blue-700 whitespace-nowrap">100% Secure</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-purple-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-purple-100 shadow-sm flex-shrink-0">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                <span className="text-xs sm:text-sm font-medium text-purple-700 whitespace-nowrap">Zero Paperwork</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button
                  onClick={() => window.open(getAppStoreLink(), '_blank')}
                  className="cursor-pointer group relative w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center text-lg transform hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                Apply for Loan
                <motion.span
                    animate={{
                      x: [0, 3, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                >
                  ₹
                </motion.span>
              </span>
              </button>
              <Link
                  href="/calculators/credit-score-checker"
                  className="group w-full sm:w-auto bg-white/90 backdrop-blur-sm hover:bg-white text-blue-600 font-semibold px-6 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-center text-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 border-2 border-blue-100 hover:border-blue-200"
              >
                <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Check Credit Score
              </Link>
            </motion.div>

            {/* App Store Buttons */}
            <motion.div
                className="flex flex-row gap-4 justify-center lg:justify-start w-full lg:w-auto items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
            >
              <button
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=samridh.consumer', '_blank')}
                  className=" cursor-pointer transition-transform hover:scale-105 hover:shadow-md rounded-lg overflow-hidden"
              >
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    width={140}
                    height={42}
                    className="h-10 w-32 object-contain"
                    loading="lazy"
                    unoptimized
                />
              </button>
              <button
                  onClick={() => window.open('https://apps.apple.com/in/app/samridhya/id6745554387', '_blank')}
                  className="cursor-pointer  transition-transform hover:scale-105 hover:shadow-md rounded-lg overflow-hidden"
              >
                <Image
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    width={140}
                    height={42}
                    className="h-12 w-auto object-contain"
                    loading="lazy"
                    unoptimized
                />
              </button>
            </motion.div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0 order-1 lg:order-2">
            <motion.div
                className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-3xl blur-3xl scale-110"></div>

              <div className="relative">
                <Image
                    // src="https://framerusercontent.com/images/kvNaGEJ2iLiDZTVtaiNCqdyUZM.png"
                    src= "/images/Samridhya_Hero.png"
                    alt="Samridhya Loan App Interface"
                    width={550}
                    height={530}
                    className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                    priority
                    unoptimized
                />

                {/* Floating elements with Rupee symbols*/}
                <motion.div
                    className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center gap-1"
                    animate={floatingAnimation(0)}
                >
                  <span>₹</span> Approved
                </motion.div>

                <motion.div
                    className="absolute -bottom-6 -left-6 bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-100"
                    animate={floatingAnimation(1.5)}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                        className="w-3 h-3 bg-green-500 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                    />
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <span className="text-green-600 font-bold">₹</span>
                    Instant Transfer
                  </span>
                  </div>
                </motion.div>

                {/* Additional floating rupee symbols around phone */}
                <motion.div
                    className="absolute top-1/4 -left-8 text-3xl text-blue-500/30 font-bold"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 180, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: 2,
                    }}
                >
                  ₹
                </motion.div>

                <motion.div
                    className="absolute bottom-1/3 -right-8 text-2xl text-indigo-500/40 font-bold"
                    animate={{
                      y: [0, 20, 0],
                      rotate: [360, 180, 0],
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: 1,
                    }}
                >
                  ₹
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  );
}