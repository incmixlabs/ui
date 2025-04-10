import { jsx as _jsx } from "react/jsx-runtime";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Suspense, lazy } from "react";
const fallbackIconComp = (_jsx("div", { style: { background: "#ddd", width: 24, height: 24 } }));
export const LazyIcon = ({ name, fallback = fallbackIconComp, ...props }) => {
    const LucideIcon = lazy(dynamicIconImports[name]);
    return (_jsx(Suspense, { fallback: fallback, children: _jsx(LucideIcon, { ...props }) }));
};
export default LazyIcon;
//# sourceMappingURL=lazy-icon.js.map