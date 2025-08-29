import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Calculator, 
  TrendingDown, 
  Calendar, 
  DollarSign, 
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Percent,
  Clock,
  PiggyBank,
  Users
} from "lucide-react";
import Head from "next/head";

interface DebtItem {
  id: number;
  name: string;
  monthlyPayment: number;
}

interface IncomeItem {
  id: number;
  name: string;
  monthlyAmount: number;
}

export default function DebtToIncomeCalculator() {
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: 1, name: 'Mortgage/Rent', monthlyPayment: 1500 },
    { id: 2, name: 'Car Loan', monthlyPayment: 400 },
    { id: 3, name: 'Credit Cards', monthlyPayment: 300 }
  ]);

  const [incomes, setIncomes] = useState<IncomeItem[]>([
    { id: 1, name: 'Primary Income', monthlyAmount: 5000 },
    { id: 2, name: 'Secondary Income', monthlyAmount: 1000 }
  ]);

  const [results, setResults] = useState<any>(null);

  const addDebt = () => {
    const newDebt = {
      id: Math.max(...debts.map(d => d.id), 0) + 1,
      name: `Debt ${debts.length + 1}`,
      monthlyPayment: 0
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter(debt => debt.id !== id));
    }
  };

  const updateDebt = (id: number, field: string, value: string | number) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const addIncome = () => {
    const newIncome = {
      id: Math.max(...incomes.map(i => i.id), 0) + 1,
      name: `Income ${incomes.length + 1}`,
      monthlyAmount: 0
    };
    setIncomes([...incomes, newIncome]);
  };

  const removeIncome = (id: number) => {
    if (incomes.length > 1) {
      setIncomes(incomes.filter(income => income.id !== id));
    }
  };

  const updateIncome = (id: number, field: string, value: string | number) => {
    setIncomes(incomes.map(income => 
      income.id === id ? { ...income, [field]: value } : income
    ));
  };

  const calculateDTI = () => {
    const totalMonthlyDebt = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
    const totalMonthlyIncome = incomes.reduce((sum, income) => sum + income.monthlyAmount, 0);
    
    if (totalMonthlyIncome === 0) return;

    const dtiRatio = (totalMonthlyDebt / totalMonthlyIncome) * 100;
    
    // Determine DTI category
    let category = '';
    let color = '';
    let description = '';
    
    if (dtiRatio <= 28) {
      category = 'Excellent';
      color = 'green';
      description = 'Your debt-to-income ratio is excellent. Lenders will likely offer you the best rates.';
    } else if (dtiRatio <= 36) {
      category = 'Good';
      color = 'blue';
      description = 'Your DTI ratio is good. Most lenders will approve your loan applications.';
    } else if (dtiRatio <= 43) {
      category = 'Fair';
      color = 'yellow';
      description = 'Your DTI ratio is acceptable but you may face some restrictions or higher rates.';
    } else if (dtiRatio <= 50) {
      category = 'Poor';
      color = 'orange';
      description = 'Your DTI ratio is high. You may have difficulty getting approved for new loans.';
    } else {
      category = 'Very Poor';
      color = 'red';
      description = 'Your DTI ratio is very high. Focus on paying down debt before applying for new loans.';
    }

    setResults({
      totalMonthlyDebt,
      totalMonthlyIncome,
      dtiRatio,
      category,
      color,
      description
    });
  };

  return (
    <>
      <Head>
        <title>Debt-to-Income Ratio Calculator - Financial Health Assessment | Samridhya</title>
        <meta name="description" content="Calculate your debt-to-income ratio to understand your financial health and lender requirements. Get insights on loan approval chances." />
        <meta name="keywords" content="debt to income ratio calculator, DTI calculator, financial health, loan approval, debt ratio" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <LineChart className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Financial Health</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Debt-to-Income Ratio Calculator
              </h1>
              <p className="text-lg text-cyan-100 max-w-3xl mx-auto">
                Calculate your debt-to-income ratio to understand your financial health and see how lenders view your borrowing capacity.
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
                {/* Monthly Income */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                              <span className="w-6 h-6 text-green-600 text-xl font-bold">₹</span>
                      Monthly Income
                    </h2>
                    <button
                      onClick={addIncome}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Income
                    </button>
                  </div>

                  <div className="space-y-4">
                    {incomes.map((income) => (
                      <div key={income.id} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="text"
                            value={income.name}
                            onChange={(e) => updateIncome(income.id, 'name', e.target.value)}
                            className="text-lg font-semibold bg-transparent border-none focus:outline-none"
                          />
                          {incomes.length > 1 && (
                            <button
                              onClick={() => removeIncome(income.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                          <input
                            type="number"
                            value={income.monthlyAmount}
                            onChange={(e) => updateIncome(income.id, 'monthlyAmount', Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly Debts */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      Monthly Debts
                    </h2>
                    <button
                      onClick={addDebt}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Add Debt
                    </button>
                  </div>

                  <div className="space-y-4">
                    {debts.map((debt) => (
                      <div key={debt.id} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="text"
                            value={debt.name}
                            onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                            className="text-lg font-semibold bg-transparent border-none focus:outline-none"
                          />
                          {debts.length > 1 && (
                            <button
                              onClick={() => removeDebt(debt.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                                                  <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                            <input
                              type="number"
                              value={debt.monthlyPayment}
                              onChange={(e) => updateDebt(debt.id, 'monthlyPayment', Number(e.target.value))}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={calculateDTI}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate DTI Ratio
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
                    {/* DTI Ratio Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Your DTI Ratio</h3>
                      <div className={`text-6xl font-bold mb-4 ${
                        results.color === 'green' ? 'text-green-600' :
                        results.color === 'blue' ? 'text-blue-600' :
                        results.color === 'yellow' ? 'text-yellow-600' :
                        results.color === 'orange' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {results.dtiRatio.toFixed(1)}%
                      </div>
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                        results.color === 'green' ? 'bg-green-100 text-green-800' :
                        results.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        results.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        results.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {results.category}
                      </div>
                      <p className="text-gray-600">{results.description}</p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <span className="w-8 h-8 text-green-600 mx-auto mb-3 text-2xl font-bold">₹</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.totalMonthlyIncome.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Monthly Income</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.totalMonthlyDebt.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Monthly Debt</div>
                      </div>
                    </div>

                    {/* Lender Guidelines */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Lender Guidelines</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-200">
                          <span className="text-gray-600">Front-end DTI (Housing)</span>
                          <span className="font-semibold text-green-600">≤ 28%</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-200">
                          <span className="text-gray-600">Back-end DTI (Total)</span>
                          <span className="font-semibold text-blue-600">≤ 36%</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-200">
                          <span className="text-gray-600">FHA Maximum</span>
                          <span className="font-semibold text-yellow-600">≤ 43%</span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <span className="text-gray-600">Conventional Maximum</span>
                          <span className="font-semibold text-orange-600">≤ 50%</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Tips Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-600" />
                    DTI Ratio Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Lower is Better</div>
                        <div className="text-sm text-gray-600">A lower DTI ratio means better loan terms and approval chances</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Include All Debts</div>
                        <div className="text-sm text-gray-600">Don't forget credit cards, student loans, and other monthly obligations</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Regular Monitoring</div>
                        <div className="text-sm text-gray-600">Check your DTI ratio regularly as your financial situation changes</div>
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
