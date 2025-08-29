'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Calendar, Percent, Hash } from 'lucide-react';
import { trackEvent, trackButtonClick, trackCalculatorUsage } from '@/utils/analytics';

interface EMICalculatorProps {
  loanType: string;
  minAmount?: number;
  maxAmount?: number;
  minTenure?: number;
  maxTenure?: number;
  minRate?: number;
  maxRate?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  id?: string;
}

export default function EMICalculator({ 
  loanType, 
  minAmount = 50000, 
  maxAmount = 1000000, 
  minTenure = 12, 
  maxTenure = 84, 
  minRate = 10.99, 
  maxRate = 24.99,
  primaryColor = "from-blue-600 to-purple-600",
  secondaryColor = "from-gray-50 to-blue-50",
  accentColor = "blue",
  id
}: EMICalculatorProps) {
  // Function to get color classes based on accent color
  const getAccentColors = (color: string) => {
    const colorMap: { [key: string]: { bg: string; icon: string; text: string } } = {
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', text: 'text-blue-800' },
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', text: 'text-purple-800' },
      emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600', text: 'text-emerald-800' },
      red: { bg: 'bg-red-100', icon: 'text-red-600', text: 'text-red-800' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', text: 'text-orange-800' },
      pink: { bg: 'bg-pink-100', icon: 'text-pink-600', text: 'text-pink-800' },
      teal: { bg: 'bg-teal-100', icon: 'text-teal-600', text: 'text-teal-800' },
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', text: 'text-indigo-800' },
      cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600', text: 'text-cyan-800' },
      green: { bg: 'bg-green-100', icon: 'text-green-600', text: 'text-green-800' }
    };
    return colorMap[color] || colorMap.blue;
  };

  const accentColors = getAccentColors(accentColor);
  // Define formatNumber function before using it in state
  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  const [loanAmount, setLoanAmount] = useState(minAmount);
  const [tenure, setTenure] = useState(minTenure);
  const [interestRate, setInterestRate] = useState(minRate);
  const [showResults, setShowResults] = useState(false);
  
  // Input display states for better typing experience
  const [loanAmountInput, setLoanAmountInput] = useState(formatNumber(minAmount));
  const [tenureInput, setTenureInput] = useState(minTenure.toString());
  const [interestRateInput, setInterestRateInput] = useState(minRate.toString());

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100; // Monthly interest rate
    const time = tenure;
    
    const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;

  const handleCalculate = () => {
    setShowResults(true);
    // Track EMI calculation
    trackCalculatorUsage('emi', {
      loan_amount: loanAmount,
      interest_rate: interestRate,
      loan_tenure: tenure,
      emi_amount: emi,
      total_amount: totalAmount,
      total_interest: totalInterest,
      loan_type: loanType
    });
    trackButtonClick('calculate_emi', 'emi_calculator', {
      loan_amount: loanAmount,
      interest_rate: interestRate,
      loan_tenure: tenure,
      emi_amount: emi,
      total_amount: totalAmount,
      total_interest: totalInterest
    });
  };

  const handleLoanAmountChange = (value: string) => {
    // Allow typing freely - just update the display
    setLoanAmountInput(value);
    
    // Only update the actual value if it's a valid number within range
    const cleanValue = value.replace(/[^\d]/g, '');
    const numValue = parseInt(cleanValue);
    
    if (!isNaN(numValue) && numValue >= minAmount && numValue <= maxAmount) {
      setLoanAmount(numValue);
    }
  };

  const handleLoanAmountBlur = () => {
    // Format and validate when user leaves the field
    const cleanValue = loanAmountInput.replace(/[^\d]/g, '');
    const numValue = parseInt(cleanValue);
    
    if (!isNaN(numValue)) {
      if (numValue >= minAmount && numValue <= maxAmount) {
        setLoanAmount(numValue);
        setLoanAmountInput(formatNumber(numValue));
      } else if (numValue > maxAmount) {
        setLoanAmount(maxAmount);
        setLoanAmountInput(formatNumber(maxAmount));
      } else if (numValue < minAmount) {
        setLoanAmount(minAmount);
        setLoanAmountInput(formatNumber(minAmount));
      }
    } else {
      // If invalid input, reset to current value
      setLoanAmountInput(formatNumber(loanAmount));
    }
  };

  const handleTenureChange = (value: string) => {
    // Allow typing freely
    setTenureInput(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= minTenure && numValue <= maxTenure) {
      setTenure(numValue);
    }
  };

  const handleTenureBlur = () => {
    const numValue = parseInt(tenureInput);
    if (!isNaN(numValue)) {
      if (numValue >= minTenure && numValue <= maxTenure) {
        setTenure(numValue);
        setTenureInput(numValue.toString());
      } else if (numValue > maxTenure) {
        setTenure(maxTenure);
        setTenureInput(maxTenure.toString());
      } else if (numValue < minTenure) {
        setTenure(minTenure);
        setTenureInput(minTenure.toString());
      }
    } else {
      setTenureInput(tenure.toString());
    }
  };

  const handleRateChange = (value: string) => {
    // Allow typing freely
    setInterestRateInput(value);
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= minRate && numValue <= maxRate) {
      setInterestRate(numValue);
    }
  };

  const handleRateBlur = () => {
    const numValue = parseFloat(interestRateInput);
    if (!isNaN(numValue)) {
      if (numValue >= minRate && numValue <= maxRate) {
        setInterestRate(numValue);
        setInterestRateInput(numValue.toString());
      } else if (numValue > maxRate) {
        setInterestRate(maxRate);
        setInterestRateInput(maxRate.toString());
      } else if (numValue < minRate) {
        setInterestRate(minRate);
        setInterestRateInput(minRate.toString());
      }
    } else {
      setInterestRateInput(interestRate.toString());
    }
  };

  return (
    <section id={id} className={`relative py-16 sm:py-20 bg-gradient-to-br ${secondaryColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={`inline-flex items-center gap-3 ${accentColors.bg} rounded-full px-6 py-3 mb-6`}>
            <Calculator className={`w-6 h-6 ${accentColors.icon}`} />
            <span className={`${accentColors.text} font-semibold`}>EMI Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Calculate Your {loanType} EMI
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Use our EMI calculator to estimate your monthly payments and plan your loan repayment effectively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Calculator Form */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Loan Details</h3>
            
            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-3">
                  Loan Amount
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold text-base">₹</span>
                    <input
                      type="text"
                      value={loanAmountInput}
                      onChange={(e) => handleLoanAmountChange(e.target.value)}
                      onBlur={handleLoanAmountBlur}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 font-medium"
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <input
                    type="range"
                    min={minAmount}
                    max={maxAmount}
                    step={10000}
                    value={loanAmount}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setLoanAmount(value);
                      setLoanAmountInput(formatNumber(value));
                    }}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>₹{formatNumber(minAmount)}</span>
                    <span className={`font-semibold ${accentColors.icon}`}>₹{formatNumber(loanAmount)}</span>
                    <span>₹{formatNumber(maxAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-3">
                  Loan Tenure (Months)
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="number"
                      value={tenureInput}
                      onChange={(e) => handleTenureChange(e.target.value)}
                      onBlur={handleTenureBlur}
                      min={minTenure}
                      max={maxTenure}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 font-medium"
                      placeholder="Enter tenure in months"
                    />
                  </div>
                  <input
                    type="range"
                    min={minTenure}
                    max={maxTenure}
                    step={12}
                    value={tenure}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setTenure(value);
                      setTenureInput(value.toString());
                    }}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>{minTenure} months</span>
                    <span className={`font-semibold ${accentColors.icon}`}>{tenure} months</span>
                    <span>{maxTenure} months</span>
                  </div>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-3">
                  Interest Rate (% p.a.)
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="number"
                      value={interestRateInput}
                      onChange={(e) => handleRateChange(e.target.value)}
                      onBlur={handleRateBlur}
                      min={minRate}
                      max={maxRate}
                      step={0.1}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 font-medium"
                      placeholder="Enter interest rate"
                    />
                  </div>
                  <input
                    type="range"
                    min={minRate}
                    max={maxRate}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setInterestRate(value);
                      setInterestRateInput(value.toString());
                    }}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>{minRate}%</span>
                    <span className={`font-semibold ${accentColors.icon}`}>{interestRate}%</span>
                    <span>{maxRate}%</span>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <motion.button
                onClick={handleCalculate}
                className={`w-full bg-gradient-to-r ${primaryColor} text-white py-4 px-6 rounded-2xl font-semibold text-base hover:shadow-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calculator className="w-5 h-5" />
                Calculate EMI
              </motion.button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            className={`bg-gradient-to-br ${primaryColor} rounded-3xl p-6 sm:p-8 text-white shadow-xl`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Hash className="w-6 h-6" />
              EMI Breakdown
            </h3>
            
            {showResults ? (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-center">
                    <p className="text-white/90 text-xs mb-2 flex items-center justify-center gap-2 font-medium">
                      <span className="text-base">₹</span>
                      Monthly EMI
                    </p>
                    <p className="text-2xl font-bold text-white">₹{formatNumber(emi)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/90 text-xs mb-1 flex items-center gap-2 font-medium">
                      <TrendingUp className="w-4 h-4" />
                      Total Interest
                    </p>
                    <p className="text-lg font-semibold text-white">₹{formatNumber(totalInterest)}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/90 text-xs mb-1 flex items-center gap-2 font-medium">
                      <span className="text-base">₹</span>
                      Total Amount
                    </p>
                    <p className="text-lg font-semibold text-white">₹{formatNumber(totalAmount)}</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white/90 text-sm mb-2 flex items-center gap-2 font-medium">
                    <Calculator className="w-4 h-4" />
                    Loan Summary
                  </p>
                  <div className="space-y-2 text-sm text-white/90">
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <span className="font-semibold text-white">₹{formatNumber(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate:</span>
                      <span className="font-semibold text-white">{interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loan Tenure:</span>
                      <span className="font-semibold text-white">{tenure} months</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 mx-auto mb-4 text-white/60" />
                <p className="text-white/90 font-medium">Click "Calculate EMI" to see your monthly payment breakdown</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-gray-600 text-sm">
            * EMI calculation is for illustration purposes only. Actual EMI may vary based on your credit profile and lender terms.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
} 