"use client";

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
import { CalendarDays, MessageSquareText, Paperclip } from "lucide-react";
import { IconButton } from "../button";
import { isSafari } from "./is-safari";
import { isShallowEqual } from "./is-shallow-equal";
import {
  type TCard,
  getCardData,
  getCardDropTargetData,
  isCardData,
  isDraggingACard,
} from "./types";

import TaskCardDrawer from "./task-card-drawer";
import { Card, Checkbox, Flex, Heading, Text } from "@radix-ui/themes";
import { cn } from "@utils";

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
  // We no longer render the draggable item after we have left it
  // as it's space will be taken up by a shadow on adjacent items.
  // Using `display:none` rather than returning `null` so we can always
  // return refs from this component.
  "is-dragging": "opacity-50",
  // Keeping the refs allows us to continue to receive events during the drag.
  "is-dragging-and-left-self": "hidden",
};

export function TaskCardShadow({ dragging }: { dragging: DOMRect }) {
  return (
    <div
      className="flex-shrink-0 rounded bg-gray-5"
      style={{ height: dragging.height }}
    />
  );
}

export function TaskCardDisplay({
  card,
  state,
  open,
  setOpen,
  outerRef,
  innerRef,
  kanbanFilter,
}: {
  card: TCard;
  state: TCardState;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  outerRef?: React.MutableRefObject<HTMLDivElement | null>;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
  kanbanFilter?: boolean;
}) {
  return (
    <div
      ref={outerRef}
      onClick={async () => {
        setOpen?.(false);
        await Promise.resolve(); // Ensures the state update is processed
        setOpen?.(true);
      }}
      onKeyDown={async (e) => {
        if (e.key === "Enter") {
          setOpen?.(false);
          await Promise.resolve();
          setOpen?.(true);
        }
      }}
      className={`flex flex-shrink-0 flex-col  gap-2 px-3 py-1  ${outerStyles[state.type]}`}
    >
      {/* Put a shadow before the item if closer to the top edge */}
      {state.type === "is-over" && state.closestEdge === "top" ? (
        <TaskCardShadow dragging={state.dragging} />
      ) : null}
      <Card
        className={cn(
          `relative space-y-1.5 cursor-pointer rounded-lg   p-3 ${innerStyles[state.type]}`,
          kanbanFilter ? `flex items-center justify-between ` : "",
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
        {kanbanFilter ? (
          <>
            <Flex align={"center"} justify={"center"} gap="2">
              <Checkbox
                size={"3"}
                className="w-5 h-5 text-secondary border-black border group-hover:bg-white bg-gray-12 rounded-md "
              />
              <Heading as="h6" size={"3"} className="font-medium py-2">
                {card.name}
              </Heading>
            </Flex>
            <Flex align={"center"} justify={"between"} gap="5" className="w-64">
              <Text
                as="span"
                className=" flex items-center gap-1 font-medium text-sm"
              >
                <CalendarDays className="text-zinc-400" size={20} />
                <Text as="span">{card?.date}</Text>
              </Text>
              {card.members && (
                <Flex align={"center"} gap={"1"}>
                  {card.members.map((file) => {
                    const colors = [
                      "bg-green-400",
                      "bg-yellow-400",
                      "bg-orange-400",
                      "bg-cyan-400",
                      "bg-red-400",
                    ];
                    const randomColor =
                      colors[Math.floor(Math.random() * colors.length)];
                    return (
                      <span
                        key={file.name}
                        className={`flex h-4 w-4 items-center gap-1 rounded-md ${randomColor}`}
                      />
                    );
                  })}
                </Flex>
              )}
              <Flex align={"center"} gap="2">
                {card.members.map((member) => (
                  <img
                    key={member.id}
                    src={member.src}
                    alt={member.name}
                    className="h-8 w-8 rounded-full"
                  />
                ))}
              </Flex>
            </Flex>
          </>
        ) : (
          <>
            <Text
              as="span"
              className="absolute top-2 right-3 flex items-center gap-1 font-medium text-sm"
            >
              <CalendarDays className="text-zinc-400" size={20} />
              <Text as="span">{card?.date}</Text>
            </Text>
            {card.members && (
              <Flex align={"center"} gap={"1"}>
                {card.members.map((file) => {
                  const colors = [
                    "bg-green-400",
                    "bg-yellow-400",
                    "bg-orange-400",
                    "bg-cyan-400",
                    "bg-red-400",
                  ];
                  const randomColor =
                    colors[Math.floor(Math.random() * colors.length)];
                  return (
                    <span
                      key={file.name}
                      className={`flex h-1 w-6 items-center gap-1 rounded-full ${randomColor}`}
                    />
                  );
                })}
              </Flex>
            )}
            <Heading as="h6" className="font-medium py-2">
              {card.name}
            </Heading>
            {card.description && (
              <Text as="p" className="text-gray-11">
                {card.description}
              </Text>
            )}
            {card.subTasks?.map((subtask, i) => (
              <>
                <div
                  key={`${subtask?.name}-${i}`}
                  className="gap-2 space-y-2 py-2"
                >
                  <Flex
                    align={"center"}
                    justify={"between"}
                    className="w-full gap-1  uppercase  text-gray-11"
                  >
                    <span>{subtask.name}</span>
                    <span>{subtask?.progress}%</span>
                  </Flex>
                  <div
                    className="relative flex h-2 w-full items-center gap-1 rounded-full bg-gray-200 before:absolute before:top-0 before:left-0 before:h-2 before:w-[var(--progress)] before:rounded-full before:bg-green-400"
                    style={
                      {
                        "--progress": `${subtask?.progress}%`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              </>
            ))}
            {card.attachment && (
              <img
                src={card.attachment}
                alt="attachment"
                className="aspect-video rounded-lg object-cover"
              />
            )}
            <Flex
              align={"center"}
              justify={"between"}
              className="gap-2 pt-6 pb-2"
            >
              <Flex align={"center"} gap="2">
                {card.filesData && (
                  <IconButton className="flex items-center gap-1 bg-transparent dark:text-gray-200 text-gray-700">
                    <Paperclip size={20} />
                    <span>{card.filesData.length}</span>
                  </IconButton>
                )}
                <IconButton className="flex items-center gap-1 bg-transparent dark:text-gray-200 text-gray-700">
                  <MessageSquareText size={20} />
                  <span>5</span>
                </IconButton>
              </Flex>
              <Flex align={"center"} className="gap-2">
                {card.members.map((member) => (
                  <img
                    key={member.id}
                    src={member.src}
                    alt={member.name}
                    className="h-8 w-8 rounded-full"
                  />
                ))}
              </Flex>
            </Flex>
          </>
        )}
      </Card>
      {/* Put a shadow after the item if closer to the bottom edge */}
      {state.type === "is-over" && state.closestEdge === "bottom" ? (
        <TaskCardShadow dragging={state.dragging} />
      ) : null}
    </div>
  );
}

export function TaskCard({
  card,
  columnId,
  kanbanFilter,
  setOpen,
  open,
}: {
  card: TCard;
  columnId: string;
  kanbanFilter: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
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
              // Demonstrating using a react portal to generate a preview
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
          // optimization - Don't update react state if we don't need to.
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
      <TaskCardDisplay
        outerRef={outerRef}
        innerRef={innerRef}
        state={state}
        card={card}
        open={open}
        setOpen={setOpen}
        key={card.id}
        kanbanFilter={kanbanFilter}
      />
      {state.type === "preview"
        ? createPortal(
            <TaskCardDisplay state={state} card={card} />,
            state.container,
          )
        : null}
    </>
  );
}
