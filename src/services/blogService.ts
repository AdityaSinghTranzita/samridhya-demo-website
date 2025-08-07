import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  Timestamp,
  serverTimestamp,
  deleteField
} from 'firebase/firestore';
import { db } from '@/firebase/config';

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  featuredImage?: string;
  tags: string[];
  category?: string;
  subcategory?: string;
  readTime?: string;
  featured?: boolean;
  // SEO fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  meta?: {
    views: number;
    likes: number;
    shares: number;
  };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
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
  private collectionName = 'blog-posts';

  // Create a new blog post
  async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      // Filter out undefined values to avoid Firebase errors
      const filteredData = Object.fromEntries(
        Object.entries(postData).filter(([_, value]) => value !== undefined)
      );

      const post: any = {
        ...filteredData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        meta: postData.meta || { views: 0, likes: 0, shares: 0 }
      };

      // Only set publishedAt if the post is being published
      if (postData.status === 'published') {
        post.publishedAt = serverTimestamp();
      }

      const docRef = await addDoc(collection(db, this.collectionName), post);
      return docRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Get all blog posts
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      const posts: BlogPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate() || undefined,
        } as BlogPost);
      });

      return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error('Error getting posts:', error);
      throw error;
    }
  }

  // Get published posts only
  async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts: BlogPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate() || undefined,
        } as BlogPost);
      });

      return posts;
    } catch (error) {
      console.error('Error getting published posts:', error);
      // If there's an index error, try without ordering
      if (error instanceof Error && (error.message.includes('index') || error.message.includes('requires an index'))) {
        console.log('Index not found, falling back to unordered query...');
        try {
          const q = query(
            collection(db, this.collectionName),
            where('status', '==', 'published')
          );
          
          const querySnapshot = await getDocs(q);
          const posts: BlogPost[] = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            posts.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
              publishedAt: data.publishedAt?.toDate() || undefined,
            } as BlogPost);
          });

          return posts.sort((a, b) => {
            if (a.publishedAt && b.publishedAt) {
              return b.publishedAt.getTime() - a.publishedAt.getTime();
            }
            return b.updatedAt.getTime() - a.updatedAt.getTime();
          });
        } catch (fallbackError) {
          console.error('Error in fallback query:', fallbackError);
          throw fallbackError;
        }
      }
      throw error;
    }
  }

  // Get a single post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate() || undefined,
        } as BlogPost;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting post:', error);
      throw error;
    }
  }

  // Get a single post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const q = query(collection(db, this.collectionName), where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate() || undefined,
        } as BlogPost;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting post by slug:', error);
      throw error;
    }
  }

  // Update a blog post
  async updatePost(id: string, postData: Partial<BlogPost>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      
      // Filter out undefined values to avoid Firebase errors
      const filteredData = Object.fromEntries(
        Object.entries(postData).filter(([_, value]) => value !== undefined)
      );

      const updateData: any = {
        ...filteredData,
        updatedAt: serverTimestamp(),
      };

      // Handle publishedAt field based on status
      if (postData.status === 'published') {
        // If publishing and no publishedAt exists, set it
        if (!postData.publishedAt) {
          updateData.publishedAt = serverTimestamp();
        }
      } else if (postData.status === 'draft') {
        // If unpublishing, remove the publishedAt field
        updateData.publishedAt = deleteField();
      }

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Delete a blog post
  async deletePost(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // Get posts by status
  async getPostsByStatus(status: 'draft' | 'published'): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', status),
        orderBy('updatedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts: BlogPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate() || undefined,
        } as BlogPost);
      });

      return posts;
    } catch (error) {
      console.error('Error getting posts by status:', error);
      // If there's an index error, try without ordering
      if (error instanceof Error && (error.message.includes('index') || error.message.includes('requires an index'))) {
        console.log('Index not found, falling back to unordered query...');
        try {
          const q = query(
            collection(db, this.collectionName),
            where('status', '==', status)
          );
          
          const querySnapshot = await getDocs(q);
          const posts: BlogPost[] = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            posts.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
              publishedAt: data.publishedAt?.toDate() || undefined,
            } as BlogPost);
          });

          return posts.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
        } catch (fallbackError) {
          console.error('Error in fallback query:', fallbackError);
          throw fallbackError;
        }
      }
      throw error;
    }
  }

  // Get featured posts
  async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('featured', '==', true),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts: BlogPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate() || undefined,
        } as BlogPost);
      });

      return posts;
    } catch (error) {
      console.error('Error getting featured posts:', error);
      // If there's an index error, try without ordering
      if (error instanceof Error && (error.message.includes('index') || error.message.includes('requires an index'))) {
        console.log('Index not found, falling back to unordered query...');
        try {
          const q = query(
            collection(db, this.collectionName),
            where('featured', '==', true),
            where('status', '==', 'published')
          );
          
          const querySnapshot = await getDocs(q);
          const posts: BlogPost[] = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            posts.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
              publishedAt: data.publishedAt?.toDate() || undefined,
            } as BlogPost);
          });

          return posts.sort((a, b) => {
            if (a.publishedAt && b.publishedAt) {
              return b.publishedAt.getTime() - a.publishedAt.getTime();
            }
            return b.updatedAt.getTime() - a.updatedAt.getTime();
          });
        } catch (fallbackError) {
          console.error('Error in fallback query:', fallbackError);
          throw fallbackError;
        }
      }
      throw error;
    }
  }

  // Get posts by category
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('category', '==', category),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts: BlogPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate() || undefined,
        } as BlogPost);
      });

      return posts;
    } catch (error) {
      console.error('Error getting posts by category:', error);
      // If there's an index error, try without ordering
      if (error instanceof Error && (error.message.includes('index') || error.message.includes('requires an index'))) {
        console.log('Index not found, falling back to unordered query...');
        try {
          const q = query(
            collection(db, this.collectionName),
            where('category', '==', category),
            where('status', '==', 'published')
          );
          
          const querySnapshot = await getDocs(q);
          const posts: BlogPost[] = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            posts.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
              publishedAt: data.publishedAt?.toDate() || undefined,
            } as BlogPost);
          });

          return posts.sort((a, b) => {
            if (a.publishedAt && b.publishedAt) {
              return b.publishedAt.getTime() - a.publishedAt.getTime();
            }
            return b.updatedAt.getTime() - a.updatedAt.getTime();
          });
        } catch (fallbackError) {
          console.error('Error in fallback query:', fallbackError);
          throw fallbackError;
        }
      }
      throw error;
    }
  }

  // Get posts by search query
  async getPostsBySearch(query: string): Promise<BlogPost[]> {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a simple implementation - for production, consider using Algolia or similar
      const allPosts = await this.getPublishedPosts();
      const lowercaseQuery = query.toLowerCase();
      
      return allPosts.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  }

  // Get recent posts
  async getRecentPosts(limitCount: number = 5): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const posts: BlogPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate() || undefined,
        } as BlogPost);
      });

      return posts;
    } catch (error) {
      console.error('Error getting recent posts:', error);
      // If there's an index error, try without ordering
      if (error instanceof Error && (error.message.includes('index') || error.message.includes('requires an index'))) {
        console.log('Index not found, falling back to unordered query...');
        try {
          const q = query(
            collection(db, this.collectionName),
            where('status', '==', 'published'),
            limit(limitCount)
          );
          
          const querySnapshot = await getDocs(q);
          const posts: BlogPost[] = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            posts.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
              publishedAt: data.publishedAt?.toDate() || undefined,
            } as BlogPost);
          });

          return posts.sort((a, b) => {
            if (a.publishedAt && b.publishedAt) {
              return b.publishedAt.getTime() - a.publishedAt.getTime();
            }
            return b.updatedAt.getTime() - a.updatedAt.getTime();
          }).slice(0, limitCount);
        } catch (fallbackError) {
          console.error('Error in fallback query:', fallbackError);
          throw fallbackError;
        }
      }
      throw error;
    }
  }

  // Get all categories
  async getCategories(): Promise<Category[]> {
    try {
      const posts = await this.getPublishedPosts();
      const categoryCounts = new Map<string, number>();
      
      posts.forEach(post => {
        if (post.category) {
          categoryCounts.set(post.category, (categoryCounts.get(post.category) || 0) + 1);
        }
      });
      
      const categories: Category[] = [
        {
          name: 'All',
          slug: 'all',
          count: posts.length,
          icon: 'BookOpen'
        }
      ];
      
      categoryCounts.forEach((count, name) => {
        categories.push({
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          count,
          icon: this.getCategoryIcon(name)
        });
      });
      
      return categories;
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  }

  // Get all tags
  async getTags(): Promise<string[]> {
    try {
      const posts = await this.getPublishedPosts();
      const tagSet = new Set<string>();
      
      posts.forEach(post => {
        post.tags.forEach(tag => tagSet.add(tag));
      });
      
      return Array.from(tagSet);
    } catch (error) {
      console.error('Error getting tags:', error);
      throw error;
    }
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

  // Format date
  formatDate(date: Date): string {
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