import { type DragControls } from "motion/react";
/**
 * Renders a task card drawer for editing detailed task information within a Kanban board.
 *
 * This component displays various interface elements such as the task description, checklist items,
 * attachments, labels, assigned members, due date, and comments. It manages state updates for these items
 * and conditionally adjusts its layout and styling based on the provided kanbanFilter flag and the task context
 * from the Kanban drawer hook.
 *
 * @param kanbanFilter - When true, applies Kanban filter styling and layout adjustments.
 *
 * @returns A JSX element representing the task card drawer interface.
 */
export default function TaskCardDrawer({ kanbanFilter, }: {
    kanbanFilter: boolean;
}): import("react/jsx-runtime").JSX.Element;
interface Props {
    dragControls: DragControls;
}
export declare function ReorderIcon({ dragControls }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=task-card-drawer.d.ts.map