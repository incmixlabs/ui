import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton as RadixIconButton, } from "@radix-ui/themes";
import React from "react";
export { iconButtonPropDefs } from "@radix-ui/themes/src/components/icon-button.props.js";
export const IconButton = React.forwardRef(function IconButton({ children, className, disabled, variant, ...props }, ref) {
    const defaultClassName = `${disabled ? "cursor-not-allowed" : "cursor-pointer"} `;
    return (_jsx(RadixIconButton, { ...props, variant: variant || "soft", className: `${defaultClassName}${className}`, ref: ref, disabled: disabled, children: children }));
});
IconButton.displayName = "IconButton";
//# sourceMappingURL=icon-button.js.map