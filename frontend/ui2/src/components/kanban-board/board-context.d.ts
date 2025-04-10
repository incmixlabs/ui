import type { Column } from "@incmix/utils/types";
export type BoardContextValue = {
    getColumns: () => Column[];
    reorderCard: (args: {
        columnId: string;
        startIndex: number;
        finishIndex: number;
    }) => void;
    moveCard: (args: {
        startColumnId: string;
        finishColumnId: string;
        itemIndexInStartColumn: number;
        itemIndexInFinishColumn?: number;
    }) => void;
    instanceId: symbol;
};
export declare const BoardContext: import("react").Context<BoardContextValue | null>;
export declare function useBoardContext(): BoardContextValue;
//# sourceMappingURL=board-context.d.ts.map