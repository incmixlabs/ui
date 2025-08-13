import { Text } from "@/radix-ui/text"
type RadixTextProps = React.ComponentProps<typeof Text>
export type ParagraphType = {
  children: React.ReactNode
  as?: "p" | "label" | "div" | "span"
  size?: RadixTextProps["size"]
  weight?: RadixTextProps["weight"]
  align?: RadixTextProps["align"]
  trim?: RadixTextProps["trim"]
  color?: RadixTextProps["color"]
  className?: string
}
export const Paragraph = ({
  children,
  as = "p",
  size = "3",
  weight = "regular",
  align = "left",
  trim = "normal",
  color,
  className,
  ...props
}: ParagraphType) => {
  return (
    <Text
      as={as}
      size={size}
      weight={weight}
      align={align}
      trim={trim}
      color={color}
      className={className}
      {...props}
    >
      {children}
    </Text>
  )
}

export default Paragraph
