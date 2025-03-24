import { strEnum } from "@incmix/utils/strings"
import { accentColorPropDef as radixAccentColorPropDef } from "@radix-ui/themes/src/props/color.prop.js"
import { colorPropDef as radixColorPropDef } from "@radix-ui/themes/src/props/color.prop.js"
import { accentColors as radixAccentColors } from "@radix-ui/themes/src/props/color.prop.js"
import { grayColors as radixGrayColors } from "@radix-ui/themes/src/props/color.prop.js"

// Define custom task colors
export const taskColors = ["ongoing", "hold", "done", "track"] as const
export const taskColorValues = {
  ongoing: "#FF9D66",
  hold: "#3366FF",
  done: "#FFCC33",
  track: "#f2f4f7",
}

export const accentColors = radixAccentColors
export const grayColors = radixGrayColors
export const allColors = [...accentColors, ...grayColors, ...taskColors]
export const accentColorPropDef = radixAccentColorPropDef
export const colorPropDef = radixColorPropDef

export const accentColorEnums = strEnum([...accentColors]) as {
  [K in AccentColor]: K
}
export const grayColorEnums = strEnum([...grayColors]) as {
  [K in GrayColor]: K
}

export const taskColorEnums = strEnum([...taskColors]) as {
  [K in TaskColor]: K
}

export const allColorEnums = strEnum(allColors) as { [K in AccentColor]: K }

export type AccentColor = (typeof accentColors)[number]
export type TaskColor = (typeof taskColors)[number]
export type GrayColor = (typeof grayColors)[number]
export type Color = AccentColor | GrayColor
