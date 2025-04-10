import type { VariantProps } from "@/lib/cva";
export type SidebarState = "extended" | "minified" | "closed";
type SidebarContext = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};
declare const SidebarContext: import("react").Context<SidebarContext | null>;
declare function useSidebar(): SidebarContext;
declare const SidebarProvider: import("react").ForwardRefExoticComponent<Omit<import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const Sidebar: import("react").ForwardRefExoticComponent<Omit<import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
}, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const SidebarTrigger: import("react").ForwardRefExoticComponent<Omit<import("@radix-ui/themes").ButtonProps & {
    icon?: React.ReactNode;
    srLabel?: string;
    isSecondary?: boolean;
    mobileSidebarTrigger?: boolean;
    variant?: import("@radix-ui/themes").ButtonProps["variant"] | "naked";
} & import("react").RefAttributes<HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
declare const SidebarRail: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
declare const SidebarInset: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const SidebarInput: import("react").ForwardRefExoticComponent<Omit<import("react").ClassAttributes<HTMLInputElement> & import("react").InputHTMLAttributes<HTMLInputElement>, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
declare const SidebarHeader: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const SidebarFooter: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const SidebarSeparator: import("react").ForwardRefExoticComponent<Omit<import("@radix-ui/themes").SeparatorProps & import("react").RefAttributes<HTMLSpanElement>, "ref"> & import("react").RefAttributes<HTMLSpanElement>>;
declare const SidebarContent: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const SidebarGroup: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const SidebarGroupLabel: import("react").ForwardRefExoticComponent<Omit<import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
}, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const SidebarGroupAction: import("react").ForwardRefExoticComponent<Omit<import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
}, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
declare const SidebarGroupContent: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const SidebarMenu: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & import("react").RefAttributes<HTMLUListElement>>;
declare const SidebarMenuItem: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & import("react").RefAttributes<HTMLLIElement>>;
declare const SidebarMenuButton: import("react").ForwardRefExoticComponent<Omit<import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | any;
} & VariantProps<(props?: ({
    variant?: "outline" | "default" | null | undefined;
    size?: "sm" | "lg" | "default" | null | undefined;
} & import("@/lib/cva").ClassProp) | undefined) => string>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
declare const SidebarMenuAction: import("react").ForwardRefExoticComponent<Omit<import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    showOnHover?: boolean;
}, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
declare const SidebarMenuBadge: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const SidebarMenuSkeleton: import("react").ForwardRefExoticComponent<Omit<import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    showIcon?: boolean;
}, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare const SidebarMenuSub: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & import("react").RefAttributes<HTMLUListElement>>;
declare const SidebarMenuSubItem: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & import("react").RefAttributes<HTMLLIElement>>;
declare const SidebarMenuSubButton: import("react").ForwardRefExoticComponent<Omit<import("react").ClassAttributes<HTMLAnchorElement> & import("react").AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
}, "ref"> & import("react").RefAttributes<HTMLAnchorElement>>;
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar, };
//# sourceMappingURL=sidebar.d.ts.map