import type { Meta, StoryObj } from "@storybook/react"
import { ColorPickerDropdown, ColorPickerComponent } from "@incmix/ui/widgets"

const meta: Meta = {
  title: "Molecules/ColorPicker",
}

export default meta

// Story for ColorPickerDropdown
export const Dropdown: StoryObj<typeof ColorPickerDropdown> = {
  render: (args) => <ColorPickerDropdown />,
  args: {
    // add any args if needed
  },
}

// Story for ColorPickerComponent
export const Component: StoryObj<typeof ColorPickerComponent> = {
  render: (args) => <ColorPickerComponent  />,
  args: {
    // add any args if needed
  },
}
