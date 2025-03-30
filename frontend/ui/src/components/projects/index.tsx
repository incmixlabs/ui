import { useState } from "react"

import { saveFormProject } from "@incmix/store"
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Text,
} from "@incmix/ui"
import { cn } from "@utils"
import { LayoutGrid, List, Plus, SlidersHorizontal, X } from "lucide-react"
import { motion } from "motion/react"
import { useQueryState } from "nuqs"
import { MotionSheet } from "../custom-sheet"
import { AddProjectAutoForm } from "./components/add-project-auto-form"
import { AddProjectModal } from "./components/add-project-modal"
import { ProjectCard } from "./components/project-card"
import ProjectDrawer from "./components/project-drawer"
import { ProjectFilter } from "./components/project-filter"
import { projects as initialProjects } from "./data"
import type { Project } from "./types"
import { nanoid } from "nanoid"

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

  const handleAddProject = async (newProject: Omit<Project, "id">) => {
    // Create the project with ID
    const uniqueId =  nanoid()

    // Create the project with a unique ID
    const projectWithId = {
      ...newProject,
      id: uniqueId, // Use our simple unique ID instead of array length
    }

    try {
      // Save to RxDB
      await saveFormProject(projectWithId)

      // Update local state
      const updatedProjects = [...projects, projectWithId]
      setProjects(updatedProjects)

      if (activeTab === "all" || activeTab === newProject.status) {
        setFilteredProjects([...filteredProjects, projectWithId])
      }
    } catch (error) {
      console.error("Failed to save project to RxDB:", error)

      // Still update the UI state even if DB save fails
      const updatedProjects = [...projects, projectWithId]
      setProjects(updatedProjects)

      if (activeTab === "all" || activeTab === newProject.status) {
        setFilteredProjects([...filteredProjects, projectWithId])
      }
    }
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
          project.title.toLowerCase().includes(searchLower) ||
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
      <Box className="mx-auto max-w-7xl px-4 py-8">
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
              className="h-10 w-10 cursor-pointer rounded-r-none border-0"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={16} />
            </IconButton>
            <IconButton
              variant={viewMode === "grid" ? "soft" : "solid"}
              className="h-10 w-10 cursor-pointer rounded-l-none border-0"
              onClick={handleOpenListView}
            >
              <List size={20} />
            </IconButton>
            <Flex align={"center"} gap={"2"} className=" pl-2">
              <IconButton
                color="gray"
                variant="soft"
                onClick={() => setIsFilterOpen(true)}
                className="h-10 w-10 cursor-pointer"
              >
                <SlidersHorizontal size={20} />
              </IconButton>

              <Button
                onClick={() => setIsAddModalOpen(true)}
                variant="solid"
                className="h-10 cursor-pointer"
              >
                <Plus size={16} />
                Add Project
              </Button>
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
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isListFilter={viewMode === "list"}
                    onAddMember={handleAddMember}
                    onAddDueDate={handleAddDueDate}
                    onDelete={handleDeleteProject}
                  />
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
                  <Plus className="mr-2 h-4 w-4" /> Add New Project
                </Button>
              </Box>
            )}
            <ProjectDrawer listFilter={viewMode === "list"} />
          </Box>
        </Box>
      </Box>

      <AddProjectAutoForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      />
      {/* <AddProjectModal
      isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      /> */}

      <MotionSheet
        title="Filter"
        side="right"
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
      >
        <ProjectFilter
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
      </MotionSheet>
    </Box>
  )
}
