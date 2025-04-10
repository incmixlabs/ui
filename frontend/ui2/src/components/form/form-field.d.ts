import { TextField } from "@radix-ui/themes";
import type { FieldApi } from "@tanstack/react-form";
import type React from "react";
export { TextField };
interface FormFieldProps {
    name: string;
    label: string;
    type?: TextField.RootProps["type"] | "textarea";
    className?: string;
    disabled?: boolean;
    field: FieldApi<any, any, any, any>;
}
export declare const FormButton: React.FC<{
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}>;
export declare const FormField: React.FC<FormFieldProps>;
//# sourceMappingURL=form-field.d.ts.map