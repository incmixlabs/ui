export type AccentColor = 
  | 'tomato' | 'red' | 'ruby' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet'
  | 'iris' | 'indigo' | 'blue' | 'cyan' | 'teal' | 'jade' | 'green' | 'grass'
  | 'bronze' | 'gold' | 'brown' | 'orange' | 'amber' | 'yellow' | 'lime' | 'mint' | 'sky';

export type GrayColor = 'gray' | 'mauve' | 'slate' | 'sage' | 'olive' | 'sand';

export type BorderRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export type Scaling = '90%' | '95%' | '100%' | '105%' | '110%';

export type Appearance = 'light' | 'dark';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type TypographyVariant = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export type TypographyColor = 'default' | 'accent' | 'muted' | 'error' | 'success' | 'warning';

export type CardVariant = 'default' | 'sidebar' | 'secondary-sidebar' | 'dashboard';

export type SidebarVariant = 'solid' | 'soft' | 'ghost';

export interface DesignTokens {
  iconSizes: Record<IconSize, string>;
  typography: Record<TypographyVariant, { fontSize: string; lineHeight: string }>;
  spacing: Record<string, string>;
  borderRadius: Record<BorderRadius, string>;
  scaling: Record<Scaling, string>;
}

export interface SidebarTheme {
  background: GrayColor;
  variant: SidebarVariant;
}

export interface DashboardColors {
  multiColor: AccentColor;
  monochrome1: GrayColor;
  monochrome2: GrayColor;
}

export interface ThemeState {
  accentColor: AccentColor;
  grayColor: GrayColor;
  borderRadius: BorderRadius;
  scaling: Scaling;
  appearance: Appearance;
  sidebar: SidebarTheme;
  secondarySidebar: SidebarTheme;
  mainBackground: string;
  dashboard: DashboardColors;
}

export interface ThemeContextValue {
  theme: ThemeState;
  updateTheme: (updates: Partial<ThemeState>) => void;
  tokens: DesignTokens;
  cssVariables: Record<string, string>;
}