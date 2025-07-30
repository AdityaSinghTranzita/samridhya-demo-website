// KeyFeatures.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Globe, CreditCard, Smartphone, BarChart3, Shield, Languages, ArrowRight } from 'lucide-react';
import { handleAppDownload } from '@/utils/appStore';
import Link from 'next/link';

const features = [
    {
        title: '10-Minute Approval & 24-Hour Disbursal',
        description: 'Get your loan approved quickly and funds disbursed within 24 hours – no delays, no hassle.',
        icon: 'Clock',
        gradient: 'from-blue-500 to-cyan-500',
        accent: 'text-blue-600'
    },
    {
        title: 'Apply Anytime, Anywhere',
        description: 'With our instant personal loan application, you can apply 24/7 — from home, office, or on the go.',
        icon: 'Globe',
        gradient: 'from-purple-500 to-pink-500',
        accent: 'text-purple-600'
    },
    {
        title: 'Multiple Lender Offers',
        description: 'Compare loan options from top banks and NBFCs. Choose the best rate that fits your financial needs.',
        icon: 'BarChart3',
        gradient: 'from-green-500 to-emerald-500',
        accent: 'text-green-600'
    },
    {
        title: 'Flexible EMI Options',
        description: 'Enjoy easy repayment terms with EMIs ranging from 12 to 84 months. Total control over your repayment plan.',
        icon: 'CreditCard',
        gradient: 'from-orange-500 to-amber-500',
        accent: 'text-orange-600'
    },
    {
        title: '100% Digital & Paperless Process',
        description: 'No more paperwork! From application to disbursal, everything happens online — fast and secure.',
        icon: 'Smartphone',
        gradient: 'from-teal-500 to-cyan-500',
        accent: 'text-teal-600'
    },
    {
        title: 'Real-Time Loan Tracking',
        description: 'Stay updated every step of the way. Track your loan status live through the app.',
        icon: 'BarChart3',
        gradient: 'from-pink-500 to-rose-500',
        accent: 'text-pink-600'
    },
    {
        title: 'Loans for Every Need',
        description: "Whether it's a personal loan, business loan, or GST loan — Samridhya has you covered.",
        icon: 'Shield',
        gradient: 'from-indigo-500 to-blue-500',
        accent: 'text-indigo-600'
    },
    {
        title: 'Bilingual App Support',
        description: 'Use Samridhya in English or Hindi — making digital lending easy and accessible for all.',
        icon: 'Languages',
        gradient: 'from-red-500 to-pink-500',
        accent: 'text-red-600'
    },
];

// Icon mapping object
const iconMap = {
    Clock,
    Globe,
    CreditCard,
    Smartphone,
    BarChart3,
    Shield,
    Languages,
    ArrowRight
};

export default function KeyFeatures() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const getIconComponent = (iconName: string) => {
        return iconMap[iconName as keyof typeof iconMap] || Clock;
    };

    return (
        <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
            {/* Enhanced background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#276ef4]/15 to-purple-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-400/10 to-green-400/15 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-full blur-3xl -z-10 animate-pulse delay-500" />

            {/* Floating elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${10 + (i * 12)}%`,
                            top: `${20 + Math.sin(i) * 30}%`,
                        }}
                    >
                        <div className="w-3 h-3 bg-gradient-to-r from-[#276ef4]/30 to-purple-400/30 rounded-full"></div>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced header section */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-[#2b004b] mb-4 leading-tight mb-4 sm:mb-6">
                        Key Features of{' '}
                        <span className="bg-gradient-to-r from-[#276ef4] to-green-500 bg-clip-text text-transparent">
                            Samridhya
                        </span>
                    </h2>

                    <div className="relative bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl max-w-4xl mx-auto">
                        {/* Decorative corner elements */}
                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-[#276ef4]/20 to-purple-400/20 rounded-full"></div>
                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full"></div>
                        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full"></div>
                        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full"></div>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                            <strong className="bg-gradient-to-r from-[#276ef4] to-purple-600 bg-clip-text text-transparent font-bold">
                                Samridhya
                            </strong> is your trusted loan app with advanced features designed for modern borrowers. Experience{' '}
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                                lightning-fast approvals
                            </span>{' '}
                            and seamless digital processes.
                        </p>
                    </div>

                    <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#276ef4] to-green-500 rounded-full mx-auto mt-4 sm:mt-6 md:mt-8"></div>
                </div>

                {/* Enhanced features grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
                    {features.map((feature, idx) => {
                        const IconComponent = getIconComponent(feature.icon);
                        return (
                            <div
                                key={idx}
                                className="group relative bg-white/80 backdrop-blur-sm border border-white/60 hover:border-white/80 p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Background gradient effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl sm:rounded-2xl md:rounded-3xl`}></div>

                                {/* Top accent line */}
                                <div className={`absolute top-0 left-3 sm:left-6 right-3 sm:right-6 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                                <div className="relative z-10 flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4">
                                    {/* Enhanced icon */}
                                    <div className={`flex-shrink-0 w-10 h-10 sm:w-14 md:w-16 sm:h-14 md:h-16 bg-gradient-to-br ${feature.gradient} rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transform transition-all duration-500`}>
                                        <IconComponent className="w-5 h-5 sm:w-7 md:w-8 sm:h-7 md:h-8 text-white" />
                                    </div>

                                    <div className="flex-1 space-y-1 sm:space-y-2 md:space-y-3">
                                        <h3 className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
                                            {feature.title}
                                        </h3>

                                        {/* Mobile: Learn more toggle */}
                                        <div className="sm:hidden">
                                            <button
                                                onClick={() =>
                                                    setExpandedIndex(expandedIndex === idx ? null : idx)
                                                }
                                                className="text-xs text-blue-600 hover:underline focus:outline-none font-medium"
                                            >
                                                {expandedIndex === idx ? 'Show less' : 'Learn more'}
                                            </button>

                                            {/* Mobile: Description (toggle) */}
                                            {expandedIndex === idx && (
                                                <p
                                                    className="text-gray-700 text-xs leading-relaxed font-medium mt-2"
                                                >
                                                    {feature.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Desktop: Always show description */}
                                        <div className="hidden sm:block">
                                            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                                                {feature.description}
                                            </p>
                                        </div>

                                        {/* Subtle progress indicator */}
                                        <div className="mt-1 sm:mt-2 md:mt-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            <div className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full flex-1 mr-2`}></div>
                                            <span className={`text-xs font-semibold ${feature.accent}`}>Verified</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom right accent */}
                                <div className={`absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-tl ${feature.gradient} opacity-5 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
                            </div>
                        );
                    })}
                </div>

                {/* Enhanced Call-to-action section */}
                <motion.div
                    className="mt-12 sm:mt-16 md:mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {/* Desktop Layout */}
                    <div className="hidden sm:block bg-gradient-to-r from-[#276ef4] to-green-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 text-white shadow-2xl">
                        <div className="text-center mb-4 sm:mb-6 md:mb-8">
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
                                Ready to Experience the Future of Lending?
                            </h3>
                            <p className="text-white/90 text-sm sm:text-base md:text-lg">
                                Join thousands of satisfied customers who trust Samridhya for their financial needs.
                            </p>
                        </div>
                        <button
                            onClick={handleAppDownload}
                            className="bg-white text-[#276ef4] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Get Started Today
                        </button>
                    </div>

                    {/* Mobile Layout - Single Row */}
                    <button
                        onClick={handleAppDownload}
                        className="sm:hidden w-full bg-gradient-to-r from-[#276ef4] to-green-500 rounded-2xl p-4 text-white shadow-2xl flex items-center justify-center text-center active:scale-95 transition-transform duration-200 gap-2"
                    >
                        <span className="text-base font-bold">Experience the future of lending</span>
                        <ArrowRight className="w-6 h-6 text-white" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}