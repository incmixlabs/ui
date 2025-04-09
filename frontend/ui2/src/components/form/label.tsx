"use client"

import { type VariantProps, cva } from "@/lib/cva"
import { cn } from "@/lib/utils"
import * as LabelPrimitive from "@radix-ui/react-label"
import type * as React from "react"

const labelVariants = cva(
  "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) => (
  <LabelPrimitive.Root className={cn(labelVariants(), className)} {...props} />
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
