'use client';

import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, BookOpen, Calculator, Shield, Users, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface BlogFeaturesProps {
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
}

const categories = [
  { name: 'All', icon: BookOpen, count: 213 },
  { name: 'Personal Loan', icon: TrendingUp, count: 213 },
  { name: 'Financial Advice', icon: Shield, count: 174 },
  { name: 'EMI Calculator', icon: Calculator, count: 15 },
  { name: 'Business Loan', icon: Users, count: 39 },
  { name: 'Credit Score', icon: TrendingDown, count: 27 },
  { name: 'Digital Gold', icon: BookOpen, count: 7 },
  { name: 'Loan Tips', icon: Shield, count: 45 },
];

const popularTags = [
  'Personal Loan', 'Business Loan', 'EMI Calculator', 'Credit Score',
  'Digital Gold', 'Loan Tips', 'Financial Planning', 'Investment',
  'Credit Card', 'Home Loan', 'Education Loan', 'Travel Loan'
];

export default function BlogFeatures({ onSearchChange, onCategoryChange, selectedCategory = 'All' }: BlogFeaturesProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  const handleCategoryClick = (category: string) => {
    onCategoryChange?.(category);
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, topics, or keywords..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80"
            />
          </div>
          
          {/* Filter Button */}
          <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </motion.div>

      {/* Categories Section */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6">Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            
            return (
              <motion.button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="text-xs font-medium text-gray-500 bg-white/80 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
                <span className="text-sm font-semibold leading-tight">{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Popular Tags */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
            <motion.button
              key={tag}
              className="px-3 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-blue-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.02 }}
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
        transition={{ duration: 0.6, delay: 0.3 }}
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