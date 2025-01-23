"use client";
import { I18n } from "@incmix/pages/i18n"
import { AUTH_API_URL } from "@incmix/ui/constants"
import { cn } from "@incmix/ui/utils"
import {
  Container,
  Flex,
  Spinner,
  Text,
  ThickCheckIcon,
} from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import EmailVerificationRoute from "./routes/email-verification"

function EmailVerificationPage() {
  const { code, email } = EmailVerificationRoute.useSearch()

  const { t } = useTranslation(["emailVerification", "common"])
  const navigate = useNavigate()

  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["verify-email"],
    queryFn: async () => {
      const response = await fetch(`${AUTH_API_URL}/verification-email`, {
        method: "POST",
        body: JSON.stringify({ email, code: String(code) }),
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
      })
      const data: { message: string } = (await response.json()) as any
      if (!response.ok) {
        throw new Error(data.message)
      }
      return data
    },
  })

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate({ to: "/login" })
      }, 500)

      return () => clearTimeout(timer)
    }

    return () => {}
  }, [isSuccess, navigate])

  if (isError) {
    return (
      <Container>
        <Flex height="100vh" align="center" justify="center">
          <Flex gap="2" align="center" className={cn("rounded p-8")}>
            <Text className="font-bold text-lg text-red-500">
              {error.message}
            </Text>
          </Flex>
        </Flex>
      </Container>
    )
  }

  return (
    <Container>
      <Flex height="100vh" align="center" justify="center">
        <Flex gap="2" align="center" className={cn("rounded p-8")}>
          {isLoading && <Spinner className="size-10" />}
          {isSuccess && <ThickCheckIcon className="size-10 text-green-7" />}
          {isLoading && (
            <Text className="font-bold text-lg">{t("verifying")}</Text>
          )}
          {isSuccess && (
            <Text className="font-bold text-lg">{data.message}</Text>
          )}
        </Flex>
      </Flex>
    </Container>
  )
}

export default EmailVerificationPage
