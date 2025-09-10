'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowLeft, Shield, Users, FileText, Phone, Mail, MapPin, Lock, Eye, UserCheck, Scale, Copyright, BadgeCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import { trackEvent, trackButtonClick } from '@/utils/analytics';

export default function IntellectualPropertyPolicy() {
  return (
    <>
      <Head>
        <title>Intellectual Property Policy - Samridhya | IP Rights & Protection</title>
        <meta name="description" content="Read Samridhya's intellectual property policy to understand our IP rights, permitted use, and protection measures. Learn about trademarks, copyrights, and proprietary technology." />
        <meta name="keywords" content="intellectual property policy, IP rights, trademarks, copyrights, samridhya IP, proprietary technology, brand protection" />
        <meta name="author" content="Samridhya" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Intellectual Property Policy - Samridhya | IP Rights & Protection" />
        <meta property="og:description" content="Read Samridhya's intellectual property policy to understand our IP rights, permitted use, and protection measures." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/intellectual-property-policy/" />
        <meta property="og:image" content="https://samridhya.com/samridhya-preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Samridhya Intellectual Property Policy - IP Protection" />
        <meta property="og:site_name" content="Samridhya" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Intellectual Property Policy - Samridhya | IP Rights & Protection" />
        <meta name="twitter:description" content="Read Samridhya's intellectual property policy to understand our IP rights and protection measures." />
        <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.png" />
        <meta name="twitter:image:alt" content="Samridhya Intellectual Property Policy - IP Protection" />
        <meta name="twitter:site" content="@samridhya" />
        <meta name="twitter:creator" content="@samridhya" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://samridhya.com/intellectual-property-policy/" />
        
        {/* Mobile Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Samridhya" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Intellectual Property Policy",
              "description": "Samridhya's intellectual property policy explaining IP rights and protection",
              "url": "https://samridhya.com/intellectual-property-policy/",
              "mainEntity": {
                "@type": "Organization",
                "name": "Samridhya",
                "description": "Digital lending platform with comprehensive IP protection"
              }
            })
          }}
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
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
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Copyright className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Intellectual Property Policy
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Protecting our intellectual property rights and ensuring proper use of Samridhya's 
              trademarks, content, and proprietary technology.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                   <BadgeCheck className="w-6 h-6 text-blue-600" />
                 </div>
                <h3 className="text-gray-900 font-semibold mb-2">Trademark Protected</h3>
                <p className="text-gray-600 text-xs">Brand & logo protection</p>
              </motion.div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">IP Protected</h3>
                <p className="text-gray-600 text-xs">Content & technology</p>
              </motion.div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">Legal Compliance</h3>
                <p className="text-gray-600 text-xs">Indian & international laws</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Content */}
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 space-y-8">
              
              {/* Introduction */}
              <section>
                <p className="text-gray-700 leading-relaxed mb-6 text-xs sm:text-sm">
                  <strong>Last Updated: August 12, 2025</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-xs sm:text-sm">
                  This Intellectual Property Policy ("IP Policy") governs the ownership, use, and protection of intellectual property rights related to Samridhya Innovations Private Limited ("Samridhya," "we," "us," or "our"), including but not limited to our website (www.samridhya.com), mobile application ("App"), trademarks, logos, content, and proprietary technology (collectively, "Samridhya IP").
                </p>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  By accessing or using our services, you agree to comply with this IP Policy.
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Copyright className="text-blue-500" size={24} />
                  1. Ownership of Intellectual Property
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  All intellectual property rights in and to Samridhya's Services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Trademarks, logos, and brand names (e.g., "Samridhya," the Samridhya logo).</li>
                  <li>Website & App content (text, graphics, UI/UX design, software code).</li>
                  <li>Proprietary algorithms, business processes, and financial models.</li>
                  <li>Marketing materials, whitepapers, and research reports.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4 text-xs sm:text-sm">
                  are the exclusive property of Samridhya Innovations Private Limited or its licensors and are protected under applicable Indian and international intellectual property laws.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Eye className="text-blue-500" size={24} />
                  2. Permitted Use
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  You may use Samridhya's Services for personal, non-commercial purposes in compliance with these Terms. You are granted a limited, revocable, non-exclusive, non-transferable license to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Access and use the website and App for legitimate financial services.</li>
                  <li>Download or print content for personal reference (subject to copyright notices).</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Shield className="text-blue-500" size={24} />
                  3. Prohibited Use
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  You must not, under any circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Copy, modify, distribute, sell, or create derivative works from Samridhya IP without prior written consent.</li>
                  <li>Reverse-engineer, decompile, or extract source code from our software.</li>
                  <li>Use Samridhya's trademarks, logos, or branding without permission.</li>
                  <li>Scrape, crawl, or use automated tools to collect data from our platform.</li>
                  <li>Claim ownership or falsely represent affiliation with Samridhya.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Users className="text-blue-500" size={24} />
                  4. User-Generated Content
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  If you submit any content (e.g., reviews, feedback, or suggestions) to Samridhya:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>You retain ownership but grant Samridhya a worldwide, royalty-free, perpetual license to use, modify, and display such content.</li>
                  <li>You confirm that you have the legal rights to share the content and that it does not infringe any third-party IP.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <FileText className="text-blue-500" size={24} />
                  5. Third-Party Intellectual Property
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  Samridhya respects third-party IP rights. If you believe our Services infringe your rights, please notify us in writing at support@samridhya.com with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>A description of the infringing material.</li>
                  <li>Proof of ownership (e.g., copyright/trademark registration).</li>
                  <li>Your contact details.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4 text-xs sm:text-sm">
                  We will investigate and take appropriate action, including removal of infringing content if necessary.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Lock className="text-blue-500" size={24} />
                  6. Consequences of Violation
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  Violations of this IP Policy may result in:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Immediate termination of access to Samridhya's Services.</li>
                  <li>Legal action, including monetary damages and injunctive relief.</li>
                  <li>Reporting to law enforcement or regulatory authorities where applicable.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">7. Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  Samridhya reserves the right to update this IP Policy at any time. The "Last Updated" date will reflect revisions. Continued use of our Services constitutes acceptance of changes.
                </p>
              </section>

              {/* Section 8 - Contact Information */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">8. Contact for IP-Related Issues</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-xs sm:text-sm">
                  For intellectual property concerns, including takedown requests, licensing inquiries, or infringement claims, contact:
                </p>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 space-y-3 border border-purple-100">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Data Grievance Officer</h3>
                  <div className="flex items-start gap-3">
                    <Users className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Mr. Abhinav Srivastava (CTO)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Email: support@samridhya.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Phone: +91 6366234520</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Address:</p>
                      <p className="text-gray-700">
                        #1207/343 & 1207/1/343/1, 9th Main, 7th Sector, HSR Layout, Bangalore, Karnataka – 560102
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Final Statement */}
              <section className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-6 mt-8 text-white">
                <p className="leading-relaxed text-sm sm:text-base">
                  By using Samridhya's Services, you acknowledge that you have read, understood, and agreed to this Intellectual Property Policy.
                </p>
                <p className="leading-relaxed mt-4 text-sm sm:text-base font-semibold">
                  © 2025 Samridhya Innovations Private Limited. All Rights Reserved.
                </p>
              </section>

              {/* Last Updated */}
              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-gray-500 text-xs">
                  Last updated: August 12, 2025
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <CTA />
    </div>
    </>
  );
} 