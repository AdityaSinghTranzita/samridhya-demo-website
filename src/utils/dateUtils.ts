/**
 * Utility functions for safe date handling
 */

// Define Firestore timestamp interface
interface FirestoreTimestamp {
  toDate(): Date;
  _seconds?: number;
  seconds?: number;
}

export type DateValue = Date | string | null | undefined | FirestoreTimestamp;

/**
 * Safely converts any date value to an ISO string
 * @param dateValue - The date value to convert (Date, string, null, or undefined)
 * @returns ISO string or undefined if conversion fails
 */
export function toISOString(dateValue: DateValue): string | undefined {
  if (!dateValue) return undefined;
  
  if (dateValue instanceof Date) {
    return dateValue.toISOString();
  }
  
  if (typeof dateValue === 'string') {
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? undefined : date.toISOString();
  }
  
  // Handle Firestore timestamp objects
  if (typeof dateValue === 'object' && dateValue !== null) {
    if ('toDate' in dateValue && typeof dateValue.toDate === 'function') {
      return dateValue.toDate().toISOString();
    }
    if ('_seconds' in dateValue && typeof dateValue._seconds === 'number') {
      return new Date(dateValue._seconds * 1000).toISOString();
    }
    if ('seconds' in dateValue && typeof dateValue.seconds === 'number') {
      return new Date(dateValue.seconds * 1000).toISOString();
    }
  }
  
  return undefined;
}

/**
 * Safely converts any date value to a Date object
 * @param dateValue - The date value to convert
 * @returns Date object or undefined if conversion fails
 */
export function toDate(dateValue: DateValue): Date | undefined {
  if (!dateValue) return undefined;
  
  if (dateValue instanceof Date) {
    return dateValue;
  }
  
  if (typeof dateValue === 'string') {
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? undefined : date;
  }
  
  // Handle Firestore timestamp objects
  if (typeof dateValue === 'object' && dateValue !== null) {
    if ('toDate' in dateValue && typeof dateValue.toDate === 'function') {
      return dateValue.toDate();
    }
    if ('_seconds' in dateValue && typeof dateValue._seconds === 'number') {
      return new Date(dateValue._seconds * 1000);
    }
    if ('seconds' in dateValue && typeof dateValue.seconds === 'number') {
      return new Date(dateValue.seconds * 1000);
    }
  }
  
  return undefined;
}

/**
 * Formats a date value for display
 * @param dateValue - The date value to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string or empty string if conversion fails
 */
export function formatDate(
  dateValue: DateValue, 
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
): string {
  const date = toDate(dateValue);
  if (!date) return '';
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Gets the relative time (e.g., "2 days ago")
 * @param dateValue - The date value to get relative time for
 * @returns Relative time string or empty string if conversion fails
 */
export function getRelativeTime(dateValue: DateValue): string {
  const date = toDate(dateValue);
  if (!date) return '';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
} 