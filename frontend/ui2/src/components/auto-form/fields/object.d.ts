import { type useForm } from "react-hook-form";
import type * as z from "zod";
import type { FieldConfig } from "../types";
/**
 * Renders a dynamic form based on the provided Zod schema.
 *
 * This component builds a form by iterating over the schema's fields, grouping them when specified by the field configuration,
 * and applying dependency rules to conditionally disable or hide fields. It leverages React Hook Form to monitor field values
 * via the watch function and automatically coerces number inputs when applicable. If the schema or its underlying shape is invalid,
 * the component returns null.
 *
 * @param schema - A Zod schema or ZodEffects wrapper that defines the form's structure and validation.
 * @param fieldConfig - (Optional) Customization settings for rendering fields, including grouping configurations.
 * @param path - (Optional) Array representing the nested key path for generating unique field identifiers (default: empty array).
 * @param dependencies - (Optional) Mapping of dependency rules that control field behavior, such as disabling or hiding fields based on other field values.
 * @returns An Accordion component containing the dynamically rendered form fields, or null if the schema is not valid.
 */
export default function AutoFormObject<SchemaType extends z.ZodObject<any, any>>({ schema, form, fieldConfig, path, dependencies, }: {
    schema: SchemaType | z.ZodEffects<SchemaType>;
    form: ReturnType<typeof useForm>;
    fieldConfig?: FieldConfig<z.infer<SchemaType>>;
    path?: string[];
    dependencies?: Record<string, {
        field: string;
        type: "setOptions" | "disabled" | "required" | "hidden";
        condition: {
            value: any;
        };
        options?: any;
    }>;
}): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=object.d.ts.map