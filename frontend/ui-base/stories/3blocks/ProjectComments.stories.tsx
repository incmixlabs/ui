import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import ProjectComments from "../../src/3blocks/projects/components/project-comments"
import { Theme } from "../../src/1base"

const meta: Meta<typeof ProjectComments> = {
  title: "3 Blocks/Projects/Project Comments",
  component: ProjectComments,
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
type Story = StoryObj<typeof ProjectComments>

export const Default: Story = {
  render: () => <ProjectComments />,
  name: "Default Comments",
  parameters: {
    docs: {
      description: {
        story: "Comments and activity tabs with comment form, emoji support, and file attachments.",
      },
    },
  },
}
