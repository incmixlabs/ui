import type { ComponentProps, FC, JSX } from "react";
import type { DeepPartial } from "@/types";
import { type FlowCardTheme } from "./flow-card-theme";
interface CommonCardProps extends ComponentProps<"div"> {
    horizontal?: boolean;
    href?: string;
    /** Overwrites the theme. Will be merged with the context theme.
     * @default {}
     */
    theme?: DeepPartial<FlowCardTheme>;
}
export type FlowCardProps = {
    imgAlt?: string;
    imgSrc?: string;
    width?: number;
    height?: number;
    horizontal?: boolean;
    renderImage?: (theme: DeepPartial<FlowCardTheme>, horizontal: boolean) => JSX.Element;
    theme?: DeepPartial<FlowCardTheme>;
} & CommonCardProps;
export declare const Image: FC<FlowCardProps>;
export declare const FlowCard: FC<FlowCardProps>;
export default FlowCard;
//# sourceMappingURL=flow-card.d.ts.map