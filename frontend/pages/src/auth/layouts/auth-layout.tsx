// @ts-nocheck
import type { FC, ReactNode } from "react"

import { CardContainer, Container, Flex } from "@incmix/ui"

interface AuthLayoutProps {
  children: ReactNode
  maxWidth?: string
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  maxWidth = "400px",
}) => {
  return (
    <Container>
      <Flex height="100vh" align="center" justify="center">
        <CardContainer style={{ maxWidth }}>{children}</CardContainer>
      </Flex>
    </Container>
  )
}
