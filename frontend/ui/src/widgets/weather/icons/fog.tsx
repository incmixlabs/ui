import React from "react"
import type { IconProps } from "./types"

export function Fog({ size = "15", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Fog Icon"
      {...props}
    >
      <path
        fill="var(--foreground)"
        d="M14.2 15.996H4.354a.53.53 0 0 0-.537.537c0 .313.235.547.537.547H14.2a.54.54 0 0 0 .537-.547.536.536 0 0 0-.537-.537m0-2.598H4.354a.53.53 0 0 0-.537.537c0 .313.235.547.537.547H14.2a.54.54 0 0 0 .537-.546.536.536 0 0 0-.537-.538M4.082 11.68h9.463c2.549 0 4.424-1.934 4.424-4.317 0-2.48-2.012-4.287-4.63-4.287C12.384 1.201 10.577 0 8.4 0 5.49 0 3.087 2.256 2.833 5.098 1.455 5.498.42 6.728.42 8.35c0 1.845 1.338 3.33 3.662 3.33"
      />
    </svg>
  )
}
