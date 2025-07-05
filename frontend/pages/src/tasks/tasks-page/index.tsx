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
  PageHeader,
  RoadmapView,
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

const TasksPage = () => {
  const { selectedOrganisation } = useOrganizationStore()
  // Define default project ID
  const [selectedProject, setSelectedProject] =
    useState<string>("default-project")
  const db: RxDatabase<TaskCollections> = useRxDB()

  const { useAI, setUseAI } = useAIFeaturesStore()

  // Get projects for the selected organization
  const { data: projects } = useQuery({
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
      {/*
        FIX: The entire page is now a flex column that fills the height of the main area.
      */}
      <Tabs.Root defaultValue="board" className="flex h-full flex-col">
        {/* HEADER AREA: This part is fixed and does not shrink. */}
        <Box className="flex-shrink-0 border-gray-200 border-b px-4 py-3 dark:border-gray-700">
          <Flex justify="between" align="center" className="w-full">
            <Tabs.List
              className="flex w-fit shrink-0 rounded-md bg-gray-3 shadow-none"
              aria-label="View options"
            >
              <Tabs.Trigger value="board">Board</Tabs.Trigger>
              <Tabs.Trigger value="list">List</Tabs.Trigger>
              <Tabs.Trigger value="table">Table</Tabs.Trigger>
              <Tabs.Trigger value="roadmap">Roadmap</Tabs.Trigger>
            </Tabs.List>

            <Flex align="center" gap="4">
              <Flex align="center" gap="2">
                <div className="text-sm">Use AI</div>
                <Switch checked={useAI} onCheckedChange={setUseAI} />
              </Flex>
              <AddTaskForm projectId="default-project" onSuccess={() => {}} />
            </Flex>
          </Flex>
        </Box>

        {/*
          CONTENT AREA: This wrapper is now the flexible part.
          - `flex-1`: Makes it take all available vertical space.
          - `overflow-y-auto`: Allows for vertical scrolling if needed.
          - `relative`: Provides a positioning context for its children.
        */}
        <Box className="relative flex-1 overflow-y-auto">
          <Tabs.Content value="board" className="h-full">
            <Board projectId={selectedProject || "default-project"} />
          </Tabs.Content>
          <Tabs.Content value="list" className="h-full">
            <ListBoard projectId={selectedProject || "default-project"} />
          </Tabs.Content>
          <Tabs.Content value="table" className="h-full">
            <TableView projectId={selectedProject || "default-project"} />
          </Tabs.Content>
          <Tabs.Content value="roadmap" className="h-full">
            <RoadmapView projectId={selectedProject || "default-project"} />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </DashboardLayout>
  )
}

export default TasksPage
