'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Calendar, Percent, Target, BarChart3, Clock } from 'lucide-react';
import { trackEvent, trackButtonClick, trackCalculatorUsage } from '@/utils/analytics';

interface SIPCalculatorProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  id?: string;
}

export default function SIPCalculator({ 
  primaryColor = "from-emerald-600 to-green-600",
  secondaryColor = "from-gray-50 to-emerald-50",
  accentColor = "emerald",
  id
}: SIPCalculatorProps) {
  // Function to get color classes based on accent color
  const getAccentColors = (color: string) => {
    const colorMap: { [key: string]: { bg: string; icon: string; text: string } } = {
      emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600', text: 'text-emerald-800' },
      green: { bg: 'bg-green-100', icon: 'text-green-600', text: 'text-green-800' },
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', text: 'text-blue-800' },
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', text: 'text-purple-800' },
      red: { bg: 'bg-red-100', icon: 'text-red-600', text: 'text-red-800' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', text: 'text-orange-800' },
      pink: { bg: 'bg-pink-100', icon: 'text-pink-600', text: 'text-pink-800' },
      teal: { bg: 'bg-teal-100', icon: 'text-teal-600', text: 'text-teal-800' },
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', text: 'text-indigo-800' },
      cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600', text: 'text-cyan-800' }
    };
    return colorMap[color] || colorMap.emerald;
  };

  const accentColors = getAccentColors(accentColor);
  
  // Define formatNumber function
  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(amount));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [showResults, setShowResults] = useState(false);
  
  // Input display states
  const [monthlyInvestmentInput, setMonthlyInvestmentInput] = useState(formatNumber(monthlyInvestment));
  const [expectedReturnInput, setExpectedReturnInput] = useState(expectedReturn.toString());
  const [timePeriodInput, setTimePeriodInput] = useState(timePeriod.toString());

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = timePeriod * 12;
    
    // SIP formula: FV = P × (((1 + r)^n - 1) / r) × (1 + r)
    const futureValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const totalInvestment = monthlyInvestment * totalMonths;
    const totalReturns = futureValue - totalInvestment;
    const absoluteReturn = (totalReturns / totalInvestment) * 100;
    
    return {
      futureValue,
      totalInvestment,
      totalReturns,
      absoluteReturn,
      monthlyRate,
      totalMonths
    };
  };

  const results = calculateSIP();

  const handleCalculate = () => {
    setShowResults(true);
    trackCalculatorUsage('sip', {
      monthly_investment: monthlyInvestment,
      expected_return: expectedReturn,
      time_period: timePeriod,
      future_value: results.futureValue,
      total_returns: results.totalReturns,
      absolute_return: results.absoluteReturn
    });
    trackButtonClick('calculate_sip', 'sip_calculator', {
      monthly_investment: monthlyInvestment,
      expected_return: expectedReturn,
      time_period: timePeriod,
      future_value: results.futureValue,
      total_returns: results.totalReturns
    });
  };

  const handleInputChange = (value: string, setter: (value: number) => void, inputSetter: (value: string) => void) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const numberValue = numericValue ? parseInt(numericValue) : 0;
    setter(numberValue);
    inputSetter(value);
  };

  const handleRateChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const numberValue = numericValue ? parseFloat(numericValue) : 0;
    setExpectedReturn(numberValue);
    setExpectedReturnInput(value);
  };

  const handleTimeChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const numberValue = numericValue ? parseInt(numericValue) : 0;
    setTimePeriod(numberValue);
    setTimePeriodInput(value);
  };

  // Generate year-wise breakdown
  const generateYearlyBreakdown = () => {
    const breakdown = [];
    for (let year = 1; year <= timePeriod; year++) {
      const months = year * 12;
      const monthlyRate = expectedReturn / 100 / 12;
      const yearEndValue = monthlyInvestment * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
        (1 + monthlyRate);
      const totalInvested = monthlyInvestment * months;
      const yearReturns = yearEndValue - totalInvested;
      
      breakdown.push({
        year,
        totalInvested,
        yearEndValue,
        yearReturns
      });
    }
    return breakdown;
  };

  const yearlyBreakdown = generateYearlyBreakdown();

  return (
    <div className="max-w-6xl mx-auto" id={id}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-12 h-12 bg-gradient-to-br ${primaryColor} rounded-2xl flex items-center justify-center`}>
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">SIP Calculator</h2>
              <p className="text-gray-600">Calculate returns on Systematic Investment Plans</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Monthly Investment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Investment Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                <input
                  type="text"
                  value={monthlyInvestmentInput}
                  onChange={(e) => handleInputChange(e.target.value, setMonthlyInvestment, setMonthlyInvestmentInput)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter monthly investment"
                />
              </div>
            </div>

            {/* Expected Return */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Annual Return (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={expectedReturnInput}
                  onChange={(e) => handleRateChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter expected return"
                />
              </div>
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Period (Years)
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={timePeriodInput}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter time period"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className={`w-full bg-gradient-to-r ${primaryColor} text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              Calculate SIP Returns
            </button>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Summary Card */}
          {showResults && (
            <motion.div
              className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-3xl p-8 text-white shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-6">SIP Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100">Maturity Amount</span>
                  <span className="text-2xl font-bold">{formatCurrency(results.futureValue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100">Total Investment</span>
                  <span className="text-lg font-semibold">{formatCurrency(results.totalInvestment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100">Total Returns</span>
                  <span className="text-lg font-semibold">{formatCurrency(results.totalReturns)}</span>
                </div>
                <div className="pt-4 border-t border-emerald-500">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-100">Absolute Return</span>
                    <span className="text-lg font-semibold">{results.absoluteReturn.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Key Metrics */}
          {showResults && (
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-2xl">
                  <div className="text-2xl font-bold text-emerald-600">{formatCurrency(monthlyInvestment)}</div>
                  <div className="text-sm text-gray-600">Monthly Investment</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600">{expectedReturn}%</div>
                  <div className="text-sm text-gray-600">Expected Return</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-600">{timePeriod} Years</div>
                  <div className="text-sm text-gray-600">Investment Period</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-2xl">
                  <div className="text-2xl font-bold text-purple-600">{results.totalMonths}</div>
                  <div className="text-sm text-gray-600">Total Months</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Insights */}
          {showResults && (
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Investment Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Your monthly investment of <span className="font-semibold text-gray-900">
                        {formatCurrency(monthlyInvestment)}
                      </span> will grow to <span className="font-semibold text-gray-900">
                        {formatCurrency(results.futureValue)}
                      </span> in {timePeriod} years
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">
                      You'll earn <span className="font-semibold text-gray-900">
                        {formatCurrency(results.totalReturns)}
                      </span> in returns, which is <span className="font-semibold text-gray-900">
                        {results.absoluteReturn.toFixed(1)}%
                      </span> of your total investment
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Total investment over {timePeriod} years: <span className="font-semibold text-gray-900">
                        {formatCurrency(results.totalInvestment)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Yearly Breakdown Table */}
      {showResults && (
        <motion.div
          className="mt-12 bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Year-wise Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Year</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Invested</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Year End Value</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Returns</th>
                </tr>
              </thead>
              <tbody>
                {yearlyBreakdown.map((item, index) => (
                  <tr key={item.year} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100`}>
                    <td className="py-3 px-4 font-medium text-gray-900">{item.year}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{formatCurrency(item.totalInvested)}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{formatCurrency(item.yearEndValue)}</td>
                    <td className="py-3 px-4 text-right font-medium text-emerald-600">{formatCurrency(item.yearReturns)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
