import React from "react"
import type { IconProps } from "./types"

export function Thunderstorm({ size = "15", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Thunderstorm Icon"
      {...props}
    >
      <path
        fill="#fff"
        d="M11.27 15.062H9.463l-.039.37.889-1.718c.088-.166.02-.293-.147-.293H8.262c-.215 0-.293.078-.361.235l-1.036 2.363c-.078.185-.01.303.196.303h1.494l.098-.45-1.221 2.96c-.04.097-.02.185.049.214q.102.047.234-.068l3.662-3.535c.176-.166.117-.381-.107-.381m-7.188-2.725h9.463c2.549 0 4.424-1.933 4.424-4.316 0-2.48-2.012-4.287-4.63-4.287C12.384 1.859 10.577.657 8.4.657c-2.91 0-5.313 2.256-5.567 5.098C1.455 6.155.42 7.386.42 9.007c0 1.846 1.338 3.33 3.662 3.33"
      />
    </svg>
  )
}
