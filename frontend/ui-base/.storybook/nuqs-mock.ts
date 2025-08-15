// Mock nuqs for Storybook
import { useState, useCallback } from 'react';

// Mock implementation of useQueryState
export const useQueryState = (key: string, options?: { defaultValue?: string }) => {
  const [value, setValue] = useState(options?.defaultValue || '');
  
  const updateValue = useCallback(async (newValue: string | null) => {
    setValue(newValue || options?.defaultValue || '');
    // Simulate URL update in browser
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newValue) {
        url.searchParams.set(key, newValue);
      } else {
        url.searchParams.delete(key);
      }
      window.history.replaceState({}, '', url);
    }
  }, [key, options?.defaultValue]);

  return [value, updateValue] as const;
};

// Mock other nuqs exports if needed
export const useQueryStates = () => {
  console.warn('useQueryStates is mocked in Storybook');
  return [{}, () => {}] as const;
};