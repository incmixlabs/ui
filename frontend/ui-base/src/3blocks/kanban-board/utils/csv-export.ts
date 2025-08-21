import type { KanbanTask, ListColumn } from "../types"

export interface CSVExportOptions {
  includeSubtasks?: boolean
  includeMetadata?: boolean
  includeTimestamps?: boolean
}

export interface LabelSchema {
  id: string
  name: string
  type: "status" | "priority"
  color?: string
}

/**
 * Converts task data to CSV format
 */
export function exportTasksToCSV(
  columns: ListColumn[],
  priorityLabels: LabelSchema[] = [],
  options: CSVExportOptions = {
    includeSubtasks: true,
    includeMetadata: true,
    includeTimestamps: true,
  }
): string {
  const headers = [
    "Task Name",
    "Description",
    "Status",
    "Priority",
    "Assignees",
    "Start Date",
    "End Date",
    "Completed",
    "Tags",
    "Subtasks Count",
    "Comments Count",
    "Attachments Count",
  ]

  if (options.includeSubtasks) {
    headers.push("Is Subtask", "Parent Task")
  }

  if (options.includeMetadata) {
    headers.push("Task ID", "Task Order")
  }

  if (options.includeTimestamps) {
    headers.push("Created At", "Updated At", "Created By", "Updated By")
  }

  // Collect all tasks from all columns
  const allTasks: Array<{ task: KanbanTask; columnName: string }> = []

  columns.forEach((column) => {
    column.tasks.forEach((task) => {
      allTasks.push({ task, columnName: column.name })
    })
  })

  // Sort tasks to keep parent-child relationships together
  const sortedTasks = allTasks.sort((a, b) => {
    // First sort by column order, then by task order
    const aColumn = columns.findIndex((col) => col.name === a.columnName)
    const bColumn = columns.findIndex((col) => col.name === b.columnName)

    if (aColumn !== bColumn) {
      return aColumn - bColumn
    }

    return (a.task.taskOrder ?? 0) - (b.task.taskOrder ?? 0)
  })

  const rows = sortedTasks.map(({ task, columnName }) => {
    const row = [
      escapeCSVField(task.name || ""),
      escapeCSVField(task.description || ""),
      escapeCSVField(columnName),
      escapeCSVField(resolvePriorityName(task.priorityId, priorityLabels)),
      escapeCSVField(formatAssignees(task.assignedTo || [])),
      escapeCSVField(
        task.startDate ? new Date(task.startDate).toLocaleDateString() : ""
      ),
      escapeCSVField(
        task.endDate ? new Date(task.endDate).toLocaleDateString() : ""
      ),
      task.completed ? "Yes" : "No",
      escapeCSVField(formatTags(task.labelsTags || [])),
      (task.subTasks?.length || 0).toString(),
      // (task.comments?.length || 0).toString(),
      (task.attachments?.length || 0).toString(),
    ]

    if (options.includeSubtasks) {
      row.push(
        task.isSubtask ? "Yes" : "No",
        escapeCSVField(
          task.parentTaskId
            ? findParentTaskName(allTasks, task.parentTaskId)
            : ""
        )
      )
    }

    if (options.includeMetadata) {
      row.push(escapeCSVField(task.id || ""), (task.taskOrder ?? 0).toString())
    }

    if (options.includeTimestamps) {
      row.push(
        task.createdAt ? new Date(task.createdAt).toLocaleString() : "",
        task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "",
        escapeCSVField(task.createdBy?.name || ""),
        escapeCSVField(task.updatedBy?.name || "")
      )
    }

    return row
  })

  // Combine headers and rows
  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

  return csvContent
}

/**
 * Triggers download of CSV file
 */
export function downloadCSV(
  csvContent: string,
  filename = "tasks-export.csv"
): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

/**
 * Export tasks from a specific column
 */
export function exportColumnToCSV(
  column: ListColumn,
  priorityLabels: LabelSchema[] = [],
  options?: CSVExportOptions
): void {
  const csvContent = exportTasksToCSV([column], priorityLabels, options)
  const filename = `${column.name.toLowerCase().replace(/\s+/g, "-")}-tasks.csv`
  downloadCSV(csvContent, filename)
}

/**
 * Export all tasks from multiple columns
 */
export function exportAllTasksToCSV(
  columns: ListColumn[],
  priorityLabels: LabelSchema[] = [],
  options?: CSVExportOptions
): void {
  const csvContent = exportTasksToCSV(columns, priorityLabels, options)
  const timestamp = new Date().toISOString().split("T")[0]
  const filename = `all-tasks-${timestamp}.csv`
  downloadCSV(csvContent, filename)
}

// Helper functions
function escapeCSVField(field: string): string {
  if (
    field.includes(",") ||
    field.includes('"') ||
    field.includes("\n") ||
    field.includes("\r")
  ) {
    return `"${field.replace(/"/g, '""')}"`
  }
  return field
}

function formatAssignees(
  assignees: Array<{ name?: string; id?: string }>
): string {
  return assignees
    .map((assignee) => assignee.name || assignee.id || "")
    .join("; ")
}

function formatTags(tags: Array<{ name?: string; label?: string }>): string {
  return tags.map((tag) => tag.name || tag.label || "").join("; ")
}

function findParentTaskName(
  allTasks: Array<{ task: KanbanTask }>,
  parentId: string
): string {
  const parentTask = allTasks.find(({ task }) => task.id === parentId)
  return parentTask?.task.name || parentId
}

function resolvePriorityName(
  priorityId: string | undefined,
  priorityLabels: LabelSchema[]
): string {
  if (!priorityId) return ""

  // Find the priority label by ID
  const priorityLabel = priorityLabels.find(
    (label) => label.type === "priority" && label.id === priorityId
  )

  return priorityLabel?.name || priorityId
}
