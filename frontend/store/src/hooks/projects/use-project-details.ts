import { useCallback, useEffect, useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"

import type { ProjectDocType, TaskCollections } from "../../sql/types"

export interface UseProjectDetailsReturn {
  project: ProjectDocType | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Custom hook for fetching a single project by ID
 * @param projectId The ID of the project to fetch
 * @returns Object with project data, loading state, and refetch function
 */
export function useProjectDetails(
  projectId: string | null
): UseProjectDetailsReturn {
  const [project, setProject] = useState<ProjectDocType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const db: RxDatabase<TaskCollections> = useRxDB()

  const fetchProject = useCallback(async () => {
    if (!projectId || !db.projects) {
      setProject(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const projectDoc = await db.projects
        .findOne({
          selector: { id: projectId },
        })
        .exec()

      if (projectDoc) {
        setProject(projectDoc.toJSON())
      } else {
        setProject(null)
        setError(`Project with ID ${projectId} not found`)
      }
    } catch (err) {
      console.error("Error fetching project:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch project")
      setProject(null)
    } finally {
      setIsLoading(false)
    }
  }, [db.projects, projectId])

  const refetch = useCallback(async () => {
    await fetchProject()
  }, [fetchProject])

  useEffect(() => {
    fetchProject()
  }, [fetchProject])

  return {
    project,
    isLoading,
    error,
    refetch,
  }
}
