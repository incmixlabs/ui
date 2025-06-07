import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeConfig } from "@incmix/utils/types";

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


export const defaultTheme: ThemeConfig = {
  appearance: "light",
  accentColor: "blue",
  secondaryColor: "cyan",
  grayColor: "gray",
  radius: "medium",
  scaling: "100%",
  pastel: true,
  pastelShade: 6,
  brightShade: 9,
  lightFontColor: "var(--gray-12)", // for light mode
  darkFontColor: "var(--gray-1)",
  avatarRadius: "full",
  workspaceRadius: "medium",
  orgRadius: "none",
  info: "blue",
  danger: "red",
  success: "green",
  warning: "orange",
  info1: "pink",
  info2: "yellow",
  info3: "lime",
  info4: "cyan",
  // for dark mode
  // customColor
  sidebarBg: "var(--gray-3)",
  default: 0, // Added to satisfy ThemeConfig type
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
