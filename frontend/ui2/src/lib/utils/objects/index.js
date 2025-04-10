/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelToCapitalized } from "../../strings";
export function arrayToCapitalObject(keys) {
    return keys.reduce((obj, key) => {
        obj[key] = camelToCapitalized(key);
        return obj;
    }, {});
}
export function isObject(obj) {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
export function mergeDeep(...objects) {
    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach((key) => {
            const pVal = prev[key];
            const oVal = obj[key];
            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            }
            else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            }
            else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
}
export function isShallowEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    return keys1.every((key1) => Object.is(obj1[key1], obj2[key1]));
}
//# sourceMappingURL=index.js.map