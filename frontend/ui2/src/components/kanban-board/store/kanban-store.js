import { create } from "zustand";
const useKanbanStore = create((set) => ({
    kanbanFilter: false,
    toggleKanbanFilter: () => set((state) => ({
        kanbanFilter: !state.kanbanFilter,
    })),
}));
export default useKanbanStore;
//# sourceMappingURL=kanban-store.js.map