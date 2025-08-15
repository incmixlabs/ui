import { useQueryState } from "nuqs"
export const useKanbanDrawer = () => {
  const [taskId, setTaskId] = useQueryState("taskId", { defaultValue: "" })

  const handleDrawerOpen = async (cardId: string) => {
    await setTaskId(cardId)
  }

  const handleDrawerClose = async () => {
    await setTaskId("")
  }

  // Add isOpen property that determines if drawer is open based on taskId value
  const isOpen = taskId !== ""

  return {
    taskId,
    handleDrawerOpen,
    handleDrawerClose,
    isOpen,
  }
}
