"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import RClock from "react-clock";
import "react-clock/dist/Clock.css";
import { useThemeStore } from "@incmix/store";
export { Clock as Icon } from "lucide-react";
import { CardContainer, Flex, Text } from "@/components/radixui";
import { Theme } from "@/components/radixui/theme";
import { getDate } from "@incmix/utils/date";
import "./clock.css";
function tzDate(clock) {
    return clock.map((c) => {
        const dt = getDate(c.timeZone);
        return {
            ...c,
            time: new Date(`${dt.date} ${dt.time}`),
            date: dt.date,
        };
    });
}
const clockSizeMap = {
    "1": 100,
    "2": 150,
    "3": 200,
};
const textSizeMap = {
    "1": "2",
    "2": "4",
    "3": "6",
};
export function ClockWidget({ clocks, size = "2", flip = false }) {
    const { theme } = useThemeStore();
    clocks = clocks || [{ city: "New York", timeZone: "America/New_York" }];
    const date = tzDate(clocks);
    const [values, setValues] = useState(date);
    function invertTheme() {
        return theme === "dark" ? "light" : "dark";
    }
    useEffect(() => {
        const interval = setInterval(() => setValues(tzDate(clocks)), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [clocks]);
    return (_jsx(Flex, { direction: "row", gap: "4", children: values.map((value) => (_jsx(Theme, { appearance: flip ? invertTheme() : theme, className: "bg-transparent", children: _jsxs(CardContainer, { children: [_jsx(RClock, { value: value.time, size: clockSizeMap[size] }, value.city), _jsx(Flex, { align: "center", justify: "center", mt: "2", children: _jsx(Text, { as: "span", size: textSizeMap[size], children: value.city }) })] }, value.city) }, value.city))) }));
}
//# sourceMappingURL=clock.js.map