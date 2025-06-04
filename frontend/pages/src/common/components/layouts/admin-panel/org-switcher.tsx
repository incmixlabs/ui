import * as React from "react"

import { useOrganizationStore } from "@incmix/store"
import { useOrganizations } from "@orgs/utils"
import { Switcher, type SwitcherItem } from "./switcher"

export function OrgSwitcher() {
  const { organizations, isLoading } = useOrganizations()
  const { selectedOrganisation, setSelectedOrganisation } =
    useOrganizationStore()

  React.useEffect(() => {
    if (!selectedOrganisation) setSelectedOrganisation(organizations?.[0])
    else {
      const found = organizations?.find((o) => o.id === selectedOrganisation.id)
      if (!found) setSelectedOrganisation(organizations?.[0])
    }
  }, [selectedOrganisation, organizations, setSelectedOrganisation])

  if (isLoading) return <div>Loading...</div>
  if (!selectedOrganisation) return null

  return (
    <Switcher
      switchedItem={
        selectedOrganisation as SwitcherItem | null }
      items={organizations as SwitcherItem[]}  
      setSwitchedItem={(id: string | null) => {
        const org = organizations.find((o) => o.id === id) || null;
        if (org) {
          setSelectedOrganisation(org);
        }
      }}
      title="Organizations"
    />
  )
}
