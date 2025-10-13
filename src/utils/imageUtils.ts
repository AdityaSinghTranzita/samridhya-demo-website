// Image loading utilities and debugging helpers

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

export const checkImageExists = async (src: string): Promise<boolean> => {
  try {
    await preloadImage(src);
    return true;
  } catch (error) {
    console.warn(`Image not found: ${src}`, error);
    return false;
  }
};

export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => reject(new Error(`Failed to get dimensions for: ${src}`));
    img.src = src;
  });
};

// Debug function to log image loading issues
export const debugImageLoading = (src: string) => {
  console.log(`Attempting to load image: ${src}`);
  
  const img = new Image();
  img.onload = () => {
    console.log(`✅ Image loaded successfully: ${src}`, {
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  };
  img.onerror = (error) => {
    console.error(`❌ Failed to load image: ${src}`, error);
  };
  img.src = src;
};

// Fallback image URLs for common scenarios
export const FALLBACK_IMAGES = {
  hero: '/images/Samridhya_Hero.webp',
  logo: '/samridhya-preview.webp',
  placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBsb2FkaW5nLi4uPC90ZXh0Pgo8L3N2Zz4K'
};
