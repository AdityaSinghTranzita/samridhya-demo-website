'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';
import { Search, Filter, BookOpen, ChevronRight, Shield, Award, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import BlogGrid from '@/components/BlogGrid';
import BlogSidebar from '@/components/BlogSidebar';
import PromotionalBanner from '@/components/PromotionalBanner';
import { blogService, BlogPost } from '@/services/blogService';
import { trackEvent, trackButtonClick } from '@/utils/analytics';

export default function BlogPage() {
  // Initialize state with default values (consistent server/client)
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [sortBy, setSortBy] = useState<'Latest' | 'Popular' | 'Oldest'>('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [isClient, setIsClient] = useState(false);

  // Set client flag and load localStorage values on mount
  useEffect(() => {
    setIsClient(true);
    
    // Load localStorage values after component mounts
    const savedCategory = localStorage.getItem('blog_selectedCategory');
    const savedSearchQuery = localStorage.getItem('blog_searchQuery');
    const savedSortBy = localStorage.getItem('blog_sortBy');
    const savedCurrentPage = localStorage.getItem('blog_currentPage');
    
    if (savedCategory) setSelectedCategory(savedCategory);
    if (savedSearchQuery) setSearchQuery(savedSearchQuery);
    if (savedSortBy) setSortBy(savedSortBy as 'Latest' | 'Popular' | 'Oldest');
    if (savedCurrentPage) setCurrentPage(parseInt(savedCurrentPage));
  }, []);

  // Load blog posts on component mount
  useEffect(() => {
    const posts = blogService.getAllPosts();
    setAllPosts(posts);
    setFilteredPosts(posts);
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog_selectedCategory', selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog_searchQuery', searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog_sortBy', sortBy);
    }
  }, [sortBy]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog_currentPage', currentPage.toString());
    }
  }, [currentPage]);

  // Filter and sort posts when category, search, or sort changes
  useEffect(() => {
    let filtered = blogService.getFilteredPosts(selectedCategory, searchQuery);
    if (sortBy === 'Latest') {
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'Oldest') {
      filtered = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'Popular') {
      filtered = [...filtered].sort((a, b) => (b.meta?.views || 0) - (a.meta?.views || 0));
    }
    setFilteredPosts(filtered);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    trackEvent('blog_category_filter', { category });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query) {
      trackEvent('blog_search', { query });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('Latest');
    setCurrentPage(1);
    setShowMobileSearch(false);
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('blog_searchQuery');
      localStorage.removeItem('blog_selectedCategory');
      localStorage.removeItem('blog_sortBy');
      localStorage.removeItem('blog_currentPage');
    }
    trackEvent('blog_clear_filters');
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Blog & News - Samridhya | Financial Insights & Tips</title>
        <meta name="description" content="Stay updated with the latest insights, tips, and news from the world of digital lending. Expert financial advice and industry updates from Samridhya." />
        <meta name="keywords" content="financial blog, loan tips, financial advice, digital lending news, financial insights, money management tips" />
        <meta name="author" content="Samridhya" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Blog & News - Samridhya | Financial Insights & Tips" />
        <meta property="og:description" content="Stay updated with the latest insights, tips, and news from the world of digital lending. Expert financial advice and industry updates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/blog" />
        <meta property="og:image" content="https://samridhya.com/samridhya-preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Samridhya Blog - Financial Insights" />
        <meta property="og:site_name" content="Samridhya" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog & News - Samridhya | Financial Insights & Tips" />
        <meta name="twitter:description" content="Stay updated with the latest insights, tips, and news from the world of digital lending." />
        <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.png" />
        <meta name="twitter:image:alt" content="Samridhya Blog - Financial Insights" />
        <meta name="twitter:site" content="@samridhya" />
        <meta name="twitter:creator" content="@samridhya" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://samridhya.com/blog" />
        
        {/* Mobile Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Samridhya" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Samridhya Blog",
              "description": "Financial insights, tips, and news from the world of digital lending",
              "url": "https://samridhya.com/blog",
              "publisher": {
                "@type": "Organization",
                "name": "Samridhya",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://samridhya.com/favicon.svg"
                }
              },
              "mainEntity": {
                "@type": "Organization",
                "name": "Samridhya",
                "description": "Digital lending platform providing financial insights and tips"
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
      
        {/* Top Margin */}
        <div className="pt-16 sm:pt-20"></div>

        {/* Promotional Banner */}
        <div className="relative z-10">
          <PromotionalBanner />
        </div>

{/* Sticky Filter + Search Bar */}
<section className="sticky top-16 sm:top-20 z-30 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md pt-4 pb-3 mb-8">
  {/* Search Bar - Full Width */}
  <div className="w-full px-4 sm:px-6 lg:px-8 mb-4">
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-sm"
          />
        </div>
      </div>

              {/* Clear Button */}
        {(searchQuery || selectedCategory !== 'All') && (
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300 text-sm whitespace-nowrap"
          >
            Clear
          </button>
        )}
    </div>
  </div>

  {/* Category Chips */}
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="flex flex-wrap gap-2">
      {blogService.getCategories().map((category) => (
        <motion.button
          key={category.name}
          onClick={() => handleCategoryChange(category.name)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
            selectedCategory === category.name
              ? 'bg-blue-100 text-blue-700 border-blue-300'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-blue-50 hover:border-blue-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {category.name}
          <span className="ml-1.5 px-1.5 py-0.5 bg-white/80 rounded-full text-xs">
            {category.count}
          </span>
        </motion.button>
      ))}
    </div>
  </div>
</section>


        {/* Main Content */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12">
            {/* Blog Posts */}
            <div className="xl:col-span-3">
              {/* Results Header */}
              <motion.div
                className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
                  </h2>
                  <p className="text-gray-600 text-base">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
                    {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 text-sm text-gray-500 mt-4 sm:mt-0">
                  <span className="hidden sm:inline">Sort by:</span>
                  <select
                    className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as 'Latest' | 'Popular' | 'Oldest')}
                  >
                    <option value="Latest">Latest</option>
                    <option value="Popular">Popular</option>
                    <option value="Oldest">Oldest</option>
                  </select>
                </div>
              </motion.div>

              {/* Blog Grid */}
              <BlogGrid
                posts={currentPosts}
                columns={2}
                emptyMessage="No articles found"
                emptyIcon={<BookOpen className="w-8 h-8 text-gray-400" />}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  className="flex justify-center items-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first page, last page, current page, and pages around current
                        const shouldShow = 
                          page === 1 || 
                          page === totalPages || 
                          (page >= currentPage - 1 && page <= currentPage + 1);

                        if (!shouldShow) {
                          // Show ellipsis
                          if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="px-2 text-gray-400">...</span>;
                          }
                          return null;
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar with Features - Hidden on mobile */}
            <div className="hidden xl:block xl:col-span-1">
              <div className="sticky top-16 sm:top-20 h-fit">
                <BlogSidebar
                  onSearchChange={handleSearchChange}
                  onCategoryChange={handleCategoryChange}
                  selectedCategory={selectedCategory}
                  categories={blogService.getCategories()}
                  popularTags={blogService.getTags()}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <CTA />
      </div>
    </>
  );
}
