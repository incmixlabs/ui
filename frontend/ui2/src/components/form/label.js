"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "@/lib/cva";
import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
const labelVariants = cva("font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => (_jsx(LabelPrimitive.Root, { ref: ref, className: cn(labelVariants(), className), ...props })));
Label.displayName = LabelPrimitive.Root.displayName;
export { Label };
//# sourceMappingURL=label.js.map