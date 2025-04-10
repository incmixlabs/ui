import type { TreeDataItem } from "@/types";
type EnvVarsState = {
    treeData: TreeDataItem[];
    setTreeData: (data: TreeDataItem[] | TreeDataItem) => void;
};
export declare const useEnvVarsStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<EnvVarsState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<EnvVarsState, EnvVarsState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: EnvVarsState) => void) => () => void;
        onFinishHydration: (fn: (state: EnvVarsState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<EnvVarsState, EnvVarsState>>;
    };
}>;
export declare const findItemById: (items: TreeDataItem[] | TreeDataItem, id: string) => TreeDataItem | null;
export declare const findParentArrayAndIndex: (items: TreeDataItem[] | TreeDataItem, id: string, parent?: TreeDataItem[] | null) => {
    parentArray: TreeDataItem[];
    index: number;
} | null;
export declare const removeItemById: (items: TreeDataItem[] | TreeDataItem, id: string) => TreeDataItem[];
export {};
//# sourceMappingURL=env-vars-store.d.ts.map