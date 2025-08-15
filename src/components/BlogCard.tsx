import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  subcategory?: string;
  slug: string;
  image?: string;
  featured?: boolean;
}

export default function BlogCard({
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  subcategory,
  slug,
  image,
  featured = false
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <motion.div
        className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer ${
          featured ? 'ring-2 ring-blue-500/20' : ''
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -5 }}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
            <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
              Featured
            </span>
          </div>
        )}

        {/* Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 z-10" />
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl sm:text-2xl">
                  {title.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          {/* Category & Subcategory */}
          <div className="flex items-center flex-wrap gap-2 mb-3 sm:mb-4">
            <div className="flex items-center">
              <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mr-2" />
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                {category}
              </span>
            </div>
            {subcategory && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-green-200">
                {subcategory}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3 leading-relaxed flex-1">
            {excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 mb-4 sm:mb-6 pt-3 sm:pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1 sm:mr-1.5 text-blue-500" />
              <span className="font-medium text-xs">{author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 sm:mr-1.5 text-green-500" />
              <span className="text-xs">{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1 sm:mr-1.5 text-purple-500" />
              <span className="text-xs">{readTime}</span>
            </div>
          </div>

          {/* Read More Button */}
          <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm group-hover:translate-x-1 transition-all duration-300 mt-auto">
            Read More
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
