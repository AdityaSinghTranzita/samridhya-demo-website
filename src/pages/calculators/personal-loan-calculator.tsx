import Navbar from "@/components/Navbar";
import PersonalLoanCalculator from "@/components/PersonalLoanCalculator";
import { motion } from "framer-motion";
import { Calculator, Wallet, Shield, Clock, DollarSign, Target, BarChart3, TrendingUp } from "lucide-react";
import { handleAppDownload } from "@/utils/appStore";
import { trackEvent, trackButtonClick } from "@/utils/analytics";
import Head from "next/head";
import CTA from "@/components/CTA";

export default function PersonalLoanCalculatorPage() {
  return (
    <>
      <Head>
        <title>Personal Loan Calculator - Calculate Personal Loan EMI | Samridhya</title>
        <meta name="description" content="Use our free personal loan calculator to calculate personal loan EMI, total cost, and get detailed breakdown. Plan your personal loan with processing fees." />
        <meta name="keywords" content="personal loan calculator, personal loan EMI calculator, unsecured loan calculator" />
        <meta property="og:title" content="Personal Loan Calculator - Calculate Personal Loan EMI | Samridhya" />
        <meta property="og:description" content="Use our free personal loan calculator to calculate personal loan EMI and total cost." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/calculators/personal-loan-calculator/" />
        <meta name="twitter:title" content="Personal Loan Calculator - Calculate Personal Loan EMI | Samridhya" />
        <meta name="twitter:description" content="Use our free personal loan calculator to calculate personal loan EMI and total cost." />
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
      
        {/* Hero Section with Gradient */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-700">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Wallet className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Personal Loan Calculator</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Personal Loan Calculator
              </h1>
              <p className="text-base sm:text-lg text-purple-100 max-w-3xl mx-auto leading-relaxed">
                Calculate your personal loan EMI, total cost including processing fees, and get detailed breakdown. 
                Plan your personal loan with our comprehensive calculator.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Personal Loan Calculator Component */}
        <section className="relative -mt-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PersonalLoanCalculator 
              primaryColor="from-purple-600 to-pink-600"
              secondaryColor="from-white to-gray-50"
              accentColor="purple"
              id="calculator"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Why Use Our Personal Loan Calculator?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Experience the best personal loan calculation tools with advanced features and accurate results
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Calculation</h3>
                <p className="text-gray-600">Get personal loan calculations instantly with real-time processing</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Processing Fee Included</h3>
                <p className="text-gray-600">Calculate total cost including processing fees and charges</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Detailed Breakdown</h3>
                <p className="text-gray-600">Get comprehensive year-wise payment breakdown</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Free</h3>
                <p className="text-gray-600">All calculations are completely free with no hidden charges</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How Personal Loan Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                How Personal Loan Works
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Understand the personal loan process and how unsecured loans work
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Apply Online</h3>
                <p className="text-gray-600">Fill application form with basic details and documents</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-pink-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick Approval</h3>
                <p className="text-gray-600">Get approval within 24-48 hours based on credit score</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-rose-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Monthly EMI</h3>
                <p className="text-gray-600">Pay fixed monthly EMI for 1-5 years to repay the loan</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Personal Loan Tips
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Make informed decisions with these personal loan tips
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Check Processing Fees</h3>
                    <p className="text-gray-600">Compare processing fees across lenders as they vary significantly.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Compare Interest Rates</h3>
                    <p className="text-gray-600">Personal loan rates vary from 10% to 24% - shop around for best rates.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Shorter Tenure</h3>
                    <p className="text-gray-600">Choose shorter loan terms to pay less interest and become debt-free faster.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Maintain Credit Score</h3>
                    <p className="text-gray-600">Keep credit score above 750 to get better interest rates and approval.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Ready to Apply for Personal Loan?
              </h2>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                Download our mobile app for access to all loan calculators on the go, plus personalized loan recommendations and application tracking.
              </p>
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Wallet className="w-5 h-5" />
                Download App
              </button>
            </motion.div>
          </div>
        </section>
        <CTA />
      </div>
    </>
  );
}
