import { AspectRatio, type AspectRatioProps } from "@/radix-ui/aspect-ratio"
import { cn } from "@/utils/cn"
import { useState } from "react"

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt"> {
  alt?: string
  ratio?: AspectRatioProps["ratio"]
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  position?: React.CSSProperties["objectPosition"]
  fallback?: React.ReactNode
  loading?: "eager" | "lazy"
  priority?: boolean
  ref?: React.Ref<HTMLImageElement>
}

export const Image = ({
  src,
  alt = "Image",
  ratio,
  fit = "cover",
  position = "center",
  fallback,
  loading = "lazy",
  priority = false,
  className,
  style,
  onError,
  onLoad,
  ref,
  ...props
}: ImageProps) => {
  const [errored, setErrored] = useState(false)
  const effectiveLoading = priority ? "eager" : loading

  const handleError: React.ImgHTMLAttributes<HTMLImageElement>["onError"] = (
    e
  ) => {
    setErrored(true)
    onError?.(e)
  }

  const handleLoad: React.ImgHTMLAttributes<HTMLImageElement>["onLoad"] = (
    e
  ) => {
    onLoad?.(e)
  }

  if (errored && fallback) {
    return ratio ? (
      <AspectRatio ratio={ratio}>{fallback}</AspectRatio>
    ) : (
      <>{fallback}</>
    )
  }

  const imageElement = (
    // biome-ignore lint/a11y/useAltText: <explanation>
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={effectiveLoading}
      decoding="async"
      onError={handleError}
      onLoad={handleLoad}
      className={cn("h-full w-full", className)}
      style={{
        objectFit: fit,
        objectPosition: position,
        ...style,
      }}
      {...props}
    />
  )

  return ratio ? (
    <AspectRatio ratio={ratio}>{imageElement}</AspectRatio>
  ) : (
    imageElement
  )
}

Image.displayName = "Image"
