import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Calculator, 
  TrendingDown, 
  Calendar, 
  DollarSign, 
  Target,
  BarChart3,
  PieChart,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Percent
} from "lucide-react";
import Head from "next/head";
import CTA from "@/components/CTA";

interface PayoffMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const payoffMethods: PayoffMethod[] = [
  {
    id: 'avalanche',
    name: 'Avalanche Method',
    description: 'Pay off highest interest rate first',
    icon: <TrendingDown className="w-5 h-5" />
  },
  {
    id: 'snowball',
    name: 'Snowball Method', 
    description: 'Pay off smallest balance first',
    icon: <Target className="w-5 h-5" />
  },
  {
    id: 'minimum',
    name: 'Minimum Payment',
    description: 'Pay only minimum amounts',
    icon: <AlertCircle className="w-5 h-5" />
  }
];

export default function CreditCardPayoffCalculator() {
  const [cards, setCards] = useState([
    { id: 1, name: 'Card 1', balance: 5000, rate: 18, minimum: 150 }
  ]);
  const [monthlyPayment, setMonthlyPayment] = useState(500);
  const [selectedMethod, setSelectedMethod] = useState('avalanche');
  const [results, setResults] = useState<any>(null);

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      name: `Card ${cards.length + 1}`,
      balance: 0,
      rate: 0,
      minimum: 0
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (id: number) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  const updateCard = (id: number, field: string, value: number | string) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const calculatePayoff = () => {
    const validCards = cards.filter(card => card.balance > 0 && card.rate > 0);
    if (validCards.length === 0) return;

    let sortedCards = [...validCards];
    
    if (selectedMethod === 'avalanche') {
      sortedCards.sort((a, b) => b.rate - a.rate);
    } else if (selectedMethod === 'snowball') {
      sortedCards.sort((a, b) => a.balance - b.balance);
    }

    const schedule = [];
    let remainingPayment = monthlyPayment;
    let totalInterest = 0;
    let month = 1;

    while (sortedCards.some(card => card.balance > 0) && month <= 120) {
      const monthSchedule: any = { month, cards: [] };
      let monthInterest = 0;

      // Calculate interest for each card
      sortedCards.forEach(card => {
        if (card.balance > 0) {
          const interest = (card.balance * card.rate / 100) / 12;
          monthInterest += interest;
          card.balance += interest;
        }
      });

      totalInterest += monthInterest;
      remainingPayment = monthlyPayment;

      // Apply payments based on method
      sortedCards.forEach(card => {
        if (card.balance > 0 && remainingPayment > 0) {
          let payment = 0;
          
          if (selectedMethod === 'minimum') {
            payment = Math.min(card.minimum, card.balance, remainingPayment);
          } else {
            // For avalanche/snowball, pay minimum first, then extra
            const minPayment = Math.min(card.minimum, card.balance);
            payment = minPayment;
            remainingPayment -= minPayment;
            
            // Apply remaining payment to current card
            if (remainingPayment > 0) {
              const extraPayment = Math.min(remainingPayment, card.balance - minPayment);
              payment += extraPayment;
              remainingPayment -= extraPayment;
            }
          }

          card.balance = Math.max(0, card.balance - payment);
          monthSchedule.cards.push({
            name: card.name,
            payment,
            balance: card.balance,
            interest: (card.balance * card.rate / 100) / 12
          });
        }
      });

      schedule.push(monthSchedule);
      month++;
    }

    setResults({
      totalMonths: month - 1,
      totalInterest,
      totalPaid: validCards.reduce((sum, card) => sum + card.balance, 0) + totalInterest,
      schedule: schedule.slice(0, 12) // Show first 12 months
    });
  };

  return (
    <>
      <Head>
        <title>Credit Card Payoff Calculator - Plan Your Debt Strategy | Samridhya</title>
        <meta name="description" content="Plan your credit card debt payoff strategy with our free calculator. Compare avalanche vs snowball methods and see how long it will take to become debt-free." />
        <meta name="keywords" content="credit card payoff calculator, debt payoff strategy, avalanche method, snowball method, credit card debt" />
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
                <CreditCard className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Debt Management</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Credit Card Payoff Calculator
              </h1>
              <p className="text-lg text-red-100 max-w-3xl mx-auto">
                Plan your credit card debt payoff strategy. Compare different methods and see how long it will take to become debt-free.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Credit Cards</h2>

                {/* Payoff Method Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Payoff Strategy</label>
                  <div className="grid grid-cols-1 gap-3">
                    {payoffMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedMethod === method.id
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          selectedMethod === method.id ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          {method.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Payment */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Payment Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                    <input
                      type="number"
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="500"
                    />
                  </div>
                </div>

                {/* Credit Cards */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Credit Cards</h3>
                    <button
                      onClick={addCard}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Add Card
                    </button>
                  </div>

                  {cards.map((card) => (
                    <div key={card.id} className="p-6 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <input
                          type="text"
                          value={card.name}
                          onChange={(e) => updateCard(card.id, 'name', e.target.value)}
                          className="text-lg font-semibold bg-transparent border-none focus:outline-none"
                        />
                        {cards.length > 1 && (
                          <button
                            onClick={() => removeCard(card.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Balance
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                            <input
                              type="number"
                              value={card.balance}
                              onChange={(e) => updateCard(card.id, 'balance', Number(e.target.value))}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Interest Rate (%)
                          </label>
                          <div className="relative">
                            <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              value={card.rate}
                              onChange={(e) => updateCard(card.id, 'rate', Number(e.target.value))}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Minimum Payment
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                            <input
                              type="number"
                              value={card.minimum}
                              onChange={(e) => updateCard(card.id, 'minimum', Number(e.target.value))}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={calculatePayoff}
                  className="w-full mt-8 bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate Payoff Plan
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">{results.totalMonths}</div>
                        <div className="text-sm text-gray-600">Months to Payoff</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <span className="w-8 h-8 text-red-600 mx-auto mb-3 text-2xl font-bold">₹</span>
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
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Schedule (First 12 Months)</h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {results.schedule.map((month: any) => (
                          <div key={month.month} className="border border-gray-200 rounded-lg p-4">
                            <div className="font-semibold text-gray-900 mb-2">Month {month.month}</div>
                            <div className="space-y-2">
                              {month.cards.map((card: any) => (
                                <div key={card.name} className="flex justify-between text-sm">
                                  <span className="text-gray-600">{card.name}</span>
                                  <span className="font-medium">${card.payment.toFixed(2)}</span>
                                </div>
                              ))}
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
                    Payoff Strategy Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Avalanche Method</div>
                        <div className="text-sm text-gray-600">Pay off highest interest rate first to minimize total interest paid</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Snowball Method</div>
                        <div className="text-sm text-gray-600">Pay off smallest balance first for psychological motivation</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Increase Payments</div>
                        <div className="text-sm text-gray-600">Even small increases in monthly payments can significantly reduce payoff time</div>
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
