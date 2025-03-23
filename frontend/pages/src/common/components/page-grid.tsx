import { Grid } from "@incmix/ui"
import type React from "react"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}
export const PageGrid: React.FC<Props> = ({ children }) => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="6" className="w-full flex-1">
      {children}
    </Grid>
  )
}
