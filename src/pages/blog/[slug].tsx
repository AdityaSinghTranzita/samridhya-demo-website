'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, BookOpen, Eye, Heart, MessageCircle, Facebook, Twitter, Linkedin, Copy, Check, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import BlogGrid from '@/components/BlogGrid';
import BlogPostSidebar from '@/components/BlogPostSidebar';
import { blogService, BlogPost } from '@/services/blogService';

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [processedContent, setProcessedContent] = useState<string>('');

  // Function to add IDs to headings for table of contents
  const processContentForTOC = (content: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headings.forEach((heading, index) => {
      if (!heading.id) {
        const text = heading.textContent || '';
        const id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/--+/g, '-') // Replace multiple hyphens with single
          .trim() || `heading-${index}`;
        heading.id = id;
      }
    });
    
    return doc.body.innerHTML;
  };

  useEffect(() => {
    const loadPost = async () => {
      if (slug && typeof slug === 'string') {
        try {
          setLoading(true);
          const post = await blogService.getPostBySlug(slug);
          if (post) {
            setBlogPost(post);
            // Process content to add IDs to headings
            setProcessedContent(processContentForTOC(post.content));
            
            const related = await blogService.getFeaturedPosts();
            // Get up to 3 related posts (excluding current post)
            const filteredRelated = related
              .filter(p => p.id !== post.id)
              .slice(0, 3);
            setRelatedPosts(filteredRelated);
          }
        } catch (error) {
          console.error('Error loading blog post:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPost();
  }, [slug]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <>
        <Head>
          <title>Blog Post Not Found - Samridhya</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <Navbar />
          <div className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
              <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
          <CTA />
        </div>
      </>
    );
  }

  const formattedDate = (blogPost.publishedAt || blogPost.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Share functions
  const shareUrl = `https://samridhya.com/blog/${blogPost.slug}`;
  const shareTitle = blogPost.title;
  const shareText = blogPost.excerpt;

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}&via=samridhya`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowShareMenu(false);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <>
      <Head>
        <title>{blogPost.seoTitle || blogPost.title} - Samridhya Blog</title>
        <meta name="description" content={blogPost.seoDescription || blogPost.excerpt} />
        <meta name="keywords" content={blogPost.seoKeywords?.join(', ') || `${blogPost.category}, financial advice, loan tips, ${blogPost.title.toLowerCase()}`} />
        <meta name="author" content={blogPost.author} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={blogPost.seoTitle || blogPost.title} />
        <meta property="og:description" content={blogPost.seoDescription || blogPost.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://samridhya.com/blog/${blogPost.slug}`} />
        <meta property="og:image" content={blogPost.featuredImage || "https://samridhya.com/samridhya-preview.png"} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.seoTitle || blogPost.title} />
        <meta name="twitter:description" content={blogPost.seoDescription || blogPost.excerpt} />
        <meta name="twitter:image" content={blogPost.featuredImage || "https://samridhya.com/samridhya-preview.png"} />
        
        {/* Article Meta Tags */}
        <meta property="article:published_time" content={(blogPost.publishedAt || blogPost.updatedAt).toISOString()} />
        <meta property="article:author" content={blogPost.author} />
        <meta property="article:section" content={blogPost.category} />
        
        <link rel="canonical" href={`https://samridhya.com/blog/${blogPost.slug}`} />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        
        {/* Hero Image Section */}
        <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center text-sm text-gray-500 mb-6"
            >
              <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/blog" className="hover:text-blue-600 transition-colors font-medium">Blog</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-700 font-medium truncate">{blogPost.title}</span>
            </motion.div>

            {/* Cover Image */}
            {blogPost.featuredImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-72 sm:h-80 lg:h-96 mb-12 rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={blogPost.featuredImage}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </motion.div>
            )}

            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-md border border-white/30 rounded-3xl p-8 sm:p-12 shadow-xl"
            >
              {/* Category and Featured Badges */}
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
                  <Tag className="w-4 h-4 mr-2" />
                  {blogPost.category}
                </span>
                {blogPost.featured && (
                  <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-full">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                {blogPost.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-4xl">
                {blogPost.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-8 text-sm text-gray-600 border-t border-gray-200 pt-8">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="font-medium">{blogPost.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="font-medium">{formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="font-medium">{blogPost.readTime}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="font-medium">{blogPost.meta.views.toLocaleString()} views</span>
                </div>
                <div className="relative ml-auto share-menu z-10">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share Article
                  </button>
                  
                  {/* Share Menu Dropdown */}
                  {showShareMenu && (
                    <>
                      {/* Backdrop */}
                      <div className="fixed inset-0 z-[9998]" onClick={() => setShowShareMenu(false)}></div>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-[9999] transform translate-y-1">
                        <button
                          onClick={shareToFacebook}
                          className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          <Facebook className="w-5 h-5 mr-3 text-blue-600" />
                          <span className="text-sm font-medium">Share on Facebook</span>
                        </button>
                        <button
                          onClick={shareToTwitter}
                          className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          <Twitter className="w-5 h-5 mr-3 text-blue-400" />
                          <span className="text-sm font-medium">Share on Twitter</span>
                        </button>
                        <button
                          onClick={shareToLinkedIn}
                          className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          <Linkedin className="w-5 h-5 mr-3 text-blue-700" />
                          <span className="text-sm font-medium">Share on LinkedIn</span>
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={copyToClipboard}
                          className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          {copied ? (
                            <Check className="w-5 h-5 mr-3 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 mr-3 text-gray-600" />
                          )}
                          <span className="text-sm font-medium">
                            {copied ? 'Copied!' : 'Copy Link'}
                          </span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sidebar Only */}
        <section className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="w-full">
            {/* Sidebar - Narrower width */}
            <div className="w-full">
              <div>
                <BlogPostSidebar 
                  currentPost={blogPost ? { ...blogPost, content: processedContent || blogPost.content } : undefined}
                  relatedPosts={relatedPosts}
                  onShare={(platform) => {
                    switch (platform) {
                      case 'facebook':
                        shareToFacebook();
                        break;
                      case 'twitter':
                        shareToTwitter();
                        break;
                      case 'linkedin':
                        shareToLinkedIn();
                        break;
                      case 'copy':
                        copyToClipboard();
                        break;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Related Articles
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                You might also be interested in these articles
              </p>
            </motion.div>
            <BlogGrid
              posts={relatedPosts}
              title=""
              subtitle=""
              showTitle={false}
              columns={3}
            />
          </section>
        )}

        {/* Footer */}
        <CTA />
      </div>
    </>
  );
}
