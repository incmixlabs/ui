"use client"

import React, { useState, useEffect, useCallback } from "react"
import { registerCellRenderer, cellRendererRegistry } from "../cell-renderers"
import { RowAction } from "../types"
import { DataTable } from "../components/DataTable"

// Only register the timeline progress renderer if it doesn't already exist
if (!cellRendererRegistry["TimelineProgress"]) {
  // This shouldn't be needed as we added it to defaultCellRenderers, but adding for safety
  registerCellRenderer("TimelineProgress", (value, options) => {
    // Renderer implementation is already in cell-renderers.tsx
    return cellRendererRegistry["TimelineProgress"](value, options);
  })
}

// Define task interface
interface Task {
  id: string
  title: string
  description: string
  assignee: string
  priority: string
  status: string
  tags: string[]
  timeline: {
    startDate: string
    endDate: string
    currentDate?: string
    color?: string
  }
  createdAt: string
  completionPercentage: number
}

// Sample tasks data with timeline information
const SAMPLE_TASKS: Task[] = [
  {
    id: "task1",
    title: "Design system updates",
    description: "Update the design system components to match the latest brand guidelines",
    assignee: "Alice Smith",
    priority: "high",
    status: "in_progress",
    tags: ["design", "ui"],
    timeline: {
      startDate: "2025-04-15",
      endDate: "2025-06-01",
      color: "primary"
    },
    createdAt: "2025-04-10T10:30:00",
    completionPercentage: 45
  },
  {
    id: "task2",
    title: "API integration",
    description: "Integrate the new payment processing API with our checkout flow",
    assignee: "Bob Johnson",
    priority: "critical",
    status: "todo",
    tags: ["backend", "api"],
    timeline: {
      startDate: "2025-05-10",
      endDate: "2025-05-25",
      color: "danger"
    },
    createdAt: "2025-05-05T14:15:00",
    completionPercentage: 0
  },
  {
    id: "task3",
    title: "User onboarding flow",
    description: "Redesign the user onboarding process to improve conversion rates",
    assignee: "Carol Williams",
    priority: "medium",
    status: "in_review",
    tags: ["ux", "design"],
    timeline: {
      startDate: "2025-04-20",
      endDate: "2025-05-15",
      color: "success"
    },
    createdAt: "2025-04-18T09:00:00",
    completionPercentage: 85
  },
  {
    id: "task4",
    title: "Performance optimization",
    description: "Optimize the main dashboard page to improve load times",
    assignee: "David Brown",
    priority: "high",
    status: "in_progress",
    tags: ["frontend", "performance"],
    timeline: {
      startDate: "2025-05-01",
      endDate: "2025-05-20",
      color: "warning"
    },
    createdAt: "2025-04-29T16:45:00",
    completionPercentage: 30
  },
  {
    id: "task5",
    title: "Bug fixes for release v2.1",
    description: "Fix critical bugs identified in the v2.1 release candidate",
    assignee: "Eva Garcia",
    priority: "critical",
    status: "done",
    tags: ["bugfix", "backend"],
    timeline: {
      startDate: "2025-04-25",
      endDate: "2025-05-05",
      color: "success"
    },
    createdAt: "2025-04-23T11:20:00",
    completionPercentage: 100
  },
  {
    id: "task6",
    title: "Documentation update",
    description: "Update API documentation with new endpoints and examples",
    assignee: "Frank Lee",
    priority: "low",
    status: "todo",
    tags: ["docs", "api"],
    timeline: {
      startDate: "2025-05-15",
      endDate: "2025-06-10",
      color: "secondary"
    },
    createdAt: "2025-05-10T13:10:00",
    completionPercentage: 0
  }
]

// Status mapping for proper rendering
const STATUS_MAP = {
  todo: {
    color: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-500/30"
  },
  in_progress: {
    color: "bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-950/50 dark:text-yellow-400 dark:ring-yellow-500/30"
  },
  in_review: {
    color: "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-950/50 dark:text-purple-400 dark:ring-purple-500/30"
  },
  done: {
    color: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-950/50 dark:text-green-400 dark:ring-green-500/30"
  }
}

// Column definitions with timeline progress bar
const TASK_TABLE_COLUMNS = [
  {
    headingName: "Title",
    type: "String" as const,
    accessorKey: "title" as const,
    id: "title",
    enableSorting: true,
    // Make title column show link-like styling
    renderer: (value: string) => (
      <div className="font-medium text-primary-600 dark:text-primary-400 hover:underline cursor-pointer">
        {value}
      </div>
    )
  },
  {
    headingName: "Assignee",
    type: "String" as const,
    accessorKey: "assignee" as const,
    id: "assignee",
    enableSorting: true
  },
  {
    headingName: "Status",
    type: "Status" as const,
    accessorKey: "status" as const,
    id: "status",
    statusMap: STATUS_MAP,
    // Format nicely for display
    renderer: (value: string) => (
      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize ${
        STATUS_MAP[value as keyof typeof STATUS_MAP]?.color || ""
      }`}>
        {value.replace('_', ' ')}
      </span>
    )
  },
  {
    headingName: "Priority",
    type: "Status" as const,
    accessorKey: "priority" as const,
    id: "priority",
    enableSorting: true
  },
  {
    headingName: "Tags",
    type: "Tag" as const,
    accessorKey: "tags" as const,
    id: "tags"
  },
  {
    headingName: "Created",
    type: "Date" as const,
    accessorKey: "createdAt" as const,
    id: "createdAt",
    enableSorting: true,
    format: {
      dateFormat: "MMM DD, YYYY"
    }
  },
  {
    headingName: "Timeline Progress",
    type: "TimelineProgress" as const,
    accessorKey: "timeline" as const,
    id: "timeline",
    enableSorting: false,
    // Additional options for the timeline renderer
    format: {
      showPercentage: false,
      showDates: true
    }
  }
]

// Filter definitions
const TASK_TABLE_FACETS = [
  {
    column: "status",
    title: "Status",
    options: [
      { label: "To Do", value: "todo" },
      { label: "In Progress", value: "in_progress" },
      { label: "In Review", value: "in_review" },
      { label: "Done", value: "done" }
    ]
  },
  {
    column: "priority",
    title: "Priority",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
      { label: "Critical", value: "critical" }
    ]
  },
  {
    column: "tags",
    title: "Tags",
    options: [
      { label: "Design", value: "design" },
      { label: "UI", value: "ui" },
      { label: "UX", value: "ux" },
      { label: "Frontend", value: "frontend" },
      { label: "Backend", value: "backend" },
      { label: "API", value: "api" },
      { label: "Docs", value: "docs" },
      { label: "Bugfix", value: "bugfix" },
      { label: "Performance", value: "performance" }
    ]
  }
]

/**
 * Task Timeline Demo - Demonstrates the timeline progress bar column type
 */
const TaskTimelineDemo = () => {
  // Data and loading state
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch tasks
  // In a real app, this would be an API call
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        setTasks(SAMPLE_TASKS)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  /**
   * Define row actions - memoized to prevent recreating on each render
   */
  const getRowActions = useCallback((task: Task): RowAction[] => [
    {
      label: "View Details",
      onClick: () => alert(`View details of "${task.title}"`),
      icon: <span className="mr-2">👁️</span>
    },
    {
      label: "Edit Task",
      onClick: () => alert(`Edit task "${task.title}"`),
      icon: <span className="mr-2">✏️</span>
    },
    {
      label: "Delete Task",
      onClick: () => alert(`Delete task "${task.title}"`),
      icon: <span className="mr-2">🗑️</span>,
      color: "text-red-500",
      disabled: task.status === "in_progress" // Disable delete for in-progress tasks
    },
  ], [])

  // Task detail component for expandable rows
  const renderTaskDetails = useCallback((task: Task) => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Completion</h4>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2">
            <div 
              className="h-full bg-green-500 rounded" 
              style={{ width: `${task.completionPercentage}%` }}
            />
          </div>
          <p className="text-sm mt-1">{task.completionPercentage}% complete</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Timeline</h4>
          <p className="text-sm">
            <span className="font-medium">Start:</span> {new Date(task.timeline.startDate).toLocaleDateString()}
          </p>
          <p className="text-sm">
            <span className="font-medium">End:</span> {new Date(task.timeline.endDate).toLocaleDateString()}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Assignment</h4>
          <p className="text-sm">
            <span className="font-medium">Assignee:</span> {task.assignee}
          </p>
          <p className="text-sm">
            <span className="font-medium">Created:</span> {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  ), []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Project Tasks with Timeline Progress</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        This demo showcases the TimelineProgress column type that visualizes task timelines with a progress bar.
      </p>

      <DataTable
        columns={TASK_TABLE_COLUMNS}
        data={tasks}
        enableRowSelection={true}
        enableSorting={true}
        enablePagination={true}
        enableColumnVisibility={true}
        filterColumn="title"
        filterPlaceholder="Filter by title..."
        rowActions={getRowActions}
        facets={TASK_TABLE_FACETS}
        isPaginationLoading={loading}

        // Enhanced features
        export={{
          enabled: true,
          formats: ["csv", "excel"],
          filename: "tasks-data"
        }}

        // Expandable rows
        expandableRows={{
          render: renderTaskDetails,
          expandOnClick: true,
          singleExpand: true
        }}
      />
    </div>
  )
}

export default TaskTimelineDemo
