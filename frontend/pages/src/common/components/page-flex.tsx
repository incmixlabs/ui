import { Box, Container, Flex } from "@incmix/ui"
import type { FlexProps } from "@radix-ui/themes"
import type React from "react"
import type { ReactNode } from "react"

type PageFlexProps = FlexProps & {
  children: ReactNode
  fullHeight?: boolean
  centered?: boolean
  noContainer?: boolean
}

export const PageFlex: React.FC<PageFlexProps> = ({
  children,
  fullHeight = false,
  centered = false,
  noContainer = false,
  ...props
}) => {
  const content = (
    <Flex
      direction="column"
      gap="6"
      className={`
        ${fullHeight ? "min-h-[calc(100vh-150px)]" : ""}
        ${centered ? "items-center justify-center" : ""}
      `}
      {...props}
    >
      {children}
    </Flex>
  )

  if (noContainer) {
    return content
  }

  return (
    <Container>
      <Box className="mb-6">{content}</Box>
    </Container>
  )
}
