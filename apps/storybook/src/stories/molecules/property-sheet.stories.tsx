import { useThemeStore } from "@incmix/store"
import { PropertySheet } from "@incmix/ui/widgets"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof PropertySheet> = {
  title: "Molecules/property-sheet",
  component: PropertySheet,
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
type Story = StoryObj<typeof PropertySheet>

export const Default: Story = {
  args: {
    location: { lat: "40.730610", lon: "-73.935242" },
  },
}
