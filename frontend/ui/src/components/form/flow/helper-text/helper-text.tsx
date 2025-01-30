import type { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "@utils/objects";
import type { DeepPartial, DynamicStringEnumKeysOf } from "@types";
import type { HelperTextTheme, HelperColors} from "./theme";
import { helperTextTheme } from "./theme";

export interface HelperTextProps extends Omit<ComponentProps<"p">, "color"> {
  color?: DynamicStringEnumKeysOf<HelperColors>;
  theme?: DeepPartial<HelperTextTheme>;
  value?: string;
}

export const HelperText: FC<HelperTextProps> = ({
  children,
  className,
  color = "default",
  theme: customTheme = {},
  value,
  ...props
}) => {
  const theme = mergeDeep(helperTextTheme, customTheme);

  return (
    <p className={twMerge(theme.root.base, theme.root.colors[color], className)} {...props}>
      {value ?? children ?? ""}
    </p>
  );
};

HelperText.displayName = "HelperText";
