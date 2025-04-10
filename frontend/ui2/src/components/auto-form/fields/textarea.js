import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TextArea } from "@/components/radixui/textarea";
import { Form } from "@/components/shadcn/form";
import AutoFormLabel from "../common/label";
/**
 * Renders a styled textarea input field with an optional label and error message for forms.
 *
 * The component displays a label above the textarea when enabled via the fieldProps value,
 * defaulting to visible if not specified. The textarea uses a provided placeholder or defaults to a prompt based on the label.
 *
 * @param label - The text used for the textarea label.
 * @param isRequired - Determines if the field is marked as required.
 * @param fieldProps - Additional properties for the textarea. This can include a flag "showLabel" to control whether the label is rendered and a "placeholder" for input guidance.
 *
 * @returns A JSX element representing the textarea input field with its associated label and error message.
 */
export default function AutoFormTextarea({ label, isRequired, fieldProps, }) {
    const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
    const showLabel = _showLabel === undefined ? true : _showLabel;
    return (_jsxs(Form.Item, { className: "flex w-full flex-col space-y-2", children: [showLabel && (_jsx("div", { className: "mb-1", children: _jsx(AutoFormLabel, { label: label, isRequired: isRequired, className: "w-auto font-medium text-base" }) })), _jsx(Form.Control, { children: _jsx(TextArea, { className: " w-full resize-none rounded-md border-0 bg-zinc-950 text-white focus-visible:ring-0 focus-visible:ring-offset-0", placeholder: fieldPropsWithoutShowLabel?.placeholder ||
                        `Enter ${label.toLowerCase()}`, ...fieldPropsWithoutShowLabel }) }), _jsx("div", { children: _jsx(Form.Message, { className: "block max-w-full whitespace-normal break-words text-red-500 text-sm" }) })] }));
}
//# sourceMappingURL=textarea.js.map