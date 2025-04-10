import { type useForm } from "react-hook-form";
import type * as z from "zod";
export default function AutoFormArray({ name, item, form, path, fieldConfig, }: {
    name: string;
    item: z.ZodArray<any>;
    form: ReturnType<typeof useForm>;
    path?: string[];
    fieldConfig?: any;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=array.d.ts.map