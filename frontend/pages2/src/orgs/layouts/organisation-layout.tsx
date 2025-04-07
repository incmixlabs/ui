import { Container, Flex, Tabs } from "@incmix/ui"
import { useNavigate } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"

type OrganizationLayoutProps = {
  children: React.ReactNode
  activeTab: "users" | "env-vars"
}

export const OrganizationLayout: React.FC<OrganizationLayoutProps> = ({
  children,
  activeTab,
}) => {
  const { t } = useTranslation(["organizationDetails", "common"])
  const navigate = useNavigate()

  return (
    <Container size="3">
      <Flex direction="column" gap="4">
        <Tabs.Root
          value={activeTab}
          onValueChange={(value) =>
            navigate({ to: `/organization/$orgHandle/${value}` })
          }
        >
          <Tabs.List>
            <Tabs.Trigger value="users">{t("common:users")}</Tabs.Trigger>
            <Tabs.Trigger value="env-vars">
              {t("environmentVariables")}
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
        {children}
      </Flex>
    </Container>
  )
}
