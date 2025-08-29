'use client';

import { useEffect, useState } from 'react';

interface PageLoaderProps {
  children: React.ReactNode;
}

export default function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isCssLoaded, setIsCssLoaded] = useState(false);

  useEffect(() => {
    // Check if CSS is loaded by testing a CSS property
    const checkCssLoaded = () => {
      const testElement = document.createElement('div');
      testElement.style.position = 'absolute';
      testElement.style.visibility = 'hidden';
      testElement.style.height = '0';
      testElement.style.width = '0';
      testElement.style.overflow = 'hidden';
      
      // Test if Tailwind CSS classes are available
      testElement.className = 'bg-blue-500 text-white p-4 rounded-lg';
      document.body.appendChild(testElement);
      
      const computedStyle = window.getComputedStyle(testElement);
      const hasTailwind = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' || 
                         computedStyle.padding !== '0px' ||
                         computedStyle.borderRadius !== '0px';
      
      document.body.removeChild(testElement);
      return hasTailwind;
    };

    // Check CSS loading status
    const checkCssStatus = () => {
      if (checkCssLoaded()) {
        setIsCssLoaded(true);
      } else {
        // Retry after a short delay
        setTimeout(checkCssStatus, 100);
      }
    };

    // Start checking CSS
    checkCssStatus();

    // Also wait for the page to be fully loaded
    const handleLoad = () => {
      // Add a small delay to ensure everything is rendered
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Show loader until both CSS is loaded and page is ready
  if (isLoading || !isCssLoaded) {
    return (
      <div className="page-loader">
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            border: '2px solid #e5e7eb',
            borderTop: '2px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem auto'
          }}></div>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1rem',
            margin: 0
          }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
