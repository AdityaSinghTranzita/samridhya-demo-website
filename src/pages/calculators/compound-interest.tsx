import Navbar from "@/components/Navbar";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Shield, Clock, DollarSign, Target, BarChart3 } from "lucide-react";
import { handleAppDownload } from "@/utils/appStore";
import { trackEvent, trackButtonClick } from "@/utils/analytics";
import Head from "next/head";

export default function CompoundInterestCalculatorPage() {
  return (
    <>
      <Head>
        <title>Compound Interest Calculator - Calculate Investment Growth | Samridhya</title>
        <meta name="description" content="Use our free compound interest calculator to see how your investments grow over time. Calculate future value with regular contributions and different compounding frequencies." />
        <meta name="keywords" content="compound interest calculator, investment calculator, future value calculator, investment growth calculator" />
        <meta property="og:title" content="Compound Interest Calculator - Calculate Investment Growth | Samridhya" />
        <meta property="og:description" content="Use our free compound interest calculator to see how your investments grow over time." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/calculators/compound-interest/" />
        <meta name="twitter:title" content="Compound Interest Calculator - Calculate Investment Growth | Samridhya" />
        <meta name="twitter:description" content="Use our free compound interest calculator to see how your investments grow over time." />
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
      
        {/* Hero Section with Gradient */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Investment Calculator</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Compound Interest Calculator
              </h1>
              <p className="text-base sm:text-lg text-green-100 max-w-3xl mx-auto leading-relaxed">
                Discover the power of compound interest and see how your investments grow over time. 
                Calculate future value with regular contributions and different compounding frequencies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Compound Interest Calculator Component */}
        <section className="relative -mt-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CompoundInterestCalculator 
              primaryColor="from-green-600 to-emerald-600"
              secondaryColor="from-white to-gray-50"
              accentColor="green"
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
                Why Use Our Compound Interest Calculator?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Experience the best investment calculation tools with advanced features and accurate results
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Calculation</h3>
                <p className="text-gray-600">Get your investment growth projections instantly with real-time calculations</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Goal Planning</h3>
                <p className="text-gray-600">Plan your investment goals with regular monthly contributions</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Detailed Analysis</h3>
                <p className="text-gray-600">Get comprehensive breakdown of principal, contributions, and interest earned</p>
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

        {/* How It Works Section */}
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
                How Compound Interest Works
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Understand the power of compound interest and how it can accelerate your wealth creation
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
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Initial Investment</h3>
                <p className="text-gray-600">Start with your principal amount that earns interest over time</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-emerald-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Interest Accumulation</h3>
                <p className="text-gray-600">Interest earned is reinvested, creating a snowball effect</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-teal-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Exponential Growth</h3>
                <p className="text-gray-600">Your money grows faster as time progresses due to compounding</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Investment Tips for Better Returns
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Maximize your investment potential with these proven strategies
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
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Early</h3>
                    <p className="text-gray-600">The earlier you start investing, the more time your money has to compound. Even small amounts can grow significantly over decades.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Regular Contributions</h3>
                    <p className="text-gray-600">Consistent monthly investments can significantly boost your final portfolio value through dollar-cost averaging.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Diversify Your Portfolio</h3>
                    <p className="text-gray-600">Spread your investments across different asset classes to reduce risk and potentially increase returns.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Stay Invested</h3>
                    <p className="text-gray-600">Avoid frequent trading and stay invested for the long term to benefit from compound interest and market growth.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                Download our mobile app for access to all investment calculators on the go, plus personalized investment recommendations and portfolio tracking.
              </p>
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
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
