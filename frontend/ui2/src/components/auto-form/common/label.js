import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Form } from "@/components/shadcn";
import { cn } from "@/lib/utils";
/**
 * Renders a form label with an optional required indicator.
 *
 * Displays the given label text inside a styled FormLabel. When the "isRequired" flag is true,
 * an asterisk is appended to indicate that the associated form field is mandatory. Additional
 * CSS classes can be applied via the "className" prop.
 *
 * @param label - The text to display as the label.
 * @param isRequired - Indicates if a required marker should be shown.
 * @param className - Optional additional CSS classes for custom styling.
 *
 * @example
 * <AutoFormLabel label="Username" isRequired className="custom-class" />
 */
function AutoFormLabel({ label, isRequired, className, }) {
    return (_jsx(_Fragment, { children: _jsxs(Form.Label, { className: cn("mt-2 w-[140px] space-y-0", className), children: [label, isRequired && _jsx("span", { className: "text-destructive", children: " *" })] }) }));
}
export default AutoFormLabel;
//# sourceMappingURL=label.js.map