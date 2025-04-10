import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input } from "@/components/shadcn";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import { useFormContext } from "react-hook-form";
import AutoFormLabel from "../common/label";
/**
 * Renders an input field with an optional label, icon, and integrated error messaging. For password fields, it includes a toggle button to show or hide the input.
 *
 * The component integrates with form context to display validation errors and applies styling based on configuration, including dynamic adjustments if an icon is present.
 *
 * @param label - The text label for the input.
 * @param isRequired - Flag indicating whether the input is required.
 * @param field - The form field object used for form binding.
 * @param fieldProps - Additional properties for configuring the input, such as the placeholder text, input type, and optional icon.
 */
export default function AutoFormInput({ label, isRequired, field, 
// fieldConfigItem,
fieldProps, }) {
    // Extract props we don't want to pass directly to Input
    const { showLabel: _showLabel, icon, type: fieldType, ...restFieldProps } = fieldProps;
    const showLabel = _showLabel === undefined ? true : _showLabel;
    const type = fieldType || "text";
    // Create a separate state for the input type itself
    const [inputType, setInputType] = useState(type);
    // Set initial input type on mount
    useEffect(() => {
        setInputType(type);
    }, [type]);
    // Access form context to check for errors
    const formContext = useFormContext();
    const fieldName = field.name;
    const hasError = Boolean(formContext?.formState?.errors?.[fieldName]);
    // Toggle password visibility with a direct type change
    const togglePasswordVisibility = () => {
        setInputType((prevType) => prevType === "password" ? "text" : "password");
    };
    // Get the appropriate icon component
    const getInputIcon = () => {
        if (icon && React.isValidElement(React.createElement(icon))) {
            const IconComponent = icon;
            return _jsx(IconComponent, { className: "h-5 w-5 text-gray-400" });
        }
        return null;
    };
    return (_jsxs(Form.Item, { className: " flex w-full flex-col", children: [showLabel && (_jsx("div", { className: "mb-1", children: _jsx(AutoFormLabel, { label: label, isRequired: isRequired, className: "w-auto font-medium text-base" }) })), _jsxs("div", { className: "relative", children: [icon && (_jsx("div", { className: "-translate-y-1/2 absolute top-1/2 left-3", children: getInputIcon() })), _jsx(Form.Control, { children: _jsx(Input, { ...restFieldProps, type: inputType, className: `h-10 w-full rounded-md border-0 bg-zinc-950 text-white ${icon ? "pl-10" : "px-4"}
              ${type === "password" ? "pr-10" : ""}
              ${hasError ? "border border-red-500" : ""}focus-visible:ring-0 focus-visible:ring-offset-0`, placeholder: restFieldProps.placeholder || `Enter ${label.toLowerCase()}` }) }), type === "password" && (_jsx("button", { type: "button", onClick: togglePasswordVisibility, className: "-translate-y-1/2 absolute top-1/2 right-3", tabIndex: -1, "aria-label": inputType === "password" ? "Show password" : "Hide password", children: inputType === "password" ? (_jsx(Eye, { className: "h-5 w-5 text-gray-400" })) : (_jsx(EyeOff, { className: "h-5 w-5 text-gray-400" })) }))] }), _jsx("div", { children: _jsx(Form.Message, { className: "block max-w-full whitespace-normal break-words text-red-500 text-sm" }) })] }));
}
//# sourceMappingURL=input.js.map