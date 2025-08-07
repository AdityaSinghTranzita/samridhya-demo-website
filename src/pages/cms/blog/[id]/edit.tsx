import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import Link from 'next/link';
import RichTextEditor from '@/components/RichTextEditor';
import CMSLayout from '@/components/CMSLayout';
import CustomAlert from '@/components/CustomAlert';
import { useCustomAlert } from '@/hooks/useCustomAlert';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Save, 
  X, 
  Calendar, 
  Tag, 
  Hash, 
  Eye, 
  Edit3, 
  ImageIcon,
  Globe,
  User,
  Clock,
  Plus,
  Minus,
  PenTool,
  Upload,
  Trash2,
  Loader2
} from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { processImage, formatFileSize } from '@/utils/imageValidation';
import { blogService, BlogPost } from '@/services/blogService';

const EditBlogPost: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const { alertState, showError, showSuccess, closeAlert } = useCustomAlert();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [tagInput, setTagInput] = useState('');
  const [seoKeywordInput, setSeoKeywordInput] = useState('');
  const [useCustomAuthor, setUseCustomAuthor] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/cms/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && id && typeof id === 'string') {
      fetchPost();
    }
  }, [user, id]);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const fetchedPost = await blogService.getPostById(id as string);
      if (fetchedPost) {
        setPost(fetchedPost);
        setImagePreview(fetchedPost.featuredImage || null);
        setUploadedImage(fetchedPost.featuredImage || null);
      } else {
        alert('Post not found');
        router.push('/cms/blog');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('Failed to load post');
      router.push('/cms/blog');
    } finally {
      setIsLoading(false);
    }
  };

  // Set default author when user loads
  useEffect(() => {
    if (user && post && !post.author) {
      setPost(prev => prev ? ({
        ...prev,
        author: user.displayName || user.email || '',
      }) : null);
    }
  }, [user, post]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setPost(prev => prev ? ({
      ...prev,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }) : null);
    // Clear title error
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleContentChange = useCallback((content: string) => {
    setPost(prev => prev ? ({
      ...prev,
      content,
    }) : null);
    // Clear content error
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  }, []);

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setImageUploading(true);

    try {
      // Process image with validation and optimization
      const result = await processImage(file, 'blog_featured', {
        autoCompress: true,
        convertToWebP: false // Keep original format for blog featured images
      });

      if (!result.success) {
        alert(result.error || 'Please select a valid image file.');
        return;
      }

      const fileToUpload = result.file || file;

      // Show optimization results if any
      if (result.optimization) {
        const savings = result.optimization.compressionRatio;
        if (savings > 10) {
          console.log(`Image optimized: File size reduced by ${savings}% (${formatFileSize(result.optimization.originalSize)} → ${formatFileSize(result.optimization.compressedSize)})`);
        }
      }

      const storage = getStorage();
      const timestamp = Date.now();
      const fileName = `blog-images/${timestamp}-${fileToUpload.name}`;
      const storageRef = ref(storage, fileName);

      // Upload processed file
      const snapshot = await uploadBytes(storageRef, fileToUpload);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setUploadedImage(downloadURL);
      setImagePreview(downloadURL);
      
      // Update post with featured image
      setPost(prev => prev ? ({
        ...prev,
        featuredImage: downloadURL,
      }) : null);

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setPost(prev => prev ? ({
      ...prev,
      featuredImage: undefined,
    }) : null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      handleImageUpload(file);
    }
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(prev => prev ? ({
      ...prev,
      excerpt: e.target.value,
    }) : null);
    // Clear excerpt error
    if (errors.excerpt) {
      setErrors(prev => ({ ...prev, excerpt: '' }));
    }
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => prev ? ({
      ...prev,
      author: e.target.value,
    }) : null);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && post && !post.tags.includes(tag) && tag.length <= 20) {
      setPost(prev => prev ? ({
        ...prev,
        tags: [...prev.tags, tag],
      }) : null);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPost(prev => prev ? ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }) : null);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPost(prev => prev ? ({
      ...prev,
      status: e.target.value as 'draft' | 'published',
    }) : null);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPost(prev => prev ? ({
      ...prev,
      category: e.target.value,
    }) : null);
  };

  // SEO handlers
  const handleSeoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => prev ? ({
      ...prev,
      seoTitle: e.target.value,
    }) : null);
  };

  const handleSeoDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(prev => prev ? ({
      ...prev,
      seoDescription: e.target.value,
    }) : null);
  };

  const handleSeoKeywordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeoKeywordInput(e.target.value);
  };

  const handleSeoKeywordInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSeoKeyword();
    }
  };

  const addSeoKeyword = () => {
    const keyword = seoKeywordInput.trim().toLowerCase();
    if (keyword && post && !(post.seoKeywords?.includes(keyword)) && keyword.length <= 50) {
      setPost(prev => prev ? ({
        ...prev,
        seoKeywords: [...(prev.seoKeywords || []), keyword],
      }) : null);
      setSeoKeywordInput('');
    }
  };

  const removeSeoKeyword = (keywordToRemove: string) => {
    setPost(prev => prev ? ({
      ...prev,
      seoKeywords: prev.seoKeywords?.filter(keyword => keyword !== keywordToRemove) || [],
    }) : null);
  };

  const validateForm = () => {
    if (!post) return false;
    
    const newErrors: { [key: string]: string } = {};

    if (!post.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!post.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!post.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }

    if (post.excerpt.length > 160) {
      newErrors.excerpt = 'Excerpt must be 160 characters or less';
    }

    if (!post.author.trim()) {
      newErrors.author = 'Author is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!post || !validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Update the post data
      const updateData: any = {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        slug: post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        tags: post.tags,
        status: post.status,
        author: post.author,
        category: post.category || 'Blog',
      };

      // Only include featuredImage if it has a value
      if (post.featuredImage) {
        updateData.featuredImage = post.featuredImage;
      }

      // Only include SEO fields if they have values
      if (post.seoTitle && post.seoTitle.trim()) {
        updateData.seoTitle = post.seoTitle.trim();
      }
      if (post.seoDescription && post.seoDescription.trim()) {
        updateData.seoDescription = post.seoDescription.trim();
      }
      if (post.seoKeywords && post.seoKeywords.length > 0) {
        updateData.seoKeywords = post.seoKeywords;
      }

      // Update in Firebase
      await blogService.updatePost(post.id!, updateData);
      
      // Redirect to blog list
      router.push('/cms/blog');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const BlogPreview = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
            <Globe className="w-4 h-4" />
            <span>Preview</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>{post?.status === 'published' ? 'Published' : 'Draft'}</span>
          </div>
          
          {/* Featured Image */}
          {post?.featuredImage && (
            <div className="mb-6">
              <img
                src={post.featuredImage}
                alt="Featured image"
                className="w-full h-48 object-cover rounded-xl shadow-md"
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post?.title || 'Untitled Post'}</h1>
          {post?.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
          )}
          <div className="space-y-4">
            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                  {post?.author || 'Unknown Author'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {/* Tags */}
            {post?.tags && post.tags.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2 max-w-full">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200 hover:bg-blue-200 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post?.content || '<p>No content yet...</p>' }} />
        </div>
      </div>
    </div>
  );

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading post...</span>
        </div>
      </div>
    );
  }

  if (!user || !post) {
    return null;
  }

  return (
    <CMSLayout 
      title="Edit Blog Post" 
      showBackButton 
      backUrl="/cms/blog"
    >
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
            <p className="text-gray-600">Update your blog post content and settings</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                showPreview
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
            </button>
            <Link
              href="/cms/blog"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Link>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : 'Update Post'}</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6 max-h-screen overflow-y-auto pr-2"
          >
            {/* Top Section */}
            <div className=" bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 space-y-3">
              
              
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                  Title *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="title"
                    value={post.title}
                    onChange={handleTitleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter post title"
                    required
                  />
                </div>
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Author *
                </label>
                <div className="space-y-2">
                  {/* Author Type Selection */}
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={!useCustomAuthor}
                        onChange={() => {
                          setUseCustomAuthor(false);
                          setPost(prev => prev ? ({
                            ...prev,
                            author: user?.displayName || user?.email || '',
                          }) : null);
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Use current user</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={useCustomAuthor}
                        onChange={() => setUseCustomAuthor(true)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Enter custom author</span>
                    </label>
                  </div>

                  {/* Author Input */}
                  <div className="relative">
                    <PenTool className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={post.author}
                      onChange={handleAuthorChange}
                      disabled={!useCustomAuthor}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                        errors.author ? 'border-red-300' : 'border-gray-300'
                      } ${!useCustomAuthor ? 'bg-gray-50 text-gray-500' : ''}`}
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                  {errors.author && (
                    <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-900 mb-2">
                  Excerpt * <span className="text-xs text-gray-500">({post.excerpt.length}/160)</span>
                </label>
                <textarea
                  id="excerpt"
                  value={post.excerpt}
                  onChange={handleExcerptChange}
                  rows={2}
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none ${
                    errors.excerpt ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Brief description of the post (max 160 characters)"
                  maxLength={160}
                />
                {errors.excerpt && (
                  <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
                )}
              </div>

              {/* Category and Status Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      id="category"
                      value={post.category}
                      onChange={handleCategoryChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
                    >
                      <option value="Blog">Blog</option>
                      <option value="News">News</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-semibold text-gray-900 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    value={post.status}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Slug */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
              <label htmlFor="slug" className="block text-sm font-semibold text-gray-900 mb-2">
                URL Slug
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="slug"
                  value={post.slug}
                  onChange={(e) => setPost(prev => prev ? ({ ...prev, slug: e.target.value }) : null)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="post-url-slug"
                />
              </div>
            </div>



            {/* Category */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
              <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                Category *
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  id="category"
                  value={post.category || 'Blog'}
                  onChange={handleCategoryChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
                >
                  <option value="Blog">Blog</option>
                  <option value="News">News</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Choose whether this is a blog post or news article
              </p>
            </div>

            {/* Subcategory */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
              <label htmlFor="subcategory" className="block text-sm font-semibold text-gray-900 mb-2">
                Subcategory
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="subcategory"
                  value={post.subcategory || ''}
                  onChange={(e) => setPost(prev => prev ? ({ ...prev, subcategory: e.target.value }) : null)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="e.g., Personal Loan, Business Loan, Credit Score"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Add a specific subcategory for better content organization (e.g., Personal Loan, Business Loan, Credit Score, EMI Calculator)
              </p>
            </div>

            {/* SEO Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>SEO Settings</span>
              </h3>
              <div className="space-y-4">
                {/* SEO Title */}
                <div>
                  <label htmlFor="seoTitle" className="block text-sm font-semibold text-gray-900 mb-2">
                    SEO Title <span className="text-xs text-gray-500">({post.seoTitle?.length || 0}/60)</span>
                  </label>
                  <input
                    type="text"
                    id="seoTitle"
                    value={post.seoTitle || ''}
                    onChange={handleSeoTitleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter SEO title (recommended: 50-60 characters)"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be displayed in search engine results. Leave blank to use the main title.
                  </p>
                </div>

                {/* SEO Description */}
                <div>
                  <label htmlFor="seoDescription" className="block text-sm font-semibold text-gray-900 mb-2">
                    SEO Description <span className="text-xs text-gray-500">({post.seoDescription?.length || 0}/160)</span>
                  </label>
                  <textarea
                    id="seoDescription"
                    value={post.seoDescription || ''}
                    onChange={handleSeoDescriptionChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                    placeholder="Enter SEO description (recommended: 150-160 characters)"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be displayed as the snippet in search engine results.
                  </p>
                </div>

                {/* SEO Keywords */}
                <div>
                  <label htmlFor="seoKeywords" className="block text-sm font-semibold text-gray-900 mb-2">
                    SEO Keywords <span className="text-xs text-gray-500">({post.seoKeywords?.length || 0}/10)</span>
                  </label>
                  <div className="space-y-3">
                    {/* Keyword Input */}
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={seoKeywordInput}
                        onChange={handleSeoKeywordInputChange}
                        onKeyDown={handleSeoKeywordInputKeyDown}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Type a keyword and press Enter or comma"
                        maxLength={50}
                        disabled={(post.seoKeywords?.length || 0) >= 10}
                      />
                    </div>
                    
                    {/* Keywords Display */}
                    {post.seoKeywords && post.seoKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.seoKeywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200"
                          >
                            <span>{keyword}</span>
                            <button
                              type="button"
                              onClick={() => removeSeoKeyword(keyword)}
                              className="ml-1 hover:bg-green-200 rounded-full p-0.5 transition-colors duration-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Help Text */}
                    <p className="text-xs text-gray-500">
                      Press Enter or comma to add a keyword. Maximum 10 keywords, 50 characters each.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Featured Image
              </label>
              
              {imagePreview ? (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Featured image preview"
                      className="w-full h-64 object-cover rounded-xl border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Image uploaded successfully. This will be used as the featured image for your blog post.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                      disabled={imageUploading}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer block"
                    >
                      <div className="space-y-4">
                        {imageUploading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          </div>
                        ) : (
                          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        )}
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            {imageUploading ? 'Uploading...' : 'Upload Featured Image'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Tags and Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
                <label htmlFor="tags" className="block text-sm font-semibold text-gray-900 mb-2">
                  Tags <span className="text-xs text-gray-500">({post.tags.length}/10)</span>
                </label>
                <div className="space-y-3">
                  {/* Tag Input */}
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagInputKeyDown}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Type a tag and press Enter or comma"
                      maxLength={20}
                      disabled={post.tags.length >= 10}
                    />
                  </div>
                  
                  {/* Tag Display */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors duration-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Help Text */}
                  <p className="text-xs text-gray-500">
                    Press Enter or comma to add a tag. Maximum 10 tags, 20 characters each.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
                <label htmlFor="status" className="block text-sm font-semibold text-gray-900 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={post.status}
                  onChange={handleStatusChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Content *
              </label>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <RichTextEditor
                  value={post.content}
                  onChange={handleContentChange}
                  placeholder="Write your post content here..."
                  className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] max-h-[800px] overflow-y-auto"
                />
              </div>
              {errors.content && (
                <p className="text-red-500 text-sm mt-2">{errors.content}</p>
              )}
            </div>
          </motion.form>

          {/* Preview Panel */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-6 max-h-screen overflow-y-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span>Preview</span>
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    This is how your post will appear to readers.
                  </p>
                </div>
                <div className="pr-2">
                  <BlogPreview />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
};

export default EditBlogPost; 