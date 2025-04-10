import { type BatteryInfo } from "./battery";
type BatteryManagerInfo = BatteryInfo & EventTarget;
export declare function getBattery(): Promise<BatteryManagerInfo | null>;
export interface BatteryWidgetProps {
    className?: string;
}
export declare function BatteryWidget({ className }: BatteryWidgetProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=battery-widget.d.ts.map