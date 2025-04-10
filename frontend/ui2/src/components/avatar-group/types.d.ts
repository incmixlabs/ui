import type { AvatarProps } from "@/components/radixui/avatar";
export declare const sizes: readonly ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
export declare const layouts: readonly ["spread", "stack"];
export declare const directions: readonly ["left", "right"];
export declare const stackOrders: readonly ["ascending", "descending"];
export type Sizes = (typeof sizes)[number];
export type Layout = (typeof layouts)[number];
export type Direction = (typeof directions)[number];
export type StackOrder = (typeof stackOrders)[number];
export type AvatarGroupProps = {
    users: AvatarProps[];
    maxVisible?: number;
    size?: Sizes;
    layout?: Layout;
    direction?: Direction;
    stackOrder?: StackOrder;
};
//# sourceMappingURL=types.d.ts.map