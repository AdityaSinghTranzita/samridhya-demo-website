import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth } from './config';

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
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
