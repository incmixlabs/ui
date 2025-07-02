// task-card-components/utils/types.ts
import { TaskDataSchema, KanbanColumn } from "@incmix/utils/schema"

export type ViewType = 'board' | 'list';

export interface TaskCardDrawerProps {
  viewType?: ViewType;
  projectId?: string;
  onTaskModified?: () => void;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: number;
  createdBy: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface User {
  id: string;
  name: string;
  image?: string;
}

export interface Tag {
  value: string;
  label: string;
  color: string;
}

export interface Subtask {
  id: string;
  name: string;
  completed: boolean;
  order: number;
}

export interface Member {
  id: string;
  value: string;
  name: string;
  label: string;
  avatar: string;
  position: string;
  color: string;
}

export interface PriorityConfig {
  color: "red" | "orange" | "blue" | "gray";
  icon: any;
  label: string;
  bgColor: string;
  textColor: string;
}

// Props interfaces for components
export interface TaskHeaderProps {
  currentColumn: KanbanColumn;
  onClose: () => void;
}

export interface TaskActionButtonsProps {
  currentTask: TaskDataSchema;
  currentColumn: KanbanColumn;
  columns: KanbanColumn[];
  onCompleteTask: () => void;
  onStatusChange: (columnId: string) => void;
  onPriorityChange: (priority: string) => void;
  onDeleteTask: () => void;
  onDuplicateTask: () => void;
}

export interface TaskTitleSectionProps {
  currentTask: TaskDataSchema;
  isEditing: boolean;
  editValue: string;
  onEditChange: (value: string) => void;
  onStartEdit: () => void;
  onStopEdit: () => void;
  onSave: () => void;
}

export interface TaskDescriptionSectionProps {
  currentTask: TaskDataSchema;
  isEditing: boolean;
  editValue: string;
  onEditChange: (value: string) => void;
  onStartEdit: () => void;
  onStopEdit: () => void;
  onSave: () => void;
}

export interface TaskDatesSectionProps {
  currentTask: TaskDataSchema;
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

export interface TaskTagsSectionProps {
  currentTask: TaskDataSchema;
  isAddingTag: boolean;
  newTagName: string;
  newTagColor: string;
  onAddingTagChange: (adding: boolean) => void;
  onNewTagNameChange: (name: string) => void;
  onNewTagColorChange: (color: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tagValue: string) => void;
}

export interface TaskAssigneesSectionProps {
  currentTask: TaskDataSchema;
  isMemberPickerOpen: boolean;
  onMemberPickerOpenChange: (open: boolean) => void;
  onUpdateTask: (updates: Partial<TaskDataSchema>) => void;
}

export interface TaskSubtasksSectionProps {
  currentTask: TaskDataSchema;
  isAddingSubtask: boolean;
  newSubtaskName: string;
  onAddingSubtaskChange: (adding: boolean) => void;
  onNewSubtaskNameChange: (name: string) => void;
  onAddSubtask: () => void;
  onUpdateSubtask: (subtaskId: string, completed: boolean) => void;
  onDeleteSubtask: (subtaskId: string) => void;
  onReorderSubtasks: (newOrder: Subtask[]) => void;
}

export interface TaskCommentsSectionProps {
  currentTask: TaskDataSchema;
  newComment: string;
  onNewCommentChange: (comment: string) => void;
  onAddComment: () => void;
}

export interface SubtaskItemProps {
  subtask: Subtask;
  onUpdate: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}