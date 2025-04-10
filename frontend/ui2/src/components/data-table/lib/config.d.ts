export type DataTableConfig = typeof dataTableConfig;
export declare const dataTableConfig: {
    textOperators: ({
        label: string;
        value: "iLike";
    } | {
        label: string;
        value: "notILike";
    } | {
        label: string;
        value: "eq";
    } | {
        label: string;
        value: "ne";
    } | {
        label: string;
        value: "isEmpty";
    } | {
        label: string;
        value: "isNotEmpty";
    })[];
    numericOperators: ({
        label: string;
        value: "eq";
    } | {
        label: string;
        value: "ne";
    } | {
        label: string;
        value: "lt";
    } | {
        label: string;
        value: "lte";
    } | {
        label: string;
        value: "gt";
    } | {
        label: string;
        value: "gte";
    } | {
        label: string;
        value: "isEmpty";
    } | {
        label: string;
        value: "isNotEmpty";
    })[];
    dateOperators: ({
        label: string;
        value: "eq";
    } | {
        label: string;
        value: "ne";
    } | {
        label: string;
        value: "lt";
    } | {
        label: string;
        value: "gt";
    } | {
        label: string;
        value: "lte";
    } | {
        label: string;
        value: "gte";
    } | {
        label: string;
        value: "isBetween";
    } | {
        label: string;
        value: "isRelativeToToday";
    } | {
        label: string;
        value: "isEmpty";
    } | {
        label: string;
        value: "isNotEmpty";
    })[];
    selectOperators: ({
        label: string;
        value: "eq";
    } | {
        label: string;
        value: "ne";
    } | {
        label: string;
        value: "isEmpty";
    } | {
        label: string;
        value: "isNotEmpty";
    })[];
    booleanOperators: ({
        label: string;
        value: "eq";
    } | {
        label: string;
        value: "ne";
    })[];
    sortOrders: ({
        label: string;
        value: "asc";
    } | {
        label: string;
        value: "desc";
    })[];
    joinOperators: ({
        label: string;
        value: "and";
    } | {
        label: string;
        value: "or";
    })[];
    columnTypes: readonly ["text", "number", "date", "boolean", "select", "multi-select"];
    operators: readonly ["iLike", "notILike", "eq", "ne", "isEmpty", "isNotEmpty", "lt", "lte", "gt", "gte", "isBetween", "isRelativeToToday", "and", "or"];
};
//# sourceMappingURL=config.d.ts.map