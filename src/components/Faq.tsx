'use client';

import { motion } from 'framer-motion';

const faqs = [
    {
        question: 'Is Samridhya a secure app for taking loans?',
        answer:
            'Yes. Samridhya is integrated with ONDC and follows strict data security and KYC protocols.',
    },
    {
        question: 'How fast is loan approval?',
        answer:
            'Most users receive approval within minutes after submitting KYC details.',
    },
];

export default function Faq() {
    return (
        <section className="py-12 sm:py-16 px-2 sm:px-4 md:px-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center w-full px-2 sm:px-0">
                    {/* Remove or comment out the motion.div with 'Support & Help' in the FAQ section */}
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
                </div>

                <div className="space-y-6 sm:space-y-8">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#2b004b]">
                                Q{idx + 1}: {faq.question}
                            </h3>
                            <p className="text-gray-700 mt-2 text-sm sm:text-base">{faq.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
