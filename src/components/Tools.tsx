'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, FileText, BarChart3 } from 'lucide-react';

const tools = [
    {
        icon: Calculator,
        title: 'Loan Calculator',
        description: 'Know your EMI before you borrow',
        href: '/loan-calculator',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        icon: FileText,
        title: 'Loan Repayment Calculator',
        description: 'Plan repayments smartly',
        href: '/repayment-calculator',
        gradient: 'from-purple-500 to-pink-500',
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
        <section className="relative py-20 px-4 md:px-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#276ef4]/15 to-purple-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-400/10 to-green-400/15 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2b004b]">
                        Use Our <span className="bg-gradient-to-r from-[#276ef4] to-green-500 bg-clip-text text-transparent">Free Tools</span>
                    </h2>
                    <p className="text-gray-600 mt-4 text-lg">Smart tools to help you borrow better</p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool, idx) => {
                        const Icon = tool.icon;
                        return (
                            <motion.div
                                key={idx}
                                className="group relative bg-white/80 backdrop-blur-sm border border-white/60 hover:border-white/80 p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                                <div className="relative z-10 flex items-start space-x-4">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-all duration-500`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-[#2b004b] group-hover:text-[#276ef4] transition">
                                            {tool.title}
                                        </h3>
                                        <p className="text-gray-600 mt-1">{tool.description}</p>

                                        {tool.href && (
                                            <Link
                                                href={tool.href}
                                                className="inline-block mt-3 text-[#276ef4] font-medium hover:underline"
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
        </section>
    );
}