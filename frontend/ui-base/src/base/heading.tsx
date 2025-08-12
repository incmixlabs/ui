import { Heading as RadixHeading } from "@/radix-ui/heading";

type RadixHeadingProps = React.ComponentProps<typeof RadixHeading>;

type HeadingVariant =
  | "hero"
  | "pageTitle"
  | "sectionTitle"
  | "subsection";

const headingVariants: Record<HeadingVariant, Partial<RadixHeadingProps>> = {
  hero: { as: "h1", size: "8", weight: "bold" },
  pageTitle: { as: "h2", size: "6", weight: "medium" },
  sectionTitle: { as: "h3", size: "5", weight: "medium" },
  subsection: { as: "h4", size: "4", weight: "regular",},
};

type HeadingType = RadixHeadingProps & {
  children: React.ReactNode;
  variant?: HeadingVariant;
};

export const Heading = ({ children, variant, ...props }: HeadingType) => {
  const variantProps = variant ? headingVariants[variant] : {};
  return (
    <RadixHeading {...variantProps} {...props}>
      {children}
    </RadixHeading>
  );
};
