// pages/tasks/index.tsx - Fixed horizontal scrolling
import {
  useAIFeaturesStore,
  useOrganizationStore,
  useProjectStore,
  useProjectsCheck,
} from "@incmix/store"
import type { Project } from "@incmix/utils/schema"

import {
  AddTaskForm,
  Board,
  Box,
  Card,
  Flex,
  ListBoard,
  RoadmapView,
  Switch,
  TableView,
  Tabs,
} from "@incmix/ui"
import { CardContent } from "@incmix/ui/card"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useEffect } from "react"

const TasksPage = () => {
  // Get selected project from the store instead of local state
  const { selectedProject } = useProjectStore()

  const { useAI, setUseAI } = useAIFeaturesStore()

  // Show message when no projects exist
  if (!selectedProject) {
    return (
      <DashboardLayout>
        {/* Use flex layout to center the message vertically and horizontally */}
        <div className="flex h-full w-full items-center justify-center">
          <Card.Root className="max-w-md">
            <CardContent className="p-8">
              <p className="text-center font-medium text-lg">
                No projects. Please create one.
              </p>
            </CardContent>
          </Card.Root>
        </div>
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
        <Box className="flex-shrink-0 border-gray-2 border-b px-6 py-3">
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
                <div className="text-sm">Gen AI</div>
                <Switch checked={useAI} onCheckedChange={setUseAI} />
              </Flex>
              {/* Only render AddTaskForm when we have a valid projectId */}
              {selectedProject?.id && (
                <AddTaskForm
                  projectId={selectedProject.id}
                  onSuccess={() => {}}
                />
              )}
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
            <Board projectId={selectedProject?.id || ""} />
          </Tabs.Content>
          <Tabs.Content value="list" className="h-full">
            <ListBoard projectId={selectedProject?.id || ""} />
          </Tabs.Content>
          <Tabs.Content value="table" className="h-full">
            <TableView projectId={selectedProject?.id || ""} />
          </Tabs.Content>
          <Tabs.Content value="roadmap" className="h-full">
            <RoadmapView projectId={selectedProject?.id || ""} />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </DashboardLayout>
  )
}

export default TasksPage
