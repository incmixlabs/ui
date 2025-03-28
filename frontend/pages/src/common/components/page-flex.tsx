import { Box, Container, Flex, type FlexProps } from "@incmix/ui"
import type React from "react"
import type { ReactNode } from "react"

interface PageFlexProps extends FlexProps {
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
      <Box className="mb-6">
        {content}
      </Box>
    </Container>
  )
}