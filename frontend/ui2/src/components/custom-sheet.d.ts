import type React from "react";
interface SheetProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    side?: "top" | "right" | "bottom" | "left";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    closeOnOutsideClick?: boolean;
    closeOnEsc?: boolean;
    showCloseButton?: boolean;
    overlayColor?: string;
    closeButtonText?: string;
    contentBackground?: string;
    className?: string;
    isFilterClassName?: string;
    shadow?: string;
    zIndex?: number;
    isFilter?: boolean;
}
export declare const MotionSheet: React.FC<SheetProps>;
export {};
//# sourceMappingURL=custom-sheet.d.ts.map