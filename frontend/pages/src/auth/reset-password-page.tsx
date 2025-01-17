import { LoadingPage } from "@common"
import { I18n } from "@incmix-fe/pages/i18n"
import { CardContainer, FormField, ReactiveButton, toast } from "@incmix-fe/ui"
import { AUTH_API_URL } from "@incmix-fe/ui/constants"
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { Form } from "houseform"
import { useEffect } from "react"
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

  const handleSubmit = (values: { newPassword: string }) => {
    if (code && email) mutate({ newPassword: values.newPassword, code, email })
  }

  return (
    <CardContainer>
      <Heading size="4" mb="4" align="center">
        {t("resetPassword:title")}
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
                name="newPassword"
                label={t("common:password")}
                type="password"
                validation={z.string().min(1, t("login:passwordValidation"))}
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
        )}
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
