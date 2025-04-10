import { jsx as _jsx } from "react/jsx-runtime";
import { Button as RadixButton, } from "@radix-ui/themes";
import React from "react";
// eslint-disable-next-line react-refresh/only-export-components
export { buttonPropDefs } from "@radix-ui/themes/src/components/button.props.js";
export const Button = React.forwardRef(function Button({ children, className, disabled, variant, ...props }, ref) {
    const defaultClassName = `${disabled ? "cursor-not-allowed" : "cursor-pointer"} `;
    return (_jsx(RadixButton, { ...props, variant: variant, className: `${defaultClassName}${className}`, ref: ref, disabled: disabled, children: children }));
});
Button.displayName = "Button";
//# sourceMappingURL=button.js.map