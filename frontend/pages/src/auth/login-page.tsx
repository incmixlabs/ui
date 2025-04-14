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

// Modified AuthLayout component to match the onboarding style
function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      {/* Left side - Form content */}
      <div className="flex w-full items-center justify-center bg-white md:w-1/2 dark:bg-gray-900">
        <div className="w-full max-w-md px-6 py-8 md:px-8">
          {/* Logo centered */}
          <div className="mb-8 flex w-full items-center justify-center lg:mb-10">
            <img
              src="/images/logos/app/32x32.svg"
              alt=""
              className="mr-4 h-11 w-11"
            />
            <span className="self-center whitespace-nowrap font-semibold text-2xl text-gray-900 dark:text-white">
              Incmix
            </span>
          </div>

          {/* Form content */}
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden h-full md:block md:w-1/2">
        <div className="h-full w-full bg-blue-500">
          <img
            src="/images/onboarding/step2.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

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
      <Heading size="4" mb="4" className="text-gray-900 dark:text-white">
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

      {/* OR separator */}
      <div className="relative my-4 flex w-full items-center">
        <div className="flex-grow">
          <div className="h-px w-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="px-3">
          <span className="text-gray-500 text-sm dark:text-gray-400">OR</span>
        </div>
        <div className="flex-grow">
          <div className="h-px w-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      <ReactiveButton
        onClick={handleGoogleLogin}
        color="red"
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
