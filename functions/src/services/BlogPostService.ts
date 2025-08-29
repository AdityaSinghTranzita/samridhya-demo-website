import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { BlogPost, BlogPostWithId, validateBlogPost, generateSlug, calculateReadTime } from '../models/BlogPost';

export class BlogPostService {
  private db: admin.firestore.Firestore;
  private collectionName = 'blog-posts';

  constructor() {
    this.db = admin.firestore();
  }

  /**
   * Create a new blog post
   */
  async createPost(data: Partial<BlogPost>): Promise<BlogPostWithId> {
    // Generate slug if not provided
    if (!data.slug && data.title) {
      data.slug = generateSlug(data.title);
    }

    // Validate input after auto-generating fields
    const validation = validateBlogPost(data);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    // Check if slug already exists
    const existingPost = await this.getPostBySlug(data.slug!);
    if (existingPost) {
      throw new Error('Slug already exists');
    }

    // Prepare data for database
    const postData = {
      ...data,
      views: 0,
      likes: 0,
      featured: false,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      ...(data.status === 'published' && { publishedAt: FieldValue.serverTimestamp() })
    };

    // Create document
    const docRef = await this.db.collection(this.collectionName).add(postData);
    const doc = await docRef.get();

    return {
      id: doc.id,
      ...doc.data()
    } as BlogPostWithId;
  }

  /**
   * Get all blog posts with simple filtering
   */
  async getPosts(options: {
    status?: 'draft' | 'published';
    category?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ posts: BlogPostWithId[]; total: number }> {
    const { status, category, featured, limit = 50, offset = 0 } = options;

    let query: admin.firestore.Query = this.db.collection(this.collectionName);

    // Apply filters
    if (status) {
      // Handle different status values (case-insensitive)
      query = query.where('status', '==', status.toLowerCase());
    }
    if (category) {
      query = query.where('category', '==', category);
    }
    if (featured !== undefined) {
      query = query.where('featured', '==', featured);
    }

    try {
      // Get total count
      const totalSnapshot = await query.get();
      const total = totalSnapshot.size;

      // Apply pagination
      query = query.orderBy('createdAt', 'desc').limit(limit).offset(offset);
      const snapshot = await query.get();

      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || 'Untitled',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          author: data.author || 'Unknown',
          status: data.status || 'draft',
          featuredImage: data.featuredImage,
          tags: data.tags || [],
          category: data.category || 'Uncategorized',
          readTime: data.readTime,
          featured: data.featured || false,
          // Handle both old and new structures
          views: data.views || data.meta?.views || 0,
          likes: data.likes || data.meta?.likes || 0,
          publishedAt: data.publishedAt,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };
      }) as BlogPostWithId[];

      return { posts, total };
    } catch (error) {
      console.error('Firestore query failed, falling back to client-side filtering:', error);
      
      // Fallback: Get all posts and filter client-side
      const allSnapshot = await this.db.collection(this.collectionName).get();
      let allPosts = allSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || 'Untitled',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          author: data.author || 'Unknown',
          status: data.status || 'draft',
          featuredImage: data.featuredImage,
          tags: data.tags || [],
          category: data.category || 'Uncategorized',
          readTime: data.readTime,
          featured: data.featured || false,
          // Handle both old and new structures
          views: data.views || data.meta?.views || 0,
          likes: data.likes || data.meta?.likes || 0,
          publishedAt: data.publishedAt,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };
      }) as BlogPostWithId[];

      // Apply client-side filters
      if (status) {
        allPosts = allPosts.filter(post => post.status.toLowerCase() === status.toLowerCase());
      }
      if (category) {
        allPosts = allPosts.filter(post => post.category === category);
      }
      if (featured !== undefined) {
        allPosts = allPosts.filter(post => post.featured === featured);
      }

      // Sort by createdAt desc
      allPosts.sort((a, b) => {
        const aTime = (a.createdAt as any)?._seconds || 0;
        const bTime = (b.createdAt as any)?._seconds || 0;
        return bTime - aTime;
      });

      const total = allPosts.length;

      // Apply pagination
      const start = offset;
      const end = start + limit;
      const posts = allPosts.slice(start, end);

      return { posts, total };
    }
  }



  /**
   * Get a single blog post by ID
   */
  async getPostById(id: string): Promise<BlogPostWithId | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    } as BlogPostWithId;
  }

  /**
   * Get a single blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPostWithId | null> {
    const snapshot = await this.db.collection(this.collectionName)
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as BlogPostWithId;
  }

  /**
   * Update a blog post
   */
  async updatePost(id: string, data: Partial<BlogPost>): Promise<BlogPostWithId> {
    // Check if post exists
    const existingPost = await this.getPostById(id);
    if (!existingPost) {
      throw new Error('Blog post not found');
    }

    // Check slug uniqueness if slug is being updated
    if (data.slug && data.slug !== existingPost.slug) {
      const slugExists = await this.getPostBySlug(data.slug);
      if (slugExists) {
        throw new Error('Slug already exists');
      }
    }

    // Generate read time if content is updated
    if (data.content && !data.readTime) {
      data.readTime = calculateReadTime(data.content);
    }

    // Prepare update data
    const updateData = {
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
      ...(data.status === 'published' && !existingPost.publishedAt && { publishedAt: FieldValue.serverTimestamp() })
    };

    // Update document
    await this.db.collection(this.collectionName).doc(id).update(updateData);

    // Return updated post
    return await this.getPostById(id) as BlogPostWithId;
  }

  /**
   * Delete a blog post
   */
  async deletePost(id: string): Promise<void> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    
    if (!doc.exists) {
      throw new Error('Blog post not found');
    }

    await this.db.collection(this.collectionName).doc(id).delete();
  }

  /**
   * Search blog posts
   */
  async searchPosts(query: string, limit: number = 10): Promise<BlogPostWithId[]> {
    if (!query.trim()) {
      return [];
    }

    // Get all published posts
    const { posts } = await this.getPosts({ status: 'published', limit: 1000 });
    
    const searchTerm = query.toLowerCase();
    
    // Simple search in title, excerpt, and content
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    return results.slice(0, limit);
  }

  /**
   * Increment view count
   */
  async incrementViews(id: string): Promise<void> {
    await this.db.collection(this.collectionName).doc(id).update({
      views: FieldValue.increment(1)
    });
  }

  /**
   * Increment like count
   */
  async incrementLikes(id: string): Promise<void> {
    await this.db.collection(this.collectionName).doc(id).update({
      likes: FieldValue.increment(1)
    });
  }

  /**
   * Get categories
   */
  async getCategories(): Promise<Array<{ name: string; count: number }>> {
    const { posts } = await this.getPosts({ status: 'published' });
    
    const categoryCounts: { [key: string]: number } = {};
    posts.forEach(post => {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));
  }

  /**
   * Get tags
   */
  async getTags(): Promise<string[]> {
    const { posts } = await this.getPosts({ status: 'published' });
    
    const allTags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => allTags.add(tag));
    });

    return Array.from(allTags).sort();
  }

  /**
   * Get featured posts
   */
  async getFeaturedPosts(limit: number = 5): Promise<BlogPostWithId[]> {
    const { posts } = await this.getPosts({ featured: true, status: 'published', limit });
    return posts;
  }

  /**
   * Get popular posts (by views)
   */
  async getPopularPosts(limit: number = 5): Promise<BlogPostWithId[]> {
    const snapshot = await this.db.collection(this.collectionName)
      .where('status', '==', 'published')
      .orderBy('views', 'desc')
      .limit(limit)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPostWithId[];
  }
} 