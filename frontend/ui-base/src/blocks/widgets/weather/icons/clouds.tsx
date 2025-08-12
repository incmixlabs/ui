import React from "react"
import type { IconProps } from "./types"

export function Clouds({ size = "15", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Clouds Icon"
      {...props}
    >
      <path
        d="M3.838 12.188h9.941c2.598 0 4.61-1.963 4.61-4.502 0-2.569-2.08-4.473-4.864-4.463C12.51 1.21 10.605 0 8.37 0c-3.017 0-5.547 2.334-5.8 5.342A3.47 3.47 0 0 0 .028 8.72c0 2.06 1.534 3.467 3.809 3.467"
        fill="var(--foreground)"
      />
    </svg>
  )
}
