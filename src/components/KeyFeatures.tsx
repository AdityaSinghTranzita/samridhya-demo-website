// KeyFeatures.tsx

'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Globe, CreditCard, Smartphone, BarChart3, Shield, Languages } from 'lucide-react';

const features = [
    {
        title: '10-Minute Approval & 24-Hour Disbursal',
        desc: 'Get your loan approved quickly and funds disbursed within 24 hours – no delays, no hassle.',
        icon: Clock,
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'Apply Anytime, Anywhere',
        desc: 'With our instant personal loan application, you can apply 24/7 — from home, office, or on the go.',
        icon: Globe,
        gradient: 'from-purple-500 to-pink-500'
    },
    {
        title: 'Multiple Lender Offers',
        desc: 'Compare loan options from top banks and NBFCs. Choose the best rate that fits your financial needs.',
        icon: BarChart3,
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        title: 'Flexible EMI Options',
        desc: 'Enjoy easy repayment terms with EMIs ranging from 12 to 84 months. Total control over your repayment plan.',
        icon: CreditCard,
        gradient: 'from-orange-500 to-red-500'
    },
    {
        title: '100% Digital & Paperless Process',
        desc: 'No more paperwork! From application to disbursal, everything happens online — fast and secure.',
        icon: Smartphone,
        gradient: 'from-indigo-500 to-blue-500'
    },
    {
        title: 'Real-Time Loan Tracking',
        desc: 'Stay updated every step of the way. Track your loan status live through the app.',
        icon: BarChart3,
        gradient: 'from-teal-500 to-green-500'
    },
    {
        title: 'Loans for Every Need',
        desc: "Whether it's a personal loan, business loan, or GST loan — Samridhya has you covered.",
        icon: Shield,
    gradient: 'from-violet-500 to-purple-500'
},
{
    title: 'Bilingual App Support',
        desc: 'Use Samridhya in English or Hindi — making digital lending easy and accessible for all.',
    icon: Languages,
    gradient: 'from-rose-500 to-pink-500'
},
];

export default function KeyFeatures() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Enhanced background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#276EF4]/20 to-cyan-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#276EF4]/30 to-purple-400/15 rounded-full blur-2xl -z-10 animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl -z-10 animate-pulse delay-500" />

            {/* Decorative grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] -z-10">
                <div className="h-full w-full" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #276EF4 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                {/* Enhanced header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-[#276EF4]/10 text-[#276EF4] px-4 py-2 rounded-full text-sm font-medium mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Why Choose Samridhya
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#2b004b] mb-6 leading-tight">
                        Key Features of{' '}
                        <span className="bg-gradient-to-r from-[#276EF4] to-cyan-500 bg-clip-text text-transparent">
                            Samridhya
                        </span>
                        <br />
                        <span className="text-3xl md:text-4xl text-gray-600 font-medium">
                            Your Trusted Loan App
                        </span>
                    </h2>

                    <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto"></div>
                </motion.div>

                {/* Enhanced features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, idx) => {
                        const IconComponent = feature.icon;
                        return (
                            <motion.div
                                key={idx}
                                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-left border border-gray-100/50 backdrop-blur-sm hover:-translate-y-2"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                {/* Gradient background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#276EF4]/5 to-cyan-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Top accent line */}
                                <div className={`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                                <div className="relative z-10 flex items-start space-x-5">
                                    {/* Enhanced icon container */}
                                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                                        <IconComponent className="text-white w-7 h-7" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-[#2b004b] text-xl mb-3 group-hover:text-[#276EF4] transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                            {feature.desc}
                                        </p>

                                        {/* Subtle arrow indicator */}
                                        <div className="mt-4 flex items-center text-[#276EF4] opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                            <span className="text-sm font-medium mr-2">Learn more</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Check circle positioned absolutely */}
                                <div className="absolute top-6 right-6 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Call-to-action section */}
                <motion.div
                    className="mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Ready to Experience the Future of Lending?
                        </h3>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust Samridhya for their financial needs.
                        </p>
                        <motion.button
                            className="bg-white text-[#276EF4] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started Today
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}