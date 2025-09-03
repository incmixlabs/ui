import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import ProjectDetails from "../../src/3blocks/projects/components/project-details"
import { Theme } from "../../src/1base"

const meta: Meta<typeof ProjectDetails> = {
  title: "3 Blocks/Projects/Project Details",
  component: ProjectDetails,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ maxWidth: "500px", padding: "24px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProjectDetails>

export const Default: Story = {
  render: () => {
    const [project, setProject] = useState({
      id: "proj_123",
      name: "Mobile App Redesign",
      company: "TechCorp Inc.",
      description: "Complete redesign of the mobile application with modern UI/UX principles and improved user experience.",
      budget: 75000,
      startDate: new Date("2024-01-15").getTime(),
      endDate: new Date("2024-06-30").getTime(),
      logo: null,
    })

    const mockOperations = {
      updateProject: {
        mutateAsync: async (data: any) => {
          console.log("Mock updateProject called with:", data)
          // Update the local state to simulate real behavior
          setProject(prev => ({ ...prev, ...data.updates }))
        },
        isLoading: false
      },
      refetch: async () => {
        console.log("Mock refetch called")
        // In a real scenario, this would refetch from server
      }
    }

    return (
      <ProjectDetails 
        mockData={{
          projectId: project.id,
          project: project,
          isLoading: false
        }}
        mockOperations={mockOperations}
      />
    )
  },
  name: "Default Project Details",
  parameters: {
    docs: {
      description: {
        story: "Project details section with working inline editing using mock data for demonstration.",
      },
    },
  },
}

export const InDrawer: Story = {
  render: () => {
    const [project, setProject] = useState({
      id: "proj_456",
      name: "E-commerce Platform", 
      company: "ShopSmart LLC",
      description: "Building a comprehensive e-commerce platform with advanced analytics and customer management features.",
      budget: 120000,
      startDate: new Date("2024-03-01").getTime(),
      endDate: new Date("2024-09-15").getTime(),
      logo: null,
    })

    const mockOperations = {
      updateProject: {
        mutateAsync: async (data: any) => {
          console.log("Mock updateProject called with:", data)
          setProject(prev => ({ ...prev, ...data.updates }))
        },
        isLoading: false
      },
      refetch: async () => {
        console.log("Mock refetch called")
      }
    }

    return (
      <div style={{ 
        width: "100%", 
        height: "600px", 
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <ProjectDetails 
          mockData={{
            projectId: project.id,
            project: project,
            isLoading: false
          }}
          mockOperations={mockOperations}
        />
      </div>
    )
  },
  name: "In Drawer Context",
  parameters: {
    docs: {
      description: {
        story: "Project details with working inline editing as they appear within the project drawer component.",
      },
    },
  },
}
