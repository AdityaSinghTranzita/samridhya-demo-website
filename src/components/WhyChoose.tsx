'use client';

import { motion } from 'framer-motion';
import { Clock, Percent, Target, CreditCard, FileText, BarChart3, Building2, TrendingUp, CheckCircle2, Sparkles, Star } from 'lucide-react';

const features = [
    {
        text: 'Quick Online Loan App – Apply in minutes, get instant approval',
        icon: Clock,
        gradient: 'from-blue-500 to-cyan-500',
        accent: 'text-blue-600'
    },
    {
        text: 'Affordable Interest Rates – Starting at just 9.99% p.a.',
        icon: Percent,
        gradient: 'from-green-500 to-emerald-500',
        accent: 'text-green-600'
    },
    {
        text: 'Custom Offers – Tailored rates based on your financial profile',
        icon: Target,
        gradient: 'from-purple-500 to-violet-500',
        accent: 'text-purple-600'
    },
    {
        text: 'Flexible EMI Options – Choose repayment plans that work for you',
        icon: CreditCard,
        gradient: 'from-orange-500 to-amber-500',
        accent: 'text-orange-600'
    },
    {
        text: '100% Paperless Process – No physical documents needed',
        icon: FileText,
        gradient: 'from-teal-500 to-cyan-500',
        accent: 'text-teal-600'
    },
    {
        text: 'Real-Time Loan Tracking – Stay updated every step of the way',
        icon: BarChart3,
        gradient: 'from-pink-500 to-rose-500',
        accent: 'text-pink-600'
    },
    {
        text: 'Multiple Lender Offers – Compare loans from top banks & NBFCs',
        icon: Building2,
        gradient: 'from-indigo-500 to-blue-500',
        accent: 'text-indigo-600'
    },
    {
        text: 'Business Loans for MSMEs & Self-Employed – Designed for India\'s growth engine',
        icon: TrendingUp,
        gradient: 'from-red-500 to-pink-500',
        accent: 'text-red-600'
    },
];

export default function WhyChoose() {
    return (
        <section className="relative py-14 sm:py-20 px-2 sm:px-4 md:px-12 overflow-hidden">
            {/* Enhanced background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#276ef4]/15 to-purple-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-400/10 to-green-400/15 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-full blur-3xl -z-10 animate-pulse delay-500" />

            {/* Floating elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${10 + (i * 12)}%`,
                            top: `${20 + Math.sin(i) * 30}%`,
                        }}
                        animate={{
                            y: [-15, 15, -15],
                            rotate: [0, 180, 360],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.3
                        }}
                    >
                        <div className="w-3 h-3 bg-gradient-to-r from-[#276ef4]/30 to-purple-400/30 rounded-full"></div>
                    </motion.div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced header section */}
                <motion.div
                    className="text-center mb-10 sm:mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                

                    <h2 className="text-4xl md:text-5xl font-bold text-[#2b004b] mb-6">
                        Why Choose{' '}
                        <span className="bg-gradient-to-r from-[#276ef4] to-green-500 bg-clip-text text-transparent">
                            Samridhya
                        </span>
                        <span className="text-3xl md:text-4xl">?</span>
                    </h2>

                    <motion.div
                        className="relative bg-white/70 backdrop-blur-sm border border-white/80 rounded-3xl p-8 md:p-10 shadow-xl max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        {/* Decorative corner elements */}
                        <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-[#276ef4]/20 to-purple-400/20 rounded-full"></div>
                        <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full"></div>

                        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                            <strong className="bg-gradient-to-r from-[#276ef4] to-purple-600 bg-clip-text text-transparent font-bold">
                                Samridhya
                            </strong> is your one-stop solution for fast, flexible, and secure
                            financing. From personal to GST-based business loans, enjoy a 100% digital, stress-free experience with top lender offers, real-time tracking, and rates starting at just{' '}
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-bold text-xl sm:text-2xl">
                                9.99% p.a.
                            </span>
                        </p>
                    </motion.div>

                    <div className="w-24 h-1 bg-gradient-to-r from-[#276ef4] to-green-500 rounded-full mx-auto mt-6 sm:mt-8"></div>
                </motion.div>

                {/* Enhanced features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {features.map((feature, idx) => {
                        const IconComponent = feature.icon;
                        return (
                            <motion.div
                                key={idx}
                                className="group relative bg-white/80 backdrop-blur-sm border border-white/60 hover:border-white/80 p-4 sm:p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                            >
                                {/* Background gradient effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                                {/* Top accent line */}
                                <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                                <div className="relative z-10 flex items-start space-x-5">
                                    {/* Enhanced icon */}
                                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transform transition-all duration-500`}>
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                                            {feature.text}
                                        </p>

                                        {/* Subtle progress indicator */}
                                        <div className="mt-4 flex items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            <div className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full flex-1 mr-3`}></div>
                                            <span className={`text-xs font-semibold ${feature.accent}`}>Verified</span>
                                        </div>
                                    </div>

                                    {/* Check mark positioned absolutely */}
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                </div>

                                {/* Bottom right accent */}
                                <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${feature.gradient} opacity-5 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom statistics section */}
                <motion.div
                    className="mt-12 sm:mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="bg-gradient-to-r from-[#276ef4] to-green-500 rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl">
                        <div className="text-center mb-6 sm:mb-8">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                                Trusted by Thousands of Happy Customers
                            </h3>
                            <p className="text-white/90 text-lg">
                                Join the growing community of satisfied borrowers who chose Samridhya
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
                                <div className="text-white/80">Loans Disbursed</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">₹500Cr+</div>
                                <div className="text-white/80">Amount Funded</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">4.8★</div>
                                <div className="text-white/80">Customer Rating</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">10 Min</div>
                                <div className="text-white/80">Avg. Approval Time</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}