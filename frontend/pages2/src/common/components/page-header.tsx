import { Heading } from "@incmix/ui2"
import type React from "react"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}
export const PageHeader: React.FC<Props> = ({ children }) => {
  return (
    <Heading size="6" mb="6">
      {children}
    </Heading>
  )
}
