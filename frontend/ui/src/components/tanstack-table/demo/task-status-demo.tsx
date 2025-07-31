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

// Extended column type to include custom properties
interface ExtendedColumnConfig extends ColumnConfig {
  _originalHeading?: string;
  accessorKey?: string;
  enableInlineEdit?: boolean;
  enableSorting?: boolean;
  format?: any;
  renderer?: any;
  cell?: any;
  inlineCellEditor?: any;
  cellAttributes?: any;
}

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

/**
 * Generate a unique color that's not already in use by other dropdown options
 * @param existingColors Array of colors already in use
 * @returns A unique hex color code
 */
const generateUniqueColor = (existingColors: string[]): string => {
  // Predefined set of visually distinct colors that work well for status indicators
  const colorPalette = [
    '#93c5fd', // Light blue
    '#fcd34d', // Light yellow
    '#86efac', // Light green
    '#f9a8d4', // Light pink
    '#c4b5fd', // Light purple
    '#a5b4fc', // Lavender
    '#fdba74', // Light orange
    '#67e8f9', // Light teal
    '#d8b4fe', // Light violet
    '#f87171', // Light red
    '#fde68a', // Light gold
    '#6ee7b7', // Mint
  ];

  // Try to find a color from the palette that's not in use
  const unusedColor = colorPalette.find(color => !existingColors.includes(color));
  if (unusedColor) return unusedColor;

  // If all palette colors are used, generate a random color
  // Keep trying until we get a unique one
  let randomColor;
  do {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 155) + 100; // Lighter colors (100-255)
    const g = Math.floor(Math.random() * 155) + 100;
    const b = Math.floor(Math.random() * 155) + 100;
    randomColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } while (existingColors.includes(randomColor));

  return randomColor;
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

// Default column meta settings (updated by column configuration)
const STATUS_COLUMN_META = {
  dropdownOptions: STATUS_OPTIONS,
  strictDropdown: true // Default to strict mode
};

// Map to track custom values we've already processed - this is our ultimate duplicate prevention
const processedCustomValues = new Map<string, string>();

// Centralized function to add a custom dropdown option - this ensures we add options in only one place
// and can do thorough duplicate checking
const addCustomDropdownOption = (value: string): string => {
  if (!value) return value;

  // First check our processed values map to prevent duplicates
  const valueLower = value.toLowerCase();
  if (processedCustomValues.has(valueLower)) {
    console.log(`Already processed: ${value} → ${processedCustomValues.get(valueLower)}`);
    return processedCustomValues.get(valueLower) || value;
  }

  // Normalize the value for internal use
  const normalizedValue = value.toLowerCase().replace(/\s+/g, '_');

  // Check if this value (or something very similar) already exists
  // using a very thorough set of checks
  for (const option of STATUS_OPTIONS) {
    // Check exact value match
    if (option.value === value || option.value === normalizedValue) {
      console.log(`Value already exists: ${option.value}`);
      // Remember this mapping for future calls
      processedCustomValues.set(valueLower, option.value);
      return option.value;
    }

    // Check case-insensitive label match
    if (option.label.toLowerCase() === value.toLowerCase()) {
      console.log(`Label already exists: ${option.label}`);
      // Remember this mapping for future calls
      processedCustomValues.set(valueLower, option.value);
      return option.value;
    }
  }

  // If we get here, it's a truly new value
  console.log(`Adding new custom option: ${value} (${normalizedValue})`);

  // Generate a random color that's not already in use
  const existingColors = STATUS_OPTIONS.map(opt => opt.color || '#e5e7eb').filter(Boolean);
  const color = generateUniqueColor(existingColors as string[]);

  // Create the new option
  const newOption: DropdownOption = {
    value: normalizedValue,
    label: value,
    color
  };

  // Add to STATUS_OPTIONS - this is our single source of truth
  STATUS_OPTIONS.push(newOption);

  // Remember this mapping for future calls
  processedCustomValues.set(valueLower, normalizedValue);

  console.log(`Added new option to dropdown: ${value} (${normalizedValue})`);
  return normalizedValue;
};

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
  console.log('Dropdown editor for value:', value);
  console.log('Available options:', options);

  // Make sure we're passing the correct current value
  // If the value doesn't exist in options, try to find a matching label
  const optionExists = options.some(opt => opt.value === value);

  // If we can't find the value in the options, try to match by label
  if (!optionExists && value) {
    const matchingOption = options.find(opt =>
      opt.label.toLowerCase() === value.toLowerCase() ||
      opt.label.toLowerCase().includes(value.toLowerCase())
    );

    if (matchingOption) {
      console.log('Found matching option by label:', matchingOption);
      // Update the value to match the current option value
      setTimeout(() => onSave(matchingOption.value), 0);
      return null; // Don't render the dropdown yet, wait for the update
    }
  }

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

// Task table column definitions
const TASK_TABLE_COLUMNS: ExtendedColumnConfig[] = [
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
    // Apply initial metadata
    meta: STATUS_COLUMN_META,
    // Custom cell renderer for dropdown values with colors
    cell: (props: { getValue: () => any; row: { original: any }; column: { columnDef: any } }) => {
      const value = props.getValue() as string;

      // Always use STATUS_OPTIONS directly to ensure we get the latest version
      // This is essential for color/label updates to be reflected
      const options = STATUS_OPTIONS;

      // Find the selected option by value
      const option = options.find((opt: DropdownOption) => opt.value === value);

      // If no matching option is found, use a fallback
      const displayOption = option || {
        value,
        label: value,
        color: "#e5e7eb"
      };

      return (
        <span
          className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize"
          style={{
            backgroundColor: displayOption.color || "#e5e7eb",
            color: getContrastingTextColor(displayOption.color || "#e5e7eb"),
            borderColor: adjustColor(displayOption.color || "#e5e7eb", -20)
          }}
        >
          {displayOption.label}
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

      // Always use STATUS_OPTIONS directly to ensure we get the latest options
      const options = STATUS_OPTIONS;

      // Check if strict dropdown mode is enabled (default to true if not specified)
      const strictDropdown = columnDef?.meta?.strictDropdown !== false;

      // Debug log to see if strictDropdown setting is recognized
      console.log('Column strictDropdown setting:', columnDef?.meta?.strictDropdown, 'Using strictDropdown:', strictDropdown);

      // Wrap the onSave callback to support custom value creation
      const handleSaveWithCustomValue = (newValue: string) => {
        // If we're in strict mode or it's not a string, just pass through
        if (strictDropdown || typeof newValue !== 'string') {
          onSave(newValue);
          return;
        }

        // For custom values in non-strict mode, we need to do special handling
        // Use our centralized function to ensure we never add duplicates
        if (!options.some(opt => opt.value === newValue)) {
          // Only process if it's not already an exact match
          console.log('Passing custom value to be processed');
          // We'll let the cell edit handler take care of this using our centralized function
          // The actual adding of the option will happen in handleCellEdit
        }

        // Pass through the original value - handleCellEdit will handle normalization
        onSave(newValue);
      };

      return (
        <DropdownCellEditor
          value={value as string}
          options={options}
          strictDropdown={strictDropdown}
          onSave={handleSaveWithCustomValue}
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
  const [lastEditedCell, setLastEditedCell] = useState<{ id: string, column: string } | null>(null);

  // State for column configuration dialog
  const [isColumnConfigOpen, setIsColumnConfigOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ExtendedColumnConfig | null>(null);
  const [columns, setColumns] = useState<ExtendedColumnConfig[]>(TASK_TABLE_COLUMNS);

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
   * and handles custom dropdown values when entered
   */
  const handleCellEdit = useCallback((rowData: Task, columnId: string, newValue: any) => {
    console.log(`Editing cell ${columnId} for task ${rowData.id}:`, newValue)

    // Track which cell was just edited (for visual feedback)
    setLastEditedCell({ id: rowData.id, column: columnId });

    // Special handling for status field custom values
    if (columnId === 'status') {
      const columnDef = columns.find(col => col.id === 'status');
      const strictMode = columnDef?.meta?.strictDropdown !== false;

      // If we're not in strict mode, check if this is a custom value
      if (!strictMode && newValue && typeof newValue === 'string') {
        // Use our centralized function to handle the custom value
        // This ensures we never add duplicates
        const processedValue = addCustomDropdownOption(newValue);

        // Force a refresh of columns to ensure the change is recognized
        setTimeout(() => setColumns([...columns]), 0);

        // Update newValue to use the processed value
        newValue = processedValue;
      }
    }

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
  const handleHeaderDoubleClick = useCallback((column: ExtendedColumnConfig) => {
    // Open the column configuration dialog with the selected column
    setSelectedColumn(column);
    setIsColumnConfigOpen(true);
  }, []);

  /**
   * Handle saving column configuration changes
   */
  const handleSaveColumnConfig = useCallback((columnId: string, updates: Partial<ExtendedColumnConfig>) => {
    console.log(`Saving column config for ${columnId}:`, updates);

    // Create a simple copy of columns to work with
    const updatedColumns = [...columns];

    // Find the column to update
    const columnIndex = updatedColumns.findIndex(col => col.id === columnId);

    if (columnIndex !== -1) {
      // Get the original column
      const originalColumn = columns[columnIndex];

      // Create a new column object to ensure React sees the change
      let updatedColumn: ExtendedColumnConfig = { ...originalColumn };

      // Update heading name if provided
      if (updates.headingName) {
        updatedColumn = {
          ...updatedColumn,
          _originalHeading: updates.headingName,
          headingName: updates.headingName
        };
      }

      // Update column type if provided
      if (updates.type && updates.type !== originalColumn.type) {
        updatedColumn.type = updates.type;
      }

      // Handle dropdown options updates
      if (updates.meta?.dropdownOptions && originalColumn.type === 'Dropdown') {
        // Store the new options
        const newOptions = [...updates.meta.dropdownOptions];
        console.log('New dropdown options:', newOptions);

        // Update the column with new options and maintain strictDropdown setting
        updatedColumn = {
          ...updatedColumn,
          meta: {
            ...updatedColumn.meta,
            dropdownOptions: newOptions,
            strictDropdown: updates.meta.strictDropdown
          }
        };

        // Log the strictDropdown status for debugging
        console.log(`Setting strictDropdown to: ${updates.meta.strictDropdown}`);

        // Update STATUS_OPTIONS global variable to reflect changes
        // This ensures the dropdown works with the latest options
        if (columnId === 'status') {
          // Create a new reference for the STATUS_OPTIONS
          const updatedStatusOptions = [...newOptions];

          // This replaces the reference to STATUS_OPTIONS used by the cell renderer
          Object.assign(STATUS_OPTIONS, updatedStatusOptions);

          // Clear existing array and push new items to maintain the same reference
          STATUS_OPTIONS.length = 0;
          newOptions.forEach(opt => STATUS_OPTIONS.push(opt));

          // Update STATUS_COLUMN_META to reflect strictDropdown setting
          if (updates.meta?.strictDropdown !== undefined) {
            STATUS_COLUMN_META.strictDropdown = updates.meta.strictDropdown;
            console.log('Updated STATUS_COLUMN_META.strictDropdown to:', STATUS_COLUMN_META.strictDropdown);
          }
        }

        // Update the tasks to use new labels/colors for the same values
        const updatedAllTasks = allTasks.map(task => {
          // Create a new task object to ensure React picks up the change
          return { ...task };
        });

        // Update both datasets to force re-rendering
        setAllTasks(updatedAllTasks);
        setTasks(updatedAllTasks.slice(0, tasks.length));
      }

      // Replace the column in the array
      updatedColumns[columnIndex] = updatedColumn;

      // Set the updated columns array
      setColumns(updatedColumns);

      // Force a complete refresh of the table
      setTimeout(() => {
        // This forces React to re-render with completely new objects
        setColumns([...updatedColumns.map(col => ({ ...col }))]);
      }, 50);
    }

    console.log(`Updated column ${columnId}:`, updates);
  }, [columns, allTasks, tasks]);


  // Function to enhance column definition with double-click handler
  const enhanceColumnsWithDoubleClick = useMemo(() => {
    // First convert our ExtendedColumnConfig[] to a type that DataTable accepts
    return columns.map(column => {
      // Create the double-clickable wrapper for the heading name
      const doubleClickableHeading = (
        <div
          className="cursor-pointer w-full h-full flex items-center"
          onDoubleClick={() => handleHeaderDoubleClick(column)}
        >
          {column.headingName}
        </div>
      );

      // Convert the ExtendedColumnConfig to a proper DataTableColumn type
      // that the DataTable component expects
      const convertedColumn: any = {
        ...column,
        // Store the original heading name but display our custom one
        headingName: doubleClickableHeading,
        // Ensure accessorKey is a proper string (not optional)
        accessorKey: column.accessorKey || column.id
      };

      return convertedColumn;
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
        tableData={tasks} // Pass table data to track values in use
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
