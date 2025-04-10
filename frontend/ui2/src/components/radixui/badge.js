import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Badge as RadixBadge } from "@radix-ui/themes";
export const Badge = ({ className, children, color, ...props }) => {
    const isBlackColor = color === "black";
    const { variant } = props;
    return (_jsx(RadixBadge, { className: cn("", className, isBlackColor && "bg-gray-5 text-black dark:bg-gray-7 dark:text-white", isBlackColor &&
            variant === "solid" &&
            "bg-white text-black dark:bg-black dark:text-white"), color: isBlackColor ? undefined : color, ...props, children: children }));
};
//# sourceMappingURL=badge.js.map