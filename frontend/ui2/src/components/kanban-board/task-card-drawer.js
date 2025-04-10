import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Badge, Box, Button, Checkbox, DropdownMenu, Flex, Grid, Heading, IconButton, ScrollArea, Tabs, Text, } from "@/components/base";
import { cn } from "@/lib/utils";
import { Check, Download, Ellipsis, Eye, FileArchive, GripVertical, Image, Link, Paperclip, Plus, Smile, Trash2, } from "lucide-react";
import { Reorder, motion, useDragControls, useMotionValue, } from "motion/react";
import { useRef, useState } from "react";
import { MotionSheet } from "../custom-sheet";
import { SmartDatetimeInput } from "../datetime-picker";
import { TaskIcon } from "../icons/task";
import X from "../icons/x";
import { ComboBox } from "./combo-box";
import { assignData, attachments, commentsData, labelsData } from "./data";
import { useKanbanDrawer } from "./hooks/use-kanban-drawer";
import { KanbanImages } from "./images";
/**
 * Renders a task card drawer for editing detailed task information within a Kanban board.
 *
 * This component displays various interface elements such as the task description, checklist items,
 * attachments, labels, assigned members, due date, and comments. It manages state updates for these items
 * and conditionally adjusts its layout and styling based on the provided kanbanFilter flag and the task context
 * from the Kanban drawer hook.
 *
 * @param kanbanFilter - When true, applies Kanban filter styling and layout adjustments.
 *
 * @returns A JSX element representing the task card drawer interface.
 */
export default function TaskCardDrawer({ kanbanFilter, }) {
    const { taskId, handleDrawerClose } = useKanbanDrawer();
    const [checkListData, setChecklistData] = useState([
        {
            id: 1,
            title: "Inbox Template",
            date: "32.8.2024",
            checked: false,
        },
        {
            id: 2,
            title: "Chat Template",
            date: "32.8.2024",
            checked: false,
        },
        {
            id: 3,
            title: "Tasks Template",
            date: "32.8.2024",
            checked: false,
        },
        {
            id: 4,
            title: "Projects Template",
            date: "32.8.2024",
            checked: false,
        },
    ]);
    const [comment, setComment] = useState("");
    const [selectedMemebers, setSelectedMemebers] = useState([
        "regina-cooper",
    ]);
    const [selectedLabels, setSelectedLabes] = useState([
        "design",
        "frontend",
        "backend",
    ]);
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [allLabelsData, setAllLabelsData] = useState(labelsData);
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false);
    const [labelColor, setLabelColor] = useState("blue");
    const formRef = useRef(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setComment("");
    };
    const handleAddNewLabel = (e) => {
        e.preventDefault();
        if (!formRef.current)
            return;
        const formData = new FormData(formRef.current);
        const labelName = formData.get("labelName");
        if (!labelName.trim())
            return;
        const newLabel = {
            value: labelName.toLowerCase().replace(/\s+/g, "-"),
            label: labelName,
            color: labelColor || "blue",
        };
        setAllLabelsData([...allLabelsData, newLabel]);
        // Reset form and close it
        formRef.current.reset();
        setIsLabelFormOpen(false);
    };
    return (_jsx(_Fragment, { children: _jsx(MotionSheet, { open: Boolean(taskId), onOpenChange: handleDrawerClose, showCloseButton: false, side: "right", isFilterClassName: "relative z-50 h-[80vh] shrink-0 rounded-xl", isFilter: kanbanFilter, className: "w-[53rem] p-0 ", children: _jsx("div", { className: cn("cursor-default rounded-lg bg-gray-3 dark:bg-gray-4 ", kanbanFilter ? "h-full w-full" : "w-full "), children: _jsx(ScrollArea, { className: "h-[98vh] rounded-lg", children: _jsxs(Flex, { align: "center", className: "h-full", children: [_jsxs(Box, { className: "bg-gray-1 p-4 dark:bg-gray-3", children: [_jsxs(Flex, { align: "center", justify: "between", children: [_jsxs(Flex, { className: " gap-2", children: [_jsxs(Button, { className: "flex h-10 items-center gap-1 rounded-md font-semibold text-white", children: [_jsx(Check, { size: 16 }), "Complete"] }), _jsxs(DropdownMenu.Root, { children: [_jsx(DropdownMenu.Trigger, { children: _jsxs(Button, { color: "gray", variant: "soft", className: "h-10 cursor-pointer gap-2 rounded-md border p-2 px-2", children: [_jsx(Eye, { size: 16 }), _jsx(Text, { children: "2" }), _jsx(DropdownMenu.TriggerIcon, {})] }) }), _jsxs(DropdownMenu.Content, { className: " z-88 ", color: "gray", variant: "soft", children: [_jsx(DropdownMenu.Item, { shortcut: "\u2318 E", children: "Edit" }), _jsx(DropdownMenu.Item, { shortcut: "\u2318 D", children: "Duplicate" }), _jsx(DropdownMenu.Separator, {}), _jsx(DropdownMenu.Item, { shortcut: "\u2318 N", children: "Archive" })] })] })] }), _jsxs(Flex, { className: " gap-2", children: [_jsx(IconButton, { color: "gray", variant: "soft", className: "flex items-center gap-1 rounded-md bg-transparent font-semibold", children: _jsx(Link, { size: 20 }) }), _jsxs(DropdownMenu.Root, { children: [_jsx(DropdownMenu.Trigger, { className: "", children: _jsx(IconButton, { color: "gray", variant: "soft", className: "flex items-center rounded-md bg-transparent font-semibold", children: _jsx(Ellipsis, { size: 24 }) }) }), _jsxs(DropdownMenu.Content, { color: "gray", variant: "soft", highContrast: true, alignOffset: -40, className: " z-88 w-36 ", children: [_jsxs(DropdownMenu.Item, { className: "justify-start px-1", children: [_jsx(TaskIcon, {}), " Task"] }), _jsxs(DropdownMenu.Item, { className: "justify-start px-1", children: [_jsx(TaskIcon, {}), " Board"] }), _jsxs(DropdownMenu.Item, { className: "justify-start px-1", children: [_jsx(TaskIcon, {}), "Project"] }), _jsxs(DropdownMenu.Item, { className: "justify-start px-1", children: [_jsx(TaskIcon, {}), "Invite"] })] })] }), kanbanFilter && (_jsxs(IconButton, { color: "gray", variant: "soft", onClick: handleDrawerClose, className: "ml-2 flex h-8 w-8 items-center justify-center rounded-md", children: [_jsx(X, { "aria-hidden": "true" }), _jsx(Text, { className: "sr-only", children: "Close" })] }))] })] }), _jsx(Heading, { className: "px-0 py-4 font-medium", children: "Template Progress" }), kanbanFilter && (_jsxs(Box, { className: "space-y-3 py-2", children: [_jsxs(Grid, { columns: "2", children: [_jsxs(Box, { className: "space-y-3", children: [_jsx(Heading, { size: "4", className: "font-medium text-gray-11", children: "ASSIGNED TO" }), _jsxs(Flex, { className: "gap-1", children: [_jsx(Avatar, { src: KanbanImages.user1, className: "h-8 w-8" }), _jsx(Avatar, { src: KanbanImages.user2, className: "h-8 w-8" }), _jsx(Avatar, { src: KanbanImages.user1, className: "h-8 w-8" }), _jsx(ComboBox, { options: assignData, onValueChange: setSelectedMemebers, defaultValue: selectedMemebers, placeholder: "Find Person...", title: "Assign To" })] })] }), _jsxs(Box, { className: "space-y-3", children: [_jsx(Heading, { size: "4", className: "font-medium text-gray-11", children: "CREATED BY" }), _jsx(Flex, { className: "gap-2", children: _jsxs(Flex, { className: "gap-1", align: "center", children: [_jsx(Avatar, { src: KanbanImages.user1, className: "h-8 w-8" }), _jsx("p", { children: "Regina Cooper" })] }) })] })] }), _jsx("h2", { className: "font-medium text-gray-500", children: "LABELS" }), _jsxs(Flex, { className: "gap-2", children: [allLabelsData?.map((label) => (_jsx(Badge, { color: label.color, variant: "solid", className: "rounded-md p-1.5 px-2.5", children: label.label }, label.value))), _jsx(ComboBox, { options: allLabelsData, onValueChange: setSelectedLabes, defaultValue: selectedLabels, placeholder: "Search Label", title: "Labels", addNewLabel: true, isLabelFormOpen: isLabelFormOpen, formRef: formRef, setIsLabelFormOpen: setIsLabelFormOpen, handleAddNewLabel: handleAddNewLabel })] }), _jsx("h2", { className: " font-medium text-gray-500", children: "DUE DATE " }), _jsx(SmartDatetimeInput, { value: selectedDate, onValueChange: handleDateChange, placeholder: "Enter a date and time" })] })), _jsxs(Box, { className: "space-y-2 py-6 pt-4", children: [_jsx(Heading, { size: "4", className: "font-medium text-gray-11", children: "DESCRIPTION" }), _jsx(Text, { as: "p", className: "text-gray-10 leading-[120%]", children: "We need to develop several options (Inbox template, Chat template, tasks template, Projects template) of cool user interface design templates - to carefully work out the smallest details." })] }), _jsxs(Box, { children: [_jsxs(Box, { className: "gap-2 space-y-2 py-2", children: [_jsxs(Heading, { size: "3", className: "flex w-full items-center gap-1 font-medium text-gray-11 uppercase", children: [_jsx(Text, { children: "CheckList" }), _jsx(Text, { children: "(50%)" })] }), _jsx(Box, { className: "relative flex h-2 w-full items-center gap-1 rounded-full bg-gray-200 before:absolute before:top-0 before:left-0 before:h-2 before:w-[var(--progress)] before:rounded-full before:bg-secondary", style: {
                                                            "--progress": "50%",
                                                        } })] }), _jsx(Reorder.Group, { axis: "y", values: checkListData, onReorder: setChecklistData, className: "w-full space-y-1 ", children: checkListData.map((item) => (_jsx(Item, { item: item, children: _jsxs(Flex, { className: "gap-2", children: [_jsx(Checkbox, { size: "3", className: "h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white " }), _jsx("h1", { className: "text-gray-12 text-sm ", children: item.title })] }) }, item.id))) }), _jsxs(IconButton, { className: "mt-4 w-fit gap-2 bg-transparent p-1 font-semibold text-secondary ", children: [_jsx(Plus, {}), _jsx(Text, { children: "Add Checklist Item" })] })] }), _jsxs(Box, { className: "py-5", children: [_jsx(Heading, { size: "4", className: " py-3 font-medium text-gray-11", children: "Attachments" }), _jsx(Box, { className: "space-y-4", children: attachments.map((attachment) => (_jsxs(Flex, { align: "center", className: " rounded-lg bg-gray-3 p-3 transition-colors dark:bg-gray-4", children: [attachment.type === "image" ? (_jsx(Box, { className: "h-16 w-16 shrink-0 overflow-hidden rounded-lg", children: _jsx("img", { src: attachment.thumbnailUrl, alt: attachment.name, className: "h-full w-full object-cover" }) })) : (_jsx(Box, { className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-8", children: _jsx(FileArchive, { className: "h-8 w-8 text-gray-8" }) })), _jsxs(Box, { className: "ml-4 grow", children: [_jsx(Heading, { as: "h3", className: "font-medium text-gray-12 text-sm", children: attachment.name }), _jsxs(Box, { className: "mt-1 text-gray-11 text-xs", children: [_jsxs(Text, { children: ["Uploaded on ", attachment.uploadDate] }), _jsx(Text, { className: "mx-2", children: "\u2022" })] }), _jsx(Text, { as: "p", className: "pt-1 text-gray-11 text-sm", children: attachment.size })] }), _jsxs(Flex, { className: "space-x-2", children: [_jsx(Button, { variant: "soft", className: "h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-4 dark:hover:bg-gray-7", children: _jsx(Download, { className: "h-5 w-5 text-gray-12" }) }), _jsx(Button, { variant: "soft", className: "h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-4 dark:hover:bg-gray-7", children: _jsx(Trash2, { className: "h-5 w-5 text-gray-12" }) })] })] }, attachment.id))) }), _jsxs(IconButton, { className: "mt-4 w-fit gap-2 bg-transparent p-1 font-semibold text-secondary ", children: [_jsx(Plus, {}), _jsx(Text, { children: "Add Attachment" })] })] }), _jsx(Box, { children: _jsxs(Tabs.Root, { defaultValue: "comments", children: [_jsxs(Tabs.List, { className: "gap-4", color: "cyan", children: [_jsx(Tabs.Trigger, { value: "comments", className: "inline-block cursor-pointer py-3 font-medium hover:bg-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary ", children: "COMMENTS" }), _jsx(Tabs.Trigger, { value: "activity", className: "inline-block cursor-pointer py-3 font-medium hover:bg-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary ", children: "ACTIVITY" })] }), _jsxs(Box, { pt: "3", children: [_jsxs(Tabs.Content, { value: "comments", className: "py-4", children: [_jsxs("form", { onSubmit: handleSubmit, className: "rounded-lg border border-gray-5 bg-gray-2 shadow-xs dark:bg-gray-4", children: [_jsx(Box, { className: "p-2", children: _jsx("textarea", { value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Add Comment...", className: "min-h-[70px] w-full resize-none border-0 bg-gray-2 text-gray-12 text-sm placeholder-gray-400 focus:ring-0 dark:bg-gray-4" }) }), _jsxs(Flex, { className: " px-4 py-2 ", justify: "between", align: "center", children: [_jsx(Button, { type: "submit", variant: "solid", className: "rounded-md px-4 py-2 font-medium text-sm text-white transition-colors", disabled: !comment.trim(), children: "Comment" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { type: "button", variant: "soft", className: "h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-3 dark:hover:bg-gray-7", "aria-label": "Attach file", children: _jsx(Paperclip, { className: "h-5 w-5 text-gray-12" }) }), _jsx(Button, { type: "button", variant: "soft", className: "h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-3 dark:hover:bg-gray-7", "aria-label": "Add emoji", children: _jsx(Smile, { className: "h-5 w-5 text-gray-12" }) }), _jsx(Button, { type: "button", variant: "soft", className: "h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-3 dark:hover:bg-gray-7", "aria-label": "Upload image", children: _jsx(Image, { className: "h-5 w-5 text-gray-12" }) })] })] })] }), _jsx(Box, { className: "space-y-4 py-4", children: commentsData.map((comment) => (_jsxs(Flex, { gap: "2", children: [_jsx("img", { src: comment.user.avatar, alt: comment.user.name, className: "h-10 w-10 shrink-0 rounded-full object-cover" }), _jsxs(Box, { className: "flex-1", children: [_jsxs(Flex, { align: "center", className: "mb-1 gap-2", children: [_jsx(Heading, { size: "3", className: "font-medium text-gray-12", children: comment.user.name }), _jsx(Text, { as: "span", className: "text-gray-500 text-sm", children: comment.timestamp })] }), _jsx(Text, { as: "p", className: "whitespace-pre-line text-gray-11", children: comment.text }), comment.images && (_jsx(Flex, { className: "mt-3", gap: "2", children: comment.images.map((image, index) => (_jsxs("div", { className: "group relative", children: [_jsx("img", { src: image, alt: `Attachment ${index + 1}`, className: "h-16 w-16 rounded-lg object-cover" }), index === 3 &&
                                                                                                    (comment.images?.length ?? 0) > 3 && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center rounded-lg bg-black/40", children: _jsx("span", { className: "font-medium text-white", children: "+3" }) }))] }, `${image}-${index}`))) }))] })] }, comment.id))) })] }), _jsx(Tabs.Content, { value: "activity", children: _jsx(Text, { as: "p", children: "Access and update your documents." }) })] })] }) })] }), !kanbanFilter && (_jsxs(Box, { className: "relative h-full w-72 shrink-0 pt-24", children: [_jsxs(IconButton, { color: "gray", variant: "soft", onClick: handleDrawerClose, className: "absolute top-5 right-3 ml-8 flex h-8 w-8 items-center justify-center rounded-md", children: [_jsx(X, { "aria-hidden": "true" }), _jsx("span", { className: "sr-only", children: "Close" })] }), _jsxs(Box, { className: "space-y-3 p-4 ", children: [_jsx(Heading, { size: "4", className: " font-medium text-gray-10", children: "CREATED BY" }), _jsxs(Flex, { className: "gap-2", align: "center", children: [_jsx(Avatar, { src: KanbanImages.user1, className: "h-8 w-8" }), _jsx(Text, { as: "p", children: "Regina Cooper" })] })] }), _jsxs(Box, { className: "space-y-3 border-gray-6 border-t-2 p-4 py-3", children: [_jsxs(Flex, { justify: "between", align: "center", children: [_jsx(Heading, { size: "4", className: " font-medium text-gray-10", children: "ASSIGNED TO" }), _jsx(ComboBox, { options: assignData, onValueChange: setSelectedMemebers, defaultValue: selectedMemebers, placeholder: "Find Person...", title: "Assign To" })] }), _jsxs(Flex, { className: "gap-1", children: [_jsx(Avatar, { src: KanbanImages.user1, className: "h-8 w-8" }), _jsx(Avatar, { src: KanbanImages.user2, className: "h-8 w-8" }), _jsx(Avatar, { src: KanbanImages.user1, className: "h-8 w-8" })] })] }), _jsxs(Box, { className: "space-y-3 border-gray-6 border-t-2 p-4 py-3 ", children: [_jsx(Heading, { size: "4", className: " font-medium text-gray-10", children: "DUE DATE" }), _jsx(SmartDatetimeInput, { value: selectedDate, onValueChange: handleDateChange, placeholder: "Enter a date and time" })] }), _jsxs(Box, { className: "space-y-3 border-gray-6 border-t-2 p-4 py-3 ", children: [_jsxs(Flex, { justify: "between", align: "center", children: [_jsx(Heading, { size: "4", className: " font-medium text-gray-10", children: "LABELS" }), _jsx(ComboBox, { options: allLabelsData, onValueChange: setSelectedLabes, defaultValue: selectedLabels, placeholder: "Search Label", title: "Labels", addNewLabel: true, isLabelFormOpen: isLabelFormOpen, formRef: formRef, setIsLabelFormOpen: setIsLabelFormOpen, handleAddNewLabel: handleAddNewLabel, labelColor: labelColor, setLabelColor: setLabelColor })] }), _jsx(Flex, { gap: "2", wrap: "wrap", children: allLabelsData?.map((label) => (_jsx(Badge, { color: label.color, variant: "solid", className: "rounded-md p-1.5 px-2.5", children: label.label }, label.value))) })] }), _jsxs(Box, { className: "space-y-3 border-gray-6 border-t-2 p-4 py-3 ", children: [_jsxs(Box, { children: [_jsx(Heading, { size: "3", className: " font-medium text-gray-12", children: "Created" }), _jsx(Text, { as: "span", className: "text-gray-9", children: "January 2, 2020 4:30 PM" })] }), _jsxs(Box, { children: [_jsx(Heading, { size: "3", className: " font-medium text-gray-12", children: "Updated" }), _jsx(Text, { as: "span", className: "text-gray-9", children: "January 2, 2020 4:55 PM" })] })] })] }))] }) }) }) }) }));
}
const Item = ({ children, item, }) => {
    const y = useMotionValue(0);
    //   const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();
    return (_jsxs(Reorder.Item, { value: item, style: { y }, dragListener: false, dragControls: dragControls, className: "group flex w-full items-center justify-between rounded-md bg-gray-3 p-3 dark:bg-gray-4", children: [children, _jsxs(Flex, { className: "gap-3", align: "center", children: [_jsx(ReorderIcon, { dragControls: dragControls }), _jsx(IconButton, { className: "bg-transparent opacity-0 group-hover:opacity-100", children: _jsx(Trash2, { className: "h-5 w-5 text-gray-12" }) })] })] }));
};
export function ReorderIcon({ dragControls }) {
    return (_jsx(motion.div, { whileTap: { scale: 0.85 }, onPointerDown: (e) => {
            e.preventDefault();
            dragControls.start(e);
        }, children: _jsx(GripVertical, { className: " h-7 w-7 cursor-grab text-gray-12 opacity-0 active:cursor-grabbing group-hover:opacity-100" }) }));
}
//# sourceMappingURL=task-card-drawer.js.map