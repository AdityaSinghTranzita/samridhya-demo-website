'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Shield, DollarSign, Users, TrendingUp, ArrowRight, Star, Phone, Mail, MapPin, Building2, Briefcase, Calculator } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import LoanNavbar from '@/components/LoanNavbar';
import CTA from '@/components/CTA';
import EMICalculator from '@/components/EMICalculator';
import LoanFAQ from '@/components/LoanFAQ';
import { handleAppDownload } from '@/utils/appStore';
import Head from 'next/head';

const features = [
  {
    title: 'Quick Business Approval',
    description: 'Get approved in just 24 hours with our streamlined business assessment process',
    icon: Clock,
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    title: 'Collateral & Unsecured Options',
    description: 'Choose between secured loans with collateral or unsecured business loans',
    icon: Shield,
    gradient: 'from-green-500 to-teal-500'
  },
  {
    title: 'Competitive Business Rates',
    description: 'Starting from 12.99% p.a. with flexible repayment options for businesses',
    icon: TrendingUp,
    gradient: 'from-teal-500 to-emerald-500'
  },
  {
    title: 'Fast Disbursal',
    description: 'Receive funds directly in your business account within 48 hours',
    icon: DollarSign,
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    title: 'Business-Focused Documentation',
    description: 'Simple document requirements - Business PAN, GST, and bank statements',
    icon: Building2,
    gradient: 'from-green-500 to-teal-500'
  },
  {
    title: 'Flexible Business EMI Options',
    description: 'Choose repayment tenure from 12 to 120 months as per your business cash flow',
    icon: CheckCircle2,
    gradient: 'from-teal-500 to-emerald-500'
  }
];

const eligibilityCriteria = [
  'Business age of minimum 2 years',
  'Minimum annual turnover of ₹10 Lakhs',
  'Good business credit score (700+)',
  'Stable business operations',
  'Valid Business PAN and GST',
  'Active business bank account'
];

const documentsRequired = [
  'Business PAN Card (Mandatory)',
  'GST Registration Certificate (Mandatory)',
  'Business bank statements (Last 12 months)',
  'Business financial statements (P&L, Balance Sheet)',
  'Business address proof (Rental agreement/Property papers)',
  'Business registration documents (Partnership deed/Company incorporation)'
];

const loanAmounts = [
  { amount: '₹5,00,000', tenure: '12-60 months', emi: '₹12,500' },
  { amount: '₹10,00,000', tenure: '12-84 months', emi: '₹22,000' },
  { amount: '₹25,00,000', tenure: '12-120 months', emi: '₹48,000' },
  { amount: '₹50,00,000', tenure: '12-120 months', emi: '₹92,000' },
  { amount: '₹1,00,00,000', tenure: '12-120 months', emi: '₹1,75,000' }
];

const testimonials = [
  {
    name: 'Rajesh Mehta',
    role: 'Manufacturing Business Owner',
    content: 'Got my business loan approved in just 24 hours! The process was smooth and the rates were competitive.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Sunita Desai',
    role: 'Retail Store Owner',
    content: 'Excellent service for business expansion. The EMI options were flexible and suited my business cash flow perfectly.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Vikram Singh',
    role: 'Restaurant Chain Owner',
    content: 'Quick disbursal and professional service. Highly recommended for any business needing working capital.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];

export default function BusinessLoan() {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('emi-calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Business Loan - Up to ₹2 Crores | Quick Approval | Samridhya</title>
        <meta name="description" content="Get business loans up to ₹2 Crores from Samridhya. Quick approval in 24 hours, competitive rates from 12.99% p.a. for working capital, expansion, and equipment purchase." />
        <meta name="keywords" content="business loan, working capital loan, MSME loan, business expansion loan, equipment financing" />
        <meta property="og:title" content="Business Loan - Up to ₹2 Crores | Quick Approval | Samridhya" />
        <meta property="og:description" content="Get business loans up to ₹2 Crores from Samridhya. Quick approval in 24 hours, competitive rates from 12.99% p.a. for working capital, expansion, and equipment purchase." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/loans/business-loan" />
        <meta name="twitter:title" content="Business Loan - Up to ₹2 Crores | Quick Approval | Samridhya" />
        <meta name="twitter:description" content="Get business loans up to ₹2 Crores from Samridhya. Quick approval in 24 hours, competitive rates from 12.99% p.a." />
      </Head>
      <div className="min-h-screen w-full">
        {/* Navbar */}
        <LoanNavbar />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 min-h-screen overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center mb-16">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 font-medium">Business Loan Approval in 24 Hours</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Business Loans
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                For Growth
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Get up to ₹2 Crores in just 24 hours. Working capital, equipment financing, 
              and business expansion loans starting from 12.99% p.a.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                onClick={handleAppDownload}
                className="group relative bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Apply Now - Get ₹5 Lakhs</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                onClick={scrollToCalculator}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Calculate EMI
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">₹2Cr</div>
                <div className="text-white/70 text-sm">Maximum Loan</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">24 Hrs</div>
                <div className="text-white/70 text-sm">Approval Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">12.99%</div>
                <div className="text-white/70 text-sm">Interest Rate</div>
              </div>
            </motion.div>
          </div>

          {/* Floating Cards */}
          <motion.div
            className="relative mt-16 sm:mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-2">Business Focused</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">Tailored for business growth and expansion</p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-2">Quick Disbursal</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">Funds in your business account within 48 hours</p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-2">Business Docs</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">Business PAN, GST & financial statements</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rest of the page with background */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Key Features Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#276EF4]/20 to-cyan-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#276EF4]/30 to-purple-400/15 rounded-full blur-2xl -z-10 animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12 text-center">
          <motion.div
            className="mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2b004b] mb-6 leading-tight">
              Why Choose Our{' '}
              <span className="bg-gradient-to-r from-[#276EF4] to-cyan-500 bg-clip-text text-transparent">
                Business Loans
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-4">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={idx}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-left border border-gray-100/50 backdrop-blur-sm hover:-translate-y-1 sm:hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#276EF4]/5 to-cyan-400/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`absolute top-0 left-4 sm:left-8 right-4 sm:right-8 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                  <div className="relative z-10 flex items-start space-x-3 sm:space-x-5">
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                      <IconComponent className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#2b004b] text-base sm:text-lg lg:text-xl mb-1 sm:mb-2 lg:mb-3 group-hover:text-[#276EF4] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <EMICalculator 
        loanType="Business Loan"
        minAmount={500000}
        maxAmount={10000000}
        minTenure={12}
        maxTenure={120}
        minRate={12.99}
        maxRate={24.99}
        primaryColor="from-emerald-600 to-green-600"
        secondaryColor="from-emerald-50 to-green-50"
        accentColor="emerald"
        id="emi-calculator"
      />

      {/* Loan Details Section */}
      <section className="relative py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2b004b] mb-6">
              Business Loan Details
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Loan Amounts */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#2b004b] mb-4 sm:mb-6">Business Loan Amounts & EMI</h3>
              <div className="space-y-3 sm:space-y-4">
                {loanAmounts.map((loan, idx) => (
                  <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                      <div>
                        <div className="text-lg sm:text-xl font-bold text-[#276EF4]">{loan.amount}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Tenure: {loan.tenure}</div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-sm sm:text-lg font-semibold text-gray-800">EMI from</div>
                        <div className="text-lg sm:text-xl font-bold text-green-600">{loan.emi}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Eligibility & Documents */}
            <div className="space-y-6 sm:space-y-8">
              <motion.div
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#2b004b] mb-4 sm:mb-6">Business Eligibility Criteria</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {eligibilityCriteria.map((criteria, idx) => (
                    <li key={idx} className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                      <CheckCircle2 className="text-green-500 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#2b004b] mb-4 sm:mb-6">Business Documents Required</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {documentsRequired.map((doc, idx) => (
                    <li key={idx} className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full flex-shrink-0 mt-1.5 sm:mt-0"></div>
                      <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{doc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2b004b] mb-6">
              What Our Business Customers Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3 sm:mr-4 w-10 h-10 sm:w-12 sm:h-12"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic text-xs sm:text-sm leading-relaxed">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2b004b] mb-6">
              Need Business Loan Help? Contact Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            <motion.div
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Call Us</h3>
              <p className="text-sm sm:text-base text-gray-600">1800-123-4567</p>
              <p className="text-xs sm:text-sm text-gray-500">Business Support</p>
            </motion.div>

            <motion.div
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Email Us</h3>
              <p className="text-sm sm:text-base text-gray-600">business@samridhya.com</p>
              <p className="text-xs sm:text-sm text-gray-500">Quick Response</p>
            </motion.div>

            <motion.div
              className="text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Visit Us</h3>
              <p className="text-sm sm:text-base text-gray-600">Mumbai, Maharashtra</p>
              <p className="text-xs sm:text-sm text-gray-500">Business Center</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <LoanFAQ loanType="business" />

      <CTA />
      </div>
    </div>
    </>
  );
}
