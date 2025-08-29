import { z } from 'zod';

// Category Schema for validation
export const CategorySchema = z.object({
  name: z.string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be less than 100 characters')
    .trim(),
  
  slug: z.string()
    .min(1, 'Category slug is required')
    .max(100, 'Category slug must be less than 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Category slug must contain only lowercase letters, numbers, and hyphens')
    .trim(),
  
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .nullable(),
  
  icon: z.string()
    .max(50, 'Icon must be less than 50 characters')
    .optional()
    .nullable(),
  
  color: z.string()
    .regex(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color')
    .optional()
    .nullable(),
  
  parentId: z.string()
    .optional()
    .nullable(),
  
  isActive: z.boolean().default(true),
  
  sortOrder: z.number()
    .int()
    .min(0)
    .default(0)
});

// Category Type
export type Category = z.infer<typeof CategorySchema>;

// Category with ID and timestamps
export interface CategoryWithId extends Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  postCount: number;
}

// Category response for API
export interface CategoryResponse {
  success: boolean;
  data?: CategoryWithId;
  message?: string;
  error?: string;
  details?: any;
}

// Categories list response
export interface CategoriesResponse {
  success: boolean;
  data?: CategoryWithId[];
  message?: string;
  error?: string;
  details?: any;
}

// Category utilities
export class CategoryUtils {
  /**
   * Validate category data
   */
  static validate(data: any): { isValid: boolean; errors: string[]; data?: Category } {
    try {
      const validatedData = CategorySchema.parse(data);
      
      return {
        isValid: true,
        data: validatedData,
        errors: []
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        };
      }
      
      return {
        isValid: false,
        errors: ['Invalid data format']
      };
    }
  }

  /**
   * Generate slug from name
   */
  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Format category for API response
   */
  static formatForResponse(category: any): CategoryWithId {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      color: category.color,
      parentId: category.parentId,
      isActive: category.isActive !== false,
      sortOrder: category.sortOrder || 0,
      createdAt: category.createdAt?.toDate() || new Date(),
      updatedAt: category.updatedAt?.toDate() || new Date(),
      postCount: category.postCount || 0
    };
  }

  /**
   * Prepare category for database
   */
  static prepareForDatabase(category: Category, isUpdate: boolean = false): any {
    const data: any = {
      ...category,
      updatedAt: new Date()
    };

    if (!isUpdate) {
      data.createdAt = new Date();
    }

    return data;
  }
} 