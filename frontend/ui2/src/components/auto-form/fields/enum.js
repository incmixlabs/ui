import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "@/components/radixui/select";
import { Form } from "@/components/shadcn";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { getBaseSchema } from "../utils";
export default function AutoFormEnum({ label, isRequired, field, fieldConfigItem, zodItem, fieldProps, }) {
    const baseValues = getBaseSchema(zodItem)._def
        .values;
    let values = [];
    if (!Array.isArray(baseValues)) {
        values = Object.entries(baseValues);
    }
    else {
        values = baseValues.map((value) => [value, value]);
    }
    //
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    function findItem(value) {
        return values.find((item) => item[0] === value);
    }
    return (_jsxs(Form.Item, { className: "flex w-full flex-row items-center justify-start space-x-2", children: [_jsx(AutoFormLabel, { label: label, isRequired: isRequired }), _jsx(Form.Control, { children: _jsxs(Select.Root, { onValueChange: field.onChange, defaultValue: field.value, ...fieldProps, children: [_jsx(Select.Trigger, {}), _jsx(Select.Content, { children: values.map(([value, label]) => (_jsx(Select.Item, { value: label, children: label }, value))) })] }) }), _jsx(AutoFormTooltip, { content: fieldConfigItem.description }), _jsx(Form.Message, {})] }));
}
//# sourceMappingURL=enum.js.map