import type React from "react";
import type { ButtonVariant, Radius, Size } from "@/types";
export type AutoFormTooltipProps = {
    content?: string | React.ReactNode;
    Icon?: React.ComponentType<{
        width?: number;
        height?: number;
    }>;
    size?: Size;
    radius?: Radius;
    variant?: ButtonVariant;
};
declare function AutoFormTooltip({ content, Icon, size, radius, variant, }: AutoFormTooltipProps): import("react/jsx-runtime").JSX.Element;
export default AutoFormTooltip;
//# sourceMappingURL=tooltip.d.ts.map