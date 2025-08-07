'use client';

import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  BookOpen, 
  Calculator, 
  Shield, 
  Users, 
  TrendingDown, 
  CreditCard, 
  GraduationCap, 
  Heart, 
  Plane, 
  Home, 
  Building2, 
  Zap, 
  CheckCircle,
  List,
  Clock,
  Share2,
  ArrowUp,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { BlogPost } from '@/services/blogService';
import Link from 'next/link';

interface BlogPostSidebarProps {
  currentPost?: BlogPost;
  relatedPosts?: BlogPost[];
  onShare?: (platform: string) => void;
  className?: string;
}

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export default function BlogPostSidebar({ 
  currentPost,
  relatedPosts = [],
  onShare,
  className = ""
}: BlogPostSidebarProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Extract table of contents from post content
  useEffect(() => {
    if (!currentPost?.content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(currentPost.content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4');
    
    const toc: TableOfContentsItem[] = [];
    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      const title = heading.textContent || '';
      const level = parseInt(heading.tagName.charAt(1));
      
      if (title.trim()) {
        toc.push({ id, title: title.trim(), level });
      }
    });
    
    setTableOfContents(toc);
  }, [currentPost?.content]);

  // Handle scroll to show/hide scroll to top button and track active section
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      // Find active section
      const headings = document.querySelectorAll('h1, h2, h3, h4');
      let currentActive = '';
      
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100 && rect.top >= -100) {
          currentActive = heading.id || '';
        }
      });
      
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`space-y-4 h-fit ${className}`}>
      
      {/* Article Info */}
      {currentPost && (
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-bold text-gray-900 mb-3">Article Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{currentPost.readTime || '5 min read'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">By {currentPost.author}</span>
            </div>
            {currentPost.category && (
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{currentPost.category}</span>
              </div>
            )}
            {currentPost.tags && currentPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {currentPost.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <List className="w-4 h-4 text-gray-700" />
            <h3 className="text-base font-bold text-gray-900">Table of Contents</h3>
          </div>
          <nav className="space-y-1">
            {tableOfContents.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left text-sm py-1 transition-all duration-200 hover:text-blue-600 ${
                  activeSection === item.id
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600'
                } ${
                  item.level === 1 ? 'pl-0' :
                  item.level === 2 ? 'pl-3' :
                  item.level === 3 ? 'pl-6' : 'pl-9'
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Quick Share */}
      {currentPost && onShare && (
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 shadow-lg border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-gray-900">Share Article</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onShare('facebook')}
              className="flex-1 flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              onClick={() => onShare('twitter')}
              className="flex-1 flex items-center justify-center p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
              title="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={() => onShare('linkedin')}
              className="flex-1 flex items-center justify-center p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </button>
            <button
              onClick={() => onShare('copy')}
              className="flex-1 flex items-center justify-center p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              title="Copy Link"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Related Posts Preview */}
      {relatedPosts.length > 0 && (
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-base font-bold text-gray-900 mb-3">Related Articles</h3>
          <div className="space-y-3">
            {relatedPosts.slice(0, 3).map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex gap-2">
                  {post.featuredImage && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm line-clamp-2 leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {post.readTime || '5 min read'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm mt-3"
          >
            View all articles →
          </Link>
        </motion.div>
      )}

      {/* Credit Score Checker Promotion */}
      <motion.div
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 shadow-lg border border-green-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Check Your Credit Score</h3>
            <p className="text-xs text-gray-600">Free & Instant</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Get your credit score instantly and understand what it means for your loan applications.
        </p>
        <Link 
          href="/calculators/credit-score-checker"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 text-sm"
        >
          Check Now
        </Link>
      </motion.div>

      {/* EMI Calculator Promotion */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 shadow-lg border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Calculator className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">EMI Calculator</h3>
            <p className="text-xs text-gray-600">Plan Your Loan</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Calculate your monthly EMI and understand the total cost of your loan.
        </p>
        <Link 
          href="/calculators/loan-calculator"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm"
        >
          Calculate EMI
        </Link>
      </motion.div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}