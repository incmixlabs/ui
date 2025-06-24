// components/shared/task-card-drawer.tsx
import { useKanban, useListView } from "@incmix/store"
import { useKanbanDrawer } from "@hooks/use-kanban-drawer"
import { ScrollArea } from "@incmix/ui"
import { ModalPresets } from "./confirmation-modal"
import { TaskChecklist } from "./task-checklist"
import {
  TaskDrawerSheet,
  TaskHeader,
  TaskActionButtons,
  TaskTitleSection,
  TaskDescriptionSection,
  TaskAcceptanceCriteriaSection,
  TaskDatesSection,
  TaskTagsSection,
  TaskRefUrlsSection,
  TaskAssigneesSection,
  TaskSubtasksSection,
  TaskCommentsSection,
  useTaskActions,
  useTaskDrawerState,
  type TaskCardDrawerProps
} from "./task-card-components"


export function TaskCardDrawer({
  viewType = 'board',
  projectId = "default-project",
  onTaskModified,
}: TaskCardDrawerProps) {
  // Get drawer state from the shared context
  const { taskId, isOpen, handleDrawerClose } = useKanbanDrawer()
  
  // Use the appropriate hook based on the view type
  const {
    columns,
    updateTask,
    deleteTask,
    createTask,
    moveTask,
  } = viewType === 'board' ? useKanban(projectId) : useListView(projectId);
  
  // Find the current task and its column
  const currentTask = taskId 
    ? columns.flatMap((col: any) => col.tasks).find((task: any) => task.taskId === taskId)
    : null

  const currentColumn = currentTask 
    ? columns.find((col: any) => col.tasks.some((task: any) => task.taskId === currentTask.taskId))
    : null
    
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
    columns
  })

  if (!currentTask || !currentColumn) {
    return null
  }

  return (
    <TaskDrawerSheet
      open={isOpen}
      onOpenChange={(open) => !open && handleDrawerClose()}
    >
      <div className="h-full flex flex-col bg-white dark:bg-gray-950">
        {/* Delete Task Confirmation Modal */}
        {ModalPresets.deleteTask({
          isOpen: drawerState.showDeleteConfirmation,
          onOpenChange: drawerState.setShowDeleteConfirmation,
          taskName: currentTask?.name,
          onConfirm: taskActions.confirmDeleteTask,
          isLoading: drawerState.isLoading
        })}

        {/* Header */}
        <TaskHeader 
          currentColumn={currentColumn}
          onClose={handleDrawerClose}
        />
      
        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Action Buttons */}
            <TaskActionButtons
              currentTask={currentTask}
              currentColumn={currentColumn}
              columns={columns}
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
              onSave={() => taskActions.handleTitleSave(drawerState.editTitle)}
            />

            {/* Task Description */}
            <TaskDescriptionSection
              currentTask={currentTask}
              isEditing={drawerState.isEditingDescription}
              editValue={drawerState.editDescription}
              onEditChange={drawerState.setEditDescription}
              onStartEdit={() => drawerState.setIsEditingDescription(true)}
              onStopEdit={() => drawerState.setIsEditingDescription(false)}
              onSave={() => taskActions.handleDescriptionSave(drawerState.editDescription)}
            />

            {/* Task Acceptance Criteria */}
            <TaskAcceptanceCriteriaSection
              acceptanceCriteria={currentTask.acceptanceCriteria}
            />

            {/* Task Checklist */}
            {currentTask?.checklist && currentTask.checklist.length > 0 && (
              <TaskChecklist
                checklist={currentTask.checklist}
                onChecklistItemToggle={(id, checked) => {
                  const updatedChecklist = currentTask.checklist?.map((item: { id: string; text: string; checked: boolean }) => 
                    item.id === id ? { ...item, checked } : item
                  )
                  updateTask(currentTask.taskId, { checklist: updatedChecklist })
                }}
                onChecklistItemEdit={(id, text) => {
                  const updatedChecklist = currentTask.checklist?.map((item: { id: string; text: string; checked: boolean }) => 
                    item.id === id ? { ...item, text } : item
                  )
                  updateTask(currentTask.taskId, { checklist: updatedChecklist })
                }}
                onChecklistItemDelete={(id) => {
                  const updatedChecklist = currentTask.checklist?.filter((item: { id: string }) => item.id !== id)
                  updateTask(currentTask.taskId, { checklist: updatedChecklist })
                }}
              />
            )}

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
                taskActions.handleAddTag(drawerState.newTagName, drawerState.newTagColor)
                drawerState.setNewTagName("")
                drawerState.setIsAddingTag(false)
              }}
              onRemoveTag={taskActions.handleRemoveTag}
            />

            {/* Reference URLs */}
            <TaskRefUrlsSection
              refUrls={currentTask.refUrls || []}
              onUpdate={(updatedRefUrls) => {
                taskActions.handleUpdateTask({ refUrls: updatedRefUrls })
              }}
              readonly={false}
            />

            {/* Assignees */}
            <TaskAssigneesSection
              currentTask={currentTask}
              isMemberPickerOpen={drawerState.isMemberPickerOpen}
              onMemberPickerOpenChange={drawerState.setIsMemberPickerOpen}
              onUpdateTask={taskActions.handleUpdateTask}
            />

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
            <TaskCommentsSection
              currentTask={currentTask}
              newComment={drawerState.newComment}
              onNewCommentChange={drawerState.setNewComment}
              onAddComment={() => {
                taskActions.handleAddComment(drawerState.newComment)
                drawerState.setNewComment("")
              }}
            />
          </div>
        </ScrollArea>
      </div>
    </TaskDrawerSheet>
  );
}