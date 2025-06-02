import React from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { type MutableRefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import invariant from "tiny-invariant";
import { Collapsible } from "radix-ui";
import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { isSafari } from "@utils/browser";
import { isShallowEqual } from "@utils/objects";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  EllipsisVertical,
} from "lucide-react";
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
  ExtendedColorType,
  Badge,
  Calendar,
  type CalendarProps,
  Popover,
  ListComboBox,
  Input,
  Avatar,
} from "@incmix/ui";
import { TagEditor } from "./tags-editor";
import { assignData } from "../data";

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
  const { taskId, handleDrawerOpen } = useKanbanDrawer();
  const { updateTaskByTaskId, deleteTaskByTaskId } = useTaskStore();
  const [open, setOpen] = React.useState(false);
  const [assignedEditMode, setAssignedEditMode] = React.useState(false);
  const [tagsEditMode, setTagsEditMode] = React.useState(false);
  const [taskNameEditMode, setTaskNameEditMode] = React.useState(false);
  const [endDate, setEndDate] = React.useState<Date | null>(
    card.endDate ? new Date(card.endDate) : null,
  );
  const [startDate, setStartDate] = React.useState<Date | null>(
    card.startDate ? new Date(card.startDate) : null,
  );

  const [taskName, setTaskName] = React.useState(card?.name || "");
  const [allTags, setAllTags] = React.useState(card?.labelsTags || []);
  const [assignedData, setAssignedData] = React.useState(
    card?.assignedTo?.length > 0 ? card?.assignedTo : assignData,
  );

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
  console.log("list card", card);

  const handleEndDateChange = async (date: Date) => {
    console.log("end date", date);
    setEndDate(date);
    try {
      await updateTaskByTaskId(card.taskId, {
        endDate: date.toISOString(),
      });
    } catch (error) {
      console.error("Failed to update end date:", error);
      toast.error("Failed to update end date. Please try again.");
      setEndDate(card.endDate ? new Date(card.endDate) : null);
    }
   };
  const handleStartDateChange = async (date: Date) => {
    console.log("start date", date);
    setStartDate(date);
    try {
      await updateTaskByTaskId(card.taskId, {
        startDate: date.toISOString(),
    });
  } catch (error) {
    console.error("Failed to update start date:", error);
    toast.error("Failed to update start date. Please try again.");
    setStartDate(card.startDate ? new Date(card.startDate) : null);
  }
  };
  const handleTagsChange = (tags: any) => {
    setAllTags(tags);
    updateTaskByTaskId(card.taskId, {
      labelsTags: tags,
    });
  };

  const handleAssignedChange = (assigned: any) => {
    setAssignedData(assigned);
    updateTaskByTaskId(card.taskId, {
      assignedTo: assigned,
    });
  };
  const handleTaskNameChange = (name: string) => {
    setTaskName(name);
    updateTaskByTaskId(card.taskId, {
      name: name,
    });
  };

  // console.log("assignedData", assignedData, card?.assignedTo);

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
          `relative space-y-1.5 rounded-lg p-3 ${innerStyles[state.type]}`,
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
        <Collapsible.Root className="w-full" open={open} onOpenChange={setOpen}>
          <Flex
            align="center"
            justify="between"
            className={open ? "border-b border-gray-4 pb-1.5" : ""}
          >
            <Flex align="center" justify="center" gap="2">
              {card?.subTasks && (
                <Collapsible.Trigger asChild>
                  {card?.subTasks?.length > 0 ? (
                    <button className="inline-flex size-[25px] items-center justify-center rounded-full text-gray-10">
                      {open ? <ChevronDown /> : <ChevronRight />}
                    </button>
                  ) : null}
                </Collapsible.Trigger>
              )}

              <Checkbox
                size="3"
                checked={card.completed}
                onClick={handleToggleComplete}
                className="h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white"
              />
              {taskNameEditMode ? (
                <Input
                  autoFocus
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  onBlur={() => {
                    setTaskNameEditMode(false);
                    handleTaskNameChange(taskName);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setTaskNameEditMode(false);
                      handleTaskNameChange(taskName);
                    }
                  }}
                  className="py-2 font-medium h-auto px-2"
                />
              ) : (
                <Heading
                  as="h6"
                  size="3"
                  className={cn(
                    "py-2  mr-auto font-medium cursor-pointer ",
                    card.completed && "line-through text-gray-500",
                  )}
                  onDoubleClick={() => setTaskNameEditMode(true)}
                >
                  {taskName}
                </Heading>
              )}
            </Flex>
            <Flex align="center" justify="between" gap="5" className="w-fit">
              {!Boolean(taskId) && (
                <Box
                  className="-space-x-6 cursor-pointer"
                  onDoubleClick={() => setTagsEditMode(true)}
                >
                  {tagsEditMode ? (
                    <TagEditor
                      tags={allTags}
                      onChange={handleTagsChange}
                      onExit={() => setTagsEditMode(false)}
                    />
                  ) : (
                    allTags?.map((tag, index) => (
                      <Badge
                        key={index}
                        color={tag.color as ExtendedColorType}
                        variant="solid"
                        className="px-3 py-1.5 border-2 border-gray-2"
                      >
                        {tag.label}
                      </Badge>
                    ))
                  )}
                </Box>
              )}
              <Box className="flex flex-col gap-1 font-medium text-sm">
                <Text as="span" size="1">
                  Start Date:
                </Text>
                <Flex align="center" gap="1">
                  <CalendarDays size={16} />
                  <Popover.Root>
                    <Popover.Trigger>
                      <Text as="span" size="1" color="green">
                        {startDate?.toLocaleDateString()}
                      </Text>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={handleStartDateChange}
                        className={cn("p-0 flex justify-end")}
                        initialFocus
                      />
                    </Popover.Content>
                  </Popover.Root>
                </Flex>
              </Box>
              <Box className="flex flex-col gap-1 font-medium text-sm">
                <Text as="span" size="1">
                  End Date:
                </Text>
                <Flex align="center" gap="1">
                  <CalendarDays size={16} />
                  <Popover.Root>
                    <Popover.Trigger>
                      <Text as="span" size="1" color="red">
                        {endDate?.toLocaleDateString()}
                      </Text>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={handleEndDateChange}
                        className={cn("p-0 flex justify-end")}
                        initialFocus
                      />
                    </Popover.Content>
                  </Popover.Root>
                </Flex>
              </Box>

              {card?.assignedTo?.length > 0 ? (
                <Flex align="center" gap="2" className="-space-x-6 shrink-0">
                  {card?.assignedTo?.map(
                    (member, index) =>
                      member?.checked && (
                        <Avatar
                          key={`${member.value}-${index}`}
                          src={member.avatar}
                          className="h-9 w-9 rounded-full border-4 border-gray-2"
                        />
                      ),
                  )}
                  <ListComboBox
                    options={assignedData}
                    defaultValue={assignedData}
                    onValueChange={handleAssignedChange}
                    placeholder="Search Member"
                    title="Member"
                    btnClassName="z-2 relative bg-gray-4"
                    isLabelFormOpen={assignedEditMode}
                    setIsLabelFormOpen={setAssignedEditMode}
                  />
                </Flex>
              ) : (
                <ListComboBox
                  options={assignedData}
                  defaultValue={assignedData}
                  onValueChange={handleAssignedChange}
                  placeholder="Search Member"
                  title="Member"
                  btnClassName="z-2 relative bg-gray-4"
                  isLabelFormOpen={assignedEditMode}
                  setIsLabelFormOpen={setAssignedEditMode}
                />
              )}

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton
                    variant="soft"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EllipsisVertical />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={handleEditTask}>
                    Edit
                  </DropdownMenu.Item>
                  {/* <DropdownMenu.Item onClick={handleToggleComplete}>
                    {card.completed ? "Mark Incomplete" : "Mark Complete"}
                  </DropdownMenu.Item> */}
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
          </Flex>
          <Collapsible.Content>
            <Box className="space-y-2 pl-16 py-2">
              {card?.subTasks?.map((subTask) => (
                <Flex align="center" gap="2" key={subTask.name}>
                  <Checkbox
                    size="3"
                    checked={subTask.completed}
                    // onClick={() => handleToggleSubTaskComplete(subTask.id)}
                    className="h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white"
                  />
                  {subTask.name}
                </Flex>
              ))}
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
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
