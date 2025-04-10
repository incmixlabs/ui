interface KanbanState {
    kanbanFilter: boolean;
    toggleKanbanFilter: () => void;
}
declare const useKanbanStore: import("zustand").UseBoundStore<import("zustand").StoreApi<KanbanState>>;
export default useKanbanStore;
//# sourceMappingURL=kanban-store.d.ts.map