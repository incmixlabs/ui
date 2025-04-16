import { LoadingPage } from "@common"
import { Flex, Heading } from "@incmix/ui"
import { Project1 } from "@incmix/ui/dashboard"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../auth"

const DashboardProject1: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()

  if (isLoading) return <LoadingPage />
  if (!authUser) return null

  return (
    <DashboardLayout breadcrumbItems={[]}>
      <Flex direction="column" gap="6">
        <Heading size="6">{t("dashboard:title")}</Heading>
        <Project1 />
      </Flex>
    </DashboardLayout>
  )
}

export default DashboardProject1
