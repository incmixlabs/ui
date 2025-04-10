import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton } from "@/components/radixui/button";
import { Tooltip } from "@/components/radixui/tooltip";
import { HelpCircle } from "lucide-react";
import { buttonVariant, iconWidth, radius as radiusConst, size as sizeConst, } from "@/types";
function AutoFormTooltip({ content, Icon = HelpCircle, size = sizeConst.sm, radius = radiusConst.full, variant = buttonVariant.ghost, }) {
    return (_jsx(_Fragment, { children: content && (_jsx(Tooltip, { content: content, children: _jsx(IconButton, { radius: radius, size: size, variant: variant, children: _jsx(Icon, { width: iconWidth[size], height: iconWidth[size] }) }) })) }));
}
export default AutoFormTooltip;
//# sourceMappingURL=tooltip.js.map