import { Card, Container } from "@radix-ui/themes"
import type React from "react"

interface CardContainerProps {
  children: React.ReactNode
  className?: string
}

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <Card className={`bg-gray-2 p-6 ${className}`}>
      <Container>{children}</Container>
    </Card>
  )
}
