import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button,Badge, Card, Icon } from "@incmix/ui";
import { cva } from "class-variance-authority";
import { KanbanColumn, KanbanTask } from "../types";


interface TaskCardProps {
  task: KanbanTask;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: KanbanTask;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {

  // console.log("task", task);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task?.id as UniqueIdentifier,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 bg-gray-12 text-gray-1",
      },
    },
  });

  return (
    <Card.Root
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <Card.Header className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
        >
          <span className="sr-only">Move task</span>
          <Icon name="GripVertical" />
        </Button>
        <Badge variant={"outline"} className="ml-auto font-semibold">
          Task
        </Badge>
      </Card.Header>
      <Card.Content className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        {task.name}
      </Card.Content>
    </Card.Root>
  );
}
