import type { ClassNamesAndVariant, InferVariantProps, VariantConfig, Variants } from "./types";
/**
 * Parses & merging variants from a given string or variant config
 * @internal
 */
export declare const parseClassNames: <TVariants extends Variants>(classNames: Array<ClassNamesAndVariant<TVariants> | any>) => {
    className: string;
    variants: TVariants;
    defaultVariants: Partial<Partial<{ [K in keyof TVariants]: keyof TVariants[K]; }>>;
    compoundVariants: Record<string, any>[];
    dataAttributes: string[];
    defaultProps: Record<string, unknown>;
};
/**
 * Gets the variant selector from the variant props
 */
export declare const getVariantSelector: <TVariants extends Variants>(variantKey: string, props: Partial<InferVariantProps<TVariants>>, { defaultVariants }: Pick<VariantConfig<TVariants>, "defaultVariants">) => string | undefined;
export declare const mapPropsToVariantClass: <TVariants extends Variants, TRecord extends VariantConfig<TVariants> = VariantConfig<TVariants>>({ variants, defaultVariants, compoundVariants, }: {
    variants: TVariants;
    defaultVariants: TRecord["defaultVariants"];
    compoundVariants?: Record<string, any>[];
}, props?: Partial<InferVariantProps<TVariants>>, shouldDeleteProps?: boolean) => string;
export declare function getCompoundVariantClasses({ props, defaultVariants, }: {
    defaultVariants: VariantConfig<any>["defaultVariants"];
    props: Record<string, any>;
}, compoundVariants?: VariantConfig<any>["compoundVariants"]): string[];
export declare function getDataAttributes({ props, dataAttributes, variants, defaultVariants, }: {
    props: Record<string, any>;
    dataAttributes: string[];
    variants: VariantConfig<any>["variants"];
    defaultVariants: VariantConfig<any>["defaultVariants"];
}): Record<string, string>;
//# sourceMappingURL=parser.d.ts.map