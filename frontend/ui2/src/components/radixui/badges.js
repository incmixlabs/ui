import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from "./badge";
export const BadgeComponent = ({ themeColor = "gray", }) => {
    return (_jsx("div", { className: "grid w-[30rem] place-content-center gap-5 space-y-4 px-10", children: _jsx(Badge, { color: themeColor, className: "block w-fit px-3 py-1 text-center text-xl capitalize", children: "Primary" }) }));
};
//# sourceMappingURL=badges.js.map