import type { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "@utils/objects";
import { omit } from "@utils/objects/omit";
import { cardTheme } from "./flow-card-theme";
import type { DeepPartial, Boolean } from "@types";


export interface FlowCardTheme {
  root: FlowCardRootTheme;
  img: FlowCardImageTheme;
}
export const Image: FC<FlowCardProps> = ({ theme: customTheme = {}, ...props }) => {
  const theme = mergeDeep(cardTheme, customTheme);
  if (props.renderImage) {
    return props.renderImage(theme, props.horizontal ?? false);
  }
  if (props.imgSrc) {
    return (
      <img
        data-testid="flowbite-card-image"
        alt={props.imgAlt ?? ""}
        src={props.imgSrc}
        className={twMerge(theme.img.base, theme.img.horizontal[props.horizontal ? "on" : "off"])}
      />
    );
  }
  return null;
};

export interface FlowCardRootTheme {
  base: string;
  children: string;
  horizontal: Boolean;
  href: string;
}

export interface FlowCardImageTheme {
  base: string;
  horizontal: Boolean;
}

interface CommonCardProps extends ComponentProps<"div"> {
  horizontal?: boolean;
  href?: string;
  /** Overwrites the theme. Will be merged with the context theme.
   * @default {}
   */
  theme?: DeepPartial<FlowCardTheme>;
}

export type FlowCardProps = (
  | { imgAlt?: string; imgSrc?: string; renderImage?: never }
  | {
      /** Allows to provide a custom render function for the image component. Useful in Next.JS and Gatsby. **Setting this will disable `imgSrc` and `imgAlt`**.
       */
      renderImage?: (theme: DeepPartial<FlowCardTheme>, horizontal: boolean) => JSX.Element;
      imgAlt?: never;
      imgSrc?: never;
    }
) &
  CommonCardProps;

export const FlowCard: FC<FlowCardProps> = (props) => {
  const { children, className, horizontal, href, theme: customTheme = {} } = props;
  const Component = typeof href === "undefined" ? "div" : "a";
  const theirProps = removeCustomProps(props);

  const theme = mergeDeep(cardTheme, customTheme);

  return (
    <Component
      data-testid="flowbite-card"
      href={href}
      className={twMerge(
        theme.root.base,
        theme.root.horizontal[horizontal ? "on" : "off"],
        href && theme.root.href,
        className,
      )}
      {...theirProps}
    >
      <Image {...props} />
      <div className={theme.root.children}>{children}</div>
    </Component>
  );
};


const removeCustomProps = omit([
  "renderImage",
  "imgSrc",
  "imgAlt",
  "children",
  "className",
  "horizontal",
  "href",
  "theme",
]);


export default FlowCard
