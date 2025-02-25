import { create } from "zustand"

interface KanbanState {
  kanbanFilter: boolean
  toggleKanbanFilter: () => void
}

const useKanbanStore = create<KanbanState>((set) => ({
  kanbanFilter: false,

  toggleKanbanFilter: () =>
    set((state) => ({
      kanbanFilter: !state.kanbanFilter,
    })),
}))

export default useKanbanStore
