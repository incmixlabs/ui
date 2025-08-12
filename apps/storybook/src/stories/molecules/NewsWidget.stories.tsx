<<<<<<< HEAD
import { useAppearanceStore } from "@incmix/store"
=======
import { useAppearaceStore } from "@incmix/store"
>>>>>>> 4c4194ff (feat: wip)
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
            const { toggleAppearance } = useAppearanceStore.getState()
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
