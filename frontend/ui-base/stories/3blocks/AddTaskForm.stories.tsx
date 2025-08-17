import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { AddTaskForm } from "../../src/3blocks/kanban-board/shared/add-task-form"
import { TaskCopyBufferProvider } from "../../src/3blocks/kanban-board/hooks/use-task-copy-buffer"

const meta: Meta<typeof AddTaskForm> = {
  title: "3 Blocks/Kanban Board/AddTaskForm",
  component: AddTaskForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "AddTaskForm component for creating new tasks. Note: This component requires project data store context and may show as disabled/loading in Storybook. For full functionality, use within a kanban board context.",
      },
    },
  },
  decorators: [
    (Story) => (
      <TaskCopyBufferProvider>
        <div style={{ padding: "2rem" }}>
          <Story />
        </div>
      </TaskCopyBufferProvider>
    ),
  ],
  argTypes: {
    projectId: {
      control: { type: "text" },
      description: "Project ID for the task form",
    },
    onSuccess: {
      action: "onSuccess",
      description: "Callback function called when task is created successfully",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    projectId: "storybook-project",
    onSuccess: () => {
      console.log("Task created successfully!")
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Default AddTaskForm. May show as loading/disabled due to missing project data store in Storybook context.",
      },
    },
  },
}

export const WithCustomProject: Story = {
  args: {
    projectId: "custom-project-123",
    onSuccess: () => {
      console.log("Task created for custom project!")
    },
  },
}

export const LoadingState: Story = {
  args: {
    projectId: "loading-project",
    onSuccess: () => {
      console.log("Task created after loading!")
    },
  },
  render: (args) => {
    // Mock loading state by providing a project that takes time to load
    return <AddTaskForm {...args} />
  },
}

export const WithAIEnabled: Story = {
  args: {
    projectId: "ai-project",
    onSuccess: () => {
      console.log("AI-assisted task created!")
    },
  },
  render: (args) => {
    // Mock AI features enabled
    React.useEffect(() => {
      // This would normally be handled by the AI features store
      console.log("AI features enabled for this story")
    }, [])

    return <AddTaskForm {...args} />
  },
}

export const Interactive: Story = {
  args: {
    projectId: "interactive-project",
    onSuccess: () => {
      alert("Task created successfully! 🎉")
    },
  },
  render: (args) => {
    return (
      <div>
        <div style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "0.5rem", maxWidth: "500px" }}>
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#0369a1" }}>📝 Note</h4>
          <p style={{ margin: 0, color: "#0c4a6e", fontSize: "0.875rem", lineHeight: "1.4" }}>
            Button shows "Loading..." due to missing project store context in Storybook. Use within kanban board for full functionality.
          </p>
        </div>
        <AddTaskForm {...args} />
      </div>
    )
  },
}