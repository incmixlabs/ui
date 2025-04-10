import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from "@/components/shadcn";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
const getLayoutClass = (layout, gridCols = 2) => {
    const baseClasses = "gap-3";
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
            return "flex-grow-0 mr-6";
        case "column":
            return "w-full";
        default:
            return "w-full";
    }
};
export default function AutoFormMultiCheckbox({ label, isRequired, field, fieldConfigItem, }) {
    const options = (fieldConfigItem.inputProps?.options || []);
    const layout = (fieldConfigItem.inputProps?.layout || "grid");
    const gridCols = fieldConfigItem.inputProps?.gridCols || 2;
    // Initialize field.value as an array if it's undefined or null
    useEffect(() => {
        if (!field.value) {
            field.onChange([]);
        }
    }, [field]);
    // Handler for checkbox changes
    const handleCheckboxChange = (value, checked) => {
        const currentValues = Array.isArray(field.value) ? [...field.value] : [];
        if (checked) {
            // Add value if checked
            if (!currentValues.includes(value)) {
                field.onChange([...currentValues, value]);
            }
        }
        else {
            // Remove value if unchecked
            field.onChange(currentValues.filter((v) => v !== value));
        }
    };
    // Check if a value is selected
    const isValueSelected = (value) => {
        return Array.isArray(field.value) && field.value.includes(value);
    };
    // Validate if at least one option is selected (if required)
    const hasSelection = Array.isArray(field.value) && field.value.length > 0;
    // Track if the field has been touched to delay validation until interaction
    const [touched, setTouched] = useState(false);
    // Set touched when user interacts with any checkbox
    const handleTouch = () => {
        if (!touched) {
            setTouched(true);
        }
    };
    return (_jsx("div", { className: "flex w-full flex-col space-y-4", children: _jsx(Form.Item, { className: "w-full", children: _jsxs("fieldset", { className: "space-y-4", children: [_jsxs("legend", { className: "mb-4", children: [_jsxs(Form.Label, { className: "font-medium text-gray-800 text-xl", children: [label, isRequired && _jsx("span", { className: "text-destructive", children: " *" })] }), fieldConfigItem.description && (_jsx("p", { className: "mt-1 text-muted-foreground text-sm", children: fieldConfigItem.description }))] }), _jsx(Form.Control, { children: _jsx("div", { className: getLayoutClass(layout, gridCols), "aria-required": isRequired ? "true" : "false", children: options.map((option) => (_jsx(Form.Item, { className: cn(getOptionWidthClass(layout), "flex items-center space-x-2"), children: _jsx(Form.Control, { children: _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", id: `checkbox-${option.value}`, className: " h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500", value: option.value, onChange: (e) => {
                                                    handleCheckboxChange(option.value, e.target.checked);
                                                    handleTouch();
                                                }, checked: isValueSelected(option.value) }), _jsx("label", { htmlFor: `checkbox-${option.value}`, className: "ml-2 font-medium text-gray-700 text-sm", children: option.label })] }) }) }, option.value))) }) }), isRequired && !hasSelection && touched && (_jsx("p", { className: "mt-2 font-medium text-destructive text-sm", children: "Please select at least one option" })), _jsx(Form.Message, {})] }) }) }));
}
//# sourceMappingURL=multi-checkbox.js.map