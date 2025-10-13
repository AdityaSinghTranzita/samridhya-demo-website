import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  PieChart,
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
import CTA from "@/components/CTA"; // Assuming you have a CTA component

// Define a type for the schedule row for better type safety
interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalInterest: number;
  totalPrincipal: number;
}

// Define a type for the overall results
interface AmortizationResults {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalPaid: number;
  schedule: AmortizationRow[];
  fullSchedule: AmortizationRow[];
}

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [extraPayment, setExtraPayment] = useState(0);
  const [results, setResults] = useState<AmortizationResults | null>(null);

  const calculateAmortization = () => {
    // Basic validation
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      setResults(null);
      alert("Please enter positive values for Loan Amount, Interest Rate, and Loan Term.");
      return;
    }

    const principal = loanAmount;
    const rate = interestRate / 100;
    const monthlyRate = rate / 12;
    const totalOriginalPayments = loanTerm * 12;
    // Note: extraPayment is added to the base monthly payment in the loop

    // Calculate the fixed monthly payment (P&I) based on the original term
    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = principal / totalOriginalPayments;
    } else {
      monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalOriginalPayments)) /
          (Math.pow(1 + monthlyRate, totalOriginalPayments) - 1);
    }

    // Ensure monthly payment is greater than zero
    if (monthlyPayment < 0) monthlyPayment = 0;


    const schedule: AmortizationRow[] = [];
    let remainingBalance = principal;
    let totalInterest = 0;
    let totalPrincipalPaid = 0;
    let month = 1;

    // Loop through payments until the balance is zero
    while (remainingBalance > 0 && month <= totalOriginalPayments + 1000) { // Safety break
      const interestPayment = remainingBalance * monthlyRate;

      // Calculate the base principal payment
      let principalPayment = monthlyPayment - interestPayment;

      // Apply extra payment
      const extraPrincipalPayment = extraPayment;

      let totalPayment = monthlyPayment + extraPayment;
      let totalPrincipalReduction = principalPayment + extraPrincipalPayment;

      // Handle the final payment (may be less than the regular total payment)
      if (remainingBalance < totalPrincipalReduction) {
        totalPrincipalReduction = remainingBalance;
        principalPayment = totalPrincipalReduction - extraPrincipalPayment;

        // Final payment amount = remaining balance + interest on remaining balance
        totalPayment = remainingBalance + interestPayment;
        totalPrincipalReduction = remainingBalance;
        principalPayment = totalPayment - interestPayment;
      }

      remainingBalance = Math.max(0, remainingBalance - totalPrincipalReduction);

      totalInterest += interestPayment;
      totalPrincipalPaid += totalPrincipalReduction;

      schedule.push({
        month,
        payment: totalPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance,
        totalInterest,
        totalPrincipal: totalPrincipalPaid
      });

      if (remainingBalance <= 0) break;
      month++;
    }

    const actualPayments = schedule.length;
    const totalPaid = totalInterest + totalPrincipalPaid;

    setResults({
      monthlyPayment, // The base P&I amount
      totalPayments: actualPayments,
      totalInterest,
      totalPaid,
      schedule: schedule.slice(0, 12), // Show first 12 months in the quick view
      fullSchedule: schedule
    });
  };

  const downloadSchedule = () => {
    if (!results) return;

    const csvContent = [
      ['Month', 'Payment', 'Principal', 'Interest', 'Remaining Balance', 'Total Interest Paid', 'Total Principal Paid'],
      ...results.fullSchedule.map((row) => [
        row.month,
        (row.payment + (row.month <= results.totalPayments ? extraPayment : 0)).toFixed(2), // Payment + extra for visual clarity
        row.principal.toFixed(2),
        row.interest.toFixed(2),
        row.balance.toFixed(2),
        row.totalInterest.toFixed(2),
        row.totalPrincipal.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amortization-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
      <>
        <Head>
          <title>Amortization Calculator: Free Loan Payment Schedule & Interest Breakdown | Samridhya</title>
          {/* Optimized Meta Description for CTR */}
          <meta name="description" content="Calculate your loan's amortization schedule. See a detailed monthly breakdown of principal vs. interest. Download the full CSV for any mortgage or loan. Use our extra payment feature to save thousands." />
          <meta name="keywords" content="amortization calculator, loan payment schedule, principal interest breakdown, loan amortization, mortgage calculator, extra payments" />
          {/* Schema Markup for SEO - (Add this for serious SEO efforts) */}
          {/* <script type="application/ld+json">{JSON.stringify(faqSchema)}</script> */}
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
          <Navbar />

          {/* Hero Section */}
          <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                  <PieChart className="w-6 h-6 text-white" />
                  <span className="text-white font-semibold">Payment Schedule Tool</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                  Amortization Calculator
                </h1>
                <p className="text-lg text-teal-100 max-w-3xl mx-auto">
                  Create a **detailed loan payment schedule** showing the monthly breakdown of principal and interest. See exactly how extra payments can save you thousands.
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
                    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-fit sticky top-28" // Added h-fit and sticky for better layout
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-teal-600" />
                    Loan Details & Inputs
                  </h2>

                  <div className="space-y-6">
                    {/* Loan Amount Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="200000"
                            min="1"
                        />
                      </div>
                    </div>

                    {/* Interest Rate Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="6.5"
                            min="0.1"
                        />
                      </div>
                    </div>

                    {/* Loan Term Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (Years)</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="30"
                            min="1"
                        />
                      </div>
                    </div>

                    {/* Extra Payment Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Extra Monthly Payment (Optional ₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                            type="number"
                            value={extraPayment}
                            onChange={(e) => setExtraPayment(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="0"
                            min="0"
                        />
                      </div>
                      {extraPayment > 0 && (
                          <p className="mt-2 text-xs text-blue-600 flex items-center gap-1">
                            <Info className="w-4 h-4" />
                            This will be applied directly to the principal each month.
                          </p>
                      )}
                    </div>
                  </div>

                  <button
                      onClick={calculateAmortization}
                      className="w-full mt-8 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <BarChart3 className="w-5 h-5" />
                    Calculate Amortization Schedule
                  </button>
                </motion.div>

                {/* Results Section */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-8"
                >
                  {!results && (
                      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center py-20">
                        <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-500 font-medium">
                          Enter your loan details to generate your **Amortization Schedule** and payment breakdown.
                        </p>
                      </div>
                  )}
                  {results && (
                      <>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Summary of Results</h2>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                          {/* Monthly Payment */}
                          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                            <DollarSign className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-gray-900">
                              ₹{(results.monthlyPayment + extraPayment).toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-600">Total Monthly Payment</div>
                            {extraPayment > 0 && (
                                <div className="text-xs text-blue-500 mt-1">
                                  (P&I: ₹{results.monthlyPayment.toFixed(0)} + Extra: ₹{extraPayment.toFixed(0)})
                                </div>
                            )}
                          </div>

                          {/* Total Payments */}
                          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-gray-900">
                              {results.totalPayments}
                            </div>
                            <div className="text-sm text-gray-600">Total Payments (Months)</div>
                            {results.totalPayments < loanTerm * 12 && (
                                <div className="text-xs text-green-500 mt-1">
                                  ({((loanTerm * 12) - results.totalPayments)} fewer payments)
                                </div>
                            )}
                          </div>

                          {/* Total Interest Paid */}
                          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                            <PiggyBank className="w-8 h-8 text-red-600 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-gray-900">
                              ₹{results.totalInterest.toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-600">Total Interest Paid</div>
                          </div>

                          {/* Total Amount Paid */}
                          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                            <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-gray-900">
                              ₹{results.totalPaid.toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-600">Total Amount Paid</div>
                          </div>
                        </div>

                        {/* Payment Schedule Table */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Payment Schedule (First 12 Months)</h3>
                            <button
                                onClick={downloadSchedule}
                                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Download Full CSV
                            </button>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                              <thead>
                              <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Month</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Total Payment</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Principal</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Interest</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Balance</th>
                              </tr>
                              </thead>
                              <tbody>
                              {results.schedule.map((row) => (
                                  <tr key={row.month} className="border-b border-gray-100 hover:bg-teal-50/50 transition-colors">
                                    <td className="py-3 px-2 text-sm text-gray-900">{row.month}</td>
                                    <td className="py-3 px-2 text-sm text-gray-900">₹{(row.payment + extraPayment).toFixed(2)}</td>
                                    <td className="py-3 px-2 text-sm text-green-600">₹{row.principal.toFixed(2)}</td>
                                    <td className="py-3 px-2 text-sm text-red-600">₹{row.interest.toFixed(2)}</td>
                                    <td className="py-3 px-2 text-sm text-gray-600">₹{row.balance.toFixed(2)}</td>
                                  </tr>
                              ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Principal vs Interest Chart/Breakdown */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-teal-600" />
                            Total Loan Breakdown
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="text-center">
                              <div className="w-40 h-40 mx-auto mb-4 rounded-full bg-gray-200 p-2 relative">
                                {/* Simple Pie Chart Visualization */}
                                <svg viewBox="0 0 32 32" className="w-full h-full">
                                  {/* Interest Arc */}
                                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#EF4444" strokeWidth="16"
                                          strokeDasharray={`${(results.totalInterest / results.totalPaid) * 100} 100`}
                                          transform="rotate(-90) translate(-32 0)" />
                                  {/* Principal Arc */}
                                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#10B981" strokeWidth="16"
                                          strokeDasharray={`${(loanAmount / results.totalPaid) * 100} 100`}
                                          transform="rotate(-90) translate(-32 0)" />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
                                100%
                            </span>
                              </div>
                              <div className="text-sm text-gray-600">Total Paid: **₹{results.totalPaid.toFixed(0)}**</div>
                            </div>
                            <div className="space-y-4 pt-4">

                              {/* Principal Row */}
                              <div className="flex flex-col">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-gray-600 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Loan Principal</span>
                                  <span className="text-base font-semibold text-green-700">
                                ₹{loanAmount.toFixed(0)}
                              </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                      className="bg-green-600 h-2 rounded-full"
                                      style={{ width: `${(loanAmount / results.totalPaid) * 100}%` }}
                                  ></div>
                                </div>
                              </div>

                              {/* Interest Row */}
                              <div className="flex flex-col">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-gray-600 flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-600" /> Total Interest Cost</span>
                                  <span className="text-base font-semibold text-red-700">
                                ₹{results.totalInterest.toFixed(0)}
                              </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                      className="bg-red-600 h-2 rounded-full"
                                      style={{ width: `${(results.totalInterest / results.totalPaid) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                  )}

                  {/* Tips Section (Internal Linking/SEO) */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Info className="w-6 h-6 text-blue-600" />
                      Maximize Your Loan Savings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-900">Front-Loaded Interest</div>
                          <div className="text-sm text-gray-600">The majority of early payments are interest. See the schedule above to track the shift!</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-900">Extra Payment Power</div>
                          <div className="text-sm text-gray-600">Even small extra payments applied to the principal can **significantly reduce the total interest paid** and shorten the loan term.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-900">Loan Comparison</div>
                          <div className="text-sm text-gray-600">Compare different scenarios (e.g., 15-year vs. 30-year term) to find the most cost-effective solution.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </div>
            </div>
          </section>

          {/* --- Content Section 1: In-depth Amortization Explanation (SEO Authority) --- */}
          <section className="py-16 bg-white/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                What is Loan Amortization and Why Does it Matter?
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6 text-lg text-gray-700">
                  <p>
                    Amortization is the accounting process of spreading out a loan obligation over a series of fixed, equal payments. Unlike simple interest loans, an **amortization schedule** systematically determines how each payment is split between **principal reduction** and **interest payment**. Understanding this process is vital for any borrower, particularly for long-term debts like mortgages.
                  </p>
                  <h3 className="text-xl font-semibold text-teal-600 pt-4">
                    The Critical Role of the Amortization Formula
                  </h3>
                  <p>
                    The formula used in this calculator guarantees that the loan balance reaches exactly zero by the last scheduled payment. The calculation uses compound interest principles, which is why early payments contribute heavily to interest: the interest is calculated on the remaining, higher loan principal. This calculator removes the complexity of manual calculations, providing you with a clear roadmap for your debt.
                  </p>
                  <h3 className="text-xl font-semibold text-teal-600 pt-4">
                    How Extra Principal Payments Save You Money
                  </h3>
                  <p>
                    When you input an 'Extra Monthly Payment,' that amount goes 100% towards the loan's principal. This action immediately reduces your outstanding balance, which in turn reduces the amount of interest charged in all subsequent payments. Over a 30-year term, this compounding effect can lead to **tens of thousands of rupees in savings** and shorten your loan term by several years, making early repayment a powerful financial strategy.
                  </p>
                </div>
                <div className="bg-teal-50 p-6 rounded-2xl border border-teal-200 h-fit">
                  <BarChart3 className="w-8 h-8 text-teal-600 mb-4" />
                  <h3 className="text-xl font-bold text-teal-800 mb-3">Targeted Long-Tail Keywords</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>**Extra payments on loan** savings calculation.</li>
                    <li>How to calculate **total interest paid on a loan**.</li>
                    <li>Monthly **mortgage payment breakdown**.</li>
                    <li>Free loan **amortization table download**.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


          {/* --- Content Section 2: FAQ Section (Targeting Featured Snippets) --- */}
          <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                Frequently Asked Questions (FAQs)
              </h2>
              <div className="max-w-4xl mx-auto space-y-6">
                {/* FAQ Item 1 */}
                <details className="p-6 rounded-xl bg-white shadow-md cursor-pointer group border border-gray-100">
                  <summary className="flex justify-between items-center text-lg font-semibold text-gray-900 list-none">
                    What is the amortization period of a loan?
                    <ArrowRight className="w-5 h-5 text-teal-600 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-gray-700">
                    The **amortization period** is the total length of time it will take to pay off the mortgage or loan in full, assuming you follow the original payment schedule. It is usually expressed in years (e.g., 15 years or 30 years). Our calculator shows the *actual* period, which may be shorter if you include extra payments.
                  </p>
                </details>

                {/* FAQ Item 2 */}
                <details className="p-6 rounded-xl bg-white shadow-md cursor-pointer group border border-gray-100">
                  <summary className="flex justify-between items-center text-lg font-semibold text-gray-900 list-none">
                    Why does the interest paid decrease over time?
                    <ArrowRight className="w-5 h-5 text-teal-600 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Interest is always calculated on the **remaining principal balance**. Since each payment reduces the principal, the interest calculated in the subsequent month is based on a smaller figure. This causes the interest portion of your monthly payment to steadily decrease, while the principal portion steadily increases.
                  </p>
                </details>

                {/* FAQ Item 3 */}
                <details className="p-6 rounded-xl bg-white shadow-md cursor-pointer group border border-gray-100">
                  <summary className="flex justify-between items-center text-lg font-semibold text-gray-900 list-none">
                    What is the difference between principal and interest?
                    <ArrowRight className="w-5 h-5 text-teal-600 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-gray-700">
                    The **principal** is the actual amount of money you borrowed. **Interest** is the cost of borrowing that money, expressed as a percentage rate. Every loan payment is a combination of both.
                  </p>
                </details>
              </div>
            </div>
          </section>

          <CTA />
        </div>
      </>
  );
}