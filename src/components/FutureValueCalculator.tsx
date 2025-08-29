'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Calendar, Percent, Target, BarChart3, Clock } from 'lucide-react';
import { trackEvent, trackButtonClick, trackCalculatorUsage } from '@/utils/analytics';

interface FutureValueCalculatorProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  id?: string;
}

export default function FutureValueCalculator({ 
  primaryColor = "from-teal-600 to-cyan-600",
  secondaryColor = "from-gray-50 to-teal-50",
  accentColor = "teal",
  id
}: FutureValueCalculatorProps) {
  // Function to get color classes based on accent color
  const getAccentColors = (color: string) => {
    const colorMap: { [key: string]: { bg: string; icon: string; text: string } } = {
      teal: { bg: 'bg-teal-100', icon: 'text-teal-600', text: 'text-teal-800' },
      cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600', text: 'text-cyan-800' },
      green: { bg: 'bg-green-100', icon: 'text-green-600', text: 'text-green-800' },
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', text: 'text-blue-800' },
      emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600', text: 'text-emerald-800' },
      red: { bg: 'bg-red-100', icon: 'text-red-600', text: 'text-red-800' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', text: 'text-orange-800' },
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', text: 'text-purple-800' },
      pink: { bg: 'bg-pink-100', icon: 'text-pink-600', text: 'text-pink-800' },
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', text: 'text-indigo-800' }
    };
    return colorMap[color] || colorMap.teal;
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

  const [presentValue, setPresentValue] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [timePeriod, setTimePeriod] = useState(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState(12); // Monthly
  const [showResults, setShowResults] = useState(false);
  
  // Input display states
  const [presentValueInput, setPresentValueInput] = useState(formatNumber(presentValue));
  const [interestRateInput, setInterestRateInput] = useState(interestRate.toString());
  const [timePeriodInput, setTimePeriodInput] = useState(timePeriod.toString());

  const calculateFutureValue = () => {
    const r = interestRate / 100;
    const n = compoundingFrequency;
    const t = timePeriod;
    
    // Future Value formula: FV = PV × (1 + r/n)^(n×t)
    const futureValue = presentValue * Math.pow(1 + r / n, n * t);
    const totalInterest = futureValue - presentValue;
    
    // Calculate effective annual rate
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;
    
    // Calculate year-wise breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= Math.min(timePeriod, 10); year++) {
      const yearValue = presentValue * Math.pow(1 + r / n, n * year);
      const yearInterest = yearValue - presentValue;
      yearlyBreakdown.push({
        year,
        value: yearValue,
        interest: yearInterest
      });
    }
    
    return {
      futureValue,
      totalInterest,
      effectiveRate,
      yearlyBreakdown
    };
  };

  const results = calculateFutureValue();

  const handleCalculate = () => {
    setShowResults(true);
    trackCalculatorUsage('future_value', {
      present_value: presentValue,
      interest_rate: interestRate,
      time_period: timePeriod,
      compounding_frequency: compoundingFrequency,
      future_value: results.futureValue,
      total_interest: results.totalInterest
    });
    trackButtonClick('calculate_future_value', 'future_value_calculator', {
      present_value: presentValue,
      interest_rate: interestRate,
      time_period: timePeriod,
      compounding_frequency: compoundingFrequency,
      future_value: results.futureValue,
      total_interest: results.totalInterest
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

  const compoundingOptions = [
    { value: 1, label: 'Annually (1x per year)' },
    { value: 2, label: 'Semi-annually (2x per year)' },
    { value: 4, label: 'Quarterly (4x per year)' },
    { value: 12, label: 'Monthly (12x per year)' },
    { value: 365, label: 'Daily (365x per year)' }
  ];

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
              <h2 className="text-2xl font-bold text-gray-900">Future Value Calculator</h2>
              <p className="text-gray-600">Calculate the future value of your investments</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Present Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Present Value (Current Investment)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                <input
                  type="text"
                  value={presentValueInput}
                  onChange={(e) => handleInputChange(e.target.value, setPresentValue, setPresentValueInput)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter present value"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={interestRateInput}
                  onChange={(e) => handleRateChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter interest rate"
                />
              </div>
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period (Years)
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={timePeriodInput}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter time period"
                />
              </div>
            </div>

            {/* Compounding Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compounding Frequency
              </label>
              <select
                value={compoundingFrequency}
                onChange={(e) => setCompoundingFrequency(parseInt(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
              >
                {compoundingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className={`w-full bg-gradient-to-r ${primaryColor} text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              Calculate Future Value
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
              className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-6">Future Value Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-teal-100">Future Value</span>
                  <span className="text-2xl font-bold">{formatCurrency(results.futureValue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-teal-100">Present Value</span>
                  <span className="text-lg font-semibold">{formatCurrency(presentValue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-teal-100">Total Interest</span>
                  <span className="text-lg font-semibold">{formatCurrency(results.totalInterest)}</span>
                </div>
                <div className="pt-4 border-t border-teal-500">
                  <div className="flex justify-between items-center">
                    <span className="text-teal-100">Effective Annual Rate</span>
                    <span className="text-lg font-semibold">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Growth Analysis */}
          {showResults && (
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Growth Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className="font-semibold text-gray-900">{((results.futureValue / presentValue - 1) * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Annual Growth</span>
                  <span className="font-semibold text-gray-900">{((results.futureValue / presentValue) ** (1 / timePeriod) - 1) * 100}%</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-teal-50 rounded-xl px-4">
                  <span className="text-teal-700 font-semibold">Compounding</span>
                  <span className="font-bold text-lg text-teal-600">
                    {compoundingFrequency}x per year
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
                <div className="text-center p-4 bg-teal-50 rounded-2xl">
                  <div className="text-2xl font-bold text-teal-600">{formatCurrency(presentValue)}</div>
                  <div className="text-sm text-gray-600">Present Value</div>
                </div>
                <div className="text-center p-4 bg-cyan-50 rounded-2xl">
                  <div className="text-2xl font-bold text-cyan-600">{interestRate}%</div>
                  <div className="text-sm text-gray-600">Interest Rate</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600">{timePeriod} Years</div>
                  <div className="text-sm text-gray-600">Time Period</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-2xl">
                  <div className="text-2xl font-bold text-purple-600">{formatCurrency(results.totalInterest)}</div>
                  <div className="text-sm text-gray-600">Interest Earned</div>
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
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Year-wise Growth Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Year</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Future Value</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Interest Earned</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Growth %</th>
                </tr>
              </thead>
              <tbody>
                {results.yearlyBreakdown.map((item, index) => (
                  <tr key={item.year} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100`}>
                    <td className="py-3 px-4 font-medium text-gray-900">{item.year}</td>
                    <td className="py-3 px-4 text-right font-medium text-teal-600">{formatCurrency(item.value)}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{formatCurrency(item.interest)}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{((item.value / presentValue - 1) * 100).toFixed(2)}%</td>
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
