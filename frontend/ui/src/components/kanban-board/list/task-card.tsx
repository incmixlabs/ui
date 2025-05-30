import type React from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { type MutableRefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import invariant from "tiny-invariant";

import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { isSafari } from "@utils/browser";
import { isShallowEqual } from "@utils/objects";
import { CalendarDays, EllipsisVertical } from "lucide-react";
import {
  type TCard,
  getCardData,
  getCardDropTargetData,
  isCardData,
  isDraggingACard,
} from "../types";
import { Card } from "@card/card";
import { useKanbanDrawer } from "@hooks/use-kanban-drawer";
import { cn } from "@utils";
import { useTaskStore } from "@incmix/store";

// Import UI components properly
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Text,
  IconButton,
  DropdownMenu,
  toast,
} from "@incmix/ui";

type TCardState =
  | {
      type: "idle";
    }
  | {
      type: "is-dragging";
    }
  | {
      type: "is-dragging-and-left-self";
    }
  | {
      type: "is-over";
      dragging: DOMRect;
      closestEdge: Edge;
    }
  | {
      type: "preview";
      container: HTMLElement;
      dragging: DOMRect;
    };

const idle: TCardState = { type: "idle" };

const innerStyles: { [Key in TCardState["type"]]?: string } = {
  idle: "hover:outline outline-2 outline-gray-2 ",
  "is-dragging": "opacity-20 cursor-grabbing",
};

const outerStyles: { [Key in TCardState["type"]]?: string } = {
  "is-dragging": "opacity-50",
  "is-dragging-and-left-self": "hidden",
};

export function ListTaskCardShadow({ dragging }: { dragging: DOMRect }) {
  return (
    <div
      className="flex-shrink-0 rounded bg-gray-5"
      style={{ height: dragging.height }}
    />
  );
}

export function ListTaskCardDisplay({
  card,
  state,
  outerRef,
  innerRef,
}: {
  card: TCard;
  state: TCardState;
  outerRef?: React.MutableRefObject<HTMLDivElement | null>;
  innerRef?: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const { handleDrawerOpen } = useKanbanDrawer();
  const { updateTaskByTaskId, deleteTaskByTaskId } = useTaskStore();

  const handleToggleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await updateTaskByTaskId(card.taskId, {
        completed: !card.completed,
      });
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTaskByTaskId(card.taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleEditTask = () => {
    handleDrawerOpen(card.taskId.toString());
  };

  return (
    <Box
      ref={outerRef}
      // onClick={() => handleDrawerOpen(card.id.toString())}
      // onKeyDown={(e) => {
      //   if (e.key === "Enter" || e.key === "Space") {
      //     e.preventDefault();
      //     handleDrawerOpen(card.id.toString());
      //   }
      // }}
      className={`flex flex-shrink-0 flex-col gap-2 px-3 py-1 ${outerStyles[state.type]}`}
    >
      {state.type === "is-over" && state.closestEdge === "top" ? (
        <ListTaskCardShadow dragging={state.dragging} />
      ) : null}
      <Card
        className={cn(
          `relative cursor-pointer space-y-1.5 rounded-lg p-3 ${innerStyles[state.type]}`,
          "flex items-center justify-between ",
          card.completed && "opacity-60",
        )}
        ref={innerRef}
        style={
          state.type === "preview"
            ? {
                width: state.dragging.width,
                height: state.dragging.height,
                backgroundColor: "white",
                opacity: 1,
                border: "2px solid #696969",
                transform: !isSafari() ? "rotate(4deg)" : undefined,
              }
            : undefined
        }
      >
        <Flex align="center" justify="center" gap="2">
          <Checkbox
            size="3"
            checked={card.completed}
            onClick={handleToggleComplete}
            className="h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white"
          />
          <Heading
            as="h6"
            size="3"
            className={cn(
              "py-2 font-medium",
              card.completed && "line-through text-gray-500",
            )}
          >
            {card.name}
          </Heading>
        </Flex>

        <Flex align="center" justify="between" gap="5" className="w-64">
          <Text
            as="span"
            className="flex items-center gap-1 font-medium text-sm"
          >
            <CalendarDays className="text-zinc-400" size={20} />
            <Text as="span">{card?.date}</Text>
          </Text>

          {card.assignedTo && card.assignedTo.length > 0 && (
            <Flex align="center" gap="2" className="-space-x-6">
              {card.assignedTo.map((member, index) => (
                <img
                  key={`${member.id}-${index}`}
                  src={member.image || "/placeholder.svg?height=32&width=32"}
                  alt={member.name}
                  className="h-8 w-8 rounded-full border-4 border-gray-2"
                />
              ))}
            </Flex>
          )}

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="soft" onClick={(e) => e.stopPropagation()}>
                <EllipsisVertical />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={handleEditTask}>
                Edit
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={handleToggleComplete}>
                {card.completed ? "Mark Incomplete" : "Mark Complete"}
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                onClick={handleDeleteTask}
                className="text-red-600"
              >
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Card>

      {state.type === "is-over" && state.closestEdge === "bottom" ? (
        <ListTaskCardShadow dragging={state.dragging} />
      ) : null}
    </Box>
  );
}

export function ListTaskCard({
  card,
  columnId,
}: {
  card: TCard;
  columnId: string;
}) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<TCardState>(idle);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    invariant(outer && inner);

    return combine(
      draggable({
        element: inner,
        getInitialData: ({ element }) =>
          getCardData({
            card,
            columnId,
            rect: element.getBoundingClientRect(),
          }),
        onGenerateDragPreview({ nativeSetDragImage, location, source }) {
          const data = source.data;
          invariant(isCardData(data));
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: inner,
              input: location.current.input,
            }),
            render({ container }) {
              setState({
                type: "preview",
                container,
                dragging: inner.getBoundingClientRect(),
              });
            },
          });
        },
        onDragStart() {
          setState({ type: "is-dragging" });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element: outer,
        getIsSticky: () => true,
        canDrop: isDraggingACard,
        getData: ({ element, input }) => {
          const data = getCardDropTargetData({ card, columnId });
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        onDragEnter({ source, self }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            return;
          }
          const closestEdge = extractClosestEdge(self.data);
          if (!closestEdge) {
            return;
          }

          setState({
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          });
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            return;
          }
          const closestEdge = extractClosestEdge(self.data);
          if (!closestEdge) {
            return;
          }
          const proposed: TCardState = {
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          };
          setState((current) => {
            if (isShallowEqual(proposed, current)) {
              return current;
            }
            return proposed;
          });
        },
        onDragLeave({ source }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            setState({ type: "is-dragging-and-left-self" });
            return;
          }
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      }),
    );
  }, [card, columnId]);

  return (
    <>
      <ListTaskCardDisplay
        outerRef={outerRef}
        innerRef={innerRef}
        state={state}
        card={card}
        key={card.id}
      />
      {state.type === "preview"
        ? createPortal(
            <ListTaskCardDisplay state={state} card={card} />,
            state.container,
          )
        : null}
    </>
  );
}
