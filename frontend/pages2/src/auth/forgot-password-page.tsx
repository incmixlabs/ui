import { LoadingPage } from "@common"
import { I18n } from "@incmix/pages/i18n"
import { CardContainer, FormField, ReactiveButton, toast } from "@incmix/ui"
import { Box, Container, Flex, Heading, Text } from "@incmix/ui"
import { AUTH_API_URL } from "@incmix/ui/constants"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-form-adapter"
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

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: ({ value }) => {
      mutate({ email: value.email })
    },
  })

  return (
    <CardContainer>
      <Heading size="4" mb="4" align="center">
        {t("forgotPassword:title")}
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
              onChange: z.string().email(t("login:emailValidation")),
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
