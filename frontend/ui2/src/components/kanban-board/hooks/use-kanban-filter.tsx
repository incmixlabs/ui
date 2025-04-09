/* eslint-disable @typescript-eslint/no-explicit-any */
import useKanbanStore from "../store/kanban-store"

// Custom hook for kanban filter
export const useKanbanFilter = () => {
  const kanbanFilter = useKanbanStore((state:any) => state.kanbanFilter)
  const toggleKanbanFilter = useKanbanStore((state:any) => state.toggleKanbanFilter)

  return {
    kanbanFilter,
    toggleKanbanFilter,
  }
}
