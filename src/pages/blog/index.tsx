'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

export default function BlogWIP() {
  return (
    <section className="bg-[#f8f8f8] py-16 px-4 md:px-12 min-h-screen w-full relative overflow-hidden">
      {/* Animated colorful blobs - enhanced for vibrancy */}
      <motion.div
        className="absolute top-[-12%] left-[-10%] w-96 h-96 bg-gradient-to-br from-[#276ef4]/50 via-[#a259ff]/40 to-[#f7971e]/40 rounded-full blur-3xl -z-10 animate-pulse"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 15, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-12%] right-[-10%] w-96 h-96 bg-gradient-to-tr from-[#f7971e]/40 via-[#43e97b]/40 to-[#38f9d7]/50 rounded-full blur-3xl -z-10 animate-pulse"
        animate={{ scale: [1, 1.08, 1], rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-[#43e97b]/30 via-[#38f9d7]/30 to-[#a259ff]/30 rounded-full blur-2xl -z-10 animate-pulse"
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 1 }}
      />
      {/* Extra blob for more color */}
      <motion.div
        className="absolute top-[10%] right-[15%] w-60 h-60 bg-gradient-to-tl from-[#a259ff]/30 via-[#f7971e]/30 to-[#276ef4]/30 rounded-full blur-2xl -z-10 animate-pulse"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 3 }}
      />
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center w-full z-10">
        <motion.div
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="mb-8"
        >
          <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#276ef4] via-[#a259ff] to-[#f7971e] shadow-2xl p-6 border-4 border-white">
            <Wrench className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg" />
          </span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#276ef4] via-[#a259ff] to-[#f7971e] mb-4 drop-shadow-lg">
          Work in Progress
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl font-medium drop-shadow-sm">
          Our blog & news section is <span className="text-[#a259ff] font-semibold">coming soon!</span> <br />We’re working hard to bring you the latest updates, tips, and insights. Please check back later.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-[#276ef4] via-[#a259ff] to-[#f7971e] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg border-2 border-white"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
