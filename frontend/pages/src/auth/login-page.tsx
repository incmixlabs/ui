import { LoadingPage } from "@common"
import { Box, Flex, Heading, Text } from "@incmix/ui"
import { ReactiveButton } from "@incmix/ui"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  setupGoogleAuthCallbackListener,
  useAuth,
  useGoogleLogin,
  useLogin,
} from "./hooks/auth"

import AutoForm from "@incmix/ui/auto-form"
import { useFeatureFlag } from "@ttoss/react-feature-flags"
import { FEATURE_FLAGS } from "../feature-flags"
import { AuthLayout } from "./layouts/auth-layout"
import { loginFormSchema } from "./login-form-schema"

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

  // Create a schema with translated validation messages
  const schemaWithTranslations = {
    ...loginFormSchema.formSchema,
    properties: {
      ...loginFormSchema.formSchema.properties,
      email: {
        ...loginFormSchema.formSchema.properties.email,
        errorMessage: {
          format: t("emailValidation"),
        },
      },
      password: {
        ...loginFormSchema.formSchema.properties.password,
        errorMessage: {
          minLength: t("passwordValidation"),
        },
      },
    },
  }

  // Fixed: Use a more generic type that matches what AutoForm expects
  const handleSubmit = (values: { [key: string]: any }) => {
    handleLogin(values.email as string, values.password as string)
  }

  return (
    <>
      <Heading size="4" mb="4" className="text-gray-900 dark:text-white">
        {t("title")}
      </Heading>

      <AutoForm
        formSchema={schemaWithTranslations}
        fieldConfig={loginFormSchema.fieldConfig}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {loginError && (
          <Text color="red" size="2" className="mt-2">
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
      </AutoForm>

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
  const dashboardEnabled = useFeatureFlag(FEATURE_FLAGS.DASHBOARD_ENABLED)
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
      navigate({ to: dashboardEnabled ? "/dashboard" : "/projects" })
    }
  }, [authUser, isLoading, isError, navigate, dashboardEnabled])

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
