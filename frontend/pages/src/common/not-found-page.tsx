import { CardContainer } from "@incmix/ui"
import { Button, Flex, Heading, Text } from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>
}

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation(["pageNotFound", "common"])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // If the current location is "/dashboard", redirect to "/dashboard/home"
    if (location.pathname === "/dashboard") {
      navigate({ to: "/dashboard/home", replace: true })
    }
  }, [location.pathname, navigate])

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
