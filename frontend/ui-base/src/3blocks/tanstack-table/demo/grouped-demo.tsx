"use client"

import { Button } from "@/src/1base"
import React from "react"
import { DataTable } from "../components/DataTable"

// Define a task interface
interface Task {
  id: string
  name: string
  status: "Todo" | "In Design" | "In Review" | "Done"
  category: string
  startDate: string
  dueDate: string
  priority: "Low" | "Normal" | "Medium" | "High" | "" // Empty string for "Add" state
  people: string[] // Array of user IDs or initials
}

// Generate avatar components
const Avatar = ({ initial }: { initial: string }) => (
  <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-purple-100 font-medium text-xs">
    {initial}
  </div>
)

const EmptyAvatar = () => (
  <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-100" />
)

// People renderer component
const _PeopleCell = ({ value }: { value: string[] }) => {
  if (!value || value.length === 0 || (value.length === 1 && value[0] === "")) {
    return <EmptyAvatar />
  }

  return (
    <div className="-space-x-2 flex">
      {value.map((initial, index) => (
        <div
          key={index}
          className="ring-2 ring-white"
          style={{ zIndex: 10 - index }}
        >
          <Avatar initial={initial} />
        </div>
      ))}
    </div>
  )
}

// Priority cell renderer
const _PriorityCell = ({ value }: { value: string }) => {
  if (!value) {
    return (
      <div className="inline-flex items-center rounded-md border border-transparent bg-gray-100 px-2.5 py-0.5 font-semibold text-gray-800 text-xs transition-colors">
        Add
      </div>
    )
  }

  // Map priority values to colors
  const colorMap: Record<string, string> = {
    Low: "bg-gray-100 text-gray-800",
    Normal: "bg-purple-100 text-purple-800",
    Medium: "bg-amber-100 text-amber-800",
    High: "bg-red-100 text-red-800",
  }

  const color = colorMap[value] || "bg-gray-100 text-gray-800"

  return (
    <div
      className={`inline-flex items-center rounded-md border border-transparent px-2.5 py-0.5 font-semibold text-xs transition-colors ${color}`}
    >
      {value}
    </div>
  )
}

// Define standardized category identifiers and their display labels
const categoryMapping = {
  valueToIdentifier: {
    Todo: "todo",
    "In Design": "in_design",
    "In Review": "in_review",
    Done: "done",
  },
  identifierToLabel: {
    todo: "Todo",
    in_design: "In Design",
    in_review: "In Review",
    done: "Done",
  },
}

// Sample task data with category field containing standardized identifiers
const SAMPLE_TASKS: Task[] = [
  // Todo tasks
  {
    id: "task1",
    name: "Create more options for Navbar",
    status: "Todo", // For backwards compatibility
    category: "todo", // Standardized identifier
    startDate: "2023-12-12",
    dueDate: "2023-12-20",
    priority: "Normal",
    people: ["AS", "JD"],
  },
  {
    id: "task2",
    name: "Update Sidebar",
    status: "Todo",
    category: "todo",
    startDate: "2023-12-14",
    dueDate: "2023-12-16",
    priority: "",
    people: [],
  },

  // In Design tasks
  {
    id: "task3",
    name: "Customize Setting Page",
    status: "In Design",
    category: "in_design",
    startDate: "2023-12-16",
    dueDate: "2023-12-18",
    priority: "Medium",
    people: ["AS", "MJ"],
  },
  {
    id: "task4",
    name: "Pricing Card",
    status: "In Design",
    category: "in_design",
    startDate: "2023-12-14",
    dueDate: "2023-12-16",
    priority: "Normal",
    people: ["MJ"],
  },
  {
    id: "task5",
    name: "Use Projects to organize content",
    status: "In Design",
    category: "in_design",
    startDate: "2023-12-24",
    dueDate: "2024-01-01",
    priority: "Low",
    people: ["AS", "MJ"],
  },

  // In Review tasks
  {
    id: "task6",
    name: "Connect Github to Gitlab",
    status: "In Review",
    category: "in_review",
    startDate: "2023-12-16",
    dueDate: "2023-12-18",
    priority: "",
    people: ["AS", "JD"],
  },
  {
    id: "task7",
    name: "Create Foundation Color",
    status: "In Review",
    category: "in_review",
    startDate: "2023-12-18",
    dueDate: "2023-12-21",
    priority: "High",
    people: ["AS", "JD", "MJ"],
  },
  {
    id: "task8",
    name: "Redesign Homepage + Details Product",
    status: "In Review",
    category: "in_review",
    startDate: "2023-12-24",
    dueDate: "2024-01-01",
    priority: "Normal",
    people: ["JD"],
  },

  // Done tasks
  {
    id: "task9",
    name: "Implement Auth System",
    status: "Done",
    category: "done",
    startDate: "2023-12-01",
    dueDate: "2023-12-10",
    priority: "High",
    people: ["AS", "JD", "MJ"],
  },
  {
    id: "task10",
    name: "Create Base Components",
    status: "Done",
    category: "done",
    startDate: "2023-11-15",
    dueDate: "2023-11-30",
    priority: "Medium",
    people: ["AS"],
  },
]

// Column definitions for tasks table
// We include both status and category columns for flexibility, but hide them from display
const TASK_TABLE_COLUMNS = [
  {
    headingName: "Name",
    type: "String" as const,
    accessorKey: "name" as const,
    id: "name",
    enableSorting: true,
  },
  {
    headingName: "Start date",
    type: "Date" as const,
    accessorKey: "startDate" as const,
    id: "startDate",
    enableSorting: true,
    format: {
      dateFormat: "DD/MM/YY",
    },
  },
  {
    headingName: "Due date",
    type: "Date" as const,
    accessorKey: "dueDate" as const,
    id: "dueDate",
    enableSorting: true,
    format: {
      dateFormat: "DD/MM/YY",
    },
  },
  {
    headingName: "Priority",
    type: "String" as const,
    accessorKey: "priority" as const,
    id: "priority",
    enableSorting: true,
    cell: ({ getValue }: { getValue: () => any }) => {
      const value = getValue()
      if (!value)
        return (
          <div className="inline-flex items-center rounded-md border border-transparent bg-gray-100 px-2.5 py-0.5 font-semibold text-gray-800 text-xs transition-colors">
            Add
          </div>
        )
      const priorityDisplayMap: Record<string, React.ReactNode> = {
        Low: (
          <div className="inline-flex items-center rounded-md border border-transparent bg-gray-100 px-2.5 py-0.5 font-semibold text-gray-800 text-xs transition-colors">
            Low
          </div>
        ),
        Normal: (
          <div className="inline-flex items-center rounded-md border border-transparent bg-purple-100 px-2.5 py-0.5 font-semibold text-purple-800 text-xs transition-colors">
            Normal
          </div>
        ),
        Medium: (
          <div className="inline-flex items-center rounded-md border border-transparent bg-amber-100 px-2.5 py-0.5 font-semibold text-amber-800 text-xs transition-colors">
            Medium
          </div>
        ),
        High: (
          <div className="inline-flex items-center rounded-md border border-transparent bg-red-100 px-2.5 py-0.5 font-semibold text-red-800 text-xs transition-colors">
            High
          </div>
        ),
      }
      return priorityDisplayMap[value] || value
    },
  },
  {
    headingName: "People",
    type: "String" as const,
    accessorKey: "people" as const,
    id: "people",
    enableSorting: false,
    cell: ({ getValue }: { getValue: () => any }) => {
      const people = getValue() as string[]
      if (!people.length)
        return <span className="text-muted-foreground">None</span>
      return (
        <div className="-space-x-2 flex">
          {people.map((initial, index) => (
            <div
              key={index}
              className="ring-2 ring-white"
              style={{ zIndex: 10 - index }}
            >
              <Avatar initial={initial} />
            </div>
          ))}
        </div>
      )
    },
  },
  {
    headingName: "Status",
    type: "String" as const,
    accessorKey: "status" as const,
    id: "status",
    enableSorting: true,
    enableHiding: true, // Hide status column as we're using category for grouping
  },
  {
    headingName: "Category",
    type: "String" as const,
    accessorKey: "category" as const,
    id: "category",
    enableSorting: true,
    enableHiding: true, // We'll hide this from display but use it for grouping
  },
]

// Main demo component
export default function GroupedTasksDemo() {
  // Set initial column visibility to hide the status column
  const initialColumnVisibility = {
    status: false, // Hide the status column since we're grouping by it
    category: false, // Hide the category column since we're grouping by it
  }

  // State for external column visibility control
  const [columnVisibility, setColumnVisibility] = React.useState<
    Record<string, boolean>
  >(initialColumnVisibility)

  // Toggle individual column visibility from outside the DataTable
  const toggleColumnVisibility = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }))
  }

  // Toggle all columns visibility
  const toggleAllColumns = (visible: boolean) => {
    const allColumns = TASK_TABLE_COLUMNS.reduce(
      (acc, column) => {
        acc[column.id || String(column.accessorKey)] = visible
        return acc
      },
      {} as Record<string, boolean>
    )

    setColumnVisibility(allColumns)
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* External Column Visibility Controls */}
      <div className="mb-4 rounded-md border border-gray-200 p-4">
        <h3 className="mb-2 font-medium text-lg">External Column Controls</h3>
        <div className="flex flex-wrap gap-2">
          {TASK_TABLE_COLUMNS.map((column) => {
            const columnId = column.id || String(column.accessorKey)
            const isVisible = columnVisibility[columnId] !== false // Default to visible if not specified

            return (
              <Button
                key={columnId}
                variant="ghost"
                size="1"
                onClick={() => toggleColumnVisibility(columnId)}
                className={`border ${
                  isVisible
                    ? "border-blue-300 bg-blue-100 text-blue-700"
                    : "border-gray-200 bg-gray-100 text-gray-500"
                }`}
              >
                {column.headingName}
                <span className="ml-2">{isVisible ? "✓" : "✗"}</span>
              </Button>
            )
          })}
          <div className="mt-2 flex w-full gap-2">
            <Button
              variant="ghost"
              size="1"
              onClick={() => toggleAllColumns(true)}
              color="green"
            >
              Show All
            </Button>
            <Button
              variant="ghost"
              size="1"
              onClick={() => toggleAllColumns(false)}
              color="red"
            >
              Hide All
            </Button>
          </div>
        </div>
      </div>

      {/* DataTable */}
      <div className="overflow-hidden rounded-md border border-gray-200 shadow-sm">
        <DataTable
          columns={TASK_TABLE_COLUMNS}
          data={SAMPLE_TASKS}
          // Enabling row grouping feature with the category field
          enableRowGrouping={true}
          rowGrouping={{
            groupByColumn: "category", // Using standardized category identifiers
            initiallyCollapsed: false,
            toggleOnClick: true,
            // Pass category mapping for standardized identifiers
            categoryMapping: categoryMapping,
          }}
          // Other options
          enableRowSelection={true}
          enableFiltering={false}
          showRowCount={false}
          enableColumnVisibility={true} // Enable column visibility control
          // External column visibility control
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          enablePagination={false}
          className="border-none"
          // Custom props to hide main header and show at group level
          hideMainHeader={true}
        />
      </div>
    </div>
  )
}
