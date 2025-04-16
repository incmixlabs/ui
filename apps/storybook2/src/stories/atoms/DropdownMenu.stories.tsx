
import {
  DropdownMenu,
  dropdownMenuContentPropDefs,
} from "@incmix/ui2/radixui"
import { accentColorEnums } from "@incmix/ui2/utils/colors"
import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

const { variant, size } = dropdownMenuContentPropDefs

const _variants = Object.fromEntries(variant.values.map((v) => [v, v]))
const _sizes = Object.fromEntries(size.values.map((v) => [v, v]))

// @see https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Atoms/DropdownMenu",
  component: DropdownMenu.Root,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DropdownMenu.Root>

export default meta
type Story = StoryObj<typeof meta>

// @see https://storybook.js.org/docs/react/writing-stories/args

type MenuItemType = {
  label: string;
  onClick?: () => void;
  shortcut?: string;
  separator?: boolean;
  color?: string;
}


const items: MenuItemType[] = [
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
              <DropdownMenu.Root key={`${variant}-${size}`}>
                <DropdownMenu.Trigger>
                  <button>{`${variant} (${size})`}</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  size={size}
                  variant={variant}
                  highContrast={true}
                >
                  {items.map((item, index) => (
                    <React.Fragment key={index}>
                      <DropdownMenu.Item
                        color={item.color as typeof accentColorEnums[keyof typeof accentColorEnums]} // Use type assertion to bypass type checking
                          onClick={item.onClick}
                          >
                            {item.label}
                            {/* Replace the Shortcut component with a simple span for keyboard shortcuts */}
                            {item.shortcut && (
                              <span style={{ marginLeft: 'auto', fontSize: '0.85em', color: 'var(--gray-11)' }}>
                                {item.shortcut}
                              </span>
                            )}
                          </DropdownMenu.Item>
                      {item.separator && <DropdownMenu.Separator />}
                    </React.Fragment>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ))}
          </div>
        ))}
      </>
    )
  },
}
