import type { colorPropDef } from "@/radix-ui"
/* eslint-disable react-refresh/only-export-components */
import { DropdownMenu as RadixDropdownMenu } from "@/radix-ui"
import { mergeDeep } from "@incmix/utils/objects"
type ColorProp = (typeof colorPropDef)["color"]["values"][number]
export {
  dropdownMenuContentPropDefs,
  dropdownMenuItemPropDefs,
  dropdownMenuCheckboxItemPropDefs,
  dropdownMenuRadioItemPropDefs,
} from "@/radix-ui/dropdown-menu.props.js"

import type { ReactNode } from "react"
import { Button, type ButtonProps, buttonPropDefs } from "./button/button"

export const dropdownButtonPropDefs = mergeDeep(buttonPropDefs, {})

const size = {
  ...dropdownButtonPropDefs.size,
  values: ["1", "2"] as const,
}
const variants = dropdownButtonPropDefs.variant
variants.values = ["solid", "soft"]
const colors = dropdownButtonPropDefs.color
const highContrast = dropdownButtonPropDefs.highContrast

export const dropdownContentPropDefs = {
  size: size,
  variant: variants,
  color: colors,
  highContrast: highContrast,
}

export const dropdownItemPropDefs = {
  asChild: { type: "boolean", default: false },
  color: colors,
}

export type DropdownMenuItemProps = {
  label: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  disabled?: boolean
  icon?: ReactNode
  checked?: boolean // Flag to indicate if the item is selected
  checkedIcon?: ReactNode // Custom icon to display when checked
  shortcut?: string
  separator?: boolean
  asChild?: boolean
  color?: ColorProp
  children?: DropdownMenuItemProps[]
}
export type DropdownButtonProps = ButtonProps & {
  label?: string
  icon?: ReactNode
}
export type DropdownMenuProps = {
  button?: DropdownButtonProps
  trigger?: ReactNode
  content?: {
    size?: (typeof dropdownContentPropDefs.size)["values"][number]
    variant?: (typeof dropdownContentPropDefs.variant)["values"][number]
    color?: (typeof dropdownContentPropDefs.color)["values"][number]
    highContrast?: boolean
  }
  items: DropdownMenuItemProps[]
}

const DropdownMenuItem = ({
  label,
  separator,
  children,
  icon, // Explicitly extract the icon prop
  checked, // Add checked prop extraction
  checkedIcon, // Add checkedIcon prop extraction
  ...props
}: DropdownMenuItemProps) => {
  return (
    <>
      {children ? (
        <RadixDropdownMenu.Sub>
          <RadixDropdownMenu.SubTrigger>
            <div className="flex items-center">
              {icon && <span className="mr-2">{icon}</span>}
              {label}
            </div>
          </RadixDropdownMenu.SubTrigger>
          <RadixDropdownMenu.SubContent>
            {children.map((item, index) => (
              <DropdownMenuItem {...item} key={index} />
            ))}
          </RadixDropdownMenu.SubContent>
        </RadixDropdownMenu.Sub>
      ) : (
        <RadixDropdownMenu.Item
          role="menuitemcheckbox"
          aria-checked={checked}
          {...props}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              {icon && <span className="mr-2">{icon}</span>}
              {label}
            </div>
            {checked && (
              <span className="ml-2 text-primary-600 dark:text-primary-400">
                {checkedIcon}
              </span>
            )}
          </div>
        </RadixDropdownMenu.Item>
      )}
      {separator && <RadixDropdownMenu.Separator />}
    </>
  )
}
export const DropdownMenuWrapper = ({
  button = {},
  trigger,
  content = {},
  items,
}: DropdownMenuProps) => {
  const { size, variant, color, highContrast } = content
  const {
    label,
    icon = <RadixDropdownMenu.TriggerIcon />,
    ...buttonProps
  } = button

  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger>
        {trigger ? (
          trigger
        ) : (
          <Button {...buttonProps}>
            {label}
            {icon}
          </Button>
        )}
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Content
        size={size}
        variant={variant}
        color={color}
        highContrast={highContrast}
      >
        {items.map((item, index) => (
          <DropdownMenuItem {...item} key={index} />
        ))}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Root>
  )
}
export const DropdownMenu = RadixDropdownMenu
