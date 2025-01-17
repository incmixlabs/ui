import { Box, type BoxProps } from "@radix-ui/themes"
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
  enable?: boolean
  onSwap?: (record: Record<string, string | null>) => void
  config?: Partial<Config>
}

export const SwapyLayout = ({
  id,
  enable = true,
  onSwap = () => {},
  config = {},
  children,
  ...props
}: SwapyLayoutProps & BoxProps) => {
  const swapy = useRef<ReturnType<typeof createSwapy>>()

  useEffect(() => {
    swapy.current = createSwapy(document.querySelector(`#${id}`), config)
    swapy.current.enable(enable)
    swapy.current.onSwap((event) => {
      onSwap(event.data.object)
    })

    return () => {
      swapy.current?.destroy()
    }
  }, [enable, onSwap, config, id])

  return (
    <Box as="div" id={id} {...props}>
      {children}
    </Box>
  )
}

type SwapySlotProps = BoxProps & {
  showHandle?: boolean
}

export const SwapySlot = ({
  id,
  showHandle = true,
  children,
  ...props
}: SwapySlotProps) => {
  return (
    <Box
      as="div"
      data-swapy-slot={id}
      style={{ position: "relative" }}
      {...props}
    >
      <Box as="div" data-swapy-item={id}>
        {showHandle && <DragHandle />}
        {children}
      </Box>
    </Box>
  )
}

export const SwapyExclude = ({ id, children, ...props }: BoxProps) => {
  return (
    <Box as="div" data-swapy-exclude {...props}>
      {children}
    </Box>
  )
}
