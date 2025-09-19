import * as React from "react"

import { useAuth } from "@auth"
import { useOrganizationStore, useProjectStore } from "@incmix/store"
import { useCreateOrganization, useOrganizations } from "@orgs/utils"
import { Switcher, type SwitcherItem } from "./switcher"

export function OrgSwitcher() {
  const { organizations, isLoading } = useOrganizations()
  const { selectedOrganisation, setSelectedOrganisation } =
    useOrganizationStore()
  const { setSelectedProject, selectedProject } = useProjectStore()

  const { handleCreateOrganization, isCreatingOrganization } =
    useCreateOrganization(false)

  const { authUser } = useAuth()

  React.useEffect(() => {
    if (!selectedOrganisation) setSelectedOrganisation(organizations?.[0])
    else {
      const found = organizations?.find((o) => o.id === selectedOrganisation.id)
      if (!found) setSelectedOrganisation(organizations?.[0])
    }
  }, [selectedOrganisation, organizations, setSelectedOrganisation])

  React.useEffect(() => {
    if (!organizations?.length && !isLoading) {
      const email = authUser?.email
      if (email && typeof email === "string" && email.length > 0) {
        const username = email.split("@")[0]
        if (username && username.length > 0) {
          handleCreateOrganization(username, username, [])
        }
      }
    }
  }, [
    organizations?.length,
    authUser?.email,
    isLoading,
    isCreatingOrganization,
    handleCreateOrganization,
  ])
  if (isLoading || isCreatingOrganization) return <div>Loading...</div>
  if (!selectedOrganisation) return null

  return (
    <Switcher
      switchedItem={selectedOrganisation as SwitcherItem | null}
      items={organizations as SwitcherItem[]}
      setSwitchedItem={(id: string | null) => {
        const org = organizations.find((o) => o.id === id) || null
        if (org) {
          // Check if we're changing to a different organization
          const isChangingOrg = selectedOrganisation?.id !== org.id

          // Update the selected organization
          setSelectedOrganisation(org)

          // If we're changing organizations, we need to reset the selected project
          // since it might not belong to the new organization
          if (isChangingOrg && selectedProject) {
            console.log("Organization changed, resetting selected project")

            // Clear the selected project - it will get updated by ProjectSwitcher
            // once it re-renders with the filtered projects for the new organization
            setSelectedProject(undefined)
          }
        }
      }}
      title="Organizations"
    />
  )
}
