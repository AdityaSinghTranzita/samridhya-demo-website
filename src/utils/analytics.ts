// Google Analytics 4 (GA4) Integration
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
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
  window.gtag('js', new Date());
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

// Track custom events with enhanced parameters
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_title: document.title,
    });
  }
};

// Enhanced button click tracking
export const trackButtonClick = (
  buttonName: string, 
  location: string = 'unknown',
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: location,
    event_category: 'engagement',
    event_label: `${buttonName}_${location}`,
    ...additionalParams,
  });
};

// Enhanced app download tracking
export const trackAppDownload = (
  platform: 'ios' | 'android' | 'web',
  source: string = 'unknown',
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('app_download', {
    platform: platform,
    download_source: source,
    event_category: 'conversion',
    event_label: `app_download_${platform}_${source}`,
    value: 1,
    ...additionalParams,
  });
};

// Enhanced loan application tracking
export const trackLoanApplication = (
  loanType: string, 
  amount?: number,
  source: string = 'unknown',
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('loan_application', {
    loan_type: loanType,
    loan_amount: amount,
    application_source: source,
    event_category: 'conversion',
    event_label: `loan_application_${loanType}_${source}`,
    value: amount || 0,
    ...additionalParams,
  });
};

// Enhanced credit score check tracking
export const trackCreditScoreCheck = (
  source: string = 'unknown',
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('credit_score_check', {
    check_source: source,
    event_category: 'engagement',
    event_label: `credit_score_check_${source}`,
    value: 1,
    ...additionalParams,
  });
};

// Track loan page visits
export const trackLoanPageVisit = (
  loanType: string,
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('loan_page_visit', {
    loan_type: loanType,
    event_category: 'engagement',
    event_label: `loan_page_visit_${loanType}`,
    ...additionalParams,
  });
};

// Track calculator usage
export const trackCalculatorUsage = (
  calculatorType: 'emi' | 'credit_score' | 'auto_loan' | 'personal_loan' | 'future_value' | 'sip' | 'compound_interest' | 'simple_interest' | 'gst',
  parameters: Record<string, any> = {},
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('calculator_usage', {
    calculator_type: calculatorType,
    calculation_parameters: parameters,
    event_category: 'engagement',
    event_label: `calculator_usage_${calculatorType}`,
    ...additionalParams,
  });
};

// Track form submissions
export const trackFormSubmission = (
  formType: string,
  formData: Record<string, any> = {},
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('form_submission', {
    form_type: formType,
    form_data: formData,
    event_category: 'conversion',
    event_label: `form_submission_${formType}`,
    value: 1,
    ...additionalParams,
  });
};

// Track social media clicks
export const trackSocialMediaClick = (
  platform: string,
  source: string = 'unknown',
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('social_media_click', {
    platform: platform,
    click_source: source,
    event_category: 'engagement',
    event_label: `social_media_click_${platform}_${source}`,
    ...additionalParams,
  });
};

// Track partner clicks
export const trackPartnerClick = (
  partnerName: string,
  partnerType: string,
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('partner_click', {
    partner_name: partnerName,
    partner_type: partnerType,
    event_category: 'engagement',
    event_label: `partner_click_${partnerName}`,
    ...additionalParams,
  });
};

// Track navigation events
export const trackNavigation = (
  navigationType: string,
  destination: string,
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('navigation', {
    navigation_type: navigationType,
    destination: destination,
    event_category: 'engagement',
    event_label: `navigation_${navigationType}_${destination}`,
    ...additionalParams,
  });
};

// Track user engagement
export const trackUserEngagement = (
  engagementType: string,
  duration?: number,
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('user_engagement', {
    engagement_type: engagementType,
    engagement_duration: duration,
    event_category: 'engagement',
    event_label: `user_engagement_${engagementType}`,
    value: duration || 0,
    ...additionalParams,
  });
};

// Track error events
export const trackError = (
  errorType: string,
  errorMessage: string,
  additionalParams: Record<string, any> = {}
) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    event_category: 'error',
    event_label: `error_${errorType}`,
    ...additionalParams,
  });
}; 