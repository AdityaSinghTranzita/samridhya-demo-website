import Navbar from "@/components/Navbar";
import EMICalculator from "@/components/EMICalculator";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Shield, Clock, DollarSign, Building2 } from "lucide-react";
import { handleAppDownload } from "@/utils/appStore";
import Head from "next/head";

export default function BusinessLoanCalculatorPage() {
  return (
    <>
      <Head>
        <title>Business Loan Calculator - Calculate Business Loan EMI | Samridhya</title>
        <meta name="description" content="Use our free business loan calculator to calculate business loan EMI online. Get instant EMI, total interest and repayment schedule for MSME and enterprise loans." />
        <meta name="keywords" content="business loan calculator, msme loan calculator, business loan emi" />
        <meta property="og:title" content="Business Loan Calculator - Calculate Business Loan EMI | Samridhya" />
        <meta property="og:description" content="Calculate business loan EMI, total interest and repayment schedule instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/calculators/business-loan-calculator/" />
        <meta name="twitter:title" content="Business Loan Calculator - Calculate Business Loan EMI | Samridhya" />
        <meta name="twitter:description" content="Calculate business loan EMI, total interest and repayment schedule instantly." />
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Building2 className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Business Loan Calculator</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Business Loan EMI Calculator
              </h1>
              <p className="text-base sm:text-lg text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                Calculate your business loan EMI, total interest and repayment schedule. Plan MSME and working capital loans with accurate, instant results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="relative -mt-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EMICalculator
              loanType="Business"
              minAmount={100000}
              maxAmount={5000000}
              minTenure={12}
              maxTenure={60}
              minRate={12.99}
              maxRate={28.99}
              primaryColor="from-emerald-600 to-teal-600"
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
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Why Use Our Business Loan Calculator?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Professional-grade EMI calculations tailored for business needs like working capital and expansion
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
                <p className="text-gray-600">Real-time EMI computation with accurate industry formula</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Detailed Breakdown</h3>
                <p className="text-gray-600">See total interest, principal and schedule for better planning</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Compare Tenures</h3>
                <p className="text-gray-600">Evaluate different terms from 12 to 60 months</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Free</h3>
                <p className="text-gray-600">Use without sign-up; your inputs are not stored</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Ready to Apply for a Business Loan?
              </h2>
              <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
                Download our mobile app to explore offers, compare rates and track your application.
              </p>
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center gap-3 bg-white text-emerald-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <DollarSign className="w-5 h-5" />
                Download App
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}


