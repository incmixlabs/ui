import { columnTypes, joinOperators, operators } from "@incmix/utils/data-table";
export const dataTableConfig = {
    textOperators: [
        { label: "Contains", value: "iLike" },
        { label: "Does not contain", value: "notILike" },
        { label: "Is", value: "eq" },
        { label: "Is not", value: "ne" },
        { label: "Is empty", value: "isEmpty" },
        { label: "Is not empty", value: "isNotEmpty" },
    ],
    numericOperators: [
        { label: "Is", value: "eq" },
        { label: "Is not", value: "ne" },
        { label: "Is less than", value: "lt" },
        { label: "Is less than or equal to", value: "lte" },
        { label: "Is greater than", value: "gt" },
        { label: "Is greater than or equal to", value: "gte" },
        { label: "Is empty", value: "isEmpty" },
        { label: "Is not empty", value: "isNotEmpty" },
    ],
    dateOperators: [
        { label: "Is", value: "eq" },
        { label: "Is not", value: "ne" },
        { label: "Is before", value: "lt" },
        { label: "Is after", value: "gt" },
        { label: "Is on or before", value: "lte" },
        { label: "Is on or after", value: "gte" },
        { label: "Is between", value: "isBetween" },
        { label: "Is relative to today", value: "isRelativeToToday" },
        { label: "Is empty", value: "isEmpty" },
        { label: "Is not empty", value: "isNotEmpty" },
    ],
    selectOperators: [
        { label: "Is", value: "eq" },
        { label: "Is not", value: "ne" },
        { label: "Is empty", value: "isEmpty" },
        { label: "Is not empty", value: "isNotEmpty" },
    ],
    booleanOperators: [
        { label: "Is", value: "eq" },
        { label: "Is not", value: "ne" },
    ],
    sortOrders: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
    ],
    joinOperators,
    columnTypes,
    operators,
};
//# sourceMappingURL=config.js.map