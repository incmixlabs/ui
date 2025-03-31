import { LoadingPage } from "@common"
import { FormField, ReactiveButton } from "@incmix/ui"
import { Box, Flex, Heading, Text } from "@incmix/ui"
import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  setupGoogleAuthCallbackListener,
  useAuth,
  useGoogleLogin,
  useLogin,
} from "./hooks/auth"

import { z } from "zod"
import { AuthLayout } from "./layouts"

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

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      handleLogin(value.email, value.password)
    },
  })

  return (
    <>
      <Heading size="4" mb="4" align="center">
        {t("title")}
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Flex direction="column" gap="4">
          <form.Field
            name="email"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().email(t("emailValidation")),
            }}
          >
            {(field) => (
              <FormField
                name="email"
                label={t("common:email")}
                type="email"
                field={field}
              />
            )}
          </form.Field>

          <form.Field
            name="password"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().min(1, t("passwordValidation")),
            }}
          >
            {(field) => (
              <FormField
                name="password"
                label={t("common:password")}
                type="password"
                field={field}
              />
            )}
          </form.Field>

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
    </>
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
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    )
  }

  return null
}

export default LoginPage
