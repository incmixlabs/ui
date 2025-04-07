import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useQuery } from "@tanstack/react-query"
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

  useEffect(() => {
    console.log({ changes })
  }, [changes])

  const { data } = useQuery({
    queryKey: ["roles-permissions"],
    queryFn: getRolesPermissions,
  })

  const [rawPermissions, setRawPermissions] = useState<PermissionsResponse[]>(
    []
  )

  useEffect(() => {
    setRawPermissions(data?.permissions ?? [])
  }, [data])

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
