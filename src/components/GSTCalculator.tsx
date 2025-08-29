'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Receipt, Percent, FileText, TrendingUp, BarChart3 } from 'lucide-react';
import { trackEvent, trackButtonClick, trackCalculatorUsage } from '@/utils/analytics';

interface GSTCalculatorProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  id?: string;
}

export default function GSTCalculator({ 
  primaryColor = "from-purple-600 to-indigo-600",
  secondaryColor = "from-gray-50 to-purple-50",
  accentColor = "purple",
  id
}: GSTCalculatorProps) {
  // Function to get color classes based on accent color
  const getAccentColors = (color: string) => {
    const colorMap: { [key: string]: { bg: string; icon: string; text: string } } = {
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', text: 'text-purple-800' },
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', text: 'text-indigo-800' },
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', text: 'text-blue-800' },
      green: { bg: 'bg-green-100', icon: 'text-green-600', text: 'text-green-800' },
      red: { bg: 'bg-red-100', icon: 'text-red-600', text: 'text-red-800' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', text: 'text-orange-800' },
      pink: { bg: 'bg-pink-100', icon: 'text-pink-600', text: 'text-pink-800' },
      teal: { bg: 'bg-teal-100', icon: 'text-teal-600', text: 'text-teal-800' },
      cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600', text: 'text-cyan-800' },
      emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600', text: 'text-emerald-800' }
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

  const [amount, setAmount] = useState(1000);
  const [gstRate, setGstRate] = useState(18);
  const [calculationType, setCalculationType] = useState('exclusive'); // 'exclusive' or 'inclusive'
  const [showResults, setShowResults] = useState(false);
  
  // Input display states
  const [amountInput, setAmountInput] = useState(formatNumber(amount));
  const [gstRateInput, setGstRateInput] = useState(gstRate.toString());

  const calculateGST = () => {
    let baseAmount, gstAmount, totalAmount;
    
    if (calculationType === 'exclusive') {
      // GST is added to the base amount
      baseAmount = amount;
      gstAmount = (amount * gstRate) / 100;
      totalAmount = baseAmount + gstAmount;
    } else {
      // GST is included in the total amount
      totalAmount = amount;
      baseAmount = (amount * 100) / (100 + gstRate);
      gstAmount = totalAmount - baseAmount;
    }
    
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    
    return {
      baseAmount,
      gstAmount,
      totalAmount,
      cgst,
      sgst
    };
  };

  const results = calculateGST();

  const handleCalculate = () => {
    setShowResults(true);
    trackCalculatorUsage('gst', {
      amount: amount,
      gst_rate: gstRate,
      calculation_type: calculationType,
      gst_amount: results.gstAmount,
      total_amount: results.totalAmount
    });
    trackButtonClick('calculate_gst', 'gst_calculator', {
      amount: amount,
      gst_rate: gstRate,
      calculation_type: calculationType,
      gst_amount: results.gstAmount,
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
    setGstRate(numberValue);
    setGstRateInput(value);
  };

  const gstRates = [
    { value: 0, label: '0% (Nil Rate)' },
    { value: 5, label: '5% (Reduced Rate)' },
    { value: 12, label: '12% (Standard Rate)' },
    { value: 18, label: '18% (Standard Rate)' },
    { value: 28, label: '28% (Higher Rate)' }
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
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">GST Calculator</h2>
              <p className="text-gray-600">Calculate Goods and Services Tax</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Calculation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Calculation Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCalculationType('exclusive')}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    calculationType === 'exclusive'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium">GST Exclusive</div>
                  <div className="text-xs text-gray-500">Add GST to amount</div>
                </button>
                <button
                  onClick={() => setCalculationType('inclusive')}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    calculationType === 'inclusive'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium">GST Inclusive</div>
                  <div className="text-xs text-gray-500">Extract GST from amount</div>
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {calculationType === 'exclusive' ? 'Base Amount (Before GST)' : 'Total Amount (Including GST)'}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                <input
                  type="text"
                  value={amountInput}
                  onChange={(e) => handleInputChange(e.target.value, setAmount, setAmountInput)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            {/* GST Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Rate (%)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={gstRateInput}
                    onChange={(e) => handleRateChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter GST rate"
                  />
                </div>
                <select
                  value={gstRate}
                  onChange={(e) => {
                    const rate = parseFloat(e.target.value);
                    setGstRate(rate);
                    setGstRateInput(rate.toString());
                  }}
                  className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  {gstRates.map((rate) => (
                    <option key={rate.value} value={rate.value}>
                      {rate.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className={`w-full bg-gradient-to-r ${primaryColor} text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              Calculate GST
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
              className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-6">GST Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Base Amount</span>
                  <span className="text-2xl font-bold">{formatCurrency(results.baseAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">GST Amount</span>
                  <span className="text-lg font-semibold">{formatCurrency(results.gstAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Total Amount</span>
                  <span className="text-lg font-semibold">{formatCurrency(results.totalAmount)}</span>
                </div>
                <div className="pt-4 border-t border-purple-500">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-100">GST Rate</span>
                    <span className="text-lg font-semibold">{gstRate}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* GST Breakdown */}
          {showResults && (
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">GST Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">CGST ({gstRate/2}%)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(results.cgst)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">SGST ({gstRate/2}%)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(results.sgst)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-purple-50 rounded-xl px-4">
                  <span className="text-purple-700 font-semibold">Total GST</span>
                  <span className="text-purple-700 font-bold text-lg">{formatCurrency(results.gstAmount)}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Invoice Preview */}
          {showResults && (
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Invoice Preview</h3>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base Amount:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(results.baseAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CGST ({gstRate/2}%):</span>
                    <span className="font-medium text-gray-900">{formatCurrency(results.cgst)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">SGST ({gstRate/2}%):</span>
                    <span className="font-medium text-gray-900">{formatCurrency(results.sgst)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total Amount:</span>
                      <span className="font-bold text-lg text-gray-900">{formatCurrency(results.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* GST Information */}
      {showResults && (
        <motion.div
          className="mt-12 bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">GST Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">GST Rates in India</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">0%</span>
                  <span className="text-sm text-gray-500">Essential goods, fresh food</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">5%</span>
                  <span className="text-sm text-gray-500">Transport, healthcare</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">12%</span>
                  <span className="text-sm text-gray-500">Processed foods, computers</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">18%</span>
                  <span className="text-sm text-gray-500">Most goods and services</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">28%</span>
                  <span className="text-sm text-gray-500">Luxury items, automobiles</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">GST Components</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">CGST:</span> Central Goods and Services Tax (goes to Central Government)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">SGST:</span> State Goods and Services Tax (goes to State Government)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">IGST:</span> Integrated GST (for inter-state transactions)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
