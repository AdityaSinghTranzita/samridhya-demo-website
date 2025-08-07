import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, signInWithGoogle, signOutUser, isAllowedDomain, SignInResult } from '@/firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      // Additional domain check when auth state changes
      if (user && user.email && !isAllowedDomain(user.email)) {
        // If user somehow gets authenticated but doesn't have allowed domain, sign them out
        signOutUser();
        setError('Access denied. Only users with @samridhya.com or @tranzita.com email addresses can access this CMS.');
        setUser(null);
      } else {
        setUser(user);
        setError(null); // Clear any previous errors when successfully authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      setError(null); // Clear any previous errors
      setLoading(true);
      const result: SignInResult = await signInWithGoogle();
      
      if (!result.success) {
        setError(result.error || 'An error occurred during sign in');
        setLoading(false);
        return; // Don't throw error, just set error state
      }
      
      // Success case is handled by onAuthStateChange listener
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during sign in');
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null); // Clear any errors
      await signOutUser();
    } catch (error) {
      console.error('Sign out error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during sign out');
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 