import Navbar from "@/components/Navbar";
import AutoLoanCalculator from "@/components/AutoLoanCalculator";
import { motion } from "framer-motion";
import { Calculator, Car, Shield, Clock, DollarSign, Target, BarChart3, TrendingUp } from "lucide-react";
import { handleAppDownload } from "@/utils/appStore";
import { trackEvent, trackButtonClick } from "@/utils/analytics";
import Head from "next/head";

export default function AutoLoanCalculatorPage() {
  return (
    <>
      <Head>
        <title>Auto Loan Calculator - Calculate Car Loan EMI | Samridhya</title>
        <meta name="description" content="Use our free auto loan calculator to calculate car loan EMI, affordability, and get detailed breakdown. Plan your car purchase with trade-in options." />
        <meta name="keywords" content="auto loan calculator, car loan calculator, car loan EMI calculator, vehicle loan calculator" />
        <meta property="og:title" content="Auto Loan Calculator - Calculate Car Loan EMI | Samridhya" />
        <meta property="og:description" content="Use our free auto loan calculator to calculate car loan EMI and affordability." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/calculators/auto-loan-calculator/" />
        <meta name="twitter:title" content="Auto Loan Calculator - Calculate Car Loan EMI | Samridhya" />
        <meta name="twitter:description" content="Use our free auto loan calculator to calculate car loan EMI and affordability." />
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
      
        {/* Hero Section with Gradient */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-600 via-red-600 to-pink-700">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Car className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Car Loan Calculator</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Auto Loan Calculator
              </h1>
              <p className="text-base sm:text-lg text-orange-100 max-w-3xl mx-auto leading-relaxed">
                Calculate your car loan EMI, check affordability, and get detailed breakdown with trade-in options. 
                Plan your dream car purchase with our comprehensive auto loan calculator.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Auto Loan Calculator Component */}
        <section className="relative -mt-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AutoLoanCalculator 
              primaryColor="from-orange-600 to-red-600"
              secondaryColor="from-white to-gray-50"
              accentColor="orange"
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
                Why Use Our Auto Loan Calculator?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Experience the best auto loan calculation tools with advanced features and accurate results
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
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Calculation</h3>
                <p className="text-gray-600">Get auto loan calculations instantly with real-time processing</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Trade-in Support</h3>
                <p className="text-gray-600">Include trade-in value to reduce your loan amount</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-pink-600" />
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

        {/* How Auto Loan Works Section */}
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
                How Auto Loan Works
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Understand the auto loan process and how car financing works
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
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Your Car</h3>
                <p className="text-gray-600">Select the car you want to buy and check its ex-showroom price</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-red-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Down Payment</h3>
                <p className="text-gray-600">Pay 10-30% of car price as down payment to reduce loan amount</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-pink-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Monthly EMI</h3>
                <p className="text-gray-600">Pay fixed monthly EMI for 3-7 years to repay the loan</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Car Loan Tips
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Make informed decisions with these auto loan tips
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
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Higher Down Payment</h3>
                    <p className="text-gray-600">Pay at least 20% down payment to reduce EMI and total interest cost.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Compare Interest Rates</h3>
                    <p className="text-gray-600">Shop around for the best auto loan rates from multiple lenders.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Shorter Loan Term</h3>
                    <p className="text-gray-600">Choose shorter loan terms to pay less interest and own your car faster.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Check Credit Score</h3>
                    <p className="text-gray-600">Maintain a good credit score to qualify for better interest rates.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-600 via-red-600 to-pink-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Ready to Drive Your Dream Car?
              </h2>
              <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
                Download our mobile app for access to all loan calculators on the go, plus personalized loan recommendations and application tracking.
              </p>
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Car className="w-5 h-5" />
                Download App
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
