'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, FileText, BarChart3 } from 'lucide-react';

const tools = [
    {
        icon: Calculator,
        title: 'Loan Calculator',
        description: 'Know your EMI before you borrow',
        href: '/calculators/loan-calculator',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        icon: BarChart3,
        title: 'Credit Score Checker',
        description: 'Check your credit score instantly',
        href: '/credit-score-checker',
        gradient: 'from-green-500 to-emerald-500',
    },
];

export default function Tools() {
    return (
        <section className="relative py-14 sm:py-20 px-2 sm:px-4 md:px-12 overflow-hidden w-full">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#276ef4]/15 to-purple-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-400/10 to-green-400/15 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <motion.div
                    className="text-center mb-10 sm:mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-[#2b004b]">
                        Use Our <span className="bg-gradient-to-r from-[#276ef4] to-green-500 bg-clip-text text-transparent">Free Tools</span>
                    </h2>
                    <p className="text-gray-600 mt-2 sm:mt-4 text-sm sm:text-base">Smart tools to help you borrow better</p>
                </motion.div>

                <div className="flex justify-center">
                    <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 max-w-4xl">
                    {tools.map((tool, idx) => {
                        const Icon = tool.icon;
                        return (
                            <motion.div
                                key={idx}
                                className="group relative bg-white/80 backdrop-blur-sm border border-white/60 hover:border-white/80 p-4 sm:p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden w-full max-w-full"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                                <div className="relative z-10 flex items-start space-x-4 w-full max-w-full">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-all duration-500`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    <div className="w-full max-w-full">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            {tool.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{tool.description}</p>

                                        {tool.href && (
                                            <Link
                                                href={tool.href}
                                                className="inline-block mt-2 sm:mt-3 text-[#276ef4] font-medium hover:underline text-xs sm:text-base"
                                            >
                                                Try Now →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </section>
    );
}