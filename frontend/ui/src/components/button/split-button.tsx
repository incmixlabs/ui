import { Flex } from "@radix-ui/themes"

import {
  DropdownMenu,
  type DropdownMenuItemProps,
  type DropdownMenuProps,
} from "@components/dropdown-menu"
import type { Side } from "../types"
import { Button, type ButtonProps } from "./button"

export type SplitButtonProps = DropdownMenuProps &
  ButtonProps & {
    // The label of the button
    label: string
    // The side of the dropdown
    side?: Side
    items: DropdownMenuItemProps[]
    // The direction of the dropdown
  }

export const SplitButton = ({
  label,
  side = "right",
  items,
  ...props
}: SplitButtonProps) => {
  const isRight = side === "right"
  const noRightBorder = { borderRight: "none" }
  const noLeftBorder = { borderLeft: "none" }
  const border = isRight ? noLeftBorder : noRightBorder
  return (
    <Flex>
      {isRight && (
        <Button style={noRightBorder} {...props}>
          {label}
        </Button>
      )}
      <DropdownMenu style={border} {...props} items={items} />
      {!isRight && (
        <Button style={noLeftBorder} {...props}>
          {label}
        </Button>
      )}
    </Flex>
  )
}
