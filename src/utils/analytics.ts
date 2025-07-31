// Google Analytics 4 (GA4) Integration
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-WWCF6GPNDF';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // Configure gtag
  window.gtag('js', GA_MEASUREMENT_ID, new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string = 'unknown') => {
  trackEvent('button_click', 'engagement', buttonName);
};

// Track app downloads
export const trackAppDownload = (platform: 'ios' | 'android' | 'web') => {
  trackEvent('app_download', 'engagement', platform);
};

// Track loan applications
export const trackLoanApplication = (loanType: string, amount?: number) => {
  trackEvent('loan_application', 'conversion', loanType, amount);
};

// Track credit score checks
export const trackCreditScoreCheck = () => {
  trackEvent('credit_score_check', 'engagement', 'credit_score');
}; 