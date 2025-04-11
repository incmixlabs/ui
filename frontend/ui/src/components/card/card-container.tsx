import { Card, Container } from "@radix-ui/themes"
import type React from "react"

interface CardContainerProps extends React.ComponentPropsWithoutRef<typeof Card> {
  children: React.ReactNode
  className?: string
}

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <Card className={`bg-gray-2 p-6 ${className}`} {...props}>
      {children}
    </Card>
  )
}
