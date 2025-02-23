"use client";

import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Copy, Ellipsis, Plus } from "lucide-react";
import { memo, useContext, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import type { DragLocationHistory } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";

import { IconButton } from "../button";
import { blockBoardPanningAttr } from "./data-attributes";
import { isSafari } from "./is-safari";
import { isShallowEqual } from "./is-shallow-equal";
import { TaskCard, TaskCardShadow } from "./task-card";
import {
  type TCardData,
  type TColumn,
  getColumnData,
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
} from "./types";
import { Box, Flex } from "@radix-ui/themes";
import TaskCardDrawer from "./task-card-drawer";

type TColumnState =
  | {
      type: "is-card-over";
      isOverChildCard: boolean;
      dragging: DOMRect;
    }
  | {
      type: "is-column-over";
    }
  | {
      type: "idle";
    }
  | {
      type: "is-dragging";
    };

const stateStyles: { [Key in TColumnState["type"]]: string } = {
  idle: "",
  "is-card-over": "outline outline-2 outline-gray-6",
  "is-dragging": "opacity-40 outline outline-2 outline-gray-6",
  "is-column-over": "bg-slate-900",
};

const idle = { type: "idle" } satisfies TColumnState;

const CardList = memo(function CardList({
  column,
  kanbanFilter,
  setOpen,
  open,
}: {
  column: TColumn;
  kanbanFilter: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) {
  return column.cards.map((card) => (
    <TaskCard
      key={card.id}
      card={card}
      setOpen={setOpen}
      open={open}
      columnId={column.id}
      kanbanFilter={kanbanFilter}
    />
  ));
});

export function BoardColumn({
  column,
  kanbanFilter,
}: {
  column: TColumn;
  kanbanFilter: boolean;
}) {
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const outerFullHeightRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<TColumnState>(idle);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const outer = outerFullHeightRef.current;
    const scrollable = scrollableRef.current;
    const header = headerRef.current;
    const inner = innerRef.current;
    invariant(outer);
    invariant(scrollable);
    invariant(header);
    invariant(inner);

    const data = getColumnData({ column });

    function setIsCardOver({
      data,
      location,
    }: {
      data: TCardData;
      location: DragLocationHistory;
    }) {
      const innerMost = location.current.dropTargets[0];
      const isOverChildCard = Boolean(
        innerMost && isCardDropTargetData(innerMost.data),
      );

      const proposed: TColumnState = {
        type: "is-card-over",
        dragging: data.rect,
        isOverChildCard,
      };
      // optimization - don't update state if we don't need to.
      setState((current) => {
        if (isShallowEqual(proposed, current)) {
          return current;
        }
        return proposed;
      });
    }

    return combine(
      draggable({
        element: header,
        getInitialData: () => data,
        onGenerateDragPreview({ source, location, nativeSetDragImage }) {
          const data = source.data;
          invariant(isColumnData(data));
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: header,
              input: location.current.input,
            }),
            render({ container }) {
              // Simple drag preview generation: just cloning the current element.
              // Not using react for this.
              const rect = inner.getBoundingClientRect();
              const preview = inner.cloneNode(true);
              invariant(preview instanceof HTMLElement);
              preview.style.width = `${rect.width}px`;
              preview.style.height = `${rect.height}px`;

              // rotation of native drag previews does not work in safari
              if (!isSafari()) {
                preview.style.transform = "rotate(4deg)";
              }

              container.appendChild(preview);
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
        getData: () => data,
        canDrop({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source });
        },
        getIsSticky: () => true,
        onDragStart({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location });
          }
        },
        onDragEnter({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location });
            return;
          }
          if (
            isColumnData(source.data) &&
            source.data.column.id !== column.id
          ) {
            setState({ type: "is-column-over" });
          }
        },
        onDropTargetChange({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location });
            return;
          }
        },
        onDragLeave({ source }) {
          if (
            isColumnData(source.data) &&
            source.data.column.id === column.id
          ) {
            return;
          }
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      }),
      autoScrollForElements({
        canScroll({ source }) {
          return isDraggingACard({ source });
        },
        element: scrollable,
      }),
      unsafeOverflowAutoScrollForElements({
        element: scrollable,
        canScroll({ source }) {
          return isDraggingACard({ source });
        },
        getOverflow() {
          return {
            forTopEdge: {
              top: 1000,
            },
            forBottomEdge: {
              bottom: 1000,
            },
          };
        },
      }),
    );
  }, [column]);
  // console.log('checking', column);

  return (
    <>
      <div
        className={`flex w-full flex-1 flex-shrink-0 select-none flex-col`}
        ref={outerFullHeightRef}
      >
        <div
          className={`flex max-h-full flex-col rounded-lg dark:bg-gray-2 bg-gray-3 dark:text-white text-black ${stateStyles[state.type]}`}
          ref={innerRef}
          {...{ [blockBoardPanningAttr]: true }}
        >
          {/* Extra wrapping element to make it easy to toggle visibility of content when a column is dragging over */}
          <div
            className={`flex max-h-full flex-col pb-2 ${state.type === "is-column-over" ? "invisible" : ""}`}
          >
            <div
              className="flex flex-row items-center justify-between p-3 pb-2"
              ref={headerRef}
            >
              <div className="pl-2 font-bold leading-4">{column.title}</div>
              <IconButton className="rounded p-2 hover:bg-slate-200 active:bg-slate-300">
                <Ellipsis size={16} />
              </IconButton>
            </div>
            <div
              className="flex flex-col overflow-y-auto [overflow-anchor:none] [scrollbar-color:theme(colors.slate.400)_theme(colors.slate.200)] [scrollbar-width:thin]"
              ref={scrollableRef}
            >
              <CardList
                column={column}
                kanbanFilter={kanbanFilter}
                setOpen={setOpen}
                open={open}
              />
              {state.type === "is-card-over" && !state.isOverChildCard ? (
                <div className="flex-shrink-0 px-3 py-1">
                  <TaskCardShadow dragging={state.dragging} />
                </div>
              ) : null}
            </div>
            {kanbanFilter ? (
              <Box className="px-3.5 mt-2 ">
                <Flex
                  justify={"start"}
                  gap="2"
                  className=" rounded-xl  p-3 w-full border-2 border-dashed border-gray-8 hover:bg-gray-8 cursor-pointer"
                >
                  <IconButton className="rounded gap-3  p-2 w-fit bg-transparent font-medium text-xl text-blue-500  hover:text-white">
                    <Plus size={24} /> Add Task
                  </IconButton>
                </Flex>
              </Box>
            ) : (
              <>
                <Flex justify={"center"} gap="2" className=" p-3">
                  <IconButton className="rounded bg-blue-600/10 p-2 font-bold text-2xl text-blue-500 hover:bg-blue-600 hover:text-white">
                    <Plus size={24} />
                  </IconButton>
                </Flex>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
