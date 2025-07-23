'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Building2, GraduationCap, Heart, Plane, Stethoscope, ArrowRight, Sparkles } from 'lucide-react';

const offers = [
    {
        title: 'Personal Loan',
        description: 'Get Up to ₹40 Lakhs in Just 10 Minutes!',
        href: '/personal-loan',
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
        href: '/business-loan',
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
        href: '/education-loan',
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
        href: '/wedding-loan',
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
        href: '/travel-loan',
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
        href: '/medical-loan',
        icon: Stethoscope,
        gradient: 'from-red-500 to-pink-500',
        bgGradient: 'from-red-50 to-pink-50',
        amount: '₹25L',
        time: '24 hours',
        features: ['Emergency support', 'Fast processing', 'Cashless treatment']
    },
];

export default function WhatWeOffer() {
    return (
        <section className="relative bg-gradient-to-br from-[#f8f8f8] via-gray-50 to-white py-20 px-4 md:px-12 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#276ef4]/10 to-transparent rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl -z-10" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#276ef4]/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Enhanced header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#276ef4]/10 to-purple-500/10 text-[#276ef4] px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-[#276ef4]/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Sparkles className="w-4 h-4" />
                        Loan Solutions for Every Need
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#2b004b] mb-6">
                        What We{' '}
                        <span className="bg-gradient-to-r from-[#276ef4] to-purple-600 bg-clip-text text-transparent">
                            Offer
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Comprehensive financial solutions tailored to your unique needs,
                        with instant approvals and competitive rates.
                    </p>

                    <div className="w-24 h-1 bg-gradient-to-r from-[#276ef4] to-purple-600 rounded-full mx-auto mt-6"></div>
                </motion.div>

                {/* Enhanced offers grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {offers.map((offer, idx) => {
                        const IconComponent = offer.icon;
                        return (
                            <motion.div
                                key={idx}
                                className={`group relative bg-gradient-to-br ${offer.bgGradient} backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 overflow-hidden`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                            >
                                {/* Background glow effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                                {/* Top gradient bar */}
                                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${offer.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl`}></div>

                                <div className="relative z-10">
                                    {/* Header section with icon and stats */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${offer.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transform transition-all duration-500`}>
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>

                                        <div className="text-right">
                                            <div className={`text-2xl font-bold bg-gradient-to-r ${offer.gradient} bg-clip-text text-transparent`}>
                                                {offer.amount}
                                            </div>
                                            <div className="text-sm text-gray-500 font-medium">
                                                up to {offer.time}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-[#2b004b] group-hover:text-[#276ef4] transition-colors duration-300 mb-3">
                                        {offer.title}
                                    </h3>

                                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-6 leading-relaxed">
                                        {offer.description}
                                    </p>

                                    {/* Features list */}
                                    <div className="space-y-2 mb-6">
                                        {offer.features.map((feature, featureIdx) => (
                                            <div key={featureIdx} className="flex items-center text-sm text-gray-600">
                                                <div className={`w-2 h-2 bg-gradient-to-r ${offer.gradient} rounded-full mr-3 flex-shrink-0`}></div>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Enhanced CTA */}
                                    {offer.href && (
                                        <Link href={offer.href} className="group/link">
                                            <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${offer.gradient} text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                                                <span>Learn More</span>
                                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </Link>
                                    )}
                                </div>

                                {/* Corner decoration */}
                                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <div className={`w-3 h-3 bg-gradient-to-r ${offer.gradient} rounded-full`}></div>
                                </div>

                                {/* Bottom right accent */}
                                <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${offer.gradient} opacity-10 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA section */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-3xl p-8 md:p-12 shadow-xl">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#2b004b] mb-4">
                            Can't Find What You're Looking For?
                        </h3>
                        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                            Our loan experts are here to help you find the perfect financial solution for your unique needs.
                        </p>
                        <motion.button
                            className="bg-gradient-to-r from-[#276ef4] to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Speak with an Expert
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}