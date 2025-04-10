import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ReactElement } from "react";
export type AccordionItems = {
    open?: boolean;
    value?: string;
    label: string;
    content?: string;
};
export type AccordionProps = {
    type?: "single" | "multiple";
    items: AccordionItems[];
    icon?: ReactElement;
    className?: string;
    triggerClassName?: string;
};
export declare const AccordionWrapper: ({ type, items, }: AccordionProps) => import("react/jsx-runtime").JSX.Element;
import type * as React from "react";
declare function Root({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function Item({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function Trigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function Content({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export declare const Accordion: {
    Root: typeof Root;
    Trigger: typeof Trigger;
    Item: typeof Item;
    Content: typeof Content;
};
export {};
//# sourceMappingURL=accordion.d.ts.map