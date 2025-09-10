// Client-side rendering for static export compatibility

import { motion } from 'framer-motion';
import Head from 'next/head';
import { Search, Filter, BookOpen, ChevronRight, Shield, Award, TrendingUp, Tag, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import BlogGrid from '@/components/BlogGrid';
import BlogSidebar from '@/components/BlogSidebar';
import PromotionalBanner from '@/components/PromotionalBanner';
import { blogService, BlogPost, Category } from '@/services/blogService';
import { trackEvent, trackButtonClick } from '@/utils/analytics';
import { toISOString, toDate } from '@/utils/dateUtils';

interface BlogPageProps {
  // No server-side props for static export
}

export default function BlogPage({}: BlogPageProps) {
  const router = useRouter();
  const { category, subcategory, tag } = router.query;
  
  // Initialize state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [sortBy, setSortBy] = useState<'Latest' | 'Popular' | 'Oldest'>('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [isClient, setIsClient] = useState(false);
  const [categories, setCategories] = useState<Category[]>([{ name: 'All', count: 0 }]);
  const [subcategories, setSubcategories] = useState<Category[]>([{ name: 'All', count: 0 }]);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string | undefined>();

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setApiError(undefined);
        
        console.log('🔄 Loading blog data...');
        
        // Load data in parallel
        const [posts, categoriesData, tagsData] = await Promise.all([
          blogService.getPublishedPosts(),
          blogService.getCategories(),
          blogService.getTags()
        ]);

        console.log(`✅ Loaded ${posts.length} posts, ${categoriesData.length} categories, ${tagsData.length} tags`);

        // Clean up posts to ensure no undefined values and convert Date objects to strings
        const cleanedPosts = posts.map(post => ({
          ...post,
          subcategory: post.subcategory || null,
          category: post.category || 'Uncategorized',
          tags: post.tags || [],
          featuredImage: post.featuredImage || null,
          seoTitle: post.seoTitle || null,
          seoDescription: post.seoDescription || null,
          seoKeywords: post.seoKeywords || [],
          readTime: post.readTime || null,
          views: post.views || 0,
          likes: post.likes || 0,
          shares: post.shares || 0,
          featured: post.featured || false,
          // Convert Date objects to ISO strings for JSON serialization
          publishedAt: toISOString(post.publishedAt),
          createdAt: toISOString(post.createdAt),
          updatedAt: toISOString(post.updatedAt),
        }));

        // Generate subcategories from posts
        const subcategoryMap = new Map<string, number>();
        cleanedPosts.forEach(post => {
          if (post.subcategory) {
            subcategoryMap.set(post.subcategory, (subcategoryMap.get(post.subcategory) || 0) + 1);
          }
        });

        const subcategoriesData = [
          { name: 'All', count: cleanedPosts.length },
          ...Array.from(subcategoryMap.entries()).map(([name, count]) => ({
            name,
            count
          }))
        ];

        setAllPosts(cleanedPosts);
        setCategories(categoriesData);
        setSubcategories(subcategoriesData);
        setPopularTags(tagsData.slice(0, 10));
        
      } catch (error) {
        console.error('❌ Error loading blog data:', error);
        setApiError(error instanceof Error ? error.message : 'Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Set client flag and update state from URL parameters
  useEffect(() => {
    setIsClient(true);
    
    // Update state from URL query parameters if they exist
    if (category && typeof category === 'string') {
      setSelectedCategory(category);
    }
    if (subcategory && typeof subcategory === 'string') {
      setSelectedSubcategory(subcategory);
    }
    if (tag && typeof tag === 'string') {
      setSearchQuery(tag);
    }
    
    // Temporarily disabled localStorage loading to fix redirect loops
    // Load localStorage values after component mounts (if no URL params)
    // if (!category && !subcategory && !tag) {
    //   const savedCategory = localStorage.getItem('blog_selectedCategory');
    //   const savedSubcategory = localStorage.getItem('blog_selectedSubcategory');
    //   const savedSearchQuery = localStorage.getItem('blog_searchQuery');
    //   const savedSortBy = localStorage.getItem('blog_sortBy');
    //   const savedCurrentPage = localStorage.getItem('blog_currentPage');
    //   
    //   if (savedCategory) setSelectedCategory(savedCategory);
    //   if (savedSubcategory) setSelectedSubcategory(savedSubcategory);
    //   if (savedSearchQuery) setSearchQuery(savedSearchQuery);
    //   if (savedSortBy) setSortBy(savedSortBy as 'Latest' | 'Popular' | 'Oldest');
    //   if (savedCurrentPage) setCurrentPage(parseInt(savedCurrentPage));
    // }
  }, [category, subcategory, tag]);

  // Update URL when filters change
  useEffect(() => {
    if (!isClient) return;

    // Temporarily disabled URL updates to fix redirect loops
    // const query: any = {};
    // if (selectedCategory !== 'All') query.category = selectedCategory;
    // if (selectedSubcategory !== 'All') query.subcategory = selectedSubcategory;
    // if (searchQuery.trim()) query.tag = searchQuery.trim();

    // Update URL without page reload - only if we're not already on the blog page
    // and only in development mode to avoid redirect loops
    // if (router.pathname === '/blog' && process.env.NODE_ENV === 'development') {
    //   router.replace({
    //     pathname: router.pathname,
    //     query: Object.keys(query).length > 0 ? query : {}
    //   }, undefined, { shallow: true });
    // }

    // Update active filters for display
    const filters = [];
    if (selectedCategory !== 'All') filters.push(selectedCategory);
    if (selectedSubcategory !== 'All') filters.push(selectedSubcategory);
    if (searchQuery.trim()) filters.push(`"${searchQuery.trim()}"`);
    setActiveFilters(filters);

  }, [selectedCategory, selectedSubcategory, searchQuery, isClient, router]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    // Temporarily disabled localStorage updates to fix redirect loops
    // if (isClient) {
    //   localStorage.setItem('blog_selectedCategory', selectedCategory);
    //   localStorage.setItem('blog_selectedSubcategory', selectedSubcategory);
    //   localStorage.setItem('blog_searchQuery', searchQuery);
    //   localStorage.setItem('blog_sortBy', sortBy);
    //   localStorage.setItem('blog_currentPage', currentPage.toString());
    // }
  }, [isClient, selectedCategory, selectedSubcategory, searchQuery, sortBy, currentPage]);

  // Filter and sort posts whenever relevant state changes
  useEffect(() => {
    if (allPosts.length === 0) return;

    let filtered = [...allPosts];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory !== 'All') {
      filtered = filtered.filter(post => post.subcategory === selectedSubcategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort posts
    switch (sortBy) {
      case 'Latest':
        filtered.sort((a, b) => {
          const dateA = a.publishedAt ? toDate(a.publishedAt)?.getTime() || 0 : 0;
          const dateB = b.publishedAt ? toDate(b.publishedAt)?.getTime() || 0 : 0;
          return dateB - dateA;
        });
        break;
      case 'Popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'Oldest':
        filtered.sort((a, b) => {
          const dateA = a.publishedAt ? toDate(a.publishedAt)?.getTime() || 0 : 0;
          const dateB = b.publishedAt ? toDate(b.publishedAt)?.getTime() || 0 : 0;
          return dateA - dateB;
        });
        break;
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [allPosts, selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('All'); // Reset subcategory when category changes
    trackButtonClick('blog_category_select', category);
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    trackButtonClick('blog_subcategory_select', subcategory);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    trackButtonClick('blog_search', query);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: 'Latest' | 'Popular' | 'Oldest') => {
    setSortBy(newSortBy);
    trackButtonClick('blog_sort_change', newSortBy);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    trackButtonClick('blog_page_change', page.toString());
  };

  // Handle tag click
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    trackButtonClick('blog_tag_click', tag);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSubcategory('All');
    setSearchQuery('');
    setSortBy('Latest');
    setCurrentPage(1);
    trackButtonClick('blog_clear_filters', 'all');
  };

  // Remove specific filter
  const removeFilter = (filter: string) => {
    if (selectedCategory === filter) {
      setSelectedCategory('All');
    } else if (selectedSubcategory === filter) {
      setSelectedSubcategory('All');
    } else if (searchQuery === filter.replace(/"/g, '')) {
      setSearchQuery('');
    }
    trackButtonClick('blog_remove_filter', filter);
  };

  // Track page view
  useEffect(() => {
    if (isClient && !isLoading) {
      trackEvent('page_view', {
        page_title: 'Blog',
        page_location: window.location.href,
        blog_posts_count: allPosts.length,
        selected_category: selectedCategory,
        search_query: searchQuery
      });
    }
  }, [isClient, isLoading, allPosts.length, selectedCategory, searchQuery]);

  return (
    <>
      <Head>
        <title>Samridhya Blog | Smart Insights on Personal Loans & Finance</title>
        <meta name="description" content="Explore expert blogs on personal loans, business loans, credit scores & EMI tips. Stay updated with Samridhya for smart, secure financial decisions." />
        <meta name="keywords" content="personal loans, business loans, credit score, EMI tips, financial advice, loan aggregator, Samridhya, finance blog" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Samridhya Blog | Smart Insights on Personal Loans & Finance" />
        <meta property="og:description" content="Explore expert blogs on personal loans, business loans, credit scores & EMI tips. Stay updated with Samridhya for smart, secure financial decisions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/blog/" />
        <meta property="og:image" content="https://samridhya.com/images/samridhya-preview.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Samridhya Blog | Smart Insights on Personal Loans & Finance" />
        <meta name="twitter:description" content="Explore expert blogs on personal loans, business loans, credit scores & EMI tips. Stay updated with Samridhya for smart, secure financial decisions." />
        <meta name="twitter:image" content="https://samridhya.com/images/samridhya-preview.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Samridhya Blog | Smart Insights on Personal Loans & Finance",
              "description": "Explore expert blogs on personal loans, business loans, credit scores & EMI tips. Stay updated with Samridhya for smart, secure financial decisions.",
              "url": "https://samridhya.com/blog/",
              "publisher": {
                "@type": "Organization",
                "name": "Samridhya",
                "url": "https://samridhya.com"
              },
              "blogPost": allPosts.slice(0, 5).map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "author": {
                  "@type": "Person",
                  "name": post.author
                },
                "datePublished": post.publishedAt,
                "dateModified": post.updatedAt,
                "url": `https://samridhya.com/blog/${post.slug}/`
              }))
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        
        {/* Top Margin for Navbar */}
        <div className="pt-16 sm:pt-20"></div>
        
        {/* Main content - always show page structure */}
        
        {/* Promotional Banner */}
        <div className="relative">
          <PromotionalBanner />
        </div>
        
        {/* Sticky Hero Section */}
        <section className="sticky top-16 sm:top-20 z-30 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-b border-gray-200">
          <div className="relative overflow-hidden pt-6 pb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Financial{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Insights & Tips
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  Expert advice and industry updates to help you make informed financial decisions.
                </p>
                
                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search articles, tips, and guides..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{allPosts.length} Articles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{categories.length - 1} Categories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Expert Insights</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Always First */}
            <div className="flex-1 order-1 lg:order-1">
              {/* Error Display */}
              {apiError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Unable to load blog posts
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>There was an error loading the blog posts. Please try refreshing the page.</p>
                        {process.env.NODE_ENV === 'development' && (
                          <p className="mt-1 text-xs">Error: {apiError}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Filters Display */}
              {activeFilters.length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-blue-900">Active Filters:</h3>
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {filter}
                        <button
                          onClick={() => removeFilter(filter)}
                          className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Filter and Sort Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Filter className="w-4 h-4" />
                    <span>Showing {filteredPosts.length} of {allPosts.length} posts</span>
                  </div>
                  {selectedCategory !== 'All' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {selectedCategory}
                    </span>
                  )}
                  {selectedSubcategory !== 'All' && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {selectedSubcategory}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as 'Latest' | 'Popular' | 'Oldest')}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Latest">Latest</option>
                    <option value="Popular">Popular</option>
                    <option value="Oldest">Oldest</option>
                  </select>
                </div>
              </div>

              {/* Blog Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                      {/* Image skeleton */}
                      <div className="h-48 bg-gray-200"></div>
                      
                      {/* Content skeleton */}
                      <div className="p-6">
                        {/* Category skeleton */}
                        <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                        
                        {/* Title skeleton */}
                        <div className="space-y-2 mb-4">
                          <div className="h-5 bg-gray-200 rounded w-full"></div>
                          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        
                        {/* Excerpt skeleton */}
                        <div className="space-y-2 mb-4">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                        
                        {/* Meta skeleton */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                            <div className="h-4 bg-gray-200 rounded w-12"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : currentPosts.length > 0 ? (
                <BlogGrid posts={currentPosts} />
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600">
                    {searchQuery ? `No posts match "${searchQuery}"` : 'No posts available in this category'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => handleSearch('')}
                      className="mt-4 text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>

            {/* Sidebar - Always Second */}
            <div className="hidden lg:block lg:w-80 lg:flex-shrink-0 order-2 lg:order-2">
              <div className="lg:sticky lg:top-20">
                <BlogSidebar
                  categories={categories}
                  subcategories={subcategories}
                  popularTags={popularTags}
                  selectedCategory={selectedCategory}
                  selectedSubcategory={selectedSubcategory}
                  onCategoryChange={handleCategorySelect}
                  onSubcategoryChange={handleSubcategorySelect}
                  onTagClick={handleTagClick}
                />
              </div>
            </div>
          </div>

          {/* Sidebar for Mobile/Tablet - Always at Bottom */}
          <div className="block lg:hidden mt-8 order-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Explore More</h3>
              <BlogSidebar
                categories={categories}
                subcategories={subcategories}
                popularTags={popularTags}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onCategoryChange={handleCategorySelect}
                onSubcategoryChange={handleSubcategorySelect}
                onTagClick={handleTagClick}
              />
            </div>
          </div>
        </section>

        <CTA />
      </div>
    </>
  );
}
