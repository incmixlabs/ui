import type { KanbanColumn } from "@incmix/utils/schema"
// components/board/add-task-schema.ts
import type { FieldConfig } from "../../auto-form/types"
import type { ZodObjectOrWrapped } from "../../auto-form/utils"
import { getMembersForSelect } from "../constants/mock-members"

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

export interface TaskFormSchema<_SchemaType extends ZodObjectOrWrapped = any> {
  formSchema: {
    type: string
    properties: Record<string, any>
    required: string[]
  }
  fieldConfig: FieldConfig<any>
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
    statusId: {
      type: "string",
      title: "Status",
    },
    priorityId: {
      type: "string",
      // No hardcoded enum values - will be populated dynamically from labels
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
  required: ["name", "statusId"],
}

// Function to create schema with dynamic columns
export const createTaskFormSchema = (
  columns: KanbanColumn[],
  priorityLabels: any[] = []
): TaskFormSchema => {
  // Transform columns into options for the select field with color indicators
  const columnOptions = columns.map((column) => ({
    label: column.name,
    value: column.id,
    color: column.color, // Include color for rendering
  }))

  // Transform priority labels into options for the select field
  const priorityOptions = priorityLabels.map((priority) => ({
    label: priority.name,
    value: priority.id,
    color: priority.color, // Include color for rendering
  }))

  // Get first available column for default status
  const defaultStatusId = columns[0]?.id || ""

  // Get first available priority option for default
  const defaultPriorityId = priorityOptions[0]?.value || ""

  // Create a modified schema with defaults
  const schemaWithDefaults = {
    ...baseTaskFormSchema,
    properties: {
      ...baseTaskFormSchema.properties,
      statusId: {
        ...baseTaskFormSchema.properties.statusId,
        default: defaultStatusId,
      },
      priorityId: {
        ...baseTaskFormSchema.properties.priorityId,
        default: defaultPriorityId,
      },
    },
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
      statusId: {
        description: "Select the task status",
        fieldType: "select",
        options: columnOptions,
        inputProps: {
          placeholder: "Select status...",
        },
      },
      priorityId: {
        description: "Set task priority level",
        fieldType: "select",
        options: priorityOptions,
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
          defaultOptions: getMembersForSelect(),
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
        description:
          "Add reference URLs to link to external resources like Figma designs or related tasks",
        fieldType: "refurl",
        inputProps: {
          className: "w-full",
        },
      },
      subTasks: {
        description:
          "Add subtasks to break down this task into smaller components",
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
          fields: ["statusId", "priorityId"],
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
