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
        <section className="bg-[#f8f8f8] py-16 px-4 md:px-12">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-[#2b004b] text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Frequently Asked Questions
                </motion.h2>

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
