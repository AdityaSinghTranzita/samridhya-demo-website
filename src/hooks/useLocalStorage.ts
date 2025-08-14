import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing local storage with cache awareness
 * This hook ensures local storage data persists even when cache is cleared
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Function to remove the item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key]);

  // Ensure local storage is preserved during cache clearing
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Ensure the current value is saved before page unload
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
          console.error(`Error saving localStorage key "${key}" before unload:`, error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [key, storedValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook to check if local storage is available
 */
export function useLocalStorageAvailable(): boolean {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const testKey = '__localStorage_test__';
        window.localStorage.setItem(testKey, 'test');
        window.localStorage.removeItem(testKey);
        setIsAvailable(true);
      } catch (error) {
        setIsAvailable(false);
      }
    }
  }, []);

  return isAvailable;
}

/**
 * Hook to get all local storage keys
 */
export function useLocalStorageKeys(): string[] {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allKeys: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key) {
          allKeys.push(key);
        }
      }
      setKeys(allKeys);
    }
  }, []);

  return keys;
} 