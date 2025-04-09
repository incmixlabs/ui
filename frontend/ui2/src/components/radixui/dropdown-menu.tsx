import type { colorPropDef } from "@/lib/utils/colors"
import { mergeDeep } from "@/lib/utils/objects"
/* eslint-disable react-refresh/only-export-components */
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes"
type ColorProp = (typeof colorPropDef)["color"]["values"][number]
export {
  dropdownMenuContentPropDefs,
  dropdownMenuItemPropDefs,
  dropdownMenuCheckboxItemPropDefs,
  dropdownMenuRadioItemPropDefs,
} from "@radix-ui/themes/src/components/dropdown-menu.props.js"

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

export const DropdownMenuItem = ({
  label,
  separator,
  children,
  ...props
}: DropdownMenuItemProps) => {
  return (
    <>
      {children ? (
        <RadixDropdownMenu.Sub>
          <RadixDropdownMenu.SubTrigger>{label}</RadixDropdownMenu.SubTrigger>
          <RadixDropdownMenu.SubContent>
            {children.map((item, index) => (
              <DropdownMenuItem {...item} key={index} />
            ))}
          </RadixDropdownMenu.SubContent>
        </RadixDropdownMenu.Sub>
      ) : (
        <RadixDropdownMenu.Item {...props}>{label}</RadixDropdownMenu.Item>
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
