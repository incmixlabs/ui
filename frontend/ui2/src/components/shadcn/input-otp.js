import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { OTPInput, OTPInputContext } from "input-otp";
/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { cn } from "@/lib/utils";
function Root({ className, containerClassName, ...props }) {
    return (_jsx(OTPInput, { "data-slot": "input-otp", containerClassName: cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName), className: cn("disabled:cursor-not-allowed", className), ...props }));
}
function Group({ className, ...props }) {
    return (_jsx("div", { "data-slot": "input-otp-group", className: cn("flex items-center", className), ...props }));
}
function Slot({ index, className, ...props }) {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
    return (_jsxs("div", { "data-slot": "input-otp-slot", "data-active": isActive, className: cn("relative flex h-9 w-9 items-center justify-center border-input border-y border-r text-sm shadow-xs outline-none transition-all first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40", className), ...props, children: [char, hasFakeCaret && (_jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: _jsx("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) }))] }));
}
/*
function Separator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
} */
export const InputOTP = {
    Root,
    Group,
    Slot,
    //  Separator,
};
//# sourceMappingURL=input-otp.js.map