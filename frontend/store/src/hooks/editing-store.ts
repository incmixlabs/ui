import { create } from "zustand"

interface EditingState {
  isEditing: boolean
  setIsEditing: (value: boolean) => void
  toggleEditing: () => void
}

export const useEditingStore = create<EditingState>((set) => ({
  isEditing: false,
  setIsEditing: (value) => set({ isEditing: value }),
  toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
}))
