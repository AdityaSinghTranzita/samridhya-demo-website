import Navbar from "@/components/Navbar";
import SIPCalculator from "@/components/SIPCalculator";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Shield, Clock, DollarSign, Target, BarChart3, Calendar } from "lucide-react";
import { handleAppDownload } from "@/utils/appStore";
import { trackEvent, trackButtonClick } from "@/utils/analytics";
import Head from "next/head";

export default function SIPCalculatorPage() {
  return (
    <>
      <Head>
        <title>SIP Calculator - Calculate Systematic Investment Plan Returns | Samridhya</title>
        <meta name="description" content="Use our free SIP calculator to calculate returns on Systematic Investment Plans. Plan your regular investments and see how they grow over time with compound interest." />
        <meta name="keywords" content="SIP calculator, systematic investment plan calculator, mutual fund SIP calculator, investment calculator" />
        <meta property="og:title" content="SIP Calculator - Calculate Systematic Investment Plan Returns | Samridhya" />
        <meta property="og:description" content="Use our free SIP calculator to calculate returns on Systematic Investment Plans." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/calculators/sip-calculator/" />
        <meta name="twitter:title" content="SIP Calculator - Calculate Systematic Investment Plan Returns | Samridhya" />
        <meta name="twitter:description" content="Use our free SIP calculator to calculate returns on Systematic Investment Plans." />
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
      
        {/* Hero Section with Gradient */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Target className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Investment Calculator</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                SIP Calculator
              </h1>
              <p className="text-base sm:text-lg text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                Calculate returns on your Systematic Investment Plans and see how regular monthly investments 
                can grow your wealth over time with the power of compound interest.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SIP Calculator Component */}
        <section className="relative -mt-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SIPCalculator 
              primaryColor="from-emerald-600 to-green-600"
              secondaryColor="from-white to-gray-50"
              accentColor="emerald"
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
                Why Use Our SIP Calculator?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Experience the best SIP calculation tools with advanced features and accurate results
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
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Calculation</h3>
                <p className="text-gray-600">Get your SIP returns instantly with real-time calculations</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Goal Planning</h3>
                <p className="text-gray-600">Plan your financial goals with regular monthly investments</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Detailed Analysis</h3>
                <p className="text-gray-600">Get comprehensive breakdown with year-wise projections</p>
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

        {/* How SIP Works Section */}
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
                How SIP Works
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Understand the power of Systematic Investment Plans and how they can help you build wealth
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
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-emerald-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Regular Investment</h3>
                <p className="text-gray-600">Invest a fixed amount every month at regular intervals</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Rupee Cost Averaging</h3>
                <p className="text-gray-600">Buy more units when prices are low and fewer when high</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-teal-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Compound Growth</h3>
                <p className="text-gray-600">Earn returns on both your investment and accumulated returns</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Benefits of SIP Investment
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Discover why SIP is one of the most popular investment strategies
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
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Affordable Investment</h3>
                    <p className="text-gray-600">Start with as little as ₹500 per month. No need for large lump sum investments.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Rupee Cost Averaging</h3>
                    <p className="text-gray-600">Automatically buy more units when markets are down and fewer when up.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Discipline & Consistency</h3>
                    <p className="text-gray-600">Build a habit of regular investing and stay committed to your financial goals.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Long-term Wealth Creation</h3>
                    <p className="text-gray-600">Benefit from compound interest and create substantial wealth over time.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tips Section */}
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
                SIP Investment Tips
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Maximize your SIP returns with these proven strategies
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6 border border-emerald-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Start Early</h3>
                <p className="text-gray-600 text-sm">The earlier you start SIP, the more time your money has to compound and grow.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-6 border border-green-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Increase SIP Amount</h3>
                <p className="text-gray-600 text-sm">Gradually increase your SIP amount as your income grows to accelerate wealth creation.</p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-6 border border-teal-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Stay Invested</h3>
                <p className="text-gray-600 text-sm">Don't stop SIP during market downturns. Continue investing to benefit from lower prices.</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Diversify</h3>
                <p className="text-gray-600 text-sm">Invest across different mutual fund categories to spread risk and optimize returns.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Review Periodically</h3>
                <p className="text-gray-600 text-sm">Review your SIP portfolio annually and rebalance if needed to align with your goals.</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-3xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Set Clear Goals</h3>
                <p className="text-gray-600 text-sm">Define your financial goals and time horizon to choose the right SIP amount and duration.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Ready to Start Your SIP Journey?
              </h2>
              <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
                Download our mobile app for access to all investment calculators on the go, plus personalized SIP recommendations and portfolio tracking.
              </p>
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center gap-3 bg-white text-emerald-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Target className="w-5 h-5" />
                Download App
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
