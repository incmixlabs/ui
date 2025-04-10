export type ColumnContextProps = {
    columnId: string;
    getTaskIndex: (taskId: string) => number;
    getNumTasks: () => number;
};
export declare const ColumnContext: import("react").Context<ColumnContextProps | null>;
export declare function useColumnContext(): ColumnContextProps;
//# sourceMappingURL=column-context.d.ts.map