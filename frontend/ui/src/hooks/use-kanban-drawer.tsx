"use client"

import { useQueryState } from "nuqs"
export const useKanbanDrawer = () => {
  const [taskId, setTaskId] = useQueryState("taskId", { defaultValue: "" })

  const handleDrawerOpen = async (cardId: string) => {
    await setTaskId(cardId)
  }

  const handleDrawerClose = async () => {
    await setTaskId("")
  }

  return {
    taskId,
    handleDrawerOpen,
    handleDrawerClose,
  }
}
