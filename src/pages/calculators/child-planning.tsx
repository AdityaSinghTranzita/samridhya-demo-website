import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Baby, 
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
  PiggyBank,
  Download
} from "lucide-react";
import Head from "next/head";
import CTA from "@/components/CTA";

export default function ChildPlanningCalculator() {
  const [childAge, setChildAge] = useState(5);
  const [educationGoal, setEducationGoal] = useState(500000);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [results, setResults] = useState<any>(null);

  const calculateChildPlanning = () => {
    const r = expectedReturn / 100;
    const inflation = inflationRate / 100;
    
    // Calculate years until education goal (assuming 18 years for college)
    const yearsToGoal = 18 - childAge;
    
    // Calculate inflation-adjusted goal amount
    const inflationAdjustedGoal = educationGoal * Math.pow(1 + inflation, yearsToGoal);
    
    // Calculate future value of current savings
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + r, yearsToGoal);
    
    // Calculate additional amount needed
    const additionalAmountNeeded = inflationAdjustedGoal - futureValueOfCurrentSavings;
    
    // Calculate monthly savings needed
    let monthlySavings = 0;
    if (additionalAmountNeeded > 0) {
      const monthlyRate = r / 12;
      const totalMonths = yearsToGoal * 12;
      monthlySavings = additionalAmountNeeded / 
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    }
    
    const totalSavings = monthlySavings * yearsToGoal * 12;
    const totalInterest = inflationAdjustedGoal - currentSavings - totalSavings;
    const totalContribution = currentSavings + totalSavings;

    // Calculate year-wise breakdown
    const breakdown = [];
    for (let year = 1; year <= Math.min(yearsToGoal, 15); year++) {
      const yearCurrentSavings = currentSavings * Math.pow(1 + r, year);
      const yearMonthlySavings = monthlySavings * 12 * year;
      const yearTotal = yearCurrentSavings + yearMonthlySavings;
      const yearInflationAdjustedGoal = educationGoal * Math.pow(1 + inflation, year);
      breakdown.push({
        year,
        childAge: childAge + year,
        currentSavings: yearCurrentSavings,
        monthlySavings: yearMonthlySavings,
        total: yearTotal,
        goal: yearInflationAdjustedGoal,
        remaining: Math.max(0, yearInflationAdjustedGoal - yearTotal)
      });
    }

    setResults({
      yearsToGoal,
      inflationAdjustedGoal,
      futureValueOfCurrentSavings,
      additionalAmountNeeded,
      monthlySavings,
      totalSavings,
      totalInterest,
      totalContribution,
      breakdown
    });
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Child Future Planning Calculation Results'],
      ['Child Age', childAge + ' years'],
      ['Education Goal', educationGoal.toFixed(2)],
      ['Current Savings', currentSavings.toFixed(2)],
      ['Expected Return', expectedReturn.toFixed(2) + '%'],
      ['Inflation Rate', inflationRate.toFixed(2) + '%'],
      ['Years to Goal', results.yearsToGoal + ' years'],
      ['Inflation Adjusted Goal', results.inflationAdjustedGoal.toFixed(2)],
      ['Monthly Savings Needed', results.monthlySavings.toFixed(2)],
      ['Total Additional Savings', results.totalSavings.toFixed(2)],
      ['Total Interest Earned', results.totalInterest.toFixed(2)],
      [''],
      ['Year-wise Breakdown'],
      ['Year', 'Child Age', 'Current Savings Value', 'Monthly Savings', 'Total Value', 'Goal Amount', 'Remaining'],
      ...results.breakdown.map((row: any) => [
        row.year,
        row.childAge,
        row.currentSavings.toFixed(2),
        row.monthlySavings.toFixed(2),
        row.total.toFixed(2),
        row.goal.toFixed(2),
        row.remaining.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'child-planning-calculation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Child Future Planning Calculator - Plan Your Child's Education | Samridhya</title>
        <meta name="description" content="Plan for your child's future education and expenses. Calculate required savings and see your progress over time with inflation adjustment." />
        <meta name="keywords" content="child planning calculator, education planning, child future expenses, education savings, inflation adjustment" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Baby className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Child's Future</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Child Future Planning Calculator
              </h1>
              <p className="text-lg text-pink-100 max-w-3xl mx-auto">
                Plan for your child's future education and expenses. Calculate required savings and see your progress over time with inflation adjustment.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Child Details</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Child's Current Age
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        max="17"
                        value={childAge}
                        onChange={(e) => setChildAge(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education Goal Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        value={educationGoal}
                        onChange={(e) => setEducationGoal(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="500000"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="50000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Return (%)
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          step="0.1"
                          value={expectedReturn}
                          onChange={(e) => setExpectedReturn(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inflation Rate (%)
                      </label>
                      <div className="relative">
                        <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          step="0.1"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateChildPlanning}
                  className="w-full mt-8 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
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
                        <span className="w-8 h-8 text-green-600 mx-auto mb-3 text-2xl font-bold">₹</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.monthlySavings.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Monthly Savings Needed</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.inflationAdjustedGoal.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Inflation Adjusted Goal</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.yearsToGoal}
                        </div>
                        <div className="text-sm text-gray-600">Years to Goal</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.totalInterest.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Interest Earned</div>
                      </div>
                    </div>

                    {/* Progress Summary */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Planning Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Original Goal</span>
                          <span className="font-semibold text-gray-900">${educationGoal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Inflation Adjusted Goal</span>
                          <span className="font-semibold text-blue-600">${results.inflationAdjustedGoal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Future Value of Current Savings</span>
                          <span className="font-semibold text-green-600">${results.futureValueOfCurrentSavings.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">Additional Amount Needed</span>
                          <span className="font-semibold text-purple-600">${results.additionalAmountNeeded.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Breakdown */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Progress Breakdown</h3>
                        <button
                          onClick={downloadResults}
                          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
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
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Child Age</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Total Value</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Goal Amount</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Remaining</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.breakdown.map((row: any) => (
                              <tr key={row.year} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-sm text-gray-900">{row.year}</td>
                                <td className="py-3 px-2 text-sm text-gray-900">{row.childAge}</td>
                                <td className="py-3 px-2 text-sm text-green-600">${row.total.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-blue-600">${row.goal.toFixed(2)}</td>
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
                    Child Planning Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Start Early</div>
                        <div className="text-sm text-gray-600">The earlier you start, the more time compound interest has to work</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Consider Inflation</div>
                        <div className="text-sm text-gray-600">Education costs typically rise faster than general inflation</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Review Annually</div>
                        <div className="text-sm text-gray-600">Adjust your plan as your child grows and goals change</div>
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
