import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Flex, Heading, IconButton, Text } from "@/components";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
export const MotionSheet = ({ children, title, description, side = "right", open = false, isFilterClassName = "w-[30rem] 2xl:w-[40rem]", isFilter = false, shadow = "0 0 10px rgba(0, 0, 0, 0.2)", onOpenChange, closeOnOutsideClick = true, closeOnEsc = true, showCloseButton = true, overlayColor = "rgba(0, 0, 0, 0.5)", className, zIndex = 60, }) => {
    const [isOpen, setIsOpen] = useState(open);
    useEffect(() => {
        setIsOpen(open);
    }, [open]);
    useEffect(() => {
        const handleEscKey = (e) => {
            if (closeOnEsc && e.key === "Escape" && isOpen) {
                handleClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, closeOnEsc]);
    const handleClose = () => {
        setIsOpen(false);
        if (onOpenChange) {
            onOpenChange(false);
        }
    };
    // Determine animation variants based on side
    const getSheetVariants = () => {
        const variants = {
            hidden: {},
            visible: {},
        };
        switch (side) {
            case "right":
                variants.hidden = { x: "100%" };
                variants.visible = { x: 0 };
                break;
            case "left":
                variants.hidden = { x: "-100%" };
                variants.visible = { x: 0 };
                break;
            case "top":
                variants.hidden = { y: "-100%" };
                variants.visible = { y: 0 };
                break;
            case "bottom":
                variants.hidden = { y: "100%" };
                variants.visible = { y: 0 };
                break;
        }
        return variants;
    };
    const positionClasses = {
        right: "top-2 right-3 rounded-lg",
        left: "top-0 left-0 rounded-lg",
        top: "top-0 left-0 right-0 w-full rounded-lg",
        bottom: "bottom-0 left-0 right-0 w-full rounded-lg",
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [!isFilter && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, style: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: overlayColor,
                        zIndex: zIndex - 1,
                    }, onClick: closeOnOutsideClick ? handleClose : undefined }, "sheet-backdrop")), _jsxs(motion.div, { initial: "hidden", animate: "visible", exit: "hidden", variants: getSheetVariants(), transition: { type: "spring", damping: 30, stiffness: 300 }, className: cn(
                    // Base styles for all sheets
                    isFilter
                        ? isFilterClassName
                        : "fixed h-[98vh] w-96 max-w-full bg-gray-3 p-5 py-4", positionClasses[side], className), style: {
                        zIndex,
                        boxShadow: shadow,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }, children: [(title || description || showCloseButton) && (_jsxs(Flex, { align: "center", justify: "between", children: [_jsxs(Box, { children: [title && (_jsx(Heading, { style: { margin: 0, fontSize: "18px", fontWeight: 600 }, children: title })), description && (_jsx(Text, { style: {
                                                margin: "4px 0 0 0",
                                                fontSize: "14px",
                                                color: "#666",
                                            }, children: description }))] }), showCloseButton && (_jsx(IconButton, { onClick: handleClose, color: "gray", type: "button", children: _jsx(X, {}) }))] })), _jsx(Box, { className: "flex-1 ", children: children })] }, "sheet-content")] })) }));
};
//# sourceMappingURL=custom-sheet.js.map