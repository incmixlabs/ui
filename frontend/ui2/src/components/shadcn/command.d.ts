import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";
import { Dialog } from "@/components/radixui/dialog";
declare function CommandRoot({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>): import("react/jsx-runtime").JSX.Element;
declare function CommandDialog({ title, description, children, ...props }: React.ComponentProps<typeof Dialog.Root> & {
    title?: string;
    description?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>): import("react/jsx-runtime").JSX.Element;
declare function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>): import("react/jsx-runtime").JSX.Element;
declare function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>): import("react/jsx-runtime").JSX.Element;
declare function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
declare function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function CommandShortcut({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export declare const Command: {
    Root: typeof CommandRoot;
    Dialog: typeof CommandDialog;
    Input: typeof CommandInput;
    List: typeof CommandList;
    Empty: typeof CommandEmpty;
    Group: typeof CommandGroup;
    Item: typeof CommandItem;
    Shortcut: typeof CommandShortcut;
    Separator: typeof CommandSeparator;
};
export {};
//# sourceMappingURL=command.d.ts.map