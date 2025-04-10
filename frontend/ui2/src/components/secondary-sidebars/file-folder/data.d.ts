import { type LucideIcon } from "lucide-react";
interface SidebarItem {
    id: string;
    name: string;
    children?: SidebarItem[];
}
interface FooterItem {
    icon?: LucideIcon;
    title: string;
    storageAvailable?: number;
}
export declare const secondarySidebarData: SidebarItem[];
export declare const secondaryFooterData: FooterItem[];
export {};
//# sourceMappingURL=data.d.ts.map