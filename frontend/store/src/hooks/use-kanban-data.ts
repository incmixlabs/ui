import { useEffect, useMemo } from "react";
import type { KanbanColumn, KanbanTask } from "../view-types/kanban-view.types"; // Corrected path
import { useTaskStore } from "./use-task-store";
import { useTaskStatusStore } from "./use-task-status-store"; // Added import
import type { TaskStatusDocType, TaskDocType } from "../sql"; // For explicit typing

interface UseKanbanDataProps {
  projectId: string;
}

interface UseKanbanDataReturn {
  columns: KanbanColumn[];
  isLoading: boolean;
  error: string | null;

  // Task operations
  createTask: (columnId: string, taskData: Partial<KanbanTask>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<KanbanTask>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  moveTask: (taskId: string, targetColumnId: string, targetIndex?: number) => Promise<void>;

  // Column (Task Status) operations
  createColumn: (name: string, color?: string) => Promise<string>; // Return type changed to string (ID)
  updateColumn: (columnId: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>;
  deleteColumn: (columnId: string) => Promise<void>;
  reorderColumns: (columnIds: string[]) => Promise<void>;
}

export function useKanbanData({ projectId }: UseKanbanDataProps): UseKanbanDataReturn {
  const {
    tasks,
    isLoading: tasksLoading,
    error: tasksError,
    initialize: initializeTasks,
    createTask: createTaskInStore, // Renamed to avoid conflict
    updateTask: updateTaskInStore, // Renamed
    deleteTask: deleteTaskInStore, // Renamed
    moveTask: moveTaskInStore,     // Renamed
    getTasksByColumn,
  } = useTaskStore();

  const {
    taskStatuses, // This is the array of task statuses (columns)
    isLoading: taskStatusesLoading,
    error: taskStatusesError,
    initialize: initializeTaskStatuses,
    createTaskStatus, // Method to create a new task status
    updateTaskStatus, // Method to update a task status
    deleteTaskStatus, // Method to delete a task status
    reorderTaskStatuses, // Method to reorder task statuses
    getTaskStatusesByProject, // Getter for task statuses by project
  } = useTaskStatusStore();

  // Initialize stores when component mounts or projectId changes
  useEffect(() => {
    if (projectId) {
      initializeTaskStatuses(projectId);
      initializeTasks(projectId);
    }
  }, [projectId, initializeTaskStatuses, initializeTasks]);

  // Transform data into kanban format
  const kanbanColumns = useMemo<KanbanColumn[]>(() => {
    if (!projectId) return []; // Guard against undefined projectId
    const projectTaskStatuses = getTaskStatusesByProject(projectId);
    
    return projectTaskStatuses.map((status: TaskStatusDocType) => ({ // Explicitly type 'status'
      ...status, // Spread the TaskStatusDocType properties
      tasks: getTasksByColumn(status.id) as KanbanTask[], // Cast to KanbanTask[]
    }));
  }, [projectId, taskStatuses, tasks, getTaskStatusesByProject, getTasksByColumn]);

  // Task operations
  const createTask = async (columnId: string, taskData: Partial<KanbanTask>) => {
    await createTaskInStore(projectId, {
      name: taskData.name || "New Task",
      columnId, // This is the taskStatusId (columnId in the task schema)
      description: taskData.description || "",
      startDate: taskData.startDate || new Date().toISOString(),
      endDate: taskData.endDate || "", 
      priority: taskData.priority || "medium",
      labelsTags: taskData.labelsTags || [],
      attachments: taskData.attachments || [],
      assignedTo: (taskData.assignedTo || []).map(user => ({
        ...user,
        id: user.id, // ensure id is present
        name: user.name, // ensure name is present
        avatar: user.avatar || "/placeholder-avatar.png", // Provide a default avatar if undefined
      })),
      subTasks: taskData.subTasks || [],
      completed: taskData.completed === undefined ? false : taskData.completed,
      comments: taskData.comments === undefined ? 0 : taskData.comments,
    });
  };

  const updateTask = async (taskId: string, updates: Partial<KanbanTask>) => {
    const {
      // Audit fields from KanbanTask (which extends TaskDocType)
      createdBy: _createdBy,
      updatedBy: _updatedBy,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      // Other fields that are not part of the direct update payload for TaskDataSchema
      // or are handled by the store itself.
      id: _id, // ID is the identifier, not part of the update payload object
      projectId: _projectId, // projectId is usually not changed via this type of update
      // Note: 'tasks' property was incorrectly destructured here; KanbanTask does not have it.
      ...relevantUpdates // These are the fields potentially relevant for the store update
    } = updates;

    // Prepare the payload for the store, starting with relevant updates.
    // The type assertion helps TypeScript understand our intent, but the structure must match.
    const payloadForStore: Partial<any> = { ...relevantUpdates };

    // If 'assignedTo' is part of the updates, transform it to meet store requirements.
    if (relevantUpdates.assignedTo) {
      payloadForStore.assignedTo = relevantUpdates.assignedTo.map(user => ({
        ...user, // Spread existing user properties from KanbanTask's user type
        id: user.id, // Ensure id is present
        name: user.name, // Ensure name is present
        avatar: user.avatar || "/placeholder-avatar.png", // Provide a default if undefined
      }));
    }

    // Other fields in relevantUpdates are assumed to be compatible or will be caught by TS if not.
    // The type assertion uses an intersection. It primarily uses TaskDocType (omitting audit fields)
    // but overrides 'assignedTo' to specify that 'avatar' is now a string, matching the store's likely expectation.
    // This acknowledges our runtime transformation of 'payloadForStore.assignedTo'.
    // The 'readonly' aspect of the array in TaskDataSchema is harder to assert here, but the object structure is key.
    await updateTaskInStore(taskId, payloadForStore as 
      (Partial<Omit<TaskDocType, "id" | "projectId" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "assignedTo">> & 
        { assignedTo?: { id: string; name: string; avatar: string; }[] } // Explicitly type assignedTo with avatar: string
      )
    );
  };

  const deleteTask = async (taskId: string) => {
    await deleteTaskInStore(taskId);
  };

  const moveTask = async (
    taskId: string,
    targetColumnId: string,
    targetIndex?: number
  ) => {
    await moveTaskInStore(taskId, targetColumnId, targetIndex);
  };

  // Column (Task Status) operations
  const createColumn = async (name: string, color?: string): Promise<string> => {
    return await createTaskStatus(projectId, {
      name,
      color: color || "#6366f1", 
      description: "", 
    });
  };

  const updateColumn = async (
    columnId: string, // This is taskStatusId
    updates: { name?: string; color?: string; description?: string }
  ) => {
    await updateTaskStatus(columnId, updates);
  };

  const deleteColumn = async (columnId: string) => { // This is taskStatusId
    await deleteTaskStatus(columnId);
  };

  const reorderColumns = async (columnIds: string[]) => { // These are taskStatusIds
    await reorderTaskStatuses(columnIds);
  };

  return {
    columns: kanbanColumns,
    isLoading: tasksLoading || taskStatusesLoading,
    error: tasksError || taskStatusesError,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    createColumn,
    updateColumn,
    deleteColumn,
    reorderColumns,
  };
}