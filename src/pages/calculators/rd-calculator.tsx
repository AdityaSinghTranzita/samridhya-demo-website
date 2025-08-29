import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  PiggyBank, 
  Calculator, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Info,
  Percent,
  Clock,
  Download
} from "lucide-react";
import Head from "next/head";

export default function RecurringDepositCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(7.5);
  const [time, setTime] = useState(12);
  const [timeUnit, setTimeUnit] = useState('months');
  const [results, setResults] = useState<any>(null);

  const calculateRD = () => {
    const r = rate / 100;
    let t = time; // Time period in months
    
    // Convert time to months
    if (timeUnit === 'years') {
      t = time * 12;
    } else if (timeUnit === 'days') {
      t = time / 30; // Approximate
    }

    // RD formula: A = P * [((1 + r/n)^(n*t) - 1) / (r/n)]
    // For monthly deposits, n = 12
    const n = 12; // Monthly compounding
    const monthlyRate = r / n;
    const totalMonths = t;
    
    const maturityAmount = monthlyDeposit * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    const totalDeposits = monthlyDeposit * totalMonths;
    const interestEarned = maturityAmount - totalDeposits;
    const effectiveRate = (Math.pow(maturityAmount / totalDeposits, 12/totalMonths) - 1) * 100;

    // Calculate year-wise breakdown
    const breakdown = [];
    for (let year = 1; year <= Math.min(Math.ceil(t/12), 10); year++) {
      const monthsInYear = Math.min(12, t - (year - 1) * 12);
      const yearAmount = monthlyDeposit * 
        ((Math.pow(1 + monthlyRate, year * 12) - 1) / monthlyRate);
      const yearDeposits = monthlyDeposit * Math.min(year * 12, t);
      const yearInterest = yearAmount - yearDeposits;
      breakdown.push({
        year,
        amount: yearAmount,
        deposits: yearDeposits,
        interest: yearInterest,
        growth: ((yearAmount - yearDeposits) / yearDeposits) * 100
      });
    }

    setResults({
      maturityAmount,
      totalDeposits,
      interestEarned,
      effectiveRate,
      breakdown,
      totalMonths
    });
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Recurring Deposit Calculation Results'],
      ['Monthly Deposit', monthlyDeposit.toFixed(2)],
      ['Interest Rate', rate.toFixed(2) + '%'],
      ['Time Period', time + ' ' + timeUnit],
      ['Total Deposits', results.totalDeposits.toFixed(2)],
      ['Maturity Amount', results.maturityAmount.toFixed(2)],
      ['Interest Earned', results.interestEarned.toFixed(2)],
      ['Effective Rate', results.effectiveRate.toFixed(2) + '%'],
      [''],
      ['Year-wise Breakdown'],
      ['Year', 'Amount', 'Total Deposits', 'Interest Earned', 'Growth %'],
      ...results.breakdown.map((row: any) => [
        row.year,
        row.amount.toFixed(2),
        row.deposits.toFixed(2),
        row.interest.toFixed(2),
        row.growth.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recurring-deposit-calculation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Recurring Deposit Calculator - Calculate RD Returns | Samridhya</title>
        <meta name="description" content="Calculate returns on regular monthly deposits with our RD calculator. See how your recurring deposits grow over time with compound interest." />
        <meta name="keywords" content="recurring deposit calculator, RD calculator, monthly deposits, compound interest, savings calculator" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <PiggyBank className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Regular Savings</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Recurring Deposit Calculator
              </h1>
              <p className="text-lg text-purple-100 max-w-3xl mx-auto">
                Calculate returns on regular monthly deposits with our RD calculator. See how your recurring deposits grow over time with compound interest.
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
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">RD Details</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Deposit Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        value={monthlyDeposit}
                        onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="5000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="7.5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Period
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={time}
                          onChange={(e) => setTime(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Unit
                      </label>
                      <select
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateRD}
                  className="w-full mt-8 bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate RD Returns
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
                        <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.maturityAmount.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Maturity Amount</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <PiggyBank className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.interestEarned.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Interest Earned</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.effectiveRate.toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-600">Effective Rate</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <span className="w-8 h-8 text-orange-600 mx-auto mb-3 text-2xl font-bold">₹</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.totalDeposits.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Deposits</div>
                      </div>
                    </div>

                    {/* Growth Breakdown */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Growth Breakdown</h3>
                        <button
                          onClick={downloadResults}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download CSV
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Year</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Amount</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Deposits</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Interest</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Growth %</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.breakdown.map((row: any) => (
                              <tr key={row.year} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-sm text-gray-900">{row.year}</td>
                                <td className="py-3 px-2 text-sm text-gray-900">₹{row.amount.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-blue-600">₹{row.deposits.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-green-600">₹{row.interest.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-purple-600">{row.growth.toFixed(2)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Investment Summary */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Total Deposits</span>
                          <span className="font-semibold text-gray-900">₹{results.totalDeposits.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Interest Earned</span>
                          <span className="font-semibold text-green-600">+₹{results.interestEarned.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">Maturity Amount</span>
                          <span className="font-semibold text-purple-600">₹{results.maturityAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Tips Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-600" />
                    RD Investment Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Regular Deposits</div>
                        <div className="text-sm text-gray-600">Make deposits on time to maximize returns</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Longer Tenure</div>
                        <div className="text-sm text-gray-600">Longer RD periods generally offer better rates</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Auto-debit</div>
                        <div className="text-sm text-gray-600">Set up auto-debit to avoid missing deposits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
