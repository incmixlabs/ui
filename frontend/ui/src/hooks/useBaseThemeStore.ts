import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const RADIX_ACCENT_COLORS = [
  'tomato','red','ruby','crimson','pink','plum','purple','violet','iris',
  'indigo','blue','cyan','teal','jade','green','grass','lime','yellow',
  'amber','orange','brown','sky','mint',
] as const;

export const RADIX_GRAY_COLORS = [
  'gray','mauve','slate','sage','olive','sand',
] as const;

export const RADIX_RADIUS  = ['none','small','medium','large','full'] as const;
// export const PANEL_BACKGROUND_OPTIONS = ['solid','translucent','none'] as const;
export const SCALING_OPTIONS = ['90%','95%','100%','105%','110%'] as const;


export type ThemeConfig = {
  appearance : 'light' | 'dark';
  accentColor: typeof RADIX_ACCENT_COLORS[number];
  grayColor  : typeof RADIX_GRAY_COLORS[number];
  radius     : typeof RADIX_RADIUS[number];
  scaling    : typeof SCALING_OPTIONS[number];
  // panelBackground     : typeof PANEL_BACKGROUND_OPTIONS[number];

  /* brand-specific extensions */
  sidebarBg          : string;
  secondarySidebarBg : string;
  mainBackground     : string;

  /* dashboard spec → 1 gradient + 2 mono */
  dashboardMulti : string;  // gradient
  dashboardMono1 : string;  // solid mono
  dashboardMono2 : string;  // solid mono
};

export const defaultTheme: ThemeConfig = {
  appearance : 'light',
  accentColor: 'blue',
  grayColor  : 'gray',
  radius     : 'medium',
  scaling    : '100%',
  // panelBackground: 'solid',

  sidebarBg         : 'var(--gray-1)',
  secondarySidebarBg: 'var(--gray-2)',
  mainBackground    : 'var(--gray-1)',

  dashboardMulti: 'linear-gradient(to right, var(--blue-9) , var(--indigo-9))',
  dashboardMono1: 'var(--blue-9)',
  dashboardMono2: 'var(--gray-9)',
};

export const useBaseThemeStore = create<
  ThemeConfig & {
    setTheme: (partial: Partial<ThemeConfig>) => void;
    toggleTheme: () => void;
  }
>()(
  persist(
    (set, get) => ({
      ...defaultTheme,
      setTheme: (partial) => set((s) => ({ ...s, ...partial })),
      toggleTheme: () =>
        set({
          appearance: get().appearance === 'dark' ? 'light' : 'dark',
        }),
    }),
    { name: 'radix-theme-store' }
  )
);
