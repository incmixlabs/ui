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
parameters: {
  toolbar: {
    items: [
      {
        title: "Theme",
        icon: "circlehollow",
        onClick: (_event, _item, context) => {
          // update Storybook globals so ThemeWrapper sees the change
          context.updateGlobals({
            theme: context.globals.theme === "light" ? "dark" : "light",
          })
        },
      },
    ],
  },
},
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
