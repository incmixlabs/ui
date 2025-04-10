import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from "@/components/shadcn";
import { cn } from "@/lib/utils";
const sizeStyles = {
    sm: "min-h-[40px] text-sm px-3",
    md: "min-h-[48px] text-base px-4",
    lg: "min-h-[56px] text-lg px-5",
};
const getLayoutClass = (layout, gridCols = 2) => {
    const baseClasses = "gap-2";
    switch (layout) {
        case "grid":
            return cn(baseClasses, gridCols === 2
                ? "grid grid-cols-1 sm:grid-cols-2"
                : gridCols === 3
                    ? "grid grid-cols-1 sm:grid-cols-3"
                    : gridCols === 4
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                        : "grid grid-cols-1 sm:grid-cols-2");
        case "row":
            return cn(baseClasses, "flex flex-row flex-wrap");
        case "column":
            return cn(baseClasses, "flex flex-col");
        default:
            return cn(baseClasses, "grid grid-cols-1 sm:grid-cols-2");
    }
};
const getOptionWidthClass = (layout) => {
    switch (layout) {
        case "grid":
            return "w-full";
        case "row":
            return "flex-grow-0";
        case "column":
            return "w-full";
        default:
            return "w-full";
    }
};
export default function AutoFormMCQ({ label, isRequired, field, fieldConfigItem,
// fieldProps,
 }) {
    const options = (fieldConfigItem.inputProps?.options || []);
    const layout = (fieldConfigItem.inputProps?.layout || "grid");
    const gridCols = fieldConfigItem.inputProps?.gridCols || 2;
    const optionSize = (fieldConfigItem.inputProps?.optionSize ||
        "md");
    return (_jsx("div", { className: "flex w-full flex-col space-y-4", children: _jsxs(Form.Item, { className: "w-full", children: [_jsxs("div", { className: "mb-4", children: [_jsxs(Form.Label, { className: "font-medium text-gray-800 text-xl", children: [label, isRequired && _jsx("span", { className: "text-destructive", children: " *" })] }), fieldConfigItem.description && (_jsx("p", { className: "mt-1 text-muted-foreground text-sm", children: fieldConfigItem.description }))] }), _jsx(Form.Control, { children: _jsx("div", { className: getLayoutClass(layout, gridCols), role: "radiogroup", "aria-required": isRequired ? "true" : "false", children: options.map((option) => (_jsx(Form.Item, { className: getOptionWidthClass(layout), children: _jsx(Form.Control, { children: _jsxs("label", { children: [_jsx("input", { type: "radio", className: "peer sr-only", value: option.value, onChange: (e) => field.onChange(e.target.value), checked: field.value === option.value, required: isRequired }), _jsx("div", { className: cn("flex items-center justify-center rounded-lg border-2 border-gray-200", "cursor-pointer transition-all duration-200", "hover:border-blue-100 hover:bg-blue-50", "peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white", "focus-within:ring-2 focus-within:ring-blue-500", // Add focus state
                                            "font-medium text-gray-600", sizeStyles[optionSize], layout === "row" && "min-w-[120px]"), children: option.label })] }) }) }, option.value))) }) }), _jsx(Form.Message, {})] }) }));
}
//# sourceMappingURL=mcq.js.map