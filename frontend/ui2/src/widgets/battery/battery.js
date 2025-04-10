import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex, Text } from "@/components/radixui";
import { cn } from "@/lib/utils";
import { Bolt as LightningBoltIcon } from "lucide-react";
function LowBatteryWarning() {
    return (_jsx(LightningBoltIcon, { className: "h-6 w-6 text-red-9", "aria-label": "Low Battery Warning" }));
}
function ChargingIndicator() {
    return (_jsx(LightningBoltIcon, { className: "h-6 w-6 text-gray-12", "aria-label": "Charging Indicator" }));
}
function BatteryStriketrough() {
    return (_jsx(Box, { className: "relative h-6 w-6", children: _jsx(Box, { className: "absolute h-[250%] w-0.5 origin-center rotate-[20deg] bg-gray-12", style: { top: "-75%", left: "50%" } }) }));
}
export function Battery({ className, batteryInfo }) {
    const getBatteryColor = () => {
        if (!batteryInfo)
            return "bg-gray-12";
        const level = batteryInfo.level * 100;
        if (level <= 10)
            return "bg-red-9";
        if (level <= 20)
            return "bg-yellow-9";
        return "bg-green-9";
    };
    const getBatteryWidth = () => {
        if (!batteryInfo)
            return "0%";
        return `${Math.max(batteryInfo.level * 100, 5)}%`;
    };
    return (_jsx(Box, { className: cn("w-24", className), children: _jsxs(Flex, { className: "relative my-1 rounded border-2 border-gray-12 shadow", children: [_jsx(Box, { className: "absolute z-10 mt-2 ml-24 flex h-6 rounded-r border-gray-12 border-r-8" }), _jsx(Flex, { align: "center", justify: "center", className: cn("m-1 cursor-default py-4 text-center font-semibold text-12 text-base leading-none", getBatteryColor()), style: { width: getBatteryWidth() }, children: _jsx(Box, { className: "absolute left-0 mx-8", children: !batteryInfo ? (_jsx(BatteryStriketrough, {})) : batteryInfo.charging ? (_jsx(ChargingIndicator, {})) : batteryInfo.level <= 0.1 ? (_jsx(LowBatteryWarning, {})) : (_jsxs(Text, { className: "text-gray-12", children: [Math.round(batteryInfo.level * 100), "%"] })) }) })] }) }));
}
//# sourceMappingURL=battery.js.map