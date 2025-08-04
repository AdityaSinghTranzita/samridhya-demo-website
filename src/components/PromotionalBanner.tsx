'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Star, TrendingUp, Gift, Shield, CreditCard } from 'lucide-react';

interface PromoItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
  icon: React.ReactNode;
  featured?: boolean;
}

const promoItems: PromoItem[] = [
  {
    id: 1,
    title: "Personal Loan",
    subtitle: "Up to ₹5 Lakhs",
    description: "Quick approval with minimal documentation. Apply now and get funds in your account within 24 hours.",
    ctaText: "Apply Now",
    ctaLink: "/loans/personal-loan",
    bgColor: "from-blue-500 to-cyan-600",
    icon: <TrendingUp className="w-4 h-4" />,
    featured: true
  },
  {
    id: 2,
    title: "Business Loan",
    subtitle: "Up to ₹50 Lakhs",
    description: "Expand your business with our flexible business loan options. Quick approval process.",
    ctaText: "Get Quote",
    ctaLink: "/loans/business-loan",
    bgColor: "from-green-500 to-emerald-600",
    icon: <Shield className="w-4 h-4" />
  },
  {
    id: 3,
    title: "Free Credit Score",
    subtitle: "Check Instantly",
    description: "Check your credit score for free. No hidden charges. Get your credit report instantly.",
    ctaText: "Check Now",
    ctaLink: "/calculators/credit-score-checker",
    bgColor: "from-purple-500 to-pink-600",
    icon: <CreditCard className="w-4 h-4" />
  }
];

export default function PromotionalBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-rotate through promotions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoItems.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const nextPromo = () => {
    setCurrentIndex((prev) => (prev + 1) % promoItems.length);
  };

  const prevPromo = () => {
    setCurrentIndex((prev) => (prev - 1 + promoItems.length) % promoItems.length);
  };

  const currentPromo = promoItems[currentIndex];

  if (!isVisible) return null;

  return (
    <motion.div
      className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
      </div>

      <div className="relative h-14 sm:h-16 md:h-18 lg:h-20 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Content Container */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo.id}
              className="flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                {currentPromo.icon}
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-center sm:items-start min-w-0 flex-1">
                <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-tight text-center sm:text-left truncate">
                  {currentPromo.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base opacity-90 leading-tight text-center sm:text-left truncate">
                  {currentPromo.subtitle}
                </p>
              </div>

              {/* Featured Badge */}
              {currentPromo.featured && (
                <div className="bg-yellow-400 text-yellow-900 px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 rounded-full text-xs font-bold hidden sm:block animate-pulse flex-shrink-0">
                  🔥 HOT
                </div>
              )}

              {/* CTA Button */}
              <a
                href={currentPromo.ctaLink}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-lg transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap backdrop-blur-sm hover:scale-105 flex-shrink-0"
              >
                {currentPromo.ctaText}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls - Right Side */}
        <div className="flex items-center justify-end flex-shrink-0">
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            <button
              onClick={prevPromo}
              className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-5 xl:h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex space-x-1 md:space-x-1.5 lg:space-x-2">
              {promoItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full transition-colors flex-shrink-0 ${
                    index === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextPromo}
              className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-5 xl:h-5" />
            </button>
          </div>

          {/* Close Button - Always visible */}
          <button
            onClick={() => setIsVisible(false)}
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-9 xl:h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm flex-shrink-0 ml-3 sm:ml-4 md:ml-5 lg:ml-6"
          >
            <X className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
} 