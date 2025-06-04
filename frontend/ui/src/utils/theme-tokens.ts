import type { DesignTokens, AccentColor, GrayColor, DashboardColors } from '../types/theme';

export const DESIGN_TOKENS: DesignTokens = {
  iconSizes: {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px'
  },
  
  typography: {
    xs: { fontSize: '12px', lineHeight: '16px' },
    sm: { fontSize: '14px', lineHeight: '20px' },
    base: { fontSize: '16px', lineHeight: '24px' },
    lg: { fontSize: '18px', lineHeight: '28px' },
    xl: { fontSize: '20px', lineHeight: '28px' },
    '2xl': { fontSize: '24px', lineHeight: '32px' },
    '3xl': { fontSize: '30px', lineHeight: '36px' },
    '4xl': { fontSize: '36px', lineHeight: '40px' }
  },
  
  spacing: {
    '0': '0px',
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px',
    '16': '64px',
    '20': '80px',
    '24': '96px'
  },
  
  borderRadius: {
    none: '0px',
    small: '4px',
    medium: '6px',
    large: '8px',
    full: '9999px'
  },
  
  scaling: {
    '90%': '0.9',
    '95%': '0.95',
    '100%': '1',
    '105%': '1.05',
    '110%': '1.1'
  }
};

export const THEME_CONFIG = {
  accentColors: [
    'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet',
    'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass',
    'bronze', 'gold', 'brown', 'orange', 'amber', 'yellow', 'lime', 'mint', 'sky'
  ] as const,
  
  grayColors: [
    'gray', 'mauve', 'slate', 'sage', 'olive', 'sand'
  ] as const,
  
  dashboardColors: {
    multiColor: ['blue', 'green', 'yellow', 'red', 'purple', 'orange'] as AccentColor[],
    monochrome1: ['gray', 'slate', 'mauve'] as GrayColor[],
    monochrome2: ['sage', 'olive', 'sand'] as GrayColor[]
  } as const
} as const;