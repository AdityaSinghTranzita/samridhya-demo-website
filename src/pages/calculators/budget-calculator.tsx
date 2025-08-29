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
  Download,
  Plus,
  Trash2
} from "lucide-react";
import Head from "next/head";

interface IncomeItem {
  id: number;
  name: string;
  amount: number;
}

interface ExpenseItem {
  id: number;
  name: string;
  amount: number;
  category: string;
}

export default function BudgetCalculator() {
  const [incomes, setIncomes] = useState<IncomeItem[]>([
    { id: 1, name: 'Primary Salary', amount: 5000 }
  ]);

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 1, name: 'Rent/Mortgage', amount: 1500, category: 'Housing' },
    { id: 2, name: 'Utilities', amount: 300, category: 'Housing' },
    { id: 3, name: 'Groceries', amount: 400, category: 'Food' },
    { id: 4, name: 'Transportation', amount: 200, category: 'Transport' },
    { id: 5, name: 'Entertainment', amount: 150, category: 'Lifestyle' }
  ]);

  const [results, setResults] = useState<any>(null);

  const addIncome = () => {
    const newIncome = {
      id: Math.max(...incomes.map(i => i.id), 0) + 1,
      name: `Income ${incomes.length + 1}`,
      amount: 0
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

  const addExpense = () => {
    const newExpense = {
      id: Math.max(...expenses.map(e => e.id), 0) + 1,
      name: `Expense ${expenses.length + 1}`,
      amount: 0,
      category: 'Other'
    };
    setExpenses([...expenses, newExpense]);
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const updateExpense = (id: number, field: string, value: string | number) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, [field]: value } : expense
    ));
  };

  const calculateBudget = () => {
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netIncome = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netIncome / totalIncome) * 100 : 0;

    // Group expenses by category
    const expensesByCategory = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Calculate category percentages
    const categoryBreakdown = Object.entries(expensesByCategory).map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
    }));

    // Determine budget health
    let budgetHealth = '';
    let healthColor = '';
    let healthDescription = '';

    if (savingsRate >= 20) {
      budgetHealth = 'Excellent';
      healthColor = 'green';
      healthDescription = 'You\'re saving a great amount! Keep up the good work.';
    } else if (savingsRate >= 10) {
      budgetHealth = 'Good';
      healthColor = 'blue';
      healthDescription = 'You\'re saving well. Consider increasing your savings rate.';
    } else if (savingsRate >= 0) {
      budgetHealth = 'Fair';
      healthColor = 'yellow';
      healthDescription = 'You\'re breaking even. Look for ways to reduce expenses.';
    } else {
      budgetHealth = 'Poor';
      healthColor = 'red';
      healthDescription = 'You\'re spending more than you earn. Immediate action needed.';
    }

    setResults({
      totalIncome,
      totalExpenses,
      netIncome,
      savingsRate,
      budgetHealth,
      healthColor,
      healthDescription,
      categoryBreakdown
    });
  };

  const downloadBudget = () => {
    if (!results) return;

    const csvContent = [
      ['Budget Summary'],
      ['Total Income', results.totalIncome.toFixed(2)],
      ['Total Expenses', results.totalExpenses.toFixed(2)],
      ['Net Income', results.netIncome.toFixed(2)],
      ['Savings Rate', results.savingsRate.toFixed(2) + '%'],
      ['Budget Health', results.budgetHealth],
      [''],
      ['Income Breakdown'],
      ['Source', 'Amount'],
      ...incomes.map(income => [income.name, income.amount.toFixed(2)]),
      [''],
      ['Expense Breakdown'],
      ['Category', 'Name', 'Amount'],
      ...expenses.map(expense => [expense.category, expense.name, expense.amount.toFixed(2)]),
      [''],
      ['Category Summary'],
      ['Category', 'Amount', 'Percentage'],
      ...results.categoryBreakdown.map((cat: any) => [
        cat.category,
        cat.amount.toFixed(2),
        cat.percentage.toFixed(2) + '%'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'monthly-budget.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Budget Calculator - Create and Manage Your Monthly Budget | Samridhya</title>
        <meta name="description" content="Create and manage your monthly budget with income and expense tracking. Get insights on your spending patterns and savings rate." />
        <meta name="keywords" content="budget calculator, monthly budget, expense tracking, income management, financial planning" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <PieChart className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Budget Management</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Budget Calculator
              </h1>
              <p className="text-lg text-emerald-100 max-w-3xl mx-auto">
                Create and manage your monthly budget with income and expense tracking. Get insights on your spending patterns and savings rate.
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
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-green-600" />
                      Income Sources
                    </h2>
                    <button
                      onClick={addIncome}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
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
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                          <input
                            type="number"
                            value={income.amount}
                            onChange={(e) => updateIncome(income.id, 'amount', Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expenses */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <TrendingDown className="w-6 h-6 text-red-600" />
                      Monthly Expenses
                    </h2>
                    <button
                      onClick={addExpense}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Expense
                    </button>
                  </div>

                  <div className="space-y-4">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="text"
                            value={expense.name}
                            onChange={(e) => updateExpense(expense.id, 'name', e.target.value)}
                            className="text-lg font-semibold bg-transparent border-none focus:outline-none"
                          />
                          <button
                            onClick={() => removeExpense(expense.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <select
                              value={expense.category}
                              onChange={(e) => updateExpense(expense.id, 'category', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            >
                              <option value="Housing">Housing</option>
                              <option value="Food">Food</option>
                              <option value="Transport">Transport</option>
                              <option value="Lifestyle">Lifestyle</option>
                              <option value="Healthcare">Healthcare</option>
                              <option value="Education">Education</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                            <input
                              type="number"
                              value={expense.amount}
                              onChange={(e) => updateExpense(expense.id, 'amount', Number(e.target.value))}
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
                  onClick={calculateBudget}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate Budget
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
                          ₹{results.totalIncome.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Income</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingDown className="w-8 h-8 text-red-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.totalExpenses.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Expenses</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <PiggyBank className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{results.netIncome.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Net Income</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Percent className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.savingsRate.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">Savings Rate</div>
                      </div>
                    </div>

                    {/* Budget Health */}
                    <div className={`rounded-3xl p-8 border ${
                      results.healthColor === 'green' ? 'bg-green-50 border-green-200' :
                      results.healthColor === 'blue' ? 'bg-blue-50 border-blue-200' :
                      results.healthColor === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-red-50 border-red-200'
                    }`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className={`w-6 h-6 ${
                          results.healthColor === 'green' ? 'text-green-600' :
                          results.healthColor === 'blue' ? 'text-blue-600' :
                          results.healthColor === 'yellow' ? 'text-yellow-600' :
                          'text-red-600'
                        }`} />
                        Budget Health: {results.budgetHealth}
                      </h3>
                      <p className="text-gray-700">{results.healthDescription}</p>
                    </div>

                    {/* Category Breakdown */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Expense Breakdown by Category</h3>
                        <button
                          onClick={downloadBudget}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download CSV
                        </button>
                      </div>
                      <div className="space-y-4">
                        {results.categoryBreakdown.map((cat: any, index: number) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-900">{cat.category}</span>
                              <span className="text-gray-600">₹{cat.amount.toFixed(0)} ({cat.percentage.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-500" 
                                style={{ width: `${cat.percentage}%` }}
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
                    Budgeting Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">50/30/20 Rule</div>
                        <div className="text-sm text-gray-600">50% for needs, 30% for wants, 20% for savings</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Track Everything</div>
                        <div className="text-sm text-gray-600">Record all income and expenses, no matter how small</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Review Regularly</div>
                        <div className="text-sm text-gray-600">Check your budget monthly and adjust as needed</div>
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
