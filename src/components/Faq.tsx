'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: 'Is Samridhya a secure app for taking loans?',
        answer: 'Yes, Samridhya is completely secure. We are integrated with ONDC (Open Network for Digital Commerce) and follow strict RBI guidelines for data security and KYC protocols. All your personal and financial information is encrypted and protected with bank-level security measures.',
    },
    {
        question: 'How fast is loan approval?',
        answer: 'Most users receive approval within minutes after submitting their KYC details. Our AI-powered system processes applications instantly, and once approved, funds are transferred directly to your bank account within 24-48 hours.',
    },
    {
        question: 'What documents do I need to apply for a loan?',
        answer: 'You need minimal documentation: Aadhaar card, PAN card, and a recent bank statement. Our digital KYC process makes it quick and paperless. No physical documents or visits required.',
    },
    {
        question: 'What is the maximum loan amount I can get?',
        answer: 'You can get loans up to ₹10 Lakhs depending on your credit score, income, and repayment capacity. First-time users typically get ₹50,000 to ₹2 Lakhs, which increases with good repayment history.',
    },
    {
        question: 'What are the interest rates?',
        answer: 'Our interest rates start from 1.5% per month (18% APR) and go up to 2.5% per month (30% APR) depending on your credit profile. We offer competitive rates with no hidden charges.',
    },
    {
        question: 'Can I prepay my loan?',
        answer: 'Yes, you can prepay your loan anytime without any prepayment charges. Early repayment can also help improve your credit score and make you eligible for higher loan amounts in the future.',
    },
    {
        question: 'What happens if I miss a payment?',
        answer: 'We understand financial difficulties. If you miss a payment, we\'ll send you reminders and work with you to find a solution. Late fees may apply, but we always try to help customers get back on track.',
    },
    {
        question: 'Is Samridhya RBI compliant?',
        answer: 'Yes, Samridhya is fully RBI compliant and operates under the Digital Lending Guidelines. We partner with RBI-regulated NBFCs and banks to provide loans, ensuring complete regulatory compliance.',
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 sm:py-16 px-2 sm:px-4 md:px-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center w-full px-2 sm:px-0">
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#276ef4] to-purple-600 text-center mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#276ef4] to-purple-600 rounded-full mx-auto mb-6 sm:mb-8"></div>
                    <motion.p
                        className="text-gray-600 text-center mb-8 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Find answers to common questions about our loan services, application process, and more.
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <button
                                onClick={() => toggleFaq(idx)}
                                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-xl"
                            >
                                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    {openIndex === idx ? (
                                        <ChevronUp className="w-5 h-5 text-blue-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </motion.div>
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6">
                                            <div className="pt-2 border-t border-gray-100">
                                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Support */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-600 mb-4">
                        Still have questions? We're here to help!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:1800-123-4567"
                            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Call Support
                        </a>
                        <a
                            href="mailto:support@samridhya.com"
                            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-200"
                        >
                            Email Support
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
