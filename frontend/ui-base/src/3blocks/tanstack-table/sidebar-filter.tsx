import { Button, Checkbox, Input } from "@/src/1base"
import type { Table } from "@tanstack/react-table"
import { Calendar, Check, ChevronDown, ChevronRight, X } from "lucide-react"
// File: components/DataTable/SidebarFilters.tsx
import { useState } from "react"
import type { FilterOption, SidebarFilterConfig } from "./types"

// Individual Filter Type Components
const TextFilter: React.FC<{
  column: string
  title: string
  value: string
  onChange: (column: string, value: any) => void
}> = ({ column, title, value, onChange }) => (
  <div className="my-2 px-6">
    <Input
      placeholder={`Filter by ${title.toLowerCase()}...`}
      value={value || ""}
      onChange={(e) => onChange(column, e.target.value)}
      className="h-8 w-full"
    />
  </div>
)

const SelectFilter: React.FC<{
  column: string
  options?: FilterOption[]
  value: any
  onChange: (column: string, value: any) => void
}> = ({ column, options, value, onChange }) => (
  <div className="my-2 space-y-1 px-6">
    {options?.map((option) => (
      <div key={String(option.value)} className="flex items-center">
        <Button
          variant="ghost"
          size="1"
          className={`flex items-center justify-between text-left ${
            value === option.value ? "bg-gray-100 dark:bg-gray-800" : ""
          }`}
          onClick={() =>
            onChange(column, value === option.value ? undefined : option.value)
          }
        >
          <span>{option.label}</span>
          {value === option.value && <Check className="h-4 w-4" />}
        </Button>
      </div>
    ))}
  </div>
)

const MultiSelectFilter: React.FC<{
  column: string
  options?: FilterOption[]
  value: any[]
  onChange: (column: string, value: any) => void
}> = ({ column, options, value, onChange }) => {
  const values = value || []

  return (
    <div className="my-2 space-y-1.5 px-6">
      {options?.map((option) => {
        const isSelected = values.includes(option.value)
        return (
          <div key={String(option.value)} className="flex items-center">
            <Checkbox
              id={`${column}-${String(option.value)}`}
              checked={isSelected}
              onCheckedChange={() => {
                const next = isSelected
                  ? values.filter((val) => val !== option.value)
                  : [...values, option.value]
                onChange(column, next)
              }}
              className="mr-2"
            />
            <label
              htmlFor={`${column}-${String(option.value)}`}
              className="cursor-pointer text-sm"
            >
              {option.label}
            </label>
          </div>
        )
      })}
    </div>
  )
}

const BooleanFilter: React.FC<{
  column: string
  value: boolean | undefined
  onChange: (column: string, value: any) => void
}> = ({ column, value, onChange }) => (
  <div className="my-2 space-y-1.5 px-6">
    <div className="flex items-center">
      <Checkbox
        id={`${column}-true`}
        checked={value === true}
        onCheckedChange={() =>
          onChange(column, value === true ? undefined : true)
        }
        className="mr-2"
      />
      <label htmlFor={`${column}-true`} className="cursor-pointer text-sm">
        Yes
      </label>
    </div>
    <div className="flex items-center">
      <Checkbox
        id={`${column}-false`}
        checked={value === false}
        onCheckedChange={() =>
          onChange(column, value === false ? undefined : false)
        }
        className="mr-2"
      />
      <label htmlFor={`${column}-false`} className="cursor-pointer text-sm">
        No
      </label>
    </div>
  </div>
)

const DateFilter: React.FC<{
  column: string
  title: string
  value: string
  onChange: (column: string, value: any) => void
}> = ({ column, title, value, onChange }) => (
  <div className="my-3 px-6">
    <div className="relative">
      <label
        htmlFor={`date-filter-${column}`}
        className="mb-1 block font-medium text-gray-500 text-xs dark:text-gray-400"
      >
        {title}
      </label>
      <div className="relative rounded-md shadow-sm">
        <Input
          id={`date-filter-${column}`}
          type="date"
          value={value || ""}
          onChange={(e) => onChange(column, e.target.value)}
          className="h-9 w-full rounded-md border-gray-200 pr-10 pl-3 focus-visible:ring-primary dark:border-gray-800"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Calendar className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  </div>
)

const DateRangeFilter: React.FC<{
  column: string
  value: { start?: string; end?: string }
  onChange: (column: string, value: any) => void
}> = ({ column, value, onChange }) => {
  const dateRange = value || {}

  return (
    <div className="my-3 space-y-3 px-6">
      <div>
        <label
          htmlFor={`date-range-start-${column}`}
          className="mb-1 block font-medium text-gray-500 text-xs dark:text-gray-400"
        >
          From
        </label>
        <div className="relative rounded-md shadow-sm">
          <Input
            id={`date-range-start-${column}`}
            type="date"
            value={dateRange.start || ""}
            onChange={(e) =>
              onChange(column, { ...dateRange, start: e.target.value })
            }
            className="h-9 w-full rounded-md border-gray-200 pr-10 pl-3 focus-visible:ring-primary dark:border-gray-800"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor={`date-range-end-${column}`}
          className="mb-1 block font-medium text-gray-500 text-xs dark:text-gray-400"
        >
          To
        </label>
        <div className="relative rounded-md shadow-sm">
          <Input
            id={`date-range-end-${column}`}
            type="date"
            value={dateRange.end || ""}
            onChange={(e) =>
              onChange(column, { ...dateRange, end: e.target.value })
            }
            className="h-9 w-full rounded-md border-gray-200 pr-10 pl-3 focus-visible:ring-primary dark:border-gray-800"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Individual Filter Group Component
interface FilterGroupProps<TData extends object> {
  filter: SidebarFilterConfig<TData>
  onFilterChange: (column: string, value: any) => void
  currentValue: any
}

export function FilterGroup<TData extends object>({
  filter,
  onFilterChange,
  currentValue,
}: FilterGroupProps<TData>) {
  // Initialize collapsed state based on initialCollapsed prop
  // When initialCollapsed is true or undefined, the filter starts collapsed
  const [isOpen, setIsOpen] = useState(!filter.initialCollapsed)

  const toggleGroup = () => {
    setIsOpen(!isOpen)
  }

  const renderFilterContent = () => {
    const column = String(filter.column)

    switch (filter.type) {
      case "text":
        return (
          <TextFilter
            column={column}
            title={filter.title}
            value={currentValue as string}
            onChange={onFilterChange}
          />
        )

      case "select":
        return (
          <SelectFilter
            column={column}
            options={filter.options}
            value={currentValue}
            onChange={onFilterChange}
          />
        )

      case "multiSelect":
        return (
          <MultiSelectFilter
            column={column}
            options={filter.options}
            value={currentValue as any[]}
            onChange={onFilterChange}
          />
        )

      case "boolean":
        return (
          <BooleanFilter
            column={column}
            value={currentValue as boolean}
            onChange={onFilterChange}
          />
        )

      case "date":
        return (
          <DateFilter
            column={column}
            title={filter.title}
            value={currentValue as string}
            onChange={onFilterChange}
          />
        )

      case "dateRange":
        return (
          <DateRangeFilter
            column={column}
            value={currentValue as { start?: string; end?: string }}
            onChange={onFilterChange}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="border-gray-200 border-b dark:border-gray-800">
      <Button
        variant="ghost"
        size="2"
        className="flex items-center justify-between text-left font-medium"
        onClick={toggleGroup}
      >
        <div className="flex items-center">
          {isOpen ? (
            <ChevronDown className="mr-3 h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="mr-3 h-4 w-4 text-gray-500" />
          )}
          {filter.icon && (
            <span className="mr-2.5 text-gray-500">{filter.icon}</span>
          )}
          <span className="text-gray-700 dark:text-gray-200">
            {filter.title}
          </span>
        </div>
      </Button>

      {isOpen && renderFilterContent()}
    </div>
  )
}

// Main Sidebar Component
interface TableSidebarProps<TData extends object> {
  filters: SidebarFilterConfig<TData>[]
  table: Table<TData>
  isOpen: boolean
  onToggle: () => void
}

export function TableSidebar<TData extends object>({
  filters,
  table,
  isOpen,
  onToggle,
}: TableSidebarProps<TData>) {
  const handleFilterChange = (column: string, value: any) => {
    const tableColumn = table.getColumn(column)
    if (tableColumn) {
      tableColumn.setFilterValue(value)
    }
  }

  return (
    <div
      className={`h-full overflow-hidden rounded-md transition-all duration-300 ${isOpen ? "w-full max-w-xs opacity-100" : "pointer-events-none w-0 max-w-0 opacity-0"}
      `}
    >
      <div className="relative h-full overflow-y-auto rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <Button
          variant="ghost"
          size="1"
          onClick={onToggle}
          className="absolute top-2 right-2"
          srLabel="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>

        {filters.map((filter, index) => (
          <FilterGroup
            key={`${String(filter.column)}-${index}`}
            filter={filter}
            onFilterChange={handleFilterChange}
            currentValue={table
              .getColumn(String(filter.column))
              ?.getFilterValue()}
          />
        ))}

        {filters.length === 0 && (
          <div className="p-4 text-gray-500 text-sm italic dark:text-gray-400">
            No filters configured
          </div>
        )}
      </div>
    </div>
  )
}
