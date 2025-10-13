'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Shield, DollarSign, Users, TrendingUp, ArrowRight, Star, Phone, Mail, MapPin, Building2, Briefcase, Calculator, Gem, Scale, HandCoins } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import LoanNavbar from '@/components/LoanNavbar';
import CTA from '@/components/CTA';
import EMICalculator from '@/components/EMICalculator';
import LoanFAQ from '@/components/LoanFAQ';
import ExploreOtherLoans from '@/components/ExploreOtherLoans';
import { handleAppDownload } from '@/utils/appStore';
import Head from 'next/head';

// --- Gold Loan Specific Data ---

const features = [
    {
        title: 'Instant Gold Valuation',
        description: 'Get an accurate valuation of your gold ornaments instantly at our branch.',
        icon: Scale,
        gradient: 'from-amber-500 to-yellow-500'
    },
    {
        title: 'High Loan-to-Value',
        description: 'Secure up to 75% of your gold\'s value as a loan, maximizing your funds.',
        icon: HandCoins,
        gradient: 'from-yellow-500 to-orange-500'
    },
    {
        title: 'Low Interest Rates',
        description: 'Competitive interest rates starting from 7.99% p.a. with flexible schemes.',
        icon: TrendingUp,
        gradient: 'from-orange-500 to-amber-500'
    },
    {
        title: 'Quick Disbursal',
        description: 'Receive funds in your account in under 30 minutes after verification.',
        icon: Clock,
        gradient: 'from-amber-500 to-yellow-500'
    },
    {
        title: 'Minimal Documentation',
        description: 'Only simple KYC documents (ID & Address proof) are required for processing.',
        icon: Briefcase,
        gradient: 'from-yellow-500 to-orange-500'
    },
    {
        title: 'Safe Gold Custody',
        description: 'Your gold is stored in high-security vaults with comprehensive insurance.',
        icon: Shield,
        gradient: 'from-orange-500 to-amber-500'
    }
];

const eligibilityCriteria = [
    'Must be a resident of India',
    'Age between 18 and 70 years',
    'Gold ornaments must be 18 to 24 Karat purity',
    'Valid identity proof (Aadhaar, PAN Card)',
    'Valid address proof (Voter ID, Utility Bill)',
    'Loan available for salaried, self-employed, and others'
];

const documentsRequired = [
    'Aadhaar Card or PAN Card (Mandatory ID Proof)',
    'Voter ID, Passport, or Utility Bill (Address Proof)',
    'Duly signed application form',
    'Passport-size photographs',
    'Cancelled Cheque (for bank transfer)',
    'Original Gold Ornaments'
];

const loanAmounts = [
    { amount: '₹50,000', tenure: '6 months', emi: '₹4,300' },
    { amount: '₹1,00,000', tenure: '12 months', emi: '₹8,800' },
    { amount: '₹2,50,000', tenure: '12 months', emi: '₹21,500' },
    { amount: '₹5,00,000', tenure: '24 months', emi: '₹22,500' },
    { amount: '₹10,00,000', tenure: '36 months', emi: '₹31,000' }
];

const testimonials = [
    {
        name: 'Priya Sharma',
        role: 'Homemaker',
        content: 'The Gold Loan process was incredibly fast and hassle-free. Got the money in my account in less than an hour!',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1596854316986-7785311e3b6d?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Ganesh Iyer',
        role: 'Small Shop Owner',
        content: 'The interest rate was the best I could find, and the staff was professional. My gold is safely secured, which gives me peace of mind.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Kavita Rao',
        role: 'College Student',
        content: 'Needed emergency funds for education. Minimal paperwork and quick disbursal helped me immediately. Highly recommended.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
    }
];

// --- Component Start ---

export default function GoldLoan() {
    const scrollToCalculator = () => {
        const calculatorSection = document.getElementById('emi-calculator');
        if (calculatorSection) {
            calculatorSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Head>
                <title>Gold Loan - Low Interest 7.99% p.a. | Instant Disbursal | Samridhya</title>
                <meta name="description" content="Get Gold Loans up to ₹1 Crore from Samridhya. Instant approval, low interest rates from 7.99% p.a., high LTV, and safe gold custody." />
                <meta name="keywords" content="gold loan, loan against gold, low interest gold loan, instant gold loan, jewellery loan" />
                <meta property="og:title" content="Gold Loan - Low Interest 7.99% p.a. | Instant Disbursal | Samridhya" />
                <meta property="og:description" content="Get Gold Loans up to ₹1 Crore from Samridhya. Instant approval, low interest rates from 7.99% p.a., and safe gold custody." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://samridhya.com/loans/gold-loan/" />
                <meta name="twitter:title" content="Gold Loan - Low Interest 7.99% p.a. | Instant Disbursal | Samridhya" />
                <meta name="twitter:description" content="Get Gold Loans up to ₹1 Crore from Samridhya. Instant approval, low interest rates from 7.99% p.a." />
            </Head>
            <div className="min-h-screen w-full">
                {/* Navbar */}
                <LoanNavbar />

                {/* Hero Section - Colors changed to Amber/Yellow/Orange for Gold Theme */}
                <section className="relative w-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 min-h-screen overflow-hidden pt-20">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/40 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-300/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-orange-300/40 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                                className="inline-flex items-center gap-2 bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-3 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <span className="text-amber-700 font-medium">Gold Loan Disbursal in 30 Minutes</span>
                            </motion.div>

                            {/* Main Heading */}
                            <motion.h1
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold xl:text-5xl font-black text-gray-900 mb-6 leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Loan Against Gold Ornaments
                                <br />
                                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-3.5xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Lowest Rate, Maximum Value

              </span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                className="text-sm sm:text-base md:text-lg lg:text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Unlock the value of your gold jewellery instantly.
                                Samridhya offers secure Gold Loans up to ₹1 Crore with the lowest interest rates starting at 7.99% p.a. and a hassle-free, same-day disbursal process.
                                Ideal for any personal or emergency financial need—get fast funds without selling your precious gold.

                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <motion.button
                                    onClick={() => {
                                        // handleAppDownload
                                        window.open('https://apply.samridhya.com?loan=gold', '_blank');
                                    }}
                                    className="group relative bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 text-base"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">Apply Now - Get ₹1 Lakh</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </motion.button>

                                <motion.button
                                    onClick={scrollToCalculator}
                                    className="group relative bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 text-amber-700 font-bold px-8 py-4 rounded-2xl hover:bg-amber-400/30 transition-all duration-300 text-base"
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
                                <div className="bg-white/90 backdrop-blur-sm border border-amber-300 rounded-2xl p-3 md:p-4 text-center shadow-lg">
                                    <div className="text-base md:text-lg font-bold text-amber-700 mb-1">₹1Cr</div>
                                    <div className="text-amber-500 text-xs">Maximum Loan</div>
                                </div>
                                <div className="bg-white/90 backdrop-blur-sm border border-amber-300 rounded-2xl p-3 md:p-4 text-center shadow-lg">
                                    <div className="text-base md:text-lg font-bold text-amber-700 mb-1">30 Mins</div>
                                    <div className="text-amber-500 text-xs">Disbursal Time</div>
                                </div>
                                <div className="col-span-2 md:col-span-1 bg-white/90 backdrop-blur-sm border border-amber-300 rounded-2xl p-3 md:p-4 text-center shadow-lg">
                                    <div className="text-base md:text-lg font-bold text-amber-700 mb-1">7.99%</div>
                                    <div className="text-amber-500 text-xs">Interest Rate</div>
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
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto px-4">
                                <motion.div
                                    className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center shadow-lg"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                        <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <h3 className="text-sm md:text-lg lg:text-xl xl:text-2xl font-medium text-gray-800 mb-2">Jewel Security</h3>
                                    <p className="text-xs md:text-base lg:text-lg text-gray-600">Guaranteed safety in secure vaults</p>
                                </motion.div>

                                <motion.div
                                    className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center shadow-lg"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                        <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <h3 className="text-sm md:text-lg lg:text-xl xl:text-2xl font-medium text-gray-800 mb-2">High LTV</h3>
                                    <p className="text-xs md:text-base lg:text-lg text-gray-600">Loan up to 75% of your gold value</p>
                                </motion.div>

                                <motion.div
                                    className="col-span-2 md:col-span-1 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center shadow-lg"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <h3 className="text-sm md:text-lg lg:text-xl xl:text-2xl font-medium text-gray-800 mb-2">Any Purpose</h3>
                                    <p className="text-xs md:text-base lg:text-lg text-gray-600">No restrictions on fund utilization</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Rest of the page with background */}
                <div className="bg-gradient-to-br from-slate-50 via-red-50 to-orange-100">
                    {/* Key Features Section - Colors changed to Red/Orange/Yellow */}
                    <section className="relative py-16 sm:py-24 overflow-hidden">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#FF6347]/20 to-yellow-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#FF6347]/30 to-red-400/15 rounded-full blur-2xl -z-10 animate-pulse delay-1000" />

                        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12 text-center">
                            <motion.div
                                className="mb-10 sm:mb-16"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-lg md:text-xl font-bold text-[#4b002b] mb-6 leading-tight">
                                    Why Choose Samridhya's{' '}
                                    <span className="bg-gradient-to-r from-[#FF6347] to-amber-500 bg-clip-text text-transparent">
                Gold Loans
              </span>
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-[#FF6347] to-amber-500 rounded-full mx-auto mb-6"></div>
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
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6347]/5 to-yellow-400/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <div className={`absolute top-0 left-4 sm:left-8 right-4 sm:right-8 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                                            <div className="relative z-10 flex items-start space-x-3 sm:space-x-5">
                                                <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                                                    <IconComponent className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-[#4b002b] text-xs sm:text-base lg:text-lg mb-1 sm:mb-2 lg:mb-3 group-hover:text-[#FF6347] transition-colors duration-300">
                                                        {feature.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-xs sm:text-xs lg:text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
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

                    {/* EMI Calculator Section - Props adjusted for Gold Loan */}
                    <EMICalculator
                        loanType="Gold Loan"
                        minAmount={10000}
                        maxAmount={10000000}
                        minTenure={3}
                        maxTenure={36}
                        minRate={7.99}
                        maxRate={18.99}
                        primaryColor="from-amber-600 to-yellow-600"
                        secondaryColor="from-amber-50 to-yellow-50"
                        accentColor="amber"
                        id="emi-calculator"
                    />

                    {/* Loan Details Section - Content and colors changed */}
                    <section className="relative py-16 sm:py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
                            <motion.div
                                className="text-center mb-12 sm:mb-16"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-lg md:text-xl font-bold text-[#4b002b] mb-6">
                                    Gold Loan Schemes & Details
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-[#FF6347] to-amber-500 rounded-full mx-auto mb-6"></div>
                            </motion.div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                                {/* Loan Amounts */}
                                <motion.div
                                    className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h3 className="text-base sm:text-lg font-bold text-[#4b002b] mb-4 sm:mb-6">Popular Gold Loan Schemes & Tenure</h3>
                                    <div className="space-y-3 sm:space-y-4">
                                        {loanAmounts.map((loan, idx) => (
                                            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                                                    <div>
                                                        <div className="text-xs sm:text-base font-bold text-[#FF6347]">{loan.amount}</div>
                                                        <div className="text-xs text-gray-600">Tenure: {loan.tenure}</div>
                                                    </div>
                                                    <div className="text-left sm:text-right">
                                                        <div className="text-xs sm:text-sm font-semibold text-gray-800">Approx. Monthly EMI</div>
                                                        <div className="text-xs sm:text-base font-bold text-red-600">{loan.emi}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Eligibility & Documents */}
                                <div className="space-y-6 sm:space-y-8">
                                    <motion.div
                                        className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h3 className="text-base sm:text-lg font-bold text-[#4b002b] mb-4 sm:mb-6">Gold Loan Eligibility Criteria</h3>
                                        <ul className="space-y-2 sm:space-y-3">
                                            {eligibilityCriteria.map((criteria, idx) => (
                                                <li key={idx} className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                                                    <CheckCircle2 className="text-amber-500 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                                                    <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{criteria}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    <motion.div
                                        className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    >
                                        <h3 className="text-base sm:text-lg font-bold text-[#4b002b] mb-4 sm:mb-6">Key Documents Required</h3>
                                        <ul className="space-y-2 sm:space-y-3">
                                            {documentsRequired.map((doc, idx) => (
                                                <li key={idx} className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full flex-shrink-0 mt-1.5 sm:mt-0"></div>
                                                    <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{doc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section - Content changed for Gold Loan */}
                    <section className="relative py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-yellow-50">
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
                            <motion.div
                                className="text-center mb-12 sm:mb-16"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-lg md:text-xl font-bold text-[#4b002b] mb-6">
                                    Trusted by Gold Loan Customers
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-[#FF6347] to-amber-500 rounded-full mx-auto mb-6"></div>
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
                                                <h3 className="font-semibold text-gray-800 text-xs sm:text-base">{testimonial.name}</h3>
                                                <p className="text-xs text-gray-600">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex mb-3 sm:mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-gray-700 italic text-xs leading-relaxed">"{testimonial.content}"</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Contact Section - Content adjusted */}
                    <section className="relative py-16 sm:py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
                            <motion.div
                                className="text-center mb-12 sm:mb-16"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-lg md:text-xl font-bold text-[#4b002b] mb-6">
                                    Gold Loan Support & Visit
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-[#FF6347] to-amber-500 rounded-full mx-auto mb-6"></div>
                            </motion.div>

                            <div className="grid grid-cols-3 gap-4 px-4">
                                <motion.div
                                    className="text-center p-4"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Phone className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Call Us</h3>
                                    <p className="text-xs text-gray-600">+91 63662 34523</p>
                                    <p className="text-xs text-gray-500">Gold Loan Hotline</p>
                                </motion.div>

                                <motion.div
                                    className="text-center p-4"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Mail className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Email Us</h3>
                                    <p className="text-xs text-gray-600">goldloan@samridhya.com</p>
                                    <p className="text-xs text-gray-500">Quick Response</p>
                                </motion.div>

                                <motion.div
                                    className="text-center p-4"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <MapPin className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Find a Branch</h3>
                                    <p className="text-xs text-gray-600">Locate Nearest Branch</p>
                                    <p className="text-xs text-gray-500">For Gold Appraisal</p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Explore Other Loans Section */}
                    <ExploreOtherLoans currentLoan="gold-loan" />

                    {/* FAQ Section */}
                    <LoanFAQ loanType="gold" />
                </div>

                <CTA />
            </div>
        </>
    );
}