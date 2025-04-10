import { jsx as _jsx } from "react/jsx-runtime";
// https://lucide.dev/guide/packages/lucide-react
import { icons } from "lucide-react";
export const LucideIcon = ({ name, color, size }) => {
    const LucideIcon = icons[name];
    return _jsx(LucideIcon, { color: color, size: size });
};
export default LucideIcon;
//# sourceMappingURL=lucide-icon.js.map