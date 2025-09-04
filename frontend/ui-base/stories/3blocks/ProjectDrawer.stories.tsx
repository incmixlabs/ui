import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Theme, Box, Flex, Heading, Text } from "../../src/1base"
import { projects } from "../../src/3blocks/projects/data"
import ProjectDrawer from "../../src/3blocks/projects/components/project-drawer"

// Create a query client for stories
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

// Mock labels based on labelSchemaLiteral schema
const mockUser = {
  id: "user-1",
  name: "John Doe",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
}

const createMockLabels = () => {
  const now = Date.now()
  
  // Status labels
  const statusLabels = [
    { name: "To Do", color: "var(--gray-9)", order: 0 },
    { name: "In Progress", color: "var(--blue-9)", order: 1 },
    { name: "In Review", color: "var(--orange-9)", order: 2 },
    { name: "Done", color: "var(--green-9)", order: 3 },
    { name: "Blocked", color: "var(--red-9)", order: 4 },
  ].map((label, index) => ({
    id: `status-${index + 1}`,
    projectId: "project-1",
    type: "status" as const,
    name: label.name,
    color: label.color,
    order: label.order,
    description: "",
    createdAt: now - 86400000 * (5 - index), // Created over last 5 days
    updatedAt: now - 86400000 * (5 - index),
    createdBy: mockUser,
    updatedBy: mockUser,
  }))

  // Priority labels  
  const priorityLabels = [
    { name: "Lowest", color: "var(--gray-9)", order: 0 },
    { name: "Low", color: "var(--sky-9)", order: 1 },
    { name: "Medium", color: "var(--orange-9)", order: 2 },
    { name: "High", color: "var(--red-9)", order: 3 },
    { name: "Highest", color: "var(--red-9)", order: 4 },
  ].map((label, index) => ({
    id: `priority-${index + 1}`,
    projectId: "project-1", 
    type: "priority" as const,
    name: label.name,
    color: label.color,
    order: label.order,
    description: "",
    createdAt: now - 86400000 * (5 - index),
    updatedAt: now - 86400000 * (5 - index),
    createdBy: mockUser,
    updatedBy: mockUser,
  }))

  return [...statusLabels, ...priorityLabels]
}

// Mock project data for stories
const mockProject = {
  ...projects[0],
  startDate: Date.now() - 86400000 * 7, // 7 days ago
  endDate: Date.now() + 86400000 * 30, // 30 days from now
}

// Stateful wrapper component for Storybook
const StatefulProjectDrawer = (props: Parameters<typeof ProjectDrawer>[0]) => {
  const [labels, setLabels] = React.useState(createMockLabels())
  
  const mockData = {
    projectId: "project-1",
    project: mockProject,
    isLoading: false,
    labels,
  }

  const mockOperations = {
    handleDrawerClose: () => console.log("Drawer close clicked"),
    updateProject: {
      mutateAsync: async (data: any) => {
        console.log("Mock project update:", data)
        await new Promise(resolve => setTimeout(resolve, 300))
      },
      isLoading: false,
    },
    updateLabel: {
      mutateAsync: async (data: any) => {
        console.log("Mock label update:", data)
        
        // Update the labels state to trigger re-render
        const { id, updates } = data
        setLabels(prevLabels => 
          prevLabels.map(label => 
            label.id === id 
              ? { ...label, ...updates, updatedAt: Date.now() }
              : label
          )
        )
        
        await new Promise(resolve => setTimeout(resolve, 300))
      },
      isLoading: false,
    },
  }

  return (
    <ProjectDrawer
      {...props}
      mockData={mockData}
      mockOperations={mockOperations}
    />
  )
}

const meta: Meta<typeof ProjectDrawer> = {
  title: "3 Blocks/Projects/Project Drawer",
  component: ProjectDrawer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "The actual ProjectDrawer component with inline editing functionality for project details.",
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Theme>
          <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
            <Story />
          </div>
        </Theme>
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProjectDrawer>

export const GridViewDrawer: Story = {
  render: (args) => <StatefulProjectDrawer {...args} />,
  args: {
    listFilter: false,
  },
  name: "Grid View Drawer",
  parameters: {
    docs: {
      description: {
        story: "Project drawer as it appears when opened from grid view - uses the actual ProjectDrawer component with inline editing functionality. Click on project name, company, budget, dates, and description to edit them. Click color dots to change label colors.",
      },
    },
  },
}

export const ListViewDrawer: Story = {
  render: () => (
    <Box className="flex h-screen">
      <Box className="w-80 bg-gray-2 p-5 border-r border-gray-6">
        <Heading className="mb-4">Project List</Heading>
        <Box className="space-y-2">
          {projects.slice(0, 3).map((project) => (
            <Box key={project.id} className="p-3 bg-white rounded-lg border border-gray-6 cursor-pointer hover:bg-gray-1">
              <Flex align="center" gap="3">
                <img src={project.logo} alt={project.name} className="w-6 h-6" />
                <Box>
                  <Text className="text-sm font-medium">{project.name}</Text>
                  <Text className="text-xs text-gray-11">{project.company}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
      <StatefulProjectDrawer 
        listFilter={true} 
        listFilterClassName="w-full relative z-50 h-[84vh] shrink-0 rounded-xl"
      />
    </Box>
  ),
  name: "List View Drawer",
  parameters: {
    docs: {
      description: {
        story: "Project drawer in list view mode - uses the actual component with inline editing capabilities.",
      },
    },
  },
}
