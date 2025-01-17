"use client"
import { useCurrentUser } from "@auth"
import { LoadingPage } from "@common"
import { CardContainer } from "@incmix-fe/ui"
import { AUTH_API_URL } from "@incmix-fe/ui/constants"
import { Button, Container, Flex, Heading } from "@radix-ui/themes"
import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

function HomePage() {
  const { user, isLoading, isError } = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !isLoading && !isError) {
      navigate({ to: "/dashboard" })
    }
  }, [user, isLoading, isError, navigate])

  const { mutate: testSentry } = useMutation({
    mutationKey: ["test-sentry"],
    mutationFn: () => {
      const url = `${AUTH_API_URL}/test-sentry`
      return fetch(url)
    },
  })

  if (isLoading || user) {
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
              <Button onClick={() => testSentry()} color="red">
                Test sentry
              </Button>
            </Flex>
          </Flex>
        </CardContainer>
      </Flex>
    </Container>
  )
}

export default HomePage
