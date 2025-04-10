import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "@/components/radixui/checkbox";
import { Form } from "@/components/shadcn";
import { cn } from "@/lib/utils";
import AutoFormTooltip from "../common/tooltip";
export default function AutoFormCheckbox({ label, isRequired, field, fieldConfigItem, fieldProps, className, }) {
    return (_jsxs("div", { className: "flex flex-row items-center space-x-2", children: [_jsxs(Form.Item, { className: "flex w-full flex-row items-center justify-start", children: [_jsxs(Form.Label, { className: "mt-3 w-[117px]", children: [label, isRequired && _jsx("span", { className: "text-destructive", children: " *" })] }), _jsx(Form.Control, { children: _jsx(Checkbox, { className: cn("data-[state=checked]:bg-zinc-500 data-[state=checked]:text-white", className), checked: field.value, onCheckedChange: field.onChange, ...fieldProps }) })] }), _jsx(AutoFormTooltip, { content: fieldConfigItem.description })] }));
}
//# sourceMappingURL=checkbox.js.map