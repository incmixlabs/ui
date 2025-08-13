// useModalStore.ts
import { create } from "zustand"

interface ModalStore {
  isDashboardCreateOpen: boolean
  isTaskCreateOpen: boolean
  isDashboardEditOpen: boolean

  openDashboardCreate: () => void
  closeDashboardCreate: () => void

  openTaskCreate: () => void
  closeTaskCreate: () => void

  openDashboardEdit: () => void
  closeDashboardEdit: () => void

  closeAll: () => void
}

export const useModalStore = create<ModalStore>()((set) => ({
  isDashboardCreateOpen: false,
  isTaskCreateOpen: false,
  isDashboardEditOpen: false,

  openDashboardCreate: () => set({ isDashboardCreateOpen: true }),
  closeDashboardCreate: () => set({ isDashboardCreateOpen: false }),

  openTaskCreate: () => set({ isTaskCreateOpen: true }),
  closeTaskCreate: () => set({ isTaskCreateOpen: false }),

  openDashboardEdit: () => set({ isDashboardEditOpen: true }),
  closeDashboardEdit: () => set({ isDashboardEditOpen: false }),

  closeAll: () =>
    set({
      isDashboardCreateOpen: false,
      isTaskCreateOpen: false,
      isDashboardEditOpen: false,
    }),
}))
