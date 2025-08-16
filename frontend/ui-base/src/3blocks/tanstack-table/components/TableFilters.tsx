import { Box, Button, DropdownMenuWrapper, Flex, TextField } from "@/src/1base"
import type { Table as TanStackTable } from "@tanstack/react-table"
import {
  Check,
  ChevronDown,
  ChevronLeft,
  Download,
  SlidersHorizontal,
  X,
} from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { DataTableFacet } from "../types"
import { KeyboardShortcutsHelp } from "./KeyboardShortcutsHelp"

interface FacetedFilterProps<TData extends object> {
  table: TanStackTable<TData>
  facet: DataTableFacet<TData>
}

// Internal component that will be memoized
const FacetedFilterComponent = <TData extends object>({
  table,
  facet,
}: FacetedFilterProps<TData>) => {
  const column = table.getColumn(String(facet.column))
  if (!column) {
    return null
  }

  const filterValue = column.getFilterValue() as any[]
  const selectedCount = filterValue?.length || 0

  // Create dropdown items
  const items = [
    {
      label: facet.title,
      disabled: true,
      separator: true,
    },
    ...facet.options.map((option) => {
      const isSelected = filterValue?.includes(option.value) || false

      return {
        label: option.label,
        onClick: () => {
          if (isSelected) {
            // Remove from filter
            column.setFilterValue(
              filterValue?.filter((val) => val !== option.value) || []
            )
          } else {
            // Add to filter
            column.setFilterValue(
              filterValue ? [...filterValue, option.value] : [option.value]
            )
          }
        },
        checked: isSelected,
        checkedIcon: <Check size={16} />,
        icon: option.icon,
      }
    }),
  ]

  // Add clear button if filters are applied
  if (selectedCount > 0) {
    items.push({
      label: "Clear",
      onClick: () => column.setFilterValue(undefined),
      separator: true,
      disabled: false,
    })
  }

  const buttonLabel =
    selectedCount > 0 ? `${facet.title} (${selectedCount})` : facet.title

  return (
    <DropdownMenuWrapper
      button={{
        label: buttonLabel,
        variant: "outline",
        icon: <ChevronDown size={16} />,
      }}
      items={items}
      content={{
        color: "gray",
      }}
    />
  )
}

export interface TableFiltersProps<TData extends object> {
  table: TanStackTable<TData>
  filterColumn?: keyof TData | string
  filterPlaceholder: string
  visibilityItems: {
    label: string
    onClick: () => void
    checked?: boolean
    checkedIcon?: React.ReactNode
  }[]
  facets?: DataTableFacet<TData>[]
  exportOptions?: {
    enabled?: boolean
    formats?: ("csv" | "excel" | "pdf")[]
    onExport: (format: string) => void
  }
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
  enableSidebarFilters?: boolean
  // Whether inline cell editing is enabled
  enableInlineCellEdit?: boolean
}

// Internal component that will be memoized
export const TableFiltersComponent = <TData extends object>({
  table,
  filterColumn,
  filterPlaceholder,
  visibilityItems,
  facets,
  exportOptions,
  onToggleSidebar,
  sidebarOpen,
  enableSidebarFilters,
  enableInlineCellEdit,
}: TableFiltersProps<TData>) => {
  // Use state for debounced filtering
  const [inputValue, setInputValue] = useState<string>(
    (table.getColumn(filterColumn as string)?.getFilterValue() as string) ?? ""
  )

  // Apply the filter after a delay to reduce renders during typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (filterColumn) {
        table.getColumn(filterColumn as string)?.setFilterValue(inputValue)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [inputValue, filterColumn, table])

  // Memoize if filters are applied
  const isFiltered = useMemo(() => {
    return table.getState().columnFilters.length > 0
  }, [table.getState().columnFilters.length])

  // Create export dropdown items - memoized to prevent recreating on every render
  const exportItems = useMemo(() => {
    return (
      exportOptions?.formats?.map((format) => ({
        label: `Export as ${format.toUpperCase()}`,
        onClick: () => exportOptions.onExport(format),
        icon: <Download size={16} />,
      })) || []
    )
  }, [exportOptions])

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    },
    []
  )

  const handleResetFilters = useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  return (
    <Flex align="center" gap="2" wrap="wrap" py="2">
      {/* Sidebar toggle button */}
      {enableSidebarFilters && onToggleSidebar && (
        <Button onClick={onToggleSidebar} size="2">
          {sidebarOpen ? (
            <>
              <ChevronLeft size={16} />
              Hide Filters
            </>
          ) : (
            <>
              <SlidersHorizontal size={16} />
              Show Filters
            </>
          )}
        </Button>
      )}

      {filterColumn && (
        <Box style={{ maxWidth: "24rem", flex: 1 }}>
          <TextField.Root
            placeholder={filterPlaceholder}
            value={inputValue}
            onChange={handleInputChange}
          />
        </Box>
      )}

      {facets && facets.length > 0 && (
        <Flex align="center" gap="2">
          {facets.map((facet, index) => (
            <FacetedFilterComponent key={index} table={table} facet={facet} />
          ))}
        </Flex>
      )}

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={handleResetFilters}
        >
          Reset
          <X size={16} />
        </Button>
      )}

      <Flex align="center" gap="2" ml="auto">
        {exportOptions?.enabled && exportItems.length > 0 && (
          <DropdownMenuWrapper
            button={{
              label: "Export",
              variant: "outline",
              icon: <Download size={16} />,
            }}
            items={exportItems}
            content={{
              color: "gray",
            }}
          />
        )}

        {/* Show keyboard shortcuts help when inline editing is enabled */}
        {enableInlineCellEdit && <KeyboardShortcutsHelp />}

        {visibilityItems?.length > 0 && (
          <DropdownMenuWrapper
            button={{
              label: "Columns",
              variant: "outline",
              icon: <ChevronDown size={16} />,
            }}
            items={visibilityItems}
            content={{
              color: "gray",
            }}
          />
        )}
      </Flex>
    </Flex>
  )
}

// Export a named version for direct imports
export const TableFilters = TableFiltersComponent

// Export the faceted filter component for reuse
export const FacetedFilter = FacetedFilterComponent
