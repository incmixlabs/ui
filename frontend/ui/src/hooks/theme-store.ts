import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeState } from '../types/theme';

interface ThemeStore extends ThemeState {
  updateTheme: (updates: Partial<ThemeState>) => void;
  resetTheme: () => void;
}

const DEFAULT_THEME: ThemeState = {
  accentColor: 'indigo',
  grayColor: 'slate',
  borderRadius: 'large',
  scaling: '100%',
  appearance: 'light',
  sidebar: {
    background: 'gray',
    variant: 'soft'
  },
  secondarySidebar: {
    background: 'slate',
    variant: 'ghost'
  },
  mainBackground: 'white',
  dashboard: {
    multiColor: 'blue',
    monochrome1: 'gray',
    monochrome2: 'slate'
  }
};

export const useBaseThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      ...DEFAULT_THEME,
      updateTheme: (updates) => set((state) => ({ ...state, ...updates })),
      resetTheme: () => set(DEFAULT_THEME),
    }),
    {
      name: 'theme-storage',
    }
  )
);