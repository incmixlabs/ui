import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useSidebarStore = create()(persist((set, get) => ({
    expandedItems: new Set(),
    toggleItem: (itemId) => set((state) => {
        const newExpandedItems = new Set(state.expandedItems);
        if (newExpandedItems.has(itemId)) {
            newExpandedItems.delete(itemId);
        }
        else {
            newExpandedItems.add(itemId);
        }
        return { expandedItems: newExpandedItems };
    }),
    setItemExpanded: (itemId, expanded) => set((state) => {
        const newExpandedItems = new Set(state.expandedItems);
        if (expanded) {
            newExpandedItems.add(itemId);
        }
        else {
            newExpandedItems.delete(itemId);
        }
        return { expandedItems: newExpandedItems };
    }),
    isItemExpanded: (itemId) => get().expandedItems.has(itemId),
}), {
    name: "sidebar-storage",
    partialize: (state) => ({
        expandedItems: Array.from(state.expandedItems),
    }),
    merge: (persistedState, currentState) => ({
        ...currentState,
        expandedItems: new Set(persistedState.expandedItems || []),
    }),
}));
//# sourceMappingURL=store.js.map