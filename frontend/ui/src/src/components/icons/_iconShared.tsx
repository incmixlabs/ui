import type React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  title?: string;
}

export function SvgIcon({ children, className, title, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <title>{title || "Icon"}</title>
      {children}
    </svg>
  );
}
