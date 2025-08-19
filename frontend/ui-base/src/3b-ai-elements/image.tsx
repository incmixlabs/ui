import { cn } from "@/utils/cn"
import type { Experimental_GeneratedImage } from "ai"
import type { ComponentProps } from "react"

export type ImageProps = Omit<ComponentProps<"img">, "src"> &
  Experimental_GeneratedImage

export const Image = ({
  base64,
  uint8Array,
  mediaType,
  ...props
}: ImageProps) => (
  <img
    {...props}
    alt={props.alt}
    className={cn(
      "h-auto max-w-full overflow-hidden rounded-md",
      props.className
    )}
    src={`data:${mediaType};base64,${base64}`}
  />
)
