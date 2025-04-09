import type { Preview } from "@storybook/react"
import React from "react"
import "./global.css"
import { useThemeStore } from "@incmix/store"
import { Toaster } from "@incmix/ui"
import { Flex, Theme } from "@incmix/ui"
import QueryProvider from "./query-client"

const ThemeWrapper = ({
  children,
  theme,
}: {
  children: React.ReactNode
  theme: "light" | "dark"
}) => {
  const { setTheme } = useThemeStore()

  React.useEffect(() => {
    setTheme(theme)
  }, [theme, setTheme])

  return (
    <QueryProvider>
      <Theme appearance={theme}>
        <Flex align="center" justify="center" height="100vh">
          {children}
        </Flex>
        <Toaster position="bottom-center" />
      </Theme>
    </QueryProvider>
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["Light", "Dark"],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: "light",
  },

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "fullscreen",
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme.toLowerCase() as "light" | "dark"

      return (
        <ThemeWrapper theme={theme}>
          <Story />
        </ThemeWrapper>
      )
    },
  ],

  tags: ["autodocs", "autodocs"],
}

export default preview
