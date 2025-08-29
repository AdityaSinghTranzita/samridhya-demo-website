import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Percent, 
  Calculator, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Info,
  Clock,
  PiggyBank,
  Download
} from "lucide-react";
import Head from "next/head";

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(12000);
  const [timePeriod, setTimePeriod] = useState(1);
  const [timeUnit, setTimeUnit] = useState('years');
  const [additionalInvestments, setAdditionalInvestments] = useState(0);
  const [results, setResults] = useState<any>(null);

  const calculateROI = () => {
    let timeInYears = timePeriod;
    
    // Convert time to years
    if (timeUnit === 'months') {
      timeInYears = timePeriod / 12;
    } else if (timeUnit === 'days') {
      timeInYears = timePeriod / 365;
    }

    const totalInvestment = initialInvestment + additionalInvestments;
    const netProfit = finalValue - totalInvestment;
    const roi = (netProfit / totalInvestment) * 100;
    const annualizedROI = Math.pow((finalValue / totalInvestment), 1/timeInYears) - 1;
    const annualizedROIPercentage = annualizedROI * 100;

    // Calculate payback period
    const paybackPeriod = netProfit > 0 ? totalInvestment / (netProfit / timeInYears) : null;

    // Determine ROI category
    let category = '';
    let color = '';
    let description = '';

    if (roi >= 50) {
      category = 'Excellent';
      color = 'green';
      description = 'Outstanding returns! This investment has performed exceptionally well.';
    } else if (roi >= 20) {
      category = 'Very Good';
      color = 'blue';
      description = 'Great returns! This investment has performed very well.';
    } else if (roi >= 10) {
      category = 'Good';
      color = 'teal';
      description = 'Good returns. This investment has performed well.';
    } else if (roi >= 0) {
      category = 'Fair';
      color = 'yellow';
      description = 'Moderate returns. Consider if this meets your investment goals.';
    } else {
      category = 'Poor';
      color = 'red';
      description = 'Negative returns. This investment has lost money.';
    }

    setResults({
      totalInvestment,
      netProfit,
      roi,
      annualizedROIPercentage,
      paybackPeriod,
      timeInYears,
      category,
      color,
      description
    });
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['ROI Calculation Results'],
      ['Initial Investment', initialInvestment.toFixed(2)],
      ['Additional Investments', additionalInvestments.toFixed(2)],
      ['Total Investment', results.totalInvestment.toFixed(2)],
      ['Final Value', finalValue.toFixed(2)],
      ['Net Profit/Loss', results.netProfit.toFixed(2)],
      ['ROI', results.roi.toFixed(2) + '%'],
      ['Annualized ROI', results.annualizedROIPercentage.toFixed(2) + '%'],
      ['Time Period', timePeriod + ' ' + timeUnit],
      ['Payback Period', results.paybackPeriod ? results.paybackPeriod.toFixed(2) + ' years' : 'N/A'],
      ['ROI Category', results.category]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roi-calculation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>ROI Calculator - Calculate Return on Investment | Samridhya</title>
        <meta name="description" content="Calculate Return on Investment to measure profitability. Compare different investments and see which ones offer the best returns." />
        <meta name="keywords" content="ROI calculator, return on investment, investment returns, profitability calculator, investment comparison" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Percent className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Investment Returns</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                ROI Calculator
              </h1>
              <p className="text-lg text-indigo-100 max-w-3xl mx-auto">
                Calculate Return on Investment to measure profitability. Compare different investments and see which ones offer the best returns.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Details</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Investment
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="10000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Final Value
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        value={finalValue}
                        onChange={(e) => setFinalValue(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="12000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Investments (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        value={additionalInvestments}
                        onChange={(e) => setAdditionalInvestments(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Period
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="1"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateROI}
                  className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate ROI
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
                        <Percent className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.roi.toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-600">Total ROI</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.annualizedROIPercentage.toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-600">Annualized ROI</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <span className="w-8 h-8 text-purple-600 mx-auto mb-3 text-2xl font-bold">₹</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.netProfit.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Net Profit/Loss</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.paybackPeriod ? results.paybackPeriod.toFixed(1) : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">Payback Period (Years)</div>
                      </div>
                    </div>

                    {/* ROI Assessment */}
                    <div className={`rounded-3xl p-8 border ${
                      results.color === 'green' ? 'bg-green-50 border-green-200' :
                      results.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                      results.color === 'teal' ? 'bg-teal-50 border-teal-200' :
                      results.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-red-50 border-red-200'
                    }`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className={`w-6 h-6 ${
                          results.color === 'green' ? 'text-green-600' :
                          results.color === 'blue' ? 'text-blue-600' :
                          results.color === 'teal' ? 'text-teal-600' :
                          results.color === 'yellow' ? 'text-yellow-600' :
                          'text-red-600'
                        }`} />
                        ROI Assessment: {results.category}
                      </h3>
                      <p className="text-gray-700">{results.description}</p>
                    </div>

                    {/* Investment Summary */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Investment Summary</h3>
                        <button
                          onClick={downloadResults}
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download CSV
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Initial Investment</span>
                          <span className="font-semibold text-gray-900">${initialInvestment.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Additional Investments</span>
                          <span className="font-semibold text-gray-900">${additionalInvestments.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Total Investment</span>
                          <span className="font-semibold text-blue-600">${results.totalInvestment.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Final Value</span>
                          <span className="font-semibold text-gray-900">${finalValue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">Net Profit/Loss</span>
                          <span className={`font-semibold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {results.netProfit >= 0 ? '+' : ''}${results.netProfit.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Tips Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-600" />
                    ROI Analysis Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Compare Investments</div>
                        <div className="text-sm text-gray-600">Use ROI to compare different investment opportunities</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Consider Time Period</div>
                        <div className="text-sm text-gray-600">Annualized ROI gives better comparison across different time periods</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Risk vs Return</div>
                        <div className="text-sm text-gray-600">Higher ROI often comes with higher risk</div>
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
