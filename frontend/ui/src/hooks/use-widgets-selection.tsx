import { create } from "zustand"
import { useEditingStore } from "@incmix/store"

interface SelectionState {
  selectedWidgets: string[]
  setSelectedWidgets: (widgets: string[]) => void
  addSelectedWidget: (widgetId: string) => void
  removeSelectedWidget: (widgetId: string) => void
  toggleSelectedWidget: (widgetId: string) => void
  clearSelection: () => void
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedWidgets: [],

  setSelectedWidgets: (widgets) => set({ selectedWidgets: widgets }),

  addSelectedWidget: (widgetId) =>
    set((state) => ({
      selectedWidgets: state.selectedWidgets.includes(widgetId)
        ? state.selectedWidgets
        : [...state.selectedWidgets, widgetId],
    })),

  removeSelectedWidget: (widgetId) =>
    set((state) => ({
      selectedWidgets: state.selectedWidgets.filter((id) => id !== widgetId),
    })),

  toggleSelectedWidget: (widgetId) =>
    set((state) => ({
      selectedWidgets: state.selectedWidgets.includes(widgetId)
        ? state.selectedWidgets.filter((id) => id !== widgetId)
        : [...state.selectedWidgets, widgetId],
    })),

  clearSelection: () => set({ selectedWidgets: [] }),
}))

// Helper hook to check if selection mode is active
export function useSelectionMode() {
  const { isEditing } = useEditingStore()
  return isEditing
}
