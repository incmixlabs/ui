import { LoadingPage } from "@common"
import { zodResolver } from "@hookform/resolvers/zod"
import { I18n } from "@incmix/pages/i18n"
import { CardContainer, ReactiveButton, toast } from "@incmix/ui"
import { Box, Container, Flex, Heading, Text } from "@incmix/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@incmix/ui"
import { AUTH_API_URL } from "@incmix/ui/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { useForm as useHookForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { setupGoogleAuthCallbackListener, useAuth } from "./hooks/auth"
import { ResetPasswordRoute } from "./routes"

function ResetPasswordForm() {
  const { code, email } = ResetPasswordRoute.useSearch()
  const navigate = useNavigate()
  const { t } = useTranslation(["login", "resetPassword", "common"])
  const { mutate, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: async ({
      email,
      code,
      newPassword,
    }: { email: string; code: string; newPassword: string }) => {
      console.log(code, email)

      const response = await fetch(`${AUTH_API_URL}/reset-password/forget`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
        credentials: "include",
        body: JSON.stringify({ email, code: String(code), newPassword }),
      })
      const data = (await response.json()) as { message: string }
      if (!response.ok) throw new Error(data.message)
      return data
    },
    onSuccess: ({ message }) => {
      toast.success(message)
      navigate({ to: "/login" })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // Define form schema
  const formSchema = z.object({
    newPassword: z.string().min(1, t("login:passwordValidation")),
  })

  // Use react-hook-form
  const form = useHookForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (code && email) mutate({ newPassword: values.newPassword, code, email })
  }

  return (
    <CardContainer>
      <Heading size="4" mb="4" align="center">
        {t("resetPassword:title")}
      </Heading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Flex direction="column" gap="4">
            <FormField
              control={form.control}
              name="newPassword"
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
            {isError && (
              <Text color="red" size="2">
                {error.message}
              </Text>
            )}

            <ReactiveButton
              type="submit"
              color="blue"
              loading={isPending}
              success={isSuccess}
              className="w-full"
            >
              {t("resetPassword:submit")}
            </ReactiveButton>
          </Flex>
        </form>
      </Form>
      <Box mt="4" className="text-center">
        <Link to="/login">
          <Text color="blue">{t("resetPassword:loginPrompt")}</Text>
        </Link>
      </Box>
    </CardContainer>
  )
}

function ResetPasswordPage() {
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
          <ResetPasswordForm />
        </Flex>
      </Container>
    )
  }

  return null
}

export default ResetPasswordPage
