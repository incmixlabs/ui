import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ProjectPageComponents } from "../../src/3blocks/projects"
import { AddProjectAutoForm } from "../../src/3blocks/projects/components/add-project-auto-form"
import { ReusableAddProject } from "../../src/3blocks/projects/components/reusable-add-project"
import { ProjectCard } from "../../src/3blocks/projects/components/project-card"
import { ProjectFilter } from "../../src/3blocks/projects/components/project-filter"
import { Theme } from "../../src/1base"
import { projects, members } from "../../src/3blocks/projects/data"

// Create a query client for stories that need it
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const meta: Meta<typeof ProjectPageComponents> = {
  title: "3 Blocks/Projects",
  component: ProjectPageComponents,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Theme>
          <div style={{ minHeight: "100vh", padding: "0" }}>
            <Story />
          </div>
        </Theme>
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProjectPageComponents>

// Mock handlers for interactive functionality
const mockHandlers = {
  onAddProject: async (project: any) => {
    console.log("Mock: Adding project", project)
    return Promise.resolve()
  },
  onAddMember: (project: any) => {
    console.log("Mock: Adding member to project", project.id)
  },
  onAddDueDate: (project: any) => {
    console.log("Mock: Adding due date to project", project.id)
  },
  onDeleteProject: (projectId: string) => {
    console.log("Mock: Deleting project", projectId)
  },
}

// Main Stories
export const GridView: Story = {
  render: () => <ProjectPageComponents mockProjects={projects} />,
  name: "Grid View (Default)",
  parameters: {
    docs: {
      description: {
        story: "Default grid view showing all projects with status tabs and filtering capabilities.",
      },
    },
  },
}

export const EmptyState: Story = {
  render: () => <ProjectPageComponents mockProjects={[]} />,
  name: "Empty State",
  parameters: {
    docs: {
      description: {
        story: "Shows the empty state when no projects exist, encouraging users to create their first project.",
      },
    },
  },
}

// Individual Component Stories
export const ProjectCardStory: Story = {
  render: () => (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <ProjectCard
        project={projects[0]}
        isListFilter={false}
        onAddMember={mockHandlers.onAddMember}
        onAddDueDate={mockHandlers.onAddDueDate}
        onDelete={mockHandlers.onDeleteProject}
      />
    </div>
  ),
  name: "Project Card",
  parameters: {
    docs: {
      description: {
        story: "Individual project card component with dropdown actions and member avatars.",
      },
    },
  },
}

export const ProjectCardList: Story = {
  render: () => (
    <div style={{ padding: "2rem", maxWidth: "300px" }}>
      <ProjectCard
        project={projects[1]}
        isListFilter={true}
        onAddMember={mockHandlers.onAddMember}
        onAddDueDate={mockHandlers.onAddDueDate}
        onDelete={mockHandlers.onDeleteProject}
      />
    </div>
  ),
  name: "Project Card (List Mode)",
  parameters: {
    docs: {
      description: {
        story: "Project card in list view mode with simplified layout and click-to-open functionality.",
      },
    },
  },
}

export const AddProjectFormStory: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true)
    
    return (
      <AddProjectAutoForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddProject={mockHandlers.onAddProject}
      />
    )
  },
  name: "Add Project Form (Simple)",
  parameters: {
    docs: {
      description: {
        story: "Simple project creation form with basic fields and validation.",
      },
    },
  },
}

export const ReusableAddProjectStory: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true)
    
    return (
      <ReusableAddProject
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onProjectAdded={(project) => console.log("Project added:", project)}
      />
    )
  },
  name: "Add Project Form (AI Enhanced)",
  parameters: {
    docs: {
      description: {
        story: "AI-enhanced project creation form with streaming description generation and advanced features.",
      },
    },
  },
}

export const ProjectFilterStory: Story = {
  render: () => {
    const [filters, setFilters] = React.useState({
      search: "",
      members: [],
      dueDate: "",
      status: "all"
    })

    return (
      <div style={{ padding: "2rem", maxWidth: "400px" }}>
        <ProjectFilter
          onApplyFilters={(newFilters) => {
            setFilters(newFilters)
            console.log("Filters applied:", newFilters)
          }}
          onResetFilters={() => {
            setFilters({ search: "", members: [], dueDate: "", status: "all" })
            console.log("Filters reset")
          }}
        />
      </div>
    )
  },
  name: "Project Filter",
  parameters: {
    docs: {
      description: {
        story: "Advanced filtering panel with search, member selection, date picker, and status dropdown.",
      },
    },
  },
}

// Status-based Stories
export const StartedProjects: Story = {
  render: () => {
    const startedProjects = projects.filter(p => p.status === "started")
    return <ProjectPageComponents mockProjects={startedProjects} />
  },
  name: "Started Projects",
  parameters: {
    docs: {
      description: {
        story: "View filtered to show only projects with 'started' status.",
      },
    },
  },
}

export const CompletedProjects: Story = {
  render: () => {
    const completedProjects = projects.filter(p => p.status === "completed")
    return <ProjectPageComponents mockProjects={completedProjects} />
  },
  name: "Completed Projects", 
  parameters: {
    docs: {
      description: {
        story: "View filtered to show only completed projects with progress indicators.",
      },
    },
  },
}

export const OnHoldProjects: Story = {
  render: () => {
    const onHoldProjects = projects.filter(p => p.status === "on-hold")
    return <ProjectPageComponents mockProjects={onHoldProjects} />
  },
  name: "On Hold Projects",
  parameters: {
    docs: {
      description: {
        story: "View filtered to show only projects that are currently on hold.",
      },
    },
  },
}

// Data Variation Stories
export const ManyProjects: Story = {
  render: () => {
    // Create additional mock projects for testing performance/layout
    const manyProjects = Array.from({ length: 20 }, (_, i) => ({
      ...projects[i % projects.length],
      id: `project-${i + 10}`,
      name: `${projects[i % projects.length].name} ${i + 1}`,
    }))
    
    return <ProjectPageComponents mockProjects={manyProjects} />
  },
  name: "Many Projects (Performance Test)",
  parameters: {
    docs: {
      description: {
        story: "Tests the component performance and layout with a large number of projects.",
      },
    },
  },
}

export const LoadingState: Story = {
  render: () => <ProjectPageComponents mockIsLoading={true} />,
  name: "Loading State",
  parameters: {
    docs: {
      description: {
        story: "Simulates the loading state before projects data is available.",
      },
    },
  },
}
