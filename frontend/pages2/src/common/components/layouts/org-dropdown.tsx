import { useOrganizationStore } from "@incmix/store"
import { Select } from "@incmix/ui"
import { useOrganizations } from "@orgs/utils"
import { useEffect } from "react"

const OrgDropdown = () => {
  const { organizations, isLoading, isError } = useOrganizations()
  const { selectedOrganisation, setSelectedOrganisation } =
    useOrganizationStore()

  useEffect(() => {
    if (!selectedOrganisation) setSelectedOrganisation(organizations?.[0])
    else {
      const found = organizations?.find((o) => o.id === selectedOrganisation.id)
      if (!found) setSelectedOrganisation(organizations?.[0])
    }
  }, [selectedOrganisation, organizations, setSelectedOrganisation])

  return (
    <Select.Root
      value={selectedOrganisation?.id}
      onValueChange={(value) =>
        setSelectedOrganisation(organizations.find((o) => o.id === value))
      }
    >
      <Select.Trigger
        className="w-full max-w-96"
        placeholder={isLoading ? "Loading" : "Select Organization"}
      />

      <Select.Content>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching organizations</div>}
        {organizations?.length &&
          organizations.map((org) => (
            <Select.Item value={org.id} key={org.id}>
              {org.name}
            </Select.Item>
          ))}
      </Select.Content>
    </Select.Root>
  )
}

export default OrgDropdown
