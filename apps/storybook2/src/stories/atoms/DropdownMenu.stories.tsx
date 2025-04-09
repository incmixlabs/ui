import { accentColorEnums } from "@incmix/ui/utils"
import {
  DropdownMenu,
  type DropdownMenuItemProps,
  dropdownContentPropDefs,
} from "@incmix/ui2"
import type { Meta, StoryObj } from "@storybook/react"

const { variant, size } = dropdownContentPropDefs

const _variants = Object.fromEntries(variant.values.map((v) => [v, v]))
const _sizes = Object.fromEntries(size.values.map((v) => [v, v]))

// @see https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Atoms/DropdownMenu",
  component: DropdownMenu,
  argTypes: {
    className: {
      description: "Example description",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "bar" },
      },
      control: "text",
    },
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

// @see https://storybook.js.org/docs/react/writing-stories/args

const items: DropdownMenuItemProps[] = [
  {
    label: "Item 1",
    onClick: () => {
      console.log("clicked")
    },
  },
  {
    label: "Item 2",
    onClick: () => {
      console.log("clicked")
    },
  },
  {
    label: "Item 3",
    shortcut: "⌘ E",
    onClick: () => {
      console.log("clicked")
    },
    separator: true,
    color: accentColorEnums.red,
  },
  {
    label: "Item 4",
    shortcut: "⌘ F",
    onClick: () => {
      console.log("clicked")
    },
  },
]
export const Default: Story = {
  render: () => {
    return (
      <>
        {variant.values.map((variant) => (
          <div className="flex items-baseline space-x-2" key={variant}>
            {size.values.map((size) => (
              <DropdownMenu
                triggerButtonText={`${variant}`}
                triggerButton={{
                  variant: variant,
                  size: size,
                }}
                content={{
                  size: size,
                  variant: variant,
                  highContrast: true,
                }}
                items={items}
                key={`${variant}-${size}`}
              >
                {`${variant} (${size})`}
              </DropdownMenu>
            ))}
          </div>
        ))}
      </>
    )
  },
}
