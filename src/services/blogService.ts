import blogData from '@/data/blog-posts.json';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image?: string;
  meta: {
    views: number;
    likes: number;
    shares: number;
  };
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  icon: string;
}

export interface BlogData {
  posts: BlogPost[];
  categories: Category[];
  tags: string[];
}

class BlogService {
  private data: BlogData = blogData;

  // Get all blog posts
  getAllPosts(): BlogPost[] {
    return this.data.posts;
  }

  // Get featured posts
  getFeaturedPosts(): BlogPost[] {
    return this.data.posts.filter(post => post.featured);
  }

  // Get posts by category
  getPostsByCategory(category: string): BlogPost[] {
    if (category === 'All' || category === 'all') {
      return this.data.posts;
    }
    return this.data.posts.filter(post => post.category === category);
  }

  // Get posts by search query
  getPostsBySearch(query: string): BlogPost[] {
    const lowercaseQuery = query.toLowerCase();
    return this.data.posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.category.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get filtered posts (category + search)
  getFilteredPosts(category: string, searchQuery: string): BlogPost[] {
    let posts = this.data.posts;

    // Filter by category
    if (category && category !== 'All' && category !== 'all') {
      posts = posts.filter(post => post.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.category.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }

    return posts;
  }

  // Get single post by slug
  getPostBySlug(slug: string): BlogPost | null {
    return this.data.posts.find(post => post.slug === slug) || null;
  }

  // Get related posts
  getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
    const relatedPosts = this.data.posts
      .filter(post => 
        post.id !== currentPost.id && 
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .sort((a, b) => {
        // Sort by category match first, then by date
        const aCategoryMatch = a.category === currentPost.category ? 1 : 0;
        const bCategoryMatch = b.category === currentPost.category ? 1 : 0;
        if (aCategoryMatch !== bCategoryMatch) {
          return bCategoryMatch - aCategoryMatch;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    return relatedPosts.slice(0, limit);
  }

  // Get all categories with actual post counts
  getCategories(): Category[] {
    // Calculate actual post counts for each category
    const categoryCounts = new Map<string, number>();
    
    // Count posts for each category
    this.data.posts.forEach(post => {
      const category = post.category;
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    });
    
    // Get unique categories from posts
    const uniqueCategories = Array.from(new Set(this.data.posts.map(post => post.category)));
    
    // Create categories with actual counts
    const categories: Category[] = [
      {
        name: 'All',
        slug: 'all',
        count: this.data.posts.length,
        icon: 'BookOpen'
      },
      ...uniqueCategories.map(category => ({
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, '-'),
        count: categoryCounts.get(category) || 0,
        icon: this.getCategoryIcon(category)
      }))
    ];
    
    return categories;
  }
  
  // Helper method to get icon for category
  private getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'Personal Loan': 'TrendingUp',
      'Business Loan': 'Users',
      'Credit Score': 'TrendingDown',
      'EMI Calculator': 'Calculator',
      'Digital Gold': 'BookOpen',
      'Financial Advice': 'Shield',
      'Loan Tips': 'Shield'
    };
    return iconMap[category] || 'BookOpen';
  }

  // Get category by name
  getCategoryByName(name: string): Category | null {
    return this.data.categories.find(cat => cat.name === name) || null;
  }

  // Get all tags
  getTags(): string[] {
    return this.data.tags;
  }

  // Get posts by tag
  getPostsByTag(tag: string): BlogPost[] {
    return this.data.posts.filter(post => 
      post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    );
  }

  // Get popular posts (by views)
  getPopularPosts(limit: number = 5): BlogPost[] {
    return this.data.posts
      .sort((a, b) => b.meta.views - a.meta.views)
      .slice(0, limit);
  }

  // Get recent posts
  getRecentPosts(limit: number = 5): BlogPost[] {
    return this.data.posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  // Get posts for pagination
  getPaginatedPosts(page: number = 1, limit: number = 8): { posts: BlogPost[], total: number, totalPages: number } {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const posts = this.data.posts.slice(startIndex, endIndex);
    const total = this.data.posts.length;
    const totalPages = Math.ceil(total / limit);

    return {
      posts,
      total,
      totalPages
    };
  }

  // Search posts with pagination
  searchPosts(query: string, page: number = 1, limit: number = 8): { posts: BlogPost[], total: number, totalPages: number } {
    const filteredPosts = this.getPostsBySearch(query);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const posts = filteredPosts.slice(startIndex, endIndex);
    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / limit);

    return {
      posts,
      total,
      totalPages
    };
  }

  // Format date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Get reading time estimate
  getReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  }
}

export const blogService = new BlogService(); 