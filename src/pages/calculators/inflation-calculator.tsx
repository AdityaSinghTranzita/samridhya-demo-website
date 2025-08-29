import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Calculator, 
  DollarSign, 
  Calendar, 
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

export default function InflationCalculator() {
  const [amount, setAmount] = useState(1000);
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2030);
  const [inflationRate, setInflationRate] = useState(3);
  const [results, setResults] = useState<any>(null);

  const calculateInflation = () => {
    const years = endYear - startYear;
    const r = inflationRate / 100;
    
    // Calculate future value (how much money you'll need)
    const futureValue = amount * Math.pow(1 + r, years);
    
    // Calculate present value (how much past money is worth today)
    const presentValue = amount / Math.pow(1 + r, years);
    
    // Calculate purchasing power loss
    const purchasingPowerLoss = amount - presentValue;
    const purchasingPowerLossPercentage = (purchasingPowerLoss / amount) * 100;
    
    // Calculate year-wise breakdown
    const breakdown = [];
    for (let year = 0; year <= Math.min(years, 20); year++) {
      const yearValue = amount * Math.pow(1 + r, year);
      const yearPresentValue = amount / Math.pow(1 + r, year);
      breakdown.push({
        year: startYear + year,
        futureValue: yearValue,
        presentValue: yearPresentValue,
        purchasingPowerLoss: amount - yearPresentValue
      });
    }

    setResults({
      years,
      futureValue,
      presentValue,
      purchasingPowerLoss,
      purchasingPowerLossPercentage,
      breakdown
    });
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Inflation Calculation Results'],
      ['Original Amount', amount.toFixed(2)],
      ['Start Year', startYear.toString()],
      ['End Year', endYear.toString()],
      ['Inflation Rate', inflationRate.toFixed(2) + '%'],
      ['Years', results.years.toString()],
      ['Future Value', results.futureValue.toFixed(2)],
      ['Present Value', results.presentValue.toFixed(2)],
      ['Purchasing Power Loss', results.purchasingPowerLoss.toFixed(2)],
      ['Purchasing Power Loss %', results.purchasingPowerLossPercentage.toFixed(2) + '%'],
      [''],
      ['Year-wise Breakdown'],
      ['Year', 'Future Value', 'Present Value', 'Purchasing Power Loss'],
      ...results.breakdown.map((row: any) => [
        row.year,
        row.futureValue.toFixed(2),
        row.presentValue.toFixed(2),
        row.purchasingPowerLoss.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inflation-calculation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Inflation Calculator - Understand Purchasing Power | Samridhya</title>
        <meta name="description" content="Calculate how inflation affects purchasing power over time. Understand the real value of money and plan for inflation-adjusted goals." />
        <meta name="keywords" content="inflation calculator, purchasing power, inflation rate, money value, inflation adjustment" />
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
                <TrendingUp className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Purchasing Power</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Inflation Calculator
              </h1>
              <p className="text-lg text-orange-100 max-w-3xl mx-auto">
                Calculate how inflation affects purchasing power over time. Understand the real value of money and plan for inflation-adjusted goals.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Inflation Details</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="1000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Year
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          min="1900"
                          max="2100"
                          value={startYear}
                          onChange={(e) => setStartYear(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="2020"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Year
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          min="1900"
                          max="2100"
                          value={endYear}
                          onChange={(e) => setEndYear(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="2030"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Inflation Rate (%)
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

                <button
                  onClick={calculateInflation}
                  className="w-full mt-8 bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate Inflation Impact
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
                          ${results.futureValue.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Future Value</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.presentValue.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Present Value</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.purchasingPowerLoss.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Purchasing Power Loss</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Percent className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.purchasingPowerLossPercentage.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">Power Loss %</div>
                      </div>
                    </div>

                    {/* Inflation Impact Summary */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Inflation Impact Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Original Amount ({startYear})</span>
                          <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Future Value ({endYear})</span>
                          <span className="font-semibold text-green-600">${results.futureValue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Present Value</span>
                          <span className="font-semibold text-blue-600">${results.presentValue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">Purchasing Power Lost</span>
                          <span className="font-semibold text-red-600">-${results.purchasingPowerLoss.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Year-wise Breakdown */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Year-wise Breakdown</h3>
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
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Future Value</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Present Value</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Power Loss</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.breakdown.map((row: any) => (
                              <tr key={row.year} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-sm text-gray-900">{row.year}</td>
                                <td className="py-3 px-2 text-sm text-green-600">${row.futureValue.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-blue-600">${row.presentValue.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-red-600">${row.purchasingPowerLoss.toFixed(2)}</td>
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
                    Inflation Planning Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Invest for Growth</div>
                        <div className="text-sm text-gray-600">Invest in assets that outpace inflation to preserve purchasing power</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Plan Long-term</div>
                        <div className="text-sm text-gray-600">Consider inflation when planning for long-term financial goals</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Diversify Investments</div>
                        <div className="text-sm text-gray-600">Diversify across asset classes to hedge against inflation</div>
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
