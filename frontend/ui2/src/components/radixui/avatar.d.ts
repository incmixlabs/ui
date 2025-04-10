import { type AvatarProps as RadixProps } from "@radix-ui/themes";
export { avatarPropDefs } from "@radix-ui/themes/src/components/avatar.props.js";
import type { ExtendSize } from "@/types";
export type AvatarProps = {
    id?: string;
    size?: ExtendSize;
    src?: string;
    name?: string;
    radius?: RadixProps["radius"];
    variant?: RadixProps["variant"];
    className?: string;
    style?: React.CSSProperties;
};
export declare const Avatar: import("react").ForwardRefExoticComponent<AvatarProps & import("react").RefAttributes<HTMLImageElement>>;
//# sourceMappingURL=avatar.d.ts.map