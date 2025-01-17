import { LoadingPage } from "@common"
import { I18n } from "@incmix-fe/pages/i18n"
import { CardContainer, FormField, ReactiveButton, toast } from "@incmix-fe/ui"
import { AUTH_API_URL } from "@incmix-fe/ui/constants"
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { Form } from "houseform"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { setupGoogleAuthCallbackListener, useAuth } from "./hooks/auth"

function ForgotPasswordForm() {
  const { t } = useTranslation(["login", "forgotPassword", "common"])
  const { mutate, data, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await fetch(`${AUTH_API_URL}/reset-password/send`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      })
      const data = (await response.json()) as { message: string }
      if (!response.ok) throw new Error(data.message)
      return data
    },
    onSuccess: ({ message }) => {
      toast.success(message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (values: { email: string }) => {
    mutate({ email: values.email })
  }

  return (
    <CardContainer>
      <Heading size="4" mb="4" align="center">
        {t("forgotPassword:title")}
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
                validation={z.string().email(t("login:emailValidation"))}
              />
              {isError && (
                <Text color="red" size="2">
                  {error.message}
                </Text>
              )}
              {isSuccess && (
                <Text color="green" size="2">
                  {data.message}
                </Text>
              )}

              <ReactiveButton
                color="blue"
                type="submit"
                loading={isPending}
                success={isSuccess}
                className="w-full"
              >
                {t("forgotPassword:submit")}
              </ReactiveButton>
            </Flex>
          </form>
        )}
      </Form>
      <Box mt="4" className="text-center">
        <Link to="/login">
          <Text color="blue">{t("forgotPassword:loginPrompt")}</Text>
        </Link>
      </Box>
    </CardContainer>
  )
}

function ForgotPasswordPage() {
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
          <ForgotPasswordForm />
        </Flex>
      </Container>
    )
  }

  return null
}

export default ForgotPasswordPage
