import { getTextColor } from "@incmix/store/color"
import {
  type BreakFontColor,
  type IntegrationConfig,
  type KeyOption,
  type RadixAnyColor,
  type RadixColor,
  type RadixGrayColor,
  type RadixRadius,
  type RadixScaling,
  type SettingsConfig,
  type ThemeConfig,
  User,
  type UserPreference,
  breakFontColor as defaultFontColor,
  fontColor,
} from "@incmix/utils/types"
import { ThemeContext } from "@radix-ui/themes"
import { useContext, useEffect, useState } from "react"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export const SIDEBAR_COLOR_OPTIONS = [
  {
    bg: "var(--gray-3)",
    fg: "var(--gray-12)",
    hover: "var(--gray-1)",
    text: fontColor.light,
  },
  {
    bg: "var(--red-9)",
    fg: "var(--red-12)",
    hover: "var(--red-11)",
    text: fontColor.dark,
  },
  {
    bg: "var(--mauve-10)",
    fg: "var(--mauve-12)",
    hover: "var(--mauve-11)",
    text: fontColor.dark,
  },
  {
    bg: "var(--blue-10)",
    fg: "var(--blue-12)",
    hover: "var(--blue-11)",
    text: fontColor.dark,
  },
  {
    bg: "var(--violet-10)",
    fg: "var(--violet-12)",
    hover: "var(--violet-11)",
    text: fontColor.dark,
  },
  {
    bg: "var(--purple-10)",
    fg: "var(--purple-12)",
    hover: "var(--purple-11)",
    text: fontColor.dark,
  },
  {
    bg: "var(--indigo-10)",
    fg: "var(--indigo-12)",
    hover: "var(--indigo-11)",
    text: fontColor.dark,
  },
  {
    bg: "var(--orange-10)",
    fg: "var(--orange-12)",
    hover: "var(--orange-11)",
    text: fontColor.dark,
  },
]
export type ThemeStoreConfig = ThemeConfig & {
  setTheme: (partial: Partial<ThemeConfig>) => void
  theme: (prop: keyof ThemeConfig) => any
  onAccentColorChange: (color: RadixColor) => void
  onGrayColorChange: (color: RadixGrayColor) => void
  onRadiusChange: (radius: RadixRadius) => void
  onScalingChange: (scaling: RadixScaling) => void
  getTheme: () => ThemeConfig
  getAccentColor: () => RadixColor
  getGrayColor: () => RadixGrayColor
  getRadius: () => RadixRadius
  getScaling: () => RadixScaling
  getAvatarRadius: () => RadixRadius
  getWorkspaceRadius: () => RadixRadius
  getOrgRadius: () => RadixRadius
  getBreakFontColor: () => BreakFontColor
  getPastel: () => boolean
  getPastelShade: () => number
  getBrightShade: () => number
  getDashboardColors: () => {
    color1: string
    text1: string
    color2: string
    text2: string
    text3: string
    text4: string
    color3: string
    color4: string
  }
  getIndicatorColors: (pastel?: boolean) => {
    danger: string
    dangerText: string
    warning: string
    warningText: string
    success: string
    successText: string
    info: string
    infoText: string
    default: string
    defaultText: string
  }
  getSidebarColor: () => {
    bg: string
    fg: string
    hover: string
  }
}
export type UsePreferencesStoreConfig = UserPreference & {
  setUserPreference: (partial: Partial<UserPreference>) => void
  setAppearance: (appearance: "light" | "dark") => void
  setLanguage: (lang: string) => void
  setDirection: (direction: "ltr" | "rtl") => void
  setVariables: (variables: Record<string, string>) => void
  toggleAppearance: () => void
  toggleDirection: () => void
  toggleSystemAppearance: () => void
  isSystemAppearance: () => boolean
}
export type IntegrationStoreConfig = IntegrationConfig & {
  setAPIKeys: (keys: IntegrationConfig["keys"]) => void
  setVariables: (variables: IntegrationConfig["variables"]) => void
  getAPIKeys: () => IntegrationConfig["keys"]
  getAPIKey: (
    key: keyof IntegrationConfig["keys"]
  ) => IntegrationConfig["keys"][keyof IntegrationConfig["keys"]] | undefined
  getVariable: (key: string) => string | undefined
  getVariables: () => IntegrationConfig["variables"]
}
export const theme: ThemeConfig = {
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
    default: "gray",
  },
  dashboard: {
    color1: "pink",
    color2: "yellow",
    color3: "lime",
    color4: "cyan",
  },
  // for dark mode
  // customColor
  sidebarBg: "var(--blue-10)",
  breakFontColor: defaultFontColor,
}
export function systemAppearance() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}
export function useIsSystemDark() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange: (e: MediaQueryListEvent) => void = (
      e: MediaQueryListEvent
    ) => {
      setIsDark(e.matches)
    }
    // Set initial state
    setIsDark(mediaQuery.matches)
    // Listen for changes
    mediaQuery.addEventListener("change", handleChange)
    // Clean up event listener
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return isDark
}
export const userPreference: UserPreference = {
  appearance: systemAppearance(),
  isSystemAppearance: true,
  direction: "ltr",
  language: "en",
}

export type UserPreferenceStoreConfig = UserPreference & {
  setUserPreference: (partial: Partial<UserPreference>) => void
  onAppearanceChange: (appearance: "light" | "dark") => void
  toggleAppearance: () => void
  setSystemAppearance: (isSystem: boolean) => void
  setLanguage: (lang: string) => void
  setDirection: (direction: "ltr" | "rtl") => void
  getDirection: () => "ltr" | "rtl"
  getIsSystemAppearance: () => boolean
}

export const useAppearanceStore = create<UserPreferenceStoreConfig>()(
  persist(
    (
      set: (
        partial:
          | Partial<UserPreferenceStoreConfig>
          | ((
              state: UserPreferenceStoreConfig
            ) => Partial<UserPreferenceStoreConfig>)
      ) => void,
      get: () => UserPreferenceStoreConfig
    ) => ({
      ...userPreference,
      setUserPreference: (partial: Partial<UserPreference>) =>
        set((s) => ({
          ...s,
          ...partial,
        })),
      setAppearance: (appearance: "light" | "dark") =>
        set((s) => ({
          ...s,
          appearance,
        })),
      onAppearanceChange: (appearance: "light" | "dark") => {
        const themeContext = useContext(ThemeContext)
        if (themeContext) {
          themeContext.onAppearanceChange(appearance)
        }
        set((s) => ({
          ...s,
          appearance,
        }))
      },
      toggleAppearance: () =>
        set((s) => ({
          ...s,
          appearance: s.appearance === "light" ? "dark" : "light",
        })),
      setSystemAppearance: (isSystem: boolean) =>
        set((s) => ({
          ...s,
          isSystemAppearance: isSystem,
          appearance: isSystem ? (systemAppearance() ?? "light") : s.appearance,
        })),
      setLanguage: (lang: string) =>
        set((s) => ({
          ...s,
          language: lang,
        })),
      setDirection: (direction: "ltr" | "rtl") =>
        set((s) => ({
          ...s,
          direction: direction,
        })),
      getDirection: () => get().direction ?? "ltr",
      getIsSystemAppearance: () => get().isSystemAppearance ?? false,
    }),
    {
      name: "incmix-appearance-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state: UserPreferenceStoreConfig) => ({
        appearance: state.appearance,
        isSystemAppearance: state.isSystemAppearance,
        direction: state.direction,
        language: state.language,
      }),
    }
  )
)

export const integrationConfigs: IntegrationConfig = {
  keys: {
    google_maps: { key: "" },
    google_drive: { key: "" },
    google_calendar: { key: "" },
    gemini: { key: "" },
    claude: { key: "" },
  },
  variables: {},
}

export type IntegrationStore = IntegrationConfig & {
  setAPIKeys: (keys: IntegrationConfig["keys"]) => void
  setVariables: (variables: IntegrationConfig["variables"]) => void
  getAPIKeys: () => IntegrationConfig["keys"]
  getAPIKey: (
    key: KeyOption
  ) => IntegrationConfig["keys"][keyof IntegrationConfig["keys"]] | undefined
  getVariable: (key: string) => string | undefined
  getVariables: () => IntegrationConfig["variables"]
}
export const useIntegrationStore = create<IntegrationStore>()(
  persist(
    (set, get) => ({
      ...integrationConfigs,
      setAPIKeys: (keys: IntegrationConfig["keys"]) =>
        set((s) => {
          return { ...s, keys: keys }
        }),
      setVariables: (variables: IntegrationConfig["variables"]) =>
        set((s) => {
          return { ...s, variables: variables }
        }),
      getAPIKeys: () => get().keys,
      // @ts-ignore
      getAPIKey: (key: KeyOption) => get().keys?.[key] ?? undefined,
      getVariable: (key: string) => get().variables?.[key],
      getVariables: () => get().variables,
    }),
    {
      name: "incmix-integration-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        keys: state.keys,
        variables: state.variables,
      }),
    }
  )
)
export const useThemeStore = create<ThemeStoreConfig>()(
  persist(
    (set, get) => ({
      ...theme,
      setTheme: (partial) =>
        set((s) => {
          return { ...s, ...partial }
        }),
      onAccentColorChange: (color: RadixColor) =>
        set((s) => {
          const themeContext = useContext(ThemeContext)
          if (themeContext) {
            themeContext.onAccentColorChange(color)
          }
          return { ...s, accentColor: color }
        }),
      onGrayColorChange: (color: RadixGrayColor) =>
        set((s) => {
          const themeContext = useContext(ThemeContext)
          if (themeContext) {
            themeContext.onGrayColorChange(color)
          }
          return { ...s, grayColor: color }
        }),
      onRadiusChange: (radius: RadixRadius) =>
        set((s) => {
          const themeContext = useContext(ThemeContext)
          if (themeContext) {
            themeContext.onRadiusChange(radius)
          }
          return { ...s, radius }
        }),
      onScalingChange: (scaling: RadixScaling) =>
        set((s) => {
          const themeContext = useContext(ThemeContext)
          if (themeContext) {
            themeContext.onScalingChange(scaling)
          }
          return { ...s, scaling }
        }),
      theme: (prop) => {
        return prop === "dashboard"
          ? get().getDashboardColors()
          : prop === "indicators"
            ? get().getIndicatorColors()
            : prop === "sidebarBg"
              ? get().getSidebarColor()
              : get()[prop]
      },
      getTheme: () => {
        const {
          accentColor,
          secondaryColor,
          grayColor,
          radius,
          scaling,
          pastel,
          pastelShade,
          brightShade,
          avatarRadius,
          workspaceRadius,
          orgRadius,
          indicators,
          dashboard,
          sidebarBg,
          breakFontColor,
        } = get()
        return {
          accentColor,
          secondaryColor,
          grayColor,
          radius,
          scaling,
          pastel,
          pastelShade,
          brightShade,
          avatarRadius,
          workspaceRadius,
          orgRadius,
          indicators,
          dashboard,
          sidebarBg,
          breakFontColor,
        }
      },
      getAccentColor: () => get().accentColor,
      getGrayColor: () => get().grayColor,
      getRadius: () => get().radius,
      getScaling: () => get().scaling,
      getAvatarRadius: () => get().avatarRadius ?? "full",
      getWorkspaceRadius: () => get().workspaceRadius ?? "medium",
      getOrgRadius: () => get().orgRadius ?? "none",
      getBreakFontColor: () => get().breakFontColor,
      getPastel: () => get().pastel ?? true,
      getPastelShade: () => get().pastelShade ?? 6,
      getBrightShade: () => get().brightShade ?? 9,
      getDashboardColors: () => {
        const {
          pastel = true,
          pastelShade,
          brightShade,
          dashboard,
          breakFontColor,
        } = get()
        const { color1, color2, color3, color4 } = dashboard
        const dash = pastel
          ? {
              color1: `var(--${color1}-${pastelShade})`,
              text1: getTextColor({
                color: color1,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              color2: `var(--${color2}-${pastelShade})`,
              text2: getTextColor({
                color: color2,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              text3: getTextColor({
                color: color3,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              text4: getTextColor({
                color: color2,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              color3: `var(--${color3}-${pastelShade})`,
              color4: `var(--${color4}-${pastelShade})`,
            }
          : {
              color1: `var(--${color1}-${brightShade})`,
              text1: getTextColor({
                color: color1,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              color2: `var(--${color2}-${brightShade})`,
              text2: getTextColor({
                color: color2,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              text3: getTextColor({
                color: color3,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              text4: getTextColor({
                color: color4,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              color3: `var(--${color3}-${brightShade})`,
              color4: `var(--${color4}-${brightShade})`,
            }
        return dash
      },
      getIndicatorColors: (pastel = false) => {
        const {
          pastelShade,
          brightShade,
          indicators,
          breakFontColor,
          grayColor,
        } = get()
        const {
          danger = "red",
          warning = "orange",
          success = "green",
          info = "blue",
        } = indicators
        const defaultIndicator = indicators.default || grayColor || "gray"
        // pastel shade is 6, bright shade is 9
        return pastel
          ? {
              danger: `var(--${danger}-${pastelShade})`,
              dangerText: getTextColor({
                color: danger,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              warning: `var(--${warning}-${pastelShade})`,
              warningText: getTextColor({
                color: warning,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              success: `var(--${success}-${pastelShade})`,
              successText: getTextColor({
                color: success,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              info: `var(--${info}-${pastelShade})`,
              infoText: getTextColor({
                color: info,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              default: `var(--${defaultIndicator}-${pastelShade})`,
              defaultText: getTextColor({
                color: defaultIndicator,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
            }
          : {
              danger: `var(--${danger}-${brightShade})`,
              dangerText: getTextColor({
                color: danger,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              warning: `var(--${warning}-${brightShade})`,
              warningText: getTextColor({
                color: warning,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              success: `var(--${success}-${brightShade})`,
              successText: getTextColor({
                color: success,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              info: `var(--${info}-${brightShade})`,
              infoText: getTextColor({
                color: info,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
              default: `var(--${defaultIndicator}-${brightShade})`,
              defaultText: getTextColor({
                color: defaultIndicator,
                pastel,
                breakFontColor,
                brightShade,
                pastelShade,
              }),
            }
      },
      getSidebarColor: () => {
        const { sidebarBg } = get()
        const color =
          SIDEBAR_COLOR_OPTIONS.find((option) => option.bg === sidebarBg) ??
          SIDEBAR_COLOR_OPTIONS[0]
        return {
          bg: color.bg,
          fg: color.fg,
          hover: color.hover,
        }
      },
    }),
    {
      name: "incmix-theme-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accentColor: state.accentColor,
        grayColor: state.grayColor,
        radius: state.radius,
        scaling: state.scaling,
        pastel: state.pastel,
        pastelShade: state.pastelShade,
        brightShade: state.brightShade,
        avatarRadius: state.avatarRadius,
        workspaceRadius: state.workspaceRadius,
        orgRadius: state.orgRadius,
        indicators: state.indicators,
        dashboard: state.dashboard,
        sidebarBg: state.sidebarBg,
        breakFontColor: state.breakFontColor,
      }),
    }
  )
)

export type SidebarStore = {
  state: "expanded" | "collapsed"
  open: boolean
  isOpen: () => boolean
  toggleOpen: () => void
  setOpen: (open: boolean) => void

  // Secondary sidebar
  secondaryOpen: boolean
  setSecondaryOpen: (open: boolean) => void

  // Common
  mobile: boolean
  isMobile: () => boolean
  setIsMobile: (mobile: boolean) => void
  openMobile: boolean
  isOpenMobile: () => boolean
  setOpenMobile: (open: boolean) => void
  toggleSidebar: () => void
  toggleSecondarySidebar: () => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      state: "expanded",
      open: true,
      secondaryOpen: false,
      mobile: false,
      openMobile: false,
      isOpen: () => get().open,
      isOpenMobile: () => get().openMobile,
      isMobile: () => get().mobile,
      setIsMobile: (mobile: boolean) =>
        set((s) => ({
          ...s,
          mobile,
          open: mobile ? false : s.open,
          state: mobile ? "collapsed" : s.state,
        })),
      setOpen: (open: boolean) =>
        set((s) => {
          return { ...s, open, state: open ? "expanded" : "collapsed" }
        }),
      toggleOpen: () =>
        set((s) => ({
          ...s,
          open: !s.open,
          state: !s.open ? "expanded" : "collapsed",
        })),
      setSecondaryOpen: (open: boolean) =>
        set((s) => ({
          ...s,
          secondaryOpen: open,
        })),
      setOpenMobile: (open: boolean) =>
        set((s) => ({
          ...s,
          openMobile: open,
        })),
      toggleSidebar: () =>
        set((s) => ({
          ...s,
          open: !s.open,
          state: !s.open ? "expanded" : "collapsed",
        })),
      toggleSecondarySidebar: () =>
        set((s) => ({
          ...s,
          secondaryOpen: !s.secondaryOpen,
        })),
    }),
    {
      name: "incmix-sidebar-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        open: state.open,
        secondaryOpen: state.secondaryOpen,
        isMobile: state.isMobile,
        openMobile: state.openMobile,
      }),
    }
  )
)

export function IncmixThemeApplier() {
  const { sidebarBg } = useThemeStore()

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor)
    document.documentElement.style.setProperty(
      "--secondary-color",
      secondaryColor
    )
  }, [sidebarBg]) // Re-run effect when colors change

  return null // This component doesn't render anything visible
}
