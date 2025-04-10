import type { colorPropDef } from "@/lib/utils/colors";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";
type ColorProp = (typeof colorPropDef)["color"]["values"][number];
export { dropdownMenuContentPropDefs, dropdownMenuItemPropDefs, dropdownMenuCheckboxItemPropDefs, dropdownMenuRadioItemPropDefs, } from "@radix-ui/themes/src/components/dropdown-menu.props.js";
import type { ReactNode } from "react";
import { type ButtonProps } from "./button/button";
export declare const dropdownButtonPropDefs: any;
export declare const dropdownContentPropDefs: {
    size: any;
    variant: any;
    color: any;
    highContrast: any;
};
export declare const dropdownItemPropDefs: {
    asChild: {
        type: string;
        default: boolean;
    };
    color: any;
};
export type DropdownMenuItemProps = {
    label: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    disabled?: boolean;
    icon?: ReactNode;
    shortcut?: string;
    separator?: boolean;
    asChild?: boolean;
    color?: ColorProp;
    children?: DropdownMenuItemProps[];
};
export type DropdownButtonProps = ButtonProps & {
    label?: string;
    icon?: ReactNode;
};
export type DropdownMenuProps = {
    button?: DropdownButtonProps;
    trigger?: ReactNode;
    content?: {
        size?: (typeof dropdownContentPropDefs.size)["values"][number];
        variant?: (typeof dropdownContentPropDefs.variant)["values"][number];
        color?: (typeof dropdownContentPropDefs.color)["values"][number];
        highContrast?: boolean;
    };
    items: DropdownMenuItemProps[];
};
export declare const DropdownMenuItem: ({ label, separator, children, ...props }: DropdownMenuItemProps) => import("react/jsx-runtime").JSX.Element;
export declare const DropdownMenuWrapper: ({ button, trigger, content, items, }: DropdownMenuProps) => import("react/jsx-runtime").JSX.Element;
export declare const DropdownMenu: typeof RadixDropdownMenu;
//# sourceMappingURL=dropdown-menu.d.ts.map