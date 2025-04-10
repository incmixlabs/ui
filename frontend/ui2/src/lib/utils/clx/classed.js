import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { forwardRef, useMemo } from "react";
import { TW_VARS, getDataAttributes, mapPropsToVariantClass, parseClassNames, } from "./core";
import { COMPONENT_SYMBOL, isClassedComponent } from "./unique";
// 1. cx
const cx = (...args) => args.filter((v) => !!v && typeof v === "string").join(" ");
// 2. internalClassed
const internalClassed = (elementType, classNames, { merger = cx } = {}) => {
    const toParse = Array.from(classNames);
    const isClassed = isClassedComponent(elementType);
    if (isClassed) {
        toParse.unshift(elementType);
    }
    const { className, variants, defaultVariants, compoundVariants, dataAttributes, defaultProps, } = parseClassNames(toParse);
    // eslint-disable-next-line react/display-name
    const Comp = forwardRef(({ as, className: cName, ...props }, forwardedRef) => {
        const Component = isClassed
            ? elementType
            : typeof elementType === "object"
                ? elementType
                : as || elementType;
        // Map props variant to className
        const [variantClassNames, dataAttributeProps] = useMemo(() => {
            const dataAttributeProps = getDataAttributes({
                props,
                dataAttributes,
                variants,
                defaultVariants,
            });
            return [
                mapPropsToVariantClass({ variants, defaultVariants, compoundVariants }, props, true),
                dataAttributeProps,
            ];
        }, [props]);
        const merged = useMemo(() => merger(className, variantClassNames, cName), [className, cName, variantClassNames]);
        return (_jsx(Component, { className: merged, ...props, ...(isClassed && Object.keys(defaultVariants).length
                ? defaultVariants
                : {}), ...dataAttributeProps, ...defaultProps, as: isClassed ? as : undefined, ref: forwardedRef }));
    });
    Comp.displayName =
        typeof elementType !== "string"
            ? elementType.displayName || elementType.name || "Compoonent"
            : `TwComponent(${elementType})`;
    Reflect.set(Comp, TW_VARS, {
        className,
        variants,
        defaultVariants,
        compoundVariants,
        dataAttributes,
    });
    Reflect.set(Comp, COMPONENT_SYMBOL, true);
    return Comp;
};
// 3. createClassed
const createClassed = ((config) => {
    const classedWithConfig = (elementType, ...args) => {
        return internalClassed(elementType, args, config);
    };
    const classedProxy = new Proxy(classedWithConfig, {
        get: (_, type) => {
            return function (...args) {
                return classedWithConfig.apply(this, [type, ...args]);
            };
        },
    });
    return {
        classed: classedProxy,
    };
});
const makeStrict = ((component) => component);
//
/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                         EXPORTS                            */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
export { createClassed, makeStrict, internalClassed, cx };
//# sourceMappingURL=classed.js.map