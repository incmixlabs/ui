import type { Preview } from "@storybook/react"
import React from "react"
import "./global.css"
import { useAppearanceStore } from "@incmix/store"
import { Toaster, Flex, Theme } from "../src/1base"
import QueryProvider from "./query-client"
import { TaskCopyBufferProvider } from "../src/3blocks/kanban-board/hooks/use-task-copy-buffer"

// Mock useProjectData for Storybook
const mockUseProjectData = (projectId: string) => {
  const mockData = React.useMemo(() => {
    // Get mock data from story parameters if available
    const storyContext = (window as any).__STORYBOOK_STORY_STORE__?.args;
    if (storyContext?.parameters?.mockData) {
      return storyContext.parameters.mockData;
    }
    
    // Default empty data if no mock provided
    return {
      isLoading: false,
      error: null,
      data: {
        columns: [],
        priorityLabels: [],
        tasks: [],
        labels: []
      }
    };
  }, [projectId]);
  
  return {
    ...mockData,
    // Mock functions
    refetch: () => Promise.resolve(),
    createTask: async () => {},
    updateTask: async () => {},
    deleteTask: async () => {},
    duplicateTask: async () => {},
    moveTask: async () => {},
    createLabel: async () => "",
    updateLabel: async () => {},
    deleteLabel: async () => {},
    moveTaskToStatus: async () => {},
  };
};

const ThemeWrapper = ({
  children,
  theme,
}: {
  children: React.ReactNode
  theme: "light" | "dark"
}) => {
  const { setAppearance} = useAppearanceStore()

  React.useEffect(() => {
    setAppearance(theme)
  }, [theme, setAppearance])

  return (
    <QueryProvider>
      <TaskCopyBufferProvider>
        <Theme appearance={theme}>
          <Flex align="center" justify="center" height="100vh">
            {children}
          </Flex>
          <Toaster position="bottom-center" />
        </Theme>
      </TaskCopyBufferProvider>
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
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
      ],
        dynamicTitle: true,
      },
      defaultValue: "light"
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

  tags: ["autodocs"],
}

export default preview
