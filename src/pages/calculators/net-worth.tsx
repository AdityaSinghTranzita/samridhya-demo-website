import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Calculator, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Target,
  ArrowRight,
  CheckCircle,
  Info,
  Percent,
  Clock,
  PiggyBank,
  Download,
  Plus,
  Trash2
} from "lucide-react";
import Head from "next/head";
import CTA from "@/components/CTA";

interface AssetItem {
  id: number;
  name: string;
  value: number;
  category: string;
}

interface LiabilityItem {
  id: number;
  name: string;
  amount: number;
  category: string;
}

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<AssetItem[]>([
    { id: 1, name: 'Cash & Savings', value: 25000, category: 'Liquid Assets' },
    { id: 2, name: 'Investment Portfolio', value: 50000, category: 'Investments' },
    { id: 3, name: 'Home Value', value: 300000, category: 'Real Estate' },
    { id: 4, name: 'Vehicle Value', value: 15000, category: 'Personal Property' }
  ]);

  const [liabilities, setLiabilities] = useState<LiabilityItem[]>([
    { id: 1, name: 'Home Mortgage', amount: 250000, category: 'Long-term Debt' },
    { id: 2, name: 'Car Loan', amount: 10000, category: 'Short-term Debt' },
    { id: 3, name: 'Credit Card Debt', amount: 5000, category: 'Short-term Debt' }
  ]);

  const [results, setResults] = useState<any>(null);

  const addAsset = () => {
    const newAsset = {
      id: Math.max(...assets.map(a => a.id), 0) + 1,
      name: `Asset ${assets.length + 1}`,
      value: 0,
      category: 'Other'
    };
    setAssets([...assets, newAsset]);
  };

  const removeAsset = (id: number) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const updateAsset = (id: number, field: string, value: string | number) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, [field]: value } : asset
    ));
  };

  const addLiability = () => {
    const newLiability = {
      id: Math.max(...liabilities.map(l => l.id), 0) + 1,
      name: `Liability ${liabilities.length + 1}`,
      amount: 0,
      category: 'Other'
    };
    setLiabilities([...liabilities, newLiability]);
  };

  const removeLiability = (id: number) => {
    setLiabilities(liabilities.filter(liability => liability.id !== id));
  };

  const updateLiability = (id: number, field: string, value: string | number) => {
    setLiabilities(liabilities.map(liability => 
      liability.id === id ? { ...liability, [field]: value } : liability
    ));
  };

  const calculateNetWorth = () => {
    const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
    const netWorth = totalAssets - totalLiabilities;

    // Group assets by category
    const assetsByCategory = assets.reduce((acc, asset) => {
      if (!acc[asset.category]) {
        acc[asset.category] = 0;
      }
      acc[asset.category] += asset.value;
      return acc;
    }, {} as Record<string, number>);

    // Group liabilities by category
    const liabilitiesByCategory = liabilities.reduce((acc, liability) => {
      if (!acc[liability.category]) {
        acc[liability.category] = 0;
      }
      acc[liability.category] += liability.amount;
      return acc;
    }, {} as Record<string, number>);

    // Calculate ratios
    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;
    const assetToLiabilityRatio = totalLiabilities > 0 ? totalAssets / totalLiabilities : 0;

    // Determine net worth category
    let category = '';
    let color = '';
    let description = '';

    if (netWorth >= 1000000) {
      category = 'High Net Worth';
      color = 'green';
      description = 'Excellent financial position! You have significant wealth.';
    } else if (netWorth >= 100000) {
      category = 'Positive Net Worth';
      color = 'blue';
      description = 'Good financial position. You have positive net worth.';
    } else if (netWorth >= 0) {
      category = 'Break Even';
      color = 'yellow';
      description = 'You\'re at break-even. Focus on building assets.';
    } else {
      category = 'Negative Net Worth';
      color = 'red';
      description = 'You have negative net worth. Focus on reducing debt.';
    }

    setResults({
      totalAssets,
      totalLiabilities,
      netWorth,
      debtToAssetRatio,
      assetToLiabilityRatio,
      assetsByCategory,
      liabilitiesByCategory,
      category,
      color,
      description
    });
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Net Worth Calculation Results'],
      ['Total Assets', results.totalAssets.toFixed(2)],
      ['Total Liabilities', results.totalLiabilities.toFixed(2)],
      ['Net Worth', results.netWorth.toFixed(2)],
      ['Debt-to-Asset Ratio', results.debtToAssetRatio.toFixed(2) + '%'],
      ['Asset-to-Liability Ratio', results.assetToLiabilityRatio.toFixed(2)],
      ['Net Worth Category', results.category],
      [''],
      ['Assets Breakdown'],
      ['Category', 'Name', 'Value'],
      ...assets.map(asset => [asset.category, asset.name, asset.value.toFixed(2)]),
      [''],
      ['Liabilities Breakdown'],
      ['Category', 'Name', 'Amount'],
      ...liabilities.map(liability => [liability.category, liability.name, liability.amount.toFixed(2)])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'net-worth-calculation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Net Worth Calculator - Calculate Your Financial Position | Samridhya</title>
        <meta name="description" content="Calculate your total net worth by subtracting liabilities from assets. Get insights into your financial health and wealth position." />
        <meta name="keywords" content="net worth calculator, financial position, assets liabilities, wealth calculation, financial health" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Financial Position</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Net Worth Calculator
              </h1>
              <p className="text-lg text-green-100 max-w-3xl mx-auto">
                Calculate your total net worth by subtracting liabilities from assets. Get insights into your financial health and wealth position.
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
                className="space-y-8"
              >
                {/* Assets */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      Assets
                    </h2>
                    <button
                      onClick={addAsset}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Asset
                    </button>
                  </div>

                  <div className="space-y-4">
                    {assets.map((asset) => (
                      <div key={asset.id} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="text"
                            value={asset.name}
                            onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                            className="text-lg font-semibold bg-transparent border-none focus:outline-none"
                          />
                          <button
                            onClick={() => removeAsset(asset.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <select
                              value={asset.category}
                              onChange={(e) => updateAsset(asset.id, 'category', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                              <option value="Liquid Assets">Liquid Assets</option>
                              <option value="Investments">Investments</option>
                              <option value="Real Estate">Real Estate</option>
                              <option value="Personal Property">Personal Property</option>
                              <option value="Business Assets">Business Assets</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                            <input
                              type="number"
                              value={asset.value}
                              onChange={(e) => updateAsset(asset.id, 'value', Number(e.target.value))}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Liabilities */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <ArrowRight className="w-6 h-6 text-red-600" />
                      Liabilities
                    </h2>
                    <button
                      onClick={addLiability}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Liability
                    </button>
                  </div>

                  <div className="space-y-4">
                    {liabilities.map((liability) => (
                      <div key={liability.id} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="text"
                            value={liability.name}
                            onChange={(e) => updateLiability(liability.id, 'name', e.target.value)}
                            className="text-lg font-semibold bg-transparent border-none focus:outline-none"
                          />
                          <button
                            onClick={() => removeLiability(liability.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <select
                              value={liability.category}
                              onChange={(e) => updateLiability(liability.id, 'category', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            >
                              <option value="Long-term Debt">Long-term Debt</option>
                              <option value="Short-term Debt">Short-term Debt</option>
                              <option value="Credit Cards">Credit Cards</option>
                              <option value="Student Loans">Student Loans</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                            <input
                              type="number"
                              value={liability.amount}
                              onChange={(e) => updateLiability(liability.id, 'amount', Number(e.target.value))}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={calculateNetWorth}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate Net Worth
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
                          ₹{results.netWorth.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Net Worth</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.totalAssets.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Assets</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <ArrowRight className="w-8 h-8 text-red-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.totalLiabilities.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Liabilities</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Percent className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.debtToAssetRatio.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">Debt-to-Asset Ratio</div>
                      </div>
                    </div>

                    {/* Net Worth Assessment */}
                    <div className={`rounded-3xl p-8 border ${
                      results.color === 'green' ? 'bg-green-50 border-green-200' :
                      results.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                      results.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-red-50 border-red-200'
                    }`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className={`w-6 h-6 ${
                          results.color === 'green' ? 'text-green-600' :
                          results.color === 'blue' ? 'text-blue-600' :
                          results.color === 'yellow' ? 'text-yellow-600' :
                          'text-red-600'
                        }`} />
                        Financial Assessment: {results.category}
                      </h3>
                      <p className="text-gray-700">{results.description}</p>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Financial Summary</h3>
                        <button
                          onClick={downloadResults}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download CSV
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Total Assets</span>
                          <span className="font-semibold text-green-600">+₹{results.totalAssets.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Total Liabilities</span>
                          <span className="font-semibold text-red-600">-₹{results.totalLiabilities.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">Net Worth</span>
                          <span className={`font-semibold text-lg ${results.netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{results.netWorth.toFixed(2)}
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
                    Net Worth Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Track Regularly</div>
                        <div className="text-sm text-gray-600">Monitor your net worth monthly to track progress</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Reduce Debt</div>
                        <div className="text-sm text-gray-600">Focus on paying off high-interest debt first</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Build Assets</div>
                        <div className="text-sm text-gray-600">Invest in appreciating assets like stocks and real estate</div>
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
