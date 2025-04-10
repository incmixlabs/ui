import * as React from "react";
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}
declare const Slottable: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
declare const Slot: React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>>;
declare const Root: React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>>;
export { Slot, Slottable, Root };
export type { SlotProps };
//# sourceMappingURL=core-slot.d.ts.map