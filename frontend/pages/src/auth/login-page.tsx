import { LoadingPage } from "@common"
import { CardContainer, FormField, ReactiveButton } from "@incmix-fe/ui"
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { Form } from "houseform"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  setupGoogleAuthCallbackListener,
  useAuth,
  useGoogleLogin,
  useLogin,
} from "./hooks/auth"

import { z } from "zod"

function LoginForm() {
  const { t } = useTranslation(["login", "common"])
  const {
    handleGoogleLogin,
    isLoading: isGoogleLoginLoading,
    isSuccess: isGoogleLoginSuccess,
  } = useGoogleLogin()

  const {
    handleLogin,
    isPending: isLoginLoading,
    loginError,
    isSuccess: isLoginSuccess,
  } = useLogin()

  const handleSubmit = (values: { email: string; password: string }) => {
    handleLogin(values.email, values.password)
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
                name="email"
                label={t("common:email")}
                type="email"
                validation={z.string().email(t("emailValidation"))}
              />

              <FormField
                name="password"
                label={t("common:password")}
                type="password"
                validation={z.string().min(1, t("passwordValidation"))}
              />

              {loginError && (
                <Text color="red" size="2">
                  {loginError.message}
                </Text>
              )}
              <Box className="text-left">
                <Link to="/forgot-password">
                  <Text color="blue">{t("login:forgotPassword")}</Text>
                </Link>
              </Box>
              <ReactiveButton
                type="submit"
                color="blue"
                loading={isLoginLoading}
                success={isLoginSuccess}
                className="w-full"
              >
                {t("submit")}
              </ReactiveButton>
            </Flex>
          </form>
        )}
      </Form>
      <ReactiveButton
        onClick={handleGoogleLogin}
        color="red"
        mt="4"
        className="w-full"
        loading={isGoogleLoginLoading}
        success={isGoogleLoginSuccess}
      >
        {t("googleLogin")}
      </ReactiveButton>
      <Box mt="4" className="text-center">
        <Link to="/signup">
          <Text color="blue">{t("signupPrompt")}</Text>
        </Link>
      </Box>
    </CardContainer>
  )
}

function LoginPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { authUser, isLoading, isError } = useAuth()

  useEffect(() => {
    const setupListener = setupGoogleAuthCallbackListener(queryClient)

    if (!setupListener) return

    const cleanup = setupListener()

    return () => {
      if (cleanup) cleanup()
    }
  }, [queryClient])

  useEffect(() => {
    if (authUser && !isLoading && !isError) {
      navigate({ to: "/dashboard" })
    }
  }, [authUser, isLoading, isError, navigate])

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError || !authUser) {
    return (
      <Container>
        <Flex height="100vh" align="center" justify="center">
          <LoginForm />
        </Flex>
      </Container>
    )
  }

  return null
}

export default LoginPage
