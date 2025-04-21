import { Box, cn } from "@incmix/ui"
import type { BoxProps } from "@radix-ui/themes"
import { useEffect, useRef } from "react"
import { createSwapy } from "swapy"
import { DragHandle } from "./drag-handle"

type AnimationType = "dynamic" | "spring" | "none"
type SwapMode = "hover" | "stop" | "drop"

type Config = {
  animation: AnimationType
  continuousMode: boolean
  manualSwap: boolean
  swapMode: SwapMode
  autoScrollOnDrag: boolean
}

type SwapyLayoutProps = {
  id: string
  enable?: boolean
  onSwap?: (record: Record<string, string | null>) => void
  config?: Partial<Config>
  children: React.ReactNode
} & BoxProps

export const SwapyLayout = ({
  id,
  enable = true,
  onSwap = () => {},
  config = {},
  children,
  ...props
}: SwapyLayoutProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const swapyRef = useRef<ReturnType<typeof createSwapy> | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const instance = createSwapy(container, config)
    swapyRef.current = instance

    instance.enable(enable)
    instance.onSwap(
      (event: { data: { object: Record<string, string | null> } }) => {
        onSwap(event.data.object)
      }
    )

    return () => {
      instance.destroy()
    }
  }, [enable, onSwap, config])

  return (
    <Box as="div" id={id} ref={containerRef} {...props}>
      {children}
    </Box>
  )
}

type SwapySlotProps = {
  id: string
  showHandle?: boolean
  className?: string
  children: React.ReactNode
} & BoxProps

export const SwapySlot = ({
  id,
  showHandle = true,
  className,
  children,
  ...props
}: SwapySlotProps) => {
  return (
    <Box
      as="div"
      className={cn("h-full", className)}
      data-swapy-slot={id}
      style={{ position: "relative" }}
      {...props}
    >
      <Box as="div" className="h-full" data-swapy-item={id}>
        {showHandle && <DragHandle />}
        {children}
      </Box>
    </Box>
  )
}

type SwapyExcludeProps = {
  children: React.ReactNode
} & BoxProps

export const SwapyExclude = ({ children, ...props }: SwapyExcludeProps) => {
  return (
    <Box as="div" data-swapy-exclude {...props}>
      {children}
    </Box>
  )
}
