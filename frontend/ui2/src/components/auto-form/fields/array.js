import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion } from "@/components/shadcn/accordion";
import { Button, Separator } from "@/components/radixui";
import { Plus, Trash } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { beautifyObjectName } from "../utils";
import AutoFormObject from "./object";
export default function AutoFormArray({ name, item, form, path = [], fieldConfig, }) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name,
    });
    const title = item._def.description ?? beautifyObjectName(name);
    return (_jsxs(Accordion.Item, { value: name, className: "border-none", children: [_jsx(Accordion.Trigger, { children: title }), _jsxs(Accordion.Content, { children: [fields.map((_field, index) => {
                        const key = [...path, index.toString()].join(".");
                        return (_jsxs("div", { className: "mt-4 flex flex-col", children: [_jsx(AutoFormObject, { schema: item._def.type, form: form, fieldConfig: fieldConfig, path: [...path, index.toString()] }), _jsx("div", { className: "my-4 flex justify-end", children: _jsx(Button
                                    // variant="secondary"
                                    // size="icon"
                                    , { 
                                        // variant="secondary"
                                        // size="icon"
                                        type: "button", className: "hover:bg-zinc-300 hover:text-black focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-white dark:text-black dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0 dark:hover:bg-zinc-300 dark:hover:text-black dark:hover:ring-0 dark:hover:ring-offset-0", onClick: () => remove(index), children: _jsx(Trash, { className: "size-4 " }) }) }), _jsx(Separator, {})] }, `${key}`));
                    }), _jsxs(Button, { type: "button", 
                        // variant="secondary"
                        onClick: () => append({}), className: "mt-4 flex items-center", children: [_jsx(Plus, { className: "mr-2", size: 16 }), "Add"] })] })] }));
}
//# sourceMappingURL=array.js.map