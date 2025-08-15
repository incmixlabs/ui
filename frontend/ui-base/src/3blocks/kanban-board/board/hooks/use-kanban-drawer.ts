// hooks/use-kanban-drawer.ts
import { create } from "zustand"

interface KanbanDrawerStore {
  taskId: string | null
  isOpen: boolean
  handleDrawerOpen: (taskId: string) => void
  handleDrawerClose: () => void
}

export const useKanbanDrawer = create<KanbanDrawerStore>((set) => ({
  taskId: null,
  isOpen: false,
  handleDrawerOpen: (taskId: string) => {
    set({ taskId, isOpen: true })
  },
  handleDrawerClose: () => {
    set({ taskId: null, isOpen: false })
  },
}))
