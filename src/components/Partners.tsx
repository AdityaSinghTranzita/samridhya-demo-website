'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { ArrowRight, Building2, Handshake, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const partners = [
  {
    name: 'HDFC Bank',
    logo: '/images/HDFC-logo.webp',
    type: 'Private Bank',
    category: 'Premium Partner',
    url: 'https://www.hdfcbank.com',
    bg: 'bg-[#e3f0ff]'
  },
  {
    name: 'ICICI Bank',
    logo: '/images/icici-logo.webp',
    type: 'Private Bank',
    category: 'Premium Partner',
    url: 'https://www.icicibank.com',
    bg: 'bg-[#fff3e6]'
  },
  {
    name: 'Axis Bank',
    logo: '/images/axis-logo.webp',
    type: 'Private Bank',
    category: 'Premium Partner',
    url: 'https://www.axisbank.com',
    bg: 'bg-[#f3e6f9]'
  },
  {
    name: 'Kotak Mahindra Bank',
    logo: '/images/kotak-logo.webp',
    type: 'Private Bank',
    category: 'Premium Partner',
    url: 'https://www.kotak.com',
    bg: 'bg-[#e6f0fa]'
  },
  {
    name: 'Bajaj Finserv',
    logo: '/images/bajaj-logo.webp',
    type: 'NBFC',
    category: 'Strategic Partner',
    url: 'https://www.bajajfinserv.in',
    bg: 'bg-[#e6f4fa]'
  },
  {
    name: 'Tata Capital',
    logo: '/images/tata-logo.webp',
    type: 'NBFC',
    category: 'Strategic Partner',
    url: 'https://www.tatacapital.com',
    bg: 'bg-[#e6f0fa]'
  },
  {
    name: 'Aditya Birla Capital',
    logo: '/images/aditya-birla-logo.webp',
    type: 'NBFC',
    category: 'Strategic Partner',
    url: 'https://www.adityabirlacapital.com',
    bg: 'bg-[#fff7e6]'
  }
];

export default function Partners() {
  const [scrollSpeed, setScrollSpeed] = useState(15);
  const [isPressed, setIsPressed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSpeedUp = () => {
    setIsPressed(true);
    setScrollSpeed(2);
  };

  const handleSpeedDown = () => {
    setIsPressed(false);
    setScrollSpeed(15);
  };

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden bg-gray-50">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2b004b] mb-4 leading-tight">
            Our Trusted{' '}
            <span className="bg-gradient-to-r from-[#276ef4] to-green-500 bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-[#276ef4] to-green-500 rounded-full mx-auto mb-6"></div>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We collaborate with India's leading banks and NBFCs to provide you with the best loan offers.
          </p>
        </motion.div>

        {/* Partners Scrolling Row */}
        <div className="relative mb-10 sm:mb-12 overflow-hidden">
          {/* Mobile: Animated Next Indicator */}
          <div className="sm:hidden pointer-events-none select-none absolute right-2 top-0 bottom-0 flex items-center z-10">
            <div className="animate-fade-arrow bg-white/80 rounded-full shadow p-2">
              <ChevronRight className="w-5 h-5 text-[#276ef4] opacity-80" />
            </div>
          </div>

          {/* Desktop: Infinite Animation with Speed Control */}
          <div className="hidden sm:block relative">
            {/* Left Arrow Button */}
            <button
              onMouseDown={handleSpeedUp}
              onMouseUp={handleSpeedDown}
              onMouseLeave={handleSpeedDown}
              onTouchStart={handleSpeedUp}
              onTouchEnd={handleSpeedDown}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            >
              <ChevronLeft className="w-5 h-5 text-[#276ef4] group-hover:text-[#276ef4]/80" />
            </button>

            {/* Right Arrow Button */}
            <button
              onMouseDown={handleSpeedUp}
              onMouseUp={handleSpeedDown}
              onMouseLeave={handleSpeedDown}
              onTouchStart={handleSpeedUp}
              onTouchEnd={handleSpeedDown}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            >
              <ChevronRight className="w-5 h-5 text-[#276ef4] group-hover:text-[#276ef4]/80" />
            </button>

            <div 
              ref={scrollRef}
              className="flex flex-nowrap gap-x-6 animate-scroll"
              style={{ animationDuration: `${scrollSpeed}s` }}
            >
              {/* Two sets for seamless infinite loop */}
              {Array(2).fill(null).map((_, setIndex) => (
                partners.map((partner, idx) => (
                  <div key={`set-${setIndex}-${idx}`}
                    className="min-w-[120px] sm:min-w-[160px]"
                  >
                    <a 
                      href={partner.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className={`border border-gray-100 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md hover:border-[#276ef4]/20 transition-all duration-300 hover:-translate-y-1 ${partner.bg}`}>
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center p-1 group-hover:scale-110 transition-transform duration-300">
                            <Image
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              width={40}
                              height={40}
                              className="w-full h-full object-contain"
                              unoptimized
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'w-full h-full flex items-center justify-center text-[#276ef4] font-bold text-xs';
                                  fallback.textContent = partner.name.split(' ')[0];
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          </div>
                          <h3 className="text-[#2b004b] font-semibold text-xs leading-tight group-hover:text-[#276ef4] transition-colors">
                            {partner.name}
                          </h3>
                          <div className="w-4 h-px bg-gradient-to-r from-[#276ef4] to-green-500"></div>
                          <p className="text-gray-500 text-[10px]">
                            {partner.type}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              ))}
            </div>
          </div>
          
          {/* Mobile: Manual Horizontal Scroll */}
          <div className="flex sm:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 gap-3">
            {partners.map((partner, idx) => (
              <div key={idx} className="flex-shrink-0">
                <a 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className={`border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-[#276ef4]/20 transition-all duration-300 hover:-translate-y-1 min-w-[160px] ${partner.bg}`}>
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = document.createElement('div');
                              fallback.className = 'w-full h-full flex items-center justify-center text-[#276ef4] font-bold text-xs';
                              fallback.textContent = partner.name.split(' ')[0];
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                      <h3 className="text-[#2b004b] font-semibold text-xs leading-tight group-hover:text-[#276ef4] transition-colors">
                        {partner.name}
                      </h3>
                      <div className="w-6 h-px bg-gradient-to-r from-[#276ef4] to-green-500"></div>
                      <p className="text-gray-500 text-[10px]">
                        {partner.type}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <motion.div
          className="bg-[#276ef4] rounded-2xl p-6 sm:p-8 text-white shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex items-center gap-6 flex-1">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  Become Our Partner
                </h3>
                <p className="text-white/90 text-sm sm:text-base">
                  Join our network and help provide better loan solutions to millions of customers.
                </p>
              </div>
            </div>

            {/* Right Content - Features */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div className="text-white">
                  <p className="font-semibold text-xs sm:text-sm">Wide Reach</p>
                  <p className="text-white/80 text-[10px] sm:text-xs">50K+ customers</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="text-white">
                  <p className="font-semibold text-xs sm:text-sm">Quality Leads</p>
                  <p className="text-white/80 text-[10px] sm:text-xs">Pre-screened</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Handshake className="w-4 h-4 text-white" />
                </div>
                <div className="text-white">
                  <p className="font-semibold text-xs sm:text-sm">Easy Integration</p>
                  <p className="text-white/80 text-[10px] sm:text-xs">Seamless API</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 bg-white text-[#276ef4] px-6 py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Become Partner
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mobile Layout - Minimalistic */}
          <div className="sm:hidden">
            <div className="text-center mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Handshake className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                Become Our Partner
              </h3>
              <p className="text-white/90 text-sm">
                Join our network and help provide better loan solutions.
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 bg-white text-[#276ef4] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Become Partner
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes fadeArrow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .animate-scroll {
          animation: scroll linear infinite;
          will-change: transform;
        }
        .animate-fade-arrow {
          animation: fadeArrow 1.5s infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-scroll {
          backface-visibility: hidden;
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
} 