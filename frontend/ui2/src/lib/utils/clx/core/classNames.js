export const cx = (classNames) => classNames.filter(Boolean).join(" ");
export const cn = (...classes) => cx(classes);
export const mergeClass = (c1, c2) => {
    if (typeof c2 === "boolean") {
        return c1;
    }
    if (!c2) {
        return c1;
    }
    // Check if c1 is empty
    if (!c1) {
        return c2;
    }
    return `${c1} ${c2}`;
};
//# sourceMappingURL=classNames.js.map