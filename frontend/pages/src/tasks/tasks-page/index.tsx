// pages/tasks/index.tsx - Fixed horizontal scrolling
import {
  useAIFeaturesStore,
  useOrganizationStore,
  useProjectStore,
  useProjectsCheck,
} from "@incmix/store"
import type { Project } from "@incmix/utils/types"

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
import { useEffect, useState } from "react"

/**
 * Convert from database project format to Project type expected by project store
 * This ensures type safety instead of using unsafe type assertions
 */
function convertToProject(item: any): Project {
  // Create a properly typed Project object from the database format
  // with default values for any missing properties
  const project = {
    id: item.id,
    name: item.name || `Project ${item.id.substring(0, 6)}`,
    title: item.title || item.name || `Project ${item.id.substring(0, 6)}`,
    description: item.description || "",
    company: item.company || "",
    orgId: item.orgId || "",
    status: item.status || "all",
    progress: item.progress || 0,
    timeLeft: item.timeLeft || 0,
    timeType: item.timeType || "days",
    budget: item.budget || 0,
    members: Array.isArray(item.members) ? item.members : [],
    createdAt: item.createdAt || Date.now(),
    createdBy: item.createdBy || "",
    updatedAt: item.updatedAt || Date.now(),
    updatedBy: item.updatedBy || "",
    logo: item.logo || "",
    tags: Array.isArray(item.tags) ? item.tags : [],
    milestones: Array.isArray(item.milestones) ? item.milestones : [],
    tasks: Array.isArray(item.tasks) ? item.tasks : [],
    completion: item.completion || 0,
    startDate: item.startDate || null,
    endDate: item.endDate || null,
    fileInfo: item.fileInfo || undefined,
  }

  // Type assertion is safer now as we've provided all required properties
  return project as Project
}

const TasksPage = () => {
  const { selectedOrganisation } = useOrganizationStore()
  // Use the new hook to check if projects exist
  const { hasProjects, isLoading, firstProjectId, projects } =
    useProjectsCheck()

  // Get selected project from the store instead of local state
  const { selectedProject, setSelectedProject } = useProjectStore()

  const { useAI, setUseAI } = useAIFeaturesStore()

  // We no longer need this query as the useProjectsCheck hook handles this

  // Effect to handle project selection on load and organization changes
  useEffect(() => {
    // Check if we need to select or update the selected project
    // This is triggered when:
    // 1. Initial load and there's no selected project yet
    // 2. Organization changes and firstProjectId changes (projects list filtered by new org)
    // 3. Organization changes and there are no projects in the new org
    
    // If we have projects for the current org but no selected project, select the first one
    if (firstProjectId && !selectedProject) {
      console.log('Setting first project as selected', firstProjectId)
      const firstProject = projects.find((p) => p.id === firstProjectId)
      if (firstProject) {
        setSelectedProject(convertToProject(firstProject))
      }
    } 
    // If the currently selected project doesn't exist in the current projects list
    // (which happens when switching orgs), we need to reset it or choose a new one
    else if (selectedProject && projects.length > 0 && 
             !projects.some(p => p.id === selectedProject.id)) {
      console.log('Selected project not found in current org, selecting first project')
      const firstProject = projects[0]
      if (firstProject) {
        setSelectedProject(convertToProject(firstProject))
      }
    }
    // If no projects in current org but a project is selected, clear the selection
    else if (selectedProject && projects.length === 0) {
      console.log('No projects in current org, clearing selected project')
      setSelectedProject(undefined)
    }
  }, [firstProjectId, projects, selectedProject, setSelectedProject, selectedOrganisation])
  
  // Add a specific effect to log and debug when organization changes
  useEffect(() => {
    console.log('Organization changed:', {
      orgId: selectedOrganisation?.id,
      projectsCount: projects.length,
      selectedProject: selectedProject?.id || 'none'
    })
  }, [selectedOrganisation, projects.length, selectedProject])

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

  // Show loading state while checking for projects
  if (isLoading) {
    return (
      <DashboardLayout>
        <Card.Root>
          <CardContent>
            <p className="text-center">Loading projects...</p>
          </CardContent>
        </Card.Root>
      </DashboardLayout>
    )
  }

  // Show message when no projects exist
  if (!hasProjects) {
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
