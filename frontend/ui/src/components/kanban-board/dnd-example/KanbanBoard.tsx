import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { DndBoardColumn, BoardContainer } from "./BoardColumn";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
  closestCorners,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import type { KanbanColumn, KanbanTask } from "../types";
import { hasDraggableData } from "./utils";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";
import { TaskDataSchema } from "@incmix/utils/schema";

interface BoardColumnProps {
  columnsData: KanbanColumn[];
  priorityLabels?: any[];
  onCreateTask: (
    columnId: string,
    taskData: Partial<TaskDataSchema>,
  ) => Promise<void>;
  onUpdateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>,
  ) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
  onUpdateColumn: (
    columnId: string,
    updates: { name?: string; color?: string; description?: string },
  ) => Promise<void>;
  onDeleteColumn: (columnId: string) => Promise<void>;
  isDragging?: boolean;
  onTaskOpen?: (taskId: string) => void;
}

export function DndKanbanBoard({
  columnsData,
  priorityLabels,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onUpdateColumn,
  onDeleteColumn,
  isDragging = false,
  onTaskOpen,
}: BoardColumnProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>(columnsData);
  const [activeColumn, setActiveColumn] = useState<KanbanColumn | null>(null);
  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null);
  
  const isDraggingRef = useRef(false);

  const dragEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    }),
  );

  // Only update when columnsData changes AND we're not in a drag operation
  useEffect(() => {
    if (!isDraggingRef.current) {
      setColumns(columnsData);
    }
  }, [columnsData]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dragEndTimeoutRef.current) {
        clearTimeout(dragEndTimeoutRef.current);
      }
    };
  }, []);

  const findContainer = useCallback((id: UniqueIdentifier) => {
    if (columnsId.includes(id as string)) {
      return id as string;
    }

    return columns.find((column) =>
      column.tasks.some((task) => task.id === id)
    )?.id;
  }, [columns, columnsId]);

  const onDragStart = useCallback((event: DragStartEvent) => {
    isDraggingRef.current = true;
    
    // Clear any pending timeout
    if (dragEndTimeoutRef.current) {
      clearTimeout(dragEndTimeoutRef.current);
      dragEndTimeoutRef.current = null;
    }

    if (!hasDraggableData(event.active)) return;

    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }, []);

  const onDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    if (!hasDraggableData(active)) return;
    const activeData = active.data.current;
    if (activeData?.type !== "Task") return;

    // Only move between different columns during drag over
    setColumns((prevColumns) => {
      const activeColumnIndex = prevColumns.findIndex(
        (col) => col.id === activeContainer
      );
      const overColumnIndex = prevColumns.findIndex(
        (col) => col.id === overContainer
      );

      if (activeColumnIndex === -1 || overColumnIndex === -1) return prevColumns;

      const activeColumn = prevColumns[activeColumnIndex];
      const overColumn = prevColumns[overColumnIndex];

      const activeTaskIndex = activeColumn.tasks.findIndex(
        (task) => task.id === activeId
      );

      if (activeTaskIndex === -1) return prevColumns;

      const activeTask = activeColumn.tasks[activeTaskIndex];

      // Remove task from active column
      const updatedActiveColumn = {
        ...activeColumn,
        tasks: activeColumn.tasks.filter((task) => task.id !== activeId),
      };

      // Add task to over column
      const updatedOverColumn = {
        ...overColumn,
        tasks: [...overColumn.tasks, { ...activeTask, statusId: overContainer }],
      };

      const newColumns = [...prevColumns];
      newColumns[activeColumnIndex] = updatedActiveColumn;
      newColumns[overColumnIndex] = updatedOverColumn;

      return newColumns;
    });
  }, [findContainer]);

  const onDragEnd = useCallback(async (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) {
      // Reset drag state even if no valid drop
      isDraggingRef.current = false;
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) {
      isDraggingRef.current = false;
      return;
    }

    const activeData = active.data.current;

    // Handle Column dragging
    if (activeData?.type === "Column") {
      if (activeId !== overId) {
        const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
        const overColumnIndex = columns.findIndex((col) => col.id === overId);

        if (activeColumnIndex !== overColumnIndex) {
          setColumns((columns) => arrayMove(columns, activeColumnIndex, overColumnIndex));
        }
      }
      
      // Allow state updates after a short delay
      dragEndTimeoutRef.current = setTimeout(() => {
        isDraggingRef.current = false;
      }, 100);
      return;
    }

    // Handle Task dragging
    if (activeData?.type === "Task") {
      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      if (!activeContainer || !overContainer) {
        isDraggingRef.current = false;
        return;
      }

      const activeTask = activeData.task;

      if (activeContainer === overContainer) {
        // Reordering within the same column
        const column = columns.find(col => col.id === activeContainer);
        if (!column) {
          isDraggingRef.current = false;
          return;
        }

        const activeIndex = column.tasks.findIndex(task => task.id === activeId);
        const overIndex = column.tasks.findIndex(task => task.id === overId);

        if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
          const reorderedTasks = arrayMove(column.tasks, activeIndex, overIndex);
          
          setColumns(prevColumns => 
            prevColumns.map(col => 
              col.id === activeContainer 
                ? { ...col, tasks: reorderedTasks.map((task, index) => ({ ...task, taskOrder: index })) }
                : col
            )
          );

          try {
            for (let i = 0; i < reorderedTasks.length; i++) {
              await onUpdateTask(reorderedTasks[i].id, { taskOrder: i });
            }
          } catch (error) {
            // Revert the optimistic update
            setColumns(columnsData);
          }
        }
      } else {
        // Moving between columns - the state is already updated in onDragOver
        // Just persist the change
        try {
          const targetColumn = columns.find(col => col.id === overContainer);
          const newTaskOrder = targetColumn ? targetColumn.tasks.length - 1 : 0;
          
          await onUpdateTask(activeTask.id, {
            statusId: overContainer,
            taskOrder: newTaskOrder,
          });
        } catch (error) {
          console.error("Failed to update task:", error);
          // Don't revert here as it might cause jumping
        }
      }

      // Allow state updates after a longer delay for task operations
      // This gives time for the backend to update and parent to re-render
      dragEndTimeoutRef.current = setTimeout(() => {
        isDraggingRef.current = false;
      }, 500);
    }
  }, [columns, findContainer, onUpdateTask]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <DndBoardColumn
              key={col.id}
              column={col}
              priorityLabels={priorityLabels}
              onCreateTask={onCreateTask}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              onUpdateColumn={onUpdateColumn}
              onDeleteColumn={onDeleteColumn}
              onTaskOpen={onTaskOpen}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <DndBoardColumn
                isOverlay
                column={activeColumn}
                priorityLabels={priorityLabels}
                onCreateTask={onCreateTask}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                onUpdateColumn={onUpdateColumn}
                onDeleteColumn={onDeleteColumn}
                onTaskOpen={onTaskOpen}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}
