import * as React from "react";
import { type VariantProps } from "@/lib/cva";
type SidebarContext = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    secondaryOpen: boolean;
    setSecondaryOpen: (open: boolean) => void;
    isMobile: boolean;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    toggleSidebar: () => void;
    toggleSecondarySidebar: () => void;
};
declare const SidebarContext: React.Context<SidebarContext | null>;
declare function useSidebar(): SidebarContext;
declare const SidebarProvider: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultSecondaryOpen?: boolean;
    secondaryOpen?: boolean;
    onSecondaryOpenChange?: (open: boolean) => void;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const Sidebar: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
    isDefaultMobile?: boolean;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarTrigger: React.ForwardRefExoticComponent<Omit<import("@radix-ui/themes").ButtonProps & {
    icon?: React.ReactNode;
    srLabel?: string;
    isSecondary?: boolean;
    mobileSidebarTrigger?: boolean;
    variant?: import("@radix-ui/themes").ButtonProps["variant"] | "naked";
} & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SidebarRail: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SidebarInset: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarInput: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>, "ref"> & React.RefAttributes<HTMLInputElement>>;
declare const SidebarHeader: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarFooter: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarSeparator: React.ForwardRefExoticComponent<Omit<import("@radix-ui/themes").SeparatorProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare const SidebarContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarGroup: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarGroupLabel: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarHeaderLabel: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarGroupAction: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
}, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SidebarGroupContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarMenu: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
declare const SidebarMenuItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
declare const SidebarMenuButton: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    isActive?: boolean;
    isSelected?: boolean;
    isSubMenuSelected?: boolean;
    tooltip?: string | any;
} & VariantProps<(props?: ({
    variant?: "outline" | "default" | null | undefined;
    size?: "sm" | "lg" | "default" | null | undefined;
} & import("@/lib/cva").ClassProp) | undefined) => string>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SidebarMenuAction: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    showOnHover?: boolean;
}, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SidebarMenuBadge: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarMenuSkeleton: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    showIcon?: boolean;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SidebarMenuSub: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
declare const SidebarMenuSubItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
declare const SidebarMenuSubButton: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
    isSelected?: boolean;
}, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarHeaderLabel, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar, };
//# sourceMappingURL=sidebar.d.ts.map