import { strEnum } from "@incmix/utils/strings"
import { accentColorPropDef as radixAccentColorPropDef } from "@radix-ui/themes/src/props/color.prop.js"
import { colorPropDef as radixColorPropDef } from "@radix-ui/themes/src/props/color.prop.js"
import { accentColors as radixAccentColors } from "@radix-ui/themes/src/props/color.prop.js"
import { grayColors as radixGrayColors } from "@radix-ui/themes/src/props/color.prop.js"

// Define custom task colors
export const dashboardColors = [
  "color1",
  "color2",
  "color3",
  "color4",
  "color5",
] as const


export const dashboardColorValues = {
  color1: "var(--color-done)",
  color2: "var(--color-hold)",
  color3: "var(--color-ongoing)",
  color4: "var(--color-track)",
  color5: "var(--color-blue)",
}


export const accentColors = radixAccentColors
export const grayColors = radixGrayColors
export const allColors = [...accentColors, ...grayColors, ...dashboardColors]
export const accentColorPropDef = radixAccentColorPropDef
export const colorPropDef = radixColorPropDef

export const accentColorEnums = strEnum([...accentColors]) as {
  [K in AccentColor]: K
}
export const grayColorEnums = strEnum([...grayColors]) as {
  [K in GrayColor]: K
}

export const dashboardColorEnums = strEnum([...dashboardColors]) as {
  [K in DashboardColor]: K
}

export const allColorEnums = strEnum(allColors) as { [K in AccentColor]: K }

export type AccentColor = (typeof accentColors)[number]
export type DashboardColor = (typeof dashboardColors)[number]
export type GrayColor = (typeof grayColors)[number]
export type Color = AccentColor | GrayColor
