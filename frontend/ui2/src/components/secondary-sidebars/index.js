/* eslint-disable react-refresh/only-export-components */
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Flex } from "@/components/base";
import { cn } from "@/lib/utils";
import { useSidebar } from "../sidebar";
export * from "./fallback";
export * from "./file-folder";
export function SecondarySidebar({ children, }) {
    const { isMobile, open, secondaryOpen, openMobile } = useSidebar();
    return (_jsx(Box, { className: cn("relative h-screen w-[240px] transition-all duration-200 ease-linear xl:w-[270px]", isMobile
            ? `fixed left-16 z-30 min-w-[270px] bg-gray-2 ${open && "hidden"} ${!openMobile && "hidden"}`
            : `${secondaryOpen ? "flex w-[250px] xl:min-w-[270px]" : "hidden w-0"}`), children: _jsx(Box, { className: cn("fixed top-0 flex h-screen w-[270px] flex-col border border-y-0 border-r-gray-6 border-l-0 bg-sidebar-background transition-[left,opacity] duration-300 ease-in-out", open
                ? "left-[calc(var(--sidebar-width))] z-30"
                : "left-[calc(var(--sidebar-width-icon))]", isMobile
                ? `min-w-[270px] ${open && "hidden"} ${!openMobile && "hidden"}`
                : `${secondaryOpen ? "flex w-[250px] xl:min-w-[270px]" : "hidden w-0"}`), children: _jsx(Flex, { direction: "column", className: "h-full overflow-hidden", children: children }) }) }));
}
//# sourceMappingURL=index.js.map