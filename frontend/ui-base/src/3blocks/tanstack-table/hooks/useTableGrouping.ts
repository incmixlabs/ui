"use client"

import type { Row } from "@tanstack/react-table"
import { useCallback, useMemo, useState } from "react"
import type { RowGroupingOptions } from "../types"

// Interface for grouped row data
export interface GroupedRowsMap<TData extends object> {
  [groupKey: string]: {
    rows: Row<TData>[]
    isCollapsed: boolean
  }
}

// Interface for the hook return value
export interface TableGroupingReturn<TData extends object> {
  // Map of grouped rows
  groupedRows: GroupedRowsMap<TData>
  // Function to toggle a group's collapsed state
  toggleGroupCollapsed: (groupKey: string) => void
  // Function to check if a row should be visible
  isRowVisible: (row: Row<TData>) => boolean
  // Get all unique group keys
  groupKeys: string[]
  // Get the row count for a group
  getGroupRowCount: (groupKey: string) => number
  // Get the group value for a row
  getRowGroupValue: (row: Row<TData>) => string
}

/**
 * Custom hook for handling row grouping in tables
 * This hook processes rows into groups and manages collapse/expand states
 */
export function useTableGrouping<TData extends object>(
  rows: Row<TData>[],
  options: RowGroupingOptions<TData>,
  enabled: boolean
): TableGroupingReturn<TData> {
  // State to track which groups are collapsed
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({})

  // Function to get the group value for a row
  const getRowGroupValue = useCallback(
    (row: Row<TData>): string => {
      // Get the raw group value
      let rawValue: string
      if (typeof options.groupByColumn === "function") {
        rawValue = options.groupByColumn(row.original)
      } else {
        const columnKey = options.groupByColumn as string
        if (row.original && columnKey in row.original) {
          const value = (row.original as any)[columnKey]
          rawValue = value?.toString() || "Unknown"
        } else {
          const value = row.getValue(columnKey) as string | number | boolean
          rawValue = value?.toString() || "Unknown"
        }
      }

      // Apply category mapping if provided
      if (
        options.categoryMapping?.valueToIdentifier &&
        typeof options.categoryMapping.valueToIdentifier === "object" &&
        !Array.isArray(options.categoryMapping.valueToIdentifier) &&
        rawValue in options.categoryMapping.valueToIdentifier
      ) {
        // Map display value to standardized identifier
        return (
          options.categoryMapping.valueToIdentifier as Record<string, string>
        )[rawValue]
      }

      return rawValue
    },
    [options.groupByColumn, options.categoryMapping]
  )

  // Group rows by the grouping column
  const { groupedRows, groupKeys } = useMemo(() => {
    if (!enabled) {
      return {
        groupedRows: {},
        groupKeys: [],
      }
    }

    // Create groups map
    const groups: GroupedRowsMap<TData> = {}
    // Create a set of unique group values
    const uniqueGroups = new Set<string>()

    // Process all rows
    rows.forEach((row) => {
      const groupValue = getRowGroupValue(row)
      uniqueGroups.add(groupValue)

      // Initialize group if it doesn't exist
      if (!groups[groupValue]) {
        groups[groupValue] = {
          rows: [],
          isCollapsed:
            options.initiallyCollapsed || collapsedGroups[groupValue] || false,
        }
      }

      // Add row to group
      groups[groupValue].rows.push(row)
    })

    // Convert set to array for easier use
    const keys = Array.from(uniqueGroups)

    return {
      groupedRows: groups,
      groupKeys: keys,
    }
  }, [
    rows,
    options.initiallyCollapsed,
    collapsedGroups,
    enabled,
    getRowGroupValue,
  ])

  // Toggle the collapse state of a group
  const toggleGroupCollapsed = useCallback((groupKey: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }))
  }, [])

  // Check if a row should be visible based on its group's collapsed state
  const isRowVisible = useCallback(
    (row: Row<TData>): boolean => {
      if (!enabled) return true

      const groupValue = getRowGroupValue(row)
      return !groupedRows[groupValue]?.isCollapsed
    },
    [enabled, getRowGroupValue, groupedRows]
  )

  // Get the row count for a specific group
  const getGroupRowCount = useCallback(
    (groupKey: string): number => {
      return groupedRows[groupKey]?.rows.length || 0
    },
    [groupedRows]
  )

  // Return all necessary values and functions
  return {
    groupedRows,
    toggleGroupCollapsed,
    isRowVisible,
    groupKeys,
    getGroupRowCount,
    getRowGroupValue,
  }
}
