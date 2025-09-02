import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
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
  render: () => <ProjectDetails />,
  name: "Default Project Details",
  parameters: {
    docs: {
      description: {
        story: "Project details section showing budget, dates, and description with static data.",
      },
    },
  },
}

export const InDrawer: Story = {
  render: () => (
    <div style={{ 
      width: "100%", 
      height: "600px", 
      backgroundColor: "#f8f9fa",
      padding: "20px",
      borderRadius: "8px"
    }}>
      <ProjectDetails />
    </div>
  ),
  name: "In Drawer Context",
  parameters: {
    docs: {
      description: {
        story: "Project details as they appear within the project drawer component.",
      },
    },
  },
}
