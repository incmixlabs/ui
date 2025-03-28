import { Box, Container, Grid, type GridProps } from "@incmix/ui"
import type React from "react"
import type { ReactNode } from "react"

interface PageGridProps extends GridProps {
  children: ReactNode
  noContainer?: boolean
  columns?: {
    initial?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
}

export const PageGrid: React.FC<PageGridProps> = ({ 
  children,
  noContainer = false,
  columns = { initial: "1", md: "2" },
  ...props 
}) => {
  const content = (
    <Grid 
      columns={columns} 
      gap="6" 
      className="w-full flex-1"
      {...props}
    >
      {children}
    </Grid>
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