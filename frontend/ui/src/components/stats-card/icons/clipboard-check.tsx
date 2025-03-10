import type { IconProps } from "./types"

export function ClipBoardCheck({ size = "15", ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 20"
      fill="none"
      role="img"
      aria-label="Clipboard Check Icon"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.12515 1.67499C5.12515 1.56384 5.20949 1.50004 5.28137 1.50004H10.7188C10.7907 1.50004 10.875 1.56384 10.875 1.67499V2.58546L10.8748 2.6006L10.875 2.61574V3.52492C10.875 3.63607 10.7907 3.69986 10.7188 3.69986H5.28137C5.20949 3.69986 5.12515 3.63607 5.12515 3.52492V1.67499ZM12.3751 3.35062V3.52492C12.3751 4.43545 11.6479 5.19991 10.7188 5.19991H5.28137C4.35225 5.19991 3.62511 4.43545 3.62511 3.52492V3.35062H2.5625C2.28573 3.35062 2.01711 3.46269 1.81662 3.66733C1.61563 3.87248 1.50004 4.15392 1.50004 4.45053V17.4C1.50004 17.6966 1.61563 17.978 1.81662 18.1832C2.01711 18.3879 2.28573 18.5 2.5625 18.5H13.4374C13.7141 18.5 13.9827 18.3879 14.1832 18.1832C14.3842 17.978 14.4998 17.6966 14.4998 17.4V12.4877L15.9999 11.0664V17.4C15.9999 18.0846 15.7336 18.7444 15.2548 19.233C14.7754 19.7223 14.122 20 13.4374 20H2.5625C1.87788 20 1.22447 19.7223 0.745144 19.233C0.266329 18.7444 0 18.0846 0 17.4V4.45053C0 3.76587 0.266329 3.10624 0.745144 2.61754C1.22447 2.1283 1.87788 1.85058 2.5625 1.85058H3.62511V1.67499C3.62511 0.764452 4.35225 0 5.28137 0H10.7188C11.6479 0 12.3751 0.764452 12.3751 1.67499V1.85058H13.4374C14.122 1.85058 14.7754 2.1283 15.2548 2.61754C15.4399 2.8065 15.5933 3.02104 15.7118 3.25269C15.3989 3.3905 15.1048 3.58287 14.8443 3.82968L14.4685 4.1857C14.4215 3.9897 14.3231 3.81005 14.1832 3.66733C13.9827 3.46269 13.7141 3.35062 13.4374 3.35062H12.3751ZM17.5171 5.21302C17.8283 5.50708 17.8283 5.9851 17.5171 6.27915L8.59507 14.7328C8.58313 14.7464 8.5704 14.7592 8.55687 14.7712C8.43034 14.8919 8.27119 14.9628 8.10646 14.9846C8.06827 14.99 8.03007 14.9923 7.99187 14.9923C7.78815 14.9923 7.58444 14.919 7.42927 14.7712C7.41918 14.7623 7.40998 14.7528 7.40068 14.7433C7.3975 14.7401 7.39431 14.7368 7.39107 14.7336L4.23348 11.7411C3.92234 11.4469 3.92234 10.9697 4.23348 10.6749C4.54383 10.3801 5.04834 10.3801 5.35869 10.6749L7.99347 13.1706L16.392 5.21302C16.7031 4.91821 17.2068 4.91821 17.5171 5.21302Z"
        fill="#49C96D"
      />
    </svg>
  )
}
