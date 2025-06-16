// components/table/index.tsx
export { TableView } from "./table-view"
export { useTableView } from "@incmix/store"
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
export type { TableTask, UseTableViewReturn } from "@incmix/store"