'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Calendar, Percent, Target, BarChart3, Clock } from 'lucide-react';
import { trackEvent, trackButtonClick, trackCalculatorUsage } from '@/utils/analytics';

interface SimpleInterestCalculatorProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  id?: string;
}

export default function SimpleInterestCalculator({ 
  primaryColor = "from-blue-600 to-indigo-600",
  secondaryColor = "from-gray-50 to-blue-50",
  accentColor = "blue",
  id
}: SimpleInterestCalculatorProps) {
  // Function to get color classes based on accent color
  const getAccentColors = (color: string) => {
    const colorMap: { [key: string]: { bg: string; icon: string; text: string } } = {
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', text: 'text-blue-800' },
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', text: 'text-indigo-800' },
      green: { bg: 'bg-green-100', icon: 'text-green-600', text: 'text-green-800' },
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', text: 'text-purple-800' },
      emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600', text: 'text-emerald-800' },
      red: { bg: 'bg-red-100', icon: 'text-red-600', text: 'text-red-800' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', text: 'text-orange-800' },
      teal: { bg: 'bg-teal-100', icon: 'text-teal-600', text: 'text-teal-800' },
      pink: { bg: 'bg-pink-100', icon: 'text-pink-600', text: 'text-pink-800' },
      cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600', text: 'text-cyan-800' }
    };
    return colorMap[color] || colorMap.blue;
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

  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [timePeriod, setTimePeriod] = useState(5);
  const [timeUnit, setTimeUnit] = useState('years'); // 'years', 'months', 'days'
  const [showResults, setShowResults] = useState(false);
  
  // Input display states
  const [principalInput, setPrincipalInput] = useState(formatNumber(principal));
  const [interestRateInput, setInterestRateInput] = useState(interestRate.toString());
  const [timePeriodInput, setTimePeriodInput] = useState(timePeriod.toString());

  const calculateSimpleInterest = () => {
    let timeInYears = timePeriod;
    
    // Convert time to years based on selected unit
    if (timeUnit === 'months') {
      timeInYears = timePeriod / 12;
    } else if (timeUnit === 'days') {
      timeInYears = timePeriod / 365;
    }
    
    // Simple Interest formula: SI = P × R × T / 100
    const simpleInterest = (principal * interestRate * timeInYears) / 100;
    const totalAmount = principal + simpleInterest;
    
    // Calculate monthly interest for comparison
    const monthlyInterest = simpleInterest / (timeInYears * 12);
    const dailyInterest = simpleInterest / (timeInYears * 365);
    
    return {
      simpleInterest,
      totalAmount,
      monthlyInterest,
      dailyInterest,
      timeInYears
    };
  };

  const results = calculateSimpleInterest();

  const handleCalculate = () => {
    setShowResults(true);
    trackCalculatorUsage('simple_interest', {
      principal: principal,
      interest_rate: interestRate,
      time_period: timePeriod,
      time_unit: timeUnit,
      simple_interest: results.simpleInterest,
      total_amount: results.totalAmount
    });
    trackButtonClick('calculate_simple_interest', 'simple_interest_calculator', {
      principal: principal,
      interest_rate: interestRate,
      time_period: timePeriod,
      time_unit: timeUnit,
      simple_interest: results.simpleInterest,
      total_amount: results.totalAmount
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
    setInterestRate(numberValue);
    setInterestRateInput(value);
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
    const timeInYears = results.timeInYears;
    
    for (let year = 1; year <= Math.min(Math.ceil(timeInYears), 10); year++) {
      const yearInterest = (principal * interestRate * year) / 100;
      const yearTotal = principal + yearInterest;
      
      breakdown.push({
        year,
        yearInterest,
        yearTotal,
        cumulativeInterest: yearInterest
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
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Simple Interest Calculator</h2>
              <p className="text-gray-600">Calculate simple interest on your investments</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Principal Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Principal Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                <input
                  type="text"
                  value={principalInput}
                  onChange={(e) => handleInputChange(e.target.value, setPrincipal, setPrincipalInput)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter principal amount"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (% per annum)
              </label>
              <div className="relative">
                <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={interestRateInput}
                  onChange={(e) => handleRateChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter interest rate"
                />
              </div>
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={timePeriodInput}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter time period"
                  />
                </div>
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className={`w-full bg-gradient-to-r ${primaryColor} text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              Calculate Simple Interest
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
              className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-6">Simple Interest Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Simple Interest</span>
                  <span className="text-2xl font-bold">{formatCurrency(results.simpleInterest)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Principal Amount</span>
                  <span className="text-lg font-semibold">{formatCurrency(principal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Total Amount</span>
                  <span className="text-lg font-semibold">{formatCurrency(results.totalAmount)}</span>
                </div>
                <div className="pt-4 border-t border-blue-500">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Interest Rate</span>
                    <span className="text-lg font-semibold">{interestRate}% p.a.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Interest Breakdown */}
          {showResults && (
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Interest Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Interest</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(results.monthlyInterest)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Daily Interest</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(results.dailyInterest)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-blue-50 rounded-xl px-4">
                  <span className="text-blue-700 font-semibold">Total Time</span>
                  <span className="font-bold text-lg text-blue-600">
                    {timePeriod} {timeUnit}
                  </span>
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
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(principal)}</div>
                  <div className="text-sm text-gray-600">Principal</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-2xl">
                  <div className="text-2xl font-bold text-indigo-600">{interestRate}%</div>
                  <div className="text-sm text-gray-600">Interest Rate</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(results.simpleInterest)}</div>
                  <div className="text-sm text-gray-600">Interest Earned</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-2xl">
                  <div className="text-2xl font-bold text-purple-600">{formatCurrency(results.totalAmount)}</div>
                  <div className="text-sm text-gray-600">Total Amount</div>
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
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Year-wise Interest Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Year</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Interest Earned</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Amount</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Cumulative Interest</th>
                </tr>
              </thead>
              <tbody>
                {yearlyBreakdown.map((item, index) => (
                  <tr key={item.year} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100`}>
                    <td className="py-3 px-4 font-medium text-gray-900">{item.year}</td>
                    <td className="py-3 px-4 text-right font-medium text-blue-600">{formatCurrency(item.yearInterest)}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{formatCurrency(item.yearTotal)}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{formatCurrency(item.cumulativeInterest)}</td>
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
