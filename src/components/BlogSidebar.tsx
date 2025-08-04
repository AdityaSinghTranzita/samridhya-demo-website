'use client';

import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, BookOpen, Calculator, Shield, Users, TrendingDown, CreditCard, GraduationCap, Heart, Plane, Home, Building2, Zap, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Category } from '@/services/blogService';
import Link from 'next/link';

interface BlogSidebarProps {
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
  categories?: Category[];
  popularTags?: string[];
  className?: string;
}

const defaultCategories: Category[] = [];

const defaultPopularTags = [
  'Personal Loan', 'Business Loan', 'EMI Calculator', 'Credit Score',
  'Digital Gold', 'Loan Tips', 'Financial Planning', 'Investment',
  'Credit Card', 'Home Loan', 'Education Loan', 'Travel Loan'
];

export default function BlogSidebar({ 
  onSearchChange, 
  onCategoryChange, 
  selectedCategory = 'All',
  categories = defaultCategories,
  popularTags = defaultPopularTags,
  className = ""
}: BlogSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  const handleCategoryClick = (category: string) => {
    onCategoryChange?.(category);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      BookOpen,
      TrendingUp,
      Shield,
      Calculator,
      Users,
      TrendingDown
    };
    return iconMap[iconName] || BookOpen;
  };

  return (
    <div className={`space-y-6 h-fit ${className}`}>

      {/* Credit Score Checker Promotion */}
      <motion.div
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Check Your Credit Score</h3>
            <p className="text-sm text-gray-600">Free & Instant</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Get your credit score instantly and understand what it means for your loan applications.
        </p>
        <Link 
          href="/calculators/credit-score-checker"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 text-sm"
        >
          Check Now
        </Link>
      </motion.div>

      {/* Loan Types Promotion */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Our Loan Products</h3>
        <div className="space-y-3">
          <Link 
            href="/loans/personal-loan"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 group"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Personal Loan</h4>
              <p className="text-xs text-gray-500">Up to ₹25 Lakhs</p>
            </div>
          </Link>

          <Link 
            href="/loans/business-loan"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-all duration-300 group"
          >
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Business Loan</h4>
              <p className="text-xs text-gray-500">Up to ₹2 Crores</p>
            </div>
          </Link>

          <Link 
            href="/loans/education-loan"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-all duration-300 group"
          >
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Education Loan</h4>
              <p className="text-xs text-gray-500">Study Abroad & Local</p>
            </div>
          </Link>

          <Link 
            href="/loans/wedding-loan"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-50 transition-all duration-300 group"
          >
            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-pink-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">Wedding Loan</h4>
              <p className="text-xs text-gray-500">Perfect Wedding</p>
            </div>
          </Link>

          <Link 
            href="/loans/travel-loan"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-all duration-300 group"
          >
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Plane className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Travel Loan</h4>
              <p className="text-xs text-gray-500">Dream Vacation</p>
            </div>
          </Link>

          <Link 
            href="/loans/medical-loan"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-all duration-300 group"
          >
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">Medical Loan</h4>
              <p className="text-xs text-gray-500">Health First</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* EMI Calculator Promotion */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Calculator className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">EMI Calculator</h3>
            <p className="text-sm text-gray-600">Plan Your Loan</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Calculate your monthly EMI and understand the total cost of your loan.
        </p>
        <Link 
          href="/calculators/loan-calculator"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm"
        >
          Calculate EMI
        </Link>
      </motion.div>

      {/* Popular Tags */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-base font-bold text-gray-900 mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.slice(0, 6).map((tag, index) => (
            <motion.button
              key={tag}
              className="px-2 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-md text-xs font-medium transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-blue-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.02 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Blog Stats */}
      <motion.div
        className="grid grid-cols-1 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center border border-blue-100 shadow-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900 mb-1">213+</h4>
          <p className="text-gray-600 text-sm">Articles Published</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-100 shadow-lg">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900 mb-1">50K+</h4>
          <p className="text-gray-600 text-sm">Monthly Readers</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-100 shadow-lg">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900 mb-1">15+</h4>
          <p className="text-gray-600 text-sm">Categories</p>
        </div>
      </motion.div>
    </div>
  );
} 