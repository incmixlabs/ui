"use client"

import React from "react"
import { DataTable } from "../components/DataTable"

// Define a task interface
interface Task {
  id: string
  name: string
  status: 'Todo' | 'In Design' | 'In Review' | 'Done'
  startDate: string
  dueDate: string
  priority: 'Low' | 'Normal' | 'Medium' | 'High' | '' // Empty string for "Add" state
  people: string[] // Array of user IDs or initials
}

// Generate avatar components
const Avatar = ({ initial }: { initial: string }) => (
  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden text-xs font-medium">
    {initial}
  </div>
);

const EmptyAvatar = () => (
  <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
  </div>
);

// People renderer component
const PeopleCell = ({ value }: { value: string[] }) => {
  if (!value || value.length === 0 || (value.length === 1 && value[0] === '')) {
    return <EmptyAvatar />;
  }
  
  return (
    <div className="flex -space-x-2">
      {value.map((initial, index) => (
        <div key={index} className="ring-2 ring-white" style={{ zIndex: 10 - index }}>
          <Avatar initial={initial} />
        </div>
      ))}
    </div>
  );
};

// Priority cell renderer
const PriorityCell = ({ value }: { value: string }) => {
  if (!value) {
    return (
      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors
                    border-transparent bg-gray-100 text-gray-800">
        Add
      </div>
    );
  }
  
  // Map priority values to colors
  const colorMap: Record<string, string> = {
    'Low': 'bg-gray-100 text-gray-800',
    'Normal': 'bg-purple-100 text-purple-800',
    'Medium': 'bg-amber-100 text-amber-800',
    'High': 'bg-red-100 text-red-800'
  };
  
  const color = colorMap[value] || 'bg-gray-100 text-gray-800';
  
  return (
    <div className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors
                     border-transparent ${color}`}>
      {value}
    </div>
  );
};

// Sample data for tasks
const SAMPLE_TASKS: Task[] = [
  // Todo tasks
  {
    id: "task1",
    name: "Create more options for Navbar",
    status: "Todo",
    startDate: "2023-12-12",
    dueDate: "2023-12-20",
    priority: "Normal",
    people: ["AS", "JD"]
  },
  {
    id: "task2",
    name: "Update Sidebar",
    status: "Todo",
    startDate: "2023-12-14",
    dueDate: "2023-12-16",
    priority: "",
    people: [""]
  },
  
  // In Design tasks
  {
    id: "task3",
    name: "Customize Setting Page",
    status: "In Design",
    startDate: "2023-12-16",
    dueDate: "2023-12-18",
    priority: "Medium",
    people: ["AS", "MJ"]
  },
  {
    id: "task4",
    name: "Pricing Card",
    status: "In Design",
    startDate: "2023-12-14",
    dueDate: "2023-12-16",
    priority: "Normal",
    people: ["JD"]
  },
  {
    id: "task5",
    name: "Use Projects to organize content",
    status: "In Design",
    startDate: "2023-12-24",
    dueDate: "2024-01-01",
    priority: "Low",
    people: ["AS", "MJ"]
  },
  
  // In Review tasks
  {
    id: "task6",
    name: "Connect Github to Gitlab",
    status: "In Review",
    startDate: "2023-12-16",
    dueDate: "2023-12-18",
    priority: "",
    people: ["AS", "JD"]
  },
  {
    id: "task7",
    name: "Create Foundation Color",
    status: "In Review",
    startDate: "2023-12-18",
    dueDate: "2023-12-21",
    priority: "High",
    people: ["AS", "JD", "MJ"]
  },
  {
    id: "task8",
    name: "Redesign Homepage + Details Product",
    status: "In Review",
    startDate: "2023-12-24",
    dueDate: "2024-01-01",
    priority: "Normal",
    people: ["JD"]
  },
  
  // Done tasks
  {
    id: "task9",
    name: "Implement Auth System",
    status: "Done",
    startDate: "2023-12-01",
    dueDate: "2023-12-10",
    priority: "High",
    people: ["AS", "JD", "MJ"]
  },
  {
    id: "task10",
    name: "Create Base Components",
    status: "Done",
    startDate: "2023-11-15",
    dueDate: "2023-11-30",
    priority: "Medium",
    people: ["AS"]
  }
]

// Column definitions for tasks table
// Important: We MUST include the status column in our definition for proper grouping,
// even though we'll hide it from display
const TASK_TABLE_COLUMNS = [
  {
    headingName: "Name",
    type: "String" as const,
    accessorKey: "name" as const,
    id: "name",
    enableSorting: true
  },
  {
    headingName: "Start date",
    type: "Date" as const,
    accessorKey: "startDate" as const,
    id: "startDate",
    enableSorting: true,
    format: {
      dateFormat: "DD/MM/YY"
    }
  },
  {
    headingName: "Due date",
    type: "Date" as const,
    accessorKey: "dueDate" as const,
    id: "dueDate",
    enableSorting: true,
    format: {
      dateFormat: "DD/MM/YY"
    }
  },
  {
    headingName: "Priority",
    type: "Custom" as const,
    accessorKey: "priority" as const,
    id: "priority",
    enableSorting: true,
    cell: (info: any) => <PriorityCell value={info.getValue()} />
  },
  {
    headingName: "People",
    type: "Custom" as const,
    accessorKey: "people" as const,
    id: "people",
    cell: (info: any) => <PeopleCell value={info.getValue()} />
  },
  // Include status column but we'll hide it - this is crucial for grouping to work correctly
  {
    headingName: "Status",
    type: "String" as const,
    accessorKey: "status" as const,
    id: "status",
    enableHiding: true, // Allow the column to be hidden
  }
]

// Main demo component
export default function GroupedTasksDemo() {
  // Set initial column visibility to hide the status column
  const initialColumnVisibility = {
    status: false // Hide the status column since we're grouping by it
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <DataTable
        columns={TASK_TABLE_COLUMNS}
        data={SAMPLE_TASKS}
        // Enabling row grouping feature
        enableRowGrouping={true}
        rowGrouping={{
          groupByColumn: "status",
          initiallyCollapsed: false,
          toggleOnClick: true
        }}
        // Other options
        enableRowSelection={true}
        enableFiltering={false}
        showRowCount={false}
        enableColumnVisibility={true} // Enable column visibility control
        initialColumnVisibility={initialColumnVisibility} // Set initial hidden columns
        enablePagination={false}
        className="border-none"
        // Custom props to hide main header and show at group level
        hideMainHeader={true}
      />
    </div>
  )
}
