import { useQueryState } from "nuqs"

export const useProjectDrawer = () => {
  const [projectId, setProjectId] = useQueryState("projectId", {
    defaultValue: "",
  })

  const handleDrawerOpen = async (cardId: string) => {
    await setProjectId(cardId)
  }

  const handleDrawerClose = async () => {
    await setProjectId("")
  }

  return {
    projectId,
    handleDrawerOpen,
    handleDrawerClose,
  }
}
