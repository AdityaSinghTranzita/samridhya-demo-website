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
        <section className="py-16 px-4 md:px-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center w-full">
                    <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#276ef4]/10 to-purple-500/10 text-[#276ef4] px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-[#276ef4]/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Support & Help
                    </motion.div>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#276ef4] to-purple-600 text-center mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#276ef4] to-purple-600 rounded-full mx-auto mb-8"></div>
                </div>

                <div className="space-y-8">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-lg md:text-xl font-semibold text-[#2b004b]">
                                Q{idx + 1}: {faq.question}
                            </h3>
                            <p className="text-gray-700 mt-2">{faq.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
