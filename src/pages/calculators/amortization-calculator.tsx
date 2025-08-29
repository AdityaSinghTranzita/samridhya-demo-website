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

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [extraPayment, setExtraPayment] = useState(0);
  const [results, setResults] = useState<any>(null);

  const calculateAmortization = () => {
    const principal = loanAmount;
    const rate = interestRate / 100;
    const monthlyRate = rate / 12;
    const totalPayments = loanTerm * 12;
    const totalMonthlyPayment = extraPayment;

    // Calculate monthly payment
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const schedule = [];
    let remainingBalance = principal;
    let totalInterest = 0;
    let totalPrincipal = 0;

    for (let month = 1; month <= totalPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      const extraPrincipalPayment = totalMonthlyPayment;
      const totalPrincipalPayment = principalPayment + extraPrincipalPayment;
      
      remainingBalance = Math.max(0, remainingBalance - totalPrincipalPayment);
      
      totalInterest += interestPayment;
      totalPrincipal += totalPrincipalPayment;

      schedule.push({
        month,
        payment: monthlyPayment + extraPayment,
        principal: totalPrincipalPayment,
        interest: interestPayment,
        balance: remainingBalance,
        totalInterest,
        totalPrincipal
      });

      if (remainingBalance <= 0) break;
    }

    const actualPayments = schedule.length;
    const totalPaid = totalPrincipal + totalInterest;

    setResults({
      monthlyPayment,
      totalPayments: actualPayments,
      totalInterest,
      totalPaid,
      schedule: schedule.slice(0, 12), // Show first 12 months
      fullSchedule: schedule
    });
  };

  const downloadSchedule = () => {
    if (!results) return;

    const csvContent = [
      ['Month', 'Payment', 'Principal', 'Interest', 'Remaining Balance', 'Total Interest', 'Total Principal'],
      ...results.fullSchedule.map((row: any) => [
        row.month,
        row.payment.toFixed(2),
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
        <title>Amortization Calculator - Loan Payment Schedule | Samridhya</title>
        <meta name="description" content="Create detailed loan payment schedules showing principal and interest breakdowns. See how your payments are applied over the loan term." />
        <meta name="keywords" content="amortization calculator, loan payment schedule, principal interest breakdown, loan amortization" />
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
                <span className="text-white font-semibold">Payment Schedule</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Amortization Calculator
              </h1>
              <p className="text-lg text-teal-100 max-w-3xl mx-auto">
                Create detailed loan payment schedules showing principal and interest breakdowns. See how your payments are applied over the loan term.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Details</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="200000"
                      />
                    </div>
                  </div>

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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="6.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (Years)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extra Monthly Payment (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        value={extraPayment}
                        onChange={(e) => setExtraPayment(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateAmortization}
                  className="w-full mt-8 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
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
                {results && (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <span className="w-8 h-8 text-teal-600 mx-auto mb-3 text-2xl font-bold">₹</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.monthlyPayment.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Monthly Payment</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.totalPayments}
                        </div>
                        <div className="text-sm text-gray-600">Total Payments</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <PiggyBank className="w-8 h-8 text-red-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.totalInterest.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Interest</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.totalPaid.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Amount</div>
                      </div>
                    </div>

                    {/* Payment Schedule */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Payment Schedule (First 12 Months)</h3>
                        <button
                          onClick={downloadSchedule}
                          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download CSV
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Month</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Payment</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Principal</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Interest</th>
                              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.schedule.map((row: any) => (
                              <tr key={row.month} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-sm text-gray-900">{row.month}</td>
                                <td className="py-3 px-2 text-sm text-gray-900">${row.payment.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-green-600">${row.principal.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-red-600">${row.interest.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm text-gray-600">${row.balance.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Principal vs Interest Chart */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Breakdown</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              ${results.totalPaid.toFixed(0)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">Total Amount Paid</div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Principal</span>
                            <span className="text-sm font-semibold text-green-600">
                              ${loanAmount.toFixed(0)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(loanAmount / results.totalPaid) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Interest</span>
                            <span className="text-sm font-semibold text-red-600">
                              ${results.totalInterest.toFixed(0)}
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
                  </>
                )}

                {/* Tips Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-600" />
                    Amortization Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Early Payments</div>
                        <div className="text-sm text-gray-600">Most of your early payments go toward interest, not principal</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Extra Payments</div>
                        <div className="text-sm text-gray-600">Even small extra payments can significantly reduce total interest</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Payment Schedule</div>
                        <div className="text-sm text-gray-600">Download the full schedule to track your loan progress</div>
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
