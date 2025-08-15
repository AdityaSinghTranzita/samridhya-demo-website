'use client';

import { motion } from 'framer-motion';
import { BlogPost, blogService } from '@/services/blogService';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  isLoading?: boolean;
}

export default function BlogGrid({
  posts,
  title,
  subtitle,
  showTitle = false,
  columns = 2,
  className = '',
  emptyMessage = 'No articles found',
  emptyIcon,
  isLoading = false
}: BlogGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  const gapSizes = {
    1: 'gap-4',
    2: 'gap-4 sm:gap-6',
    3: 'gap-4 sm:gap-6',
    4: 'gap-4 sm:gap-6'
  };

  return (
    <div className={className}>
      {/* Title Section */}
      {showTitle && (title || subtitle) && (
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-600 text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* Blog Grid */}
      {isLoading ? (
        <div className={`grid ${gridCols[columns]} ${gapSizes[columns]}`}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="flex items-center space-x-4">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className={`grid ${gridCols[columns]} ${gapSizes[columns]}`}>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={blogService.formatDate(post.publishedAt || post.updatedAt)}
                readTime={`${Math.ceil(post.content.split(' ').length / 200)} min read`}
                category={post.category}
                subcategory={post.subcategory}
                slug={post.slug!}
                image={post.featuredImage}
                featured={false}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {emptyIcon && (
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {emptyIcon}
            </div>
          )}
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {emptyMessage}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto px-4">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </motion.div>
      )}
    </div>
  );
} 