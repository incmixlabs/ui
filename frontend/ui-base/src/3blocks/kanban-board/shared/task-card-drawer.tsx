import {
  Accordion,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Text,
} from "@/base"
import type { TaskDataSchema } from "@incmix/utils/schema"
// components/shared/task-card-drawer.tsx
import React from "react"
import { useKanban } from "../hooks/use-kanban-data"
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
import { useListView } from "../hooks/use-list-view"

import { attachments } from "../data"
import { ModalPresets } from "./confirmation-modal"

import { MotionSheet } from "@/layouts/custom-sheet"
import { KanbanImages } from "../images"
import {
  TaskActionButtons,
  TaskAssigneesSection,
  type TaskCardDrawerProps,
  TaskDatesSection,
  TaskDescriptionSection,
  TaskRefUrlsSection,
  TaskSubtasksSection,
  TaskTagsSection,
  TaskTitleSection,
  useTaskActions,
  useTaskDrawerState,
} from "./task-card-components"
import {
  type AcceptanceCriteriaItem,
  TaskAcceptanceCriteriaSection,
} from "./task-card-components/task-acceptance-criteria-section"
import { TaskChecklist } from "./task-checklist"

import { Download, FileArchive, Plus, Trash2, X } from "lucide-react"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export function TaskCardDrawer({
  viewType = "board",
  projectId = "default-project",
  onTaskModified,
}: TaskCardDrawerProps) {
  // Get drawer state from the shared context
  const { taskId, handleDrawerClose } = useKanbanDrawer()
  // Removed console.log to prevent unnecessary re-renders

  const [_selectedMemebers, _setSelectedMemebers] = useState<string[]>([
    "regina-cooper",
  ])
  // Use the appropriate hook based on the view type and get full results
  const kanbanData = useKanban(projectId)
  const listViewData = useListView(projectId)

  // Destructure what we need based on the view type
  const { columns, updateTask, deleteTask, createTask, moveTask } =
    viewType === "board" ? kanbanData : listViewData

  // Find the current task and its column - Memoize to prevent re-renders
  const foundTask = React.useMemo(
    () =>
      taskId
        ? columns.flatMap((col) => col.tasks).find((task) => task.id === taskId)
        : null,
    [taskId, columns]
  )

  // Safely convert to TaskDataSchema with proper validation - Memoize this as well
  const currentTask = React.useMemo(
    () =>
      foundTask?.id
        ? ({
            ...foundTask,
            // Ensure all required TaskDataSchema fields are present
            id: foundTask.id,
            // Use currentColumn.id as fallback if statusId is not present
            statusId: foundTask.statusId || "",
            priorityId: foundTask.priorityId || "medium",
          } as TaskDataSchema)
        : null,
    [foundTask]
  )

  const currentColumn = React.useMemo(
    () =>
      currentTask
        ? columns.find((col) =>
            col.tasks.some((task) => task.id === currentTask.id)
          )
        : null,
    [currentTask, columns]
  )

  // Use custom hooks for state and actions
  const drawerState = useTaskDrawerState(currentTask)
  const taskActions = useTaskActions({
    currentTask,
    currentColumn,
    updateTask,
    deleteTask,
    createTask,
    moveTask,
    onTaskModified,
    handleDrawerClose,
    columns,
  })

  // Removed console.log to prevent unnecessary re-renders

  if (!currentTask || !currentColumn) {
    return null
  }

  // Checklist handlers
  const handleChecklistReorder = (reorderedChecklist: any[]) => {
    if (currentTask.id) {
      updateTask(currentTask.id, { checklist: reorderedChecklist })
    }
  }

  // Acceptance Criteria handlers
  const handleAddAcceptanceCriteria = (text: string) => {
    if (!currentTask.id) return

    const newItem: AcceptanceCriteriaItem = {
      id: uuidv4(),
      text,
      order: currentTask.acceptanceCriteria
        ? Math.max(
            0,
            ...currentTask.acceptanceCriteria.map((item) => item.order + 1)
          )
        : 0,
    }

    const updatedCriteria = [...(currentTask.acceptanceCriteria || []), newItem]

    // Use type assertion to resolve TypeScript compatibility issue
    updateTask(currentTask.id, { acceptanceCriteria: updatedCriteria as any })
  }

  const handleEditAcceptanceCriteria = (id: string, text: string) => {
    if (!currentTask.id || !currentTask.acceptanceCriteria) return

    const updatedCriteria = currentTask.acceptanceCriteria.map((item) =>
      item.id === id ? { ...item, text } : item
    )

    // Use type assertion to resolve TypeScript compatibility issue
    updateTask(currentTask.id, { acceptanceCriteria: updatedCriteria as any })
  }

  const handleDeleteAcceptanceCriteria = (id: string) => {
    if (!currentTask.id || !currentTask.acceptanceCriteria) return

    const updatedCriteria = currentTask.acceptanceCriteria.filter(
      (item) => item.id !== id
    )

    // Use type assertion to resolve TypeScript compatibility issue
    updateTask(currentTask.id, { acceptanceCriteria: updatedCriteria as any })
  }

  const handleAcceptanceCriteriaReorder = (
    reorderedCriteria: AcceptanceCriteriaItem[]
  ) => {
    if (currentTask.id) {
      // Use type assertion to resolve TypeScript compatibility issue
      updateTask(currentTask.id, {
        acceptanceCriteria: reorderedCriteria as any,
      })
    }
  }

  const handleAcceptanceCriteriaToggle = (id: string, checked: boolean) => {
    if (!currentTask.id || !currentTask.acceptanceCriteria) return

    const updatedCriteria = currentTask.acceptanceCriteria.map((item) =>
      item.id === id ? { ...item, checked } : item
    )

    // Use type assertion to resolve TypeScript compatibility issue
    updateTask(currentTask.id, { acceptanceCriteria: updatedCriteria as any })
  }

  return (
    <MotionSheet
      open={Boolean(!!taskId)}
      onOpenChange={handleDrawerClose}
      showCloseButton={false}
      side="right"
      isFilterClassName="relative z-50 h-[80vh] shrink-0 rounded-xl"
      className="w-[53rem] p-0 "
    >
      <Flex className="h-full cursor-default flex-col rounded-lg bg-gray-3 dark:bg-gray-4">
        {/* Delete Task Confirmation Modal */}
        {ModalPresets.deleteTask({
          isOpen: drawerState.showDeleteConfirmation,
          onOpenChange: drawerState.setShowDeleteConfirmation,
          taskName: currentTask?.name,
          onConfirm: taskActions.confirmDeleteTask,
          isLoading: drawerState.isLoading,
        })}

        {/* Header */}
        {/* <TaskHeader
          currentColumn={currentColumn}
          onClose={handleDrawerClose}
        /> */}

        {/* Content */}
        <ScrollArea className="h-[98vh] rounded-lg">
          <Flex className="space-y-6">
            <Box className="space-y-6 bg-gray-1 p-4 dark:bg-gray-3">
              {/* Action Buttons */}
              <TaskActionButtons
                currentTask={currentTask}
                currentColumn={currentColumn}
                columns={columns}
                priorityLabels={
                  viewType === "board"
                    ? kanbanData?.priorityLabels
                    : listViewData?.priorityLabels
                }
                onCompleteTask={taskActions.handleCompleteTask}
                onStatusChange={taskActions.handleStatusChange}
                onPriorityChange={taskActions.handlePriorityChange}
                onDeleteTask={() => drawerState.setShowDeleteConfirmation(true)}
                onDuplicateTask={taskActions.handleDuplicateTask}
              />

              {/* Task Title */}
              <TaskTitleSection
                currentTask={currentTask}
                isEditing={drawerState.isEditingTitle}
                editValue={drawerState.editTitle}
                onEditChange={drawerState.setEditTitle}
                onStartEdit={() => drawerState.setIsEditingTitle(true)}
                onStopEdit={() => drawerState.setIsEditingTitle(false)}
                onSave={() =>
                  taskActions.handleTitleSave(drawerState.editTitle)
                }
              />

              {/* Task Description */}
              <TaskDescriptionSection
                currentTask={currentTask}
                isEditing={drawerState.isEditingDescription}
                editValue={drawerState.editDescription}
                onEditChange={drawerState.setEditDescription}
                onStartEdit={() => drawerState.setIsEditingDescription(true)}
                onStopEdit={() => drawerState.setIsEditingDescription(false)}
                onSave={() =>
                  taskActions.handleDescriptionSave(drawerState.editDescription)
                }
              />

              {/* Task Sections in Accordion */}
              <Accordion.Root
                type="multiple"
                defaultValue={["acceptance-criteria", "checklist"]}
                className="mt-4 w-full"
              >
                {/* Acceptance Criteria Accordion Item */}
                <Accordion.Item value="acceptance-criteria">
                  <Accordion.Trigger className="font-medium text-base hover:no-underline">
                    {(() => {
                      const criteria = currentTask.acceptanceCriteria || []
                      const completedItems = criteria.filter(
                        (item) => item.checked
                      ).length
                      const totalItems = criteria.length
                      return (
                        <div className="flex w-full items-center gap-2">
                          <span>Acceptance Criteria</span>
                          {totalItems > 0 && (
                            <span className="font-semibold text-gray-500 text-sm dark:text-gray-400">
                              ({completedItems}/{totalItems})
                            </span>
                          )}
                        </div>
                      )
                    })()}
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <TaskAcceptanceCriteriaSection
                      acceptanceCriteria={currentTask.acceptanceCriteria || []}
                      onAcceptanceCriteriaAdd={handleAddAcceptanceCriteria}
                      onAcceptanceCriteriaEdit={handleEditAcceptanceCriteria}
                      onAcceptanceCriteriaDelete={
                        handleDeleteAcceptanceCriteria
                      }
                      onReorderAcceptanceCriteria={
                        handleAcceptanceCriteriaReorder
                      }
                      onAcceptanceCriteriaToggle={
                        handleAcceptanceCriteriaToggle
                      }
                      hideTitle={true}
                    />
                  </Accordion.Content>
                </Accordion.Item>

                {/* Checklist Accordion Item */}
                <Accordion.Item value="checklist">
                  <Accordion.Trigger className="font-medium text-base hover:no-underline">
                    {(() => {
                      const checklist = currentTask.checklist || []
                      const completedItems = checklist.filter(
                        (item) => item.checked
                      ).length
                      const totalItems = checklist.length
                      return (
                        <div className="flex w-full items-center gap-2">
                          <span>Checklist</span>
                          {totalItems > 0 && (
                            <span className="font-semibold text-gray-500 text-sm dark:text-gray-400">
                              ({completedItems}/{totalItems})
                            </span>
                          )}
                        </div>
                      )
                    })()}
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <TaskChecklist
                      checklist={currentTask.checklist || []}
                      hideTitle={true}
                      onChecklistItemToggle={(id, checked) => {
                        const updatedChecklist = currentTask.checklist?.map(
                          (item: {
                            id: string
                            text: string
                            checked: boolean
                            order: number
                          }) => (item.id === id ? { ...item, checked } : item)
                        )
                        if (currentTask.id) {
                          updateTask(currentTask.id, {
                            checklist: updatedChecklist,
                          })
                        }
                      }}
                      onChecklistItemEdit={(id, text) => {
                        const updatedChecklist = currentTask.checklist?.map(
                          (item: {
                            id: string
                            text: string
                            checked: boolean
                            order: number
                          }) => (item.id === id ? { ...item, text } : item)
                        )
                        if (currentTask.id) {
                          updateTask(currentTask.id, {
                            checklist: updatedChecklist,
                          })
                        }
                      }}
                      onChecklistItemDelete={(id) => {
                        const updatedChecklist = currentTask.checklist?.filter(
                          (item: { id: string }) => item.id !== id
                        )
                        if (currentTask.id) {
                          updateTask(currentTask.id, {
                            checklist: updatedChecklist,
                          })
                        }
                      }}
                      onChecklistItemAdd={(text) => {
                        // Find the highest order to place new item at the end
                        const maxOrder = Math.max(
                          0,
                          ...(currentTask.checklist || []).map(
                            (item) => item.order || 0
                          )
                        )

                        const newChecklist = [
                          ...(currentTask.checklist || []),
                          {
                            id: crypto.randomUUID(),
                            text,
                            checked: false,
                            order: maxOrder + 1, // Set order to place at end
                          },
                        ]

                        if (currentTask.id) {
                          updateTask(currentTask.id, {
                            checklist: newChecklist,
                          })
                        }
                      }}
                      onReorderChecklist={(reorderedChecklist) => {
                        handleChecklistReorder(reorderedChecklist)
                      }}
                    />
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>

              {/* Reference URLs */}
              <TaskRefUrlsSection
                refUrls={currentTask.refUrls || []}
                onUpdate={(updatedRefUrls) => {
                  taskActions.handleUpdateTask({ refUrls: updatedRefUrls })
                }}
                readonly={false}
              />

              {/* Assignees - moved to bottom section */}

              {/* Subtasks */}
              <TaskSubtasksSection
                currentTask={currentTask}
                isAddingSubtask={drawerState.isAddingSubtask}
                newSubtaskName={drawerState.newSubtaskName}
                onAddingSubtaskChange={drawerState.setIsAddingSubtask}
                onNewSubtaskNameChange={drawerState.setNewSubtaskName}
                onAddSubtask={() => {
                  taskActions.handleAddSubtask(drawerState.newSubtaskName)
                  drawerState.setNewSubtaskName("")
                  drawerState.setIsAddingSubtask(false)
                }}
                onUpdateSubtask={taskActions.handleUpdateSubtask}
                onDeleteSubtask={taskActions.handleDeleteSubtask}
                onReorderSubtasks={taskActions.handleReorderSubtasks}
              />

              {/* Comments */}
              {/* <TaskCommentsSection
                currentTask={currentTask}
                newComment={drawerState.newComment}
                onNewCommentChange={drawerState.setNewComment}
                onAddComment={() => {
                  taskActions.handleAddComment(drawerState.newComment);
                  drawerState.setNewComment("");
                }}
              /> */}
              <Box className="py-5">
                <Heading size={"4"} className=" py-3 font-medium text-gray-11">
                  Attachments
                </Heading>

                <Box className="space-y-4">
                  {attachments.map((attachment) => (
                    <Flex
                      align={"center"}
                      key={attachment.id}
                      className=" rounded-lg bg-gray-3 p-3 transition-colors dark:bg-gray-4"
                    >
                      {attachment.type === "image" ? (
                        <Box className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={attachment.thumbnailUrl}
                            alt={attachment.name}
                            className="h-full w-full object-cover"
                          />
                        </Box>
                      ) : (
                        <Box className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-8">
                          <FileArchive className="h-8 w-8 text-gray-8" />
                        </Box>
                      )}

                      <Box className="ml-4 grow">
                        <Heading
                          as="h3"
                          className="font-medium text-gray-12 text-sm"
                        >
                          {attachment.name}
                        </Heading>
                        <Box className="mt-1 text-gray-11 text-xs">
                          <Text>Uploaded on {attachment.uploadDate}</Text>
                          <Text className="mx-2">•</Text>
                        </Box>
                        <Text as="p" className="pt-1 text-gray-11 text-sm">
                          {attachment.size}
                        </Text>
                      </Box>

                      <Flex className="space-x-2">
                        <Button
                          variant="soft"
                          className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-4 dark:hover:bg-gray-7"
                        >
                          <Download className="h-5 w-5 text-gray-12" />
                        </Button>
                        <Button
                          variant="soft"
                          className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-4 dark:hover:bg-gray-7"
                        >
                          <Trash2 className="h-5 w-5 text-gray-12" />
                        </Button>
                      </Flex>
                    </Flex>
                  ))}
                </Box>

                <IconButton className="mt-4 w-fit gap-2 bg-transparent p-1 font-semibold text-secondary ">
                  <Plus />
                  <Text>Add Attachment</Text>
                </IconButton>
              </Box>
            </Box>
            <Box className="relative h-full w-72 shrink-0 pt-10">
              <IconButton
                color="gray"
                variant="soft"
                onClick={handleDrawerClose}
                className="-top-2 absolute right-3 ml-8 flex h-8 w-8 items-center justify-center rounded-md"
              >
                <X aria-hidden="true" />
                <span className="sr-only">Close</span>
              </IconButton>
              <Box className="space-y-3 p-4 ">
                <Heading size={"4"} className=" font-medium text-gray-12">
                  CREATED BY
                </Heading>
                <Flex className="gap-2" align={"center"}>
                  <Avatar src={KanbanImages.user1} className="h-8 w-8" />
                  <Text as="p">Regina Cooper</Text>
                </Flex>
              </Box>

              {/* Assignees */}
              <TaskAssigneesSection
                currentTask={currentTask}
                isMemberPickerOpen={drawerState.isMemberPickerOpen}
                onMemberPickerOpenChange={drawerState.setIsMemberPickerOpen}
                onUpdateTask={taskActions.handleUpdateTask}
              />

              {/* Dates */}
              <TaskDatesSection
                currentTask={currentTask}
                startDate={drawerState.startDate}
                endDate={drawerState.endDate}
                onStartDateChange={(date) => {
                  drawerState.setStartDate(date)
                  taskActions.handleStartDateChange(date)
                }}
                onEndDateChange={(date) => {
                  drawerState.setEndDate(date)
                  taskActions.handleEndDateChange(date)
                }}
              />
              <Box className="space-y-3 border-gray-1 border-t-2 p-4 py-3 dark:border-gray-3 ">
                {/* Tags */}
                <TaskTagsSection
                  currentTask={currentTask}
                  isAddingTag={drawerState.isAddingTag}
                  newTagName={drawerState.newTagName}
                  newTagColor={drawerState.newTagColor}
                  onAddingTagChange={drawerState.setIsAddingTag}
                  onNewTagNameChange={drawerState.setNewTagName}
                  onNewTagColorChange={drawerState.setNewTagColor}
                  onAddTag={() => {
                    taskActions.handleAddTag(
                      drawerState.newTagName,
                      drawerState.newTagColor
                    )
                    drawerState.setNewTagName("")
                    drawerState.setIsAddingTag(false)
                  }}
                  onRemoveTag={taskActions.handleRemoveTag}
                />
              </Box>
              <Box className="space-y-3 border-gray-1 border-t-2 p-4 py-3 dark:border-gray-3 ">
                <Box>
                  <Heading size={"3"} className=" font-medium text-gray-12">
                    Created
                  </Heading>
                  <Text as="span" className="text-gray-9">
                    {currentTask.createdAt
                      ? new Date(currentTask.createdAt).toLocaleString()
                      : "Not available"}
                  </Text>
                </Box>
                <Box>
                  <Heading size={"3"} className=" font-medium text-gray-12">
                    Updated
                  </Heading>
                  <Text as="span" className="text-gray-9">
                    {currentTask.updatedAt
                      ? new Date(currentTask.updatedAt).toLocaleString()
                      : "Not available"}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Flex>
        </ScrollArea>
      </Flex>
    </MotionSheet>
  )
}
