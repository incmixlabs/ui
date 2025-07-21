// Frontend/store/src/hooks/use-projects-check.ts
import { useState, useEffect } from 'react'
import { useRxDB } from 'rxdb-hooks'
import type { RxDatabase } from 'rxdb'
// Import from local types and services
import type { TaskCollections } from '../sql/types'
import { useOrganizationStore } from '../services/organizations'

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
    const fetchProjects = async () => {
      setIsLoading(true)
      
      try {
        // Only check if we have a selected organization and database is available
        if (!selectedOrganisation?.id || !db.formProjects) {
          setProjects([])
          setHasProjects(false)
          setFirstProjectId(null)
          setIsLoading(false)
          return
        }

        // Get projects from formProjects collection
        const projectDocs = await db.formProjects
          .find()
          .exec()

        const projectsExist = projectDocs && projectDocs.length > 0
        setHasProjects(projectsExist)
        
        if (projectsExist) {
          // Convert RxDocuments to ProjectItem objects that are compatible with the Switcher
          const projectItems: ProjectItem[] = projectDocs.map(doc => {
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
          
          setProjects(projectItems)
          
          // If projects exist, set the first one's ID
          if (projectItems[0]) {
            setFirstProjectId(projectItems[0].id)
          }
        } else {
          setProjects([])
          setFirstProjectId(null)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
        setHasProjects(false)
        setFirstProjectId(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [db, selectedOrganisation])

  return {
    projects,
    hasProjects,
    isLoading,
    firstProjectId
  }
}

export default useProjectsCheck
