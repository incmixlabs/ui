// components/board/add-task-schema.ts
import type { FieldConfig } from "@components/auto-form/types"
import type { ZodObjectOrWrapped } from "@components/auto-form/utils"
import type { z } from "zod"
import type { KanbanColumn } from "@incmix/store"

// Hardcoded members (matching projects structure exactly with rich data)
const members = [
  {
    id: "1",
    value: "shane-black",
    name: "Shane Black",
    label: "Shane Black",
    avatar: "/placeholder.svg", // You can replace with actual image paths
    position: "UI/UX Designer",
    color: "blue",
  },
  {
    id: "2",
    value: "john-doe",
    name: "John Doe",
    label: "John Doe",
    avatar: "/placeholder.svg",
    position: "Project Manager",
    color: "amber",
  },
  {
    id: "3",
    value: "jane-smith",
    name: "Jane Smith",
    label: "Jane Smith",
    avatar: "/placeholder.svg",
    position: "Business Analyst",
    color: "indigo",
  },
  {
    id: "4",
    value: "emily-johnson",
    name: "Emily Johnson",
    label: "Emily Johnson",
    avatar: "/placeholder.svg",
    color: "cyan",
    position: "Web Developer",
  },
  {
    id: "5",
    value: "micheal-brown",
    label: "micheal-brown",
    name: "Michael Brown",
    avatar: "/placeholder.svg",
    position: "Product Designer",
    color: "orange",
  },
]

// Predefined labels for tasks
const PREDEFINED_LABELS = [
  { label: "Bug", value: "bug" },
  { label: "Feature", value: "feature" },
  { label: "Enhancement", value: "enhancement" },
  { label: "Documentation", value: "documentation" },
  { label: "Design", value: "design" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Testing", value: "testing" },
]

export interface TaskFormSchema<SchemaType extends ZodObjectOrWrapped = any> {
  formSchema: {
    type: string
    properties: Record<string, any>
    required: string[]
  }
  fieldConfig: FieldConfig<z.infer<SchemaType>>
}

// Base schema - will be modified to include dynamic columns
const baseTaskFormSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      title: "Task Name",
    },
    description: {
      type: "string",
      title: "Description",
    },
    columnId: {
      type: "string",
      title: "Status",
    },
    priority: {
      type: "string",
      enum: ["low", "medium", "high", "urgent"],
      title: "Priority",
    },
    startDate: {
      type: "string",
      format: "date-time",
      title: "Start Date",
    },
    endDate: {
      type: "string",
      format: "date-time",
      title: "Due Date",
    },
    assignedTo: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          value: { type: "string" },
        },
      },
      title: "Assigned To",
    },
    labelsTags: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          value: { type: "string" },
        },
      },
      title: "Labels",
    },
    // Reference URLs for the task (stored as JSON string)
    refUrlsJson: {
      type: "string",
      title: "Reference URLs",
    },
    // Subtasks with rich editing interface
    subTasks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          completed: { type: "boolean" },
        },
        required: ["name"],
      },
      title: "Subtasks",
    },
  },
  required: ["name", "columnId"],
}

// Function to create schema with dynamic columns
export const createTaskFormSchema = (columns: KanbanColumn[]): TaskFormSchema => {
  // Transform columns into options for the select field with color indicators
  const columnOptions = columns.map(column => ({
    label: column.name,
    value: column.id,
    color: column.color, // Include color for rendering
  }))

  // Get default column (prefer "To Do" or first column)
  const defaultColumnId = columns.find(col => 
    col.name.toLowerCase().includes("todo") || 
    col.name.toLowerCase().includes("to do")
  )?.id || columns[0]?.id || ""

  // Create a modified schema with defaults
  const schemaWithDefaults = {
    ...baseTaskFormSchema,
    properties: {
      ...baseTaskFormSchema.properties,
      columnId: {
        ...baseTaskFormSchema.properties.columnId,
        default: defaultColumnId
      },
      priority: {
        ...baseTaskFormSchema.properties.priority,
        default: "medium"
      }
    }
  }

  return {
    formSchema: schemaWithDefaults,
    fieldConfig: {
      name: {
        description: "Enter a descriptive task name",
        inputProps: {
          placeholder: "Enter task name...",
        },
      },
      description: {
        description: "Describe what needs to be done",
        fieldType: "textarea",
        inputProps: {
          placeholder: "Describe the task details...",
          // Note: rows property will be handled by the textarea component
        },
      },
      columnId: {
        description: "Select the task status",
        fieldType: "select",
        options: columnOptions,
        inputProps: {
          placeholder: "Select status...",
        },
      },
      priority: {
        description: "Set task priority level",
        fieldType: "select",
        options: [
          { 
            label: "Urgent", 
            value: "urgent",
            color: "#ef4444" // Red
          },
          { 
            label: "High", 
            value: "high",
            color: "#f97316" // Orange
          },
          { 
            label: "Medium", 
            value: "medium",
            color: "#3b82f6" // Blue
          },
          { 
            label: "Low", 
            value: "low",
            color: "#6b7280" // Gray
          },
        ],
        inputProps: {
          placeholder: "Select priority...",
        },
      },
      startDate: {
        description: "When should this task start?",
        fieldType: "date",
        inputProps: {
          placeholder: "Select start date",
          className: "w-full",
        },
      },
      endDate: {
        description: "When is this task due?",
        fieldType: "date",
        inputProps: {
          placeholder: "Select due date",
          className: "w-full",
        },
      },
      assignedTo: {
        description: "Assign team members to this task",
        fieldType: "multipleSelector",
        inputProps: {
          defaultOptions: members,
          placeholder: "Select members",
          defaultColor: "gray",
          className: "border-1 dark:bg-gray-1",
        },
      },
      labelsTags: {
        description: "Add relevant labels to categorize this task",
        fieldType: "multipleSelector",
        inputProps: {
          defaultOptions: PREDEFINED_LABELS,
          placeholder: "Select labels",
          defaultColor: "gray",
          className: "border-1 dark:bg-gray-1",
        },
      },
      refUrlsJson: {
        description: "Add reference URLs to link to external resources like Figma designs or related tasks",
        fieldType: "refurl",
        inputProps: {
          className: "w-full",
        },
      },
      subTasks: {
        description: "Add subtasks to break down this task into smaller components",
        fieldType: "subtask",
        inputProps: {
          className: "w-full",
        },
      },

      // Field groups for better layout
      fieldGroups: [
        {
          fields: ["name", "description"],
          layout: "column",
          gap: 4,
          className: "mb-4",
        },
        {
          fields: ["columnId", "priority"],
          layout: "row",
          gap: 4,
          className: "mb-4",
        },
        {
          fields: ["startDate", "endDate"],
          layout: "row",
          gap: 4,
          className: "mb-4",
        },
        {
          fields: ["assignedTo", "labelsTags"],
          layout: "row",
          gap: 4,
          className: "mb-4",
        },
        {
          fields: ["refUrlsJson"],
          layout: "column",
          gap: 4,
          className: "mb-4",
        },
      ] as any,
    },
  }
}