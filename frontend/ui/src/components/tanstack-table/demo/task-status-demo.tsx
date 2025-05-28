"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { 
  registerCellRenderer, 
  cellRendererRegistry, 
  DropdownOption, 
  getContrastingTextColor, 
  adjustColor 
} from "../cell-renderers"
import { DataTable } from "../components/DataTable"
import { EyeIcon, EditIcon } from "lucide-react"
import { RowAction } from "../types"
import { ColumnConfigDialog, ColumnConfig } from "../components/ColumnConfigDialog"
import DropdownCellEditor from "../components/DropdownCellEditor"

// Custom rating cell renderer
const RatingCell: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= value ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Register the custom cell renderer (with idempotency check)
if (!cellRendererRegistry["Rating"]) {
  registerCellRenderer("Rating", (value) => <RatingCell value={value} />)
}

// Define task interface
interface Task {
  id: string
  name: string
  email: string
  joinDate: string
  tags: string[]
  status: string  // New status field (todo, doing, done)
  plan: string
  balance: number
  rating: number
  profileImage: string
}

// Sample data
const SAMPLE_TASKS: Task[] = [
  {
    id: "task1",
    name: "Website Redesign",
    email: "alice@example.com",
    joinDate: "2023-01-15T10:30:00",
    tags: ["design", "frontend"],
    status: "doing",
    plan: "success",
    balance: 2480,
    rating: 5,
    profileImage: "https://i.pravatar.cc/150?u=alice"
  },
  {
    id: "task2",
    name: "API Integration",
    email: "bob@example.com",
    joinDate: "2023-02-20",
    tags: ["backend"],
    status: "todo",
    plan: "pending",
    balance: 1250,
    rating: 3,
    profileImage: "https://i.pravatar.cc/150?u=bob"
  },
  {
    id: "task3",
    name: "User Testing",
    email: "carol@example.com",
    joinDate: "2023-03-10T14:15:00",
    tags: ["qa"],
    status: "done",
    plan: "success",
    balance: 3200,
    rating: 4,
    profileImage: "https://i.pravatar.cc/150?u=carol"
  },
  {
    id: "task4",
    name: "Mobile App Update",
    email: "david@example.com",
    joinDate: "2023-04-05",
    tags: ["mobile"],
    status: "doing",
    plan: "pending",
    balance: 1890,
    rating: 4,
    profileImage: "https://i.pravatar.cc/150?u=david"
  },
  {
    id: "task5",
    name: "Security Audit",
    email: "eva@example.com",
    joinDate: "2023-05-12",
    tags: ["security"],
    status: "todo",
    plan: "failed",
    balance: 750,
    rating: 2,
    profileImage: "https://i.pravatar.cc/150?u=eva"
  }
]

// Define task status dropdown options with colors
const STATUS_OPTIONS: DropdownOption[] = [
  { value: "todo", label: "To Do", color: "#93c5fd" },  // Light blue
  { value: "doing", label: "Doing", color: "#fcd34d" }, // Light yellow
  { value: "done", label: "Done", color: "#86efac" }    // Light green
];

// Create a map of status colors for the Status cell renderer (format it requires)
const STATUS_COLOR_MAP = {
  todo: { color: "bg-blue-100 text-blue-700 ring-blue-600/20" },
  doing: { color: "bg-yellow-100 text-yellow-700 ring-yellow-600/20" },
  done: { color: "bg-green-100 text-green-700 ring-green-600/20" }
};

// Register a custom cell renderer for our dropdown status
if (!cellRendererRegistry["ColoredStatus"]) {
  registerCellRenderer("ColoredStatus", (value, options) => {
    // Find the selected option
    const option = options?.find((opt: DropdownOption) => opt.value === value) || { 
      value, 
      label: value, 
      color: "#e5e7eb" 
    };
    
    // Return a styled span that looks like our dropdown option
    return (
      <span
        className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize"
        style={{
          backgroundColor: option.color,
          color: option.color ? getContrastingTextColor(option.color) : "#000000",
          borderColor: option.color ? adjustColor(option.color, -20) : "#d1d5db"
        }}
      >
        {option.label || value}
      </span>
    );
  });
}

// Custom cell editor for dropdown status
const CustomDropdownCellEditor: React.FC<{ 
  value: string;
  options: DropdownOption[];
  onSave: (newValue: string) => void;
  onCancel: () => void;
}> = ({ value, options, onSave, onCancel }) => {
  return (
    <DropdownCellEditor
      value={value}
      options={options}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};

// We'll handle the dropdown cell editing directly in the DataTable component
// via the custom editor for the status column instead of registering a renderer

// Column definitions
const TASK_TABLE_COLUMNS = [
  {
    headingName: "Task Name",
    type: "String" as const,
    accessorKey: "name" as const,
    id: "name",
    enableSorting: true,
    enableInlineEdit: true, // Enable inline editing for this column
    // Custom renderer for display (doesn't affect inline editing)
    renderer: (value: string, row: Task) => (
      <div className="flex items-center space-x-2">
        <img
          src={row.profileImage}
          alt={value}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span>{value}</span>
      </div>
    )
  },
  {
    headingName: "Assignee Email",
    type: "String" as const,
    accessorKey: "email" as const,
    id: "email",
    enableSorting: true,
    enableInlineEdit: true
  },
  {
    headingName: "Created Date",
    type: "Date" as const,
    accessorKey: "joinDate" as const,
    id: "joinDate",
    enableSorting: true,
    enableInlineEdit: true,
    // Date formatting
    format: {
      dateFormat: "YYYY-MM-DD HH:mm"
    }
  },
  {
    headingName: "Status", // This is just the display name, can be anything
    type: "Dropdown" as const, // Using the new Dropdown type
    accessorKey: "status" as const,
    id: "status",
    enableSorting: true,
    enableInlineEdit: true,
    // Define dropdown options in the column config so it's reusable
    meta: {
      editable: true,
      dropdownOptions: STATUS_OPTIONS // Passing the options to the cell
    },
    // Custom cell renderer for dropdown values with colors
    cell: (props: { getValue: () => any; row: { original: any }; column: { columnDef: any } }) => {
      const value = props.getValue() as string;
      // Use the options from meta data
      const options = props.column.columnDef.meta?.dropdownOptions || STATUS_OPTIONS;
      
      // Find the selected option
      const option = options.find((opt: DropdownOption) => opt.value === value) || { 
        value, 
        label: value, 
        color: "#e5e7eb" 
      };
      
      return (
        <span
          className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize"
          style={{
            backgroundColor: option.color || "#e5e7eb",
            color: getContrastingTextColor(option.color || "#e5e7eb"),
            borderColor: adjustColor(option.color || "#e5e7eb", -20)
          }}
        >
          {option.label}
        </span>
      );
    },
    // Add cursor style and hint for better UX
    cellAttributes: {
      className: "cursor-pointer transition-colors duration-150 hover:bg-gray-50",
      title: "Double-click to select from dropdown"
    },
    // Custom inline editor for dropdown that appears on double-click
    inlineCellEditor: (props: { value: any, onSave: (newValue: any) => void, onCancel: () => void, columnDef?: any }) => {
      // Get options from column definition and handle both required and optional params
      const { value, onSave, onCancel, columnDef } = props;
      const options = columnDef?.meta?.dropdownOptions || STATUS_OPTIONS;
      
      return (
        <CustomDropdownCellEditor 
          value={value as string} 
          options={options}
          onSave={(newValue: string) => onSave(newValue)} 
          onCancel={onCancel} 
        />
      );
    }
  },
  {
    headingName: "Tags",
    type: "Tag" as const,
    accessorKey: "tags" as const,
    id: "tags",
    enableInlineEdit: true
  },
  {
    headingName: "Priority",
    type: "Status" as const,
    accessorKey: "plan" as const,
    id: "plan"
  },
  {
    headingName: "Budget",
    type: "Currency" as const,
    accessorKey: "balance" as const,
    id: "balance",
    enableSorting: true,
    // Example of custom currency formatting
    format: {
      numberFormat: {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }
    }
  },
  {
    headingName: "Rating",
    type: "Rating" as const,
    accessorKey: "rating" as const,
    id: "rating",
    enableSorting: true
  }
]

// Filter definitions
const TASK_TABLE_FACETS = [
  {
    column: "status",
    title: "Task Status",
    options: [
      { label: "To Do", value: "todo", color: "#93c5fd" }, // Match our dropdown colors
      { label: "Doing", value: "doing", color: "#fcd34d" },
      { label: "Done", value: "done", color: "#86efac" }
    ]
  },
  {
    column: "plan",
    title: "Priority",
    options: [
      { label: "High", value: "success" },
      { label: "Medium", value: "pending" },
      { label: "Low", value: "failed" }
    ]
  }
]

/**
 * Task Management Demo with Inline Cell Editing
 * This demo shows how to use the DataTable component for task management
 */
const TaskStatusDemo = () => {
  // Store all tasks data
  const [allTasks, setAllTasks] = useState<Task[]>([...SAMPLE_TASKS])

  // Data and loading state for current page
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  // Track last edited cell for visual feedback
  const [lastEditedCell, setLastEditedCell] = useState<{id: string, column: string} | null>(null);
  
  // State for column configuration dialog
  const [isColumnConfigOpen, setIsColumnConfigOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ColumnConfig | null>(null);
  const [columns, setColumns] = useState<typeof TASK_TABLE_COLUMNS>(TASK_TABLE_COLUMNS);

  /**
   * Fetch tasks (simulated API call)
   */
  const fetchTasks = useCallback(async () => {
    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
      setTasks([...allTasks])
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }, [allTasks])

  // Initial data load
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  /**
   * Define row actions
   */
  const getRowActions = useCallback((row: Task): RowAction[] => {
    return [
      {
        label: "View Details",
        icon: <EyeIcon className="h-4 w-4" />,
        onClick: () => {
          console.log("Viewing task details:", row.name)
          alert(`Viewing details for task: ${row.name}`)
        }
      },
      {
        label: "Edit Task",
        icon: <EditIcon className="h-4 w-4" />,
        onClick: () => {
          console.log("Editing task:", row.name)
          alert(`Editing task: ${row.name}`)
        }
      }
    ]
  }, [])

  /**
   * Handle cell edit - key functionality for inline editing
   * This implementation prevents full table reloads by immutably updating only the changed data
   */
  const handleCellEdit = useCallback((rowData: Task, columnId: string, newValue: any) => {
    console.log(`Editing cell ${columnId} for task ${rowData.id}:`, newValue)

    // Track which cell was just edited (for visual feedback)
    setLastEditedCell({id: rowData.id, column: columnId});

    // Create updated task
    const updatedTask = {
      ...rowData,
      [columnId]: newValue
    }

    // Update the task in the full dataset (immutably)
    setAllTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )

    // Only update the changed task in the current view
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )

    // Clear the visual feedback after a delay
    setTimeout(() => {
      setLastEditedCell(null);
    }, 1000);
  }, [])
  
  /**
   * Handle column header double-click to open configuration dialog
   */
  const handleHeaderDoubleClick = useCallback((columnId: string) => {
    // Find the column by ID
    const column = columns.find(col => col.id === columnId);
    if (column) {
      // Set the selected column and open the dialog
      setSelectedColumn({
        id: column.id,
        headingName: column.headingName,
        type: column.type
      });
      setIsColumnConfigOpen(true);
    }
  }, [columns]);
  
  /**
   * Handle saving column configuration changes
   */
  const handleSaveColumnConfig = useCallback((columnId: string, updates: Partial<ColumnConfig>) => {
    // Create a copy of columns to work with
    const updatedColumns = [...columns];
    
    // Find the column to update
    const columnIndex = updatedColumns.findIndex(col => col.id === columnId);
    
    if (columnIndex !== -1) {
      // Update the column's properties
      if (updates.headingName) {
        // Update just the text part of the heading, preserving the double-clickable wrapper
        const originalColumn = columns[columnIndex];
        const updatedColumn = {
          ...originalColumn,
          // Store the original heading name as text (for future reference)
          _originalHeading: updates.headingName,
          // For display purposes, keep using the original heading name format but with updated text
          headingName: updates.headingName
        };
        
        // Replace the column in our array
        updatedColumns[columnIndex] = updatedColumn;
      }
      
      // Set the updated columns array
      setColumns(updatedColumns as typeof TASK_TABLE_COLUMNS);
    }
    
    console.log(`Updated column ${columnId}:`, updates);
  }, [columns]);

  // Function to enhance column definition with double-click handler
  const enhanceColumnsWithDoubleClick = useMemo(() => {
    // Create a wrapper div for each header with double-click handler
    return columns.map(column => {
      // Get display text (either the current heading or its original string value)
      const displayText = typeof column.headingName === 'string' 
        ? column.headingName 
        : (column as any)._originalHeading || column.headingName;
      
      // Create a double-click wrapper for the heading
      const doubleClickableHeading = (
        <div 
          className="cursor-pointer w-full h-full" 
          onDoubleClick={() => handleHeaderDoubleClick(column.id)}
          title="Double-click to configure column"
        >
          {displayText}
        </div>
      );
      
      // Return column with modified heading display
      return {
        ...column,
        // Store the original heading name but display our custom one
        headingName: doubleClickableHeading as any
      };
    });
  }, [columns, handleHeaderDoubleClick]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Task Management Dashboard</h1>

      {/* Column configuration dialog */}
      <ColumnConfigDialog
        isOpen={isColumnConfigOpen}
        onClose={() => setIsColumnConfigOpen(false)}
        column={selectedColumn}
        onSave={handleSaveColumnConfig}
      />

      <DataTable
        columns={enhanceColumnsWithDoubleClick}
        data={tasks}
        enableRowSelection={true}
        enableSorting={true}
        enablePagination={false}
        enableColumnVisibility={true}
        filterColumn="name"
        filterPlaceholder="Filter tasks..."
        rowActions={getRowActions}
        facets={TASK_TABLE_FACETS}
        isPaginationLoading={loading}

        // Inline editing functionality with keyboard navigation
        enableInlineCellEdit={true}
        inlineEditableColumns={["name", "email", "joinDate", "status", "tags"]}
        onCellEdit={handleCellEdit}
      />
    </div>
  )
}

export default TaskStatusDemo
