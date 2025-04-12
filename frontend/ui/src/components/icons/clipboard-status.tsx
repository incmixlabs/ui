import type { IconProps } from "@/types"

export function ClipBoardStatus({
  color = "#FFD240",
  size = "15",
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 19 22"
      fill="none"
      role="img"
      aria-label="Clipboard Status Icon"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.125 1.67556C8.125 1.56437 8.20933 1.50056 8.28121 1.50056H13.7185C13.7904 1.50056 13.8747 1.56437 13.8747 1.67556V2.58634L13.8745 2.60149L13.8747 2.61664V3.52612C13.8747 3.63732 13.7904 3.70113 13.7185 3.70113H8.28121C8.20933 3.70113 8.125 3.63732 8.125 3.52612V1.67556ZM15.3747 3.35177V3.52612C15.3747 4.43697 14.6476 5.20169 13.7185 5.20169H8.28121C7.35212 5.20169 6.625 4.43697 6.625 3.52612V3.35177H5.56242C5.28566 3.35177 5.01705 3.46388 4.81657 3.66859C4.61558 3.8738 4.5 4.15535 4.5 4.45206V9.01776C4.36347 9.00278 4.22521 8.99511 4.08571 8.99511C3.71176 8.99511 3.34671 9.05014 3 9.15391V4.45206C3 3.76716 3.26632 3.10731 3.74512 2.61844C4.22443 2.12903 4.87782 1.85121 5.56242 1.85121H6.625V1.67556C6.625 0.764714 7.35212 0 8.28121 0H13.7185C14.6476 0 15.3747 0.764714 15.3747 1.67556V1.85121H16.437C17.1216 1.85121 17.775 2.12903 18.2543 2.61844C18.7331 3.10731 18.9994 3.76716 18.9994 4.45206V17.406C18.9994 18.0908 18.7331 18.7508 18.2543 19.2396C17.775 19.7291 17.1216 20.0069 16.437 20.0069H12.5085C13.0186 19.6184 13.4279 19.1032 13.6877 18.5063H16.437C16.7137 18.5063 16.9823 18.3942 17.1828 18.1895C17.3838 17.9842 17.4994 17.7027 17.4994 17.406V4.45206C17.4994 4.15535 17.3838 3.8738 17.1828 3.66859C16.9823 3.46388 16.7137 3.35177 16.437 3.35177H15.3747ZM4.83111 12.5307C4.72416 12.2115 4.42391 11.9963 4.08571 11.9963C3.74752 11.9963 3.44727 12.2115 3.34032 12.5307L2.10512 16.2165H0.785714C0.351776 16.2165 0 16.5665 0 16.9981C0 17.4297 0.351776 17.7796 0.785714 17.7796H2.67143C3.00962 17.7796 3.30988 17.5643 3.41682 17.2452L4.08571 15.2492L6.16889 21.4656C6.27584 21.7847 6.57609 22 6.91429 22C7.25248 22 7.55273 21.7847 7.65968 21.4656L8.89488 17.7796H10.2143C10.6482 17.7796 11 17.4297 11 16.9981C11 16.5665 10.6482 16.2165 10.2143 16.2165H8.32857C7.99038 16.2165 7.69012 16.4318 7.58318 16.7509L6.91429 18.747L4.83111 12.5307Z"
        fill={color}
      />
    </svg>
  )
}
