export type AffixObj = {
    parent?: object;
    child?: object | string;
    separator?: string;
};
export declare function arrayToCapitalObject<T extends string>(keys: T[]): Record<T, any>;
export declare function isObject(obj: any): boolean;
export declare function mergeDeep(...objects: any[]): any;
export declare function isShallowEqual(obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean;
//# sourceMappingURL=index.d.ts.map