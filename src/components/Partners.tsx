'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
// Removed useState and useRef as infinite scroll is removed
import { ArrowRight, Building2, Handshake, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const partners = [
  {
    name: 'Bajaj Finserv',
    logo: '/images/bajaj-logo.webp',
    type: 'NBFC',
    category: 'Strategic Partner',
    url: 'https://www.bajajfinserv.in',
    bg: 'bg-[#e6f4fa]'
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
  // Removed scroll state and handlers as infinite scroll is removed

  return (
      <section className="relative py-8 sm:py-16 overflow-hidden bg-gray-50">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Header */}
          <motion.div
              className="text-center mb-6 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-[#2b004b] mb-4 leading-tight">
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

          {/* Partners Row - Modified for 2 partners */}
          <div className="relative mb-6 sm:mb-12">

            {/* Desktop/Tablet: Centered, Non-Scrolling Row */}
            <div className="hidden sm:flex justify-center gap-x-6">
              {partners.map((partner, idx) => (
                  <div key={idx} className="min-w-[160px] max-w-[200px] flex-1">
                    <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                    >
                      <div className={`border border-gray-100 rounded-xl p-4 shadow-lg hover:shadow-xl hover:border-[#276ef4]/30 transition-all duration-300 hover:-translate-y-1 ${partner.bg}`}>
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center p-1 group-hover:scale-110 transition-transform duration-300">
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
                                    fallback.className = 'w-full h-full flex items-center justify-center text-[#276ef4] font-bold text-sm';
                                    fallback.textContent = partner.name.split(' ')[0];
                                    parent.appendChild(fallback);
                                  }
                                }}
                            />
                          </div>
                          <h3 className="text-[#2b004b] font-semibold text-sm leading-tight group-hover:text-[#276ef4] transition-colors">
                            {partner.name}
                          </h3>
                          <div className="w-6 h-px bg-gradient-to-r from-[#276ef4] to-green-500"></div>
                          <p className="text-gray-500 text-xs">
                            {partner.type}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
              ))}
            </div>

            {/* Mobile: Manual Horizontal Scroll */}
            {/* Note: With only 2 partners, the scroll may not be needed, but we keep the structure for future additions. */}
            <div className="flex sm:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 gap-4 justify-center">
              {partners.map((partner, idx) => (
                  <div key={idx} className="flex-shrink-0 w-1/2 max-w-[160px]">
                    <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                    >
                      <div className={`border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-[#276ef4]/20 transition-all duration-300 hover:-translate-y-1 ${partner.bg}`}>
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
          {/* End Partners Row */}

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
        `}</style>
      </section>
  );
}