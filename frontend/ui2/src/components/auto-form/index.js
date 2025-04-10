import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@/components/shadcn/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/radixui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import AutoFormObject from "./fields/object";
import { getDefaultValues, getObjectFormSchema, } from "./utils";
export function AutoFormSubmit({ children, className, }) {
    return (_jsx(Button, { type: "submit", className: className, children: children ?? "Submit" }));
}
function AutoForm({ formSchema, values: valuesProp, onValuesChange: onValuesChangeProp, onParsedValuesChange, onSubmit: onSubmitProp, fieldConfig, children, className, dependencies, }) {
    const objectFormSchema = getObjectFormSchema(formSchema);
    const defaultValues = getDefaultValues(objectFormSchema);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues ?? undefined,
        values: valuesProp,
        mode: "onSubmit", // changed from default "onChange" to "onSubmit"
    });
    function onSubmit(values) {
        const parsedValues = formSchema.safeParse(values);
        if (parsedValues.success) {
            onSubmitProp?.(parsedValues.data);
        }
    }
    return (_jsx("div", { className: "w-full", children: _jsx(Form.Root, { ...form, children: _jsxs("form", { noValidate // Add noValidate to disable browser validation
                : true, onSubmit: (e) => {
                    form.handleSubmit(onSubmit)(e);
                }, onChange: () => {
                    const values = form.getValues();
                    onValuesChangeProp?.(values);
                    const parsedValues = formSchema.safeParse(values);
                    if (parsedValues.success) {
                        onParsedValuesChange?.(parsedValues.data);
                    }
                }, className: cn("space-y-5", className), children: [_jsx(AutoFormObject, { schema: objectFormSchema, form: form, dependencies: dependencies, fieldConfig: fieldConfig }), children] }) }) }));
}
export default AutoForm;
//# sourceMappingURL=index.js.map