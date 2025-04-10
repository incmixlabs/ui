import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/radixui/card";
import { cn } from "@/lib/utils";
export function StatsCard({ count, label, iconClassName, className, icon, }) {
    return (_jsx(Card.Root, { className: "w-full p-0", children: _jsxs(Card.Header, { className: cn(" flex flex-col items-center justify-center", className), children: [_jsx("div", { className: cn("mb-2 rounded-xl p-4", iconClassName), children: icon }), _jsx(Card.Title, { className: "text-center font-medium font-poppins text-3xl", children: count }), _jsx(Card.Description, { children: label })] }) }));
}
//# sourceMappingURL=stats-card.js.map