import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@/components/base";
import { Suspense, lazy, useState } from "react";
// Dynamically import component
const ProjectBox = lazy(() => import("./components/project-box"));
export function FileManager() {
    const [_currentFolderId, _setCurrentFolderId] = useState(null);
    const [breadcrumbs, _setBreadcrumbs] = useState([{ id: "", name: "File manager" }]);
    const currentFolder = breadcrumbs[breadcrumbs.length - 1];
    return (_jsx(_Fragment, { children: _jsx(Suspense, { fallback: _jsx(Box, { className: "p-4", children: "Loading project box..." }), children: _jsx(ProjectBox, { title: currentFolder.name === "File manager"
                    ? "Projects"
                    : currentFolder.name }) }) }));
}
//# sourceMappingURL=index.js.map