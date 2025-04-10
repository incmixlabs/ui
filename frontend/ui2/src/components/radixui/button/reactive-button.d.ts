import type { ButtonProps } from "@radix-ui/themes";
import React from "react";
export type ReactiveButtonProps = ButtonProps & {
    loading?: boolean;
    success?: boolean;
    spinnerClassName?: string;
    successIconClassName?: string;
};
export declare const ReactiveButton: React.ForwardRefExoticComponent<ButtonProps & {
    loading?: boolean;
    success?: boolean;
    spinnerClassName?: string;
    successIconClassName?: string;
} & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=reactive-button.d.ts.map