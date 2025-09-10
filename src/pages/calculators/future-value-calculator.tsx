import Navbar from "@/components/Navbar";
import FutureValueCalculator from "@/components/FutureValueCalculator";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Shield, Clock, DollarSign, Target, BarChart3 } from "lucide-react";
import { handleAppDownload } from "@/utils/appStore";
import { trackEvent, trackButtonClick } from "@/utils/analytics";
import Head from "next/head";

export default function FutureValueCalculatorPage() {
  return (
    <>
      <Head>
        <title>Future Value Calculator - Calculate Investment Growth | Samridhya</title>
        <meta name="description" content="Use our free future value calculator to calculate how your investments will grow over time. Plan your financial future with compound interest calculations." />
        <meta name="keywords" content="future value calculator, investment growth calculator, compound interest calculator" />
        <meta property="og:title" content="Future Value Calculator - Calculate Investment Growth | Samridhya" />
        <meta property="og:description" content="Use our free future value calculator to calculate how your investments will grow over time." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/calculators/future-value-calculator/" />
        <meta name="twitter:title" content="Future Value Calculator - Calculate Investment Growth | Samridhya" />
        <meta name="twitter:description" content="Use our free future value calculator to calculate how your investments will grow over time." />
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
      
        {/* Hero Section with Gradient */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Future Value Calculator</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Future Value Calculator
              </h1>
              <p className="text-base sm:text-lg text-teal-100 max-w-3xl mx-auto leading-relaxed">
                Calculate how your investments will grow over time with compound interest. 
                Plan your financial future and understand the power of time value of money.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Future Value Calculator Component */}
        <section className="relative -mt-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FutureValueCalculator 
              primaryColor="from-teal-600 to-cyan-600"
              secondaryColor="from-white to-gray-50"
              accentColor="teal"
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
                Why Use Our Future Value Calculator?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Experience the best future value calculation tools with advanced features and accurate results
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
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Calculation</h3>
                <p className="text-gray-600">Get future value calculations instantly with real-time processing</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Multiple Compounding</h3>
                <p className="text-gray-600">Calculate with different compounding frequencies</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth Analysis</h3>
                <p className="text-gray-600">Get detailed year-wise growth breakdown</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Free</h3>
                <p className="text-gray-600">All calculations are completely free with no hidden charges</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How Future Value Works Section */}
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
                How Future Value Works
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Understand the future value formula and the power of compound interest
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
                <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-teal-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Present Value</h3>
                <p className="text-gray-600">The current amount you want to invest</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-cyan-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Interest Rate</h3>
                <p className="text-gray-600">Annual rate of return on your investment</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Time Period</h3>
                <p className="text-gray-600">Duration for which you'll invest the money</p>
              </div>
            </motion.div>

            {/* Formula Section */}
            <motion.div
              className="mt-16 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Future Value Formula</h3>
                <div className="bg-white rounded-2xl p-6 shadow-lg inline-block">
                  <p className="text-xl font-mono text-teal-600">
                    FV = PV × (1 + r/n)^(n×t)
                  </p>
                </div>
                <p className="text-gray-600 mt-4">
                  Where: FV = Future Value, PV = Present Value, r = Annual interest rate, n = Compounding frequency, t = Time in years
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Investment Planning Tips
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Make informed decisions with these future value investment tips
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
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Early</h3>
                    <p className="text-gray-600">The earlier you start investing, the more time your money has to grow through compound interest.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Higher Interest Rates</h3>
                    <p className="text-gray-600">Even small increases in interest rates can significantly impact your future value over time.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Longer Time Horizon</h3>
                    <p className="text-gray-600">Longer investment periods allow compound interest to work its magic more effectively.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Regular Contributions</h3>
                    <p className="text-gray-600">Consider adding regular contributions to maximize your investment growth potential.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Ready to Plan Your Financial Future?
              </h2>
              <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
                Download our mobile app for access to all investment calculators on the go, plus personalized investment recommendations and portfolio tracking.
              </p>
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center gap-3 bg-white text-teal-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <TrendingUp className="w-5 h-5" />
                Download App
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
