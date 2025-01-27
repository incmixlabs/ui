import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes"
import type { Color } from "@utils/colors"
import { mergeDeep } from "@utils/objects"
import React, { type ReactNode, type MouseEvent } from "react"
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
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  icon?: ReactNode
  shortcut?: string
  separator?: boolean
  asChild?: boolean
  color?: Color
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
    size?: (typeof dropdownContentPropDefs)["size"]
    variant?: (typeof dropdownContentPropDefs)["variant"]
    color?: (typeof dropdownContentPropDefs)["color"]
    highContrast?: (typeof dropdownContentPropDefs)["highContrast"]
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
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <DropdownMenuItem {...item} key={index} />
            ))}
          </RadixDropdownMenu.SubContent>
        </RadixDropdownMenu.Sub>
      ) : (
        // @ts-ignore
        <RadixDropdownMenu.Item {...props}>{label}</RadixDropdownMenu.Item>
      )}
      {separator && <RadixDropdownMenu.Separator />}
    </>
  )
}
export const DropdownMenu = ({
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
        /* @ts-ignore */
        size={size}
        /* @ts-ignore */
        variant={variant}
        /* @ts-ignore */
        color={color}
        /* @ts-ignore */
        highContrast={highContrast}
      >
        {items.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <DropdownMenuItem {...item} key={index} />
        ))}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Root>
  )
}
