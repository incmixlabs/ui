import type { IconProps } from "./types"

export function ThreeDots({ size = "15", ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      role="img"
      aria-label="Three Dots Icon"
      {...props}
    >
      <mask
        id="mask0_2661_84500"
        maskUnits="userSpaceOnUse"
        x="3"
        y="11"
        width="20"
        height="4"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.15 13C7.15 14.0769 6.27696 14.95 5.2 14.95C4.12304 14.95 3.25 14.0769 3.25 13C3.25 11.923 4.12304 11.05 5.2 11.05C6.27696 11.05 7.15 11.923 7.15 13ZM14.95 13C14.95 14.0769 14.077 14.95 13 14.95C11.923 14.95 11.05 14.0769 11.05 13C11.05 11.923 11.923 11.05 13 11.05C14.077 11.05 14.95 11.923 14.95 13ZM20.8 14.95C21.8769 14.95 22.75 14.0769 22.75 13C22.75 11.923 21.8769 11.05 20.8 11.05C19.7231 11.05 18.85 11.923 18.85 13C18.85 14.0769 19.7231 14.95 20.8 14.95Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_2661_84500)">
        <rect width="26" height="26" fill="#8A9099" />
      </g>
    </svg>
  )
}
