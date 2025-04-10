/* eslint-disable react-refresh/only-export-components */
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
const TreeViewContext = createContext(null);
export function useTreeViewContext() {
    const context = useContext(TreeViewContext);
    if (!context) {
        throw new Error("useTreeViewContext must be used within TreeViewProvider");
    }
    return context;
}
export function TreeViewProvider({ children, fileFields, folderFields, descriptions, }) {
    return (_jsx(TreeViewContext.Provider, { value: { fileFields, folderFields, descriptions }, children: children }));
}
//# sourceMappingURL=tree-view-context.js.map