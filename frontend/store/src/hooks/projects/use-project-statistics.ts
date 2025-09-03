import { useCallback, useEffect, useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"

import { useOrganizationStore } from "../../services/organizations"
import type { TaskCollections } from "../../sql/types"

export interface ProjectStatistics {
  totalProjects: number
  projectsByStatus: {
    all: number
    started: number
    "on-hold": number
    completed: number
  }
  recentProjects: Array<{
    id: string
    name: string
    status: string
    updatedAt: number
  }>
  projectsWithTasks: number
  averageBudget: number
  totalBudget: number
}

export interface UseProjectStatisticsReturn {
  statistics: ProjectStatistics
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Custom hook for fetching project statistics and metrics
 * @returns Object with project statistics, loading state, and refetch function
 */
export function useProjectStatistics(): UseProjectStatisticsReturn {
  const { selectedOrganisation } = useOrganizationStore()
  const [statistics, setStatistics] = useState<ProjectStatistics>({
    totalProjects: 0,
    projectsByStatus: {
      all: 0,
      started: 0,
      "on-hold": 0,
      completed: 0,
    },
    recentProjects: [],
    projectsWithTasks: 0,
    averageBudget: 0,
    totalBudget: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const db: RxDatabase<TaskCollections> = useRxDB()

  const fetchStatistics = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!selectedOrganisation?.id || !db.projects) {
        setStatistics({
          totalProjects: 0,
          projectsByStatus: {
            all: 0,
            started: 0,
            "on-hold": 0,
            completed: 0,
          },
          recentProjects: [],
          projectsWithTasks: 0,
          averageBudget: 0,
          totalBudget: 0,
        })
        setIsLoading(false)
        return
      }

      // Fetch all projects for the organization
      const projectDocs = await db.projects
        .find({
          selector: {
            orgId: selectedOrganisation.id,
          },
        })
        .exec()

      const projects = projectDocs.map((doc) => doc.toJSON())
      const totalProjects = projects.length

      // Calculate status counts
      const projectsByStatus = {
        all: totalProjects,
        started: projects.filter((p) => p.status === "started").length,
        "on-hold": projects.filter((p) => p.status === "on-hold").length,
        completed: projects.filter((p) => p.status === "completed").length,
      }

      // Get recent projects (last 5, sorted by updatedAt)
      const recentProjects = projects
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, 5)
        .map((project) => ({
          id: project.id,
          name: project.name,
          status: project.status,
          updatedAt: project.updatedAt,
        }))

      // Count projects with tasks
      let projectsWithTasks = 0
      if (db.tasks) {
        const projectIds = new Set(projects.map((p) => p.id))
        const tasksWithProjects = await db.tasks
          .find({
            selector: {
              projectId: { $in: Array.from(projectIds) },
            },
          })
          .exec()

        const projectsHavingTasks = new Set(
          tasksWithProjects.map((task) => task.toJSON().projectId)
        )
        projectsWithTasks = projectsHavingTasks.size
      }

      // Calculate budget statistics
      const budgets = projects
        .map((p) => p.budget || 0)
        .filter((budget) => budget > 0)

      const totalBudget = budgets.reduce((sum, budget) => sum + budget, 0)
      const averageBudget =
        budgets.length > 0 ? totalBudget / budgets.length : 0

      setStatistics({
        totalProjects,
        projectsByStatus,
        recentProjects,
        projectsWithTasks,
        averageBudget: Math.round(averageBudget),
        totalBudget,
      })
    } catch (err) {
      console.error("Error fetching project statistics:", err)
      setError(
        err instanceof Error ? err.message : "Failed to fetch statistics"
      )
    } finally {
      setIsLoading(false)
    }
  }, [db.projects, db.tasks, selectedOrganisation?.id])

  const refetch = useCallback(async () => {
    await fetchStatistics()
  }, [fetchStatistics])

  useEffect(() => {
    fetchStatistics()
  }, [fetchStatistics])

  return {
    statistics,
    isLoading,
    error,
    refetch,
  }
}
