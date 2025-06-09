// pages/tasks/index.tsx - Updated to use new useKanban hook
import { useOrganizationStore } from "@incmix/store"
import type {
  TaskCollections,
} from "@incmix/store"
import {
  Board,
  Box,
  Button,
  Card,
  Flex,
  ScrollArea,
  Select,
  Tabs,
} from "@incmix/ui"
import { CardContent } from "@incmix/ui/card"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"


import { CreateProjectForm } from "./create-project-form"
import { CreateTaskForm } from "./create-task-form"

const TasksPage = () => {
  const { selectedOrganisation } = useOrganizationStore()
  const [selectedProject, setSelectedProject] = useState<string>()
  const db: RxDatabase<TaskCollections> = useRxDB()

  // Get projects for the selected organization
  const {
    data: projects,
    isLoading: fetchingProjects,
    refetch: refetchProjects,
  } = useQuery({
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
      <ScrollArea
        scrollbars="horizontal"
        className="w-full px-2 pt-4 pb-4 2xl:p-2"
      >
        {/* Project Selection and Creation */}
        <Flex justify="between" className="mb-4">
          <Flex className="gap-4">
            <Select.Root
              value={selectedProject}
              onValueChange={setSelectedProject}
            >
              <Select.Trigger
                className="w-full max-w-96"
                placeholder={fetchingProjects ? "Loading" : "Select Project"}
              />
              <Select.Content>
                {fetchingProjects && <div>Loading...</div>}
                {projects?.map((p) => (
                  <Select.Item key={p.id} value={p.id}>
                    {p.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <CreateProjectForm
              onSuccess={(p) => {
                refetchProjects()
                setSelectedProject(p.id)
              }}
            />
          </Flex>

          {/* Note: Action buttons are now handled inside the Board component */}
        </Flex>

        {/* Tabs for Different Views */}
        <Tabs.Root className="flex w-full flex-col p-3" defaultValue="board">
          <Tabs.List
            className="flex w-fit shrink-0 rounded-md bg-gray-3 shadow-none"
            aria-label="View options"
          >
            <Tabs.Trigger
              className="flex cursor-pointer select-none text-[15px] text-mauve11 leading-none outline-none first:rounded-tl-md last:rounded-tr-md hover:text-indigo-9 data-[state=active]:text-indigo-9"
              value="board"
            >
              Board (Kanban)
            </Tabs.Trigger>
            <Tabs.Trigger
              className="flex cursor-pointer select-none text-[15px] text-mauve11 leading-none outline-none first:rounded-tl-md last:rounded-tr-md hover:text-indigo-9 data-[state=active]:text-indigo-9"
              value="list"
            >
              List
            </Tabs.Trigger>
            <Tabs.Trigger
              className="flex cursor-pointer select-none text-[15px] text-mauve11 leading-none outline-none first:rounded-tl-md last:rounded-tr-md hover:text-indigo-9 data-[state=active]:text-indigo-9"
              value="table"
            >
              Table
            </Tabs.Trigger>
          </Tabs.List>

          {/* Kanban Board View */}
          <Tabs.Content
            className="h-full w-full grow rounded-b-md py-2"
            value="board"
          >
            {/* Using the Board component with optional projectId */}
            <Board projectId={selectedProject} />
          </Tabs.Content>

          {/* List View - Placeholder for now */}
          <Tabs.Content
            className="h-full w-full grow rounded-b-md py-2"
            value="list"
          >
            <Box className="p-4">
              <div className="text-center">
                <p className="mb-4 text-gray-500">List view coming soon...</p>
                <p className="text-gray-400 text-sm">
                  This view will use the same data structure as the Kanban board
                </p>
              </div>
            </Box>
          </Tabs.Content>

          {/* Table View - Placeholder for now */}
          <Tabs.Content
            className="h-full w-full grow rounded-b-md py-2"
            value="table"
          >
            <Box className="p-4">
              <div className="text-center">
                <p className="mb-4 text-gray-500">Table view coming soon...</p>
                <p className="text-gray-400 text-sm">
                  This view will use the same data structure as the Kanban board
                </p>
              </div>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </ScrollArea>
    </DashboardLayout>
  )
}

export default TasksPage