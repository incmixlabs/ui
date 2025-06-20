// pages/tasks/index.tsx - Fixed horizontal scrolling
import {
  type TaskCollections,
  useAIFeaturesStore,
  useOrganizationStore,
} from "@incmix/store"

import {
  AddTaskForm,
  Board,
  Box,
  Card,
  Flex,
  ListBoard,
  Switch,
  TableView,
  Tabs,
} from "@incmix/ui"
import { CardContent } from "@incmix/ui/card"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"

import { CreateProjectForm } from "./create-project-form"

const TasksPage = () => {
  const { selectedOrganisation } = useOrganizationStore()
  // Define default project ID
  const [selectedProject, setSelectedProject] =
    useState<string>("default-project")
  const db: RxDatabase<TaskCollections> = useRxDB()

  const { useAI, setUseAI } = useAIFeaturesStore()

  // Get projects for the selected organization
  const { data: projects, refetch: refetchProjects } = useQuery({
    queryKey: ["projects", selectedOrganisation?.id],
    enabled: !!selectedOrganisation?.id && !!db.projects,
    queryFn: () => {
      if (!selectedOrganisation) return []
      return db.projects
        .find({
          selector: { orgId: selectedOrganisation.id },
          sort: [{ createdAt: "asc" }],
        })
        .exec()
    },
  })

  // Set first project as selected when projects load
  useEffect(() => {
    if (!selectedProject && projects?.length) {
      setSelectedProject(projects[0].id)
    }
  }, [projects, selectedProject])

  if (!selectedOrganisation) {
    return (
      <DashboardLayout>
        <Card.Root>
          <CardContent>
            <p className="text-center">
              Please add an organisation to manage projects
            </p>
          </CardContent>
        </Card.Root>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Main container - Natural height for vertical scrolling */}
      <Box className="flex min-h-screen flex-col">
        {/* Fixed Header Section - Project Selection */}
        <Box className="flex-shrink-0 border-gray-200 border-b bg-white dark:border-gray-700 dark:bg-gray-900">
          <Box className="p-4">
            {/* Project Selection and Creation */}
            <Flex justify="between" align="center">
              <Flex className="gap-4">
                <CreateProjectForm
                  onSuccess={(p) => {
                    refetchProjects()
                    setSelectedProject(p.id)
                  }}
                />
              </Flex>
              <Flex align="center" gap="4">
                {/* Use AI Toggle */}
                <Flex align="center" gap="2">
                  <div className="text-sm">Use AI</div>
                  <Switch checked={useAI} onCheckedChange={setUseAI} />
                </Flex>

                {/* Add Task Form - Always visible */}
                <AddTaskForm
                  projectId="default-project"
                  onSuccess={() => {
                    // You might want to implement a refetch function here
                    // if needed to update task lists after creation
                  }}
                />
              </Flex>
            </Flex>
          </Box>
        </Box>

        {/* Tabs Header - Fixed */}
        <Box className="flex-shrink-0 border-gray-200 border-b bg-white px-4 pb-2 dark:border-gray-700 dark:bg-gray-900">
          <Tabs.Root defaultValue="board">
            <Tabs.List
              className="flex w-fit shrink-0 rounded-md bg-gray-3 shadow-none"
              aria-label="View options"
            >
              <Tabs.Trigger
                className="flex cursor-pointer select-none px-4 py-2 text-[15px] text-mauve11 leading-none outline-none first:rounded-tl-md last:rounded-tr-md hover:text-indigo-9 data-[state=active]:text-indigo-9"
                value="board"
              >
                Board (Kanban)
              </Tabs.Trigger>
              <Tabs.Trigger
                className="flex cursor-pointer select-none px-4 py-2 text-[15px] text-mauve11 leading-none outline-none first:rounded-tl-md last:rounded-tr-md hover:text-indigo-9 data-[state=active]:text-indigo-9"
                value="list"
              >
                List
              </Tabs.Trigger>
              <Tabs.Trigger
                className="flex cursor-pointer select-none px-4 py-2 text-[15px] text-mauve11 leading-none outline-none first:rounded-tl-md last:rounded-tr-md hover:text-indigo-9 data-[state=active]:text-indigo-9"
                value="table"
              >
                Table
              </Tabs.Trigger>
            </Tabs.List>

            {/* Content Area - Natural height, allows page to scroll vertically */}
            <Tabs.Content value="board">
              <Board projectId={selectedProject || "default-project"} />
            </Tabs.Content>

            <Tabs.Content value="list">
              <ListBoard projectId={selectedProject || "default-project"} />
            </Tabs.Content>

            <Tabs.Content value="table">
              <TableView projectId={selectedProject || "default-project"} />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </DashboardLayout>
  )
}

export default TasksPage
