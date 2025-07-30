
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
    },
  },
};
const itemVariants1 = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

const floatingAnimation = (delay = 0) => ({
  y: ['-8px', '8px', '-8px'],
  x: ['-5px', '5px', '-5px'],
  transition: {
    delay,
    duration: 4 + delay * 2,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut" as  const,
  },
});

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Blurred Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-60 h-60 sm:w-80 sm:h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-60 h-60 sm:w-80 sm:h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob -z-10"></div>

      <motion.div
        className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Section */}
        <motion.div
          className="w-full max-w-xl text-center lg:text-left mb-8 lg:mb-0"
          variants={itemVariants}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Lending Partner <br className="hidden md:block" /> for your prosperity
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-10">
            100% paperless and seamless journey to avail credit within minutes for your Business as well as Personal Growth.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Image src="https://framerusercontent.com/images/yv2EThgn8X7O6ifyGIN8hYhPcs.png" alt="Google Play" width={20} height={20} />
              Google Play
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 text-white px-4 sm:px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Image src="https://framerusercontent.com/images/uxJ6fCdKefZ2gWhLtSlOWRoGH0.png" alt="App Store" width={20} height={20} />
              App Store
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          className="relative w-full max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg mx-auto mt-6 lg:mt-0"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.05, rotateY: 10, rotateX: -5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Hero Image */}
          <motion.div className="relative" variants={itemVariants1}>
            <Image
              src="https://framerusercontent.com/images/xs6Nw4BRdOuwhmKWccdRYw4vEE.png"
              alt="Samridhya Hero"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />

            {/* Floating Tags (Responsive & Positioned Absolutely) */}
          <motion.div className="absolute top-[5%] left-[5%] xs:top-[8%] xs:left-[10%] md:top-[10%] md:left-[20%]" animate={floatingAnimation(0.2)}>
            <Image
              src="https://framerusercontent.com/images/qo5c8knetCGyfkxaYm57uZ1KFDE.png"
              alt="Low Interest"
              width={100}
              height={40}
              className="w-[60px] sm:w-[90px] md:w-[120px] lg:w-[150px]"
            />
          </motion.div>

          <motion.div className="absolute top-[25%] right-[5%] xs:right-[10px] md:right-[20px]" animate={floatingAnimation(0.4)}>
            <Image
              src="https://framerusercontent.com/images/tqV2FuwGRoBt2TKMvVW8mqQoM6k.png"
              alt="100% Paperless"
              width={90}
              height={40}
              className="w-[70px] sm:w-[100px] md:w-[120px] lg:w-[140px]"
            />
          </motion.div>

          <motion.div className="absolute bottom-[55%] left-[-5%] xs:left-[-20px] md:left-[-60px]" animate={floatingAnimation(0.6)}>
            <Image
              src="https://framerusercontent.com/images/ZkMWEoT4gr7pGLaU5tkAjpXIEIk.png"
              alt="Timely Repayments"
              width={120}
              height={50}
              className="w-[80px] sm:w-[130px] md:w-[160px] lg:w-[180px]"
            />
          </motion.div>

          <motion.div className="absolute bottom-[5%] right-[-10%] xs:right-[-15%] md:right-[-25%]" animate={floatingAnimation(0.8)}>
            <Image
              src="https://framerusercontent.com/images/PDRHRr11cctvEZU3j5HG5Azjk.png"
              alt="100% Secure"
              width={120}
              height={50}
              className="w-[80px] sm:w-[130px] md:w-[160px] lg:w-[190px]"
            />
          </motion.div>

          <motion.div className="absolute bottom-0 left-[2%]" animate={floatingAnimation(1)}>
            <Image
              src="https://framerusercontent.com/images/jqBrCWRG7Y6hyoG7GVxE0ivv1A.png"
              alt="Fast Processing"
              width={130}
              height={50}
              className="w-[90px] sm:w-[140px] md:w-[170px] lg:w-[200px]"
            />
          </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
