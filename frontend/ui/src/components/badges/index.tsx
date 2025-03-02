import type React from "react"
import { Badge } from "../badge"
import type { BadgeProps } from "@radix-ui/themes"


type ThemeColor = BadgeProps["color"] | "black"

interface BadgeComponentProps {
  themeColor: ThemeColor
}

export const BadgeComponent: React.FC<BadgeComponentProps> = ({ themeColor = "gray", }) => {

  return (
    <div className="grid w-[30rem] place-content-center gap-5 space-y-4 px-10">
      <Badge color={themeColor} className="block w-fit px-3 py-1 text-center text-xl capitalize">Primary</Badge>
    </div>
  );
};
