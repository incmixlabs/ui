import { jsx as _jsx } from "react/jsx-runtime";
import { icons } from "lucide-react";
export const Icon = ({ name, color, size }) => {
    const LucideIcon = icons[name];
    return _jsx(LucideIcon, { color: color, size: size });
};
export default Icon;
export const iconSize = "w-4 h-4";
//# sourceMappingURL=icon.js.map