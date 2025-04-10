import { $$ClassedVariants, type ClassedCoreFunctionType } from "./types";
export interface ClassedCoreConfig {
    merger?: (...args: string[]) => any;
}
export type CreateClassedCoreType = (config?: ClassedCoreConfig) => {
    classed: ClassedCoreFunctionType;
};
export declare const createClassed: CreateClassedCoreType;
export declare const classed: ClassedCoreFunctionType;
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
export declare function getVariantConfig<T extends {
    [$$ClassedVariants]: {};
}>(component: T): T[$$ClassedVariants];
//# sourceMappingURL=classed.d.ts.map