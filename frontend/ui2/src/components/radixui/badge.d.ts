import type { BadgeProps } from "@radix-ui/themes";
export type ExtendedColorType = BadgeProps["color"] | "black";
export type CustomBadgeProps = Omit<BadgeProps, "color"> & {
    text?: string;
    className?: string;
    color?: ExtendedColorType;
};
export declare const Badge: ({ className, children, color, ...props }: CustomBadgeProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=badge.d.ts.map