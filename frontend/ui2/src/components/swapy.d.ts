import { type BoxProps } from "@radix-ui/themes";
type AnimationType = "dynamic" | "spring" | "none";
type SwapMode = "hover" | "stop" | "drop";
type Config = {
    animation: AnimationType;
    continuousMode: boolean;
    manualSwap: boolean;
    swapMode: SwapMode;
    autoScrollOnDrag: boolean;
};
type SwapyLayoutProps = {
    id: string;
    enable?: boolean;
    onSwap?: (record: Record<string, string | null>) => void;
    config?: Partial<Config>;
};
export declare const SwapyLayout: ({ id, enable, onSwap, config, children, ...props }: SwapyLayoutProps & BoxProps) => import("react/jsx-runtime").JSX.Element;
type SwapySlotProps = BoxProps & {
    id: string;
    showHandle?: boolean;
};
export declare const SwapySlot: ({ id, showHandle, children, ...props }: SwapySlotProps) => import("react/jsx-runtime").JSX.Element;
export declare const SwapyExclude: ({ children, ...props }: BoxProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=swapy.d.ts.map