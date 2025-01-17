import { Flex } from "@radix-ui/themes"
import type React from "react"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}
export const PageFlex: React.FC<Props> = ({ children }) => {
  return (
    <Flex direction="column" gap="6">
      {children}
    </Flex>
  )
}
