import { type ReactNode, createContext, useContext, useState, useEffect } from "react"
import { Theme, type ThemeProps, useThemeContext } from "@radix-ui/themes"
import  { breakFontColor, type ThemeConfig } from "@incmix/utils/types";
import { createStore, useStore } from 'zustand'
// TBD
// 1. On context change, update localstorage
import { useLocalStorage } from "./use-local-storage"
export const isDarkScheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
export const defaultScheme = () => (isDarkScheme() ? "dark" : "light")

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
  breakFontColor,
  direction: "ltr",
  isSystemTheme: true
};
export type ThemeContextValue = {
  accentColor: string
  grayColor: string
  scaling: string
  radius: string
  direction: "ltr" | "rtl"
  isSystemTheme: boolean
  appearance: "light" | "dark"
}
const defaultContextValue: ThemeContextValue = {
  accentColor: "indigo",
  grayColor: "slate",
  scaling: "100%",
  radius: "large",
  direction: "ltr",
  appearance: defaultScheme(),
  isSystemTheme: true,
}
export type ThemeProviderProps = ThemeContextValue & {
  children: ReactNode
}
const ExtendThemeContext = createContext<any>(null)

const ThemeProvider = ({
  children,
  isSystemTheme,
  ...props
}: ThemeProviderProps) => {
  const extendThemeContext = useContext(ExtendThemeContext)
  const [store] = useState(() =>
    createStore((set) => ({
      theme: defaultTheme,
      actions: {
        update: (theme: ThemeConfig) =>
          set((state: ThemeConfig) => ({ theme: {...state.theme, ...theme} }))
        
      },
    }))
  )
  const { appearance, onAppearanceChange } = useThemeContext()
  const [newProps] = useLocalStorage("theme", {
    ...props,
    defaultContextValue,
    theme: defaultScheme(),
  })

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = isDarkScheme() ? "dark" : "light"
      if (newTheme !== appearance && isSystemTheme) {
        onAppearanceChange(newTheme)
      }
    }
    const preferDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
    updateTheme() // Initial theme detection
    preferDarkScheme.addEventListener("change", () => updateTheme())
    return () => {
      preferDarkScheme.removeEventListener("change", () => updateTheme())
    }
  }, [])

  return (
    <ExtendThemeContext.Provider value={extendThemeContext}>
      <Theme {...(newProps as ThemeProps)}>{children}</Theme>
    </ExtendThemeContext.Provider>
  )
}

export { useThemeContext, ThemeProvider }
