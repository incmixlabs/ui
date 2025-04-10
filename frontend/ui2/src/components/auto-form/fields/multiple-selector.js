import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import MultipleSelector from "@/components/multiple-selector/multiple-selector";
import { Form } from "@/components/shadcn/form";
/**
 * Renders a multiple selection form field.
 *
 * This component displays a selector that allows the user to choose multiple options. It pulls available options and styling
 * information from the configuration props, defaulting to "gray" if necessary. The field label is conditionally rendered based
 * on provided configuration, and a validation message placeholder is included.
 *
 * @param props - Properties for configuring the multiple selection field:
 *   - field: An object representing the form field, including its current value and change handler.
 *   - fieldConfigItem: Configuration data for the field, providing input properties such as options, placeholder, CSS class.
 *   - label: The label text to display alongside the field.
 *   - isRequired: A flag indicating whether the field is mandatory.
 *
 * @returns A JSX element containing the complete multiple selection form field.
 */
export default function MultipleSelectorField({ field, fieldConfigItem, label, isRequired, }) {
    // Convert options to the correct format expected by MultipleSelector
    const options = (fieldConfigItem.inputProps?.options ||
        fieldConfigItem.inputProps?.defaultOptions ||
        []).map((option) => ({
        label: option.label,
        value: option.value,
    }));
    return (_jsxs(Form.Item, { children: [fieldConfigItem.inputProps?.showLabel !== false && (_jsxs(Form.Label, { children: [label, " ", isRequired && _jsx("span", { className: "text-destructive", children: "*" })] })), _jsx(Form.Control, { children: _jsx(MultipleSelector, { value: field.value || [], onChange: (options) => field.onChange(options), defaultOptions: options, placeholder: fieldConfigItem.inputProps?.placeholder || "Select options", className: fieldConfigItem.inputProps?.className }) }), _jsx(Form.Message, {})] }));
}
//# sourceMappingURL=multiple-selector.js.map