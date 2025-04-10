export const COMPONENT_SYMBOL = Symbol.for("tw-classed.component");
export const isClassedComponent = (value) => {
    return ((typeof value === "object" || typeof value === "function") &&
        Reflect.has(value, COMPONENT_SYMBOL));
};
//# sourceMappingURL=unique.js.map