import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
export { useShallow } from "zustand/react/shallow"
import i18n from "i18next"

export type Language = "en" | "pt"
export type Variables = {
  [key: string]: string
}
interface PreferencesState {
  // Theme state
  variables: Variables
  setVariables: (variables: Variables) => void
  theme: "light" | "dark"
  toggleTheme: () => void
  setTheme: (theme: "light" | "dark") => void

  // Language state
  language: Language
  setLanguage: (lang: Language) => void

  // Sidebar state
  sidebar: {
    isMinified: boolean
    state: "extended" | "minified" | "closed"
  }
  sidebarCurrentlyExpanded: () => boolean
  setOpen: (open: boolean) => void
  toggleSidebarOpen: () => void
  setMinified: (minified: boolean) => void
  toggleSidebarMinified: () => void
}

export const useLocalStore = create<PreferencesState>()(
  persist(
    (set, get) => {
      const setMinified = (
        minified: boolean,
        current: PreferencesState["sidebar"]
      ): Partial<PreferencesState["sidebar"]> => {
        if (minified) {
          return {
            isMinified: true,
            state: current.state === "extended" ? "extended" : "minified",
          }
        }
        return {
          isMinified: false,
          state: current.state === "extended" ? "extended" : "closed",
        }
      }

      const setOpen = (
        open: boolean,
        current: PreferencesState["sidebar"]
      ): Partial<PreferencesState["sidebar"]> => {
        if (open) {
          return { state: "extended" }
        }
        return { state: current.isMinified ? "minified" : "closed" }
      }

      return {
        // Theme implementation
        theme: "light",
        variables: {},
        setVariables: (variables: Variables) => set({ variables }),
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          })),
        setTheme: (theme: "light" | "dark") => set({ theme }),
        // Language implementation
        language: i18n.language as Language,
        setLanguage: (lang: Language) => {
          i18n.changeLanguage(lang)
          set({ language: lang })
        },

        // Sidebar implementation
        sidebar: {
          isMinified: true,
          state: "extended",
        },
        sidebarCurrentlyExpanded: () => {
          const { sidebar } = get()
          return sidebar.state === "extended"
        },
        setOpen: (open: boolean) =>
          set((state) => ({
            sidebar: { ...state.sidebar, ...setOpen(open, state.sidebar) },
          })),
        toggleSidebarOpen: () =>
          set((state) => ({
            sidebar: {
              ...state.sidebar,
              ...setOpen(state.sidebar.state !== "extended", state.sidebar),
            },
          })),
        setMinified: (minified: boolean) =>
          set((state) => ({
            sidebar: {
              ...state.sidebar,
              ...setMinified(minified, state.sidebar),
            },
          })),
        toggleSidebarMinified: () =>
          set((state) => ({
            sidebar: {
              ...state.sidebar,
              ...setMinified(!state.sidebar.isMinified, state.sidebar),
            },
          })),
      }
    },
    {
      name: "app-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
;("use client")

// Enhanced selector helpers
export const useThemeStore = () =>
  useLocalStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
    setTheme: state.setTheme,
  }))

export const useLanguageStore = () =>
  useLocalStore((state) => ({
    language: state.language,
    setLanguage: state.setLanguage,
  }))

export const useSidebarStore = () =>
  useLocalStore((state) => ({
    state: state.sidebar.state,
    isMinified: state.sidebar.isMinified,
    currentlyExpanded: state.sidebarCurrentlyExpanded,
    setOpen: state.setOpen,
    toggleOpen: state.toggleSidebarOpen,
    setMinified: state.setMinified,
    toggleMinified: state.toggleSidebarMinified,
  }))
