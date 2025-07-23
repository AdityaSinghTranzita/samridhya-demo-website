'use client';

import { motion } from 'framer-motion';

export default function AboutUs() {
    return (
        <section className="bg-[#f8f8f8] py-16 px-4 md:px-12">
            <div className="max-w-5xl mx-auto text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-[#2b004b] mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    About Us
                </motion.h2>

                <motion.p
                    className="text-base md:text-lg text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <strong className="text-[#276ef4]">Samridhya</strong> is an ONDC-registered digital loan platform,
                    fully compliant with <strong>RBI regulations</strong>.
                </motion.p>

                <motion.p
                    className="text-base md:text-lg text-gray-700 leading-relaxed mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    We make borrowing <span className="font-medium text-[#276ef4]">fast, paperless</span>, and
                    hassle-free—offering instant credit through a secure, 100% digital process.
                </motion.p>

                <motion.p
                    className="text-base md:text-lg text-gray-700 leading-relaxed mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    Compare <strong>multiple offers</strong> from top banks and NBFCs in one place, and
                    choose what’s best for you—<span className="text-[#276ef4] font-medium">quickly and confidently</span>.
                </motion.p>

                <motion.p
                    className="text-base md:text-lg text-gray-700 leading-relaxed mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    From <span className="font-medium text-[#276ef4]">personal</span> to{' '}
                    <span className="font-medium text-[#276ef4]">business</span> and{' '}
                    <span className="font-medium text-[#276ef4]">GST loans</span>, Samridhya is your one-stop solution
                    for smart, flexible financing.
                </motion.p>
            </div>
        </section>
    );
}
