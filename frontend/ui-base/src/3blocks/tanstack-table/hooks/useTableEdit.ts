"use client"

import React from "react"
import { useCallback } from "react"
import type { RowAction } from "../types"

/**
 * Custom hook for table editing functionality
 * @param options Configuration options for edit functionality
 * @returns Object containing edit-related handlers and actions
 */
export function useTableEdit<TData>({
  enableRowEdit = false,
  editFormSchema,
  rowActions,
  onRowEdit,
  setIsEditDialogOpen,
  setCurrentRowData,
}: {
  enableRowEdit?: boolean
  editFormSchema?: any
  rowActions?: (row: TData) => RowAction[]
  onRowEdit?: (oldData: TData, newData: TData) => void
  setIsEditDialogOpen: (isOpen: boolean) => void
  setCurrentRowData: (data: TData | null) => void
}) {
  // Handle edit row click
  const handleEditClick = useCallback(
    (row: TData) => {
      setCurrentRowData(row)
      setIsEditDialogOpen(true)
    },
    [setCurrentRowData, setIsEditDialogOpen]
  )

  // Handle close edit dialog
  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false)
    setCurrentRowData(null)
  }, [setIsEditDialogOpen, setCurrentRowData])

  // Handle edit submission
  const handleEditSubmit = useCallback(
    (oldData: TData, newData: TData) => {
      if (onRowEdit) {
        onRowEdit(oldData, newData)
      } else {
        console.log("Row edited:", { oldData, newData })
      }
    },
    [onRowEdit]
  )

  // Wrap original row actions to add edit action
  const enhancedRowActions = useCallback(
    (row: TData): RowAction[] => {
      const actions: RowAction[] = []

      // Add edit action if enabled
      if (enableRowEdit && editFormSchema) {
        actions.push({
          label: "Edit",
          onClick: () => handleEditClick(row),
          icon: React.createElement("span", { className: "mr-2" }, "✏️"),
        })
      }

      // Add original actions if they exist
      if (rowActions) {
        actions.push(...rowActions(row))
      }

      return actions
    },
    [enableRowEdit, editFormSchema, rowActions, handleEditClick]
  )

  return {
    handleEditClick,
    handleCloseEditDialog,
    handleEditSubmit,
    enhancedRowActions,
  }
}
