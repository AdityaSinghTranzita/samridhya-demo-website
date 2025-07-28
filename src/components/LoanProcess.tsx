'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

function Chevron({ open, color }) {
  return (
    <motion.svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      className="inline ml-2 drop-shadow"
    >
      <motion.path
        d="M8 10l4 4 4-4"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          stroke: open ? color : '#a3a3a3',
        }}
      />
    </motion.svg>
  );
}

export default function LoanProcess() {
  const [open, setOpen] = useState<'business' | 'personal' | null>(null);
  return (
    <section id="process" className="bg-white py-10 sm:py-16 relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-2 sm:px-4 md:px-6">
        <div className="mb-8 sm:mb-12 flex flex-col items-center w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#276ef4] to-purple-600 text-center mb-2 sm:mb-4">
            How to Apply
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#276ef4] to-purple-600 rounded-full mx-auto mb-4 sm:mb-6" />
        </div>
        <div className="flex flex-col gap-6">
          {/* Business Loan Accordion */}
          <motion.div
            className="rounded-2xl shadow-lg border border-blue-100/60 bg-gradient-to-br from-blue-50/80 to-white/90 backdrop-blur-sm"
            animate={open === 'business' ? { boxShadow: '0 8px 32px 0 rgba(39,110,244,0.10)', borderColor: '#2563eb' } : { boxShadow: '0 2px 8px 0 rgba(39,110,244,0.04)', borderColor: '#dbeafe' }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-semibold text-xs sm:text-base transition-all duration-200 focus:outline-none group ${open === 'business' ? 'bg-gradient-to-r from-blue-100/80 to-blue-50/80' : 'bg-white/80 hover:bg-blue-50/60'}`}
              onClick={() => setOpen(open === 'business' ? null : 'business')}
              aria-expanded={open === 'business'}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`text-blue-700 font-semibold text-xs sm:text-base transition-colors duration-200 ${open === 'business' ? 'drop-shadow' : ''}`}>Business Loan Process</span>
              <Chevron open={open === 'business'} color="#2563eb" />
            </motion.button>
            <AnimatePresence initial={false}>
              {open === 'business' && (
                <motion.div
                  key="business"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { height: 'auto', opacity: 1 },
                    collapsed: { height: 0, opacity: 0 }
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden px-6 pb-5"
                >
                  <ol className="relative border-l-2 border-blue-600 pl-4 sm:pl-6 py-3">
                    {businessSteps.map((step, index) => (
                      <motion.li
                        key={index}
                        className="mb-4 last:mb-0 flex items-center gap-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.07 }}
                      >
                        <span className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center font-bold shadow text-sm">
                          {index + 1}
                        </span>
                        <span className="text-gray-800 leading-snug text-xs font-medium">{step}</span>
                      </motion.li>
                    ))}
                    {/* Animated line */}
                    <motion.div
                      className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-blue-400 to-blue-700 rounded-full"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.7 }}
                      style={{ transformOrigin: 'top' }}
                    />
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Personal Loan Accordion */}
          <motion.div
            className="rounded-2xl shadow-lg border border-purple-100/60 bg-gradient-to-br from-purple-50/80 to-white/90 backdrop-blur-sm"
            animate={open === 'personal' ? { boxShadow: '0 8px 32px 0 rgba(168,85,247,0.10)', borderColor: '#9333ea' } : { boxShadow: '0 2px 8px 0 rgba(168,85,247,0.04)', borderColor: '#ede9fe' }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-semibold text-xs sm:text-base transition-all duration-200 focus:outline-none group ${open === 'personal' ? 'bg-gradient-to-r from-purple-100/80 to-purple-50/80' : 'bg-white/80 hover:bg-purple-50/60'}`}
              onClick={() => setOpen(open === 'personal' ? null : 'personal')}
              aria-expanded={open === 'personal'}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`text-purple-700 font-semibold text-xs sm:text-base transition-colors duration-200 ${open === 'personal' ? 'drop-shadow' : ''}`}>Personal Loan Process</span>
              <Chevron open={open === 'personal'} color="#9333ea" />
            </motion.button>
            <AnimatePresence initial={false}>
              {open === 'personal' && (
                <motion.div
                  key="personal"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { height: 'auto', opacity: 1 },
                    collapsed: { height: 0, opacity: 0 }
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden px-6 pb-5"
                >
                  <ol className="relative border-l-2 border-purple-600 pl-4 sm:pl-6 py-3">
                    {personalSteps.map((step, index) => (
                      <motion.li
                        key={index}
                        className="mb-4 last:mb-0 flex items-center gap-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.07 }}
                      >
                        <span className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 text-white flex items-center justify-center font-bold shadow text-sm">
                          {index + 1}
                        </span>
                        <span className="text-gray-800 leading-snug text-xs font-medium">{step}</span>
                      </motion.li>
                    ))}
                    {/* Animated line */}
                    <motion.div
                      className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-purple-400 to-purple-700 rounded-full"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.7 }}
                      style={{ transformOrigin: 'top' }}
                    />
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      {/* Optional background shape */}
      <div className="hidden md:block absolute -bottom-20 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-blue-50 rounded-[100px] -z-10 blur-2xl opacity-30" />
    </section>
  );
}

