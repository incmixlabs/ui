import { Flex } from "@/radix-ui"
import { ChevronDown } from "lucide-react"
import type { Color } from "../../../types"
import { DropdownMenu, type DropdownMenuItemProps } from "../dropdown-menu"
import { Button, type ButtonProps } from "./button"
import { IconButton } from "./icon-button"

export interface SplitButtonProps {
  size?: "1" | "2" | "3"
  splitLeft?: boolean
  color?: Color
  items: DropdownMenuItemProps[]
  variant?: "classic" | "solid" | "soft" | "surface" | "outline"
  button: ButtonProps
}

const SplitButton = ({
  size = "2",
  color = "blue",
  items,
  variant = "outline",
  splitLeft,
  button,
}: SplitButtonProps) => {
  const buttonProps: ButtonProps = {
    ...button,
    size,
    variant,
    color: color as ButtonProps["color"],
  }

  const DropdownContent = (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          color={color as ButtonProps["color"]}
          size={size}
          variant={variant}
          aria-label="More actions"
        >
          <ChevronDown aria-hidden="true" />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="min-w-52">
        {items.map((item, index) => {
          item.color = color as DropdownMenuItemProps["color"]
          return (
            // @ts-ignore
            <DropdownMenu.Item key={item?.["data-key"] ?? index} {...item} />
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )

  return (
    <Flex className="inline-flex divide-x divide-border/40 [&>*]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md">
      {splitLeft && DropdownContent}
      <Button {...buttonProps} />
      {!splitLeft && DropdownContent}
    </Flex>
  )
}

export default SplitButton
