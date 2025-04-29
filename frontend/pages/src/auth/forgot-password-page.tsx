import { LoadingPage } from "@common"
import { I18n } from "@incmix/pages/i18n"
import { ReactiveButton, toast } from "@incmix/ui"
import { Box, Flex, Heading, Text } from "@incmix/ui"
import { AUTH_API_URL } from "@incmix/ui/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { setupGoogleAuthCallbackListener, useAuth } from "./hooks/auth"
import { AuthLayout } from "./layouts/auth-layout"
import { forgotPasswordSchema } from "./forgot-password-form-schema"
import AutoForm from "@incmix/ui/auto-form"

function ForgotPasswordForm() {
  const { t } = useTranslation(["login", "forgotPassword", "common"])
  const [formValues, setFormValues] = useState({ email: "" })

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

  // Create a schema with translated validation messages
  const schemaWithTranslations = {
    ...forgotPasswordSchema.formSchema,
    properties: {
      ...forgotPasswordSchema.formSchema.properties,
      email: {
        ...forgotPasswordSchema.formSchema.properties.email,
        errorMessage: {
          format: t("login:emailValidation"),
        },
      },
    },
  }

  // Handle form submission
  const handleSubmit = (values: { [key: string]: any }) => {
    mutate({ email: values.email as string })
  }

  // Handle form value changes
  const handleValuesChange = (values: any) => {
    setFormValues(values)
  }

  return (
    <>
      <Heading size="4" mb="4" className="text-gray-900 dark:text-white">
        {t("forgotPassword:title")}
      </Heading>

      <AutoForm
        formSchema={schemaWithTranslations}
        fieldConfig={forgotPasswordSchema.fieldConfig}
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
      </AutoForm>

      <Box mt="4" className="text-center">
        <Link to="/login">
          <Text color="blue">{t("forgotPassword:loginPrompt")}</Text>
        </Link>
      </Box>
    </>
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
      <AuthLayout>
        <ForgotPasswordForm />
      </AuthLayout>
    )
  }

  return null
}

export default ForgotPasswordPage
