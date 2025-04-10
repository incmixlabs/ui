import { OTPInput } from "input-otp";
import * as React from "react";
declare function Root({ className, containerClassName, ...props }: React.ComponentProps<typeof OTPInput> & {
    containerClassName?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function Group({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function Slot({ index, className, ...props }: React.ComponentProps<"div"> & {
    index: number;
}): import("react/jsx-runtime").JSX.Element;
export declare const InputOTP: {
    Root: typeof Root;
    Group: typeof Group;
    Slot: typeof Slot;
};
export {};
//# sourceMappingURL=input-otp.d.ts.map