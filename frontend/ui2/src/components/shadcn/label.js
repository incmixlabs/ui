"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
function Label({ className, ...props }) {
    return (_jsx(LabelPrimitive.Root, { "data-slot": "label", className: cn("flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50", className), ...props }));
}
export { Label };
//# sourceMappingURL=label.js.map