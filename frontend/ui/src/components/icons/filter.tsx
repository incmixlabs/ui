import type * as React from "react"

export const FilterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props} // ✅ spreads props like className, style, onClick, etc.
  >
    <title id="filterIconTitle">Filter icon</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9.113 4.938h4.2"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M2.667 4.964A1.57 1.57 0 0 0 4.24 6.528c.87 0 1.576-.7 1.576-1.564A1.57 1.57 0 0 0 4.241 3.4c-.87 0-1.574.7-1.574 1.564"
      clipRule="evenodd"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M7.24 11.4H3.039"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M10.182 11.436A1.57 1.57 0 0 0 11.758 13c.87 0 1.575-.7 1.575-1.564a1.57 1.57 0 0 0-1.575-1.564c-.87 0-1.576.7-1.576 1.564"
      clipRule="evenodd"
    />
  </svg>
)
