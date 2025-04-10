import * as MenubarPrimitive from "@radix-ui/react-menubar";
import type * as React from "react";
declare function Root({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function Menu({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>): import("react/jsx-runtime").JSX.Element;
declare function Group({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
declare function Portal({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
declare function RadioGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>): import("react/jsx-runtime").JSX.Element;
declare function Trigger({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function Content({ className, align, alignOffset, sideOffset, ...props }: React.ComponentProps<typeof MenubarPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare function Item({ className, inset, variant, ...props }: React.ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): import("react/jsx-runtime").JSX.Element;
declare function CheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>): import("react/jsx-runtime").JSX.Element;
declare function RadioItem({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>): import("react/jsx-runtime").JSX.Element;
declare function Label({ className, inset, ...props }: React.ComponentProps<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function Separator({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare function Shortcut({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
declare function Sub({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>): import("react/jsx-runtime").JSX.Element;
declare function SubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function SubContent({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubContent>): import("react/jsx-runtime").JSX.Element;
export declare const Menubar: {
    Root: typeof Root;
    Portal: typeof Portal;
    Menu: typeof Menu;
    Trigger: typeof Trigger;
    Content: typeof Content;
    Group: typeof Group;
    Separator: typeof Separator;
    Label: typeof Label;
    Item: typeof Item;
    Shortcut: typeof Shortcut;
    CheckboxItem: typeof CheckboxItem;
    RadioGroup: typeof RadioGroup;
    RadioItem: typeof RadioItem;
    Sub: typeof Sub;
    SubTrigger: typeof SubTrigger;
    SubContent: typeof SubContent;
};
export {};
//# sourceMappingURL=menubar.d.ts.map