import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Card, Checkbox, ColorPicker, Flex, Heading, Input, Popover, Select, Text, iconSize, } from "@/components";
import { KanbanImages } from "@/components/kanban-board/images";
import { useState } from "react";
export const themeData = [
    {
        value: "dark",
        label: "Dark",
        avatarSrc: KanbanImages.user1,
    },
    {
        value: "light",
        label: "Light",
        avatarSrc: KanbanImages.user2,
    },
];
const resolveColorVariable = (colorVar) => {
    if (colorVar.startsWith("var(")) {
        const variableName = colorVar.match(/var\((--[^)]+)\)/)?.[1];
        if (variableName && typeof document !== "undefined") {
            return getComputedStyle(document.documentElement)
                .getPropertyValue(variableName)
                .trim();
        }
    }
    return colorVar;
};
export function PropertySheet() {
    const [color, setColor] = useState("#f76b15");
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(480);
    const [dataUrl, setDataUrl] = useState("https://incmixlabs.com/data");
    const [propertyType, setPropertyType] = useState("json");
    const [position, setPosition] = useState("right");
    const [theme, setTheme] = useState("dark");
    const handleColorChange = (newColor) => {
        const resolvedColor = resolveColorVariable(newColor.hex);
        setColor(resolvedColor);
    };
    return (_jsxs(Card.Root, { className: "w-96 rounded-none p-0 ", children: [_jsxs(Box, { children: [_jsx(Heading, { as: "h2", className: "bg-gray-2 p-2 font-medium", children: "Layout" }), _jsxs(Box, { className: "border-gray-4 border-y", children: [_jsxs(Flex, { align: "center", className: "border-gray-4 border-b", children: [_jsx(Text, { className: "w-44 border-gray-4 border-r py-2 pl-3", children: "Width" }), _jsx(Box, { className: "w-full ", children: _jsx(Input, { placeholder: "200", type: "number", min: "0", className: "rounded-none border-none", value: width, onChange: (e) => setWidth(Number(e.target.value)) }) })] }), _jsxs(Flex, { align: "center", children: [_jsx(Text, { className: "w-44 border-gray-4 border-r py-2 pl-3", children: "Height" }), _jsx(Box, { className: "w-full ", children: _jsx(Input, { placeholder: "480", type: "number", min: "0", className: "rounded-none border-none", value: height, onChange: (e) => setHeight(Number(e.target.value)) }) })] })] })] }), _jsxs(Box, { children: [_jsx(Heading, { as: "h2", className: "bg-gray-2 p-2 font-medium", children: "Data loading" }), _jsxs(Box, { className: "border-gray-4 border-y", children: [_jsxs(Flex, { align: "center", className: "border-gray-4 border-b", children: [_jsx(Text, { className: "w-44 border-gray-4 border-r py-2 pl-3", children: "Data url" }), _jsx(Box, { className: "w-full ", children: _jsx(Input, { placeholder: "Data URL", className: "rounded-none border-none", value: dataUrl, onChange: (e) => setDataUrl(e.target.value) }) })] }), _jsxs(Flex, { align: "center", className: "border-gray-4 border-b", children: [_jsx(Text, { className: "w-44 border-gray-4 border-r py-2 pl-3", children: "Type" }), _jsx(Box, { className: "w-full", children: _jsxs(Select.Root, { value: propertyType, defaultValue: propertyType, onValueChange: (value) => setPropertyType(value), children: [_jsx(Select.Trigger, {}), _jsxs(Select.Content, { children: [_jsx(Select.Item, { value: "json", children: "json" }), _jsx(Select.Item, { value: "xml", children: "xml" }), _jsx(Select.Item, { value: "csv", children: "csv" })] })] }) })] }), _jsxs(Flex, { align: "center", children: [_jsx(Text, { className: "w-44 border-gray-4 border-r p-2 px-3", children: "Use JSONP" }), _jsx(Box, { className: "w-full p-2 px-3", children: _jsxs(Flex, { align: "center", gap: "1", children: [_jsx(Checkbox, { id: "jsonp-checkbox" }), _jsx("label", { htmlFor: "jsonp-checkbox", className: "sr-only text-sm", children: "Enable JSONP" })] }) })] })] })] }), _jsxs(Box, { children: [_jsx(Heading, { as: "h2", className: "bg-gray-2 p-2 font-medium", children: "Styling" }), _jsxs(Box, { className: "border-gray-4 border-y", children: [_jsxs(Flex, { align: "center", className: "border-gray-4 border-b", children: [_jsx(Text, { className: "w-44 border-gray-4 border-r py-2 pl-3", children: "Position" }), _jsx(Box, { className: "w-full", children: _jsxs(Select.Root, { defaultValue: position, value: position, onValueChange: (value) => setPosition(value), children: [_jsx(Select.Trigger, {}), _jsxs(Select.Content, { children: [_jsx(Select.Item, { value: "left", children: "left" }), _jsx(Select.Item, { value: "right", children: "right" }), _jsx(Select.Item, { value: "top", children: "top" }), _jsx(Select.Item, { value: "bottom", children: "bottom" })] })] }) })] }), _jsxs(Flex, { align: "center", children: [_jsx(Text, { className: "w-44 border-gray-4 border-r py-2 pl-3", children: "Theme" }), _jsx(Box, { className: "relative w-full", children: _jsxs(Select.Root, { defaultValue: theme, value: theme, onValueChange: (value) => setTheme(value), children: [_jsx(Select.Trigger, {}), _jsxs(Select.Content, { children: [_jsx(Select.Item, { value: "dark", children: "dark" }), _jsx(Select.Item, { value: "light", children: "light" })] })] }) })] })] })] }), _jsx(Box, { className: "rounded-b bg-gray-2 ", children: _jsxs(Flex, { align: "center", className: "border-gray-4 border-b", children: [_jsx(Text, { className: "w-44 border-gray-4 border-r p-2 px-3", children: "Main Color" }), _jsxs(Flex, { className: "w-full p-2 px-3 ", justify: "between", align: "center", children: [_jsx(Input, { type: "text", value: color, className: "w-24", onChange: (e) => setColor(e.target.value) }), _jsxs(Popover.Root, { children: [_jsx(Popover.Trigger, { children: _jsx(Button, { variant: "soft", className: `color-swatch ${iconSize} cursor-pointer rounded-sm border border-gray-4`, style: { backgroundColor: color }, "aria-label": "Open color picker" }) }), _jsx(Popover.Content, { alignOffset: -125, width: "320px", className: "overflow-hidden p-0", children: _jsx(Box, { className: "w-full", children: _jsx(ColorPicker, { onColorSelect: handleColorChange }) }) })] })] })] }) })] }));
}
//# sourceMappingURL=index.js.map