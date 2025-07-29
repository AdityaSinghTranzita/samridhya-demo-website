'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  Building2,
  GraduationCap,
  Heart,
  Plane,
  Stethoscope,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const offers = [
  {
    title: 'Personal Loan',
    description: 'Get Up to ₹40 Lakhs in Just 10 Minutes!',
    href: '/loans/personal-loan',
    icon: User,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    amount: '₹40L',
    time: '10 min',
    features: ['Instant approval', 'No collateral', 'Flexible EMI']
  },
  {
    title: 'Business Loan',
    description: 'Get Business Loans up to ₹40 Lakhs with Flexible Tenure up to 5 Years',
    href: '/loans/business-loan',
    icon: Building2,
    gradient: 'from-emerald-500 to-green-500',
    bgGradient: 'from-emerald-50 to-green-50',
    amount: '₹40L',
    time: '5 years',
    features: ['Growth funding', 'Working capital', 'Equipment finance']
  },
  {
    title: 'Education Loan',
    description: 'Empower your future with affordable education financing.',
    href: '/loans/education-loan',
    icon: GraduationCap,
    gradient: 'from-purple-500 to-violet-500',
    bgGradient: 'from-purple-50 to-violet-50',
    amount: '₹50L',
    time: '15 years',
    features: ['Study abroad', 'Low interest', 'Moratorium period']
  },
  {
    title: 'Wedding Loan',
    description: 'Make your dream wedding come true without financial stress.',
    href: '/loans/wedding-loan',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50',
    amount: '₹20L',
    time: '7 years',
    features: ['Dream wedding', 'Quick disbursal', 'Easy repayment']
  },
  {
    title: 'Travel Loan',
    description: 'Plan your next big trip with hassle-free travel loans.',
    href: '/loans/travel-loan',
    icon: Plane,
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-50 to-amber-50',
    amount: '₹15L',
    time: '5 years',
    features: ['Vacation funding', 'Instant approval', 'Minimal documents']
  },
  {
    title: 'Medical Loan',
    description: 'Access emergency funds quickly for medical expenses.',
    href: '/loans/medical-loan',
    icon: Stethoscope,
    gradient: 'from-teal-500 to-cyan-500',
    bgGradient: 'from-teal-50 to-cyan-50',
    amount: '₹25L',
    time: '24 hours',
    features: ['Emergency support', 'Fast processing', 'Cashless treatment']
  }
];

export default function WhatWeOffer() {
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const generated = Array.from({ length: 6 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }));
    setParticles(generated);
  }, []);

  return (
    <section className="relative py-14 sm:py-20 px-2 sm:px-4 md:px-12 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#276ef4]/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl -z-10" />

      {/* Client-side-only particles - Mobile only */}
      <div className="absolute inset-0 overflow-hidden -z-10 md:hidden">
        {particles.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#276ef4]/20 rounded-full"
            style={{ left: pos.left, top: pos.top }}
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2b004b] mb-4 sm:mb-6">
            What We{' '}
            <span className="bg-gradient-to-r from-[#276ef4] to-purple-600 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive financial solutions tailored to your unique needs,
            with instant approvals and competitive rates.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-[#276ef4] to-purple-600 rounded-full mx-auto mt-4 sm:mt-6" />
        </motion.div>

        {/* Loan Cards Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, idx) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={idx}
                className={`group relative bg-gradient-to-br ${offer.bgGradient} backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-8 transition-all duration-500 hover:-translate-y-3 overflow-hidden`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${offer.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${offer.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transform transition-all duration-500`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-lg sm:text-2xl font-bold bg-gradient-to-r ${offer.gradient} bg-clip-text text-transparent`}>
                        {offer.amount}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 font-medium">
                        up to {offer.time}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-[#2b004b] group-hover:text-[#276ef4] transition-colors duration-300 mb-2 sm:mb-3">
                    {offer.title}
                  </h3>

                  {/* Mobile: Description (toggle) */}
                  <div className="sm:hidden">
                    {expandedIndex === idx && (
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-4 leading-relaxed text-xs">
                        {offer.description}
                      </p>
                    )}
                    
                    {/* Mobile: Features (toggle) */}
                    {expandedIndex === idx && (
                      <div className="space-y-1 mb-4">
                        {offer.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-xs text-gray-600">
                            <div className={`w-2 h-2 bg-gradient-to-r ${offer.gradient} rounded-full mr-3 flex-shrink-0`} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Desktop: Always show description and features */}
                  <div className="hidden sm:block">
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
                      {offer.description}
                    </p>

                    <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                      {offer.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-xs sm:text-sm text-gray-600">
                          <div className={`w-2 h-2 bg-gradient-to-r ${offer.gradient} rounded-full mr-3 flex-shrink-0 md:hidden`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile: View More/Less Button */}
                  <div className="sm:hidden mb-4">
                    <button
                      onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                      className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      {expandedIndex === idx ? (
                        <>
                          <span>View Less</span>
                          <ChevronUp className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          <span>View More</span>
                          <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>

                  {offer.href && (
                    <Link href={offer.href} className="group/link">
                      <div className={`inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r ${offer.gradient} text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-xs shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                        <span className="text-xs">Apply</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </div>
                    </Link>
                  )}
                </div>



                <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${offer.gradient} opacity-10 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl">
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[#2b004b] mb-3 sm:mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
              Our loan experts are here to help you find the perfect financial solution for your unique needs.
            </p>
            <Link href="/contact">
              <motion.button
                className="bg-gradient-to-r from-[#276ef4] to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Speak with an Expert
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
