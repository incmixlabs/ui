import { Board } from "../../src/3blocks/kanban-board/board"
import { ListBoard } from "../../src/3blocks/kanban-board/list"
import { TableView } from "../../src/3blocks/kanban-board/table"
import { DndKanbanBoard } from "../../src/3blocks/kanban-board/dnd-example/KanbanBoard"
import { storybookData } from "../../src/3blocks/kanban-board/storybook-data"
import { KanbanColumn } from "../../src/3blocks/kanban-board/types"

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

// Use comprehensive storybook data that matches RxDB schema
const mockColumns: KanbanColumn[] = storybookData.kanbanColumns
const priorityLabels = storybookData.priorityLabels.map(label => ({
  id: label.id,
  label: label.name,
  name: label.name,
  color: label.color,
  type: label.type, // ✅ Include the type property
}))

const meta: Meta<typeof Board> = {
  title: "3 Blocks/Kanban Board",
  component: Board,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    projectId: {
      control: "text",
      description: "Project ID for the kanban board",
    },
  },
}

export default meta

type Story = StoryObj<typeof Board>

// export const BoardView: Story = {
//   args: {
//     projectId: "storybook-project",
//   },
//   render: (args) => (
//     <div style={{ height: "100vh" }}>
//       <Board {...args} />
//     </div>
//   ),
//   name: "Board View",
// }

export const ListView: Story = {
  render: () => {
    // Calculate project stats from mock data
    const totalTasks = mockColumns.reduce((sum, col) => sum + col.totalTasksCount, 0)
    const completedTasks = mockColumns.reduce((sum, col) => sum + col.completedTasksCount, 0)
    const overdueTasks = mockColumns.reduce((sum, col) => {
      return sum + col.tasks.filter(task => 
        task.endDate && task.endDate < Date.now() && !task.completed
      ).length
    }, 0)
    const urgentLabelId = priorityLabels.find(p => p.name === "Urgent")?.id
    const urgentTasks = urgentLabelId
      ? mockColumns.reduce((sum, col) => {
          return sum + col.tasks.filter(task => task.priorityId === urgentLabelId).length
        }, 0)
      : 0

    const mockData = {
      columns: mockColumns,
      priorityLabels: priorityLabels,
      projectStats: {
        totalTasks,
        completedTasks,
        totalStatusLabels: mockColumns.length,
        overdueTasks,
        urgentTasks
      }
    }

    const mockOperations = {
      onCreateTask: async (statusId: string, taskData: any) => {
        console.log("Mock create task:", { statusId, taskData })
      },
      onUpdateTask: async (id: string, updates: any) => {
        console.log("Mock update task:", { id, updates })
      },
      onDeleteTask: async (id: string) => {
        console.log("Mock delete task:", id)
      },
      onDuplicateTask: async (id: string) => {
        console.log("Mock duplicate task:", id)
      },
      onMoveTask: async (id: string, targetStatusId: string, targetIndex?: number) => {
        console.log("Mock move task:", { id, targetStatusId, targetIndex })
      },
      onUpdateStatusLabel: async (id: string, updates: any) => {
        console.log("Mock update status label:", { id, updates })
      },
      onDeleteStatusLabel: async (id: string) => {
        console.log("Mock delete status label:", id)
      },
      onRefetch: () => {
        console.log("Mock refetch")
      }
    }

    return (
      <div className="w-full h-full p-2">
        <ListBoard 
          projectId="storybook-project"
          mockData={mockData}
          mockOperations={mockOperations}
        />
      </div>
    )
  },
  name: "List View",
}

export const TableViewStory: Story = {
  render: () => {
    // Transform mockColumns data to TableTask format
    const allTasks = mockColumns.flatMap(column => 
      column.tasks.map(task => ({
        ...task,
        statusId: column.id,
        statusLabel: column.name,
        statusColor: column.color,
        // Add computed properties that TableTask expects
        assignedToNames: task.assignedTo?.map(user => user.name).join(", ") || "",
        isOverdue: task.endDate ? task.endDate < Date.now() && !task.completed : false,
        totalSubTasks: task.subTasks?.length || 0,
        completedSubTasks: task.subTasks?.filter(st => st.completed).length || 0,
      }))
    )

    // Calculate project stats from mock data
    const totalTasks = allTasks.length
    const completedTasks = allTasks.filter(task => task.completed).length
    const overdueTasks = allTasks.filter(task => 
      task.endDate && task.endDate < Date.now() && !task.completed
    ).length
    const urgentLabelId = priorityLabels.find(p => p.name === "Urgent")?.id
    const urgentTasks = urgentLabelId
      ? allTasks.filter(task => task.priorityId === urgentLabelId).length
      : 0

    const mockData = {
      tasks: allTasks,
      statusLabels: mockColumns.map(col => ({
        id: col.id,
        name: col.name,
        color: col.color,
        type: "status"
      })),
      priorityLabels,
      projectStats: {
        totalTasks,
        completedTasks,
        totalLabels: mockColumns.length,
        overdueTasks,
        urgentTasks
      }
    }

    const mockOperations = {
      onUpdateTask: async (id: string, updates: any) => {
        console.log("Mock update task:", { id, updates })
      },
      onDeleteTask: async (id: string) => {
        console.log("Mock delete task:", id)
      },
      onMoveTaskToStatus: async (taskId: string, statusId: string) => {
        console.log("Mock move task to status:", { taskId, statusId })
      },
      onCreateLabel: async (type: string, name: string, color?: string, description?: string) => {
        console.log("Mock create label:", { type, name, color, description })
        return `temp-${Date.now()}`
      },
      onUpdateLabel: async (id: string, updates: any) => {
        console.log("Mock update label:", { id, updates })
      },
      onDeleteLabel: async (id: string) => {
        console.log("Mock delete label:", id)
      },
      onRefetch: () => {
        console.log("Mock refetch")
      }
    }

    return (
      <div style={{ height: "100vh", padding: "1rem" }}>
        <TableView 
          projectId="storybook-project"
          mockData={mockData}
          mockOperations={mockOperations}
        />
      </div>
    )
  },
  name: "Table View",
}

export const DndExample: Story = {
  render: () => (
    <div style={{ height: "100vh", padding: "1rem" }}>
      <DndKanbanBoard
        columnsData={mockColumns}
        priorityLabels={priorityLabels}
        onCreateTask={async (columnId, taskData) => {
          console.log("Create task:", { columnId, taskData })
        }}
        onUpdateTask={async (taskId, updates) => {
          console.log("Update task:", { taskId, updates })
        }}
        onDeleteTask={async (taskId) => {
          console.log("Delete task:", taskId)
        }}
        onUpdateColumn={async (columnId, updates) => {
          console.log("Update column:", { columnId, updates })
        }}
        onDeleteColumn={async (columnId) => {
          console.log("Delete column:", columnId)
        }}
        onTaskOpen={(taskId) => {
          console.log("Open task:", taskId)
        }}
      />
    </div>
  ),
  name: "DnD Example",
}

export const EmptyBoard: Story = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <Board projectId="empty-project" />
    </div>
  ),
  name: "Empty Board",
}

export const LoadingState: Story = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <Board projectId="loading-project" />
    </div>
  ),
  name: "Loading State",
}