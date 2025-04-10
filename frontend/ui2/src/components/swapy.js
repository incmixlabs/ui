import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import { createSwapy } from "swapy";
import { DragHandle } from "./drag-handle";
export const SwapyLayout = ({ id, enable = true, onSwap = () => { }, config = {}, children, ...props }) => {
    const swapy = useRef();
    useEffect(() => {
        const container = document.querySelector(`#${id}`);
        if (!container) {
            console.error(`Element with id '${id}' not found.`);
            return;
        }
        swapy.current = createSwapy(container, config);
        swapy.current.enable(enable);
        swapy.current.onSwap((event) => {
            onSwap(event.data.object);
        });
        return () => {
            swapy.current?.destroy();
        };
    }, [enable, onSwap, config, id]);
    return (_jsx(Box, { as: "div", id: id, ...props, children: children }));
};
export const SwapySlot = ({ id, showHandle = true, children, ...props }) => {
    return (_jsx(Box, { as: "div", "data-swapy-slot": id, style: { position: "relative" }, ...props, children: _jsxs(Box, { as: "div", "data-swapy-item": id, children: [showHandle && _jsx(DragHandle, {}), children] }) }));
};
export const SwapyExclude = ({ children, ...props }) => {
    return (_jsx(Box, { as: "div", "data-swapy-exclude": true, ...props, children: children }));
};
//# sourceMappingURL=swapy.js.map