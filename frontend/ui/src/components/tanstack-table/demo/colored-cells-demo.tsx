"use client"

import React, { useState, useEffect, useCallback } from "react"
import { DataTable } from "../components/DataTable"
import { EyeIcon } from "lucide-react"
import { RowAction } from "../types"

// Define task interface
interface Task {
  id: string
  title: string
  assignee: string
  status: 'Todo' | 'In Progress' | 'In Review' | 'Done' | 'Critical'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  tags: string[]
  created: string
  timeline?: {
    startDate: string
    endDate: string
  }
}

// Sample data
const SAMPLE_TASKS: Task[] = [
  {
    id: "task1",
    title: "Design system updates",
    assignee: "Alice Smith",
    status: "In Progress",
    priority: "High",
    tags: ["design", "ui"],
    created: "2025-04-18",
    timeline: {
      startDate: "2025-04-15",
      endDate: "2025-06-01"
    }
  },
  {
    id: "task2",
    title: "API integration",
    assignee: "Bob Johnson",
    status: "Todo",
    priority: "Critical",
    tags: ["backend", "api"],
    created: "2025-05-05",
    timeline: {
      startDate: "2025-05-10",
      endDate: "2025-05-25"
    }
  },
  {
    id: "task3",
    title: "User onboarding flow",
    assignee: "Carol Williams",
    status: "In Review",
    priority: "Medium",
    tags: ["ux", "design"],
    created: "2025-04-18",
    timeline: {
      startDate: "2025-04-20",
      endDate: "2025-05-15"
    }
  },
  {
    id: "task4",
    title: "Performance optimization",
    assignee: "David Brown",
    status: "In Progress",
    priority: "High",
    tags: ["frontend", "performance"],
    created: "2025-04-29",
    timeline: {
      startDate: "2025-05-01",
      endDate: "2025-05-20"
    }
  },
  {
    id: "task5",
    title: "Bug fixes for release v2.1",
    assignee: "Eva Garcia",
    status: "Done",
    priority: "Critical",
    tags: ["bugfix", "backend"],
    created: "2025-04-23",
    timeline: {
      startDate: "2025-04-25",
      endDate: "2025-05-05"
    }
  },
  {
    id: "task6",
    title: "Documentation update",
    assignee: "Frank Lee",
    status: "Todo",
    priority: "Low",
    tags: ["docs", "api"],
    created: "2025-05-16",
    timeline: {
      startDate: "2025-05-17",
      endDate: "2025-06-10"
    }
  }
]

// Status cell colors - matching the screenshot
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Todo':
      return '#3b82f6' // Blue
    case 'In Progress':
      return '#f59e0b' // Amber/Orange
    case 'In Review': 
      return '#ec4899' // Pink
    case 'Done':
      return '#10b981' // Green
    case 'Critical':
      return '#ef4444' // Red
    default:
      return '#6b7280' // Gray
  }
}

// Column definitions to match the screenshot
const TASK_TABLE_COLUMNS = [
  {
    headingName: "Title",
    type: "String" as const,
    accessorKey: "title" as const,
    id: "title",
    enableSorting: true,
  },
  {
    headingName: "Assignee",
    type: "String" as const,
    accessorKey: "assignee" as const,
    id: "assignee",
    enableSorting: true,
  },
  {
    headingName: "Status",
    type: "String" as const,
    accessorKey: "status" as const,
    id: "status",
    enableSorting: true,
    // Apply background color based on status value - only this column has full cell background
    cellBackgroundColor: (value: string) => getStatusColor(value),
    // Render status with white text for better contrast against colored background
    renderer: (value: string) => (
      <span className="font-medium">
        {value}
      </span>
    )
  },
  {
    headingName: "Priority",
    type: "String" as const,
    accessorKey: "priority" as const,
    id: "priority",
    enableSorting: true,
    // Normal rendering with no background color
    renderer: (value: string) => (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        ${value === 'Critical' ? 'bg-red-100 text-red-800' : 
          value === 'High' ? 'bg-orange-100 text-orange-800' : 
          value === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-green-100 text-green-800'}`}
      >
        {value}
      </span>
    )
  },
  {
    headingName: "Tags",
    type: "Tag" as const,
    accessorKey: "tags" as const,
    id: "tags",
    // Tags are rendered as pills
    renderer: (value: string[]) => (
      <div className="flex flex-wrap gap-1">
        {value.map((tag, i) => (
          <span 
            key={i} 
            className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
          >
            {tag}
          </span>
        ))}
      </div>
    )
  },
  {
    headingName: "Created",
    type: "Date" as const,
    accessorKey: "created" as const,
    id: "created",
    enableSorting: true,
    format: {
      dateFormat: "MMM DD, YYYY"
    }
  },
  {
    headingName: "Timeline Progress",
    type: "String" as const,
    accessorKey: "timeline" as const, // Adding accessorKey to fix type error
    id: "timeline-progress",
    cell: ({ row }: { row: { original: Task } }) => { // Adding proper type for row parameter
      const task = row.original;
      if (!task.timeline) return null;
      
      const startDate = new Date(task.timeline.startDate);
      const endDate = new Date(task.timeline.endDate);
      const today = new Date();
      
      // Calculate percentage of timeline completed
      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsedDuration = Math.min(today.getTime() - startDate.getTime(), totalDuration);
      const progress = Math.max(0, Math.min(100, (elapsedDuration / totalDuration) * 100));
      
      // Format dates for display
      const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      };
      
      return (
        <div className="w-full">
          <div className="w-full bg-gray-200 h-2 rounded-full mt-1 mb-1">
            <div 
              className={`h-2 rounded-full ${
                progress >= 80 ? 'bg-green-500' : 
                progress >= 40 ? 'bg-amber-500' : 
                'bg-red-500'
              }`}
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatDate(startDate)}</span>
            <span>{formatDate(endDate)}</span>
          </div>
        </div>
      );
    }
  }
]

// Filter definitions
const TASK_FACETS = [
  {
    column: "status",
    title: "Status",
    options: [
      { label: "Todo", value: "Todo" },
      { label: "In Progress", value: "In Progress" },
      { label: "In Review", value: "In Review" },
      { label: "Done", value: "Done" },
      { label: "Critical", value: "Critical" }
    ]
  },
  {
    column: "priority",
    title: "Priority",
    options: [
      { label: "Low", value: "Low" },
      { label: "Medium", value: "Medium" },
      { label: "High", value: "High" },
      { label: "Critical", value: "Critical" }
    ]
  },
  {
    column: "tags",
    title: "Tags",
    options: [
      { label: "design", value: "design" },
      { label: "ui", value: "ui" },
      { label: "ux", value: "ux" },
      { label: "api", value: "api" },
      { label: "backend", value: "backend" },
      { label: "frontend", value: "frontend" },
      { label: "performance", value: "performance" },
      { label: "bugfix", value: "bugfix" },
      { label: "docs", value: "docs" }
    ]
  }
]

/**
 * ColoredCellsDemo - Demonstrates the full cell background color feature
 */
function ColoredCellsDemo() {
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
      icon: <EyeIcon className="h-4 w-4" />
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
      disabled: task.status === "In Progress" // Disable delete for in-progress tasks
    },
  ], [])

  // Task detail component for expandable rows
  const renderTaskDetails = useCallback((task: Task) => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Task details for {task.title}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Task Details</h4>
          <p className="text-sm">
            <span className="font-medium">Status:</span> {task.status}
          </p>
          <p className="text-sm">
            <span className="font-medium">Priority:</span> {task.priority}
          </p>
          <p className="text-sm">
            <span className="font-medium">Assignee:</span> {task.assignee}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Timeline</h4>
          {task.timeline && (
            <>
              <p className="text-sm">
                <span className="font-medium">Start:</span> {new Date(task.timeline.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">End:</span> {new Date(task.timeline.endDate).toLocaleDateString()}
              </p>
            </>
          )}
          <p className="text-sm">
            <span className="font-medium">Created:</span> {new Date(task.created).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  ), []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Task Status Board</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        This demo showcases the cell background color feature with colored status cells.
        Only the Status column has full-cell background coloring with automatic white text.
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
        facets={TASK_FACETS}
        rowActions={getRowActions}
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

export default ColoredCellsDemo
