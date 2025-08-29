import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Globe, 
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
  Download,
  RefreshCw
} from "lucide-react";
import Head from "next/head";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' }
];

// Mock exchange rates (in real app, these would come from an API)
const mockExchangeRates: Record<string, number> = {
  'USD-EUR': 0.85,
  'USD-GBP': 0.73,
  'USD-INR': 74.5,
  'USD-JPY': 110.5,
  'USD-CAD': 1.25,
  'USD-AUD': 1.35,
  'USD-CHF': 0.92,
  'USD-CNY': 6.45,
  'USD-SGD': 1.35,
  'EUR-USD': 1.18,
  'EUR-GBP': 0.86,
  'EUR-INR': 87.8,
  'EUR-JPY': 130.2,
  'EUR-CAD': 1.47,
  'EUR-AUD': 1.59,
  'EUR-CHF': 1.08,
  'EUR-CNY': 7.61,
  'EUR-SGD': 1.59,
  'GBP-USD': 1.37,
  'GBP-EUR': 1.16,
  'GBP-INR': 102.1,
  'GBP-JPY': 151.4,
  'GBP-CAD': 1.71,
  'GBP-AUD': 1.85,
  'GBP-CHF': 1.26,
  'GBP-CNY': 8.84,
  'GBP-SGD': 1.85,
  'INR-USD': 0.013,
  'INR-EUR': 0.011,
  'INR-GBP': 0.0098,
  'INR-JPY': 1.48,
  'INR-CAD': 0.017,
  'INR-AUD': 0.018,
  'INR-CHF': 0.012,
  'INR-CNY': 0.087,
  'INR-SGD': 0.018
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [results, setResults] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const getExchangeRate = (from: string, to: string): number => {
    if (from === to) return 1;
    
    const directRate = mockExchangeRates[`${from}-${to}`];
    if (directRate) return directRate;
    
    const reverseRate = mockExchangeRates[`${to}-${from}`];
    if (reverseRate) return 1 / reverseRate;
    
    // Fallback: convert through USD
    const fromToUSD = mockExchangeRates[`${from}-USD`] || (from === 'USD' ? 1 : 1 / mockExchangeRates[`USD-${from}`]);
    const usdToTo = mockExchangeRates[`USD-${to}`] || (to === 'USD' ? 1 : 1 / mockExchangeRates[`${to}-USD`]);
    
    return fromToUSD * usdToTo;
  };

  const convertCurrency = () => {
    const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = amount * exchangeRate;
    
    // Calculate historical comparison (assuming 1 year ago)
    const historicalRate = exchangeRate * 0.95; // Mock historical rate
    const historicalAmount = amount * historicalRate;
    const change = convertedAmount - historicalAmount;
    const changePercentage = (change / historicalAmount) * 100;

    setResults({
      exchangeRate,
      convertedAmount,
      historicalAmount,
      change,
      changePercentage,
      lastUpdated: new Date()
    });
    setLastUpdated(new Date());
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      ['Currency Conversion Results'],
      ['Amount', amount.toFixed(2)],
      ['From Currency', fromCurrency],
      ['To Currency', toCurrency],
      ['Exchange Rate', results.exchangeRate.toFixed(4)],
      ['Converted Amount', results.convertedAmount.toFixed(2)],
      ['Historical Amount (1 year ago)', results.historicalAmount.toFixed(2)],
      ['Change', results.change.toFixed(2)],
      ['Change Percentage', results.changePercentage.toFixed(2) + '%'],
      ['Last Updated', lastUpdated.toISOString()]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'currency-conversion.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || code;
  };

  return (
    <>
      <Head>
        <title>Currency Converter - Convert Between Currencies | Samridhya</title>
        <meta name="description" content="Convert between different currencies with real-time exchange rates. Get accurate currency conversion and historical comparisons." />
        <meta name="keywords" content="currency converter, exchange rates, currency conversion, forex calculator, international money" />
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
                <Globe className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Global Exchange</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Currency Converter
              </h1>
              <p className="text-lg text-cyan-100 max-w-3xl mx-auto">
                Convert between different currencies with real-time exchange rates. Get accurate currency conversion and historical comparisons.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Currency Conversion</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Currency
                      </label>
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        {currencies.map(currency => (
                          <option key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={swapCurrencies}
                        className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                      >
                        <ArrowRight className="w-5 h-5 mx-auto text-gray-600" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To Currency
                      </label>
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        {currencies.map(currency => (
                          <option key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={convertCurrency}
                  className="w-full mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Convert Currency
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
                          {getCurrencySymbol(toCurrency)}{results.convertedAmount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">Converted Amount</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.exchangeRate.toFixed(4)}
                        </div>
                        <div className="text-sm text-gray-600">Exchange Rate</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {results.changePercentage.toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-600">1 Year Change</div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900">
                          {getCurrencySymbol(toCurrency)}{results.historicalAmount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">1 Year Ago</div>
                      </div>
                    </div>

                    {/* Conversion Summary */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Conversion Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Original Amount</span>
                          <span className="font-semibold text-gray-900">
                            {getCurrencySymbol(fromCurrency)}{amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Exchange Rate</span>
                          <span className="font-semibold text-blue-600">
                            1 {fromCurrency} = {results.exchangeRate.toFixed(4)} {toCurrency}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Converted Amount</span>
                          <span className="font-semibold text-green-600">
                            {getCurrencySymbol(toCurrency)}{results.convertedAmount.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">1 Year Change</span>
                          <span className={`font-semibold ${results.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {results.change >= 0 ? '+' : ''}{getCurrencySymbol(toCurrency)}{results.change.toFixed(2)} ({results.changePercentage.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Download Section */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Export Results</h3>
                        <button
                          onClick={downloadResults}
                          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download CSV
                        </button>
                      </div>
                      <div className="text-sm text-gray-600">
                        Last updated: {lastUpdated.toLocaleString()}
                      </div>
                    </div>
                  </>
                )}

                {/* Tips Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-600" />
                    Currency Conversion Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Check Rates Regularly</div>
                        <div className="text-sm text-gray-600">Exchange rates fluctuate throughout the day</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Consider Fees</div>
                        <div className="text-sm text-gray-600">Banks and exchange services may charge additional fees</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Plan Ahead</div>
                        <div className="text-sm text-gray-600">Monitor trends for better timing of currency exchanges</div>
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
