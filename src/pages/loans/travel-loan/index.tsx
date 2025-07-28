'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Shield, DollarSign, Users, TrendingUp, ArrowRight, Star, Phone, Mail, MapPin, Plane, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import LoanNavbar from '@/components/LoanNavbar';
import CTA from '@/components/CTA';
import EMICalculator from '@/components/EMICalculator';
import LoanFAQ from '@/components/LoanFAQ';
import ExploreOtherLoans from '@/components/ExploreOtherLoans';
import { handleAppDownload } from '@/utils/appStore';
import Head from 'next/head';

const features = [
  {
    title: 'Vacation Funding',
    description: 'Comprehensive financing for your dream vacation and travel expenses',
    icon: Plane,
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    title: 'No Collateral Required',
    description: 'Unsecured travel loans without any property or asset pledge',
    icon: Shield,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Competitive Interest Rates',
    description: 'Starting from 12.99% p.a. with flexible repayment options',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Quick Disbursal',
    description: 'Receive funds directly in your bank account within 24 hours',
    icon: Clock,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Minimal Documentation',
    description: 'Simple document requirements - PAN, Aadhaar, and bank statements',
    icon: Users,
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    title: 'Flexible EMI Options',
    description: 'Choose repayment tenure from 12 to 60 months as per your convenience',
    icon: CheckCircle2,
    gradient: 'from-teal-500 to-green-500'
  }
];

const eligibilityCriteria = [
  'Age between 21-65 years',
  'Minimum monthly income of ₹25,000',
  'Good credit score (750+)',
  'Stable employment history',
  'Valid PAN and Aadhaar card',
  'Active bank account'
];

const documentsRequired = [
  'PAN Card (Mandatory)',
  'Aadhaar Card (Mandatory)',
  'Bank statements (Last 3 months)',
  'Salary slips (Last 3 months)',
  'Address proof (Utility bill/Rental agreement)',
  'Employment certificate (if applicable)'
];

const loanAmounts = [
  { amount: '₹1,00,000', tenure: '12-36 months', emi: '₹3,500' },
  { amount: '₹2,50,000', tenure: '12-48 months', emi: '₹7,800' },
  { amount: '₹5,00,000', tenure: '12-60 months', emi: '₹14,200' },
  { amount: '₹7,50,000', tenure: '12-60 months', emi: '₹20,500' },
  { amount: '₹15,00,000', tenure: '12-60 months', emi: '₹38,000' }
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Travel Enthusiast',
    content: 'Got my travel loan approved in just 15 minutes! Made my dream vacation to Europe possible.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Priya Patel',
    role: 'Business Traveler',
    content: 'Excellent service for business travel. The rates were competitive and the process was hassle-free.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Amit Kumar',
    role: 'Family Traveler',
    content: 'Perfect solution for our family vacation. Quick disbursal and flexible repayment options.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

export default function TravelLoan() {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('emi-calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Travel Loan - Vacation & Business Travel Financing | Samridhya</title>
        <meta name="description" content="Get travel loans up to ₹10 Lakhs from Samridhya. Finance your vacation, business trips, and international travel with quick approval and competitive rates." />
        <meta name="keywords" content="travel loan, vacation loan, business travel financing, international travel loan, holiday financing" />
        <meta property="og:title" content="Travel Loan - Vacation & Business Travel Financing | Samridhya" />
        <meta property="og:description" content="Get travel loans up to ₹10 Lakhs from Samridhya. Finance your vacation, business trips, and international travel with quick approval and competitive rates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/loans/travel-loan" />
        <meta name="twitter:title" content="Travel Loan - Vacation & Business Travel Financing | Samridhya" />
        <meta name="twitter:description" content="Get travel loans up to ₹10 Lakhs from Samridhya. Finance your vacation, business trips, and international travel." />
      </Head>
      <div className="min-h-screen w-full">
        {/* Navbar */}
        <LoanNavbar />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 min-h-screen overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-amber-300/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-yellow-300/40 rounded-full blur-3xl animate-pulse delay-500"></div>
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
              className="inline-flex items-center gap-2 bg-orange-400/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-orange-700 font-medium">Dream Vacation Support Available</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-black text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Travel Loans
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                For Your Adventures
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Get up to ₹15 Lakhs for your dream vacation in just 10 minutes. 
              No collateral, minimal documents, and competitive rates starting from 12.99% p.a.
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
                className="group relative bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Apply Now - Get ₹2.5 Lakhs</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                onClick={scrollToCalculator}
                className="group relative bg-orange-400/20 backdrop-blur-sm border border-orange-400/30 text-orange-700 font-bold px-8 py-4 rounded-2xl hover:bg-orange-400/30 transition-all duration-300 text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Calculate EMI
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-2xl p-3 md:p-4 text-center shadow-lg">
                <div className="text-base md:text-lg font-bold text-cyan-800 mb-1">₹10L</div>
                <div className="text-cyan-600 text-xs">Maximum Loan</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-2xl p-3 md:p-4 text-center shadow-lg">
                <div className="text-base md:text-lg font-bold text-cyan-800 mb-1">12 Hrs</div>
                <div className="text-cyan-600 text-xs">Approval Time</div>
              </div>
              <div className="col-span-2 md:col-span-1 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-2xl p-3 md:p-4 text-center shadow-lg">
                <div className="text-base md:text-lg font-bold text-cyan-800 mb-1">9.99%</div>
                <div className="text-cyan-600 text-xs">Interest Rate</div>
              </div>
            </motion.div>
          </div>

          {/* Floating Cards */}
          <motion.div
            className="relative mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-3xl p-4 md:p-6 text-center shadow-lg"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Plane className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-sm md:text-lg lg:text-xl xl:text-2xl font-medium text-gray-800 mb-2">Travel Expenses</h3>
                <p className="text-xs md:text-base lg:text-lg text-gray-600">Covers all travel costs</p>
              </motion.div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-3xl p-4 md:p-6 text-center shadow-lg"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Clock className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-sm md:text-lg lg:text-xl xl:text-2xl font-medium text-gray-800 mb-2">Quick Disbursal</h3>
                <p className="text-xs md:text-base lg:text-lg text-gray-600">Funds in your account within 12 hours</p>
              </motion.div>

              <motion.div
                className="col-span-2 md:col-span-1 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-3xl p-4 md:p-6 text-center shadow-lg"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-sm md:text-lg lg:text-xl xl:text-2xl font-medium text-gray-800 mb-2">Minimal Docs</h3>
                <p className="text-xs md:text-base lg:text-lg text-gray-600">Just PAN, Aadhaar & bank statements</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <EMICalculator 
        loanType="Travel Loan"
        minAmount={50000}
        maxAmount={1500000}
        minTenure={12}
        maxTenure={60}
        minRate={12.99}
        maxRate={24.99}
        primaryColor="from-orange-600 to-amber-600"
        secondaryColor="from-orange-50 to-amber-50"
        accentColor="orange"
        id="emi-calculator"
      />

      {/* Rest of the page with background */}
      <div className="bg-gradient-to-br from-slate-50 via-orange-50 to-amber-100">
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
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2b004b] mb-6 leading-tight">
              Why Choose Our{' '}
              <span className="bg-gradient-to-r from-[#276EF4] to-cyan-500 bg-clip-text text-transparent">
                Travel Loans
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={idx}
                  className="group relative bg-white rounded-3xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-left border border-gray-100/50 backdrop-blur-sm hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#276EF4]/5 to-cyan-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                  <div className="relative z-10 flex items-start space-x-5">
                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                      <IconComponent className="text-white w-7 h-7" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#2b004b] text-xs sm:text-base mb-2 sm:mb-3 group-hover:text-[#276EF4] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-xs leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
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
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2b004b] mb-6">
              Loan Details
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Loan Amounts */}
            <motion.div
              className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-lg font-bold text-[#2b004b] mb-6">Loan Amounts & EMI</h3>
              <div className="space-y-4">
                {loanAmounts.map((loan, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-base font-bold text-[#276EF4]">{loan.amount}</div>
                        <div className="text-xs text-gray-600">Tenure: {loan.tenure}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-800">EMI from</div>
                        <div className="text-base font-bold text-green-600">{loan.emi}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Eligibility & Documents */}
            <div className="space-y-8">
              <motion.div
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-lg font-bold text-[#2b004b] mb-6">Eligibility Criteria</h3>
                <ul className="space-y-3">
                  {eligibilityCriteria.map((criteria, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" />
                      <span className="text-gray-700">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-[#2b004b] mb-6">Documents Required</h3>
                <ul className="space-y-3">
                  {documentsRequired.map((doc, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2b004b] mb-6">
              What Our Travelers Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
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
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2b004b] mb-6">
              Need Help? Contact Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4">
            <motion.div
              className="text-center p-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-xs text-gray-500">24/7 Support</p>
            </motion.div>

            <motion.div
              className="text-center p-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-xs text-gray-500">Quick Response</p>
            </motion.div>

            <motion.div
              className="text-center p-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-xs text-gray-500">Head Office</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore Other Loans Section */}
      <ExploreOtherLoans currentLoan="travel-loan" />

      {/* FAQ Section */}
      <LoanFAQ loanType="travel" />
      </div>

      <CTA />
    </div>
    </>
  );
} 