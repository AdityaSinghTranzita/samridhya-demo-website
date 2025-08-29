import React, { useState, useEffect } from 'react';
import { blogService, BlogPost, Category } from '../services/blogService';

const BlogExample: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load data in parallel
      const [postsData, categoriesData, tagsData, featuredData] = await Promise.all([
        blogService.getPublishedPosts(),
        blogService.getCategories(),
        blogService.getTags(),
        blogService.getFeaturedPosts()
      ]);

      setPosts(postsData);
      setCategories(categoriesData);
      setTags(tagsData);
      setFeaturedPosts(featuredData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Search posts
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await blogService.getPostsBySearch(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    }
  };

  // Like a post
  const handleLikePost = async (postId: string) => {
    try {
      await blogService.likePost(postId);
      // Refresh posts to get updated like count
      const updatedPosts = await blogService.getPublishedPosts();
      setPosts(updatedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like post');
    }
  };

  // Create a new post
  const handleCreatePost = async () => {
    const newPost = {
      title: "Example Blog Post",
      slug: blogService.generateSlug("Example Blog Post"),
      excerpt: "This is an example blog post created from the frontend",
      content: "This is the full content of the example blog post. It demonstrates how to create posts using the simplified API.",
      author: "Frontend User",
      status: "draft" as const,
      category: "Example",
      tags: ["example", "frontend", "api"]
    };

    try {
      const postId = await blogService.createPost(newPost);
      alert(`Post created successfully with ID: ${postId}`);
      // Refresh posts
      const updatedPosts = await blogService.getPublishedPosts();
      setPosts(updatedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadInitialData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog API Integration Example
          </h1>
          <p className="text-xl text-gray-600">
            Demonstrating the simplified API integration
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Posts</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for posts..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Search Results ({searchResults.length})</h3>
              <div className="space-y-2">
                {searchResults.map((post) => (
                  <div key={post.id} className="p-3 bg-gray-50 rounded">
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-gray-600">{post.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Actions</h2>
          <button
            onClick={handleCreatePost}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Create Example Post
          </button>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Featured Posts ({featuredPosts.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span>❤️ {post.likes || 0}</span>
                  </div>
                  <button
                    onClick={() => handleLikePost(post.id!)}
                    className="mt-2 w-full bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Like
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">All Posts ({posts.length})</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-2">{post.excerpt}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>By {post.author}</span>
                      <span>Category: {post.category}</span>
                      <span>❤️ {post.likes || 0}</span>
                      <span>👁️ {post.views || 0}</span>
                    </div>
                    <div className="mt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleLikePost(post.id!)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 ml-4"
                  >
                    Like
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Categories ({categories.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category.name} className="text-center p-4 border rounded-lg">
                <div className="font-semibold">{category.name}</div>
                <div className="text-gray-600">{category.count} posts</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Tags ({tags.length})</h2>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 20).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 20 && (
              <span className="text-gray-500 text-sm px-3 py-1">
                +{tags.length - 20} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogExample; 