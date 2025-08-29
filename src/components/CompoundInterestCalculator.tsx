'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Calendar, Percent, Target, BarChart3 } from 'lucide-react';
import { trackEvent, trackButtonClick, trackCalculatorUsage } from '@/utils/analytics';

interface CompoundInterestCalculatorProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  id?: string;
}

export default function CompoundInterestCalculator({ 
  primaryColor = "from-green-600 to-emerald-600",
  secondaryColor = "from-gray-50 to-green-50",
  accentColor = "green",
  id
}: CompoundInterestCalculatorProps) {
  // Function to get color classes based on accent color
  const getAccentColors = (color: string) => {
    const colorMap: { [key: string]: { bg: string; icon: string; text: string } } = {
      green: { bg: 'bg-green-100', icon: 'text-green-600', text: 'text-green-800' },
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', text: 'text-blue-800' },
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', text: 'text-purple-800' },
      emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600', text: 'text-emerald-800' },
      red: { bg: 'bg-red-100', icon: 'text-red-600', text: 'text-red-800' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', text: 'text-orange-800' },
      pink: { bg: 'bg-pink-100', icon: 'text-pink-600', text: 'text-pink-800' },
      teal: { bg: 'bg-teal-100', icon: 'text-teal-600', text: 'text-teal-800' },
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', text: 'text-indigo-800' },
      cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600', text: 'text-cyan-800' }
    };
    return colorMap[color] || colorMap.green;
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
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [interestRate, setInterestRate] = useState(8);
  const [timePeriod, setTimePeriod] = useState(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState(12); // Monthly
  const [showResults, setShowResults] = useState(false);
  
  // Input display states
  const [principalInput, setPrincipalInput] = useState(formatNumber(principal));
  const [monthlyContributionInput, setMonthlyContributionInput] = useState(formatNumber(monthlyContribution));
  const [interestRateInput, setInterestRateInput] = useState(interestRate.toString());
  const [timePeriodInput, setTimePeriodInput] = useState(timePeriod.toString());

  const calculateCompoundInterest = () => {
    const r = interestRate / 100 / compoundingFrequency;
    const t = timePeriod * compoundingFrequency;
    
    // Future value of principal
    const futureValuePrincipal = principal * Math.pow(1 + r, t);
    
    // Future value of monthly contributions
    const futureValueContributions = monthlyContribution * 
      ((Math.pow(1 + r, t) - 1) / r) * (compoundingFrequency / 12);
    
    const totalAmount = futureValuePrincipal + futureValueContributions;
    const totalContributions = principal + (monthlyContribution * timePeriod * 12);
    const totalInterest = totalAmount - totalContributions;
    
    return {
      totalAmount,
      totalContributions,
      totalInterest,
      futureValuePrincipal,
      futureValueContributions
    };
  };

  const results = calculateCompoundInterest();

  const handleCalculate = () => {
    setShowResults(true);
    trackCalculatorUsage('compound_interest', {
      principal: principal,
      monthly_contribution: monthlyContribution,
      interest_rate: interestRate,
      time_period: timePeriod,
      compounding_frequency: compoundingFrequency,
      total_amount: results.totalAmount,
      total_interest: results.totalInterest
    });
    trackButtonClick('calculate_compound_interest', 'compound_interest_calculator', {
      principal: principal,
      monthly_contribution: monthlyContribution,
      interest_rate: interestRate,
      time_period: timePeriod,
      total_amount: results.totalAmount,
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
    { value: 1, label: 'Annually' },
    { value: 2, label: 'Semi-annually' },
    { value: 4, label: 'Quarterly' },
    { value: 12, label: 'Monthly' },
    { value: 365, label: 'Daily' }
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
              <h2 className="text-2xl font-bold text-gray-900">Compound Interest Calculator</h2>
              <p className="text-gray-600">Calculate how your investments grow over time</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Principal Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Investment (Principal)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                <input
                  type="text"
                  value={principalInput}
                  onChange={(e) => handleInputChange(e.target.value, setPrincipal, setPrincipalInput)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter principal amount"
                />
              </div>
            </div>

            {/* Monthly Contribution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Contribution (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                <input
                  type="text"
                  value={monthlyContributionInput}
                  onChange={(e) => handleInputChange(e.target.value, setMonthlyContribution, setMonthlyContributionInput)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter monthly contribution"
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
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
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
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
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
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
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
              Calculate Compound Interest
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
              className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-6">Investment Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Total Investment Value</span>
                  <span className="text-2xl font-bold">{formatCurrency(results.totalAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Total Contributions</span>
                  <span className="text-lg font-semibold">{formatCurrency(results.totalContributions)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Total Interest Earned</span>
                  <span className="text-lg font-semibold">{formatCurrency(results.totalInterest)}</span>
                </div>
                <div className="pt-4 border-t border-green-500">
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Interest Rate</span>
                    <span className="text-lg font-semibold">{interestRate}% p.a.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Detailed Breakdown */}
          {showResults && (
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Initial Investment</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(principal)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Future Value of Principal</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(results.futureValuePrincipal)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Total Monthly Contributions</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(monthlyContribution * timePeriod * 12)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Future Value of Contributions</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(results.futureValueContributions)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-green-50 rounded-xl px-4">
                  <span className="text-green-700 font-semibold">Interest Earned</span>
                  <span className="text-green-700 font-bold text-lg">{formatCurrency(results.totalInterest)}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Key Insights */}
          {showResults && (
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Your investment will grow <span className="font-semibold text-gray-900">
                        {(results.totalAmount / results.totalContributions - 1) * 100}%
                      </span> over {timePeriod} years
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Interest earned represents <span className="font-semibold text-gray-900">
                        {((results.totalInterest / results.totalAmount) * 100).toFixed(1)}%
                      </span> of your total investment value
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Monthly contributions add <span className="font-semibold text-gray-900">
                        {formatCurrency(monthlyContribution * timePeriod * 12)}
                      </span> to your investment
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
