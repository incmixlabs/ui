// components/table/index.tsx
export { TableView } from "./table-view"
export { useTableView } from "../hooks/use-table-view"
export { TableRowActions } from "./table-row-actions"
export { CreateTaskDialog } from "./create-task-dialog"
export {
  TASK_TABLE_COLUMNS,
  PRIORITY_OPTIONS,
  getPriorityInfo,
  formatDate,
  TaskNameCell,
  StatusCell,
  PriorityCell,
  DateCell,
  AssignedToCell,
  DescriptionCell,
} from "./table-columns-config"

// Re-export types
export type { TableTask } from "../types"