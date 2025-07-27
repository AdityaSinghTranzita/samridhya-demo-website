// Performance monitoring utilities

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config: any) => void;
  }
}

// Extend PerformanceEntry for FID
interface PerformanceEntryWithProcessingStart extends PerformanceEntry {
  processingStart?: number;
}

// Extend PerformanceEntry for CLS
interface PerformanceEntryWithLayoutShift extends PerformanceEntry {
  hadRecentInput?: boolean;
  value?: number;
}

export const measurePerformance = () => {
  if (typeof window === 'undefined') return;

  // Measure LCP
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
    
    // Send to analytics if needed
    if (window.gtag) {
      window.gtag('event', 'LCP', {
        value: Math.round(lastEntry.startTime),
        event_category: 'Web Vitals',
        event_label: 'LCP'
      });
    }
  });
  
  observer.observe({ entryTypes: ['largest-contentful-paint'] });

  // Measure FID
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      const fidEntry = entry as PerformanceEntryWithProcessingStart;
      if (fidEntry.processingStart) {
        const fid = fidEntry.processingStart - fidEntry.startTime;
        console.log('FID:', fid);
        
        if (window.gtag) {
          window.gtag('event', 'FID', {
            value: Math.round(fid),
            event_category: 'Web Vitals',
            event_label: 'FID'
          });
        }
      }
    });
  });
  
  fidObserver.observe({ entryTypes: ['first-input'] });

  // Measure CLS
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const clsEntry = entry as PerformanceEntryWithLayoutShift;
      if (!clsEntry.hadRecentInput && clsEntry.value) {
        clsValue += clsEntry.value;
      }
    }
    console.log('CLS:', clsValue);
    
    if (window.gtag) {
      window.gtag('event', 'CLS', {
        value: Math.round(clsValue * 1000) / 1000,
        event_category: 'Web Vitals',
        event_label: 'CLS'
      });
    }
  });
  
  clsObserver.observe({ entryTypes: ['layout-shift'] });

  // Measure TTFB
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigationEntry) {
    const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    console.log('TTFB:', ttfb);
    
    if (window.gtag) {
      window.gtag('event', 'TTFB', {
        value: Math.round(ttfb),
        event_category: 'Web Vitals',
        event_label: 'TTFB'
      });
    }
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  const criticalImages = [
    'https://framerusercontent.com/images/kvNaGEJ2iLiDZTVtaiNCqdyUZM.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimize images
export const optimizeImages = () => {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.loading) {
      img.loading = 'lazy';
    }
    
    // Add error handling
    img.onerror = () => {
      img.style.display = 'none';
    };
  });
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Wait for page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      measurePerformance();
      preloadCriticalResources();
      optimizeImages();
    });
  } else {
    measurePerformance();
    preloadCriticalResources();
    optimizeImages();
  }
}; 