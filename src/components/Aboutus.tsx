'use client';

import { motion } from 'framer-motion';

export default function AboutUs() {
    return (
        <section className="py-12 sm:py-16 px-2 sm:px-4 md:px-12 min-h-[50vh] sm:min-h-[60vh] w-full relative overflow-hidden">
            {/* Animated colorful blobs for vibrancy */}
            <motion.div
                className="absolute top-[-12%] left-[-10%] w-72 h-72 bg-gradient-to-br from-[#276ef4]/40 via-[#a259ff]/30 to-[#f7971e]/30 rounded-full blur-3xl -z-10 animate-pulse"
                animate={{ scale: [1, 1.08, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-[-12%] right-[-10%] w-72 h-72 bg-gradient-to-tr from-[#f7971e]/30 via-[#43e97b]/30 to-[#38f9d7]/40 rounded-full blur-3xl -z-10 animate-pulse"
                animate={{ scale: [1, 1.05, 1], rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 2 }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-[#43e97b]/20 via-[#38f9d7]/20 to-[#a259ff]/20 rounded-full blur-2xl -z-10 animate-pulse"
                style={{ transform: 'translate(-50%, -50%)' }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut', delay: 1 }}
            />
            <div className="max-w-5xl mx-auto text-center relative z-10 px-2 sm:px-0">
            
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#276ef4] via-[#a259ff] to-[#f7971e] text-center mb-4 sm:mb-6 drop-shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    About Us
                </motion.h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#276ef4] to-purple-600 rounded-full mx-auto mb-6 sm:mb-8"></div>

                <motion.p
                    className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <strong className="text-[#276ef4]">Samridhya</strong> is an ONDC-registered digital loan platform,
                    fully compliant with <strong>RBI regulations</strong>.
                </motion.p>

                <motion.p
                    className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mt-4 sm:mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    We make borrowing <span className="font-medium text-[#276ef4]">fast, paperless</span>, and
                    hassle-free—offering instant credit through a secure, 100% digital process.
                </motion.p>

                <motion.p
                    className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mt-4 sm:mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    Compare <strong>multiple offers</strong> from top banks and NBFCs in one place, and
                    choose what’s best for you—<span className="text-[#276ef4] font-medium">quickly and confidently</span>.
                </motion.p>

                <motion.p
                    className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mt-4 sm:mt-6"
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
