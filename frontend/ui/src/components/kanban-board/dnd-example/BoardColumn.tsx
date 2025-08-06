import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { TaskCard } from "./TaskCard";
import { cva } from "class-variance-authority";
import { Card, Button, ScrollArea, Icon } from "@incmix/ui";
import type { KanbanColumn } from "../types";
import { TaskDataSchema } from "@incmix/utils/schema";

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: KanbanColumn;
}

interface BoardColumnProps {
  column: KanbanColumn;
  priorityLabels?: any[];
  isOverlay?: boolean;
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
  onTaskOpen?: (taskId: string) => void;
}

export function DndBoardColumn({
  column,
  priorityLabels,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onUpdateColumn,
  onDeleteColumn,
  onTaskOpen,
  isOverlay,
}: BoardColumnProps) {
  const sortedTasks = useMemo(() => {
    return [...column.tasks].sort((a, b) => (a.taskOrder || 0) - (b.taskOrder || 0));
  }, [column.tasks]);

  const tasksIds = useMemo(() => {
    return sortedTasks.map((task) => task.id);
  }, [sortedTasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.name}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "h-[500px] max-h-[500px] w-[350px] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    },
  );

  return (
    <Card.Root
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <Card.Header className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
        >
          <span className="sr-only">{`Move column: ${column.name}`}</span>
          <Icon name="GripVertical" />
        </Button>
        <span className="ml-auto">{column.name}</span>
      </Card.Header>

      <ScrollArea>
        <Card.Content className="flex flex-grow flex-col gap-2 p-2">
          <SortableContext items={tasksIds}>
            {sortedTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onTaskOpen={onTaskOpen}
              />
            ))}
          </SortableContext>
        </Card.Content>
      </ScrollArea>
    </Card.Root>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex gap-4 items-center flex-row justify-center">
        {children}
      </div>
    </ScrollArea>
  );
}
