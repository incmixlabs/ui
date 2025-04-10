import { cx, mergeClass } from "./classNames";
import { TW_VARS } from "./constants";
/**
 * Parses & merging variants from a given string or variant config
 * @internal
 */
export const parseClassNames = (classNames) => {
    const stringClassNames = [];
    const variantObj = {};
    const defaultVariants = {};
    const compoundVariants = [];
    const dataAttributes = new Set();
    const defaultProps = {};
    for (const className of classNames) {
        if (!className) {
            continue;
        }
        if (typeof className === "string") {
            stringClassNames.push(className);
            continue;
        }
        if (typeof className === "object" || typeof className === "function") {
            const record = Reflect.has(className, TW_VARS)
                ? Reflect.get(className, TW_VARS)
                : className;
            if (record.variants) {
                Object.assign(variantObj, record.variants);
            }
            if (record.defaultVariants) {
                Object.assign(defaultVariants, record.defaultVariants);
            }
            if (record.compoundVariants) {
                record.compoundVariants.forEach((cv) => compoundVariants.push(cv));
            }
            if (record.className) {
                stringClassNames.push(record.className);
            }
            if (record.base) {
                stringClassNames.push(record.base);
            }
            if (record.dataAttributes) {
                record.dataAttributes.forEach((name) => {
                    dataAttributes.add(name);
                });
            }
            if (record.defaultProps) {
                Object.assign(defaultProps, record.defaultProps);
            }
        }
    }
    return {
        className: cx(stringClassNames),
        variants: variantObj,
        defaultVariants,
        compoundVariants,
        dataAttributes: Array.from(dataAttributes),
        defaultProps,
    };
};
/**
 * Gets the variant selector from the variant props
 */
export const getVariantSelector = (variantKey, props, { defaultVariants }) => {
    const variantValue = props[variantKey];
    const vStringValue = variantValue?.toString();
    return vStringValue || defaultVariants?.[variantKey]?.toString();
};
export const mapPropsToVariantClass = ({ variants, defaultVariants, compoundVariants, }, props = {}, shouldDeleteProps = false) => {
    const matchedKeys = new Set();
    const producedClassName = Object.keys(variants).reduce((acc, variantKey) => {
        const variantSelector = getVariantSelector(variantKey, props, {
            defaultVariants,
        });
        if (!variantSelector) {
            return acc;
        }
        shouldDeleteProps && matchedKeys.add(variantKey);
        const variantClassName = variants[variantKey][variantSelector];
        if (!variantClassName) {
            return acc;
        }
        // Variant is matched
        return mergeClass(acc, variantClassName);
    }, "");
    const compoundedClassNames = getCompoundVariantClasses({
        props,
        defaultVariants,
    }, compoundVariants);
    shouldDeleteProps && matchedKeys.forEach((key) => delete props[key]);
    return mergeClass(producedClassName, compoundedClassNames?.join(" "));
};
export function getCompoundVariantClasses({ props, defaultVariants, }, compoundVariants = []) {
    return compoundVariants.reduce((acc, { class: cvClass, className: cvClassName, ...cvo }) => {
        const notMatched = Object.entries(cvo).some(([key, value]) => {
            const propValue = props[key];
            const valueToUse = propValue !== undefined ? propValue : defaultVariants?.[key];
            return Array.isArray(value)
                ? !value.includes(valueToUse)
                : valueToUse !== value;
        });
        if (!notMatched) {
            if (cvClass) {
                acc.push(cvClass);
            }
            if (cvClassName) {
                acc.push(cvClassName);
            }
        }
        return acc;
    }, []);
}
export function getDataAttributes({ props, dataAttributes, variants, defaultVariants, }) {
    if (dataAttributes.length === 0) {
        return {};
    }
    return dataAttributes.reduce((acc, name) => {
        const variantName = props[name] ?? defaultVariants?.[name];
        const value = variants[name]?.[variantName];
        if (value !== null) {
            acc[`data-${name}`] = variantName;
        }
        return acc;
    }, {});
}
//# sourceMappingURL=parser.js.map