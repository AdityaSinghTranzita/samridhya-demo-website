// Static generation for blog posts

import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, BookOpen, Eye, MessageCircle, Facebook, Twitter, Linkedin, Copy, Check, CheckCircle, Calculator } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import BlogGrid from '@/components/BlogGrid';
import BlogSidebar from '@/components/BlogSidebar';
import { blogService, BlogPost, Category } from '@/services/blogService';
import { trackEvent, trackButtonClick } from '@/utils/analytics';
import { toISOString } from '@/utils/dateUtils';
import { GetStaticPaths, GetStaticProps } from 'next';

interface BlogPostPageProps {
  blogPost: BlogPost | null;
  relatedPosts: BlogPost[];
  categories: Category[];
  subcategories: Category[];
  popularTags: string[];
  error?: string;
}

export default function BlogPostPage({ 
  blogPost: initialBlogPost, 
  relatedPosts: initialRelatedPosts, 
  categories: initialCategories, 
  subcategories: initialSubcategories, 
  popularTags: initialPopularTags,
  error: initialError 
}: BlogPostPageProps) {
  const router = useRouter();
  const { slug } = router.query;
  const [blogPost, setBlogPost] = useState<BlogPost | null>(initialBlogPost);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>(initialRelatedPosts);
  const [loading, setLoading] = useState(!initialBlogPost);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [subcategories, setSubcategories] = useState<Category[]>(initialSubcategories);
  const [popularTags, setPopularTags] = useState<string[]>(initialPopularTags);
  const [error, setError] = useState<string | null>(initialError || null);

  // Load blog post data when slug changes (only for fallback cases)
  useEffect(() => {
    const loadBlogPost = async () => {
      // Only load if we don't have initial data (fallback case)
      if (initialBlogPost || !slug || typeof slug !== 'string') return;

      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔄 Loading blog post: ${slug}`);
        
        // Load blog post and related data in parallel
        const [post, allPosts, categoriesData, tagsData] = await Promise.all([
          blogService.getPostBySlug(slug),
          blogService.getPublishedPosts(),
          blogService.getCategories(),
          blogService.getTags()
        ]);

        if (!post) {
          console.log(`❌ Blog post not found: ${slug}`);
          setError('Blog post not found');
          return;
        }

        console.log(`✅ Found blog post: ${post.title}`);

        // Clean up post to ensure no undefined values and convert Date objects to strings
        const cleanedPost = {
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
        };

        // Get related posts (featured posts excluding current post)
        const featuredPosts = await blogService.getFeaturedPosts();
        const filteredRelated = featuredPosts
          .filter((p: BlogPost) => p.id !== post.id)
          .slice(0, 3);

        // Clean up related posts
        const cleanedRelatedPosts = filteredRelated.map(relatedPost => ({
          ...relatedPost,
          subcategory: relatedPost.subcategory || null,
          category: relatedPost.category || 'Uncategorized',
          tags: relatedPost.tags || [],
          featuredImage: relatedPost.featuredImage || null,
          seoTitle: relatedPost.seoTitle || null,
          seoDescription: relatedPost.seoDescription || null,
          seoKeywords: relatedPost.seoKeywords || [],
          readTime: relatedPost.readTime || null,
          views: relatedPost.views || 0,
          likes: relatedPost.likes || 0,
          shares: relatedPost.shares || 0,
          featured: relatedPost.featured || false,
          // Convert Date objects to ISO strings for JSON serialization
          publishedAt: toISOString(relatedPost.publishedAt) || null,
          createdAt: toISOString(relatedPost.createdAt) || null,
          updatedAt: toISOString(relatedPost.updatedAt) || null,
        }));

        // Generate subcategories from all posts
        const subcategoryMap = new Map<string, number>();
        allPosts.forEach((p: BlogPost) => {
          if (p.subcategory) {
            subcategoryMap.set(p.subcategory, (subcategoryMap.get(p.subcategory) || 0) + 1);
          }
        });

        const subcategoriesData = [
          { name: 'All', count: allPosts.length },
          ...Array.from(subcategoryMap.entries()).map(([name, count]) => ({
            name,
            count
          }))
        ];

        setBlogPost(cleanedPost);
        setRelatedPosts(cleanedRelatedPosts);
        setCategories(categoriesData);
        setSubcategories(subcategoriesData);
        setPopularTags(tagsData.slice(0, 10));

        console.log(`✅ Processed blog post with ${cleanedRelatedPosts.length} related posts`);

      } catch (error) {
        console.error(`❌ Error loading blog post ${slug}:`, error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [slug, initialBlogPost]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track page view for blog post
  useEffect(() => {
    if (isClient && blogPost && !loading) {
      trackEvent('blog_post_view', {
        post_id: blogPost.id,
        post_title: blogPost.title,
        post_category: blogPost.category,
        post_author: blogPost.author
      });
    }
  }, [isClient, blogPost, loading]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showShareMenu && !target.closest('.share-menu')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  // Handle share
  const handleShare = async (platform: string) => {
    if (!blogPost) return;
    
    const url = window.location.href;
    const title = blogPost.title;
    const text = blogPost.excerpt;
    
    try {
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'copy':
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          break;
      }
      
      trackButtonClick('blog_post_share', platform);
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  // Handle sidebar interactions
  const handleCategorySelect = (category: string) => {
    trackButtonClick('blog_post_sidebar_category', category);
    // Navigate to blog page with category filter
    if (category !== 'All') {
      router.push(`/blog?category=${encodeURIComponent(category)}`);
    } else {
      router.push('/blog');
    }
  };

  const handleSubcategorySelect = (subcategory: string) => {
    trackButtonClick('blog_post_sidebar_subcategory', subcategory);
    // Navigate to blog page with subcategory filter
    if (subcategory !== 'All') {
      const currentCategory = blogPost?.category || 'All';
      if (currentCategory !== 'All') {
        router.push(`/blog?category=${encodeURIComponent(currentCategory)}&subcategory=${encodeURIComponent(subcategory)}`);
      } else {
        router.push(`/blog?subcategory=${encodeURIComponent(subcategory)}`);
      }
    } else {
      const currentCategory = blogPost?.category || 'All';
      if (currentCategory !== 'All') {
        router.push(`/blog?category=${encodeURIComponent(currentCategory)}`);
      } else {
        router.push('/blog');
      }
    }
  };

  const handleTagClick = (tag: string) => {
    trackButtonClick('blog_post_sidebar_tag', tag);
    // Navigate to blog page with tag search
    router.push(`/blog?tag=${encodeURIComponent(tag)}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="pt-16 sm:pt-20"></div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blogPost) {
    return (
      <>
        <Head>
          <title>Blog Post Not Found - Samridhya</title>
          <meta name="description" content="The blog post you're looking for doesn't exist." />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <Navbar />
          <div className="pt-16 sm:pt-20"></div>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
              <p className="text-gray-600 mb-8">
                {error || 'The blog post you\'re looking for doesn\'t exist.'}
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{blogPost.title} - Samridhya</title>
        <meta name="description" content={blogPost.excerpt} />
        <meta name="keywords" content={blogPost.tags?.join(', ')} />
        <meta name="author" content={blogPost.author} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://samridhya.in/blog/${blogPost.slug}`} />
        <meta property="og:image" content={blogPost.featuredImage || 'https://samridhya.in/images/samridhya-preview.png'} />
        <meta property="article:published_time" content={toISOString(blogPost.publishedAt)} />
        <meta property="article:modified_time" content={toISOString(blogPost.updatedAt)} />
        <meta property="article:author" content={blogPost.author} />
        <meta property="article:section" content={blogPost.category} />
        {blogPost.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.excerpt} />
        <meta name="twitter:image" content={blogPost.featuredImage || 'https://samridhya.in/images/samridhya-preview.png'} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": blogPost.title,
              "description": blogPost.excerpt,
              "image": blogPost.featuredImage || 'https://samridhya.in/images/samridhya-preview.png',
              "author": {
                "@type": "Person",
                "name": blogPost.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "Samridhya",
                "url": "https://samridhya.in"
              },
              "datePublished": toISOString(blogPost.publishedAt),
              "dateModified": toISOString(blogPost.updatedAt),
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://samridhya.in/blog/${blogPost.slug}`
              },
              "articleSection": blogPost.category,
              "keywords": blogPost.tags?.join(', ')
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        
        {/* Back Button */}
        <div className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Blog Post Content with Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Always First */}
            <div className="flex-1 order-1 lg:order-1">
              <article>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Featured Image */}
                  {blogPost.featuredImage && (
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                      <img
                        src={blogPost.featuredImage}
                        alt={blogPost.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium">{blogPost.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-green-500" />
                        <span>{blogService.formatDate(blogPost.publishedAt || blogPost.updatedAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-purple-500" />
                        <span>{blogService.getReadingTime(blogPost.content)}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-2 text-orange-500" />
                        <span>{blogPost.views || 0} views</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                      {blogPost.title}
                    </h1>

                    {/* Categories and Tags */}
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                      {blogPost.category && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          <Tag className="w-3 h-3 mr-1" />
                          {blogPost.category}
                        </span>
                      )}
                      {blogPost.subcategory && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {blogPost.subcategory}
                        </span>
                      )}
                      {blogPost.tags?.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Excerpt */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                      <p className="text-gray-700 italic">{blogPost.excerpt}</p>
                    </div>

                    {/* Content */}
                    <div 
                      className="prose prose-lg max-w-none mb-8"
                      dangerouslySetInnerHTML={{ __html: blogPost.content }}
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="relative share-menu">
                          <button
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </button>
                          
                          {showShareMenu && (
                            <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleShare('facebook')}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                  <Facebook className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleShare('twitter')}
                                  className="p-2 text-blue-400 hover:bg-blue-50 rounded"
                                >
                                  <Twitter className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleShare('linkedin')}
                                  className="p-2 text-blue-700 hover:bg-blue-50 rounded"
                                >
                                  <Linkedin className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleShare('copy')}
                                  className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                                >
                                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
                    <BlogGrid posts={relatedPosts} columns={3} />
                  </div>
                )}
              </article>
            </div>

            {/* Sidebar - Always Second */}
            <div className="hidden lg:block lg:w-80 lg:flex-shrink-0 order-2 lg:order-2">
              <div className="lg:sticky lg:top-20">
                <BlogSidebar
                  categories={categories}
                  subcategories={subcategories}
                  popularTags={popularTags}
                  selectedCategory={blogPost.category || 'All'}
                  selectedSubcategory={blogPost.subcategory || 'All'}
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
                selectedCategory={blogPost.category || 'All'}
                selectedSubcategory={blogPost.subcategory || 'All'}
                onCategoryChange={handleCategorySelect}
                onSubcategoryChange={handleSubcategorySelect}
                onTagClick={handleTagClick}
              />
            </div>
          </div>
        </div>

        <CTA />
      </div>
    </>
  );
}

// Static generation functions
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    console.log('🔄 Generating static paths for blog posts...');
    
    // Get all published blog posts
    const posts = await blogService.getPublishedPosts();
    
    // Generate paths for each blog post
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));

    console.log(`✅ Generated ${paths.length} static paths for blog posts`);
    
    return {
      paths,
      fallback: 'blocking', // Generate new pages on-demand if not found
    };
  } catch (error) {
    console.error('❌ Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    
    if (!slug) {
      return {
        notFound: true,
      };
    }

    console.log(`🔄 Generating static props for blog post: ${slug}`);
    
    // Load blog post and related data in parallel
    const [post, allPosts, categoriesData, tagsData] = await Promise.all([
      blogService.getPostBySlug(slug),
      blogService.getPublishedPosts(),
      blogService.getCategories(),
      blogService.getTags()
    ]);

    if (!post) {
      console.log(`❌ Blog post not found: ${slug}`);
      return {
        notFound: true,
      };
    }

    console.log(`✅ Found blog post: ${post.title}`);

    // Clean up post to ensure no undefined values and convert Date objects to strings
    const cleanedPost = {
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
    };

    // Get related posts (featured posts excluding current post)
    const featuredPosts = await blogService.getFeaturedPosts();
    const filteredRelated = featuredPosts
      .filter((p: BlogPost) => p.id !== post.id)
      .slice(0, 3);

    // Clean up related posts
    const cleanedRelatedPosts = filteredRelated.map(relatedPost => ({
      ...relatedPost,
      subcategory: relatedPost.subcategory || null,
      category: relatedPost.category || 'Uncategorized',
      tags: relatedPost.tags || [],
      featuredImage: relatedPost.featuredImage || null,
      seoTitle: relatedPost.seoTitle || null,
      seoDescription: relatedPost.seoDescription || null,
      seoKeywords: relatedPost.seoKeywords || [],
      readTime: relatedPost.readTime || null,
      views: relatedPost.views || 0,
      likes: relatedPost.likes || 0,
      shares: relatedPost.shares || 0,
      featured: relatedPost.featured || false,
      // Convert Date objects to ISO strings for JSON serialization
      publishedAt: toISOString(relatedPost.publishedAt) || null,
      createdAt: toISOString(relatedPost.createdAt) || null,
      updatedAt: toISOString(relatedPost.updatedAt) || null,
    }));

    // Generate subcategories from all posts
    const subcategoryMap = new Map<string, number>();
    allPosts.forEach((p: BlogPost) => {
      if (p.subcategory) {
        subcategoryMap.set(p.subcategory, (subcategoryMap.get(p.subcategory) || 0) + 1);
      }
    });

    const subcategoriesData = [
      { name: 'All', count: allPosts.length },
      ...Array.from(subcategoryMap.entries()).map(([name, count]) => ({
        name,
        count
      }))
    ];

    return {
      props: {
        blogPost: cleanedPost,
        relatedPosts: cleanedRelatedPosts,
        categories: categoriesData,
        subcategories: subcategoriesData,
        popularTags: tagsData,
      },
    };
  } catch (error) {
    console.error('❌ Error generating static props:', error);
    return {
      notFound: true,
    };
  }
};
