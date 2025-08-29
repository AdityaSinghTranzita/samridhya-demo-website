import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Home, 
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

export default function MortgageVsRentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(2000);
  const [rentIncrease, setRentIncrease] = useState(3);
  const [propertyTax, setPropertyTax] = useState(5000);
  const [insurance, setInsurance] = useState(1200);
  const [maintenance, setMaintenance] = useState(3000);
  const [propertyAppreciation, setPropertyAppreciation] = useState(3);
  const [investmentReturn, setInvestmentReturn] = useState(8);
  const [results, setResults] = useState<any>(null);

  const calculateComparison = () => {
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    
    // Calculate monthly mortgage payment
    const monthlyMortgage = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    // Calculate total costs over 30 years
    const years = 30;
    const months = years * 12;
    
    // Mortgage scenario
    let totalMortgagePayments = 0;
    let totalPropertyTax = 0;
    let totalInsurance = 0;
    let totalMaintenance = 0;
    let totalDownPayment = downPayment;
    
    for (let year = 1; year <= years; year++) {
      totalMortgagePayments += monthlyMortgage * 12;
      totalPropertyTax += propertyTax * Math.pow(1 + 0.02, year - 1); // 2% annual increase
      totalInsurance += insurance * Math.pow(1 + 0.03, year - 1); // 3% annual increase
      totalMaintenance += maintenance * Math.pow(1 + 0.02, year - 1); // 2% annual increase
    }
    
    const totalMortgageCost = totalDownPayment + totalMortgagePayments + totalPropertyTax + totalInsurance + totalMaintenance;
    const propertyValue = propertyPrice * Math.pow(1 + propertyAppreciation / 100, years);
    const equity = propertyValue - loanAmount;
    const netMortgageCost = totalMortgageCost - equity;
    
    // Rent scenario
    let totalRent = 0;
    let currentRent = monthlyRent;
    
    for (let year = 1; year <= years; year++) {
      totalRent += currentRent * 12;
      currentRent *= (1 + rentIncrease / 100);
    }
    
    // Investment opportunity cost (down payment + monthly savings)
    const monthlySavings = monthlyMortgage + propertyTax / 12 + insurance / 12 + maintenance / 12 - monthlyRent;
    let totalInvestment = downPayment;
    
    for (let year = 1; year <= years; year++) {
      totalInvestment = totalInvestment * (1 + investmentReturn / 100) + monthlySavings * 12;
    }
    
    const netRentCost = totalRent - totalInvestment;
    
    // Calculate break-even point
    let breakEvenYear = 0;
    let mortgageRunningTotal = downPayment;
    let rentRunningTotal = 0;
    let investmentRunningTotal = downPayment;
    let currentRentForBreakEven = monthlyRent;
    
    for (let year = 1; year <= years; year++) {
      // Mortgage costs for this year
      mortgageRunningTotal += monthlyMortgage * 12;
      mortgageRunningTotal += propertyTax * Math.pow(1 + 0.02, year - 1);
      mortgageRunningTotal += insurance * Math.pow(1 + 0.03, year - 1);
      mortgageRunningTotal += maintenance * Math.pow(1 + 0.02, year - 1);
      
      // Rent costs for this year
      rentRunningTotal += currentRentForBreakEven * 12;
      currentRentForBreakEven *= (1 + rentIncrease / 100);
      
      // Investment growth
      const monthlySavingsThisYear = monthlyMortgage + propertyTax / 12 + insurance / 12 + maintenance / 12 - currentRentForBreakEven / 12;
      investmentRunningTotal = investmentRunningTotal * (1 + investmentReturn / 100) + monthlySavingsThisYear * 12;
      
      // Property value
      const propertyValueThisYear = propertyPrice * Math.pow(1 + propertyAppreciation / 100, year);
      const equityThisYear = propertyValueThisYear - loanAmount;
      
      if (mortgageRunningTotal - equityThisYear <= rentRunningTotal - investmentRunningTotal && breakEvenYear === 0) {
        breakEvenYear = year;
      }
    }
    
    // Year-wise breakdown
    const breakdown = [];
    for (let year = 1; year <= Math.min(years, 10); year++) {
      const yearMortgageCost = monthlyMortgage * 12 + 
        propertyTax * Math.pow(1 + 0.02, year - 1) + 
        insurance * Math.pow(1 + 0.03, year - 1) + 
        maintenance * Math.pow(1 + 0.02, year - 1);
      
      const yearRentCost = monthlyRent * Math.pow(1 + rentIncrease / 100, year - 1) * 12;
      
      breakdown.push({
        year,
        mortgageCost: yearMortgageCost,
        rentCost: yearRentCost,
        difference: yearMortgageCost - yearRentCost
      });
    }

    setResults({
      monthlyMortgage,
      totalMortgageCost,
      totalRent,
      netMortgageCost,
      netRentCost,
      propertyValue,
      equity,
      totalInvestment,
      breakEvenYear,
      breakdown,
      recommendation: netMortgageCost < netRentCost ? 'Buy' : 'Rent'
    });
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Mortgage vs Rent Comparison Results'],
      ['Property Price', propertyPrice.toFixed(2)],
      ['Down Payment', downPayment.toFixed(2)],
      ['Interest Rate', interestRate.toFixed(2) + '%'],
      ['Loan Term', loanTerm + ' years'],
      ['Monthly Rent', monthlyRent.toFixed(2)],
      ['Rent Increase', rentIncrease.toFixed(2) + '%'],
      ['Monthly Mortgage Payment', results.monthlyMortgage.toFixed(2)],
      ['Total Mortgage Cost (30 years)', results.totalMortgageCost.toFixed(2)],
      ['Total Rent Cost (30 years)', results.totalRent.toFixed(2)],
      ['Net Mortgage Cost', results.netMortgageCost.toFixed(2)],
      ['Net Rent Cost', results.netRentCost.toFixed(2)],
      ['Property Value (30 years)', results.propertyValue.toFixed(2)],
      ['Equity (30 years)', results.equity.toFixed(2)],
      ['Investment Value (30 years)', results.totalInvestment.toFixed(2)],
      ['Break-even Year', results.breakEvenYear.toString()],
      ['Recommendation', results.recommendation],
      [''],
      ['Year-wise Breakdown'],
      ['Year', 'Mortgage Cost', 'Rent Cost', 'Difference'],
      ...results.breakdown.map((row: any) => [
        row.year,
        row.mortgageCost.toFixed(2),
        row.rentCost.toFixed(2),
        row.difference.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mortgage-vs-rent-comparison.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Mortgage vs Rent Calculator - Compare Buying vs Renting | Samridhya</title>
        <meta name="description" content="Compare the costs of buying vs renting a property over time. Make an informed decision about homeownership with our comprehensive calculator." />
        <meta name="keywords" content="mortgage vs rent calculator, buy vs rent, homeownership calculator, property comparison, housing decision" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Home className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Housing Decision</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Mortgage vs Rent Calculator
              </h1>
              <p className="text-lg text-slate-100 max-w-3xl mx-auto">
                Compare the costs of buying vs renting a property over time. Make an informed decision about homeownership with our comprehensive calculator.
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
                {/* Property Details */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={propertyPrice}
                          onChange={(e) => setPropertyPrice(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                          placeholder="500000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Down Payment
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                          placeholder="100000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Interest Rate (%)
                        </label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            placeholder="4.5"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loan Term (Years)
                        </label>
                        <input
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                          placeholder="30"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rent Details */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Rent Details</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Rent
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={monthlyRent}
                          onChange={(e) => setMonthlyRent(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                          placeholder="2000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Rent Increase (%)
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          step="0.1"
                          value={rentIncrease}
                          onChange={(e) => setRentIncrease(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                          placeholder="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Costs */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Costs</h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Annual Property Tax
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            value={propertyTax}
                            onChange={(e) => setPropertyTax(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            placeholder="5000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Annual Insurance
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            value={insurance}
                            onChange={(e) => setInsurance(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            placeholder="1200"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Maintenance
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={maintenance}
                          onChange={(e) => setMaintenance(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                          placeholder="3000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Appreciation (%)
                        </label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            step="0.1"
                            value={propertyAppreciation}
                            onChange={(e) => setPropertyAppreciation(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            placeholder="3"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Investment Return (%)
                        </label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            step="0.1"
                            value={investmentReturn}
                            onChange={(e) => setInvestmentReturn(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            placeholder="8"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateComparison}
                  className="w-full bg-gradient-to-r from-slate-600 to-gray-600 text-white py-4 rounded-xl font-semibold hover:from-slate-700 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Compare Options
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
                          ₹{results.monthlyMortgage.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Monthly Mortgage</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.netMortgageCost.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Net Mortgage Cost</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.netRentCost.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Net Rent Cost</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.breakEvenYear}
                        </div>
                        <div className="text-sm text-gray-600">Break-even Year</div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className={`rounded-3xl p-8 border ${
                      results.recommendation === 'Buy' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className={`w-6 h-6 ${
                          results.recommendation === 'Buy' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                        Recommendation: {results.recommendation}
                      </h3>
                      <p className="text-gray-700">
                        {results.recommendation === 'Buy' 
                          ? `Based on your inputs, buying appears to be more cost-effective over 30 years. You'll save approximately ₹${Math.abs(results.netMortgageCost - results.netRentCost).toFixed(0)} compared to renting.`
                          : `Based on your inputs, renting appears to be more cost-effective over 30 years. You'll save approximately ₹${Math.abs(results.netRentCost - results.netMortgageCost).toFixed(0)} compared to buying.`
                        }
                      </p>
                    </div>

                    {/* Cost Comparison */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">30-Year Cost Comparison</h3>
                        <button
                          onClick={downloadResults}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download CSV
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Total Mortgage Cost</span>
                          <span className="font-semibold text-gray-900">₹{results.totalMortgageCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Property Value (30 years)</span>
                          <span className="font-semibold text-green-600">₹{results.propertyValue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Equity Built</span>
                          <span className="font-semibold text-blue-600">₹{results.equity.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Total Rent Cost</span>
                          <span className="font-semibold text-gray-900">₹{results.totalRent.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Investment Value</span>
                          <span className="font-semibold text-purple-600">₹{results.totalInvestment.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">Net Cost Difference</span>
                          <span className={`font-semibold text-lg ${results.netMortgageCost < results.netRentCost ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{Math.abs(results.netMortgageCost - results.netRentCost).toFixed(2)}
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
                    Housing Decision Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Consider Long-term</div>
                        <div className="text-sm text-gray-600">Think about your plans for the next 5-10 years</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Factor in All Costs</div>
                        <div className="text-sm text-gray-600">Include maintenance, taxes, insurance, and utilities</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Market Conditions</div>
                        <div className="text-sm text-gray-600">Consider local real estate and rental market trends</div>
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
