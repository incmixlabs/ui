import type { z } from "zod";
import type { FieldConfig } from "./types";
import { type ZodObjectOrWrapped } from "./utils";
export declare function AutoFormSubmit({ children, className, }: {
    children?: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function AutoForm<SchemaType extends ZodObjectOrWrapped>({ formSchema, values: valuesProp, onValuesChange: onValuesChangeProp, onParsedValuesChange, onSubmit: onSubmitProp, fieldConfig, children, className, dependencies, }: {
    formSchema: SchemaType;
    values?: Partial<z.infer<SchemaType>>;
    onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
    onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
    onSubmit?: (values: z.infer<SchemaType>) => void;
    fieldConfig?: FieldConfig<z.infer<SchemaType>>;
    children?: React.ReactNode;
    className?: string;
    dependencies?: Record<string, {
        field: string;
        type: "setOptions" | "disabled" | "required" | "hidden";
        condition: {
            value: any;
        };
        options?: any;
    }>;
}): import("react/jsx-runtime").JSX.Element;
export default AutoForm;
//# sourceMappingURL=index.d.ts.map