import { jsx as _jsx } from "react/jsx-runtime";
import { Menu } from "lucide-react";
import { Box } from "./base";
export const DragHandle = () => {
    return (_jsx(Box, { as: "span", "data-swapy-handle": true, className: "absolute z-10 cursor-grab p-2 text-gray-11 transition-opacity hover:opacity-100", children: _jsx(Menu, { width: 16, height: 16 }) }));
};
//# sourceMappingURL=drag-handle.js.map