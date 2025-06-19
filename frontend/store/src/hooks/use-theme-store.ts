import { create } from "zustand";
import { persist } from "zustand/middleware";
import  { type ThemeConfig, type BreakFontColor, breakFontColor as defaultFontColor, type RadixAnyColor, fontColor } from "@incmix/utils/types";

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
  breakFontColor: defaultFontColor
};

export type TextColor = {
  color: RadixAnyColor;
  pastel: boolean;
  breakFontColor: BreakFontColor;
  brightShade?: number;
  pastelShade?: number;
}
export function getTextColor({color, pastel, brightShade = 9, breakFontColor = defaultFontColor}: TextColor): string {
  if (pastel) {
    return fontColor.light;
  }
  // @ts-ignore
  if (breakFontColor?.[color]  === undefined) {
    return fontColor.dark;
  }
  // @ts-ignore
  const shade = breakFontColor[color] ?? breakFontColor.default;
  return (shade < brightShade) ? fontColor.light : fontColor.dark;
}
export const useBaseThemeStore = create<
  ThemeConfig & {
    setTheme: (partial: Partial<ThemeConfig>) => void;
    toggleTheme: () => void;
    getDashboardColors: () => {
      color1: string;
      text1: string;
      color2: string;
      text2: string;
      text3: string;
      text4: string;
      color3: string;
      color4: string;
    };
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
      getDashboardColors: () => {
        const { pastel = true, pastelShade, brightShade, info1, info2, info3, info4,  breakFontColor } = get();
        const dash = pastel ? {
          color1: `var(--${info1}-${pastelShade})`,
          text1:  getTextColor({color: info1, pastel, breakFontColor, brightShade, pastelShade}),
          color2: `var(--${info2}-${pastelShade})`,
          text2:  getTextColor({color: info2, pastel, breakFontColor, brightShade, pastelShade}),
          text3:  getTextColor({color: info3, pastel, breakFontColor, brightShade, pastelShade}),
          text4:  getTextColor({color: info4, pastel, breakFontColor, brightShade, pastelShade}),
          color3: `var(--${info3}-${pastelShade})`,
          color4: `var(--${info4}-${pastelShade})`
        }: {
          color1: `var(--${info1}-${brightShade})`,
          text1:  getTextColor({color: info1, pastel, breakFontColor, brightShade, pastelShade}),
          color2: `var(--${info2}-${brightShade})`,
          text2:  getTextColor({color: info2, pastel, breakFontColor, brightShade, pastelShade}),
          text3:  getTextColor({color: info3, pastel, breakFontColor, brightShade, pastelShade}),
          text4:  getTextColor({color: info4, pastel, breakFontColor, brightShade, pastelShade}),
          color3: `var(--${info3}-${brightShade})`,
          color4: `var(--${info4}-${brightShade})`
        }
        return dash;
      },
      getIndicatorColors: (pastel = false) => {
        const { pastelShade, brightShade, danger, success, warning, info,  breakFontColor } = get();
        const colors = pastel ? {
          danger: `var(--${danger}-${pastelShade})`,
          dangerText:  getTextColor({color: danger, pastel, breakFontColor, brightShade, pastelShade}),
          warning: `var(--${warning}-${pastelShade})`,
          warningText:  getTextColor({color: warning, pastel, breakFontColor, brightShade, pastelShade}),
          success:  `var(--${success}-${pastelShade})`,
          successText:  getTextColor({color: success, pastel, breakFontColor, brightShade, pastelShade}),
          info: `var(--${info}-${pastelShade})`,
          infoText:  getTextColor({color: info, pastel, breakFontColor, brightShade, pastelShade}),
        }: {
          danger: `var(--${danger}-${brightShade})`,
          dangerText:  getTextColor({color: danger, pastel, breakFontColor, brightShade, pastelShade}),
          warning: `var(--${warning}-${brightShade})`,
          warningText:  getTextColor({color: warning, pastel, breakFontColor, brightShade, pastelShade}),
          success:  `var(--${success}-${brightShade})`,
          successText:  getTextColor({color: success, pastel, breakFontColor, brightShade, pastelShade}),
          info: `var(--${info}-${brightShade})`,
          infoText:  getTextColor({color: info, pastel, breakFontColor, brightShade, pastelShade}),
        }
        return colors;
      }
    }),
    { name: "radix-theme-store" },
  ),
);
