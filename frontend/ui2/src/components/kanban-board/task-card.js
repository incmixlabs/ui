"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { draggable, dropTargetForElements, } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import invariant from "tiny-invariant";
import { Box, Card, Checkbox, Flex, Heading, IconButton, Text, } from "@/components/base";
import { iconSize } from "@/components/icons/icon";
import { isSafari } from "@/lib/utils/browser";
import { isShallowEqual } from "@/lib/utils/objects";
import { attachClosestEdge, extractClosestEdge, } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { CalendarDays, MessageSquareText, Paperclip } from "lucide-react";
import { getCardData, getCardDropTargetData, isCardData, isDraggingACard, } from "./types";
import { cn } from "@/lib/utils";
import { useKanbanDrawer } from "./hooks/use-kanban-drawer";
const idle = { type: "idle" };
const innerStyles = {
    idle: "hover:outline outline-2 outline-gray-2 ",
    "is-dragging": "opacity-20 cursor-grabbing",
};
const outerStyles = {
    // We no longer render the draggable item after we have left it
    // as it's space will be taken up by a shadow on adjacent items.
    // Using `display:none` rather than returning `null` so we can always
    // return refs from this component.
    "is-dragging": "opacity-50",
    // Keeping the refs allows us to continue to receive events during the drag.
    "is-dragging-and-left-self": "hidden",
};
export function TaskCardShadow({ dragging }) {
    return (_jsx("div", { className: "flex-shrink-0 rounded bg-gray-5", style: { height: dragging.height } }));
}
export function TaskCardDisplay({ card, state, outerRef, innerRef, kanbanFilter, }) {
    const { handleDrawerOpen } = useKanbanDrawer();
    return (_jsxs(Box, { ref: outerRef, onClick: () => handleDrawerOpen(card.id.toString()), onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === "Space") {
                e.preventDefault();
                handleDrawerOpen(card.id.toString());
            }
        }, className: `flex flex-shrink-0 flex-col gap-2 px-3 py-1 ${outerStyles[state.type]}`, children: [state.type === "is-over" && state.closestEdge === "top" ? (_jsx(TaskCardShadow, { dragging: state.dragging })) : null, _jsx(Card.Root, { className: cn(`relative cursor-pointer space-y-1.5 rounded-lg p-3 ${innerStyles[state.type]}`, kanbanFilter ? "flex items-center justify-between " : ""), ref: innerRef, style: state.type === "preview"
                    ? {
                        width: state.dragging.width,
                        height: state.dragging.height,
                        backgroundColor: "white",
                        opacity: 1,
                        border: "2px solid #696969",
                        transform: !isSafari() ? "rotate(4deg)" : undefined,
                    }
                    : undefined, children: kanbanFilter ? (_jsxs(_Fragment, { children: [_jsxs(Flex, { align: "center", justify: "center", gap: "2", children: [_jsx(Checkbox, { size: "3", className: "h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white " }), _jsx(Heading, { as: "h6", size: "3", className: "py-2 font-medium", children: card.name })] }), _jsxs(Flex, { align: "center", justify: "between", gap: "5", className: "w-64", children: [_jsxs(Text, { as: "span", className: " flex items-center gap-1 font-medium text-sm", children: [_jsx(CalendarDays, { className: "text-zinc-400", size: 20 }), _jsx(Text, { as: "span", children: card?.date })] }), card.members && (_jsx(Flex, { align: "center", gap: "1", children: card.members.map((file) => {
                                        const colors = [
                                            "bg-green-400",
                                            "bg-yellow-400",
                                            "bg-orange-400",
                                            "bg-cyan-400",
                                            "bg-red-400",
                                        ];
                                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                                        return (_jsx("span", { className: `flex ${iconSize} items-center gap-1 rounded-md ${randomColor}` }, file.name));
                                    }) })), _jsx(Flex, { align: "center", gap: "2", children: card.members.map((member) => (_jsx("img", { src: member.src, alt: member.name, className: "h-8 w-8 rounded-full" }, member.id))) })] })] })) : (_jsxs(_Fragment, { children: [_jsxs(Text, { as: "span", className: "absolute top-2 right-3 flex items-center gap-1 font-medium text-sm", children: [_jsx(CalendarDays, { className: "text-zinc-400", size: 20 }), _jsx(Text, { as: "span", children: card?.date })] }), card.members && (_jsx(Flex, { align: "center", gap: "1", children: card.members.map((file) => {
                                const colors = [
                                    "bg-green-400",
                                    "bg-yellow-400",
                                    "bg-orange-400",
                                    "bg-cyan-400",
                                    "bg-red-400",
                                ];
                                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                                return (_jsx(Text, { className: `flex h-1 w-6 items-center gap-1 rounded-full ${randomColor}` }, file.name));
                            }) })), _jsx(Heading, { as: "h6", className: "py-2 font-medium", children: card.name }), card.description && (_jsx(Text, { as: "p", className: "text-gray-11", children: card.description })), card.subTasks?.map((subtask, i) => (_jsx(_Fragment, { children: _jsxs(Box, { className: "space-y-2 py-2", children: [_jsxs(Flex, { align: "center", justify: "between", className: "w-full gap-1 text-gray-11 uppercase", children: [_jsx(Text, { children: subtask.name }), _jsxs(Text, { children: [subtask?.progress, "%"] })] }), _jsx(Flex, { align: "center", className: "i relative h-2 w-full gap-1 rounded-full bg-gray-200 before:absolute before:top-0 before:left-0 before:h-2 before:w-[var(--progress)] before:rounded-full before:bg-green-400", style: {
                                            "--progress": `${subtask?.progress}%`,
                                        } })] }, `${subtask?.name}-${i}`) }))), card.attachment && (_jsx("img", { src: card.attachment, alt: "attachment", className: "aspect-video rounded-lg object-cover" })), _jsxs(Flex, { align: "center", justify: "between", className: "gap-2 pt-6 pb-2", children: [_jsxs(Flex, { align: "center", gap: "4", children: [card.filesData && (_jsxs(IconButton, { className: "flex items-center gap-1 bg-transparent text-gray-700 dark:text-gray-200", children: [_jsx(Paperclip, { size: 20 }), _jsx(Text, { children: card.filesData.length })] })), _jsxs(IconButton, { className: "flex items-center gap-1 bg-transparent text-gray-700 dark:text-gray-200", children: [_jsx(MessageSquareText, { size: 20 }), _jsx(Text, { children: "5" })] })] }), _jsx(Flex, { align: "center", className: "gap-2", children: card.members.map((member) => (_jsx("img", { src: member.src, alt: member.name, className: "h-8 w-8 rounded-full" }, member.id))) })] })] })) }), state.type === "is-over" && state.closestEdge === "bottom" ? (_jsx(TaskCardShadow, { dragging: state.dragging })) : null] }));
}
export function TaskCard({ card, columnId, kanbanFilter, }) {
    const outerRef = useRef(null);
    const innerRef = useRef(null);
    const [state, setState] = useState(idle);
    useEffect(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        invariant(outer && inner);
        return combine(draggable({
            element: inner,
            getInitialData: ({ element }) => getCardData({
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
        }), dropTargetForElements({
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
                const proposed = {
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
        }));
    }, [card, columnId]);
    return (_jsxs(_Fragment, { children: [_jsx(TaskCardDisplay, { outerRef: outerRef, innerRef: innerRef, state: state, card: card, kanbanFilter: kanbanFilter }, card.id), state.type === "preview"
                ? createPortal(_jsx(TaskCardDisplay, { state: state, card: card }), state.container)
                : null] }));
}
//# sourceMappingURL=task-card.js.map