import { CardContainer, Container, Flex } from "@incmix/ui2"

import type { FC, ReactNode } from "react"

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
