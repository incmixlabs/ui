import { LoadingPage } from "@common"
import { I18n } from "@incmix/pages/i18n"
import { FormField, ReactiveButton, toast } from "@incmix/ui"
import { Box, Flex, Heading, Text } from "@incmix/ui"
import { AUTH_API_URL } from "@incmix/ui/constants"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import type React from "react"
import { setupGoogleAuthCallbackListener, useAuth } from "./hooks/auth"

// AuthLayout component to match the onboarding style
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
    <>
      <Heading size="4" mb="4" className="text-gray-900 dark:text-white">
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
