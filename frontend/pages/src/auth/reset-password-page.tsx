import { LoadingPage } from "@common"
import { I18n } from "@incmix/pages/i18n"
import { CardContainer, ReactiveButton, toast } from "@incmix/ui"
import { Box, Container, Flex, Heading, Text } from "@incmix/ui"
import AutoForm from "@incmix/ui/auto-form"
import { AUTH_API_URL } from "@incmix/ui/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { setupGoogleAuthCallbackListener, useAuth } from "./hooks/auth"
import { resetPasswordSchema } from "./reset-password-form-schema"
import { ResetPasswordRoute } from "./routes"

function ResetPasswordForm() {
  const { code, email } = ResetPasswordRoute.useSearch()
  const navigate = useNavigate()
  const { t } = useTranslation(["login", "resetPassword", "common"])
  const [formValues, setFormValues] = useState({ newPassword: "" })

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

  // Create a schema with translated validation messages
  const schemaWithTranslations = {
    ...resetPasswordSchema.formSchema,
    properties: {
      ...resetPasswordSchema.formSchema.properties,
      newPassword: {
        ...resetPasswordSchema.formSchema.properties.newPassword,
        errorMessage: {
          minLength: t("login:passwordValidation"),
        },
      },
    },
  }

  // Handle form submission
  const handleSubmit = (values: { [key: string]: any }) => {
    if (code && email) {
      mutate({
        newPassword: values.newPassword as string,
        code,
        email,
      })
    }
  }

  // Handle form value changes
  const handleValuesChange = (values: any) => {
    setFormValues(values)
  }

  return (
    <CardContainer>
      <Heading size="4" mb="4" align="center">
        {t("resetPassword:title")}
      </Heading>

      <AutoForm
        formSchema={schemaWithTranslations}
        fieldConfig={resetPasswordSchema.fieldConfig}
        onSubmit={handleSubmit}
        onValuesChange={handleValuesChange}
        values={formValues}
        className="space-y-4"
      >
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
      </AutoForm>

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
