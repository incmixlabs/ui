import type { LucideIcon } from "lucide-react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import type * as z from "zod";
import type { INPUT_COMPONENTS } from "./config";
import type { FieldGroupLayout } from "./fields/field-group";
export type MCQOption = {
    label: string;
    value: string;
};
export type MCQLayoutType = "grid" | "row" | "column";
export type MCQSizeType = "sm" | "md" | "lg";
export type MultipleSelectorOption = {
    label: string;
    value: string;
};
export type FieldGroupConfig = {
    fields: string[];
    layout: FieldGroupLayout;
    columns?: number;
    gap?: number;
    className?: string;
};
export type FieldConfigItem = {
    description?: React.ReactNode | string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
        showLabel?: boolean;
        options?: MCQOption[];
        layout?: MCQLayoutType;
        gridCols?: number;
        optionSize?: MCQSizeType;
        required?: boolean;
        minRequired?: number;
        icon?: LucideIcon;
        iconName?: string;
        defaultOptions?: MultipleSelectorOption[];
        defaultColor?: string;
        multipleSelectorOptions?: MultipleSelectorOption[];
        columnSpan?: number;
        rowSpan?: number;
        fullWidth?: boolean;
    };
    fieldType?: keyof typeof INPUT_COMPONENTS | React.FC<AutoFormInputComponentProps>;
    renderParent?: (props: {
        children: React.ReactNode;
    }) => React.ReactElement | null;
};
export type FieldConfig<SchemaType extends z.infer<z.ZodObject<any, any>>> = {
    [Key in keyof SchemaType]?: SchemaType[Key] extends object ? FieldConfig<z.infer<SchemaType[Key]>> : FieldConfigItem;
} & {
    fieldGroups?: FieldGroupConfig[];
};
export type AutoFormInputComponentProps = {
    zodInputProps: React.InputHTMLAttributes<HTMLInputElement>;
    field: ControllerRenderProps<FieldValues, any>;
    fieldConfigItem: FieldConfigItem;
    label: string;
    isRequired: boolean;
    fieldProps: any;
    zodItem: z.ZodAny;
    className?: string;
};
//# sourceMappingURL=types.d.ts.map