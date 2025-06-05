import { create } from "zustand";
import { persist } from "zustand/middleware";

export const RADIX_ACCENT_COLORS = [
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "yellow",
  "amber",
  "orange",
  "brown",
  "sky",
  "mint",
] as const;

export const RADIX_GRAY_COLORS = [
  "gray",
  "mauve",
  "slate",
  "sage",
  "olive",
  "sand",
] as const;

export const RADIX_RADIUS = [
  "none",
  "small",
  "medium",
  "large",
  "full",
] as const;
// export const PANEL_BACKGROUND_OPTIONS = ['solid','translucent','none'] as const;
export const SCALING_OPTIONS = ["90%", "95%", "100%", "105%", "110%"] as const;

// export const SIDEBAR_BG_OPTIONS = [
//   'var(--gray-1)',
//   'var(--slate-1)',
//   'var(--mauve-1)',
//   'var(--indigo-1)',
//   'var(--iris-1)',
//   'var(--blue-1)',
//   'var(--violet-1)',
//   'var(--purple-1)',
//   'var(--gray-2)',
//   'var(--slate-2)',
// ]

// export const SIDEBAR_FOREGROUND_OPTIONS = [
//   'var(--gray-12)',
//   'var(--slate-12)',
//   'var(--blue-12)',
//   'var(--iris-12)',
//   'var(--violet-12)',
//   'var(--purple-12)',
// ]

export const SIDEBAR_COLOR_OPTIONS = [
  { bg: "var(--gray-3)", fg: "var(--gray-12)", hover: "var(--gray-1)" },
  { bg: "var(--red-9)", fg: "var(--red-12)", hover: "var(--red-11)" },
  { bg: "var(--mauve-10)", fg: "var(--mauve-12)", hover: "var(--mauve-11)" },
  { bg: "var(--blue-10)", fg: "var(--blue-12)", hover: "var(--blue-11)" },
  { bg: "var(--violet-10)", fg: "var(--violet-12)", hover: "var(--violet-11)" },
  { bg: "var(--purple-10)", fg: "var(--purple-12)", hover: "var(--purple-11)" },
  { bg: "var(--indigo-10)", fg: "var(--indigo-12)", hover: "var(--indigo-11)" },
  { bg: "var(--orange-10)", fg: "var(--orange-12)", hover: "var(--orange-11)" },
];

export type ThemeConfig = {
  appearance: "light" | "dark";
  accentColor: (typeof RADIX_ACCENT_COLORS)[number];
  grayColor: (typeof RADIX_GRAY_COLORS)[number];
  radius: (typeof RADIX_RADIUS)[number];
  scaling: (typeof SCALING_OPTIONS)[number];

  /* brand-specific extensions */
  sidebarBg: string;
  sidebarForground: string;
  sidebarHover: string;

  /* dashboard spec → 1 gradient + 2 mono */
  dashboardMono1: string; // solid mono
  dashboardMono2: string; // solid mono
  dashboardMono3: string; // solid mono
};

export const defaultTheme: ThemeConfig = {
  appearance: "light",
  accentColor: "blue",
  grayColor: "gray",
  radius: "medium",
  scaling: "100%",

  // customColor
  sidebarBg: "var(--gray-3)",
  sidebarForground: "var(--gray-12)",
  sidebarHover: "var(--gray-5)",

  dashboardMono1: "var(--blue-9)",
  dashboardMono2: "var(--gray-9)",
  dashboardMono3: "var(--gray-2)",
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
          appearance: get().appearance === "dark" ? "light" : "dark",
        }),
    }),
    { name: "radix-theme-store" },
  ),
);
