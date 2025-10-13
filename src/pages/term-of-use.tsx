'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowLeft, Shield, Users, FileText, Phone, Mail, MapPin, Lock, Eye, UserCheck, Scale } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import { trackEvent, trackButtonClick } from '@/utils/analytics';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - Samridhya | Legal Terms & Conditions</title>
        <meta name="description" content="Read Samridhya's terms of service to understand the legal terms and conditions governing your use of our platform. Learn about your rights and obligations." />
        <meta name="keywords" content="terms of service, terms and conditions, legal terms, samridhya terms, loan terms, financial terms" />
        <meta name="author" content="Samridhya" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Terms of Service - Samridhya | Legal Terms & Conditions" />
        <meta property="og:description" content="Read Samridhya's terms of service to understand the legal terms and conditions governing your use of our platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/term-of-use/" />
        <meta property="og:image" content="https://samridhya.com/samridhya-preview.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Samridhya Terms of Service - Legal Terms" />
        <meta property="og:site_name" content="Samridhya" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service - Samridhya | Legal Terms & Conditions" />
        <meta name="twitter:description" content="Read Samridhya's terms of service to understand the legal terms and conditions." />
        <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.webp" />
        <meta name="twitter:image:alt" content="Samridhya Terms of Service - Legal Terms" />
        <meta name="twitter:site" content="@samridhya" />
        <meta name="twitter:creator" content="@samridhya" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://samridhya.com/term-of-use/" />
        
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
              "name": "Terms of Service",
              "description": "Samridhya's terms of service explaining the legal terms and conditions",
              "url": "https://samridhya.com/term-of-use/",
              "mainEntity": {
                "@type": "Organization",
                "name": "Samridhya",
                "description": "Digital lending platform with clear terms and conditions"
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
                <Scale className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Terms of Service
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Clear and transparent terms governing your use of Samridhya's platform. 
              Understand your rights and obligations when using our services.
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
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">RBI Compliant</h3>
                <p className="text-gray-600 text-xs">Regulated & secure</p>
              </motion.div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">Transparent</h3>
                <p className="text-gray-600 text-xs">Clear terms & conditions</p>
              </motion.div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">User Friendly</h3>
                <p className="text-gray-600 text-xs">Easy to understand</p>
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
                  Welcome to Samridhya Innovations Private Limited ("Samridhya," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website (www.samridhya.com), mobile application ("App"), and related services (collectively, the "Services"). By accessing or using our Services, you agree to comply with and be bound by these Terms. If you do not agree, please refrain from using our Services.
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Users className="text-blue-500" size={24} />
                  1. Eligibility
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>You must be at least 18 years old and legally capable of entering into a binding contract to use our Services.</li>
                  <li>By using our Services, you confirm that all information provided is accurate and complete.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Lock className="text-blue-500" size={24} />
                  2. Account Registration & Security
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>You may need to register an account to access certain features.</li>
                  <li>You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</li>
                  <li>Notify us immediately at support@samridhya.com if you suspect unauthorized access.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Shield className="text-blue-500" size={24} />
                  3. Use of Services
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  Our Services facilitate access to financial products (e.g., personal loans) through our ONDC network partners (banks/NBFCs).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  You agree to use the Services only for lawful purposes and in compliance with all applicable laws and regulations.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  <strong>You must not:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Engage in fraud, misrepresentation, or illegal activities.</li>
                  <li>Reverse-engineer, hack, or disrupt our Services.</li>
                  <li>Use bots, scrapers, or automated tools to extract data.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <FileText className="text-blue-500" size={24} />
                  4. Loan Services & Third-Party Partners
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Samridhya acts as an intermediary between you and lending partners (e.g., banks/NBFCs).</li>
                  <li>Loan approvals, terms, interest rates, and repayments are solely determined by the lending partners, not Samridhya.</li>
                  <li>We do not guarantee loan approval or specific terms.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Eye className="text-blue-500" size={24} />
                  5. Privacy & Data Protection
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Your use of our Services is subject to our Privacy Policy, which explains how we collect, use, and protect your data.</li>
                  <li>By using our Services, you consent to our data practices, including sharing necessary information with lending partners for loan processing.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">6. Fees & Charges</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Samridhya does not charge users for accessing the platform.</li>
                  <li>Lending partners may impose fees, interest, or charges as per their loan agreements.</li>
                  <li>Always review loan terms before accepting any offer.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>All content, trademarks, logos, and software on our platform are owned by Samridhya or its licensors.</li>
                  <li>You may not reproduce, modify, or distribute any content without our prior written permission.</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">8. Termination & Suspension</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>We reserve the right to suspend or terminate your access to our Services at any time, with or without cause.</li>
                  <li>You may stop using our Services at any time by deleting your account.</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">9. Disclaimers & Limitation of Liability</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Our Services are provided "as is" without warranties of any kind.</li>
                  <li>Samridhya does not guarantee uninterrupted, error-free, or secure Services.</li>
                  <li>We shall not be liable for any indirect, incidental, or consequential damages arising from your use of our Services.</li>
                </ul>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">10. Governing Law & Dispute Resolution</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>These Terms shall be governed by the laws of India.</li>
                  <li>Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.</li>
                </ul>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>We may update these Terms periodically. The "Last Updated" date will reflect changes.</li>
                  <li>Continued use of our Services after changes constitutes acceptance.</li>
                </ul>
              </section>

              {/* Section 12 - Contact Information */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">12. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-xs sm:text-sm">
                  For questions or grievances, contact:
                </p>
                
                {/* Nodal Grievance Officer */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 space-y-3 border border-blue-100 mb-6">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Nodal Grievance Officer:</h3>
                  <div className="flex items-start gap-3">
                    <Users className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Mr. Amit Sharma</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Email: support@samridhya.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Phone: +91 6366234524</p>
                      <p className="text-gray-700 text-xs">(Mon-Sat, 9:30 AM - 6:30 PM)</p>
                    </div>
                  </div>
                </div>

                {/* Data Grievance Officer */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 space-y-3 border border-purple-100 mb-6">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Data Grievance Officer:</h3>
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
                </div>

                {/* Address */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 space-y-3 border border-green-100">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Address:</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-gray-700">
                        #1207/343 & 1207/1/343/1, 9th Main, 7th Sector, HSR Layout, Bangalore, Karnataka - 560102
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Final Statement */}
              <section className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-6 mt-8 text-white">
                <p className="leading-relaxed text-sm sm:text-base">
                  By using Samridhya's Services, you acknowledge that you have read, understood, and agreed to these Terms of Service.
                </p>
                <p className="leading-relaxed mt-4 text-sm sm:text-base font-semibold">
                  Thank you for choosing Samridhya! 🚀
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