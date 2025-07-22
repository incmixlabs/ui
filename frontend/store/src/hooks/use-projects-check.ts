// Frontend/store/src/hooks/use-projects-check.ts
import { useEffect, useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"
import { useOrganizationStore } from "../services/organizations"
// Import from local types and services
import type { TaskCollections } from "../sql/types"

// Define a project item type that matches what our UI expects
// This is compatible with the Switcher component's SwitcherItem
export interface ProjectItem {
  id: string
  name: string
  // Additional properties that may be needed by the project store
  description?: string
  company?: string
  logo?: string
  status?: string
  // Add any other necessary fields here
}

/**
 * Custom hook to check if any projects exist for the current organization
 * and return project data for use in components like the project switcher
 * @returns Object containing projects list, hasProjects flag, and loading state
 */
export function useProjectsCheck() {
  const { selectedOrganisation } = useOrganizationStore()
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [hasProjects, setHasProjects] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [firstProjectId, setFirstProjectId] = useState<string | null>(null)
  const db: RxDatabase<TaskCollections> = useRxDB()

  useEffect(() => {
    let cancelled = false

    const fetchProjects = async () => {
      setIsLoading(true)

      try {
        // Only check if we have a selected organization and database is available
        if (!selectedOrganisation?.id || !db.formProjects) {
          if (cancelled) return
          setProjects([])
          setHasProjects(false)
          setFirstProjectId(null)
          setIsLoading(false)
          return
        }

        // Get all projects from formProjects collection
        const projectDocs = await db.formProjects.find().exec()

        if (cancelled) return

        // Filter projects by organization ID in memory using a type-safe approach
        const filteredDocs = projectDocs.filter((doc) => {
          const docData = doc.toJSON()
          // Use a type-safe approach to check for organization ID
          // It could be stored as orgId, organizationId, or org_id in the schema
          return (
            (docData as any).orgId === selectedOrganisation.id ||
            (docData as any).organizationId === selectedOrganisation.id ||
            (docData as any).org_id === selectedOrganisation.id
          )
        })

        const projectsExist = filteredDocs && filteredDocs.length > 0
        setHasProjects(projectsExist)

        if (projectsExist) {
          // Convert RxDocuments to ProjectItem objects that are compatible with the Switcher
          const projectItems: ProjectItem[] = filteredDocs.map((doc) => {
            const docData = doc.toJSON()

            return {
              id: doc.id,
              name: docData.name || `Project ${doc.id.substring(0, 6)}`,
              description: docData.description,
              company: docData.company,
              status: docData.status,
              logo: docData.logo,
              // Add other fields as needed
            }
          })

          if (cancelled) return
          setProjects(projectItems)

          // If projects exist, set the first one's ID
          if (projectItems[0]) {
            setFirstProjectId(projectItems[0].id)
          }
        } else {
          if (cancelled) return
          setProjects([])
          setFirstProjectId(null)
        }
      } catch (error) {
        if (cancelled) return
        console.error("Error fetching projects:", error)
        setProjects([])
        setHasProjects(false)
        setFirstProjectId(null)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchProjects()

    // Cleanup function to prevent state updates after unmounting
    return () => {
      cancelled = true
    }
  }, [db, selectedOrganisation])

  return {
    projects,
    hasProjects,
    isLoading,
    firstProjectId,
  }
}

export default useProjectsCheck
