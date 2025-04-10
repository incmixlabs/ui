import { type ButtonProps as RadixButtonProps } from "@radix-ui/themes";
import React from "react";
export { buttonPropDefs } from "@radix-ui/themes/src/components/button.props.js";
export type ButtonProps = RadixButtonProps & {
    icon?: React.ReactNode;
    srLabel?: string;
    isSecondary?: boolean;
    mobileSidebarTrigger?: boolean;
    variant?: RadixButtonProps["variant"] | "naked";
};
export declare const Button: React.ForwardRefExoticComponent<RadixButtonProps & {
    icon?: React.ReactNode;
    srLabel?: string;
    isSecondary?: boolean;
    mobileSidebarTrigger?: boolean;
    variant?: RadixButtonProps["variant"] | "naked";
} & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=button.d.ts.map