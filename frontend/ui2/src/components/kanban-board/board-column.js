/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { draggable, dropTargetForElements, } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Ellipsis, Plus } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { Box, Flex, Heading, IconButton } from "@/components/base";
import { isSafari } from "@/lib/utils/browser";
import { isShallowEqual } from "@/lib/utils/objects";
import { blockBoardPanningAttr } from "./data-attributes";
import { TaskCard, TaskCardShadow } from "./task-card";
import { getColumnData, isCardData, isCardDropTargetData, isColumnData, isDraggingACard, isDraggingAColumn, } from "./types";
const stateStyles = {
    idle: "",
    "is-card-over": "outline outline-2 outline-gray-6",
    "is-dragging": "opacity-40 outline outline-2 outline-gray-6",
    "is-column-over": "bg-slate-900",
};
const idle = { type: "idle" };
const CardList = memo(function CardList({ column, kanbanFilter, }) {
    return column.cards.map((card) => (_jsx(TaskCard, { card: card, columnId: column.id, kanbanFilter: kanbanFilter }, card.id)));
});
export function BoardColumn({ column, kanbanFilter, }) {
    const scrollableRef = useRef(null);
    const outerFullHeightRef = useRef(null);
    const headerRef = useRef(null);
    const innerRef = useRef(null);
    const [state, setState] = useState(idle);
    const [_open, _setOpen] = useState(false);
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
        function setIsCardOver({ data, location, }) {
            const innerMost = location.current.dropTargets[0];
            const isOverChildCard = Boolean(innerMost && isCardDropTargetData(innerMost.data));
            const proposed = {
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
        return combine(draggable({
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
        }), dropTargetForElements({
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
                if (isColumnData(source.data) &&
                    source.data.column.id !== column.id) {
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
                if (isColumnData(source.data) &&
                    source.data.column.id === column.id) {
                    return;
                }
                setState(idle);
            },
            onDrop() {
                setState(idle);
            },
        }), autoScrollForElements({
            canScroll({ source }) {
                return isDraggingACard({ source });
            },
            element: scrollable,
        }), unsafeOverflowAutoScrollForElements({
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
        }));
    }, [column]);
    // console.log('checking', column);
    return (_jsx(_Fragment, { children: _jsx(Flex, { direction: "column", className: "w-full flex-1 flex-shrink-0 select-none", ref: outerFullHeightRef, children: _jsx(Flex, { direction: "column", className: `max-h-full rounded-lg bg-gray-3 text-black dark:bg-gray-2 dark:text-white ${stateStyles[state.type]}`, ref: innerRef, [blockBoardPanningAttr]: true, children: _jsxs(Flex, { direction: "column", className: `max-h-full pb-2 ${state.type === "is-column-over" ? "invisible" : ""}`, children: [_jsxs(Flex, { direction: "row", justify: "between", align: "center", className: "p-3 pb-2", ref: headerRef, children: [_jsx(Heading, { size: "5", as: "h3", className: "pl-2 font-bold leading-4", children: column.title }), _jsx(IconButton, { className: "rounded p-2 hover:bg-slate-200 active:bg-slate-300", children: _jsx(Ellipsis, { size: 16 }) })] }), _jsxs(Flex, { className: "flex flex-col overflow-y-auto [overflow-anchor:none] [scrollbar-color:theme(colors.slate.400)_theme(colors.slate.200)] [scrollbar-width:thin]", ref: scrollableRef, children: [_jsx(CardList, { column: column, kanbanFilter: kanbanFilter }), state.type === "is-card-over" && !state.isOverChildCard ? (_jsx(Box, { className: "flex-shrink-0 px-3 py-1", children: _jsx(TaskCardShadow, { dragging: state.dragging }) })) : null] }), kanbanFilter ? (_jsx(Box, { className: "mt-2 px-3.5", children: _jsx(Flex, { justify: "start", gap: "2", className: " w-full cursor-pointer rounded-xl border-2 border-gray-8 border-dashed p-3 hover:bg-gray-8", children: _jsxs(IconButton, { className: " w-fit gap-3 rounded bg-transparent p-2 font-medium text-blue-500 text-xl hover:text-white", children: [_jsx(Plus, { size: 24 }), " Add Task"] }) }) })) : (_jsx(_Fragment, { children: _jsx(Flex, { justify: "center", gap: "2", className: " p-3", children: _jsx(IconButton, { className: "rounded bg-blue-600/10 p-2 font-bold text-2xl text-blue-500 hover:bg-blue-600 hover:text-white", children: _jsx(Plus, { size: 24 }) }) }) }))] }) }) }) }));
}
//# sourceMappingURL=board-column.js.map