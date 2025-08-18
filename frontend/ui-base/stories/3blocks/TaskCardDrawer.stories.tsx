import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { TaskCardDrawer } from "../../src/3blocks/kanban-board/shared/task-card-drawer"
import { TaskCopyBufferProvider } from "../../src/3blocks/kanban-board/hooks/use-task-copy-buffer"

const meta: Meta<typeof TaskCardDrawer> = {
  title: "3 Blocks/Kanban Board/TaskCardDrawer",
  component: TaskCardDrawer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <TaskCopyBufferProvider>
        <div style={{ height: "100vh" }}>
          <Story />
        </div>
      </TaskCopyBufferProvider>
    ),
  ],
  argTypes: {
    viewType: {
      control: { type: "radio" },
      options: ["board", "list"],
      description: "The view type for the drawer",
    },
    projectId: {
      control: { type: "text" },
      description: "Project ID for the task",
    },
    onTaskModified: {
      action: "onTaskModified",
      description: "Callback function called when task is modified",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    viewType: "board",
    projectId: "default-project",
    onTaskModified: (taskId: string, changes: any) => {
      console.log("Task modified:", { taskId, changes })
    },
  },
}

export const BoardView: Story = {
  args: {
    viewType: "board",
    projectId: "project-123",
    onTaskModified: (taskId: string, changes: any) => {
      console.log("Board task modified:", { taskId, changes })
    },
  },
}

export const ListView: Story = {
  args: {
    viewType: "list",
    projectId: "project-456",
    onTaskModified: (taskId: string, changes: any) => {
      console.log("List task modified:", { taskId, changes })
    },
  },
}

export const WithCustomProject: Story = {
  args: {
    viewType: "board",
    projectId: "custom-project-789",
    onTaskModified: (taskId: string, changes: any) => {
      console.log("Custom project task modified:", { taskId, changes })
    },
  },
}