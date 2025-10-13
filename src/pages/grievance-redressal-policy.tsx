'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowLeft, Shield, Users, FileText, Phone, Mail, MapPin, Lock, Eye, UserCheck, Scale, Copyright, BadgeCheck, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import { trackEvent, trackButtonClick } from '@/utils/analytics';

export default function GrievanceRedressalPolicy() {
  return (
    <>
      <Head>
        <title>Grievance Redressal Policy - Samridhya | Complaint Resolution</title>
        <meta name="description" content="Read Samridhya's grievance redressal policy to understand our complaint resolution process. Learn how to raise and track complaints effectively." />
        <meta name="keywords" content="grievance redressal policy, complaint resolution, customer support, samridhya complaints, digital lending complaints, RBI ombudsman" />
        <meta name="author" content="Samridhya" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Grievance Redressal Policy - Samridhya | Complaint Resolution" />
        <meta property="og:description" content="Read Samridhya's grievance redressal policy to understand our complaint resolution process." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/grievance-redressal-policy/" />
        <meta property="og:image" content="https://samridhya.com/samridhya-preview.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Samridhya Grievance Redressal Policy - Complaint Resolution" />
        <meta property="og:site_name" content="Samridhya" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Grievance Redressal Policy - Samridhya | Complaint Resolution" />
        <meta name="twitter:description" content="Read Samridhya's grievance redressal policy to understand our complaint resolution process." />
        <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.webp" />
        <meta name="twitter:image:alt" content="Samridhya Grievance Redressal Policy - Complaint Resolution" />
        <meta name="twitter:site" content="@samridhya" />
        <meta name="twitter:creator" content="@samridhya" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://samridhya.com/grievance-redressal-policy/" />
        
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
              "name": "Grievance Redressal Policy",
              "description": "Samridhya's grievance redressal policy explaining complaint resolution process",
              "url": "https://samridhya.com/grievance-redressal-policy/",
              "mainEntity": {
                "@type": "Organization",
                "name": "Samridhya",
                "description": "Digital lending platform with comprehensive grievance redressal"
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
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Grievance Redressal Policy
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transparent and efficient complaint resolution process. We're committed to addressing 
              your concerns promptly and ensuring your satisfaction with our services.
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
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">48 Hours Response</h3>
                <p className="text-gray-600 text-xs">Quick initial response</p>
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
                <h3 className="text-gray-900 font-semibold mb-2">RBI Compliant</h3>
                <p className="text-gray-600 text-xs">Regulatory compliance</p>
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
                <h3 className="text-gray-900 font-semibold mb-2">Multi-Channel</h3>
                <p className="text-gray-600 text-xs">Email, phone & postal</p>
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
                  Samridhya Innovations Private Limited ("Samridhya," "we," "us," or "our") is committed to providing a transparent and efficient grievance redressal mechanism for our users. This policy outlines the process for raising and resolving complaints related to our services, including digital lending, data privacy, and platform usage.
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <AlertCircle className="text-blue-500" size={24} />
                  1. Scope of Grievance Redressal
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  This policy covers complaints regarding:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Loan application or servicing issues</li>
                  <li>Data privacy concerns</li>
                  <li>Unauthorized transactions</li>
                  <li>Misleading information or mis-selling</li>
                  <li>Technical glitches on the platform</li>
                  <li>Violation of terms or policies</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <MessageSquare className="text-blue-500" size={24} />
                  2. How to Lodge a Grievance
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  You can raise a complaint through any of the following channels:
                </p>
                
                {/* Email Channel */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 space-y-3 border border-blue-100 mb-6">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                    <Mail className="text-blue-500" size={20} />
                    A. Email
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    Send an email to: <strong>support@samridhya.com</strong>
                  </p>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    Subject: <strong>"Grievance – [Brief Description]"</strong>
                  </p>
                  <p className="text-gray-700 text-xs sm:text-sm mb-3">
                    Include:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-xs sm:text-sm">
                    <li>Your registered mobile number/email</li>
                    <li>Detailed description of the issue</li>
                    <li>Relevant transaction IDs/screenshots (if applicable)</li>
                  </ul>
                </div>

                {/* Phone Channel */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 space-y-3 border border-green-100 mb-6">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                    <Phone className="text-green-500" size={20} />
                    B. Phone
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    Call our Customer Support Helpline:
                  </p>
                  <p className="text-gray-700 text-xs sm:text-sm font-semibold">
                    📞 +91 6366234524 (Mon-Sat, 9:30 AM – 6:30 PM IST)
                  </p>
                </div>

                {/* Postal Mail Channel */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 space-y-3 border border-purple-100">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                    <MapPin className="text-purple-500" size={20} />
                    C. Postal Mail
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    Address your complaint to:
                  </p>
                  <div className="text-gray-700 text-xs sm:text-sm">
                    <p className="font-semibold">Nodal Grievance Officer</p>
                    <p>Samridhya Innovations Private Limited</p>
                    <p>#1207/343 & 1207/1/343/1, 9th Main, 7th Sector,</p>
                    <p>HSR Layout, Bangalore, Karnataka – 560102</p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Clock className="text-blue-500" size={24} />
                  3. Escalation Process
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                    <thead className="bg-gradient-to-r from-blue-600 to-cyan-600">
                      <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-white">Level</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-white">Step</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-white">Timeline</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">1</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer Support (Email/Call)</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">48 hours</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">2</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Nodal Grievance Officer</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">7 working days</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">3</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">RBI Ombudsman (if unresolved)</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">As per RBI guidelines</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-gray-700 leading-relaxed mt-4 text-xs sm:text-sm">
                  If your complaint is not resolved within 30 days, you may escalate it to:
                </p>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-100 mt-4">
                  <p className="text-gray-700 text-xs sm:text-sm font-semibold">
                    📌 RBI Integrated Ombudsman Scheme
                  </p>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    🌐 <a href="https://cms.rbi.org.in" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://cms.rbi.org.in</a>
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Clock className="text-blue-500" size={24} />
                  4. Expected Resolution Time
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li><strong>First Response:</strong> Within 48 hours of complaint receipt.</li>
                  <li><strong>Final Resolution:</strong> Within 30 days (for non-complex issues).</li>
                  <li><strong>Complex Cases:</strong> May require additional time (you will be informed).</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Lock className="text-blue-500" size={24} />
                  5. Data Privacy & Confidentiality
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>All grievances are handled confidentially.</li>
                  <li>Personal data is processed as per our Privacy Policy.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Users className="text-blue-500" size={24} />
                  6. Contact Details of Grievance Officers
                </h2>
                
                {/* Nodal Grievance Officer */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 space-y-3 border border-blue-100 mb-6">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">A. Nodal Grievance Officer (Digital Lending Complaints)</h3>
                  <div className="flex items-start gap-3">
                    <Users className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Name: Mr. Amit Sharma</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">📧 Email: support@samridhya.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">📞 Phone: +91 6366234524</p>
                    </div>
                  </div>
                </div>

                {/* Data Grievance Officer */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 space-y-3 border border-purple-100">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">B. Data Grievance Officer (Privacy-Related Complaints)</h3>
                  <div className="flex items-start gap-3">
                    <Users className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Name: Mr. Abhinav Srivastava (CTO)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">📧 Email: support@samridhya.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">📞 Phone: +91 6366234520</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <MessageSquare className="text-blue-500" size={24} />
                  7. Feedback & Appeals
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  If you are dissatisfied with the resolution:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>You may request a re-examination within 7 days.</li>
                  <li>Escalate to regulatory bodies (RBI, NPCI, etc.) if needed.</li>
                </ul>
              </section>

              {/* Important Notes */}
              <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-100">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <AlertCircle className="text-orange-500" size={24} />
                  🔹 Important Notes
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>✔ Keep a reference number for tracking complaints.</li>
                  <li>✔ Provide accurate details for faster resolution.</li>
                  <li>✔ RBI mandates lenders to resolve grievances within 30 days.</li>
                </ul>
              </section>

              {/* Final Statement */}
              <section className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-6 mt-8 text-white">
                <p className="leading-relaxed text-sm sm:text-base">
                  By using Samridhya's services, you agree to abide by this Grievance Redressal Policy.
                </p>
                <p className="leading-relaxed mt-4 text-sm sm:text-base">
                  For further assistance, visit <a href="https://www.samridhya.com/help" className="underline hover:no-underline">www.samridhya.com/help</a>
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