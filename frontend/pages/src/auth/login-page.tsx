import { LoadingPage } from "@common"
import { Box, Flex, Heading, Text } from "@incmix/ui"
import { ReactiveButton } from "@incmix/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@incmix/ui"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  setupGoogleAuthCallbackListener,
  useAuth,
  useGoogleLogin,
  useLogin,
} from "./hooks/auth"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm as useHookForm } from "react-hook-form"
import { z } from "zod"
import { AuthLayout } from "./layouts/auth-layout"

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

  // Define the form validation schema
  const formSchema = z.object({
    email: z.string().email(t("emailValidation")),
    password: z.string().min(1, t("passwordValidation")),
  })

  // Use react-hook-form instead of TanStack form
  const form = useHookForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleLogin(values.email, values.password)
  }

  return (
    <>
      <Heading size="4" mb="4" className="text-gray-900 dark:text-white">
        {t("title")}
      </Heading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Flex direction="column" gap="4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common:email")}</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common:password")}</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
      </Form>

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
