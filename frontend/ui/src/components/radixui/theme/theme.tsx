import { Theme  as RadixTheme, ThemeContext as RadixThemeContext, useThemeContext as useRadixThemeContext } from "@radix-ui/themes"
import type { ThemeProps as RadixThemeProps } from "@radix-ui/themes/src/components/theme.props.js"
export { themePropDefs } from "@radix-ui/themes/src/components/theme.props.js"

type ThemeProps = RadixThemeProps & {
  pastel?: boolean
  sidebarBg? : string
  dashboardColor1?: string
  dashboardColor2?: string
  dashboardColor3?: string
}