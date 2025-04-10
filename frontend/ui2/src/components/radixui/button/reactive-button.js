import { jsx as _jsx } from "react/jsx-runtime";
import { Spinner } from "@radix-ui/themes";
import { Check } from "lucide-react";
import React from "react";
import { Button } from "./button";
export const ReactiveButton = React.forwardRef(function ReactiveButton({ children, loading, success, disabled, spinnerClassName, successIconClassName, ...props }, ref) {
    return (_jsx(Button, { ...props, ref: ref, disabled: loading || disabled, children: loading ? (_jsx(Spinner, { className: spinnerClassName })) : success ? (_jsx(Check, { className: successIconClassName })) : (children) }));
});
ReactiveButton.displayName = "ReactiveButton";
//# sourceMappingURL=reactive-button.js.map