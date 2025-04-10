import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import type * as React from "react";
declare function Root({ className, children, viewport, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function List({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>): import("react/jsx-runtime").JSX.Element;
declare function Item({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function Trigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function Content({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare function Viewport({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>): import("react/jsx-runtime").JSX.Element;
declare function Link({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>): import("react/jsx-runtime").JSX.Element;
declare function Indicator({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>): import("react/jsx-runtime").JSX.Element;
export declare const navigationMenu: {
    Root: typeof Root;
    List: typeof List;
    Item: typeof Item;
    Content: typeof Content;
    Trigger: typeof Trigger;
    Link: typeof Link;
    Indicator: typeof Indicator;
    Viewport: typeof Viewport;
    TriggerStyle: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
};
export {};
//# sourceMappingURL=navigation-menu.d.ts.map