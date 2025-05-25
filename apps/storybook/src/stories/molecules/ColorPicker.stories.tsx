import type { Meta, StoryObj } from "@storybook/react"
import { ColorPickerDropdown, ColorPickerComponent } from "@incmix/ui/widgets"

const meta: Meta = {
  title: "Molecules/ColorPicker",
}

export default meta

type Story = StoryObj<typeof ColorPickerDropdown>

export const Dropdown: Story = {
  render: (args) => <ColorPickerDropdown />,
}

export const Component: Story = {
  render: (args) => <ColorPickerComponent />,
}
