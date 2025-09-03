import { ChevronDown, Plus, Split, Star, X } from "lucide-react"
import { DropdownMenu, type DropdownMenuItemProps } from "../dropdown-menu"
import { Button, type ButtonProps } from "./button"
import { IconButton } from "./icon-button"

export interface SplitButtonProps {
  size?: "1" | "2" | "3"
  splitLeft?: boolean
  color?:
    | "gray"
    | "gold"
    | "bronze"
    | "brown"
    | "yellow"
    | "amber"
    | "orange"
    | "tomato"
    | "red"
    | "ruby"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "lime"
    | "mint"
    | "sky"
  items: DropdownMenuItemProps[]
  variant?: "classic" | "solid" | "soft" | "ghost" | "surface" | "outline"
  button: ButtonProps
}
const SplitButton = ({
  size = "2",
  color = "blue",
  items,
  variant = "solid",
  splitLeft,
  button,
}: SplitButtonProps) => {
  button.size = size
  button.variant = variant
  button.color = color
  const DropdownContent = (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton color={color} size={size} variant={variant}>
          <ChevronDown />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="min-w-52">
        {items.map((item, index) => {
          item.color = color
          return (
            // @ts-ignore
            <DropdownMenu.Item key={index} {...item} />
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
  return (
    <div className="divide-x divide-border/40 [&>*]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md">
      {splitLeft && DropdownContent}
      <Button {...button}></Button>
      {!splitLeft && DropdownContent}
    </div>
  )
}
export default SplitButton
