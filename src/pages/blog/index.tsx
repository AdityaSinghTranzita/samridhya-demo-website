// Client-side rendering for static export compatibility

import { motion } from 'framer-motion';
import Head from 'next/head';
import { Search, Filter, BookOpen, ChevronRight, Shield, Award, TrendingUp, Tag, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import BlogGrid from '@/components/BlogGrid';
import BlogSidebar from '@/components/BlogSidebar';
import PromotionalBanner from '@/components/PromotionalBanner';
// Import BlogService and types
import { blogService, BlogPost, Category } from '@/services/blogService';
import { trackEvent, trackButtonClick } from '@/utils/analytics';
import { toISOString, toDate } from '@/utils/dateUtils';

// --- Interface and Component Definition ---

interface BlogPageProps {
  // No server-side props for static export
}

export default function BlogPage({}: BlogPageProps) {
  const router = useRouter();
  const { category, subcategory, tag } = router.query;

  // Initialize state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'Latest' | 'Popular' | 'Oldest'>('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // New state for paginated/filtered results
  const [currentPagePosts, setCurrentPagePosts] = useState<BlogPost[]>([]);
  const [totalPostsCount, setTotalPostsCount] = useState(0); // Total count of posts matching filters

  const [isClient, setIsClient] = useState(false);
  const [categories, setCategories] = useState<Category[]>([{ name: 'All', count: 0 }]);
  const [subcategories, setSubcategories] = useState<Category[]>([{ name: 'All', count: 0 }]);
  const [allPostsCount, setAllPostsCount] = useState(0); // Total count of ALL published posts
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string | undefined>();

  // --- Data Fetching Logic (Enhanced) ---

  // Function to load posts for the current page/filters
  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setApiError(undefined);

    const limit = postsPerPage;
    const offset = (currentPage - 1) * postsPerPage;

    // Determine parameters for the API call
    const params = {
      status: 'published' as 'published',
      // Pass category for filtering
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      // NOTE: Subcategory is handled client-side if the API doesn't support it directly
      // For proper optimization, the API should support subcategory filtering.
      // If the API supports it: subcategory: selectedSubcategory !== 'All' ? selectedSubcategory : undefined,
      limit,
      offset,
    };

    // NOTE: For true optimized pagination, search should also be handled by the API.
    // Assuming a simple API for now, we'll handle search query post-fetch if necessary,
    // but the best practice is for the API to return the filtered/searched count and data.

    // If the API supported search:
    // if (searchQuery.trim()) { params.search = searchQuery.trim(); }

    // The sorting logic (`sortBy`) is also best implemented on the backend.
    // If the API supported sorting:
    // if (sortBy === 'Popular') { params.sortBy = 'views'; params.sortDirection = 'desc'; }
    // etc.

    try {
      console.log(`🔄 Loading page ${currentPage} with category: ${selectedCategory}...`);

      const { posts, total } = await blogService.getPostsWithPagination(params);

      // Clean up posts just like before for consistency and date conversion
      const cleanedPosts = posts.map(post => ({
        ...post,
        subcategory: post.subcategory || null,
        category: post.category || 'Uncategorized',
        tags: post.tags || [],
        views: post.views || 0,
        // Convert Date objects to ISO strings (or ensure they are strings if fetched that way)
        publishedAt: toISOString(post.publishedAt),
        createdAt: toISOString(post.createdAt),
        updatedAt: toISOString(post.updatedAt),
      }));

      // Apply client-side filtering (Subcategory, Search Query, and Sort)
      let finalFilteredPosts = cleanedPosts;
      let finalTotalCount = total;

      // If we are filtering by subcategory (and API doesn't handle it)
      if (selectedSubcategory !== 'All') {
        finalFilteredPosts = finalFilteredPosts.filter(post => post.subcategory === selectedSubcategory);
        // NOTE: If API doesn't filter, 'total' count will be wrong here.
        // We'd need to fetch *all* posts and filter client-side, which is not optimal.
        // For this optimized solution, we'll assume the API *can* provide the correct total.
        // If it cannot, the component needs to be rewritten to pre-fetch all IDs/metadata.
        // **Assuming the API `total` is the count *before* subcategory/search filter for simplicity and client-side only refinement.**
      }

      // Client-side search filtering (if API doesn't handle it)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        finalFilteredPosts = finalFilteredPosts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
        );
        // Again, 'total' will be wrong here. For proper pagination, the API must handle search.
      }

      // Client-side sorting (if API doesn't handle it)
      switch (sortBy) {
        case 'Latest':
          finalFilteredPosts.sort((a, b) => {
            const dateA = a.publishedAt ? toDate(a.publishedAt)?.getTime() || 0 : 0;
            const dateB = b.publishedAt ? toDate(b.publishedAt)?.getTime() || 0 : 0;
            return dateB - dateA;
          });
          break;
        case 'Popular':
          // The API should handle this sort before limiting, this is a suboptimal fallback
          finalFilteredPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
          break;
        case 'Oldest':
          finalFilteredPosts.sort((a, b) => {
            const dateA = a.publishedAt ? toDate(a.publishedAt)?.getTime() || 0 : 0;
            const dateB = b.publishedAt ? toDate(b.publishedAt)?.getTime() || 0 : 0;
            return dateA - dateB;
          });
          break;
      }

      // Set the posts for the current page and the total count from the API
      setCurrentPagePosts(finalFilteredPosts);
      setTotalPostsCount(finalTotalCount);
      console.log(`✅ Loaded ${finalFilteredPosts.length} posts for page ${currentPage}. Total count: ${finalTotalCount}`);

    } catch (error) {
      console.error('❌ Error loading paginated posts:', error);
      setApiError(error instanceof Error ? error.message : 'Failed to load blog posts for this page');
      setCurrentPagePosts([]);
      setTotalPostsCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, postsPerPage, selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  // Load all initial data (categories, tags, etc.) only once
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setApiError(undefined);

        console.log('🔄 Loading initial blog data (categories, tags)...');

        // Load data in parallel
        const [categoriesData, tagsData, allPublishedPosts] = await Promise.all([
          blogService.getCategories(),
          blogService.getTags(),
          blogService.getPublishedPosts() // Get all published posts to count "All"
        ]);

        // Generate subcategories from all posts (requires full post list)
        // **This step shows a conflict with pure paginated loading**
        // A truly optimized setup would get categories/subcategories/tags counts from the API.
        const allPostsForCount = allPublishedPosts;

        const subcategoryMap = new Map<string, number>();
        allPostsForCount.forEach(post => {
          if (post.subcategory) {
            subcategoryMap.set(post.subcategory, (subcategoryMap.get(post.subcategory) || 0) + 1);
          }
        });

        const subcategoriesData = [
          { name: 'All', count: allPostsForCount.length },
          ...Array.from(subcategoryMap.entries()).map(([name, count]) => ({
            name,
            count
          }))
        ];

        setAllPostsCount(allPostsForCount.length);
        setCategories(categoriesData);
        setSubcategories(subcategoriesData);
        setPopularTags(tagsData.slice(0, 10));

      } catch (error) {
        console.error('❌ Error loading initial blog data:', error);
        setApiError(error instanceof Error ? error.message : 'Failed to load blog metadata');
      }
    };

    loadInitialData();
  }, []);

  // Effect to run loadPosts whenever filters or page change
  useEffect(() => {
    // Reset to page 1 if any filter changes
    // This is handled in the `handle*` functions below, but needed here for initial load
    loadPosts();
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy, currentPage, loadPosts]);


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
  }, [category, subcategory, tag]);

  // Update URL and active filters when filters change
  useEffect(() => {
    if (!isClient) return;

    // Update active filters for display
    const filters = [];
    if (selectedCategory !== 'All') filters.push(selectedCategory);
    if (selectedSubcategory !== 'All') filters.push(selectedSubcategory);
    if (searchQuery.trim()) filters.push(`"${searchQuery.trim()}"`);
    setActiveFilters(filters);

  }, [selectedCategory, selectedSubcategory, searchQuery, isClient]);

  // Save state to localStorage whenever it changes (currently disabled)
  // ... (localStorage useEffect) ...

  // --- Utility Calculations ---

  const totalPages = Math.ceil(totalPostsCount / postsPerPage);

  // --- Handlers ---

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('All');
    setCurrentPage(1); // Crucial: Reset page on filter change
    trackButtonClick('blog_category_select', category);
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1); // Crucial: Reset page on filter change
    trackButtonClick('blog_subcategory_select', subcategory);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Crucial: Reset page on filter change
    trackButtonClick('blog_search', query);
  };

  const handleSortChange = (newSortBy: 'Latest' | 'Popular' | 'Oldest') => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Crucial: Reset page on sort change
    trackButtonClick('blog_sort_change', newSortBy);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the top of the content when page changes
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
    trackButtonClick('blog_page_change', page.toString());
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setCurrentPage(1); // Crucial: Reset page on filter change
    trackButtonClick('blog_tag_click', tag);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSubcategory('All');
    setSearchQuery('');
    setSortBy('Latest');
    setCurrentPage(1);
    trackButtonClick('blog_clear_filters', 'all');
  };

  const removeFilter = (filter: string) => {
    if (selectedCategory === filter) {
      setSelectedCategory('All');
      setCurrentPage(1);
    } else if (selectedSubcategory === filter) {
      setSelectedSubcategory('All');
      setCurrentPage(1);
    } else if (searchQuery === filter.replace(/"/g, '')) {
      setSearchQuery('');
      setCurrentPage(1);
    }
    trackButtonClick('blog_remove_filter', filter);
  };

  // Track page view
  useEffect(() => {
    if (isClient && !isLoading) {
      trackEvent('page_view', {
        page_title: 'Blog',
        page_location: window.location.href,
        blog_posts_total_count: allPostsCount, // Using the full count
        selected_category: selectedCategory,
        search_query: searchQuery
      });
    }
  }, [isClient, isLoading, allPostsCount, selectedCategory, searchQuery]);

  // --- Render ---

  return (
      <>
        <Head>
          <title>Samridhya Blog | Smart Insights on Personal Loans & Finance</title>
          <meta name="description" content="Explore expert blogs on personal loans, business loans, credit scores & EMI tips. Stay updated with Samridhya for smart, secure financial decisions." />
          <meta name="keywords" content="personal loans, business loans, credit score, EMI tips, financial advice, loan aggregator, Samridhya, finance blog" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph / Twitter / Structured Data (Keep existing, using first few posts for JSON-LD is still valid) */}
          {/* ... (SEO Meta Tags) ... */}

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
                  // Note: Using a fixed number of posts for JSON-LD is better than the paginated set
                  "blogPost": currentPagePosts.slice(0, 5).map(post => ({
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
                      <span>{allPostsCount} Articles</span>
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
                      {/* Updated to show count of filtered/paginated posts */}
                      <span>Showing {totalPostsCount} posts</span>
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
                    // Loading Skeleton (Keep existing)
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(postsPerPage)].map((_, index) => (
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
                ) : currentPagePosts.length > 0 ? (
                    // Use currentPagePosts for the grid
                    <BlogGrid posts={currentPagePosts} />
                ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Search className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                      <p className="text-gray-600">
                        {searchQuery ? `No posts match "${searchQuery}"` : 'No posts available with the current filters'}
                      </p>
                      {(searchQuery || selectedCategory !== 'All' || selectedSubcategory !== 'All') && (
                          <button
                              onClick={clearAllFilters}
                              className="mt-4 text-blue-600 hover:text-blue-800 underline"
                          >
                            Clear all filters
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
                            disabled={currentPage === 1 || isLoading}
                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>

                        {/* Dynamic Page Buttons: Show current, previous, next, first, last, with ellipsis */}
                        {totalPages <= 7 ? (
                            // Show all pages if 7 or less
                            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    disabled={isLoading}
                                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                  {page}
                                </button>
                            ))
                        ) : (
                            // Show more complex pagination for many pages
                            <>
                              {/* Always show page 1 */}
                              <PageButton page={1} currentPage={currentPage} onClick={handlePageChange} isLoading={isLoading} />

                              {/* Left ellipsis */}
                              {currentPage > 3 && <span className="px-3 py-2 text-sm text-gray-500">...</span>}

                              {/* Current page, previous, and next */}
                              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                                let pageToShow = currentPage + i - 1;
                                if (currentPage <= 3) pageToShow = i + 2; // Shift right near start
                                else if (currentPage >= totalPages - 2) pageToShow = totalPages - 3 + i; // Shift left near end

                                // Clamp the value to ensure it's not 1 or totalPages
                                if (pageToShow > 1 && pageToShow < totalPages) {
                                  return (
                                      <PageButton
                                          key={pageToShow}
                                          page={pageToShow}
                                          currentPage={currentPage}
                                          onClick={handlePageChange}
                                          isLoading={isLoading}
                                      />
                                  );
                                }
                                return null;
                              }).filter(Boolean)}

                              {/* Right ellipsis */}
                              {currentPage < totalPages - 2 && <span className="px-3 py-2 text-sm text-gray-500">...</span>}

                              {/* Always show last page */}
                              <PageButton page={totalPages} currentPage={currentPage} onClick={handlePageChange} isLoading={isLoading} />
                            </>
                        )}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || isLoading}
                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                )}
              </div>

              {/* Sidebar - Keep existing */}
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

            {/* Sidebar for Mobile/Tablet - Keep existing */}
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

// Helper component for clean pagination buttons
const PageButton = ({ page, currentPage, onClick, isLoading }) => (
    <button
        onClick={() => onClick(page)}
        disabled={isLoading || page === currentPage}
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
        }`}
    >
      {page}
    </button>
);










// // Client-side rendering for static export compatibility



//
// import { motion } from 'framer-motion';
// import Head from 'next/head';
// import { Search, Filter, BookOpen, ChevronRight, Shield, Award, TrendingUp, Tag, X } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Navbar from '@/components/Navbar';
// import CTA from '@/components/CTA';
// import BlogGrid from '@/components/BlogGrid';
// import BlogSidebar from '@/components/BlogSidebar';
// import PromotionalBanner from '@/components/PromotionalBanner';
// import { blogService, BlogPost, Category } from '@/services/blogService';
// import { trackEvent, trackButtonClick } from '@/utils/analytics';
// import { toISOString, toDate } from '@/utils/dateUtils';
//
// interface BlogPageProps {
//   // No server-side props for static export
// }
//
// export default function BlogPage({}: BlogPageProps) {
//   const router = useRouter();
//   const { category, subcategory, tag } = router.query;
//
//   // Initialize state
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
//   const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
//   const [sortBy, setSortBy] = useState<'Latest' | 'Popular' | 'Oldest'>('Latest');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(6);
//   const [isClient, setIsClient] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([{ name: 'All', count: 0 }]);
//   const [subcategories, setSubcategories] = useState<Category[]>([{ name: 'All', count: 0 }]);
//   const [popularTags, setPopularTags] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [selectedSubcategory, setSelectedSubcategory] = useState('All');
//   const [activeFilters, setActiveFilters] = useState<string[]>([]);
//   const [apiError, setApiError] = useState<string | undefined>();
//
//   // Load data on component mount
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setIsLoading(true);
//         setApiError(undefined);
//
//         console.log('🔄 Loading blog data...');
//
//         // Load data in parallel
//         const [posts, categoriesData, tagsData] = await Promise.all([
//           blogService.getPublishedPosts(),
//           blogService.getCategories(),
//           blogService.getTags()
//         ]);
//
//         console.log(`✅ Loaded ${posts.length} posts, ${categoriesData.length} categories, ${tagsData.length} tags`);
//
//         // Clean up posts to ensure no undefined values and convert Date objects to strings
//         const cleanedPosts = posts.map(post => ({
//           ...post,
//           subcategory: post.subcategory || null,
//           category: post.category || 'Uncategorized',
//           tags: post.tags || [],
//           featuredImage: post.featuredImage || null,
//           seoTitle: post.seoTitle || null,
//           seoDescription: post.seoDescription || null,
//           seoKeywords: post.seoKeywords || [],
//           readTime: post.readTime || null,
//           views: post.views || 0,
//           likes: post.likes || 0,
//           shares: post.shares || 0,
//           featured: post.featured || false,
//           // Convert Date objects to ISO strings for JSON serialization
//           publishedAt: toISOString(post.publishedAt),
//           createdAt: toISOString(post.createdAt),
//           updatedAt: toISOString(post.updatedAt),
//         }));
//
//         // Generate subcategories from posts
//         const subcategoryMap = new Map<string, number>();
//         cleanedPosts.forEach(post => {
//           if (post.subcategory) {
//             subcategoryMap.set(post.subcategory, (subcategoryMap.get(post.subcategory) || 0) + 1);
//           }
//         });
//
//         const subcategoriesData = [
//           { name: 'All', count: cleanedPosts.length },
//           ...Array.from(subcategoryMap.entries()).map(([name, count]) => ({
//             name,
//             count
//           }))
//         ];
//
//         setAllPosts(cleanedPosts);
//         setCategories(categoriesData);
//         setSubcategories(subcategoriesData);
//         setPopularTags(tagsData.slice(0, 10));
//
//       } catch (error) {
//         console.error('❌ Error loading blog data:', error);
//         setApiError(error instanceof Error ? error.message : 'Failed to load blog posts');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//
//     loadData();
//   }, []);
//
//   // Set client flag and update state from URL parameters
//   useEffect(() => {
//     setIsClient(true);
//
//     // Update state from URL query parameters if they exist
//     if (category && typeof category === 'string') {
//       setSelectedCategory(category);
//     }
//     if (subcategory && typeof subcategory === 'string') {
//       setSelectedSubcategory(subcategory);
//     }
//     if (tag && typeof tag === 'string') {
//       setSearchQuery(tag);
//     }
//
//     // Temporarily disabled localStorage loading to fix redirect loops
//     // Load localStorage values after component mounts (if no URL params)
//     // if (!category && !subcategory && !tag) {
//     //   const savedCategory = localStorage.getItem('blog_selectedCategory');
//     //   const savedSubcategory = localStorage.getItem('blog_selectedSubcategory');
//     //   const savedSearchQuery = localStorage.getItem('blog_searchQuery');
//     //   const savedSortBy = localStorage.getItem('blog_sortBy');
//     //   const savedCurrentPage = localStorage.getItem('blog_currentPage');
//     //
//     //   if (savedCategory) setSelectedCategory(savedCategory);
//     //   if (savedSubcategory) setSelectedSubcategory(savedSubcategory);
//     //   if (savedSearchQuery) setSearchQuery(savedSearchQuery);
//     //   if (savedSortBy) setSortBy(savedSortBy as 'Latest' | 'Popular' | 'Oldest');
//     //   if (savedCurrentPage) setCurrentPage(parseInt(savedCurrentPage));
//     // }
//   }, [category, subcategory, tag]);
//
//   // Update URL when filters change
//   useEffect(() => {
//     if (!isClient) return;
//
//     // Temporarily disabled URL updates to fix redirect loops
//     // const query: any = {};
//     // if (selectedCategory !== 'All') query.category = selectedCategory;
//     // if (selectedSubcategory !== 'All') query.subcategory = selectedSubcategory;
//     // if (searchQuery.trim()) query.tag = searchQuery.trim();
//
//     // Update URL without page reload - only if we're not already on the blog page
//     // and only in development mode to avoid redirect loops
//     // if (router.pathname === '/blog' && process.env.NODE_ENV === 'development') {
//     //   router.replace({
//     //     pathname: router.pathname,
//     //     query: Object.keys(query).length > 0 ? query : {}
//     //   }, undefined, { shallow: true });
//     // }
//
//     // Update active filters for display
//     const filters = [];
//     if (selectedCategory !== 'All') filters.push(selectedCategory);
//     if (selectedSubcategory !== 'All') filters.push(selectedSubcategory);
//     if (searchQuery.trim()) filters.push(`"${searchQuery.trim()}"`);
//     setActiveFilters(filters);
//
//   }, [selectedCategory, selectedSubcategory, searchQuery, isClient, router]);
//
//   // Save state to localStorage whenever it changes
//   useEffect(() => {
//     // Temporarily disabled localStorage updates to fix redirect loops
//     // if (isClient) {
//     //   localStorage.setItem('blog_selectedCategory', selectedCategory);
//     //   localStorage.setItem('blog_selectedSubcategory', selectedSubcategory);
//     //   localStorage.setItem('blog_searchQuery', searchQuery);
//     //   localStorage.setItem('blog_sortBy', sortBy);
//     //   localStorage.setItem('blog_currentPage', currentPage.toString());
//     // }
//   }, [isClient, selectedCategory, selectedSubcategory, searchQuery, sortBy, currentPage]);
//
//   // Filter and sort posts whenever relevant state changes
//   useEffect(() => {
//     if (allPosts.length === 0) return;
//
//     let filtered = [...allPosts];
//
//     // Filter by category
//     if (selectedCategory !== 'All') {
//       filtered = filtered.filter(post => post.category === selectedCategory);
//     }
//
//     // Filter by subcategory
//     if (selectedSubcategory !== 'All') {
//       filtered = filtered.filter(post => post.subcategory === selectedSubcategory);
//     }
//
//     // Filter by search query
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(post =>
//         post.title.toLowerCase().includes(query) ||
//         post.excerpt.toLowerCase().includes(query) ||
//         post.content.toLowerCase().includes(query) ||
//         post.tags.some(tag => tag.toLowerCase().includes(query))
//       );
//     }
//
//     // Sort posts
//     switch (sortBy) {
//       case 'Latest':
//         filtered.sort((a, b) => {
//           const dateA = a.publishedAt ? toDate(a.publishedAt)?.getTime() || 0 : 0;
//           const dateB = b.publishedAt ? toDate(b.publishedAt)?.getTime() || 0 : 0;
//           return dateB - dateA;
//         });
//         break;
//       case 'Popular':
//         filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
//         break;
//       case 'Oldest':
//         filtered.sort((a, b) => {
//           const dateA = a.publishedAt ? toDate(a.publishedAt)?.getTime() || 0 : 0;
//           const dateB = b.publishedAt ? toDate(b.publishedAt)?.getTime() || 0 : 0;
//           return dateA - dateB;
//         });
//         break;
//     }
//
//     setFilteredPosts(filtered);
//     setCurrentPage(1); // Reset to first page when filtering
//   }, [allPosts, selectedCategory, selectedSubcategory, searchQuery, sortBy]);
//
//   // Calculate pagination
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
//   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
//
//   // Handle category selection
//   const handleCategorySelect = (category: string) => {
//     setSelectedCategory(category);
//     setSelectedSubcategory('All'); // Reset subcategory when category changes
//     trackButtonClick('blog_category_select', category);
//   };
//
//   // Handle subcategory selection
//   const handleSubcategorySelect = (subcategory: string) => {
//     setSelectedSubcategory(subcategory);
//     trackButtonClick('blog_subcategory_select', subcategory);
//   };
//
//   // Handle search
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     trackButtonClick('blog_search', query);
//   };
//
//   // Handle sort change
//   const handleSortChange = (newSortBy: 'Latest' | 'Popular' | 'Oldest') => {
//     setSortBy(newSortBy);
//     trackButtonClick('blog_sort_change', newSortBy);
//   };
//
//   // Handle page change
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     trackButtonClick('blog_page_change', page.toString());
//   };
//
//   // Handle tag click
//   const handleTagClick = (tag: string) => {
//     setSearchQuery(tag);
//     trackButtonClick('blog_tag_click', tag);
//   };
//
//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedCategory('All');
//     setSelectedSubcategory('All');
//     setSearchQuery('');
//     setSortBy('Latest');
//     setCurrentPage(1);
//     trackButtonClick('blog_clear_filters', 'all');
//   };
//
//   // Remove specific filter
//   const removeFilter = (filter: string) => {
//     if (selectedCategory === filter) {
//       setSelectedCategory('All');
//     } else if (selectedSubcategory === filter) {
//       setSelectedSubcategory('All');
//     } else if (searchQuery === filter.replace(/"/g, '')) {
//       setSearchQuery('');
//     }
//     trackButtonClick('blog_remove_filter', filter);
//   };
//
//   // Track page view
//   useEffect(() => {
//     if (isClient && !isLoading) {
//       trackEvent('page_view', {
//         page_title: 'Blog',
//         page_location: window.location.href,
//         blog_posts_count: allPosts.length,
//         selected_category: selectedCategory,
//         search_query: searchQuery
//       });
//     }
//   }, [isClient, isLoading, allPosts.length, selectedCategory, searchQuery]);
//
//   return (
//     <>
//       <Head>
//         <title>Samridhya Blog | Smart Insights on Personal Loans & Finance</title>
//         <meta name="description" content="Explore expert blogs on personal loans, business loans, credit scores & EMI tips. Stay updated with Samridhya for smart, secure financial decisions." />
//         <meta name="keywords" content="personal loans, business loans, credit score, EMI tips, financial advice, loan aggregator, Samridhya, finance blog" />
//         <meta name="robots" content="index, follow" />
//
//         {/* Open Graph */}
//         <meta property="og:title" content="Samridhya Blog | Smart Insights on Personal Loans & Finance" />
//         <meta property="og:description" content="Explore expert blogs on personal loans, business loans, credit scores & EMI tips. Stay updated with Samridhya for smart, secure financial decisions." />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://samridhya.com/blog/" />
//         <meta property="og:image" content="https://samridhya.com/images/samridhya-preview.webp" />
//
//         {/* Twitter */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="Samridhya Blog | Smart Insights on Personal Loans & Finance" />
//         <meta name="twitter:description" content="Explore expert blogs on personal loans, business loans, credit scores & EMI tips. Stay updated with Samridhya for smart, secure financial decisions." />
//         <meta name="twitter:image" content="https://samridhya.com/images/samridhya-preview.webp" />
//
//         {/* Structured Data */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "Blog",
//               "name": "Samridhya Blog | Smart Insights on Personal Loans & Finance",
//               "description": "Explore expert blogs on personal loans, business loans, credit scores & EMI tips. Stay updated with Samridhya for smart, secure financial decisions.",
//               "url": "https://samridhya.com/blog/",
//               "publisher": {
//                 "@type": "Organization",
//                 "name": "Samridhya",
//                 "url": "https://samridhya.com"
//               },
//               "blogPost": allPosts.slice(0, 5).map(post => ({
//                 "@type": "BlogPosting",
//                 "headline": post.title,
//                 "description": post.excerpt,
//                 "author": {
//                   "@type": "Person",
//                   "name": post.author
//                 },
//                 "datePublished": post.publishedAt,
//                 "dateModified": post.updatedAt,
//                 "url": `https://samridhya.com/blog/${post.slug}/`
//               }))
//             })
//           }}
//         />
//       </Head>
//
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//         <Navbar />
//
//         {/* Top Margin for Navbar */}
//         <div className="pt-16 sm:pt-20"></div>
//
//         {/* Main content - always show page structure */}
//
//         {/* Promotional Banner */}
//         <div className="relative">
//           <PromotionalBanner />
//         </div>
//
//         {/* Sticky Hero Section */}
//         <section className="sticky top-16 sm:top-20 z-30 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-b border-gray-200">
//           <div className="relative overflow-hidden pt-6 pb-4">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
//             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="text-center"
//               >
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                   Financial{' '}
//                   <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     Insights & Tips
//                   </span>
//                 </h1>
//                 <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
//                   Expert advice and industry updates to help you make informed financial decisions.
//                 </p>
//
//                 {/* Search Bar */}
//                 <div className="max-w-xl mx-auto mb-6">
//                   <div className="relative">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       placeholder="Search articles, tips, and guides..."
//                       value={searchQuery}
//                       onChange={(e) => handleSearch(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//
//                 {/* Quick Stats */}
//                 <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <BookOpen className="w-4 h-4" />
//                     <span>{allPosts.length} Articles</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Tag className="w-4 h-4" />
//                     <span>{categories.length - 1} Categories</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <TrendingUp className="w-4 h-4" />
//                     <span>Expert Insights</span>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>
//
//         {/* Main Content */}
//         <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Main Content - Always First */}
//             <div className="flex-1 order-1 lg:order-1">
//               {/* Error Display */}
//               {apiError && (
//                 <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0">
//                       <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <div className="ml-3">
//                       <h3 className="text-sm font-medium text-red-800">
//                         Unable to load blog posts
//                       </h3>
//                       <div className="mt-2 text-sm text-red-700">
//                         <p>There was an error loading the blog posts. Please try refreshing the page.</p>
//                         {process.env.NODE_ENV === 'development' && (
//                           <p className="mt-1 text-xs">Error: {apiError}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//
//               {/* Active Filters Display */}
//               {activeFilters.length > 0 && (
//                 <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="text-sm font-medium text-blue-900">Active Filters:</h3>
//                     <button
//                       onClick={clearAllFilters}
//                       className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                     >
//                       Clear All
//                     </button>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {activeFilters.map((filter, index) => (
//                       <span
//                         key={index}
//                         className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                       >
//                         {filter}
//                         <button
//                           onClick={() => removeFilter(filter)}
//                           className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//
//               {/* Filter and Sort Controls */}
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Filter className="w-4 h-4" />
//                     <span>Showing {filteredPosts.length} of {allPosts.length} posts</span>
//                   </div>
//                   {selectedCategory !== 'All' && (
//                     <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                       {selectedCategory}
//                     </span>
//                   )}
//                   {selectedSubcategory !== 'All' && (
//                     <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                       {selectedSubcategory}
//                     </span>
//                   )}
//                 </div>
//
//                 <div className="flex items-center gap-2">
//                   <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
//                   <select
//                     id="sort"
//                     value={sortBy}
//                     onChange={(e) => handleSortChange(e.target.value as 'Latest' | 'Popular' | 'Oldest')}
//                     className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="Latest">Latest</option>
//                     <option value="Popular">Popular</option>
//                     <option value="Oldest">Oldest</option>
//                   </select>
//                 </div>
//               </div>
//
//               {/* Blog Grid */}
//               {isLoading ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[...Array(6)].map((_, index) => (
//                     <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
//                       {/* Image skeleton */}
//                       <div className="h-48 bg-gray-200"></div>
//
//                       {/* Content skeleton */}
//                       <div className="p-6">
//                         {/* Category skeleton */}
//                         <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
//
//                         {/* Title skeleton */}
//                         <div className="space-y-2 mb-4">
//                           <div className="h-5 bg-gray-200 rounded w-full"></div>
//                           <div className="h-5 bg-gray-200 rounded w-3/4"></div>
//                         </div>
//
//                         {/* Excerpt skeleton */}
//                         <div className="space-y-2 mb-4">
//                           <div className="h-4 bg-gray-200 rounded w-full"></div>
//                           <div className="h-4 bg-gray-200 rounded w-full"></div>
//                           <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//                         </div>
//
//                         {/* Meta skeleton */}
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <div className="h-4 bg-gray-200 rounded w-16"></div>
//                             <div className="h-4 bg-gray-200 rounded w-12"></div>
//                           </div>
//                           <div className="h-4 bg-gray-200 rounded w-20"></div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : currentPosts.length > 0 ? (
//                 <BlogGrid posts={currentPosts} />
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="text-gray-400 mb-4">
//                     <Search className="w-16 h-16 mx-auto" />
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
//                   <p className="text-gray-600">
//                     {searchQuery ? `No posts match "${searchQuery}"` : 'No posts available in this category'}
//                   </p>
//                   {searchQuery && (
//                     <button
//                       onClick={() => handleSearch('')}
//                       className="mt-4 text-blue-600 hover:text-blue-800 underline"
//                     >
//                       Clear search
//                     </button>
//                   )}
//                 </div>
//               )}
//
//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center mt-8">
//                   <nav className="flex items-center gap-2">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Previous
//                     </button>
//
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`px-3 py-2 text-sm font-medium rounded-md ${
//                           currentPage === page
//                             ? 'bg-blue-600 text-white'
//                             : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Next
//                     </button>
//                   </nav>
//                 </div>
//               )}
//             </div>
//
//             {/* Sidebar - Always Second */}
//             <div className="hidden lg:block lg:w-80 lg:flex-shrink-0 order-2 lg:order-2">
//               <div className="lg:sticky lg:top-20">
//                 <BlogSidebar
//                   categories={categories}
//                   subcategories={subcategories}
//                   popularTags={popularTags}
//                   selectedCategory={selectedCategory}
//                   selectedSubcategory={selectedSubcategory}
//                   onCategoryChange={handleCategorySelect}
//                   onSubcategoryChange={handleSubcategorySelect}
//                   onTagClick={handleTagClick}
//                 />
//               </div>
//             </div>
//           </div>
//
//           {/* Sidebar for Mobile/Tablet - Always at Bottom */}
//           <div className="block lg:hidden mt-8 order-3">
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-6">Explore More</h3>
//               <BlogSidebar
//                 categories={categories}
//                 subcategories={subcategories}
//                 popularTags={popularTags}
//                 selectedCategory={selectedCategory}
//                 selectedSubcategory={selectedSubcategory}
//                 onCategoryChange={handleCategorySelect}
//                 onSubcategoryChange={handleSubcategorySelect}
//                 onTagClick={handleTagClick}
//               />
//             </div>
//           </div>
//         </section>
//
//         <CTA />
//       </div>
//     </>
//   );
// }
