import { usePGlite } from "@electric-sql/pglite-react"
import { pushChangesToBackend, useOrganizationStore } from "@incmix/store"
import { KanbanBoard } from "@incmix/ui"
import type { Task } from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { Flex, ScrollArea, Select } from "@radix-ui/themes"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { PageLayout } from "../../common/components/layouts/page-layout"
import { getKanbanBoard, getProjects, updatedTasks } from "./actions"
import { CreateColumnForm } from "./create-column-form"
import { CreateProjectForm } from "./create-project-form"
import { CreateTaskForm } from "./create-task-form"
import { useAutoSync } from "./use-auto-sync"
const TasksPage = () => {
  const { selectedOrganisation } = useOrganizationStore()

  const [selectedProject, setSelectedProject] = useState<string>()
  const projectsQuery = useQuery({
    queryKey: ["projects", selectedOrganisation?.id],
    enabled: !!selectedOrganisation?.id,
    queryFn: () => {
      if (selectedOrganisation) return getProjects(selectedOrganisation?.id)
      return []
    },
  })
  const db = usePGlite()
  const boardQuery = useQuery({
    queryKey: ["board", selectedProject],
    enabled: !!selectedProject,
    queryFn: () => {
      if (selectedProject) return getKanbanBoard(db, selectedProject)
      return { columns: [], tasks: [] }
    },
  })

  const tasksMutation = useMutation({
    mutationFn: (tasks: Task[]) => updatedTasks(db, tasks),
  })

  useAutoSync(pushChangesToBackend)

  useEffect(() => {
    if (!selectedProject && projectsQuery.data?.length)
      setSelectedProject(projectsQuery.data[0].id)
  }, [projectsQuery.data, selectedProject])

  return (
    <DashboardLayout breadcrumbItems={[{ label: "Tasks", url: "/tasks" }]}>
      <Flex className="mb-4 gap-4">
        <Select.Root value={selectedProject} onValueChange={setSelectedProject}>
          <Select.Trigger
            className="w-full max-w-96"
            placeholder={
              projectsQuery.isLoading ? "Loading" : "Select Projects"
            }
          />
          <Select.Content>
            {projectsQuery.isLoading && <div>Loading...</div>}
            {projectsQuery.isError && <div>Error fetching projects</div>}

            {projectsQuery.data?.map((p) => (
              <Select.Item key={p.id} value={p.id}>
                {p.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <CreateProjectForm
          onSuccess={(p) => {
            projectsQuery.refetch()
            setSelectedProject(p.id)
          }}
        />
        {selectedProject && (
          <div className="ml-auto flex gap-4">
            <CreateColumnForm
              projectId={selectedProject}
              onSuccess={() => boardQuery.refetch()}
            />
            <CreateTaskForm
              projectId={selectedProject}
              onSuccess={() => boardQuery.refetch()}
            />
          </div>
        )}
      </Flex>
      <ScrollArea scrollbars="horizontal" className="max-w-[1116px] pb-4">
        <KanbanBoard
          updateTasks={(tasks) => {
            tasksMutation.mutateAsync(tasks).then(() => {
              boardQuery.refetch()
            })
          }}
          columns={boardQuery.data?.columns ?? []}
          tasks={boardQuery.data?.tasks ?? []}
          isLoading={boardQuery.isLoading || projectsQuery.isLoading}
        />
      </ScrollArea>
    </DashboardLayout>
  )
}

export default TasksPage
