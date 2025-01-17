import { create } from "zustand"
import { persist } from "zustand/middleware"

type SidebarStore = {
  expandedItems: Set<string>
  toggleItem: (itemId: string) => void
  setItemExpanded: (itemId: string, expanded: boolean) => void
  isItemExpanded: (itemId: string) => boolean
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      expandedItems: new Set<string>(),
      toggleItem: (itemId: string) =>
        set((state) => {
          const newExpandedItems = new Set(state.expandedItems)
          if (newExpandedItems.has(itemId)) {
            newExpandedItems.delete(itemId)
          } else {
            newExpandedItems.add(itemId)
          }
          return { expandedItems: newExpandedItems }
        }),
      setItemExpanded: (itemId: string, expanded: boolean) =>
        set((state) => {
          const newExpandedItems = new Set(state.expandedItems)
          if (expanded) {
            newExpandedItems.add(itemId)
          } else {
            newExpandedItems.delete(itemId)
          }
          return { expandedItems: newExpandedItems }
        }),
      isItemExpanded: (itemId: string) => get().expandedItems.has(itemId),
    }),
    {
      name: "sidebar-storage",
      partialize: (state) => ({
        expandedItems: Array.from(state.expandedItems),
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        expandedItems: new Set(persistedState.expandedItems || []),
      }),
    }
  )
)
