import { Suspense, lazy, useState } from "react"

import { motion } from "motion/react"
import { nanoid } from "nanoid"
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
} from "@/src/1base"
import { saveFormProject, useOrganizationStore } from "@incmix/store"

export {
  ReusableAddProject,
  useAddProject,
} from "./components/reusable-add-project"
import { cn } from "@/shadcn/lib/utils"
import { MotionSheet } from "@/src/4layouts/custom-sheet"
import { PageHeader } from "@/src/4layouts/page-header"
import { projects as initialProjects } from "./data"
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
export function ProjectPageComponents() {
  const { selectedOrganisation } = useOrganizationStore()
  const [projectId, setProjectId] = useQueryState("projectId", {
    defaultValue: "",
  })
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(initialProjects)
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
    if (tab === "all") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.status === tab))
    }
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

        setProjects((prev) => [...prev, project])

        if (activeTab === "all" || activeTab === project.status) {
          setFilteredProjects([...filteredProjects, project])
        }
        toast.success("Project created successfully", {
          description: `"${project.name}" has been added to your projects.`,
        })
      } catch (error) {
        console.error("Failed to save project to RxDB:", error)
        toast.error("Failed to save project", {
          description: "Your project couldn't be saved Please try again.",
        })
        // Still update the UI state even if DB save fails
        setProjects((prev) => [...prev, project])

        if (activeTab === "all" || activeTab === project.status) {
          setFilteredProjects([...filteredProjects, project])
        }
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

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter((p) => p.id !== projectId)
    setProjects(updatedProjects)
    setFilteredProjects(filteredProjects.filter((p) => p.id !== projectId))
  }

  const handleApplyFilters = (filters: {
    search: string
    members: string[]
    dueDate: string
    status: string
  }) => {
    let filtered = [...projects]

    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchLower) ||
          project.company.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower)
      )
    }

    // Filter by members
    if (filters.members.length > 0) {
      filtered = filtered.filter((project) =>
        project.members.some(
          (member) => member.id && filters.members.includes(member.id)
        )
      )
    }

    // Filter by status if not "all"
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((project) => project.status === filters.status)
    }

    // Apply active tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((project) => project.status === activeTab)
    }

    setFilteredProjects(filtered)
    setIsFilterOpen(false)
  }

  const handleResetFilters = () => {
    if (activeTab === "all") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(
        projects.filter((project) => project.status === activeTab)
      )
    }
    setIsFilterOpen(false)
  }

  const handleOpenListView = () => {
    setFilteredProjects(projects)
    setActiveTab("all")
    setViewMode("list")
    if (!projectId) {
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
