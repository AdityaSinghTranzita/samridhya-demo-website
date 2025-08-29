import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Users, 
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
  Download,
  AlertCircle
} from "lucide-react";
import Head from "next/head";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [inflationRate, setInflationRate] = useState(3);
  const [monthlyExpenses, setMonthlyExpenses] = useState(5000);
  const [results, setResults] = useState<any>(null);

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    
    // Calculate future value of current savings
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + expectedReturn/100, yearsToRetirement);
    
    // Calculate future value of monthly contributions
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = yearsToRetirement * 12;
    const futureValueOfContributions = monthlyContribution * 
      (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    
    // Total retirement corpus
    const totalCorpus = futureValueOfCurrentSavings + futureValueOfContributions;
    
    // Calculate required monthly expenses in retirement (adjusted for inflation)
    const inflationAdjustedMonthlyExpenses = monthlyExpenses * 
      Math.pow(1 + inflationRate/100, yearsToRetirement);
    
    // Calculate required corpus for retirement expenses
    const requiredCorpus = inflationAdjustedMonthlyExpenses * 12 * yearsInRetirement;
    
    // Calculate shortfall or surplus
    const shortfall = Math.max(0, requiredCorpus - totalCorpus);
    const surplus = Math.max(0, totalCorpus - requiredCorpus);
    
    // Calculate additional monthly savings needed
    let additionalMonthlySavings = 0;
    if (shortfall > 0) {
      additionalMonthlySavings = shortfall / 
        (Math.pow(1 + monthlyRate, totalMonths) - 1) * monthlyRate;
    }
    
    // Generate year-wise breakdown
    const breakdown = [];
    for (let year = 1; year <= Math.min(yearsToRetirement, 10); year++) {
      const yearCurrentSavings = currentSavings * Math.pow(1 + expectedReturn/100, year);
      const yearContributions = monthlyContribution * 12 * year;
      const yearTotal = yearCurrentSavings + yearContributions;
      breakdown.push({
        year,
        currentAge: currentAge + year,
        currentSavings: yearCurrentSavings,
        contributions: yearContributions,
        total: yearTotal
      });
    }

    setResults({
      yearsToRetirement,
      yearsInRetirement,
      totalCorpus,
      requiredCorpus,
      shortfall,
      surplus,
      additionalMonthlySavings,
      inflationAdjustedMonthlyExpenses,
      breakdown
    });
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Year', 'Age', 'Current Savings', 'Contributions', 'Total Corpus'],
      ...results.breakdown.map((row: any) => [
        row.year,
        row.currentAge,
        row.currentSavings.toFixed(2),
        row.contributions.toFixed(2),
        row.total.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'retirement-planning-breakdown.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Retirement Calculator - Plan Your Retirement Savings | Samridhya</title>
        <meta name="description" content="Plan your retirement savings and estimate the retirement corpus needed. Calculate required monthly savings and see your retirement readiness." />
        <meta name="keywords" content="retirement calculator, retirement planning, retirement corpus, retirement savings, financial planning" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-600 via-red-600 to-pink-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Users className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Retirement Planning</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Retirement Calculator
              </h1>
              <p className="text-lg text-orange-100 max-w-3xl mx-auto">
                Plan your retirement savings and estimate the retirement corpus needed. Calculate required monthly savings and see your retirement readiness.
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
                {/* Personal Information */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Age
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={currentAge}
                          onChange={(e) => setCurrentAge(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Retirement Age
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={retirementAge}
                          onChange={(e) => setRetirementAge(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="65"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Life Expectancy
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={lifeExpectancy}
                          onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="85"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Expenses (Retirement)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={monthlyExpenses}
                          onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="5000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Information</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Retirement Savings
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={currentSavings}
                          onChange={(e) => setCurrentSavings(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="50000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Contribution
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={monthlyContribution}
                          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="1000"
                        />
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="8"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inflation Rate (%)
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          step="0.1"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateRetirement}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate Retirement Plan
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
                          ${results.totalCorpus.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Corpus</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <span className="w-8 h-8 text-blue-600 mx-auto mb-3 text-2xl font-bold">₹</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.requiredCorpus.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Required Corpus</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.yearsToRetirement}
                        </div>
                        <div className="text-sm text-gray-600">Years to Retirement</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <PiggyBank className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.inflationAdjustedMonthlyExpenses.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Monthly Expenses (Retirement)</div>
                      </div>
                    </div>

                    {/* Retirement Status */}
                    <div className={`rounded-3xl p-8 border ${
                      results.shortfall > 0 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        {results.shortfall > 0 ? (
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        ) : (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                        Retirement Status
                      </h3>
                      {results.shortfall > 0 ? (
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            You have a shortfall of <span className="font-bold text-red-600">${results.shortfall.toFixed(0)}</span> in your retirement corpus.
                          </p>
                          <p className="text-gray-700">
                            To bridge this gap, you need to save an additional <span className="font-bold text-red-600">${results.additionalMonthlySavings.toFixed(0)}</span> per month.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            Congratulations! You have a surplus of <span className="font-bold text-green-600">${results.surplus.toFixed(0)}</span> in your retirement corpus.
                          </p>
                          <p className="text-gray-700">
                            You're on track for a comfortable retirement!
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Savings Breakdown */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Savings Growth (First 10 Years)</h3>
                        <button
                          onClick={downloadResults}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Age</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Current Savings</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Contributions</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.breakdown.map((row: any) => (
                              <tr key={row.year} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-sm text-gray-900">{row.year}</td>
                                <td className="py-3 px-2 text-sm text-gray-900">{row.currentAge}</td>
                                <td className="py-3 px-2 text-sm text-gray-900">${row.currentSavings.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-green-600">${row.contributions.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-blue-600">${row.total.toFixed(2)}</td>
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
                    Retirement Planning Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Start Early</div>
                        <div className="text-sm text-gray-600">The earlier you start saving, the more time compound interest has to work</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Consider Inflation</div>
                        <div className="text-sm text-gray-600">Your retirement expenses will likely be higher due to inflation</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Diversify Investments</div>
                        <div className="text-sm text-gray-600">Don't put all your retirement savings in one type of investment</div>
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
