import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { Form } from "houseform"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { CardContainer, FormField } from "@incmix/ui"
import { Box, Container, Flex, Heading, ReactiveButton, Text } from "@incmix/ui"
import { AUTH_API_URL } from "@incmix/ui/constants"
import type { AuthUser } from "@jsprtmnn/utils/types"

function SignupForm() {
  const { t } = useTranslation(["signup", "common"])
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const signupMutation = useMutation<
    AuthUser,
    Error,
    { fullName: string; email: string; password: string }
  >({
    mutationFn: async ({ fullName, email, password }) => {
      const response = await fetch(`${AUTH_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
        credentials: "include",
      })
      if (!response.ok) {
        const data = (await response.json()) as any
        throw new Error(data.message || t("error.signup"))
      }
      const user = (await response.json()) as AuthUser
      return {
        email: user.email,
        emailVerified: user.emailVerified,
        id: user.id,
        slug: "",
        userId: user.id,
        userType: user.userType,
      }
    },
    onSuccess: (data) => {
      setErrorMessage(null)

      navigate({ to: "/welcome", search: { email: data.email } })
    },
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
  })

  const handleSubmit = (values: {
    fullName: string
    email: string
    password: string
  }) => {
    signupMutation.mutate(values)
  }

  return (
    <CardContainer>
      <Heading size="4" mb="4" align="center">
        {t("title")}
      </Heading>
      <Form onSubmit={handleSubmit}>
        {({ submit }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
          >
            <Flex direction="column" gap="4">
              <FormField
                name="fullName"
                label={t("common:fullName")}
                validation={z.string().min(1, t("fullNameValidation"))}
              />
              <FormField
                name="email"
                label={t("common:email")}
                type="email"
                validation={z.string().email(t("emailValidation"))}
              />

              <FormField
                name="password"
                label={t("common:password")}
                type="password"
                validation={z.string().min(6, t("passwordValidation"))}
              />

              {signupMutation.isError && (
                <Text color="red" size="2">
                  {errorMessage}
                </Text>
              )}

              {signupMutation.isSuccess && (
                <Text color="green" size="2">
                  {t("signupSuccess")}
                </Text>
              )}

              <ReactiveButton
                type="submit"
                loading={signupMutation.isPending}
                success={signupMutation.isSuccess}
              >
                {t("submit")}
              </ReactiveButton>
            </Flex>
          </form>
        )}
      </Form>

      <Box mt="4" className="text-center">
        <Link to="/login">
          <Text color="blue">{t("loginPrompt")}</Text>
        </Link>
      </Box>
    </CardContainer>
  )
}

function SignupPage() {
  return (
    <Container>
      <Flex height="100vh" align="center" justify="center">
        <SignupForm />
      </Flex>
    </Container>
  )
}

export default SignupPage
