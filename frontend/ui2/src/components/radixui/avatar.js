import { jsx as _jsx } from "react/jsx-runtime";
import { Avatar as RadixAvatar, } from "@radix-ui/themes";
/* eslint-disable react-refresh/only-export-components */
import { User as PersonIcon } from "lucide-react";
export { avatarPropDefs } from "@radix-ui/themes/src/components/avatar.props.js";
import { getInitials } from "@/lib/strings";
import { forwardRef } from "react";
export const Avatar = forwardRef(({ id, size = "3", name, radius = "full", variant = "solid", className, src, style, ...props }, ref) => {
    const fallback = name ? (getInitials(name)) : (_jsx(PersonIcon, { height: "24px", width: "24px" }));
    return (_jsx(RadixAvatar, { "data-user-id": id, ref: ref, src: src, style: style, className: `overflow-hidden ${className}`, size: size, fallback: fallback, alt: name, radius: radius, variant: variant, ...props }));
});
//# sourceMappingURL=avatar.js.map