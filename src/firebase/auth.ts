import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth } from './config';

// Check if Firebase auth is properly initialized
const isAuthAvailable = () => {
  try {
    return auth && typeof auth.onAuthStateChanged === 'function';
  } catch (error) {
    console.error('Firebase auth not available:', error);
    return false;
  }
};

const googleProvider = new GoogleAuthProvider();

// Allowed email domains for CMS access
const ALLOWED_DOMAINS = ['samridhya.com', 'tranzita.com'];

// Check if email domain is allowed
export const isAllowedDomain = (email: string): boolean => {
  if (!email) return false;
  
  const domain = email.split('@')[1]?.toLowerCase();
  return ALLOWED_DOMAINS.includes(domain);
};

// Sign in result type
export interface SignInResult {
  success: boolean;
  user?: User;
  error?: string;
}

// Sign in with Google with domain restriction
export const signInWithGoogle = async (): Promise<SignInResult> => {
  try {
    if (!isAuthAvailable()) {
      return {
        success: false,
        error: 'Firebase authentication is not available. Please check your configuration.'
      };
    }

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user's email domain is allowed
    if (!user.email || !isAllowedDomain(user.email)) {
      // Sign out the user immediately if domain is not allowed
      await signOut(auth);
      return {
        success: false,
        error: `Access denied. Only users with @samridhya.com or @tranzita.com email addresses can access this CMS.`
      };
    }
    
    return {
      success: true,
      user
    };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during sign in'
    };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    if (!isAuthAvailable()) {
      console.warn('Firebase auth not available for sign out');
      return;
    }
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  try {
    if (!isAuthAvailable()) {
      return null;
    }
    return auth.currentUser;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  try {
    if (!isAuthAvailable()) {
      console.warn('Firebase auth not available for auth state change listener');
      // Return a dummy unsubscribe function
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  } catch (error) {
    console.error('Error setting up auth state change listener:', error);
    // Return a dummy unsubscribe function
    return () => {};
  }
};
