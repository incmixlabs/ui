export interface KanbanBoard {
    id: number;
    title: string;
    tasks: KanbanBoardTask[];
}
export type TCustomColumn = {
    id: number;
    title: string;
    tasks: TCard[];
};
export type TCustomBoard = TCustomColumn[];
export interface KanbanBoardTask {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    daysLeft: number;
    attachment?: string;
}
export type TMember = {
    id: number;
    name: string;
    src: string;
};
export type TCard = {
    id: number;
    name: string;
    description?: string;
    completed: boolean;
    daysLeft: number;
    members: TMember[];
    date?: string;
    attachment?: string;
    filesData?: {
        name: string;
        url: string;
        size: string;
    }[];
    subTasks?: {
        progress: number;
        name: string;
        completed: boolean;
    }[];
};
export type TColumn = {
    id: string;
    title: string;
    cards: TCard[];
};
export type TBoard = {
    columns: TColumn[];
};
declare const cardKey: unique symbol;
export type TCardData = {
    [cardKey]: true;
    card: TCard;
    columnId: string;
    rect: DOMRect;
};
export declare function getCardData({ card, rect, columnId, }: Omit<TCardData, typeof cardKey> & {
    columnId: string;
}): TCardData;
export declare function isCardData(value: Record<string | symbol, unknown>): value is TCardData;
export declare function isDraggingACard({ source, }: {
    source: {
        data: Record<string | symbol, unknown>;
    };
}): boolean;
declare const cardDropTargetKey: unique symbol;
export type TCardDropTargetData = {
    [cardDropTargetKey]: true;
    card: TCard;
    columnId: string;
};
export declare function isCardDropTargetData(value: Record<string | symbol, unknown>): value is TCardDropTargetData;
export declare function getCardDropTargetData({ card, columnId, }: Omit<TCardDropTargetData, typeof cardDropTargetKey> & {
    columnId: string;
}): TCardDropTargetData;
declare const columnKey: unique symbol;
export type TColumnData = {
    [columnKey]: true;
    column: TColumn;
};
export declare function getColumnData({ column, }: Omit<TColumnData, typeof columnKey>): TColumnData;
export declare function isColumnData(value: Record<string | symbol, unknown>): value is TColumnData;
export declare function isDraggingAColumn({ source, }: {
    source: {
        data: Record<string | symbol, unknown>;
    };
}): boolean;
export {};
//# sourceMappingURL=types.d.ts.map