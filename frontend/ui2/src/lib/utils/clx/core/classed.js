import { cn } from "./classNames";
import { TW_VARS } from "./constants";
import { mapPropsToVariantClass, parseClassNames } from "./parser";
import { 
// ClassedType,
// ClassedVariants,
$$ClassedVariants, } from "./types";
const internalClassed = (classes, { merger = cn } = {}) => {
    const { className, variants, defaultVariants, compoundVariants } = parseClassNames(classes);
    const producer = ((variantProps) => {
        const variantClassName = mapPropsToVariantClass({ variants, defaultVariants, compoundVariants }, variantProps);
        const extra = [variantProps?.className, variantProps?.class].filter(Boolean);
        return merger(className, variantClassName, ...extra);
    });
    Reflect.set(producer, TW_VARS, {
        className,
        variants,
        defaultVariants,
        compoundVariants,
    });
    return producer;
};
export const createClassed = ((config) => {
    const classed = (...args) => internalClassed(args, config);
    return {
        classed,
    };
});
export const classed = createClassed().classed;
/**
 * @param component - The component to get the variant configuration for.
 * @returns The variant configuration for the given component.
 * @example
 * const button = classed("button", {
 *  variants: {
 *    size: {
 *      sm: "text-sm",
 *      md: "text-md",
 *    },
 *  },
 * });
 *
 * const { variants } = getVariantConfig(button);
 *
 * expect(variants).toEqual({
 *   size: {
 *      sm: "text-sm",
 *      md: "text-md",
 *    },
 * });
 */
export function getVariantConfig(component) {
    return Reflect.get(component, TW_VARS);
}
//# sourceMappingURL=classed.js.map