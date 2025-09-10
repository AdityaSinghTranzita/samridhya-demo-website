import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  Clock, 
  DollarSign, 
  Home, 
  Car, 
  CreditCard, 
  PiggyBank, 
  Target,
  Percent,
  Calendar,
  Building,
  GraduationCap,
  Heart,
  Plane,
  Users,
  BarChart3,
  PieChart,
  LineChart,
  Wallet,
  Banknote,
  Coins,
  Receipt,
  FileText,
  Zap,
  Star,
  CheckCircle,
  Search
} from "lucide-react";
import { handleAppDownload } from "@/utils/appStore";
import { trackEvent, trackButtonClick } from "@/utils/analytics";
import Head from "next/head";
import Link from "next/link";

interface CalculatorCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  color: string;
  gradient: string;
  href: string;
  features: string[];
}

const calculators: CalculatorCard[] = [
          // Loan & Debt Calculators
        {
          id: 'emi-calculator',
          title: 'EMI Calculator',
          description: 'Calculate Equated Monthly Installments for any loan with detailed breakdown',
          icon: <Calculator className="w-8 h-8" />,
          category: 'Loan & Debt',
          color: 'blue',
          gradient: 'from-blue-600 to-purple-600',
          href: '/calculators/loan-calculator',
          features: ['Instant EMI calculation', 'Amortization schedule', 'Multiple loan types']
        },
        {
          id: 'mortgage-calculator',
          title: 'Mortgage Calculator',
          description: 'Calculate home loan EMI, affordability, and get detailed amortization schedule',
          icon: <Home className="w-8 h-8" />,
          category: 'Loan & Debt',
          color: 'emerald',
          gradient: 'from-emerald-600 to-teal-600',
          href: '/calculators/mortgage-calculator',
          features: ['Home loan EMI', 'Affordability check', 'Down payment options']
        },
        {
          id: 'auto-loan-calculator',
          title: 'Auto Loan Calculator',
          description: 'Calculate car loan EMI with trade-in options and detailed breakdown',
          icon: <Car className="w-8 h-8" />,
          category: 'Loan & Debt',
          color: 'orange',
          gradient: 'from-orange-600 to-red-600',
          href: '/calculators/auto-loan-calculator',
          features: ['Car loan EMI', 'Trade-in support', 'Year-wise breakdown']
        },
        {
          id: 'personal-loan-calculator',
          title: 'Personal Loan Calculator',
          description: 'Calculate personal loan EMI and total cost including processing fees',
          icon: <Wallet className="w-8 h-8" />,
          category: 'Loan & Debt',
          color: 'purple',
          gradient: 'from-purple-600 to-pink-600',
          href: '/calculators/personal-loan-calculator',
          features: ['Personal loan EMI', 'Processing fees', 'Affordability analysis']
        },
  {
    id: 'credit-card-payoff',
    title: 'Credit Card Payoff',
    description: 'Plan your credit card debt payoff strategy with minimum payments',
    icon: <CreditCard className="w-8 h-8" />,
    category: 'Loan & Debt',
    color: 'red',
    gradient: 'from-red-600 to-pink-600',
    href: '/calculators/credit-card-payoff',
    features: ['Payoff timeline', 'Interest savings', 'Payment strategies']
  },
  {
    id: 'refinance-calculator',
    title: 'Refinance Calculator',
    description: 'Compare current loan with refinancing options to save money',
    icon: <BarChart3 className="w-8 h-8" />,
    category: 'Loan & Debt',
    color: 'indigo',
    gradient: 'from-indigo-600 to-blue-600',
    href: '/calculators/refinance-calculator',
    features: ['Break-even analysis', 'Monthly savings', 'Total cost comparison']
  },
  {
    id: 'amortization-calculator',
    title: 'Amortization Calculator',
    description: 'Create detailed loan payment schedules showing principal and interest',
    icon: <PieChart className="w-8 h-8" />,
    category: 'Loan & Debt',
    color: 'teal',
    gradient: 'from-teal-600 to-cyan-600',
    href: '/calculators/amortization-calculator',
    features: ['Payment schedule', 'Principal vs interest', 'Early payoff impact']
  },
  {
    id: 'debt-to-income',
    title: 'Debt-to-Income Ratio',
    description: 'Calculate your DTI ratio to understand your financial health',
    icon: <LineChart className="w-8 h-8" />,
    category: 'Loan & Debt',
    color: 'cyan',
    gradient: 'from-cyan-600 to-blue-600',
    href: '/calculators/debt-to-income',
    features: ['DTI calculation', 'Lender requirements', 'Financial health score']
  },
  {
    id: 'credit-score-checker',
    title: 'Credit Score Checker',
    description: 'Check and understand your credit score with detailed analysis',
    icon: <Shield className="w-8 h-8" />,
    category: 'Loan & Debt',
    color: 'green',
    gradient: 'from-green-600 to-emerald-600',
    href: '/calculators/credit-score-checker',
    features: ['Credit score analysis', 'Improvement tips', 'Report generation']
  },

  // Investment & Savings Calculators
  {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    description: 'Calculate how your investments grow over time with compound interest',
    icon: <TrendingUp className="w-8 h-8" />,
    category: 'Investment & Savings',
    color: 'green',
    gradient: 'from-green-600 to-emerald-600',
    href: '/calculators/compound-interest',
    features: ['Growth projection', 'Time value of money', 'Investment planning']
  },
  {
    id: 'sip-calculator',
    title: 'SIP Calculator',
    description: 'Calculate returns on Systematic Investment Plans for wealth creation',
    icon: <Target className="w-8 h-8" />,
    category: 'Investment & Savings',
    color: 'emerald',
    gradient: 'from-emerald-600 to-green-600',
    href: '/calculators/sip-calculator',
    features: ['Monthly investment planning', 'Goal-based investing', 'Return projections']
  },
  {
    id: 'lumpsum-calculator',
    title: 'Lumpsum Calculator',
    description: 'Calculate future value of one-time investments with compound growth',
    icon: <Coins className="w-8 h-8" />,
    category: 'Investment & Savings',
    color: 'yellow',
    gradient: 'from-yellow-600 to-orange-600',
    href: '/calculators/lumpsum-calculator',
    features: ['One-time investment', 'Growth projection', 'Goal planning']
  },
  {
    id: 'fd-calculator',
    title: 'Fixed Deposit Calculator',
    description: 'Calculate maturity amount and interest earned on fixed deposits',
    icon: <Banknote className="w-8 h-8" />,
    category: 'Investment & Savings',
    color: 'blue',
    gradient: 'from-blue-600 to-indigo-600',
    href: '/calculators/fd-calculator',
    features: ['Maturity calculation', 'Interest rates', 'Tax implications']
  },
  {
    id: 'rd-calculator',
    title: 'Recurring Deposit Calculator',
    description: 'Calculate returns on regular monthly deposits over time',
    icon: <PiggyBank className="w-8 h-8" />,
    category: 'Investment & Savings',
    color: 'purple',
    gradient: 'from-purple-600 to-violet-600',
    href: '/calculators/rd-calculator',
    features: ['Monthly deposits', 'Regular savings', 'Goal achievement']
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    description: 'Calculate Return on Investment to measure profitability',
    icon: <Percent className="w-8 h-8" />,
    category: 'Investment & Savings',
    color: 'indigo',
    gradient: 'from-indigo-600 to-purple-600',
    href: '/calculators/roi-calculator',
    features: ['Profitability analysis', 'Investment comparison', 'Performance metrics']
  },
  {
    id: 'savings-goal',
    title: 'Savings Goal Calculator',
    description: 'Plan how much to save monthly to reach your financial goals',
    icon: <Target className="w-8 h-8" />,
    category: 'Retirement & Planning',
    color: 'teal',
    gradient: 'from-teal-600 to-emerald-600',
    href: '/calculators/savings-goal',
    features: ['Goal planning', 'Monthly savings', 'Timeline projection']
  },
  {
    id: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    description: 'Calculate simple interest on your investments with multiple time units',
    icon: <TrendingUp className="w-8 h-8" />,
    category: 'Investment & Savings',
    color: 'blue',
    gradient: 'from-blue-600 to-indigo-600',
    href: '/calculators/simple-interest-calculator',
    features: ['Simple interest calculation', 'Multiple time units', 'Year-wise breakdown']
  },
  {
    id: 'future-value-calculator',
    title: 'Future Value Calculator',
    description: 'Calculate the future value of your investments with compound interest',
    icon: <TrendingUp className="w-8 h-8" />,
    category: 'Investment & Savings',
    color: 'teal',
    gradient: 'from-teal-600 to-cyan-600',
    href: '/calculators/future-value-calculator',
    features: ['Future value projection', 'Multiple compounding', 'Growth analysis']
  },

  // Retirement & Planning Calculators
  {
    id: 'retirement-calculator',
    title: 'Retirement Calculator',
    description: 'Plan your retirement savings and estimate retirement corpus needed',
    icon: <Users className="w-8 h-8" />,
    category: 'Retirement & Planning',
    color: 'orange',
    gradient: 'from-orange-600 to-red-600',
    href: '/calculators/retirement-calculator',
    features: ['Retirement corpus', 'Monthly savings', 'Lifestyle planning']
  },
  {
    id: 'net-worth',
    title: 'Net Worth Calculator',
    description: 'Calculate your total net worth by subtracting liabilities from assets',
    icon: <BarChart3 className="w-8 h-8" />,
    category: 'Retirement & Planning',
    color: 'green',
    gradient: 'from-green-600 to-emerald-600',
    href: '/calculators/net-worth',
    features: ['Asset tracking', 'Liability management', 'Financial health']
  },
  {
    id: 'child-planning',
    title: 'Child Future Planning',
    description: 'Plan for your child\'s education and other future expenses',
    icon: <GraduationCap className="w-8 h-8" />,
    category: 'Retirement & Planning',
    color: 'pink',
    gradient: 'from-pink-600 to-rose-600',
    href: '/calculators/child-planning',
    features: ['Education planning', 'Expense projection', 'Investment strategy']
  },
  {
    id: 'budget-calculator',
    title: 'Budget Calculator',
    description: 'Create and manage your monthly budget with income and expense tracking',
    icon: <PieChart className="w-8 h-8" />,
    category: 'Retirement & Planning',
    color: 'emerald',
    gradient: 'from-emerald-600 to-teal-600',
    href: '/calculators/budget-calculator',
    features: ['Income tracking', 'Expense management', 'Savings goals']
  },

  // Tax Calculators
  {
    id: 'income-tax',
    title: 'Income Tax Calculator',
    description: 'Calculate your income tax liability with deductions and exemptions',
    icon: <Receipt className="w-8 h-8" />,
    category: 'Tax Calculators',
    color: 'red',
    gradient: 'from-red-600 to-pink-600',
    href: '/calculators/income-tax',
    features: ['Tax calculation', 'Deductions', 'Exemptions']
  },
  {
    id: 'gst-calculator',
    title: 'GST Calculator',
    description: 'Calculate Goods and Services Tax for products and services',
    icon: <FileText className="w-8 h-8" />,
    category: 'Tax Calculators',
    color: 'purple',
    gradient: 'from-purple-600 to-indigo-600',
    href: '/calculators/gst-calculator',
    features: ['GST calculation', 'Multiple rates', 'Invoice generation']
  },

  // Other Calculators
  {
    id: 'inflation-calculator',
    title: 'Inflation Calculator',
    description: 'See how inflation affects the purchasing power of money over time',
    icon: <TrendingUp className="w-8 h-8" />,
    category: 'Other Calculators',
    color: 'orange',
    gradient: 'from-orange-600 to-yellow-600',
    href: '/calculators/inflation-calculator',
    features: ['Purchasing power', 'Historical data', 'Future projections']
  },
  {
    id: 'currency-converter',
    title: 'Currency Converter',
    description: 'Convert between different currencies with real-time exchange rates',
    icon: <DollarSign className="w-8 h-8" />,
    category: 'Other Calculators',
    color: 'blue',
    gradient: 'from-blue-600 to-cyan-600',
    href: '/calculators/currency-converter',
    features: ['Real-time rates', 'Multiple currencies', 'Historical trends']
  },
  {
    id: 'mortgage-vs-rent',
    title: 'Mortgage vs Rent',
    description: 'Compare the costs of buying vs renting a home',
    icon: <Home className="w-8 h-8" />,
    category: 'Other Calculators',
    color: 'indigo',
    gradient: 'from-indigo-600 to-purple-600',
    href: '/calculators/mortgage-vs-rent',
    features: ['Cost comparison', 'Break-even analysis', 'Lifestyle factors']
  }
];

const categories = [
  'All Calculators',
  'Loan & Debt',
  'Investment & Savings', 
  'Retirement & Planning',
  'Tax Calculators',
  'Other Calculators'
];

export default function CalculatorsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Calculators');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalculators = calculators.filter(calculator => {
    const matchesCategory = selectedCategory === 'All Calculators' || calculator.category === selectedCategory;
    const matchesSearch = calculator.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         calculator.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCalculatorClick = (calculator: CalculatorCard) => {
    trackButtonClick('calculator_click', 'calculators_page', {
      calculator_id: calculator.id,
      calculator_title: calculator.title,
      category: calculator.category
    });
  };

  return (
    <>
      <Head>
        <title>Financial Calculators - Free Online Financial Tools | Samridhya</title>
        <meta name="description" content="Access our comprehensive collection of free financial calculators. Calculate EMI, investments, taxes, retirement planning and more with our easy-to-use online tools." />
        <meta name="keywords" content="financial calculators, EMI calculator, investment calculator, tax calculator, retirement calculator, loan calculator" />
        <meta property="og:title" content="Financial Calculators - Free Online Financial Tools | Samridhya" />
        <meta property="og:description" content="Access our comprehensive collection of free financial calculators. Calculate EMI, investments, taxes, retirement planning and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/calculators/" />
        <meta name="twitter:title" content="Financial Calculators - Free Online Financial Tools | Samridhya" />
        <meta name="twitter:description" content="Access our comprehensive collection of free financial calculators." />
      </Head>
      
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
      
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Calculator className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Financial Tools</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Smart Financial Calculators
              </h1>
              <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Access our comprehensive collection of free financial calculators. From EMI calculations to investment planning, 
                make informed financial decisions with our easy-to-use online tools.
              </p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Search Bar */}
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-white/70" />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-start gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm hover:scale-105'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {filteredCalculators.map((calculator, index) => (
                <motion.div
                  key={calculator.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Link href={calculator.href} onClick={() => handleCalculatorClick(calculator)}>
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${calculator.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {calculator.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                            {calculator.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {calculator.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                          {calculator.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-xs text-gray-500">{feature}</span>
                            </div>
                          ))}
                          {calculator.features.length > 2 && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-xs text-gray-500">+{calculator.features.length - 2} more features</span>
                            </div>
                          )}
                        </div>

                        {/* Category Badge */}
                        <div className="pt-4">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            {calculator.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {filteredCalculators.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No calculators found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our Financial Calculators?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Experience the best financial calculation tools with advanced features and accurate results
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Results</h3>
                <p className="text-gray-600">Get accurate calculations instantly with real-time processing</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Free</h3>
                <p className="text-gray-600">All calculators are completely free to use with no hidden charges</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Grade</h3>
                <p className="text-gray-600">Bank-grade accuracy with industry-standard calculation methods</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive</h3>
                <p className="text-gray-600">Cover all aspects of personal finance from loans to investments</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Ready to Make Smart Financial Decisions?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Download our mobile app for access to all calculators on the go, plus exclusive features and personalized insights.
              </p>
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Zap className="w-5 h-5" />
                Download App
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}


