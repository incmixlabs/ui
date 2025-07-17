"use client"
import { useAuth } from "@auth"
import { LoadingPage } from "@common"
import { Button, CardContainer, Container, Flex, Heading } from "@incmix/ui"
import { Link, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

function HomePage() {
  const { authUser, isLoading, isError } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (authUser && !isLoading && !isError) {
      navigate({ to: "/dashboard/home" })
    }
  }, [authUser, isLoading, isError, navigate])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Container>
      <Flex height="100vh" align="center" justify="center">
        <CardContainer>
          <Flex direction="column" align="center" gap="4">
            <Heading size="6" align="center">
              Welcome to Fihi App
            </Heading>
            <Flex gap="4">
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </Flex>
          </Flex>
        </CardContainer>
      </Flex>
    </Container>
  )
}

export default HomePage
