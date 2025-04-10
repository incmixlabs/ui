import type { DateTime } from "luxon";
import type { SVGProps } from "react";
export type Side = "left" | "right";
export declare const side: {
    left: string;
    right: string;
};
export type Direction = "ltr" | "rtl";
export declare const direction: {
    ltr: string;
    rtl: string;
};
export type IconProps = SVGProps<SVGSVGElement> & {
    size?: string | number;
};
export declare const iconWidth: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
};
export type Size = "1" | "2" | "3" | "4";
export declare const size: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    default: string;
};
export type ExtendSize = Size | "5" | "6" | "7" | "8" | "9";
export declare const extendedSize: {
    xl: string;
    "1x": string;
    "2x": string;
    "3x": string;
    "4x": string;
    sm: string;
    md: string;
    lg: string;
    default: string;
};
export type Radius = "none" | "small" | "medium" | "large" | "full";
export declare const radius: {
    none: string;
    small: string;
    medium: string;
    large: string;
    full: string;
};
export type Variant = "classic" | "surface" | "soft";
export declare const variant: {
    classic: string;
    surface: string;
    soft: string;
};
export type ButtonVariant = Variant | "outline" | "solid" | "ghost";
export declare const buttonVariant: {
    outline: string;
    solid: string;
    ghost: string;
    classic: string;
    surface: string;
    soft: string;
};
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export type BooleanComp = "off" | "on";
export declare const booleanComp: {
    off: string;
    on: string;
};
export type RemoveIndexSignature<T> = {
    [K in keyof T as string extends K ? never : K]: T[K];
};
export type DynamicStringEnum<T> = T | (string & {});
export type DynamicStringEnumKeysOf<T extends object> = DynamicStringEnum<keyof RemoveIndexSignature<T>>;
export type StateColor = {
    info: string;
    failure: string;
    success: string;
    warning: string;
};
export interface Colors extends StateColor {
    [key: string]: string;
    blue: string;
    cyan: string;
    dark: string;
    gray: string;
    green: string;
    indigo: string;
    light: string;
    lime: string;
    pink: string;
    purple: string;
    red: string;
    teal: string;
    yellow: string;
}
export interface Project {
    id: string;
    name: string;
    startDate: DateTime;
    endDate: DateTime;
    progress: number;
    color: string;
    subProjects?: Project[];
}
export interface DataItem {
    name?: string;
    notes?: string;
    value?: string;
}
export interface TreeDataItem {
    children?: TreeDataItem[];
    data?: DataItem;
    expanded?: boolean;
    id: string;
    name: string;
    type: "folder" | "file";
}
//# sourceMappingURL=types.d.ts.map