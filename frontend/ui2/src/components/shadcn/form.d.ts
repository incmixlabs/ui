import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import("react-hook-form").FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare function FormItem({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function FormControl({ ...props }: React.ComponentProps<typeof Slot>): import("react/jsx-runtime").JSX.Element;
declare function FormDescription({ className, ...props }: React.ComponentProps<"p">): import("react/jsx-runtime").JSX.Element;
declare function FormMessage({ className, ...props }: React.ComponentProps<"p">): import("react/jsx-runtime").JSX.Element | null;
export { useFormField };
export declare const Form: {
    Root: <TFieldValues extends FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>(props: import("react-hook-form").FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;
    Item: typeof FormItem;
    Label: typeof FormLabel;
    Control: typeof FormControl;
    Description: typeof FormDescription;
    Message: typeof FormMessage;
    Field: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=form.d.ts.map