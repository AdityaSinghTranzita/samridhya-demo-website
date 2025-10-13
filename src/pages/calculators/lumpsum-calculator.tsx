import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Coins, 
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
  Download
} from "lucide-react";
import Head from "next/head";
import CTA from "@/components/CTA";

export default function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(10);
  const [compounding, setCompounding] = useState('annually');
  const [results, setResults] = useState<any>(null);

  const calculateLumpsum = () => {
    const r = rate / 100;
    let n = 1; // Compounding frequency
    
    switch (compounding) {
      case 'annually':
        n = 1;
        break;
      case 'semi-annually':
        n = 2;
        break;
      case 'quarterly':
        n = 4;
        break;
      case 'monthly':
        n = 12;
        break;
      case 'daily':
        n = 365;
        break;
    }

    const futureValue = principal * Math.pow(1 + r/n, n * time);
    const interestEarned = futureValue - principal;
    const effectiveRate = (Math.pow(futureValue / principal, 1/time) - 1) * 100;

    // Generate year-wise breakdown
    const breakdown = [];
    for (let year = 1; year <= Math.min(time, 10); year++) {
      const yearValue = principal * Math.pow(1 + r/n, n * year);
      const yearInterest = yearValue - principal;
      breakdown.push({
        year,
        value: yearValue,
        interest: yearInterest,
        growth: ((yearValue - principal) / principal) * 100
      });
    }

    setResults({
      futureValue,
      interestEarned,
      effectiveRate,
      breakdown
    });
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Year', 'Investment Value', 'Interest Earned', 'Growth %'],
      ...results.breakdown.map((row: any) => [
        row.year,
        row.value.toFixed(2),
        row.interest.toFixed(2),
        row.growth.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lumpsum-investment-breakdown.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Lumpsum Calculator - One-time Investment Growth | Samridhya</title>
        <meta name="description" content="Calculate the future value of one-time investments with compound growth. Plan your lumpsum investments and see potential returns over time." />
        <meta name="keywords" content="lumpsum calculator, one-time investment calculator, compound interest, investment growth, future value calculator" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-600 via-orange-600 to-red-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Coins className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Investment Growth</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Lumpsum Calculator
              </h1>
              <p className="text-lg text-yellow-100 max-w-3xl mx-auto">
                Calculate the future value of one-time investments with compound growth. Plan your lumpsum investments and see potential returns over time.
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
                      Initial Investment Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="10000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Interest Rate (%)
                    </label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="8"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (Years)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compounding Frequency
                    </label>
                    <select
                      value={compounding}
                      onChange={(e) => setCompounding(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="annually">Annually</option>
                      <option value="semi-annually">Semi-annually</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="monthly">Monthly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculateLumpsum}
                  className="w-full mt-8 bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate Investment Growth
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
                          ${results.futureValue.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Future Value</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <PiggyBank className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.interestEarned.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Interest Earned</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.effectiveRate.toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-600">Effective Rate</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Coins className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${principal.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Initial Investment</div>
                      </div>
                    </div>

                    {/* Investment Breakdown */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Investment Growth (First 10 Years)</h3>
                        <button
                          onClick={downloadResults}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
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
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Value</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Interest</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Growth %</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.breakdown.map((row: any) => (
                              <tr key={row.year} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-sm text-gray-900">{row.year}</td>
                                <td className="py-3 px-2 text-sm text-gray-900">${row.value.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-green-600">${row.interest.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-blue-600">{row.growth.toFixed(2)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Growth Visualization */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Growth Chart</h3>
                      <div className="space-y-4">
                        {results.breakdown.slice(0, 5).map((row: any) => (
                          <div key={row.year} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Year {row.year}</span>
                              <span className="font-semibold">${row.value.toFixed(0)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500" 
                                style={{ width: `${(row.value / results.futureValue) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Tips Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-600" />
                    Lumpsum Investment Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Time is Key</div>
                        <div className="text-sm text-gray-600">Longer investment periods lead to exponential growth due to compound interest</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Compounding Frequency</div>
                        <div className="text-sm text-gray-600">More frequent compounding (monthly/daily) yields higher returns</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Risk vs Return</div>
                        <div className="text-sm text-gray-600">Higher interest rates usually come with higher investment risk</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <CTA />
      </div>
    </>
  );
}
