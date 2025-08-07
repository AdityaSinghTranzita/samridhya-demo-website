// Image validation and optimization utility
export interface ImageValidationConfig {
  maxSizeBytes: number;
  maxWidth: number;
  maxHeight: number;
  minWidth: number;
  minHeight: number;
  allowedFormats: string[];
  compressionQuality: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
}

export interface OptimizedImage {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  dimensions: { width: number; height: number };
}

// Default configuration for blog images
export const DEFAULT_IMAGE_CONFIG: ImageValidationConfig = {
  maxSizeBytes: 5 * 1024 * 1024, // 5MB
  maxWidth: 2048,
  maxHeight: 2048,
  minWidth: 300,
  minHeight: 200,
  allowedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  compressionQuality: 0.85
};

// Configuration for different image types
export const IMAGE_CONFIGS = {
  blog_featured: {
    ...DEFAULT_IMAGE_CONFIG,
    maxSizeBytes: 3 * 1024 * 1024, // 3MB for featured images
    maxWidth: 1920,
    maxHeight: 1080,
    minWidth: 800,
    minHeight: 400
  },
  blog_content: {
    ...DEFAULT_IMAGE_CONFIG,
    maxSizeBytes: 2 * 1024 * 1024, // 2MB for content images
    maxWidth: 1200,
    maxHeight: 800,
    minWidth: 400,
    minHeight: 300
  },
  general: DEFAULT_IMAGE_CONFIG
};

/**
 * Get image dimensions from a File object
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
};

/**
 * Validate image against configuration
 */
export const validateImage = async (file: File, config: ImageValidationConfig): Promise<ValidationResult> => {
  const warnings: string[] = [];
  
  // Check file type
  if (!config.allowedFormats.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file format. Allowed formats: ${config.allowedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}`
    };
  }
  
  // Check file size
  if (file.size > config.maxSizeBytes) {
    return {
      isValid: false,
      error: `File size too large. Maximum allowed: ${formatFileSize(config.maxSizeBytes)}, your file: ${formatFileSize(file.size)}`
    };
  }
  
  // Get image dimensions
  try {
    const dimensions = await getImageDimensions(file);
    
    // Check dimensions
    if (dimensions.width > config.maxWidth || dimensions.height > config.maxHeight) {
      return {
        isValid: false,
        error: `Image dimensions too large. Maximum: ${config.maxWidth}×${config.maxHeight}px, your image: ${dimensions.width}×${dimensions.height}px`
      };
    }
    
    if (dimensions.width < config.minWidth || dimensions.height < config.minHeight) {
      return {
        isValid: false,
        error: `Image dimensions too small. Minimum: ${config.minWidth}×${config.minHeight}px, your image: ${dimensions.width}×${dimensions.height}px`
      };
    }
    
    // Add warnings for suboptimal dimensions
    const aspectRatio = dimensions.width / dimensions.height;
    if (aspectRatio < 0.5 || aspectRatio > 3) {
      warnings.push('Image has an unusual aspect ratio. Consider using a more balanced width-to-height ratio.');
    }
    
    // Warning for very large files that could benefit from compression
    if (file.size > 1024 * 1024) { // 1MB
      warnings.push('Image is quite large. Consider compressing it for better loading performance.');
    }
    
  } catch (error) {
    return {
      isValid: false,
      error: 'Failed to read image file. Please ensure it\'s a valid image.'
    };
  }
  
  return {
    isValid: true,
    warnings: warnings.length > 0 ? warnings : undefined
  };
};

/**
 * Compress image using canvas
 */
export const compressImage = async (file: File, config: ImageValidationConfig): Promise<OptimizedImage> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      
      // Calculate new dimensions if image is too large
      let newWidth = width;
      let newHeight = height;
      
      if (width > config.maxWidth || height > config.maxHeight) {
        const ratio = Math.min(config.maxWidth / width, config.maxHeight / height);
        newWidth = Math.floor(width * ratio);
        newHeight = Math.floor(height * ratio);
      }
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);
      
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          
          if (!blob) {
            reject(new Error('Failed to compress image'));
            return;
          }
          
          // Create new file with compressed data
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          });
          
          resolve({
            file: compressedFile,
            originalSize: file.size,
            compressedSize: blob.size,
            compressionRatio: Math.round((1 - blob.size / file.size) * 100),
            dimensions: { width: newWidth, height: newHeight }
          });
        },
        file.type,
        config.compressionQuality
      );
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for compression'));
    };
    
    img.src = url;
  });
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Convert image to WebP format for better compression (if supported)
 */
export const convertToWebP = async (file: File, quality: number = 0.85): Promise<File | null> => {
  return new Promise((resolve) => {
    // Check if browser supports WebP
    const canvas = document.createElement('canvas');
    const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    if (!webpSupported) {
      resolve(null);
      return;
    }
    
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          
          if (!blob) {
            resolve(null);
            return;
          }
          
          // Only use WebP if it's smaller than original
          if (blob.size < file.size) {
            const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
              type: 'image/webp',
              lastModified: Date.now()
            });
            resolve(webpFile);
          } else {
            resolve(null);
          }
        },
        'image/webp',
        quality
      );
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    
    img.src = url;
  });
};

/**
 * Process image with validation and optimization
 */
export const processImage = async (
  file: File, 
  configType: keyof typeof IMAGE_CONFIGS = 'general',
  options: { 
    autoCompress?: boolean;
    convertToWebP?: boolean;
  } = {}
): Promise<{
  success: boolean;
  file?: File;
  originalFile: File;
  validation: ValidationResult;
  optimization?: OptimizedImage;
  error?: string;
}> => {
  const config = IMAGE_CONFIGS[configType];
  const { autoCompress = true, convertToWebP = false } = options;
  
  try {
    // First, validate the original image
    const validation = await validateImage(file, config);
    
    if (!validation.isValid) {
      return {
        success: false,
        originalFile: file,
        validation,
        error: validation.error
      };
    }
    
    let processedFile = file;
    let optimization: OptimizedImage | undefined;
    
    // Auto-compress if enabled and file is large
    if (autoCompress && (file.size > 500 * 1024 || validation.warnings?.some(w => w.includes('large')))) {
      try {
        optimization = await compressImage(file, config);
        processedFile = optimization.file;
      } catch (compressionError) {
        console.warn('Image compression failed:', compressionError);
        // Continue with original file if compression fails
      }
    }
    
    // Convert to WebP if requested and beneficial
    if (convertToWebP && file.type !== 'image/webp') {
      try {
        const webpFile = await convertToWebP(processedFile);
        if (webpFile) {
          processedFile = webpFile;
        }
      } catch (webpError) {
        console.warn('WebP conversion failed:', webpError);
        // Continue with current processed file
      }
    }
    
    return {
      success: true,
      file: processedFile,
      originalFile: file,
      validation,
      optimization
    };
    
  } catch (error) {
    return {
      success: false,
      originalFile: file,
      validation: { isValid: false },
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};