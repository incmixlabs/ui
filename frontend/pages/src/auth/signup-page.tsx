import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { FormField } from "@incmix/ui"
import { Box, Flex, Heading, ReactiveButton, Text } from "@incmix/ui"
import { AUTH_API_URL } from "@incmix/ui/constants"
import type { AuthUser } from "@incmix/utils/types"

import { AuthLayout } from "./layouts"

function SignupForm() {
  const { t } = useTranslation(["signup", "common"])
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const signupMutation = useMutation<
    AuthUser,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: async ({ name, email, password }) => {
      const response = await fetch(`${AUTH_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName: name, email, password }),
        credentials: "include",
      })
      if (!response.ok) {
        const data = (await response.json()) as any
        throw new Error(data.message || t("error.signup"))
      }
      const user = (await response.json()) as AuthUser
      return {
        email: user.email,
        emailVerified: user.emailVerified,
        id: user.id,
        slug: "",
        userId: user.id,
        userType: user.userType,
      }
    },
    onSuccess: (data) => {
      setErrorMessage(null)

      navigate({ to: "/welcome", search: { email: data.email } })
    },
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
  })

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      signupMutation.mutate(value)
    },
  })

  return (
    <>
      <Heading size="4" mb="4" align="center">
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
            name="name"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().min(1, t("nameValidation")),
            }}
          >
            {(field) => (
              <FormField name="name" label={t("common:name")} field={field} />
            )}
          </form.Field>

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
              onChange: z.string().min(6, t("passwordValidation")),
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

          {signupMutation.isError && (
            <Text color="red" size="2">
              {errorMessage}
            </Text>
          )}

          {signupMutation.isSuccess && (
            <Text color="green" size="2">
              {t("signupSuccess")}
            </Text>
          )}

          <ReactiveButton
            type="submit"
            loading={signupMutation.isPending}
            success={signupMutation.isSuccess}
          >
            {t("submit")}
          </ReactiveButton>
        </Flex>
      </form>

      <Box mt="4" className="text-center">
        <Link to="/login">
          <Text color="blue">{t("loginPrompt")}</Text>
        </Link>
      </Box>
    </>
  )
}

function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  )
}

export default SignupPage