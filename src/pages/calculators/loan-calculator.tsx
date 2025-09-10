import Navbar from "@/components/Navbar";
import EMICalculator from "@/components/EMICalculator";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Shield, Clock, DollarSign } from "lucide-react";
import { handleAppDownload } from "@/utils/appStore";
import { trackEvent, trackButtonClick } from "@/utils/analytics";
import Head from "next/head";

export default function LoanCalculatorPage() {

  return (
    <>
      <Head>
        <title>EMI Calculator - Calculate Loan EMI Online | Samridhya</title>
        <meta name="description" content="Use our free EMI calculator to calculate loan EMI online. Get instant EMI calculations for personal loans, business loans, and more with detailed breakdowns." />
        <meta name="keywords" content="EMI calculator, loan EMI calculator, monthly EMI calculation, personal loan EMI, business loan EMI" />
        <meta property="og:title" content="EMI Calculator - Calculate Loan EMI Online | Samridhya" />
        <meta property="og:description" content="Use our free EMI calculator to calculate loan EMI online. Get instant EMI calculations for personal loans, business loans, and more with detailed breakdowns." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/calculators/loan-calculator/" />
        <meta name="twitter:title" content="EMI Calculator - Calculate Loan EMI Online | Samridhya" />
        <meta name="twitter:description" content="Use our free EMI calculator to calculate loan EMI online. Get instant EMI calculations for personal loans, business loans, and more." />
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
      
      {/* Hero Section with Gradient */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Calculator className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">EMI Calculator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Smart EMI Calculator
            </h1>
            <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Calculate your monthly EMI payments with our advanced calculator. Get instant results with detailed breakdowns to plan your loan repayment effectively.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EMI Calculator Component */}
      <section className="relative -mt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EMICalculator 
            loanType="Personal"
            minAmount={50000}
            maxAmount={1000000}
            minTenure={12}
            maxTenure={84}
            minRate={10.99}
            maxRate={24.99}
            primaryColor="from-blue-600 to-purple-600"
            secondaryColor="from-white to-gray-50"
            accentColor="blue"
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
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Why Choose Our EMI Calculator?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Experience the best EMI calculation tools with advanced features and accurate results
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
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Calculation</h3>
              <p className="text-gray-600">Get your EMI amount instantly with real-time calculations</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Detailed Breakdown</h3>
              <p className="text-gray-600 text-sm sm:text-base">See total interest, principal, and complete payment schedule</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600 text-sm sm:text-base">Your data stays private - no information is stored</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Multiple Tenures</h3>
              <p className="text-gray-600 text-sm sm:text-base">Compare different loan tenures to find the best option</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Understanding EMI Calculation
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Learn how EMI is calculated and what factors affect your monthly payments
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Card 1: What is EMI? */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-blue-600" />
                What is EMI?
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                EMI (Equated Monthly Installment) is the fixed amount you pay each month towards your loan. 
                It includes both the principal amount and the interest, calculated in a way that the total 
                amount is paid off by the end of the loan tenure.
              </p>
            </div>

            {/* Card 2: Factors Affecting EMI */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                Factors Affecting EMI
              </h3>
              <ul className="text-gray-700 space-y-3 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Loan Amount:</strong> Higher principal means higher EMI</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Interest Rate:</strong> Lower rates reduce monthly payments</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Loan Tenure:</strong> Longer tenure means lower EMI but higher total interest</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Credit Score:</strong> Better credit score may qualify you for lower rates</span>
                </li>
              </ul>
            </div>

            {/* Card 3: EMI Formula */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-green-600" />
                EMI Formula
              </h3>
              <div className="text-gray-700 leading-relaxed text-sm sm:text-base">
                <p className="mb-3 font-mono text-sm bg-white/50 rounded-lg p-3">
                  EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>Where:</strong></p>
                  <p>P = Principal loan amount</p>
                  <p>r = Monthly interest rate (annual rate ÷ 12 ÷ 100)</p>
                  <p>n = Total number of months</p>
                </div>
              </div>
            </div>

            {/* Card 4: Tips for Lower EMI */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-orange-600" />
                Tips for Lower EMI
              </h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Improve your credit score before applying</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Compare rates from multiple lenders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Consider a longer tenure if needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Make a larger down payment if possible</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Look for special offers and discounts</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-700/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Apply for Your Loan?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Use our EMI calculator to plan your loan and then apply through our secure platform for quick approval.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button 
                onClick={handleAppDownload}
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download App
              </motion.button>
              <motion.button 
                onClick={handleAppDownload}
                className="border-2 border-white text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
} 