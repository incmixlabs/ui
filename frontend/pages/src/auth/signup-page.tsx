import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useForm as useHookForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Box, Flex, Heading, ReactiveButton, Text } from "@incmix/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@incmix/ui"
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

  // Define form schema
  const formSchema = z.object({
    name: z.string().min(1, t("nameValidation")),
    email: z.string().email(t("emailValidation")),
    password: z.string().min(6, t("passwordValidation")),
  })

  // Use react-hook-form
  const form = useHookForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signupMutation.mutate(values)
  }

  return (
    <>
      <Heading size="4" mb="4" align="center">
        {t("title")}
      </Heading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Flex direction="column" gap="4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common:name")}</FormLabel>
                  <FormControl>
                    <input
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
      </Form>

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
