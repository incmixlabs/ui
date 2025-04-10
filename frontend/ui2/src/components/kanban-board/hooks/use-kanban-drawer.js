import { useQueryState } from "nuqs";
export const useKanbanDrawer = () => {
    const [taskId, setTaskId] = useQueryState("taskId", { defaultValue: "" });
    const handleDrawerOpen = async (cardId) => {
        await setTaskId(cardId);
    };
    const handleDrawerClose = async () => {
        await setTaskId("");
    };
    return {
        taskId,
        handleDrawerOpen,
        handleDrawerClose,
    };
};
//# sourceMappingURL=use-kanban-drawer.js.map