import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { toggleVariants } from "@/components/shadcn/toggle";
declare function Root({ className, variant, size, children, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>): import("react/jsx-runtime").JSX.Element;
declare function Item({ className, children, variant, size, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>): import("react/jsx-runtime").JSX.Element;
export declare const ToggleGroup: {
    Root: typeof Root;
    Item: typeof Item;
};
export {};
//# sourceMappingURL=toggle-group.d.ts.map