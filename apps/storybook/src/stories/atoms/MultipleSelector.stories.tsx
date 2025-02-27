import type { Meta, StoryObj } from "@storybook/react"
import { MultipleSelectorControlled } from "@incmix/ui"

const meta: Meta<typeof MultipleSelectorControlled> = {
  title: "Atoms/MultipleSelector",
  component: MultipleSelectorControlled,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof MultipleSelectorControlled>


export const GrayTheme: Story = {
  args: {
    themeColor: "gray",
  },
}
export const CrimsonTheme: Story = {
  args: {
    themeColor: "crimson",
  },
}
export const IndigoTheme: Story = {
  args: {
    themeColor: "indigo",

  },
}
export const CyanTheme: Story = {
  args: {
    themeColor: "cyan",

  },
}
export const OrangeTheme: Story = {
  args: {
    themeColor: "orange",

  },
}
