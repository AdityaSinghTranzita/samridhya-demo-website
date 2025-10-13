import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Receipt, 
  Calculator, 
  TrendingDown, 
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

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState({
    salary: 800000,
    business: 0,
    houseProperty: 0,
    capitalGains: 0,
    otherSources: 0
  });

  const [deductions, setDeductions] = useState({
    section80C: 150000,
    section80D: 25000,
    section80TTA: 10000,
    section80G: 10000,
    section80E: 0,
    section80CCD: 50000,
    nps: 50000,
    hra: 0,
    standardDeduction: 50000
  });

  const [results, setResults] = useState<any>(null);

  const calculateTax = () => {
    // Calculate total income
    const totalIncome = income.salary + income.business + income.houseProperty + 
                       income.capitalGains + income.otherSources;

    // Calculate total deductions
    const totalDeductions = deductions.section80C + deductions.section80D + 
                           deductions.section80TTA + deductions.section80G + 
                           deductions.section80E + deductions.section80CCD + 
                           deductions.nps + deductions.hra + deductions.standardDeduction;

    // Calculate taxable income
    const taxableIncome = Math.max(0, totalIncome - totalDeductions);

    // Calculate tax based on new tax regime (FY 2023-24)
    let tax = 0;
    let taxBreakdown = [];

    if (taxableIncome <= 300000) {
      tax = 0;
      taxBreakdown.push({ slab: 'Up to ₹3,00,000', rate: '0%', amount: 0 });
    } else if (taxableIncome <= 600000) {
      tax = (taxableIncome - 300000) * 0.05;
      taxBreakdown.push({ slab: '₹3,00,001 - ₹6,00,000', rate: '5%', amount: tax });
    } else if (taxableIncome <= 900000) {
      tax = 15000 + (taxableIncome - 600000) * 0.10;
      taxBreakdown.push({ slab: '₹3,00,001 - ₹6,00,000', rate: '5%', amount: 15000 });
      taxBreakdown.push({ slab: '₹6,00,001 - ₹9,00,000', rate: '10%', amount: (taxableIncome - 600000) * 0.10 });
    } else if (taxableIncome <= 1200000) {
      tax = 45000 + (taxableIncome - 900000) * 0.15;
      taxBreakdown.push({ slab: '₹3,00,001 - ₹6,00,000', rate: '5%', amount: 15000 });
      taxBreakdown.push({ slab: '₹6,00,001 - ₹9,00,000', rate: '10%', amount: 30000 });
      taxBreakdown.push({ slab: '₹9,00,001 - ₹12,00,000', rate: '15%', amount: (taxableIncome - 900000) * 0.15 });
    } else if (taxableIncome <= 1500000) {
      tax = 90000 + (taxableIncome - 1200000) * 0.20;
      taxBreakdown.push({ slab: '₹3,00,001 - ₹6,00,000', rate: '5%', amount: 15000 });
      taxBreakdown.push({ slab: '₹6,00,001 - ₹9,00,000', rate: '10%', amount: 30000 });
      taxBreakdown.push({ slab: '₹9,00,001 - ₹12,00,000', rate: '15%', amount: 45000 });
      taxBreakdown.push({ slab: '₹12,00,001 - ₹15,00,000', rate: '20%', amount: (taxableIncome - 1200000) * 0.20 });
    } else {
      tax = 150000 + (taxableIncome - 1500000) * 0.30;
      taxBreakdown.push({ slab: '₹3,00,001 - ₹6,00,000', rate: '5%', amount: 15000 });
      taxBreakdown.push({ slab: '₹6,00,001 - ₹9,00,000', rate: '10%', amount: 30000 });
      taxBreakdown.push({ slab: '₹9,00,001 - ₹12,00,000', rate: '15%', amount: 45000 });
      taxBreakdown.push({ slab: '₹12,00,001 - ₹15,00,000', rate: '20%', amount: 60000 });
      taxBreakdown.push({ slab: 'Above ₹15,00,000', rate: '30%', amount: (taxableIncome - 1500000) * 0.30 });
    }

    // Calculate cess
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    // Calculate effective tax rate
    const effectiveTaxRate = (totalTax / totalIncome) * 100;

    setResults({
      totalIncome,
      totalDeductions,
      taxableIncome,
      tax,
      cess,
      totalTax,
      effectiveTaxRate,
      taxBreakdown
    });
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Description', 'Amount (₹)'],
      ['Total Income', results.totalIncome.toFixed(2)],
      ['Total Deductions', results.totalDeductions.toFixed(2)],
      ['Taxable Income', results.taxableIncome.toFixed(2)],
      ['Basic Tax', results.tax.toFixed(2)],
      ['Health & Education Cess', results.cess.toFixed(2)],
      ['Total Tax', results.totalTax.toFixed(2)],
      ['Effective Tax Rate', results.effectiveTaxRate.toFixed(2) + '%'],
      [''],
      ['Tax Slab Breakdown'],
      ['Slab', 'Rate', 'Amount'],
      ...results.taxBreakdown.map((row: any) => [
        row.slab,
        row.rate,
        row.amount.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'income-tax-calculation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Income Tax Calculator - Calculate Your Tax Liability | Samridhya</title>
        <meta name="description" content="Calculate your income tax liability with deductions and exemptions. Get detailed tax breakdown and understand your tax obligations." />
        <meta name="keywords" content="income tax calculator, tax calculation, tax liability, tax deductions, income tax India" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-600 via-pink-600 to-purple-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Receipt className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Tax Calculation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Income Tax Calculator
              </h1>
              <p className="text-lg text-red-100 max-w-3xl mx-auto">
                Calculate your income tax liability with deductions and exemptions. Get detailed tax breakdown and understand your tax obligations.
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
                {/* Income Sources */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Income Sources</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary Income
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={income.salary}
                          onChange={(e) => setIncome({...income, salary: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="800000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business/Professional Income
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={income.business}
                          onChange={(e) => setIncome({...income, business: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        House Property Income
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={income.houseProperty}
                          onChange={(e) => setIncome({...income, houseProperty: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Capital Gains
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={income.capitalGains}
                          onChange={(e) => setIncome({...income, capitalGains: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Sources
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={income.otherSources}
                          onChange={(e) => setIncome({...income, otherSources: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Deductions</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 80C (ELSS, PPF, etc.)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={deductions.section80C}
                          onChange={(e) => setDeductions({...deductions, section80C: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="150000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 80D (Health Insurance)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={deductions.section80D}
                          onChange={(e) => setDeductions({...deductions, section80D: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="25000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 80TTA (Savings Account)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={deductions.section80TTA}
                          onChange={(e) => setDeductions({...deductions, section80TTA: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="10000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 80G (Donations)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={deductions.section80G}
                          onChange={(e) => setDeductions({...deductions, section80G: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="10000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NPS Contribution
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={deductions.nps}
                          onChange={(e) => setDeductions({...deductions, nps: Number(e.target.value)})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="50000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateTax}
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate Tax
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
                        <span className="w-8 h-8 text-red-600 mx-auto mb-3 text-2xl font-bold">₹</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.totalTax.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Tax</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Percent className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.effectiveTaxRate.toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-600">Effective Tax Rate</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.taxableIncome.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Taxable Income</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <PiggyBank className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.totalDeductions.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Deductions</div>
                      </div>
                    </div>

                    {/* Tax Breakdown */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Tax Breakdown</h3>
                        <button
                          onClick={downloadResults}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download CSV
                        </button>
                      </div>
                      <div className="space-y-4">
                        {results.taxBreakdown.map((row: any, index: number) => (
                          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                            <div>
                              <div className="font-semibold text-gray-900">{row.slab}</div>
                              <div className="text-sm text-gray-600">Rate: {row.rate}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">₹{row.amount.toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <div className="font-semibold text-gray-900">Health & Education Cess (4%)</div>
                          <div className="font-semibold text-gray-900">₹{results.cess.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <div className="font-bold text-lg text-gray-900">Total Tax</div>
                          <div className="font-bold text-lg text-red-600">₹{results.totalTax.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Income Summary */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Income Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Total Income</span>
                          <span className="font-semibold text-gray-900">₹{results.totalIncome.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Total Deductions</span>
                          <span className="font-semibold text-green-600">-₹{results.totalDeductions.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">Taxable Income</span>
                          <span className="font-semibold text-blue-600">₹{results.taxableIncome.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Tips Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-600" />
                    Tax Planning Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Maximize Deductions</div>
                        <div className="text-sm text-gray-600">Utilize all available deductions under various sections</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Plan Investments</div>
                        <div className="text-sm text-gray-600">Invest in tax-saving instruments before the financial year ends</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Keep Records</div>
                        <div className="text-sm text-gray-600">Maintain proper documentation for all deductions claimed</div>
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
