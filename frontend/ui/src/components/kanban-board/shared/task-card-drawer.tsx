// components/shared/task-card-drawer.tsx
import { useKanban } from "../hooks/use-kanban-data";
import { useListView } from "../hooks/use-list-view";
import { useKanbanDrawer } from "../hooks/use-kanban-drawer";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Text,
} from "@incmix/ui";
import { ModalPresets } from "./confirmation-modal";
import { TaskChecklist } from "./task-checklist";
import { assignData, attachments, commentsData, labelsData } from "../data";

import {
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
  type TaskCardDrawerProps,
} from "./task-card-components";
import { MotionSheet } from "@components/custom-sheet";
import { KanbanImages } from "../images";
import { ComboBox } from "@components/combo-box";
import { useState } from "react";
import { Download, FileArchive, Plus, Trash2, X } from "lucide-react";

export function TaskCardDrawer({
  viewType = "board",
  projectId = "default-project",
  onTaskModified,
}: TaskCardDrawerProps) {
  // Get drawer state from the shared context
  const { taskId, isOpen, handleDrawerClose } = useKanbanDrawer();
  console.log(taskId);

  const [selectedMemebers, setSelectedMemebers] = useState<string[]>([
    "regina-cooper",
  ]);
  // Use the appropriate hook based on the view type
  const { columns, updateTask, deleteTask, createTask, moveTask } =
    viewType === "board" ? useKanban(projectId) : useListView(projectId);

  // Find the current task and its column
  const currentTask = taskId
    ? columns.flatMap((col) => col.tasks).find((task) => task.taskId === taskId)
    : null;

  const currentColumn = currentTask
    ? columns.find((col) =>
        col.tasks.some((task) => task.taskId === currentTask.taskId),
      )
    : null;

  // Use custom hooks for state and actions
  const drawerState = useTaskDrawerState(currentTask);
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
  });

  if (!currentTask || !currentColumn) {
    return null;
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
      <Flex className="h-full flex-col cursor-default rounded-lg bg-gray-3 dark:bg-gray-4">
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
            <Box className="bg-gray-1 p-4 dark:bg-gray-3">
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

              {/* Task Acceptance Criteria */}
              <TaskAcceptanceCriteriaSection
                acceptanceCriteria={currentTask.acceptanceCriteria}
              />

              {/* Task Checklist */}
              <TaskChecklist
                checklist={currentTask.checklist || []}
                onChecklistItemToggle={(id, checked) => {
                  const updatedChecklist = currentTask.checklist?.map(
                    (item: { id: string; text: string; checked: boolean }) =>
                      item.id === id ? { ...item, checked } : item,
                  );
                  updateTask(currentTask.taskId, {
                    checklist: updatedChecklist,
                  });
                }}
                onChecklistItemEdit={(id, text) => {
                  const updatedChecklist = currentTask.checklist?.map(
                    (item: { id: string; text: string; checked: boolean }) =>
                      item.id === id ? { ...item, text } : item,
                  );
                  updateTask(currentTask.taskId, {
                    checklist: updatedChecklist,
                  });
                }}
                onChecklistItemDelete={(id) => {
                  const updatedChecklist = currentTask.checklist?.filter(
                    (item: { id: string }) => item.id !== id,
                  );
                  updateTask(currentTask.taskId, {
                    checklist: updatedChecklist,
                  });
                }}
                onChecklistItemAdd={(text) => {
                  const newChecklist = [
                    ...(currentTask.checklist || []),
                    { id: crypto.randomUUID(), text, checked: false },
                  ];
                  updateTask(currentTask.taskId, { checklist: newChecklist });
                }}
              />

              {/* Reference URLs */}
              <TaskRefUrlsSection
                refUrls={currentTask.refUrls || []}
                onUpdate={(updatedRefUrls) => {
                  taskActions.handleUpdateTask({ refUrls: updatedRefUrls });
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
                  taskActions.handleAddSubtask(drawerState.newSubtaskName);
                  drawerState.setNewSubtaskName("");
                  drawerState.setIsAddingSubtask(false);
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
                className="absolute -top-2 right-3 ml-8 flex h-8 w-8 items-center justify-center rounded-md"
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

              <Box className="space-y-3 border-gray-1 dark:border-gray-3 border-t-2 p-4 py-3">
                <Flex justify={"between"} align={"center"}>
                  <Heading size={"4"} className=" font-medium text-gray-12">
                    ASSIGNED TO
                  </Heading>
                  <ComboBox
                    options={assignData}
                    onValueChange={setSelectedMemebers}
                    defaultValue={selectedMemebers}
                    placeholder="Find Person..."
                    title="Assign To"
                  />
                </Flex>
                <Flex className="gap-1">
                  <Avatar src={KanbanImages.user1} className="h-8 w-8" />
                  <Avatar src={KanbanImages.user2} className="h-8 w-8" />
                  <Avatar src={KanbanImages.user1} className="h-8 w-8" />
                </Flex>
              </Box>

              {/* Dates */}
              <TaskDatesSection
                currentTask={currentTask}
                startDate={drawerState.startDate}
                endDate={drawerState.endDate}
                onStartDateChange={(date) => {
                  drawerState.setStartDate(date);
                  taskActions.handleStartDateChange(date);
                }}
                onEndDateChange={(date) => {
                  drawerState.setEndDate(date);
                  taskActions.handleEndDateChange(date);
                }}
              />
              <Box className="space-y-3 border-gray-1 dark:border-gray-3 border-t-2 p-4 py-3 ">
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
                      drawerState.newTagColor,
                    );
                    drawerState.setNewTagName("");
                    drawerState.setIsAddingTag(false);
                  }}
                  onRemoveTag={taskActions.handleRemoveTag}
                />
              </Box>
              <Box className="space-y-3 border-gray-1 dark:border-gray-3 border-t-2 p-4 py-3 ">
                <Box>
                  <Heading size={"3"} className=" font-medium text-gray-12">
                    Created
                  </Heading>
                  <Text as="span" className="text-gray-9">
                    January 2, 2020 4:30 PM
                  </Text>
                </Box>
                <Box>
                  <Heading size={"3"} className=" font-medium text-gray-12">
                    Updated
                  </Heading>
                  <Text as="span" className="text-gray-9">
                    January 2, 2020 4:55 PM
                  </Text>
                </Box>
              </Box>
            </Box>
          </Flex>
        </ScrollArea>
      </Flex>
    </MotionSheet>
  );
}
