export type BatteryInfo = {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
};
export interface BatteryProps {
    className?: string;
    batteryInfo: BatteryInfo | null;
}
export declare function Battery({ className, batteryInfo }: BatteryProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=battery.d.ts.map