const cardKey = Symbol("card");
export function getCardData({ card, rect, columnId, }) {
    return {
        [cardKey]: true,
        rect,
        card,
        columnId,
    };
}
export function isCardData(value) {
    return Boolean(value[cardKey]);
}
export function isDraggingACard({ source, }) {
    return isCardData(source.data);
}
const cardDropTargetKey = Symbol("card-drop-target");
export function isCardDropTargetData(value) {
    return Boolean(value[cardDropTargetKey]);
}
export function getCardDropTargetData({ card, columnId, }) {
    return {
        [cardDropTargetKey]: true,
        card,
        columnId,
    };
}
const columnKey = Symbol("column");
export function getColumnData({ column, }) {
    return {
        [columnKey]: true,
        column,
    };
}
export function isColumnData(value) {
    return Boolean(value[columnKey]);
}
export function isDraggingAColumn({ source, }) {
    return isColumnData(source.data);
}
//# sourceMappingURL=types.js.map