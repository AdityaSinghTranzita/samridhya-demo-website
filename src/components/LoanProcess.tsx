'use client';

import { motion } from 'framer-motion';

const businessSteps = [
  'Login using your mobile number',
  'Provide your GST and Invoice details',
  'Provide consent for accessing your bank details',
  'Choose from the multiple offers for eligible invoices',
  'KYC using Aadhar / Uddyam',
  'Bank details for disbursement & repayment',
  'Digitally sign the Loan Agreement',
  'Get money in your account within 24 hours',
];

const personalSteps = [
  'Login using your mobile number',
  'Fill in your personal and employment details',
  'Upload KYC documents (Aadhar, PAN, etc.)',
  'Select loan amount and tenure',
  'Get instant eligibility check',
  'Digitally sign the Loan Agreement',
  'Get money in your account within minutes',
];

export default function LoanProcess() {
  return (
    <section id="process" className="bg-white py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-2 md:px-10">
        <div className="mb-12 flex flex-col items-center w-full">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#276ef4]/10 to-purple-500/10 text-[#276ef4] px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-[#276ef4]/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Application Process
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#276ef4] to-purple-600 text-center mb-6">
            How to Apply
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#276ef4] to-purple-600 rounded-full mx-auto mb-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start justify-center">
          {/* Business Loan Process */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-blue-100 text-blue-700 font-medium px-4 py-1 rounded-full mb-4 text-sm">
              BUSINESS LOAN
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Business Loan Process</h3>
            <ol className="relative border-l-2 border-blue-600 pl-4 md:pl-8">
              {businessSteps.map((step, index) => (
                <motion.li
                  key={index}
                  className="mb-6 last:mb-0 flex items-center gap-3 md:gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="w-8 h-8 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-lg">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{step}</span>
                </motion.li>
              ))}
              {/* Animated line */}
              <motion.div
                className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-blue-400 to-blue-700 rounded-full"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1 }}
                style={{ transformOrigin: 'top' }}
                viewport={{ once: true }}
              />
            </ol>
          </motion.div>

          {/* Personal Loan Process */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-purple-100 text-purple-700 font-medium px-4 py-1 rounded-full mb-4 text-sm">
              PERSONAL LOAN
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Personal Loan Process</h3>
            <ol className="relative border-l-2 border-purple-600 pl-4 md:pl-8">
              {personalSteps.map((step, index) => (
                <motion.li
                  key={index}
                  className="mb-6 last:mb-0 flex items-center gap-3 md:gap-4"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="w-8 h-8 flex-shrink-0 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold shadow-lg">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{step}</span>
                </motion.li>
              ))}
              {/* Animated line */}
              <motion.div
                className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-purple-400 to-purple-700 rounded-full"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1 }}
                style={{ transformOrigin: 'top' }}
                viewport={{ once: true }}
              />
            </ol>
          </motion.div>
        </div>
      </div>
      {/* Optional background shape */}
      <div className="hidden md:block absolute -bottom-20 right-0 w-[300px] h-[300px] bg-blue-50 rounded-[100px] -z-10 blur-2xl opacity-30" />
    </section>
  );
}

