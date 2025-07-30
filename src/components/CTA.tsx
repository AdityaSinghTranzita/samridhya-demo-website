'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
} from 'react-icons/fa6';
import { MdPhone, MdQuestionAnswer, MdWork, MdOutlineAppShortcut, MdEmail, MdLocationOn } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { Download, ArrowRight, Shield, Users, TrendingUp } from 'lucide-react';
import { handleAppDownload } from '@/utils/appStore';

export default function Footer() {
  return (
      <footer className="relative overflow-hidden">
        {/* Top CTA Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-cyan-900 to-indigo-900 py-8 sm:py-20">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">
                Ready to Start Your
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Financial Journey?
              </span>
              </h2>

              <p className="text-xs sm:text-sm text-gray-200 mb-6">
                Join thousands of satisfied customers who have transformed their financial future with Samridhya.
                Get started in minutes with our seamless digital process.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
                <motion.button
                    onClick={handleAppDownload}
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  Download App
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
                <motion.div
                    className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/25 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-base">RBI Compliant</h3>
                  <p className="text-white/90 text-xs sm:text-sm">100% secure & regulated</p>
                </motion.div>

                <motion.div
                    className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/25 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-base">1K+ Customers</h3>
                  <p className="text-white/90 text-xs sm:text-sm">Trusted by thousands</p>
                </motion.div>

                <motion.div
                    className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/25 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-base">₹50Lakh+ Loans</h3>
                  <p className="text-white/90 text-xs sm:text-sm">Loans disbursed</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Footer */}
        <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
              {/* Company Info - Full width on mobile, half on tablet, quarter on desktop */}
              <div className="col-span-2 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <Image
                      src="https://framerusercontent.com/images/eoFn6ZAhFTjiRuWZQ7B34zClMM.png?scale-down-to=512"
                      alt="Samridhya Logo"
                      width={120}
                      height={31}
                      className="w-40 h-4 sm:w-32 sm:h-6 brightness-0 invert"
                      priority
                      unoptimized
                  />
                </div>
                <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  Your trusted partner for seamless digital lending. Making financial dreams accessible to every Indian.
                </p>
                <div className="flex gap-4">
                  <Link href="https://www.facebook.com/SamridhyaInnovations" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                    <FaFacebookF size={16} />
                  </Link>
                  <Link href="https://www.linkedin.com/company/samridhya/" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                    <FaLinkedinIn size={16} />
                  </Link>
                  <Link href="https://x.com/ComSamridh42501" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                    <FaXTwitter size={16} />
                  </Link>
                  <Link href="https://www.instagram.com/samridhya_innovations/" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                    <FaInstagram size={16} />
                  </Link>
                </div>
              </div>

              {/* Quick Links - Half width on mobile and tablet, quarter on desktop */}
              <div className="col-span-1 sm:col-span-1">
                <h4 className="text-white font-semibold text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 relative">
                  Quick Links
                  <div className="absolute bottom-0 left-0 w-8 md:w-12 lg:w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                </h4>
                <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 sm:gap-3 group text-sm md:text-base lg:text-base">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    About Us
                  </Link></li>
                  <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 sm:gap-3 group text-sm md:text-base lg:text-base">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    Blog & News
                  </Link></li>
                  <li><Link href="#faqs" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 sm:gap-3 group text-sm md:text-base lg:text-base">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    FAQs
                  </Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 sm:gap-3 group text-sm md:text-base lg:text-base">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    Contact Us
                  </Link></li>
                </ul>
              </div>

              {/* Services - Half width on mobile and tablet, quarter on desktop */}
              <div className="col-span-1 sm:col-span-1">
                <h4 className="text-white font-semibold text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 relative">
                  Our Services
                  <div className="absolute bottom-0 left-0 w-8 md:w-12 lg:w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                </h4>
                <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <li><Link href="/loans/personal-loan" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 sm:gap-3 group text-sm md:text-base lg:text-base">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    Personal Loan
                  </Link></li>
                  <li><Link href="/loans/business-loan" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 sm:gap-3 group text-sm md:text-base lg:text-base">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    Business Loan
                  </Link></li>
                  <li><Link href="/loans/education-loan" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 sm:gap-3 group text-sm md:text-base lg:text-base">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    Education Loan
                  </Link></li>
                  <li><Link href="/loans/wedding-loan" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 sm:gap-3 group text-sm md:text-base lg:text-base">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    Wedding Loan
                  </Link></li>
                </ul>
              </div>

              {/* Contact Info - Full width on mobile, half on tablet, quarter on desktop */}
              <div className="col-span-2 sm:col-span-2 lg:col-span-1">
                <h4 className="text-white font-semibold text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 relative">
                  Contact Info
                  <div className="absolute bottom-0 left-0 w-8 md:w-12 lg:w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                </h4>
                <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <MdPhone className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-white font-medium text-sm md:text-base lg:text-base">+91 6366234524</p>
                      <p className="text-gray-400 text-xs md:text-sm">24/7 Support</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <MdEmail className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-white font-medium text-sm md:text-base lg:text-base">support@samridhya.com</p>
                      <p className="text-gray-400 text-xs md:text-sm">Quick Response</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <MdLocationOn className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-white font-medium text-sm md:text-base lg:text-base">No.1207/343 & 1207/1/343/1, Sierra Cartel, 9th Main,7th Sector, HSR Layout, Bengaluru Urban, Karnataka, 560102</p>
                      <p className="text-gray-400 text-xs md:text-sm">Head Office</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* App Downloads */}
            <div className="mt-16 lg:mt-20 pt-12 lg:pt-16 border-t border-gray-700">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                <div>
                  <h4 className="text-white font-semibold text-lg lg:text-xl mb-6">Download Our App</h4>
                  <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                    <motion.button
                        onClick={() => window.open('https://play.google.com/store/apps/details?id=samridh.consumer', '_blank')}
                        className="transition-transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      <Image
                          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                          alt="Google Play"
                          width={140}
                          height={42}
                          className="h-12 lg:h-14 w-[140px] lg:w-[160px] object-contain"
                          unoptimized
                      />
                    </motion.button>
                    <motion.button
                        onClick={() => window.open('https://apps.apple.com/in/app/samridhya/id6745554387', '_blank')}
                        className="transition-transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      <Image
                          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                          alt="App Store"
                          width={140}
                          height={42}
                          className="h-12 lg:h-14 w-[140px] lg:w-[160px] object-contain"
                          unoptimized
                      />
                    </motion.button>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <p className="text-gray-400 mb-3 text-sm lg:text-base">ONDC Registered & RBI Compliant</p>
                  <div className="flex items-center justify-center lg:justify-end gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm lg:text-base font-medium">Verified & Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="border-t border-gray-700 py-8 lg:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-8">
                <p className="text-gray-400 text-sm lg:text-base">
                  © {new Date().getFullYear()} Samridhya. All rights reserved.
                </p>
                <div className="flex gap-6 lg:gap-8 text-sm lg:text-base">
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}