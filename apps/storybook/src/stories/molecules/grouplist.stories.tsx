import { useAppearanceStore } from "@incmix/store"
import { GroupList } from "@incmix/ui/widgets"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof GroupList> = {
  title: "Molecules/grouplist",
  component: GroupList,
  parameters: {
    toolbar: {
      items: [
        {
          title: "Theme",
          icon: "circlehollow",
          onClick: () => {
            const { toggleAppearance } = useAppearanceStore()
            toggleAppearance()
          },
        },
      ],
    },
  },
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof GroupList>

export const Default: Story = {
  args: {
  },
}
