import { useCallback, useEffect, useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"

import { useOrganizationStore } from "../../services/organizations"
import type { ProjectDocType, TaskCollections } from "../../sql/types"

export interface ProjectQueryFilters {
  status?: string
  search?: string
  company?: string
}

export interface UseProjectsQueryReturn {
  projects: ProjectDocType[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  filteredProjects: ProjectDocType[]
  applyFilters: (filters: ProjectQueryFilters) => void
  clearFilters: () => void
}

/**
 * Custom hook for querying projects with filtering capabilities
 * @param initialFilters Optional initial filters to apply
 * @returns Object with projects data, loading state, and filter functions
 */
export function useProjectsQuery(
  initialFilters?: ProjectQueryFilters
): UseProjectsQueryReturn {
  const { selectedOrganisation } = useOrganizationStore()
  const [projects, setProjects] = useState<ProjectDocType[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectDocType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProjectQueryFilters>(
    initialFilters || {}
  )
  const db: RxDatabase<TaskCollections> = useRxDB()

  const fetchProjects = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!selectedOrganisation?.id || !db.projects) {
        setProjects([])
        setFilteredProjects([])
        setIsLoading(false)
        return
      }

      const projectDocs = await db.projects
        .find({
          selector: {
            orgId: selectedOrganisation.id,
          },
          sort: [{ updatedAt: "desc" }],
        })
        .exec()

      const projectsData = projectDocs.map((doc) => doc.toJSON())
      setProjects(projectsData)
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch projects")
      setProjects([])
      setFilteredProjects([])
    } finally {
      setIsLoading(false)
    }
  }, [db.projects, selectedOrganisation?.id])

  const applyFilters = useCallback(
    (newFilters: ProjectQueryFilters) => {
      setFilters(newFilters)

      let filtered = [...projects]

      // Apply status filter
      if (newFilters.status && newFilters.status !== "all") {
        filtered = filtered.filter(
          (project) => project.status === newFilters.status
        )
      }

      // Apply search filter
      if (newFilters.search) {
        const searchLower = newFilters.search.toLowerCase()
        filtered = filtered.filter(
          (project) =>
            project.name.toLowerCase().includes(searchLower) ||
            project.description.toLowerCase().includes(searchLower) ||
            project.company?.toLowerCase().includes(searchLower)
        )
      }

      // Apply company filter
      if (newFilters.company) {
        filtered = filtered.filter(
          (project) => project.company === newFilters.company
        )
      }

      setFilteredProjects(filtered)
    },
    [projects]
  )

  const clearFilters = useCallback(() => {
    setFilters({})
    setFilteredProjects(projects)
  }, [projects])

  const refetch = useCallback(async () => {
    await fetchProjects()
  }, [fetchProjects])

  // Initial fetch
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Apply filters whenever projects or filters change
  useEffect(() => {
    applyFilters(filters)
  }, [projects, filters, applyFilters])

  return {
    projects,
    filteredProjects,
    isLoading,
    error,
    refetch,
    applyFilters,
    clearFilters,
  }
}
