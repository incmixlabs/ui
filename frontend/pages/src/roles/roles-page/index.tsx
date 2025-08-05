import { useAuth } from "@auth"
import { useOrganizationStore } from "@incmix/store"
import { Callout, Spinner } from "@incmix/ui"
import { Flex } from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useQuery } from "@tanstack/react-query"
import { AlertCircleIcon } from "lucide-react"
import type React from "react"
import { createContext, useEffect, useState } from "react"
import { type Change, getRolesPermissions } from "./actions"
import PermissonsTable from "./permissions-table"
import type { PermissionsResponse, Role } from "./types"

export const permissionsContext = createContext<{
  changes: Change[]
  setChanges: React.Dispatch<React.SetStateAction<Change[]>>
  rawPermissions: PermissionsResponse[]
  setRawPermissions: React.Dispatch<React.SetStateAction<PermissionsResponse[]>>
  roles: Role[]
}>({
  changes: [],
  setChanges: (prev) => prev,
  rawPermissions: [],
  setRawPermissions: (prev) => prev,
  roles: [],
})

const RolesPage = () => {
  const [changes, setChanges] = useState<Change[]>([])
  const { selectedOrganisation } = useOrganizationStore()
  const { authUser } = useAuth()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "roles-permissions",
      selectedOrganisation?.id,
      authUser?.isSuperAdmin,
    ],
    queryFn: () =>
      getRolesPermissions(selectedOrganisation?.id, authUser?.isSuperAdmin),
    enabled: !!selectedOrganisation?.id,
  })

  const [rawPermissions, setRawPermissions] = useState<PermissionsResponse[]>(
    []
  )

  useEffect(() => {
    setRawPermissions(data?.permissions ?? [])
  }, [data])

  if (isLoading) {
    return (
      <DashboardLayout breadcrumbItems={[{ label: "Roles", url: "/roles" }]}>
        <Flex
          className="h-[calc((100vh-var(--navbar-height))-3rem)]"
          align="center"
          justify="center"
        >
          <Spinner className="size-10" />
        </Flex>
      </DashboardLayout>
    )
  }

  if (isError) {
    return (
      <DashboardLayout breadcrumbItems={[{ label: "Roles", url: "/roles" }]}>
        <Callout.Root variant="surface" color="red">
          <Callout.Icon>
            <AlertCircleIcon className="size-4" />
          </Callout.Icon>
          <Callout.Text>{error.message}</Callout.Text>
        </Callout.Root>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout breadcrumbItems={[{ label: "Roles", url: "/roles" }]}>
      <permissionsContext.Provider
        value={{
          changes,
          setChanges,
          rawPermissions,
          setRawPermissions,
          roles: data?.roles ?? [],
        }}
      >
        <PermissonsTable />
      </permissionsContext.Provider>
    </DashboardLayout>
  )
}

export default RolesPage
