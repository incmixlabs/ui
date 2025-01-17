import { accentColorPropDef as radixAccentColorPropDef } from "@radix-ui/themes/src/props/color.prop.js"
import { colorPropDef as radixColorPropDef } from "@radix-ui/themes/src/props/color.prop.js"
import { accentColors as radixAccentColors } from "@radix-ui/themes/src/props/color.prop.js"
import { grayColors as radixGrayColors } from "@radix-ui/themes/src/props/color.prop.js"
import { strEnum } from "@jsprtmnn/utils/strings"
export const accentColors = radixAccentColors
export const grayColors = radixGrayColors
export const allColors = [...accentColors, ...grayColors]
export const accentColorPropDef = radixAccentColorPropDef
export const colorPropDef = radixColorPropDef

export const accentColorEnums = strEnum([...accentColors]) as {
  [K in AccentColor]: K
}
export const grayColorEnums = strEnum([...grayColors]) as {
  [K in GrayColor]: K
}
export const allColorEnums = strEnum(allColors) as { [K in AccentColor]: K }

export type AccentColor = (typeof accentColors)[number]
export type GrayColor = (typeof grayColors)[number]
export type Color = AccentColor | GrayColor
