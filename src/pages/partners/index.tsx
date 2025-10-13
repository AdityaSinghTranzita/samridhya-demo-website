import Head from 'next/head';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import { trackEvent, trackButtonClick } from '@/utils/analytics';
import { 
  ArrowRight, 
  Building2, 
  Handshake, 
  Award, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Zap,
  Target,
  Star,
  ChevronRight
} from 'lucide-react';

const partners = [
  {
    name: 'HDFC Bank',
    logo: '/images/HDFC-logo.webp',
    type: 'Private Bank',
    category: 'Premium Partner',
    description: 'India\'s largest private sector bank by market capitalization',
    benefits: ['Competitive rates', 'Quick processing', 'Wide network'],
    rating: 4.8,
    bg: 'bg-[#e3f0ff]'
  },
  {
    name: 'ICICI Bank',
    logo: '/images/icici-logo.webp',
    type: 'Private Bank',
    category: 'Premium Partner',
    description: 'Leading private sector bank with innovative digital solutions',
    benefits: ['Digital-first approach', 'Flexible terms', '24/7 support'],
    rating: 4.7,
    bg: 'bg-[#fff3e6]'
  },
  {
    name: 'Axis Bank',
    logo: '/images/axis-logo.webp',
    type: 'Private Bank',
    category: 'Premium Partner',
    description: 'Third-largest private sector bank in India',
    benefits: ['Transparent pricing', 'Easy documentation', 'Quick disbursal'],
    rating: 4.6,
    bg: 'bg-[#f3e6f9]'
  },
  {
    name: 'Kotak Mahindra Bank',
    logo: '/images/kotak-logo.webp',
    type: 'Private Bank',
    category: 'Premium Partner',
    description: 'Leading private sector bank with strong retail focus',
    benefits: ['Customer-centric', 'Innovative products', 'Reliable service'],
    rating: 4.7,
    bg: 'bg-[#e6f0fa]'
  },
  {
    name: 'Bajaj Finserv',
    logo: '/images/bajaj-logo.webp',
    type: 'NBFC',
    category: 'Strategic Partner',
    description: 'Leading NBFC with diversified financial services',
    benefits: ['Specialized products', 'Quick approval', 'Competitive rates'],
    rating: 4.5,
    bg: 'bg-[#e6f4fa]'
  },
  {
    name: 'Tata Capital',
    logo: '/images/tata-logo.webp',
    type: 'NBFC',
    category: 'Strategic Partner',
    description: 'Trusted financial services provider from Tata Group',
    benefits: ['Trusted brand', 'Quality service', 'Wide product range'],
    rating: 4.6,
    bg: 'bg-[#e6f0fa]'
  },
  {
    name: 'Aditya Birla Capital',
    logo: '/images/aditya-birla-logo.webp',
    type: 'NBFC',
    category: 'Strategic Partner',
    description: 'Comprehensive financial services from Aditya Birla Group',
    benefits: ['Diversified portfolio', 'Strong backing', 'Innovative solutions'],
    rating: 4.5,
    bg: 'bg-[#fff7e6]'
  }
];

const partnershipBenefits = [
  {
    icon: Users,
    title: 'Wide Customer Base',
    description: 'Access to 50,000+ pre-screened customers actively seeking loans',
    color: 'from-[#276ef4] to-blue-600'
  },
  {
    icon: TrendingUp,
    title: 'Quality Leads',
    description: 'Pre-verified applicants with good credit scores and stable income',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Zap,
    title: 'Quick Integration',
    description: 'Seamless API integration with real-time data synchronization',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Bank-grade security with end-to-end encryption and compliance',
    color: 'from-orange-500 to-red-600'
  },
  {
    icon: Target,
    title: 'Targeted Marketing',
    description: 'AI-powered customer matching for better conversion rates',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    icon: Star,
    title: 'Premium Support',
    description: 'Dedicated account managers and 24/7 technical support',
    color: 'from-teal-500 to-green-600'
  }
];

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState('partners');
  const [showAllPartners, setShowAllPartners] = useState(false);

  return (
    <>
      <Head>
        <title>Our Partners - Samridhya | Leading Banks & NBFCs</title>
        <meta name="description" content="Discover our trusted partners including HDFC Bank, ICICI Bank, Axis Bank, and leading NBFCs. Apply for partnership with Samridhya." />
        <meta name="keywords" content="bank partners, NBFC partners, loan partners, financial institutions, partnership" />
        <meta name="author" content="Samridhya" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Our Partners - Samridhya | Leading Banks & NBFCs" />
        <meta property="og:description" content="Discover our trusted partners including HDFC Bank, ICICI Bank, Axis Bank, and leading NBFCs. Apply for partnership with Samridhya." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/partners/" />
        <meta property="og:image" content="https://samridhya.com/samridhya-preview.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Samridhya Partners - Banks & NBFCs" />
        <meta property="og:site_name" content="Samridhya" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Partners - Samridhya | Leading Banks & NBFCs" />
        <meta name="twitter:description" content="Discover our trusted partners including HDFC Bank, ICICI Bank, Axis Bank, and leading NBFCs." />
        <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.webp" />
        <meta name="twitter:image:alt" content="Samridhya Partners - Banks & NBFCs" />
        <meta name="twitter:site" content="@samridhya" />
        <meta name="twitter:creator" content="@samridhya" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://samridhya.com/partners/" />
        
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
              "name": "Our Partners",
              "description": "Discover Samridhya's trusted partners including leading banks and NBFCs",
              "url": "https://samridhya.com/partners/",
              "mainEntity": {
                "@type": "Organization",
                "name": "Samridhya",
                "description": "Digital lending platform with trusted banking partners",
                "hasPart": [
                  {
                    "@type": "Organization",
                    "name": "HDFC Bank",
                    "description": "India's largest private sector bank"
                  },
                  {
                    "@type": "Organization", 
                    "name": "ICICI Bank",
                    "description": "Leading private sector bank with digital solutions"
                  },
                  {
                    "@type": "Organization",
                    "name": "Axis Bank", 
                    "description": "Third-largest private sector bank in India"
                  }
                ]
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen w-full bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-12 mt-20">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2b004b] mb-4 sm:mb-6 leading-tight">
                Our Trusted{' '}
                <span className="bg-gradient-to-r from-[#276ef4] to-green-500 bg-clip-text text-transparent">
                  Partners
                </span>
              </h1>
              
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#276ef4] to-green-500 rounded-full mx-auto mb-6 sm:mb-8"></div>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12">
                We collaborate with India's leading banks and NBFCs to provide you with the best loan offers. 
                Our partnerships ensure competitive rates, quick approvals, and reliable service.
              </p>

              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
                <button
                  onClick={() => setActiveTab('partners')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeTab === 'partners'
                      ? 'bg-gradient-to-r from-[#276ef4] to-green-500 text-white shadow-lg'
                      : 'bg-gray-100 text-[#276ef4] hover:bg-gray-200'
                  }`}
                >
                  Our Partners
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeTab === 'benefits'
                      ? 'bg-gradient-to-r from-[#276ef4] to-green-500 text-white shadow-lg'
                      : 'bg-gray-100 text-[#276ef4] hover:bg-gray-200'
                  }`}
                >
                  Partnership Benefits
                </button>
                <button
                  onClick={() => setActiveTab('apply')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeTab === 'apply'
                      ? 'bg-gradient-to-r from-[#276ef4] to-green-500 text-white shadow-lg'
                      : 'bg-gray-100 text-[#276ef4] hover:bg-gray-200'
                  }`}
                >
                  Apply for Partnership
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-20">
          {/* Partners Section */}
          {activeTab === 'partners' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Desktop Layout - Full Content */}
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map((partner, idx) => (
                  <motion.div
                    key={idx}
                    className={`${partner.bg} border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <div className="text-center space-y-4">
                      {/* Logo */}
                      <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-2 mx-auto">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = document.createElement('div');
                              fallback.className = 'w-full h-full flex items-center justify-center text-[#276ef4] font-bold text-sm';
                              fallback.textContent = partner.name.split(' ')[0];
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>

                      {/* Partner Info */}
                      <div className="space-y-2">
                        <h3 className="text-[#2b004b] font-bold text-lg">
                          {partner.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {partner.type}
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <Award className="w-4 h-4 text-[#276ef4]" />
                          <span className="text-[#276ef4] text-sm font-medium">
                            {partner.category}
                          </span>
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center justify-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(partner.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            {partner.rating}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed text-center">
                        {partner.description}
                      </p>

                      {/* Benefits */}
                      <div className="space-y-2">
                        <h4 className="text-[#2b004b] font-semibold text-sm text-center">Key Benefits:</h4>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                          {partner.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-1 text-xs text-gray-600">
                              <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Layout - Limited Content */}
              <div className="sm:hidden">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {partners.slice(0, showAllPartners ? partners.length : 4).map((partner, idx) => (
                    <motion.div
                      key={idx}
                      className={`${partner.bg} border border-gray-100 rounded-lg p-3 shadow-sm`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <div className="text-center space-y-2">
                        {/* Logo */}
                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center p-1 mx-auto">
                          <Image
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                            unoptimized
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = 'w-full h-full flex items-center justify-center text-[#276ef4] font-bold text-xs';
                                fallback.textContent = partner.name.split(' ')[0];
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        </div>

                        {/* Partner Info - Minimal */}
                        <div className="space-y-1">
                          <h3 className="text-[#2b004b] font-bold text-xs leading-tight">
                            {partner.name}
                          </h3>
                          <p className="text-gray-600 text-[10px]">
                            {partner.type}
                          </p>
                          <div className="flex items-center justify-center gap-1">
                            <Award className="w-3 h-3 text-[#276ef4]" />
                            <span className="text-[#276ef4] text-[10px] font-medium">
                              {partner.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View More Button */}
                {!showAllPartners && (
                  <div className="text-center">
                    <button 
                      onClick={() => setShowAllPartners(true)}
                      className="inline-flex items-center gap-2 text-[#276ef4] font-semibold text-sm hover:text-[#276ef4]/80 transition-all duration-300"
                    >
                      View All Partners
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Benefits Section */}
          {activeTab === 'benefits' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {partnershipBenefits.map((benefit, idx) => {
                  const IconComponent = benefit.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <div className="text-center space-y-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mx-auto shadow-sm`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-[#2b004b] font-bold text-lg">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Additional Info */}
              <motion.div
                className="mt-12 bg-gradient-to-r from-[#276ef4] to-green-500 rounded-2xl p-8 text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Join Our Network?
                </h3>
                <p className="text-white/90 text-base max-w-2xl mx-auto mb-6">
                  Partner with Samridhya and tap into our growing customer base. 
                  We provide comprehensive support, advanced technology, and proven results.
                </p>
                <button
                  onClick={() => setActiveTab('apply')}
                  className="bg-white text-[#276ef4] px-8 py-3 rounded-xl font-semibold text-base hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Apply for Partnership
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Apply for Partnership Section */}
          {activeTab === 'apply' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2b004b] mb-4">
                      Get in Touch
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                      Ready to partner with Samridhya? Our partnership team is here to help you get started. 
                      Fill out the form and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#276ef4] to-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-[#2b004b] font-bold text-base mb-1">Email Us</h4>
                        <p className="text-gray-600 text-base">support@samridhya.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#276ef4] to-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-[#2b004b] font-bold text-base mb-1">Call Us</h4>
                        <p className="text-gray-600 text-base">+91 63662 34523</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#276ef4] to-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-[#2b004b] font-bold text-base mb-1">Visit Us</h4>
                        <p className="text-gray-600 text-base">Bangalore, Karnataka, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Form */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-[#2b004b] mb-6">
                    Partnership Application
                  </h3>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276ef4] focus:border-transparent transition-all duration-300"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276ef4] focus:border-transparent transition-all duration-300"
                          placeholder="Enter contact person name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276ef4] focus:border-transparent transition-all duration-300"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276ef4] focus:border-transparent transition-all duration-300"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Institution Type *
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276ef4] focus:border-transparent transition-all duration-300">
                        <option value="">Select institution type</option>
                        <option value="bank">Bank</option>
                        <option value="nbfc">NBFC</option>
                        <option value="fintech">Fintech</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Partnership Interest *
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276ef4] focus:border-transparent transition-all duration-300">
                        <option value="">Select partnership type</option>
                        <option value="lending">Lending Partnership</option>
                        <option value="technology">Technology Partnership</option>
                        <option value="distribution">Distribution Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276ef4] focus:border-transparent transition-all duration-300"
                        placeholder="Tell us about your partnership goals..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#276ef4] to-green-500 text-white py-4 rounded-xl font-semibold text-base hover:shadow-lg transition-all duration-300"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
} 