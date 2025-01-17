import { useThemeStore } from "@incmix-fe/store"
import { NewsWidget } from "@incmix-fe/ui/widgets"
// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof NewsWidget> = {
  title: "Molecules/NewsWidget",
  component: NewsWidget,
  parameters: {
    toolbar: {
      items: [
        {
          title: "Theme",
          icon: "circlehollow",
          onClick: () => {
            const { toggleTheme } = useThemeStore()
            toggleTheme()
          },
        },
      ],
    },
  },
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof NewsWidget>

export const Default: Story = {
  args: {
    country: "us",
  },
}
