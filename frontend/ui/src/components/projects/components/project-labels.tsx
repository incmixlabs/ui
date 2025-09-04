import { Badge, Box, Button, Flex, Popover, Tabs, Text, Dialog, AlertDialog, TextField, Skeleton } from "@base"
import { useState } from "react"
import { Flag, Plus, Trash2 } from "lucide-react"

import { InlineEditableField } from "./inline-editable-field"
import { Heading } from "@radix-ui/themes"
import ColorPicker from "@components/color-picker"
import { useProjectLabelsQuery, useProjectLabelsMutations } from "@incmix/store"
import { useProjectDrawer } from "../hooks/use-project-drawer"
import { useRxDB } from "rxdb-hooks"

import type { LabelSchema } from "@incmix/utils/schema"

interface ProjectLabelsProps {
  mockData?: {
    projectId: string
    labels: LabelSchema[]
  }
  mockOperations?: {
    updateLabel: {
      mutateAsync: (data: any) => Promise<void>
      isLoading: boolean
    }
  }
}

export default function ProjectLabels({
  mockData,
  mockOperations,
}: ProjectLabelsProps = {}) {
  // Use mock data and operations if provided, otherwise use real hooks
  const drawerData = mockData
    ? { projectId: mockData.projectId }
    : useProjectDrawer()

  const labelsData = mockData
    ? {
        statusLabels: mockData.labels.filter((l) => l.type === "status").sort((a, b) => a.order - b.order),
        priorityLabels: mockData.labels.filter((l) => l.type === "priority").sort((a, b) => a.order - b.order),
        allLabels: mockData.labels,
        isLoading: false,
        error: null,
      }
    : useProjectLabelsQuery(drawerData.projectId)

  const mutationsData = mockOperations
    ? { updateLabel: mockOperations.updateLabel, deleteLabel: null, createLabel: null }
    : useProjectLabelsMutations()

  const { statusLabels, priorityLabels, isLoading, error } = labelsData
  const { updateLabel, deleteLabel, createLabel } = mutationsData
  
  const db = useRxDB()

  const [activeTab, setActiveTab] = useState<"status" | "priority">("status")
  const [openColorPicker, setOpenColorPicker] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<string | null>(null)
  const [labelInUse, setLabelInUse] = useState<boolean>(false)
  const [checkingUsage, setCheckingUsage] = useState<boolean>(false)
  const [mergeConfirmOpen, setMergeConfirmOpen] = useState<{
    labelToRename: LabelSchema
    existingLabel: LabelSchema
    newName: string
  } | null>(null)
  const [merging, setMerging] = useState<boolean>(false)
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [newLabelName, setNewLabelName] = useState<string>("")
  const [newLabelColor, setNewLabelColor] = useState<string>("#6366f1")
  const [newLabelError, setNewLabelError] = useState<string>("")

  const checkForDuplicateLabel = (newName: string, currentLabelId: string): LabelSchema | null => {
    const currentLabels = activeTab === "status" ? statusLabels : priorityLabels
    return currentLabels.find(label => 
      label.name.toLowerCase() === newName.toLowerCase() && 
      label.id !== currentLabelId
    ) || null
  }

  const checkForDuplicateNewLabel = (newName: string): boolean => {
    const currentLabels = activeTab === "status" ? statusLabels : priorityLabels
    return currentLabels.some(label => 
      label.name.toLowerCase() === newName.trim().toLowerCase()
    )
  }

  const handleUpdateLabelName = async (labelId: string, newName: string) => {
    if (!updateLabel) return

    // Check if renaming would create a duplicate
    const existingLabel = checkForDuplicateLabel(newName, labelId)
    if (existingLabel) {
      const currentLabels = activeTab === "status" ? statusLabels : priorityLabels
      const labelToRename = currentLabels.find(label => label.id === labelId)
      
      if (labelToRename) {
        // Show merge confirmation dialog
        setMergeConfirmOpen({
          labelToRename,
          existingLabel,
          newName
        })
        return
      }
    }

    // No duplicate found, proceed with normal rename
    try {
      await updateLabel.mutateAsync({
        id: labelId,
        updates: { name: newName },
      })
    } catch (error) {
      console.error("Failed to update label:", error)
      throw error // Re-throw to let inline field handle error state
    }
  }

  const handleUpdateLabelColor = async (labelId: string, newColor: string) => {
    if (!updateLabel) return

    try {
      await updateLabel.mutateAsync({
        id: labelId,
        updates: { color: newColor },
      })
    } catch (error) {
      console.error("Failed to update label color:", error)
      throw error // Re-throw to let inline field handle error state
    }
  }

  // Check if a label is in use by any tasks
  const checkLabelUsage = async (labelId: string, labelType: "status" | "priority"): Promise<boolean> => {
    if (!db?.tasks) return false
    
    try {
      const selector = labelType === "status" 
        ? { statusId: labelId }
        : { priorityId: labelId }
      
      const tasksUsingLabel = await db.tasks
        .find({ selector })
        .exec()
      
      return tasksUsingLabel.length > 0
    } catch (error) {
      console.error("Error checking label usage:", error)
      return true // Assume it's in use to prevent accidental deletion
    }
  }

  const handleMergeLabels = async () => {
    if (!mergeConfirmOpen || !db || !deleteLabel) return

    const { labelToRename, existingLabel } = mergeConfirmOpen
    setMerging(true)

    try {
      // Step 1: Find all tasks using the label being renamed
      const fieldToCheck = activeTab === "status" ? "statusId" : "priorityId"
      const tasksToUpdate = await db.tasks
        .find({ 
          selector: { 
            [fieldToCheck]: labelToRename.id 
          } 
        })
        .exec()

      // Step 2: Update all tasks to use the existing label instead
      for (const task of tasksToUpdate) {
        await task.update({
          $set: {
            [fieldToCheck]: existingLabel.id,
            updatedAt: Date.now()
          }
        })
      }

      // Step 3: Delete the renamed label (now redundant)
      await deleteLabel.mutateAsync(labelToRename.id)

      // Close dialog and show success
      setMergeConfirmOpen(null)
      console.log(`Successfully merged ${tasksToUpdate.length} tasks from "${labelToRename.name}" to "${existingLabel.name}"`)
      
    } catch (error) {
      console.error("Failed to merge labels:", error)
      // Keep dialog open so user can retry or cancel
    } finally {
      setMerging(false)
    }
  }

  const handleDeleteClick = async (labelId: string) => {
    if (!db) return
    
    const label = [...statusLabels, ...priorityLabels].find(l => l.id === labelId)
    if (!label) return

    setCheckingUsage(true)
    const inUse = await checkLabelUsage(labelId, label.type)
    setLabelInUse(inUse)
    setCheckingUsage(false)
    setDeleteConfirmOpen(labelId)
  }

  const handleAddNewLabel = async () => {
    if (!createLabel || !newLabelName.trim() || !drawerData.projectId) return

    // Check for duplicate name
    if (checkForDuplicateNewLabel(newLabelName)) {
      setNewLabelError(`A ${activeTab} with the name "${newLabelName.trim()}" already exists`)
      return
    }

    try {
      await createLabel.mutateAsync({
        projectId: drawerData.projectId,
        type: activeTab,
        name: newLabelName.trim(),
        color: newLabelColor,
      })

      // Reset form
      setNewLabelName("")
      setNewLabelColor("#6366f1")
      setNewLabelError("")
      setShowAddForm(false)
    } catch (error) {
      console.error("Failed to create label:", error)
      setNewLabelError("Failed to create label. Please try again.")
    }
  }

  const handleCancelAddLabel = () => {
    setNewLabelName("")
    setNewLabelColor("#6366f1")
    setNewLabelError("")
    setShowAddForm(false)
  }

  // Actually perform the deletion (only for labels not in use)
  const handleDeleteLabel = async (labelId: string) => {
    if (!deleteLabel || labelInUse) return

    try {
      await deleteLabel.mutateAsync(labelId)
      setDeleteConfirmOpen(null)
    } catch (error) {
      console.error("Failed to delete label:", error)
    }
  }

  const renderLabels = (labelList: LabelSchema[]) => {
    if (isLoading) {
      return (
        <Box className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height="48px" />
          ))}
        </Box>
      )
    }

    if (error) {
      return (
        <Text color="red" size="2">
          Failed to load {activeTab} labels: {error}
        </Text>
      )
    }

    return (
      <Box className="space-y-3">
        {/* Existing labels */}
        {labelList.length > 0 && labelList.map((label) => (
          <Flex
            key={label.id}
            align="center"
            justify="between"
            className="rounded-lg border border-gray-6 bg-gray-2 p-3 transition-colors hover:border-gray-7 dark:bg-gray-4"
          >
            <Flex align="center" gap="3" className="flex-1">
              {/* Color indicator with ColorPicker */}
              <Box className="relative flex items-center">
                <Popover.Root
                  open={openColorPicker === label.id}
                  onOpenChange={(open) =>
                    setOpenColorPicker(open ? label.id : null)
                  }
                >
                  <Popover.Trigger>
                    {activeTab === "priority" ? (
                      <Button
                        variant="ghost"
                        size="1"
                        className="p-1 h-6 w-6 min-h-0 flex items-center justify-center"
                        title="Click to change color"
                      >
                        <Flag 
                          className="h-4 w-4" 
                          style={{ color: label.color }}
                          fill={label.color}
                        />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="1"
                        className="p-1 h-6 w-6 min-h-0 flex items-center justify-center"
                        title="Click to change color"
                      >
                        <Box
                          className="h-4 w-4 rounded-full border-2 border-gray-6 hover:border-gray-8"
                          style={{ backgroundColor: label.color }}
                        />
                      </Button>
                    )}
                  </Popover.Trigger>
                  <Popover.Content className="w-auto p-2" side="right">
                    <ColorPicker
                      activeColor={label.color}
                      onColorSelect={(color) => handleUpdateLabelColor(label.id, color.hex)}
                      colorType="base"
                    />
                  </Popover.Content>
                </Popover.Root>
              </Box>

              {/* Label name - inline editable */}
              <Box className="flex-1">
                <InlineEditableField
                  value={label.name}
                  onSave={(newName: string) =>
                    handleUpdateLabelName(label.id, newName)
                  }
                  disabled={updateLabel?.isLoading}
                />
              </Box>
            </Flex>

            <Flex align="center" gap="2">
              {/* Order badge */}
              <Badge variant="soft" className="text-xs">
                #{label.order + 1}
              </Badge>

              {/* Delete button */}
              <Button
                variant="ghost"
                size="1"
                className="p-1 h-6 w-6 min-h-0 flex items-center justify-center text-red-10 hover:text-red-11 hover:bg-red-3"
                onClick={() => handleDeleteClick(label.id)}
                title="Delete label"
                disabled={deleteLabel?.isLoading || checkingUsage}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </Flex>
          </Flex>
        ))}

        {/* Empty state for no labels */}
        {labelList.length === 0 && !showAddForm && (
          <Text color="gray" size="2">No {activeTab} labels found</Text>
        )}

        {/* Add new label form */}
        {showAddForm ? (
          <Flex
            align="center"
            justify="between"
            className="rounded-lg border border-gray-6 bg-gray-2 p-3 transition-colors hover:border-gray-7 dark:bg-gray-4"
          >
            <Flex align="center" gap="3" className="flex-1">
              {/* Color picker for new label */}
              <Box className="relative flex items-center">
                <Popover.Root
                  open={openColorPicker === "new-label"}
                  onOpenChange={(open) =>
                    setOpenColorPicker(open ? "new-label" : null)
                  }
                >
                  <Popover.Trigger>
                    {activeTab === "priority" ? (
                      <Button
                        variant="ghost"
                        size="1"
                        className="p-1 h-6 w-6 min-h-0 flex items-center justify-center"
                        title="Click to change color"
                      >
                        <Flag 
                          className="h-4 w-4" 
                          style={{ color: newLabelColor }}
                          fill={newLabelColor}
                        />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="1"
                        className="p-1 h-6 w-6 min-h-0 flex items-center justify-center"
                        title="Click to change color"
                      >
                        <Box  
                          className="h-4 w-4 rounded-full border-2 border-gray-6 hover:border-gray-8"
                          style={{ backgroundColor: newLabelColor }}
                        />
                      </Button>
                    )}
                  </Popover.Trigger>
                  <Popover.Content className="w-auto p-2" side="right">
                    <ColorPicker
                      activeColor={newLabelColor}
                      onColorSelect={(color) => setNewLabelColor(color.hex)}
                      colorType="base"
                    />
                  </Popover.Content>
                </Popover.Root>
              </Box>

              {/* Name input for new label - seamless like existing labels */}
              <Box className="flex-1 max-w-xs relative">
                <TextField.Root
                  placeholder={`Enter ${activeTab} name...`}
                  value={newLabelName}
                  onChange={(e) => {
                    setNewLabelName(e.target.value)
                    // Clear error when user starts typing
                    if (newLabelError) setNewLabelError("")
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newLabelName.trim()) {
                      handleAddNewLabel()
                    } else if (e.key === 'Escape') {
                      handleCancelAddLabel()
                    }
                  }}
                  onBlur={() => {
                    // Save on blur if there's content, otherwise cancel
                    if (newLabelName.trim()) {
                      handleAddNewLabel()
                    } else {
                      handleCancelAddLabel()
                    }
                  }}
                  size="2"
                  variant="soft"
                  autoFocus
                  disabled={createLabel?.isLoading}
                />
                {createLabel?.isLoading && (
                  <Box className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Text size="1" color="gray">Adding...</Text>
                  </Box>
                )}
                {newLabelError && (
                  <Text color="red" size="1" className="mt-1 absolute -bottom-5 left-0">
                    {newLabelError}
                  </Text>
                )}
              </Box>
            </Flex>

            <Flex align="center" gap="2">
              {/* Order placeholder - matches existing label structure */}
              <Badge variant="soft" className="text-xs opacity-50">
                #{labelList.length + 1}
              </Badge>
            </Flex>
          </Flex>
        ) : (
          /* Add new label button */
          <Flex
            align="center"
            justify="center"
            className="rounded-lg border-2 border-dashed border-gray-6 hover:border-gray-8 p-2 transition-colors cursor-pointer text-gray-11 hover:text-gray-12"
            onClick={() => setShowAddForm(true)}
            style={{ 
              opacity: createLabel?.isLoading ? 0.5 : 1,
              pointerEvents: createLabel?.isLoading ? 'none' : 'auto'
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            <Text>Add New {activeTab === "status" ? "Status" : "Priority"}</Text>
          </Flex>
        )}
      </Box>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <Box className="space-y-4">
        <Heading size="4" className="font-medium text-gray-12">
          Labels
        </Heading>
        <Box className="animate-pulse space-y-3">
          <Box className="h-4 w-32 rounded bg-gray-6" />
          <Box className="h-10 w-full rounded bg-gray-6" />
          <Box className="h-10 w-full rounded bg-gray-6" />
        </Box>
      </Box>
    )
  }

  return (
    <Box className="space-y-4">
      <Heading size="4" className="font-medium text-gray-12">
        Labels
      </Heading>

      <Tabs.Root
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "status" | "priority")}
      >
        <Tabs.List className="mb-4">
          <Tabs.Trigger value="status" className="flex-1">
            <Flex align="center" gap="2">
              <Text>Status</Text>
              <Badge variant="soft" size="1">
                {statusLabels.length}
              </Badge>
            </Flex>
          </Tabs.Trigger>
          <Tabs.Trigger value="priority" className="flex-1">
            <Flex align="center" gap="2">
              <Text>Priority</Text>
              <Badge variant="soft" size="1">
                {priorityLabels.length}
              </Badge>
            </Flex>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="status">{renderLabels(statusLabels)}</Tabs.Content>

        <Tabs.Content value="priority">
          {renderLabels(priorityLabels)}
        </Tabs.Content>
      </Tabs.Root>

      {/* Instructions for demo */}
      <Text className="text-gray-10 text-xs">
        💡 Click on label names to edit them, click color dots to open the color
        picker
      </Text>

      {/* Delete confirmation dialog */}
      <AlertDialog.Root 
        open={deleteConfirmOpen !== null} 
        onOpenChange={(open) => {
          if (!open) {
            setDeleteConfirmOpen(null)
            setLabelInUse(false)
          }
        }}
      >
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>
            {checkingUsage ? "Checking Usage..." : labelInUse ? "Cannot Delete Label" : "Delete Label"}
          </AlertDialog.Title>
          <AlertDialog.Description>
            {checkingUsage ? (
              "Checking if this label is being used by any tasks..."
            ) : labelInUse ? (
              `This ${activeTab} label cannot be deleted because it is currently being used by one or more tasks. Please move or update the tasks using this label before deleting it.`
            ) : (
              `Are you sure you want to delete this ${activeTab} label? This action cannot be undone.`
            )}
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                {labelInUse ? "Close" : "Cancel"}
              </Button>
            </AlertDialog.Cancel>
            {!labelInUse && !checkingUsage && (
              <AlertDialog.Action>
                <Button 
                  variant="solid" 
                  color="red"
                  onClick={() => deleteConfirmOpen && handleDeleteLabel(deleteConfirmOpen)}
                  disabled={deleteLabel?.isLoading}
                >
                  {deleteLabel?.isLoading ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialog.Action>
            )}
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* Merge confirmation dialog */}
      <AlertDialog.Root 
        open={mergeConfirmOpen !== null} 
        onOpenChange={(open) => {
          if (!open && !merging) {
            setMergeConfirmOpen(null)
          }
        }}
      >
        <AlertDialog.Content maxWidth="500px">
          <AlertDialog.Title>
            {merging ? "Merging Labels..." : "Merge Labels"}
          </AlertDialog.Title>
          <AlertDialog.Description>
            {merging ? (
              `Merging labels and updating tasks...`
            ) : mergeConfirmOpen ? (
              `A ${activeTab} label named "${mergeConfirmOpen.existingLabel.name}" already exists. Merging will combine both labels - all tasks currently using "${mergeConfirmOpen.labelToRename.name}" will be moved to "${mergeConfirmOpen.existingLabel.name}" and the duplicate will be removed.`
            ) : ""}
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button 
                variant="soft" 
                color="gray" 
                disabled={merging}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            {!merging && (
              <AlertDialog.Action>
                <Button 
                  variant="solid" 
                  color="orange"
                  onClick={handleMergeLabels}
                >
                  Confirm Merge
                </Button>
              </AlertDialog.Action>
            )}
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  )
}
