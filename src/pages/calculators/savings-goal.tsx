import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Target, 
  Calculator, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Info,
  Percent,
  Clock,
  PiggyBank,
  Download
} from "lucide-react";
import Head from "next/head";
import CTA from "@/components/CTA";

export default function SavingsGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState(100000);
  const [currentSavings, setCurrentSavings] = useState(10000);
  const [timeToGoal, setTimeToGoal] = useState(5);
  const [timeUnit, setTimeUnit] = useState('years');
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [results, setResults] = useState<any>(null);

  const calculateSavingsGoal = () => {
    let timeInYears = timeToGoal;
    
    // Convert time to years
    if (timeUnit === 'months') {
      timeInYears = timeToGoal / 12;
    } else if (timeUnit === 'days') {
      timeInYears = timeToGoal / 365;
    }

    const r = expectedReturn / 100;
    const monthlyRate = r / 12;
    const totalMonths = timeInYears * 12;
    
    // Calculate future value of current savings
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + r, timeInYears);
    
    // Calculate required additional savings
    const additionalAmountNeeded = goalAmount - futureValueOfCurrentSavings;
    
    // Calculate monthly savings needed
    let monthlySavings = 0;
    if (additionalAmountNeeded > 0) {
      monthlySavings = additionalAmountNeeded / 
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    }
    
    const totalSavings = monthlySavings * totalMonths;
    const totalInterest = goalAmount - currentSavings - totalSavings;
    const totalContribution = currentSavings + totalSavings;

    // Calculate year-wise breakdown
    const breakdown = [];
    for (let year = 1; year <= Math.min(Math.ceil(timeInYears), 10); year++) {
      const yearCurrentSavings = currentSavings * Math.pow(1 + r, year);
      const yearMonthlySavings = monthlySavings * 12 * year;
      const yearTotal = yearCurrentSavings + yearMonthlySavings;
      breakdown.push({
        year,
        currentSavings: yearCurrentSavings,
        monthlySavings: yearMonthlySavings,
        total: yearTotal,
        remaining: Math.max(0, goalAmount - yearTotal)
      });
    }

    setResults({
      futureValueOfCurrentSavings,
      additionalAmountNeeded,
      monthlySavings,
      totalSavings,
      totalInterest,
      totalContribution,
      breakdown,
      timeInYears
    });
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Savings Goal Calculation Results'],
      ['Goal Amount', goalAmount.toFixed(2)],
      ['Current Savings', currentSavings.toFixed(2)],
      ['Time to Goal', timeToGoal + ' ' + timeUnit],
      ['Expected Return', expectedReturn.toFixed(2) + '%'],
      ['Monthly Savings Needed', results.monthlySavings.toFixed(2)],
      ['Total Additional Savings', results.totalSavings.toFixed(2)],
      ['Total Interest Earned', results.totalInterest.toFixed(2)],
      [''],
      ['Year-wise Breakdown'],
      ['Year', 'Current Savings Value', 'Monthly Savings', 'Total Value', 'Remaining Goal'],
      ...results.breakdown.map((row: any) => [
        row.year,
        row.currentSavings.toFixed(2),
        row.monthlySavings.toFixed(2),
        row.total.toFixed(2),
        row.remaining.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'savings-goal-calculation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Savings Goal Calculator - Plan Your Financial Goals | Samridhya</title>
        <meta name="description" content="Plan how much to save monthly to reach your financial goals. Calculate required savings and see your progress over time." />
        <meta name="keywords" content="savings goal calculator, financial planning, monthly savings, goal planning, investment planning" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Target className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Goal Planning</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Savings Goal Calculator
              </h1>
              <p className="text-lg text-teal-100 max-w-3xl mx-auto">
                Plan how much to save monthly to reach your financial goals. Calculate required savings and see your progress over time.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Goal Details</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goal Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="100000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Savings
                    </label>
                    <div className="relative">
                      <PiggyBank className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="10000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time to Goal
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={timeToGoal}
                          onChange={(e) => setTimeToGoal(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="5"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        step="0.1"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="8"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateSavingsGoal}
                  className="w-full mt-8 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate Savings Plan
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
                        <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.monthlySavings.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Monthly Savings Needed</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${goalAmount.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Goal Amount</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.totalInterest.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Interest Earned</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <PiggyBank className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.totalContribution.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Contribution</div>
                      </div>
                    </div>

                    {/* Progress Summary */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Progress Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Current Savings</span>
                          <span className="font-semibold text-gray-900">${currentSavings.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Future Value of Current Savings</span>
                          <span className="font-semibold text-blue-600">${results.futureValueOfCurrentSavings.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Additional Amount Needed</span>
                          <span className="font-semibold text-green-600">${results.additionalAmountNeeded.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">Monthly Savings Required</span>
                          <span className="font-semibold text-purple-600">${results.monthlySavings.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Breakdown */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Progress Breakdown</h3>
                        <button
                          onClick={downloadResults}
                          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
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
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Current Savings</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Monthly Savings</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Total Value</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Remaining</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.breakdown.map((row: any) => (
                              <tr key={row.year} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-sm text-gray-900">{row.year}</td>
                                <td className="py-3 px-2 text-sm text-gray-900">${row.currentSavings.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-blue-600">${row.monthlySavings.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-green-600">${row.total.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-purple-600">${row.remaining.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {/* Tips Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-600" />
                    Savings Goal Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Start Early</div>
                        <div className="text-sm text-gray-600">The earlier you start, the less you need to save monthly</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Automate Savings</div>
                        <div className="text-sm text-gray-600">Set up automatic transfers to ensure consistent savings</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Review Regularly</div>
                        <div className="text-sm text-gray-600">Check your progress and adjust your plan as needed</div>
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
