// components/board/index.tsx - Fixed horizontal scrolling

import { useRef, useEffect, useState, useCallback } from "react";
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  Box,
  Button,
  Flex,
  Text,
  IconButton,
  DropdownMenu,
  ScrollArea,
  Tooltip,
} from "@base";
import { Loader2, Settings, MoreVertical, RefreshCw } from "lucide-react";
import {
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  KanbanColumn,
} from "../types";
import { useAIFeaturesStore } from "@incmix/store";
import { useKanban } from "../hooks/use-kanban-data";
import { BoardColumn } from "./board-column";
import { TaskCardDrawer } from "../shared/task-card-drawer";
import { CreateColumnForm } from "../shared/create-column-form";
import { DndKanbanBoard } from "../dnd-example/KanbanBoard";

interface BoardProps {
  projectId?: string;
  onTaskOpen?: (taskId: string) => void;
}

export function Board({
  projectId = "default-project",
  onTaskOpen,
}: BoardProps) {
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  // const [columns, setColumns] = useState<Column[]>(columnsData);
  // const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  // const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // const [tasks, setTasks] = useState<Task[]>(initialTasks);
  // const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  // const [activeTask, setActiveTask] = useState<Task | null>(null);

  // ... (all your existing hooks and logic remain the same)
  const [optimisticColumns, setOptimisticColumns] = useState<KanbanColumn[]>(
    [],
  );
  const { useAI } = useAIFeaturesStore();
  const {
    columns,
    priorityLabels,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    updateStatusLabel,
    deleteStatusLabel,
    refetch,
    clearError,
    projectStats,
  } = useKanban(projectId);

  useEffect(() => {
    if (!isDragging) {
      setOptimisticColumns(columns);
    }
  }, [columns, isDragging]);

  const displayColumns = isDragging ? optimisticColumns : columns;

  useEffect(() => {
    const element = scrollableRef.current;
    if (!element || isLoading || columns.length === 0) {
      return;
    }
    // ... (your entire drag and drop useEffect remains the same)
    return combine(
      monitorForElements({
        canMonitor: isDraggingACard,
        onDragStart() {
          setIsDragging(true);
          setOptimisticColumns([...columns]);
        },
        onDrop({ source, location }) {
          const dragging = source.data;
          if (!isCardData(dragging)) {
            setIsDragging(false);
            return;
          }

          const destination = location.current.dropTargets[0];
          if (!destination) {
            setIsDragging(false);
            return;
          }

          const dropTargetData = destination.data;
          const sourceColumn = optimisticColumns.find(
            (col) => col.id === dragging.statusId,
          );
          if (!sourceColumn) {
            setIsDragging(false);
            return;
          }

          const taskIndex = sourceColumn.tasks.findIndex(
            (task) => task.id === dragging.card.id,
          );
          if (taskIndex === -1) {
            setIsDragging(false);
            return;
          }

          let targetColumnId: string;
          let targetIndex: number;
          let newOptimisticColumns = [...optimisticColumns];

          if (isCardDropTargetData(dropTargetData)) {
            const destColumn = optimisticColumns.find(
              (col) => col.id === dropTargetData.statusId,
            );
            if (!destColumn) {
              setIsDragging(false);
              return;
            }

            targetColumnId = destColumn.id;

            if (sourceColumn.id === destColumn.id) {
              const targetTaskIndex = destColumn.tasks.findIndex(
                (task) => task.id === dropTargetData.card.id,
              );
              if (targetTaskIndex === -1 || targetTaskIndex === taskIndex) {
                setIsDragging(false);
                return;
              }

              const closestEdge = extractClosestEdge(dropTargetData);
              if (!closestEdge) {
                setIsDragging(false);
                return;
              }

              const reordered = reorderWithEdge({
                axis: "vertical",
                list: sourceColumn.tasks,
                startIndex: taskIndex,
                indexOfTarget: targetTaskIndex,
                closestEdgeOfTarget: closestEdge,
              });

              newOptimisticColumns = newOptimisticColumns.map((col) =>
                col.id === sourceColumn.id ? { ...col, tasks: reordered } : col,
              );
              setOptimisticColumns(newOptimisticColumns);

              const newIndex = reordered.findIndex(
                (t) => t.id === dragging.card.id,
              );

              if (dragging.card.id) {
                moveTask(dragging.card.id, destColumn.id, newIndex).finally(
                  () => {
                    setIsDragging(false);
                  },
                );
              } else {
                console.error("Cannot move task: id is undefined");
                setIsDragging(false);
              }
              return;
            } else {
              const targetTaskIndex = destColumn.tasks.findIndex(
                (task) => task.id === dropTargetData.card.id,
              );
              const closestEdge = extractClosestEdge(dropTargetData);
              targetIndex =
                closestEdge === "bottom"
                  ? targetTaskIndex + 1
                  : targetTaskIndex;
            }
          } else if (isColumnData(dropTargetData)) {
            const destColumn = optimisticColumns.find(
              (col) => col.id === dropTargetData.column.id,
            );
            if (!destColumn) {
              setIsDragging(false);
              return;
            }
            targetColumnId = destColumn.id;
            targetIndex = destColumn.tasks.length;
          } else {
            setIsDragging(false);
            return;
          }

          if (targetColumnId !== sourceColumn.id) {
            const taskToMove = sourceColumn.tasks[taskIndex];
            newOptimisticColumns = newOptimisticColumns.map((col) => {
              if (col.id === sourceColumn.id) {
                return {
                  ...col,
                  tasks: col.tasks.filter((_, i) => i !== taskIndex),
                };
              } else if (col.id === targetColumnId) {
                const newTasks = [...col.tasks];
                newTasks.splice(targetIndex, 0, {
                  ...taskToMove,
                  statusId: targetColumnId,
                });
                return {
                  ...col,
                  tasks: newTasks,
                };
              }
              return col;
            });
            setOptimisticColumns(newOptimisticColumns);

            if (dragging.card.id) {
              moveTask(dragging.card.id, targetColumnId, targetIndex).finally(
                () => {
                  setIsDragging(false);
                },
              );
            } else {
              console.error("Cannot move task: id is undefined");
              setIsDragging(false);
            }
          } else {
            setIsDragging(false);
          }
        },
      }),
      autoScrollForElements({
        canScroll: ({ source }) => isDraggingACard({ source }),
        element,
      }),
    );
  }, [optimisticColumns, moveTask, isDragging]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Flex align="center" gap="2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <Text>Loading board...</Text>
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Flex direction="column" align="center" gap="4">
          <Text className="text-red-500">Error: {error}</Text>
          <Button onClick={clearError} variant="outline">
            <RefreshCw size={16} />
            Retry
          </Button>
        </Flex>
      </Box>
    );
  }

  console.log("displayColumns", displayColumns);

  return (
    // FIX: The Board is now a flex column that fills the height of its container.
    <Box className="w-full h-full flex flex-col">
      {/* HEADER: This part is fixed and will not shrink. */}
      <Box className="flex-shrink-0 border-b border-gray-3">
        <Flex direction="column" gap="4" className="p-4 px-6">
          <Flex justify="between" align="center">
            <Flex gap="6" className="text-sm text-gray-11">
              <Text>
                {projectStats.totalStatusLabels} column
                {projectStats.totalStatusLabels !== 1 ? "s" : ""}
              </Text>
              <Text>
                {projectStats.totalTasks} task
                {projectStats.totalTasks !== 1 ? "s" : ""}
              </Text>
              <Text>{projectStats.completedTasks} completed</Text>
              {projectStats.overdueTasks > 0 && (
                <Text className="text-red-600">
                  {projectStats.overdueTasks} overdue
                </Text>
              )}
              {projectStats.urgentTasks > 0 && (
                <Text className="text-orange-600">
                  {projectStats.urgentTasks} urgent
                </Text>
              )}
            </Flex>
            <Flex align="center" gap="2">
              <Tooltip content="Refresh">
                <IconButton variant="ghost" onClick={handleRefresh}>
                  <RefreshCw size={16} />
                </IconButton>
              </Tooltip>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost">
                    <MoreVertical size={16} />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={handleRefresh}>
                    <RefreshCw size={14} /> Refresh Board
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Settings size={14} /> Board Settings
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Box className="flex-1 overflow-hidden">
        <ScrollArea
          scrollbars="horizontal"
          type="hover"
          className="w-full h-full"
          ref={scrollableRef}
        >
          <div
            className="p-4 flex gap-6 h-full"
            style={{ width: "max-content" }}
          >
            {/* {displayColumns.map((column) => (
              <div key={column.id} className="w-80 flex-shrink-0 h-full">
                <BoardColumn
                  column={column}
                  priorityLabels={priorityLabels}
                  onCreateTask={createTask}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                  onUpdateColumn={updateStatusLabel}
                  onDeleteColumn={deleteStatusLabel}
                  isDragging={isDragging}
                  onTaskOpen={onTaskOpen}
                />
              </div>
            ))} */}
            <DndKanbanBoard
              columnsData={displayColumns}
              priorityLabels={priorityLabels}
              onCreateTask={createTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onUpdateColumn={updateStatusLabel}
              onDeleteColumn={deleteStatusLabel}
              isDragging={isDragging}
              onTaskOpen={onTaskOpen}
            />
            <div className="w-80 flex-shrink-0 h-full">
              <Box className="h-full rounded-lg border bg-gray-3 border-gray-6">
                <Flex
                  align="center"
                  justify="center"
                  className="h-full p-4"
                  direction="column"
                  gap="4"
                >
                  <CreateColumnForm
                    projectId={projectId}
                    onSuccess={handleRefresh}
                  />
                  <Text size="2" className="text-gray-10 text-center max-w-48">
                    Create a new status column to organize your workflow
                  </Text>
                </Flex>
              </Box>
            </div>
          </div>
        </ScrollArea>
      </Box>

      <TaskCardDrawer viewType="board" projectId={projectId} />
    </Box>
  );
}
