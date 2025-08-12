import { useAppearaceStore } from "@incmix/store"
import { NewsWidget } from "@incmix/ui/widgets"
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
            const { toggleAppearance } = useAppearaceStore()
            toggleAppearance()
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
