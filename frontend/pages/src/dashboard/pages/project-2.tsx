import { LoadingPage } from "@common"
import { Flex, Heading, Project2 } from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../auth"

const DashboardProject2: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()

  if (isLoading) return <LoadingPage />
  if (!authUser) return null

  return (
    <DashboardLayout breadcrumbItems={[]}>
      <Flex direction="column" gap="6">
        <Heading size="6">{t("dashboard:title")}</Heading>
        <Project2 />
      </Flex>
    </DashboardLayout>
  )
}

export default DashboardProject2
