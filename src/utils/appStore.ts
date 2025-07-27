export const getAppStoreLink = () => {
  if (typeof window === 'undefined') {
    return "https://play.google.com/store/apps/details?id=com.samridhya.app"; // Default for SSR
  }
  
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  
  if (isIOS) {
    return "https://apps.apple.com/in/app/samridhya/id6745554387"; // App Store link with country code
  } else if (isAndroid) {
    return "https://play.google.com/store/apps/details?id=samridh.consumer"; // Play Store link
  } else {
    return "https://play.google.com/store/apps/details?id=samridh.consumer"; // Default to Play Store
  }
};

export const handleAppDownload = () => {
  const link = getAppStoreLink();
  
  // For mobile devices, try to open in the same window first
  if (typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/.test(navigator.userAgent)) {
    // Try to open in the same window for better mobile experience
    window.location.href = link;
  } else {
    // For desktop, open in new tab
    window.open(link, '_blank');
  }
}; 