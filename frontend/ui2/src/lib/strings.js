export function camelToCapitalized(str) {
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
}
export const getInitials = (name) => {
    if (!name)
        return "";
    return (name
        .match(/(\b\S)?/g)
        ?.join("")
        .match(/(^\S|\S$)?/g)
        ?.join("")
        .toUpperCase() || "");
};
export function toSentenceCase(str) {
    return str
        .replace(/_/g, " ")
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase())
        .replace(/\s+/g, " ")
        .trim();
}
export function encodeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
//# sourceMappingURL=strings.js.map