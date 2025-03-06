import { type VariantProps, cn, cva } from "@utils"
import * as React from "react"

import { Drawer as DrawerPrimitive } from "vaul"

const DrawerVariants = cva(
  "fixed z-115 flex flex-col overflow-x-hidden rounded-t-2.5 border bg-background p-4",
  {
    variants: {
      direction: {
        top: "inset-x-0 top-0 mb-24 flex-col",
        bottom: "inset-x-0 bottom-0 mt-24 flex-col",
        right: "inset-y-0 right-0 w-[95vw] flex-row",
        left: "inset-y-0 left-0 w-[95vw] flex-row",
      },
    },
    defaultVariants: {
      direction: "bottom",
    },
  }
)

const DrawerSliderVariants = cva("absolute z-10 rounded-full bg-muted", {
  variants: {
    direction: {
      top: "bottom-0.5 mx-auto my-0.5 ml-[calc(50vw-2rem)] h-1 w-12",
      bottom: "top-0.5 mx-auto my-0.5 ml-[calc(50vw-2rem)] h-1 w-12",
      right: "left-0.5 mx-0.5 my-auto mt-[calc(50vh-2.5rem)] h-16 w-1",
      left: "right-0.5 mx-0.5 my-auto mt-[calc(50vh-2.5rem)] h-16 w-1",
    },
  },
  defaultVariants: {
    direction: "bottom",
  },
})

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-110 bg-background/40 backdrop-blur-xs",
      className
    )}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

export interface DrawerContentProps
  extends VariantProps<typeof DrawerVariants>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, direction, children, ...props }, ref) => {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(DrawerVariants({ direction }), className)}
        {...props}
      >
        <div className={DrawerSliderVariants({ direction })} />
        <div className="h-full w-full">{children}</div>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
})

DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 pb-3 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2", className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-left font-semibold text-lg leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-left font-light text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
