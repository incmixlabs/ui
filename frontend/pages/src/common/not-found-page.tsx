import { CardContainer } from "@incmix/ui"
import { Button, Flex, Heading, Text } from "@radix-ui/themes"
import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { PageLayout } from "./components/layouts/page-layout"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <PageLayout>{children}</PageLayout>
}

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation(["pageNotFound", "common"])

  return (
    <Layout>
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
            <Heading size="8">404</Heading>
            <Heading size="4">{t("pageNotFound:title")}</Heading>
            <Text size="2" align="center">
              {t("pageNotFound:message")}
            </Text>
            <Link to="/" style={{ width: "100%" }}>
              <Button className="w-full">{t("pageNotFound:backToHome")}</Button>
            </Link>
          </Flex>
        </CardContainer>
      </Flex>
    </Layout>
  )
}

export default NotFoundPage
