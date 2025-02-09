import { Theme, type ThemeProps, useThemeContext } from "@radix-ui/themes"
// TBD
// 1. On context change, update localstorage
import { type ReactNode, createContext, useContext, useEffect } from "react"
import { useLocalStorage } from "./use-local-storage"
export const isDarkScheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
export const defaultScheme = () => (isDarkScheme() ? "dark" : "light")

export type ThemeContextValue = {
  accentColor: string
  grayColor: string
  panelBackground: string
  scaling: string
  radius: string
  direction: "ltr" | "rtl"
  isSystemTheme: boolean
  appearance: "light" | "dark"
}
const defaultContextValue: ThemeContextValue = {
  accentColor: "indigo",
  grayColor: "slate",
  panelBackground: "solid",
  scaling: "100%",
  radius: "large",
  direction: "ltr",
  appearance: defaultScheme(),
  isSystemTheme: true,
}
export type ThemeProviderProps = ThemeContextValue & {
  children: ReactNode
}
type ExtendThemeContextValue = {
  isSystemTheme: boolean
  setSystemTheme: (system: boolean) => void
  direction: "ltr" | "rtl"
  setDirection: (dir: "ltr" | "rtl") => void
  onChange: (change: boolean) => void
}
const ExtendThemeContext = createContext<ExtendThemeContextValue>({
  isSystemTheme: true,
  setSystemTheme: () => {},
  direction: "ltr",
  setDirection: () => {},
  onChange: () => {},
})

const ThemeProvider = ({
  children,
  isSystemTheme,
  ...props
}: ThemeProviderProps) => {
  const extendThemeContext = useContext(ExtendThemeContext)
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
