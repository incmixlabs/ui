import { Suspense, lazy, useState } from "react"

import { motion } from "motion/react"
import { useQueryState } from "nuqs"

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  ScrollArea,
  Text,
  toast,
} from "@/base"
import {
  type ProjectDocType,
  saveFormProject,
  useOrganizationStore,
  useProjectMutations,
  useProjectsQuery,
} from "@incmix/store"

export {
  ReusableAddProject,
  useAddProject,
} from "./components/reusable-add-project"
import { MotionSheet } from "@/src/4layouts/custom-sheet"
import { PageHeader } from "@/src/4layouts/page-header"
import { cn } from "@/src/utils/cn"
import { members, projects } from "./data"
import { useProjectMutation } from "./hooks/use-project-mutation"
import type { CreateProject, Project } from "./types"

const AddProjectAutoForm = lazy(() =>
  import("./components/add-project-auto-form").then((module) => ({
    default: module.AddProjectAutoForm,
  }))
)
const ProjectCard = lazy(() =>
  import("./components/project-card").then((module) => ({
    default: module.ProjectCard,
  }))
)
const ProjectDrawer = lazy(() =>
  import("./components/project-drawer").then((module) => ({
    default: module.default,
  }))
)
const ProjectFilter = lazy(() =>
  import("./components/project-filter").then((module) => ({
    default: module.ProjectFilter,
  }))
)

/**
 * Renders the project management page with filtering, view mode switching, and project creation functionality.
 *
 * This component displays a list of projects and provides interactive features to filter projects by status, search,
 * and switch between grid and list views. It supports adding new projects via an integrated auto form and allows
 * for project deletion as well as placeholder functions for adding members and due dates. The UI dynamically adjusts
 * based on the active view mode and current filter selections.
 *
 * @returns The React element representing the project management page.
 */
// Helper function to transform RxDB project to UI Project type
const transformToUIProject = (dbProject: ProjectDocType): Project => {
  return {
    id: dbProject.id,
    name: dbProject.name,
    company: dbProject.company,
    logo: dbProject.logo || "",
    orgId: dbProject.orgId,
    description: dbProject.description,
    status: dbProject.status as "all" | "started" | "on-hold" | "completed",
    startDate: dbProject.startDate || Date.now(),
    endDate: dbProject.endDate || Date.now(),
    budget: dbProject.budget,
    // Default UI-specific fields that aren't in RxDB
    progress: 50, // Could be calculated from tasks later
    timeLeft: "1",
    timeType: "week" as const,
    members: [], // Could be populated from actual member data later
    createdAt: new Date(dbProject.createdAt),
    updatedAt: new Date(dbProject.updatedAt),
    createdBy: {
      id: dbProject.createdBy,
      name: "User", // Could be populated from actual user data
    },
    updatedBy: {
      id: dbProject.updatedBy,
      name: "User", // Could be populated from actual user data
    },
  }
}

export function ProjectPageComponents() {
  const { selectedOrganisation } = useOrganizationStore()
  const [projectId, setProjectId] = useQueryState("projectId", {
    defaultValue: "",
  })

  // Use real data hooks instead of dummy data
  const {
    projects: dbProjects,
    filteredProjects: dbFilteredProjects,
    isLoading: projectsLoading,
    error: projectsError,
    applyFilters,
    clearFilters,
    refetch: refetchProjects,
  } = useProjectsQuery()

  // Transform database projects to UI format
  const projects = dbProjects.map(transformToUIProject)
  const filteredProjects = dbFilteredProjects.map(transformToUIProject)

  // Handle loading state
  if (projectsLoading) {
    return (
      <Box className="min-h-screen bg-gray-1">
        <Box className="container mx-auto px-4 py-8">
          <PageHeader title={"Projects"} className="w-full" />
          <Box className="py-12 text-center">
            <Box className="animate-pulse space-y-4">
              <Box className="mx-auto h-8 w-32 rounded bg-gray-6" />
              <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Box key={i} className="h-64 rounded-lg bg-gray-6" />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  // Handle error state
  if (projectsError) {
    return (
      <Box className="min-h-screen bg-gray-1">
        <Box className="container mx-auto px-4 py-8">
          <PageHeader title={"Projects"} className="w-full" />
          <Box className="py-12 text-center">
            <Heading as="h1" className="mb-2 font-medium text-lg text-red-600">
              Error Loading Projects
            </Heading>
            <Text as="p" className="mb-6 text-gray-500">
              {typeof projectsError === "string"
                ? projectsError
                : "Failed to load projects. Please try again."}
            </Text>
            <Button
              onClick={() => refetchProjects()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Icon name="RefreshCw" className="mr-2" /> Retry
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }

  const { deleteProject } = useProjectMutations()

  const [activeTab, setActiveTab] = useState<
    "all" | "started" | "on-hold" | "completed"
  >("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleTabChange = (
    tab: "all" | "started" | "on-hold" | "completed"
  ) => {
    setActiveTab(tab)
    // Use the query hook's filtering instead of local state
    applyFilters({ status: tab })
  }

  const { mutateAsync: saveProjectToBackend } = useProjectMutation({
    onSuccess: async (project) => {
      try {
        await saveFormProject({
          id: project.id,
          name: project.name,
          description: project.description,
          createdAt: project.createdAt.getTime(),
          updatedAt: project.updatedAt.getTime(),
          createdBy: project.createdBy.id,
          updatedBy: project.updatedBy.id,
          company: project.company,
          status: project.status,
          startDate: new Date(project.startDate).getTime(),
          endDate: new Date(project.endDate).getTime(),
          budget: project.budget,
          orgId: project.orgId,
          logo: project.logo,
        })

        // Refetch projects from the database to get the latest data
        await refetchProjects()

        toast.success("Project created successfully", {
          description: `"${project.name}" has been added to your projects.`,
        })
      } catch (error) {
        console.error("Failed to save project to RxDB:", error)
        toast.error("Failed to save project", {
          description: "Your project couldn't be saved Please try again.",
        })
      }
    },
    onError: (error) => {
      console.error("Failed to save project to backend:", error)
      toast.error("Failed to save project", {
        description: "Your project couldn't be saved Please try again.",
      })
    },
  })

  const handleAddProject = async (newProject: Omit<CreateProject, "orgId">) => {
    if (!selectedOrganisation) {
      toast.error("No organisation selected", {
        description: "Please create or select an organisation first.",
      })
      return
    }
    // Create the project with a unique ID
    const projectWithId = {
      ...newProject,
      orgId: selectedOrganisation.id,
    }
    await saveProjectToBackend(projectWithId)
  }

  const handleAddMember = (project: Project) => {
    console.log("TODO: Implement member selection for project", project.id)
  }

  const handleAddDueDate = (project: Project) => {
    console.log("TODO: Implement due date picker for project", project.id)
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject.mutateAsync(projectId)
      await refetchProjects()
      toast.success("Project deleted successfully")
    } catch (error) {
      console.error("Failed to delete project:", error)
      toast.error("Failed to delete project", {
        description: "Please try again.",
      })
    }
  }

  const handleApplyFilters = (filters: {
    search: string
    members: string[]
    dueDate: string
    status: string
  }) => {
    // Use the query hook's filtering capabilities
    applyFilters({
      search: filters.search || undefined,
      status: filters.status !== "all" ? filters.status : activeTab,
      company: undefined, // Could add company filtering later
    })
    setIsFilterOpen(false)
  }

  const handleResetFilters = () => {
    clearFilters()
    // Reapply the active tab filter
    if (activeTab !== "all") {
      applyFilters({ status: activeTab })
    }
    setIsFilterOpen(false)
  }

  const handleOpenListView = () => {
    clearFilters()
    setActiveTab("all")
    setViewMode("list")
    if (!projectId && filteredProjects.length > 0) {
      setProjectId(filteredProjects[0]?.id)
    }
  }

  return (
    <Box className="min-h-screen bg-gray-1">
      <Box className="container mx-auto px-4 py-8">
        <PageHeader title={"Projects"} className="w-full" />
        <Box className={"relative mb-6"}>
          {viewMode === "grid" && (
            <Box className="flex w-full items-center justify-start rounded-none border-gray-5 border-b bg-transparent ">
              <Button
                className="relative h-11 cursor-pointer bg-transparent text-gray-11"
                onClick={() => handleTabChange("all")}
              >
                {activeTab === "all" && (
                  <motion.span
                    layoutId={"tab-indicator"}
                    className="-bottom-0.5 absolute left-0 inline-block h-0.5 w-full bg-blue-600"
                  />
                )}
                All{" "}
                <Text as={"span"} className="bg-gray-3 px-2 text-gray-10">
                  {projects.length}
                </Text>
              </Button>
              <Button
                className="relative h-11 cursor-pointer bg-transparent text-gray-11"
                onClick={() => handleTabChange("started")}
              >
                {activeTab === "started" && (
                  <motion.span
                    layoutId={"tab-indicator"}
                    className="-bottom-0.5 absolute left-0 inline-block h-0.5 w-full bg-blue-600"
                  />
                )}
                Started{" "}
                <Text as="span" className="bg-gray-3 px-2 text-gray-10">
                  {projects.filter((p) => p.status === "started").length}
                </Text>
              </Button>
              <Button
                className="relative h-11 cursor-pointer bg-transparent text-gray-11"
                onClick={() => handleTabChange("on-hold")}
              >
                {activeTab === "on-hold" && (
                  <motion.span
                    layoutId={"tab-indicator"}
                    className="-bottom-0.5 absolute left-0 inline-block h-0.5 w-full bg-blue-600"
                  />
                )}
                On Hold{" "}
                <Text as={"span"} className="bg-gray-3 px-2 text-gray-10">
                  {projects.filter((p) => p.status === "on-hold").length}
                </Text>
              </Button>
              <Button
                className="relative h-11 cursor-pointer bg-transparent text-gray-11"
                onClick={() => handleTabChange("completed")}
              >
                {activeTab === "completed" && (
                  <motion.span
                    layoutId={"tab-indicator"}
                    className="-bottom-0.5 absolute left-0 inline-block h-0.5 w-full bg-blue-600"
                  />
                )}
                Completed{" "}
                <Text as={"span"} className="bg-gray-3 px-2 text-gray-10">
                  {projects.filter((p) => p.status === "completed").length}
                </Text>
              </Button>
            </Box>
          )}
          <Box className="absolute top-0 right-0 z-10 flex rounded-md ">
            <IconButton
              variant={viewMode === "list" ? "soft" : "solid"}
              size="1"
              onClick={() => setViewMode("grid")}
            >
              <Icon name="LayoutGrid" />
            </IconButton>
            <IconButton
              variant={viewMode === "grid" ? "soft" : "solid"}
              size="1"
              onClick={handleOpenListView}
            >
              <Icon name="List" />
            </IconButton>
            <Flex align={"center"} gap={"2"} className=" pl-2">
              <IconButton
                color="gray"
                variant="soft"
                onClick={() => setIsFilterOpen(true)}
                size="1"
              >
                <Icon name="SlidersHorizontal" />
              </IconButton>
            </Flex>
          </Box>
          <Box
            className={cn(
              "relative mb-6",
              viewMode === "list" ? "flex gap-5 pt-10" : "pt-4"
            )}
          >
            <ScrollArea
              className={`${viewMode === "grid" ? "h-full" : "h-[85vh] w-80 "}`}
            >
              <Box
                className={`${viewMode === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "h-full w-full gap-4 space-y-2 overflow-x-auto"}`}
              >
                {filteredProjects.map((project) => (
                  <Suspense
                    key={project.id}
                    fallback={
                      <Box className="rounded-md border p-4">
                        Loading project...
                      </Box>
                    }
                  >
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isListFilter={viewMode === "list"}
                      onAddMember={handleAddMember}
                      onAddDueDate={handleAddDueDate}
                      onDelete={handleDeleteProject}
                    />
                  </Suspense>
                ))}
              </Box>
            </ScrollArea>
            {filteredProjects.length === 0 && (
              <Box className="py-12 text-center">
                <Heading
                  as="h1"
                  className="mb-2 font-medium text-gray-900 text-lg"
                >
                  No projects found
                </Heading>
                <Text as="p" className="mb-6 text-gray-500">
                  You don't have any completed projects yet.
                </Text>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Icon name="Plus" className={"mr-2"} /> Add New Project
                </Button>
              </Box>
            )}
            <Suspense fallback={<Box className="p-4">Loading drawer...</Box>}>
              <ProjectDrawer listFilter={viewMode === "list"} />
            </Suspense>
          </Box>
        </Box>
      </Box>

      <Suspense fallback={<Box className="p-4">Loading form...</Box>}>
        <AddProjectAutoForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddProject={handleAddProject}
        />
      </Suspense>

      <MotionSheet
        title="Filter"
        side="right"
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
      >
        <Suspense fallback={<Box className="p-4">Loading filters...</Box>}>
          <ProjectFilter
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
        </Suspense>
      </MotionSheet>
    </Box>
  )
}
