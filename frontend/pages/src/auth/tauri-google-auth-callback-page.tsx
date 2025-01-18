import { CardContainer } from "@incmix/ui"
import { useRunOnce } from "@incmix/ui"
import { Flex, Heading, Text } from "@radix-ui/themes"
import { useTranslation } from "react-i18next"
import TauriGoogleAuthCallbackRoute from "./routes/tauri-google-auth-callback"

function TauriGoogleAuthCallbackPage() {
  const { t } = useTranslation(["login"])
  const { state, code } = TauriGoogleAuthCallbackRoute.useSearch()

  useRunOnce(() => {
    const redirectUrl = `fihi-app://auth/callback?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`
    window.location.href = redirectUrl
  }, [state, code])

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "16px",
      }}
    >
      <CardContainer className="w-full max-w-md">
        <Flex direction="column" align="center" gap="4">
          <Heading size="4">{t("login:redirected")}</Heading>
          <Text size="2" align="center">
            {t("login:closeWindow")}
          </Text>
        </Flex>
      </CardContainer>
    </Flex>
  )
}

export default TauriGoogleAuthCallbackPage
