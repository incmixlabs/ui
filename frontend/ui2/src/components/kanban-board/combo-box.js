import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckIcon, Plus } from "lucide-react";
import { forwardRef, useState } from "react";
import ColorPicker from "@/components//color-picker";
import { Avatar, Badge, Button, Command, Flex, IconButton, Input, Popover, Text, } from "@/components/base";
import { iconSize } from "@/components/icons/icon";
import { cn } from "@/lib/utils";
export const ComboBox = forwardRef(({ options, onValueChange, defaultValue = [], placeholder = "Select options", title, popoverClass, addNewLabel = false, formRef, labelColor, setLabelColor, isLabelFormOpen, setIsLabelFormOpen, handleAddNewLabel, }) => {
    const [selectedValues, setSelectedValues] = useState(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            setIsPopoverOpen(true);
        }
        else if (event.key === "Backspace" && !event.currentTarget.value) {
            const newSelectedValues = [...selectedValues];
            newSelectedValues.pop();
            setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        }
    };
    const toggleOption = (option) => {
        const newSelectedValues = selectedValues.includes(option)
            ? selectedValues.filter((value) => value !== option)
            : [...selectedValues, option];
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
    };
    const handleClear = () => {
        setSelectedValues([]);
        onValueChange([]);
    };
    const handleColorSelect = (newColor) => {
        if (setLabelColor) {
            setLabelColor(newColor.name);
        }
    };
    return (_jsxs(Popover.Root, { open: isPopoverOpen, onOpenChange: setIsPopoverOpen, children: [_jsx(Popover.Trigger, { children: _jsxs(IconButton, { color: "gray", "aria-label": "Open options menu", className: "flex h-8 w-8 items-center justify-center rounded-full ", children: [_jsx(Plus, { "aria-hidden": "true" }), _jsx(Text, { className: "sr-only", children: "Add new item" })] }) }), _jsxs(Popover.Content, { className: cn("z-[88] space-y-2", popoverClass), align: "start", onEscapeKeyDown: () => setIsPopoverOpen(false), width: "280px", children: [title && _jsx("h1", { className: "font-medium", children: title }), _jsxs(Command.Root, { className: "bg-transparent", children: [_jsx(Command.Input, { placeholder: placeholder, onKeyDown: handleInputKeyDown }), _jsxs(Command.List, { children: [_jsx(Command.Empty, { children: "No results found." }), _jsx(Command.Group, { children: options.map((option) => {
                                            const isSelected = selectedValues.includes(option.value);
                                            const isDisabled = option.disable;
                                            return (_jsxs(Command.Item, { onSelect: () => !isDisabled && toggleOption(option.value), className: cn("cursor-pointer justify-between rounded-md", isDisabled && "cursor-not-allowed opacity-50 " // Disable styling
                                                ), children: [_jsxs(Flex, { align: "center", gap: "2", children: [option.icon && (_jsx(option.icon, { className: cn(`mr-2 ${iconSize}`, isDisabled ? "text-muted-foreground" : "") })), option.avatar && (_jsx(Avatar, { src: option.avatar, className: "h-8 w-8" })), _jsx(Badge, { color: option.color, variant: "solid", className: "px-3 py-1.5", children: option.label })] }), _jsx(Flex, { justify: "center", align: "center", className: cn("ml-2 h-5 w-5 rounded-sm border border-secondary", isSelected
                                                            ? "bg-secondary text-primary-foreground"
                                                            : "opacity-50 [&_svg]:invisible"), children: !isDisabled && _jsx(CheckIcon, { className: iconSize }) })] }, option.value));
                                        }) }), _jsx(Command.Group, { children: addNewLabel ? (_jsx(_Fragment, { children: isLabelFormOpen ? (_jsxs("form", { ref: formRef, onSubmit: handleAddNewLabel, className: "p-2", children: [_jsx(Input, { name: "labelName", type: "text", placeholder: "Enter label name", className: "mb-3 w-full rounded-md border border-gray-5 bg-gray-1 px-3 py-2", required: true }), _jsxs(Flex, { justify: "between", children: [_jsxs(Popover.Root, { children: [_jsx(Popover.Trigger, { children: _jsx(Button, { variant: "solid", className: "color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12", color: labelColor || "blue" }) }), _jsx(Popover.Content, { alignOffset: -75, width: "190px", className: "z-[888] overflow-hidden bg-white p-3", children: _jsx(ColorPicker, { colorType: "base", onColorSelect: handleColorSelect }) })] }), _jsxs(Flex, { gap: "2", children: [_jsx(Button, { type: "submit", color: "blue", variant: "solid", className: "h-8 rounded-md px-3", children: "Save" }), _jsx(Button, { type: "button", color: "red", variant: "solid", onClick: () => setIsLabelFormOpen?.(false), children: "\u2715" })] })] })] })) : (_jsx(Button, { onClick: () => setIsLabelFormOpen?.(true), className: "h-10 w-full rounded-md bg-blue-500 px-4 text-white", children: "Add new label" })) })) : (_jsx(_Fragment, { children: _jsxs(Flex, { justify: "between", align: "center", className: "font-medium", children: [selectedValues.length > 0 && (_jsx(Command.Item, { onSelect: handleClear, className: "h-10 flex-1 cursor-pointer justify-center ", children: "Clear" })), _jsx(Command.Item, { onSelect: () => setIsPopoverOpen(false), className: "h-10 max-w-full flex-1 cursor-pointer justify-center ", children: "Close" })] }) })) })] })] })] })] }));
});
ComboBox.displayName = "Combobox";
//# sourceMappingURL=combo-box.js.map