type SidebarStore = {
    expandedItems: Set<string>;
    toggleItem: (itemId: string) => void;
    setItemExpanded: (itemId: string, expanded: boolean) => void;
    isItemExpanded: (itemId: string) => boolean;
};
export declare const useSidebarStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<SidebarStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<SidebarStore, {
            expandedItems: string[];
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SidebarStore) => void) => () => void;
        onFinishHydration: (fn: (state: SidebarStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<SidebarStore, {
            expandedItems: string[];
        }>>;
    };
}>;
export {};
//# sourceMappingURL=store.d.ts.map