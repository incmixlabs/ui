import useKanbanStore from "@utils/kanban-store"

// Custom hook for kanban filter
export const useKanbanFilter = () => {
  const kanbanFilter = useKanbanStore((state) => state.kanbanFilter)
  const toggleKanbanFilter = useKanbanStore((state) => state.toggleKanbanFilter)

  return {
    kanbanFilter,
    toggleKanbanFilter,
  }
}
