import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroup } from "@/components/radixui";
import { Form } from "@/components/shadcn/form";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { getBaseSchema } from "../utils";
export default function AutoFormRadioGroup({ label, isRequired, field, zodItem, fieldProps, fieldConfigItem, }) {
    const baseValues = getBaseSchema(zodItem)._def
        .values;
    let values = [];
    if (!Array.isArray(baseValues)) {
        values = Object.entries(baseValues).map((item) => item[0]);
    }
    else {
        values = baseValues;
    }
    return (_jsxs("div", { className: "flex flex-row items-center space-x-2", children: [_jsxs(Form.Item, { className: "flex w-full flex-row items-center justify-start", children: [_jsx(AutoFormLabel, { label: label, isRequired: isRequired }), _jsx(Form.Control, { children: _jsx(RadioGroup.Root, { onValueChange: field.onChange, defaultValue: field.value, className: "flex h-10 w-full flex-row items-center space-x-1 rounded-md border p-2 text-black focus-visible:ring-0 focus-visible:ring-offset-0", ...fieldProps, children: values?.map((value) => (_jsxs(Form.Item, { className: "flex items-center space-x-3 space-y-0", children: [_jsx(Form.Control, { children: _jsx(RadioGroup.Item, { value: value }) }), _jsx(Form.Label, { className: "font-normal", children: value })] }, value))) }) }), _jsx(Form.Message, {})] }), _jsx(AutoFormTooltip, { content: fieldConfigItem.description })] }));
}
//# sourceMappingURL=radio-group.js.map