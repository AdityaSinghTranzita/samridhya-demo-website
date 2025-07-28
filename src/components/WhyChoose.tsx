'use client';

import { useState } from 'react';
import {
    Clock, Percent, Target, CreditCard, FileText,
    BarChart3, Building2, TrendingUp, CheckCircle2
} from 'lucide-react';

const features = [
    {
        title: 'Quick Online Loan App',
        description: 'Apply in minutes and get instant approval without the wait.',
        icon: Clock,
        gradient: 'from-blue-500 to-cyan-500',
        accent: 'text-blue-600'
    },
    {
        title: 'Affordable Interest Rates',
        description: 'Enjoy rates starting at just 9.99% p.a., tailored for you.',
        icon: Percent,
        gradient: 'from-green-500 to-emerald-500',
        accent: 'text-green-600'
    },
    {
        title: 'Custom Offers',
        description: 'Get loan offers tailored to your financial profile.',
        icon: Target,
        gradient: 'from-purple-500 to-violet-500',
        accent: 'text-purple-600'
    },
    {
        title: 'Flexible EMI Options',
        description: 'Choose repayment plans that suit your financial goals.',
        icon: CreditCard,
        gradient: 'from-orange-500 to-amber-500',
        accent: 'text-orange-600'
    },
    {
        title: '100% Paperless Process',
        description: 'No need for physical documents – the process is fully digital.',
        icon: FileText,
        gradient: 'from-teal-500 to-cyan-500',
        accent: 'text-teal-600'
    },
    {
        title: 'Real-Time Loan Tracking',
        description: 'Track your loan status at every stage of the process.',
        icon: BarChart3,
        gradient: 'from-pink-500 to-rose-500',
        accent: 'text-pink-600'
    },
    {
        title: 'Multiple Lender Offers',
        description: 'Compare loans from top banks & NBFCs in one place.',
        icon: Building2,
        gradient: 'from-indigo-500 to-blue-500',
        accent: 'text-indigo-600'
    },
    {
        title: 'Business Loans for MSMEs & Self-Employed',
        description: "Tailored financing designed for India's growth engine.",
        icon: TrendingUp,
        gradient: 'from-red-500 to-pink-500',
        accent: 'text-red-600'
    },
];

export default function WhyChoose() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section className="relative py-8 sm:py-14 md:py-20 px-3 sm:px-4 md:px-12 overflow-hidden">
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
                <div
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2b004b] mb-4 sm:mb-6">
                        Why Choose{' '}
                        <span className="bg-gradient-to-r from-[#276ef4] to-green-500 bg-clip-text text-transparent">
                            Samridhya
                        </span>
                        <span className="text-2xl sm:text-3xl md:text-4xl">?</span>
                    </h2>

                    <div
                        className="relative bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl max-w-4xl mx-auto"
                    >
                        {/* Decorative corner elements */}
                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-[#276ef4]/20 to-purple-400/20 rounded-full"></div>
                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full"></div>
                        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full"></div>
                        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full"></div>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                            <strong className="bg-gradient-to-r from-[#276ef4] to-purple-600 bg-clip-text text-transparent font-bold">
                                Samridhya
                            </strong> is your one-stop solution for fast, flexible, and secure
                            financing. From personal to GST-based business loans, enjoy a 100% digital, stress-free experience with top lender offers, real-time tracking, and rates starting at just{' '}
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                                9.99% p.a.
                            </span>
                        </p>
                    </div>

                    <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#276ef4] to-green-500 rounded-full mx-auto mt-4 sm:mt-6 md:mt-8"></div>
                </div>

                {/* Enhanced features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                    {features.map((feature, idx) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-white/80 backdrop-blur-sm border border-white/60 hover:border-white/80 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Background gradient effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`}></div>

                                {/* Top accent line */}
                                <div className={`absolute top-0 left-4 sm:left-6 right-4 sm:right-6 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                                <div className="relative z-10 flex items-start space-x-3 sm:space-x-4 md:space-x-5">
                                    {/* Enhanced icon */}
                                    <div className={`flex-shrink-0 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transform transition-all duration-500`}>
                                        <IconComponent className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-white" />
                                    </div>

                                    <div className="flex-1 space-y-1 sm:space-y-2">
                                        <h3 className="text-gray-900 font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
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
                                            <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed font-medium">
                                                {feature.description}
                                            </p>
                                        </div>

                                        {/* Subtle progress indicator */}
                                        <div className="mt-2 sm:mt-4 flex items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            <div className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full flex-1 mr-2 sm:mr-3`}></div>
                                            <span className={`text-xs font-semibold ${feature.accent}`}>Verified</span>
                                        </div>
                                    </div>

                                    {/* Check mark positioned absolutely - hidden on mobile */}
                                    <div className="hidden sm:flex w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-green-100 group-hover:bg-green-200 rounded-full items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                        <CheckCircle2 className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-green-600" />
                                    </div>
                                </div>

                                {/* Bottom right accent */}
                                <div className={`absolute bottom-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-tl ${feature.gradient} opacity-5 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom statistics section */}
                <div
                    className="mt-8 sm:mt-12 md:mt-20"
                >
                    <div className="bg-gradient-to-r from-[#276ef4] to-green-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 text-white shadow-2xl">
                        <div className="text-center mb-4 sm:mb-6 md:mb-8">
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
                                Trusted by Thousands of Happy Customers
                            </h3>
                            <p className="text-white/90 text-sm sm:text-base md:text-lg">
                                Join the growing community of satisfied borrowers who chose Samridhya
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 text-center">
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">50K+</div>
                                <div className="text-white/80 text-xs sm:text-sm md:text-base">Loans Disbursed</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">₹500Cr+</div>
                                <div className="text-white/80 text-xs sm:text-sm md:text-base">Amount Funded</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">4.8★</div>
                                <div className="text-white/80 text-xs sm:text-sm md:text-base">Customer Rating</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">10 Min</div>
                                <div className="text-white/80 text-xs sm:text-sm md:text-base">Avg. Approval Time</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}