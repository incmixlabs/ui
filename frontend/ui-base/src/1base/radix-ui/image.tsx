import { AspectRatio, type AspectRatioProps } from "@/radix-ui/aspect-ratio"
import { cn } from "@/utils/cn"
import { forwardRef } from "react"

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt"> {
  alt?: string
  ratio?: AspectRatioProps["ratio"]
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  position?: string
  fallback?: React.ReactNode
  loading?: "eager" | "lazy"
  priority?: boolean
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt = "Image",
      ratio,
      fit = "cover",
      position = "center",
      fallback,
      className,
      loading = "lazy",
      onError,
      onLoad,
      style,
      ...props
    },
    ref
  ) => {
    const imageElement = (
      // biome-ignore lint/a11y/useAltText: <explanation>
      <img
        ref={ref}
        src={src}
        alt={alt}
        aria-labelledby={alt}
        loading={loading}
        onError={onError}
        onLoad={onLoad}
        className={cn("h-full w-full", className)}
        style={{
          objectFit: fit,
          objectPosition: position,
          ...style,
        }}
        {...props}
      />
    )

    if (ratio) {
      return <AspectRatio ratio={ratio}>{imageElement}</AspectRatio>
    }

    return imageElement
  }
)

Image.displayName = "Image"
