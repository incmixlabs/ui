import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { ThemeState, ThemeContextValue } from '../types/theme';
import { DESIGN_TOKENS } from '../utils/theme-tokens';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Partial<ThemeState>;
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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = {} 
}) => {
  const [theme, setTheme] = useState<ThemeState>({
    ...DEFAULT_THEME,
    ...initialTheme
  });

  const updateTheme = (updates: Partial<ThemeState>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const cssVariables = useMemo(() => ({
    '--theme-accent': `var(--${theme.accentColor}-9)`,
    '--theme-accent-light': `var(--${theme.accentColor}-3)`,
    '--theme-accent-dark': `var(--${theme.accentColor}-11)`,
    '--theme-gray': `var(--${theme.grayColor}-6)`,
    '--theme-gray-light': `var(--${theme.grayColor}-3)`,
    '--theme-gray-dark': `var(--${theme.grayColor}-9)`,
    '--theme-border-radius': DESIGN_TOKENS.borderRadius[theme.borderRadius],
    '--theme-scaling': DESIGN_TOKENS.scaling[theme.scaling],
    '--theme-sidebar-bg': `var(--${theme.sidebar.background}-2)`,
    '--theme-sidebar-border': `var(--${theme.sidebar.background}-6)`,
    '--theme-secondary-sidebar-bg': `var(--${theme.secondarySidebar.background}-2)`,
    '--theme-secondary-sidebar-border': `var(--${theme.secondarySidebar.background}-6)`,
    '--theme-main-bg': theme.mainBackground === 'white' ? '#ffffff' : `var(--${theme.mainBackground}-1)`,
    '--theme-dashboard-multi': `var(--${theme.dashboard.multiColor}-9)`,
    '--theme-dashboard-mono1': `var(--${theme.dashboard.monochrome1}-9)`,
    '--theme-dashboard-mono2': `var(--${theme.dashboard.monochrome2}-9)`
  }), [theme]);

  const contextValue: ThemeContextValue = {
    theme,
    updateTheme,
    tokens: DESIGN_TOKENS,
    cssVariables
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div 
        style={cssVariables}
        data-accent-color={theme.accentColor}
        data-gray-color={theme.grayColor}
        data-radius={theme.borderRadius}
        data-scaling={theme.scaling}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};