/* eslint-disable @typescript-eslint/no-explicit-any */
import useKanbanStore from "../store/kanban-store";
// Custom hook for kanban filter
export const useKanbanFilter = () => {
    const kanbanFilter = useKanbanStore((state) => state.kanbanFilter);
    const toggleKanbanFilter = useKanbanStore((state) => state.toggleKanbanFilter);
    return {
        kanbanFilter,
        toggleKanbanFilter,
    };
};
//# sourceMappingURL=use-kanban-filter.js.map