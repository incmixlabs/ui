import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "@/lib/cva";
import { cn } from "@/lib/utils";
// }
const edgeToOrientationMap = {
    top: "horizontal",
    bottom: "horizontal",
    left: "vertical",
    right: "vertical",
};
const orientationVariants = cva("", {
    variants: {
        orientation: {
            horizontal: "right-0 left-1 h-1",
            vertical: "top-1 bottom-0 w-1",
        },
        edge: {
            top: "top-[var(--local-line-offset)]",
            right: "right-[var(--local-line-offset)]",
            bottom: "bottom-[var(--local-line-offset)]",
            left: "left-[var(--local-line-offset)]",
        },
    },
});
export function DropIndicator({ edge, gap = "0px" }) {
    /**
     * To clearly communicate the resting place of a draggable item during a drag operation,
     * the drop indicator should be positioned half way between draggable items.
     */
    const lineOffset = `calc(-0.5 * (${gap} + 4px))`;
    const orientation = edgeToOrientationMap[edge];
    return (_jsx("div", { className: cn("pointer-events-none absolute z-10 h-1 bg-blue-5", orientationVariants({ edge, orientation })), style: { "--local-line-offset": lineOffset } }));
}
export default DropIndicator;
//# sourceMappingURL=drop-indicator.js.map