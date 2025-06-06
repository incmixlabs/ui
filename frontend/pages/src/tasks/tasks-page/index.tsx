import type { TaskCollections } from "@incmix/store"
import { useOrganizationStore } from "@incmix/store"
import {
  Board,
  Box,
  Card,
  Flex,
  ListBoard,
  RoadmapView,
  ScrollArea,
  Tabs,
} from "@incmix/ui"
import { CardContent } from "@incmix/ui/card"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"

import { CreateColumnForm } from "./create-column-form"
import { CreateTaskForm } from "./create-task-form"

const TasksPage = () => {
  const { selectedOrganisation } = useOrganizationStore()

  const [selectedProject, setSelectedProject] = useState<string>()

  const db: RxDatabase<TaskCollections> = useRxDB()
  const projectCollection = db.projects
  const columnCollection = db.columns
  const taskCollection = db.tasks

  const { data: projects } = useQuery({
    queryKey: ["projects", selectedOrganisation?.id],
    enabled: !!selectedOrganisation?.id && !!projectCollection,
    queryFn: () => {
      if (!selectedOrganisation) return []

      return projectCollection
        .find({
          selector: { orgId: selectedOrganisation?.id },
          sort: [{ createdAt: "asc" }],
        })
        .exec()
    },
  })

  const {
    // isLoading: fetchingColumns,
    refetch: refetchColumns,
  } = useQuery({
    queryKey: ["columns", selectedProject],
    enabled: !!selectedProject,
    queryFn: () => {
      return columnCollection
        .find({
          selector: { projectId: selectedProject },
          sort: [{ columnOrder: "asc" }],
        })
        .exec()
    },
  })
  const {
    // isLoading: fetchingTasks,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["tasks", selectedProject],
    enabled: !!selectedProject,
    queryFn: () => {
      return taskCollection
        .find({
          selector: { projectId: selectedProject },
          sort: [{ taskOrder: "asc" }],
        })
        .exec()
    },
  })

  const [_boardLoading, _setBoardLoading] = useState(true)

  // useAutoSync(pushChangesToBackend)

  useEffect(() => {
    if (!selectedProject && projects?.length) setSelectedProject(projects[0].id)
  }, [projects, selectedProject])

  if (!selectedOrganisation)
    return (
      <DashboardLayout breadcrumbItems={[{ label: "Tasks", url: "/tasks" }]}>
        <Card.Root>
          <CardContent>
            <p className="text-center">
              Please add an organisation to manage projects
            </p>
          </CardContent>
        </Card.Root>
      </DashboardLayout>
    )

  return (
    <DashboardLayout breadcrumbItems={[{ label: "Tasks", url: "/tasks" }]}>
      <ScrollArea
        scrollbars="horizontal"
        className="w-full px-2 pt-4 pb-4 2xl:p-2"
      >
        <Flex justify={"between"}>
          <Flex className="mb-4 gap-4">
            {selectedProject && (
              <div className="ml-auto flex gap-4">
                <CreateColumnForm
                  projectId={selectedProject}
                  onSuccess={() => refetchColumns()}
                />
                <CreateTaskForm
                  projectId={selectedProject}
                  onSuccess={() => refetchTasks()}
                />
              </div>
            )}
          </Flex>
          {/* <Flex justify={"end"} className="mb-2">
            <IconButton
              className="h-10 w-12 cursor-pointer "
              onClick={toggleKanbanFilter}
            >
              <ListFilter className="size-8 fill-white" />
            </IconButton>
          </Flex> */}
        </Flex>
        <Tabs.Root className="flex w-full flex-col p-3" defaultValue="board">
          <Tabs.List
            className="flex w-fit shrink-0 rounded-md bg-gray-3 shadow-none"
            aria-label="Manage your account"
          >
            <Tabs.Trigger
              className="flex cursor-pointer select-none text-[15px] text-mauve11 leading-none outline-none first:rounded-tl-md last:rounded-tr-md hover:text-indigo-9 data-[state=active]:text-indigo-9"
              value="board"
            >
              Board (Kanban)
            </Tabs.Trigger>
            <Tabs.Trigger
              className="flex cursor-pointer select-none text-[15px] text-mauve11 leading-none outline-none first:rounded-tl-md last:rounded-tr-md hover:text-indigo-9 data-[state=active]:text-indigo-9"
              value="timeline"
            >
              Timeline
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
          <Tabs.Content
            className="h-full w-full grow rounded-b-md py-2 "
            value="board"
          >
            <Box className="h-full w-full ">
              <Board />
            </Box>
          </Tabs.Content>
          <Tabs.Content
            className="h-full w-full grow rounded-b-md py-2"
            value="timeline"
          >
            <RoadmapView />
          </Tabs.Content>
          <Tabs.Content
            className="h-full w-full grow rounded-b-md py-2 "
            value="list"
          >
            <ListBoard />
          </Tabs.Content>
          <Tabs.Content
            className="h-full w-full grow rounded-b-md py-2 "
            value="table"
          />
        </Tabs.Root>

        {/* <KanbanBoard
        updateTasks={(tasks) => {
          if (tasks.length) tasksMutation.mutate(tasks)
        }}
        columns={board.columns}
        tasks={board.tasks}
        isLoading={
          fetchingColumns || fetchingTasks || boardLoading || fetchingProjects
        }
        /> */}
      </ScrollArea>
    </DashboardLayout>
  )
}

export default TasksPage
