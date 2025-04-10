import { type VariantProps } from "class-variance-authority";
import type * as React from "react";
declare const buttonVariants: (props?: ({
    variant?: "link" | "outline" | "ghost" | "default" | "destructive" | "secondary" | null | undefined;
    size?: "sm" | "lg" | "icon" | "default" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Button({ className, variant, size, asChild, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { Button, buttonVariants };
//# sourceMappingURL=button.d.ts.map