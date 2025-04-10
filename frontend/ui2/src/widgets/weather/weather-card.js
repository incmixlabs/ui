import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex, Text } from "@/components/radixui";
import { getWeekDay } from "@incmix/utils/date";
import { Send } from "lucide-react";
import { Clouds, CloudsSun, Drizzle, Fog, FreezingRain, HeavyRain, Rain, Snow, Sun, Thunderstorm, } from "./icons";
import "./weather.css";
export const WeatherCodes = {
    0: { name: "Unknown", Icon: Sun },
    1000: { name: "Clear", Icon: Sun },
    1100: { name: "Mostly Clear", Icon: Sun },
    1101: { name: "Partly Cloudy", Icon: CloudsSun },
    1102: { name: "Mostly Cloudy", Icon: Clouds },
    1001: { name: "Cloudy", Icon: Clouds },
    2000: { name: "Fog", Icon: Fog },
    2100: { name: "Light Fog", Icon: Fog },
    4000: { name: "Drizzle", Icon: Drizzle },
    4001: { name: "Rain", Icon: Rain },
    4200: { name: "Light Rain", Icon: Rain },
    4201: { name: "Heavy Rain", Icon: HeavyRain },
    5000: { name: "Snow", Icon: Snow },
    5001: { name: "Flurries", Icon: Snow },
    5100: { name: "Light Snow", Icon: Snow },
    5101: { name: "Heavy Snow", Icon: Snow },
    6000: { name: "Freezing Drizzle", Icon: FreezingRain },
    6001: { name: "Freezing Rain", Icon: FreezingRain },
    6200: { name: "Light Freezing Rain", Icon: FreezingRain },
    6201: { name: "Heavy Freezing Rain", Icon: FreezingRain },
    7000: { name: "Ice Pellets", Icon: FreezingRain },
    7101: { name: "Heavy Ice Pellets", Icon: FreezingRain },
    7102: { name: "Light Ice Pellets", Icon: FreezingRain },
    8000: { name: "Thunderstorm", Icon: Thunderstorm },
};
export function WeatherCard({ days, location }) {
    const [today, ...rest] = days;
    const TodayIcon = WeatherCodes[today.weatherCode].Icon;
    return (_jsxs(Flex, { gap: "1", direction: "column", className: "weather-container space-y-3", children: [_jsxs(Flex, { align: "start", justify: "between", children: [_jsxs(Box, { children: [_jsxs(Flex, { gap: "2", align: "center", children: [_jsx(Text, { size: "2", weight: "medium", className: "capitalize", children: location ?? "Unknown" }), _jsx(Text, { children: _jsx(Send, { className: "location-icon", width: "12" }) })] }), _jsx(Text, { size: "8", children: formatTemp(today.temperatureAvg) })] }), _jsxs(Flex, { direction: "column", align: "end", gap: "1", children: [_jsx(TodayIcon, { size: "12" }), _jsxs(Flex, { direction: "column", children: [_jsxs(Text, { weight: "medium", size: "1", children: ["H:", formatTemp(today.temperatureMax)] }), _jsxs(Text, { weight: "medium", size: "1", children: ["L:", formatTemp(today.temperatureMin)] })] })] })] }), _jsx(Flex, { direction: "column", children: rest.map((d) => {
                    const Icon = WeatherCodes[d.weatherCode].Icon;
                    return (_jsxs(Flex, { justify: "between", align: "center", children: [_jsxs(Flex, { align: "center", gap: "1", children: [_jsx(Box, { minWidth: "1.6rem", children: _jsx(Text, { weight: "medium", size: "1", children: getWeekDay(d.time) }) }), _jsx(Icon, { size: "16" })] }), _jsxs(Flex, { gap: "1", children: [_jsx(Text, { size: "1", weight: "medium", className: "transparent", children: formatTemp(d.temperatureMin, true) }), _jsx(Text, { size: "1", weight: "medium", children: formatTemp(d.temperatureMax) })] })] }, d.time));
                }) })] }));
}
function formatTemp(temperature, ignoreDegree = false) {
    return `${temperature.toFixed(0)}${!ignoreDegree ? "°" : ""}`;
}
//# sourceMappingURL=weather-card.js.map