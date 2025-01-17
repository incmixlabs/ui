import { useThemeStore } from "@incmix-fe/store"
import { ImageGrid } from "@incmix-fe/ui/widgets"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ImageGrid> = {
  title: "Molecules/ImageGrid",
  component: ImageGrid,
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
type Story = StoryObj<typeof ImageGrid>

export const Default: Story = {
  args: {},
}
