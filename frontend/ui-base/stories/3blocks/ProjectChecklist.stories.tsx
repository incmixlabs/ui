import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import ProjectChecklist from "../../src/3blocks/projects/components/project-checklist"
import { Theme } from "../../src/1base"

const meta: Meta<typeof ProjectChecklist> = {
  title: "3 Blocks/Projects/Project Checklist",
  component: ProjectChecklist,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ maxWidth: "600px", padding: "24px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProjectChecklist>

export const Default: Story = {
  render: () => <ProjectChecklist />,
  name: "Default Checklist",
  parameters: {
    docs: {
      description: {
        story: "Interactive project checklist with drag & drop reordering, progress tracking, and item management.",
      },
    },
  },
}
