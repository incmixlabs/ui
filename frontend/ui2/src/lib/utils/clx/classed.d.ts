import { type ClassNamesAndVariant, type Variants } from "./core";
import type { AnyComponent, ClassedComponentType, ClassedFunctionProxy, StrictComponentType, VariantProps } from "./types";
type ClassedConfig = {
    merger?: (...args: string[]) => any;
};
type CreateClassedType = (config?: ClassedConfig) => {
    classed: ClassedFunctionProxy;
};
declare const cx: (...args: string[]) => string;
declare const internalClassed: <T extends keyof JSX.IntrinsicElements | AnyComponent, V extends Variants = {}>(elementType: T, classNames: ClassNamesAndVariant<{}>[], { merger }?: ClassedConfig) => ClassedComponentType<T, V, {}>;
declare const createClassed: CreateClassedType;
type StrictClassedFunction = <T extends ClassedComponentType<any, {}>, Composers extends (keyof VariantProps<T>)[] | never[]>(comp: T, ...composers: Composers) => Composers extends never[] ? StrictComponentType<T> : StrictComponentType<T, Composers[number]>;
declare const makeStrict: StrictClassedFunction;
export { createClassed, makeStrict, internalClassed, cx };
export type { ClassedConfig, CreateClassedType, StrictClassedFunction };
//# sourceMappingURL=classed.d.ts.map