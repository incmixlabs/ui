import type * as CLSX from "./utils/core/clsx";
import { clsx } from "./utils/core/clsx";
export type ClassPropKey = "class" | "className";
export type ClassValue = CLSX.ClassValue;
export type ClassProp = {
    class: ClassValue;
    className?: never;
} | {
    class?: never;
    className: ClassValue;
} | {
    class?: never;
    className?: never;
};
export type OmitUndefined<T> = T extends undefined ? never : T;
export type StringToBoolean<T> = T extends "true" | "false" ? boolean : T;
export type VariantProps<Component extends (...args: any) => any> = Omit<OmitUndefined<Parameters<Component>[0]>, "class" | "className">;
export type CxOptions = Parameters<typeof clsx>;
export type CxReturn = ReturnType<typeof clsx>;
export declare const cx: typeof CLSX.clsx;
type ConfigSchema = Record<string, Record<string, ClassValue>>;
type ConfigVariants<T extends ConfigSchema> = {
    [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
    [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | StringToBoolean<keyof T[Variant]>[] | undefined;
};
type Config<T> = T extends ConfigSchema ? {
    variants?: T;
    defaultVariants?: ConfigVariants<T>;
    compoundVariants?: (T extends ConfigSchema ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp : ClassProp)[];
} : never;
type Props<T> = T extends ConfigSchema ? ConfigVariants<T> & ClassProp : ClassProp;
export declare const cva: <T>(base?: ClassValue, config?: Config<T>) => (props?: Props<T>) => string;
export {};
//# sourceMappingURL=cva.d.ts.map