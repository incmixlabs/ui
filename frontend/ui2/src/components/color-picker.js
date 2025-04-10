import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { iconSize } from "./icons/icon";
const baseColors = [
    "blue",
    "green",
    "red",
    "amber",
    "purple",
    "teal",
    "pink",
    "indigo",
    "lime",
    "orange",
    "violet",
    "cyan",
];
const generateColorArray = (color, reverse = false) => {
    const range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (reverse)
        range.reverse();
    return range.map((num) => `var(--${color}-${num})`);
};
function cssVarToHex(varName) {
    const tempElem = document.createElement("div");
    tempElem.style.color = `var(${varName})`;
    document.body.appendChild(tempElem);
    const computedColor = getComputedStyle(tempElem).color;
    document.body.removeChild(tempElem);
    const components = computedColor.match(/[\d\.]+/g) || [];
    if (components.length < 3)
        return null;
    // Convert RGB values to hex
    const [r, g, b] = components
        .slice(0, 3)
        .map((n) => Number.parseInt(n).toString(16).padStart(2, "0"));
    let hex = `#${r}${g}${b}`;
    // Add alpha channel if present
    if (components.length === 4) {
        const a = Math.round(Number.parseFloat(components[3]) * 255)
            .toString(16)
            .padStart(2, "0");
        hex += a;
    }
    return hex.toUpperCase();
}
export const ColorPicker = ({ onColorSelect, colorType = "all", activeColor, }) => {
    // Dark colors - displayed horizontally
    const darkColors = [
        "var(--gray-1)",
        "var(--gray-2)",
        "var(--gray-4)",
        "var(--gray-5)",
        "var(--gray-6)",
        "var(--gray-7)",
        "var(--gray-8)",
        "var(--gray-9)",
        "var(--gray-10)",
        "var(--gray-11)",
        "var(--gray-12)",
    ];
    const redsColors = generateColorArray("red", true);
    const orangesColors = generateColorArray("orange", true);
    const yellowsColors = generateColorArray("yellow", true);
    const leafColors = generateColorArray("grass", true);
    const greensColors = generateColorArray("green", true);
    const tealsColors = generateColorArray("teal", true);
    const bluesColors = generateColorArray("blue", true);
    const indigoColors = generateColorArray("indigo", true);
    const violetColors = generateColorArray("violet", true);
    const plumsColors = generateColorArray("plum", true);
    const pinksColors = generateColorArray("pink", true);
    const colorGroups = [
        redsColors,
        orangesColors,
        yellowsColors,
        leafColors,
        greensColors,
        tealsColors,
        bluesColors,
        indigoColors,
        violetColors,
        plumsColors,
        pinksColors,
    ];
    if (colorType === "base") {
        return (_jsx("div", { className: "bg-white p-2", children: _jsx("div", { className: "grid grid-cols-6 gap-2", children: baseColors.map((color) => (_jsx("button", { type: "button", className: cn("h-6 w-6 cursor-pointer rounded-full transition-transform hover:scale-110", "flex items-center justify-center", activeColor === color && "ring-2 ring-offset-2"), style: { backgroundColor: `var(--${color}-9)` }, onClick: () => onColorSelect({ hex: `var(--${color}-9)`, name: color }), title: color, children: activeColor === color && (_jsx(Check, { className: `${iconSize} flex-shrink-0 text-white` })) }, color))) }) }));
    }
    return (_jsxs("div", { className: "bg-white p-2", children: [_jsx("div", { className: "mb-1 flex justify-between", children: darkColors.map((color) => (_jsx("button", { type: "button", className: cn("h-6 w-6 cursor-pointer rounded-sm transition-transform hover:scale-110", activeColor === color && "ring-2 ring-offset-2"), style: { backgroundColor: `${color}` }, onClick: () => onColorSelect({ hex: color }), title: color }, `dark-${color}`))) }), _jsx("div", { className: "flex justify-between", children: colorGroups.map((group) => (_jsx("div", { className: "flex flex-col gap-1", children: group.map((color) => {
                        const varNameMatch = color.match(/^var\((--.+)\)$/);
                        const varName = varNameMatch ? varNameMatch[1] : color;
                        return (_jsx("button", { type: "button", className: cn("h-6 w-6 cursor-pointer rounded-sm transition-transform hover:scale-110", activeColor === color && "ring-2 ring-offset-2"), style: { backgroundColor: `${color}` }, onClick: () => {
                                const hexColor = cssVarToHex(varName) || color;
                                onColorSelect({
                                    hex: hexColor,
                                    name: varName.replace(/^--/, ""),
                                });
                            }, title: color }, `color-${color}`));
                    }) }, `group-${colorGroups.indexOf(group)}`))) })] }));
};
export default ColorPicker;
//# sourceMappingURL=color-picker.js.map