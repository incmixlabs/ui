import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Button, Card, Dialog, Flex, Grid, Heading, IconButton, Input, Label, TextArea, } from "@/components/base";
import { iconSize } from "@/components/icons/icon";
import { Pushpin } from "@/components/icons/pushpin";
import { cn } from "@/lib/utils";
import { CalendarClock, Edit2, Ellipsis, Plus, SlidersHorizontal, Trash, } from "lucide-react";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense, lazy, useRef, useState } from "react";
import { notesData } from "./data";
const TiptapEditor = lazy(() => import("./components/tiptap-editor").then((mod) => ({
    default: mod.TiptapEditor,
})));
export function NoteComponent() {
    const [notes, _setNotes] = useState(notesData);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [modalData, setModalData] = useState(null);
    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const onClick = (id) => {
        const findData = notes.find((note) => note.id === id);
        if (findData) {
            setModalData(findData);
            setIsOpen(!isOpen);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { className: "p-4", children: [_jsxs(Flex, { align: "center", justify: "between", children: [_jsx(Heading, { size: "7", children: "Notes" }), _jsxs(Flex, { gap: "2", children: [_jsx(Button, { variant: "soft", color: "gray", children: _jsx(SlidersHorizontal, { className: iconSize }) }), _jsxs(Dialog.Root, { children: [_jsx(Dialog.Trigger, { children: _jsxs(Button, { variant: "solid", children: [_jsx(Plus, { className: iconSize }), " Add Note"] }) }), _jsxs(Dialog.Content, { className: "border border-gray-4", children: [_jsx(Dialog.Header, { children: _jsx(Dialog.Title, { children: "Add Note" }) }), _jsxs(Dialog.Description, { className: "space-y-4", children: [_jsxs(Box, { className: "space-y-2", children: [_jsx(Label, { children: "Title" }), _jsx(Input, { type: "text", placeholder: "The title of a note", className: "w-[80%] ", ref: titleInputRef })] }), _jsxs(Box, { className: "space-y-2", children: [_jsx(Label, { children: "Description" }), _jsx(TextArea, { placeholder: "The description of a note", className: "min-h-36", ref: descriptionInputRef })] })] }), _jsxs(Dialog.Footer, { children: [_jsx(Dialog.Close, { children: _jsx(Button, { variant: "soft", color: "gray", children: "Cancel" }) }), _jsx(Button, { variant: "solid", children: "Add Note" })] })] })] })] })] }), _jsx(Grid, { className: "overflow-hidden py-8", columns: { initial: "1", md: "2", lg: "3", xl: "4" }, gap: "5", children: notes.map((note) => (_jsx(Card.Root, { children: _jsxs(Card.Content, { className: "p-0", children: [_jsxs(Flex, { align: "center", justify: "between", className: "relative px-4 py-4", children: [_jsxs(Flex, { align: "center", className: "text-sm", children: [_jsx(CalendarClock, { className: "mr-1.5 h-4 w-4" }), note.date] }), _jsx(IconButton, { variant: "ghost", color: "gray", onClick: () => onClick(note.id), children: _jsx(Pushpin, { className: "h-6 w-6 cursor-pointer stroke-gray-12" }) }), _jsx("svg", { width: "350", height: "2", viewBox: "0 0 350 2", className: "absolute bottom-0 left-0 w-full stroke-gray-7", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: _jsx("path", { d: "M0 1H350", "stroke-dasharray": "5" }) })] }), _jsxs(Box, { className: "px-4 pt-3", children: [_jsx("h3", { className: "mb-2 font-medium text-lg", children: note.title }), _jsx("p", { className: "text-gray-11 text-sm", children: note.content })] })] }) }, note.id))) })] }), _jsx(Dialog.Root, { open: isOpen, onOpenChange: setIsOpen, children: _jsxs(Dialog.Content, { className: "border border-gray-4", children: [_jsxs(Dialog.Header, { children: [_jsx(Dialog.Title, { children: "Add New Note" }), _jsx(Flex, { align: "center", className: cn("absolute right-8 space-x-2", isEditing ? "-top-5" : "-top-3"), children: isEditing ? (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "soft", color: "red", onClick: () => setIsEditing(false), children: "Close" }), _jsx(Button, { children: "Save" })] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", color: "gray", className: "h-6", onClick: () => setIsEditing(true), children: _jsx(Edit2, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", color: "red", className: "h-6", onClick: () => setIsEditing(true), children: _jsx(Trash, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", color: "blue", className: "h-6", onClick: () => setIsEditing(true), children: _jsx(Ellipsis, { className: "h-4 w-4" }) })] })) })] }), _jsx(Dialog.Description, { children: isEditing ? (_jsx("div", { className: "space-y-4 pt-4", children: _jsx(Suspense, { fallback: _jsx("div", { children: "Loading editor..." }), children: _jsx(TiptapEditor, { modalData: modalData }) }) })) : (_jsxs(Box, { className: "", children: [_jsx("h3", { className: "mb-2 font-medium text-gray-12 text-lg", children: modalData?.title }), _jsx("p", { className: "text-gray-11 text-sm", children: modalData?.content })] })) })] }) })] }));
}
//# sourceMappingURL=index.js.map