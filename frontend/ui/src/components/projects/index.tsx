import { useState } from "react"

import { useProjectDrawer } from "@hooks/use-project-drawer"
import { Box, Button, Flex, IconButton, Tabs } from "@radix-ui/themes"
import { LayoutGrid, List, Plus, SlidersHorizontal, X } from "lucide-react"
import { MotionSheet } from "../custom-sheet"
import { AddProjectModal } from "./components/add-project-modal"
import { ProjectCard } from "./components/project-card"

import ProjectDrawer from "./components/project-drawer"
import { ProjectFilter } from "./components/project-filter"
import { projects as initialProjects } from "./data"
import type { Project } from "./types"

export function ProjectPageComponents() {
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

  const handleAddProject = (newProject: Omit<Project, "id">) => {
    const projectWithId = {
      ...newProject,
      id: (projects.length + 1).toString(),
    }

    const updatedProjects = [...projects, projectWithId]
    setProjects(updatedProjects)

    if (activeTab === "all" || activeTab === newProject.status) {
      setFilteredProjects([...filteredProjects, projectWithId])
    }
  }

  const handleAddMember = (project: Project) => {
    // This would open a member selection modal in a real app
    console.log("Add member to project", project.id)
  }

  const handleAddDueDate = (project: Project) => {
    // This would open a date picker in a real app
    console.log("Add due date to project", project.id)
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

  return (
    <Box className="min-h-screen bg-gray-1">
      <Box className="mx-auto max-w-7xl px-4 py-8">
        <Flex justify={"between"} align={"center"} className="mb-8">
          <h1 className="font-bold text-2xl">Projects</h1>
          <div className="flex items-center gap-2">
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
          </div>
        </Flex>

        <div className="relative mb-6">
          <div className="ou absolute top-0 right-0 flex rounded-md border border-gray-4 bg-gray-2">
            <IconButton
              variant={viewMode === "list" ? "soft" : "solid"}
              className="cursor-pointer rounded-r-none border-0"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={16} />
            </IconButton>
            <IconButton
              variant={viewMode === "grid" ? "soft" : "solid"}
              className="cursor-pointer rounded-l-none border-0"
              onClick={() => setViewMode("list")}
            >
              <List size={20} />
            </IconButton>
          </div>
          <Tabs.Root
            defaultValue="all"
            value={activeTab}
            onValueChange={(value) => handleTabChange(value as any)}
          >
            <Tabs.List className="w-full justify-start rounded-none border-gray-2 border-b bg-transparent p-0">
              <Tabs.Trigger
                value="all"
                className="cursor-pointer rounded-none px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                All{" "}
                <span className="ml-1.5 bg-gray-3 px-2 text-gray-10">
                  {projects.length}
                </span>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="started"
                className="cursor-pointer rounded-none px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                Started{" "}
                <span className="ml-1.5 bg-gray-3 px-2 text-gray-10">
                  {projects.filter((p) => p.status === "started").length}
                </span>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="on-hold"
                className="cursor-pointer rounded-none px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                On Hold{" "}
                <span className="ml-1.5 bg-gray-3 px-2 text-gray-10">
                  {projects.filter((p) => p.status === "on-hold").length}
                </span>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="completed"
                className="cursor-pointer rounded-none px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                Completed{" "}
                <span className="ml-1.5 bg-gray-3 px-2 text-gray-10">
                  {projects.filter((p) => p.status === "completed").length}
                </span>
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="all" className="mt-6 p-0">
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onAddMember={handleAddMember}
                    onAddDueDate={handleAddDueDate}
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
              {filteredProjects.length === 0 && (
                <div className="py-12 text-center">
                  <h3 className="mb-2 font-medium text-gray-900 text-lg">
                    No projects found
                  </h3>
                  <p className="mb-6 text-gray-500">
                    No projects match your current filters.
                  </p>
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New Project
                  </Button>
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value="started" className="mt-6 p-0">
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onAddMember={handleAddMember}
                    onAddDueDate={handleAddDueDate}
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
              {filteredProjects.length === 0 && (
                <div className="py-12 text-center">
                  <h3 className="mb-2 font-medium text-gray-900 text-lg">
                    No projects found
                  </h3>
                  <p className="mb-6 text-gray-500">
                    You don't have any started projects yet.
                  </p>
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New Project
                  </Button>
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value="on-hold" className="mt-6 p-0">
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onAddMember={handleAddMember}
                    onAddDueDate={handleAddDueDate}
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
              {filteredProjects.length === 0 && (
                <div className="py-12 text-center">
                  <h3 className="mb-2 font-medium text-gray-900 text-lg">
                    No projects found
                  </h3>
                  <p className="mb-6 text-gray-500">
                    You don't have any on-hold projects yet.
                  </p>
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New Project
                  </Button>
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value="completed" className="mt-6 p-0">
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onAddMember={handleAddMember}
                    onAddDueDate={handleAddDueDate}
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
              {filteredProjects.length === 0 && (
                <div className="py-12 text-center">
                  <h3 className="mb-2 font-medium text-gray-900 text-lg">
                    No projects found
                  </h3>
                  <p className="mb-6 text-gray-500">
                    You don't have any completed projects yet.
                  </p>
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New Project
                  </Button>
                </div>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </Box>

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      />

      <ProjectDrawer />

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
