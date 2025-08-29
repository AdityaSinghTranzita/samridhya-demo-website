'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Wallet, Calendar, Percent, Target, BarChart3, TrendingUp } from 'lucide-react';
import { trackEvent, trackButtonClick, trackCalculatorUsage } from '@/utils/analytics';

interface PersonalLoanCalculatorProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  id?: string;
}

export default function PersonalLoanCalculator({ 
  primaryColor = "from-purple-600 to-pink-600",
  secondaryColor = "from-gray-50 to-purple-50",
  accentColor = "purple",
  id
}: PersonalLoanCalculatorProps) {
  // Function to get color classes based on accent color
  const getAccentColors = (color: string) => {
    const colorMap: { [key: string]: { bg: string; icon: string; text: string } } = {
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', text: 'text-purple-800' },
      pink: { bg: 'bg-pink-100', icon: 'text-pink-600', text: 'text-pink-800' },
      green: { bg: 'bg-green-100', icon: 'text-green-600', text: 'text-green-800' },
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', text: 'text-blue-800' },
      emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600', text: 'text-emerald-800' },
      red: { bg: 'bg-red-100', icon: 'text-red-600', text: 'text-red-800' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', text: 'text-orange-800' },
      teal: { bg: 'bg-teal-100', icon: 'text-teal-600', text: 'text-teal-800' },
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', text: 'text-indigo-800' },
      cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600', text: 'text-cyan-800' }
    };
    return colorMap[color] || colorMap.purple;
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

  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(12.5);
  const [loanTerm, setLoanTerm] = useState(3);
  const [processingFee, setProcessingFee] = useState(2);
  const [showResults, setShowResults] = useState(false);
  
  // Input display states
  const [loanAmountInput, setLoanAmountInput] = useState(formatNumber(loanAmount));
  const [interestRateInput, setInterestRateInput] = useState(interestRate.toString());
  const [loanTermInput, setLoanTermInput] = useState(loanTerm.toString());
  const [processingFeeInput, setProcessingFeeInput] = useState(processingFee.toString());

  const calculatePersonalLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;
    
    // EMI formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;
    const processingFeeAmount = (loanAmount * processingFee) / 100;
    const totalCost = totalPayment + processingFeeAmount;
    
    // Calculate affordability
    const monthlyIncome = 80000; // Assuming ₹80K monthly income
    const maxEMI = monthlyIncome * 0.4; // 40% of monthly income
    const affordability = maxEMI / emi * 100;
    
    return {
      emi,
      totalPayment,
      totalInterest,
      processingFeeAmount,
      totalCost,
      affordability,
      monthlyRate,
      totalMonths
    };
  };

  const results = calculatePersonalLoan();

  const handleCalculate = () => {
    setShowResults(true);
    trackCalculatorUsage('personal_loan', {
      loan_amount: loanAmount,
      interest_rate: interestRate,
      loan_term: loanTerm,
      processing_fee: processingFee,
      emi: results.emi,
      total_interest: results.totalInterest
    });
    trackButtonClick('calculate_personal_loan', 'personal_loan_calculator', {
      loan_amount: loanAmount,
      interest_rate: interestRate,
      loan_term: loanTerm,
      processing_fee: processingFee,
      emi: results.emi,
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
    setLoanTerm(numberValue);
    setLoanTermInput(value);
  };

  const handleFeeChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const numberValue = numericValue ? parseFloat(numericValue) : 0;
    setProcessingFee(numberValue);
    setProcessingFeeInput(value);
  };

  // Generate year-wise breakdown
  const generateYearlyBreakdown = () => {
    const breakdown = [];
    let remainingBalance = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    
    for (let year = 1; year <= loanTerm; year++) {
      const yearStartBalance = remainingBalance;
      let yearInterest = 0;
      let yearPrincipal = 0;
      
      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = results.emi - interestPayment;
        
        yearInterest += interestPayment;
        yearPrincipal += principalPayment;
        remainingBalance -= principalPayment;
      }
      
      breakdown.push({
        year,
        yearStartBalance,
        yearEndBalance: remainingBalance,
        yearInterest,
        yearPrincipal,
        totalPaid: yearInterest + yearPrincipal
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
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Personal Loan Calculator</h2>
              <p className="text-gray-600">Calculate personal loan EMI and total cost</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                <input
                  type="text"
                  value={loanAmountInput}
                  onChange={(e) => handleInputChange(e.target.value, setLoanAmount, setLoanAmountInput)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter loan amount"
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
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter interest rate"
                />
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (Years)
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={loanTermInput}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter loan term"
                />
              </div>
            </div>

            {/* Processing Fee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Processing Fee (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={processingFeeInput}
                  onChange={(e) => handleFeeChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter processing fee"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className={`w-full bg-gradient-to-r ${primaryColor} text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              Calculate Personal Loan
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
              className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-6">Personal Loan Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Monthly EMI</span>
                  <span className="text-2xl font-bold">{formatCurrency(results.emi)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Total Interest</span>
                  <span className="text-lg font-semibold">{formatCurrency(results.totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Processing Fee</span>
                  <span className="text-lg font-semibold">{formatCurrency(results.processingFeeAmount)}</span>
                </div>
                <div className="pt-4 border-t border-purple-500">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-100">Total Cost</span>
                    <span className="text-lg font-semibold">{formatCurrency(results.totalCost)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Affordability Analysis */}
          {showResults && (
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Affordability Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Monthly EMI</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(results.emi)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Recommended Max EMI</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(32000)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-purple-50 rounded-xl px-4">
                  <span className="text-purple-700 font-semibold">Affordability Score</span>
                  <span className={`font-bold text-lg ${results.affordability > 100 ? 'text-red-600' : 'text-purple-600'}`}>
                    {results.affordability > 100 ? 'High Risk' : 'Good'}
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
                <div className="text-center p-4 bg-purple-50 rounded-2xl">
                  <div className="text-2xl font-bold text-purple-600">{formatCurrency(loanAmount)}</div>
                  <div className="text-sm text-gray-600">Loan Amount</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-2xl">
                  <div className="text-2xl font-bold text-pink-600">{interestRate}%</div>
                  <div className="text-sm text-gray-600">Interest Rate</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-600">{loanTerm} Years</div>
                  <div className="text-sm text-gray-600">Loan Term</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600">{results.totalMonths}</div>
                  <div className="text-sm text-gray-600">Total Months</div>
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
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Starting Balance</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Principal Paid</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Interest Paid</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Ending Balance</th>
                </tr>
              </thead>
              <tbody>
                {yearlyBreakdown.map((item, index) => (
                  <tr key={item.year} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100`}>
                    <td className="py-3 px-4 font-medium text-gray-900">{item.year}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{formatCurrency(item.yearStartBalance)}</td>
                    <td className="py-3 px-4 text-right font-medium text-purple-600">{formatCurrency(item.yearPrincipal)}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{formatCurrency(item.yearInterest)}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{formatCurrency(item.yearEndBalance)}</td>
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
