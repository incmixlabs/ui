import { useMutation } from "@tanstack/react-query"

import { CardContainer, Toaster } from "@incmix/ui2"
import { Button, Container, Flex, Heading, Spinner, Text } from "@incmix/ui2"
import { AUTH_API_URL } from "@incmix/ui2/constants"
import { toast } from "sonner"
import WelcomeRoute from "./routes/welcome"

function WelcomePage() {
  const { email } = WelcomeRoute.useSearch()

  const resendEmailMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${AUTH_API_URL}/verification-email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      })
      if (!response.ok) {
        const headers = response.headers
        if (!headers.get("Content-Type")?.includes("application/json")) {
          throw new Error(
            `Failed to resend verification email: ${response.status} ${response.statusText}`
          )
        }

        const data = (await response.json()) as any
        throw new Error(data.message || "Failed to resend verification email.")
      }
      return response.json()
    },
    onSuccess: () => {
      toast.success("Verification email resent successfully.")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleResendEmail = () => {
    resendEmailMutation.mutate()
  }

  return (
    <Container>
      <Flex height="100vh" align="center" justify="center">
        <CardContainer>
          <Heading size="5" mb="4" align="center">
            Welcome to Fihi App
          </Heading>
          <Text as="p" size="2" mb="4" align="center" color="gray">
            An email has been sent to {email} for verification.
          </Text>
          {resendEmailMutation.isPending && (
            <Flex align="center" justify="center" mb="4">
              <Spinner />
            </Flex>
          )}
          <Button onClick={handleResendEmail} className="w-full">
            Click here to resend the email
          </Button>
        </CardContainer>
      </Flex>
      <Toaster position="bottom-center" />
    </Container>
  )
}

export default WelcomePage
