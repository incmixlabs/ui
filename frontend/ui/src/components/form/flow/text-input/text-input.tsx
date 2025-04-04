import type {
  BooleanComp,
  Colors,
  DeepPartial,
  DynamicStringEnumKeysOf,
  Sizes,
} from "@types"
import { mergeDeep } from "@utils/objects"
import type { ComponentProps, FC, ReactNode } from "react"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { HelperText } from "../helper-text"
import { type TextInputTheme, textInputTheme } from "./theme"

export interface TextInputColors
  extends Pick<Colors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string
}

export interface TextInputSizes extends Pick<Sizes, "sm" | "md" | "lg"> {
  [key: string]: string
}

export interface TextInputProps
  extends Omit<ComponentProps<"input">, "ref" | "color"> {
  addon?: ReactNode
  color?: DynamicStringEnumKeysOf<TextInputColors>
  helperText?: ReactNode
  icon?: FC<ComponentProps<"svg">>
  rightIcon?: FC<ComponentProps<"svg">>
  shadow?: boolean
  sizing?: DynamicStringEnumKeysOf<TextInputSizes>
  theme?: DeepPartial<TextInputTheme>
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      addon,
      className,
      color = "gray",
      helperText,
      icon: Icon,
      rightIcon: RightIcon,
      shadow,
      sizing = "md",
      theme: customTheme = {},
      type = "text",
      ...props
    },
    ref
  ) => {
    const theme = mergeDeep(textInputTheme, customTheme)

    return (
      <>
        <div className={twMerge(theme.base, className)}>
          {addon && <span className={theme.addon}>{addon}</span>}
          <div className={theme.field.base}>
            {Icon && (
              <div className={theme.field.icon.base}>
                <Icon className={theme.field.icon.svg} />
              </div>
            )}
            {RightIcon && (
              <div
                data-testid="right-icon"
                className={theme.field.rightIcon.base}
              >
                <RightIcon className={theme.field.rightIcon.svg} />
              </div>
            )}
            <input
              className={twMerge(
                theme.field.input.base,
                theme.field.input.colors[color],
                theme.field.input.sizes[sizing],
                theme.field.input.withIcon[Icon ? "on" : "off"],
                theme.field.input.withRightIcon[RightIcon ? "on" : "off"],
                theme.field.input.withAddon[addon ? "on" : "off"],
                theme.field.input.withShadow[shadow ? "on" : "off"]
              )}
              type={type}
              {...props}
              ref={ref}
            />
          </div>
        </div>
        {helperText && <HelperText color={color}>{helperText}</HelperText>}
      </>
    )
  }
)

TextInput.displayName = "TextInput"
