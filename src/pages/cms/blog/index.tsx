import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import Link from 'next/link';
import CMSLayout from '@/components/CMSLayout';
import CustomAlert from '@/components/CustomAlert';
import { useCustomAlert } from '@/hooks/useCustomAlert';
import { motion } from 'framer-motion';
import { FileText, Plus, Edit, Trash2, Calendar, Tag, Eye, EyeOff, MoreVertical, ExternalLink } from 'lucide-react';
import { blogService, BlogPost } from '@/services/blogService';

const BlogList: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { alertState, showError, showSuccess, showConfirm, closeAlert } = useCustomAlert();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/cms/login');
    }
  }, [user, loading, router]);

  const fetchAllPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await blogService.getAllPosts();
      setAllPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh posts function
  const refreshPosts = useCallback(async () => {
    await fetchAllPosts();
  }, [fetchAllPosts]);

  // Fetch all posts once when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchAllPosts();
    }
  }, [user, fetchAllPosts]);

  // Handle router events for better data consistency
  useEffect(() => {
    const handleRouteChange = () => {
      // Refresh data when navigating back to this page
      if (user) {
        refreshPosts();
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, user, refreshPosts]);

  // Filter posts based on current filter
  useEffect(() => {
    if (allPosts.length > 0) {
      let filteredPosts: BlogPost[] = [];
      
      if (filter === 'all') {
        filteredPosts = allPosts;
      } else {
        filteredPosts = allPosts.filter(post => post.status === filter);
      }
      
      setPosts(filteredPosts);
    }
  }, [allPosts, filter]);

  const handleDelete = async (postId: string) => {
    const confirmed = await showConfirm({
      title: 'Delete Post',
      message: 'Are you sure you want to delete this post? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      try {
        await blogService.deletePost(postId);
        setAllPosts(prev => prev.filter(post => post.id !== postId));
        showSuccess('Success!', 'Post deleted successfully.');
      } catch (error) {
        console.error('Error deleting post:', error);
        showError('Delete Failed', 'Failed to delete post. Please try again.');
      }
    }
  };

  const handleStatusChange = async (postId: string, newStatus: 'draft' | 'published') => {
    try {
      await blogService.updatePost(postId, { status: newStatus });
      setAllPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, status: newStatus }
          : post
      ));
      showSuccess('Success!', `Post ${newStatus === 'published' ? 'published' : 'unpublished'} successfully.`);
    } catch (error) {
      console.error('Error updating post status:', error);
      showError('Update Failed', 'Failed to update post status. Please try again.');
    }
  };

  const getStatusBadge = (status: 'draft' | 'published') => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'published' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {status === 'published' ? (
          <>
            <Eye className="w-3 h-3 mr-1" />
            Published
          </>
        ) : (
          <>
            <EyeOff className="w-3 h-3 mr-1" />
            Draft
          </>
        )}
      </span>
    );
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <CMSLayout 
      title="Blog Posts" 
      showBackButton 
      backUrl="/cms"
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
            <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
            <p className="text-gray-600">Manage and organize your blog content</p>
          </div>
          <Link
            href="/cms/blog/new"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </Link>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex space-x-1 bg-gray-100 p-1 rounded-xl"
        >
          {[
            { key: 'all', label: 'All Posts', count: allPosts.length },
            { key: 'draft', label: 'Drafts', count: allPosts.filter(p => p.status === 'draft').length },
            { key: 'published', label: 'Published', count: allPosts.filter(p => p.status === 'published').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as 'all' | 'draft' | 'published')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 break-words">
                          {post.title}
                        </h3>
                        {getStatusBadge(post.status)}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 break-words">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Created: {blogService.formatDate(post.createdAt)}</span>
                        </div>
                        {post.publishedAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Published: {blogService.formatDate(post.publishedAt)}</span>
                          </div>
                        )}
                        {post.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{post.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2 flex-shrink-0">
                  {/* View Blog Button - Only show for published posts */}
                  {post.status === 'published' && post.slug && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors duration-200 px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg hover:bg-green-50 min-h-[44px] sm:min-h-0"
                      title="View published post"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">View Blog</span>
                    </Link>
                  )}
                  
                  {/* Status Toggle */}
                  <button
                    onClick={() => handleStatusChange(post.id!, post.status === 'published' ? 'draft' : 'published')}
                    className={`flex items-center gap-1 px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px] sm:min-h-0 ${
                      post.status === 'published'
                        ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50'
                        : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                    }`}
                  >
                    {post.status === 'published' ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span>Unpublish</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span>Publish</span>
                      </>
                    )}
                  </button>
                  
                  {/* Edit Button */}
                  <Link
                    href={`/cms/blog/${post.id}/edit`}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors duration-200 px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg hover:bg-blue-50 min-h-[44px] sm:min-h-0"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </Link>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(post.id!)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors duration-200 px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg hover:bg-red-50 min-h-[44px] sm:min-h-0"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'all' 
                ? 'No blog posts yet' 
                : filter === 'draft' 
                ? 'No draft posts' 
                : 'No published posts'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Get started by creating your first blog post.'
                : filter === 'draft'
                ? 'Create a draft post to see it here.'
                : 'Publish a post to see it here.'
              }
            </p>
            <Link
              href="/cms/blog/new"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Post</span>
            </Link>
          </motion.div>
        )}
      </div>
      
      {/* Custom Alert */}
      <CustomAlert
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        onConfirm={alertState.onConfirm}
        onCancel={alertState.onCancel}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        confirmText={alertState.confirmText}
        cancelText={alertState.cancelText}
        showCancel={alertState.showCancel}
      />
    </CMSLayout>
  );
};

export default BlogList; 