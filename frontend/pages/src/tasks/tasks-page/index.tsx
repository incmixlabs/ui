import type { TaskCollections } from "@incmix/store"
import { useOrganizationStore } from "@incmix/store"
import { CardContent, KanbanBoard } from "@incmix/ui"
import type { Task } from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { Card, Flex, ScrollArea, Select } from "@radix-ui/themes"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"
import { generateBoard } from "./actions"
import { CreateColumnForm } from "./create-column-form"
import { CreateProjectForm } from "./create-project-form"
import { CreateTaskForm } from "./create-task-form"

const TasksPage = () => {
  const { selectedOrganisation } = useOrganizationStore()

  const [selectedProject, setSelectedProject] = useState<string>()

  const db: RxDatabase<TaskCollections> = useRxDB()
  const projectCollection = db.projects
  const columnCollection = db.columns
  const taskCollection = db.tasks

  const {
    data: projects,
    isLoading: fetchingProjects,
    refetch: refetchProjects,
  } = useQuery({
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
    data: columns,
    isLoading: fetchingColumns,
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
    data: tasks,
    isLoading: fetchingTasks,
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

  const [_boardLoading, setBoardLoading] = useState(true)

  const _board = useMemo(() => {
    const board = generateBoard(columns ?? [], tasks ?? [])

    setBoardLoading(false)
    return board
  }, [columns, tasks])

  const _tasksMutation = useMutation({
    mutationFn: (tasks: Task[]) => {
      return Promise.all(
        tasks.map((t) =>
          taskCollection
            .find({
              selector: {
                id: t.id,
              },
            })
            .patch({
              columnId: t.columnId,
              taskOrder: t.taskOrder,
              updatedAt: new Date().toISOString(),
            })
        )
      )
    },

    onSuccess: () => {
      refetchTasks()
    },
  })

  // useAutoSync(pushChangesToBackend)

  useEffect(() => {
    if (!selectedProject && projects?.length) setSelectedProject(projects[0].id)
  }, [projects, selectedProject])

  if (!selectedOrganisation)
    return (
      <DashboardLayout breadcrumbItems={[{ label: "Tasks", url: "/tasks" }]}>
        <Card>
          <CardContent>
            <p className="text-center">
              Please add an organisation to manage projects
            </p>
          </CardContent>
        </Card>
      </DashboardLayout>
    )

  return (
    <DashboardLayout breadcrumbItems={[{ label: "Tasks", url: "/tasks" }]}>
      <Flex className="mb-4 gap-4">
        <Select.Root value={selectedProject} onValueChange={setSelectedProject}>
          <Select.Trigger
            className="w-full max-w-96"
            placeholder={fetchingProjects ? "Loading" : "Select Projects"}
          />
          <Select.Content>
            {fetchingProjects && <div>Loading...</div>}
            {/* {projectsQuery.isError && <div>Error fetching projects</div>} */}

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
      <ScrollArea
        scrollbars="horizontal"
        className=" w-full px-2 pb-4 2xl:px-10 "
      >
        <KanbanBoard
        // updateTasks={(tasks) => {
        //   if (tasks.length) tasksMutation.mutate(tasks)
        // }}
        // columns={board.columns}
        // tasks={board.tasks}
        // isLoading={
        //   fetchingColumns || fetchingTasks || boardLoading || fetchingProjects
        // }
        />
      </ScrollArea>
    </DashboardLayout>
  )
}

export default TasksPage
