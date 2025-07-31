'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';
import { Wrench, BookOpen, Clock, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import { trackEvent, trackButtonClick } from '@/utils/analytics';

export default function BlogWIP() {
  return (
    <>
      <Head>
        <title>Blog & News - Samridhya | Financial Insights & Tips</title>
        <meta name="description" content="Stay updated with the latest insights, tips, and news from the world of digital lending. Expert financial advice and industry updates from Samridhya." />
        <meta name="keywords" content="financial blog, loan tips, financial advice, digital lending news, financial insights, money management tips" />
        <meta name="author" content="Samridhya" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Blog & News - Samridhya | Financial Insights & Tips" />
        <meta property="og:description" content="Stay updated with the latest insights, tips, and news from the world of digital lending. Expert financial advice and industry updates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/blog" />
        <meta property="og:image" content="https://samridhya.com/samridhya-preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Samridhya Blog - Financial Insights" />
        <meta property="og:site_name" content="Samridhya" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog & News - Samridhya | Financial Insights & Tips" />
        <meta name="twitter:description" content="Stay updated with the latest insights, tips, and news from the world of digital lending." />
        <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.png" />
        <meta name="twitter:image:alt" content="Samridhya Blog - Financial Insights" />
        <meta name="twitter:site" content="@samridhya" />
        <meta name="twitter:creator" content="@samridhya" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://samridhya.com/blog" />
        
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
              "@type": "Blog",
              "name": "Samridhya Blog",
              "description": "Financial insights, tips, and news from the world of digital lending",
              "url": "https://samridhya.com/blog",
              "publisher": {
                "@type": "Organization",
                "name": "Samridhya",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://samridhya.com/favicon.svg"
                }
              },
              "mainEntity": {
                "@type": "Organization",
                "name": "Samridhya",
                "description": "Digital lending platform providing financial insights and tips"
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
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <BookOpen className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Blog & News
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Stay updated with the latest insights, tips, and news from the world of digital lending.
            </p>

            {/* Work in Progress Card */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-8 sm:p-12 shadow-xl">
                <div className="text-center mb-8">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  >
                    <Wrench className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                    Work in Progress
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-8 max-w-2xl mx-auto">
                    We're crafting amazing content to help you make informed financial decisions. 
                    Our blog section is coming soon with expert insights, tips, and the latest industry updates.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center border border-blue-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 font-semibold mb-2">Expert Insights</h3>
                    <p className="text-gray-600 text-xs">Financial tips and industry knowledge</p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-gray-900 font-semibold mb-2">Latest Updates</h3>
                    <p className="text-gray-600 text-xs">Stay informed with current trends</p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-gray-900 font-semibold mb-2">Community</h3>
                    <p className="text-gray-600 text-xs">Join our growing community</p>
                  </motion.div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-700">Development Progress</span>
                    <span className="text-xs font-medium text-blue-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                  
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-200">
                    <Clock className="w-4 h-4 mr-2" />
                    Coming Soon
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <CTA />
    </div>
    </>
  );
}
