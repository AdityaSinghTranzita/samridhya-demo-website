import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Calculator, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Target,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Percent,
  Clock,
  PiggyBank
} from "lucide-react";
import Head from "next/head";
import CTA from "@/components/CTA";

export default function RefinanceCalculator() {
  const [currentLoan, setCurrentLoan] = useState({
    balance: 200000,
    rate: 6.5,
    term: 30,
    monthlyPayment: 1264
  });

  const [newLoan, setNewLoan] = useState({
    rate: 5.5,
    term: 30,
    closingCosts: 3000
  });

  const [results, setResults] = useState<any>(null);

  const calculateRefinance = () => {
    const currentRate = currentLoan.rate / 100;
    const newRate = newLoan.rate / 100;
    const currentMonthlyRate = currentRate / 12;
    const newMonthlyRate = newRate / 12;
    const currentTotalPayments = currentLoan.term * 12;
    const newTotalPayments = newLoan.term * 12;

    // Calculate new monthly payment
    const newMonthlyPayment = (currentLoan.balance * newMonthlyRate * Math.pow(1 + newMonthlyRate, newTotalPayments)) / 
                             (Math.pow(1 + newMonthlyRate, newTotalPayments) - 1);

    // Calculate remaining payments on current loan
    const currentRemainingPayments = currentTotalPayments - Math.floor((Date.now() - Date.now()) / (1000 * 60 * 60 * 24 * 30));
    const currentTotalRemaining = currentLoan.monthlyPayment * currentRemainingPayments;

    // Calculate total cost of new loan
    const newTotalCost = (newMonthlyPayment * newTotalPayments) + newLoan.closingCosts;

    // Calculate savings
    const monthlySavings = currentLoan.monthlyPayment - newMonthlyPayment;
    const totalSavings = currentTotalRemaining - newTotalCost;
    const breakEvenMonths = newLoan.closingCosts / monthlySavings;

    // Calculate interest savings
    const currentTotalInterest = currentTotalRemaining - currentLoan.balance;
    const newTotalInterest = (newMonthlyPayment * newTotalPayments) - currentLoan.balance;
    const interestSavings = currentTotalInterest - newTotalInterest;

    setResults({
      newMonthlyPayment,
      monthlySavings,
      totalSavings,
      breakEvenMonths,
      interestSavings,
      newTotalCost,
      currentTotalRemaining
    });
  };

  return (
    <>
      <Head>
        <title>Refinance Calculator - Compare Loan Refinancing Options | Samridhya</title>
        <meta name="description" content="Compare your current loan with refinancing options. Calculate potential savings, break-even point, and see if refinancing makes financial sense." />
        <meta name="keywords" content="refinance calculator, loan refinancing, mortgage refinance, refinance savings, break-even analysis" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Loan Analysis</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Refinance Calculator
              </h1>
              <p className="text-lg text-indigo-100 max-w-3xl mx-auto">
                Compare your current loan with refinancing options. Calculate potential savings and see if refinancing makes financial sense.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Current Loan */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                    Current Loan
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Remaining Balance
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={currentLoan.balance}
                          onChange={(e) => setCurrentLoan({...currentLoan, balance: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="200000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Interest Rate (%)
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          step="0.1"
                          value={currentLoan.rate}
                          onChange={(e) => setCurrentLoan({...currentLoan, rate: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="6.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Remaining Term (Years)
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={currentLoan.term}
                          onChange={(e) => setCurrentLoan({...currentLoan, term: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Monthly Payment
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={currentLoan.monthlyPayment}
                          onChange={(e) => setCurrentLoan({...currentLoan, monthlyPayment: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="1264"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Loan */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    New Loan
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Interest Rate (%)
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          step="0.1"
                          value={newLoan.rate}
                          onChange={(e) => setNewLoan({...newLoan, rate: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="5.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Term (Years)
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={newLoan.term}
                          onChange={(e) => setNewLoan({...newLoan, term: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Closing Costs
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={newLoan.closingCosts}
                          onChange={(e) => setNewLoan({...newLoan, closingCosts: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="3000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateRefinance}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate Refinance Savings
                </button>
              </motion.div>

              {/* Results Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {results && (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <span className="w-8 h-8 text-green-600 mx-auto mb-3 text-2xl font-bold">₹</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.monthlySavings.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Monthly Savings</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.totalSavings.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Savings</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.breakEvenMonths.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600">Break-even Months</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <PiggyBank className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.interestSavings.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Interest Savings</div>
                      </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Loan Comparison</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Monthly Payment</span>
                          <div className="flex items-center gap-4">
                            <span className="text-red-600 font-semibold">₹{currentLoan.monthlyPayment.toFixed(0)}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <span className="text-green-600 font-semibold">₹{results.newMonthlyPayment.toFixed(0)}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Interest Rate</span>
                          <div className="flex items-center gap-4">
                            <span className="text-red-600 font-semibold">{currentLoan.rate}%</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <span className="text-green-600 font-semibold">{newLoan.rate}%</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Total Cost</span>
                          <div className="flex items-center gap-4">
                            <span className="text-red-600 font-semibold">₹{results.currentTotalRemaining.toFixed(0)}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <span className="text-green-600 font-semibold">₹{results.newTotalCost.toFixed(0)}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">Net Savings</span>
                          <span className="text-green-600 font-bold text-lg">${results.totalSavings.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className={`rounded-3xl p-8 border ${
                      results.totalSavings > 0 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        {results.totalSavings > 0 ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        )}
                        Recommendation
                      </h3>
                      <p className="text-gray-700">
                        {results.totalSavings > 0 
                          ? `Refinancing could save you $${results.totalSavings.toFixed(0)} over the life of the loan. You'll break even in ${results.breakEvenMonths.toFixed(1)} months.`
                          : `Refinancing would cost you $${Math.abs(results.totalSavings).toFixed(0)} more than keeping your current loan. Consider other options.`
                        }
                      </p>
                    </div>
                  </>
                )}

                {/* Tips Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-600" />
                    Refinancing Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Break-even Analysis</div>
                        <div className="text-sm text-gray-600">Consider how long it will take to recoup closing costs</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Rate Difference</div>
                        <div className="text-sm text-gray-600">A 1% rate reduction can save thousands over the loan term</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Closing Costs</div>
                        <div className="text-sm text-gray-600">Include all fees: appraisal, title, origination, and taxes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <CTA />
      </div>
    </>
  );
}
