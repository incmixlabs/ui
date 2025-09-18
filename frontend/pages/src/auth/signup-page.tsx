import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Flex, Heading, ReactiveButton, Text } from "@incmix/ui"
import AutoForm from "@incmix/ui/auto-form"
import { AUTH_API_URL } from "@incmix/ui/constants"
import type { AuthUser } from "@incmix/utils/types"

import { AuthLayout } from "./layouts"
import { signupFormSchema } from "./signup-form-schema"

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

      // Parse the response data
      const userData = await response.json()

      // Return with proper typing as ExtendedAuthUser
      return {
        email: userData.email,
        emailVerified: userData.emailVerified,
        id: userData.id,
        slug: "",
        userId: userData.id,
        userType: userData.userType,
        isSuperAdmin: userData.isSuperAdmin,
      } as AuthUser
    },
    onSuccess: (data) => {
      setErrorMessage(null)

      // Store user data in localStorage for retrieval after onboarding
      localStorage.setItem(
        "signupUserData",
        JSON.stringify({
          email: data.email,
          userId: data.id,
        })
      )

      // Redirect to onboarding page
      navigate({ to: "/onboarding" })
    },
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
  })

  // Create a schema with translated validation messages
  const schemaWithTranslations = {
    ...signupFormSchema.formSchema,
    properties: {
      ...signupFormSchema.formSchema.properties,
      name: {
        ...signupFormSchema.formSchema.properties.name,
        errorMessage: {
          minLength: t("nameValidation"),
        },
      },
      email: {
        ...signupFormSchema.formSchema.properties.email,
        errorMessage: {
          format: t("emailValidation"),
        },
      },
      password: {
        ...signupFormSchema.formSchema.properties.password,
        errorMessage: {
          minLength: t("passwordValidation"),
        },
      },
    },
  }

  // Handle form submission
  const handleSubmit = (values: { [key: string]: any }) => {
    signupMutation.mutate({
      name: values.name as string,
      email: values.email as string,
      password: values.password as string,
    })
  }

  return (
    <>
      <Heading size="4" mb="4" align="center">
        {t("title")}
      </Heading>

      <Flex direction="column" gap="4">
        <AutoForm
          formSchema={schemaWithTranslations}
          fieldConfig={signupFormSchema.fieldConfig}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {signupMutation.isError && (
            <Text color="red" size="2" className="mt-2">
              {errorMessage}
            </Text>
          )}

          {signupMutation.isSuccess && (
            <Text color="green" size="2" className="mt-2">
              {t("signupSuccess")}
            </Text>
          )}

          <ReactiveButton
            type="submit"
            loading={signupMutation.isPending}
            success={signupMutation.isSuccess}
            className="w-full"
          >
            {t("submit")}
          </ReactiveButton>
        </AutoForm>
      </Flex>

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
