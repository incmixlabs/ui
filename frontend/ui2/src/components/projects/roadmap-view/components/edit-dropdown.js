import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ColorPicker from "@/components/color-picker";
import { Box, Button, DropdownMenu } from "@/components/radixui";
import { Clipboard, Copy, EllipsisVertical, Pencil, Save, Trash2, UserRoundPlus, X, } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useState } from "react";
const transition = {
    type: "spring",
    bounce: 0.1,
    duration: 0.2,
};
function EditDropdown({ tasks, task, setTasks, }) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(task.name);
    const [_labelColor, _setLabelColor] = useState("blue");
    const handleEditClick = (e) => {
        e.preventDefault();
        setInputValue(inputValue);
        setEditMode(true);
    };
    const handleDuplicate = (e) => {
        e.preventDefault();
        const taskToDuplicate = tasks.find((t) => t.id === task.id);
        if (!taskToDuplicate)
            return;
        const newTask = {
            ...taskToDuplicate,
            id: `${taskToDuplicate.id}-copy-${Date.now()}`,
            name: `${taskToDuplicate.name}-copy`,
        };
        setTasks([...tasks, newTask]);
        setOpen(false);
    };
    const handleDelete = (e) => {
        e.preventDefault();
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
        setOpen(false);
    };
    const handleSave = () => {
        setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, name: inputValue } : t)));
        setEditMode(false);
        setOpen(false);
    };
    // Handle cancel button click
    const handleCancel = () => {
        setEditMode(false);
    };
    const handleColorSelect = (newColor) => {
        setTasks((prevTasks) => prevTasks.map((t) => {
            if (t.id === task.id) {
                const updatedTask = { ...t, color: newColor.name };
                // If task has subtasks, update their colors too
                if (updatedTask.subtasks) {
                    updatedTask.subtasks = updatedTask.subtasks.map((subtask) => ({
                        ...subtask,
                        color: newColor.name,
                    }));
                }
                return updatedTask;
            }
            return t;
        }));
    };
    return (_jsx(_Fragment, { children: _jsxs(DropdownMenu.Root, { open: open, onOpenChange: setOpen, children: [_jsx(DropdownMenu.Trigger, { className: "absolute top-4 right-2", children: _jsx(EllipsisVertical, { className: "text-gray-11" }) }), _jsx(DropdownMenu.Content, { onCloseAutoFocus: (e) => {
                        // Prevent focus management when in edit mode
                        if (editMode)
                            e.preventDefault();
                    }, children: _jsx(MotionConfig, { transition: transition, children: _jsx(motion.div, { initial: false, animate: {
                                width: editMode ? 210 : 200,
                                height: "auto",
                            }, children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, children: !editMode ? (_jsxs(Box, { children: [_jsxs(DropdownMenu.Item, { onSelect: handleEditClick, children: [_jsx(Pencil, { size: 16 }), " Edit"] }), _jsxs(DropdownMenu.Item, { onSelect: (e) => e.preventDefault(), children: [_jsx(Clipboard, { size: 16 }), " Add Subtask"] }), _jsxs(DropdownMenu.Item, { onSelect: (e) => e.preventDefault(), children: [_jsx(UserRoundPlus, { size: 16 }), " Add Member"] }), _jsxs(DropdownMenu.Item, { onSelect: handleDuplicate, children: [_jsx(Copy, { size: 16 }), " Duplicate"] }), _jsx(DropdownMenu.Separator, {}), _jsxs(DropdownMenu.Item, { color: "red", onSelect: handleDelete, children: [_jsx(Trash2, { size: 20 }), "Delete"] }), _jsx(DropdownMenu.Separator, {}), _jsx(ColorPicker, { colorType: "base", onColorSelect: handleColorSelect })] })) : (_jsxs(Box, { children: [_jsx(Box, { className: "mb-3", children: _jsx("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), className: "w-full rounded-md border border-gray-6 bg-gray-4 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", onClick: (e) => e.stopPropagation() }) }), _jsxs(Box, { className: "flex justify-end gap-2", children: [_jsxs(Button, { variant: "soft", color: "red", onClick: (e) => {
                                                            e.stopPropagation();
                                                            handleCancel();
                                                        }, className: "flex cursor-pointer items-center gap-1 rounded-md px-3 py-1 text-sm", children: [_jsx(X, { size: 14 }), " Cancel"] }), _jsxs(Button, { onClick: (e) => {
                                                            e.stopPropagation();
                                                            handleSave();
                                                        }, className: "flex cursor-pointer items-center gap-1 rounded-md px-3 py-1 text-sm", children: [_jsx(Save, { size: 14 }), " Save"] })] })] })) }, editMode ? "edit" : "normal") }) }) }) })] }) }));
}
export default EditDropdown;
//# sourceMappingURL=edit-dropdown.js.map