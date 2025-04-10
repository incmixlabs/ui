import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@/components/radixui/box";
import { useEffect, useState } from "react";
import { Battery } from "./battery";
// The battery API is not part of the standard, and as such, it's not available
// in the Navigator object. Therefore, we need to cast the result of
// navigator.getBattery() to a custom BatteryInfo type.
// See [https://stackoverflow.com/questions/71890251/navigator-getbattery-cannot-be-found].
export async function getBattery() {
    if ("getBattery" in navigator && typeof navigator.getBattery === "function") {
        return (await navigator.getBattery());
    }
    return null;
}
export function BatteryWidget({ className }) {
    const [batteryInfo, setBatteryInfo] = useState(null);
    useEffect(() => {
        const setupBatteryListeners = async () => {
            try {
                const battery = await getBattery();
                setBatteryInfo(battery);
                battery?.addEventListener("levelchange", () => setBatteryInfo(battery));
                battery?.addEventListener("chargingchange", () => setBatteryInfo(battery));
                battery?.addEventListener("chargingtimechange", () => setBatteryInfo(battery));
                battery?.addEventListener("dischargingtimechange", () => setBatteryInfo(battery));
            }
            catch (error) {
                console.error("Battery API not supported", error);
            }
        };
        setupBatteryListeners();
    }, []);
    return (_jsx(Box, { children: _jsx(Battery, { className: className, batteryInfo: batteryInfo }) }));
}
//# sourceMappingURL=battery-widget.js.map