'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Download,
  FileText,
  Clock,
  Star
} from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';

interface CreditScoreForm {
  name: string;
  email: string;
  phone: string;
  age: string;
  income: string;
  employmentType: string;
  creditHistory: string;
  existingLoans: string;
  paymentHistory: string;
  creditUtilization: string;
}

interface CreditScoreResult {
  score: number;
  category: string;
  color: string;
  description: string;
  recommendations: string[];
}

const employmentTypes = [
  'Salaried',
  'Self-Employed',
  'Business Owner',
  'Freelancer',
  'Student',
  'Retired'
];

const creditHistoryOptions = [
  'No Credit History',
  'Less than 1 year',
  '1-3 years',
  '3-5 years',
  'More than 5 years'
];

const paymentHistoryOptions = [
  'Always on time',
  'Occasionally late (1-2 times)',
  'Sometimes late (3-5 times)',
  'Often late (6+ times)',
  'Defaulted on payments'
];

const creditUtilizationOptions = [
  '0-10%',
  '11-30%',
  '31-50%',
  '51-70%',
  '71-90%',
  '90%+'
];

const calculateCreditScore = (form: CreditScoreForm): CreditScoreResult => {
  let score = 300; // Base score

  // Age factor
  const age = parseInt(form.age);
  if (age >= 25 && age <= 65) score += 50;
  else if (age >= 18 && age < 25) score += 30;
  else score += 20;

  // Income factor
  const income = parseInt(form.income);
  if (income >= 1000000) score += 80;
  else if (income >= 500000) score += 60;
  else if (income >= 200000) score += 40;
  else if (income >= 100000) score += 20;
  else score += 10;

  // Employment type
  switch (form.employmentType) {
    case 'Salaried': score += 40; break;
    case 'Business Owner': score += 35; break;
    case 'Self-Employed': score += 30; break;
    case 'Freelancer': score += 25; break;
    case 'Student': score += 15; break;
    case 'Retired': score += 20; break;
  }

  // Credit history
  switch (form.creditHistory) {
    case 'More than 5 years': score += 60; break;
    case '3-5 years': score += 50; break;
    case '1-3 years': score += 35; break;
    case 'Less than 1 year': score += 20; break;
    case 'No Credit History': score += 10; break;
  }

  // Existing loans
  const loans = parseInt(form.existingLoans);
  if (loans === 0) score += 30;
  else if (loans <= 2) score += 20;
  else if (loans <= 4) score += 10;
  else score -= 10;

  // Payment history
  switch (form.paymentHistory) {
    case 'Always on time': score += 80; break;
    case 'Occasionally late (1-2 times)': score += 40; break;
    case 'Sometimes late (3-5 times)': score += 20; break;
    case 'Often late (6+ times)': score -= 20; break;
    case 'Defaulted on payments': score -= 60; break;
  }

  // Credit utilization
  switch (form.creditUtilization) {
    case '0-10%': score += 50; break;
    case '11-30%': score += 40; break;
    case '31-50%': score += 20; break;
    case '51-70%': score += 10; break;
    case '71-90%': score -= 10; break;
    case '90%+': score -= 30; break;
  }

  // Ensure score is within range
  score = Math.max(300, Math.min(900, score));

  // Determine category
  let category, color, description;
  if (score >= 750) {
    category = 'Excellent';
    color = 'text-green-600';
    description = 'You have an excellent credit score! You\'re likely to get the best interest rates and loan terms.';
  } else if (score >= 700) {
    category = 'Good';
    color = 'text-blue-600';
    description = 'You have a good credit score. You should qualify for most loans with competitive rates.';
  } else if (score >= 650) {
    category = 'Fair';
    color = 'text-yellow-600';
    description = 'Your credit score is fair. You may qualify for loans but with higher interest rates.';
  } else if (score >= 600) {
    category = 'Poor';
    color = 'text-orange-600';
    description = 'Your credit score needs improvement. Focus on building better credit habits.';
  } else {
    category = 'Very Poor';
    color = 'text-red-600';
    description = 'Your credit score needs significant improvement. Consider credit counseling.';
  }

  // Generate recommendations
  const recommendations = [];
  if (score < 700) {
    recommendations.push('Pay all bills on time to improve payment history');
    recommendations.push('Reduce credit card balances to lower utilization');
    recommendations.push('Avoid opening too many new credit accounts');
  }
  if (score < 650) {
    recommendations.push('Consider a secured credit card to build credit');
    recommendations.push('Review your credit report for errors');
    recommendations.push('Work on reducing existing debt');
  }
  if (score < 600) {
    recommendations.push('Seek professional credit counseling');
    recommendations.push('Focus on paying off high-interest debt first');
    recommendations.push('Consider debt consolidation options');
  }

  return { score, category, color, description, recommendations };
};

export default function CreditScoreChecker() {
  const [form, setForm] = useState<CreditScoreForm>({
    name: '',
    email: '',
    phone: '',
    age: '',
    income: '',
    employmentType: '',
    creditHistory: '',
    existingLoans: '',
    paymentHistory: '',
    creditUtilization: ''
  });

  const [result, setResult] = useState<CreditScoreResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof CreditScoreForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const scoreResult = calculateCreditScore(form);
      setResult(scoreResult);
      setIsCalculating(false);
    }, 2000);
  };

  const isFormValid = () => {
    return Object.values(form).every(value => value.trim() !== '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-900 via-cyan-900 to-indigo-900">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
              <Calculator className="w-5 h-5 text-white" />
              <span className="text-white/90 font-medium">Free Credit Score Checker</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Check Your Credit Score
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Instantly & Securely
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Get your estimated credit score in minutes. Our advanced algorithm analyzes your financial profile 
              to provide accurate credit insights and personalized recommendations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Credit Score Calculator</h2>
                  <p className="text-gray-600">Fill in your details to get started</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Age</label>
                      <input
                        type="number"
                        value={form.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Enter your age"
                        min="18"
                        max="100"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Annual Income (₹)</label>
                      <input
                        type="number"
                        value={form.income}
                        onChange={(e) => handleInputChange('income', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Enter annual income"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Employment Type</label>
                      <select
                        value={form.employmentType}
                        onChange={(e) => handleInputChange('employmentType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        required
                      >
                        <option value="" className="text-gray-500">Select employment type</option>
                        {employmentTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Credit Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Credit Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Credit History</label>
                      <select
                        value={form.creditHistory}
                        onChange={(e) => handleInputChange('creditHistory', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        required
                      >
                        <option value="" className="text-gray-500">Select credit history</option>
                        {creditHistoryOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Existing Loans</label>
                      <input
                        type="number"
                        value={form.existingLoans}
                        onChange={(e) => handleInputChange('existingLoans', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Number of active loans"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Payment History</label>
                      <select
                        value={form.paymentHistory}
                        onChange={(e) => handleInputChange('paymentHistory', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        required
                      >
                        <option value="" className="text-gray-500">Select payment history</option>
                        {paymentHistoryOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Credit Utilization</label>
                      <select
                        value={form.creditUtilization}
                        onChange={(e) => handleInputChange('creditUtilization', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        required
                      >
                        <option value="" className="text-gray-500">Select credit utilization</option>
                        {creditUtilizationOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid() || isCalculating}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCalculating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5" />
                      Calculate Credit Score
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Results */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {result ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="text-center mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your Credit Score</h2>
                    
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={result.score >= 750 ? '#10b981' : result.score >= 700 ? '#3b82f6' : result.score >= 650 ? '#f59e0b' : result.score >= 600 ? '#f97316' : '#ef4444'}
                          strokeWidth="8"
                          strokeDasharray={`${(result.score / 900) * 283} 283`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className={`text-3xl font-bold ${result.color}`}>{result.score}</div>
                          <div className={`text-sm font-medium ${result.color}`}>{result.category}</div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{result.description}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Report
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Check Your Score?</h3>
                    <p className="text-gray-600 mb-6">
                      Fill out the form on the left to get your estimated credit score and personalized recommendations.
                    </p>
                    
                    <div className="space-y-4 text-left">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">100% Secure & Private</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-600">Results in 2 minutes</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-600">Free credit insights</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Use Our Credit Score Checker?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get accurate credit insights with our advanced algorithm and comprehensive analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and never shared. We use bank-level security to protect your information.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Analysis</h3>
              <p className="text-gray-600">
                Our algorithm considers multiple factors to provide the most accurate credit score estimation.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Report</h3>
              <p className="text-gray-600">
                Get comprehensive insights with personalized recommendations to improve your credit score.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
} 