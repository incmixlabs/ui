import type { DropdownOption } from "../cell-renderers"
import { DropdownCell } from "../cell-renderers"
import DropdownCellEditor from "../components/DropdownCellEditor"
// utils/dropdown-utils.tsx
import type { DataTableColumn } from "../types"

export interface EnhancedDropdownConfig<TData> {
  // Basic configuration
  headingName: string | React.ReactNode
  accessorKey: keyof TData | string
  id?: string

  // Dropdown options
  options: DropdownOption[]
  strictDropdown?: boolean

  // Enhanced features
  displayStyle?: "badge" | "button" | "minimal"
  size?: "sm" | "md" | "lg"
  enableColorPicker?: boolean
  enableIcons?: boolean
  showCreateButton?: boolean
  createButtonText?: string

  // Callbacks
  onCreateOption?: (name: string, color?: string) => Promise<string>
  onUpdateOption?: (
    id: string,
    updates: { name?: string; color?: string }
  ) => Promise<void>
  onDeleteOption?: (id: string) => Promise<void>

  // State
  isLoading?: boolean
  loadingText?: string
  errorMessage?: string

  // Standard column options
  enableSorting?: boolean
  enableInlineEdit?: boolean
  width?: string | number
  className?: string

  // Custom rendering options
  renderer?: (value: any, row: TData) => React.ReactNode
  accessorFn?: (row: TData) => any
}

/**
 * Creates an enhanced dropdown column with all the advanced features
 */
export function createEnhancedDropdownColumn<TData extends object>(
  config: EnhancedDropdownConfig<TData>
): DataTableColumn<TData> {
  const columnDef: DataTableColumn<TData> = {
    headingName: config.headingName,
    type: "Dropdown",
    accessorKey: config.accessorKey,
    id: config.id || String(config.accessorKey),
    enableSorting: config.enableSorting ?? true,
    enableInlineEdit: config.enableInlineEdit ?? true,
    width: config.width,
    className: config.className,

    // Custom accessor function if provided
    ...(config.accessorFn && { accessorFn: config.accessorFn }),

    // Add cell renderer that handles the dropdown display
    cell: ({
      getValue,
      row,
    }: { getValue: () => any; row: { original: TData } }) => {
      const value = getValue()

      // If a custom renderer is provided, use it
      if (config.renderer) {
        return config.renderer(value, row.original)
      }

      // Otherwise use the default dropdown cell rendering
      const dropdownOptions = config.options
      const option = dropdownOptions.find((opt) => opt.value === value)

      if (!option) {
        return "No Value"
      }

      // Use our DropdownCell component to handle all display styles
      const displayStyle = config.displayStyle || "badge"
      const _columnId = config.id || String(config.accessorKey)

      // Use the DropdownCell component to render the cell with the correct display style
      return (
        <DropdownCell
          value={value}
          options={dropdownOptions}
          displayStyle={displayStyle}
          size="sm"
          showIcon={true}
        />
      )

      // No more styles to handle
    },

    // Enhanced meta configuration
    meta: {
      dropdownOptions: config.options,
      strictDropdown: config.strictDropdown ?? true,
      displayStyle: config.displayStyle ?? "badge",
      size: config.size ?? "md",
      enableColorPicker: config.enableColorPicker ?? false,
      enableIcons: config.enableIcons ?? false,
      showCreateButton: config.showCreateButton ?? false,
      createButtonText: config.createButtonText ?? "Create & Select",
      onCreateOption: config.onCreateOption,
      onUpdateOption: config.onUpdateOption,
      onDeleteOption: config.onDeleteOption,
      isLoading: config.isLoading ?? false,
      loadingText: config.loadingText ?? "Loading...",
      errorMessage: config.errorMessage,
    },

    // Custom inline cell editor
    inlineCellEditor: (props: {
      value: any
      onSave: (newValue: any) => void
      onCancel: () => void
      columnDef?: any
      rowData?: any
    }) => (
      <DropdownCellEditor
        value={props.value}
        options={config.options}
        onSave={props.onSave}
        onCancel={props.onCancel}
        strictDropdown={config.strictDropdown ?? true}
        enableColorPicker={config.enableColorPicker ?? false}
        enableIcons={config.enableIcons ?? false}
        showCreateButton={config.showCreateButton ?? false}
        createButtonText={config.createButtonText ?? "Create & Select"}
        onCreateOption={config.onCreateOption}
        onUpdateOption={config.onUpdateOption}
        onDeleteOption={config.onDeleteOption}
        isLoading={config.isLoading ?? false}
        loadingText={config.loadingText ?? "Loading..."}
        displayStyle={config.displayStyle ?? "badge"}
        errorMessage={config.errorMessage}
        rowData={props.rowData}
      />
    ),
  }

  return columnDef
}

/**
 * Creates standard status dropdown options
 */
export function createStatusDropdownOptions(): DropdownOption[] {
  return [
    { value: "todo", label: "To Do", color: "var(--blue-5)" },
    { value: "in_progress", label: "In Progress", color: "var(--amber-5)" },
    { value: "review", label: "In Review", color: "var(--purple-5)" },
    { value: "done", label: "Done", color: "var(--green-5)" },
  ]
}

/**
 * Creates priority dropdown options from labels
 * @param priorityLabels - Array of priority labels from the database
 */
export function createPriorityDropdownOptions(
  priorityLabels?: any[]
): DropdownOption[] {
  // If no priority labels are provided, return an empty array
  // The consuming component should get the labels from the appropriate hook
  if (!priorityLabels || priorityLabels.length === 0) {
    return []
  }

  // Map priority labels to dropdown options
  return priorityLabels.map((label) => ({
    value: label.id,
    label: label.name,
    color: label.color || "#6b7280", // Fallback color if none is provided
  }))
}
