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
      <section className="relative bg-gradient-to-br from-blue-900 via-cyan-900 to-indigo-900 py-16 sm:py-20">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Financial Journey?
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join thousands of satisfied customers who have transformed their financial future with Samridhya. 
              Get started in minutes with our seamless digital process.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
              <motion.button
                onClick={handleAppDownload}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                Download App
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <motion.button
                onClick={handleAppDownload}
                className="group bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">RBI Compliant</h3>
                <p className="text-white/70 text-sm">100% secure & regulated</p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">50K+ Customers</h3>
                <p className="text-white/70 text-sm">Trusted by thousands</p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">₹500Cr+</h3>
                <p className="text-white/70 text-sm">Loans disbursed</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="https://framerusercontent.com/images/eoFn6ZAhFTjiRuWZQ7B34zClMM.png?scale-down-to=512"
                  alt="Samridhya Logo"
                  width={120}
                  height={31}
                  className="h-8 w-auto brightness-0 invert"
                  priority
                />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner for seamless digital lending. Making financial dreams accessible to every Indian.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                  <FaFacebookF size={16} />
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                  <FaLinkedinIn size={16} />
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                  <FaXTwitter size={16} />
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                  <FaInstagram size={16} />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  About Us
                </Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  Blog & News
                </Link></li>
                <li><Link href="#faqs" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  FAQs
                </Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  Contact Us
                </Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 relative">
                Our Services
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                <li><Link href="/loans/personal-loan" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  Personal Loan
                </Link></li>
                <li><Link href="/loans/business-loan" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  Business Loan
                </Link></li>
                <li><Link href="/loans/education-loan" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  Education Loan
                </Link></li>
                <li><Link href="/loans/wedding-loan" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  Wedding Loan
                </Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 relative">
                Contact Info
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MdPhone className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-white font-medium">1800-123-4567</p>
                    <p className="text-gray-400 text-sm">24/7 Support</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MdEmail className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-white font-medium">support@samridhya.com</p>
                    <p className="text-gray-400 text-sm">Quick Response</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MdLocationOn className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-white font-medium">Bangalore, Karnataka</p>
                    <p className="text-gray-400 text-sm">Head Office</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* App Downloads */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-semibold text-lg mb-4">Download Our App</h4>
                <div className="flex flex-col sm:flex-row gap-4">
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
                      className="h-12 w-[140px] object-contain"
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
                      className="h-12 w-[140px] object-contain"
                      unoptimized
                    />
                  </motion.button>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-gray-400 mb-2">ONDC Registered & RBI Compliant</p>
                <div className="flex items-center justify-center sm:justify-end gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Verified & Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-gray-700 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Samridhya. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
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
