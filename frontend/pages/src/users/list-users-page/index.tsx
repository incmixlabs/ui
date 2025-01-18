"use client"
import { useOrganizationStore } from "@incmix/store"
import { PageLayout } from "../../common/components/layouts/page-layout"

import { I18n } from "@incmix/pages/i18n"
import { Flex, Spinner } from "@incmix/ui"
import { USERS_API_URL } from "@incmix/ui/constants"
import { createAbilityFromPermissions } from "@jsprtmnn/utils/casl"
import type { AppAbility, Permission } from "@jsprtmnn/utils/types"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Callout } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import AdminUsersTable from "./admin-users-table"
import OrgUsersTable from "./org-users-table"

const ListUsersPage = () => {
  const { selectedOrganisation } = useOrganizationStore()

  const { data: permissions, isLoading } = useQuery<Permission[]>({
    queryKey: ["user-permissions", selectedOrganisation?.id],
    queryFn: async () => {
      const searchParams = new URLSearchParams()
      if (selectedOrganisation?.id)
        searchParams.append("orgId", selectedOrganisation?.id)

      const res = await fetch(
        `${USERS_API_URL}/permissions?${searchParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "accept-language": I18n.language ?? "en" },
        }
      )
      return await res.json()
    },
  })
  if (isLoading)
    return (
      <PageLayout>
        <Flex
          className="h-[calc((100vh-var(--navbar-height))-3rem)]"
          align="center"
          justify="center"
        >
          <Spinner className="size-10" />
        </Flex>
      </PageLayout>
    )

  const ability = createAbilityFromPermissions(permissions ?? [])

  return (
    <PageLayout>
      <UserTable ability={ability} />
    </PageLayout>
  )
}

const UserTable: React.FC<{ ability: AppAbility }> = ({ ability }) => {
  if (ability.can("read", "User")) {
    return <AdminUsersTable />
  }

  if (ability.can("read", "Member")) {
    return <OrgUsersTable />
  }

  return (
    <Callout.Root color="red">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        You do not have the necessary permissions to view this page.
      </Callout.Text>
    </Callout.Root>
  )
}

export default ListUsersPage
