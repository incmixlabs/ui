import type { Organization } from "@incmix/utils/types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface OrganizationStore {
  selectedOrganisation?: Organization
  setSelectedOrganisation: (org?: Organization) => void
}

const organizationStore = create<OrganizationStore>()(
  persist(
    (set) => {
      return {
        setSelectedOrganisation: (org) => set({ selectedOrganisation: org }),
      }
    },
    {
      name: "organization-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useOrganizationStore = () =>
  organizationStore((state) => ({
    selectedOrganisation: state.selectedOrganisation,
    setSelectedOrganisation: state.setSelectedOrganisation,
  }))
