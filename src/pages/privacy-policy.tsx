'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowLeft, Shield, Users, FileText, Phone, Mail, MapPin, Lock, Eye, UserCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import { trackEvent, trackButtonClick } from '@/utils/analytics';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Samridhya | Data Protection & Security</title>
        <meta name="description" content="Read Samridhya's privacy policy to understand how we protect your personal information. Learn about data collection, usage, security measures, and your rights." />
        <meta name="keywords" content="privacy policy, data protection, personal information, data security, samridhya privacy, loan privacy, financial privacy" />
        <meta name="author" content="Samridhya" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Privacy Policy - Samridhya | Data Protection & Security" />
        <meta property="og:description" content="Read Samridhya's privacy policy to understand how we protect your personal information. Learn about data collection, usage, and security measures." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/privacy-policy/" />
        <meta property="og:image" content="https://samridhya.com/samridhya-preview.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Samridhya Privacy Policy - Data Protection" />
        <meta property="og:site_name" content="Samridhya" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy - Samridhya | Data Protection & Security" />
        <meta name="twitter:description" content="Read Samridhya's privacy policy to understand how we protect your personal information." />
        <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.webp" />
        <meta name="twitter:image:alt" content="Samridhya Privacy Policy - Data Protection" />
        <meta name="twitter:site" content="@samridhya" />
        <meta name="twitter:creator" content="@samridhya" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://samridhya.com/privacy-policy/" />
        
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
              "name": "Privacy Policy",
              "description": "Samridhya's privacy policy explaining how we protect your personal information",
              "url": "https://samridhya.com/privacy-policy/",
              "mainEntity": {
                "@type": "Organization",
                "name": "Samridhya",
                "description": "Digital lending platform with strong privacy protection"
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
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Privacy Policy
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Your privacy is our priority. Learn how we protect and handle your personal information 
              with the highest standards of security and transparency.
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
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">RBI Compliant</h3>
                <p className="text-gray-600 text-xs">100% secure & regulated</p>
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
                <p className="text-gray-600 text-xs">Clear data practices</p>
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
                <h3 className="text-gray-900 font-semibold mb-2">User Control</h3>
                <p className="text-gray-600 text-xs">You own your data</p>
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
                  Samridhya Innovations Private Limited ("Samridhya"/"Company"/"Samridhya.com") including online website www.samridhya.com and "Mobile App" (Collectively "Application") recognizes the importance of maintaining your privacy. Samridhya is committed to maintain the confidentiality, integrity and security of all information of its users. This Privacy Policy describes how Samridhya collects, stores, handles and transfers certain information received from you via the use of the Application on a need basis. This Privacy Policy applies to the visitors to our Application and our existing and future customers. By visiting and/or using our Application, you are accepting and consenting to the practices described in this Privacy Policy.
                </p>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  By using or continuing to use the Application you agree to our use of your information (including sensitive personal information as defined under the Information Technology Act 2000, applicable rules, notification etc.) in accordance with this Privacy Policy, as may be amended from time to time by Samridhya at its sole discretion.
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Shield className="text-blue-500" size={24} />
                  1. Controllers of Personal Information
                </h2>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  Your Personal data/information will be collected and stored at servers located in India by Samridhya Innovations Private Limited. Our partners on the ONDC network may also collect certain information separately to facilitate the delivery of service and will be bound by the Privacy policy declared by the respective partner. Samridhya is not responsible for the data collected and managed by the partners on the ONDC network.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Users className="text-blue-500" size={24} />
                  2. What Personal Information we gather about you
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  The information we learn from customers helps us personalize and continually improve your experience at the Application. Here are the types of information we gather.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>We receive and store any information or document you enter or upload on our Application or give us in any other way, in line with the product or service opted by you and as required by us or our business partners, including your personal information like first name, last name, email address, date of birth, residence city etc. You can choose not to provide certain information but then you might not be able to take advantage of many of our services and features. We neither collect nor store your biometric information.</li>
                  <li>We may also have one time access to your camera, microphone, location and mobile device and store such information only for the purpose of onboarding or KYC requirements of us or our Partner with your explicit consent, in accordance with the Digital Lending guidelines issued by RBI and as amended from time to time.</li>
                  <li>We might receive information about you from other sources and add it to our account information.</li>
                </ul>
              </section>

              {/* Section 3 - App Permissions */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <FileText className="text-blue-500" size={24} />
                  3. App Permissions
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-xs sm:text-sm">
                  "Samridhya.com" application use below mentioned device level permissions as per lending process of NBFCs and bank on ONDC network.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                    <thead className="bg-gradient-to-r from-blue-600 to-cyan-600">
                      <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-white">Permission</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-white">Description</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-white">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Location</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Allows app to access your location</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer KYC by partner NBFCs and banks, Fraud Prevention</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Photos</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Allows app to access your photos and videos</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">UPI payments via QR code</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Camera</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Allows app to use your camera</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">UPI payments via QR code</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Microphone</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Grants access to your microphone</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Voice Search</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Notifications</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Allows app to send you notifications</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Transactional and promotional communication</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Files, Media and Storage</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Allows app to access your files</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Servicing customer requests for products, KYC by partner NBFCs and banks, allowing customers to download product documents</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">SMS</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Send and view SMS</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">OTP for Account Sign up, Phone verification, Aadhaar eKYC, Digital signature signing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">4. We Collect Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  We receive and store certain types of information whenever you interact with us. For example, like, we use "cookies" and we obtain certain types of information when your web browser accesses the Website or advertisements and other content served by or on behalf of the Website on other websites. A cookie is a piece of data stored on the user's computer tied to information about the user. We may use both session ID cookies and persistent cookies. For session ID cookies, once you close your browser or log out, the cookie terminates and is erased. A persistent cookie is a small text file stored on your computer's hard drive for an extended period of time. Session ID cookies may be used by Samridhya to track user preferences while the user is visiting the Application. They also help to minimize load times and save on server processing.
                </p>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  Most browsers will tell you how to prevent your browser from accepting new cookies, how to have the browser notify you when you receive a new cookie and how to disable cookies altogether. Additionally, you can disable or delete similar data used by browser add-ons, such as Flash cookies, by changing the add-ons settings or visiting the website of its manufacturer.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">5. How do We Use The Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  Samridhya collects your information when you register for an account, when you use its products or services, visit its Application. When you register with the Application, you are asked for your first name, last name, state and city of residence, email address, date of birth, and sex. Once you register at the Application and sign in you are not anonymous to us. Also, you are asked for your contact number during registration and may be sent SMS, notifications about our services to your wireless device.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  <strong>Purpose for collecting information:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>Assist us and / or our business partners in facilitating and delivering services to you, process payments and your applications, communicate with you about products, services and promotional offers.</li>
                  <li>Respond to queries, or requests submitted by you, and resolve your grievances/issues/problems with any services supplied to you.</li>
                  <li>Administer or otherwise carry out our obligations in relation to any agreement with our business partners.</li>
                  <li>Send you information about special promotions or offers. We might also tell you about new features or products/services.</li>
                  <li>Use your information for internal analysis and to provide you with location-based services, such as advertising, search results, and other personalized content.</li>
                  <li>Use this information to improve our platform, prevent or detect fraud or abuses of our Application and enable third parties to carry out technical, logistical or other functions on our behalf.</li>
                  <li>Send you notices, communications, and recommend services that might be of interest to you, update our records and generally maintain your accounts with us, display content and customer reviews.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">6. Disclosure to Third Parties</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  Samridhya will not sell or rent or otherwise disclose your information for commercial purposes to anyone in a way that is contrary to the commitments made and/or other than as set forth in this Privacy Policy. Notwithstanding the foregoing, we may share your information to third parties including our ONDC network Partner (Banks/NBFCs), CICs, and Service Providers we have a tie up with and any of our affiliates, for the purposes as set out in this Privacy Policy.
                </p>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  These third parties are required to handle your information using the same level of care and confidentiality as is followed by Samridhya and any accessing or processing of your information by these third parties is in accordance with contractual terms, applicable laws and our instructions and subject to your consent.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">7. Data Storage</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  Samridhya stores your personal information only at servers located in India. Information of our customers are retained for meeting the servicing requirements of our customers, except as mandated in our arrangements with our business partners to provide services to you, unless consent is withdrawn by you. Retention of information is done as per this policy in compliance with applicable law/regulatory requirements in India.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  <strong>Provisions in line with RBI's Digital Lending Guidelines:</strong>
                </p>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  Any information of our customers taken for the purpose of facilitating digital lending services are retained for a period of eight years for meeting the servicing requirements of our customers. This duration will be determined from the most recent instance of customer accessing Samridhya services. Please note that Samridhya may need to retain basic identification details to comply with applicable legal and compliance requirements.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">8. What Is Your Control Over Your Personal Information That's Collected And Used Online</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  It's important to note that the information we use about you helps us provide you with products, services and experiences that benefit you. You have the ability to control how your non-personal information is collected and used online.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  You also have the ability to choose what personal information, including what sensitive personal information (i.e. your financial information) you provide to us, restrict disclosure of your information to third parties, however, please note that this may affect your seamless access to such product/ service as opted by you.
                </p>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  We believe you should be able to choose what kinds of information you receive via email/SMS. If you do not want to receive marketing materials by email/SMS, just indicate your preference on the contact information for your account or the 'opt-out' or unsubscribe link provided in our marketing emails and you can also write to us at support@samridhya.com.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">9. Revocation of Consent and Deletion of Data</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  If you feel that we do not require the retention of your personal information or if you ask us to delete or remove your personal data where you think we do not have the right to process it, we shall destroy or delete such Customer information. You may, at any time while availing of our Services or otherwise, withdraw the consent given earlier to us to collect and use your sensitive personal data or information by writing to us at support@samridhya.com.
                </p>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  Post successful verification of your consent withdrawal request, the same shall be processed within a period of 45 days from the date of receipt of such request subject to successful verification. In some cases, if you may have taken Samridhya services we may not be in a position to delete your data. This is because as per the applicable law, we may be required to retain your data, for us/our partner banks/NBFCs to continue to provide services availed by you.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">10. Log Files</h2>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  Like most standard websites, we use log files. This information may include internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, platform type, date/time stamp, and number of clicks to analyze trends, administer the site, track user's movement in the aggregate, and gather broad demographic information for aggregate use. We may combine this automatically collected log information with other information we collect about you. We do this to improve the services we offer to you, to improve marketing, analytics or site functionality.
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">11. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  Samridhya ensures applicable compliance standards on information security and understands that the confidentiality, integrity, and availability of your information are vital to our business operations and our own success. We employ appropriate technical and organizational security measures at all times to protect the information we collect from you. We use multiple electronic, procedural, and physical security measures to protect against unauthorized or unlawful use or alteration of information, and against any accidental loss, destruction, or damage to information.
                </p>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. Therefore, we cannot guarantee its absolute security. Further, you are responsible for maintaining the confidentiality and security of your login id and OTP password, and may not provide these credentials to any third party.
                </p>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">12. Third-Party Advertisers and Links to Other Applications</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  <strong>Third Party Advertising:</strong> We may use third-party advertising companies and/or ad agencies to serve ads when you visit our Application. These companies may use information (excluding your name, address, email address, or telephone number) about your visits to this Application in order to provide advertisements on this Application and other third-party websites about goods and services that may be of interest to you.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  <strong>Links to Other Applications:</strong> There might be other sites/application relating to our Banking and Non Banking partners linked to Samridhya and other affiliates. Personal information that you provide to those sites is not our property or responsibility. These affiliated sites may have different privacy practices and we encourage you to read their privacy policies of these websites when you visit them.
                </p>
              </section>

              {/* Section 13 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">13. Changes in this Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  Samridhya reserves the right to change this policy from time to time, at its sole discretion. We may update this privacy policy to reflect changes to our information practices. We encourage you to periodically review. Checking the effective date below allows you to determine whether there have been changes since the last time you reviewed the statement.
                </p>
              </section>

              {/* Section 14 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">14. Lending partners for personal loans</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  Current list of lenders on ONDC network, as the network grow more partners will go live on the lending network.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-xs sm:text-sm">
                  <li>DMI Finance</li>
                  <li>Aditya Birla Capital</li>
                  <li>Fibe (Early Salary)</li>
                </ul>
              </section>

              {/* Section 15 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">15. Non Predatory Loans policy</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4 text-xs sm:text-sm">
                  <li>Minimum and maximum period for repayment: 3 Months to up-to 6 years</li>
                  <li>Maximum Annual Percentage Rate (APR): 25%</li>
                  <li>Representative example of the total cost of the loan, including the principal and all applicable fees (for example, sample monthly payment, sample interest calculation) as per RBI guidelines.</li>
                </ul>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                    <thead className="bg-gradient-to-r from-blue-600 to-cyan-600">
                      <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-white">Parameter</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-white">Details (Illustrative Computation)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Loan amount (in Rupees)</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">₹20,000</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Total interest charge (in Rupees)</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">₹3,274</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Other up-front charges (in Rupees)</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">₹400</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Net disbursed amount (in Rupees)</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">₹19,600</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Total amount to be paid (in Rupees)</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">₹23,674</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Annual Percentage Rate (APR)</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">17.07%</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Tenor of the Loan (months)</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">24</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Repayment frequency</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Monthly</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Number of installments</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">24</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Amount of each installment (in Rupees)</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">₹970</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 16 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">16. Nodal Grievance Officer</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  The Company has appointed a Nodal Grievance Officer to redress customer grievances relating to any digital lending-related complaints. The name and contact details of the Nodal Grievance Officer are provided below:
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 space-y-3 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Users className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Name: Mr. Amit Sharma</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Address:</p>
                      <p className="text-gray-700">#1207 /343 & 1207 /1/343/1, 9th MAIN, 7th SECTOR, HSR LAYOUT, BANGALORE, KARNATAKA - 560102</p>
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
                      <p className="font-semibold text-gray-900">Call at: +91 6366234524</p>
                      <p className="text-gray-700 text-xs">(Lines are open Mon-Sat from 9:30am to 6:30pm)</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 17 */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">17. Data Grievance Officer</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm">
                  In case you have any grievances or want to address any discrepancy with respect to the processing of any of the information/data you provided to Samridhya, please contact our Data Grievance Officer. The name and contact details of the Grievance Officer are provided below:
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 space-y-3 border border-purple-100">
                  <div className="flex items-start gap-3">
                    <Users className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Name: Mr. Abhinav Srivastava</p>
                      <p className="text-gray-700">Chief Technology Officer, Samridhya Innovations Pvt. Ltd.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Address:</p>
                      <p className="text-gray-700">#1207 /343 & 1207 /1/343/1, 9th MAIN, 7th SECTOR, HSR LAYOUT, BANGALORE, KARNATAKA - 560102</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Tel: +91 6366234520</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Email: support@samridhya.com</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-6 mt-8 text-white">
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <p className="leading-relaxed">
                  If you have questions, concerns, or suggestions regarding our Privacy Policy, we can be reached using the contact information on our Contact Us page or at support@samridhya.com
                </p>
              </section>

              {/* Last Updated */}
              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-gray-500 text-xs">
                  Last updated: August 16, 2024
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