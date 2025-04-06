"use client"

import { memo, useEffect, useRef, useState } from "react"
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { Ellipsis, Plus } from "lucide-react"
import invariant from "tiny-invariant"

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import type { DragLocationHistory } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types"
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"

import { Box, Flex, Heading } from "@/components/base"
import { IconButton } from "@/components/radixui/button/icon-button"
import { blockBoardPanningAttr } from "./data-attributes"
import { isSafari } from "./is-safari"
import { isShallowEqual } from "./is-shallow-equal"
import { TaskCard, TaskCardShadow } from "./task-card"
import {
  type TCardData,
  type TColumn,
  getColumnData,
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
} from "./types"

type TColumnState =
  | {
      type: "is-card-over"
      isOverChildCard: boolean
      dragging: DOMRect
    }
  | {
      type: "is-column-over"
    }
  | {
      type: "idle"
    }
  | {
      type: "is-dragging"
    }

const stateStyles: { [Key in TColumnState["type"]]: string } = {
  idle: "",
  "is-card-over": "outline outline-2 outline-gray-6",
  "is-dragging": "opacity-40 outline outline-2 outline-gray-6",
  "is-column-over": "bg-slate-900",
}

const idle = { type: "idle" } satisfies TColumnState

const CardList = memo(function CardList({
  column,
  kanbanFilter,
}: {
  column: TColumn
  kanbanFilter: boolean
}) {
  return column.cards.map((card) => (
    <TaskCard
      key={card.id}
      card={card}
      columnId={column.id}
      kanbanFilter={kanbanFilter}
    />
  ))
})

export function BoardColumn({
  column,
  kanbanFilter,
}: {
  column: TColumn
  kanbanFilter: boolean
}) {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const outerFullHeightRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TColumnState>(idle)
  const [_open, _setOpen] = useState(false)

  useEffect(() => {
    const outer = outerFullHeightRef.current
    const scrollable = scrollableRef.current
    const header = headerRef.current
    const inner = innerRef.current
    invariant(outer)
    invariant(scrollable)
    invariant(header)
    invariant(inner)

    const data = getColumnData({ column })

    function setIsCardOver({
      data,
      location,
    }: {
      data: TCardData
      location: DragLocationHistory
    }) {
      const innerMost = location.current.dropTargets[0]
      const isOverChildCard = Boolean(
        innerMost && isCardDropTargetData(innerMost.data)
      )

      const proposed: TColumnState = {
        type: "is-card-over",
        dragging: data.rect,
        isOverChildCard,
      }
      // optimization - don't update state if we don't need to.
      setState((current) => {
        if (isShallowEqual(proposed, current)) {
          return current
        }
        return proposed
      })
    }

    return combine(
      draggable({
        element: header,
        getInitialData: () => data,
        onGenerateDragPreview({ source, location, nativeSetDragImage }) {
          const data = source.data
          invariant(isColumnData(data))
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: header,
              input: location.current.input,
            }),
            render({ container }) {
              // Simple drag preview generation: just cloning the current element.
              // Not using react for this.
              const rect = inner.getBoundingClientRect()
              const preview = inner.cloneNode(true)
              invariant(preview instanceof HTMLElement)
              preview.style.width = `${rect.width}px`
              preview.style.height = `${rect.height}px`

              // rotation of native drag previews does not work in safari
              if (!isSafari()) {
                preview.style.transform = "rotate(4deg)"
              }

              container.appendChild(preview)
            },
          })
        },
        onDragStart() {
          setState({ type: "is-dragging" })
        },
        onDrop() {
          setState(idle)
        },
      }),
      dropTargetForElements({
        element: outer,
        getData: () => data,
        canDrop({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source })
        },
        getIsSticky: () => true,
        onDragStart({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
          }
        },
        onDragEnter({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
            return
          }
          if (
            isColumnData(source.data) &&
            source.data.column.id !== column.id
          ) {
            setState({ type: "is-column-over" })
          }
        },
        onDropTargetChange({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
            return
          }
        },
        onDragLeave({ source }) {
          if (
            isColumnData(source.data) &&
            source.data.column.id === column.id
          ) {
            return
          }
          setState(idle)
        },
        onDrop() {
          setState(idle)
        },
      }),
      autoScrollForElements({
        canScroll({ source }) {
          return isDraggingACard({ source })
        },
        element: scrollable,
      }),
      unsafeOverflowAutoScrollForElements({
        element: scrollable,
        canScroll({ source }) {
          return isDraggingACard({ source })
        },
        getOverflow() {
          return {
            forTopEdge: {
              top: 1000,
            },
            forBottomEdge: {
              bottom: 1000,
            },
          }
        },
      })
    )
  }, [column])
  // console.log('checking', column);

  return (
    <>
      <Flex
        direction="column"
        className={"w-full flex-1 flex-shrink-0 select-none"}
        ref={outerFullHeightRef}
      >
        <Flex
          direction="column"
          className={`max-h-full rounded-lg bg-gray-3 text-black dark:bg-gray-2 dark:text-white ${stateStyles[state.type]}`}
          ref={innerRef}
          {...{ [blockBoardPanningAttr]: true }}
        >
          {/* Extra wrapping element to make it easy to toggle visibility of content when a column is dragging over */}
          <Flex
            direction="column"
            className={`max-h-full pb-2 ${state.type === "is-column-over" ? "invisible" : ""}`}
          >
            <Flex
              direction="row"
              justify="between"
              align="center"
              className="p-3 pb-2"
              ref={headerRef}
            >
              <Heading size={"5"} as="h3" className="pl-2 font-bold leading-4">
                {column.title}
              </Heading>
              <IconButton className="rounded p-2 hover:bg-slate-200 active:bg-slate-300">
                <Ellipsis size={16} />
              </IconButton>
            </Flex>
            <Flex
              className="flex flex-col overflow-y-auto [overflow-anchor:none] [scrollbar-color:theme(colors.slate.400)_theme(colors.slate.200)] [scrollbar-width:thin]"
              ref={scrollableRef}
            >
              <CardList column={column} kanbanFilter={kanbanFilter} />
              {state.type === "is-card-over" && !state.isOverChildCard ? (
                <Box className="flex-shrink-0 px-3 py-1">
                  <TaskCardShadow dragging={state.dragging} />
                </Box>
              ) : null}
            </Flex>
            {kanbanFilter ? (
              <Box className="mt-2 px-3.5">
                <Flex
                  justify={"start"}
                  gap="2"
                  className=" w-full cursor-pointer rounded-xl border-2 border-gray-8 border-dashed p-3 hover:bg-gray-8"
                >
                  <IconButton className=" w-fit gap-3 rounded bg-transparent p-2 font-medium text-blue-500 text-xl hover:text-white">
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
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
