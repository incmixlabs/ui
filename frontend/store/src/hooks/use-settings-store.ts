import { useContext } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import  { type ThemeConfig, type BreakFontColor, breakFontColor as defaultFontColor, type RadixAnyColor, type RadixGrayColor, type RadixColor, type RadixRadius, type RadixScaling, fontColor } from "@incmix/utils/types";
import { ThemeContext } from "@radix-ui/themes";

export const SIDEBAR_COLOR_OPTIONS = [
  { bg: "var(--gray-3)", fg: "var(--gray-12)", hover: "var(--gray-1)", text: fontColor.light },
  { bg: "var(--red-9)", fg: "var(--red-12)", hover: "var(--red-11)" , text: fontColor.dark },
  { bg: "var(--mauve-10)", fg: "var(--mauve-12)", hover: "var(--mauve-11)" , text: fontColor.dark },
  { bg: "var(--blue-10)", fg: "var(--blue-12)", hover: "var(--blue-11)" , text: fontColor.dark },
  { bg: "var(--violet-10)", fg: "var(--violet-12)", hover: "var(--violet-11)", text: fontColor.dark },
  { bg: "var(--purple-10)", fg: "var(--purple-12)", hover: "var(--purple-11)", text: fontColor.dark },
  { bg: "var(--indigo-10)", fg: "var(--indigo-12)", hover: "var(--indigo-11)", text: fontColor.dark },
  { bg: "var(--orange-10)", fg: "var(--orange-12)", hover: "var(--orange-11)", text: fontColor.dark },
];

export const settings: ThemeConfig = {
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
  indicators: {
    info: "blue",
    danger: "red",
    success: "green",
    warning: "orange",
    default: "gray"
  },
  dashboard: {
    color1: "pink",
    color2: "yellow",
    color3: "lime",
    color4: "cyan",
  },
  // for dark mode
  // customColor
  sidebarBg: "var(--gray-3)",
  breakFontColor: defaultFontColor
};

export type TextColor = {
  color: RadixAnyColor;
  pastel?: boolean;
  breakFontColor?: BreakFontColor;
  brightShade?: number;
  pastelShade?: number;
}
export function getTextColor({color, pastel = true, brightShade = 9, breakFontColor = defaultFontColor}: TextColor): string {
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
export const useSettingsStore = create<
  ThemeConfig & {
    setTheme: (partial: Partial<ThemeConfig>) => void;
    theme: (prop: keyof ThemeConfig) => any;
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
    getIndicatorColors: (pastel?: boolean) => {
      danger: string;
      dangerText: string;
      warning: string;
      warningText: string;
      success: string;
      successText: string;
      info: string;
      infoText: string;
      default: string;
      defaultText: string;
    };
    getSidebarColor: () => {
      bg: string;
      fg: string;
      hover: string;
    };
  }
>()(
  persist(
    (set, get) => ({
      ...orgTheme,
      setTheme: (partial) => set((s) => {
        // Removed themeContext.setAccentColor as it does not exist on ThemeContextValue
        return { ...s, ...partial }
      }),
      onAccentColorChange: (color: RadixColor) =>  set((s) => {
        const themeContext = useContext(ThemeContext);
        if (themeContext) {
          themeContext.onAccentColorChange(color);
        }
        return { ...s, accentColor: color };
      }),
      onAppearanceChange: (appearance: "light" | "dark") => set((s) => {
        const themeContext = useContext(ThemeContext);
        if (themeContext) {
          themeContext.onAppearanceChange(appearance);
        }
        return { ...s, appearance };
      }),
      onGrayColorChange: (color: RadixGrayColor) => set((s) => {
        const themeContext = useContext(ThemeContext);
        if (themeContext) {
          themeContext.onGrayColorChange(color);
        }
        return { ...s, grayColor: color };
      }),
       onRadiusChange: (radius: RadixRadius) => set((s) => {
        const themeContext = useContext(ThemeContext);
        if (themeContext) {
          themeContext.onRadiusChange(radius);
        }
        return { ...s, radius };
      }),
      onScalingChange: (scaling: RadixScaling) => set((s) => {
        const themeContext = useContext(ThemeContext);
        if (themeContext) {
          themeContext.onScalingChange(scaling);
        }
        return { ...s, scaling };
      }),
      theme: (prop) => {
        return prop === "dashboard" ? get().getDashboardColors()
          : prop === "indicators" ? get().getIndicatorColors()
          : prop === "sidebarBg" ? get().getSidebarColor()
          : get()[prop]
      },
      getDashboardColors: () => {
        const { pastel = true, pastelShade, brightShade, dashboard,  breakFontColor } = get();
        const { color1, color2, color3, color4 } = dashboard;
        const dash = pastel ? {
          color1: `var(--${color1}-${pastelShade})`,
          text1:  getTextColor({color: color1, pastel, breakFontColor, brightShade, pastelShade}),
          color2: `var(--${color2}-${pastelShade})`,
          text2:  getTextColor({color: color2, pastel, breakFontColor, brightShade, pastelShade}),
          text3:  getTextColor({color: color3, pastel, breakFontColor, brightShade, pastelShade}),
          text4:  getTextColor({color: color2, pastel, breakFontColor, brightShade, pastelShade}),
          color3: `var(--${color3}-${pastelShade})`,
          color4: `var(--${color4}-${pastelShade})`
        }: {
          color1: `var(--${color1}-${brightShade})`,
          text1:  getTextColor({color: color1, pastel, breakFontColor, brightShade, pastelShade}),
          color2: `var(--${color2}-${brightShade})`,
          text2:  getTextColor({color: color2, pastel, breakFontColor, brightShade, pastelShade}),
          text3:  getTextColor({color: color3, pastel, breakFontColor, brightShade, pastelShade}),
          text4:  getTextColor({color: color4, pastel, breakFontColor, brightShade, pastelShade}),
          color3: `var(--${color3}-${brightShade})`,
          color4: `var(--${color4}-${brightShade})`
        }
        return dash;
      },
      getIndicatorColors: (pastel = false) => {
        const { pastelShade, brightShade, indicators,  breakFontColor, grayColor } = get();
        const { danger = 'red', warning ="orange", success = "green", info = "blue"} = indicators;
        const defaultIndicator = indicators.default || grayColor || "gray";
        // pastel shade is 6, bright shade is 9
        return pastel ? {
          danger: `var(--${danger}-${pastelShade})`,
          dangerText:  getTextColor({color: danger, pastel, breakFontColor, brightShade, pastelShade}),
          warning: `var(--${warning}-${pastelShade})`,
          warningText:  getTextColor({color: warning, pastel, breakFontColor, brightShade, pastelShade}),
          success:  `var(--${success}-${pastelShade})`,
          successText:  getTextColor({color: success, pastel, breakFontColor, brightShade, pastelShade}),
          info: `var(--${info}-${pastelShade})`,
          infoText:  getTextColor({color: info, pastel, breakFontColor, brightShade, pastelShade}),
          default: `var(--${defaultIndicator}-${pastelShade})`,
          defaultText:  getTextColor({color: defaultIndicator, pastel, breakFontColor, brightShade, pastelShade}),
        } : {
          danger: `var(--${danger}-${brightShade})`,
          dangerText:  getTextColor({color: danger, pastel, breakFontColor, brightShade, pastelShade}),
          warning: `var(--${warning}-${brightShade})`,
          warningText:  getTextColor({color: warning, pastel, breakFontColor, brightShade, pastelShade}),
          success:  `var(--${success}-${brightShade})`,
          successText:  getTextColor({color: success, pastel, breakFontColor, brightShade, pastelShade}),
          info: `var(--${info}-${brightShade})`,
          infoText:  getTextColor({color: info, pastel, breakFontColor, brightShade, pastelShade}),
          default: `var(--${defaultIndicator}-${brightShade})`,
          defaultText:  getTextColor({color: defaultIndicator, pastel, breakFontColor, brightShade, pastelShade}),
        };
      },
      getSidebarColor: () => {
        const { sidebarBg } = get();
        const color = SIDEBAR_COLOR_OPTIONS.find(
          (option) => option.bg === sidebarBg,
        )?? SIDEBAR_COLOR_OPTIONS[0];
        return {
          bg: color.bg,
          fg: color.fg,
          hover: color.hover,
        };
      },
    }),
    { name: "radix-theme-store" },
  ),
);
